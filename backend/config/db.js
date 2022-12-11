
require("dotenv").config();
const mongoose = require("mongoose");
function connectDB() {
    mongoose
        .connect(process.env.MONGO_CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('DB connection successful!')).catch((e) => {
            console.log('error while connencting database');
            console.log(e);
        });
}

// mIAY0a6u1ByJsWWZ
module.exports = connectDB;
