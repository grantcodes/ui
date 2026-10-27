import { cemValidatorPlugin } from '@wc-toolkit/cem-validator';
import { cemSorterPlugin } from '@wc-toolkit/cem-sorter';
import { cemInheritancePlugin } from '@wc-toolkit/cem-inheritance';
import { modulePathResolverPlugin } from '@wc-toolkit/module-path-resolver';

/** @type {import('@custom-elements-manifest/analyzer').AnalyzerConfig} */
export default {
  globs: ['src/components/**/*.component.ts', 'src/components/**/*.ts'],
  exclude: [
    '**/*.stories.ts',
    '**/*.stories.tsx',
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/*.react.ts',
    '**/*.css',
    '**/*.scss',
    '**/*.styles.ts',
  ],
  litelement: true,
  plugins: [
    modulePathResolverPlugin({
      modulePathTemplate: (modulePath) =>
        modulePath.replace(/^\/?src\//, 'dist/').replace(/\.ts$/, '.js'),
    }),
    cemInheritancePlugin(),
    cemSorterPlugin({
      deprecatedLast: true,
    }),
    cemValidatorPlugin({
      rules: {
        packageJson: {
          customElementsProperty: 'error',
        },
        // TypeScript declarations reference imported types (e.g. lit's PropertyValues)
        // that a component module does not export, so this rule cannot pass post-migration.
        manifest: { exportTypes: 'off' },
      },
    }),
  ],
};
