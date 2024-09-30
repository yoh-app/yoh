import React from 'react';
import { ToolbarSection, ToolbarItem } from '../../editor';
import { useTranslation } from 'next-i18next';

export const TagSettings = () => {
  const { t, i18n } = useTranslation('design');

  return (
    <React.Fragment>
      <ToolbarSection
        title={t('WebsiteAdmin.DesignPage.customizePanel.backgroundImage')}
        props={['backgroundImage']}
        summary={({ backgroundImage }: any) => {
          return null;
        }}
      >
        <ToolbarItem full={true} propKey="backgroundImage" type="imageSrc" />
      </ToolbarSection>
      <ToolbarSection
        title={t('WebsiteAdmin.DesignPage.customizePanel.backgroundColor')}
        props={['backgroundColor']}
        summary={({ backgroundColor }: any) => {
          if (backgroundColor) {
            return (
              <div className="fletext-right flex items-center justify-end">
                <div
                  style={{
                    backgroundColor: backgroundColor && `rgba(${Object.values(backgroundColor)})`,
                  }}
                  className="w-[14px] h-[14px] rounded-full mr-2"
                />
                <p className="text-white text-right">{`rgba(${Object.values(backgroundColor)})`}</p>
              </div>
            );
          }
          return null;
        }}
      >
        <ToolbarItem full={true} propKey="backgroundColor" type="color" />
      </ToolbarSection>
      <ToolbarSection
        title={t('WebsiteAdmin.DesignPage.customizePanel.sectionPadding')}
        props={['padding']}
        summary={({ padding }: any) => {
          return `${padding[0] || 0}px ${padding[1] || 0}px ${padding[2] || 0}px ${padding[3] || 0}px`;
        }}
      >
        <ToolbarItem propKey="padding" index={0} type="slider" label="Top" />
        <ToolbarItem propKey="padding" index={1} type="slider" label="Right" />
        <ToolbarItem propKey="padding" index={2} type="slider" label="Bottom" />
        <ToolbarItem propKey="padding" index={3} type="slider" label="Left" />
      </ToolbarSection>
    </React.Fragment>
  );
};
