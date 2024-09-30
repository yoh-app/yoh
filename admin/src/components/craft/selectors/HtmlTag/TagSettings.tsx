import React from 'react';
import { ToolbarSection, ToolbarItem } from '../../editor';
import { useTranslation } from 'next-i18next';
import { useNode } from '@craftjs/core';
export const TagSettings = () => {
  const { t, i18n } = useTranslation('design');
  const { node } = useNode((node) => ({
    node,
  }));
  console.log(node, 'node');
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
          } else {
            return null;
          }
        }}
      >
        <ToolbarItem full={true} propKey="backgroundColor" type="color" />
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
    </React.Fragment>
  );
};
