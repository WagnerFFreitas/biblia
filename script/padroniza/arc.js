/*===============================================================================*/
/*           SCRIPT ESPECÍFICO PARA ARC (Almeida Revista e Corrigida)            */
/*===============================================================================*/
/*  Este arquivo contém:                                                         */
/*           - Funções para carregar e exibir versículos da versão ARC           */
/*                  - Manipulação de títulos e modo de leitura                   */
/*===============================================================================*/

// Este bloco definição da versão da Bíblia para este script
window.BIBLE_VERSION                   = 'arc';                                   // Define o identificador da versão
window.NOME_VERSAO_COMPLETA_BIBLIA     = 'Almeida Revista e Corrigida';           // Nome completo da versão
console.log(`[${window.BIBLE_VERSION}.js] Script carregado. Definindo funções específicas para ARC.`);  // Loga o carregamento do script

// Este bloco cria a função que será chamada por livros_capitulos.js. Obtém a contagem de versículos para um determinado livro e capítulo.
window.getSpecificVerseCount = function(livro, capitulo) {
    return window.getVerseCount(livro, capitulo);                                 // Chama a função global para obter a contagem
};

// Este bloco carrega e exibe um versículo específico da Bíblia ARC.
window.loadSpecificVerse = async function(livro, capitulo, versiculo) {
    console.log(`[ARC HTML] Carregando: ${livro} ${capitulo}:${versiculo}`);      // Loga o carregamento do versículo
    const content = document.querySelector('.conteudo');                          // Seleciona o conteiner principal
    if (!content) {                                                               // Verifica se o conteiner principal existe
        console.error("[ARC HTML] Elemento .conteudo não encontrado.");           // Loga erro se não encontrar o conteiner
        return;                                                                   // Interrompe a função se o conteiner não existir
    }

    const existingVersiculoDiv = content.querySelector('.texto-versiculo');       // Busca o versículo anterior exibido
    if (existingVersiculoDiv) {                                                   // Remove o versículo anterior, se existir
        existingVersiculoDiv.remove();                                            // Remove da tela
    }

    const versiculoElementDiv = document.createElement('div');                    // Cria um novo elemento <div> para o versículo
    versiculoElementDiv.classList.add('versiculo', 'texto-versiculo');            // Adiciona classes CSS para estilização
    if (document.body.classList.contains('module-leitura')) {                     // Verifica se o modo de leitura está ativo no body
        versiculoElementDiv.classList.add('modo-leitura');                        // Adiciona classe se modo leitura estiver ativo
    }

    // Este bloco inicia um bloco try-catch para lidar com possíveis erros de requisição
    try {
        const chapterHtmlPath = `../versao/${window.BIBLE_VERSION}/${livro}/${capitulo}.html`;  // Define o caminho para o arquivo HTML do capítulo
        const response = await fetch(chapterHtmlPath);                            // Busca o arquivo HTML do capítulo
        if (!response.ok) {                                                       // Verifica se a requisição HTTP foi bem-sucedida
            throw new Error(`HTTP ${response.status} ao buscar HTML para ${livro} ${capitulo} de ${chapterHtmlPath}`);  // Lança um erro se a resposta não for 'ok'
        }
        const htmlString = await response.text();                                 // Converte a resposta em texto HTML
        const parser = new DOMParser();                                           // Cria um parser para processar o HTML
        const doc = parser.parseFromString(htmlString, 'text/html');              // Converte o HTML em documento DOM
        const versiculoNode = doc.querySelector(`div#versiculo-${versiculo}`);    // Busca o elemento do versículo específico

        if (versiculoNode) {                                                      // Verifica se o versículo foi encontrado no HTML
            const tituloStrongElement = versiculoNode.querySelector('strong');    // Busca o elemento <strong> que contém o título
            if (tituloStrongElement) {                                            // Verifica se existe título para o versículo
                const tituloInternoH3 = document.createElement('h3');             // Cria elemento para o título interno
                tituloInternoH3.classList.add('titulo-versiculo-interno');        // Adiciona classe ao título
                tituloInternoH3.textContent = tituloStrongElement.textContent.trim();  // Define o texto do título
                versiculoElementDiv.appendChild(tituloInternoH3);                 // Adiciona o título à div do versículo
            }

            const textoP = document.createElement('p');                           // Cria elemento <p> para o texto do versículo
            textoP.id = `versiculo-${versiculo}`;                                 // Define o id do <p>
            let textoDoVersiculo = "";                                            // Inicializa variável para o texto do versículo
            if (tituloStrongElement) {                                            // Se existe título, remove-o do texto
                const cloneNode = versiculoNode.cloneNode(true);                  // Clona o nó para não modificar o original
                const strongInClone = cloneNode.querySelector('strong');          // Busca o elemento <strong> no clone
                if (strongInClone) {                                              // Remove o título do texto
                    strongInClone.remove();                                       // Remove o elemento <strong>
                }
                textoDoVersiculo = cloneNode.textContent.trim();                  // Define o texto sem o título
            } else {                                                              // Se não existe título
                textoDoVersiculo = versiculoNode.textContent.trim();              // Define o texto completo do versículo
            }
            textoP.textContent = textoDoVersiculo;                                // Define o texto do <p>
            versiculoElementDiv.appendChild(textoP);                              // Adiciona o <p> à div do versículo
        } else {                                                                  // Caso o versículo não seja encontrado no HTML
            const textoP = document.createElement('p');                           // Cria elemento <p> para mensagem de erro
            textoP.textContent = `Versículo ${versiculo} não encontrado no arquivo HTML.`;  // Define mensagem de erro
            versiculoElementDiv.appendChild(textoP);                              // Adiciona o <p> à div do versículo
            console.warn(`[ARC HTML] Versículo ${versiculo} (div#versiculo-${versiculo}) não encontrado em ${chapterHtmlPath}`);
        }
    } catch (error) {                                                             // Captura erros que possam ocorrer no bloco try
        console.error(`[ARC HTML] Erro ao carregar versículo ${livro} ${capitulo}:${versiculo}:`, error);  // Loga erro
        const textoP = document.createElement('p');                               // Cria elemento <p> para mensagem de erro
        textoP.textContent = `Erro ao carregar versículo ${versiculo}. Verifique o console para detalhes.`;  // Define mensagem de erro
        textoP.style.color = "red";                                               // Define cor vermelha para o texto
        versiculoElementDiv.appendChild(textoP);                                  // Adiciona o <p> à div do versículo
    }

    content.appendChild(versiculoElementDiv);                                     // Adiciona o versículo ao conteiner

    if (window.titulo) {                                                          // Verifica se o elemento do título principal existe
        let nomeLivroDisplay = livro.toUpperCase();                               // Define nome do livro em maiúsculas como fallback
        if (typeof window.getLivroDisplayName === 'function') {                   // Verifica se a função para obter o nome formatado do livro existe
            nomeLivroDisplay = window.getLivroDisplayName(livro);                 // Usa a função para obter nome acentuado
        } else {                                                                  // Caso a função não exista
            console.warn("[ARC HTML] Função window.getLivroDisplayName não encontrada. Usando chave do livro em maiúsculas para o título.");
        }
        window.titulo.textContent = `${nomeLivroDisplay} - CAPÍTULO ${capitulo} - VERSÍCULO ${versiculo}`;  // Atualiza o texto do título da página
    } else {                                                                      // Caso o elemento do título não seja encontrado
        console.warn(`[ARC HTML] Elemento H2 principal (window.titulo) não encontrado para atualizar.`);
    }
};

// Este bloco define a função para obter o título de uma seção.
window.getSpecificChapterTitle = async function(livro, capitulo, versiculo) {
    console.log(`[ARC HTML] Obtendo título interno para: ${livro} ${capitulo} (aplicável ao v.${versiculo})`);  // Loga a busca do título
    try {                                                                         // Inicia um bloco try-catch para lidar com erros
        const chapterHtmlPath = `../versao/${window.BIBLE_VERSION}/${livro}/${capitulo}.html`;  // Define o caminho para o arquivo HTML do capítulo
        const response = await fetch(chapterHtmlPath);                            // Busca o arquivo HTML do capítulo
        if (!response.ok) {                                                       // Verifica se a requisição foi bem-sucedida
            throw new Error(`HTTP ${response.status} ao buscar HTML para ${livro} ${capitulo} de ${chapterHtmlPath}`);
        }
        const htmlString = await response.text();                                 // Converte a resposta em texto HTML
        const parser = new DOMParser();                                           // Cria um parser para processar o HTML
        const doc = parser.parseFromString(htmlString, 'text/html');              // Converte o HTML em documento DOM
        const versiculoNode = doc.querySelector(`div#versiculo-${versiculo}`);    // Busca o elemento do versículo específico
        if (versiculoNode) {                                                      // Verifica se o versículo foi encontrado
            const tituloStrongElement = versiculoNode.querySelector('strong');    // Busca o elemento <strong> que contém o título
            return tituloStrongElement ? tituloStrongElement.textContent.trim() : null;  // Retorna o título se existir, caso contrário retorna null
        }
        return null;                                                              // Retorna null se o versículo não for encontrado
    } catch (error) {                                                             // Captura erros que possam ocorrer
        console.error(`[ARC HTML] Erro ao obter título interno para ${livro} ${capitulo} (v.${versiculo}):`, error);  // Loga erro
        return null;                                                              // Retorna null em caso de erro
    }
};
