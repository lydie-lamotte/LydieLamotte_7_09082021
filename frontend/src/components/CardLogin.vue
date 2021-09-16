<template>
    <div class=card>
        <h1>Connexion</h1>
        <form id="form" action="" method="post"  novalidate="true">
            <label for="email">
                <input id="email" v-model="email" type="email" name="email" placeholder="Entrez votre email" aria-label="email" required>
            </label> 
            <label for="password">
                <input id="password" v-model="password" type="password" name="password" placeholder="Entrez votre mot de passe" aria-label="mot de passe" required>
            </label>
            <button id="btnLogin" type="submit" @click="logUser">Connexion</button>                     
        </form>
        <div class="link">
            <p>Vous n'avez pas de compte?</p>
            <router-link id="linkSignup" to="/Signup">S'inscrire</router-link>
        </div>
    </div>    
</template>

<script>
import axios from "axios";

export default {
    name: "CardLogin",
    data() {
        return {
            email:"",
            password:"",
        }
    },
    methods: {    
        logUser() {
            const user = {
                    email: this.email,
                    password: this.password,
            }
            if (this.email != "" && this.password != "") {
                axios.post('http://localhost:3000/api/auth/login',user) 
                .then((response)=> { console.log(response)
                    localStorage.setItem('token',response.data.token);
                    this.$router.push('Home');
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
    box-shadow: 1px 5px 15px rgba(0,0,0,0.2);
    margin-bottom: 50px;
}
#form {
    display: flex;
    flex-direction: column;
}
input {
    width: 60%;
    height: 40px;
    margin-bottom: 20px;
    box-shadow: 1px 10px 5px rgba(0,0,0,0.2);
}
#btnLogin {
    width: 20%;
    height: 40px;
    margin: auto;
    background-color: rgb(253, 253, 253);
   
}
#btnLogin:hover {
    transform: scale(1.1);
    box-shadow: 5px 10px 10px #c5c5c5;
    color: white;
    background-color:coral;
}
#linkSignup {
    text-decoration: none;
}
#linkSignup:hover {
    color: blue;
}

</style>