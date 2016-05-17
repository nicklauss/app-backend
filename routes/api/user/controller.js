'use strict';

const User = require('../../../models/user');

exports.validateUser = (req, res, next) => {
    req.checkBody('firstName', 'The first name is require').notEmpty();
    req.checkBody('lastName', 'The last name is require').notEmpty();
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('gender', 'Invalid gender').notEmpty().matches(/[fe]{0,1}male/);
    req.checkBody('password', 'Invalid password').notEmpty().isLength({
        min: 6,
        max: 16
    });

    let errors = req.validationErrors();

    if (errors) {
        return res.send(500, {
            ok: false,
            message: errors[0].msg,
            errors: errors
        });
    } else {
        next();
    }

};

exports.create = (req, res, next) => {
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });
    user.save((err) => {
        if(err) {
            return res.send({
                ok: false,
                message: 'Something went wrong!'
            });
        } else {
            //TODO send activation email
            return res.send({
                ok: true,
                message: 'You account has been succeffuly created!'
            });
        }
    });
};

exports.update = (req, res, next) => {
    let currentUserId = req.user._id;

    User.findById(currentUserId)
        .select('-hashedPassword -salt -__v -deleted -location -created')
        .exec((err, user) => {
        if(err || !user) {
            return res.send({
                ok: false,
                message: 'User not found'
            });
        }
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.gender = req.body.gender || user.gender;
        user.location = req.body.location || user.location;
        user.phone = req.body.phone || user.phone;
        user.avatar_url = req.body.avatar_url || user.avatar_url;
        user.university = req.body.university || user.university;
        user.labo = req.body.labo || user.labo;
        user.domaine = req.body.domaine || user.domaine;
        user.updated = new Date();
        user.save((err) => {
            if(err) {
                return res.send({
                    ok: false,
                    message: 'Error updating profile please try later!'
                });
            }
            return res.send({
                ok: true,
                data: user
            });
        });
    });
};

exports.delete = (req, res, next) => {

};

exports.getUsersByCongre = (req, res, next) => {

};
