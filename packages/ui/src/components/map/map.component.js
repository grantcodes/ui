import { LitElement, html, nothing } from "lit";
import mapStyles from "./map.css" with { type: "css" };

export class GrantCodesMap extends LitElement {
	static styles = [mapStyles];

	static properties = {
		/**
		 * Latitude coordinate.
		 * @type {string}
		 */
		lat: { type: String },
		/**
		 * Longitude coordinate.
		 * @type {string}
		 */
		lng: { type: String },
		/**
		 * Map zoom level (1-18).
		 * @type {number}
		 */
		zoom: { type: Number },
		/**
		 * Accessible label for the map iframe.
		 * @type {string}
		 */
		label: { type: String },
		/**
		 * URL for a "Get directions" link below the map.
		 * @type {string}
		 */
		"directions-url": { type: String, attribute: "directions-url" },
		/**
		 * Height of the map. Accepts any CSS length value.
		 * @type {string}
		 */
		height: { type: String },
		/** @internal */
		_dark: { state: true },
	};

	constructor() {
		super();
		this.lat = "";
		this.lng = "";
		this.zoom = 14;
		this.label = "Map";
		this["directions-url"] = "";
		this.height = "";
		this._darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
		this._dark = this._darkQuery.matches;
		this._onSchemeChange = (e) => {
			this._dark = e.matches;
		};
	}

	connectedCallback() {
		super.connectedCallback();
		this._darkQuery.addEventListener("change", this._onSchemeChange);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this._darkQuery.removeEventListener("change", this._onSchemeChange);
	}

	get _embedUrl() {
		if (!this.lat || !this.lng) return "";
		const bbox = this._getBoundingBox(
			Number.parseFloat(this.lat),
			Number.parseFloat(this.lng),
			this.zoom,
		);
		const layer = this._dark ? "S" : "hot";
		return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&marker=${this.lat},${this.lng}&layers=${layer}`;
	}

	/**
	 * Calculate a bounding box around a point for the given zoom level.
	 */
	_getBoundingBox(lat, lng, zoom) {
		const spread = 360 / 2 ** zoom;
		return `${lng - spread},${lat - spread},${lng + spread},${lat + spread}`;
	}

	render() {
		if (!this.lat || !this.lng) {
			return nothing;
		}

		const heightStyle = this.height
			? `--map-height: ${this.height}`
			: "";

		return html`
			<div class="map" style="${heightStyle}">
				<iframe
					class="map__iframe"
					src="${this._embedUrl}"
					title="${this.label}"
					loading="lazy"
					referrerpolicy="no-referrer"
					frameborder="0"
					seamless
				></iframe>
				${
					this["directions-url"]
						? html`<a
								class="map__directions"
								href="${this["directions-url"]}"
								target="_blank"
								rel="noopener noreferrer"
							>Get directions</a>`
						: nothing
				}
			</div>
		`;
	}
}
