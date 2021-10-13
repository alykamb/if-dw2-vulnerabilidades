import { createState } from '@hookstate/core'

import { AuthModel } from '../models/auth.model'

export const authState = createState<AuthModel | null>(null)