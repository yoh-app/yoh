import { motion } from 'framer-motion';
import renderProductCard from '@components/ui/product/render-product-card';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import DigitalProductCard from '@components/collection/card/xenon';
import { useQuery, gql } from '@apollo/client';
import { useCustomer } from '@contexts/customer.context';
import processItem from '@process/item';
interface Props {
  product: any;
  gridClassName?: string;
}

const DigitalProduct = ({ product, gridClassName }: Props) => {
  const { t } = useTranslation('common');
  const { customer } = useCustomer();
  const { data } = useQuery(
    gql`
      query findFirstOrderedProduct($where: OrderedProductWhereInput) {
        findFirstOrderedProduct(where: $where) {
          id
          product {
            id
            name
            videos {
              id
              name
              videoObj
              imageObj
              description
            }
            audios {
              id
              name
              audioObj
              imageObj
              description
            }
            links {
              id
              name
              url
              description
            }
          }
          # orderedVideos {
          #   id
          #   name
          #   videoObj
          #   imageObj
          #   description
          #   video {
          #     id
          #     name
          #     videoObj
          #     imageObj
          #     description
          #   }
          # }
          # orderedAudios {
          #   id
          #   name
          #   audioObj
          #   imageObj
          #   description
          #   audio {
          #     id
          #     name
          #     audioObj
          #     imageObj
          #     description
          #   }
          # }
          # orderedLinks {
          #   id
          #   name
          #   url
          #   imageObj
          #   description
          #   link {
          #     id
          #     name
          #     url
          #     imageObj
          #     description
          #   }
          # }
        }
      }
    `,
    {
      variables: {
        where: {
          order: {
            customer: {
              id: {
                equals: customer?.id,
              },
            },
          },
          product: {
            id: {
              equals: product?.id,
            },
          },
        },
      },
      skip: !customer?.id,
    },
  );
  return (
    <div className="mt-6">
      <div className={cn('grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4', gridClassName)}>
        {data?.findFirstOrderedProduct?.product?.audios?.map((audio: any, idx: number) => {
          return (
            <motion.div key={idx}>
              <DigitalProductCard card={{ ...processItem(audio), itemType: 'audio' }} />
            </motion.div>
          );
        })}
        {data?.findFirstOrderedProduct?.product?.links?.map((link: any, idx: number) => {
          return (
            <motion.div key={idx}>
              <DigitalProductCard card={{ ...processItem(link), itemType: 'link' }} />
            </motion.div>
          );
        })}
        {data?.findFirstOrderedProduct?.product?.videos?.map((video: any, idx: number) => {
          return (
            <motion.div key={idx}>
              <DigitalProductCard card={{ ...processItem(video), itemType: 'video' }} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DigitalProduct;
