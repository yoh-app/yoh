import React, { useContext, useEffect } from 'react';
import { ToolbarSection, ToolbarItem } from '../../editor';
import { ToolbarRadio } from '../../editor/Toolbar/ToolbarRadio';
import { capitalize, weightDescription } from '../../utils/text';
import { useTranslation } from 'next-i18next';
import { useNode } from '@craftjs/core';
import { useFindUniqueProductCollectionQuery, useFindUniquePageCollectionQuery } from '../../../../generated';
import { CraftContext } from '../../editor/CraftContext';

export const CollectionSettings = () => {
  const { t, i18n } = useTranslation('design');
  const { collectionUpdated, setCollectionUpdated } = useContext(CraftContext)
  const {
    actions: { setProp },
    node
  } = useNode((node) => ({
    node,
  }));
  const { data: productCollectionData, refetch: refetchProductCollection } = useFindUniqueProductCollectionQuery({
    variables: {
      where: {
        id: node?.props?.id
      }
    },
    skip: node?.props?.type !== 'product' || !node?.props?.id
  })
  const { data: pageCollectionData, refetch: refetchPageCollection } = useFindUniquePageCollectionQuery({
    variables: {
      where: {
        id: node?.props?.id
      }
    },
    skip: node?.props?.type !== 'page' || !node?.props?.id
  })
  const name = node?.props?.type === 'page' ? pageCollectionData?.findUniquePageCollection?.name : productCollectionData?.findUniqueProductCollection?.name
  useEffect(() => {
    async function refetchCollection() {
      if (collectionUpdated === node?.props?.id) {
        if (node?.props?.type === 'page') {
          await refetchPageCollection();
        } else {
          await refetchProductCollection();
        }
        // setCollectionUpdated(null)
      }
    }
    refetchCollection();
  }, [collectionUpdated]);

  return (
    <React.Fragment>
      <ToolbarSection
        title={t('WebsiteAdmin.DesignPage.customizePanel.displayStyle')}
        props={['displayStyle']}
        summary={({ displayStyle }: any) => {
          return null;
        }}
      >
        <ToolbarItem propKey="displayStyle" type="radio">
          <ToolbarRadio value="row" label="Row" />
          <ToolbarRadio value="column" label="Column" />
        </ToolbarItem>
      </ToolbarSection>
      {name?.length > 0 && <>
        <ToolbarSection
          title={t('WebsiteAdmin.DesignPage.customizePanel.typography')}
          props={['fontSize', 'fontWeight', 'textAlign']}
          summary={({ fontSize, fontWeight, textAlign }: any) => {
            return `${fontSize || ''}, ${weightDescription(fontWeight)}, ${capitalize(textAlign)}`;
          }}
        >
          <ToolbarItem full={true} propKey="fontSize" type="slider" label="Font Size" />
          <ToolbarItem propKey="textAlign" type="radio" label="Align">
            <ToolbarRadio value="left" label="Left" />
            <ToolbarRadio value="center" label="Center" />
            <ToolbarRadio value="right" label="Right" />
          </ToolbarItem>
          <ToolbarItem propKey="fontWeight" type="radio" label="Weight">
            <ToolbarRadio value="400" label="Regular" />
            <ToolbarRadio value="500" label="Medium" />
            <ToolbarRadio value="700" label="Bold" />
          </ToolbarItem>
        </ToolbarSection>
        <ToolbarSection
          title={t('WebsiteAdmin.DesignPage.customizePanel.textMargin')}
          props={['margin']}
          summary={({ margin }: any) => {
            return `${margin[0] || 0}px ${margin[1] || 0}px ${margin[2] || 0}px ${margin[3] || 0}px`;
          }}
        >
          <ToolbarItem propKey="margin" index={0} type="slider" label="Top" />
          <ToolbarItem propKey="margin" index={1} type="slider" label="Right" />
          <ToolbarItem propKey="margin" index={2} type="slider" label="Bottom" />
          <ToolbarItem propKey="margin" index={3} type="slider" label="Left" />
        </ToolbarSection>
        <ToolbarSection
          title={t('WebsiteAdmin.DesignPage.customizePanel.color')}
          props={['color']}
          summary={({ color }: any) => {
            return (
              <div className="fletext-right flex items-center justify-end">
                <div
                  style={{
                    backgroundColor: color && `rgba(${Object.values(color)})`,
                  }}
                  className="w-[14px] h-[14px] rounded-full mr-2"
                />
                <p className="text-white text-right">
                  {`rgba(${Object.values(color)})`}
                </p>
              </div>
            );
          }}
        >
          <ToolbarItem full={true} propKey="color" type="color" />
        </ToolbarSection>
        <ToolbarSection
          title={t('WebsiteAdmin.DesignPage.customizePanel.shadow')}
          props={['shadow']}
          summary={({ shadow }: any) => {
            return (
              <div className="fletext-right">
                <p
                  style={{
                    textShadow: `0px 0px 2px rgba(0, 0, 0, ${shadow / 100})`,
                  }}
                  className="text-white text-right"
                >
                  {`${shadow || 0}%`}
                </p>
              </div>
            );
          }}
        >
          <ToolbarItem full={true} propKey="shadow" type="slider" />
        </ToolbarSection>


      </>}
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
      {/* <ToolbarSection
        title="Appearance"
        props={['color', 'shadow']}
        summary={({ color, shadow }: any) => {
          return (
            <div className="fletext-right">
              <p
                style={{
                  color: color && `rgba(${Object.values(color)})`,
                  textShadow: `0px 0px 2px rgba(0, 0, 0, ${shadow / 100})`,
                }}
                className="text-white text-right"
              >
                T
              </p>
            </div>
          );
        }}
      >
        <ToolbarItem full={true} propKey="color" type="color" label="Text" />
        <ToolbarItem full={true} propKey="shadow" type="slider" label="Shadow" />
      </ToolbarSection> */}
    </React.Fragment>
  );
};
