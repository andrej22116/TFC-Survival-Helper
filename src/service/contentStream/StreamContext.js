export default class StreamContext {
    constructor() {
        this._sourceCount = 0;
        this._activeSource = undefined;
    }

    get sourceCount() {
        return this._sourceCount;
    }
}