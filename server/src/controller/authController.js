const UserModel = require("../model/userModel");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const usernameCheck = await UserModel.findOne({ username });
        if (usernameCheck) {
            return res
                .status(400)
                .json({ message: "username is already used", status: false });
        }

        const emailCheck = await UserModel.findOne({ email });
        if (emailCheck) {
            return res
                .status(400)
                .json({ message: "email is already used", status: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
            username,
            email,
            password: hashedPassword,
        });

        delete user.password; // ini masih gabisa bang
        return res
            .status(201)
            .json({ message: "success to register", status: true, data: user });
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal server error", status: false });
    }
};

module.exports = { register };
