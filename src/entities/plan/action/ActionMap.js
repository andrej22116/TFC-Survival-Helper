import Action from "@/entities/plan/action/Action.js";

export default class ActionMap {
    constructor(actionsConfig) {
        if (!actionsConfig) {
            return;
        }

        this.actions = [];
        this.increasers = [];
        this.reducers = [];

        const actionNames = ['hit', 'draw', 'punch', 'bend', 'upset', 'shrink'];
        actionNames.forEach(actionName => {
            this[actionName] = actionsConfig[actionName]
                ? this._createAction(actionName, actionsConfig[actionName])
                : null;

            if (!this[actionName]) {
                return;
            }

            this.actions.push(...(Array.isArray(this[actionName]) ? this[actionName] : [this[actionName]]));
        });

        this.any = this.actions;

        this.actions.forEach(action => {
            if (action.power > 0) {
                this.increasers.push(action);
            } else {
                this.reducers.push(action);
            }
        });
    }

    getAction(actionName) {
        return this[actionName] || null;
    }

    _createAction(key, actionConfig) {
        return Array.isArray(actionConfig)
            ? actionConfig.map(actionConfigItem => new Action(key, actionConfigItem))
            : new Action(key, actionConfig);
    }
}