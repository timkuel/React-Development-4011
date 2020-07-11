const express = require('express');
const bodyParser = require('../../util/middleware/bodyParser');
const { getTokenRoute } = require('../../controllers/tokenController/tokenController');

const tokenRouter = express.Router();

tokenRouter.route("/").post(bodyParser.json(), getTokenRoute);

module.exports = tokenRouter;