/*===============================================================================*/
/*              SCRIPT ESPECÍFICO PARA ACF (Almeida Corrigida Fiel)              */
/*===============================================================================*/
/*  Este arquivo contém:                                                         */
/*           - Funções para carregar e exibir versículos da versão ACF           */
/*                  - Manipulação de títulos e modo de leitura                   */
/*===============================================================================*/

/* BLOCO: Definição da versão da Bíblia para este script                         */
window.BIBLE_VERSION                   = 'acf';                                   // Identificador da tradução
window.NOME_VERSAO_COMPLETA_BIBLIA     = 'Almeida Corrigida Fiel';                // Nome completo para exibição
console.log(`[${window.BIBLE_VERSION}.js] Script carregado. Definindo funções para ACF.`);  // Log de confirmação inicial

/* BLOCO: Função que será chamada por livros_capitulos.js                        */
/* Obtém a contagem de versículos para um determinado livro e capítulo           */
window.getSpecificVerseCount = function(livro, capitulo) {
    return window.getVerseCount(livro, capitulo);                                 // Consulta o motor de dados
}

/* BLOCO: Carrega e exibe um versículo específico da Bíblia ACF                  */
window.loadSpecificVerse = async function(livro, capitulo, versiculo) {
    console.log(`[ACF] Carregando: ${livro} ${capitulo}:${versiculo}`);           // Log de carga do versículo
    const content = document.querySelector('.conteudo');                          // Captura o contêiner de texto
    if (!content) {
        console.error("[ACF] Elemento .conteudo não encontrado.");                // Relata erro de interface
        return;
    }

    const existingVersiculoDiv = content.querySelector('.texto-versiculo');       // Busca versículo na tela
    if (existingVersiculoDiv) {
        existingVersiculoDiv.remove();                                            // Limpa o conteúdo anterior
    }

    const versiculoElementDiv = document.createElement('div');                    // Cria novo contêiner de texto
    versiculoElementDiv.classList.add('versiculo', 'texto-versiculo');            // Aplica classes de estilo
    if (document.body.classList.contains('module-leitura')) {
        versiculoElementDiv.classList.add('modo-leitura');                        // Adapta estilo para leitura
    }

    try {
        const response = await fetch(`../versao/acf/${livro}/${capitulo}.json`);  // Busca o arquivo da bíblia
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} ao buscar JSON para ACF`);   // Trata falha de download
        }
        const data = await response.json();                                       // Converte JSON em objeto

        if (data.versiculos && data.versiculos[versiculo]) {
            if (data.titulos && data.titulos[versiculo]) {
                const tituloInternoH3 = document.createElement('h3');             // Cria título de seção
                tituloInternoH3.classList.add('titulo-versiculo-interno');        // Estiliza o título interno
                tituloInternoH3.textContent = data.titulos[versiculo];            // Define o texto do cabeçalho
                versiculoElementDiv.appendChild(tituloInternoH3);                 // Insere título na div
            }

            const textoP = document.createElement('p');                           // Cria parágrafo do verso
            textoP.id = `versiculo-${versiculo}`;                                 // Identifica o parágrafo
            textoP.textContent = data.versiculos[versiculo];                      // Insere o texto bíblico
            versiculoElementDiv.appendChild(textoP);                              // Insere texto na div
        } else {
            const textoP = document.createElement('p');                           // Cria aviso de falta
            textoP.textContent = `Versículo ${versiculo} não encontrado nos dados.`;  // Define mensagem de erro
            versiculoElementDiv.appendChild(textoP);                              // Insere aviso na div
            console.warn(`[ACF] Versículo não encontrado em ${livro} ${capitulo}.json`);  // Loga aviso técnico
        }
    } catch (error) {
        console.error(`[ACF] Erro ao carregar versículo (ACF):`, error);          // Relata falha crítica
        const textoP = document.createElement('p');
        textoP.textContent = `Erro ao carregar versículo ${versiculo}.`;          // Avisa falha ao usuário
        textoP.style.color = "red";                                               // Destaca erro em vermelho
        versiculoElementDiv.appendChild(textoP);
    }

    content.appendChild(versiculoElementDiv);                                     // Publica o texto na tela

    if (window.titulo) {
        let nomeLivroDisplay = livro.toUpperCase();                               // Fallback para nome em maiúsculo
        if (typeof window.getLivroDisplayName === 'function') {
            nomeLivroDisplay = window.getLivroDisplayName(livro);                 // Traduz para nome acentuado
        } else {
            console.warn("[ACF] Função getLivroDisplayName não encontrada.");     // Alerta falta de tradutor
        }
        window.titulo.textContent = `${nomeLivroDisplay} - CAPÍTULO ${capitulo} - VERSÍCULO ${versiculo}`;  // Atualiza cabeçalho site
    } else {
        console.warn(`[ACF] window.titulo não encontrado.`);                      // Alerta falta de elemento H2
    }
}

/* BLOCO: Define a função para obter o título de uma seção                       */
window.getSpecificChapterTitle = async function(livro, capitulo, versiculo) {
    console.log(`[ACF] Obtendo título interno para: ${livro} ${capitulo}:${versiculo}`);  // Log de busca de título
    try {
        const response = await fetch(`../versao/acf/${livro}/${capitulo}.json`);  // Faz a requisição do JSON
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} ao buscar JSON para ACF`);   // Valida resposta servidor
        }
        const data = await response.json();                                       // Processa o arquivo
        return data.titulos && data.titulos[versiculo] ? data.titulos[versiculo] : null;  // Entrega o título ou nulo
    } catch (error) {
        console.error(`[ACF] Erro ao obter título interno (ACF):`, error);        // Relata erro de processamento
        return null;
    }
}
