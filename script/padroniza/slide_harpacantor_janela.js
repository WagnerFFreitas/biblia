/*===============================================================================*/
/*                  MÓDULO DE GERENCIAMENTO DE JANELAS (HINOS)                   */
/*===============================================================================*/
/*  Este script é responsável por:                                               */
/*             - Controlar a abertura de janelas pop-up para slides              */
/*             - Validar a seleção de hinos e ferramentas de geração             */
/*                 - Garantir o foco na janela de projeção ativa                 */
/*===============================================================================*/

console.log("[slide_harpacantor_janela.js] Script iniciado.");                    // Loga o início do script

/* BLOCO: Gerencia a criação e o foco da janela pop-up destinada à exibição dos  */
/* slides do hino                                                                */
function abrirJanelaSlideHino(hinoData) {                                         // Inicia abertura de janela
    console.log(`[Janela] Abrindo slide para: Hino ${hinoData.numero} - ${hinoData.titulo}`);  // Loga o progresso da carga

    /* BLOCO: Valida a existência de dados do hino antes de prosseguir com a abertura do slide */
    if (!hinoData) {                                                              // Verifica se hino é nulo
        alert("Nenhum hino selecionado para exibir no slide.");                   // Avisa sobre dado ausente
        return;
    }
    
    /* BLOCO: Verifica se a janela de slide já está aberta para apenas focar nela              */
    if (window.janelaSlide && !window.janelaSlide.closed) {                       // Checa status da janela
        window.janelaSlide.focus();                                               // Traz a janela para frente
        return;
    }

    /* BLOCO: Obtém as dimensões da tela do usuário e abre o novo pop-up em branco             */
    const largura = window.screen.availWidth;                                     // Pega a largura da tela
    const altura = window.screen.availHeight;                                     // Pega a altura da tela
    const janela = window.open("", "JanelaSlideHino", `width=${largura},height=${altura},menubar=no,status=no`);  // Abre nova janela
    
    /* BLOCO: Confirma se a janela foi aberta corretamente ou se foi bloqueada pelo navegador  */
    if (!janela) {                                                                // Valida criação do objeto
        alert("Não foi possível abrir a janela do slide. Verifique o bloqueador de pop-ups.");  // Orienta sobre bloqueio
        return;
    }

    /* BLOCO: Invoca o gerador de HTML e injeta o conteúdo na nova janela do slide             */
    if (typeof window.gerarHtmlJanelaHino === 'function') {                       // Verifica se gerador existe
        const htmlConteudo = window.gerarHtmlJanelaHino(hinoData);                // Gera string de interface
        window.escreverHtmlNaJanela(janela, htmlConteudo);                        // Injeta HTML no documento
    } else {
        console.error("Função gerarHtmlJanelaHino não está disponível");          // Relata falha de sistema
        janela.document.write("<h1>Erro: Função geradora não disponível</h1>");   // Escreve erro visual
        janela.document.close();                                                  // Fecha fluxo da janela
    }
    
    window.janelaSlide = janela;                                                  // Salva referência da janela
}

window.abrirJanelaSlideHino = abrirJanelaSlideHino;                               // Exporta controle de janela
