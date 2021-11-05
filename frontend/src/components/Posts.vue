<template >    
   <div>
       <h3 v-if=loading>Loading ...</h3>
       <div v-else>
           <div id="posts" v-for="p in posts" :key="p.id">
                <div class="info-user">
                    <p class="user-name"> {{ p.user.lastName }} {{p.user.firstName}}</p>
                    <p class="post-date">publié le {{ getDate(p.updatedAt)}}</p>
                </div>
                <br>
                <img id="image-post" :src="getPictureUrl(p.image)">
                <p class="content">{{ p.content }}</p>
                <div class="button">
                    <button class="like" @click="like"><fa icon="thumbs-up"/></button>
                    <p class="number-like">{{ p.usersLikes }} j'aime</p>
                    <button class="delete" type="submit" v-if="userId == p.userId" @click="deletePost"><fa icon="trash-alt"/></button> 
                </div>
                <CreateComment  :post="p" />
                <Comment />          
            </div>
       </div>
   </div>  
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import CreateComment from "@/components/CreateComment";
import Comment from "@/components/Comment";


export default {
    name: "Posts",
    components: {
       CreateComment,
       Comment
        
    }, 
    data() {
        const user = JSON.parse(localStorage.getItem('GPMANIA_user'));
        return {
            media_url: null,
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
                usersLikes:[],
                id:"",
                updatedAt: null,
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
        }
    },
     computed: {
        ...mapState({
            posts: state => state.posts,
        }),
        ...mapGetters(["posts"]),

    },
    created() {
        this.loadPosts()
        .then(() =>{
            console.log(this.posts)
        })
    },

    methods: {
        ...mapActions('posts', ['loadPosts']),
        
        getPictureUrl(imageUrl){
            console.log(this.media_url)
            return `${this.media_url}${imageUrl} `
        },
        getDate(datetime) {
            let date = new Date(datetime).toLocaleString()
            return date            
        },

        /*like() {
            const id = this.post.id
            
            axios.post("http://localhost:3000/api/post"+ id +"/like", {
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
                window.location.reload();
            }
            }
        } */    
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
/* media queries*/
/*portable*/
@media screen and (max-width: 550px) { 
    #posts {
        width: 100%;
    }
    img {
        width: 100%;
    } 
    .post-date {
        font-size: 0.8em;
        padding-top: 6px;
    }
}      
/*tablette*/
@media screen and (max-width: 950px) and (min-width: 551px){
    #posts {
        width: 80%;
    }
    img {
        width: 70%;
    }
    .post-date {
        font-size: 0.6em;
    }
} 
</style>