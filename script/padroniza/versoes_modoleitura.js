/*===============================================================================*/
/*                     MÓDULO DE GERENCIAMENTO DO MODO LEITURA                   */
/*===============================================================================*/
/*  Este script controla:                                                        */
/*                       - O estado (ativo/inativo) do modo leitura              */
/*                       - O carregamento e a exibição do conteúdo               */
/*                       - A transição da interface ao entrar/sair do modo       */
/*                       - A navegação contínua entre capítulos                  */
/*===============================================================================*/

/**
 * Módulo responsável pelo modo de leitura contínua da Bíblia
 * Permite visualização de capítulos completos sem distrações
 * Facilita a leitura sequencial e navegação entre capítulos
 */
(function() {
    'use strict';

    // ========================================================================
    // VARIÁVEIS DE ESTADO GLOBAL
    // ========================================================================
    
    window.modoLeituraAtivo = false;                    // Estado atual do modo leitura
    window.ultimoLivroSelecionado = null;               // Último livro acessado
    window.ultimoCapituloSelecionado = null;            // Último capítulo acessado
    window.ultimoVersiculoSelecionado = null;           // Último versículo acessado

    // ========================================================================
    // FUNÇÃO PRINCIPAL: CARREGAMENTO DE CAPÍTULO
    // ========================================================================
    
    /**
     * Carrega e exibe um capítulo completo no modo leitura
     * @param {string} livro - Nome do livro bíblico
     * @param {number} capitulo - Número do capítulo
     * @param {string} versaoEspecifica - Versão da Bíblia (opcional)
     */
    window.carregarCapituloModoLeitura = async function(livro, capitulo, versaoEspecifica) {
        const areaConteudoLeitura = document.querySelector('section.conteudo');
        
        // Validação da área de conteúdo
        if (!areaConteudoLeitura) {
            console.error('[Modo Leitura] Área de conteúdo não encontrada');
            return;
        }

        // Limpeza da interface anterior
        areaConteudoLeitura.querySelectorAll('.texto-versiculo, .conteudo-versiculos, div.versiculos:not(.conteudo-versiculos)')
            .forEach(el => el.remove());
        
        await window.atualizaBotoesCapitulos(livro, capitulo);

        // Criação ou localização do contêiner de leitura
        let conteinerLeitura = areaConteudoLeitura.querySelector('.modo-leitura-conteudo');
        if (!conteinerLeitura) {
            conteinerLeitura = document.createElement('div');
            conteinerLeitura.className = 'modo-leitura-conteudo';
            
            const elementoReferencia = areaConteudoLeitura.querySelector('#dynamic-chapter-buttons-conteiner') || 
                                     areaConteudoLeitura.querySelector('h2');
            
            if (elementoReferencia) {
                elementoReferencia.insertAdjacentElement('afterend', conteinerLeitura);
            } else {
                areaConteudoLeitura.appendChild(conteinerLeitura);
            }
        }

        // Exibição do indicador de carregamento
        conteinerLeitura.innerHTML = '<div class="loading-message">Carregando capítulo...</div>';
        conteinerLeitura.style.display = 'block';

        try {
            // Validação do parâmetro livro
            if (!livro) {
                throw new Error("Nome do livro é obrigatório");
            }
            
            // Configuração da versão bíblica
            const versoesQueUsamHtml = ['arc'];
            const versaoAtual = versaoEspecifica || 
                              window.BIBLE_VERSION || 
                              (window.obterPreferencia && window.obterPreferencia('versaoBiblicaSelecionada', 'ara')) || 
                              'ara';
            
            console.log(`[Modo Leitura] Carregando ${livro} ${capitulo} - versão: ${versaoAtual}`);
            
            const ehVersaoHtml = versoesQueUsamHtml.includes(versaoAtual.toLowerCase());
            const htmlBotoesNavegacao = await window.gerarHtmlNavegacao(livro, capitulo);
            let htmlParaExibir = '';
            let dadosCapitulo = window.obterCapítuloDoCache(livro, capitulo);
            
            if (ehVersaoHtml) {
                // ========================================================================
                // PROCESSAMENTO DE ARQUIVOS HTML
                // ========================================================================
                
                if (!dadosCapitulo) {
                    const caminho = `../versao/${versaoAtual.toLowerCase()}/${livro.toLowerCase()}/${capitulo}.html`;
                    const response = await fetch(caminho);
                    
                    if (!response.ok) {
                        throw new Error(`Arquivo HTML não encontrado: ${caminho}`);
                    }
                    
                    dadosCapitulo = await response.text();
                    window.cacheCapitulo(livro, capitulo, dadosCapitulo);
                }

                // Conversão de HTML string para DOM
                const doc = new DOMParser().parseFromString(dadosCapitulo, 'text/html');
                let htmlConstruido = '<div class="chapter-verses">';
                
                doc.querySelectorAll('div[id^="versiculo-"]').forEach(div => {
                    const match = div.id.match(/(\d+)$/);
                    
                    if (match) {
                        const numero = match[1];
                        const titulo = div.querySelector('strong');
                        
                        // Adição de título de seção se existir
                        if (titulo) {
                            htmlConstruido += `<h3 class="verse-section-title">${titulo.textContent.trim()}</h3>`;
                        }
                        
                        const clone = div.cloneNode(true);
                        if (clone.querySelector('strong')) {
                            clone.querySelector('strong').remove();
                        }
                        
                        const texto = clone.textContent.trim();
                        if (texto) {
                            htmlConstruido += `<div class="verse-conteiner">
                                                <sup class="verse-number">${numero}</sup>
                                                <span class="verse-text">${texto}</span>
                                              </div>`;
                        }
                    }
                });
                
                htmlConstruido += '</div>';
                htmlParaExibir = htmlConstruido;
                
            } else {
                // ========================================================================
                // PROCESSAMENTO DE ARQUIVOS JSON
                // ========================================================================
                
                if (!dadosCapitulo) {
                    const caminho = `../versao/${versaoAtual.toLowerCase()}/${livro.toLowerCase()}/${capitulo}.json`;
                    const response = await fetch(caminho);
                    
                    if (!response.ok) {
                        throw new Error(`Arquivo JSON não encontrado: ${caminho}`);
                    }
                    
                    dadosCapitulo = await response.json();
                    window.cacheCapitulo(livro, capitulo, dadosCapitulo);
                }

                // Construção do HTML a partir do JSON
                let htmlVersiculos = '<div class="chapter-verses">';
                
                if (dadosCapitulo.titulo) {
                    htmlVersiculos += `<h3 class="chapter-main-title">${dadosCapitulo.titulo}</h3>`;
                }
                
                const versiculos = Object.keys(dadosCapitulo.versiculos || {});
                
                for (let i = 1; i <= versiculos.length; i++) {
                    const chave = String(i);
                    
                    if (dadosCapitulo.versiculos[chave]) {
                        // Adição de títulos de seção
                        if (dadosCapitulo.titulos && dadosCapitulo.titulos[chave]) {
                            htmlVersiculos += `<h3 class="verse-section-title">${dadosCapitulo.titulos[chave]}</h3>`;
                        }
                        
                        // Construção do versículo
                        htmlVersiculos += `<div class="verse-conteiner">
                                            <sup class="verse-number">${i}</sup>
                                            <span class="verse-text">${dadosCapitulo.versiculos[chave]}</span>
                                          </div>`;
                    }
                }

                htmlVersiculos += '</div>';
                htmlParaExibir = htmlVersiculos;
            }

            // Injeção do conteúdo na interface
            conteinerLeitura.innerHTML = htmlBotoesNavegacao + htmlParaExibir;
            await window.configurarListenersNavegacao(conteinerLeitura, livro, capitulo);
            
            // Atualização do título da página
            const tituloH2 = areaConteudoLeitura.querySelector('h2');
            if (tituloH2 && typeof window.getLivroDisplayName === 'function') {
                tituloH2.textContent = `${window.getLivroDisplayName(livro)} - CAPÍTULO ${capitulo}`;
                Object.assign(tituloH2.style, {
                    color: '#f0ad4e',
                    textAlign: 'center',
                    marginBottom: '20px'
                });
            }
            
        } catch (erro) {
            // Tratamento de erros
            console.error('[Modo Leitura] Erro:', erro);
            conteinerLeitura.innerHTML = `
                <div class="error-conteiner" style="text-align:center; padding: 20px; color: red;">
                    <p><b>Erro ao carregar o capítulo</b></p>
                    <p><small>${erro.message}</small></p>
                </div>`;
        }
    };

    // ========================================================================
    // FUNÇÃO DE ALTERNÂNCIA DO MODO LEITURA
    // ========================================================================
    
    /**
     * Alterna entre modo leitura e modo padrão
     * @param {boolean} ativar - Se deve ativar ou desativar o modo leitura
     * @param {string} livro - Nome do livro (opcional)
     * @param {number} capitulo - Número do capítulo (opcional)
     */
    window.toggleReadingMode = async function(ativar, livro, capitulo) {
        window.modoLeituraAtivo = ativar;
        const botao = document.getElementById('modo-leitura');
        
        // Atualização visual do botão
        if (botao) {
            botao.classList.toggle('active', ativar);
            botao.setAttribute('aria-pressed', String(ativar));
        }

        const areaConteudo = document.querySelector('section.conteudo');
        if (!areaConteudo) {
            console.error("toggleReadingMode: section.conteudo não encontrada");
            return;
        }

        const tituloH2 = areaConteudo.querySelector('h2');
        
        if (ativar) {
            // ========================================================================
            // ATIVAÇÃO DO MODO LEITURA
            // ========================================================================
            
            document.body.classList.add('module-leitura');
            window.ultimoLivroSelecionado = window.activeLivro || livro;
            window.ultimoCapituloSelecionado = window.activeCapitulo || capitulo;
            
            // Preservação do versículo atual
            window.ultimoVersiculoSelecionado = (window.activeVersiculoButton && window.activeVersiculoButton.dataset.versiculo) 
                ? parseInt(window.activeVersiculoButton.dataset.versiculo) 
                : 1;
            
            // Limpeza da interface
            areaConteudo.querySelectorAll('.texto-versiculo, .conteudo-versiculos, #dynamic-chapter-buttons-conteiner, #dynamic-verse-buttons-conteiner')
                .forEach(el => el.remove());

            if (window.ultimoLivroSelecionado && window.ultimoCapituloSelecionado) {
                const versaoAtual = window.BIBLE_VERSION || 
                                  (window.obterPreferencia && window.obterPreferencia('versaoBiblicaSelecionada', 'ara')) || 
                                  'ara';
                
                console.log(`[Modo Leitura] Ativando com versão: ${versaoAtual}`);
                await window.carregarCapituloModoLeitura(window.ultimoLivroSelecionado, window.ultimoCapituloSelecionado, versaoAtual);
            } else {
                // Criação de contêiner para mensagem de instrução
                let conteinerLeitura = areaConteudo.querySelector('.modo-leitura-conteudo');
                if (!conteinerLeitura) {
                    conteinerLeitura = document.createElement('div');
                    conteinerLeitura.className = 'modo-leitura-conteudo';
                    
                    if (tituloH2) {
                        tituloH2.insertAdjacentElement('afterend', conteinerLeitura);
                    } else {
                        areaConteudo.appendChild(conteinerLeitura);
                    }
                }

                conteinerLeitura.innerHTML = `
                    <div class="reading-mode-message" style="text-align:center; padding: 20px;">
                        <p>Por favor, selecione um livro e capítulo primeiro.</p>
                    </div>`;
                conteinerLeitura.style.display = 'block';
                
                if (tituloH2) {
                    tituloH2.textContent = "Modo Leitura";
                }
            }
        } else {
            // ========================================================================
            // DESATIVAÇÃO DO MODO LEITURA
            // ========================================================================
            
            document.body.classList.remove('module-leitura');
            const conteinerLeitura = areaConteudo.querySelector('.modo-leitura-conteudo');
            if (conteinerLeitura) {
                conteinerLeitura.remove();
            }
            
            // Restauração da visualização padrão
            if (window.ultimoLivroSelecionado && window.ultimoCapituloSelecionado) {
                await window.atualizaBotoesCapitulos(window.ultimoLivroSelecionado, window.ultimoCapituloSelecionado);
                
                if (typeof window.toggleVersiculos === 'function') {
                    await window.toggleVersiculos(window.ultimoLivroSelecionado, window.ultimoCapituloSelecionado);
                }
                
                const versiculoParaCarregar = window.ultimoVersiculoSelecionado || 1;
                if (typeof window.loadSpecificVerse === 'function') {
                    await window.loadSpecificVerse(window.ultimoLivroSelecionado, window.ultimoCapituloSelecionado, versiculoParaCarregar);
                }
                
                // Restauração do título
                if (tituloH2 && typeof window.getLivroDisplayName === 'function') {
                    tituloH2.textContent = `${window.getLivroDisplayName(window.ultimoLivroSelecionado)} - CAPÍTULO ${window.ultimoCapituloSelecionado} - VERSÍCULO ${versiculoParaCarregar}`;
                    Object.assign(tituloH2.style, {
                        color: '',
                        textAlign: '',
                        marginBottom: ''
                    });
                }

                // Sincronização das variáveis globais
                window.activeLivro = window.ultimoLivroSelecionado;
                window.activeCapitulo = window.ultimoCapituloSelecionado;
            } else {
                // Reset para estado padrão
                const versao = window.obterPreferencia('versaoBiblicaSelecionada', 'ara');
                window.defineTituloPagina(versao);
                
                if (tituloH2) {
                    tituloH2.textContent = "Selecione um Livro";
                    Object.assign(tituloH2.style, {
                        color: '',
                        textAlign: '',
                        marginBottom: ''
                    });
                }
                
                areaConteudo.querySelectorAll('#dynamic-chapter-buttons-conteiner')
                    .forEach(c => c.remove());
            }
        }
    };

    console.log('[versoes_modoleitura.js] Módulo carregado e pronto');
})();