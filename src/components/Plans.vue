<script setup>
import {useEntityStore} from "@/stores/entity.js";
import {computed, ref, defineModel} from "vue";
import RECEIPT from "@/constants/receipt.js";
import PlanRecipe from "@/components/recipe/PlanRecipe/PlanRecipe.vue";

const entityStore = useEntityStore();
if (!entityStore.isReady && !entityStore.loading && !entityStore.error) {
    entityStore.loadFromConfigs();
}

const activeMaterial = ref(null);
const searchInput = defineModel();
function setActiveMaterial(material) {
    activeMaterial.value = activeMaterial.value !== material ? material : null;
}

const planableMaterials = computed(() => {
    if (!entityStore.isReady) {
        return [];
    }

    let planableMaterials = searchInput?.value?.length > 0
        ? entityStore.searchMaterialsWithPlans(searchInput.value || '')
        : entityStore.materialsWithPlans;

    if (!planableMaterials.length) {
        planableMaterials = entityStore.materialsWithPlans;
    }

    return planableMaterials.map(material => {
        const sourceMaterial = material.sourceMaterial;
        return {
            material: sourceMaterial,
            plans: activeMaterial?.value?.key === material.key
                ? [
                    material.getPlan(-2),
                    material.getPlan(-1),
                    material.getPlan(),
                    material.getPlan(1),
                    material.getPlan(2),
                ]
                : [material.getPlan()],
            result: material,
        }
    });
});
</script>

<template>
    <div class="plan-search">
        <span>Поиск: </span>
        <input type="text" v-model="searchInput">
        <button @click="searchInput = ''">&#x2715;</button>
    </div>

    <div class="plan-container">
        <PlanRecipe v-for="recipe of planableMaterials"
                    :material="recipe.material"
                    :plans="recipe.plans"
                    :result="recipe.result"
                    :key="recipe.result.key"
                    @click="setActiveMaterial(recipe.result)"/>
    </div>
</template>

<style scoped lang="scss">
    .plan-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);

        & > *, & > * > * {
            height: 100%;
        }

        & > *:hover {
            cursor: pointer;
            background-color: white;
        }
    }

    @media screen and (max-width: 1580px) {
        .plan-container {
            grid-template-columns: repeat(3, 1fr);
        }
    }
    @media screen and (max-width: 1260px) {
        .plan-container {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    @media screen and (max-width: 860px) {
        .plan-container {
            grid-template-columns: 1fr;
        }
    }
</style>