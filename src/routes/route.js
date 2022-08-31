const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const authMiddleware=require('../middlewares/auth')


router.post("/users", userController.createUser)

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId",authMiddleware.authenticate,authMiddleware.autherise,userController.getUserData)
router.post("/users/:userId/posts",authMiddleware.authenticate,authMiddleware.autherise,userController.postMessage)

router.put("/users/:userId",authMiddleware.authenticate,authMiddleware.autherise,userController.updateUser)
router.delete('/users/:userId',authMiddleware.authenticate,authMiddleware.autherise, userController.deleteUser)

module.exports = router;