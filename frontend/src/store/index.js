import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//nouvelle instance de store
export default new Vuex.Store({
    state: {},
    getters: {
        getPosts(state) {
            return state.Posts;
        },
    }
})


