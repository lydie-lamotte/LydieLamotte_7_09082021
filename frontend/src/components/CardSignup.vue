<template>
    <div class=card>
        <h1>Inscription</h1>
        <form id="form" @submit.prevent="handleSubmit" novalidate="true">

            <label for="lastName">
                <input id="lastName" v-model="lastName" type="text" name="lastName" placeholder="Entrez votre nom" aria-label="nom" required>
            </label>

            <label for="firstName">
                <input id="firstName" v-model="firstName" type="text" name="firstName" placeholder="Entrez votre prénom" aria-label="prenom" required>
            </label>

            <label for="email">
                <input id="email" v-model="email" type="email" name="email" placeholder="Entrez votre email" aria-label="email" required>
            </label> 

            <label for="password">
                <input id="password" v-model="password" type="password" name="password" placeholder="Entrez votre mot de passe" aria-label="mot de passe" required>
            </label> 

            <p id="error-valid">{{ error }}</p>

            <button id="btnLogin" type="submit">Connexion</button>                     
        </form>
        <div class="link">
            <p>Vous avez déjà un compte?</p>
            <router-link id="linkLogin" to="/">Se connecter</router-link>
        </div>
    </div>    
</template>

<script>
//import axios from "axios";
import { mapState, mapActions } from 'vuex'

export default {
    name: "CardSignup",
    data() {
        return {           
            firstName: "",
            lastName:"",
            email:"",
            password:"",
            error:"",
            submitted: false
        }
    },
    computed: {
         ...mapState({
            user: state => state.user,
        }),
    },
    methods: {
        ...mapActions('users', ['signup']),
        // s'inscrire
        handleSubmit() {
            this.submitted = true;
            const validEmail = /^[a-zA-Z0-9-_.]+[@]{1}[a-zA-Z0-9-_.]+[.]{1}[a-z]{2,10}$/;
            const validPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,200})/;
            // vérification des champs
            if (this.firstName == "" || this.lastName == "" || this.email == "" || this.password == "") {
                this.error = "Tous les champs doivent être renseignés."
            }
            // vérification format de l'email
            else if (!validEmail.test(this.email)) {
                this.error = "L'email n'est pas valide."
            }
            // vérification format du password
            else if (!validPassword.test(this.password)) {
                this.error = "Le mot de passe n'est pas valide."
            }
            else {    
            const { firstName, lastName, email, password } = this;
            this.signup({firstName, lastName, email, password});
            alert('votre compte est créé!') 
            this.$router.push("/")
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
#error-valid {
    color: red;
    font-size: 0.8em;
}
#btnLogin {
    width: 30%;
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
#linkLogin {
    text-decoration: none;
}
#linkLogin:hover {
    color: blue;
}
/*portable*/
@media screen and (max-width: 550px) { 
    .card {
        width: 100%;
    } 
    #btnLogin {
        width: 50%;
    }
}      
/*tablette*/
@media screen and (max-width: 950px) and (min-width: 551px){
    .card {
        width: 70%;
    }
    #btnLogin {
        width: 50%;
    }
}     

</style>