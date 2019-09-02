const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Schema for a contact
const ContactSchema = new Schema({
    // all contact entries need to be associated with some user,
    // so we will use a user's email to do so
    email: {
        type: String,
        required: true
    },
    // the name of the contact that our user wishes to do something with
    contact_name: {
        type: String,
        required: true
    },
    contact_number: {
        type: String,
        required: true
    }
});

module.exports = Contact = mongoose.model("contacts", ContactSchema);