import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesPostContext } from './post-context.js';

export const PostContext = createComponent({
  tagName: 'grantcodes-post-context',
  elementClass: GrantCodesPostContext,
  react: React,
});
