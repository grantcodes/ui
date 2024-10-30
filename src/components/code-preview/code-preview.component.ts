import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import {
	codeToHtml,
	type BundledTheme,
	type BundledLanguage,
} from "shiki/bundle/web";
import codePreviewStyles from "./code-preview.scss?inline";

@customElement("grantcodes-code-preview")
export class GrantCodesCodePreview extends LitElement {
	static styles = [unsafeCSS(codePreviewStyles)];

	@property({ type: String })
	language: BundledLanguage = "html";

	@property({ type: String })
	theme: BundledTheme = "aurora-x";

	@query(".code-preview")
	codePreview!: HTMLElement;

	async doHighlight() {
		const rawCode = this.textContent ?? "";

		const highlightedCode = await codeToHtml(rawCode.trim(), {
			lang: this.language,
			theme: this.theme,
		});

		this.codePreview.innerHTML = highlightedCode;
	}

	firstUpdated(): void {
		this.doHighlight();
	}

	render() {
		return html`<div class="code-preview">
			<pre><slot></slot></pre>
		</div> `;
	}
}
