<template>
    <nav>
        <router-link id="link-home" to="/Home">
            <img id="logo-home" alt="retour à la page accueil" src="../assets/icon-black.png">
        </router-link>
        <div class="nav-link">
        <router-link id="link-profil" to="/MonProfil"><fa icon="users"/><br>Mon profil</router-link>
        <p id="link-deconnexion" @click="logout"><fa icon="power-off"/><br>Me déconnecter</p>  
        </div>     
    </nav>
</template>


<script>
export default {
    name: 'NavBar',
    methods: {
        // déconnection
        logout() {
        localStorage.clear()
        this.$router.push("/")
        },    
    } 
}
</script>

<style scoped>
nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
#link-profil {
    margin-right: 50px;
    text-decoration: none;
    color: black;
}
#link-deconnexion {
    text-decoration: none;
    margin-right: 10px;
    color: black;
}
#link-profil:hover, #link-deconnexion:hover {
    color: rgb(235, 101, 11);
}
.nav-link {
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;
}
/*portable*/
@media screen and (max-width: 550px) {
    nav {
        display: block;
    }
    .nav-link {
        margin-top: 30px;
    }
}
</style>