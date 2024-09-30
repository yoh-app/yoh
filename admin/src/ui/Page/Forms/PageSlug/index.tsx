import { useTheme } from '@mui/material/styles';
import { Button, TextField } from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import Label from 'components/ui/label';
import { useEffect, useState } from 'react';
import { useFindManyPageQuery } from 'generated';
import { useTranslation } from 'next-i18next';
const PageSlug = ({ action, register, errors, handleSubmit, setValue, getValues, watch, data }) => {
  const theme = useTheme();
  const [slug, setSlug] = useState(data?.slug);
  const [search, setSearch] = useState(false);
  const { t } = useTranslation('admin');
  const { data: pageData, refetch } = useFindManyPageQuery({
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
    if (search && pageData) {
      if (pageData?.findManyPage?.length > 0) {
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
  }, [pageData, search]);

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
          disabled={pageData?.findManyPage?.length > 0 || !slug?.match(/[a-zA-Z0-9 ]/g)}
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
  hideOn: { field: { name: 'isExternalLink', operator: '===', value: true } },
  disableOn: null,
  component: PageSlug,
  intl: {
    titleId: '_Admin.Website._PageGroup.Media._Page.Page._Form.PageSlug._Title',
    title: 'PageSlug',
    descriptionId: '_Admin.Website._PageGroup.Media._Page.Page._Form.PageSlug._Description',
    description: 'PageSlug Description',
  },
  order: 6,
};
