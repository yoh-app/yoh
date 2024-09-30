import NProgress from 'nprogress';
import { Router } from 'next/router';
// material
import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/styles';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// ----------------------------------------------------------------------

const nprogressStyle = makeStyles((theme: Theme) =>
  createStyles({
    '@global': {
      '#nprogress': {
        pointerEvents: 'none',
        '& .bar': {
          top: 0,
          left: 0,
          height: 2,
          width: '100%',
          position: 'fixed',
          zIndex: theme.zIndex.snackbar,
          backgroundColor: theme.palette.primary.main,
          boxShadow: `0 0 2px ${theme.palette.primary.main}`,
        },
        '& .peg': {
          right: 0,
          opacity: 1,
          width: 100,
          height: '100%',
          display: 'block',
          position: 'absolute',
          transform: 'rotate(3deg) translate(0px, -4px)',
          boxShadow: `0 0 10px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main}`,
        },
      },
    },
  })
);

export default function TopProgressBar() {
  nprogressStyle();

  return null;
}
