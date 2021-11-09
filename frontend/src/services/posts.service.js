import axios from 'axios'
import { authHeader } from '../helpers/_auth-header.helper'

const apiUrl = "http://localhost:3000/api"

// creation post
function addNewPost(post) {
    return axios.post(`${apiUrl}/post/newPost`, post, {
        headers: authHeader()
    })
    .then((response)=>console.log(response))
}

// suppression post
function deletePost(id) {
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

export  const postService = {
    addNewPost,
    deletePost,
    getAllPosts
}