import { GrantCodesPerson } from './person.component.js';

export * from './person.component.js';
export default GrantCodesPerson;

if (!customElements.get('grantcodes-person')) {
  customElements.define('grantcodes-person', GrantCodesPerson);
}
