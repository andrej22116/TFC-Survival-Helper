import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {fetchAllConfigs} from "@/utils/config/fetch.js";
import {mapForgingConfig, mapMaterialsConfig, mapMetalsConfig, mapOresConfig} from "@/utils/config/map.js";

export const useEntityStore = defineStore('entity', () => {
    const forging = ref(null);
    const materials = ref(null);
    const metals = ref(null);
    const ores = ref(null);
    const isReady = ref(false);
    const loading = ref(false);
    const error = ref(false);

    async function loadFromConfigs() {
        loading.value = true;

        try {
            const configs = await fetchAllConfigs();
            forging.value = mapForgingConfig(configs.forging);
            materials.value = mapMaterialsConfig(configs.materials);
            metals.value = mapMetalsConfig(configs.metals);
            ores.value = mapOresConfig(configs.ores);

            isReady.value = true;
        } catch (ex) {
            console.error(ex);
            error.value = ex.error;
        }
        loading.value = false;
    }

    return {
        forging,
        materials,
        metals,
        ores,
        isReady,
        loading,
        error,
        loadFromConfigs,
    };
});
