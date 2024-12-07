import {
    EXTERNAL_SOURCE_URL_TFC,
    EXTERNAL_SOURCE_URL_TFC_NG,
    EXTERNAL_SOURCE_URL_TFC_PLUS,
    EXTERNAL_SOURCE_URL_VANILLA,
    IMAGE_SOURCE_SELF,
    IMAGE_SOURCE_TFC,
    IMAGE_SOURCE_TFCNG,
    IMAGE_SOURCE_TFCP,
    IMAGE_SOURCE_VANILLA
} from "@/constants/image.js";

/**
 * @param {string} source
 * @param {string} path
 */
const makeUrl = (source, path) => {
    path = path.trim();
    if (path[0] !== '/') {
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

/**
 * Make url to self-hosted image
 * @param {string} path
 * @returns {string}
 */
export const makeSelfImgUrl = path => makeUrl('public/image', path);

/**
 *
 * @param {{source: string|null|undefined, path: string}} configImage
 * @returns {string}
 */
export const makeImageUrl = configImage => {
    if (!configImage || !configImage.path) {
        return '';
    }

    switch (configImage.source) {
        case IMAGE_SOURCE_SELF: return makeSelfImgUrl(configImage.path);

        case IMAGE_SOURCE_TFC: return makeTfcOldImgUrl(configImage.path);

        case IMAGE_SOURCE_TFCP: return makeTfcImgUrl(configImage.path);

        case IMAGE_SOURCE_TFCNG: return makeTfcNgImgUrl(configImage.path);

        case IMAGE_SOURCE_VANILLA: return makeVanillaImgUrl(configImage.path);

        default: return makeTfcImgUrl(configImage.path);
    }
}