// fonction de vérification du token
export function isAuthenticated(){
    const token = localStorage.getItem('GPMANIA_token');
    return token ? true : false ;
} 