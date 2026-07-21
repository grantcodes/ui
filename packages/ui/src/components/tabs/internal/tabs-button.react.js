import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesTabsButton } from './tabs-button.js';

export const TabsButton = createComponent({
  tagName: 'grantcodes-tabs-button',
  elementClass: GrantCodesTabsButton,
  react: React,
});
