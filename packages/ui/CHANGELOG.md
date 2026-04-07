# Changelog

## [2.8.1](https://github.com/grantcodes/ui/compare/ui-v2.8.0...ui-v2.8.1) (2026-04-07)


### Bug Fixes

* **gallery:** filmstrip images should fill height with auto width, not square crop ([62d436f](https://github.com/grantcodes/ui/commit/62d436fe75f42c6d99c380c9d4384e53a97abef1))
* **gallery:** SSR-safe filmstrip variant with variant prop refactor ([2af368c](https://github.com/grantcodes/ui/commit/2af368cba60b55021f563a06c1416219abb0b024))
* **gallery:** use CSS custom properties for filmstrip styles instead of JS attribute propagation ([f83efcf](https://github.com/grantcodes/ui/commit/f83efcfcf24a896dcdcb943b5988a9daefcf8947))

## [2.8.0](https://github.com/grantcodes/ui/compare/ui-v2.7.0...ui-v2.8.0) (2026-04-07)


### Features

* **09-gallery-film-strip:** add filmstrip and marquee gallery variants ([0a4ff3e](https://github.com/grantcodes/ui/commit/0a4ff3e620bc21a6d291943acc72608d1c08d371))
* **ui:** gallery filmstrip variant ([d22a93d](https://github.com/grantcodes/ui/commit/d22a93d615874ca76fcf7525ea8d1dfa71721e2b))

## [2.7.0](https://github.com/grantcodes/ui/compare/ui-v2.6.0...ui-v2.7.0) (2026-04-06)


### Features

* add center prop and default slot to hero component ([7e1ffde](https://github.com/grantcodes/ui/commit/7e1ffdebc1a51f12f6c8685e36ac9f1e142eb9f1))
* add center prop and default slot to hero component ([89f0b42](https://github.com/grantcodes/ui/commit/89f0b42c8eb0214ab2126efdd8f2bc959b170922)), closes [#49](https://github.com/grantcodes/ui/issues/49) [#58](https://github.com/grantcodes/ui/issues/58)
* add grantcodes-countdown component ([a67ab75](https://github.com/grantcodes/ui/commit/a67ab7560b73c3f3f55d65371497d331ce9896ea))
* add grantcodes-countdown component ([5beb8a1](https://github.com/grantcodes/ui/commit/5beb8a1bf87ff91542ab03974e68b049ed02a2ae)), closes [#56](https://github.com/grantcodes/ui/issues/56)
* add grantcodes-map component (OpenStreetMap embed) ([0671693](https://github.com/grantcodes/ui/commit/0671693285fc44a945f6be77ed50b3128dcbbb3c))
* add grantcodes-map component (OpenStreetMap embed) ([69919ae](https://github.com/grantcodes/ui/commit/69919ae03307406b166baf2ee33a1b33c5eca517)), closes [#55](https://github.com/grantcodes/ui/issues/55)
* add TypeScript ambient declarations for component import paths ([c456370](https://github.com/grantcodes/ui/commit/c456370ff3130b9d77d5abcce94157bb454c8a40))
* add TypeScript ambient declarations for component import paths ([3c08b56](https://github.com/grantcodes/ui/commit/3c08b56d5907f5f1ab4e11fed559b6d9aef4af23)), closes [#54](https://github.com/grantcodes/ui/issues/54)
* improve accordion styling with SVG chevron and unified borders ([4a84167](https://github.com/grantcodes/ui/commit/4a84167b2b3956544085dd47c8d9ccf0dd5707f4))
* improve accordion styling with SVG chevron and unified borders ([f35c83d](https://github.com/grantcodes/ui/commit/f35c83d594dd7453257096c510c57a73124d2667)), closes [#50](https://github.com/grantcodes/ui/issues/50)
* **map:** dark mode filter based on .dark/.light classes ([40550b7](https://github.com/grantcodes/ui/commit/40550b7969858a83cf298680471e525ed57d0854))
* **map:** switch tile layer based on color scheme ([ccd991e](https://github.com/grantcodes/ui/commit/ccd991e40bde054b664b61ab83579d5ec83358bb))


### Bug Fixes

* accordion chevron axis, focus ring, and subtle styling ([c44d877](https://github.com/grantcodes/ui/commit/c44d8774f88c80ade425f735110472e0d8cb91cd))
* **accordion:** add bottom border-radius to content panel ([111aa87](https://github.com/grantcodes/ui/commit/111aa87ba682d3a9faa8beb06a8e8746503eac87))
* **accordion:** remove top border from content panel ([7668223](https://github.com/grantcodes/ui/commit/766822325ecd65d04a6e43bafcfca206999941b2))
* **accordion:** swap backgrounds — subtle on summary, default on content ([c3fe7a5](https://github.com/grantcodes/ui/commit/c3fe7a52f35d1cc1e15d8e7ee9eec089f57da420))
* **accordion:** use subtle background for content panel ([182e8f3](https://github.com/grantcodes/ui/commit/182e8f3fd3a8179b3c196003188abb08fe5e67b8))
* add box-sizing border-box reset to all component shadow roots ([c5cfb8f](https://github.com/grantcodes/ui/commit/c5cfb8faa15b480b915b29d4458d2d92bd5aef12))
* add box-sizing border-box reset to all component shadow roots ([184fa6b](https://github.com/grantcodes/ui/commit/184fa6b3b064e445f540b05bc4b6686a91a6690e)), closes [#48](https://github.com/grantcodes/ui/issues/48)
* bump countdown font size to h1 scale, zero-pad values, add flip animation ([94ee0fa](https://github.com/grantcodes/ui/commit/94ee0fac8793284a61c6abca65754571b2c76743))
* **footer:** subtle background + border, simplify slotted typography ([48d1037](https://github.com/grantcodes/ui/commit/48d10371b530321c833efe9677ce2e94b7282337))
* improve footer styling with subtle background and simplified typography ([2c727d9](https://github.com/grantcodes/ui/commit/2c727d97c836469adc019ce39493044fdd732c62))
* **map:** remove 1px gap below iframe ([2663c2a](https://github.com/grantcodes/ui/commit/2663c2ab350e43f2b7e0c3c18c1c368ac83b563f))
* **map:** revert layer switching, use CSS filters for dark mode ([d24071a](https://github.com/grantcodes/ui/commit/d24071a712a290e06347e022112b013bc324e503))
* narrow footer slotted content color to specific elements ([4ed977e](https://github.com/grantcodes/ui/commit/4ed977ec2b7c4b897baa45686f85503d80abcf5a)), closes [#51](https://github.com/grantcodes/ui/issues/51)

## [2.6.0](https://github.com/grantcodes/ui/compare/ui-v2.5.1...ui-v2.6.0) (2026-04-06)


### Features

* **08-02:** add nav-link component, fix CSS cascade, refactor base styles ([fa143e2](https://github.com/grantcodes/ui/commit/fa143e2362b90b8d2879148bee7044db21dcb5e7))
* **08-02:** rewrite app bar Storybook stories without inline styles ([1424640](https://github.com/grantcodes/ui/commit/1424640b696b5c97aca269f2594cbad8b51ec45f))
* **08-03:** redesign mobile menu as full-screen overlay with animation ([600dc6e](https://github.com/grantcodes/ui/commit/600dc6e478691d0642ca34f52306ff67489baf12))
* app bar improvements — nav-link component, CSS fixes, mobile menu overlay ([d1e66a2](https://github.com/grantcodes/ui/commit/d1e66a20d9d258eda22303f827491780d1d2467b))


### Bug Fixes

* **08-01:** clean up app-bar CSS — dead code, tokens, sticky, a11y, responsive ([000fd4b](https://github.com/grantcodes/ui/commit/000fd4b2c5b4be04900ab42a63298e6d8735d67c))
* **08-03:** close mobile menu on resize past desktop breakpoint ([dac56e1](https://github.com/grantcodes/ui/commit/dac56e1bcfa735e37fe82c43fde89be3c211d0c3))
* move font shorthand before line-height in reset.css to fix lint error ([98c9bba](https://github.com/grantcodes/ui/commit/98c9bbac15e3a7db81c103023352f6f8f071dbb6))

## [2.5.1](https://github.com/grantcodes/ui/compare/ui-v2.5.0...ui-v2.5.1) (2026-04-05)


### Bug Fixes

* add .light sub-element override CSS and fix ::selection token ([1ae9007](https://github.com/grantcodes/ui/commit/1ae900779cf6a241a7e430b86a3e3c0cb988f954))
* add .light sub-element override CSS and fix ::selection token ([9e9c0c3](https://github.com/grantcodes/ui/commit/9e9c0c32d3b68fd6db5b0b7f40ab14341cc96684))

## [2.5.0](https://github.com/grantcodes/ui/compare/ui-v2.4.1...ui-v2.5.0) (2026-04-05)


### Features

* add dark mode support for all themes ([c32766a](https://github.com/grantcodes/ui/commit/c32766af3948e11172107a4643e9a5d3132afac7))
* add dark mode support for all themes ([101a2a3](https://github.com/grantcodes/ui/commit/101a2a371ad3cc12240b0c9c92c348c21c67934b))
* **tokens:** migrate typography naming from display/headline/title to h1-h6 ([4b607a7](https://github.com/grantcodes/ui/commit/4b607a7450ff2b3d3236ca4aa7a42d63f8f2ff37))
* **ui, style-dictionary:** add grantina theme and update typography tokens ([096b8e4](https://github.com/grantcodes/ui/commit/096b8e4fc1a17f7d1f8fc1154b7f5d540f475b8f))

## [2.4.1](https://github.com/grantcodes/ui/compare/ui-v2.4.0...ui-v2.4.1) (2026-04-01)


### Bug Fixes

* **card:** use data-has-content attribute to hide empty header/footer ([974890c](https://github.com/grantcodes/ui/commit/974890c86441a7e009a1d32bfef51533b22326df)), closes [#38](https://github.com/grantcodes/ui/issues/38)
* **ui:** use data-has-content to hide empty card header/footer ([09df205](https://github.com/grantcodes/ui/commit/09df2051d6e2b7758a2b074ea3a99c3d5fdff30b))

## [2.4.0](https://github.com/grantcodes/ui/compare/ui-v2.3.0...ui-v2.4.0) (2026-03-30)


### Features

* **ui:** add CSS layers and simplify component stylesheet bundle ([42c183c](https://github.com/grantcodes/ui/commit/42c183c303b81d8a4d0a7bb7a4d5f6482697b3d9))


### Bug Fixes

* **ui:** replace sanitize.css imports with inlined custom reset ([c97182b](https://github.com/grantcodes/ui/commit/c97182bc98406055f81e6b2433427e52723776b8))
* **ui:** replace sanitize.css with inlined custom reset ([f5fe733](https://github.com/grantcodes/ui/commit/f5fe733007783452a4f4612e846960e074386677))

## [2.3.0](https://github.com/grantcodes/ui/compare/ui-v2.2.0...ui-v2.3.0) (2026-03-25)


### Features

* **01-01:** create React wrapper components for all Lit web components ([f5d47a7](https://github.com/grantcodes/ui/commit/f5d47a7e1dc45d5d5f21823dcba59c687feed56f))
* **ui:** add react exports ([f040673](https://github.com/grantcodes/ui/commit/f04067332e5d70803d6f72aade875f08ad05e090))

## [2.2.0](https://github.com/grantcodes/ui/compare/ui-v2.1.1...ui-v2.2.0) (2026-03-25)


### Features

* **01-01:** configure Vite and Storybook for CSS import attributes ([039436c](https://github.com/grantcodes/ui/commit/039436c20b160f1889944df02cab958641e768fe))
* **02-01:** migrate button component to CSS import attributes with shared focus-ring ([a579ffd](https://github.com/grantcodes/ui/commit/a579ffd08916b37050d46ef459c458c1474567f9))
* **02-01:** migrate focus-ring and badge to CSS import attributes ([becaad7](https://github.com/grantcodes/ui/commit/becaad7eed6ea0f233deb675b07edf1109840925))
* **02-01:** update button to use #styles alias for focus-ring import ([6d1be3d](https://github.com/grantcodes/ui/commit/6d1be3db08f0575288436dc0eff25517060b1f1e))
* **03-01:** migrate all 31 remaining components to CSS import attributes ([89eb3cd](https://github.com/grantcodes/ui/commit/89eb3cdbddf200dac6b606eba28f3f5f99bb663d))
* **04-01:** add explicit CSS subpath exports for all components ([348746f](https://github.com/grantcodes/ui/commit/348746f0cf2b6de049b6ec20b6ed0887ed5dadfd))
* **ui:** add Lit CSSResult for SSR and TypeScript declarations ([bada435](https://github.com/grantcodes/ui/commit/bada435b8dcd0fbfae75310e32c1e152ca736d84))
* **ui:** migrate CSS styles from JS to CSS import attributes ([b9cac40](https://github.com/grantcodes/ui/commit/b9cac406ab902b3837a39b184d683849fe242402))


### Bug Fixes

* **04-01:** remove unused import in exports test ([ab70a17](https://github.com/grantcodes/ui/commit/ab70a1759545d837169d10eebe4c4da7e9387e59))
* **ui:** add SSR-safe CSSStyleSheet guard and Astro vite plugin ([b75bddc](https://github.com/grantcodes/ui/commit/b75bddc7315107fe6f84f17f7320efb699f40f45))
* **ui:** extract CSS import attributes plugin and fix Storybook compatibility ([5c282fc](https://github.com/grantcodes/ui/commit/5c282fc82387ef8278bb9273bf3b3522c3c7226b))

## [2.1.1](https://github.com/grantcodes/ui/compare/ui-v2.1.0...ui-v2.1.1) (2026-03-15)


### Bug Fixes

* **ui:** pnpm build issues ([9dae345](https://github.com/grantcodes/ui/commit/9dae345ea55d3ba8b674e16c989cf3d807381993))
* **ui:** replace workspace protocol for published dependency ([fd1fbc3](https://github.com/grantcodes/ui/commit/fd1fbc3f3787ca26a4f9ff54d6b6c9c2941676d7))

## [2.1.0](https://github.com/grantcodes/ui/compare/ui-v2.0.2...ui-v2.1.0) (2026-03-14)


### Features

* **ui:** add marketing components and expand public UI exports ([7d3f6e2](https://github.com/grantcodes/ui/commit/7d3f6e2ba2eff1334411f2615ab8015832d8acc9))

## [2.0.2](https://github.com/grantcodes/ui/compare/ui-v2.0.1...ui-v2.0.2) (2026-03-07)


### Bug Fixes

* update imports & exports ([db68e69](https://github.com/grantcodes/ui/commit/db68e69f5307fd62f26a6e65c9904e86ab156af6))

## [2.0.1](https://github.com/grantcodes/ui/compare/ui-v2.0.0...ui-v2.0.1) (2026-03-07)


### Bug Fixes

* update ui style dictionary version ([08a8836](https://github.com/grantcodes/ui/commit/08a8836f296d29d066be73ae98d3feea911922f7))

## [2.0.0-beta.10](https://github.com/grantcodes/ui/compare/v2.0.0-beta.9...v2.0.0-beta.10) (2025-06-29)


### Features

* **button:** pass more button attributes to button component ([52f5828](https://github.com/grantcodes/ui/commit/52f5828ce5d5382318b0945fad84ad3b1b299374))


### Miscellaneous Chores

* release 2.0.0-beta.10 ([2eea9d0](https://github.com/grantcodes/ui/commit/2eea9d0e8a133508c66ee65fd57117d031434f05))

## [2.0.0-beta.9](https://github.com/grantcodes/ui/compare/v2.0.0-beta.8...v2.0.0-beta.9) (2025-03-21)


### Miscellaneous Chores

* release 2.0.0-beta.9 ([3d62bd5](https://github.com/grantcodes/ui/commit/3d62bd57da6ecf7f6e31e8f8cc19fd215e239355))

## [2.0.0-beta.8](https://github.com/grantcodes/ui/compare/v2.0.0-beta.7...v2.0.0-beta.8) (2025-03-21)


### Miscellaneous Chores

* release 2.0.0-beta.8 ([72ab7b1](https://github.com/grantcodes/ui/commit/72ab7b1aa01b60f62e6516d2a5bc682cb969f11b))

## [2.0.0-beta.8](https://github.com/grantcodes/ui/compare/v2.0.0-beta.7...v2.0.0-beta.8) (2024-11-05)


### Miscellaneous Chores

* release 2.0.0-beta.8 ([72ab7b1](https://github.com/grantcodes/ui/commit/72ab7b1aa01b60f62e6516d2a5bc682cb969f11b))

## [2.0.0-beta.7](https://github.com/grantcodes/ui/compare/v2.0.0-beta.6...v2.0.0-beta.7) (2024-11-05)


### Miscellaneous Chores

* release 2.0.0-beta.7 ([ca8831c](https://github.com/grantcodes/ui/commit/ca8831ce2543aaaa4784ca027c72a5e1e280e9ef))

## [2.0.0-beta.6](https://github.com/grantcodes/ui/compare/v2.0.1-beta.5...v2.0.0-beta.6) (2024-10-30)


### Features

* **avatar:** add initial Avatar component ([0f0f6eb](https://github.com/grantcodes/ui/commit/0f0f6eb7d956aa3fa479baeb641bbd60e98904f2))
* **container:** update Container full variation and add viewport variation ([74a02e1](https://github.com/grantcodes/ui/commit/74a02e1f67b95a02dbe3efba9d97282749009f6f))
* **dialog:** add initial Dialog component ([6d50f52](https://github.com/grantcodes/ui/commit/6d50f52031cd4ae23183dac2152be29579bc3de9))
* **form-field:** add initial form-field component ([1ea4589](https://github.com/grantcodes/ui/commit/1ea458963e5039d6cfda9ca054a9527ad4540304))
* **gallery:** add gallery component ([4f8d6e1](https://github.com/grantcodes/ui/commit/4f8d6e11d5ea5c4ec7a0288ce61b65bb77e9be1b))
* improve focus styles ([8137403](https://github.com/grantcodes/ui/commit/8137403fd19f36cd034c9909dbd8088782905c53))
* **tabs:** add Tabs component ([e8d8452](https://github.com/grantcodes/ui/commit/e8d8452d7c8ce223fdcc5ac28371bb52859955f3))
* **tooltip:** add initial Tooltip component ([4991c56](https://github.com/grantcodes/ui/commit/4991c5631da7fd993c33f767252836730d5aae01))


### Bug Fixes

* **avatar:** export the Avatar component from the main exports ([2f4119b](https://github.com/grantcodes/ui/commit/2f4119b9216fe344712f3a9bf4abda9eb1245fb4))
* **code-preview:** fix code preview SSR ([3d327f7](https://github.com/grantcodes/ui/commit/3d327f741430e2421ee1812b5170339a5f4af110))
* **codepreview:** fix syntax highlighting ([5010a1f](https://github.com/grantcodes/ui/commit/5010a1f31c789d028154b036f29c67f3539f38b2))
* **icon:** fix icon ssr ([c953502](https://github.com/grantcodes/ui/commit/c95350285a53bb7d5b6527bf640655c7125066a5))
* **input:** improve select styles ([3d17cc4](https://github.com/grantcodes/ui/commit/3d17cc45da034995ee5ca4b85148f0c0e0f2f080))
* **notice:** fix notice dismiss button ([254e20a](https://github.com/grantcodes/ui/commit/254e20ae232f33ebefbe2b69aaf6e16554fa1d91))
* **plop:** fix plopfile ([dfc0879](https://github.com/grantcodes/ui/commit/dfc087927397bbc8a49666631b19b075dcaf4b9a))
* **tabs:** add missing tabs/internal folder ([545a372](https://github.com/grantcodes/ui/commit/545a372a30bd3acae40ce2392064f3d2190702c4))
* **tabs:** simplify and improve tabs ([c4badfb](https://github.com/grantcodes/ui/commit/c4badfb69fae21c29774032d24e45bfa89796ce4))


### Miscellaneous Chores

* release 2.0.0-beta.5 ([04f38a1](https://github.com/grantcodes/ui/commit/04f38a1a79840ee15a1bc44c3e55ada780f1c2c4))
* release 2.0.0-beta.6 ([de561ab](https://github.com/grantcodes/ui/commit/de561ab4fe2cddb2a656a9cf2fc37457f909c9b7))
* release 2.0.0-beta4 ([5087ac5](https://github.com/grantcodes/ui/commit/5087ac51b8bf4bc31ce9bd312fa32114d2b9f78e))

## [2.0.0-beta.5](https://github.com/grantcodes/ui/compare/v2.0.2-beta...v2.0.0-beta.5) (2024-10-29)


### Features

* **avatar:** add initial Avatar component ([0f0f6eb](https://github.com/grantcodes/ui/commit/0f0f6eb7d956aa3fa479baeb641bbd60e98904f2))
* **container:** update Container full variation and add viewport variation ([74a02e1](https://github.com/grantcodes/ui/commit/74a02e1f67b95a02dbe3efba9d97282749009f6f))
* **dialog:** add initial Dialog component ([6d50f52](https://github.com/grantcodes/ui/commit/6d50f52031cd4ae23183dac2152be29579bc3de9))
* **form-field:** add initial form-field component ([1ea4589](https://github.com/grantcodes/ui/commit/1ea458963e5039d6cfda9ca054a9527ad4540304))
* **gallery:** add gallery component ([4f8d6e1](https://github.com/grantcodes/ui/commit/4f8d6e11d5ea5c4ec7a0288ce61b65bb77e9be1b))
* improve focus styles ([8137403](https://github.com/grantcodes/ui/commit/8137403fd19f36cd034c9909dbd8088782905c53))
* **tabs:** add Tabs component ([e8d8452](https://github.com/grantcodes/ui/commit/e8d8452d7c8ce223fdcc5ac28371bb52859955f3))
* **tooltip:** add initial Tooltip component ([4991c56](https://github.com/grantcodes/ui/commit/4991c5631da7fd993c33f767252836730d5aae01))


### Bug Fixes

* **avatar:** export the Avatar component from the main exports ([2f4119b](https://github.com/grantcodes/ui/commit/2f4119b9216fe344712f3a9bf4abda9eb1245fb4))
* **codepreview:** fix syntax highlighting ([5010a1f](https://github.com/grantcodes/ui/commit/5010a1f31c789d028154b036f29c67f3539f38b2))
* **input:** improve select styles ([3d17cc4](https://github.com/grantcodes/ui/commit/3d17cc45da034995ee5ca4b85148f0c0e0f2f080))
* **notice:** fix notice dismiss button ([254e20a](https://github.com/grantcodes/ui/commit/254e20ae232f33ebefbe2b69aaf6e16554fa1d91))
* **plop:** fix plopfile ([dfc0879](https://github.com/grantcodes/ui/commit/dfc087927397bbc8a49666631b19b075dcaf4b9a))
* **tabs:** simplify and improve tabs ([c4badfb](https://github.com/grantcodes/ui/commit/c4badfb69fae21c29774032d24e45bfa89796ce4))


### Miscellaneous Chores

* release 2.0.0-beta.5 ([04f38a1](https://github.com/grantcodes/ui/commit/04f38a1a79840ee15a1bc44c3e55ada780f1c2c4))
* release 2.0.0-beta4 ([5087ac5](https://github.com/grantcodes/ui/commit/5087ac51b8bf4bc31ce9bd312fa32114d2b9f78e))

## [2.0.1-beta4](https://github.com/grantcodes/ui/compare/v2.0.0-beta4...v2.0.1-beta4) (2024-10-26)


### Bug Fixes

* **notice:** fix notice dismiss button ([254e20a](https://github.com/grantcodes/ui/commit/254e20ae232f33ebefbe2b69aaf6e16554fa1d91))

## [2.0.0-beta4](https://github.com/grantcodes/ui/compare/v1.3.0...v2.0.0-beta4) (2024-10-25)


### Features

* **avatar:** add initial Avatar component ([0f0f6eb](https://github.com/grantcodes/ui/commit/0f0f6eb7d956aa3fa479baeb641bbd60e98904f2))
* **container:** update Container full variation and add viewport variation ([74a02e1](https://github.com/grantcodes/ui/commit/74a02e1f67b95a02dbe3efba9d97282749009f6f))
* **dialog:** add initial Dialog component ([6d50f52](https://github.com/grantcodes/ui/commit/6d50f52031cd4ae23183dac2152be29579bc3de9))
* **form-field:** add initial form-field component ([1ea4589](https://github.com/grantcodes/ui/commit/1ea458963e5039d6cfda9ca054a9527ad4540304))
* **gallery:** add gallery component ([4f8d6e1](https://github.com/grantcodes/ui/commit/4f8d6e11d5ea5c4ec7a0288ce61b65bb77e9be1b))
* improve focus styles ([8137403](https://github.com/grantcodes/ui/commit/8137403fd19f36cd034c9909dbd8088782905c53))
* **tabs:** add Tabs component ([e8d8452](https://github.com/grantcodes/ui/commit/e8d8452d7c8ce223fdcc5ac28371bb52859955f3))
* **tooltip:** add initial Tooltip component ([4991c56](https://github.com/grantcodes/ui/commit/4991c5631da7fd993c33f767252836730d5aae01))


### Bug Fixes

* **avatar:** export the Avatar component from the main exports ([2f4119b](https://github.com/grantcodes/ui/commit/2f4119b9216fe344712f3a9bf4abda9eb1245fb4))
* **codepreview:** fix syntax highlighting ([5010a1f](https://github.com/grantcodes/ui/commit/5010a1f31c789d028154b036f29c67f3539f38b2))
* **input:** improve select styles ([3d17cc4](https://github.com/grantcodes/ui/commit/3d17cc45da034995ee5ca4b85148f0c0e0f2f080))
* **plop:** fix plopfile ([dfc0879](https://github.com/grantcodes/ui/commit/dfc087927397bbc8a49666631b19b075dcaf4b9a))


### Miscellaneous Chores

* release 2.0.0-beta4 ([5087ac5](https://github.com/grantcodes/ui/commit/5087ac51b8bf4bc31ce9bd312fa32114d2b9f78e))

## [1.2.0](https://github.com/grantcodes/ui/compare/v1.1.0...v1.2.0) (2023-06-29)


### Features

* **tooltip:** add initial Tooltip component ([4991c56](https://github.com/grantcodes/ui/commit/4991c5631da7fd993c33f767252836730d5aae01))

## [1.1.0](https://github.com/grantcodes/ui/compare/v1.0.0...v1.1.0) (2023-01-24)


### Features

* **avatar:** add initial Avatar component ([0f0f6eb](https://github.com/grantcodes/ui/commit/0f0f6eb7d956aa3fa479baeb641bbd60e98904f2))
* **container:** update Container full variation and add viewport variation ([74a02e1](https://github.com/grantcodes/ui/commit/74a02e1f67b95a02dbe3efba9d97282749009f6f))


### Bug Fixes

* **avatar:** export the Avatar component from the main exports ([2f4119b](https://github.com/grantcodes/ui/commit/2f4119b9216fe344712f3a9bf4abda9eb1245fb4))

## 1.0.0 (2022-10-22)


### Features

* **dialog:** add initial Dialog component ([6d50f52](https://github.com/grantcodes/ui/commit/6d50f52031cd4ae23183dac2152be29579bc3de9))
* **gallery:** add gallery component ([4f8d6e1](https://github.com/grantcodes/ui/commit/4f8d6e11d5ea5c4ec7a0288ce61b65bb77e9be1b))
* **tabs:** add Tabs component ([e8d8452](https://github.com/grantcodes/ui/commit/e8d8452d7c8ce223fdcc5ac28371bb52859955f3))


### Bug Fixes

* **codepreview:** fix syntax highlighting ([5010a1f](https://github.com/grantcodes/ui/commit/5010a1f31c789d028154b036f29c67f3539f38b2))
* **plop:** fix plopfile ([dfc0879](https://github.com/grantcodes/ui/commit/dfc087927397bbc8a49666631b19b075dcaf4b9a))
