
import axios from "axios" ;

const apiUrl = "http://localhost:3000/api"

function login(email, password) {
    return axios.post(`${apiUrl}/auth/login`, {email,password}) 
        .then(({data}) => {
            // login successful if there's a jwt token in the response
            if (data.token && data.user) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('GPMANIA_token',data.token);
                localStorage.setItem('GPMANIA_user',JSON.stringify(data.user));
            }
            return data
        });
}

function signup(user) {
    return axios.post(`${apiUrl}/auth/signup`, user)
        .then(({data}) => {
            console.log({data})
            localStorage.setItem('firstName',user.firstName);
            localStorage.setItem('lastName',user.lastName);
        })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('GPMANIA_user');
    localStorage.removeItem('GPMANIA_token');
}

export  const userService = {
    login,
    signup,
    logout
}