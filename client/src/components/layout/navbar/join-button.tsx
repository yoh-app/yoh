import { useRouter } from 'next/router';
import Button from '@components/ui/button';
import { useModalAction } from '@components/ui/modal/modal.context';
import { useTranslation } from 'next-i18next';
import { ROUTES } from "@utils/routes";

export default function JoinButton() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();
  function handleJoin() {
    // if (process.env.NEXT_PUBLIC_AUTH === 'magic') {
    //   router.push(`${ROUTES.LOGIN}`);
    //   // return openModal('MAGIC_VIEW');
    // } else {
    return openModal('LOGIN_VIEW');
    // }
  }
  return (
    <Button className="font-semibold" size="small" onClick={handleJoin}>
      {t('join-button')}
    </Button>
  );
}
