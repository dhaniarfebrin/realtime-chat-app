const UserModel = require("../model/userModel");

const getAllUsers = async (req, res, next) => {
    try {
        // get all users except him
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);

        return res.json(users)
    } catch (err) {
        next(err);
    }
};

module.exports = { getAllUsers };
