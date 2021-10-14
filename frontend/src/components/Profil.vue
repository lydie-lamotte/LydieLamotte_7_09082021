<template>
    <div class="profil-card">
        <h1>Mon profil</h1>
        <div class="profil">
            <p><strong>Nom:</strong> {{lastName}}</p>
            <p><strong>Prénom:</strong> {{firstName}}</p>
            <p><strong>Email:</strong> {{email}}</p>
        </div>
        <button type="submit" class="update-profil" @click="updateProfil">Modifier mon profil</button>
        <button type="submit" class="delete-profil" @click="deleteProfil">Supprimer mon profil</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "Profil",
    data() {
        const user = JSON.parse(localStorage.getItem('GPMANIA_user'));
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email, 
            token: localStorage.getItem('GPMANIA_token'),
            userId: localStorage.getItem('userId')
        }
    },
    methods: {
        deleteProfil() {
            const id = this.userId;
            const isAdmin = 1 ;
            if(id == id || isAdmin == 1) {
            axios.delete('http://localhost:3000/api/auth/delete/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + this.token
                }
            })
            const response = confirm(" Voulez vous supprimer votre profil?");
            if (response) {
                localStorage.clear();
                this.$router.push('/');
            }
            }
        },
        updateProfil() {
            this.$router.push('/UpdatedProfil');
        }
    }
}
</script>

<style scoped>
.profil-card {
    padding: 100px 0px;
}
.profil {
    border: 1px black solid;
    width: 50%;
    margin: auto;
    font-size: 2em;
    padding: 30px 0px;
    margin-bottom: 50px;
}
.delete-profil {
    color: white;
    background-color: red;
    padding: 10px;
    font-size: 1.2em;
    margin: 20px 0px;
    cursor: pointer;
    opacity: 0.7;
}
.delete-profil:hover {
    box-shadow: 5px 5px 30px rgb(155, 152, 152);
    opacity: 1;
}
.update-profil {
    color: white;
    background-color: green;
    padding: 10px;
    font-size: 1.2em;
    margin: 20px 0px;
    cursor: pointer;
    opacity: 0.7;
    margin-right: 20px;
}
.update-profil:hover {
    box-shadow: 5px 5px 30px rgb(155, 152, 152);
    opacity: 1;
}
/* media queries*/
/*portable*/
@media screen and (max-width: 550px) {
    .profil {
        width: 100%;
    }
}
</style>