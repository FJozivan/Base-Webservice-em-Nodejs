var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
    res.status(201);
    if(req.accepts('text')) {
        res.write('name; email\n');
        res.write('Fjozivan; josivamfreire.fj@gmail.com');
        res.end();
    }else{
        res.json({'name': 'FJozivan', 'email':'josivamfreire.fj@gmail.com'});
    }
    
});

// Rota para Sensores
router.use('/sensores', require('./sensores'));

module.exports = router;