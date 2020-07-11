const express = require("express");
const mongoose = require("mongoose");

const logger = require("./util/middleware/logger");
const userRouter = require("./routes/users/userRoute");
const tokenRouter = require("./routes/token/tokenRoute");
const postsRouter = require('./routes/posts/postsRoute');
const tokenAuth = require("./util/middleware/tokenAuth");

const app = express();
const databaseURL = "mongodb://127.0.0.1:27017/TestDB";
const database = databaseURL.split('/').pop();


mongoose.connect(databaseURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.connection.on('error', err => console.log(err));
mongoose.connection.once('open', () => console.log("Connected to DataBase -", database));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(logger);
app.use("/createUser", userRouter);
app.use("/tokens", tokenRouter);

app.use(tokenAuth);
app.use("/readUser", userRouter);
app.use("/posts", postsRouter);


const port = 5000;
app.listen(port, () => console.log("Now listening on port:", port));
