import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesHero } from './hero.js';

export const Hero = createComponent({
  tagName: 'grantcodes-hero',
  elementClass: GrantCodesHero,
  react: React,
});
