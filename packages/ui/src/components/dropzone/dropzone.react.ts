import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesDropzone } from './dropzone.js';

export const Dropzone = createComponent({
  tagName: 'grantcodes-dropzone',
  elementClass: GrantCodesDropzone,
  react: React,
});
