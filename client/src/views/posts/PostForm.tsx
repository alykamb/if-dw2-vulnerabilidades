import 'react-quill/dist/quill.snow.css'

import { useState } from '@hookstate/core'
import { useEffect, useState as useStateReact } from 'react'
import ReactQuill from 'react-quill'
import { useHistory, useParams } from 'react-router-dom'

import { PostModel } from '../../models/post.model'
import { apiService } from '../../services/api.service'
import { postsState } from '../../states/posts.state'

export const PostForm = () => {
    const [content, setContent] = useStateReact('')
    const [title, setTitle] = useStateReact('')

    const posts = useState(postsState)
    const history = useHistory()
    const params: any = useParams()

    useEffect(() => {
        if (params.id) {
            const post = posts.find((p) => p.value.id === +params.id)

            setContent(post?.content?.value || '')
            setTitle(post?.title?.value || '')
        }
    }, [])

    function cadastrar() {
        apiService
            .post<PostModel>('/posts', {
                title,
                content,
            })
            .then((res) => posts.merge([res.data]))
            .then(() => history.push('/'))
    }

    function atualizar() {
        apiService
            .get<PostModel>('/posts/update/' + params.id, {
                params: {
                    title,
                    content,
                },
            })
            .then((res) => posts.merge([res.data]))
            .then(() => history.push('/'))
    }

    return (
        <div>
            <label htmlFor="title">
                Título
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                />
            </label>
            <br />
            <ReactQuill theme="snow" value={content} onChange={setContent} />
            <button type="button" onClick={params.id ? atualizar : cadastrar}>
                Cadastrar
            </button>
        </div>
    )
}
