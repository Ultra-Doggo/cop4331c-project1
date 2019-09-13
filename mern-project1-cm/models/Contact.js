const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Schema for a contact
const ContactSchema = new Schema({
    // the name of the contact that our user wishes to do something with
    contact_name: {
        type: String,
        required: true
    },
    contact_number: {
        type: String,
        required: true
    },
    contact_email: {
        type: String,
        required: true
    },
    associated_user: {
        type: String,
        require: false
    }

});


module.exports = Contact = mongoose.model("contacts", ContactSchema);