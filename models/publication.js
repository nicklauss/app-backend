'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublicationSchema = new Schema({
    title: String,
    numb_pages: Number,
    abstract: {
        content: String,
        file: String
    },
    media : {
        initial_report: String,
        final_report: String
    },
    evaluation: {
        value: {
            type: String,
            enum: ['NOTASSIGNED','PENDING','REJECTED', 'ACCEPTED', 'MAJACCEPTED']
        },
        report: String,
        reviewer_id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        marks: String,
        evaluation_date: Date
    },
    author: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Publication', PublicationSchema);
