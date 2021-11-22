<template>
    <div>
        <div id="comments" v-for="comment in comments" :key="comment.id">
           <div v-if="comment.user">
                <div class="info-user">
                    <p class="user-comment"> {{comment.user.lastName}} {{comment.user.firstName}} </p>
                    <p class="comment-date">le {{ getDate(comment.createdAt) }}</p>
                </div>
                <div class="comment-text">
                    <p class="text">{{ comment.text }}</p> 
                    <button class="deleteCmt" type="submit" title="supprimer" v-if="userId == comment.userId || isAdmin == 1" @click="deleteCmt(comment.id)"><fa icon="trash-alt"/></button> 
                </div>
           </div>
        </div>    
    </div> 
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
    name:"Comment",
    props: ["comments","postId"],
    data() {
        const user = JSON.parse(localStorage.getItem('GPMANIA_user'));
        return {
            userId: user.userId,
            user: {
                lastName:"",
                firstName:"",
            },
            comment: {
                id:"",
                text:"",
                userId:"",
                postId:"",
                createdAt:null,
            }, 
            isAdmin: 0,         
        }
    },
    computed: {
        ...mapState([{
            comments: state => state.comments,
        }]),
    },
    methods: {
        ...mapActions('comments', ['deleteComment']),
         ...mapActions('posts', ['loadPosts']),
        // fonction pour le format date
        getDate(datetime) {
            let date = new Date(datetime).toLocaleString()
            return date            
        },
        // supression d'un commentaire
        async deleteCmt(id) {
            const userId = this.userId;
            const isAdmin = 1 ;
            const commentUserId = this.comment.userId
            if (userId == commentUserId || isAdmin == 1) { 
                const response = confirm(" Voulez vous supprimer ce commentaire?");
                if (response) {
                    await this.deleteComment(id)
                    await this.loadPosts()
                    // window.location.reload();
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
.info-user {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 0px 30px;
}
.user-comment {
    font-size: 1.2em;
}
.comment-date {
    font-size: 0.8em;
}
.deleteCmt {
    border: none;
    background-color:rgb(247, 241, 232);
    font-size: 1.2em;
    cursor: pointer;
    opacity: 0.5;
    margin-right: 30px;
}
.deleteCmt:hover {
    opacity: 1;
}
/*portable*/
@media screen and (max-width: 550px) { 
    .info-user {
        padding: 0;
    } 
}
</style>