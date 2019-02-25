// Chamada ao Express
var express = require('express');
var router = express.Router();

// Chamando a conexão ao BD
var postgresqlDB = require('../db/postgresqlDB');

// Chamando Model sensoresModel e passando a conexão ao BD -> "postgresqlDB"
var sensoresModel = require('../models/sensoresModel')(postgresqlDB);

// Chamando Controller sensorController e passando Model -> "sensoresModel"
var sensoresController = require('../controllers/sensoresController')(sensoresModel);

router.get('/', sensoresController.getAll.bind(sensoresController));

router.get('/:_id', sensoresController.getById.bind(sensoresController));

router.post('/', sensoresController.create.bind(sensoresController));

router.put('/:_id', sensoresController.update.bind(sensoresController)); 

router.delete('/:_id', sensoresController.remove.bind(sensoresController));

module.exports = router;