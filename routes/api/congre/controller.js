'use strict';

const Congre = require('../../../models/congre');

exports.validateCongre = (req, res, next) => {
    req.checkBody('nom', 'The name is required').notEmpty();
    req.checkBody('edition', 'The edition number is required').notEmpty().isLength({
        min: 1,
        max: 16
    });
    req.checkBody('date_debut', 'Start date is required').notEmpty().isDate();
    req.checkBody('date_fin', 'End date is required').notEmpty().isDate();
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

exports.getCongreById = (req, res, next) => {
    let congreId = req.params.congreId;

    Congre.find({"_id" : congreId, "deleted" : false})
        .exec((err, congre) => {
        if(err || !congre) {
            return res.send({
                ok: false,
                message: 'Congre not found'
            });
        }
        return res.send({
            ok: true,
            data: congre
        });
    });
};

exports.getCongresByOrganizerId = (req, res, next) => {
    let organizerId = req.params.organizerId;
    Congre.find({"organisateur_id" : organizerId})
        .exec((err, congres) => {
        if(err || !congres) {
            return res.send({
                ok: false,
                message: 'Congres not found'
            });
        }
        return res.send({
            ok: true,
            data: congres
        });
    });
};

exports.newCongre = (req, res, next) => {
    let congre = new Congre({
        nom: req.body.nom,
        edition: req.body.edition,
        organisateur_id: req.user._id,
        location: req.body.location,
        description: req.body.description,
        date_debut: req.body.date_debut,
        date_fin: req.body.date_fin,
        thematique: req.body.thematique,
        site: req.body.site,
        email: req.body.email,
        phone: req.body.phone,
        soumission: req.body.soumission,
        selection: req.body.selection,
        finalisation: req.body.finalisation,
        created: new Date()
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

exports.updateCongre = (req, res, next) => {
    let congreId = req.params.congreId;

    Congre.findById(congreId)
        .exec((err, congre) => {
        if(err || !congre) {
            return res.send({
                ok: false,
                message: 'Publication not found'
            });
        }
        congre.nom = req.body.nom || congre.nom;
        congre.edition = req.body.edition || congre.edition;
        congre.organisateur_id = req.body.organisateur_id || congre.organisateur_id;
        congre.location = req.body.location || congre.location;
        congre.description = req.body.description || congre.description;
        congre.date_debut = req.body.date_debut || congre.date_debut;
        congre.date_fin = req.body.date_fin || congre.date_fin;
        congre.thematique = req.body.thematique || congre.thematique;
        congre.description = req.body.description || congre.description;
        congre.site = req.body.site || congre.site;
        congre.email = req.body.email || congre.email;
        congre.phone = req.body.phone || congre.phone;
        congre.soumission = req.body.soumission || congre.soumission;
        congre.evaluation = req.body.evaluation || congre.evaluation;
        congre.finalisation = req.body.finalisation || congre.finalisation;
        congre.updated = new Date();

        congre.save((err) => {
            if(err) {
                return res.send({
                    ok: false,
                    message: 'Error while updating'
                });
            }
            return res.send({
                ok: true,
                data: congre
            });
        });
    });
};

exports.deleteCongre = (req, res, next) => {
    let congreId = req.params.congreId;

    Congre.findById(congreId)
        .exec((err, congre) => {
        if(err || !congre) {
            return res.send({
                ok: false,
                message: 'Congre not found'
            });
        }
        congre.deleted = true;
        congre.updated = new Date();
        congre.save((err) => {
            if(err) {
                return res.send({
                    ok: false,
                    message: 'Error while deleting'
                });
            }
            return res.send({
                ok: true,
                data: congre
            });
        });
    });
};
