import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesMenuToggle } from './menu-toggle.js';

export const MenuToggle = createComponent({
  tagName: 'grantcodes-menu-toggle',
  elementClass: GrantCodesMenuToggle,
  react: React,
});
