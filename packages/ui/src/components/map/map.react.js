import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesMap } from './map.js';

export const MapEmbed = createComponent({
  tagName: 'grantcodes-map',
  elementClass: GrantCodesMap,
  react: React,
});
