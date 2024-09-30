import { forwardRef } from 'react';
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<any, Props>(({ disabledLink = false, sx }, ref) => {
  const theme = useTheme();

  const logo = (
    <Box ref={ref} sx={{ height: 40, cursor: 'pointer', ...sx }} className="flex items-center">
      <img style={{ width: '45px', height: '45px' }} src="/logo/logo-white.svg" />
      {/* <span style={{ fontWeight: '800' }}>yoh.app</span> */}
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <NextLink href={process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_LANDING_URL : 'https://www.yoh.app'}>{logo}</NextLink>;
});

export default Logo;
