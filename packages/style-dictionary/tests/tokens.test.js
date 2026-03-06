import { describe, it } from "node:test";
import test from "node:test";
import assert from "node:assert";
import StyleDictionaryPackage from "style-dictionary";

import { TOKEN_TREE } from "../config.js";
import { getThemes, getStyleDictionaryConfig } from "../lib/index.js";

const getTokens = async () => {
  const themes = getThemes();

  const tokens = {};

  for (const brand of brands) {
    const config = getStyleDictionaryConfig(brand);
    const dictionary = new StyleDictionaryPackage(config);
    const brandTokens = await dictionary.getPlatformTokens("css");

    tokens[brand] = brandTokens.allTokens;
  }

  return tokens;
};

const tokens = await getTokens();

describe("Token formatting", () => {
  it("Should have multiple tokens", () => {
    for (const brandTokens of Object.values(tokens)) {
      assert.ok(Object.keys(brandTokens).length > 1);
    }
  });

  it("Should be prefixed", () => {
    if (SYSTEM) {
      for (const brandTokens of Object.values(tokens)) {
        const tokenNames = brandTokens.map((token) => token.name);
        for (const tokenName of tokenNames) {
          assert.ok(tokenName.startsWith(`${SYSTEM}-`));
        }
      }
    }
  });

  it("Should have a category", () => {
    for (const brandTokens of Object.values(tokens)) {
      for (const token of brandTokens) {
        assert.ok(
          TOKEN_LEVELS.category.includes(token?.attributes?.category),
          `The token ${token.name} has the category ${token?.attributes?.category} which is not in the defined categories (${TOKEN_LEVELS.category.join(", ")}).`,
        );
      }
    }
  });

  it("Should have a valid css value", () => {
    for (const brandTokens of Object.values(tokens)) {
      for (const token of brandTokens) {
        const tokenType = typeof token.value;

        assert.ok(
          ["string", "number"].includes(tokenType),
          `The token ${token.name} has an invalid type (${tokenType}).`,
        );
      }
    }
  });

  // it("Should have valid references", () => {
  //   for (const brandTokens of Object.values(tokens)) {
  //     for (const token of brandTokens) {
  //       if (token?.original?.value?.includes?.("{")) {
  //         const references = token.original.value
  //           .replace(/{/g, "")
  //           .replace(/}/g, "")
  //           .trim()
  //           .split(", ");
  //         console.log(reference);
  //         // assert.ok(
  //         //   brandTokens.find((t) => t.name === token.attributes.reference),
  //         //   `The token ${token.name} references a token that does not exist (${token.attributes.reference}).`,
  //         // );
  //       }
  //     }
  //   }
  // });
});
