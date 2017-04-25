'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RelanceSchema = new Schema({
    description: String,
    requestId: {
        type: Schema.Types.ObjectId,
        ref: 'Request'
    },
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

module.exports = mongoose.model('Relance', RelanceSchema);
