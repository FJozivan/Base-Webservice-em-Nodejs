// Chamada ao módulo para tratamento erro e melhor escrita das funções callback
var Promise = require("bluebird");

var handleNotFound = function(data){
    if(!data){
        var err = new Error('Not found!');
        err.status = 404;
        throw err;
    }

    return data;
}

function sensoresController(sensoresModel){
    this.model = Promise.promisifyAll(sensoresModel);
}    

sensoresController.prototype.getAll = function(req, res, next){
    this.model.findAsync({})
        .then(function (data) {
            res.json(data.rows);    
        })
        .catch(next);
}
sensoresController.prototype.getById = function(req, res, next){
    var id = req.params._id;
    this.model.findOneAsync(id)
        .then(handleNotFound)
        .then(function (data) {
            res.json(data.rows);
        })
        .catch(next);
}
sensoresController.prototype.create = function(req, res, next){
    var body = req.body;
    this.model.createAsync(body)
        .then(function (data) {
            res.json(data);
        })
        .catch(next);
     
}
sensoresController.prototype.update = function(req, res, next){
    var id = req.params._id,
        body = req.body;
    this.model.updateAsync(id, body)
        .then(function (data){
            res.json(data);
        })
        .catch(next);
}
sensoresController.prototype.remove = function(req, res, next){
    var id = req.params._id;
    this.model.removeAsync(id)
        .then(function (data) {
            res.json(data.rows);
        })
        .catch(next);
    
}

module.exports = function (sensoresModel) {
    return new sensoresController(sensoresModel);
}