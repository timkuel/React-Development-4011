const express = require("express");
const bodyParser = require("../../lib/middleware/bodyParser");
const mongoose = require("mongoose");


const version2URL = "mongodb://127.0.0.1:27017/version2";


const version2User = mongoose.model("users", {
    id: String,
    name: String,
    username: String,
    email: String,
    phone: String,
    website: String,
    company: {
        name: String,
        catchPhrase: String,
        bs: String
    }
})

const version2Posts = mongoose.model("posts", {
    userID: String,
    id: String,
    title: String,
    body: String
})


const getAllPosts = async (request, response) => {
    try {
        mongoose.connect(version2URL);
        const results = await version2Posts.find().exec();
        mongoose.disconnect();
        response.send(results); 
    }
    catch (error) {
        console.error(error);
        response.status(500);
        response.send(error);
    }
}


const getAllPostsForUserByUsername = async (request, response) => {
    try {
        mongoose.connect(version2URL);
        const username = request.params.username;
        const userData = await version2User.find({ username: username }).exec();
        const userID = userData[0].id;
        const results = await version2Posts.find({ id: userID }).exec();
        mongoose.disconnect();
        response.send(results); 
    }
    catch (error) {
        console.error(error);
        response.status(500);
        response.send(error);
    }
}


const getPostByPostID = async (request, response) => {
    try {
        mongoose.connect(version2URL);
        const postID = request.params.postID;
        const results = await version2Posts.find({ id: postID }).exec();
        mongoose.disconnect();
        response.send(results);
    } catch (error) {
        console.error(error);
        response.status(500);
        response.send(error);
    }
}


const getUserProfileDataByUsername = async (request, response) => {
    try {
        mongoose.connect(version2URL);
        const username = request.params.username;
        const results = await version2User.find({ username: username }).exec();
        mongoose.disconnect();
        response.send(results);
    } catch (error) {
        console.error(error);
        response.status(500);
        response.send(error);
    }
}


const createNewUserProfile = async (request, response) => {
    try {
        mongoose.connect(version2URL);
        const user = new version2User(request.body);
        const result = await user.save();
        mongoose.disconnect();
        response.send(result);

    } catch (error) {
        console.error(error);
        response.status(500);
        response.send(error);
    }
}

/* Had to create this function to add a user to the DB, it allowed
me to search for posts by user */
const createNewPostForSpecificUser = async (request, response) => {
    try {
        mongoose.connect(version2URL);
        const post = new version2Posts(request.body);
        const result = await post.save();
        mongoose.disconnect();
        response.send(result);

    } catch (error) {
        console.error(error);
        response.status(500);
        response.send(error);
    }
}


const updateASpecificPostByPostID = async (request, response) => {
    try {
        mongoose.connect(version2URL);
        const postID = request.params.postID;
        const post = await (await version2Posts.findOne({ id: postID })).execPopulate();
        post.set(request.body);
        const result = await post.save();
        mongoose.disconnect();
        response.send(result);
    }catch (error) {
        console.error(error);
        response.status(500);
        response.send(error);
    }
}


/* Deletes post based off of the given ID to the post, not the unique ID */
const deletePostByPostID = async (request, response) => {
    try {
        mongoose.connect(version2URL);
        const postID = request.params.postID;
        const results = await version2Posts.deleteOne({ id: postID }).exec();
        mongoose.disconnect();
        response.send(results); 
    }
    catch (error) {
        console.error(error);
        response.status(500);
        response.send(error);
    }
}


const version2Router = express.Router();

version2Router.get("/allPosts", getAllPosts);
version2Router.get("/allPosts/:username", getAllPostsForUserByUsername);
version2Router.get("/:username", getUserProfileDataByUsername);

version2Router.post("/posts", bodyParser.json(), createNewPostForSpecificUser);

version2Router.post("/users", bodyParser.json(), createNewUserProfile);

version2Router
    .route("/posts/:postID")
    .get(getPostByPostID)
    .patch(bodyParser.json(), updateASpecificPostByPostID)
    .delete(deletePostByPostID);


module.exports = version2Router;