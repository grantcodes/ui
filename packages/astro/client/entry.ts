function addSlotAttrsToHtmlString(slotName: string, html: string): string {
	const templ = document.createElement("template");
	templ.innerHTML = html;
	Array.from(templ.content.children).forEach((node) => {
		if (node instanceof HTMLElement) {
			node.setAttribute("slot", slotName);
		}
	});
	return templ.innerHTML;
}

export default (element: HTMLElement) => async (Component: typeof HTMLElement, props: Record<string, unknown>, { default: defaultChildren, ...slotted }: Record<string, string>) => {
	let component = element.children[0] as HTMLElement;
	const isClientOnly = element.getAttribute("client") === "only";

	if (isClientOnly) {
		component = new (Component as any)();
		const otherSlottedChildren = Object.entries(slotted)
			.map(([slotName, htmlStr]) => addSlotAttrsToHtmlString(slotName, htmlStr))
			.join("");
		component.innerHTML = `${defaultChildren ?? ""}${otherSlottedChildren}`;
		element.appendChild(component);
		for (const [name, value] of Object.entries(props)) {
			if (!(name in Component.prototype)) {
				component.setAttribute(name, String(value));
			}
		}
	}

	if (!component || !(component.hasAttribute("defer-hydration") || isClientOnly)) {
		return;
	}

	for (const [name, value] of Object.entries(props)) {
		if (name in Component.prototype) {
			(component as any)[name] = value;
		}
	}
	component.removeAttribute("defer-hydration");
};
