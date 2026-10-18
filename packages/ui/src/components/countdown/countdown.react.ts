import { createComponent } from '@lit/react';
import React from 'react';
import { GrantCodesCountdown } from './countdown.js';

export const Countdown = createComponent({
  tagName: 'grantcodes-countdown',
  elementClass: GrantCodesCountdown,
  react: React,
});
