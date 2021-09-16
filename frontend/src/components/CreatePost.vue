<template>
    <div id="created-post">
        <div class="profil">
            <p class="user-name"> {{lastName}} {{firstName}}</p>           
        </div> 
        <div class="content">
            <input v-model="content" id="newContent" type="text" placeholder="Quoi de neuf?">
        </div>  

        <form>
            <label for="image">
                <input type="file" name="image" @change="onChange" id="image">
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
        return {
            user: {
                lastName:"",
                firstName:"",
            },                 
            post: {
                id:"",
                content:"",
                image:""
            },
        }
    },
    methods: {
        onChange(event) {
            this.post.content = event.target.files[0] || event.dataTransfer.files        
        },
        addNewPost() {
            const formData = new FormData();
            if (this.image != null && this.content != null) {
                formData.append('content', this.content);
                formData.append('image', this.image);
                axios.post('http://localhost:3000/api/post/newPost', formData, { 
                    headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => { console.log(response)
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
#newContent {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    font-size: 1.3em;
}
#image {
    width: 40%;
    height: 30px;
}
button {
    width: 150px;
    height: 30px;
    color: white;
    background-color: rgb(216, 60, 60);
    margin-top: 20px;
    margin-left: 45%;
    font-size: 1.2em;
}
</style>