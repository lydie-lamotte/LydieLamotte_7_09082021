<template >    
   <div>
       <h3 v-if=loading>Loading ...</h3>
       <div v-else>
           <div id="posts" v-for="p in posts" :key="p.id">
                <div class="info-user">
                    <p class="user-name">{{ p.userId }} {{ p.lastName }}</p>
                    <p class="post-date">publié le {{ p.updatedAt }}</p>
                </div>
                <br>
                <img id="image-post" :src="getPictureUrl(p.image)">
                <p class="content">{{ p.content }}</p>
                <div class="button">
                    <button class="like" @click="like"><fa icon="thumbs-up"/></button>
                    <p class="number-like">{{ p.usersLikes }} j'aime</p>
                    <button class="delete" type="submit" v-show="userId == p.userId" @click="deletePost"><fa icon="trash-alt"/></button> 
                </div>
                <div class="comment">
                    <textarea v-model="comment.text" id="text" type="text" placeholder="Commenter..."></textarea>
                    <button class="send" type="submit" @click="sendComment"><fa icon="arrow-alt-circle-right"/></button>
                </div>
                <template v-if="p.comments !== null">
                    <div class="comments" v-for="comment in comments" :key="comment.id">
                        <div class="info-user">
                            <p class="user-comment"> {{comment.userId}} {{comment.userId.lastName}}</p>
                            <p class="comment-date">commenté le {{ comment.updatedAt }}</p>
                        </div>
                        <p class="text">{{ comment.text }}</p> 
                    </div> 
                </template>            
            </div>
       </div>
   </div>  
</template>

<script>
import axios from "axios";
//import dayjs from "dayjs";

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
                userId: localStorage.getItem('userId'),
                content:"",
                image:"",
                usersLikes:[],
                id:"",
                updatedAt: null,
            },
            comments: [],
            comment: {
                text:"",
                userId:localStorage.getItem('userId'),
                postId:"",
                id:"",
                updatedAt: null,           
            },
            token: localStorage.getItem('GPMANIA_token'),
            userId: localStorage.getItem('userId'),
        }
    },
    created() {
        axios.get("http://localhost:3000/api/post", {
            headers : {
                'Content-Type': 'application/json',
                Authorization : "Bearer: " + this.token
            }
        })
        .then((response) => {            
            let data = response.data
            const {media_url,posts} = data
            console.log({media_url,posts});
            this.posts = posts
            this.media_url = media_url
            this.loading = false
            //const updatedAt = dayjs(this.p.updatedAt).format("LLLL")
        })
        .catch((error) => {error});
        
    },
    mounted() {
        axios.get("http://localhost:3000/api/comment", {
            headers : {
                'Content-Type': 'application/json',
                Authorization : "Bearer: " + this.token
            }
        })
        .then((response) => {
            let data = response.data
            const comments = data
            console.log(comments)
            this.comments = comments
        })
        .catch((error) => {error});
    },
    methods: {
        getPictureUrl(imageUrl){
            console.log(this.media_url)
            return `${this.media_url}${imageUrl} `
        },
        like() {
            const post = this.post.userId
            const usersLikes = post.usersLikes
            axios.post("http://localhost:3000/api/post/:id/like", usersLikes, {
                headers : {
                    'Content-Type': 'application/json',
                    Authorization : "Bearer: " + this.token
                }
            })
            .then(res => console.log(res));
        },
        deletePost() {            
            const id = this.userId;
            const isAdmin = 1 ;
            if (id == id || isAdmin == 1) {
            axios.delete('http://localhost:3000/api/post/deletePost/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + this.token
                }
            })
            const response = confirm(" Voulez vous supprimer ce post?");
            if (response) {
                this.$router.go();
            }
            }
        },
        sendComment() {
            const newComment = {
                text: this.comment.text,
                userId: this.comment.userId,
                postId: this.comment.postId
            } 
            if (this.comment.text != null) { 
                axios.post("http://localhost:3000/api/comment/newCmt", newComment, {
                    headers : {
                    'Content-Type': 'application/json',
                    Authorization : "Bearer: " + this.token
                    }   
                })
                .then((response)=> { console.log(response)
                    alert('votre commentaire est créé!')
                    window.location.reload()
                })
                .catch((error) => {console.log(error)})  
            }
        }
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
    padding-bottom: 30px;
}
.info-user {
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
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
textarea {
    width: 70%;
    height: 40px;
    border-radius: 10px;
    font-size: 1.7em;
    margin-bottom: 20px;
}
/* bouton*/
.button {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 10px;
}
.send {
    color: green;
    font-size: 2.5em;
    border: none;
    background-color: rgba(245, 226, 226, 1);
    opacity: 0.6;
    transition: 0.3s;
    cursor: pointer;
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
    cursor: pointer;
}
.like:hover {
    opacity: 1;    
}
.delete {
    border: none;
    background-color: rgba(245, 226, 226, 1);
    font-size: 1.5em;
    cursor: pointer;
    opacity: 0.5;
}
.delete:hover {
    opacity: 1;
}
/*commentaire*/
.comment {
    display: flex;
    align-items: flex-start;
    justify-content: space-evenly;
}
.comments {
    background-color: rgb(247, 241, 232);
    border-radius: 20px;
    width: 80%;
    margin: auto;
    margin-top: 30px
}
.text {
    text-align: start;
    padding-bottom: 20px;
    padding-left: 30px;
}
</style>