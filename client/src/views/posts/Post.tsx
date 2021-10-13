import { PostModel } from '../../models/post.model'

export interface IPostProps {
    post: PostModel
}

export const Post = ({ post }: IPostProps) => {
    return (
        <div className="post">
            <h1>{post.title}</h1>
            <small>post id: {post.id}</small>
            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            <div className="author">autor: {post.author}</div>
        </div>
    )
}
