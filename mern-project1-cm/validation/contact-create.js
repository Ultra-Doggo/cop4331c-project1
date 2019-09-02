// Pull in required dependencies
const Validator = require("validator");
const isEmpty = require("is-empty");

/* not in use right now
// helper function to make sure a user inputs a phone number
// such as .. XXX-XXX-XXXX or XXX.XXX.XXX or XXX XXX XXX
function isPhoneNumber(input) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if((input.value.match(phoneno))) {
        return true;
    }
    else {
        return false;
    }
}
*/


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


    // this isn't working ... oh well, not a requirement ¯\_(ツ)_/¯
    // make sure phone number is in correct format
    //if (!isPhoneNumber(data.contact_number)) {
    //    errors.contact_number = "Phone number is invalid format";
    //}


    return {
        errors,
        isValid: isEmpty(errors)
    };
};