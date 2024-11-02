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
        this.metalName = metal;
        this.tier = tier;
        this.grades = Object.fromEntries(
            Object.entries(grades)
                .map(([key, configOreGrade]) => [
                    key,
                    new OreGrade(key, configOreGrade)
                ])
        );
    }

    /**
     * @param {Metal} metal
     */
    setMetal(metal) {
        this.metal = metal;
        this.metalName = metal.name;
    }
}