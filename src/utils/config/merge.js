import RECEIPT from "@/constants/receipt.js";

/**
 * @param {{[p: string]: Metal}} metals
 * @param {{[p: string]: Ore}} ores
 */
export const mergeMetalsWithOres = (metals, ores) => {
    for (let oreKey in ores) {
        const ore = ores[oreKey];
        const metal = metals[ore.metalName];
        metal.addOre(ore);
    }
};

/**
 * @param {{[p: string]: Material}} materials
 */
export const mergeMaterialsWithMaterials = (materials) => {
    for (let materialKey in materials) {
        const material = materials[materialKey];
        if (!material.material) {
            continue;
        }

        const sourceMaterial = materials[material.material];
        material.setSourceMaterial(sourceMaterial);
    }
};

/**
 * @param {{[p: string]: Material}} materials
 * @param {{[p: string]: PlanTemplate}} planTemplates
 */
export const mergeMaterialsWithPlanTemplates = (materials, planTemplates) => {
    for (let materialKey in materials) {
        const material = materials[materialKey];
        if (material.receipt !== RECEIPT.PLAN) {
            continue;
        }

        const planTemplate = planTemplates[material.key];
        material.setPlanTemplate(planTemplate);
    }
};