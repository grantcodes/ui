import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesTooltip } from './tooltip.js';

export const Tooltip = createComponent({
  tagName: 'grantcodes-tooltip',
  elementClass: GrantCodesTooltip,
  react: React,
});
