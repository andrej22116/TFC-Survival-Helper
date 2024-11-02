import ItemImage from "@/entities/image/ItemImage.js";
import OreGrade from "@/entities/OreGrade.js";

export default class Ore {
    constructor(key, configOre) {
        const {
            name,
            originalName,
            metal,
            tier,
            grades,
        } = configOre;

        this.key = key;
        this.name = name;
        this.originalName = originalName;
        this.metal = metal;
        this.tier = tier;
        this.grades = Object.fromEntries(
            Object.entries(grades)
                .map(([key, configOreGrade]) => [
                    key,
                    new OreGrade(key, configOreGrade)
                ])
        );
    }
}