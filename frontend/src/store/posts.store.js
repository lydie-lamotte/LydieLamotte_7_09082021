import { postService } from "../services/posts.service";

const initialState = {
    post: {},
    posts:[]
};
const getters = {
    posts (state) {
        return (typeof state.posts =="string") ? JSON.parse(state.posts) : []
    },
}
const actions = {
    addNewPost({ commit }, post) {
        return postService.addNewPost(post)
            .then( post=>{
                commit('addPostSuccess', post)
                return Promise.resolve()
            })
    },
    loadPosts({ commit }) {
        return postService.getAllPosts(posts)
        .then ( data => {
            commit('getPosts', data.posts);
            return Promise.resolve() // return promise
        })
    },    
    deletePost ({ commit }, id) {
        return postService.deletePost(id) 
        .then (post => {
            console.log(post);
            commit('deleteSuccess', id)
            return Promise.resolve()
        })
    }
};

const mutations = {
    addPostSuccess(state,post) {
        state.post = post;
    },
    getPosts(state,posts){
        state.posts = JSON.stringify(posts)
    },
    deleteSuccess(state, id) {
        state.posts.id = state.posts.id.filter(post => post.id !== id)
    }
}



export const posts = {
    namespaced: true,
    state:initialState,
    getters,
    actions,
    mutations
};