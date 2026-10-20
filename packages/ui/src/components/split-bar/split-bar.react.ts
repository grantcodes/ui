import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesSplitBar } from './split-bar.js';

export const SplitBar = createComponent({
  tagName: 'grantcodes-split-bar',
  elementClass: GrantCodesSplitBar,
  react: React,
});
