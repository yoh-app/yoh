import Image from 'next/image';
import cn from 'classnames';
import { siteSettings } from '@settings/site.settings';
import usePrice from '@utils/use-price';
import { AddToCart } from '@components/ui/product/add-to-cart/add-to-cart';
import { useTranslation } from 'next-i18next';
import { PlusIcon } from '@components/icons/plus-icon';
import { useModalAction } from '@components/ui/modal/modal.context';
import { useRouter } from 'next/router';
type XenonProps = {
  card: Record<string, any>;
  className?: string;
};

const Xenon: React.FC<XenonProps> = ({ card, className }) => {
  const { t } = useTranslation('common');
  const { name, image, quantity, min_price, max_price, productType } = card ?? {};
  const { price, basePrice, discount } = usePrice({
    amount: card.price,
    baseAmount: card.sale_price,
  });
  const { price: minPrice } = usePrice({
    amount: min_price,
  });
  const { price: maxPrice } = usePrice({
    amount: max_price,
  });
  const { openModal } = useModalAction();
  const router = useRouter();
  function handleProductQuickView() {
    switch (card?.itemType) {
      case 'product':
      case 'link':
      case 'video':
      case 'audio':
        openModal('CARD_DETAILS', card);
        break;
      case 'page':
        router.push(`/pages/${card.slug}`);
        break;
      default:
        break;
    }
  }

  return (
    <article
      className={cn(
        'product-card cart-type-xenon rounded-xl h-full bg-light overflow-hidden border border-border-200 border-opacity-70 transform transition-all duration-200 hover:shadow hover:border-transparent hover:-translate-y-0.5',
        className,
      )}
    >
      <div
        className="relative flex items-center justify-center cursor-pointer w-auto h-48 sm:h-64"
        onClick={handleProductQuickView}
      >
        <span className="sr-only">{t('text-product-image')}</span>
        <Image
          src={image?.original ?? siteSettings?.product?.placeholderImage}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="product-image"
        />
        {discount && (
          <div className="absolute top-3 start-3 md:top-4 md:start-4 rounded text-xs leading-6 font-semibold px-1.5  md:px-2 lg:px-2.5 bg-accent text-light">
            {discount}
          </div>
        )}
        <div className="absolute top-0 right-0 p-3">
          {!!card.videos?.length || !!card.videoObj ? (
            <div className="w-6 h-6 m-1 inline-flex items-center justify-center bg-amber-500 rounded-full">
              <img className="cursor-pointer" width={12} src="/icons/tag_video.png" />
            </div>
          ) : (
            []
          )}
          {!!card.links?.length || !!card.url ? (
            <div className="w-6 h-6 m-1 inline-flex items-center justify-center bg-amber-500 rounded-full">
              <img className="cursor-pointer" width={12} src="/icons/tag_link.png" />
            </div>
          ) : (
            []
          )}
          {!!card.audios?.length || !!card.audioObj ? (
            <div className="w-6 h-6 m-1 inline-flex items-center justify-center bg-amber-500 rounded-full">
              <img className="cursor-pointer" width={12} src="/icons/tag_audio.png" />
            </div>
          ) : (
            []
          )}
        </div>
      </div>
      {/* End of product image */}

      <header className="p-3 md:p-6">
        <h3 className="text-lg truncate cursor-pointer" onClick={handleProductQuickView}>
          {name}
        </h3>
        {/* End of product name */}

        {/* End of price */}
        {card?.itemType === 'product' && (
          <div className="flex items-center justify-between mt-2">
            {productType === 'variable' ? (
              <>
                <div>
                  <span className="text-sm md:text-base text-heading font-semibold">{minPrice}</span>
                  <span> - </span>
                  <span className="text-sm md:text-base text-heading font-semibold">{maxPrice}</span>
                </div>

                <button
                  onClick={handleProductQuickView}
                  className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center text-sm text-accent bg-light rounded border border-border-200 transition-colors hover:bg-accent hover:border-accent hover:text-light focus:outline-none focus:bg-accent focus:border-accent focus:text-light"
                >
                  <span className="sr-only">{t('text-plus')}</span>
                  <PlusIcon className="w-5 h-5 stroke-2" />
                </button>
              </>
            ) : productType === 'simple' ? (
              <>
                <div className="flex md:items-center flex-col md:flex-row">
                  <span className="text-sm md:text-base text-heading font-semibold">
                    {basePrice ? basePrice : price}
                  </span>
                  {discount && <del className="text-xs text-muted mt-1 md:mt-0 md:ms-2">{price}</del>}
                </div>

                {quantity > 0 ? (
                  <AddToCart
                    variant="argon"
                    data={card}
                    counterClass="absolute sm:static bottom-3 end-3 sm:bottom-0 sm:end-0"
                  />
                ) : (
                  <div className="bg-red-500 rounded text-xs text-light px-1 py-1 truncate">{t('text-out-stock')}</div>
                )}
              </>
            ) : (
              <>
                <div className="flex md:items-center flex-col md:flex-row">
                  <span className="text-sm md:text-base text-heading font-semibold">
                    {basePrice ? basePrice : price}
                  </span>
                  {discount && <del className="text-xs text-muted mt-1 md:mt-0 md:ms-2">{price}</del>}
                </div>

                {/* <button
                  onClick={handleProductQuickView}
                  className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center text-sm text-accent bg-light rounded border border-border-200 transition-colors hover:bg-accent hover:border-accent hover:text-light focus:outline-none focus:bg-accent focus:border-accent focus:text-light"
                >
                  <span className="sr-only">{t('text-plus')}</span>
                  <PlusIcon className="w-5 h-5 stroke-2" />
                </button> */}
              </>
            )}
            {/* End of cart */}
          </div>
        )}
      </header>
    </article>
  );
};

export default Xenon;
