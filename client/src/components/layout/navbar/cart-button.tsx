import { useTranslation } from 'next-i18next';
import CartCheckBagIcon from '@components/icons/cart-check-bag';
import { useUI } from '@contexts/ui.context';
import { useCart } from '@contexts/quick-cart/cart.context';
import { formatString } from '@utils/format-string';

export default function JoinButton() {
  const { t } = useTranslation('common');
  const { openSidebar, setSidebarView } = useUI();
  const { totalUniqueItems, total } = useCart();

  function handleCartSidebar() {
    setSidebarView('CART_VIEW');
    return openSidebar();
  }
  return (
    <a className="cursor-pointer" onClick={handleCartSidebar}>
      <CartCheckBagIcon className="flex-shrink-0 ml-auto mr-auto" width={18} height={24} />
      <span className="flex text-xs">{formatString(totalUniqueItems, t('common:text-item'))}</span>
    </a>
  );
}
