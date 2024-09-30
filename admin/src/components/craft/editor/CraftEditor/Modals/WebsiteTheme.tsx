import React, { useEffect, useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import {
  useUpdateOneWebsiteMutation,
  useUpdateOnePageMutation,
} from 'generated';
import { CraftContext } from '../../CraftContext';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Upload from 'components/upload/Upload';
import Preview from 'components/upload/Preview';
// import { themes } from 'theme/client/themes'
import Spinner from 'admin/components/Spinner';
import { themes } from 'client/src/themes'

const WebsiteTheme = ({ }) => {
  const { setView, pageData, permissionData, websiteData, setLoading, loading } = useContext(CraftContext);
  const { query } = useRouter();
  const [updatePage] = useUpdateOnePageMutation();
  const [updateWebsite] = useUpdateOneWebsiteMutation();
  const [websiteThemeColor, setWebsiteThemeColor] = useState(null);
  const [pageNavColor, setPageNavColor] = useState('black');
  const [websiteLogoImage, setWebsiteLogoImage] = useState(null);
  const { t } = useTranslation('design');

  useEffect(() => {
    if (pageData?.navColor) {
      setPageNavColor(pageData?.navColor);
    }
    if (websiteData?.themeColor) {
      setWebsiteThemeColor(websiteData?.themeColor);
    }
    if (websiteData?.imageObj) {
      setWebsiteLogoImage(websiteData?.imageObj);
    }
  }, [websiteData, pageData]);
  return (
    <div>
      <Typography
        variant="h6"
        sx={{
          color: '#4B5971',
          fontSize: '18px',
          lineHeight: '28px',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* <img className="w-[16px] mr-3" src="/icons/collection.svg" /> */}
        {t('WebsiteAdmin.DesignPage.AddItem.theme.title')}
      </Typography>
      <>
        <div className="py-2">
          <InputLabel >{t('WebsiteAdmin.DesignPage.AddItem.theme.navColor')}</InputLabel>
          <Select
            style={{ color: 'black' }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={pageNavColor}
            onChange={(e) => setPageNavColor(e.target.value)}
          >
            <MenuItem value={'black'}>{t('WebsiteAdmin.DesignPage.AddItem.theme.black')}</MenuItem>
            <MenuItem value={'white'}>{t('WebsiteAdmin.DesignPage.AddItem.theme.white')}</MenuItem>
          </Select>
        </div>

        <div className="py-2">
          <InputLabel >{t('WebsiteAdmin.DesignPage.AddItem.theme.themeColor')}</InputLabel>
          <div style={{ flexWrap: 'wrap', display: 'flex' }}>{Object.keys(themes).filter((key) => key !== 'base').map((key) => {
            return <div onClick={() => setWebsiteThemeColor(key)} style={{ border: key === websiteThemeColor ? '2px black solid' : '', margin: '5px', width: '20px', height: '20px', borderRadius: '20px', backgroundColor: themes?.[key]?.accent400 }}></div>
          })}</div>

          {/* <Select
            style={{ color: 'black' }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={buttonColor}
            label="Page navbar color"
            onChange={(e) => setButtonColor(e.target.value)}
          >
            <MenuItem value={'red'}>Red</MenuItem>
            <MenuItem value={'blue'}>Blue</MenuItem>
            <MenuItem value={'purple'}>Purple</MenuItem>
          </Select> */}
        </div>

        <Upload
          id={websiteData?.id ?? 'new'}
          path={permissionData?.admin + '/' + permissionData?.[permissionData?.admin] + '/Website'}
          attachmentType={'image'}
          maxFileSize={10000000000}
          autoProceed={false}
          maxNumberOfFiles={1}
          onComplete={(newFiles) => setWebsiteLogoImage(newFiles[0])}
        />
        {websiteLogoImage && (
          <Preview
            showPreview={true}
            onChange={(newValue) => {
              setWebsiteLogoImage(newValue);
            }}
            files={[websiteLogoImage]}
            isMultiple={false}
          />
        )}
        <div className="py-2 text-center">
          <Button
            style={{ background: 'black' }}
            variant="contained"
            onClick={async () => {
              setLoading(true)
              await updatePage({
                variables: {
                  where: {
                    id: pageData?.id,
                  },
                  data: {
                    navColor: { set: pageNavColor },
                  },
                },
              });
              await updateWebsite({
                variables: {
                  where: {
                    id: websiteData?.id,
                  },
                  data: {
                    imageObj: websiteLogoImage,
                    themeColor: { set: websiteThemeColor },
                  },
                },
              });
              setLoading(false)

              setView(null);
            }}
          >
            <img className="mr-2" src="/icons/check-white.svg" />
            {t('WebsiteAdmin.DesignPage.AddItem.theme.save')}
          </Button>
        </div>
      </>
    </div>
  );
};
export default WebsiteTheme