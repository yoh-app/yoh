import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { fadeInOut } from '@utils/motion/fade-in-out';
import RequestCardDesktop from './request-card';

const RequestBlock: React.FC<Record<string, any>> = ({ requests, showRequests }) => {
  const { t } = useTranslation('common');

  if (!showRequests) {
    return null;
  }

  return (
    <div className="hidden md:block">
      <AnimatePresence>
        {showRequests && (
          <motion.div
            initial="from"
            animate="to"
            exit="from"
            variants={fadeInOut(0.4)}
            style={{
              width: '300px',
              backgroundColor: '#FFFFFF',
              position: 'fixed',
              right: '0',
              top: '80px',
              padding: '20px',
              overflow: 'scroll',
              bottom: '0',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 1,
            }}
          >
            <div className="mt-1 text-lg">
              <img className="inline align-middle" width={18} src="/icons/earth.png" />
              <span className="ml-2 inline align-middle">{t('text-explore')}</span>
            </div>
            <div className="overflow-auto snap-y mt-3">
              {requests?.map((request: Record<string, any>, index: number) => {
                return (
                  <RequestCardDesktop
                    imgWidth={260}
                    imgHeight={170}
                    imgLayout="fixed"
                    className="mb-6"
                    request={request}
                    key={index}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RequestBlock;
