/*===============================================================================*/
/*                    MÓDULO DE GERENCIAMENTO DO MODO LEITURA                    */
/*===============================================================================*/
/*  Este script controla:                                                        */
/*                  - O estado (ativo/inativo) do modo leitura                   */
/*                   - O carregamento e a exibição do conteúdo                   */
/*               - A transição da interface ao entrar/sair do modo               */
/*                    - A navegação contínua entre capítulos                     */
/*===============================================================================*/

// Este bloco cria uma função anônima e a executa imediatamente para isolar o código.
(function() {
    'use strict';                                                                 // Ativa o modo estrito do JavaScript para ajudar a evitar erros comuns.

    // Este bloco define as variáveis globais que guardam o estado do módulo.
    window.modoLeituraAtivo = false;                                              // Define uma variável global para controlar se o modo leitura está ativo (inicia como falso).
    window.ultimoLivroSelecionado = null;                                         // Define uma variável global para guardar o último livro selecionado (inicia como nulo).
    window.ultimoCapituloSelecionado = null;                                      // Define uma variável global para guardar o último capítulo selecionado (inicia como nulo).
    window.ultimoVersiculoSelecionado = null;                                     // Define uma variável global para guardar o último versículo selecionado (inicia como nulo).

    // Este bloco define a função principal que carrega e exibe o conteúdo do capítulo.
    window.carregarCapituloModoLeitura = async function(livro, capitulo, versaoEspecifica) { 
        const areaConteudoLeitura = document.querySelector('section.conteudo');   // Busca na página o elemento principal onde o conteúdo será exibido.
        if (!areaConteudoLeitura) {                                               // Verifica se a área de conteúdo foi encontrada.
            console.error('[Modo Leitura] A área de conteúdo principal não foi encontrada.');  // Exibe um erro no console se a área não for encontrada.
            return;                                                               // Interrompe a execução da função se a área de conteúdo não existir.
        }

        // Busca e remove elementos da interface antiga para limpar a tela.
        areaConteudoLeitura.querySelectorAll('.texto-versiculo, .conteudo-versiculos, div.versiculos:not(.conteudo-versiculos)').forEach(el => el.remove());
        
        await window.atualizaBotoesCapitulos(livro, capitulo);                    // Aguarda a atualização da barra de botões de capítulo.

        // Este bloco verifica se o conteiner de leitura existe e, caso contrário, o cria e o insere na página.
        let conteinerLeitura = areaConteudoLeitura.querySelector('.modo-leitura-conteudo');  // Busca o conteiner específico para o conteúdo do modo leitura.
        if (!conteinerLeitura) {                                                  // Se o conteiner não existe, este bloco o cria.
            conteinerLeitura = document.createElement('div');                     // Cria um novo elemento <div> na memória.
            conteinerLeitura.className = 'modo-leitura-conteudo';                 // Define a classe CSS do novo conteiner.
             // Encontra um ponto de referência para inserir o conteiner.
            const elementoReferencia = areaConteudoLeitura.querySelector('#dynamic-chapter-buttons-conteiner') || areaConteudoLeitura.querySelector('h2'); 
            if (elementoReferencia) elementoReferencia.insertAdjacentElement('afterend', conteinerLeitura);  // Insere o conteiner após o elemento de referência.
            else areaConteudoLeitura.appendChild(conteinerLeitura);               // Se não houver referência, insere no final da área de conteúdo.
        }

        conteinerLeitura.innerHTML = '<div class="loading-message">Carregando capítulo...</div>';  // Exibe a mensagem 'Carregando...' para o usuário enquanto o conteúdo é buscado.
        conteinerLeitura.style.display = 'block';                                 // Garante que o conteiner de leitura esteja visível.

        // Este bloco inicia a tentativa de carregar e processar os dados do capítulo.
        try {                                                                     // Inicia um bloco de 'tentativa', para capturar possíveis erros de download.
            if (!livro) {                                                         // Verifica se o nome do livro foi fornecido.
                throw new Error("O nome do livro não pode ser nulo.");            // Lança um erro se o livro for nulo, interrompendo a execução.
            }
            
            // Este bloco determina a versão e o formato do arquivo (HTML ou JSON) a ser carregado.
            const versoesQueUsamHtml = ['arc'];                                   // Define uma lista de versões que usam o formato de arquivo HTML.
            
            // USAR A VERSÃO ESPECIFICADA OU OBTER A VERSÃO ATUAL
            const versaoAtual = versaoEspecifica || 
                               window.BIBLE_VERSION || 
                               (window.obterPreferencia && window.obterPreferencia('versaoBiblicaSelecionada', 'ara')) || 
                               'ara';
            
            console.log(`[Modo Leitura] Carregando ${livro} ${capitulo} na versão: ${versaoAtual}`);
            
            const ehVersaoHtml = versoesQueUsamHtml.includes(versaoAtual.toLowerCase());  // Verifica se a versão atual da Bíblia é uma das que usam HTML.
            const htmlBotoesNavegacao = await window.gerarHtmlNavegacao(livro, capitulo);  // Chama a função que gera o HTML dos botões 'Anterior' e 'Próximo'.
            let htmlParaExibir = '';                                              // Inicia uma variável vazia que guardará o HTML do conteúdo.
            let dadosCapitulo = window.obterCapítuloDoCache(livro, capitulo);     // Tenta buscar os dados do capítulo no cache (memória) para ser mais rápido.

            // Este bloco executa a lógica para carregar e processar versões em formato HTML.
            if (ehVersaoHtml) {                                                   // Inicia o bloco de lógica para as versões em formato HTML.
                if (!dadosCapitulo) {                                             // Se não estava no cache...
                    const caminho = `../versao/${versaoAtual.toLowerCase()}/${livro.toLowerCase()}/${capitulo}.html`;  // Monta o caminho do arquivo HTML.
                    const response = await fetch(caminho);                        // Faz o download do arquivo.
                    if (!response.ok) throw new Error(`Arquivo HTML não encontrado: ${caminho}`);  // Se o arquivo não for encontrado, lança um erro.
                    dadosCapitulo = await response.text();                        // Converte a resposta do download para texto.
                    window.cacheCapitulo(livro, capitulo, dadosCapitulo);         // Salva os dados no cache para uso futuro.
                }

                // Este bloco analisa o texto HTML e constrói o conteúdo dos versículos.
                const doc = new DOMParser().parseFromString(dadosCapitulo, 'text/html');  // Usa o DOMParser para transformar o texto HTML em um documento manipulável.
                let htmlConstruido = '<div class="chapter-verses">';              // Inicia a string que montará o HTML dos versículos.
                doc.querySelectorAll('div[id^="versiculo-"]').forEach(div => {    // Percorre cada 'div' de versículo dentro do HTML baixado.
                    const match = div.id.match(/(\d+)$/);                         // Extrai o número do versículo a partir do ID da div.
                    if (match) {                                                  // Se encontrou um número de versículo...
                        const numero = match[1];                                  // Armazena o número do versículo.
                        const titulo = div.querySelector('strong');               // Procura por um título de seção (tag <strong>).
                        if (titulo) htmlConstruido += `<h3 class="verse-section-title">${titulo.textContent.trim()}</h3>`;  // Se houver título, adiciona ao HTML.
                        const clone = div.cloneNode(true);                        // Cria uma cópia da div para manipular sem alterar a original.
                        if (clone.querySelector('strong')) clone.querySelector('strong').remove();  // Remove o título da cópia para não repetir o texto.
                        const texto = clone.textContent.trim();                   // Pega o texto limpo do versículo.
                        // Monta e adiciona o HTML do versículo.
                        if (texto) htmlConstruido += `<div class="verse-conteiner"><sup class="verse-number">${numero}</sup><span class="verse-text">${texto}</span></div>`;
                    }
                });
                
                htmlConstruido += '</div>';                                       // Fecha a div principal dos versículos.
                htmlParaExibir = htmlConstruido;                                  // Define o HTML final a ser exibido.
            
            // Este bloco executa a lógica para carregar e processar versões em formato JSON.
            } else {                                                              // Inicia o bloco de lógica para as versões em formato JSON.
                if (!dadosCapitulo) {                                             // Se não estava no cache...
                    const caminho = `../versao/${versaoAtual.toLowerCase()}/${livro.toLowerCase()}/${capitulo}.json`;  // Monta o caminho do arquivo JSON.
                    const response = await fetch(caminho);                        // Faz o download do arquivo.
                    if (!response.ok) throw new Error(`Arquivo JSON não encontrado: ${caminho}`);  // Se o arquivo não for encontrado, lança um erro.
                    dadosCapitulo = await response.json();                        // Converte a resposta do download para um objeto JSON.
                    window.cacheCapitulo(livro, capitulo, dadosCapitulo);         // Salva os dados no cache para uso futuro.
                }

                // Este bloco constrói o HTML dos versículos a partir dos dados JSON.
                let htmlVersiculos = '<div class="chapter-verses">';              // Inicia a string que montará o HTML dos versículos.
                if (dadosCapitulo.titulo) htmlVersiculos += `<h3 class="chapter-main-title">${dadosCapitulo.titulo}</h3>`;  // Se o capítulo tiver um título principal, o adiciona.
                const versiculos = Object.keys(dadosCapitulo.versiculos || {});   // Pega a lista de números de versículos.
                for (let i = 1; i <= versiculos.length; i++) {                    // Percorre todos os versículos em ordem.
                    const chave = String(i);                                      // Converte o número do laço para uma string de chave.
                    if (dadosCapitulo.versiculos[chave]) {                        // Verifica se o versículo existe.
                        // Adiciona títulos de seção, se existirem.
                        if (dadosCapitulo.titulos && dadosCapitulo.titulos[chave]) htmlVersiculos += `<h3 class="verse-section-title">${dadosCapitulo.titulos[chave]}</h3>`;
                        // Monta e adiciona o HTML do versículo.
                        htmlVersiculos += `<div class="verse-conteiner"><sup class="verse-number">${i}</sup><span class="verse-text">${dadosCapitulo.versiculos[chave]}</span></div>`;
                    }
                }

                htmlVersiculos += '</div>';                                       // Fecha a div principal dos versículos.
                htmlParaExibir = htmlVersiculos;                                  // Define o HTML final a ser exibido.
            }

            conteinerLeitura.innerHTML = htmlBotoesNavegacao + htmlParaExibir;    // Junta o HTML dos botões com o HTML dos versículos e insere na página.
            await window.configurarListenersNavegacao(conteinerLeitura, livro, capitulo);  // Chama a função que ativa os cliques nos botões 'Anterior' e 'Próximo'.
            const tituloH2 = areaConteudoLeitura.querySelector('h2');             // Busca o elemento do título principal (H2) para atualizá-lo.
            if (tituloH2 && typeof window.getLivroDisplayName === 'function') {   // Se o título e a função de nome existem...
                tituloH2.textContent = `${window.getLivroDisplayName(livro)} - CAPÍTULO ${capitulo}`;  // Atualiza o texto do título.
                Object.assign(tituloH2.style, { color: '#f0ad4e', textAlign: 'center', marginBottom: '20px' });  // Aplica estilos CSS diretamente no título.
            }
        } catch (erro) {                                                          // Se qualquer coisa deu errado no bloco 'try', este bloco é executado.
            console.error('[Modo Leitura] Erro:', erro);                          // Exibe o erro técnico no console para depuração.
            
            // Exibe uma mensagem de erro clara para o usuário dentro do conteiner.
            conteinerLeitura.innerHTML = `<div class="error-conteiner" style="text-align:center; padding: 20px; color: red;">    
                                            <p><b>Erro ao carregar o capítulo.</b></p>
                                            <p><small>${erro.message}</small></p>
                                        </div>`;
        }
    };

    // Este bloco define a função que controla a ativação e desativação do modo leitura.
    window.toggleReadingMode = async function(ativar, livro, capitulo) {
        window.modoLeituraAtivo = ativar;                                         // Atualiza a variável de estado global para refletir o novo modo.
        const botao = document.getElementById('modo-leitura');                    // Busca o botão que ativa/desativa o modo leitura.
        if (botao) {                                                              // Se o botão existir...
            botao.classList.toggle('active', ativar);                             // Adiciona ou remove a classe 'active' para mudar a aparência do botão.
            botao.setAttribute('aria-pressed', String(ativar));                   // Atualiza o atributo de acessibilidade para leitores de tela.
        }

        const areaConteudo = document.querySelector('section.conteudo');          // Busca novamente a área de conteúdo principal.
        if (!areaConteudo) {                                                      // Se não for encontrada...
            console.error("toggleReadingMode: section.conteudo não encontrada."); // Exibe um erro.
            return;                                                               // E interrompe a função.
        }

        const tituloH2 = areaConteudo.querySelector('h2');                        // Busca o elemento de título H2.

        // Este bloco executa a lógica para ATIVAR o modo leitura.
        if (ativar) {                                                             // Inicia a lógica que será executada ao ATIVAR o modo leitura.
            document.body.classList.add('module-leitura');                        // Adiciona uma classe ao corpo da página para aplicar estilos CSS do modo leitura.
            window.ultimoLivroSelecionado = window.activeLivro || livro;          // Salva o livro atual para poder restaurá-lo depois.
            window.ultimoCapituloSelecionado = window.activeCapitulo || capitulo; // Salva o capítulo atual.
            // Salva o versículo atual.
            window.ultimoVersiculoSelecionado = (window.activeVersiculoButton && window.activeVersiculoButton.dataset.versiculo) ? parseInt(window.activeVersiculoButton.dataset.versiculo) : 1;
            
            areaConteudo.querySelectorAll(                                        // Busca todos os elementos da interface do modo padrão...
                '.texto-versiculo, .conteudo-versiculos, #dynamic-chapter-buttons-conteiner, #dynamic-verse-buttons-conteiner'
            ).forEach(el => el.remove());                                         // Remove para limpar a tela.

            if (window.ultimoLivroSelecionado && window.ultimoCapituloSelecionado) {  // Se houver um livro e capítulo selecionados...
                // OBTER A VERSÃO ATUAL PARA PASSAR AO MODO LEITURA
                const versaoAtual = window.BIBLE_VERSION || 
                                   (window.obterPreferencia && window.obterPreferencia('versaoBiblicaSelecionada', 'ara')) || 
                                   'ara';
                console.log(`[Modo Leitura] Ativando com versão: ${versaoAtual}`);
                await window.carregarCapituloModoLeitura(window.ultimoLivroSelecionado, window.ultimoCapituloSelecionado, versaoAtual);
            } else {                                                              // Se não, exibe uma mensagem de ajuda.
                let conteinerLeitura = areaConteudo.querySelector('.modo-leitura-conteudo');  // Busca ou cria o conteiner de leitura.
                if (!conteinerLeitura) {                                          // Se não existe, cria.
                    conteinerLeitura = document.createElement('div');             // Cria o elemento.
                    conteinerLeitura.className = 'modo-leitura-conteudo';         // Define a classe.
                    if (tituloH2) tituloH2.insertAdjacentElement('afterend', conteinerLeitura);  // Insere após o título.
                    else areaConteudo.appendChild(conteinerLeitura);              // Ou insere no final.
                }

                // Exibe a mensagem de ajuda.
                conteinerLeitura.innerHTML = '<div class="reading-mode-message" style="text-align:center; padding: 20px;"><p>Por favor, selecione um livro e capítulo primeiro.</p></div>';
                conteinerLeitura.style.display = 'block';                         // Garante que o conteiner esteja visível.
                if (tituloH2) tituloH2.textContent = "Modo Leitura";              // Atualiza o título da página.
            }
        } else {

            // Este bloco executa a lógica para DESATIVAR o modo leitura e restaurar a interface padrão.
            document.body.classList.remove('module-leitura');                     // Remove a classe de modo leitura para reverter os estilos CSS.
            const conteinerLeitura = areaConteudo.querySelector('.modo-leitura-conteudo');  // Busca o conteiner de conteúdo do modo leitura.
            if (conteinerLeitura) conteinerLeitura.remove();                      // Se existir, o remove.
            if (window.ultimoLivroSelecionado && window.ultimoCapituloSelecionado) {  // Se um estado anterior foi salvo...
                await window.atualizaBotoesCapitulos(window.ultimoLivroSelecionado, window.ultimoCapituloSelecionado);  // Restaura os botões de capítulo.
                if (typeof window.toggleVersiculos === 'function') {              // Se a função de botões de versículo existe...
                    await window.toggleVersiculos(window.ultimoLivroSelecionado, window.ultimoCapituloSelecionado);  // Chama para restaurar os botões de versículo.
                }

                let versiculoParaCarregar = window.ultimoVersiculoSelecionado || 1;  // Define qual versículo será carregado.
                if (typeof window.loadSpecificVerse === 'function') {             // Se a função de carregar versículo existe...
                    await window.loadSpecificVerse(window.ultimoLivroSelecionado, window.ultimoCapituloSelecionado, versiculoParaCarregar);  // Chama para exibir o versículo.
                }

                if (tituloH2 && typeof window.getLivroDisplayName === 'function') {  // Se o título e a função de nome existem...
                    tituloH2.textContent = `${window.getLivroDisplayName(window.ultimoLivroSelecionado)}
                     - CAPÍTULO ${window.ultimoCapituloSelecionado} - VERSÍCULO ${versiculoParaCarregar}`;  // Restaura o texto do título.
                    Object.assign(tituloH2.style, { color: '', textAlign: '', marginBottom: '' });  // Remove os estilos CSS aplicados anteriormente.
                }

                window.activeLivro = window.ultimoLivroSelecionado;               // Restaura a variável de livro ativo.
                window.activeCapitulo = window.ultimoCapituloSelecionado;         // Restaura a variável de capítulo ativo.

            } else {

                // Este bloco restaura a interface para o estado inicial, caso não haja um estado anterior salvo.
                const versao = window.obterPreferencia('versaoBiblicaSelecionada', 'ara');  // Pega a versão atual da Bíblia.
                window.defineTituloPagina(versao);                                // Restaura o título padrão da página.
                if (tituloH2) {                                                   // Se o H2 existe...
                    tituloH2.textContent = "Selecione um Livro";                  // Define o texto padrão.
                    Object.assign(tituloH2.style, { color: '', textAlign: '', marginBottom: '' });  // Remove os estilos.
                }

                areaConteudo.querySelectorAll('#dynamic-chapter-buttons-conteiner').forEach(c => c.remove());  // Remove qualquer contêiner de botões de capítulo para limpar a interface.
            }
        }
    };

    console.log('[versoes_modoleitura.js] Módulo carregado e pronto.');           // Exibe uma mensagem no console para confirmar que este script foi carregado.
})();
