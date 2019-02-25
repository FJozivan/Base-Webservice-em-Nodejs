const { Pool, Client } = require('pg');

// Importando módulo 'config' -> usado para gerenciar pegar dados de um arquivo padrão de variaveis de ambiente.
var config = require('config');

function _connection(){
	var username = config.get('postgresql.username'),
		password = config.get('postgresql.password'),
		server   = config.get('postgresql.server'),
		port     = config.get('postgresql.port'),
		database = config.get('postgresql.database'),
		auth     = username ? username + ':' + password + '@' : '';

	return 'postgres://' + auth + server + ':' + port + '/' + database;
}
var connectionString = _connection();
console.log(connectionString);
var client = new Client({
	connectionString: connectionString,
});

client.connect(
	function(err, client, done) {
		if (err) {
			return console.error('error fetching client from pool', err);
		}
		// client.query('SELECT * FROM "SmartSensor"."sensores"', (err, res) => {
		// 	if (err) {
		// 		console.log(err.stack)
		// 	} else {
		// 		console.log(res.rows[0])
		// 		client.end();
		// 	}
		// });
	});
	
module.exports = client;