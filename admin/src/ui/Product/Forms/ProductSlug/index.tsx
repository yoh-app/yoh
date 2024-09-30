import { useTheme } from '@mui/material/styles';
import { Button, TextField } from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import Label from 'components/ui/label';
import { useEffect, useState } from 'react';
import { useFindManyProductQuery } from 'generated';
import { useTranslation } from 'next-i18next';

const ProductSlug = ({ action, register, errors, handleSubmit, setValue, getValues, watch, data }) => {
  const theme = useTheme();
  const [slug, setSlug] = useState(data?.slug);
  const [search, setSearch] = useState(false);
  const { t } = useTranslation('admin');

  const { data: productData, refetch } = useFindManyProductQuery({
    variables: {
      where: {
        active: {
          equals: true,
        },
        slug: {
          equals: slug,
        },
      },
    },
  });

  useEffect(() => {
    if (search && productData) {
      if (productData?.findManyProduct?.length > 0) {
        setSlug(data?.slug);
        alert(t('slugExist'));
      } else {
        setValue('slug', slug, {
          shouldValidate: true,
          shouldDirty: true,
        });
        alert(t('slugAllowed'));
      }
      setSearch(false);
    }
  }, [productData, search]);

  return (
    <div>
      <div className="p-2">
        <Label>{t('slugVerify')}</Label>
        <TextField
          onChange={(e) => setSlug(e.target.value.toLowerCase())}
          size="small"
          fullWidth
          value={slug}
        ></TextField>
      </div>
      <div className="p-2">
        <Button
          disabled={productData?.findManyProduct?.length > 0 || !slug?.match(/[a-zA-Z0-9 ]/g)}
          type="button"
          variant="outlined"
          color="inherit"
          style={{ borderColor: theme.palette.grey[700] }}
          startIcon={<Check />}
          onClick={async () => {
            setSearch(true);
            await refetch();
          }}
        >
          {t('verify')}
        </Button>
      </div>
    </div>
  );
};

export default {
  custom: true,
  hideOn: { action: 'view' },
  disableOn: null,
  component: ProductSlug,
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ProductSlug._Title',
    title: 'ProductSlug',
    descriptionId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ProductSlug._Description',
    description: 'ProductSlug Description',
  },
  order: 11,
};
