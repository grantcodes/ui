import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesBreadcrumb, GrantCodesBreadcrumbItem } from './breadcrumb.js';

export const Breadcrumb = createComponent({
  tagName: 'grantcodes-breadcrumb',
  elementClass: GrantCodesBreadcrumb,
  react: React,
});

export const BreadcrumbItem = createComponent({
  tagName: 'grantcodes-breadcrumb-item',
  elementClass: GrantCodesBreadcrumbItem,
  react: React,
});
