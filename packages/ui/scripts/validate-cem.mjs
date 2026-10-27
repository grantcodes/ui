import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const manifest = JSON.parse(readFileSync(new URL('custom-elements.json', root), 'utf8'));
const modules = new Map(manifest.modules.map((module) => [module.path, module]));

assert.equal(modules.size, manifest.modules.length, 'Duplicate CEM module paths');

for (const module of manifest.modules) {
  assert.ok(module.path.startsWith('dist/'), `Unpublished CEM path: ${module.path}`);
  assert.ok(existsSync(new URL(module.path, root)), `Missing CEM module: ${module.path}`);
  assert.ok(
    existsSync(new URL(module.path.replace(/\.js$/, '.d.ts'), root)),
    `Missing CEM declaration file: ${module.path}`,
  );

  for (const entry of module.exports ?? []) {
    if (entry.kind !== 'custom-element-definition') continue;
    const declaration = entry.declaration;
    const target = modules.get(declaration?.module);
    assert.ok(
      target?.declarations?.some((item) => item.name === declaration.name),
      `Unresolved definition: ${entry.name} in ${module.path}`,
    );
  }
}

const dialog = manifest.modules.flatMap((module) => module.declarations ?? [])
  .find((declaration) => declaration.tagName === 'grantcodes-dialog');
assert.deepEqual(dialog.slots.map((slot) => slot.name).sort(), ['', 'footer', 'header']);
for (const name of ['open', 'dismissible']) {
  assert.ok(dialog.attributes.find((attribute) => attribute.name === name)?.description);
}

console.log(`Validated ${modules.size} published CEM modules in ${fileURLToPath(root)}`);
