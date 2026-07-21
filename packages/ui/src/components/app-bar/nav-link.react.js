import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesNavLink } from './nav-link.js';

export const NavLink = createComponent({
  tagName: 'grantcodes-nav-link',
  elementClass: GrantCodesNavLink,
  react: React,
});
