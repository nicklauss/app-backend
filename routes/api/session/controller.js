'use strict';

const Session = require('../../../models/session');
const User = require('../../../models/user');

exports.validateSession = (req, res, next) => {
    req.checkBody('title', 'title is required').notEmpty();
    req.checkBody('description', 'description is required').notEmpty();
    req.checkBody('thematique', 'thematique is required').notEmpty();
    req.checkBody('start_date', 'start_date is required').notEmpty();
    req.checkBody('end_date', 'end_date is required').notEmpty();

    let errors = req.validationErrors();

    if(errors) {
        return res.send(500, {
            ok: false,
            message: errors[0],
            err: errors
        });
    } else {
        next();
    }
};

exports.newSession = (req, res, next) => {
    let session = new Session({
        title: req.body.title,
        description: req.body.description,
        thematique: req.body.thematique,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        congre_id: req.body.congre_id,
        created: new Date()
    });

    session.save((err) => {
        if(err) {
            return res.send({
                ok: false,
                message: 'Error in creation'
            });
        }
        return res.send({
            ok: true,
            message: 'Session created'
        });
    });
};

exports.updateSession = (req, res, next) => {
    let sessionId = req.params.sessionId;

    Session.findById(sessionId)
        .exec((err, session) => {
        if(err || !session) {
            return res.send({
                ok: false,
                message: 'Session not found'
            });
        }
        session.title = req.body.title || session.title;
        session.description = req.body.description || session.description;
        session.thematique = req.body.thematique || session.thematique;
        session.start_date = req.body.start_date || session.start_date;
        session.end_date = req.body.end_date || session.end_date;
        session.presentations = req.body.presentations || session.presentations;
        session.updated = new Date();

        session.save((err) => {
            if(err) {
                return res.send({
                    ok: false,
                    message: 'Error while updating'
                });
            }
            return res.send({
                ok: true,
                data: session
            });
        });
    });
};

exports.deleteSession = (req, res, next) => {
    let sessionId = req.params.sessionId;

    Session.findById(sessionId)
        .exec((err, session) => {
        if(err || !session) {
            return res.send({
                ok: false,
                message: 'Session not found'
            });
        }

        Session.findById("5766edc5a743455e1e393bd7")
            .exec((err, session2) => {
            if(err || !session2) {
                return res.send({
                    ok: false,
                    message: 'Session not found'
                });
            }
            console.log(session.presentations);
            console.log(session2.presentations);
            session2.presentations.push.apply(session2.presentations, session.presentations);
            session2.updated = new Date();
            console.log(session.presentations);
            console.log(session2.presentations);
            session2.save();

            session.presentations = [];
            session.deleted = true;
            session.updated = new Date();

            session.save((err) => {
                if(err) {
                    return res.send({
                        ok: false,
                        message: 'Error while deleting'
                    });
                }
                return res.send({
                    ok: true,
                    data: session
                });
            });
        });
    });
};

exports.getSessionById = (req, res, next) => {
    let sessionId = req.params.sessionId;

    Session.findById(sessionId)
        .populate("presentations.speaker")
        .populate({
            path: 'presentations.publication_id',
            populate: { path: 'author' }
          })
        .exec((err, session) => {
        if(err || !session) {
            return res.send({
                ok: false,
                message: 'Session not found'
            });
        }
        return res.send({
            ok: true,
            data: session
        });
    });
};

exports.getSessionsByCongre = (req, res, next) => {
    let congreId = req.params.congreId;

    Session.find({"congre_id" : congreId, "deleted" : false, "title" : {$ne : "general"}})
        .populate("presentations.speaker")
        .populate({
            path: 'presentations.publication_id',
            populate: { path: 'author' }
          })
        .exec((err, sessions) => {
        if(err || !sessions) {
            return res.send({
                ok: false,
                message: 'Session not found'
            });
        }
        return res.send({
            ok: true,
            data: sessions
        });
    });
};

exports.getPresentationsBySession = (req, res, next) => {
    let sessionId = req.params.sessionId;

    Session.findById(sessionId)
        .select("presentations")
        .exec((err, presentations) => {
        if(err || !presentations) {
            return res.send({
                ok: false,
                message: 'Presentations not found'
            });
        }
        return res.send({
            ok: true,
            data: presentations
        });
    });
};
