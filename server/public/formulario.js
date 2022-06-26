//Função para mascara do cpf
function mascaraCPF(cpf){
    var valor = cpf.value;

    if(isNaN(valor[valor.length-1])){ // impede entrar outro caractere que não seja número
       cpf.value = valor.substring(0, valor.length-1);
       return;
    }
    
    cpf.setAttribute("maxlength", "14");
    if (valor.length == 3 || valor.length == 7) cpf.value += ".";
    if (valor.length == 11) cpf.value += "-";
 }

