import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const CANDIDATES = ['.ts', '.tsx'];

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('.') && specifier.endsWith('.js') && context.parentURL) {
    const target = new URL(specifier, context.parentURL);
    if (!existsSync(fileURLToPath(target))) {
      for (const ext of CANDIDATES) {
        const candidate = new URL(`${specifier.slice(0, -3)}${ext}`, context.parentURL);
        if (existsSync(fileURLToPath(candidate))) return nextResolve(candidate.href, context);
      }
    }
  }
  return nextResolve(specifier, context);
}
