<template>
    <div class=card>
        <h1>Inscription</h1>
        <form id="form" action="" method="post"  novalidate="true">

            <label for="lastName">
                <input id="lastName" v-model="lastName" type="text" name="lastName" placeholder="Entrez votre nom" required>
            </label>

            <label for="firstName">
                <input id="firstName" v-model="firstName" type="text" name="firstName" placeholder="Entrez votre prénom" required>
            </label>

            <label for="email">
                <input id="email" v-model="email" type="email" name="email" placeholder="Entrez votre email" required>
            </label> 

            <label for="password">
                <input id="password" v-model="password" type="current-password" name="password" placeholder="Entrez votre mot de passe">
            </label> 
        
            <button id="btnLogin" type="submit" @click="signup">Connexion</button>                     
        </form>
        <div class="link">
            <p>Vous avez déjà un compte?</p>
            <router-link id="linkLogin" to="/">Se connecter</router-link>
        </div>
    </div>    
</template>

<script>
import axios from "axios";

export default {
    name: "signup",
    data() {
        return {
            firstName: "",
            lastName:"",
            email:"",
            password:"",
        }
    },
    methods: {
        signup() {
            if (this.firstName != "" && this.lastName != "" && this.email != "" && this.password != "") {
                const firstName = this.firstName;
                const lastName = this.lastName;
                const user = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password
                }
                axios.post('http://localhost:3000/api/auth/signup',user) 
                .then(()=> { 
                    localStorage.setItem('firstName',firstName);
                    localStorage.setItem('lastName',lastName);
                    console.log(localStorage)
                    alert('Votre compte est bien crée');
                    this.$router.push({ path: '/' });
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
#linkLogin {
    text-decoration: none;
}
#linkLogin:hover {
    color: blue;
}

</style>