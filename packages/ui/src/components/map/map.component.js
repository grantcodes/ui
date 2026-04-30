import { LitElement, html, nothing } from "lit";
import mapStyles from "./map.css" with { type: "css" };

const DARK_FILTER =
	"invert(1) hue-rotate(180deg) brightness(0.95) contrast(0.9)";

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
		this._onSchemeChange = () => this._updateFilter();
	}

	connectedCallback() {
		super.connectedCallback();
		this._observer = new MutationObserver(() => this._updateFilter());
		this._observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});
		this._darkQuery.addEventListener("change", this._onSchemeChange);
		this._updateFilter();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this._observer?.disconnect();
		this._darkQuery.removeEventListener("change", this._onSchemeChange);
	}

	_isDark() {
		if (document.documentElement.classList.contains("dark")) return true;
		if (document.documentElement.classList.contains("light")) return false;
		return this._darkQuery.matches;
	}

	_updateFilter() {
		this.style.setProperty(
			"--g-map-filter",
			this._isDark() ? DARK_FILTER : "none",
		);
	}

	get _embedUrl() {
		if (!this.lat || !this.lng) return "";
		const bbox = this._getBoundingBox(
			Number.parseFloat(this.lat),
			Number.parseFloat(this.lng),
			this.zoom,
		);
		return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&marker=${this.lat},${this.lng}&layers=mapnik`;
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

		const heightStyle = this.height ? `--map-height: ${this.height}` : "";

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
