import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesSidebarToggle } from './sidebar.js';

export const SidebarToggle = createComponent({
  tagName: 'grantcodes-sidebar-toggle',
  elementClass: GrantCodesSidebarToggle,
  react: React,
});
