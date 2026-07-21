import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesGallery } from './gallery.js';

export const Gallery = createComponent({
  tagName: 'grantcodes-gallery',
  elementClass: GrantCodesGallery,
  react: React,
});
