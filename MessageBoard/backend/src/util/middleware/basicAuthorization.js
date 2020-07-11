const isConfirmedUser = require("../../users/userServices");

const basicAuth = async (request, response, next) => {
    const headers = request.headers.authorization || "";
    const [type, payload] = headers.split(" ");

    if (type === "Basic") {
        const credentials = Buffer.from(payload, "base64").toString("ASCII");
        const [username, password] = credentials.split(":");

        const isAuthorized = await isConfirmedUser(username, password);

        if (isAuthorized) {
            response.status(200);
            next();
        }
        else {
            response.status(401);
            response.send({
                status: 401,
                message: "You are not authorized!"
            });
        }
    }
};

module.exports = basicAuth;