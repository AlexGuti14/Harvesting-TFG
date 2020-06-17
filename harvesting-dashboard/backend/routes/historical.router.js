const express = require('express');
const router = express.Router();
const ctrlData = require('../controllers/historical.controller');

/**
 * @swagger
 * 
 * /historical:
 *  get:
 *     tags: 
 *       - 'Porks'
 *     summary: Returns pork data 
 *     description: Returns pork data
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "pork"
 *       in: query
 *       description: "Name of pork to return"
 *       required: false
 *       type: "string"
 *     - name: "type"
 *       in: query
 *       description: "Type of pork to return"
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
 * /historical/aggregate:
 *  get:
 *     tags: 
 *       - 'Porks'
 *     summary: Returns pork data  
 *     description: Returns pork data 
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "pork"
 *       in: query
 *       description: "Name of pork to return"
 *       required: false
 *       type: "string"
 *     - name: "type"
 *       in: query
 *       description: "Type of pork to return"
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
 * /historical/markets:
 *  get:
 *     tags: 
 *       - 'Porks'
 *     summary: Returns pork markets 
 *     description: Returns pork markets
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "pork"
 *       in: query
 *       description: "Name of pork to return"
 *       required: false
 *       type: "string"
 *     - name: "type"
 *       in: query
 *       description: "Type of pork to return"
 *       required: false
 *       type: "string"
 *     responses:
 *       200:
 *         description: "successful operation" 
 *       400:
 *          description: "Error"
 * 
 * /historical/europe:
 *  get:
 *     tags: 
 *       - 'Porks'
 *     summary: Returns europe pork data  
 *     description: Returns europe pork data 
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "pork"
 *       in: query
 *       description: "Name of pork to return"
 *       required: false
 *       type: "string"
 *     - name: "type"
 *       in: query
 *       description: "Type of pork to return"
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
 */

router.get('/', ctrlData.getData);
router.get('/aggregate', ctrlData.getAggregate);
router.get('/europe', ctrlData.getEurope);


module.exports = router;