import { useState } from '@hookstate/core'
import { Redirect, Route, RouteProps } from 'react-router-dom'

import { authState } from '../../states/auth.state'

export const ProtectedRoute = (props: RouteProps) => {
    const auth = useState(authState)

    return auth.value ? <Route {...props} /> : <Redirect to="/login" />
}
