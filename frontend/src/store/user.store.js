import {userService} from "../services/users.service"

// initiate state
// soit utilsateur deja connecter , ou pas encore connecter
const user = JSON.parse(localStorage.getItem('GPMANIA_user')) ?? null ;
const initiateState = {
    user ,
    isLoggedIn: user ? true : false
}

const actions = {
    login({ commit },{email,password}) {
        return userService.login(email, password)
                .then( data=>{
                    console.log(`data is ${data}`)
                    commit('loginRequestSuccess', data.user)
                    return Promise.resolve()
                })
    },
    signup({ commit }, user) {
        return userService.signup(user)
            .then (user => {
                console.log(user)
                commit ('signupRequestSucess', user)
                return Promise.resolve()
            })
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
    },
};

const mutations = {
    loginRequestSuccess(state,user) {
        state.user = user;
    },
    signupRequestSucess(state,user) {
        state.user = user;
    },
    getAllFailure(state,error){
        state.error = error
    }
}



export const users = {
    namespaced: true,
    state:initiateState,
    actions,
    mutations
};