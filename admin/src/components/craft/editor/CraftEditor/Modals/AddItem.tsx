import React, { useEffect, useState, useContext } from 'react';
import { useEditor } from '@craftjs/core';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'next-i18next';
import { CraftContext } from '../../CraftContext';

const AddItem = ({ onClose }) => {
  const { t } = useTranslation('design');
  const { setView } = useContext(CraftContext);
  const [item, setItem] = useState(null);
  const [info, setInfo] = useState(null);
  const { query } = useEditor()
  const gridStyle = {
    background: '#F6F7F8',
    borderRadius: '10px',
    padding: '28px 10px',
    margin: '10px',
    cursor: 'pointer',
    textAlign: 'center',
    border: '1px solid #F6F7F8',
  };

  useEffect(() => {
    if (item) {
      setView(item)
    }
  }, [item])
  return (
    <div>
      <div className="w-full flex justify-between">
        <Typography
          sx={{
            color: '#4B5971',
            fontSize: '16px',
          }}
        >
          {t('WebsiteAdmin.DesignPage.addSection')}
        </Typography>
      </div>

      <div className="-mx-[10px] mt-[28px]">
        <Grid container>
          <Grid xs={12} md={4} item>
            <div
              onClick={() => setItem('block')}
              style={{ ...gridStyle, ...(item === 'block' && { borderColor: 'black' }) }}
            >
              {/* <AutoAwesomeMosaicIcon /> */}
              <div style={{ width: '60px' }} className="flex align-center mx-auto mb-4">
                <img src="/icons/block.svg" />
              </div>
              <div>{t('WebsiteAdmin.DesignPage.AddItem.block')}</div>
            </div>
            <div className="mx-[10px] pl-2 text-sm color-[#4B5971]">
              <div className="flex items-start cursor-pointer" onClick={() => setInfo('block')}>
                <img className="mr-1 mt-1" src="/icons/info-white.svg" />
                <span>{t('WebsiteAdmin.DesignPage.AddItem.block.title')}</span>
              </div>
              <div
                className={`border-l-4 border-[#4B5971] rounded-l-[2px] pl-2 mt-1 ${info === 'block' ? '' : 'hidden'
                  }`}
              >
                {t('WebsiteAdmin.DesignPage.AddItem.block.description')}
              </div>
            </div>
          </Grid>
          <Grid xs={12} md={4} item>
            <div
              onClick={() => setItem('page_collection')}
              style={{
                ...gridStyle,
                ...(item === 'page_collection' && { borderColor: 'black' }),
              }}
            >
              {/* <CollectionsIcon /> */}
              <div style={{ width: '60px' }} className="flex align-center mx-auto mb-4">
                <img src="/icons/file.svg" />
              </div>
              <div>{t('WebsiteAdmin.DesignPage.AddItem.page.collection')}</div>
            </div>
            <div className="mx-[10px] pl-2 text-sm color-[#4B5971]">
              <div
                className="flex items-start cursor-pointer"
                onClick={() => setInfo('page_collection')}
              >
                <img className="mr-1 mt-1" src="/icons/info-white.svg" />
                <span>{t('WebsiteAdmin.DesignPage.AddItem.page.collection.title')}</span>
              </div>
              <div
                className={`border-l-4 border-[#4B5971] rounded-l-[2px] pl-2 mt-1 ${info === 'page_collection' ? '' : 'hidden'
                  }`}
              >
                {t('WebsiteAdmin.DesignPage.AddItem.page.collection.description')}
              </div>
            </div>
          </Grid>
          <Grid xs={12} md={4} item>
            <div
              onClick={() => setItem('product_collection')}
              style={{
                ...gridStyle,
                ...(item === 'product_collection' && { borderColor: 'black' }),
              }}
            >
              {/* <CollectionsIcon /> */}
              <div style={{ width: '60px' }} className=" flex align-center mx-auto mb-4">
                <img src="/icons/collection.svg" />
              </div>
              <div>{t('WebsiteAdmin.DesignPage.AddItem.product.collection')}</div>
            </div>
            <div className="mx-[10px] pl-2 text-sm color-[#4B5971]">
              <div
                className="flex items-start cursor-pointer"
                onClick={() => setInfo('product_collection')}
              >
                <img className="mr-1 mt-1" src="/icons/info-white.svg" />
                <span>{t('WebsiteAdmin.DesignPage.AddItem.product.collection.title')}</span>
              </div>
              <div
                className={`border-l-4 border-[#4B5971] rounded-l-[2px] pl-2 mt-1 ${info === 'product_collection' ? '' : 'hidden'
                  }`}
              >
                {t('WebsiteAdmin.DesignPage.AddItem.product.collection.description')}
              </div>
            </div>
          </Grid>
          <Grid xs={12} md={4} item>
            <div
              onClick={() => setItem('video_collection')}
              style={{
                ...gridStyle,
                ...(item === 'video_collection' && { borderColor: 'black' }),
              }}
            >
              {/* <CollectionsIcon /> */}
              <div style={{ width: '60px' }} className=" flex align-center mx-auto mb-4">
                <img src="/icons/collection.svg" />
              </div>
              <div>{t('WebsiteAdmin.DesignPage.AddItem.product.collection')}</div>
            </div>
            <div className="mx-[10px] pl-2 text-sm color-[#4B5971]">
              <div
                className="flex items-start cursor-pointer"
                onClick={() => setInfo('video_collection')}
              >
                <img className="mr-1 mt-1" src="/icons/info-white.svg" />
                <span>{t('WebsiteAdmin.DesignPage.AddItem.product.collection.title')}</span>
              </div>
              <div
                className={`border-l-4 border-[#4B5971] rounded-l-[2px] pl-2 mt-1 ${info === 'product_collection' ? '' : 'hidden'
                  }`}
              >
                {t('WebsiteAdmin.DesignPage.AddItem.product.collection.description')}
              </div>
            </div>
          </Grid>
          {/* <Grid xs={3} item>
            <div
              onClick={() => setItem('embed')}
              style={{ ...gridStyle, ...(item === 'embed' && { borderColor: 'black' }) }}
            >
              <div className="w-[52px] h-[52px] flex align-center mx-auto mb-4">
                <img src="/icons/embed.svg" />
              </div>
              <div>{t('WebsiteAdmin.DesignPage.AddItem.embed')}</div>
            </div>
            <div className="mx-[10px] pl-2 text-sm color-[#4B5971]">
              <div className="flex items-start cursor-pointer" onClick={() => setInfo('embed')}>
                <img className="mr-1 mt-1" src="/icons/info-white.svg" />
                <span>{t('WebsiteAdmin.DesignPage.AddItem.embed.title')}</span>
              </div>
              <div
                className={`border-l-4 border-[#4B5971] rounded-l-[2px] pl-2 mt-1 ${info === 'embed' ? '' : 'hidden'
                  }`}
              >
                {t('WebsiteAdmin.DesignPage.AddItem.embed.description')}
              </div>
            </div>
          </Grid> */}
        </Grid>
      </div>

      {/* <div className="text-center mt-8">
        <Button variant="contained" onClick={() => setView(item)} disabled={!item}>
          <img className="mr-2" src="/icons/check-white.svg" />
          {t('WebsiteAdmin.DesignPage.AddItem.block.Access.buttonSubmit')}
        </Button>
      </div> */}
    </div>
  );
};

export default AddItem