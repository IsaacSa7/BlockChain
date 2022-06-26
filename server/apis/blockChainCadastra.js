const fs = require('fs'); //Modulo para arquivo de sistema
const { exit } = require('process');
const Web3 = require("web3"); //web3 para conexão
const ID_NETWORK = '5777'; // a porta
const FileConfigContract = fs.readFileSync('/home/Isaac/Documentos/estudos/programacao/ultimateProjeto/blockChain/build/contracts/Cartorio.json'); //os arquivos do contrato
const configContract = JSON.parse(FileConfigContract);//as configurações do contrato para JSON
const ANDRESS = configContract['networks'][ID_NETWORK]['address'] //endereço
const ABI = configContract['abi']
const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");
const CONTRACT = new web3.eth.Contract(ABI, ANDRESS)


//Função main
const BlockChainCadastra = async (dates) => {
    let eventos = await CONTRACT.getPastEvents("Registro", {fromBlock: 0});
    let qtdBlocos = await web3.eth.getBlockNumber()
    let indice = 0
    let numero = 0
    
    
    while(1){
        numero = eventos[indice].returnValues.numeroCertidao
        if(dates.numero == numero){
            throw "Erro"
        }

        if(indice == (qtdBlocos - 2)){
            break
        }

        indice++
    } 
        
    numero = dates.numero
    var nome = dates.nome
    var mae = dates.mae
    var pai = dates.pai
    var a_M = dates.a_M
    var o_M = dates.o_M
    var a_P = dates.a_P
    var o_P = dates.o_P
    var cpf = dates.cpf
    var data = dates.data
    var hora = dates.hora
    var sexo = dates.sexo
    var cidade = dates.cidade
    var estado = dates.estado

    //dados complementares
    var dadosComplementares = [data, hora, cidade, estado]

    
    //conta
    const accounts = await web3.eth.getAccounts();
    const accountDefault = accounts[0];

    //Processamento de Dados
    await CONTRACT.methods.cadastrar(numero, nome, mae, pai, a_M, o_M, a_P, o_P, cpf, sexo, dadosComplementares).send({from: accountDefault})
}
       
//BlockChainCadastra(2, 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a','a', 'a', 'a','a')
module.exports = BlockChainCadastra
