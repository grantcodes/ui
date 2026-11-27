import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesPostContent } from './post-content.js';

export const PostContent = createComponent({
  tagName: 'grantcodes-post-content',
  elementClass: GrantCodesPostContent,
  react: React,
});
