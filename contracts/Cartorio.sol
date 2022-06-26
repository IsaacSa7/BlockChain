// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Cartorio {
  //variaveis
  address public owner = msg.sender;
  struct DadosComplementares {
    string data;
    string hora;
    string cidade;
    string estado;
  }

  event Registro(
    uint numeroCertidao,
    string nomeCrianca,
    string nomeMae,
    string nomePai,
    string avozinhaMaterna,
    string avozinhoMaterno,
    string avozinhaPaterna,
    string avozinhoPaterno,
    string sexo,
    string cpf,
    DadosComplementares complementar
    );

  function cadastrar(uint _numero,
                    string memory _nome, 
                    string memory _nomeMae, 
                    string memory _nomePai, 
                    string memory _nomeAvozinhaMaterna, 
                    string memory _nomeAvozinhoMaterno, 
                    string memory _nomeAvozinhaPaterna, 
                    string memory _nomeAvozinhoPaterno, 
                    string memory _cpf,
                    string memory _sexo,
                    DadosComplementares memory _complementar
                   ) public {

      
      emit Registro(
        _numero,
        _nome,
        _nomeMae,
        _nomePai,
        _nomeAvozinhaMaterna,
        _nomeAvozinhoMaterno,
        _nomeAvozinhaPaterna,
        _nomeAvozinhoPaterno,
        _sexo,
        _cpf,
        _complementar
      );
  }
}
