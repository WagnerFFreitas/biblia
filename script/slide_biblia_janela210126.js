/*===============================================================================*/
/*                       MÓDULO DE GERENCIAMENTO DA JANELA                       */
/*===============================================================================*/
/*              Este módulo contém:                                              */
/*                                 - Abertura e fechamento da janela pop-up      */
/*                                 - Validações de dados                         */
/*                                 - Preparação dos dados para a janela          */
/*===============================================================================*/

console.log("[slide_biblia_janela.js] Script iniciado.")                                    // Indica o início do módulo de gerenciamento da janela

// Este bloco cria a função  para abrir a janela pop-up do slide.
function abrirJanelaSlide(livroAtual, capituloAtual, versiculoAtual, versaoAtual) {
    console.log(
        `[slide_biblia_janela.js] Tentando abrir slide para: ${versaoAtual.toUpperCase()} ${livroAtual} ${capituloAtual}:${versiculoAtual}`,
    )                                                                                       // Loga a tentativa de abertura com os parâmetros

    if (!validarDadosBasicos(livroAtual, capituloAtual, versiculoAtual, versaoAtual)) {     // Validações básicas dos dados informados
        return null                                                                         // Retorna null se a validação falhar
    }

    livroAtual = window.normalizarNomeLivro(livroAtual)                                     // Normaliza o nome do livro para o formato interno
    
    if (window.janelaSlide && !window.janelaSlide.closed) {                                 // Verifica se já existe uma janela aberta
        window.janelaSlide.focus()                                                          // Foca na janela existente
        console.log("[slide_biblia_janela.js] Janela do slide já estava aberta. Focando.")  // Loga que a janela já estava aberta
        return window.janelaSlide                                                           // Retorna a referência da janela existente
    }

    const janela = criarJanela()                                                            // Cria uma nova janela pop-up
    if (!janela) {                                                                          // Verifica se a criação da janela foi bem-sucedida
        return null                                                                         // Retorna null se falhou
    }

    if (!validarDadosBiblicos(livroAtual, versaoAtual, janela)) {                           // Valida se os dados bíblicos existem
        return null                                                                         // Retorna null se a validação falhar
    }

    // Prepara e escreve o conteúdo na janela
    const dadosPreparados = prepararDadosParaJanela(livroAtual, capituloAtual, versiculoAtual, versaoAtual)
    if (dadosPreparados) {                                                                  // Verifica se os dados foram preparados com sucesso
        window.escreverHtmlNaJanela(janela, dadosPreparados.html)                           // Escreve o HTML na janela
        window.janelaSlide = janela                                                         // Armazena a referência da janela globalmente
        return janela                                                                       // Retorna a referência da janela
    }
    return null                                                                             // Retorna null se a preparação dos dados falhou
}

// Este bloco cria a função que valida os dados básicos necessários.
function validarDadosBasicos(livroAtual, capituloAtual, versiculoAtual, versaoAtual) {
    if (!livroAtual || !capituloAtual || !versiculoAtual || !versaoAtual) {                 // Verifica se todos os parâmetros foram informados
        alert("Dados insuficientes para abrir o slide. Verifique a seleção.")               // Exibe alerta para o usuário
        // Loga o erro com os dados
        console.warn("[slide_biblia_janela.js] Tentativa de abrir slide com dados insuficientes:", { livroAtual, capituloAtual, versiculoAtual, versaoAtual })
        return false                                                                        // Retorna false indicando falha na validação
    }
    return true                                                                             // Retorna true se todos os dados estão presentes
}

// Este bloco cria a janela pop-up
function criarJanela() {
    const largura = window.screen.availWidth                                                // Obtém a largura disponível da tela
    const altura = window.screen.availHeight                                                // Obtém a altura disponível da tela
    const opcoes = `width=${largura},height=${altura},menubar=no,toolbar=no,location=no,status=no` // Define as opções da janela
    const janela = window.open("", "JanelaSlide", opcoes)                                   // Abre a janela pop-up com as opções definidas
    
    if (!janela || janela.closed) {                                                         // Verifica se a janela foi criada com sucesso
        alert("Não foi possível abrir a janela do slide. Desative o bloqueador de pop-ups.")// Exibe alerta sobre bloqueador de pop-ups
        console.error("[slide_biblia_janela.js] Falha ao abrir a janela pop-up.")           // Loga o erro de criação da janela
        return null                                                                         // Retorna null se falhou
    }

    console.log("[slide_biblia_janela.js] Janela pop-up aberta com sucesso.")               // Loga o sucesso na criação da janela
    return janela                                                                           // Retorna a referência da janela criada
}

// Este bloco cria a função que valida os dados bíblicos.
function validarDadosBiblicos(livroAtual, versaoAtual, janela) {
    const todaContagemDaVersao = window.contagemVersiculosPorVersao[versaoAtual]            // Obtém a contagem de versículos da versão
    
    if (!todaContagemDaVersao || Object.keys(todaContagemDaVersao).length === 0) {          // Verifica se a contagem existe e não está vazia
        // Loga o erro da versão não encontrada
        console.error(`[slide_biblia_janela.js] Contagem de versículos não encontrada para a versão ${versaoAtual.toUpperCase()}`)
        janela.close()                                                                      // Fecha a janela que foi aberta
        // Exibe alerta sobre erro interno
        alert(`Erro interno: Configuração de versículos ausente para a versão ${versaoAtual.toUpperCase()}.`)
        return false                                                                        // Retorna false indicando falha na validação
    }

    if (!todaContagemDaVersao[livroAtual]) {                                                // Verifica se o livro existe na versão
        // Loga o erro do livro não encontrado
        console.error(`[slide_biblia_janela.js] Livro '${livroAtual}' não encontrado na contagem para a versão ${versaoAtual.toUpperCase()}`)
        janela.close()                                                                      // Fecha a janela que foi aberta
        alert(`Erro interno: Livro '${livroAtual}' não encontrado na configuração.`)        // Exibe alerta sobre erro interno
        return false                                                                        // Retorna false indicando falha na validação
    }
    return true                                                                             // Retorna true se todos os dados são válidos
}

// Este bloco cria a função que prepara os dados para serem enviados à janela.
function prepararDadosParaJanela(livroAtual, capituloAtual, versiculoAtual, versaoAtual) {
    try {                                                                                   // Inicia o bloco try-catch para tratamento de erros
        const todaContagemDaVersao = window.contagemVersiculosPorVersao[versaoAtual]        // Obtém a contagem de versículos da versão
        const todaContagemJSON = JSON.stringify(todaContagemDaVersao)                       // Converte a contagem para JSON
        const livrosOrdemJSON = JSON.stringify(window.livrosOrdem)                          // Converte a ordem dos livros para JSON
        const livroAcentuado = window.obterNomeAcentuado(livroAtual)                        // Obtém o nome acentuado do livro
        const html = window.gerarHtmlJanelaSlide(                                           // Gera o HTML para a janela do slide
            livroAtual,
            capituloAtual,
            versiculoAtual,
            versaoAtual,
            todaContagemJSON,
            livrosOrdemJSON,
            window.livroAcentuadosParaSemAcentos,
            livroAcentuado,
        )
        return { html, dados: { todaContagemJSON, livrosOrdemJSON, livroAcentuado } }       // Retorna o HTML e os dados preparados
    } catch (error) {                                                                       // Captura qualquer erro que ocorra
        console.error("[slide_biblia_janela.js] Erro ao preparar dados:", error)            // Loga o erro detalhado
        return null                                                                         // Retorna null em caso de erro
    }
}

// Este bloco cria a função de fecha a janela do slide se estiver aberta.
function fecharJanelaSlide() {
    if (window.janelaSlide && !window.janelaSlide.closed) {                                 // Verifica se existe uma janela aberta
        window.janelaSlide.close()                                                          // Fecha a janela
        window.janelaSlide = null                                                           // Remove a referência da janela
        console.log("[slide_biblia_janela.js] Janela do slide fechada.")                    // Loga que a janela foi fechada
    }
}

/*===============================================================================*/
/*                              EXPORTAÇÕES GLOBAIS                              */
/*===============================================================================*/
window.abrirJanelaSlide = abrirJanelaSlide
window.fecharJanelaSlide = fecharJanelaSlide