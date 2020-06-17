const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const {setVersioningUpdate, setAllRequired} = require('./common');

var HistoricalSchema = new Schema({
    date: {
        timestamp: Date,
        standard: Date
    },
    animal: {
        type: String,
        enum: ['pork'],
        default: 'pork'
    },
    type: {
        type: String,
        enum: ['Selecto', 'Normal', 'Graso', 'Lechon'],
        default: 'Selecto'
    },
    market: {
        type: String,
    },
    value: Number
}, {collection: "Historical",toJSON: {virtuals: true}});

HistoricalSchema.index({"date.standard": -1, market: 1, type: 1, animal: 1}, {unique: true});

setAllRequired(HistoricalSchema);
setVersioningUpdate(HistoricalSchema);


module.exports = mongoose.model('Historical', HistoricalSchema);

