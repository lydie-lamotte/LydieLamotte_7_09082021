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
            <button id="btnLogin" type="submit" @click.prevent="login">Connexion</button>                     
        </form>
        <div class="link">
            <p>Vous n'avez pas de compte?</p>
            <router-link id="linkSignup" to="/signup">S'inscrire</router-link>
        </div>
    </div>    
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            email:"",
            password:"",
        }
    },
    methods: {
        validateFields() {
            if (this.email != "" && this.password != "") {
                return true
            }
        }
    },
}
</script>
