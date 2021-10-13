import { useState } from '@hookstate/core'
import { Fragment, useEffect } from 'react'
import { Link, Route, Switch } from 'react-router-dom'

import { PostModel } from '../../models/post.model'
import { apiService } from '../../services/api.service'
import { postsState } from '../../states/posts.state'
import { Post } from './Post'
import { PostForm } from './PostForm'

export const Posts = () => {
    const posts = useState(postsState)

    useEffect(() => {
        apiService.get<PostModel[]>('/posts').then((res) => {
            console.log(res.data)
            posts.set(res.data)
        })
    }, [])

    if (!posts.value.length) {
        return 'buscandos posts'
    }

    return (
        <div className="posts">
            <div className="actions">
                <Link to="/novo-post">Adicionar Novo</Link>
                <Link to="/editar/1">Editar Novo</Link>
            </div>
            <Switch>
                <Route path="/novo-post" component={PostForm} />
                <Route path="/editar/:id" component={PostForm} />
                <Route
                    path="/"
                    render={() => (
                        <div className="list">
                            {posts.map((post) => (
                                <Fragment key={post.value.id}>
                                    <Post post={post.value} />
                                    <hr />
                                </Fragment>
                            ))}
                        </div>
                    )}
                ></Route>
            </Switch>
        </div>
    )
}
