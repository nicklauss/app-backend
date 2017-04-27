'use strict';

const Request = require('../../../models/request');
const User = require('../../../models/user');
let rfcn;

function pad1(number) {
     return (number < 10 ? '0' : '') + number;
}

function pad2(number) {
     return (number < 10 ? '000' : '00');
}

function pad3(number) {
     return (number < 100 ? pad2(number) : '0');
}

function pad4(number) {
     return (number < 1000 ? pad3(number) : '');
}

function makeRequest(req, res, next) {
    let request = new Request({
        rfc_number: rfcn,
        description: req.body.description,
        request_by: req.user._id,
        request_for: req.user._id,
        configuration: req.body.configuration || '',
        status: "PENDING",
        type: req.body.type || '',
        e_recla_num: req.body.e_recla_num || null,
        sd_catalog_id: (req.body.incident)? null : 6281, // 6281
        // urgency: req.body.urgency,
        created: new Date()
    });

    // let name = req.body.name.toLowerCase();
    // name = name.split(' ');
    // console.log(req.body.name, name);
    //
    // User.findOne({"deleted" : false, "firstName" : name[0], "lastName" : name[1]})
    //             .exec((err, user) => {
    //             if(err || !user) {
    //                 console.log(err, user);
    //                 return res.send({
    //                     ok: false,
    //                     message: '.Something went wrong!'
    //                 });
    //             } else {
    //                 console.log('*****', request.rfc_number);
    //                 request.request_for = user._id;
                    request.save((err) => {
                        if(err) {
                            return res.send({
                                ok: false,
                                message: 'Something went wrong!!'
                            });
                        } else {
                            return res.send({
                                ok: true,
                                message: 'Request is now pending'
                            });
                        }
                    });
            //     }
            // });
}

var generateRFC = (req, res, next) => {

    Request.find({"deleted" : false})
                .sort({created:-1})
                .limit(1)
                .exec((err, request) => {
                    console.log('request', request);
                    var rfc;
                    var date_now, day, month, year;

                    date_now = new Date().toLocaleDateString('fr').split('/');
                    day = pad1(date_now[1]);
                    month = pad1(date_now[0]);
                    year = date_now[2].split('');

                if(err) {
                    return null;
                } else if (!request) {
                    rfc = 'S' + year[2] + year[3] + month + day + '-' + '0000';
                    rfcn = rfc;
                    console.log('generateRFC elif ', rfc);
                } else {
                    console.log('wwwwwwwwwwww', request);

                    var last_date = ""+request[0].created;
                    last_date = last_date.split(' ');

                    console.log('wwwwwwwwwwww', last_date);
                    console.log('////////', day);
                    if (last_date[2] !== day) {
                        rfc = 'S' + year[2] + year[3] + month + day + '-' + '0000';
                        console.log('***************', rfc);
                    } else {
                        var last_created_date = request[0].rfc_number.split('-');

                        console.log('last_created_date', last_created_date);
                        var cpt = Number(last_created_date[1]) + 1;
                        rfc = 'S' + year[2] + year[3] + month + day + '-' + pad4(cpt) + cpt;

                        console.log('cpt ', pad4(cpt));

                        console.log('generateRFC ', rfc);
                    }
                    rfcn = rfc;

                }
                makeRequest(req, res, next);
            });
};

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

exports.newRequest = (req, res, next) => {
    // console.log(req);
    generateRFC(req, res, next);
};

exports.getRequests = (req, res, next) => {
    Request.find({"deleted" : false})
        // .populate('author')
        .exec((err, requests) => {
        if(err || !requests) {
            return res.send({
                ok: false,
                message: 'Requests not found'
            });
        }
        return res.send({
            ok: true,
            data: requests
        });
    });
};

exports.getRequestsForUser = (req, res, next) => {
    let userId = req.params.userId;
    console.log("userId", userId);
    Request.find({"deleted" : false})
        // .populate('author')
        .exec((err, requests) => {
            console.log("err", err);
            console.log("requests", requests);
        if(err || !requests) {
            return res.send({
                ok: false,
                message: 'Requests not found'
            });
        }
        return res.send({
            ok: true,
            data: requests
        });
    });
};

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
//
// exports.getPublicationsCount = (req, res, next) => {
//     Publication.find({"deleted" : false})
//         .count()
//         .exec((err, publicationsCount) => {
//         if(err || !publicationsCount) {
//             return res.send({
//                 ok: false,
//                 message: 'Publications not found'
//             });
//         }
//         return res.send({
//             ok: true,
//             data: publicationsCount
//         });
//     });
// };
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

exports.deleteRequest = (req, res, next) => {
    let requestId = req.params.requestId;

    Request.findById(requestId)
        .exec((err, request) => {
        if(err || !request) {
            return res.send({
                ok: false,
                message: 'Request not found'
            });
        }
        request.updated = new Date();
        request.deleted = true;
        request.save((err) => {
            if(err) {
                return res.send({
                    ok: false,
                    message: 'error while deleting'
                });
            }
            return res.send({
                ok: true,
                data: request
            });
        });
    });
};
