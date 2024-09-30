// @ts-nocheck for typescript will show warning for dynamic import
import dynamic from 'next/dynamic';
import Modal from '@components/ui/modal/modal';
import { useModalAction, useModalState } from './modal.context';
import ShopProfileCard from '@components/profile/profile-card';
import OtpLoginView from '@components/auth/mobile-otp-login/otp-view';
const Login = dynamic(() => import('@components/auth/login'));
const Magic = dynamic(() => import('@components/auth/magic'));
const Request = dynamic(() => import('@components/request/request-form'));

const Register = dynamic(() => import('@components/auth/register'));
const ForgotPassword = dynamic(() => import('@components/auth/forget-password/forget-password'));
const ProductDetailsModalView = dynamic(() => import('@components/ui/product/product-details-modal-view'));
const CardDetailsModalView = dynamic(() => import('@components/collection/card-details-modal-view'));
const CreateOrUpdateAddressForm = dynamic(() => import('@components/address/address-form'));
const AddressDeleteView = dynamic(() => import('@components/address/address-delete-view'));

const ProductAttachmentModal = dynamic(() => import('@components/ui/productItem/attachment-modal'));
const ProductSelectWalletModal = dynamic(() => import('@components/ui/productItem/select-wallet-modal'));
const ProductPurchasedModal = dynamic(() => import('@components/ui/productItem/purchased-modal'));
const ProductQRCodeModal = dynamic(() => import('@components/ui/productItem/qr-code-modal'));
const ProductRedeemedModal = dynamic(() => import('@components/ui/productItem/redeemed-modal'));

type Props = {
  website: any;
};

const ManagedModal = (props:Props) => {
  const { website } = props;
  const { isOpen, view, data } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === 'REQUEST_VIEW' && <Request />}
      {view === 'LOGIN_VIEW' && <Login />}
      {view === 'MAGIC_VIEW' && <Magic />}
      {view === 'REGISTER' && <Register />}
      {view === 'FORGOT_VIEW' && <ForgotPassword />}
      {view === 'OTP_LOGIN' && <OtpLoginView />}
      {view === 'ADD_OR_UPDATE_ADDRESS' && <CreateOrUpdateAddressForm />}
      {view === 'DELETE_ADDRESS' && <AddressDeleteView />}
      {view === 'CARD_DETAILS' && <CardDetailsModalView card={data} />}
      {view === 'PRODUCT_DETAILS' && <ProductDetailsModalView productSlug={data} />}
      {view === 'SHOP_INFO' && (
        <ShopProfileCard
          data={data}
          cardClassName="!hidden"
          className="!flex flex-col !w-screen !h-screen !rounded-none"
        />
      )}

      {view === 'PRODUCT_ATTACHMENT_MODAL' && <ProductAttachmentModal />}
      {view === 'PRODUCT_SELECT_WALLET_MODAL' && <ProductSelectWalletModal website={website} />}
      {view === 'PRODUCT_PURCHASED_MODAL' && <ProductPurchasedModal website={website} />}
      {view === 'PRODUCT_QRCODE_MODAL' && <ProductQRCodeModal />}
      {view === 'PRODUCT_REDEEMED_MODAL' && <ProductRedeemedModal website={website} />}
    </Modal>
  );
};

export default ManagedModal;
