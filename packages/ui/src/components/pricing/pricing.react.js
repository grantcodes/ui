import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesPricing } from './pricing.js';

export const Pricing = createComponent({
  tagName: 'grantcodes-pricing',
  elementClass: GrantCodesPricing,
  react: React,
});
