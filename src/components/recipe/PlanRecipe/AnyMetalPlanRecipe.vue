<template>
    <div>
        <OneMetalPlanRecipe v-bind="props" :metal="metal"/>
    </div>
</template>

<script setup>
import Plan from "@/entities/plan/Plan.js";
import Material from "@/entities/Material.js";
import {useIntervalFn} from "@vueuse/core";
import {computed, ref} from "vue";
import {useEntityStore} from "@/stores/entity.js";
import OneMetalPlanRecipe from "@/components/recipe/PlanRecipe/OneMetalPlanRecipe.vue";

const props = defineProps({
    material: Material,
    plan: Plan,
    plans: {
        type: Array,
    },
    result: Material,
});

const entityStore = useEntityStore();
const activeMetalIndex = ref(0);
useIntervalFn(() => {
    activeMetalIndex.value = (activeMetalIndex.value + 1) % props.result.metals.length;
}, 1500);

const metal = computed(() => {
    const metalIndex = activeMetalIndex.value;
    const activeMetalKey = props.result.metals[metalIndex];
    return entityStore.metalMap[activeMetalKey];
});
</script>