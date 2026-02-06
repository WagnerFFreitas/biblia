/*===============================================================================*/
/*            SCRIPT ESPECÍFICO PARA ARC (Almeida Revista e Corrigida)           */
/*===============================================================================*/
/*  Este arquivo contém:                                                         */
/*                    - Funções para carregar e exibir versículos da versão ARC  */
/*                    - Manipulação de títulos e modo de leitura                 */
/*===============================================================================*/

window.BIBLE_VERSION = 'arc';                                                              // Identificador da versão ARC
window.NOME_VERSAO_COMPLETA_BIBLIA = 'Almeida Revista e Corrigida';                                      // Nome completo da tradução
console.log(`[${window.BIBLE_VERSION}.js] Script carregado. Definindo funções específicas para ARC.`);       // Log de inicialização

window.getSpecificVerseCount = function(livro, capitulo) {                                 // Função para contar versículos
    return window.getVerseCount(livro, capitulo);                                                            // Delega para função global
};

window.loadSpecificVerse = async function(livro, capitulo, versiculo) {                    // Função principal de carregamento HTML
    console.log(`[ARC HTML] Carregando: ${livro} ${capitulo}:${versiculo}`);                                 // Log do versículo sendo carregado
    
    const content = document.querySelector('.conteudo');                                                     // Localiza área de conteúdo
    if (!content) {                                                                                          // Validação da área de conteúdo
        console.error("[ARC HTML] Elemento .conteudo não encontrado.");                                      // Log de erro
        return;                                                                                              // Interrompe execução
    }

    const existingVersiculoDiv = content.querySelector('.texto-versiculo');                                  // Busca versículo anterior
    if (existingVersiculoDiv) {                                                                              // Se existe versículo anterior
        existingVersiculoDiv.remove();                                                                       // Remove da interface
    }

    const versiculoElementDiv = document.createElement('div');                                               // Cria contêiner do versículo
    versiculoElementDiv.classList.add('versiculo', 'texto-versiculo');                                       // Aplica classes CSS
    
    if (document.body.classList.contains('module-leitura')) {                                                // Verifica modo leitura
        versiculoElementDiv.classList.add('modo-leitura');                                                   // Aplica estilo de leitura
    }

    try {                                                                                 // Inicia tratamento de erro
        const chapterHtmlPath = `../versao/${window.BIBLE_VERSION}/${livro}/${capitulo}.html`;               // Define caminho do arquivo HTML
        const response = await fetch(chapterHtmlPath);                                                       // Requisita arquivo HTML
        if (!response.ok) {                                                                                  // Valida resposta HTTP
            throw new Error(`HTTP ${response.status} ao buscar HTML para ${livro} ${capitulo} de ${chapterHtmlPath}`); // Lança erro de requisição
        }
        const htmlString = await response.text();                                                            // Converte resposta em texto HTML
        const parser = new DOMParser();                                                                      // Cria parser DOM
        const doc = parser.parseFromString(htmlString, 'text/html');                                         // Converte HTML em documento DOM
        const versiculoNode = doc.querySelector(`div#versiculo-${versiculo}`);                               // Busca elemento do versículo

        if (versiculoNode) {                                                                                 // Se versículo encontrado
            const tituloStrongElement = versiculoNode.querySelector('strong');                               // Busca elemento de título
            if (tituloStrongElement) {                                                                       // Se existe título
                const tituloInternoH3 = document.createElement('h3');                                        // Cria elemento de título
                tituloInternoH3.classList.add('titulo-versiculo-interno');                                   // Aplica classe CSS
                tituloInternoH3.textContent = tituloStrongElement.textContent.trim();                        // Define texto do título
                versiculoElementDiv.appendChild(tituloInternoH3);                                            // Adiciona título ao contêiner
            }

            const textoP = document.createElement('p');                                                      // Cria parágrafo do texto
            textoP.id = `versiculo-${versiculo}`;                                                            // Define ID único
            let textoDoVersiculo = "";                                                                       // Inicializa texto do versículo
            if (tituloStrongElement) {                                                                       // Se existe título
                const cloneNode = versiculoNode.cloneNode(true);                                             // Clona nó para não modificar original
                const strongInClone = cloneNode.querySelector('strong');                                     // Busca título no clone
                if (strongInClone) {                                                                         // Se título existe no clone
                    strongInClone.remove();                                                                  // Remove título do texto
                }
                textoDoVersiculo = cloneNode.textContent.trim();                                             // Define texto sem título
            } else {                                                                                         // Se não existe título
                textoDoVersiculo = versiculoNode.textContent.trim();                                         // Define texto completo
            }
            textoP.textContent = textoDoVersiculo;                                                           // Define texto do parágrafo
            versiculoElementDiv.appendChild(textoP);                                                         // Adiciona texto ao contêiner
        } else {                                                                                             // Se versículo não encontrado
            const textoP = document.createElement('p');                                                      // Cria parágrafo de erro
            textoP.textContent = `Versículo ${versiculo} não encontrado no arquivo HTML.`;                   // Define mensagem de erro
            versiculoElementDiv.appendChild(textoP);                                                         // Adiciona erro ao contêiner
            console.warn(`[ARC HTML] Versículo ${versiculo} (div#versiculo-${versiculo}) não encontrado em ${chapterHtmlPath}`); // Log de aviso
        }
    } catch (error) {                                                                                        // Captura erros
        console.error(`[ARC HTML] Erro ao carregar versículo ${livro} ${capitulo}:${versiculo}:`, error);    // Log de erro
        const textoP = document.createElement('p');                                                          // Cria parágrafo de erro
        textoP.textContent = `Erro ao carregar versículo ${versiculo}. Verifique o console para detalhes.`;  // Define mensagem de erro
        textoP.style.color = "red";                                                                          // Aplica cor vermelha
        versiculoElementDiv.appendChild(textoP);                                                             // Adiciona erro ao contêiner
    }

    content.appendChild(versiculoElementDiv);                                          // Adiciona versículo à página

    if (window.titulo) {                                                                                     // Verifica se título existe
        let nomeLivroDisplay = livro.toUpperCase();                                                          // Nome padrão em maiúsculas
        if (typeof window.getLivroDisplayName === 'function') {                                              // Verifica função de nome
            nomeLivroDisplay = window.getLivroDisplayName(livro);                                            // Obtém nome formatado
        } else {                                                                                             // Se função não existe
            console.warn("[ARC HTML] Função window.getLivroDisplayName não encontrada. Usando chave do livro em maiúsculas para o título."); // Log de aviso
        }
        window.titulo.textContent = `${nomeLivroDisplay} - CAPÍTULO ${capitulo} - VERSÍCULO ${versiculo}`;   // Atualiza título
    } else {                                                                                                 // Se título não existe
        console.warn(`[ARC HTML] Elemento H2 principal (window.titulo) não encontrado para atualizar.`);   // Log de aviso
    }
};

window.getSpecificChapterTitle = async function(livro, capitulo, versiculo) {         // Função para obter título
    console.log(`[ARC HTML] Obtendo título interno para: ${livro} ${capitulo} (aplicável ao v.${versiculo})`); // Log de busca
    try {                                                                                                      // Inicia tratamento de erro
        const chapterHtmlPath = `../versao/${window.BIBLE_VERSION}/${livro}/${capitulo}.html`;                 // Define caminho do arquivo HTML
        const response = await fetch(chapterHtmlPath);                                                         // Requisita arquivo HTML
        if (!response.ok) {                                                                                    // Valida resposta HTTP
            throw new Error(`HTTP ${response.status} ao buscar HTML para ${livro} ${capitulo} de ${chapterHtmlPath}`); // Lança erro de requisição
        }
        const htmlString = await response.text();                                                              // Converte resposta em texto HTML
        const parser = new DOMParser();                                                                        // Cria parser DOM
        const doc = parser.parseFromString(htmlString, 'text/html');                                           // Converte HTML em documento DOM
        const versiculoNode = doc.querySelector(`div#versiculo-${versiculo}`);                                 // Busca elemento do versículo
        if (versiculoNode) {                                                                                   // Se versículo encontrado
            const tituloStrongElement = versiculoNode.querySelector('strong');                                 // Busca elemento de título
            return tituloStrongElement ? tituloStrongElement.textContent.trim() : null;                        // Retorna título ou null
        }
        return null;                                                                                           // Retorna null se versículo não encontrado
    } catch (error) {                                                                                          // Captura erros
        console.error(`[ARC HTML] Erro ao obter título interno para ${livro} ${capitulo} (v.${versiculo}):`, error); // Log de erro
        return null;                                                                                           // Retorna null em caso de erro
    }
};