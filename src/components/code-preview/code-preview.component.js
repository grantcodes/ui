import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import { codeToHtml } from "shiki/bundle/web";
import { codePreviewStyles } from "./code-preview.styles.js";

export class GrantCodesCodePreview extends LitElement {
	static styles = [codePreviewStyles];

	static properties = {
		language: { type: String },
		theme: { type: String },
	};

	constructor() {
		super();

		this.language = "html";
		this.theme = "aurora-x";
		this.codePreview = null;
	}

	async doHighlight() {
		const rawCode = this.textContent ?? "";

		const highlightedCode = await codeToHtml(rawCode.trim(), {
			lang: this.language,
			theme: this.theme,
		});

		this.codePreview.innerHTML = highlightedCode;
	}

	firstUpdated() {
		this.codePreview = this.renderRoot.querySelector(".code-preview");
		this.doHighlight();
	}

	render() {
		return html`<div class="code-preview">
			<pre><slot></slot></pre>
		</div> `;
	}
}

customElements.define("grantcodes-code-preview", GrantCodesCodePreview);
