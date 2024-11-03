<template>
    <Box class="plan-recipe-box">
        <div class="plan-recipe-box-name">
            {{result.name}}
        </div>

        <div class="plan-recipe-box-container">
            <div class="plan-recipe-box-material" :title="activeImages.materialName">
                <CellItemImage :item-image="activeImages.material"/>
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

            <div :title="activeImages.resultName">
                <CellItemImage :item-image="activeImages.result"/>
            </div>
        </div>
    </Box>
</template>

<script setup>
import ItemImage from "@/components/image/ItemImage.vue";
import Plan from "@/entities/plan/Plan.js";
import CellItemImage from "@/components/image/CellItemImage.vue";
import {useEntityStore} from "@/stores/entity.js";
import Box from "@/components/Box.vue";
import {computed} from "vue";
import Material from "@/entities/Material.js";
import Metal from "@/entities/Metal.js";

const props = defineProps({
    material: Material,
    plan: Plan,
    plans: {
        type: Array,
    },
    result: Material,
    metal: Metal,
});

const entityStore = useEntityStore();
const arrowImage = entityStore.imageMap.result_arrow;

const activeImages = computed(() => ({
    material: props.material.getImageForMetal(props.metal),
    materialName: props.material.getNameForMetal(props.metal),
    result: props.result.getImageForMetal(props.metal),
    resultName: props.result.getNameForMetal(props.metal),
}));

const planList = computed(() => Array.isArray(props.plans) ? props.plans : [props.plan]);
</script>

<style scoped lang="scss">
    .plan-recipe-box {
        padding: 5px 20px;

        &-name {
            color: black;
        }

        &-container {
            display: flex;
            align-items: center;
        }

        &-material {
            margin-right: 10px;
        }

        &-plan-list {
            display: flex;
            flex-direction: column;

            & > * {
                display: grid;
                grid-template-columns: 50px 1fr;

                & > span {
                    margin-right: 4px;
                    padding: 4px;

                    text-align: right;

                    color: black;
                    font-weight: bold;
                }
            }
        }

        &-result-arrow {
            display: flex;
            margin: 0 10px;
        }
    }
</style>