<template>
    <div class="comments" v-if="post.Comments !== null">
        <div v-for="comment in comments" v-bind:key="comment.id">
            <div class="info-user">
                <p class="user-comment"> {{commentLastName}} {{commentFirstName}} </p>
                <p class="comment-date">commenté le {{ getDate(comment.updatedAt) }}</p>
            </div>
            <div class="comment-text">
                <p class="text">{{ commentText }}</p> 
                <button class="deleteCmt" type="submit" v-if="userId == comment.userId" @click="deleteCom"><fa icon="trash-alt"/></button> 
            </div>
        </div>    
    </div> 
</template>

<script>
import axios from "axios";

export default {
    name:"Comment",
    data() {
        return {
            user_id: localStorage.getItem('userId'),
            user: {
                lastName:"",
                firstName:"",
            },
            comments:[],
            comment: {
                text:"",
                user_id:"",
                postId:"",
            }
        }
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
        getDate(datetime) {
            let date = new Date(datetime).toLocaleString()
            return date            
        },
           deleteCom() {
            const id = this.user_id;
            const isAdmin = 1 ;
            if (id == id || isAdmin == 1) {
            axios.delete('http://localhost:3000/api/post/deleteCmt/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + this.token
                }
            })
            const response = confirm(" Voulez vous supprimer ce commentaire?");
            if (response) {
                window.location.reload()
            }
            }
        }
    }
    
}
</script>