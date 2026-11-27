import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesPostFooter } from './post-footer.js';

export const PostFooter = createComponent({
  tagName: 'grantcodes-post-footer',
  elementClass: GrantCodesPostFooter,
  react: React,
});
