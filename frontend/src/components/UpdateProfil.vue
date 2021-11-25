<template>
    <div>
        <div class="update-profil-card">
        <h1>Vous pouvez modifier votre profil!</h1>
        <div class="profil">
            <form method="put">
                <label for="lastName">Nom:
                    <input id="lastName" v-model="lastName" type="text" name="lastName" aria-label="nom">
                </label>

                <label for="firstName">Prénom:
                    <input id="firstName" v-model="firstName" type="text" name="firstName" aria-label="prenom">
                </label>

                <label for="email">Email:
                    <input id="email" v-model="email" type="email" name="email" aria-label="email">
                </label>  
            </form>
        </div>
        <button type="submit" class="btn-annuler" @click="returnProfil">Annuler</button>
        <button type="submit" class="btn-modifier" @click.prevent="modifyProfil">Modifier</button>
    </div>

    </div>
</template>

<script>
import axios from 'axios';


export default {
    name: "UpdateProfil",
    data() {
        const user = JSON.parse(localStorage.getItem('GPMANIA_user'));
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email, 
            token: localStorage.getItem('GPMANIA_token'),
            id: user.userId,
            isAdmin: user.isAdmin
        }
    },
    methods: {
        //lien retour vers le profil
        returnProfil() {
            this.$router.push('/MonProfil');
        },
        // modification du profil
        modifyProfil() {
            const id = this.id
            const user = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                userId: this.id,
                isAdmin: this.isAdmin
            }            
            axios.put('http://localhost:3000/api/auth/modify/'+ id, user, {
                headers : {
                'Content-Type': 'application/json',
                Authorization : "Bearer: " + this.token
                }
            })
            .then((response) => { 
                localStorage.removeItem('GPMANIA_user');
                let user = response.config.data;
                localStorage.setItem('GPMANIA_user',user);
                alert('votre profil est modifié!')
                this.$router.push("/MonProfil")
            })
            .catch((error) => {console.log(error)})           
        }
    }
}
</script>

<style scoped>
.update-profil-card {
    padding: 100px 0px;
}
.profil {
    border: 1px black solid;
    width: 50%;
    margin: auto;
    font-size: 1.5em;
    padding: 30px 0px;
    margin-bottom: 50px;
}
form {
    display: flex;
    flex-direction: column;
}
input {
    width: 40%;
    height: 30px;
    margin: 20px 0px;
    font-size: 0.8em;
    font-style: italic;
    color: rgb(78, 78, 78);
}
.btn-annuler {
    color: white;
    background-color: red;
    padding: 10px 30px;
    font-size: 1.2em;
    margin: 20px 0px;
    cursor: pointer;
    opacity: 0.7;
}
.btn-annuler:hover {
    box-shadow: 5px 5px 30px rgb(155, 152, 152);
    opacity: 1;
}
.btn-modifier {
    color: white;
    background-color: green;
    padding: 10px 30px;
    font-size: 1.2em;
    margin: 20px 0px;
    cursor: pointer;
    opacity: 0.7;
    margin-left: 20px;
}
.btn-modifier:hover {
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