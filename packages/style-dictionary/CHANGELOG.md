# Changelog

## [1.5.1](https://github.com/grantcodes/ui/compare/style-dictionary-v1.5.0...style-dictionary-v1.5.1) (2026-04-18)


### Bug Fixes

* **ui:** improve hero and button colors across all themes ([523d783](https://github.com/grantcodes/ui/commit/523d78376ee263edd0b3ce08dbca48a71f5c33a7))
* **ui:** improve hero and button colors across all themes ([04fbe12](https://github.com/grantcodes/ui/commit/04fbe12979678de97771ba811e4a150f5cf46cca))

## [1.5.0](https://github.com/grantcodes/ui/compare/style-dictionary-v1.4.2...style-dictionary-v1.5.0) (2026-04-17)


### Features

* **10-01:** create tier-2 role-mapping files for all themes ([21dc495](https://github.com/grantcodes/ui/commit/21dc4957bb761d879f50c6443e450042d07f4ee9))
* **10-01:** rename tier-1 color tokens from color.brand.{name} to color.{name} ([1d1aaef](https://github.com/grantcodes/ui/commit/1d1aaef4aca9e2ca4be31402ca5615f510e9cf4f))
* **10-02:** rename dark tier-2 semantic tokens brand→primary and add secondary/tertiary ([6df2157](https://github.com/grantcodes/ui/commit/6df2157de0e46cbd9d8052773f944fa16f54b36b))
* **10-02:** rename light tier-2 semantic tokens brand→primary and add secondary/tertiary ([f51e426](https://github.com/grantcodes/ui/commit/f51e42660aa2e1142f30ddb50de2c7b083377d71))
* **10-03:** rename CSS brand token references to primary and fix dark tier-3 overrides ([6d85136](https://github.com/grantcodes/ui/commit/6d85136e632509517d503805a4cf813cc6659b97))
* **10-03:** upgrade tier-3 component tokens to reference tier-2 semantic tokens ([bd496b2](https://github.com/grantcodes/ui/commit/bd496b213958fbc0d674659f269148778f7ee790))
* **11-01:** add autoPalette preprocessor and base color token ([1c45d16](https://github.com/grantcodes/ui/commit/1c45d169fbb86c42cb020d57cc53321fcede20a6))
* **11-01:** implement generateOklchScale function ([6823539](https://github.com/grantcodes/ui/commit/6823539a2c080f536e66a1529ab367ab3f831c8d))
* **11-02:** add distinct secondary (teal) and tertiary (amber) color roles for grantcodes ([128ed40](https://github.com/grantcodes/ui/commit/128ed40c54c6f1199b53f6d1e04cff6986a9defd))
* **12-01:** merge dark tokens for todomap and grantina + delete all dark/ directories ([c56642a](https://github.com/grantcodes/ui/commit/c56642aa2a9835d25984f8388cf6d5460b17899d))
* **12-01:** merge dark tokens into tier-2 JSON with light-dark() for grantcodes and wireframe ([e8675ce](https://github.com/grantcodes/ui/commit/e8675ce0746737d00aca6b2653c91ffcdbf8e3a7))
* **12-02:** remove dark build pipeline from config.js + clean package.json exports ([059a735](https://github.com/grantcodes/ui/commit/059a73567fde2c8cc0371f8de2fe58e5069eae1b))
* **13-01:** remove unused color.transparent tier-1 tokens and rebuild ([33e4667](https://github.com/grantcodes/ui/commit/33e466705c7b271863350ab36f2f609568627a81))
* **13-01:** replace transparent background tokens with CSS relative color syntax ([c29237d](https://github.com/grantcodes/ui/commit/c29237dd4dc4ed8043cb564fe84d2abee1d759fe))
* **13-02:** replace rgba focus-ring colors with CSS relative color syntax in all 4 themes ([50bd235](https://github.com/grantcodes/ui/commit/50bd2356db081de45978e71bd4ef3a96013591a1))
* **14-01:** implement generateFluidScale ([5f28b1c](https://github.com/grantcodes/ui/commit/5f28b1c4a04df7ea7cbfea7da5799d83f3a01ad7))
* **14-02:** wire fluid-typography preprocessor into Style Dictionary build ([2fff64c](https://github.com/grantcodes/ui/commit/2fff64c14189d0610357805be8e1c21e68870e7b))
* **15-01:** remove duplicate default-variables CSS output ([4c8ece6](https://github.com/grantcodes/ui/commit/4c8ece676af9a7bc486ca326720c36a6a46260a9))
* **16-01:** restore tokens.css output + replace static wireframe font-size values with fluid calc ([1c71f96](https://github.com/grantcodes/ui/commit/1c71f96a0bd4a850c2be80e65a56568f57f93e06))
* **16-02:** todomap fluid font scale + add missing background tokens ([4c6818c](https://github.com/grantcodes/ui/commit/4c6818c434fa8ec143f83868ced68bf0662feaa0))
* **16-03:** replace static grantina font-size values with fluid calc expressions ([f05b243](https://github.com/grantcodes/ui/commit/f05b2438e73415a80766013b85f2523ed2b1198f))


### Bug Fixes

* **10-03:** correct dark mode knockout background shades from 200→500 for visibility ([2c67b89](https://github.com/grantcodes/ui/commit/2c67b8959cbf33acb25f201712569bd8fa731e9d))
* **13-02:** correct grantcodes focus-ring width-default to 0.2rem ([b4dc1c4](https://github.com/grantcodes/ui/commit/b4dc1c42fd3ebbc2688659ffda3f4168ee62385a))
* **14-02:** cap display step minRem at 4rem to prevent oversized H1 on mobile ([d11efde](https://github.com/grantcodes/ui/commit/d11efde91961a4fdaca0344ba1279db6310f640c))
* **16-01:** correct test assertion — h1/h2/h3 font-size references var() not calc() directly ([b430606](https://github.com/grantcodes/ui/commit/b430606382d258ed0487a15300d5a1289d99d83e))
* **16-03:** serialize test runner to prevent concurrent build conflicts ([ca2bd23](https://github.com/grantcodes/ui/commit/ca2bd2339f1ddd44e8f214bc25dd0222588e5856))
* **style-dictionary:** align theme typography structure and tune grant themes ([c9b5df7](https://github.com/grantcodes/ui/commit/c9b5df728241274f75eeae180189b9f5027f8ac6))
* **token-refactor:** fix theme colors for badges, buttons, borders, and content contrast across grantcodes and grantina themes ([e3c093d](https://github.com/grantcodes/ui/commit/e3c093d1db89664ca532d9d9ef146db695a69cd4))

## [1.4.2](https://github.com/grantcodes/ui/compare/style-dictionary-v1.4.1...style-dictionary-v1.4.2) (2026-04-07)


### Bug Fixes

* **quick-260407-glu:** improve dark mode link contrast and add subtle primary tint to light mode ([1830c5d](https://github.com/grantcodes/ui/commit/1830c5d22bb9cb3c741cd9133895ecd972fc08a3))
* **style-dictionary:** bump grantina border colors up one scale step ([c2b3d8c](https://github.com/grantcodes/ui/commit/c2b3d8cd33a873b00dc96def9e6e23d329059cdf))
* **style-dictionary:** grantina theme token tweaks ([f7789c5](https://github.com/grantcodes/ui/commit/f7789c5936d0e7128d71a8f32c5f009cb68c5f6c))
* **style-dictionary:** move raw oklch values from tier-2 to tier-1 tokens ([799010f](https://github.com/grantcodes/ui/commit/799010f3d75b116775c438f17724e18c81d15236))
* **style-dictionary:** revert grantina borders back to blue palette ([2d0b400](https://github.com/grantcodes/ui/commit/2d0b400d300ae2d9fa5e13079810e2254906d644))
* **style-dictionary:** switch grantina borders from blue to navy palette ([e347c9c](https://github.com/grantcodes/ui/commit/e347c9cdea058069557a41c98f2d3f66f98dedca))
* **style-dictionary:** use blue palette for grantina light mode backgrounds and borders ([fbc03a8](https://github.com/grantcodes/ui/commit/fbc03a821645174a200cff9ef98f57dfd7f6dfd7))
* **style-dictionary:** use existing navy/blue tier-1 tokens instead of bespoke palettes ([354e113](https://github.com/grantcodes/ui/commit/354e113316ab09a5405fa4a5b62fcb03034b1054))
* **style-dictionary:** use navy.300/200 for grantina borders ([da6ebd2](https://github.com/grantcodes/ui/commit/da6ebd2c3b3dbe920c4f69a1afe9c65fa8621572))

## [1.4.1](https://github.com/grantcodes/ui/compare/style-dictionary-v1.4.0...style-dictionary-v1.4.1) (2026-04-05)


### Bug Fixes

* add .light sub-element override CSS and fix ::selection token ([1ae9007](https://github.com/grantcodes/ui/commit/1ae900779cf6a241a7e430b86a3e3c0cb988f954))
* add .light sub-element override CSS and fix ::selection token ([9e9c0c3](https://github.com/grantcodes/ui/commit/9e9c0c32d3b68fd6db5b0b7f40ab14341cc96684))

## [1.4.0](https://github.com/grantcodes/ui/compare/style-dictionary-v1.3.1...style-dictionary-v1.4.0) (2026-04-05)


### Features

* add dark mode support for all themes ([c32766a](https://github.com/grantcodes/ui/commit/c32766af3948e11172107a4643e9a5d3132afac7))
* add dark mode support for all themes ([101a2a3](https://github.com/grantcodes/ui/commit/101a2a371ad3cc12240b0c9c92c348c21c67934b))
* **tokens:** migrate typography naming from display/headline/title to h1-h6 ([4b607a7](https://github.com/grantcodes/ui/commit/4b607a7450ff2b3d3236ca4aa7a42d63f8f2ff37))
* **ui, style-dictionary:** add grantina theme and update typography tokens ([096b8e4](https://github.com/grantcodes/ui/commit/096b8e4fc1a17f7d1f8fc1154b7f5d540f475b8f))


### Bug Fixes

* await buildAllPlatforms() so dark build can read light tokens.css ([ba4f75a](https://github.com/grantcodes/ui/commit/ba4f75af58b9b89bad81a3302535084cec20115f))

## [1.3.1](https://github.com/grantcodes/ui/compare/style-dictionary-v1.3.0...style-dictionary-v1.3.1) (2026-03-15)


### Bug Fixes

* **style-dictionary:** deploy files ([d2a4913](https://github.com/grantcodes/ui/commit/d2a49132cf7a526c134713e792c6d9fe076e7787))

## [1.3.0](https://github.com/grantcodes/ui/compare/style-dictionary-v1.2.1...style-dictionary-v1.3.0) (2026-03-14)


### Features

* **tokens:** expand spacing tokens and add typography shorthand ([0d9a558](https://github.com/grantcodes/ui/commit/0d9a5580a32a6ecf2b170d54fde3d1c68008e314))

## [1.2.1](https://github.com/grantcodes/ui/compare/style-dictionary-v1.2.0...style-dictionary-v1.2.1) (2026-03-07)


### Bug Fixes

* update imports & exports ([db68e69](https://github.com/grantcodes/ui/commit/db68e69f5307fd62f26a6e65c9904e86ab156af6))

## [1.1.0](https://github.com/grantcodes/style-dictionary/compare/v1.0.0...v1.1.0) (2022-09-23)


### Features

* add standard ([34f14f5](https://github.com/grantcodes/style-dictionary/commit/34f14f584edf9ed7a743fa0ef35753026932503b))

## 1.0.0 (2022-09-23)


### Features

* add commit lint functionality ([d3ed6d7](https://github.com/grantcodes/style-dictionary/commit/d3ed6d764d22fcf4f124a47b35c6275b70b07786))
