<template>
    <div id="created-post">
        <div class="profil">
            <p class="user-name">Bonjour {{firstName}} {{lastName}}</p>           
        </div> 
        <label for="content">
            <textarea v-model="content" id="content" type="text" placeholder="Quoi de neuf?" required></textarea>
        </label>  

        <form>
            <label for="image">
                <input type="file" name="image" @change="onFileSelected" id="image" required>
            </label>
            <button type="submit" @click="addNewPost">Envoyer</button>
        </form>      
    </div>    
</template>

<script>
import axios from 'axios';

export default {
    name: 'CreatePost',
    data() {
        const user = JSON.parse(localStorage.getItem('GPMANIA_user'));
        return {               
            firstName: user.firstName,
            lastName: user.lastName, 
            id:"",
            content:"",
            image: null,
            userId: user.userId,
        }
    },
    methods: {
        onFileSelected(event) {
            console.log(event)
            this.image = event.target.files[0] || event.dataTransfer.files        
        },
        addNewPost() {
            console.log(this.userId)
            const formData = new FormData();
            if (this.image != null && this.content != null) {
                formData.append('content', this.content);
                formData.append('image', this.image);
                formData.append('userId', this.userId);
                axios.post('http://localhost:3000/api/post/newPost', formData,
                {
                headers:{
                "Content-Type": "multipart/form-data",
                Authorization: 'Bearer ' + localStorage.getItem('GPMANIA_token')
                }
                })
            
                .then((response) => { 
                    console.log(formData)
                    console.log(response);
                    alert('votre post est créé!')
                    window.location.reload()
                })
                .catch((error) => {console.log(error)}) 
            } 
        }                    
    }, 
}
</script>



<style scoped>
#created-post {
    background-color: rgba(245, 226, 226, 1);
    text-align: start;
    padding: 20px;
    margin-top: 50px;
}
.image-profil {
    border: black 1px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
}
#content {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    font-size: 1.8em;    
}
#image {
    width: 40%;
    height: 30px;
}
button {
    width: 150px;
    height: 30px;
    color: white;
    background-color: rgb(240, 66, 66);
    margin-top: 20px;
    margin-left: 45%;
    font-size: 1.2em;
}
</style>