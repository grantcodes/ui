import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesAccordion } from './accordion.js';

export const Accordion = createComponent({
  tagName: 'grantcodes-accordion',
  elementClass: GrantCodesAccordion,
  react: React,
});
