const polyfillCheckEl = Document.parseHTMLUnsafe(
	`<p><template shadowrootmode="open"></template></p>`
).querySelector("p");

if (!polyfillCheckEl?.shadowRoot) {
	const { hydrateShadowRoots } = await import(
		"@webcomponents/template-shadowroot/template-shadowroot.js"
	);
	window.addEventListener("DOMContentLoaded", () => hydrateShadowRoots(document.body), {
		once: true,
	});
}
