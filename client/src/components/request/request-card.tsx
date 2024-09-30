import cn from 'classnames';
import Image from 'next/image';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useSettings } from '@contexts/settings.context';
import axios from 'axios';

import { ArrowNextIcon } from '@components/icons/arrow-next';

interface ProductProps {
  request: any;
  className?: string;
  contactClassName?: string;
  imageContentClassName?: string;
  variant?: 'grid' | 'gridSlim' | 'list' | 'listSmall';
  imgWidth?: number | string;
  imgHeight?: number | string;
  imgLayout?: 'intrinsic' | 'fixed' | 'responsive' | 'fill';
  imgLoading?: 'eager' | 'lazy';
}

const ProductCard: FC<ProductProps> = ({
  request,
  className = '',
  imageContentClassName = '',
  variant = 'list',
  imgWidth = 340,
  imgHeight = 440,
  imgLayout = 'fixed',
  imgLoading,
}) => {
  const placeholderImage = `/assets/placeholder/products/product-${variant}.svg`;
  const { query } = useRouter();
  const { indexPageSlug } = useSettings();

  const clickRequest = async () => {
    const url = 'https://api.ipify.org/?format=json';
    // const ip = await fetch(url)
    //   .then((response) => response.json())
    //   .then((data) => data.ip);
    const slug = query?.pageSlug ?? indexPageSlug;
    axios.post('/api/requestClick', {
      // ip,
      requestId: request.id,
      pageSlug: query?.pageSlug ?? indexPageSlug,
    }).then(() => {
      window.open(request.url);
      // window.location.assign(request.url);
    });
  };
  return (
    <div
      className={cn(
        'group box-border overflow-hidden flex rounded-md cursor-pointer flex-row items-center transition-transform ease-linear bg-gray-200 pe-2 lg:pe-3 2xl:pe-4',
        className,
      )}
      role="button"
      title={request?.name}
      onClick={clickRequest}
    >
      <div className={cn('relative', imageContentClassName)} style={{ height: imgHeight }}>
        <Image
          src={request?.imageObj?.url ?? placeholderImage}
          width={imgWidth}
          height={imgHeight}
          layout={imgLayout}
          loading={imgLoading}
          loader={({ src }) => {
            return src;
          }}
          quality={100}
          alt={request?.name || 'Product Image'}
          className={cn('bg-gray-300 object-cover rounded-s-md', {
            'rounded-s-md transition duration-200 ease-linear transform group-hover:scale-105': variant === 'list',
          })}
        />
        <div
          style={{ background: 'linear-gradient(rgba(108, 122, 137, 0.6), rgba(189, 195, 199, 0.2))' }}
          className="absolute top-0 right-0 bottom-0 left-0 text-white p-4 flex flex-col"
        >
          <div className="flex justify-between items-center text-lg">
            <span>{request?.name}</span>
            <ArrowNextIcon />
          </div>
          <div className="overflow-hidden break-all">{request?.description}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
