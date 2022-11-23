const dataNascimento = document.querySelector('#nascimento');

dataNascimento.addEventListener('blur', (evento)=>{
    validaDataNascimento(evento.target);
})

function validaDataNascimento(input){
    const dataRecebida = new Date(input.value);
    let mensagem = '';

    if(!maiorQue18(dataRecebida)){
        mensagem = 'Você precisa ter mais que 18 anos';
    }

    input.setCustomValidity(mensagem);
}

function maiorQue18(data){
    const dataAtual = new Date();
    const dataInformada = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());
    console.log(dataInformada);         
    return dataAtual >= dataInformada;
}