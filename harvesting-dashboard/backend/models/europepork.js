const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const {setVersioningUpdate, setAllRequired} = require('./common');

var market = new Schema({
	price: Number,
	country: Number
});

var EuropePork = new Schema({
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
	markets: [market]
}, {collection: "EuropePork",toJSON: {virtuals: true}});

EuropePork.index({"date.standard": -1, market: 1, type: 1, animal: 1}, {unique: true});

setAllRequired(EuropePork);
setVersioningUpdate(EuropePork);


module.exports = mongoose.model('EuropePork', EuropePork);

