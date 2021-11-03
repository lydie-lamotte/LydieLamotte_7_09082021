//fonction d'authentification des requêtes HTTP avec JWT
export function authHeader() {
    // return authorization header with jwt token
    let token = localStorage.getItem('GPMANIA_token');

    if (token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
}