import {FULLTEXT_CAT_MATERIAL, FULLTEXT_CAT_METAL, FULLTEXT_CAT_ORE} from "@/constants/fulltext.js";

/**
 * @param {{[p: string]: Metal}} metals
 */
export const makeMetalsDocuments = metals => Object.entries(metals)
    .map(([key, metal]) => ({
        id: `metal-${key}`,
        name: metal.name,
        originalName: metal.originalName,
        category: FULLTEXT_CAT_METAL,
        object: metal,
    }));

/**
 * @param {{[p: string]: Material}} materials
 */
export const makeMaterialsDocuments = materials => Object.entries(materials)
    .map(([key, material]) => ({
        id: `material-${key}`,
        name: material.name,
        originalName: material.originalName,
        category: FULLTEXT_CAT_MATERIAL,
        object: material,
    }));

/**
 * @param {{[p: string]: Ore}} ores
 */
export const makeOresDocuments = ores => Object.entries(ores)
    .map(([key, ore]) => ({
        id: `ore-${key}`,
        name: ore.name,
        originalName: ore.originalName,
        category: FULLTEXT_CAT_ORE,
        object: ore,
    }));