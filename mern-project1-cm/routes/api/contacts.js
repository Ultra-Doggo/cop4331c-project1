// Pull in required dependencies
const express = require("express");
const router = express.Router();


// Load input validation
const validateContactCreation = require("../../validation/contact-create");

// not currently in use ... for now just referencing contact deletion by ID
// const validateContactDeletion = require("../../validation/contact-delete");


// Load Contact model
const Contact = require("../../models/Contact");



// @route POST api/contacts/create
// @desc User creates a contact
// @access Public
router.post("/create", (req, res) => {
    // Form validation
    const {errors, isValid} = validateContactCreation(req.body);

    // Check validation, error out if not valid
    if (!isValid) {
        return res.status(400).json(errors);
    }
    else {
        const newContact = new Contact({
            email: req.body.email,
            contact_name: req.body.contact_name,
            contact_number: req.body.contact_number
        });

        newContact
            .save()
            .then(contact => res.json(newContact))
            .catch(err => console.log(err));

    }
});


// Might have to change this later, if we change the implementation
// of how we delete contacts
// @route DELETE api/contacts/delete/[unique id]
// @desc User deletes a contact
// @access Public
router.delete("/delete/:id", (req, res) => {
    Contact.findByIdAndDelete(req.params.id)
        .then(() => res.json("Contact deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});


// @ route POST api/contacts/update/[unique id]
// @ desc User updates a contact's info
// @ access Public
router.post("/update/:id", (req, res) => {
    Contact.findById(req.params.id)
        .then(contact => {
            contact.email = req.body.email;
            contact.contact_name = req.body.contact_name;
            contact.contact_number = req.body.contact_number;

            contact.save()
                .then(() => res.json(contact))
                .catch(err => res.status(400).json("Error: " + err));
        })
});

module.exports = router;