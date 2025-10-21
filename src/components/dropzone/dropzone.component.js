import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import { cx } from "../../lib/classnames.js";
import { dropzoneStyles } from "./dropzone.styles.js";

export class GrantCodesDropzone extends LitElement {
	static styles = [dropzoneStyles];

	static properties = {
		fullscreenOnDrag: { type: Boolean, reflect: true },
	};

	constructor() {
		super();

		this.fullscreenOnDrag = false;

		/** @type {HTMLInputElement[]} */
		this._input = [];

		this._fullscreen = false;

		/** @type {string} */
		this._placeholder = "";
	}

	_enableFullscreen = () => {
		if (this.fullscreenOnDrag) {
			this._fullscreen = true;
		}
	};

	// TODO: Can freeze in fullscreen if starting dragging then cancel.
	_disableFullscreen = () => {
		this._fullscreen = false;
	};

	connectedCallback() {
		super.connectedCallback();
		document.addEventListener("dragenter", this._enableFullscreen);
		document.addEventListener("dragend", this._disableFullscreen);
	}

	disconnectedCallback() {
		document.removeEventListener("dragenter", this._enableFullscreen);
		document.removeEventListener("dragend", this._disableFullscreen);
		super.disconnectedCallback();
	}

	firstUpdated() {
		if (this._input.length === 0) {
			throw new Error("No file input found");
		}
		this._placeholder = this._input[0].placeholder;
	}

	render() {
		const dropzoneClass = cx("dropzone", {
			"dropzone--fullscreen": this._fullscreen,
		});

		return html`
			<div
				class=${dropzoneClass}
				@mouseleave=${this._disableFullscreen}
				@dragend=${this._disableFullscreen}
				@dragleave=${this._disableFullscreen}
			>
				<slot></slot>
				<span class="dropzone__placeholder">${this._placeholder}</span>
			</div>
		`;
	}
}
