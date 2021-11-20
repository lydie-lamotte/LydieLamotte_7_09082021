import { commentService } from "../services/comments.service.js";

const initiateState = {
    comment: {},
    comments:[]
};

const actions = {
    //ajout commentaire
    addNewComment({ commit }, comment) {
        return commentService.addNewComment(comment)
            .then( comment=>{
                commit('addCommentSuccess', comment)
                return Promise.resolve()
            })
    }, 
    // suppression commentaire
    deleteComment ({ commit }, id) {
        return commentService.deleteOneComment(id) 
        .then (comment => {
            commit('deleteCommentSuccess', comment)
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
}



export const comments = {
    namespaced: true,
    initiateState,
    actions,
    mutations
};