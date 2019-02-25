function sensoresModel(postgresqlDB){
    this.postgresqlDB = postgresqlDB;
}

sensoresModel.prototype.find = function(query, callback){
    //console.log(query);
    this.postgresqlDB.query('SELECT * from "SmartSensor".sensores', (err,res) => {
        callback(err, res);
    });
}

sensoresModel.prototype.findOne = function(_id, callback){
    this.postgresqlDB.query('SELECT * from "SmartSensor".sensores where id_sensor = $1', [_id], (err,res) => {
        callback(err, res);
    });
}

sensoresModel.prototype.create = function(data, callback){
    console.log("Cheguei createModel");
    this.postgresqlDB.query('INSERT INTO "SmartSensor".sensores' + '(data_cadastro, token, mac, observacoes)' + ' VALUES (' + "'" + data.data_cadastro + "', " + "'" + data.token + "', " + "'" + data.mac + "', " + "'" + data.observacoes +"')",  (err,res) => {
        callback(err, res);
    });
}

sensoresModel.prototype.update = function(_id, data, callback){
    console.log("Cheguei UpdateModel");
    console.log('UPDATE "SmartSensor".sensores SET data_cadastro = ' + "'" + data.data_cadastro + "'" + ', token = ' + "'" + data.token + "'" +', mac = ' + "'" + data.mac + "'" + ', observacoes = ' + "'" + data.observacoes + "'" + ' WHERE id_sensor = ' + _id);
    this.postgresqlDB.query('UPDATE "SmartSensor".sensores SET data_cadastro = ' + "'" + data.data_cadastro + "'" + ', token = ' + "'" + data.token + "'" +', mac = ' + "'" + data.mac + "'" + ', observacoes = ' + "'" + data.observacoes + "'" + ' WHERE id_sensor = ' + _id,  (err,res) => {
        callback(err, res);
    });
}

sensoresModel.prototype.remove = function(_id, callback){
    console.log("Cheguei RemoveModel");
    this.postgresqlDB.query('DELETE FROM "SmartSensor".sensores where id_sensor = $1', [_id],  (err,res) => {
        callback(err, res);
    });
}

module.exports = function (postgresqlDB) {
    return new sensoresModel(postgresqlDB);
}