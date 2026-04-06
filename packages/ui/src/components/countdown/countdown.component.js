import { LitElement, html, nothing } from "lit";
import countdownStyles from "./countdown.css" with { type: "css" };

export class GrantCodesCountdown extends LitElement {
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
		"days-label": { type: String, attribute: "days-label" },
		/**
		 * Label for the hours unit.
		 * @type {string}
		 */
		"hours-label": { type: String, attribute: "hours-label" },
		/**
		 * Label for the minutes unit.
		 * @type {string}
		 */
		"minutes-label": { type: String, attribute: "minutes-label" },
		/**
		 * Label for the seconds unit (only shown when show-seconds is true).
		 * @type {string}
		 */
		"seconds-label": { type: String, attribute: "seconds-label" },
		/**
		 * Message displayed when the target date has passed.
		 * @type {string}
		 */
		"past-message": { type: String, attribute: "past-message" },
		/**
		 * Whether to show a seconds unit.
		 * @type {boolean}
		 */
		"show-seconds": { type: Boolean, attribute: "show-seconds" },

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
		this.target = "";
		this["days-label"] = "days";
		this["hours-label"] = "hours";
		this["minutes-label"] = "minutes";
		this["seconds-label"] = "seconds";
		this["past-message"] = "The event has started!";
		this["show-seconds"] = false;

		this._days = "---";
		this._hours = "--";
		this._minutes = "--";
		this._seconds = "--";
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

	updated(changed) {
		if (changed.has("target") || changed.has("show-seconds")) {
			this._stopInterval();
			this._tick();
			this._startInterval();
		}
	}

	_startInterval() {
		const interval = this["show-seconds"] ? 1000 : 60_000;
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
		const diff = targetDate - now;

		if (diff <= 0) {
			this._past = true;
			this._stopInterval();
			return;
		}

		this._past = false;
		const totalSeconds = Math.floor(diff / 1000);
		const totalMinutes = Math.floor(totalSeconds / 60);
		const totalHours = Math.floor(totalMinutes / 60);

		this._days = Math.floor(totalHours / 24);
		this._hours = totalHours % 24;
		this._minutes = totalMinutes % 60;
		this._seconds = totalSeconds % 60;
	}

	render() {
		if (!this.target) return nothing;

		if (this._past) {
			return html`<div class="countdown__past">${this["past-message"]}</div>`;
		}

		return html`
			<div class="countdown" role="timer" aria-label="Countdown">
				<div class="countdown__unit">
					<span class="countdown__value">${this._days}</span>
					<span class="countdown__label">${this["days-label"]}</span>
				</div>
				<div class="countdown__unit">
					<span class="countdown__value">${this._hours}</span>
					<span class="countdown__label">${this["hours-label"]}</span>
				</div>
				<div class="countdown__unit">
					<span class="countdown__value">${this._minutes}</span>
					<span class="countdown__label">${this["minutes-label"]}</span>
				</div>
				${this["show-seconds"]
					? html`
						<div class="countdown__unit">
							<span class="countdown__value">${this._seconds}</span>
							<span class="countdown__label">${this["seconds-label"]}</span>
						</div>
					`
					: nothing}
			</div>
		`;
	}
}
