<template>
    <div class="cell-item">
        <div class="cell-item-inner">
            <div>
                <div class="cell-item-image">
                    <ItemImage :itemImage="itemImage"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ItemImageEntity from "@/entities/image/ItemImage.js";
import ItemImage from "@/components/image/ItemImage.vue";

defineProps({
    itemImage: ItemImageEntity
});
</script>

<style scoped>
.cell-item {
    display: inline-block;
    position: relative;
    text-align: left !important;
    background-color: #8B8B8B;
    height: 36px;
    width: 36px;
    padding: 2px;
    vertical-align: bottom;
    border-spacing: 2px;
    border-collapse: separate;
}

.cell-item-inner {
    display: block;
    margin: -2px 0 0 -2px;
    border-style: solid none none solid;
    border-width: 2px;
    border-color: #373737;
    height: 34px;
    width: 34px;
}
.cell-item-inner > div {
    display: block;
    margin-right: -2px;
    border-style: none solid solid none;
    border-width: 2px;
    border-color: #FFFFFF;
    height: 34px;
    width: 34px;
}

.cell-item-image {
    position: absolute;
    line-height: 16px;
    top: 2px;
    width: 32px;
    height: 32px;
}
</style>