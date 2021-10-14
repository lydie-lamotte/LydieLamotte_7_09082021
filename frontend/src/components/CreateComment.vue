<template>
    <form @submit.prevent="sendComment(post.id)">
        <div class="comment">
            <textarea v-model="comment.text" id="text" type="text" placeholder="Commenter..."></textarea>
            <button class="send" type="submit" ><fa icon="arrow-alt-circle-right"/></button>
        </div>
    </form>
</template>

<script>
import axios from "axios";

export default {
    name: "CreateComment",
    props: {
            posts: [],
        },
    data() {
        return { 
            userId: parseInt(localStorage.getItem('userId')),
            comment: {
                text:"",
                user_id: "",
                postId: "",
            },
            post: {
                userId: parseInt(localStorage.getItem('userId')),
                id: "",
                content:"",
                image:"",
                comments:[],
            },
            token: localStorage.getItem('GPMANIA_token'),
        }    
    },
    methods: {
        sendComment() {
            const id = this.post
            console.log(id);
            const newComment = {
                text: this.comment.text,
                user_id: this.userId, // id utilisateur connecter,
                postId: this.id,
            } 
            console.log(newComment)
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
        },
    }
}
</script>

<style>
textarea {
    width: 70%;
    height: 40px;
    border-radius: 10px;
    font-size: 1.7em;
    margin-bottom: 20px;
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
.comment {
    display: flex;
    align-items: flex-start;
    justify-content: space-evenly;
}
</style>