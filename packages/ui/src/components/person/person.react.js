import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesPerson } from './person.js';

export const Person = createComponent({
  tagName: 'grantcodes-person',
  elementClass: GrantCodesPerson,
  react: React,
});
