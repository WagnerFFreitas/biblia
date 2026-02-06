/*===============================================================================*/
/*                 MÓDULO DE NAVEGAÇÃO PARA O MODO DE LEITURA                    */
/*===============================================================================*/
/*  Este script controla:                                                        */
/*                       - A criação dos botões de navegação de capítulos        */
/*                       - A navegação por setas do teclado (Esq/Dir)            */
/*                       - A lógica de clique para avançar/retroceder capítulos  */
/*===============================================================================*/

/* BLOCO: Cria uma função anônima e a executa imediatamente (IIFE)              */
(function() {
    'use strict';                                                                               /* Ativa o modo rigoroso de escrita          */

    /* BLOCO: Cria a função de navegação por teclas (seta esquerda/direita)     */
    function handleKeyNavigation(evento) { 
        /* BLOCO: Verifica se o modo leitura está ativo e se não está digitando */
        if (!window.modoLeituraAtivo || (document.activeElement && /INPUT|TEXTAREA|true/.test(document.activeElement.tagName + document.activeElement.isContentEditable))) {
            return;                                                                             /* Interrompe se houver digitação            */
        }
        
        /* BLOCO: Cria um objeto para mapear as teclas aos IDs dos botões       */
        const acoes = {
            "ArrowLeft" : 'modoLeitura-capitulo-anterior',                                      /* Define seta esquerda como anterior        */
            "ArrowRight": 'modoLeitura-capitulo-proximo'                                        /* Define seta direita como próximo          */
        };
        
        /* BLOCO: Busca no objeto o ID correspondente à tecla pressionada       */
        const idBotao = acoes[evento.key];
        if (idBotao) {                                                                          /* Se a tecla for uma das mapeadas          */
            const botao = document.getElementById(idBotao);                                     /* Localiza o botão pelo ID                  */
            if (botao && !botao.disabled) {                                                     /* Verifica se o botão está usável          */
                evento.preventDefault();                                                        /* Evita a rolagem padrão da página          */
                botao.click();                                                                  /* Simula o clique no botão                  */
            }
        }
    }

   /* BLOCO: Função que gera e retorna o HTML dos botões de navegação           */
    window.gerarHtmlNavegacao = async function(livro, capitulo) {
        
        /* BLOCO: Busca o capítulo anterior e o próximo                        */
        const livroCapituloAnterior = await window.obterLivroCapituloAnterior(livro, capitulo); /* Busca dados do recuo                    */
        const proximoLivroCapitulo  = await window.obterProximoLivroECapitulo(livro, capitulo);  /* Busca dados do avanço                   */
        let htmlBotoesNavegacao = '<div class="reading-mode-navigation">';                      /* Inicia a string do conteiner             */
        
        htmlBotoesNavegacao += livroCapituloAnterior ?                                          /* Verifica se há anterior                 */
            `<button id="modoLeitura-capitulo-anterior" data-livro="${livroCapituloAnterior.livro}" data-capitulo="${livroCapituloAnterior.capitulo}">Cap. Anterior</button>` :
            `<button id="modoLeitura-capitulo-anterior" disabled>Cap. Anterior</button>`;       /* Cria botão ou desabilita                 */

        htmlBotoesNavegacao += proximoLivroCapitulo ?                                           /* Verifica se há próximo                  */
            `<button id="modoLeitura-capitulo-proximo" data-livro="${proximoLivroCapitulo.livro}" data-capitulo="${proximoLivroCapitulo.capitulo}">Cap. Próximo</button>` :
            `<button id="modoLeitura-capitulo-proximo" disabled>Cap. Próximo</button>`;         /* Cria botão ou desabilita                 */
            
        htmlBotoesNavegacao += '</div>';                                                        /* Fecha a tag do conteiner                 */
        
        return htmlBotoesNavegacao;                                                             /* Devolve o HTML construído                */
    };

    /* BLOCO: Função para configurar os event listeners nos botões do DOM       */
    window.configurarListenersNavegacao = async function(conteinerLeitura, livro, capitulo) {
        const configurarBotaoNavegacao = (id) => {                                              /* Função auxiliar de configuração          */
            const botao = conteinerLeitura.querySelector(`#${id}`);                             /* Acha o botão no conteiner                */
            if (botao && !botao.disabled) {                                                     /* Se o botão for clicável                 */
                const novoBotao = botao.cloneNode(true);                                        /* Clona para limpar listeners              */
                botao.parentNode.replaceChild(novoBotao, botao);                                /* Substitui pelo clone limpo              */

                /* BLOCO: Adiciona o evento de clique ao novo botão            */
                novoBotao.addEventListener('click', async () => {
                    const livroDestino    = novoBotao.dataset.livro;                            /* Obtém o livro de destino                 */
                    const capituloDestino = parseInt(novoBotao.dataset.capitulo);               /* Obtém o capítulo de destino              */
                    window.activeLivro    = livroDestino;                                       /* Atualiza referência global               */
                    window.activeCapitulo = capituloDestino;                                    /* Atualiza referência global               */
                    
                    /* BLOCO: Obtém a versão atual antes de carregar           */
                    const versaoAtual = window.BIBLE_VERSION || 
                                       (window.obterPreferencia && window.obterPreferencia('versaoBiblicaSelecionada', 'ara')) || 
                                       'ara';                                                   /* Identifica a bíblia ativa                */
                    console.log(`[Navegação] Carregando capítulo na versão: ${versaoAtual}`);   /* Loga a versão utilizada                  */
                    
                    await window.carregarCapituloModoLeitura(livroDestino, capituloDestino, versaoAtual); /* Carrega novo conteúdo */
                });
            }
        };

        configurarBotaoNavegacao('modoLeitura-capitulo-anterior');                              /* Ativa o botão anterior                   */
        configurarBotaoNavegacao('modoLeitura-capitulo-proximo');                               /* Ativa o botão próximo                    */
    };

    document.addEventListener('keydown', handleKeyNavigation);                                  /* Liga o monitor de teclado                */
    console.log('[Navegação Modo Leitura] Módulo corrigido carregado.');                        /* Loga o sucesso da carga                  */

})();