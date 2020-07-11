const express = require('express');
const bodyParser = require('../../util/middleware/bodyParser');
const { createNewUser, readAllUserInfoForUsername, updateUserInfoForUserID, deleteUserByUserID, getUsers } = require('../../controllers/userController/userController');

const userRouter = express.Router();

userRouter.route('/')
    .post(bodyParser.json(), createNewUser)
    .get(getUsers);

userRouter.route('/:username').get(readAllUserInfoForUsername);

userRouter
    .route('/:userID')
    .put(bodyParser.json(), updateUserInfoForUserID)
    .delete(deleteUserByUserID);

module.exports = userRouter;