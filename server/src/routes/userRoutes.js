const router = require("express").Router();

const { getAllUsers } = require("../controller/userController");

router.get("/:id", getAllUsers)

module.exports = router;
