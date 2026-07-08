/*===============================================================================*/
/*                     MÓDULO DE GERENCIAMENTO DE VERSÍCULOS                     */
/*===============================================================================*/
/*       Responsável por:                                                        */
/*                       - Carregar versículos individuais                       */
/*                 - Criar botões de navegação entre versículos                  */
/*                   - Gerenciar o destaque do versículo ativo                   */
/*===============================================================================*/

/* BLOCO: Classe de gestão de versículos                                         */
class VersiculosManager {                                                         // Inicia a classe de gestão
    constructor() {                                                               // Método de inicialização
        this.versiculoAtivo = null;                                               // Guarda o versículo atual
    }

    /* BLOCO: Método assíncrono para carregar e exibir um versículo específico */
    async carregarVersiculo(livro, capitulo, versiculo) {                         // Inicia a carga do texto
        console.log(`[VersiculosManager] Carregando: ${livro} ${capitulo}:${versiculo}`);  // Registra log no console
        window.ultimoVersiculoSelecionado = versiculo;                            // Salva na memória global
        const areaConteudo = document.querySelector('section.conteudo');       
        /* Captura a seção do site              */
        /* BLOCO: Validação de existência do conteiner principal               */
        if (!areaConteudo) {                                                      // Verifica se a seção existe
            console.error("[VersiculosManager] Seção não encontrada.");           // Loga erro de interface
            return;                                                               // Aborta a função
        }

        /* BLOCO: Remove qualquer display de versículo específico anterior     */
        const existingSpecificVerseDiv = areaConteudo.querySelector('.texto-versiculo');  // Busca texto na tela
        if (existingSpecificVerseDiv) {                                           // Se encontrar texto antigo
            existingSpecificVerseDiv.remove();                                    // Limpa para o novo texto
        }

        /* BLOCO: Delega o carregamento e a renderização ao script da versão   */
        if (typeof window.loadSpecificVerse === 'function') {                     // Verifica função ativa
            console.log(`[VersiculosManager] Chamando window.loadSpecificVerse...`);  // Loga ação no sistema
            await window.loadSpecificVerse(livro, capitulo, versiculo);           // Carrega versão específica
        } else {                                                                  // Caso não haja função
            
            /* BLOCO: Ativação do sistema de fallback genérico                 */
            console.error("[VersiculosManager] Fallback genérico ativado.");      // Loga aviso de segurança

            /* BLOCO: Fallback genérico para versões sem função específica     */
            try {                                                                 // Inicia tentativa JSON
                const versao = localStorage.getItem('versaoBiblicaSelecionada') || 'ara';  // Pega versão do navegador
                const url = `../versao/${versao}/${livro}/${capitulo}.json`;      // Monta endereço do arquivo
                const resposta = await fetch(url);                                // Baixa arquivo do servidor

                /* BLOCO: Verificação de integridade da resposta HTTP          */
                if (!resposta.ok) throw new Error(`Falha HTTP: ${resposta.status}`);  // Trata erro de conexão
                const dados = await resposta.json();                              // Converte em dados

                /* BLOCO: Processamento e extração do texto do versículo       */
                const chapterData = Array.isArray(dados) ? dados[0] : dados;      // Organiza dados do capítulo
                const verseText = chapterData.versiculos?.[versiculo];            // Extrai o texto alvo

                /* BLOCO: Seleção do conteiner e limpeza de displays anteriores*/
                const conteiner = areaConteudo.querySelector('.conteudo-versiculos') || this._criarConteinerVersiculos(areaConteudo);
                const existingGenericVerseDisplay = conteiner.querySelector('.versiculo-ativo');  // Busca texto genérico

                /* BLOCO: Limpeza de displays genéricos pré-existentes         */
                if (existingGenericVerseDisplay) {                                // Se texto genérico existir
                    existingGenericVerseDisplay.remove();                         // Limpa a tela
                }

                /* BLOCO: Renderização do texto ou aviso de erro no fallback   */
                if (verseText) {                                                  // Se texto existe
                    const verseDiv = document.createElement('div');               // Cria caixa do versículo
                    verseDiv.classList.add('versiculo-ativo');                    // Estiliza caixa ativa
                    verseDiv.innerHTML = `<sup>${versiculo}</sup><span>${verseText}</span>`;  // Insere número e texto
                    conteiner.appendChild(verseDiv);                              // Fixa na página final
                } else {                                                          // Se texto não existe
                
                    /* BLOCO: Tratamento visual para versículo não localizado  */
                    const verseDiv = document.createElement('div');               // Cria caixa de erro
                    verseDiv.classList.add('versiculo-ativo');                    // Estiliza erro visual
                    verseDiv.innerHTML = `<p>Versículo não encontrado.</p>`;      // Mensagem de falta
                    conteiner.appendChild(verseDiv);                              // Mostra aviso ao leitor
                }

            } catch (erro) {                                                      // Trata falha crítica

                /* BLOCO: Gerenciamento de falhas críticas na carga            */
                console.error(`[VersiculosManager] Erro no fallback:`, erro);     // Loga erro detalhado
                const conteiner = areaConteudo.querySelector('.conteudo-versiculos') || this._criarConteinerVersiculos(areaConteudo);
                const existingDisplay = conteiner.querySelector('.versiculo-ativo');  // Busca texto anterior
                
                /* BLOCO: Limpeza e exibição de alerta visual de falha na carga*/
                if (existingDisplay) { existingDisplay.remove(); }                // Limpa no erro
                const verseDiv = document.createElement('div');                   // Cria bloco de erro
                verseDiv.classList.add('versiculo-ativo');                        // Estiliza erro visual
                verseDiv.innerHTML = `<p style="color:red;">Falha na carga.</p>`; // Texto de alerta
                conteiner.appendChild(verseDiv);                                  // Mostra erro na tela
            }
        }

        /* BLOCO: Atualiza o título principal H2 da página                     */
        const tituloH2 = areaConteudo.querySelector('h2');                        // Captura o título H2
        
        /* BLOCO: Verificação de regras para atualização do título             */
        if (tituloH2 && window.BIBLE_VERSION !== 'original') {                    // Vê se deve mudar título
        
            /* BLOCO: Formatação dinâmica do título com sufixo de versão       */
            if (typeof window.getLivroDisplayName === 'function') {               // Se há tradutor de nomes
                let suffix = (window.NOME_VERSAO_COMPLETA_BIBLIA) ? ` (${window.NOME_VERSAO_COMPLETA_BIBLIA})` : '';
                tituloH2.textContent = `${window.getLivroDisplayName(livro)} ${capitulo}:${versiculo}${suffix}`;
            } else {                                                              // Se não há tradutor
                tituloH2.textContent = `${livro.toUpperCase()} ${capitulo}:${versiculo}`;  // Usa ID do livro puro
            }
        }

        /* BLOCO: Gerencia o estado ativo dos botões de versículo               */
        const conteinerBotoesVersiculos = areaConteudo.querySelector('.conteudo-versiculos');  // Acha lista numérica
        if (conteinerBotoesVersiculos) {                                          // Se a lista existir
            this.versiculoAtivo = versiculo;                                      // Atualiza estado interno
            this._atualizarBotoesVersiculos(conteinerBotoesVersiculos, versiculo);  // Destaca botão clicado
        } else {                                                                  // Se não achar lista
            console.warn("[VersiculosManager] Botões não encontrados.");          // Avisa no console
        }
    }

    /* BLOCO: Função que cria os botões de navegação para cada versículo       */
    criarBotoesVersiculos(livro, capitulo, totalVersiculos) {                     // Inicia régua numérica
        const existingConteiner = document.querySelector('.conteudo-versiculos'); // Procura régua velha
        if (existingConteiner) existingConteiner.remove();                        // Apaga régua anterior
        const conteiner = document.createElement('div');                          // Cria caixa da régua
        conteiner.className = 'conteudo-versiculos';                              // Estiliza a régua

        /* BLOCO: Laço de repetição que vai de 1 até o total de versículos      */
        for (let i = 1; i <= totalVersiculos; i++) {                              // Inicia contagem
            
            /* BLOCO: Configuração individual de cada botão numérico           */
            const botao = document.createElement('button');                       // Cria botão numérico
            botao.className = 'botao-versiculo';                                  // Define estilo CSS
            botao.dataset.versiculo = i;                                          // Vincula número ao dado
            botao.textContent = i;                                                // Mostra número no botão
            botao.addEventListener('click', async () => {                         // Ouve o clique
                await this.carregarVersiculo(livro, capitulo, i);                 // Carrega o texto
            });

            conteiner.appendChild(botao);                                         // Adiciona à régua
        }
        return conteiner;                                                         // Entrega régua pronta
    }

    /* BLOCO: Função interna para criar um conteiner de versículos             */
    _criarConteinerVersiculos(areaConteudo) {                                     // Cria local de texto
        let conteiner = areaConteudo.querySelector('.conteudo-versiculos');       // Busca local no site
        if (conteiner) return conteiner;                                          // Se existe, reutiliza

        /* BLOCO: Criação física do elemento no DOM                             */
        conteiner = document.createElement('div');                                // Cria novo elemento
        conteiner.className = 'conteudo-versiculos';                              // Estiliza o local
        areaConteudo.appendChild(conteiner);                                      // Fixa no conteúdo
        return conteiner;                                                         // Retorna local criado
    }

    /* BLOCO: Função interna para atualizar o estilo dos botões                */
    _atualizarBotoesVersiculos(conteiner, versiculoAtivo) {                       // Inicia destaque visual
        
        /* BLOCO: Iteração para alternância da classe ativa                    */
        conteiner.querySelectorAll('.botao-versiculo').forEach(botao => {         // Varre botões numéricos
            botao.classList.toggle('active', parseInt(botao.dataset.versiculo) === parseInt(versiculoAtivo));  // Ativa botão
        });
    }
}

/* BLOCO: Criação da instância global do gerenciador para uso externo            */
const versiculosManager = new VersiculosManager();                                // Cria instância global
