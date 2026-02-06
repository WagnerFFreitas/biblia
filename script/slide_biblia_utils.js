/*===============================================================================*/
/*                        MÓDULO DE UTILITÁRIOS DO SLIDE                         */
/*===============================================================================*/
/*  Este módulo contém:                                                          */
/*                    - Funções para normalização de nomes de livros             */
/*                    - Funções para conversão de formatos                       */
/*                    - Utilitários gerais para contagem e validação             */
/*===============================================================================*/

console.log("[slide_biblia_utils.js] Script iniciado.")                                                                  /* Log de inicialização        */

/* BLOCO: Função para normalizar o nome do livro para o formato interno padrão (sem acentos e minúsculo)*/
function normalizarNomeLivro(nome) {                                                                                     /* Inicia normalização         */
    if (!window.livroAcentuadosParaSemAcentos) {                                                                         /* Verifica carga de dados     */
        console.warn("[slide_biblia_utils.js] Dados bíblicos não carregados")                                            /* Alerta dados ausentes       */
        return nome.toLowerCase()                                                                                        /* Fallback minúsculo          */
    }

    const nomeLower = nome.toLowerCase()                                                                                 /* Converte para minúsculas    */

    const semAcentos = Object.keys(window.livroAcentuadosParaSemAcentos).find((key) => key.toLowerCase() === nomeLower)  /* Busca chave no dicionário   */
    if (semAcentos) {
        return window.livroAcentuadosParaSemAcentos[semAcentos]                                                          /* Retorna valor sem acento    */
    }

    return (
        Object.keys(window.livroAcentuadosParaSemAcentos).find((key) => window.livroAcentuadosParaSemAcentos[key] === nomeLower) ||
        nomeLower                                                                                                        /* Retorna ID ou original      */
    )
}

/* BLOCO: Função que obtém o nome acentuado (legível) de um livro a partir do seu identificador interno */
function obterNomeAcentuado(nomeSemAcento) {                                                                             /* Inicia busca de nome real   */
    if (!window.livroAcentuadosParaSemAcentos) {                                                                         /* Verifica carga de dados     */
        console.warn("[slide_biblia_utils.js] Dados bíblicos não carregados")                                            /* Alerta dados ausentes       */
        return nomeSemAcento                                                                                             /* Retorna ID como fallback    */
    }

    return (
        Object.keys(window.livroAcentuadosParaSemAcentos).find((key) => window.livroAcentuadosParaSemAcentos[key] === nomeSemAcento) ||
        nomeSemAcento                                                                                                    /* Retorna chave ou original   */
    )
}

/* BLOCO: Função que valida se um identificador de livro existe na configuração da versão selecionada   */
function validarLivro(livro, versao) {                                                                                   /* Inicia validação de livro   */
    if (!window.contagemVersiculosPorVersao || !window.contagemVersiculosPorVersao[versao]) {                            /* Verifica integridade objeto */
        return false                                                                                                     /* Retorna falso por erro      */
    }

    return window.contagemVersiculosPorVersao[versao].hasOwnProperty(livro)                                              /* Verifica existência chave   */
}

/* BLOCO: Função que recupera a contagem de versículos de um capítulo específico dentro de uma tradução */
function obterContagemVersiculos(livro, capitulo, versao) {                                                              /* Inicia consulta de versos   */
    if (!validarLivro(livro, versao)) {                                                                                  /* Valida o livro primeiro     */
        return 0                                                                                                         /* Retorna zero se inválido    */
    }
    return window.contagemVersiculosPorVersao[versao][livro][capitulo] || 0                                              /* Retorna total de versículos */
}

/* BLOCO: Função que identifica o próximo livro na sequência canônica da Bíblia                         */
function obterProximoLivro(livroAtual) {                                                                                 /* Inicia busca próximo livro  */
    if (!window.livrosOrdem) {                                                                                           /* Verifica lista de ordem     */
        return null                                                                                                      /* Retorna nulo se ausente     */
    }

    const index = window.livrosOrdem.indexOf(livroAtual)                                                                 /* Localiza posição atual      */
    if (index === -1 || index === window.livrosOrdem.length - 1) {                                                       /* Verifica se é o último      */
        return null                                                                                                      /* Retorna nulo (fim da lista) */
    }
    return window.livrosOrdem[index + 1]                                                                                 /* Retorna sucessor na lista   */
}

/* BLOCO: Função que identifica o livro anterior na sequência canônica da Bíblia                        */
function obterLivroAnterior(livroAtual) {                                                                                /* Inicia busca livro anterior */
    if (!window.livrosOrdem) {                                                                                           /* Verifica lista de ordem     */
        return null                                                                                                      /* Retorna nulo se ausente     */
    }
    const index = window.livrosOrdem.indexOf(livroAtual)                                                                 /* Localiza posição atual      */
    if (index <= 0) {                                                                                                    /* Verifica se é o primeiro    */
        return null                                                                                                      /* Retorna nulo (sem anterior) */
    }
    return window.livrosOrdem[index - 1]                                                                                 /* Retorna antecessor na lista */
}

/* BLOCO: Função que calcula a quantidade total de capítulos que um livro possui em determinada versão  */
function obterTotalCapitulos(livro, versao) {                                                                            /* Inicia contagem capítulos   */
    if (!validarLivro(livro, versao)) {                                                                                  /* Valida o livro primeiro     */
        return 0                                                                                                         /* Retorna zero se inválido    */
    }
    return Object.keys(window.contagemVersiculosPorVersao[versao][livro]).length                                         /* Conta chaves do objeto livro*/
}

/*===============================================================================*/
/*                             EXPORTAÇÕES GLOBAIS                               */
/*===============================================================================*/
window.normalizarNomeLivro = normalizarNomeLivro                                                                         /* Exporta normalização        */
window.obterNomeAcentuado = obterNomeAcentuado                                                                           /* Exporta tradutor nomes      */
window.validarLivro = validarLivro                                                                                       /* Exporta validador           */
window.obterContagemVersiculos = obterContagemVersiculos                                                                 /* Exporta contador versículos */
window.obterProximoLivro = obterProximoLivro                                                                             /* Exporta seletor sucessor    */
window.obterLivroAnterior = obterLivroAnterior                                                                           /* Exporta seletor antecessor  */
window.obterTotalCapitulos = obterTotalCapitulos                                                                         /* Exporta contador capítulos  */