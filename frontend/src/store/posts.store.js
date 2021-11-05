import { postService } from "../services/posts.service";

const state = {
    post: {},
    posts:[]
};
const getters = {
    posts () {
        return state.posts
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
    loadPosts({ commit }, posts) {
        return postService.getAllPosts(posts)
        .then ( ({data}) => {
            console.log(data);
            commit('getPosts', data.posts);
            return Promise.resolve()
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
        state.posts = posts
    },
    deleteSuccess(state, id) {
        state.posts.id = state.posts.id.filter(post => post.id !== id)
    }
}



export const posts = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};