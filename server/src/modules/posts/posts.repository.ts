import { CreatePostWithAuthorDto, PostDto } from '../../dtos/post.dto'

export class PostsRepository {
    private posts: PostDto[] = [
        {
            id: 0,
            title: 'placeat',
            content: `
                <p>
                    Libero atque debitis ut fuga animi et. Omnis et impedit illo temporibus.
                    Culpa delectus atque molestiae ut. Non deleniti omnis voluptas. Earum ut nihil.
                </p>
                `,
            author: 0,
        },
        {
            id: 1,
            title: 'Debitis',
            content: `
                <h2>voluptates ad nisi</h2>
                <p>
                    Assumenda aut occaecati dolore voluptas ducimus et. Vel reiciendis id aliquam omnis saepe.
                    Tempore nobis magnam voluptatem neque id aut. Et laborum dolore dolorem sit aut repudiandae et.
                </p>
                <p>
                    Corrupti quis voluptates ad nisi. Ea enim et mollitia omnis ut repellendus.
                    Voluptas velit quam necessitatibus laboriosam dolore. Optio aut asperiores in non quasi quia. Inventore reiciendis quis minus.
                    Aut esse ducimus dolore labore omnis magni dolore accusantium.
                    Incidunt asperiores explicabo provident dignissimos nihil veniam eos consequatur.
                </p>
                `,
            author: 0,
        },
        {
            id: 2,
            title: 'Doloremque',
            content: `
                <p>
                    Doloremque <i>repellendus</i> nisi eos cum qui. Quo iusto ex incidunt saepe adipisci. Adipisci sit nostrum officia alias et maiores aut eos quidem.
                    Voluptas velit laudantium rem quia dicta dolorum. Et est voluptas qui id ut perferendis at dolores quia.
                    Quo ut totam neque esse porro aut omnis. Consequuntur ut optio sequi. Nobis sed consectetur qui modi sunt ut quia. Saepe praesentium qui hic ipsa quia dolorum soluta.
                </p>
                <img class="d-block" width="200px" src="https://cdna.artstation.com/p/assets/images/images/042/223/866/20211011023604/smaller_square/andrew-palyanov-8.jpg?1633937765" alt="Bellroom entry design">
                <p>
                    Accusamus minus in officia possimus architecto sunt. Aut perferendis illo eum. Consequatur est iusto quis voluptatem.
                    Reiciendis consectetur sapiente culpa non est dolor.
                </p>
                `,
            author: 1,
        },
    ]

    public async getPosts(): Promise<PostDto[]> {
        return this.posts
    }

    public async createPost(post: CreatePostWithAuthorDto): Promise<PostDto> {
        const newId = this.posts.reverse()[0].id + 1
        const newPost = { ...post, id: newId }
        this.posts.push(newPost)
        return newPost
    }

    public async updatePost(post: Partial<PostDto> & { id: number }): Promise<PostDto> {
        for (const p of this.posts) {
            if (p.id === post.id) {
                Object.assign(p, post)
                return p
            }
        }
    }
}
