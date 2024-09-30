import { Card } from '@mui/material';

// import NotFound from '@components/common/not-found';
import usePrice from '@utils/use-price';
// import { formatAddress } from '@utils/format-address';
import { useTranslation } from 'next-i18next';
// import { OrderItems } from './order-items-table';
// import isEmpty from 'lodash/isEmpty';
// import processItem from '@process/item';
import Link from 'next/link';
import OrderItems from './order-items';
import { useSettings } from '@contexts/settings.context';

interface Props {
  order: any;
}

const OrderDetails = ({ order }: Props) => {
  const { t } = useTranslation('common');
  const { coupon, orderedProducts, status, shipping_address, billing_address, tracking_number } = order ?? {};
  const website = useSettings()

  const { price: amount } = usePrice({
    amount: order?.amount,
  });
  // const { price: discount } = usePrice({
  //   amount: order?.discount,
  // });
  // const { price: total } = usePrice({
  //   amount: order?.total,
  // });
  // const { price: delivery_fee } = usePrice({
  //   amount: order?.delivery_fee,
  // });
  // const { price: sales_tax } = usePrice({
  //   amount: order?.sales_tax,
  // });
  const { price: amount_off } = usePrice({
    amount: -1 * order?.coupon?.amount_off,
  });
  const { price: percent_off } = usePrice({
    amount: (-1 * order?.coupon?.percent_off * order?.amount) / 100,
  });

  return (
    <div
      className="mb-5 p-4 border-2 rounded-xl shadow-md bg-white"
    >
      {website?.paymentMethod === 'crypto' && <div className="flex justify-between items-center px-3 bg-amber-50 rounded-lg">
        <span className="overflow-hidden flex-shrink-0">{t('wallet-address')}</span>
        <span className="ms-1">{order?.walletAddress}</span>
      </div>}
      {website?.paymentMethod === 'crypto' && <div className="flex justify-between items-center px-3 bg-amber-50 rounded-lg mt-3">
        <span className="overflow-hidden flex-shrink-0">{t('transaction-hash')}</span>
        <span className="ms-1">{order?.transactionHash}</span>
      </div>}
      {orderedProducts?.length ? (
        <>
          <div className="mt-4 mb-3 font-bold">{t('text-product')}</div>
          {orderedProducts.map((item, index) => {
            return (
              <Link href={`/products/${item.product.slug}`}>
                <a>
                  <div key={index} className="bg-gray-100 px-3 rounded-lg mb-3">
                    <div className="flex justify-between">
                      <span>{item.name}</span>
                      <div className='flex'><span className='mr-1'>{`${item.price}`}</span>
                        <span>{website?.paymentMethod === 'crypto' ? website?.chain?.iconUrl ? <img src={website?.chain?.iconUrl} alt={website?.chain?.name} /> : website?.chain?.name : website?.currencyCode ? website?.currencyCode : 'usd'}</span>
                      </div>
                    </div>
                    <OrderItems list={item.orderedAudios} type="audio" />
                    <OrderItems list={item.orderedLinks} type="link" />
                    <OrderItems list={item.orderedVideos} type="video" />
                  </div>
                </a>
              </Link>
            );
          })}
        </>
      ) : (
        []
      )}
    </div>
  );
};

export default OrderDetails;
