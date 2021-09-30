<template>
    <div class="monProfil">

        <NavBar />
        <Profil />
    </div>    
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Profil from '../components/Profil.vue'

export default {
    name:"MonProfil", 
    components: {
        NavBar,
        Profil
    }
}
</script>

<style scoped>
.monProfil {
    background-image: url('../assets/icon.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>