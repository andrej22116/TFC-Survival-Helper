import ItemImage from "@/entities/image/ItemImage.js";
import Receipt from "@/entities/Receipt.js";
import Metal from "@/entities/Metal.js";

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

    setSourceMaterial(material) {
        this.sourceMaterial = material;
    }

    /**
     * @param {Metal} metal
     * @return {string}
     */
    getNameForMetal(metal) {
        return `${this.name} (${metal.name})`;
    }

    /**
     * @param {Metal|string} metal
     * @return {ItemImage|null}
     */
    getImageForMetal(metal) {
        if (metal instanceof Metal) {
            return this.metals[metal.key] || null;
        } else if (typeof metal === 'string') {
            return this.metals[metal] || null;
        }

        return null;
    }

    /**
     * @param {PlanTemplate} planTemplate
     */
    setPlanTemplate(planTemplate) {
        this.planTemplate = planTemplate;
    }

    /**
     * @param {number} startOffset
     * @return {Plan|null}
     */
    getPlan(startOffset = 0) {
        return this.planTemplate.build(startOffset);
    }
}