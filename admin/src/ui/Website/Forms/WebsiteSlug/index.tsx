import { useTheme } from '@mui/material/styles';
import { Button, TextField } from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import Label from 'components/ui/label';
import { useEffect, useState } from 'react';
import { useFindManyWebsiteQuery, useFindManyProductQuery, usePermissionQuery } from 'generated';
import { useTranslation } from 'next-i18next';

const WebsiteSlug = ({ action, register, errors, handleSubmit, setValue, getValues, watch, data }) => {
  const theme = useTheme();
  const [slug, setSlug] = useState(data?.slug);
  const [search, setSearch] = useState(false);
  const { t } = useTranslation('admin');

  const { data: permissionData } = usePermissionQuery();
  const { data: websiteData, refetch } = useFindManyWebsiteQuery({
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
    skip: !search || !slug,
  });

  const { data: productData } = useFindManyProductQuery({
    variables: {
      where: {
        editionAddress: {
          not: {
            equals: null,
          },
        },
        isExternalNft: {
          not: {
            equals: true
          }
        },
        website: {
          id: {
            equals: permissionData?.permission?.Website,
          },
        },
      },
    },
    skip: !permissionData?.permission?.Website,
  });
  console.log(productData);

  useEffect(() => {
    if (search && websiteData) {
      if (websiteData?.findManyWebsite?.length > 0) {
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
  }, [websiteData, search]);

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
  hideOn: null,
  disableOn: null,
  component: WebsiteSlug,
  intl: {
    titleId: '_Admin.User._PageGroup.Website._Page.Website._Form.WebsiteSlug._Title',
    title: 'WebsiteSlug',
    descriptionId: '_Admin.User._PageGroup.Website._Page.Website._Form.WebsiteSlug._Description',
    description: 'WebsiteSlug Description',
  },
  order: 2,
};
