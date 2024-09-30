import "swiper/swiper-bundle.css";
import SwiperCore, { Navigation, Thumbs, Pagination, Autoplay } from "swiper";
export { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use([Navigation, Thumbs, Pagination, Autoplay]);
export type { SwiperOptions } from 'swiper';