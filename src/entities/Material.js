import ItemImage from "@/entities/image/ItemImage.js";
import Receipt from "@/entities/Receipt.js";

export default class Material {
    constructor(key, configMaterial) {
        const {
            name,
            originalName,
            receipt,
            metals,
            images,
            material,
        } = configMaterial;

        const mappedImages = Array.isArray(images)
            ? images.map(metalConfigImage => [
                metalConfigImage.metal,
                new ItemImage({configImage: metalConfigImage.image, alt:  metalConfigImage.metal})
            ])
            : [];

        this.key = key;
        this.name = name;
        this.originalName = originalName;
        this.receipt = Receipt.getReceipt(receipt);
        this.metals = metals;
        this.material = material;
        this.images = Object.fromEntries(mappedImages);
    }
}