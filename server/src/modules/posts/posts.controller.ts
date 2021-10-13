import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common'
import * as sanitizeHtml from 'sanitize-html'

import { CreatePostWithAuthorDto, PostDto } from '../../dtos/post.dto'
import { CRSF_PROTECTION, XSS_PROTECTION } from '../../vulnerabilidadades.constants'
import { JwtAuthGuard } from '../auth/jwt.guard'
import { CsrfGuard } from '../csrf/csrf.guard'
import { PostsRepository } from './posts.repository'

@UseGuards(JwtAuthGuard, ...(CRSF_PROTECTION ? [CsrfGuard] : []))
@Controller('api/v1/posts')
export class PostsController {
    constructor(private postsRepository: PostsRepository) {}

    @Get()
    public getPosts(): Promise<PostDto[]> {
        return this.postsRepository.getPosts()
    }

    @Post()
    public async createPost(@Body() post, @Req() { user }: Request & { user: any }): Promise<any> {
        const newPost: CreatePostWithAuthorDto = {
            author: user.id,
            content: XSS_PROTECTION ? sanitizeHtml(post.content) : post.content,
            title: post.title,
        }

        return this.postsRepository.createPost(newPost)
    }

    @Get('update/:id')
    public async updatePost(
        @Param('id') id: string,
        @Query() post,
        @Req() { user }: Request & { user: any },
    ): Promise<any> {
        const newPost: Partial<PostDto> & { id: number } = {
            id: +id,
            author: user.id,
            content: XSS_PROTECTION ? sanitizeHtml(post.content) : post.content,
            title: post.title,
        }

        return this.postsRepository.updatePost(newPost)
    }
}
