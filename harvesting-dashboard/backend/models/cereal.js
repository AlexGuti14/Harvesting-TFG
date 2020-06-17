const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const {setVersioningUpdate, setAllRequired} = require('./common');

var CerealSchema = new Schema({
    date: {
        timestamp: Date,
        standard: Date
    },
    cereal: {
        type: String,
        enum: ['TRIGO', 'CEBADA', 'MAIZ', 'ARROZ'],
    },
    type: {
        type: String
    },
    market: {
        type: String
    },
    value: Number
}, {collection: "Cereal",toJSON: {virtuals: true}});

CerealSchema.index({"date.standard": -1, market: 1, type: 1, cereal: 1}, {unique: true});

setAllRequired(CerealSchema);
setVersioningUpdate(CerealSchema);


module.exports = mongoose.model('Cereal', CerealSchema);

