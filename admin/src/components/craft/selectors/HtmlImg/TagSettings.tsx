import React, { useContext } from 'react';
import { ToolbarSection, ToolbarItem } from '../../editor';
import { useTranslation } from 'next-i18next';
import { CraftContext } from '../../../../components/craft/editor/CraftContext';

export const TagSettings = () => {
  const { t, i18n } = useTranslation('design');
  const { editPart } = useContext(CraftContext)

  return (
    <React.Fragment>
      {editPart === 'link' && <ToolbarSection
        title={t('WebsiteAdmin.DesignPage.customizePanel.link')}
        props={['url', 'text']}
        summary={(props) => {
          console.log(props)
          return props.url;
        }}
      >
        <ToolbarItem full={true} propKey="url" type="url" />
        {/* <ToolbarItem full={true} propKey="text" type="meta" /> */}

      </ToolbarSection>
      }
      {editPart === 'image' && <ToolbarSection
        title={t('WebsiteAdmin.DesignPage.customizePanel.image')}
        props={['imageSrc']}
        summary={({ imageSrc }: any) => {
          return null;
        }}
      >
        <ToolbarItem full={true} propKey="imageSrc" type="imageSrc" />
      </ToolbarSection>}
      <ToolbarSection
        title={t('WebsiteAdmin.DesignPage.customizePanel.alt')}
        props={['text']}
        summary={({ text }: any) => {
          return null;
        }}
      >
        <ToolbarItem full={true} propKey="text" type="text" />
      </ToolbarSection>
      <ToolbarSection
        title={t('WebsiteAdmin.DesignPage.customizePanel.borderRadius')}
        props={['borderRadius']}
        summary={({ borderRadius }: any) => {
          if (borderRadius) {
            return `${borderRadius}px`;
          } else {
            return ''
          }
        }}
      >
        <ToolbarItem full={true} propKey="borderRadius" type="slider" label="Border Radius" />
      </ToolbarSection>
      {/* <ToolbarSection
        title={t('WebsiteAdmin.DesignPage.customizePanel.url')}
        props={['url']}
        summary={({ url }: any) => {
          return (
            <div 
              className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[150px]"
            >
              {url}
            </div>
          );
        }}
      >
        <ToolbarItem full={true} propKey="url" type="url" />
      </ToolbarSection> */}
    </React.Fragment>
  );
};
