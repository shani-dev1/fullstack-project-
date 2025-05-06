const express = require("express")
const router = express.Router()
const verifyJWT = require("../middleware/verifyJWT")

const {addUser,deleteUser} = require("../controllers/userController");

router.post('/', addUser);
router.delete('/:userId',verifyJWT, deleteUser);

module.exports = router

