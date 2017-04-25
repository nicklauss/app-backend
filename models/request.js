'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    rfc_number: String,
    description: String,
    status: {
        type: String,
        enum: ['PENDING','REJECTED', 'RESOLVED']
    },
    configuration: String,
    type: String,
    urgency: Number,
    sd_catalog_id: Number,
    e_recla_num: String,
    request_for: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    request_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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

module.exports = mongoose.model('Request', RequestSchema);
