// --------------------------------------- IMPORTANDO MÓDULOS -----------------------------------------------
// ---------------- Aqui deve ser colocado todas as importações para modulos(middlewares de Terceiros). -------------------------------
// Framework Express
var express = require('express');
var methodOverride = require('method-override');
var body_parser = require('body-parser');
var app = express();

// --------------------------------------- CONFIGURANDO O SERVIDOR -----------------------------------------------
// ---------------- Aqui deve ser colocado todos os middlewares de aplicação de terceiros e embutidos.------------
// ---------------- Nesta parte é que definiremos o servidor, o que ele faz, quais recurso aceita, como ----------
// ---------------- trabalha com coockies, sessões e  etc.         -----------------------------------------------
// Módulo Override
/*
* Este método serve para prepararmos nosso servirdor 
* para receber e entender os metodos(verbos ou acões 
* que nosso servidor deve executar para retornar um resposta satisfatoria) que não são
* implementados no HTML.
*
* As tres primeiras linhas apos a importação do method-override, são para cabeçalhos enviados na requisição.
*
* A ultima linha recebe o verbo que deve ser interpretado pelo servidor.
*/
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));

// Módulo body-parser
/**
* Ao receber uma requisição no ExpressJS ela pode chegar em JSON ou Query String
* porém o Express 4 nao entende esses formatos e recebe as requisições como texto puro.
* 
* O módulo body-parser tem como objetivo entender o formato da informação passada e converte-la 
* para o formato correto.
*
**/
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true})); // - Isso faz com que o parser se extenda também a objetos encadeados.

// Inicio Api

// Middleware para o favicon.ico(Icone que é solicitado pelo navegador para ficar junto com o titulo da aplicação)
app.use(function (req, res, next) {
    if(req.url === '/favicon.ico'){
        res.writeHead(200, {'Content-Type': 'image/x-icon'});
        res.end('');
    }else{
        next();
    }
});

// Middleware para liberar o CORS(compartilhamento de recursos entre origens diferentes) que por padrão é bloquado pelos navegadores web atuais.
app.use(function (req, res, next) {
    
    res.header("Access-Control-Allow-Origin", "*"); // - Aqui o acesso esta sendo liberado apenas para todas as origens com o "*", existem opções disponiveis, como liberar para um dominio especifico.
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//var cors = require('cors');
//app.use(cors());

// --------------------------------------- CONFIGURANDO AS ROTAS -----------------------------------------------
// ---------------- Aqui é onde devem ser declarados os endpoints da aplicação(Rotas).    ----------------------
// ---------------- Sempre devem vir depois de todas as configurações e antes do tratamento de erros. ----------

app.use('/', require('./routes'));

// ----------------------------------------------- MENSAGENS DE ERRO --------------------------------------------------
// --------- Essa é uma areá especial pois será aqui onde trataremos os erros ocoridos na nossa aplicação. ---------
app.use(function(req,res, next){
    var err = new Error("Não Encontrado");
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500).json({err: err.message});

});

// --------------------------------------- CONFIGURANDO ESCUTA DO SERVIDOR -----------------------------------------------
// --------- Aqui é de fato onde o servidor é declarado, pois é onde informamos em qual porta ele irá aceitar as ---------
// --------- requisições, e onde é possivel escalar a aplicação verticalmente(PESQUISAR ISSO!!!!!); ---------
module.exports = app;