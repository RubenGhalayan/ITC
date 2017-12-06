const bluebird = require("bluebird");
const crypto = bluebird.promisifyAll(require("crypto"));
const nodemailer = require("nodemailer");
const User = require("./model");
const express = require("express");
const router = express.Router();
const util = require("util");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "instigatevanadzordesign@gmail.com",
        pass: "fanatikemployee"
    }
});

module.exports.forgotPassword = function (req, res, next) {
    crypto.randomBytes(48, function (err, buffer) {
        passwordToken = buffer.toString("hex");
    });
    User.findOne(
        {
            email: req.params.email
        },
        function (err, user) {
            if (!user) {
                res.send({
                    Status: "There is no account registered with specified email."
                });
            } else {
                user.passwordResetToken = passwordToken;
                user.passwordResetExpires = Date.now() + 3600000; // 1 hour
                const token = user.passwordResetToken;
                const mailOptions = {
                    to: req.params.email,
                    from: "IMForms",
                    subject: "Reset your password on IMForms",
                    text: `Hello,\nYou are receiving this email because you (or someone else) have requested the reset of the password for your account.\nPlease click on the following link to complete the process:\nhttps://${req.headers.host}/reset\-\password/${token}\nIf you did not request this, please ignore this email and your password will remain unchanged.\nBest Regards\nIMForms Team`
                };
                res.send({
                    Status: "OK"
                });
                transporter.sendMail(mailOptions, function (err) {
                    User.createUser(user, {});
                });
            }
        }
    );
};

function authenticate(res, myuser) {
    let time = 48 * 3600; // 2 day
    let tokenData = {
        userId: myuser._id,
        name: myuser.name
    }
    console.log(tokenData);
    var token = jwt.sign(tokenData, process.env.SECRET_KEY, {
        expiresIn: time
    });
    res.send({
        status: "success",
        data: "You have been successfully authenticated.",
        navigate: "/home",
        token: token,
        name: myuser.name
    });
}

module.exports.isValidToken = function (req, res) {
    let token = req.body.token || req.headers.token;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, function (err, decode) {
            if (err) {
                res.send({
                    status: "error",
                    data: "invalid token"
                });
            } else {
                let myid = decode.userId;
                User.findOne(
                    {
                        _id: myid
                    },
                    function (err, user) {
                        if (err) {
                            res.send({
                                status: "error",
                                data: "Server error"
                            });
                            return;
                        }
                        if (!user) {
                            res.send({
                                status: "error",
                                data: "Unknown User"
                            });
                            return;
                        }
                        res.send({
                            status: "success",
                            data: "Token valid"
                        });
                        return;
                    }
                );
            }
        });
    } else {
        res.send({
            status: "error",
            data: "Token required"
        });
    }
};

module.exports.deleteUser = function (req, res) {
    res.send({
        status: "deleteUser working"
    });
};

module.exports.resetPassword = function (req, res) {
    User.findOne(
        {
            passwordResetToken: req.params.token
        },
        function (err, user) {
            var dateNow = new Date();
            if (!user) {
                res.send({
                    Status:
                    "It looks like you clicked on an invalid password reset link. Please try again."
                });
            } else if (user.passwordResetExpires - dateNow < 0) {
                res.send({
                    Status:
                    "It looks like you clicked on an invalid password reset link. Please try again."
                });
            } else {
                res.send({
                    Status: "OK"
                });
            }
        }
    );
};

module.exports.updatePassword = function (req, res) {
    User.findOne(
        {
            passwordResetToken: req.params.token
        },
        function (err, user) {
            var dateNow = new Date();
            if (!user) {
                res.send({
                    Status:
                    "It looks like you clicked on an invalid password reset link. Please try again."
                });
            } else if (user.passwordResetExpires - dateNow < 0) {
                res.send({
                    Status:
                    "It looks like you clicked on an invalid password reset link. Please try again."
                });
            } else {
                res.send({
                    Status: "OK"
                });
                user.password = req.body.password;
                user.passwordResetToken = undefined;
                user.passwordResetExpires = undefined;
                const mailOptions = {
                    to: user.email,
                    from: "IMForm",
                    subject: "Your IMForm password has been changed",
                    text: `Hello,\nThis is a confirmation that the password for your account ${user.email} has just been changed.\nBest Regards\nIMForms Team`
                };
                return transporter.sendMail(mailOptions).then(() => {
                    User.createUser(user, {});
                });
            }
        }
    );
};

module.exports.addUser = function (req, res) {
    User.findOne(
        {
            email: req.body.email
        },
        function (err, user) {
            if (err) {
                res.send({
                    status: "error",
                    data: "Server error."
                });
                return;
            }
            if (user) {
                res.send({
                    status: "error",
                    data: "Email already exists."
                });
                return;
            } else {
                var name = req.body.name;
                var email = req.body.email;
                var password = req.body.password;
                var confirmPassword = req.body.confirmPassword;

                req.checkBody("name", "Name is required").notEmpty();
                req.checkBody("email", "Email is required").notEmpty();
                req.checkBody("email", "Email is not valid").isEmail();
                req.checkBody("password", "Password is required").notEmpty();
                req
                    .checkBody("confirmPassword", "Passwords do not match")
                    .equals(req.body.password);

                req.getValidationResult().then(function (result) {
                    if (!result.isEmpty()) {
                        res.send({
                            status: "error",
                            data:
                            "Invalid json format for registration " +
                            util.inspect(result.array())
                        });
                        return;
                    }
                    var newUser = new User({
                        name: name,
                        email: email,
                        password: password
                    });
                    User.createUser(newUser, function (err, user) {
                        if (err) throw err;
                        authenticate(res, newUser);
                    });
                });
            }
        }
    );
};

module.exports.verifyUser = function (req, res) {
    mail = req.body.nameEmail;
    password = req.body.password;
    User.findOne(
        {
            email: mail
        },
        function (err, user) {
            if (err) {
                res.send({
                    status: "error",
                    data: "Server error"
                });
                return;
            }
            if (!user) {
                res.send({
                    status: "error",
                    data: "Unknown User"
                });
                return;
            }
            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    authenticate(res, user);
                } else {
                    res.send({
                        status: "error",
                        data: "Invalid password"
                    });
                }
            });
        }
    );
};

module.exports.getAllUsers = function (req, res) {
    const decoded = jwt.decode(req.headers.token, { complete: true });
    const userID = decoded.payload.userId;
    let usersArray = [];
    User.findOne({
        "_id": userID
    }, function (err, user) {
        if (!user) {
            res.send({ "status": "invalid token" });
        } else {
            User.find({ forms: { $not: { $elemMatch: { formID: req.params.formID } } } }, function (err, users) {
                for (i in users) {
                    if (users[i].email != user.email) {
                        usersArray.push(users[i].email);
                    }
                }
                res.send({ "users": usersArray });
            });
        }
    });
}

module.exports.shared = function (req, res) {
    let users = req.body.users;
    let message = req.body.message;
    const decoded = jwt.decode(req.headers.token, { complete: true });
    const userID = decoded.payload.userId;
    User.findOne({
        "_id": userID
    }, function (err, curentUser) {
        if (!curentUser) {
            res.send({ "status": "invalid token" });
        } else {
            for (i in users) {
                User.findOne({
                    email: users[i]
                }, function (err, user) {
                    user.forms.push({ formID: req.params.formID, owner: false });
                    user.save();
                });
            }
        }
        res.send({ "status": "ok" });
        if (message != "") {
            let subject = "Share form";
            if (req.body.subject != "") {
                subject = req.body.subject;
            }
            sendEmail(users, message, curentUser.email, subject);
        }
    });
}

module.exports.sendMessage = function (req, res) {
    const decoded = jwt.decode(req.headers.token, { complete: true });
    const userID = decoded.payload.userId;
    User.findOne({
        "_id": userID
    }, function (err, curentUser) {
        if (err) {
            res.send({ "status": "Server error" });
            return;
        }
        if (!curentUser) {
            res.send({ "status": "invalid token" });
        } else {
            res.send({ "status": "ok" });
            let users = req.body.users;
            let message = req.body.message;
            let subject = req.body.subject;
            sendEmail(users, message, curentUser.email, subject);
        }
    });
}
function sendEmail(email, message, curentEmail, subject) {
    const mailOptions = {
        to: `${email}`,
        from: `${curentEmail}`,
        subject: `${subject}`,
        text: `${message}`
    };
    transporter.sendMail(mailOptions, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

