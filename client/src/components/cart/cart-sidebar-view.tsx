import { useRouter } from 'next/router';
import { motion, AnimateSharedLayout } from 'framer-motion';
import { useUI } from '@contexts/ui.context';
import CartCheckBagIcon from '@components/icons/cart-check-bag';
import EmptyCartIcon from '@components/icons/empty-cart';
import { CloseIcon } from '@components/icons/close-icon';
import CartItem from '@components/cart/cart-item';
import { fadeInOut } from '@utils/motion/fade-in-out';
import { ROUTES } from '@utils/routes';
import usePrice from '@utils/use-price';
import { useCart } from '@contexts/quick-cart/cart.context';
import { formatString } from '@utils/format-string';
import { useTranslation } from 'next-i18next';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '@server/magic/components/AuthProvider';
import { useModalAction } from '@components/ui/modal/modal.context';
import { useState } from 'react';
import { useSettings } from '@contexts/settings.context';
import { useCustomer } from '@contexts/customer.context';
import CartVoucher from './cart-voucher';
import { useFindManyShippingQuery, useStripeCheckoutMutation } from '@generated';

const ShippingPicker = ({ options, setShippingId }) => {
  return (
    <div className="p-5">
      <label className="mr-10">Shipping</label>
      <select onChange={(e) => setShippingId(e.target.value)}>
        <option selected disabled>
          Please Select
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const CartSidebarView = () => {
  const { t } = useTranslation('common');
  const { items, totalUniqueItems, total, resetCart } = useCart();
  const { closeSidebar } = useUI();
  const { user } = useAuth();
  const { customer } = useCustomer();
  const { openModal } = useModalAction();
  const { websiteSlug } = useSettings();
  const [stripeCheckout] = useStripeCheckoutMutation();
  const { data: shippingData } = useFindManyShippingQuery({
    variables: {
      where: {
        active: {
          equals: true,
        },
        website: {
          slug: {
            equals: websiteSlug,
          },
        },
      },
    },
  });
  // const requireShipping = items.find((item) => item.productType !== 'digital');
  const requireShipping = undefined;
  const [coupon, setCoupon] = useState(null);
  const [shippingId, setShippingId] = useState(null);
  // const router = useRouter();

  async function handleCheckout() {
    if (!user) {
      return openModal('MAGIC_VIEW');
    } else {
      if (requireShipping && !shippingId) {
        alert('Please select a shipping method');
      } else {
        const { data } = await stripeCheckout({
          variables: {
            items,
            couponCode: coupon?.code,
            shippingId,
            customerId: customer?.id,
            websiteSlug,
          },
        });
        if (data?.stripeCheckout.session) {
          window.location.assign(data?.stripeCheckout?.session?.url);
        }
        resetCart();
        return closeSidebar();
      }
    }
    // router.push(ROUTES.CHECKOUT);
  }

  const { price: totalPrice } = usePrice({
    amount: coupon
      ? coupon?.couponType === 'amount_off'
        ? total - coupon?.amount_off
        : total * (1 - coupon?.percent_off * 0.01)
      : total,
  });
  return (
    <section className="flex flex-col h-full relative">
      <header className="fixed max-w-md w-full top-0 z-10 bg-light py-4 px-6 flex items-center justify-between border-b border-border-200 border-opacity-75">
        <div className="flex text-accent font-semibold">
          <CartCheckBagIcon className="flex-shrink-0" width={24} height={22} />
          <span className="flex ms-2">{formatString(totalUniqueItems, t('text-item'))}</span>
        </div>
        <button
          onClick={() => closeSidebar()}
          className="w-7 h-7 ms-3 -me-2 flex items-center justify-center rounded-full text-muted bg-gray-100 transition-all duration-200 focus:outline-none hover:bg-accent focus:bg-accent hover:text-light focus:text-light"
        >
          <span className="sr-only">{t('text-close')}</span>
          <CloseIcon className="w-3 h-3" />
        </button>
      </header>
      {/* End of cart header */}

      <AnimateSharedLayout>
        <motion.div layout className="flex-grow pt-16">
          {items.length > 0 ? (
            items?.map((item) => <CartItem item={item} key={item.id} />)
          ) : (
            <motion.div
              layout
              initial="from"
              animate="to"
              exit="from"
              variants={fadeInOut(0.25)}
              className="h-full flex flex-col items-center justify-center"
            >
              <EmptyCartIcon width={140} height={176} />
              <h4 className="mt-6 text-base font-semibold">{t('text-no-products')}</h4>
            </motion.div>
          )}
        </motion.div>
      </AnimateSharedLayout>
      {/* End of cart items */}

      <footer className="sticky start-0 bottom-0 w-full py-5 px-6 z-10 bg-light">
        <CartVoucher coupon={coupon} setCoupon={setCoupon} />

        {requireShipping && shippingData?.findManyShipping?.length > 0 && (
          <ShippingPicker setShippingId={setShippingId} options={shippingData?.findManyShipping} />
        )}

        <button
          className="flex justify-between w-full h-12 md:h-14 p-1 text-sm font-bold bg-accent rounded-full shadow-700 transition-colors focus:outline-none hover:bg-accent-hover focus:bg-accent-hover"
          onClick={() => handleCheckout()}
          disabled={!items.length}
        >
          <span className="flex flex-1 items-center h-full px-5 text-light">{t('text-checkout')}</span>
          <span className="flex items-center flex-shrink-0 h-full bg-light text-accent rounded-full px-5">
            {totalPrice}
          </span>
        </button>
      </footer>
      {/* End of footer */}
    </section>
  );
};

export default CartSidebarView;
