<template >    
   <div>
       <h3 v-if=loading>Loading ...</h3>
       <div v-else>
           <div id="posts" v-for="p in posts" :key="p.id">
                <div class="info-user">
                    <p class="user-name">{{ p.userId }} {{ p.lastName }}</p>
                    <p class="post-date">{{ p.updatedAt }}</p>
                </div>
                <br>
                <img v-show="getPictureUrl(p.image)" :src="getPictureUrl(p.image)">
                <p class="content">{{ p.content }}</p>
                <div class="button">
                    <button class="like" @click="like"><fa icon="thumbs-up"/></button>
                    <p class="number-like">{{ p.usersLikes }} j'aime</p>
                    <button class="delete" v-if="userId == p.userId" @click="deletePost"><fa icon="trash-alt"/>supprimer</button> 
                </div>
                <div class="comment">
                    <input v-model="text" type="text" placeholder="commenter...">
                    <button class="send" @click="send-comment"><fa icon="arrow-alt-circle-right"/></button>
                </div>
                <div class="allComments">
                   <p id="comments" v-for="comment in comments" :key="comment.id">{{ comment.text }}</p> 
                </div>             
            </div>
       </div>
   </div>  
</template>

<script>
import axios from "axios";

export default {
    name: "Posts",
    data() {
        return {
            media_url: null,
            posts: [],
            loading:true,
            user: {
                firstName:"",
                lastname: "",
                id:"",
            },
            post: { 
                userId:"",
                content:"",
                image:"",
                usersLikes:[],
                id:"",
                updatedAt:null,
            },
            comments: [],
            comment: {
                text:"",
                userId:"",
                id:""            
            }
        }
    },
    created() {
        axios.get("http://localhost:3000/api/post", {
            headers : {
                'Content-Type': 'application/json',
                Authorization : "Bearer: " + localStorage.getItem("GPMANIA_token")
            }
        })
        .then((response) => {
            
            let data = response.data
            const {media_url,posts} = data
            console.log({media_url,posts});
            this.posts = posts
            this.media_url = media_url
            this.loading = false
            console.log(data);
            
        })
        .catch((error) => {error});
        
    },
    methods: {
        getPictureUrl(imageUrl){
            console.log(this.media_url)
            return `${this.media_url}${imageUrl} `
        },
        like() {
            this.$emit('like')
        },
        deletePost(id) {
            axios.delete("http://localhost:3000/api/post"+id, {
                headers : {
                'Content-Type': 'application/json',
                Authorization : "Bearer: " + localStorage.getItem("GPMANIA_token")
                } 
            })
            const response = confirm(" Voulez vous supprimer ce post?");
            if (response) {
                window.location.reload()
            }
            
        },
    }

    
}
</script>

<style scoped>
#posts {
    background-color: rgba(245, 226, 226, 1);
    margin-top: 50px;
    width: 80%;
    margin: auto;
    margin-top: 30px;
}
.info-user {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
}
img {
    width: 700px;
    height: 500px;
    object-fit: cover;
}
.content {
    background-color: white;
    font-size: 1.5em;
    border: black 1px solid;
    text-align: start;
    padding: 15px;
    margin: auto;
    width: 80%;
}
.button {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 10px;
}
input {
    width: 70%;
    height: 40px;
    border-radius: 10px;
    font-size: 1.2em;
    margin-bottom: 20px;
}
.send {
    color: green;
    font-size: 2.5em;
    border: none;
    background-color: rgba(245, 226, 226, 1);
    opacity: 0.6;
    transition: 0.3s;
}
.send:hover {
    opacity: 1;
}
.like {
    color: blue;
    font-size: 1.8em;
    border: none;
    background-color: rgba(245, 226, 226, 1);
    opacity: 0.5;
    transition: ease-in-out;
}
.like:hover {
    opacity: 1;    
}

</style>