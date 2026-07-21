import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesPagination } from './pagination.js';

export const Pagination = createComponent({
  tagName: 'grantcodes-pagination',
  elementClass: GrantCodesPagination,
  react: React,
});
