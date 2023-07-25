const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./src/routes/authRoutes");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.log(err.message);
    });

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on Port ${process.env.PORT}`);
});
