function calcularIMC() {
    var peso = parseFloat(document.getElementById('txtpeso').value);
    var altura = parseFloat(document.getElementById('txtaltu').value);

    var resultado = document.getElementById('resultado');
    var tabelaIMC = document.querySelector('.tabela');  // Seleciona a seção da tabela
    var tabela = tabelaIMC.querySelector('table');     // Seleciona a tabela dentro da seção

    if (!isNaN(peso) && peso > 0 && !isNaN(altura) && altura > 0) {
        var imc = peso / (altura * altura);
        var classificacao = getClassificacaoIMC(imc);
        resultado.innerHTML = `<p>Seu IMC é ${imc.toFixed(2)} - ${classificacao}</p>`;

        tabelaIMC.style.display = 'block';  // Mostra a tabela após o cálculo do IMC

        destacarLinhaIMC(imc, tabela);  // Chama a função para destacar a linha correspondente ao IMC
    } else {
        resultado.innerHTML = `<p>Por favor, digite um peso e altura válidos.</p>`;
        tabelaIMC.style.display = 'none';  // Oculta a tabela se os valores não forem válidos
    }
}


function getClassificacaoIMC(imc) {
    if (imc < 18.5) {
        return 'Baixo peso';
    } else if (imc >= 18.5 && imc <= 24.9) {
        return 'Peso normal';
    } else if (imc >= 25.0 && imc <= 29.9) {
        return 'Sobrepeso';
    } else if (imc >= 30.0 && imc <= 34.9) {
        return 'Obesidade grau I';
    } else if (imc >= 35.0 && imc <= 39.9) {
        return 'Obesidade grau II';
    } else {
        return 'Obesidade grau III (mórbida)';
    }
}

function destacarLinhaIMC(imc, tabela) {
    var linhas = tabela.getElementsByTagName('tr');

    for (var i = 1; i < linhas.length; i++) {
        var linha = linhas[i];
        var faixaIMC = linha.cells[0].textContent.trim();
        var classificacao = linha.cells[1].textContent.trim();

        if (verificarFaixaIMC(imc, faixaIMC) && getClassificacaoIMC(imc) === classificacao) {
            linha.classList.add('destacado');
        } else {
            linha.classList.remove('destacado');
        }
    }
}


function verificarFaixaIMC(imc, faixa) {
    var partes = faixa.split(' ');
    var faixaInicial = parseFloat(partes[0].replace(',', '.')); // Trata vírgula como separador decimal
    var faixaFinal = parseFloat(partes[2].replace(',', '.')); // Trata vírgula como separador decimal

    if (faixa.includes('-')) {
        return (imc >= faixaInicial && imc <= faixaFinal);
    } else if (faixa.includes('Menor que')) {
        return (imc < faixaFinal);
    } else if (faixa.includes('Maior ou igual a')) {
        return (imc >= faixaInicial);
    }

    return false;
}
