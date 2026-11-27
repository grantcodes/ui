import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesPostHeader } from './post-header.js';

export const PostHeader = createComponent({
  tagName: 'grantcodes-post-header',
  elementClass: GrantCodesPostHeader,
  react: React,
});
