<template>
    <div>
        <div id="comments" v-for="comment in comments" v-bind:key="comment.id">
            <div class="info-user">
                <p class="user-comment"> {{comment.lastName}} {{comment.firstName}} </p>
                <p class="comment-date">commenté le {{ getDate(comment.updatedAt) }}</p>
            </div>
            <div class="comment-text">
                <p class="text">{{ comment.text }}</p> 
                <button class="deleteCmt" type="submit" v-if="userId == comment.userId" @click="deleteCom"><fa icon="trash-alt"/></button> 
            </div>
        </div>    
    </div> 
</template>

<script>
import axios from "axios";
import store from "../store";
import {mapActions} from "vuex";

export default {
    name:"Comment",
    store: store,
    data() {
        return {
            userId: localStorage.getItem('userId'),
            token: localStorage.getItem('GPMANIA_token'),
            user: {
                lastName:"",
                firstName:"",
            },
            comment: {
                text:"",
                userId:"",
                postId:"",
                updatedAt:null,
            },
            comments: [],           
        }
    },
    created() {
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
        ...mapActions(["setComments"]),
  
        getDate(datetime) {
            let date = new Date(datetime).toLocaleString()
            return date            
        },
           deleteCom() {
            const id = this.userId;
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

<style scoped>
#comments {
    background-color: rgba(252, 250, 250, 0.918);
    border-radius: 20px;
    width: 80%;
    margin: auto;
    margin-top: 30px
}
.text {
    text-align: start;
    padding-left: 30px;
}
.comment-text {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}
</style>