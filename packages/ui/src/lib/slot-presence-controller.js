/**
 * Tracks whether a slot has slotted content.
 *
 * CSS cannot do this: `:has(slot:empty)` always matches because the `<slot>`
 * element itself is always empty in the shadow tree. `:host(:has([slot=x]))`
 * does not help either — a `:has()` inside a shadow root cannot match light-DOM
 * children (checked in Chromium 153), so the check has to happen in JS.
 */
export class SlotPresenceController {
  /**
   * @param {import('lit').ReactiveControllerHost} host
   * @param {string} slotName - Slot to watch; `''` for the default slot.
   * @param {(present: boolean) => void} onChange
   */
  constructor(host, slotName, onChange) {
    this.host = host;
    this.slotName = slotName;
    this.onChange = onChange;
    /** @type {boolean | undefined} */
    this.present = undefined;
    host.addController(this);
  }

  hostUpdate() {
    this.refresh();
  }

  /** Re-checks the light DOM and notifies on the first check and on changes. */
  refresh() {
    const present = this._detect();
    if (present === this.present) return;
    this.present = present;
    this.onChange(present);
  }

  _nodes() {
    if (this.slotName) {
      return Array.from(this.host.querySelectorAll(`[slot="${this.slotName}"]`));
    }
    return Array.from(this.host.childNodes).filter((node) => !node.getAttribute?.('slot'));
  }

  _detect() {
    return this._nodes().some(
      (node) => node.nodeType === 1 || (node.textContent ?? '').trim() !== '',
    );
  }
}
