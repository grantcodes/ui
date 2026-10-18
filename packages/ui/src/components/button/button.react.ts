import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesButton } from './button.js';

export const Button = createComponent({
  tagName: 'grantcodes-button',
  elementClass: GrantCodesButton,
  react: React,
});
