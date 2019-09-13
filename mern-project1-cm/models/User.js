const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Schema for a user
const UserSchema = new Schema({
    name: {
       type: String,
        required: true
    },
    //f_name: {
    //    type: String,
    //    required: true
    //},
    //l_name: {
    //    type: String,
    //    required: true
    //},
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model("users", UserSchema);

