'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    title: String,
    description: String,
    thematique: String,
    start_date: Date,
    end_date: Date,
    presentations: [{
        publication_id: {
            type: Schema.Types.ObjectId,
            ref: 'Publication'
        },
        title: String,
        start_date: Date,
        end_date: Date,
        speaker: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    congre_id: {
        type: Schema.Types.ObjectId,
        ref: 'Congre'
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

module.exports = mongoose.model('Session', SessionSchema);
