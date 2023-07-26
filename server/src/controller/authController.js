const UserModel = require("../model/userModel");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const usernameCheck = await UserModel.findOne({ username });
        if (usernameCheck) {
            return res.json({
                message: "username is already used",
                status: false,
            });
        }

        const emailCheck = await UserModel.findOne({ email });
        if (emailCheck) {
            return res.json({
                message: "email is already used",
                status: false,
            });
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

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({ message: "account not found", status: false });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ message: "incorrect password", status: false });
        }

        delete user.password;
        return res
            .status(200)
            .json({ message: "success to login", status: true, data: user });
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal server error", status: false });
    }
};

module.exports = { register, login };
