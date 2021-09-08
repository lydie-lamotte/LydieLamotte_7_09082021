<template>
    <div class=card>
        <h1>Connexion</h1>
        <form id="form" action="" method="post"  novalidate="true">
            <label for="email">
                <input id="email" v-model="email" type="email" name="email" placeholder="Entrez votre email" required>
            </label> 
            <label for="password">
                <input id="password" v-model="password" type="current-password" name="password" placeholder="Entrez votre mot de passe">
            </label> 
            <button id="btnLogin" type="submit" @click="login">Connexion</button>                     
        </form>
        <div class="link">
            <p>Vous n'avez pas de compte?</p>
            <router-link id="linkSignup" to="/signup">S'inscrire</router-link>
        </div>
    </div>    
</template>

<script>
import axios from "axios";

export default {
    name: "login",
    data() {
        return {
            email:"",
            password:"",
        }
    },
    methods: {
        login() {
            const user = {
                    email: this.email,
                    password: this.password,
            }
            if (this.email != "" && this.password != "") {
                axios.post('http://localhost:3000/api/auth/login',user) 
                .then(()=> { 
                    localStorage.setItem('token',user.token);
                    localStorage.setItem('userId',user.id);
                    this.$router.push({ path: '/actu' });
                })
                .catch((error) => {console.log(error)}) 
            }
        }    
    },
}
</script>

<style scoped>
.card {
    border: 1px black solid;
    width: 40%;
    margin: auto;
    margin-top: 80px;
    padding-bottom: 50px;
    background-image: url('../assets/icon.png');
    background-position: center;
    background-size: cover;
}
#form {
    display: flex;
    flex-direction: column;
}
input {
    width: 60%;
    height: 40px;
    margin-bottom: 20px;
}
#btnLogin {
    width: 20%;
    height: 40px;
    margin: auto;
    background-color: rgb(253, 253, 253);
}
#btnLogin:hover {
    box-shadow: 5px 10px 18px #888888;
}
#linkSignup {
    text-decoration: none;
}
#linkSignup:hover {
    color: blue;
}

</style>