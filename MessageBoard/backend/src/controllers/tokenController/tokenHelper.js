const jsonWebToken = require('jsonwebtoken');
const { isUserPassCorrect } = require('../userController/userController');

const tokenSignature = 'erutangiSnekot';

const createToken = (userId) => jsonWebToken.sign(
    { userId },
    tokenSignature,
    { expiresIn: '2h' }
);

const createTokenRoute = async body => {
    const { username, password } = body;
    const userExists = await isUserPassCorrect(username, password);

    if (!userExists)
        return "ERROR";

    const token = createToken(username);
    return token;
};

module.exports = { createTokenRoute }