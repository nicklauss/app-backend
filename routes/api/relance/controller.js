'use strict';

const Relance = require('../../../models/relance');

exports.validateRequest = (req, res, next) => {
    req.checkBody('title', 'title is required').notEmpty();
    req.checkBody('numb_pages', 'number of pages is required').notEmpty();
    req.checkBody('abstract.content', 'abstract is required').notEmpty();
    req.checkBody('abstract.file', 'abstract file is required').notEmpty();
    req.checkBody('media.initial_report', 'initial report is required').notEmpty();

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

exports.newRelance = (req, res, next) => {
    let relance = new Relance({
        description: req.body.description,
        requestId: req.body.requestId,
        created: new Date()
    });
    relance.save((err) => {
        if(err) {
            return res.send({
                ok: false,
                message: 'Something went wrong!',
                err: err
            });
        } else {
            //TODO send activation email
            return res.send({
                ok: true,
                data: relance,
                message: 'Your request has been relaunched!'
            });
        }
    });
};

exports.getRelances = (req, res, next) => {
    let requestId = req.params.requestId;

    Relance.find({"deleted" : false, "requestId" : requestId})
        // .populate('author')
        .exec((err, relances) => {
            if(err || !relances) {
                return res.send({
                    ok: false,
                    message: 'Relances not found'
                });
            }
            return res.send({
                ok: true,
                data: relances
            });
    });
};
//
// exports.getRequestsForUser = (req, res, next) => {
//     let userId = req.params.userId;
//
//     Request.find({"deleted" : false, "request_for" : userId})
//         // .populate('author')
//         .exec((err, requests) => {
//         if(err || !requests) {
//             return res.send({
//                 ok: false,
//                 message: 'Requests not found'
//             });
//         }
//         return res.send({
//             ok: true,
//             data: requests
//         });
//     });
// };

//
// exports.getPublicationsNotAssigned = (req, res, next) => {
//     Publication.find({"deleted" : false, "evaluation.value" : "NOTASSIGNED"})
//         .populate('author')
//         .exec((err, publications) => {
//         if(err || !publications) {
//             return res.send({
//                 ok: false,
//                 message: 'Publications not found'
//             });
//         }
//         return res.send({
//             ok: true,
//             data: publications
//         });
//     });
// };

exports.getrelancesCount = (req, res, next) => {
    let requestId = req.params.requestId;

    Relance.find({"deleted" : false, "requestId" : requestId})
        .count()
        .exec((err, relancesCount) => {
        if(err || !relancesCount) {
            return res.send({
                ok: false,
                message: 'Relances not found'
            });
        }
        return res.send({
            ok: true,
            data: relancesCount
        });
    });
};
//
// exports.getPublicationById = (req, res, next) => {
//     let publicationId = req.params.publicationId;
//
//     Publication.findById(publicationId)
//         .exec((err, publication) => {
//         if(err || !publication) {
//             return res.send({
//                 ok: false,
//                 message: 'Publication not found'
//             });
//         }
//         return res.send({
//             ok: true,
//             data: publication
//         });
//     });
// };
//
// exports.getPublicationsByAuthor = (req, res, next) => {
//     let authorId = req.params.authorId;
//
//     Publication.find({"author" : authorId, "deleted" : false})
//         .populate('author evaluation.reviewer_id')
//         .exec((err, publications) => {
//         if(err || !publications) {
//             return res.send({
//                 ok: false,
//                 message: 'Publications not found'
//             });
//         }
//         return res.send({
//             ok: true,
//             data: publications
//         });
//     });
// };
//
// exports.getPublicationsByReviewer = (req, res, next) => {
//     let reviewerId = req.params.reviewerId;
//
//     Publication.find({"evaluation.reviewer_id" : reviewerId, "deleted" : false})
//         .populate('reviewer_id')
//         .exec((err, publications) => {
//         if(err || !publications) {
//             return res.send({
//                 ok: false,
//                 message: 'Publications not found'
//             });
//         }
//         return res.send({
//             ok: true,
//             data: publications
//         });
//     });
// };
//
// exports.updatePublication = (req, res, next) => {
//     let publicationId = req.params.publicationId;
//
//     Publication.findById(publicationId)
//         .exec((err, publication) => {
//         if(err || !publication) {
//             return res.send({
//                 ok: false,
//                 message: 'Publication not found'
//             });
//         }
//         console.log(req.body.evaluation);
//         publication.title = req.body.title || publication.title;
//         if(req.body.evaluation.value != "NOTASSIGNED") {
//             console.log("11111");
//             publication.evaluation.value = req.body.evaluation.value || publication.evaluation.value;
//             publication.evaluation.marks = req.body.evaluation.marks || publication.evaluation.marks;
//             publication.evaluation.reviewer_id = req.body.evaluation.reviewer_id || publication.evaluation.reviewer_id;
//             publication.evaluation.evaluation_date = new Date();
//         } else if(req.body.evaluation.value == "NOTASSIGNED"){
//             publication.evaluation = req.body.evaluation;
//             console.log("22222");
//             console.log(publication.evaluation);
//         }
//           else {
//             console.log("33333");
//             publication.evaluation = req.body.evaluation;
//           }
//
//         publication.author = req.body.author || publication.author;
//         publication.numb_pages = req.body.numb_pages || publication.numb_pages;
//         publication.abstract = req.body.abstract || publication.abstract;
//         publication.media.initial_report = req.body.media.initial_report || publication.media.initial_report;
//         publication.updated = new Date();
//         publication.save((err) => {
//             if(err) {
//                 return res.send({
//                     ok: false,
//                     message: 'error while updating'
//                 });
//             }
//             return res.send({
//                 ok: true,
//                 data: publication
//             });
//         });
//     });
// };
//
// exports.deleteRequest = (req, res, next) => {
//     let requestId = req.params.requestId;
//
//     Request.findById(requestId)
//         .exec((err, request) => {
//         if(err || !request) {
//             return res.send({
//                 ok: false,
//                 message: 'Request not found'
//             });
//         }
//         request.updated = new Date();
//         request.deleted = true;
//         request.save((err) => {
//             if(err) {
//                 return res.send({
//                     ok: false,
//                     message: 'error while deleting'
//                 });
//             }
//             return res.send({
//                 ok: true,
//                 data: request
//             });
//         });
//     });
// };
