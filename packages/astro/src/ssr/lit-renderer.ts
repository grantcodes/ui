/**
 * ISOLATED @lit-labs/ssr ADAPTER MODULE
 *
 * ALL @lit-labs/ssr imports in the @grantcodes/astro package MUST route through
 * this file — no other file in the package may import from @lit-labs/ssr directly.
 *
 * Rationale (PITFALLS #6):
 *   @lit-labs/ssr is experimental with no API stability guarantees.
 *   Isolating all imports to a single adapter module limits the blast radius
 *   when the API changes — only this file needs updating.
 */

import { LitElementRenderer } from '@lit-labs/ssr/lib/lit-element-renderer.js';
import * as parse5 from 'parse5';

function isCustomElementTag(name: unknown): boolean {
	return typeof name === 'string' && /-/.test(name);
}

function getCustomElementConstructor(name: string | Function): (typeof HTMLElement & { _$litElement$?: boolean; elementProperties?: Map<string, { reflect?: boolean }>; prototype: Record<string, unknown> }) | null {
	if (typeof customElements !== 'undefined' && isCustomElementTag(name)) {
		return customElements.get(name as string) || null;
	} else if (typeof name === 'function') {
		return name as unknown as (typeof HTMLElement & { _$litElement$?: boolean; elementProperties?: Map<string, { reflect?: boolean }>; prototype: Record<string, unknown> });
	}
	return null;
}

async function isLitElement(Component: unknown): Promise<boolean> {
	const Ctr = getCustomElementConstructor(Component as string | Function);
	return !!Ctr?._$litElement$;
}

export async function check(Component: unknown): Promise<boolean> {
	// Lit doesn't support getting a tagName from a Constructor at this time.
	// So this must be a string at the moment.
	return !!(await isLitElement(Component));
}

function* render(
	Component: string,
	attrs?: Record<string, unknown>,
	slots?: Record<string, string>
): Generator<string, void, unknown> {
	let tagName = Component;
	if (typeof tagName !== 'string') {
		tagName = (Component as Record<symbol, string>)[Symbol.for('tagName')];
	}

	const instance = new LitElementRenderer(tagName);
	const Ctr = getCustomElementConstructor(tagName);
	let shouldDeferHydration = false;

	if (attrs && Ctr) {
		for (const [name, value] of Object.entries(attrs)) {
			const isReactiveProperty = name in Ctr.prototype;
			const isReflectedReactiveProperty = Ctr.elementProperties?.get(name)?.reflect;

			// Only defer hydration if we are setting a reactive property that cannot
			// be reflected / serialized as a property.
			shouldDeferHydration ||= isReactiveProperty && !isReflectedReactiveProperty;

			if (isReactiveProperty) {
				instance.setProperty(name, value);
			} else {
				instance.setAttribute(name, String(value));
			}
		}
	}

	instance.connectedCallback();

	yield `<${tagName}${shouldDeferHydration ? ' defer-hydration' : ''}`;
	yield* instance.renderAttributes();
	yield `>`;

	// render component
	// see: https://github.com/lit/lit/blob/a66737fc9b861999b00ccad01edb925172b7f711/packages/labs/ssr-react/src/lib/node/render-custom-element.ts#L32
	const shadowContents = instance.renderShadow({
		elementRenderers: [LitElementRenderer],
		customElementInstanceStack: [instance],
		customElementHostStack: [instance],
		deferHydration: false,
		eventTargetStack: [],
		slotStack: []
	});

	if (shadowContents !== undefined) {
		const { mode = 'open', delegatesFocus } = instance.shadowRootOptions ?? {};
		// `delegatesFocus` is intentionally allowed to coerce to boolean to
		// match web platform behavior.
		const delegatesfocusAttr = delegatesFocus ? ' shadowrootdelegatesfocus' : '';
		yield `<template shadowroot="${mode}" shadowrootmode="${mode}"${delegatesfocusAttr}>`;
		yield* shadowContents;
		yield '</template>';
	}

	if (slots) {
		for (const [slot, rawValue = ''] of Object.entries(slots)) {
			let value = rawValue;
			if (slot !== 'default' && value) {
				// Parse the value as a concatenated string
				const fragment = parse5.parseFragment(`${value}`);

				// Add the missing slot attribute to child Element nodes
				for (const node of fragment.childNodes) {
					if ('tagName' in node && node.tagName && 'attrs' in node && Array.isArray(node.attrs) && !node.attrs.some(({ name }: { name: string }) => name === 'slot')) {
						node.attrs.push({ name: 'slot', value: slot });
					}
				}

				value = parse5.serialize(fragment);
			}

			yield value;
		}
	}

	yield `</${tagName}>`;
}

export async function renderToStaticMarkup(
	Component: string,
	props?: Record<string, unknown>,
	slots?: Record<string, string>
): Promise<{ html: string }> {
	const tagName = Component;

	let out = '';
	for (const chunk of render(tagName, props, slots)) {
		out += chunk;
	}

	return {
		html: out,
	};
}
