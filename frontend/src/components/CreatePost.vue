<template>
    <div class="created-post">
        <div class="profil">
            <img class="image-profil" src=""> 
            {{firstName + "" + lastName}}             
        </div> 
        <div class="content">
            <input v-model="content" id="newContent" type="text" placeholder="Quoi de neuf?">
        </div>  

        <div>
            <input type="file" @change="onChange" id="addImage">
            <button type="submit" @click="addNewPost">Envoyer</button>
        </div>      
    </div>    
</template>

<script>
import axios from 'axios';

export default {
    name: 'Home',
    data() {
        return {
            post: {
                id:"",
                content:"",
                image:""
            }
        }
    },
 

    methods: {
        onChange(event) {
            this.content = event.target.files[0] || event.dataTransfer.files        
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
.image-profil {
    border: black 1px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
}
#newContent {
    width: 80%;
    height: 40px;
    border-radius: 10px;
    
}
#addImage {
    width: 40%;
    height: 30px;
}
button {
    width: 150px;
    height: 30px;
    color: white;
    background-color: blue;
}
</style>