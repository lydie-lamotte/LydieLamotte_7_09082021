<template>
    <form @submit.prevent="sendComment()">
        <div class="comment">
            <textarea v-model="text" id="text" type="text" placeholder="Commenter..."></textarea>
            <button class="send" type="submit" title="publier"><fa icon="arrow-alt-circle-right"/></button>
        </div>
    </form>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: "CreateComment",
    props:{
        post: Object
    },
    data() {
        const user = JSON.parse(localStorage.getItem('GPMANIA_user'));
        return { 
            userId: user.userId,
            text:"",
            postId: "",
            token: localStorage.getItem('GPMANIA_token'),
            submitted: false
        }    
    },
    computed: {
        ...mapState({
            comment: state => state.comment,
        }),
    },
    methods: {
        ...mapActions('comments', ['addNewComment']),
        ...mapActions('posts', ['loadPosts']),
        // publier un commentaire
        async sendComment() {
            this.submitted = true;
            const newComment = {
                text: this.text,
                userId: this.userId,
                postId: this.post.id,
            }            
            if (this.text != null && newComment.postId) { 
                await this.addNewComment(newComment)  
                // reset 
                this.text=""
                await this.loadPosts()
                // console.log(newComment)
                // window.location.reload()
            }
        },
    }
}
</script>

<style scoped>
textarea {
    width: 70%;
    height: 40px;
    border-radius: 10px;
    font-size: 1.7em;
    margin-bottom: 20px;
    margin-left: 20px;
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