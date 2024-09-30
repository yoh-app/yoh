import Card from '@components/common/card';
import Carousel from '@components/ui/carousel/carousel';
import CardLoader from '@components/ui/loaders/card-loader';
import CardRoundedLoader from '@components/ui/loaders/card-rounded-loader';
import { SwiperSlide } from 'swiper/react';

interface CategoriesProps {
  sectionHeading: string;
  className?: string;
  type?: 'rounded' | 'circle';
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
    slidesPerView: 3,
    spaceBetween: 12,
  },
};

const breakpointsCircle = {
  '1720': {
    slidesPerView: 8,
    spaceBetween: 48,
  },
  '1400': {
    slidesPerView: 7,
    spaceBetween: 32,
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
    slidesPerView: 3,
    spaceBetween: 12,
  },
};

const CategoryBlock: React.FC<CategoriesProps> = ({
  className = 'mb-10 md:mb-11 lg:mb-12 xl:mb-14 lg:pb-1 xl:pb-0',
  type = 'circle',
  data,
}) => {
  const isLoading = false;
  return (
    <div className={className}>
      <Carousel breakpoints={type === 'rounded' ? breakpoints : breakpointsCircle} buttonClassName="-mt-8 md:-mt-10">
        {isLoading && !data
          ? Array.from({ length: 10 }).map((_, idx) => {
              if (type === 'rounded') {
                return (
                  <SwiperSlide key={`card-rounded-${idx}`}>
                    <CardRoundedLoader uniqueKey={`card-rounded-${idx}`} />
                  </SwiperSlide>
                );
              }
              return (
                <SwiperSlide key={`card-circle-${idx}`}>
                  <CardLoader uniqueKey={`card-circle-${idx}`} />
                </SwiperSlide>
              );
            })
          : data?.map((item) => (
              <SwiperSlide key={`item--key-${item.id}`}>
                <Card
                  item={item}
                  href={item.url}
                  variant={type}
                  effectActive={true}
                  size={type === 'rounded' ? 'medium' : 'small'}
                />
              </SwiperSlide>
            ))}
      </Carousel>
    </div>
  );
};

export default CategoryBlock;
