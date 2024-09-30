import React, { FC } from "react";
import { useGetCustomerQuery } from "../generated";
import { useSettings } from "./settings.context";
import { useAuth } from "@server/magic/components/AuthProvider";

const initialState: Record<string, any> = {};

export const CustomerContext = React.createContext(initialState);

CustomerContext.displayName = "CustomerContext";

export const CustomerProvider: FC = (props) => {
  const website = useSettings();

  const { user } = useAuth();

  const { data } = useGetCustomerQuery({
    variables: {
      websiteSlug: website?.slug,
    },
    skip: !user?.id || !website?.slug,
  });

  return (
    <CustomerContext.Provider
      value={{
        customer: data?.getCustomer,
      }}
      {...props}
    />
  );
};

export const useCustomer = () => {
  const context = React.useContext(CustomerContext);
  if (context === undefined) {
    throw new Error(`useCustomer must be used within a CustomerProvider`);
  }
  return context;
};
