import { useStripeAccountStatusQuery } from 'generated';
import { useTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';
const StripeAccount = () => {
  const { data: stripeData } = useStripeAccountStatusQuery();
  const theme = useTheme();
  const stripeUrl = stripeData?.stripeAccountStatus?.accountLink?.url;
  const BORDER_COLOR = stripeUrl ? theme.palette.grey[700] : undefined;
  const { t } = useTranslation('admin');
  return (
    <div>
      <p>{t('stripe.verifyMessage')}</p>
      <br />
      {stripeData?.stripeAccountStatus?.accountLink === 'access' ? (
        <p className="text-green-500">{t('verified')}</p>
      ) : stripeData?.stripeAccountStatus?.accountLink?.url ? (
        <Button
          type="button"
          variant="outlined"
          color="inherit"
          style={{ borderColor: BORDER_COLOR }}
          endIcon={<ArrowForwardIos style={{ fontSize: 8 }} />}
          href={stripeUrl}
          disabled={!stripeUrl}
        >
          {t('verify')}
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default {
  custom: true,
  hideOn: { action: 'create' },
  disableOn: null,
  component: StripeAccount,
  intl: {
    titleId: '_Admin.Website._PageGroup.Website._Page.Website._Form.StripeAccount._Title',
    title: 'StripeAccount',
    descriptionId: '_Admin.Website._PageGroup.Website._Page.Website._Form.StripeAccount._Description',
    description: 'StripeAccount Description',
  },
  order: 7,
};
