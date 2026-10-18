import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesBadge } from './badge.js';

export const Badge = createComponent({
  tagName: 'grantcodes-badge',
  elementClass: GrantCodesBadge,
  react: React,
});
