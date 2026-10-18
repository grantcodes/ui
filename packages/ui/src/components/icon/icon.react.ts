import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesIcon } from './icon.js';

export const Icon = createComponent({
  tagName: 'grantcodes-icon',
  elementClass: GrantCodesIcon,
  react: React,
});
