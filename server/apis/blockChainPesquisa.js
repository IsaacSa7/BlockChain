const fs = require('fs'); //Modulo para arquivo de sistema
const { mainModule } = require('process');
const Web3 = require("web3"); //web3 para conexão
const ID_NETWORK = '5777'; // a porta
const FileConfigContract = fs.readFileSync('/home/Isaac/Documentos/estudos/programacao/ultimateProjeto/blockChain/build/contracts/Cartorio.json'); //os arquivos do contrato
const configContract = JSON.parse(FileConfigContract);//as configurações do contrato para JSON
const ANDRESS = configContract['networks'][ID_NETWORK]['address'] //endereço
const ABI = configContract['abi']
const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");
const CONTRACT = new web3.eth.Contract(ABI, ANDRESS)


const BlockChainPesquisa = async(n) => {

    var indice = 0
    var numero = 0
    var numeroCertidao = n
    let eventos = await CONTRACT.getPastEvents("Registro", {fromBlock: 0});

    while(1){
        numero = eventos[indice].returnValues.numeroCertidao
        if(numeroCertidao == numero){
            break;
        }
        indice++
    }

    //Capturando valores da BlockChain

    numero = eventos[indice].returnValues.numeroCertidao
    var nome = eventos[indice].returnValues.nomeCrianca
    var mae = eventos[indice].returnValues.nomeMae
    var pai = eventos[indice].returnValues.nomePai
    var avozinhaMaterna = eventos[indice].returnValues.avozinhaMaterna
    var avozinhoMaterno = eventos[indice].returnValues.avozinhoMaterno
    var avozinhaPaterna = eventos[indice].returnValues.avozinhaPaterna
    var avozinhoPaterno = eventos[indice].returnValues.avozinhoPaterno
    var cpf = eventos[indice].returnValues.cpf
    var data = eventos[indice].returnValues.complementar.data
    var hora = eventos[indice].returnValues.complementar.hora
    var sexo = eventos[indice].returnValues.sexo
    var cidade = eventos[indice].returnValues.complementar.cidade
    var estado = eventos[indice].returnValues.complementar.estado

    let dadosCadastrados = {
        numero : numero,
        nome : nome,
        cpf : cpf,
        mae : mae,
        pai : pai,
        avozinhoMaterno : avozinhoMaterno,
        avozinhaMaterna : avozinhaMaterna,
        avozinhoPaterno : avozinhoPaterno,
        avozinhaPaterna : avozinhaPaterna,
        sexo : sexo,
        data : data,
        hora : hora,
        cidade : cidade,
        estado : estado   

    }
    
    return dadosCadastrados
}

module.exports = BlockChainPesquisa