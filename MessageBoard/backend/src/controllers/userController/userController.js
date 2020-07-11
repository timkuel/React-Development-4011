const { createUser, isConfirmedUser, confirmUserExists,
    readUserInfo, updateUserInfo, deleteUserInfo, getAllUsers } = require('./userHelper');

const createNewUser = async (request, response) => {
    const body = request.body;
    const res = await createUser(body);

    if (res != "ERROR") {
        response.status(201);
        response.send(res);
    }
    else {
        response.status(500);
        response.send({
            status: 500,
            message: "Internal Server Error: Bad Create"
        });
    }
}


const readAllUserInfoForUsername = async (request, response) => {
    const username = request.params.username;
    const res = await readUserInfo(username);

    if (res != "ERROR") {
        response.status(200);
        response.send(res);
    }
    else {
        response.status(500);
        response.send({
            status: 500,
            message: "Internal Server Error: Bad Read"
        });

    }
}


const updateUserInfoForUserID = async (request, response) => {
    const userID = request.params.userID;
    const body = request.body;
    const res = updateUserInfo(body, userID);

    if (res != null) {
        response.status(200);
        response.send(res);
    }
    else {
        response.status(500);
        response.send({
            status: 500,
            message: "Internal Server Error: Bad Update"
        });
    }
}


const deleteUserByUserID = (request, response) => {
    const userID = request.params.userID;
    const res = deleteUserInfo(userID);

    if (res != null) {
        response.status(200);
        response.send(res);
    }
    else {
        response.status(500);
        response.send({
            status: 500,
            message: "Internal Server Error: Bad Delete"
        });
    }

}


const isUserPassCorrect = async (username, password) => {
    const res = isConfirmedUser(username, password);
    return res;
}


const confirmUsernameExists = async (username) => {
    const res = confirmUserExists(username);
    return res;
}

const getUsers = async () => {
    const res = getAllUsers();
    return res();
}

module.exports = {
    createNewUser,
    readAllUserInfoForUsername,
    updateUserInfoForUserID,
    deleteUserByUserID,
    isUserPassCorrect,
    confirmUsernameExists,
    getUsers
}
