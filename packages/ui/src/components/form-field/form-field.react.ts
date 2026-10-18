import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesFormField } from './form-field.js';

export const FormField = createComponent({
  tagName: 'grantcodes-form-field',
  elementClass: GrantCodesFormField,
  react: React,
});
