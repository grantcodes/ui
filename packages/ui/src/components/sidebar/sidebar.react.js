import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesSidebar } from './sidebar.js';

export const Sidebar = createComponent({
  tagName: 'grantcodes-sidebar',
  elementClass: GrantCodesSidebar,
  react: React,
  events: {
    onToggle: 'toggle',
    onDrawerToggle: 'drawer-toggle',
  },
});
