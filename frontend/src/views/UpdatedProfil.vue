<template>
    <div class="updated-profil">
        <NavBar />
        <UpdateProfil />
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import UpdateProfil from '@/components/UpdateProfil.vue';


export default {
    name: 'Signup',
    components: {
        NavBar,
        UpdateProfil
    }
}
</script>

<style scoped>
.updated-profil {
    background-image: url('../assets/icon.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>