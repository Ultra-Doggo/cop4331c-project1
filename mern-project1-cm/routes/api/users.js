// Pull in requried dependencies
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");


const UserID = "";
//console.log("user id = " + userid);
//console.log("hello");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");


// Load User model
const User = require("../../models/User");


// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation - pull the "errors" and "isValid" variables from
    // validateRegisterInput(req.body) function, and check input validation
    const {errors, isValid} = validateRegisterInput(req.body);

    // Check validation, error out if not valid
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // if valid input, use MongoDB's User.findOne() to see if user exists
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Account with this email already exists"});
        }
        else {
            // since user is a new one, fill in the fields with the
            // data sent in the body of the request
            const newUser = new User({
                name: req.body.name,
                //f_name: req.body.f_name,
                //l_name: req.body.l_name,
                email: req.body.email,
                password: req.body.password
            });

            // Hash password using bcryptjs before storing it in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found"});
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                    //f_name: user.f_name,
                    //l_name: user.l_name

                };

                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            //token: "Bearer " + token
                            token: token,
                            //user_obj: user.id, // how do we put this into a variable?
                        });
                        console.log("user id = " + user.id) // not printing the userid....
                        UserID = user.id;
                        //console.log(UserID);

                    }
                );  
                //console.log("user id = " + user.id);
                         


                /*
                // Trying authentication a different way:
                // https://medium.com/crowdbotics/building-a-mern-stack-app-with-material-ui-33ff8ca4da01
                const token = jwt.sign(
                    {
                        _id: user._id
                    },
                    keys.secretOrKey
                );

                res.cookie('t', token, {
                    expire: new Date() + 9999
                });
        
                return res.json({
                    token,
                    user: { _id: user._id, name: user.name, email: user.email }
                });
                */
                
                
            }
            else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect"});
            }
        });
    });

    //console.log("user id = " + user.id);

});


// export our router so we can use it elsewhere
module.exports = router;
