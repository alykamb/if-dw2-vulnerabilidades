import { createState } from '@hookstate/core'

import { PostModel } from '../models/post.model'

export const postsState = createState<PostModel[]>([])
