// Pull in required dependencies
const Validator = require("validator");
const isEmpty = require("is-empty");

// Export the function validateRegisterInput, which takes in data
// as a parameter from our frontend registration form
module.exports = function validateLoginInput(data) {
    // Instantiate errors object
    let errors = {};

    // Convert empty fields to empty strings (for validator functions)
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // make sure email field is filled
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email required";
    }
    else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // make sure password is filled
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password required";
    }

    // return any errors, and 
    // check if there are any errors using isValid boolean
    return {
        errors, 
        isValid: isEmpty(errors)
    };

};