const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//   create user function
const createUser = async function (req, res) {
  try {
    let data = req.body;
    // req body is not empty
    if (Object.keys(data).length == 0)
      res.status(400).send("fill all required data");
    let savedData = await userModel.create(data);
    // successfully user created
    res.status(200).send({ msg: savedData });
  } catch (err) {//server side error
    res.status(500).send({ msg: "err", error: err.message });
  }
};

//   login user function
const loginUser = async function (req, res) {
  try {
    let userName = req.body.emailId;
    let password = req.body.password;
    // finding user here
    let user = await userModel.findOne({
      emailId: userName,
      password: password,
    });
    if (!user)
      return res.status(400).send({
        status: false,
        msg: "username or the password is not corerct",
      });
    // creating jwt token for new login
    let token = jwt.sign(
      {
        userId: user._id.toString(),
        batch: "plutonium",
        organisation: "FUnctionup",
      },
      "functionup-plutonium"
    );
    // sending response
    res.setHeader("x-auth-token", token);
    // successfully login
    res.status(200).send({ status: true, data: token });
  } catch (err) {
    res.status(500).send({ msg: "err", error: err.message });
  }
};

//   fetch user details for auttherise user
const getUserData = async function (req, res) {
  try {
    let userId = req.params.userId;
    // finding autherise user
    let userDetails = await userModel.findById(userId);
    // sended to client
    res.status(200).send({ status: true, data: userDetails });
  } catch (err) {
    res.status(500).send({ msg: "err", error: err.message });
  }
};

// user updating function
const updateUser = async function (req, res) {
  try {
    let userId = req.params.userId;
    let userData = req.body;
    // updating user data after autherising
    let updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      userData,
      { new: true }
    );
    res.status(200).send({ status: updatedUser, data: updatedUser });
  } catch (err) {
    res.status(500).send({ msg: "err", error: err.message });
  }
};

const deleteUser = async function (req, res) {
  try {
    let userId = req.params.userId;

    let deletedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      { $set: { isDeleted: true } },
      { new: true }
    );
    return res.status(200).send({ status: true, data: deletedUser });
  } catch (err) {
    res.status(500).send({ msg: "err", error: err.message });
  }
};

// post uploading function
const postMessage = async function (req, res) {
  try {
    // here is post info stored
    let message = req.body.message;
    let user = await userModel.findById(req.params.userId);
    let updatedPosts = user.posts;
    //add the message to user's posts
    updatedPosts.push(message);
    let updatedUser = await userModel.findOneAndUpdate(
      { _id: user._id },
      { posts: updatedPosts },
      { new: true }
    );

    //return the updated user document
    return res.status(200).send({ status: true, data: updatedUser });
  } catch (err) {
    res.status(500).send({ msg: "err", error: err.message });
  }
};

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
module.exports.postMessage = postMessage;