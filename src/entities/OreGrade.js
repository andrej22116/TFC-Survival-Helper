import ItemImage from "@/entities/image/ItemImage.js";

export default class OreGrade {
    constructor(key, configOreGrade) {
        const {
            richness,
            image,
        } = configOreGrade;

        this.key = key;
        this.richness = richness;
        this.image = new ItemImage({configImage: image, alt: key});
    }
}