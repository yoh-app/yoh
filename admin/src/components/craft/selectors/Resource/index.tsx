import React, { useState, useEffect } from 'react';
import { useNode } from '@craftjs/core';
// import { TextSettings } from './TextSettings';
// import Products from 'containers/products';
// import Categories from 'containers/categories';
// import { useFindManyProductQuery } from 'generated';
import { useQuery, gql } from '@apollo/client';

export type Resource = {
  resource: string;
  products: any;
  categories: any;
};

const defaultProps = {
  resource: '',
  products: [],
  categories: [],
};

export const Resource = (props: Partial<Resource>) => {
  const { products, categories, resource } = props;
  const { data: productData } = useQuery(
    gql`
      query findManyProduct($where: ProductWhereInput) {
        findManyProduct(where: $where) {
          id
          name
          description
          image
          variants {
            optionValues {
              id
              name
              option {
                id
                name
              }
            }
            name
            id
            description
            price
          }
          options {
            id
            name
            optionValues {
              id
              name
              option {
                id
                name
              }
            }
          }
          categories {
            id
            name
            image
          }
        }
      }
    `,
    {
      variables: {
        where: {
          id: {
            in: products,
          },
        },
      },
      skip: resource !== 'product',
    },
  );

  const {
    connectors: { connect },
    // className,
    // defaultText,
  } = useNode((node) => ({
    // className: node.data.custom.className,
    // defaultText: node.data.custom.defaultText,
  }));

  useEffect(() => {}, [props]);

  return (
    <div ref={connect} className="flex flex-col w-full flex-grow">
      <div className="px-3 flex-auto md:px-35px">
        {/* <Categories data={categories} ref={null} />
        <Products items={productData?.findManyProduct} /> */}
      </div>
    </div>
  );
};

Resource.craft = {
  // displayName: 'Resource',
  rules: {},
  props: defaultProps,
  // custom: {
  //   className: '',
  //   defaultText: '',
  // },
  related: {
    // toolbar: TextSettings,
  },
};
