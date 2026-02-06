/*===============================================================================*/
/*                       MÓDULO DE GERENCIAMENTO DA JANELA                       */
/*===============================================================================*/
/*              Este módulo contém:                                              */
/*                                 - Abertura e fechamento da janela pop-up      */
/*                                 - Validações de dados                         */
/*                                 - Preparação dos dados para a janela          */
/*===============================================================================*/

console.log("[slide_biblia_janela.js] Script iniciado.")                                                                      /* Log de inicialização do módulo      */

/* BLOCO: Função mestre que coordena o processo de abertura, validação e injeção de dados na nova janela de slide       */
function abrirJanelaSlide(livroAtual, capituloAtual, versiculoAtual, versaoAtual) {                                           /* Inicia abertura do slide            */
    console.log(`[slide_biblia_janela.js] Abrindo para: ${versaoAtual.toUpperCase()} ${livroAtual}`)                          /* Log de tentativa de abertura        */

    /* BLOCO: Executa a validação dos parâmetros de entrada para garantir que nenhuma informação essencial esteja nula  */
    if (!validarDadosBasicos(livroAtual, capituloAtual, versiculoAtual, versaoAtual)) {                                       /* Valida parâmetros de entrada        */
        return null
    }

    livroAtual = window.normalizarNomeLivro(livroAtual)                                                                       /* Padroniza identificador do livro    */
    
    /* BLOCO: Verifica se já existe uma instância da janela ativa para evitar a criação de múltiplas janelas duplicadas */
    if (window.janelaSlide && !window.janelaSlide.closed) {                                                                   /* Verifica se janela está aberta      */
        window.janelaSlide.focus()                                                                                            /* Traz janela ativa para o foco       */
        console.log("[slide_biblia_janela.js] Janela já aberta. Focando.")                                                    /* Log de reutilização de janela       */
        return window.janelaSlide
    }

    /* BLOCO: Invoca o motor de criação de janelas do navegador para instanciar o novo objeto da interface do slide     */
    const janela = criarJanela()                                                                                              /* Instancia novo objeto window        */
    if (!janela) {
        return null
    }

    /* BLOCO: Valida se os mapas de contagem de versículos e o livro solicitado estão configurados para esta tradução   */
    if (!validarDadosBiblicos(livroAtual, versaoAtual, janela)) {                                                             /* Valida integridade dos dados        */
        return null
    }

    /* BLOCO: Agrupa e serializa todas as informações necessárias para construir a interface dentro da nova janela      */
    const dadosPreparados = prepararDadosParaJanela(livroAtual, capituloAtual, versiculoAtual, versaoAtual)                   /* Prepara o pacote de dados           */
    if (dadosPreparados) {
        window.escreverHtmlNaJanela(janela, dadosPreparados.html)                                                             /* Injeta o código HTML na janela      */
        window.janelaSlide = janela                                                                                           /* Salva a referência globalmente      */
        return janela
    }
    return null
}

/* BLOCO: Função responsável por certificar que todos os argumentos obrigatórios foram passados para o motor da janela  */
function validarDadosBasicos(livroAtual, capituloAtual, versiculoAtual, versaoAtual) {                                        /* Inicia validação de segurança       */
    if (!livroAtual || !capituloAtual || !versiculoAtual || !versaoAtual) {                                                   /* Verifica campos obrigatórios        */
        alert("Dados insuficientes para abrir o slide. Verifique a seleção.")                                                 /* Emite alerta ao usuário final       */
        console.warn("[slide_biblia_janela.js] Dados insuficientes detectados.")                                              /* Log de aviso de falha técnica       */
        return false
    }
    return true
}

/* BLOCO: Define as dimensões do monitor e configura as propriedades visuais da nova janela pop-up do navegador         */
function criarJanela() {                                                                                                      /* Inicia rotina de criação            */
    const largura = window.screen.availWidth                                                                                  /* Captura largura total do monitor    */
    const altura = window.screen.availHeight                                                                                  /* Captura altura total do monitor     */
    const opcoes = `width=${largura},height=${altura},menubar=no,toolbar=no,location=no,status=no`                            /* Configura atributos do pop-up       */
    const janela = window.open("", "JanelaSlide", opcoes)                                                                     /* Abre o pop-up no navegador          */
    
    /* BLOCO: Trata a falha de abertura caso o navegador possua um bloqueador de janelas pop-up ativado pelo usuário    */
    if (!janela || janela.closed) {                                                                                           /* Valida permissão de abertura        */
        alert("Não foi possível abrir a janela do slide. Desative o bloqueador de pop-ups.")                                  /* Orienta sobre o bloqueio            */
        console.error("[slide_biblia_janela.js] Falha ao abrir a janela pop-up.")                                             /* Log de erro de instância            */
        return null
    }

    console.log("[slide_biblia_janela.js] Janela pop-up aberta com sucesso.")                                                 /* Log de sucesso operacional          */
    return janela
}

/* BLOCO: Função que assegura que o arquivo de dados da tradução e do livro solicitados existem na configuração ativa   */
function validarDadosBiblicos(livroAtual, versaoAtual, janela) {                                                              /* Inicia validação de conteúdo        */
    const todaContagemDaVersao = window.contagemVersiculosPorVersao[versaoAtual]                                              /* Recupera banco de dados da versão   */
    
    /* BLOCO: Verifica se a estrutura de mapeamento de versículos da tradução selecionada foi carregada com sucesso     */
    if (!todaContagemDaVersao || Object.keys(todaContagemDaVersao).length === 0) {                                            /* Valida objeto de contagem           */
        console.error(`[slide_biblia_janela.js] Falha na contagem para ${versaoAtual.toUpperCase()}`)                         /* Log de erro de configuração         */
        janela.close()                                                                                                        /* Encerra a janela órfã               */
        alert(`Erro interno: Configuração ausente para a versão ${versaoAtual.toUpperCase()}.`)                               /* Notifica erro crítico               */
        return false
    }

    /* BLOCO: Confirma se o livro solicitado pelo usuário está presente no mapeamento da bíblia ativa                   */
    if (!todaContagemDaVersao[livroAtual]) {                                                                                  /* Verifica existência do livro        */
        console.error(`[slide_biblia_janela.js] Livro '${livroAtual}' não mapeado na versão atual.`)                          /* Log de erro de mapeamento           */
        janela.close()                                                                                                        /* Encerra a janela órfã               */
        alert(`Erro interno: Livro '${livroAtual}' não encontrado na configuração.`)                                          /* Notifica erro de livro              */
        return false
    }
    return true
}

/* BLOCO: Serializa os objetos de dados em formato JSON para que possam ser transmitidos para o ambiente da janela      */
function prepararDadosParaJanela(livroAtual, capituloAtual, versiculoAtual, versaoAtual) {                                    /* Inicia empacotamento de dados       */
    try {
        const todaContagemDaVersao = window.contagemVersiculosPorVersao[versaoAtual]                                          /* Captura mapa de versículos          */
        const todaContagemJSON = JSON.stringify(todaContagemDaVersao)                                                         /* Serializa mapa em string            */
        const livrosOrdemJSON = JSON.stringify(window.livrosOrdem)                                                            /* Serializa lista em string           */
        const livroAcentuado = window.obterNomeAcentuado(livroAtual)                                                          /* Traduz ID para nome legível         */
        const html = window.gerarHtmlJanelaSlide(                                                                             /* Invoca o motor de geração de HTML   */
            livroAtual,
            capituloAtual,
            versiculoAtual,
            versaoAtual,
            todaContagemJSON,
            livrosOrdemJSON,
            window.livroAcentuadosParaSemAcentos,
            livroAcentuado,
        )
        return { html, dados: { todaContagemJSON, livrosOrdemJSON, livroAcentuado } }                                         /* Retorna o pacote de exibição        */
    } catch (error) {
        console.error("[slide_biblia_janela.js] Erro ao preparar dados:", error)                                              /* Log de erro de processamento        */
        return null
    }
}

/* BLOCO: Encerra a execução da janela de projeção ativa e limpa as referências globais de controle da interface        */
function fecharJanelaSlide() {                                                                                                /* Inicia fechamento do sistema        */
    if (window.janelaSlide && !window.janelaSlide.closed) {                                                                   /* Verifica se há janela ativa         */
        window.janelaSlide.close()                                                                                            /* Finaliza a janela do navegador      */
        window.janelaSlide = null                                                                                             /* Reseta a referência global          */
        console.log("[slide_biblia_janela.js] Janela do slide encerrada.")                                                    /* Log de encerramento                 */
    }
}

/* BLOCO: Atribuição das referências globais para permitir o controle do slide por outros módulos do sistema            */
window.abrirJanelaSlide = abrirJanelaSlide                                                                                    /* Exporta função de abertura          */
window.fecharJanelaSlide = fecharJanelaSlide                                                                                  /* Exporta função de fechamento        */