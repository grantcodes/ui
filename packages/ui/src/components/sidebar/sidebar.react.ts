import { createComponent, type EventName } from '@lit/react';
import React from 'react';
import { GrantCodesSidebar } from './sidebar.js';

export const Sidebar = createComponent({
  tagName: 'grantcodes-sidebar',
  elementClass: GrantCodesSidebar,
  react: React,
  events: {
    onDrawerToggle: 'drawer-toggle' as EventName<CustomEvent<{ open: boolean }>>,
  },
});
