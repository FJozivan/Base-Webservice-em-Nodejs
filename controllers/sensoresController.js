function sensoresController(sensoresModel){
    this.model = sensoresModel;
}    

sensoresController.prototype.getAll = function(req, res, next){
    console.log(req.query);
    this.model.find({}, function (err, data) {
       if(err) {
           return next(err);
       }
       res.json(data.rows);
    });
}
sensoresController.prototype.getById = function(req, res, next){
    var id = req.params._id;
    this.model.findOne(id, function (err, data) {
        if(err) {
            //console.log(err.stack);
            return next(err);
        }
        res.json(data.rows);
     });
}
sensoresController.prototype.create = function(req, res, next){
    this.model.create(req.body, function (err, data) {
        if(err) {
            return next(err);
        }
        res.json(data);
     });
}
sensoresController.prototype.update = function(req, res, next){
    var id = req.params._id,
        body = req.body;
    this.model.update(id, body, function (err, data) {
        if(err) {
            console.log("upadeteController");
            return next(err);
        }
        res.json(data.rows);
    });
}
sensoresController.prototype.remove = function(req, res, next){
    var id = req.params._id;
    this.model.remove(id, function (err, data) {
        if(err) {
            console.log("Erro removeController");
            return next(err);
        }
        res.json(data.rows);
    });
}

module.exports = function (sensoresModel) {
    return new sensoresController(sensoresModel);
}