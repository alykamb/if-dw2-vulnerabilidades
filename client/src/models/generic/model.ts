export class GenericModel<T = any> {
    constructor(arg?: T) {
        Object.assign(this, arg)
    }
}