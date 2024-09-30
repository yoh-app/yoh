import React from 'react';
import { Toolbar } from '../../Toolbar';
import styled from 'styled-components';
import { useEditor } from '@craftjs/core';
import { useTranslation } from 'next-i18next';

export const SidebarDiv = styled.div<{ enabled: boolean }>`
  width: ${(props) => (props.enabled ? 350 : 0)}px;
  background: black;
`;

export const Sidebar = () => {
  const { t } = useTranslation('design');
  const {
    enabled,
    selected,
    actions: { selectNode },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
    selected: state.events.selected,
  }));

  if (selected) {
    return (
      <SidebarDiv enabled={enabled} className="sidebar transition w-2">
        <div className="flex flex-col h-full">
          <div style={{ textAlign: 'center', marginTop: '10px', color: 'white' }}>
            {t('WebsiteAdmin.DesignPage.customizePanel.title')}
          </div>
          <Toolbar />
        </div>
      </SidebarDiv>
    );
  }
  return null;
};
