import { useModalAction } from '@components/ui/modal/modal.context';
import { useTranslation } from 'next-i18next';

export default function JoinButton() {
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();
  function handleRequest() {
    return openModal('REQUEST_VIEW');
  }
  return (
    <a className="cursor-pointer" onClick={handleRequest}>
      <img width={32} src="/icons/hand-shake.png" />
    </a>
  );
}
