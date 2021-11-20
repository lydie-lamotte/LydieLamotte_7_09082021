import { createStore } from 'vuex'

import {users} from "./user.store"
import {posts} from "./posts.store"
import {comments} from "./comments.store"


export default createStore({
  modules: {
    users,
    posts,
    comments
  }
})
