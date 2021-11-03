<template>
    <div class=card>
        <h1>Connexion</h1>
        <form id="form"  @submit.prevent="handleSubmit" novalidate="true">
            <label for="email">
                <input id="email" v-model="email" type="email" name="email" placeholder="Entrez votre email" aria-label="email" required>
            </label> 
            <label for="password">
                <input id="password" v-model="password" type="password" name="password" placeholder="Entrez votre mot de passe" aria-label="mot de passe" required>
            </label>
            <button id="btnLogin" type="submit">Connexion</button>                     
        </form>
        <div class="link">
            <p>Vous n'avez pas de compte?</p>
            <router-link id="linkSignup" to="/Signup">S'inscrire</router-link>
        </div>
    </div>    
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: "CardLogin",
    data() {
        return {
            email:"",
            password:"",
        }
    },
    computed: {
        ...mapState({
            user: state => state.user,
            isLoggedIn:state=>state.isLoggedIn
        })
    },
    created() {
        //    verify user login
    },
    methods: {   
        ...mapActions('users', ['login', 'logout']), 
        handleSubmit() {
            this.submitted = true;
            const { email, password } = this;
             if (email && password) {
                this.login({ email, password })
                .then(()=>{
                   this.$router.push("/Home")
                })
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
#linkSignup {
    text-decoration: none;
}
#linkSignup:hover {
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