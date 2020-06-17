const express = require('express');
const router = express.Router();
const ctrlData = require('../controllers/cereal.controller');

/**
 * @swagger
 * 
 * /cereal:
 *  get:
 *     tags: 
 *       - 'Cereals'
 *     summary: Returns cereal data 
 *     description: Returns cereal data
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "cereal"
 *       in: query
 *       description: "Name of cereal to return"
 *       required: false
 *       type: "string"
 *     - name: "type"
 *       in: query
 *       description: "Type of cereal to return"
 *       required: false
 *       type: "string"
 *     - name: "start date"
 *       in: query
 *       description: "start date"
 *       required: false
 *       type: "date"
 *     - name: "closing date"
 *       in: query
 *       description: "closing  date"
 *       required: false
 *       type: "date"
 *     responses:
 *       200:
 *         description: "successful operation" 
 *       400:
 *          description: "Error"
 * /cereal/aggregate:
 *  get:
 *     tags: 
 *       - 'Cereals'
 *     summary: Returns cereal data  
 *     description: Returns cereal data 
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "cereal"
 *       in: query
 *       description: "Name of cereal to return"
 *       required: false
 *       type: "string"
 *     - name: "type"
 *       in: query
 *       description: "Type of cereal to return"
 *       required: false
 *       type: "string"
 *     - name: "start date"
 *       in: query
 *       description: "start date"
 *       required: false
 *       type: "date"
 *     - name: "closing date"
 *       in: query
 *       description: "closing  date"
 *       required: false
 *       type: "date"
 *     responses:
 *       200:
 *         description: "successful operation" 
 *       400:
 *          description: "Error"
 * /cereal/markets:
 *  get:
 *     tags: 
 *       - 'Cereals'
 *     summary: Returns cereal markets 
 *     description: Returns cereal markets
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "cereal"
 *       in: query
 *       description: "Name of cereal to return"
 *       required: false
 *       type: "string"
 *     - name: "type"
 *       in: query
 *       description: "Type of cereal to return"
 *       required: false
 *       type: "string"
 *     responses:
 *       200:
 *         description: "successful operation" 
 *       400:
 *          description: "Error"
 */


router.get('/', ctrlData.getData);
router.get('/aggregate', ctrlData.getAggregate);
router.get('/markets', ctrlData.getMarkets);

module.exports = router;