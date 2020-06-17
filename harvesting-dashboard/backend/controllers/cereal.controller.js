const mongoose = require('mongoose');
const Cereal = require('../models/cereal');
const moment = require('moment');


const getData = function(req, res) {
	//TODO we should implement a way to filter this somehow maybe by dates or user
    //Options
    const filters = {};
    const limit = req.body.limit;
    if (req.body.cereal != null) {
        filters.cereal = req.body.cereal;
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

    Cereal.find(filters,(err, Data)=> {
        if(err){
            console.error(err);
            return res.status(404)
        }
        res.json(Data)
    }).sort('-date.full').limit(limit)

};

const getMarkets = function(req, res) {
	//TODO we should implement a way to filter this somehow maybe by dates or user
    //Options
    const filters = {};
    if (req.query.cereal != null) {
        filters.cereal = req.query.cereal;
    }
    if (req.query.type != null) {
        filters.type = req.query.type;
    }

    Cereal.find(filters,(err, Data)=> {
        if(err){
            console.error(err);
            return res.status(404)
        }
        markets = [];
        Data.forEach( function(valor, indice) {
            if(!markets.includes(valor.market)){
                markets.push(valor.market);
            }
        });
        res.json(markets)
    })

};

const getAggregate = function(req, res) {
//TODO we should implement a way to filter this somehow maybe by dates or user
    //Options
    const filters = {};
    req.query.cereal? filters.cereal = req.query.cereal: null;
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
    Cereal.aggregate(pipeline,(err, data)=>{
        if(err){
            console.error(err);
            return res.status(404).json({error: err})
        }
        res.status(202).json(data)
    });
};

module.exports = {
    getData,
    getMarkets,
	getAggregate
};