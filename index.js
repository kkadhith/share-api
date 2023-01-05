const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

dotenv.config();

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URL, () => {
    console.log('connected to mongo');
});


//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

// app.get("/", (req, res) => {
//     res.send("welcome to home");
// });

// app.get("/users", (req, res) => {
//     res.send("users page");
// });



app.listen(8800,()=> {
    console.log("running");
});