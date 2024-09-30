import React, { useState, useEffect } from 'react';

import { useEditor } from '@craftjs/core';

export const Viewport = ({ children, craftId }) => {
  const {
    enabled,
    connectors,
    selected,
    actions: { selectNode },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
    selected: state.events.selected,
  }));

  return (
    <div
      className="craftjs-renderer h-full  w-full transition"
      ref={(ref) => connectors.select(connectors.hover(ref, null), null)}
    >
      {children}
    </div>
  );
};
