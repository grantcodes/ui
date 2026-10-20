import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesCta } from './cta.js';

export const Cta = createComponent({
  tagName: 'grantcodes-cta',
  elementClass: GrantCodesCta,
  react: React,
});
