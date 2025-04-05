document.addEventListener('DOMContentLoaded', function () {
    // Obtém referências aos elementos do DOM
    const inputString = document.getElementById('inputString');
    const transformButton = document.getElementById('transformButton');
    const result = document.getElementById('result');

    // Adiciona um event listener para o botão de transformação
    transformButton.addEventListener('click', function () {
        // Obtém o valor do input
        const inputValue = inputString.value;

        // Verifica se o input não está vazio
        if (inputValue.trim() === '') {
            result.textContent = 'Por favor, digite uma palavra mágica!';
            return;
        }

        // Transforma a string usando a função mágica
        const transformedString = transformarStringMagica(inputValue);

        // Exibe o resultado
        result.textContent = transformedString;
    });

    // Adiciona também a funcionalidade ao pressionar Enter no input
    inputString.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            transformButton.click();
        }
    });
});

/**
 * Função que transforma uma string seguindo as regras mágicas:
 * 1. Cada letra é substituída pela próxima no alfabeto
 * 2. Se a letra transformada for uma vogal, inverte a capitalização
 * 3. Mantém a capitalização original para não vogais
 * @param {string} str - A string a ser transformada
 * @returns {string} - A string transformada
 */
function transformarStringMagica(str) {
    // Define as vogais para verificação
    const vogais = new Set(['a', 'e', 'i', 'o', 'u']);

    // Converte a string em um array de caracteres para processamento
    return Array.from(str).map(caractere => {
        // Verifica se o caractere é uma letra
        if (/^[a-zA-Z]$/.test(caractere)) {
            // Obtém o código ASCII do caractere
            const codigo = caractere.charCodeAt(0);

            // Determina se é maiúscula
            const ehMaiuscula = caractere === caractere.toUpperCase();

            // Converte para minúscula para processamento uniforme
            const lowerChar = caractere.toLowerCase();

            // Avança para a próxima letra no alfabeto, tratando o 'z' como caso especial
            let novoCodigo;
            if (lowerChar === 'z') {
                novoCodigo = 'a'.charCodeAt(0); // Volta para 'a' após 'z'
            } else {
                novoCodigo = codigo + 1;
            }

            // Obtém o novo caractere
            let novoCaractere = String.fromCharCode(novoCodigo);

            // Verifica se o novo caractere é uma vogal
            const ehVogal = vogais.has(novoCaractere.toLowerCase());

            // Aplica as regras de capitalização
            if (ehVogal) {
                // Inverte a capitalização
                novoCaractere = ehMaiuscula ? novoCaractere.toLowerCase() : novoCaractere.toUpperCase();
            } else {
                // Mantém a capitalização original
                novoCaractere = ehMaiuscula ? novoCaractere.toUpperCase() : novoCaractere.toLowerCase();
            }

            return novoCaractere;
        }

        // Retorna caracteres não-alfabéticos sem modificação
        return caractere;
    }).join(''); // Junta o array de volta em uma string
}