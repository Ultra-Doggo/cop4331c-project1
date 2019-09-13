// Pull in required dependencies
const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateContactCreation(data) {
    // instantiate errors object
    let errors = {};

    // Convert empty fields to empty strings so we can use
    // validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.contact_name = !isEmpty(data.contact_name) ? data.contact_name : "";
    data.contact_number = !isEmpty(data.contact_number) ? data.contact_number : "";

    // make sure... 


    // make sure contact's name is filled
    if (Validator.isEmpty(data.contact_name)) {
        errors.email  = "Contact name is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};