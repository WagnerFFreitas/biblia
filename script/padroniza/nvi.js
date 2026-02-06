/*===============================================================================*/
/*                        MÓDULO DA VERSÃO BÍBLICA NVI                           */
/*===============================================================================*/
/*  Este script é responsável por:                                               */
/*                       - Configurar a tradução Nova Versão Internacional      */
/*                       - Carregar e exibir versículos da versão NVI           */
/*                       - Gerenciar títulos e formatação específica da NVI     */
/*===============================================================================*/

/**
 * Módulo específico para a versão NVI (Nova Versão Internacional)
 * Gerencia carregamento, exibição e formatação dos textos bíblicos
 * Integra-se com o sistema principal de navegação
 */

// ========================================================================
// CONFIGURAÇÃO DA VERSÃO
// ========================================================================

window.BIBLE_VERSION = 'nvi';                                  // Identificador único da versão
window.NOME_VERSAO_COMPLETA_BIBLIA = 'Nova Versão Internacional'; // Nome completo para exibição

console.log(`[${window.BIBLE_VERSION}.js] Script carregado - Definindo funções específicas para NVI`);

// ========================================================================
// FUNÇÕES UTILITÁRIAS
// ========================================================================

/**
 * Obtém a contagem de versículos para um capítulo específico
 * @param {string} livro - Nome do livro bíblico
 * @param {number} capitulo - Número do capítulo
 * @returns {number} Quantidade de versículos no capítulo
 */
window.getSpecificVerseCount = function(livro, capitulo) {
    return window.getVerseCount(livro, capitulo);
};

// ========================================================================
// FUNÇÃO PRINCIPAL: CARREGAMENTO DE VERSÍCULOS
// ========================================================================

/**
 * Carrega e exibe um versículo específico da versão NVI
 * @param {string} livro - Nome do livro bíblico
 * @param {number} capitulo - Número do capítulo
 * @param {number} versiculo - Número do versículo
 */
window.loadSpecificVerse = async function(livro, capitulo, versiculo) {
    console.log(`[NVI] Carregando: ${livro} ${capitulo}:${versiculo}`);
    
    // Localização da área de conteúdo
    const content = document.querySelector('.conteudo');
    if (!content) {
        console.error("[NVI] Elemento .conteudo não encontrado");
        return;
    }

    // Remoção do versículo anterior
    const existingVersiculoDiv = content.querySelector('.texto-versiculo');
    if (existingVersiculoDiv) {
        existingVersiculoDiv.remove();
    }

    // Criação do contêiner para o novo versículo
    const versiculoElementDiv = document.createElement('div');
    versiculoElementDiv.classList.add('versiculo', 'texto-versiculo');
    
    // Aplicação de estilo específico para modo leitura
    if (document.body.classList.contains('module-leitura')) {
        versiculoElementDiv.classList.add('modo-leitura');
    }

    try {
        // Requisição dos dados do capítulo
        const response = await fetch(`../versao/nvi/${livro}/${capitulo}.json`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} ao buscar JSON para ${livro} ${capitulo} (NVI)`);
        }
        
        const data = await response.json();

        // Processamento do versículo
        if (data.versiculos && data.versiculos[versiculo]) {
            // Adição de título de seção se existir
            if (data.titulos && data.titulos[versiculo]) {
                const tituloInternoH3 = document.createElement('h3');
                tituloInternoH3.classList.add('titulo-versiculo-interno');
                tituloInternoH3.textContent = data.titulos[versiculo];
                versiculoElementDiv.appendChild(tituloInternoH3);
            }

            // Criação do parágrafo com o texto bíblico
            const textoP = document.createElement('p');
            textoP.id = `versiculo-${versiculo}`;
            textoP.textContent = data.versiculos[versiculo];
            versiculoElementDiv.appendChild(textoP);
        } else {
            // Tratamento para versículo não encontrado
            const textoP = document.createElement('p');
            textoP.textContent = `Versículo ${versiculo} não encontrado nos dados`;
            versiculoElementDiv.appendChild(textoP);
            console.warn(`[NVI] Versículo ${versiculo} não encontrado em ${livro} ${capitulo}.json`);
        }
    } catch (error) {
        // Tratamento de erros de carregamento
        console.error(`[NVI] Erro ao carregar versículo ${livro} ${capitulo}:${versiculo}:`, error);
        
        const textoP = document.createElement('p');
        textoP.textContent = `Erro ao carregar versículo ${versiculo}`;
        textoP.style.color = "red";
        versiculoElementDiv.appendChild(textoP);
    }

    // Inserção do versículo na página
    content.appendChild(versiculoElementDiv);

    // Atualização do título principal da página
    if (window.titulo) {
        let nomeLivroDisplay = livro.toUpperCase();
        
        if (typeof window.getLivroDisplayName === 'function') {
            nomeLivroDisplay = window.getLivroDisplayName(livro);
        } else {
            console.warn("[NVI] Função getLivroDisplayName não encontrada");
        }
        
        window.titulo.textContent = `${nomeLivroDisplay} - CAPÍTULO ${capitulo} - VERSÍCULO ${versiculo}`;
    } else {
        console.warn("[NVI] Elemento H2 principal (window.titulo) não encontrado");
    }
};

// ========================================================================
// FUNÇÃO AUXILIAR: OBTENÇÃO DE TÍTULOS
// ========================================================================

/**
 * Obtém o título de seção para um versículo específico
 * @param {string} livro - Nome do livro bíblico
 * @param {number} capitulo - Número do capítulo
 * @param {number} versiculo - Número do versículo
 * @returns {string|null} Título da seção ou null se não existir
 */
window.getSpecificChapterTitle = async function(livro, capitulo, versiculo) {
    console.log(`[NVI] Obtendo título interno para: ${livro} ${capitulo}:${versiculo}`);
    
    try {
        const response = await fetch(`../versao/nvi/${livro}/${capitulo}.json`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} ao buscar JSON para ${livro} ${capitulo} (NVI)`);
        }
        
        const data = await response.json();
        return data.titulos && data.titulos[versiculo] ? data.titulos[versiculo] : null;
    } catch (error) {
        console.error(`[NVI] Erro ao obter título interno para ${livro} ${capitulo}:${versiculo}:`, error);
        return null;
    }
};