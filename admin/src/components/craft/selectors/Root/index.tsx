import React from 'react';

export type Root = {
  children: React.ReactNode;
};

const defaultProps = {};

export const Root = (props: Partial<Root>) => {
  props = {
    ...defaultProps,
    ...props,
  };
  const { children } = props;
  return <>{children}</>;
};

Root.craft = {
  displayName: 'Root',
  props: defaultProps,
};
