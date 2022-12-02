export function valida(input){
    const tipoInput = input.dataset.tipo;

    if(validadores[tipoInput]){
        validadores[tipoInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
    }else{
        input.parentElement.classList.add('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostratMensagemErro(tipoInput, input);
    }
}

const tiposErro = [
    'valueMissing',
    'typeMismatch',
    'patternMisatch',
    'customError'
];

const mensegensErro = {
    nome: {
        valueMissing: 'O campo de nome não pode estar vazio'
    },
    email: {
        valueMissing: 'O campo email não pode estar vazio',
        typeMismatch: 'O email digitado não é válido'
    },
    senha: {
        valueMissing: 'O campo de senha não pode estar vazio',
        typeMismatch: 'A senha deve ter entre 6 e 12 caracters, deve conter pelo menos uma letra minuscula e uma maiuscula, um numero e não deve conter simbolos.'
    },
    dataNascimento: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio',
        customError: 'Você precisa ter mais que 18 anos'
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio',
        customError: 'CPF informado não é válido!'
    }
}

const validadores = {
    dataNascimento: input => validaDataNascimento(input),
    cpf: input => validaCPF(input)
}

function mostratMensagemErro(tipoInput, input){

    let mensagem = '';

    tiposErro.forEach(erro => {
        if(input.validity[erro]){
            mensagem = mensegensErro[tipoInput][erro]
        }
    })

    return mensagem;
}

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

function validaCPF(input){
    const cpfFprmatado = input.value.replace(/\D/g, '');
    let mensagem = '';

    if(!checaCPFRepetido(cpfFprmatado)){
        mensagem = 'CPF informado não é válido!';
    }

    input.setCustomValidity(mensagem);
}

function checaCPFRepetido(cpf){
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ];

    let cpfValido = true;

    valoresRepetidos.forEach(valor => {
        if(valor == cpf){
            cpfValido = false;
        }
    })

    return cpfValido;
}