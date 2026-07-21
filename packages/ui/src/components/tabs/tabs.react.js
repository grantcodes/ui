import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesTabs } from './tabs.js';

export const Tabs = createComponent({
  tagName: 'grantcodes-tabs',
  elementClass: GrantCodesTabs,
  react: React,
});
