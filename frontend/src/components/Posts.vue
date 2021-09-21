<template>
    <div id="posts" vfor="post in posts" :key="post.id">
        <p class="user-name">{{ firstName }} {{ lastName }}</p>
        <br>
        <img v-show="post.image" :src="post.image">
        <p class="content">{{ content }}</p>
        <div class="button">
            <button @click="like"><fa icon="thumbs-up"/>J'aime</button>
            <button v-show="user.userId == post.userId" @click="deletePost"><fa icon="trash-alt"/>supprimer</button> 
        </div>
        <div class="comment">
            <input v-model="text" type="text" placeholder="commenter...">
        </div>
        <div class="allComments">
            <p id="comments" vfor="comment in comments" :key="comment.id">{{ text }}</p>
        </div>             
    </div>    
</template>

<script>
import axios from "axios";

export default {
    name: "Posts",
    data() {
        return {
            firstName:"",
            lastname: "",
            content:"",
            image:"",
            text:"",
            like:0

        }
    },
    mounted() {
        axios.get("http://localhost:3000/api/post", {
            headers : {
                'Content-Type': 'application/json',
                Authorization : "Bearer: " + localStorage.getItem("GPMANIA_token")
            }
        })
        .then((response) => {this.posts = response})
        .catch((error) => {error});
    }
    
}
</script>