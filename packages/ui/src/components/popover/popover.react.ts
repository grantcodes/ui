import { createComponent } from '@lit/react';
import type { EventName } from '@lit/react';
import React from 'react';
import { GrantCodesPopover } from './popover.js';

export const Popover = createComponent({
  tagName: 'grantcodes-popover',
  elementClass: GrantCodesPopover,
  react: React,
  events: {
    onToggle: 'toggle' as EventName<CustomEvent<{ open: boolean }>>,
  },
});
