import { postService } from "../services/posts.service";

const initialState = {
    post: {},
    posts:[],
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
            console.log(data);
            commit('getPosts', data.posts)
            return Promise.resolve()
        })
    },    
    deletePost ({ commit }, id) {
        return postService.deleteOnePost(id) 
        .then (post => {
            commit('deleteSuccess', post)
            return Promise.resolve()
        })
    },
    likePost ({commit}, {id,option}) {
        return postService.likePost(id,option)
        .then (() => {
            return postService.getAllPosts(posts)
            .then ( data => {
                console.log(data);
                commit('getPosts', data.posts)
                return Promise.resolve()
            })
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
    deleteSuccess(state, postId) {
        let posts = state.posts.filter(post => post.id != postId)
        state.posts= posts
    },
}



export const posts = {
    namespaced: true,
    initialState,
    getters,
    actions,
    mutations
};