import {
    EXTERNAL_SOURCE_URL_TFC,
    EXTERNAL_SOURCE_URL_TFC_NG,
    EXTERNAL_SOURCE_URL_TFC_PLUS,
    EXTERNAL_SOURCE_URL_VANILLA
} from "@/constants/image.js";

/**
 * @param {string} source
 * @param {string} path
 */
const makeUrl = (source, path) => {
    path = path.trim();
    if (path[0] !== 'c') {
        path = '/' + path;
    }

    return `${source}${path}`;
}

/**
 * Make url to TFC+ image
 * @param {string} path
 * @returns {string}
 */
export const makeTfcImgUrl = path => makeUrl(EXTERNAL_SOURCE_URL_TFC_PLUS, path);

/**
 * Make url to TFC image
 * @param {string} path
 * @returns {string}
 */
export const makeTfcOldImgUrl = path => makeUrl(EXTERNAL_SOURCE_URL_TFC, path);

/**
 * Make url to TFC NG image
 * @param {string} path
 * @returns {string}
 */
export const makeTfcNgImgUrl = path => makeUrl(EXTERNAL_SOURCE_URL_TFC_NG, path);

/**
 * Make url to vanilla minecraft image
 * @param {string} path
 * @returns {string}
 */
export const makeVanillaImgUrl = path => makeUrl(EXTERNAL_SOURCE_URL_VANILLA, path);