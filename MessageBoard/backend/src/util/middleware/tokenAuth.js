const jsonwebtoken = require('jsonwebtoken');
const { confirmUsernameExists } = require('../../controllers/userController/userController');

const tokenSignature = 'erutangiSnekot';

const tokenAuth = async (request, response, next) => {
  const header = request.headers.authorization;

  if (typeof header != 'undefined') {
    const [type, token] = header.split(' ');

    if (type === 'Bearer') {
      try {
        const payload = jsonwebtoken.verify(token, tokenSignature);
        const doesUserExist = await confirmUsernameExists(payload.userId);

        if (doesUserExist) {
          response.status(200);
          next();
        }
        else {
          response.status(401);
          response.send({
            status: 401,
            message: "Unauthorized"
          })
        }

      } catch (error) {
        response.send(error.message);
      }
    }
    else {
      response.status(400);
      response.send({
        status: 400,
        message: "Bad Request"
      })
    }
  }
  else {
    response.status(401);
    response.send({
      status: 401,
      message: "Unauthorized"
    }); 
  }
};

module.exports = tokenAuth;
