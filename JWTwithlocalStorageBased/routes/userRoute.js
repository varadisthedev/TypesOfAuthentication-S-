const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();
 
//                                        _       
//  _   _ ___  ___ _ __   _ __ ___  _   _| |_ ___ 
// | | | / __|/ _ \ '__| | '__/ _ \| | | | __/ _ \
// | |_| \__ \  __/ |    | | | (_) | |_| | ||  __/
//  \__,_|___/\___|_|    |_|  \___/ \__,_|\__\___|
router.post("/register", userController.registerUser);
router.patch("/updateMail", userController.updateUserEmail);
router.delete("/deleteAccount", userController.deleteUser);

module.exports = router;
