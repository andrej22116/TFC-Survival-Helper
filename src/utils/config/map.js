import ActionMap from "@/entities/plan/action/ActionMap.js";
import PlanBuilder from "@/entities/plan/PlanBuilder.js";
import PlanTemplate from "@/entities/plan/PlanTemplate.js";
import Material from "@/entities/Material.js";
import Metal from "@/entities/Metal.js";
import Ore from "@/entities/Ore.js";
import ItemImage from "@/entities/image/ItemImage.js";

export const mapForgingConfig = configs => {
    const actionMap = new ActionMap(configs.actions);
    const planBuilder = new PlanBuilder(actionMap);
    const planTemplates = Object.fromEntries(
        Object.entries(configs.plans)
            .map(([key, planConfig]) => [
                key,
                new PlanTemplate(key, planConfig, actionMap, planBuilder)
            ])
    );

    return {
        planBuilder,
        planTemplates,
    };
};

export const mapMaterialsConfig = configs => {

    return Object.fromEntries(
        Object.entries(configs)
            .map(([key, configMaterial]) => [
                key,
                new Material(key, configMaterial)
            ])
    );
};

export const mapMetalsConfig = configs => {

    return Object.fromEntries(
        Object.entries(configs)
            .map(([key, configMetal]) => [
                key,
                new Metal(key, configMetal)
            ])
    );
};

export const mapOresConfig = configs => {

    return Object.fromEntries(
        Object.entries(configs)
            .map(([key, configOre]) => [
                key,
                new Ore(key, configOre)
            ])
    );
};

export const mapImagesConfig = configs => {
    return Object.fromEntries(
        Object.entries(configs)
            .map(([key, configImage]) => [
                key,
                new ItemImage({configImage})
            ])
    );
}
