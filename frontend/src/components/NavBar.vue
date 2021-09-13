<template>
    <nav>
        <router-link id="link-home" to="/Home">
            <img id="logo-home" alt="retour à la page accueil" src="../assets/icon-black.png">
        </router-link>
        <div class="nav-link">
        <router-link id="link-profil" to="/MonProfil">Mon profil</router-link>
        <router-link id="link-deconnexion" to="/">Me déconnecter</router-link>  
        </div>     
    </nav>
</template>


<script>
export default {
  name: 'NavBar',
 
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
</style>