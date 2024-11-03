<template>
    <AnyMetalPlanRecipe v-bind="props" v-if="!props.metal"/>
    <OneMetalPlanRecipe v-bind="props" v-else/>
</template>

<script setup>
import Material from "@/entities/Material.js";
import Plan from "@/entities/plan/Plan.js";
import Metal from "@/entities/Metal.js";
import AnyMetalPlanRecipe from "@/components/recipe/PlanRecipe/AnyMetalPlanRecipe.vue";
import OneMetalPlanRecipe from "@/components/recipe/PlanRecipe/OneMetalPlanRecipe.vue";

const props = defineProps({
    material: Material,
    plan: Plan,
    plans: {
        type: Array,
    },
    result: Material,
    metal: Metal,
});
</script>