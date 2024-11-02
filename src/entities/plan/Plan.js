export default class Plan {
    /**
     * @param {Action[]} actions
     * @param {number|undefined} initialOffset
     */
    constructor(actions, initialOffset) {
        this.actions = actions;
        this.initialOffset = initialOffset;
    }
}