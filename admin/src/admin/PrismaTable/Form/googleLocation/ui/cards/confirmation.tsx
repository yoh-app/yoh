import TrashIcon from '@/components/icons/trash';
import Button from '@/components/ui/button';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';

type ConfirmationCardProps = {
  onCancel: () => void;
  onDelete: () => void;
  title?: string;
  icon?: any;
  description?: string;
  cancelBtnClassName?: string;
  deleteBtnClassName?: string;
  cancelBtnText?: string;
  deleteBtnText?: string;
  cancelBtnLoading?: boolean;
  deleteBtnLoading?: boolean;
};

const Confirmation: React.FC<ConfirmationCardProps> = ({
  onCancel,
  onDelete,
  icon,
  title = 'button-delete',
  description = 'delete-item-confirm',
  cancelBtnText = 'button-cancel',
  deleteBtnText = 'button-delete',
  cancelBtnClassName,
  deleteBtnClassName,
  cancelBtnLoading,
  deleteBtnLoading,
}) => {
  const { t } = useTranslation('common');
  return (
    <div className="m-auto w-full max-w-sm rounded-md bg-light p-4 pb-6 sm:w-[24rem] md:rounded-xl">
      <div className="h-full w-full text-center">
        <div className="flex h-full flex-col justify-between">
          <span className="m-auto mt-4 text-accent">
            {icon ? icon : <TrashIcon className="h-12 w-12" />}
          </span>
          <p className="mt-4 text-xl font-bold text-heading">{t(title)}</p>
          <p className="px-6 py-2 leading-relaxed text-body-dark dark:text-muted">
            {t(description)}
          </p>
          <div className="mt-8 flex w-full items-center justify-between space-x-4 rtl:space-x-reverse">
            <div className="w-1/2">
              <Button
                onClick={onCancel}
                loading={cancelBtnLoading}
                disabled={cancelBtnLoading}
                variant="custom"
                className={cn(
                  'w-full rounded bg-accent py-2 px-4 text-center text-base font-semibold text-light shadow-md transition duration-200 ease-in hover:bg-accent-hover focus:bg-accent-hover focus:outline-none',
                  cancelBtnClassName
                )}
              >
                {t(cancelBtnText)}
              </Button>
            </div>

            <div className="w-1/2">
              <Button
                onClick={onDelete}
                loading={deleteBtnLoading}
                disabled={deleteBtnLoading}
                variant="custom"
                className={cn(
                  'w-full rounded bg-red-600 py-2 px-4 text-center text-base font-semibold text-light shadow-md transition duration-200 ease-in hover:bg-red-700 focus:bg-red-700 focus:outline-0',
                  deleteBtnClassName
                )}
              >
                {t(deleteBtnText)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
