/*===============================================================================*/
/*            SCRIPT ESPECÍFICO PARA NAA (Nova Almeida Atualizada)               */
/*===============================================================================*/
/*  Este arquivo contém:                                                         */
/*                    - Funções para carregar e exibir versículos da versão NAA  */
/*                    - Manipulação de títulos e modo de leitura                 */
/*===============================================================================*/

window.BIBLE_VERSION = 'naa';                                                              // Identificador da versão NAA
window.NOME_VERSAO_COMPLETA_BIBLIA = 'Nova Almeida Atualizada';                             // Nome completo da tradução
console.log(`[${window.BIBLE_VERSION}.js] Script carregado. Definindo funções para NAA.`); // Log de inicialização

window.getSpecificVerseCount = function(livro, capitulo) {                                 // Função para contar versículos
    return window.getVerseCount(livro, capitulo);                                          // Delega para função global
}

window.loadSpecificVerse = async function(livro, capitulo, versiculo) {                    // Função principal de carregamento
    console.log(`[NAA] Carregando: ${livro} ${capitulo}:${versiculo}`);                    // Log do versículo sendo carregado
    
    const content = document.querySelector('.conteudo');                                   // Localiza área de conteúdo
    if (!content) {                                                                        // Validação da área de conteúdo
        console.error("[NAA] Elemento .conteudo não encontrado.");                         // Log de erro
        return;                                                                            // Interrompe execução
    }

    const existingVersiculoDiv = content.querySelector('.texto-versiculo');                // Busca versículo anterior
    if (existingVersiculoDiv) {                                                            // Se existe versículo anterior
        existingVersiculoDiv.remove();                                                     // Remove da interface
    }

    const versiculoElementDiv = document.createElement('div');                        // Cria contêiner do versículo
    versiculoElementDiv.classList.add('versiculo', 'texto-versiculo');               // Aplica classes CSS
    
    if (document.body.classList.contains('module-leitura')) {                        // Verifica modo leitura
        versiculoElementDiv.classList.add('modo-leitura');                           // Aplica estilo de leitura
    }

    try {                                                                             // Inicia tratamento de erro
        const response = await fetch(`../versao/naa/${livro}/${capitulo}.json`);     // Requisita arquivo JSON
        if (!response.ok) {                                                           // Valida resposta HTTP
            throw new Error(`HTTP ${response.status} ao buscar JSON para NAA`);      // Lança erro de requisição
        }
        const data = await response.json();                                          // Converte para objeto

        if (data.versiculos && data.versiculos[versiculo]) {                         // Verifica se versículo existe
            if (data.titulos && data.titulos[versiculo]) {                           // Verifica se há título
                const tituloInternoH3 = document.createElement('h3');               // Cria elemento de título
                tituloInternoH3.classList.add('titulo-versiculo-interno');          // Aplica classe CSS
                tituloInternoH3.textContent = data.titulos[versiculo];              // Define texto do título
                versiculoElementDiv.appendChild(tituloInternoH3);                   // Adiciona título ao contêiner
            }

            const textoP = document.createElement('p');                              // Cria parágrafo do texto
            textoP.id = `versiculo-${versiculo}`;                                   // Define ID único
            textoP.textContent = data.versiculos[versiculo];                        // Define texto bíblico
            versiculoElementDiv.appendChild(textoP);                                // Adiciona texto ao contêiner
        } else {                                                                    // Se versículo não encontrado
            const textoP = document.createElement('p');                             // Cria parágrafo de erro
            textoP.textContent = `Versículo ${versiculo} não encontrado nos dados.`; // Define mensagem de erro
            versiculoElementDiv.appendChild(textoP);                               // Adiciona erro ao contêiner
            console.warn(`[NAA] Versículo não encontrado em ${livro} ${capitulo}.json`); // Log de aviso
        }
    } catch (error) {                                                               // Captura erros
        console.error(`[NAA] Erro ao carregar versículo (NAA):`, error);           // Log de erro
        const textoP = document.createElement('p');                                 // Cria parágrafo de erro
        textoP.textContent = `Erro ao carregar versículo ${versiculo}.`;           // Define mensagem de erro
        textoP.style.color = "red";                                                // Aplica cor vermelha
        versiculoElementDiv.appendChild(textoP);                                   // Adiciona erro ao contêiner
    }

    content.appendChild(versiculoElementDiv);                                      // Adiciona versículo à página

    if (window.titulo) {                                                                   // Verifica se título existe
        let nomeLivroDisplay = livro.toUpperCase();                                        // Nome padrão em maiúsculas
        if (typeof window.getLivroDisplayName === 'function') {                            // Verifica função de nome
            nomeLivroDisplay = window.getLivroDisplayName(livro);                          // Obtém nome formatado
        } else {                                                                           // Se função não existe
            console.warn("[NAA] Função getLivroDisplayName não encontrada.");              // Log de aviso
        }
        window.titulo.textContent = `${nomeLivroDisplay} - CAPÍTULO ${capitulo} - VERSÍCULO ${versiculo}`; // Atualiza título
    } else {                                                                               // Se título não existe
        console.warn(`[NAA] window.titulo não encontrado.`);                               // Log de aviso
    }
}

window.getSpecificChapterTitle = async function(livro, capitulo, versiculo) {              // Função para obter título
    console.log(`[NAA] Obtendo título interno para: ${livro} ${capitulo}:${versiculo}`);   // Log de busca
    try {                                                                                  // Inicia tratamento de erro
        const response = await fetch(`../versao/naa/${livro}/${capitulo}.json`);           // Requisita arquivo JSON
        if (!response.ok) {                                                                // Valida resposta HTTP
            throw new Error(`HTTP ${response.status} ao buscar JSON para NAA`);            // Lança erro de requisição
        }
        const data = await response.json();                                                // Converte para objeto
        return data.titulos && data.titulos[versiculo] ? data.titulos[versiculo] : null;   // Retorna título ou null
    } catch (error) {                                                                      // Captura erros
        console.error(`[NAA] Erro ao obter título interno (NAA):`, error);                 // Log de erro
        return null;                                                                       // Retorna null em caso de erro
    }
}