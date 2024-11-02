<template>
    <img class="item-mage" :src="itemImage.src" width="32" height="32" :alt="itemImage.alt">
</template>

<script setup>
import ItemImage from "@/entities/image/ItemImage.js";

defineProps({
    itemImage: ItemImage
});
</script>

<style scoped>
.item-mage {
    image-rendering: optimizeSpeed;
    image-rendering: -moz-crisp-edges;
    image-rendering: -o-crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: optimize-contrast;
    image-rendering: pixelated;
    height: 32px;
    width: 32px;
}
</style>