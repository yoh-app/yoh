import { useEffect } from 'react';
import NProgress from 'nprogress';
// next
import { useRouter } from 'next/router';
// @mui
import { useTheme } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';

import { useSettings } from '@contexts/settings.context';

import { themes } from '@themes/index';

// ----------------------------------------------------------------------

export default function ProgressBar() {
  const theme = useTheme();
  const router = useRouter();

  const settings = useSettings();
  const themeColor = settings.themeColor ?? 'base';
  NProgress.configure({ showSpinner: false });

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <GlobalStyles
      styles={{
        '#nprogress': {
          pointerEvents: 'none',
          '& .bar': {
            top: 0,
            left: 0,
            height: 2,
            width: '100%',
            position: 'fixed',
            zIndex: theme.zIndex.snackbar,
            backgroundColor: themes[themeColor].accent400,
            boxShadow: `0 0 2px ${themes[themeColor].accent400}`,
          },
          '& .peg': {
            right: 0,
            opacity: 1,
            width: 100,
            height: '100%',
            display: 'block',
            position: 'absolute',
            transform: 'rotate(3deg) translate(0px, -4px)',
            boxShadow: `0 0 10px ${themes[themeColor].accent400}, 0 0 5px ${themes[themeColor].accent400}`,
          },
        },
      }}
    />
  );
}
