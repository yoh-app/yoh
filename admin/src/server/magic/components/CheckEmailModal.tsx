import * as React from 'react';

import Button from './Button';
import { useAuth } from './AuthProvider';
// import graphql from 'client/graphql/queries';
import { useQuery } from 'react-query';

// import styles from '../styles/Login.module.css';

import { useTranslation } from 'next-i18next';
// import EmailVerificationSVG from '../../../public/images/emailVerification.svg';

export default function CheckEmailModal({ dismiss, jwtToken, phrase }) {
  const { t } = useTranslation('login');
  const auth = useAuth();
  const [watch, setWatch] = React.useState(!auth?.isAuthenticated);
  const approved = useQuery(
    'watchLoginRequest',
    async () => {
      const response = await fetch('/api/magic/watch', {
        method: 'POST',
        body: JSON.stringify(jwtToken),
        credentials: 'include',
      });
      if (response.status === 200) {
        const json = await response.json();
        if (json === true) {
          setWatch(false);
        }
        return json;
      } else {
        return null;
      }
    },
    {
      refetchInterval: !auth?.isAuthenticated && watch ? 3000 : false,
      // refetchIntervalInBackground: !auth?.isAuthenticated && watch,
    }
  );
  // const approved = graphql.watchLoginRequest(jwtToken);

  // stop watching request after 10 min
  const timeoutRef = React.useRef(null);
  React.useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      setWatch(false);
    }, 600000);
  }, []);

  React.useEffect(async () => {
    if (approved?.data && !auth?.isAuthenticated) {
      await auth.actions.completeLogin();
    }
  }, [approved]);

  React.useEffect(() => {
    if (auth.isAuthenticated) {
      dismiss();
    }
  }, [auth.isAuthenticated]);

  async function handleCancel() {
    await auth.actions.logout();
    dismiss();
  }

  return (
    <div className={styles.checkEmailModal}>
      <div className={styles.checkEmailModalKeepThisTab}>
        {t('WebsiteAdmin.CheckEmailModal.keep')}
      </div>
      <div>{t('WebsiteAdmin.CheckEmailModal.description')}</div>
      <img className="mt-5" src={EmailVerificationSVG.src} />
      <Button className={styles.magicWords}>{phrase}</Button>
      <Button className={styles.cancelButton} onClick={handleCancel}>
        {t('WebsiteAdmin.CheckEmailModal.cancel')}
      </Button>
    </div>
  );
}
