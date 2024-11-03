<script setup>
import {useEntityStore} from "@/stores/entity.js";
import {computed} from "vue";
import RECEIPT from "@/constants/receipt.js";
import PlanRecipe from "@/components/recipe/PlanRecipe/PlanRecipe.vue";

const entityStore = useEntityStore();
if (!entityStore.isReady && !entityStore.loading && !entityStore.error) {
    entityStore.loadFromConfigs();
}

const planableMaterials = computed(() => {
    if (!entityStore.isReady) {
        return [];
    }

    return entityStore.materials.filter(material => material.receipt === RECEIPT.PLAN)
        .map(material => {
            const sourceMaterial = material.sourceMaterial;
            return {
                material: sourceMaterial,
                plans: [
                    material.getPlan(-5),
                    material.getPlan(-4),
                    material.getPlan(-3),
                    material.getPlan(-1),
                    material.getPlan(),
                    material.getPlan(1),
                    material.getPlan(2),
                    material.getPlan(4),
                    material.getPlan(5),
                ],
                result: material,
            }
        });
});
</script>

<template>
    <div class="plan-container">
        <PlanRecipe v-for="recipe of planableMaterials"
                    :material="recipe.material"
                    :plans="recipe.plans"
                    :result="recipe.result" />
    </div>
</template>

<style scoped lang="scss">
    .plan-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
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