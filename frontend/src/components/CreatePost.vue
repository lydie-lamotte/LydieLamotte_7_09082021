<template>
    <div id="created-post">
        <div class="profil">
            <p class="user-name">Bonjour {{firstName}} {{lastName}}</p>           
        </div> 
        <form @submit.prevent="createPost" novalidate="true">
            <label for="content">
                <textarea v-model="content" id="content" type="text" placeholder="Quoi de neuf?" required></textarea>
            </label>  
        
            <label for="image">
                <input type="file" name="image" @change="onFileSelected" id="image" required>
            </label>
            <button type="submit">Publier</button>
        </form>      
    </div>    
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
            submitted: false
        }
    },
    computed: {
         ...mapState({
            post: state => state.post,
        }),
    },
    methods: {
        ...mapActions('posts', ['addNewPost']),
        onFileSelected(event) {
            console.log(event)
            this.image = event.target.files[0] || event.dataTransfer.files        
        },
        createPost() {
            this.submitted = true;
            const formData = new FormData()
            if (this.image != null && this.content != null) {
                formData.append('content', this.content);
                formData.append('image', this.image);
                formData.append('userId', this.userId);
                this.addNewPost( formData )  
                window.location.reload() 
            }  
        }                        
    }
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
    padding: 5px 20px;
    color: white;
    background-color: rgb(213, 137, 137);
    margin-top: 20px;
    margin-left: 45%;
    font-size: 1.2em;
    opacity: 1;
}
button:hover {
    color:black;
    box-shadow: 5px 5px 30px rgb(155, 152, 152);
    cursor: pointer;
}
</style>