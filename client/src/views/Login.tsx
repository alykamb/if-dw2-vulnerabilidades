import './Login.scss'

import { useState } from '@hookstate/core'
import { FormEventHandler, useState as useStateReact } from 'react'
import { useHistory } from 'react-router-dom'

import { AuthModel } from '../models/auth.model'
import { apiService } from '../services/api.service'
import { authState } from '../states/auth.state'

export const Login = () => {
    const [error, setError] = useStateReact<string | null>(null)
    const auth = useState(authState)
    const history = useHistory()

    const onSubmit: FormEventHandler = (event) => {
        event.preventDefault()
        const values = Array.from((event.currentTarget as any).elements).reduce(
            (acc: any, el: any) => {
                if (el.type !== 'submit') {
                    acc[el.name] = el.value
                }
                return acc
            },
            {},
        )

        apiService
            .post<AuthModel>('/login', values)
            .then((res) => {
                auth.set(res.data)
                history.push('/')
            })
            .catch(() => setError(() => 'Usuário e/ou senha inválido'))
    }

    return (
        <div className="login">
            {error && <div className="error">{error}</div>}
            <form action="#" method="post" onSubmit={onSubmit}>
                <label htmlFor="username">
                    Login:
                    <input type="text" id="username" name="username" />
                </label>
                <label htmlFor="password">
                    Senha:
                    <input type="password" id="password" name="password" />
                </label>
                <div className="actions">
                    <button>Entrar</button>
                </div>
            </form>
        </div>
    )
}
