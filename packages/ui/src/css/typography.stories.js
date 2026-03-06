import { html } from "lit";

// This default export determines where your story goes in the story list
const meta = {
	title: "Styles/Typography",
	// component: "grantcodes-typography",
};

export default meta;

export const Heading1 = {
	args: {
		text: "Heading 1",
	},
	render: ({ text }) => html`<h1>${text}</h1>`,
};

export const Heading2 = {
	args: {
		text: "Heading 2",
	},
	render: ({ text }) => html`<h2>${text}</h2>`,
};

export const Heading3 = {
	args: {
		text: "Heading 3",
	},
	render: ({ text }) => html`<h3>${text}</h3>`,
};

export const Heading4 = {
	args: {
		text: "Heading 4",
	},
	render: ({ text }) => html`<h4>${text}</h4>`,
};

export const Heading5 = {
	args: {
		text: "Heading 5",
	},
	render: ({ text }) => html`<h5>${text}</h5>`,
};

export const Heading6 = {
	args: {
		text: "Heading 6",
	},
	render: ({ text }) => html`<h6>${text}</h6>`,
};

export const Paragraph = {
	args: {
		text: "This is a paragraph.",
	},
	render: ({ text }) => html`<p>${text}</p>`,
};

export const Emphasis = {
	args: {
		text: "This is emphasized text.",
	},
	render: ({ text }) => html`<p><em>${text}</em></p>`,
};

export const Strong = {
	args: {
		text: "This is strong text.",
	},
	render: ({ text }) => html`<p><strong>${text}</strong></p>`,
};

export const Small = {
	args: {
		text: "This is smallprint.",
	},
	render: ({ text }) => html`<p><small>${text}</small></p>`,
};

export const Deleted = {
	args: {
		text: "This is deleted text.",
	},
	render: ({ text }) => html`<p><del>${text}</del></p>`,
};

export const Inserted = {
	args: {
		text: "This is inserted text.",
	},
	render: ({ text }) => html`<p><ins>${text}</ins></p>`,
};

export const Code = {
	args: {
		text: "This is code.",
	},
	render: ({ text }) => html`<p><code>${text}</code></p>`,
};

export const Subscript = {
	args: {
		text: "This is subscript text.",
	},
	render: ({ text }) => html`<p><sub>${text}</sub></p>`,
};

export const Superscript = {
	args: {
		text: "This is superscript text.",
	},
	render: ({ text }) => html`<p><sup>${text}</sup></p>`,
};

export const Mark = {
	args: {
		text: "This is marked text.",
	},
	render: ({ text }) => html`<p><mark>${text}</mark></p>`,
};

export const OrderedList = {
	args: {
		items: ["Item 1", "Item 2"],
	},
	render: ({ items }) => html`
    <ol>
      ${items.map((item) => html`<li>${item}</li>`)}
    </ol>
  `,
};

export const UnorderedList = {
	args: {
		items: ["Item 1", "Item 2"],
	},
	render: ({ items }) => html`
    <ul>
      ${items.map((item) => html`<li>${item}</li>`)}
    </ul>
  `,
};

export const DescriptionDetails = {
	args: {
		items: [
			{ term: "Term 1", description: "Description 1" },
			{ term: "Term 2", description: "Description 2" },
		],
	},
	render: ({ items }) => html`
    <dl>
      ${items.map(
				(item) => html`
          <dt>${item.term}</dt>
          <dd>${item.description}</dd>
        `,
			)}
    </dl>
  `,
};

export const Pre = {
	args: {
		text: "This is a pre block.",
	},
	render: ({ text }) => html`<pre>${text}</pre>`,
};

export const Blockquote = {
	args: {
		text: "This is a blockquote.",
	},
	render: ({ text }) => html`<blockquote>
    <p>${text}</p>
    <footer><cite>Cite info</cite></footer>
  </blockquote>`,
};
