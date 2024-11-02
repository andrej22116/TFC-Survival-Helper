export default class PlanTemplate {
    constructor(key, planConfig, actionMap, planBuilder) {
        const {material, actions, static_actions} = planConfig || {};

        this.key = key;
        this.material = material;
        this.actions = actions;
        this.actionMap = actionMap;
        this.planBuider = planBuilder;

        if (!Array.isArray(actions) || actions.length > 3) {
            this.planWay = null;
            return;
        }

        if (actions.length === 3) {
            this.planWay = actions;
        } else if (actions.length === 2) {
            this.planWay = this._makeWayForTwoItems(actions);
        } else {
            this.planWay = this._makeWayForOneItem(actions[0]);
        }

        if (static_actions) {
            this.staticActions = static_actions.map(actionName => this.actionMap.getAction(actionName));
        }
    }

    get ways() {
        if (this.similarWays !== undefined) {
            return this.similarWays;
        }

        return this._makeSimilarWays();
    }

    build(startOffset = 0) {
        return this.planBuider.build(this, startOffset);
    }

    _makeWayForTwoItems(actions) {
        const [first, second] = actions;
        if (Array.isArray(first) && Array.isArray(second)) {
            return null;
        } else if (Array.isArray(first)) {
            return first.length === 2
                ? [...first, second]
                : null;
        } else if (Array.isArray(second)) {
            return second.length === 2
                ? [first, ...second]
                : null;
        } else {
            return [first, second];
        }
    }

    _makeWayForOneItem(item) {
        if (Array.isArray(item)) {
            return item.length === 3
                ? item
                : null;
        }

        return item;
    }

    _makeSimilarWays() {
        this.similarWays = [];
        if (!this.planWay) {
            return this.similarWays;
        }

        this._makeWay();
        return this.similarWays;
    }

    _makeWay(root = [], wayStepIndex = 0) {
        if (wayStepIndex >= this.planWay.length) {
            this.similarWays.push({
                actions: root,
                offset: root.reduce((offset, action) => offset - action.power, 0)
            });
            return;
        }

        const actionName = this.planWay[wayStepIndex];
        const action = this.actionMap.getAction(actionName);
        if (!Array.isArray(action)) {
            root.push(action);
            this._makeWay(root, wayStepIndex + 1);
        } else {
            action.forEach(similarAction => {
                const newRoot = [...root, similarAction];
                this._makeWay(newRoot, wayStepIndex + 1);
            });
        }
    }
}