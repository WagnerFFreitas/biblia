/*===============================================================================*/
/*                        MÓDULO DE UTILITÁRIOS DO SLIDE                         */
/*===============================================================================*/
/*           Este módulo contém:                                                 */
/*                             - Funções para normalização de nomes de livros    */
/*                             - Funções para conversão de formatos              */
/*                             - Utilitários gerais                              */
/*===============================================================================*/

console.log("[slide_biblia_utils.js] Script iniciado.")                           // Indica o início do módulo de utilitários

//  Este bloco cria a função normalizar o nome do livro para o formato interno padrão
function normalizarNomeLivro(nome) {
    if (!window.livroAcentuadosParaSemAcentos) {
        console.warn("[slide_biblia_utils.js] Dados bíblicos não carregados")     // Verifica se o dicionário de livros está carregado
        return nome.toLowerCase()                                                 // Retorna o nome em minúsculo caso não haja dicionário
    }
    
    const nomeLower = nome.toLowerCase()                                          // Converte o nome para minúsculo
    // Procura o nome no dicionário, ignorando acentos
    const semAcentos = Object.keys(window.livroAcentuadosParaSemAcentos).find((key) => key.toLowerCase() === nomeLower)
    if (semAcentos) {
        return window.livroAcentuadosParaSemAcentos[semAcentos]                   // Se encontrar, retorna o nome sem acentos
    }

    return (                                                                      // Caso não encontre, tenta encontrar o nome já normalizado
        Object.keys(window.livroAcentuadosParaSemAcentos).find((key) => window.livroAcentuadosParaSemAcentos[key] === nomeLower) ||
        nomeLower                                                                 // Se não encontrar, retorna o nome em minúsculo
    )
}

// Este bloco cria a função que obtém o nome acentuado de um livro para exibição
function obterNomeAcentuado(nomeSemAcento) {
    if (!window.livroAcentuadosParaSemAcentos) {                                  // Verifica se o dicionário de livros está carregado
        console.warn("[slide_biblia_utils.js] Dados bíblicos não carregados")
        return nomeSemAcento                                                      // Retorna o nome sem acento caso não haja dicionário
    }

    return (                                                                      // Procura a chave cujo valor corresponde ao nome sem acento
        Object.keys(window.livroAcentuadosParaSemAcentos).find((key) => window.livroAcentuadosParaSemAcentos[key] === nomeSemAcento) ||
        nomeSemAcento                                                             // Se não encontrar, retorna o nome sem acento
    )
}


// Este bloco cria a função que valida se um livro existe na configuração da versão
function validarLivro(livro, versao) {
    // Verifica se a estrutura de contagem de versículos está carregada e se a versão existe
    if (!window.contagemVersiculosPorVersao || !window.contagemVersiculosPorVersao[versao]) {
        return false                                                              // Retorna falso se não houver dados
    }

    return window.contagemVersiculosPorVersao[versao].hasOwnProperty(livro)       // Verifica se o livro existe na versão informada
}


// Este bloco cria a função que obtém a contagem de versículos de um capítulo
function obterContagemVersiculos(livro, capitulo, versao) {
    if (!validarLivro(livro, versao)) {                                           // Valida se o livro existe na versão
        return 0                                                                  // Retorna 0 se o livro não existir
    }
    return window.contagemVersiculosPorVersao[versao][livro][capitulo] || 0       // Retorna a contagem de versículos do capítulo, ou 0 se não existir
}

// Este bloco cria a função que obtém o próximo livro na ordem canônica
function obterProximoLivro(livroAtual) {
    if (!window.livrosOrdem) {                                                    // Verifica se a ordem dos livros está carregada
        return null
    }

    const index = window.livrosOrdem.indexOf(livroAtual)                          // Obtém o índice do livro atual
    if (index === -1 || index === window.livrosOrdem.length - 1) {                // Se não encontrar ou for o último, retorna null
        return null
    }
    return window.livrosOrdem[index + 1]                                          // Retorna o próximo livro na ordem
}

// Este bloco cria a função que obtém o livro anterior na ordem canônica
function obterLivroAnterior(livroAtual) {
    if (!window.livrosOrdem) {                                                    // Verifica se a ordem dos livros está carregada
        return null
    }
    const index = window.livrosOrdem.indexOf(livroAtual)                          // Obtém o índice do livro atual
    if (index <= 0) {                                                             // Se for o primeiro ou não encontrar, retorna null
        return null
    }
    return window.livrosOrdem[index - 1]                                          // Retorna o livro anterior na ordem
}

// Este bloco cria a função que obtém o número total de capítulos de um livro 
function obterTotalCapitulos(livro, versao) {
    if (!validarLivro(livro, versao)) {                                           // Valida se o livro existe na versão
        return 0                                                                  // Retorna 0 se o livro não existir
    }
    return Object.keys(window.contagemVersiculosPorVersao[versao][livro]).length  // Retorna a quantidade de capítulos do livro
}

/*===============================================================================*/
/*                             EXPORTAÇÕES GLOBAIS                               */
/*===============================================================================*/
window.normalizarNomeLivro = normalizarNomeLivro
window.obterNomeAcentuado = obterNomeAcentuado
window.validarLivro = validarLivro
window.obterContagemVersiculos = obterContagemVersiculos
window.obterProximoLivro = obterProximoLivro
window.obterLivroAnterior = obterLivroAnterior
window.obterTotalCapitulos = obterTotalCapitulos