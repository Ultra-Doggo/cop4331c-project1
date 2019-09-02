// Pull in required dependencies
const Validator = require("validator");
const isEmpty = require("is-empty");

// Export the function validateRegisterInput, which takes in data
// as a parameter from our frontend registration form
module.exports = function validateRegisterInput(data) {
    // instantiate errors object
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    // (validator only works on strings)
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // make sure name field is filled
    if (Validator.isEmpty(data.name)) {
        errors.name = "name is required";
    }

    // make sure email is filled, and a valid one
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }
    else if
        (!Validator.isEmail(data.email)) {
            errors.email = "This email is invalid";
        }

    // make sure passwords are filled, and match
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password is required";
    }
    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = "Password must be 6-30 characters";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }
    
    // return errors object with any and all errors contained
    // as well as isValid boolean that checks if we have errors
    return {
        errors, 
        isValid: isEmpty(errors)
    };


};
