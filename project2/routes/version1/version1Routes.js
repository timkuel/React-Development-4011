const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("../../lib/middleware/bodyParser");


const baseURL = 'https://jsonplaceholder.typicode.com';


const getAllPosts = (request, response) => {
    const URL = baseURL + '/posts';
    fetch(URL)
        .then(res => res.json())
        .then(json => response.send({ json }));
}


const getAllPostsForUser = async (request, response) => {
    const username = request.params.username;
    const URL = baseURL + "/users";

    try {
        const res1 = await fetch(URL);
        const users = await res1.json();

        for(user in users) {
            if (users[user].username === username) {
                const userID = users[user].id;   
                const postsByUserURL = baseURL + "/posts?userId=" + userID;
                const res2 = await fetch(postsByUserURL);
                const posts = await res2.json();
                response.send(posts)
            }   
        }
    }catch (error) {
        console.error(error);
        response.status(500);
        response.send(error);
    }
}


const getPostByID = async (request, response) => {
    const postID = request.params.postID;
    const URL = baseURL + "/posts/" + postID;

    try {
        const res = await fetch(URL);
        const result = await res.json();
        response.send(result);
    }catch (error) {
        console.error(error);
        response.status(500);
        response.send(error); 
    }
  
}


const getUsersName = async (request, response) => {
    const username = request.params.username;
    const URL = baseURL + "/users";

    try {
        const res = await fetch(URL);
        const users = await res.json();

        for(user in users) {
            if(users[user].username === username)
                response.send(users[user].name);
        }
    }catch (error){
        console.error(error);
        response.status(500);
        response.send(error); 
    }
}


const version1Router = express.Router();

version1Router.get("/allPosts", getAllPosts);
version1Router.get("/allPosts/:username", getAllPostsForUser);
version1Router.get("/posts/:postID", bodyParser.json(), getPostByID);
version1Router.get("/profile/:username", bodyParser.json(), getUsersName);

module.exports = version1Router;