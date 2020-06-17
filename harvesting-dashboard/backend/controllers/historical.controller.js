const mongoose = require('mongoose');
const Historical = require('../models/historical');
const EuropePork = require('../models/europepork');

const moment = require('moment');


const getData = function(req, res) {
	//TODO we should implement a way to filter this somehow maybe by dates or user
    //Options
    const filters = {};
    const limit = req.body.limit;
    if (req.body.animal != null) {
        filters.animal = req.body.animal;
    }
    if (req.body.market != null) {
        filters.market = req.body.market;
    }
    if (req.body.type != null) {
        filters.type = req.body.type;
    }
    if (req.body.from != null) {
        const fromdate = Date.parse(req.body.from)
        filters.date.full = { "$gte": fromdate};
    }

    Historical.find(filters,(err, Data)=> {
        if(err){
            console.error(err);
            return res.status(404)
        }
        res.json(Data)
    }).sort('-date.full').limit(limit)

};

const getAggregate = function(req, res) {
//TODO we should implement a way to filter this somehow maybe by dates or user
    //Options
    const filters = {};
    req.query.animal? filters.animal = req.query.animal: null;
    req.query.market? filters.market = req.query.market: null;
    req.query.type? filters.type= req.query.type: null;

    (req.query.from != null || req.query.to != null)? filters["date.standard"] = {}: null;

    if (req.query.from){
        filters["date.standard"]["$gte"] = moment.utc(req.query.from, "DD-MM-YYYY", true).toDate();
    }
    if (req.query.to){
        filters["date.standard"]["$lte"] = moment.utc(req.query.to, "DD-MM-YYYY", true).toDate();
    }
    const pipeline = [
        {$match: filters},
        {$group: {
                _id: '$date.standard',
                data: {
                    $push: {
                        value: '$value',
                        market: '$market',
                        type: '$type'
                    }
                }
            }},


    ];
    if( req.query.limit!=null && req.query.limit > 0 ){
        pipeline.push({$sort: {_id: -1}},{$limit: Number(req.query.limit)})
    }
    pipeline.push({$sort: {_id: 1}});
    Historical.aggregate(pipeline,(err, data)=>{
        if(err){
            console.error(err);
            return res.status(404).json({error: err})
        }
        res.status(202).json(data)
    });
};

const getEurope = function(req, res) {
    //TODO we should implement a way to filter this somehow maybe by dates or user
        //Options
        const filters = {};
        req.query.animal? filters.animal = req.query.animal: null;
        req.query.type? filters.type= req.query.type: null;
    
        (req.query.from != null || req.query.to != null)? filters["date.standard"] = {}: null;
    
        if (req.query.from){
            filters["date.standard"]["$gte"] = moment.utc(req.query.from, "DD-MM-YYYY", true).toDate();
        }
        if (req.query.to){
            filters["date.standard"]["$lte"] = moment.utc(req.query.to, "DD-MM-YYYY", true).toDate();
        }
        const pipeline = [
            {$match: filters},
            {$group: {
                    _id: '$date.standard',
                    data: {
                        $push: {
                            value: '$value',
                            markets: '$markets',
                            type: '$type'
                        }
                    }
                }},
    
    
        ];
        if( req.query.limit!=null && req.query.limit > 0 ){
            pipeline.push({$sort: {_id: -1}},{$limit: Number(req.query.limit)})
        }
        pipeline.push({$sort: {_id: 1}});
        EuropePork.aggregate(pipeline,(err, data)=>{
            if(err){
                console.error(err);
                return res.status(404).json({error: err})
            }
            res.status(202).json(data)
        });
    };

module.exports = {
	getData,
    getAggregate,
    getEurope
};