import ItemImage from "@/entities/image/ItemImage.js";

export default class Metal {
    constructor(key, configMetal) {
        const {
            name,
            originalName,
            tier,
            image,
        } = configMetal;

        this.key = key;
        this.name = name;
        this.originalName = originalName;
        this.tier = tier;
        this.image = new ItemImage({configImage: image, alt: name});
    }
}