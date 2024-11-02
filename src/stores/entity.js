import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {fetchAllConfigs} from "@/utils/config/fetch.js";
import {mapForgingConfig, mapMaterialsConfig, mapMetalsConfig, mapOresConfig} from "@/utils/config/map.js";
import {
    mergeMaterialsWithMaterials,
    mergeMaterialsWithPlanTemplates,
    mergeMetalsWithOres
} from "@/utils/config/merge.js";

export const useEntityStore = defineStore('entity', () => {
    const forging = ref(null);
    const materialMap = ref(null);
    const metalMap = ref(null);
    const oreMap = ref(null);
    const isReady = ref(false);
    const loading = ref(false);
    const error = ref(false);

    /**
     * @type {ComputedRef<Material[]>}
     */
    const materials = computed(() => {
        return Object.entries(materialMap.value).map(([, material]) => material);
    });

    /**
     * @type {ComputedRef<Metal[]>}
     */
    const metals = computed(() => {
        return Object.entries(metalMap.value).map(([, metal]) => metal);
    });

    /**
     * @type {ComputedRef<Ore[]>}
     */
    const ores = computed(() => {
        return Object.entries(oreMap.value).map(([, ore]) => ore);
    });

    async function loadFromConfigs() {
        loading.value = true;

        try {
            const configs = await fetchAllConfigs();
            forging.value = mapForgingConfig(configs.forging);
            materialMap.value = mapMaterialsConfig(configs.materials);
            metalMap.value = mapMetalsConfig(configs.metals);
            oreMap.value = mapOresConfig(configs.ores);

            mergeMetalsWithOres(metalMap.value, oreMap.value);
            mergeMaterialsWithMaterials(materialMap.value);
            mergeMaterialsWithPlanTemplates(materialMap.value, forging.value.planTemplates);

            isReady.value = true;
        } catch (ex) {
            console.error(ex);
            error.value = ex.error;
        }
        loading.value = false;
    }

    return {
        forging,
        materialMap,
        materials,
        metalMap,
        metals,
        oreMap,
        ores,
        isReady,
        loading,
        error,
        loadFromConfigs,
    };
});
