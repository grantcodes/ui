import { strict as assert } from 'node:assert';
import { readFile } from 'node:fs/promises';
import { afterEach, describe, it } from 'node:test';
import { cleanup, fixture } from '../../test-utils/index.js';
import { calculateSegments } from './split-bar.calculations.js';
import './split-bar.js';

describe('calculateSegments', () => {
  it('calculates proportional shares and independently rounded percentages', () => {
    assert.deepEqual(
      calculateSegments([
        { id: 'first', label: 'First', value: 61 },
        { id: 'second', label: 'Second', value: 39 },
      ]).map(({ id, share, percentage }) => ({ id, share, percentage })),
      [
        { id: 'first', share: 0.61, percentage: 61 },
        { id: 'second', share: 0.39, percentage: 39 },
      ],
    );

    assert.deepEqual(
      calculateSegments([
        { id: 'first', label: 'First', value: 1 },
        { id: 'second', label: 'Second', value: 1 },
        { id: 'third', label: 'Third', value: 1 },
      ]).map(({ percentage }) => percentage),
      [33, 33, 33],
    );
  });

  it('handles valid, invalid, and very large values without mutating input', () => {
    const segments = [
      { id: 'large', label: 'Large', value: Number.MAX_VALUE },
      { id: 'small', label: 'Small', value: Number.MAX_VALUE / 2 },
      { id: 'zero', label: 'Zero', value: 0 },
      { id: 'negative', label: 'Negative', value: -1 },
      { id: 'infinite', label: 'Infinite', value: Infinity },
      { id: 'text', label: 'Text', value: '1' },
      { id: 'missing', label: 'Missing' },
      { id: 1, label: 'Malformed', value: 1 },
      null,
    ];
    const original = structuredClone(segments.map((segment) => (segment === null ? segment : { ...segment })));
    original[4].value = Infinity;

    const result = calculateSegments(segments);

    assert.deepEqual(result.map(({ id, percentage }) => ({ id, percentage })), [
      { id: 'large', percentage: 67 },
      { id: 'small', percentage: 33 },
      { id: 'zero', percentage: 0 },
      { id: 'negative', percentage: 0 },
      { id: 'infinite', percentage: 0 },
      { id: 'text', percentage: 0 },
      { id: 'missing', percentage: 0 },
    ]);
    assert.deepEqual(segments, original);
  });

  it('keeps zero entries and returns zero shares for empty or zero totals', () => {
    assert.deepEqual(calculateSegments(), []);
    assert.deepEqual(calculateSegments({}), []);
    assert.deepEqual(
      calculateSegments([
        { id: 'zero', label: 'Zero', value: 0 },
        { id: 'also-zero', label: 'Also zero', value: 0 },
      ]).map(({ share, percentage }) => ({ share, percentage })),
      [
        { share: 0, percentage: 0 },
        { share: 0, percentage: 0 },
      ],
    );
  });

  it('uses supplied colours and cycles default token colours by input order', () => {
    assert.deepEqual(
      calculateSegments([
        { id: 'first', label: 'First', value: 1 },
        { id: 'second', label: 'Second', value: 1, color: 'rebeccapurple' },
        { id: 'third', label: 'Third', value: 1 },
        { id: 'fourth', label: 'Fourth', value: 1 },
      ]).map(({ color }) => color),
      [
        'var(--g-color-primary-500)',
        'rebeccapurple',
        'var(--g-color-tertiary-500)',
        'var(--g-color-primary-500)',
      ],
    );
  });
});

describe('Split bar component', () => {
  let element;

  afterEach(() => {
    cleanup(element);
  });

  it('wires the component through the root and React modules', async () => {
    const [rootModule, reactModule] = await Promise.all([
      readFile(new URL('../../main.js', import.meta.url), 'utf8'),
      readFile(new URL('../../react.js', import.meta.url), 'utf8'),
    ]);

    assert.match(rootModule, /components\/split-bar\/index\.js/);
    assert.match(reactModule, /components\/split-bar\/split-bar\.react\.js/);
  });

  it('registers with an empty neutral bar by default', async () => {
    element = await fixture('grantcodes-split-bar');

    assert.deepEqual(element.segments, []);
    assert.ok(element.shadowRoot.querySelector('[part="bar"][aria-hidden="true"]'));
    assert.equal(element.shadowRoot.querySelector('[part="legend"]'), null);
    assert.equal(element.shadowRoot.querySelector('[role="progressbar"], [role="meter"]'), null);
    assert.equal(element.shadowRoot.querySelector('[tabindex]'), null);
  });

  it('renders JSON attributes, labels, percentages, and matching swatches in order', async () => {
    element = document.createElement('grantcodes-split-bar');
    element.setAttribute(
      'segments',
      JSON.stringify([
        { id: 'first', label: 'First', value: 61 },
        { id: 'second', label: 'Second', value: 39, color: 'var(--g-color-utility-success)' },
      ]),
    );
    document.body.appendChild(element);
    await element.updateComplete;

    const legend = element.shadowRoot.querySelector('[part="legend"]');
    const entries = [...legend.querySelectorAll('.split-bar__legend-item')];
    const barSegments = [...element.shadowRoot.querySelectorAll('[part="segment"]')];

    assert.equal(legend.tagName, 'UL');
    assert.equal(legend.getAttribute('role'), 'list');
    assert.deepEqual(
      entries.map((entry) => ({
        label: entry.querySelector('.split-bar__label').textContent,
        percentage: entry.querySelector('.split-bar__percentage').textContent,
      })),
      [
        { label: 'First', percentage: '61%' },
        { label: 'Second', percentage: '39%' },
      ],
    );
    assert.deepEqual(entries.map((entry) => entry.dataset.segmentId), ['first', 'second']);
    assert.deepEqual(
      [...entries[0].children].map((child) => child.className),
      ['split-bar__swatch', 'split-bar__percentage', 'split-bar__label'],
    );
    assert.equal(barSegments[0].style.getPropertyValue('--split-bar-segment-share'), '61%');
    assert.equal(barSegments[1].style.getPropertyValue('--split-bar-segment-share'), '39%');
    assert.equal(entries[1].querySelector('.split-bar__swatch').getAttribute('aria-hidden'), 'true');
  });

  it('treats malformed JSON as an empty state', async () => {
    element = document.createElement('grantcodes-split-bar');
    element.setAttribute('segments', '{not json');
    document.body.appendChild(element);
    await element.updateComplete;

    assert.equal(element.segments, null);
    assert.equal(element.shadowRoot.querySelector('[part="legend"]'), null);
  });

  it('updates when segments is replaced and escapes labels as text', async () => {
    element = await fixture('grantcodes-split-bar', {
      segments: [{ id: 'first', label: '<strong>First</strong>', value: 1 }],
    });
    element.segments = [{ id: 'second', label: 'Second', value: 3 }];
    await element.updateComplete;

    assert.equal(element.shadowRoot.querySelector('.split-bar__label').textContent, 'Second');
    assert.equal(element.shadowRoot.querySelector('strong'), null);
    assert.equal(element.shadowRoot.querySelector('.split-bar__percentage').textContent, '100%');
  });

  it('renders retained zero-value entries with visible zero percentages', async () => {
    element = await fixture('grantcodes-split-bar', {
      segments: [
        { id: 'zero', label: 'Zero', value: 0 },
        { id: 'positive', label: 'Positive', value: 2 },
      ],
    });

    const barSegments = [...element.shadowRoot.querySelectorAll('[part="segment"]')];
    assert.deepEqual(
      [...element.shadowRoot.querySelectorAll('.split-bar__percentage')].map((percentage) => percentage.textContent),
      ['0%', '100%'],
    );
    assert.equal(barSegments[0].style.getPropertyValue('--split-bar-segment-share'), '0%');
  });
});
