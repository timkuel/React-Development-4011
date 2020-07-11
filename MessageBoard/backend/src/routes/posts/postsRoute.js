const express = require('express');
const bodyParser = require('../../util/middleware/bodyParser');
const postsModel = require('../../models/posts');
const userModel = require('../../models/user');


const getAllPosts = async (request, response) => {
  try {
    const results = await postsModel.find();
    response.status(200);
    response.send(results);
  } catch (error) {
    response.status(500);
    response.send({
      status: 500,
      message: "Internal Server Error: can't get all posts"
    });
  }
};

const getAllUsers = async (request, response) => {
  try {
      const results = await userModel.find();
      response.status(200);
      response.send(results);
  } catch (error) {
      response.status(500);
      response.send({
          status: 500,
          message: "Internal Server Error: can't get all users"
      });
  }
}

const getPostByUsername = async (request, response) => {
  try {
    const results = await postsModel.find({ username: request.params.username });
    response.status(200);
    response.send(results);
  } catch (error) {
    response.status(500);
    response.send({
      status: 500,
      message: "Internal Server Error: can't get specific post"
    });
  }
};

const createNewPost = async (request, response) => {
  console.log('request body', request.body)
  try {
    const dateTime = new Date().toLocaleString();
    const post = new postsModel({
      username: request.body.username,
      content: request.body.content,
      date: dateTime
    });

    const result = await post.save();
    response.status(201);
    response.send(result);
  } catch (error) {
    response.status(500);
    response.send({
      status: 500,
      message: "Internal Server Error: can't create post"
    });
  }
};

const updatePost = async (request, response) => {
  try {
    const dateTime = new Date().toLocaleString();
    const character = await postsModel.findOne({ content: request.body.oldContent });

    const newContent = ({
      username: request.body.username,
      content: request.body.newContent,
      date: dateTime
    })

    character.set(newContent);
    const result = await character.save();

    response.status(200);
    response.send(result);
  } catch (error) {
    response.status(500);
    response.send({
      status: 500,
      message: "Internal Server Error: can't update post"
    });
  }
};

const removePost = async (request, response) => {
  try {
    const post = request.body.content;
    const deletedPost = await postsModel.findOne({ content: post });
    const result = await deletedPost.remove();

    response.status(200);
    response.send(result);
  } catch (error) {
    response.status(500);
    response.send({
      status: 500,
      message: "Internal Server Error: can't remove post"
    });
  }
};

const postsRouter = express.Router();

postsRouter
  .route('/')
  .post(bodyParser.json(), createNewPost)
  .get(getAllPosts)
  .delete(bodyParser.json(), removePost)
  .put(bodyParser.json(), updatePost);


postsRouter.route('/users').get(getAllUsers);

postsRouter.route('/:username').get(getPostByUsername);


module.exports = postsRouter;
