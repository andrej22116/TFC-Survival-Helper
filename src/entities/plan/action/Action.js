import ItemImage from "@/entities/image/ItemImage.js";

export default class Action {
    constructor(key, configAction) {
        this.key = key;
        this.name = configAction.name;
        this.originalName = configAction.originalName;
        this.power = configAction.power;
        this.image = new ItemImage({configImage: configAction.image, alt: configAction.name});
    }
}