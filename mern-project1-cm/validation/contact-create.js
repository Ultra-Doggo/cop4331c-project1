// Pull in required dependencies
const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateContactCreation(data) {
    // instantiate errors object
    let errors = {};

    // Convert empty fields to empty strings so we can use validations
    //data.email = !isEmpty(data.email) ? data.email : "";
    data.contact_name = !isEmpty(data.contact_name) ? data.contact_name : "";
    data.contact_number = !isEmpty(data.contact_number) ? data.contact_number : "";
    data.contact_email = !isEmpty(data.contact_email) ? data.contact_email : "";


    // make sure contact's name is filled
    if (Validator.isEmpty(data.contact_name)) {
        errors.contact_name  = "Contact name is required";
    }

    if (Validator.isEmpty(data.contact_number)) {
        errors.contact_number = "Contact number is required";
    }

    if (Validator.isEmpty(data.contact_email)) {
        errors.contact_email = "Contact email is required";
    }



    return {
        errors,
        isValid: isEmpty(errors)
    };
};