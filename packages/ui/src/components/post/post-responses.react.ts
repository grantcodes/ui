import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesPostResponses } from './post-responses.js';

export const PostResponses = createComponent({
  tagName: 'grantcodes-post-responses',
  elementClass: GrantCodesPostResponses,
  react: React,
});
