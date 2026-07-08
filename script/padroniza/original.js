/*===============================================================================*/
/*               SCRIPT ESPECÍFICO PARA ORIGINAL (Texto Original)                */
/*===============================================================================*/
/*  Este arquivo contém:                                                         */
/*        - Funções para carregar e exibir versículos da versão Original         */
/*          - Lógica para diferenciar Antigo (Hebraico) e Novo (Grego)           */
/*            - Construção de interface interlinear (transliteração)             */
/*===============================================================================*/

/* BLOCO: Define as constantes globais de identificação e o nome completo da     */
/* tradução para exibição no sistema                                             */
window.BIBLE_VERSION = 'original';                                                // Identificador da versão
window.NOME_VERSAO_COMPLETA_BIBLIA = 'Texto Original';                            // Nome completo da tradução
console.log(`[${window.BIBLE_VERSION}.js] Script carregado. Definindo funções específicas para ORIGINAL.`);  // Log de carga do módulo

/* BLOCO: Lista exaustiva dos livros do Antigo Testamento para aplicar a         */
/* direção de leitura da Direita para Esquerda                                   */
const livrosAntigoTestamento = [                                                  // Inicia lista de livros RTL
    'genesis', 'exodo', 'levitico', 'numeros', 'deuteronomio', 'josue', 'juizes', 'rute', '1samuel', '2samuel',          
    '1reis', '2reis', '1cronicas', '2cronicas', 'esdras', 'neemias', 'ester', 'jo', 'salmos', 'proverbios',              
    'eclesiastes', 'cantares', 'isaias', 'jeremias', 'lamentacoes', 'ezequiel', 'daniel', 'oseias', 'joel',              
    'amos', 'obadias', 'jonas', 'miqueias', 'naum', 'habacuque', 'sofonias', 'ageu', 'zacarias', 'malaquias'             
];                                                                                                                       

/* BLOCO: Define o mapa de contagem de versículos para validação e geração da    */
/* interface de navegação do texto original                                      */
window.getSpecificVerseCount = function(livro, capitulo) {                        // Inicia contador de versos
    const versiculosPorCapitulo = {                                                                                      
    "genesis": { 1: 31, 2: 25, 3: 24, 4: 26, 5: 32, 6: 22, 7: 24, 8: 22, 9: 29, 10: 32, 11: 32, 12: 20,              
                13: 18, 14: 24, 15: 21, 16: 16, 17: 27, 18: 33, 19: 38, 20: 18, 21: 34, 22: 24, 23: 20, 24: 67,
                25: 34, 26: 35, 27: 46, 28: 22, 29: 35, 30: 43, 31: 55, 32: 33, 33: 20, 34: 31, 35: 29, 36: 43,
                37: 36, 38: 30, 39: 23, 40: 23, 41: 57, 42: 38, 43: 34, 44: 34, 45: 28, 46: 34, 47: 31, 48: 22,
                49: 33, 50: 26 },
    
    "exodo": { 1: 22, 2: 25, 3: 22, 4: 31, 5: 23, 6: 30, 7: 25, 8: 32, 9: 35, 10: 29, 11: 10, 12: 51, 13: 22,
                14: 31, 15: 27, 16: 36, 17: 16, 18: 27, 19: 25, 20: 26, 21: 36, 22: 31, 23: 33, 24: 18, 25: 40,
                26: 37, 27: 21, 28: 43, 29: 46, 30: 38, 31: 18, 32: 35, 33: 23, 34: 35, 35: 35, 36: 38, 37: 29,
                38: 31, 39: 43, 40: 38 },
    
    "levitico": { 1: 17, 2: 16, 3: 17, 4: 35, 5: 19, 6: 30, 7: 38, 8: 36, 9: 24, 10: 20, 11: 47, 12: 8, 13: 59,
                14: 57, 15: 33, 16: 34, 17: 16, 18: 30, 19: 37, 20: 27, 21: 24, 22: 33, 23: 44, 24: 23, 25: 55,
                26: 46, 27: 34 },
    
    "numeros": { 1: 54, 2: 34, 3: 51, 4: 49, 5: 31, 6: 27, 7: 89, 8: 26, 9: 23, 10: 36, 11: 35, 12: 16, 13: 33,
                14: 45, 15: 41, 16: 50, 17: 13, 18: 32, 19: 22, 20: 29, 21: 35, 22: 41, 23: 30, 24: 25, 25: 18,
                26: 65, 27: 23, 28: 31, 29: 40, 30: 17, 31: 54, 32: 42, 33: 56, 34: 29, 35: 34, 36: 13 },
    
    "deuteronomio": { 1: 46, 2: 37, 3: 29, 4: 49, 5: 33, 6: 25, 7: 26, 8: 20, 9: 29, 10: 22, 11: 32, 12: 32, 13: 18,
                14: 29, 15: 23, 16: 22, 17: 20, 18: 22, 19: 21, 20: 20, 21: 23, 22: 30, 23: 25, 24: 22, 25: 19,
                26: 19, 27: 26, 28: 68, 29: 29, 30: 20, 31: 30, 32: 52, 33: 29, 34: 12 },
    
    "jose": { 1: 18, 2: 24, 3: 17, 4: 24, 5: 15, 6: 27, 7: 26, 8: 35, 9: 27, 10: 43, 11: 23, 12: 24, 13: 33,
                14: 15, 15: 63, 16: 10, 17: 18, 18: 28, 19: 51, 20: 9, 21: 45, 22: 34, 23: 16, 24: 33 },
    
    "juizes": { 1: 36, 2: 23, 3: 31, 4: 24, 5: 31, 6: 40, 7: 25, 8: 35, 9: 57, 10: 18, 11: 40, 12: 15, 13: 25,
                14: 20, 15: 20, 16: 31, 17: 13, 18: 31, 19: 30, 20: 48, 21: 25 },
    
    "rute": { 1: 22, 2: 23, 3: 18, 4: 22 },
    
    "1samuel": { 1: 28, 2: 36, 3: 21, 4: 22, 5: 12, 6: 21, 7: 17, 8: 22, 9: 27, 10: 27, 11: 15, 12: 25, 13: 23,
                14: 52, 15: 35, 16: 23, 17: 58, 18: 30, 19: 24, 20: 42, 21: 16, 22: 23, 23: 29, 24: 23, 25: 44,
                26: 25, 27: 12, 28: 25, 29: 11, 30: 31, 31: 13 },
    
    "2samuel": { 1: 27, 2: 32, 3: 39, 4: 12, 5: 25, 6: 23, 7: 29, 8: 18, 9: 13, 10: 19, 11: 27, 12: 31, 13: 39,
                14: 33, 15: 37, 16: 23, 17: 29, 18: 33, 19: 43, 20: 26, 21: 22, 22: 51, 23: 39, 24: 25 },
    
    "1reis": { 1: 53, 2: 46, 3: 28, 4: 34, 5: 18, 6: 38, 7: 51, 8: 66, 9: 28, 10: 29, 11: 43, 12: 33, 13: 34,
                14: 31, 15: 34, 16: 34, 17: 24, 18: 46, 19: 21, 20: 43, 21: 29, 22: 54 },
    
    "2reis": { 1: 18, 2: 25, 3: 27, 4: 44, 5: 27, 6: 33, 7: 20, 8: 29, 9: 37, 10: 36, 11: 21, 12: 22, 13: 25,
                14: 29, 15: 38, 16: 20, 17: 41, 18: 37, 19: 37, 20: 21, 21: 26, 22: 20, 23: 37, 24: 20, 25: 30 },
    
    "1cronicas": { 1: 54, 2: 55, 3: 24, 4: 43, 5: 26, 6: 81, 7: 40, 8: 40, 9: 44, 10: 14, 11: 47, 12: 41, 13: 14,
                14: 17, 15: 29, 16: 43, 17: 27, 18: 17, 19: 19, 20: 8, 21: 30, 22: 19, 23: 32, 24: 31, 25: 31,
                26: 32, 27: 34, 28: 21, 29: 30 },
    
    "2cronicas": { 1: 18, 2: 18, 3: 17, 4: 22, 5: 14, 6: 42, 7: 22, 8: 18, 9: 31, 10: 19, 11: 23, 12: 16, 13: 22,
                14: 15, 15: 19, 16: 14, 17: 19, 18: 34, 19: 11, 20: 37, 21: 20, 22: 12, 23: 21, 24: 27, 25: 28,
                26: 23, 27: 9, 28: 27, 29: 36, 30: 27, 31: 21, 32: 33, 33: 25, 34: 33, 35: 27, 36: 23 },
    
    "esdras": { 1: 11, 2: 70, 3: 13, 4: 24, 5: 17, 6: 22, 7: 28, 8: 36, 9: 15, 10: 44 },
    
    "neemias": { 1: 11, 2: 20, 3: 38, 4: 23, 5: 19, 6: 19, 7: 73, 8: 18, 9: 38, 10: 39, 11: 36, 12: 47, 13: 31 },
    
    "ester": { 1: 22, 2: 23, 3: 15, 4: 17, 5: 14, 6: 14, 7: 10, 8: 17, 9: 32, 10: 3 },
    
    "jo": { 1: 22, 2: 13, 3: 26, 4: 21, 5: 27, 6: 30, 7: 21, 8: 22, 9: 35, 10: 22, 11: 20, 12: 25, 13: 28,
                14: 22, 15: 35, 16: 22, 17: 16, 18: 21, 19: 29, 20: 29, 21: 34, 22: 30, 23: 17, 24: 25, 25: 6,
                26: 14, 27: 23, 28: 28, 29: 25, 30: 31, 31: 40, 32: 22, 33: 33, 34: 37, 35: 16, 36: 33, 37: 24,
                38: 41, 39: 30, 40: 24, 41: 34, 42: 17 },
    
    "salmos": { 1: 6, 2: 12, 3: 8, 4: 8, 5: 12, 6: 10, 7: 17, 8: 9, 9: 20, 10: 18, 11: 7, 12: 8, 13: 6, 14: 7,
                15: 5, 16: 11, 17: 15, 18: 50, 19: 14, 20: 9, 21: 13, 22: 31, 23: 6, 24: 10, 25: 22, 26: 12,
                27: 14, 28: 9, 29: 11, 30: 12, 31: 24, 32: 11, 33: 22, 34: 22, 35: 28, 36: 12, 37: 40, 38: 22,
                39: 13, 40: 17, 41: 13, 42: 11, 43: 5, 44: 27, 45: 18, 46: 12, 47: 10, 48: 15, 49: 21, 50: 23,
                51: 21, 52: 11, 53: 7, 54: 9, 55: 24, 56: 14, 57: 12, 58: 12, 59: 18, 60: 14, 61: 9, 62: 13,
                63: 12, 64: 11, 65: 14, 66: 20, 67: 8, 68: 36, 69: 37, 70: 6, 71: 24, 72: 20, 73: 28, 74: 23,
                75: 11, 76: 13, 77: 21, 78: 72, 79: 13, 80: 20, 81: 17, 82: 8, 83: 19, 84: 13, 85: 14, 86: 17,
                87: 7, 88: 19, 89: 53, 90: 17, 91: 16, 92: 16, 93: 5, 94: 23, 95: 11, 96: 13, 97: 12, 98: 9,
                99: 9, 100: 5, 101: 8, 102: 29, 103: 22, 104: 35, 105: 45, 106: 48, 107: 43, 108: 14, 109: 31,
                110: 7, 111: 10, 112: 10, 113: 9, 114: 8, 115: 18, 116: 19, 117: 2, 118: 29, 119: 176, 120: 7,
                121: 8, 122: 9, 123: 4, 124: 8, 125: 5, 126: 6, 127: 5, 128: 6, 129: 8, 130: 8, 131: 3, 132: 18,
                133: 3, 134: 3, 135: 21, 136: 26, 137: 9, 138: 8, 139: 24, 140: 14, 141: 10, 142: 8, 143: 12,
                144: 15, 145: 21, 146: 10, 147: 20, 148: 14, 149: 9, 150: 6 },
    
    "proverbios": { 1: 33, 2: 22, 3: 35, 4: 27, 5: 23, 6: 35, 7: 27, 8: 36, 9: 18, 10: 32, 11: 31, 12: 28, 13: 25,
                14: 35, 15: 33, 16: 33, 17: 28, 18: 24, 19: 29, 20: 30, 21: 31, 22: 29, 23: 35, 24: 34, 25: 28,
                26: 28, 27: 27, 28: 28, 29: 27, 30: 33, 31: 31 },
    
    "eclesiastes": { 1: 18, 2: 26, 3: 22, 4: 17, 5: 19, 6: 12, 7: 29, 8: 17, 9: 18, 10: 20, 11: 10, 12: 14 },
    
    "cantares": { 1: 17, 2: 17, 3: 11, 4: 16, 5: 16, 6: 13, 7: 14, 8: 14 },
    
    "isaias": { 1: 31, 2: 22, 3: 26, 4: 6, 5: 30, 6: 13, 7: 25, 8: 22, 9: 21, 10: 34, 11: 16, 12: 6, 13: 22,
                14: 32, 15: 9, 16: 14, 17: 14, 18: 7, 19: 25, 20: 6, 21: 17, 22: 25, 23: 18, 24: 23, 25: 12,
                26: 21, 27: 13, 28: 29, 29: 24, 30: 33, 31: 9, 32: 20, 33: 24, 34: 17, 35: 10, 36: 22, 37: 38,
                38: 22, 39: 8, 40: 31, 41: 29, 42: 25, 43: 28, 44: 28, 45: 25, 46: 13, 47: 15, 48: 22, 49: 26,
                50: 11, 51: 23, 52: 15, 53: 12, 54: 17, 55: 13, 56: 12, 57: 21, 58: 14, 59: 21, 60: 22, 61: 11,
                62: 12, 63: 19, 64: 12, 65: 25, 66: 24 },
    
    "jeremias": { 1: 19, 2: 37, 3: 25, 4: 31, 5: 31, 6: 30, 7: 34, 8: 22, 9: 26, 10: 25, 11: 23, 12: 17, 13: 27,
                14: 22, 15: 21, 16: 21, 17: 27, 18: 23, 19: 15, 20: 18, 21: 14, 22: 30, 23: 40, 24: 10, 25: 38,
                26: 24, 27: 22, 28: 17, 29: 32, 30: 24, 31: 40, 32: 44, 33: 26, 34: 22, 35: 19, 36: 32, 37: 21,
                38: 28, 39: 18, 40: 16, 41: 18, 42: 22, 43: 13, 44: 30, 45: 5, 46: 28, 47: 7, 48: 47, 49: 39,
                50: 46, 51: 64, 52: 34 },
    
    "lamentacoes": { 1: 22, 2: 22, 3: 66, 4: 22, 5: 22 },
    
    "ezequiel": { 1: 28, 2: 10, 3: 27, 4: 17, 5: 17, 6: 14, 7: 27, 8: 18, 9: 11, 10: 22, 11: 25, 12: 28, 13: 23,
                14: 23, 15: 8, 16: 63, 17: 24, 18: 32, 19: 14, 20: 49, 21: 32, 22: 31, 23: 49, 24: 27, 25: 17,
                26: 21, 27: 36, 28: 26, 29: 21, 30: 26, 31: 18, 32: 32, 33: 33, 34: 31, 35: 15, 36: 38, 37: 28,
                38: 23, 39: 29, 40: 49, 41: 26, 42: 20, 43: 27, 44: 31, 45: 25, 46: 24, 47: 23, 48: 35 },
    
    "daniel": { 1: 21, 2: 49, 3: 30, 4: 37, 5: 31, 6: 28, 7: 28, 8: 27, 9: 27, 10: 21, 11: 45, 12: 13 },
    
    "oseias": { 1: 11, 2: 23, 3: 5, 4: 19, 5: 15, 6: 11, 7: 16, 8: 14, 9: 17, 10: 15, 11: 12, 12: 14, 13: 16, 14: 10 },
    
    "joel": { 1: 20, 2: 32, 3: 21, 4: 21 },
    
    "amos": { 1: 15, 2: 16, 3: 15, 4: 13, 5: 27, 6: 14, 7: 17, 8: 14, 9: 15 },
    
    "obadias": { 1: 21 },
    
    "jonas": { 1: 17, 2: 11, 3: 10, 4: 11 },
    
    "miqueias": { 1: 16, 2: 13, 3: 12, 4: 13, 5: 15, 6: 16, 7: 20 },
    
    "naum": { 1: 15, 2: 14, 3: 19 },
    
    "habacuque": { 1: 17, 2: 20, 3: 19 },
    
    "sofonias": { 1: 18, 2: 15, 3: 20 },
    
    "ageu": { 1: 15, 2: 23 },
    
    "zacarias": { 1: 21, 2: 17, 3: 10, 4: 14, 5: 11, 6: 15, 7: 14, 8: 23, 9: 17, 10: 12, 11: 17, 12: 14, 13: 9, 14: 21 },
    
    "malaquias": { 1: 14, 2: 17, 3: 18, 4: 6 },
    
    "mateus": { 1: 25 }                                                                                              
    };

    /* BLOCO: Tenta localizar a contagem na base estática e retorna zero caso a configuração não seja encontrada        */
    const contagem = versiculosPorCapitulo[livro]?.[capitulo];                    // Busca valor no dicionário
    if (typeof contagem === 'undefined') {                                        // Verifica se o dado é nulo
        console.warn(`[ORIGINAL] Contagem de versículos não encontrada para ${livro} ${capitulo}.`);  // Alerta falha de mapeamento
        return 0;                                                                 // Retorna valor de segurança
    }
    return contagem;                                                              // Entrega contagem real
};

/* BLOCO: Função principal assíncrona encarregada de buscar os dados             */
/* interlineares e montar a interface do versículo                               */
window.loadSpecificVerse = async function(livro, capitulo, versiculo) {           // Inicia carga do interlinear
    console.log(`[ORIGINAL] Carregando: ${livro} ${capitulo}:${versiculo}`);      // Log de posição de leitura
    const verseTextContainer = document.querySelector('.conteudo-versiculos');    // Localiza contêiner no DOM
    if (!verseTextContainer) {                                                    // Valida existência do elemento
        console.error("[ORIGINAL] Elemento '.conteudo-versiculos' não encontrado.");  // Relata falha de interface
        return;
    }

    /* BLOCO: Limpa o conteúdo textual anterior para preparar a exibição do novo versículo solicitado pelo usuário      */
    const existingVerseTextDiv = verseTextContainer.querySelector('.texto-versiculo');  // Busca div de verso antigo
    if (existingVerseTextDiv) {
        existingVerseTextDiv.remove();                                            // Remove elemento do DOM
    }

    const versiculoElementDiv = document.createElement('div');                    // Cria contêiner do versículo
    versiculoElementDiv.classList.add('versiculo', 'texto-versiculo');            // Atribui classes de estilo

    /* BLOCO: Realiza a requisição fetch para obter o arquivo JSON contendo as palavras originais e traduções           */
    try {
        const response = await fetch(`../versao/original/${livro}/${capitulo}.json`);  // Solicita o arquivo JSON
        if (!response.ok) throw new Error(`HTTP ${response.status} ao buscar JSON.`);  // Trata erro de requisição
        
        /* BLOCO: Analisa a estrutura do JSON carregado e identifica se o livro pertence ao Antigo Testamento           */
        const rawData = await response.json();                                    // Converte resposta em objeto
        const chapterData = Array.isArray(rawData) ? rawData[0] : rawData;        // Normaliza acesso aos dados
        const isAntigoTestamento = livrosAntigoTestamento.includes(livro);        // Define se o idioma é Hebraico

        /* BLOCO: Verifica a presença dos dados do versículo e constrói a visualização da tradução completa e das palavras */
        if (chapterData && chapterData.versiculos && chapterData.versiculos[versiculo]) {  // Valida existência do verso
            const verseData = chapterData.versiculos[versiculo];                  // Captura dados do versículo
            
            const textoP = document.createElement('p');                           // Cria parágrafo da tradução
            textoP.id = `versiculo-${versiculo}`;                                 // Identifica o parágrafo
            textoP.classList.add('traducao-completa');                            // Estiliza texto corrido
            textoP.textContent = verseData.traducao_completa;                     // Insere texto em Português
            versiculoElementDiv.appendChild(textoP);                              // Anexa tradução ao contêiner

            /* BLOCO: Itera sobre a lista de palavras para gerar os blocos interlineares individuais com o idioma original */
            if (verseData.palavras && verseData.palavras.length > 0) {            // Verifica lista de palavras
                const palavrasContainerDiv = document.createElement('div');       // Cria caixa das palavras
                palavrasContainerDiv.classList.add('palavras-container');         // Estiliza lista de palavras
                
                palavrasContainerDiv.style.direction = isAntigoTestamento ? 'rtl' : 'ltr';  // Define fluxo Direita/Esquerda

                verseData.palavras.forEach(palavra => {                           // Varre cada palavra original
                    const wordDetailItemDiv = document.createElement('div');      // Cria item de detalhamento
                    wordDetailItemDiv.classList.add('word-detail-item');          // Estiliza item individual

                    const originalLangDiv = document.createElement('div');        // Div para o texto original
                    const transliteralDiv = document.createElement('div');        // Div para a pronúncia
                    const traducaoPalavraDiv = document.createElement('div');     // Div para o significado
                    
                    let originalText = '';                                        // Buffer para texto original
                    const textAlignStyle = isAntigoTestamento ? 'right' : 'left'; // Alinha texto pelo idioma
                    const alignItemsStyle = isAntigoTestamento ? 'flex-end' : 'flex-start';  // Ajusta flexbox pelo idioma

                    wordDetailItemDiv.style.alignItems = alignItemsStyle;         // Aplica alinhamento flex

                    /* BLOCO: Aplica as regras de alinhamento de texto em todos os elementos internos do bloco de palavra*/
                    [originalLangDiv, transliteralDiv, traducaoPalavraDiv].forEach(div => {
                        div.style.textAlign = textAlignStyle;                     // Define alinhamento do texto
                    });

                    if (isAntigoTestamento) {
                        originalLangDiv.classList.add('hebraico-text');           // Estilo de fonte Hebraica
                        originalText = palavra.hebraico || '';                    // Captura caracteres hebraicos
                    } else {
                        originalLangDiv.classList.add('grego-text');              // Estilo de fonte Grega
                        originalText = palavra.grego || '';                       // Captura caracteres gregos
                    }
                    originalLangDiv.textContent = originalText;                   // Insere texto original na div

                    /* BLOCO: Insere a transliteração fonética e o significado gramatical da palavra na estrutura HTML */
                    transliteralDiv.classList.add('transliteral-text');           // Estilo da transliteração
                    transliteralDiv.textContent = palavra.transliteral;           // Insere a pronúncia
                    traducaoPalavraDiv.classList.add('traducao-palavra-text');    // Estilo do significado
                    traducaoPalavraDiv.textContent = palavra.traducao_palavra;    // Insere tradução literal
                    
                    /* BLOCO: Organiza a hierarquia dos elementos visuais dentro do item de detalhamento da palavra     */  
                    wordDetailItemDiv.appendChild(originalLangDiv);               // Anexa idioma original
                    wordDetailItemDiv.appendChild(transliteralDiv);               // Anexa fonética
                    wordDetailItemDiv.appendChild(traducaoPalavraDiv);            // Anexa significado

                    palavrasContainerDiv.appendChild(wordDetailItemDiv);          // Anexa palavra à lista
                });
                versiculoElementDiv.appendChild(palavrasContainerDiv);            // Anexa lista ao versículo
            }
        } else {
            versiculoElementDiv.innerHTML = `<p>Versículo ${versiculo} não encontrado.</p>`;  // Alerta erro de localização
        }
    } catch (error) {
        console.error(`[ORIGINAL] Erro FATAL ao carregar versículo:`, error);     // Loga falha crítica técnica
        versiculoElementDiv.innerHTML = `<p style="color:red;">Erro ao carregar. Detalhes: ${error.message}</p>`;  // Alerta erro visual crítico
    }

    verseTextContainer.appendChild(versiculoElementDiv);                          // Publica o versículo no site
};

/* BLOCO: Funções auxiliares destinadas à recuperação de metadados do capítulo   */
/* (em fase de simplificação)                                                    */
window.getSpecificChapterTitle = async function(livro, capitulo, versiculo) {     // Inicia busca de títulos
    return null;                                                                  // Retorno nulo padrão
};
window.isReadingModeEnabled = false;                                              // Define estado do modo leitura
