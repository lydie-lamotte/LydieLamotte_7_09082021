import { createStore } from 'vuex'

import {users} from "./user.store"
import {posts} from "./posts.store"

// const state = {
//   users: [{
//     firstName:"",
//     lastName:"",
//     email:"",
//   }],
//   posts: [{
//     id:"",
//     content:"",
//     image: null,
//   }],
//   token:  localStorage.getItem('GPMANIA_token'),
//   comments: [{
//     id:"",
//     test:"",
//   }]
// }

// const mutations = {
//   SET_COMMENTS: (state, comments) => {
//     state.comments = comments
//   }
// };

// const getters = {
//   getComments: () => {
//     return state.comments
//   }
// };

// const actions = {
//   setComments: ({commit}, comments)=>{
//     commit('SET_COMMENTS', comments)
//   },  
// };


export default createStore({
  modules: {
    users,
    posts
  }
})
