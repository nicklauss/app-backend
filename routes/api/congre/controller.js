'use strict';

const Congre = require('../../../models/congre');

exports.validateCongre = (req, res, next) => {
    req.checkBody('nom', 'The name is required').notEmpty();
    req.checkBody('edition', 'The edition number is required').notEmpty().isLength({
        min: 1,
        max: 16
    });
    req.checkBody('date_debut', 'Start date is required').notEmpty().isDate();    req.checkBody('date_fin', 'End date is required').notEmpty().isDate();
    req.checkBody('email', 'Email is required').notEmpty().isEmail();
    
    let errors = req.validationErrors();
    
    if(errors) {
        return res.send(500, {
            ok: false,
            message: errors[0].msg,
            errors: errors
        });
    } else {
        next();
    }
};

exports.newCongre = (req, res, next) => {
    let congre = new Congre({
        nom: req.body.nom,
        edition: req.body.edition,
        date_debut: req.body.date_debut,
        date_fin: req.body.date_fin,
        email: req.body.email
    });
    
    congre.save((err) => {
        if(err) {
            return res.send({
                ok: false,
                message: 'Something went wrong!',
                error: err
            });
        } else {
            return res.send({
                ok: true,
                message: 'Your conference has been successfully created'
            });
        }
    });
};