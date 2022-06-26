const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const { constants } = require("crypto");
const porta = 3000
const pesquisa = require("./apis/blockChainPesquisa")
const cadastra = require("./apis/blockChainCadastra")
const Handelbars = require('express-handlebars')

//configurando Handelbars
const hbs = Handelbars.create({
    defaultLayout: 'main',
    helpers: {
        foo: function() {
            return 'FOO!';
        },

        bar: function(){
            return 'BAR!';
        }
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }

})

//Usando Hnadlebars
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

//configurando body
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/public')))

//retorna uma requisição
app.get('/', (req, res) => {
    res.render('view/init')
})

app.get('/formulario', function(req, res){
    res.render('view/cadastro')
})

app.post('/add', function(req, res){

    let dados = {
        numero : req.body.numero,
        nome : req.body.nome,
        cpf : req.body.cpf,
        mae : req.body.nomeMae,
        pai : req.body.nomePai,
        a_M : req.body.a_M,
        o_M : req.body.o_M,
        o_P : req.body.o_P,
        a_P : req.body.a_P,
        sexo : req.body.sexo,
        data : req.body.data,
        hora : req.body.hora,
        cidade : req.body.cidade,
        estado : req.body.estado
    } 

    cadastra(dados).then(() => {
        res.render('view/cadastrado')
    }).catch((e) => {
        res.render('view/presente')
    })
})

app.post('/exibir', function(req, res){   
    let numeroCertidao = req.body.n_Pesquisar
        pesquisa(numeroCertidao).then(dados => {
            res.render('view/exibe', {dados:dados})
        }).catch((e) => {
            res.render('view/ausente')
        })
    })

app.get('/pesquisar', function(req, res){
    res.render('view/pesquisa')
})

app.listen(porta, function(req, res){
    console.log(`Conectado com servidor na porta ${porta }`)
})