const { createTokenRoute } = require("./tokenHelper");

const getTokenRoute = async (request, response) => {
    const body = request.body;
    const res = await createTokenRoute(body);
        
    if (res != "ERROR") {
        response.status(201);
        response.json({token: res});
    }else {
        response.status(422);
        response.send({
            status: 422,
            message: "Unprocessable Entity: User Does Not Exist"
        });
    } 
}

module.exports = { getTokenRoute }