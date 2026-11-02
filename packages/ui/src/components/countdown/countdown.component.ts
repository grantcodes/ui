import { html, LitElement, nothing, type PropertyValues } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
import countdownStyles from './countdown.css' with { type: 'css' };

// Keying on the value recreates the span, which replays its CSS animation.
const unit = (value: string | number, label: string) => html`
  <div class="countdown__unit">
    ${keyed(value, html`<span class="countdown__value">${value}</span>`)}
    <span class="countdown__label">${label}</span>
  </div>
`;

export class GrantCodesCountdown extends LitElement {
  declare _days: string | number;
  declare _hours: string;
  declare _intervalId: ReturnType<typeof setInterval> | null;
  declare _minutes: string;
  declare _past: boolean;
  declare _seconds: string;
  declare 'days-label': string;
  declare 'hours-label': string;
  declare 'minutes-label': string;
  declare 'past-message': string;
  declare 'seconds-label': string;
  declare 'show-seconds': boolean;
  declare target: string;

  static styles = [countdownStyles];

  static properties = {
    /**
     * ISO 8601 datetime string for the countdown target.
     * @type {string}
     */
    target: { type: String },
    /**
     * Label for the days unit.
     * @type {string}
     */
    'days-label': { type: String, attribute: 'days-label' },
    /**
     * Label for the hours unit.
     * @type {string}
     */
    'hours-label': { type: String, attribute: 'hours-label' },
    /**
     * Label for the minutes unit.
     * @type {string}
     */
    'minutes-label': { type: String, attribute: 'minutes-label' },
    /**
     * Label for the seconds unit (only shown when show-seconds is true).
     * @type {string}
     */
    'seconds-label': { type: String, attribute: 'seconds-label' },
    /**
     * Message displayed when the target date has passed.
     * @type {string}
     */
    'past-message': { type: String, attribute: 'past-message' },
    /**
     * Whether to show a seconds unit.
     * @type {boolean}
     */
    'show-seconds': { type: Boolean, attribute: 'show-seconds' },

    /** @internal */
    _days: { state: true },
    /** @internal */
    _hours: { state: true },
    /** @internal */
    _minutes: { state: true },
    /** @internal */
    _seconds: { state: true },
    /** @internal */
    _past: { state: true },
  };

  constructor() {
    super();
    this.target = '';
    this['days-label'] = 'days';
    this['hours-label'] = 'hours';
    this['minutes-label'] = 'minutes';
    this['seconds-label'] = 'seconds';
    this['past-message'] = 'The event has started!';
    this['show-seconds'] = false;

    this._days = '---';
    this._hours = '--';
    this._minutes = '--';
    this._seconds = '--';
    this._past = false;
    this._intervalId = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._tick();
    this._startInterval();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopInterval();
  }

  updated(changed: PropertyValues) {
    if (changed.has('target') || changed.has('show-seconds')) {
      this._stopInterval();
      this._tick();
      this._startInterval();
    }
  }

  _startInterval() {
    const interval = this['show-seconds'] ? 1000 : 60_000;
    this._intervalId = setInterval(() => this._tick(), interval);
  }

  _stopInterval() {
    if (this._intervalId !== null) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }

  _tick() {
    if (!this.target) return;

    const targetDate = new Date(this.target);
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      this._past = true;
      this._stopInterval();
      return;
    }

    this._past = false;
    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    const pad = (n: number) => String(n).padStart(2, '0');

    this._days = Math.floor(totalHours / 24);
    this._hours = pad(totalHours % 24);
    this._minutes = pad(totalMinutes % 60);
    this._seconds = pad(totalSeconds % 60);
  }

  render() {
    if (!this.target) return nothing;

    if (this._past) {
      return html`<div class="countdown__past">${this['past-message']}</div>`;
    }

    return html`
			<div class="countdown" role="timer" aria-label="Countdown">
				${unit(this._days, this['days-label'])}
				${unit(this._hours, this['hours-label'])}
				${unit(this._minutes, this['minutes-label'])}
				${this['show-seconds'] ? unit(this._seconds, this['seconds-label']) : nothing}
			</div>
		`;
  }
}
