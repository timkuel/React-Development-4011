const express = require("express");
const version1Router = require("./routes/version1/version1Routes");
const version2Router = require("./routes/version2/version2Routes");
const logger = require("./lib/middleware/logger");


const app = express();

app.use(logger);
app.use("/v1", version1Router);
app.use("/v2", version2Router);

const port = 3000;
app.listen(port);
console.log("Listening on " + port);