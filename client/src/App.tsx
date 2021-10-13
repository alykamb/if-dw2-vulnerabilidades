import { useState } from '@hookstate/core'
import { useEffect, useState as useStateReact } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { ProtectedRoute } from './components/router/protectedRoute'
import { AuthModel } from './models/auth.model'
import { apiService } from './services/api.service'
import { authState } from './states/auth.state'
import { Login } from './views/Login'
import { Posts } from './views/posts/Posts'

export function App() {
    const [loading, setLoading] = useStateReact(true)
    const auth = useState(authState)

    useEffect(() => {
        void apiService.get<AuthModel>('/me').then((res) => {
            auth.set(res.data)
            setLoading(false)
        })
    }, [])

    return (
        <div className="App">
            <header className="App-header">Usuário atual: {auth?.value?.id}</header>
            <section>
                {loading ? (
                    <div>Carregando dados</div>
                ) : (
                    <Router>
                        <Switch>
                            <Route path="/login" component={Login} />
                            <ProtectedRoute path="/" component={Posts} />
                        </Switch>
                    </Router>
                )}
            </section>
        </div>
    )
}
