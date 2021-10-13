import { GenericModel } from './generic/model'

export class AuthModel extends GenericModel<AuthModel> {
    public id!: number

    public username!: string
}
