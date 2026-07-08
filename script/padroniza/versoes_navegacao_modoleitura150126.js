/*===============================================================================*/
/*                  MÓDULO DE NAVEGAÇÃO PARA O MODO DE LEITURA                   */
/*===============================================================================*/
/*  Este script controla:                                                        */
/*               - A criação dos botões de navegação de capítulos                */
/*                 - A navegação por setas do teclado (Esq/Dir)                  */
/*            - A lógica de clique para avançar/retroceder capítulos             */
/*===============================================================================*/

// Cria uma função anônima e a executa imediatamente (IIFE) para isolar o código.
(function() {
    'use strict';                                                                 // Ativa o modo estrito do JavaScript para ajudar a evitar erros comuns.

    // Este bloco cria a função de navegação por teclas (seta esquerda/direita) no modo de leitura.
    function handleKeyNavigation(evento) { 
        // Se o modo leitura não está ativo ou o usuário está digitando em um campo de texto, não faz nada
        if (!window.modoLeituraAtivo || (document.activeElement && /INPUT|TEXTAREA|true/.test(document.activeElement.tagName + document.activeElement.isContentEditable))) {
            return;                                                               // Interrompe a função se as condições não forem atendidas.
        }
        
        // Este bloco cria um objeto para mapear as teclas aos IDs dos botões.
        const acoes = {
            "ArrowLeft" : 'modoLeitura-capitulo-anterior',                        // Define que a seta para a esquerda corresponde ao botão 'anterior'.
            "ArrowRight": 'modoLeitura-capitulo-proximo'                          // Define que a seta para a direita corresponde ao botão 'próximo'.
        };
        
        // Este bloco busca no objeto o ID correspondente à tecla que foi pressionada.
        const idBotao = acoes[evento.key];
        if (idBotao) {                                                            // Verifica se a tecla pressionada é uma das mapeadas (esquerda ou direita).
            const botao = document.getElementById(idBotao);                       // Busca o elemento do botão na página usando o ID encontrado.
            if (botao && !botao.disabled) {                                       // Verifica se o botão existe e se ele não está desabilitado.
                evento.preventDefault();                                          // Impede a ação padrão do navegador para a tecla (ex: rolar a página).
                botao.click();                                                    // Simula um clique de mouse no botão, acionando sua função.
            }
        }
    }

   // Esta bloco cria a função AGORA APENAS que gera e retorna o HTML dos botões de navegação.
    window.gerarHtmlNavegacao = async function(livro, capitulo) {
        
        // Busca o capítulo anterior e o próximo (usando funções do script de navegação principal)
        const livroCapituloAnterior = await window.obterLivroCapituloAnterior(livro, capitulo);  // Aguarda a busca pelas informações do capítulo anterior.
        const proximoLivroCapitulo  = await window.obterProximoLivroECapitulo(livro, capitulo);  // Aguarda a busca pelas informações do próximo capítulo.
        let htmlBotoesNavegacao = '<div class="reading-mode-navigation">';        // Inicia a criação do texto HTML com um conteiner <div>.
        
        htmlBotoesNavegacao += livroCapituloAnterior ?                            // Usa um if-curto: se existe um capítulo anterior...
            `<button id="modoLeitura-capitulo-anterior" data-livro="${livroCapituloAnterior.livro}" data-capitulo="${livroCapituloAnterior.capitulo}">Cap. Anterior</button>` :  // ...cria um botão habilitado.
            `<button id="modoLeitura-capitulo-anterior" disabled>Cap. Anterior</button>`;  // Senão, cria um botão desabilitado.

        htmlBotoesNavegacao += proximoLivroCapitulo ?                             // Usa um if-curto: se existe um próximo capítulo...
            `<button id="modoLeitura-capitulo-proximo" data-livro="${proximoLivroCapitulo.livro}" data-capitulo="${proximoLivroCapitulo.capitulo}">Cap. Próximo</button>` :  // ...cria um botão habilitado.
            `<button id="modoLeitura-capitulo-proximo" disabled>Cap. Próximo</button>`;  // Senão, cria um botão desabilitado.
            
        htmlBotoesNavegacao += '</div>';                                          // Fecha o conteiner <div> no texto HTML.
        
        return htmlBotoesNavegacao;                                               // Retorna a string HTML completa com os botões.
    };

    // Este bloco cria uma nova função para configurar os event listeners NOS BOTÕES QUE JÁ ESTÃO NO DOM. */
    window.configurarListenersNavegacao = async function(conteinerLeitura, livro, capitulo) {
        const configurarBotaoNavegacao = (id) => {                                // Cria uma função interna para evitar a repetição de código.
            const botao = conteinerLeitura.querySelector(`#${id}`);               // Busca o botão pelo seu ID dentro do conteiner de leitura.
            if (botao && !botao.disabled) {                                       // Verifica se o botão foi encontrado e se não está desabilitado.
                const novoBotao = botao.cloneNode(true);                          // Cria uma cópia exata do botão para limpar eventos antigos.
                botao.parentNode.replaceChild(novoBotao, botao);                  // Substitui o botão original pela sua cópia limpa.

                // Este bloco adiciona o evento de clique ao novo botão.
                novoBotao.addEventListener('click', async () => {
                    const livroDestino    = novoBotao.dataset.livro;              // Pega o nome do livro de destino do atributo 'data-livro' do botão.
                    const capituloDestino = parseInt(novoBotao.dataset.capitulo); // Pega o número do capítulo de destino do atributo 'data-capitulo'.
                    window.activeLivro    = livroDestino;                         // Atualiza a variável global que armazena o livro ativo.
                    window.activeCapitulo = capituloDestino;                      // Atualiza a variável global que armazena o capítulo ativo.
                    
                    // OBTER A VERSÃO ATUAL ANTES DE CARREGAR
                    const versaoAtual = window.BIBLE_VERSION || 
                                       (window.obterPreferencia && window.obterPreferencia('versaoBiblicaSelecionada', 'ara')) || 
                                       'ara';
                    console.log(`[Navegação] Carregando capítulo na versão: ${versaoAtual}`);
                    
                    await window.carregarCapituloModoLeitura(livroDestino, capituloDestino, versaoAtual);
                });
            }
        };

        configurarBotaoNavegacao('modoLeitura-capitulo-anterior');                // Configura o evento para o botão de capítulo anterior.
        configurarBotaoNavegacao('modoLeitura-capitulo-proximo');                 // Configura o evento para o botão de próximo capítulo.
    };

    document.addEventListener('keydown', handleKeyNavigation);                    // Adiciona um "ouvinte" global que aciona 'handleKeyNavigation' a cada tecla pressionada.
    console.log('[Navegação Modo Leitura] Módulo corrigido carregado.');          // Exibe uma mensagem no console para confirmar que este script foi carregado.

})();
