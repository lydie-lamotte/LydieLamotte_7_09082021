import axios from 'axios';
import { authHeader } from '../helpers/_auth-header.helper';

const apiUrl = "http://localhost:3000/api";

// creation post
function addNewPost(post) {
    return axios.post(`${apiUrl}/post/newPost`, post, {
        headers: authHeader()
    })
    .then((response)=>console.log(response))
}

// suppression post
function deleteOnePost(id) {
    return axios.delete(`${apiUrl}/post/deletePost/`+ id, {
        headers: authHeader()
    })
}

// récupérer tous les posts
function getAllPosts() {
    return axios.get(`${apiUrl}/post`,{
        headers: authHeader()
    }) 
    .then(({data})=>{return data})   
}

//like un post
function likePost(id, option) {
    return axios.post(`${apiUrl}/post/`+ id +`/like`, {option}, {
        headers: authHeader()
    })
    .then(({data}) => {return data})
}

export  const postService = {
    addNewPost,
    deleteOnePost,
    getAllPosts,
    likePost
}