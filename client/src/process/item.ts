import { processImage, processAudio, processVideo } from './media';
const processItem = (item) => {
  // const image = processImage(item?.imageObj);
  // const video = processVideo(item?.videoObj);
  // const audio = processAudio(item?.audioObj);
  // const gallery =
  //   item?.gallery?.length > 0
  //     ? item.gallery?.map((imageObj) => {
  //       return processImage(imageObj);
  //     })
  //     : [];
  // const variationOptions = item?.variationOptions ? item?.variationOptions?.filter(
  //   (variation_option) => !!variation_option.price && !!variation_option.quantity,
  // ) : []

  // const variations = item?.variations ? item?.variations?.flatMap(({ value, attribute }: any) =>
  //   value?.map((value: any) => ({
  //     attribute_value_id: value.id,
  //     ...value,
  //     attribute,
  //   })),
  // ) : []

  // const minPrice =
  //   item?.useVariations && variationOptions
  //     ? parseFloat(
  //       variationOptions?.reduce(function (p, v) {
  //         return parseFloat(p.price) < parseFloat(v.price) ? p : v;
  //       }, 0)?.price,
  //     )
  //     : undefined;
  // const maxPrice =
  //   item?.useVariations && variationOptions
  //     ? parseFloat(
  //       variationOptions?.reduce(function (p, v) {
  //         return parseFloat(p.price) > parseFloat(v.price) ? p : v;
  //       }, 0)?.price,
  //     )
  //     : undefined;
  // let quantity = item?.quantity ?? 0;
  // if (item?.useVariations) {
  //   quantity = 0;
  //   variationOptions.forEach((element) => {
  //     quantity += parseInt(element.quantity);
  //   });
  // }


  return JSON.parse(JSON.stringify({
    ...item,
    // variations,
    // variationOptions,
    // image,
    // gallery,
    // video,
    // audio,
    // minPrice,
    // maxPrice,
    // quantity,
  }));
};

export default processItem;
