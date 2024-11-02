<template>
    <div>
        <div>
            <CellItemImage :item-image="target"/>
        </div>

        <div>
            <div v-if="plan.initialOffset">
                {{ plan.initialOffset }}
            </div>

            <div>
                <ItemImage v-for="action of plan.actions" :item-image="action.image" />
            </div>
        </div>

        <div>
            <CellItemImage :item-image="result"/>
        </div>
    </div>
</template>

<script setup>
import ItemImage from "@/components/image/ItemImage.vue";
import ItemImageEntity from "@/entities/image/ItemImage.js";
import Plan from "@/entities/plan/Plan.js";
import CellItemImage from "@/components/image/CellItemImage.vue";

defineProps({
    target: ItemImageEntity,
    plan: Plan,
    result: ItemImageEntity,
});
</script>

<style scoped>

</style>