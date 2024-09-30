import { Card } from '@mui/material';
import Image from 'next/image';
import dayjs from 'dayjs';

import usePrice from '@utils/use-price';
import { useTranslation } from 'next-i18next';
import { useSettings } from '@contexts/settings.context';


interface Props {
  request: any;
}

const RequestOwnDetails = ({ request }: Props) => {
  const { t } = useTranslation('common');
  const { t: tRequest } = useTranslation('request');
  const { requestStatus, name, description, price, subject, url, page, message, days, expiredAt, imageObj, acceptBefore, walletAddress, transactionHash } = request ?? {};
  const website = useSettings()

  // const { price } = usePrice({
  //   amount: request?.price,
  // });

  return (
    <div className="mb-5 p-4 shadow-md rounded-xl bg-white">
      <div className="mb-5">
        <div className="overflow-hidden mb-2">{tRequest('request-label-status')}</div>
        <div className="bg-gray-100 rounded-lg  px-3">{tRequest(`request-label-status-${requestStatus}`)}</div>
      </div>
      {(website?.paymentMethod === 'crypto' && (requestStatus === 'active' || requestStatus === 'completed')) && <div className="mb-5">
        <div className="overflow-hidden mb-2">{t('wallet-address')}</div>
        <div className="bg-gray-100 rounded-lg  px-3">{walletAddress}</div>
      </div>}
      {(website?.paymentMethod === 'crypto' && (requestStatus === 'active' || requestStatus === 'completed')) && <div className="mb-5">
        <div className="overflow-hidden mb-2">{t('transaction-hash')}</div>
        <div className="bg-gray-100 rounded-lg  px-3">{transactionHash}</div>
      </div>}
      <div className="mb-5">
        <div className="overflow-hidden mb-2">{tRequest('request-label-subject')}</div>
        <div className="bg-gray-100 rounded-lg  px-3">{subject}</div>
      </div>
      <div className="mb-5">
        <div className="overflow-hidden mb-2">{tRequest('request-label-subject')}</div>
        <div className="bg-gray-100 rounded-lg  px-3">{subject}</div>
      </div>
      <div className="mb-5">
        <div className="overflow-hidden mb-2">{tRequest('request-label-message')}</div>
        <div className="bg-gray-100 rounded-lg  px-3">{message}</div>
      </div>
      <div className="mb-5">
        <div className="overflow-hidden mb-2">{tRequest('request-label-days')}</div>
        <div className="bg-gray-100 rounded-lg  px-3">{days}</div>
      </div>
      <div className="mb-5">
        <div className="overflow-hidden mb-2">{tRequest('request-label-price')}</div>
        <div className="bg-gray-100 rounded-lg  px-3 flex">
          <span className='mr-1'>{price}</span>
          <span>{website?.paymentMethod === 'crypto' ? website?.chain?.iconUrl ? <img src={website?.chain?.iconUrl} alt={website?.chain?.name} /> : website?.chain?.name : website?.currencyCode ? website?.currencyCode : 'usd'}</span>
        </div>
      </div>
      {/* <div className="mb-5">
        <div className="overflow-hidden mb-2">{tRequest('request-label-accept-before')}</div>
        <div className="bg-gray-100 rounded-lg  px-3">{dayjs(acceptBefore).format('MMMM D, YYYY')}</div>
      </div> */}
      {(requestStatus === 'active ' || requestStatus === 'complete') && <div className="mb-5">
        <div className="overflow-hidden mb-2">{tRequest('request-label-expired')}</div>
        <div className="bg-gray-100 rounded-lg  px-3">{expiredAt ? dayjs(expiredAt).format('MMMM D, YYYY') : '-'}</div>
      </div>}
      <div className="mb-5">
        <div className="overflow-hidden mb-2">{tRequest('request-label-image')}</div>
        <div style={{ position: 'relative', width: '250px' }} className=" px-3 flex items-center justify-center">
          <img
            src={imageObj?.url ?? '/product-placeholder.svg'}
          />
        </div>
      </div>
      <div className="mb-5">
        <div className="overflow-hidden mb-2">{tRequest('request-label-name')}</div>
        <div className="bg-gray-100 rounded-lg  px-3">{name}</div>
      </div>
      <div className="mb-5">
        <div className="overflow-hidden mb-2">{tRequest('request-label-description')}</div>
        <div className="bg-gray-100 rounded-lg  px-3">{description}</div>
      </div>
      <div className="mb-5">
        <div className="overflow-hidden mb-2">{tRequest('request-label-url')}</div>
        <div className="bg-gray-100 rounded-lg  px-3">{url}</div>
      </div>
    </div>
  );
};

export default RequestOwnDetails;
