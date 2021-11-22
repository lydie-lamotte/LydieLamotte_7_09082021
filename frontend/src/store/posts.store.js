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
    // ajout post
    addNewPost({ commit }, post) {
        return postService.addNewPost(post)
        .then (() => {
            return postService.getAllPosts(posts)
            .then ( data => {
                console.log(data);
                commit('getPosts', data.posts)
                return Promise.resolve()
            })
        })
    },
    // récupération posts
    loadPosts({ commit }) {
        return postService.getAllPosts(posts)
        .then ( data => {
            console.log(data);
            commit('getPosts', data.posts)
            return Promise.resolve()
        })
    },    
    // suppression post
    deletePost ({ commit }, id) {
        return postService.deleteOnePost(id) 
        .then (() => {
            return postService.getAllPosts(posts)
            .then ( data => {
                console.log(data);
                commit('getPosts', data.posts)
                return Promise.resolve()
            })
        })
    },
    // like post
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
    getPosts(state,posts){
        state.posts = JSON.stringify(posts)
    },
}



export const posts = {
    namespaced: true,
    initialState,
    getters,
    actions,
    mutations
};