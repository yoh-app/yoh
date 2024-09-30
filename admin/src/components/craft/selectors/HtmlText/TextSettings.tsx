import React, { useContext } from 'react';
import { ToolbarSection, ToolbarItem } from '../../editor';
import { ToolbarRadio } from '../../editor/Toolbar/ToolbarRadio';
import { capitalize, weightDescription } from '../../utils/text';
import { useTranslation } from 'next-i18next';
import { CraftContext } from '../../../../components/craft/editor/CraftContext';

export const TextSettings = () => {
  const { editPart } = useContext(CraftContext)
  const { t, i18n } = useTranslation('design');
  return (
    <React.Fragment>
      {editPart === 'link' && <ToolbarSection
        title={t('WebsiteAdmin.DesignPage.customizePanel.link')}
        props={['url', 'text']}
        summary={(props) => {
          console.log(props)
          return '';
        }}
      >
        <ToolbarItem full={true} propKey="url" type="url" />
        {/* <ToolbarItem full={true} propKey="text" type="meta" /> */}

      </ToolbarSection>}

      {/* <ToolbarSection
        title={t('WebsiteAdmin.DesignPage.customizePanel.text')}
        props={['text']}
        summary={({ text }: any) => {
          return null;
        }}
      >
        <ToolbarItem full={true} propKey="text" type="text" />
      </ToolbarSection> */}

      {editPart === 'palette' && <>
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
          title={t('WebsiteAdmin.DesignPage.customizePanel.margin')}
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
          <ToolbarItem full={true} propKey="shadow" type="slider" label="Shadow" />
        </ToolbarSection>

      </>}

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
