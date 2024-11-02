import {makeImageUrl} from "@/utils/image/image.js";

export default class ItemImage {
    constructor({configImage, alt}) {
        this.src = makeImageUrl(configImage);
        this.alt = alt;
    }
}