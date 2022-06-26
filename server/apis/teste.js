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


const BlockChainPesquisa = async() => {
    var qtd = await web3.eth.getBlockNumber()
    var indice = 0
    var numero = 0
    var numero2 = 10
    let eventos = await CONTRACT.getPastEvents("Registro", {fromBlock: 0});

    while(1){
        numero = eventos[indice].returnValues.numeroCertidao
        
        if(numero == numero2){
         
            console.log("igual")
            break
        }

        if(indice == (qtd - 2))
            break
        
            indice++
        
}
}

BlockChainPesquisa()