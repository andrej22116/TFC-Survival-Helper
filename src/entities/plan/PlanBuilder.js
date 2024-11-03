import Plan from "@/entities/plan/Plan.js";
import {PLAN_SEARCH_DEEP_LIMIT} from "@/constants/plan.js";

export default class PlanBuilder {
    /**
     * @param {ActionMap} actionMap
     */
    constructor(actionMap) {
        this.actionMap = actionMap;
    }

    /**
     * @param {PlanTemplate} planTemplate
     * @param {number} initialOffset Start position of the forging cursor
     * @return Plan|null
     */
    build(planTemplate, initialOffset) {
        if (!planTemplate.ways) {
            return null;
        }

        if (planTemplate.staticActions && initialOffset === 0) {
            const actions = [...planTemplate.staticActions, ...planTemplate.ways[0].actions];
            return new Plan(actions, undefined);
        }

        for (let way of planTemplate.ways) {
            if (initialOffset === way.offset) {
                return new Plan(way.actions, initialOffset);
            }
        }

        let bestFullWay = null;
        for (let way of planTemplate.ways) {
            const bestWayForThisWay = this._buildWay([], way.offset, initialOffset);
            if (!bestFullWay || bestFullWay.actions.length > bestWayForThisWay.length) {
                bestFullWay = {
                    baseActions: way.actions,
                    actions: bestWayForThisWay,
                }
            }
        }

        bestFullWay.actions.sort(({power: a}, {power: b}) => {
            if (a < 0 && b < 0) return -b - -a;
            else if (a > 0 && b > 0) return b - a;
            else return a - b;
        });
        const finalWay = [...bestFullWay.actions, ...bestFullWay.baseActions];

        return new Plan(finalWay, initialOffset);
    }

    _buildWay(prevActions, targetOffset, currentOffset)
    {
        if (targetOffset === currentOffset || prevActions.length >= PLAN_SEARCH_DEEP_LIMIT) {
            return prevActions;
        }

        let bestWay = null;
        const actions = currentOffset < targetOffset ? this.actionMap.increasers : this.actionMap.reducers;
        for (let action of actions) {
            const nextWay = this._buildWay([...prevActions, action], targetOffset, currentOffset + action.power);
            if (!bestWay || bestWay.length > nextWay.length) {
                bestWay = nextWay;
            }
        }

        return bestWay;
    }
}