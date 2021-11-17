import { commentService } from "../services/comments.service.js";

const state = {
    comment: {},
    comments:[]
};

const actions = {
    addNewComment({ commit }, comment) {
        return commentService.addNewComment(comment)
            .then( comment=>{
                commit('addCommentSuccess', comment)
                return Promise.resolve()
            })
    }, 
    deleteComment ({ commit }, id) {
        return commentService.deleteOneComment(id) 
        .then (() => {
            commit('deleteCommentSuccess', id)
            return Promise.resolve()
        })
    }
};

const mutations = {
    addCommentSuccess(state,comment) {
        state.comment = comment;
    },
    deleteCommentSuccess(state, id) {
        let comments = state.comments.filter(comment => comment.id != id)
        state.comments= comments
    },
    reFreshComment (state, id, newComment){
        state.comments.map(comment=>{
            if (comment.id == id){
                comment = newComment
            }
        }) 
    },
}



export const comments = {
    namespaced: true,
    state,
    actions,
    mutations
};