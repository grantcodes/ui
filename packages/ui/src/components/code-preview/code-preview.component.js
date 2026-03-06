import { LitElement } from "lit";
import { html } from "lit/static-html.js";
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
        const { codeToHtml } = await import("shiki/bundle/web");
        const highlightedCode = await codeToHtml(rawCode.trim(), {
			lang: this.language,
			theme: this.theme,
		});

		this.codePreview.innerHTML = highlightedCode;
	}

    async firstUpdated() {
		this.codePreview = this.renderRoot.querySelector(".code-preview");
        // Only highlight if we have content and we're in a browser environment,
        // and not in a unit test environment
        const isTestEnv =
            typeof process !== "undefined" && process?.env?.NODE_ENV === "test";
        if (this.textContent && typeof window !== "undefined" && !isTestEnv) {
			try {
				await this.doHighlight();
			} catch (error) {
				// Silently fail in test environments
				console.warn("Code highlighting failed:", error);
			}
		}
	}

	render() {
		return html`<div class="code-preview">
			<pre><slot></slot></pre>
		</div> `;
	}
}
