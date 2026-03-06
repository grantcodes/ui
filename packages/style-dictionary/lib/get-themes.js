import { readdirSync } from "node:fs";

/**
 * Helper functions to get a list of supported brands.
 *
 * @return  {string[]} List of brands found in the tokens/brands folder
 */
const getThemes = () => readdirSync("./tokens/themes");

export { getThemes };
