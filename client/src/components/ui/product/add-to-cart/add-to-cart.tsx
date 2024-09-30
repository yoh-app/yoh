import Counter from '@components/ui/counter';
import AddToCartBtn from '@components/ui/product/add-to-cart/add-to-cart-btn';
import { cartAnimation } from '@utils/cart-animation';
import { useCart } from '@contexts/quick-cart/cart.context';
import { generateCartItem } from '@contexts/quick-cart/generate-cart-item';
import { useTranslation } from 'next-i18next';

interface Props {
  data: any;
  variant?: 'helium' | 'neon' | 'argon' | 'oganesson' | 'single' | 'big';
  counterVariant?: 'helium' | 'neon' | 'argon' | 'oganesson' | 'single' | 'details';
  counterClass?: string;
  variation?: any;
  disabled?: boolean;
}

export const AddToCart = ({ data, variant = 'helium', counterVariant, counterClass, variation, disabled }: Props) => {
  const { addItemToCart, removeItemFromCart, isInStock, getItemFromCart, isInCart } = useCart();
  const item = generateCartItem(data, variation);
  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement | MouseEvent>) => {
    e.stopPropagation();
    addItemToCart(item, 1);
    // if (!isInCart(item.id)) {
    //   cartAnimation(e);
    // }
  };
  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    removeItemFromCart(item.id);
  };
  // const outOfStock = (isInCart(item?.id) && !isInStock(item.id)) || item.stock === 0;
  const outOfStock = isInCart(item?.id) && !isInStock(item.id);
  const variationExist = data?.productType === 'variable' ? variation && Object.keys(variation)?.length > 0 : true;

  const { t } = useTranslation('common');

  return !isInCart(item?.id) ? (
    <AddToCartBtn disabled={disabled || outOfStock || !variationExist} variant={variant} onClick={handleAddClick} />
  ) : (
    <>
      {/* <Counter
        value={getItemFromCart(item.id).quantity}
        onDecrement={handleRemoveClick}
        onIncrement={handleAddClick}
        variant={counterVariant ? counterVariant : variant}
        className={counterClass}
        disabled={outOfStock}
      /> */}

      <button
        onClick={handleRemoveClick}
        className="border !bg-gray-300 hover:!bg-gray-300 border-border-400 !text-body py-4 px-5 w-full flex items-center justify-center text-sm lg:text-base font-light rounded text-light bg-accent hover:bg-accent-hover transition-colors duration-300 focus:outline-none focus:bg-accent-hover"
      >
        {t('text-remove-from-cart')}
      </button>
    </>
  );
};
