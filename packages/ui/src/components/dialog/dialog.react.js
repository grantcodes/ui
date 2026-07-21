import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesDialog } from './dialog.js';

export const Dialog = createComponent({
  tagName: 'grantcodes-dialog',
  elementClass: GrantCodesDialog,
  react: React,
});
