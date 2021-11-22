<template >    
   <div>
       <h3 v-if=loading>Loading ...</h3>
       <div v-else>
           <div  v-for="p in posts" :key="p.id">
               <div class="posts" v-if="p.user">
                   <div class="info-user">
                    <p class="user-name"> {{ p.user.lastName }} {{p.user.firstName}}</p>
                    <p class="post-date">publié le {{ getDate(p.createdAt)}}</p>
                    </div>
                    <br>
                    <img id="image-post" :src="getPictureUrl(p.image)">
                    <p class="content">{{ p.content }}</p>
                    <div class="button">
                        <button class="like" title="j'aime" @click="like(p)"><fa icon="thumbs-up"/></button>
                        <p class="number-like">{{ (JSON.parse(p.usersLikes)).length }} j'aime</p>
                        <button class="delete" type="submit" title="supprimer" v-if="userId == p.userId || isAdmin == 1 " @click="postDelete(p.id)"><fa icon="trash-alt"/></button> 
                    </div>
                    <CreateComment  :post="p" />    
                    <Comment :comments ="p.comments" :postId="p.id" />   
               </div> 
            </div>
       </div>
   </div>  
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import CreateComment from "@/components/CreateComment";
import Comment from "@/components/Comment";

const media_url = "http://localhost:3000";
export default {
    name: "Posts",
    components: {
       CreateComment,
       Comment
        
    }, 
    data() {
        const user = JSON.parse(localStorage.getItem('GPMANIA_user'));
        return {
            loading: true,
            user: {
                firstName:"",
                lastname: "",
                id:"",
            },
            post: { 
                userId: "",
                content:"",
                image:"",
                usersLikes: [],
                id:"",
                createdAt: null,
            },
            comments: [],
            comment: {
                text:"",
                userId:"",
                postId:"",
                id:"",
                updatedAt: null,           
            },
            token: localStorage.getItem('GPMANIA_token'),
            userId: user.userId,
            isAdmin: 0,
        }
    },
    computed: {
        ...mapState([{
            posts: state => state.posts,
        }]),
        ...mapGetters('posts', ['posts']),
    },
    // récupération des posts
    mounted() {
        this.getAll() 
    },
    methods: {
        ...mapActions('posts', ['loadPosts','deletePost','likePost']),
        // affichage de la photo
        getPictureUrl(imageUrl){
            return `${media_url}${imageUrl} `
        },
        // format date       
        getDate(datetime) {
            let date = new Date(datetime).toLocaleString()
            return date            
        },
        // récupération des posts asynchrone
        async getAll(){
            this.loadPosts()
                .then(() => {
                    this.loading = false
                })
            
        },
        // fonction pour vérifier si user a déjà liké
        userAlreadyLikeThatPost(userId,stringArrayLikes){
            let likes = JSON.parse(stringArrayLikes) ;
            return likes.includes(userId)
        },
        // like ou pas de like selon l'option et la fonction 
        like(p) {
            console.log(this.userId)
            const alreadyLikes = this.userAlreadyLikeThatPost(this.userId,p.usersLikes)
            console.log(`user already likes ${alreadyLikes}`);
            const option = (alreadyLikes) ? -1 : 1 ;
            console.log(`user option body send ${option}`)
            this.likePost({id:p.id,option})   
        },
        // suppression du post
        postDelete(id) {           
            const userId = this.userId;
            const isAdmin = 1 ;
            const postUserId = this.post.userId
            if (userId == postUserId || isAdmin == 1) {
                const response = confirm(" Voulez vous supprimer ce post?")
                if (response) {
                    this.deletePost(id)          
                }
            }
        }    
    }   
}
</script>

<style scoped>
.posts {
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
.user-name{
    text-transform: uppercase;
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
    padding: 5px;
    margin: auto;
    width: 80%;
}
/* bouton*/
.button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 10px;
}

.like {
    color: blue;
    font-size: 1.8em;
    border: none;
    background-color: rgba(245, 226, 226, 1);
    opacity: 0.5;
    transition: ease-in-out;
    cursor: pointer;
    margin-right: 50px;
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
    margin-left: 50px;
}
.delete:hover {
    opacity: 1;
}
/* media queries*/
/*portable*/
@media screen and (max-width: 550px) { 
    .posts {
        width: 100%;
    }
    img {
        width: 100%;
        height: 400px;
    } 
    .post-date {
        font-size: 0.8em;
        padding-top: 6px;
    }
}      
/*tablette*/
@media screen and (max-width: 950px) and (min-width: 551px){
    .posts {
        width: 90%;
    }
    img {
        width: 70%;
    }
    .post-date {
        font-size: 0.6em;
    }
} 
</style>