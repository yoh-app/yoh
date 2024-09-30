import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Link from '@/components/ui/link';

type SectionProps = {
  className?: any;
  title?: string;
  href?: string;
  children?: React.ReactNode;
};

/**
 * UI component for a section block
 * @param {string} title - The title of the section
 * @param {string} description - The description of the section
 * @param {string} href - The href of the external page for this section
 */

const SectionBlock: React.FC<SectionProps> = ({
  className,
  title,
  href,
  children,
}) => {
  const { t } = useTranslation('common');
  return (
    <div
      className={cn(
        'flex w-full flex-col px-7 pb-[40px] xl:px-16 xl:pb-[54px] 3xl:pb-[60px]',
        className
      )}
    >
      {title && (
        <div className="flex items-center justify-between mb-7 ">
          {title && (
            <h3 className="text-2xl font-semibold lg:text-[27px] 3xl:text-3xl">
              {t(title)}
            </h3>
          )}
          {href && (
            <Link
              href={href}
              className="justify-end text-base font-semibold transition-colors hover:text-orange-500"
            >
              {t('text-see-all')}
            </Link>
          )}
        </div>
      )}

      {children}
    </div>
  );
};

export default SectionBlock;
