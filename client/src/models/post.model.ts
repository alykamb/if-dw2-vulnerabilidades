import { GenericModel } from './generic/model'

export class PostModel extends GenericModel<PostModel> {
    public id!: number

    public title!: string

    public content!: string

    public author!: number
}
