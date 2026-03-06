import { join } from "node:path";
import { SYSTEM } from "../config.js";

console.log("get style dictionary config");

/**
 * Get a style dictionary config for the given brand.
 *
 * @param   {string}  brand  The brand folder name
 *
 * @return  {import("style-dictionary").Config} The style dictionary config
 */
const getStyleDictionaryConfig = (theme) => ({
	source: [
		join(import.meta.dirname, "../tokens/core/tier-1-definitions/**/*.js"),
		// join(import.meta.dirname, "../tokens/tier-2-usage/**/*.js"),
		// join(import.meta.dirname, "../tokens/tier-3-components/**/*.js"),
		join(
			import.meta.dirname,
			`../tokens/themes/${theme}/tier-1-definitions/**/*.js`,
		),
		join(import.meta.dirname, `../tokens/themes/${theme}/tier-2-usage/**/*.js`),
		join(
			import.meta.dirname,
			`../tokens/themes/${theme}/tier-3-components/**/*.js`,
		),
	],
	log: {
		verbosity: "verbose",
	},
	platforms: {
		css: {
			transformGroup: "css",
			buildPath: `dist/css/${theme}/`,
			prefix: SYSTEM,
			files: [
				{
					destination: "style-dictionary.css",
					format: "css/variables",
					options: {
						outputReferences: true,
					},
				},
				// {
				//   destination: 'fonts.css',
				//   format: 'css/fonts.css',
				//   options: {
				//     outputReferences: true,
				//   },
				// },
			],
		},
		scss: {
			transformGroup: "scss",
			buildPath: `dist/scss/${theme}/`,
			prefix: SYSTEM,
			files: [
				{
					destination: "_style-dictionary.scss",
					format: "css/variables",
					options: {
						outputReferences: true,
						selector: "@mixin css-variables",
					},
				},
				// {
				//   destination: '_fonts.scss',
				//   format: 'css/fonts.css',
				//   options: {
				//     outputReferences: true,
				//   },
				// },
			],
		},
		js: {
			transformGroup: "js",
			buildPath: `dist/js/${theme}/`,
			prefix: SYSTEM,
			files: [
				{
					format: "javascript/es6",
					destination: "style-dictionary.js",
				},
			],
		},
		// android: {
		//   transformGroup: 'android',
		//   buildPath: `dist/android/${theme}/`,
		//   files: [
		//     {
		//       destination: 'font_dimens.xml',
		//       format: 'android/fontDimens',
		//     },
		//     {
		//       destination: 'colors.xml',
		//       format: 'android/colors',
		//     },
		//   ],
		// },
		// compose: {
		//   transformGroup: 'compose',
		//   buildPath: `dist/compose/${theme}/`,
		//   files: [
		//     {
		//       destination: 'StyleDictionaryColor.kt',
		//       format: 'compose/object',
		//       className: 'StyleDictionaryColor',
		//       packageName: 'StyleDictionaryColor',
		//       filter: {
		//         attributes: {
		//           category: 'color',
		//         },
		//       },
		//     },
		//     {
		//       destination: 'StyleDictionarySize.kt',
		//       format: 'compose/object',
		//       className: 'StyleDictionarySize',
		//       packageName: 'StyleDictionarySize',
		//       type: 'float',
		//       filter: {
		//         attributes: {
		//           category: 'size',
		//         },
		//       },
		//     },
		//   ],
		// },
		// ios: {
		//   transformGroup: 'ios',
		//   buildPath: `dist/ios/${theme}/`,
		//   files: [
		//     {
		//       destination: 'StyleDictionaryColor.h',
		//       format: 'ios/colors.h',
		//       className: 'StyleDictionaryColor',
		//       type: 'StyleDictionaryColorName',
		//       filter: {
		//         attributes: {
		//           category: 'color',
		//         },
		//       },
		//     },
		//     {
		//       destination: 'StyleDictionaryColor.m',
		//       format: 'ios/colors.m',
		//       className: 'StyleDictionaryColor',
		//       type: 'StyleDictionaryColorName',
		//       filter: {
		//         attributes: {
		//           category: 'color',
		//         },
		//       },
		//     },
		//     {getStyleDictionaryConfig
		//       destination: 'StyleDictionarySize.h',
		//       format: 'ios/static.h',
		//       className: 'StyleDictionarySize',
		//       type: 'float',
		//       filter: {
		//         attributes: {
		//           category: 'size',
		//         },
		//       },
		//     },
		//     {
		//       destination: 'StyleDictionarySize.m',
		//       format: 'ios/static.m',
		//       className: 'StyleDictionarySize',
		//       type: 'float',
		//       filter: {
		//         attributes: {
		//           category: 'size',
		//         },
		//       },
		//     },
		//   ],
		// },
		// 'ios-swift': {
		//   transformGroup: 'ios-swift',
		//   buildPath: `dist/ios-swift/${theme}/`,
		//   files: [
		//     {
		//       destination: 'StyleDictionary.swift',
		//       format: 'ios-swift/class.swift',
		//       className: 'StyleDictionary',
		//       filter: {},
		//     },
		//   ],
		// },
		// 'ios-swift-separate-enums': {
		//   transformGroup: 'ios-swift-separate',
		//   buildPath: `dist/ios-swift/${theme}/`,
		//   files: [
		//     {
		//       destination: 'StyleDictionaryColor.swift',
		//       format: 'ios-swift/enum.swift',
		//       className: 'StyleDictionaryColor',
		//       filter: {
		//         attributes: {
		//           category: 'color',
		//         },
		//       },
		//     },
		//     {
		//       destination: 'StyleDictionarySize.swift',
		//       format: 'ios-swift/enum.swift',
		//       className: 'StyleDictionarySize',
		//       type: 'float',
		//       filter: {
		//         attributes: {
		//           category: 'size',
		//         },
		//       },
		//     },
		//   ],
		// },
	},
});

console.log("get style dictionary config");

export { getStyleDictionaryConfig };
