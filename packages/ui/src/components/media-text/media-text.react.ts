import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesMediaText } from './media-text.js';

export const MediaText = createComponent({
  tagName: 'grantcodes-media-text',
  elementClass: GrantCodesMediaText,
  react: React,
});
