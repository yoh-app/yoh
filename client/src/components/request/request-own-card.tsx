import { useState } from 'react';
import Image from 'next/image';
import usePrice from '@utils/use-price';
import dayjs from 'dayjs';
import { Button, Card, Chip, Collapse } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import Link from 'next/link'
// import Link from '@components/ui/link';
import { useSettings } from '@contexts/settings.context';

type OrderCardProps = {
  order: any;
  isActive: boolean;
  onClick?: (e: any) => void;
};

const chipColorMap: Record<string, any> = {
  'pending': {
    color: '#CB6767',
    backgroundColor: 'rgba(203, 103, 103, 0.16)'
  },
  'processing': {
    color: '#AB5BBF',
    backgroundColor: 'rgba(171, 91, 191, 0.16)'
  },
  'completed': {
    color: '#39AB97',
    backgroundColor: 'rgba(57, 171, 151, 0.16)'
  },
}

const RequestOwnCard: React.FC<OrderCardProps> = ({ onClick, request, isActive }) => {
  const { t } = useTranslation('common');
  const { t: tRequest } = useTranslation('request');
  const [open, setOpen] = useState(false);
  const { name, description, subject, url, page, message, days, createdAt, expiredAt, imageObj, acceptBefore, price, transactionHash, walletAddress, requestStatus, id } = request;
  // const { price } = usePrice({
  //   amount: request?.price,
  // });
  const website = useSettings()

  const handleClick = () => {
    setOpen(!open);
  };


  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className={`mb-5 p-4 rounded-xl shadow-md bg-white border-2 ${isActive ? 'border-accent' : ''}`} >
        {requestStatus === 'processing' && <Link href={`/request?requestId=${id}`}><Chip label={tRequest('request-label-pay')} size="large" style={{ borderRadius: "6px", ...chipColorMap[requestStatus], width: '100%' }} /></Link>}

        <div className="flex justify-between items-center mb-2 md:mb-5">
          <span className="flex font-bold text-sm lg:text-base text-heading me-4 flex-shrink-0">
            <span className="font-normal">{tRequest(`request-label-status-${requestStatus}`)}</span>
          </span>
          {/* {requestStatus === 'processing' && <div><Link href={`/request?requestId=${id}`}>{tRequest('request-label-pay')}</Link></div>} */}
          {/* <Chip sx={{ display: { xs: 'none', md: 'flex' } }} label={t(`text-${requestStatus}`)} size="small" style={{ borderRadius: "6px", ...chipColorMap[requestStatus] }} /> */}
        </div>
        <div className="flex justify-between items-center mb-2 md:mb-5">
          <span className="flex font-bold text-sm lg:text-base text-heading me-4 flex-shrink-0">
            <span className="font-normal">{name}</span>
          </span>
          {/* <Chip sx={{ display: { xs: 'none', md: 'flex' } }} label={t(`text-${requestStatus}`)} size="small" style={{ borderRadius: "6px", ...chipColorMap[requestStatus] }} /> */}
        </div>

        {/* <Chip sx={{ display: { xs: 'inline-flex', md: 'none' } }} className="mb-3" label={t(`text-${requestStatus}`)} size="small" style={{ borderRadius: "6px", ...chipColorMap[requestStatus] }} /> */}
        <div className="flex justify-between items-center  px-3 bg-amber-50 rounded-lg mb-2">
          <span className="overflow-hidden flex-shrink-0">{t('text-request-clicks')}</span>
          <span className="ms-1">
            <Link href='#' className="underline">{request?.requestClicks?.length ?? 0}</Link>
          </span>
        </div>
        <div className="flex justify-between items-center  px-3 bg-gray-100 rounded-lg mb-3">
          <span className="overflow-hidden flex-shrink-0">{t('text-request-subject')}</span>
          <span className="ms-1">
            <Link href='#' className="underline">{subject}</Link>
          </span>
        </div>
        <div className="flex justify-between items-center  px-3 bg-amber-50 rounded-lg mb-2">
          <span className="overflow-hidden flex-shrink-0">{t('text-request-page')}</span>
          <span className="ms-1">
            <Link href={`/pages/${page?.slug}`} className="underline">{page?.name}</Link>
          </span>
        </div>
        <div className="flex justify-between items-center  px-3 bg-gray-100 rounded-lg mb-3">
          <span className="overflow-hidden flex-shrink-0">{t('text-request-createdAt')}</span>
          <span className="ms-1">
            <Link href='#' className="underline">{new Date(createdAt).toDateString()}</Link>
          </span>
        </div>
        {expiredAt && <div className="flex justify-between items-center  px-3 bg-amber-50 rounded-lg mb-2">
          <span className="overflow-hidden flex-shrink-0">{t('text-request-expiredAt')}</span>
          <span className="ms-1">
            <Link href={`/pages/${page?.slug}`} className="underline">{new Date(expiredAt).toDateString()}</Link>
          </span>
        </div>}

        <Collapse className="lg:hidden" in={open} timeout="auto" unmountOnExit>
          <div>
            <div className="text-sm text-gray-800 mt-3 mb-2">{tRequest('request-detail-description')}</div>
            {website?.paymentMethod === 'crypto' && transactionHash && <div className="mb-5">
              <div className="overflow-hidden mb-2">{t('transaction-hash')}</div>
              <div style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }} className="bg-gray-100 rounded-lg  px-3">{transactionHash}</div>
            </div>}
            {website?.paymentMethod === 'crypto' && walletAddress && <div className="mb-5">
              <div className="overflow-hidden mb-2">{t('wallet-address')}</div>
              <div style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }} className="bg-gray-100 rounded-lg  px-3">{walletAddress}</div>
            </div>}
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
            {expiredAt && <div className="mb-5">
              <div className="overflow-hidden mb-2">{tRequest('request-label-expired')}</div>
              <div className="bg-gray-100 rounded-lg  px-3">{expiredAt}</div>
            </div>}
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
            <div className="mb-5">
              <div className="overflow-hidden mb-2">{tRequest('request-label-image')}</div>
              <div className=" px-3 flex items-center justify-center">
                <img
                  style={{ width: '200px', height: '200px', objectFit: 'contain' }}
                  src={imageObj?.url ?? '/product-placeholder.svg'}
                  alt={name}
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
        </Collapse>
        <Button sx={{ display: { lg: 'none' } }} onClick={handleClick} fullWidth style={{ color: '#B8B8B8' }}>
          {
            open ? (
              <IoIosArrowUp />
            ) : (
              <IoIosArrowDown />
            )
          }
        </Button>
      </div>
    </div>
  );
};

export default RequestOwnCard;
