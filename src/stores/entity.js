import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {fetchAllConfigs} from "@/utils/config/fetch.js";
import {
    mapForgingConfig,
    mapImagesConfig,
    mapMaterialsConfig,
    mapMetalsConfig,
    mapOresConfig
} from "@/utils/config/map.js";
import {
    mergeMaterialsWithMaterials,
    mergeMaterialsWithPlanTemplates,
    mergeMetalsWithOres
} from "@/utils/config/merge.js";
import MiniSearch from 'minisearch';
import {makeMaterialsDocuments, makeMetalsDocuments, makeOresDocuments} from "@/utils/config/fulltext.js";
import {FULLTEXT_CAT_MATERIAL} from "@/constants/fulltext.js";
import RECEIPT from "@/constants/receipt.js";

export const useEntityStore = defineStore('entity', () => {
    const forging = ref(null);
    const materialMap = ref(null);
    const metalMap = ref(null);
    const oreMap = ref(null);
    const imageMap = ref(null);
    const isReady = ref(false);
    const loading = ref(false);
    const error = ref(false);
    const fulltextSearch = ref(null);

    /**
     * @type {ComputedRef<Material[]>}
     */
    const materials = computed(() => {
        return Object.entries(materialMap.value).map(([, material]) => material);
    });

    const materialsWithPlans = computed(() => {
        return materials.value.filter(material => material.receipt === RECEIPT.PLAN);
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
            imageMap.value = mapImagesConfig(configs.images);

            mergeMetalsWithOres(metalMap.value, oreMap.value);
            mergeMaterialsWithMaterials(materialMap.value);
            mergeMaterialsWithPlanTemplates(materialMap.value, forging.value.planTemplates);

            const graphemeSegmenter = Intl.Segmenter && new Intl.Segmenter('ru');
            const wordSegmenter = Intl.Segmenter && new Intl.Segmenter('ru', {granularity: 'word'});

            fulltextSearch.value = new MiniSearch({
                fields: ['name', 'originalName'],
                storeFields: ['category', 'object'],
                processTerm: term => term.toLowerCase(),
                searchOptions: {
                    processTerm: term => term.toLowerCase(),
                }
            });
            fulltextSearch.value.addAll([
                ...makeMaterialsDocuments(materialMap.value),
                ...makeMetalsDocuments(metalMap.value),
                ...makeOresDocuments(oreMap.value),
            ]);

            isReady.value = true;
        } catch (ex) {
            console.error(ex);
            error.value = ex.error;
        }
        loading.value = false;
    }

    /**
     * Search material
     * @param {string} search
     * @return {Material[]}
     */
    function searchMaterials(search) {
        search = search.trim();
        if (!search.length) {
            return [];
        }

        console.log(fulltextSearch.value
            .search(search, {
                filter: result => result.category === FULLTEXT_CAT_MATERIAL,
                prefix: true,
            }))

        return fulltextSearch.value
            .search(search, {
                filter: result => result.category === FULLTEXT_CAT_MATERIAL,
                prefix: true,
            })
            .map(result => result.object);
    }

    /**
     * Search material
     * @param {string} search
     * @return {Material[]}
     */
    function searchMaterialsWithPlans(search) {
        const searchResult = searchMaterials(search);

        return searchResult.filter(material => material.receipt === RECEIPT.PLAN);
    }

    return {
        forging,
        materialMap,
        materials,
        materialsWithPlans,
        metalMap,
        imageMap,
        metals,
        oreMap,
        ores,
        isReady,
        loading,
        error,
        loadFromConfigs,
        searchMaterials,
        searchMaterialsWithPlans,
    };
});
