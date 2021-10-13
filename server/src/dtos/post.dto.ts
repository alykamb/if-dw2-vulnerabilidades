export class CreatePostDto {
    public title: string
    public content: string
}

export class PostDto extends CreatePostDto {
    public id: number
    public author: number
}

export class CreatePostWithAuthorDto extends CreatePostDto {
    public author: number
}
