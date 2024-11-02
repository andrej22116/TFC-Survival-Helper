<template>
    <Box class="plan-recipe-box">
        <div class="plan-recipe-box-material">
            <CellItemImage :item-image="material"/>
        </div>

        <div class="plan-recipe-box-plan-list">
            <div v-for="planItem of planList">
                <span v-if="planItem.initialOffset !== undefined && planItem.initialOffset !== null">
                    {{ planItem.initialOffset > 0 ? '+' : ''}}{{ planItem.initialOffset }}
                </span>

                <div>
                    <ItemImage v-for="action of planItem.actions" :item-image="action.image" />
                </div>
            </div>
        </div>

        <div class="plan-recipe-box-result-arrow">
            <ItemImage :item-image="arrowImage" />
        </div>

        <div>
            <CellItemImage :item-image="result"/>
        </div>
    </Box>
</template>

<script setup>
import ItemImage from "@/components/image/ItemImage.vue";
import ItemImageEntity from "@/entities/image/ItemImage.js";
import Plan from "@/entities/plan/Plan.js";
import CellItemImage from "@/components/image/CellItemImage.vue";
import {useEntityStore} from "@/stores/entity.js";
import Box from "@/components/Box.vue";
import {computed} from "vue";

const props = defineProps({
    material: ItemImageEntity,
    plan: Plan,
    plans: {
        type: Array,
    },
    result: ItemImageEntity,
});

const entityStore = useEntityStore();
const arrowImage = entityStore.imageMap.result_arrow;

const planList = computed(() => Array.isArray(props.plans) ? props.plans : [props.plan]);
</script>

<style scoped>
    .plan-recipe-box {
        display: flex;
        align-items: center;
        padding: 5px 20px;
    }

    .plan-recipe-box-material {
        margin-right: 10px;
    }

    .plan-recipe-box-plan-list {
        display: flex;
        flex-direction: column;
    }
    .plan-recipe-box-plan-list > * {
        display: grid;
        grid-template-columns: 30px 1fr;
    }
    .plan-recipe-box-plan-list > * > span {
        margin-right: 4px;
        padding: 4px;

        text-align: right;

        color: black;
        font-weight: bold;
    }

    .plan-recipe-box-result-arrow {
        display: flex;
        margin: 0 10px;
    }
</style>