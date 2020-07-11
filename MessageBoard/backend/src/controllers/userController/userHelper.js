const bcrypt = require('bcrypt');
const userModel = require('../../models/user');


const createUser = async body => {
  try {
    const { firstname, lastname, username, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const dateTime = new Date().toLocaleString();

    const userPass = new userModel({
      firstname,
      lastname,
      username,
      password: hashedPassword,
      dateJoined: dateTime
    });

    const result = await userPass.save();

    return result;
  } catch {
    return "ERROR";
  }
}

const readUserInfo = async (username) => {
  try {
    const result = await userModel.find({ username });
    return result;
  }
  catch {
    return "ERROR";
  }
}


const updateUserInfo = async (body, userID) => {
  try {
    const user = await userModel.findById(userID);
    const { firstname, lastname, username, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);

    user.set({
      firstname,
      lastname,
      username,
      password: hashedPassword
    });

    const result = await user.save();

    return result;
  }
  catch {
    return "ERROR";
  }
}


const deleteUserInfo = async userID => {
  try {
    const user = await userModel.findById(userID);
    const result = await user.remove();
    return result;
  }
  catch{
    return "ERROR";
  }
}


const isConfirmedUser = async (username, password) => {
  try {
    const results = await userModel.findOne({ username });

    if (results && (await bcrypt.compare(password, results.password)))
      return true;

    return false;
  } catch (error) {
    throw new Error("Internal Server Error (isconfirmeduser)");
  }
}


const confirmUserExists = async (username) => {
  try {
    const results = await userModel.findOne({ username });

    if (results && results.username === username)
      return true;

    return false;
  } catch (error) {
    throw new Error('Internal server error (confirmeduserexits)');
  }
}

const getAllUsers = async () => {
  const results = await userModel.find();
  return results;
}


module.exports = {
  createUser,
  readUserInfo,
  updateUserInfo,
  deleteUserInfo,
  isConfirmedUser,
  getAllUsers,
  confirmUserExists
}