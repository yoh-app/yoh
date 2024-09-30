import React from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/router';
import SwiperCore, { Navigation, Pagination, Autoplay, Thumbs } from 'swiper';

import { useSettings } from '@contexts/settings.context';
import ChevronLeft from '@components/icons/chevron-left';
import ChevronRight from '@components/icons/chevron-right';
import CardRoundedLoader from '@components/ui/loaders/card-rounded-loader';
import { getDirection } from '@utils/get-direction';

import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination, Autoplay, Thumbs]);

interface CategoriesProps {
  className?: string;
  data?: Record<string, any>;
}

const breakpoints = {
  '1720': {
    slidesPerView: 8,
    spaceBetween: 28,
  },
  '1400': {
    slidesPerView: 7,
    spaceBetween: 28,
  },
  '1025': {
    slidesPerView: 6,
    spaceBetween: 28,
  },
  '768': {
    slidesPerView: 5,
    spaceBetween: 20,
  },
  '500 ': {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  '0': {
    slidesPerView: 1,
    spaceBetween: 12,
  },
};

const CarouselLinks: React.FC<CategoriesProps> = ({ className = '', data }) => {
  const isLoading = false;
  const { query, locale } = useRouter();
  const { indexPageSlug } = useSettings();
  const dir = getDirection(locale);

  const placeholderImage = `/assets/placeholder/card-small.svg`;

  const clickRequest = async (item) => {
    const url = 'https://api.ipify.org/?format=json';
    // const ip = await fetch(url)
    //   .then((response) => response.json())
    //   .then((data) => data.ip);
    // const slug = query?.pageSlug ?? indexPageSlug;
    axios.post('/api/requestClick', {
      // ip,
      requestId: item?.id,
      pageSlug: query?.pageSlug ?? indexPageSlug,
    }).then(() => {
      window.location.assign(item.url);
    });
  };

  return (
    <div className={className}>
      <Swiper
        loop={false}
        autoplay={{
          delay: 4000,
        }}
        breakpoints={breakpoints}
        dir={dir}
        navigation={{
          prevEl: '.product-gallery-prev',
          nextEl: '.product-gallery-next',
        }}
      >
        {isLoading && !data
          ? Array.from({ length: 10 }).map((_, idx) => {
            return (
              <SwiperSlide key={`card-rounded-${idx}`}>
                <CardRoundedLoader uniqueKey={`card-rounded-${idx}`} />
              </SwiperSlide>
            );
          })
          : data?.map((item: Record<string, any>) => (
            <SwiperSlide key={`item--key-${item.id}`}>
              <div
                onClick={() => {
                  clickRequest(item);
                }}
              >
                <div
                  className="relative"
                  style={{
                    height: 170,
                  }}
                >
                  <Image
                    src={item.imageObj?.url ?? placeholderImage}
                    layout={'fill'}
                    quality={100}
                    loader={({ src }) => {
                      return src;
                    }}
                    alt={item?.name || 'Request Image'}
                    className="bg-gray-300 object-cover rounded-s-md transition duration-200 ease-linear transform group-hover:scale-105"
                  />
                  <div
                    style={{ background: 'linear-gradient(rgba(108, 122, 137, 0.6), rgba(189, 195, 199, 0.2))' }}
                    className="absolute top-0 right-0 bottom-0 left-0 text-white p-4 flex flex-col"
                  >
                    <div className="text-lg">{item?.name}</div>
                    <div className="overflow-hidden break-all">{item?.description}</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="product-gallery-prev cursor-pointer absolute top-2/4 left-4 z-10 rounded-full bg-light shadow-xl border border-border-200 border-opacity-70 flex items-center justify-center text-heading transition-all duration-200 hover:bg-gray-100">
        <ChevronLeft className="w-6 h-6 p-1" />
      </div>
      <div className="product-gallery-next cursor-pointer absolute top-2/4 right-4 z-10 rounded-full bg-light shadow-xl border border-border-200 border-opacity-70 flex items-center justify-center text-heading transition-all duration-200 hover:bg-gray-100">
        <ChevronRight className="w-6 h-6 p-1" />
      </div>
    </div>
  );
};

export default CarouselLinks;
