import { createComponent } from '@lit/react';
import type { EventName } from '@lit/react';
import React from 'react';
import { GrantCodesDialog } from './dialog.js';

export const Dialog = createComponent({
  tagName: 'grantcodes-dialog',
  elementClass: GrantCodesDialog,
  react: React,
  events: {
    onToggle: 'toggle' as EventName<CustomEvent<{ open: boolean }>>,
  },
});
