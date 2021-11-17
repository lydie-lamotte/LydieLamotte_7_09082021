import axios from 'axios'
import { authHeader } from '../helpers/_auth-header.helper'


const apiUrl = "http://localhost:3000/api"

// creation commentaire
function addNewComment(comment) {
    return axios.post(`${apiUrl}/comment/newCmt`, comment, {
        headers: authHeader()
    })
    .then((response)=>console.log(response))
}

// suppression commentaire
function deleteOneComment(id) {
    return axios.delete(`${apiUrl}/comment/deleteCmt/`+ id, {
        headers: authHeader()
    })
}

export  const commentService = {
    addNewComment,
    deleteOneComment,
   
}