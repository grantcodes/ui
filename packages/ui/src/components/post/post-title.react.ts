import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesPostTitle } from './post-title.js';

export const PostTitle = createComponent({
  tagName: 'grantcodes-post-title',
  elementClass: GrantCodesPostTitle,
  react: React,
});
