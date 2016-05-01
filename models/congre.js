'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CongreSchema = new Schema({
    nom: String,
    edition: Number,
    organisateur_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    location: {
        address: String,
        country: String,
        city: String,
        geo: []
    },
    description: String,
    date_debut: Date,
    date_fin: Date,
    thematique: {
        type: String
    },
    site: String,
    email : String,
    phone: String,
    soumission: {
        start: Date,
        end: Date
    },
    evaluation: {
        start: Date,
        end: Date
    },
    finalisation: {
        start: Date,
        end: Date
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

module.exports = mongoose.model('Congre', CongreSchema);
