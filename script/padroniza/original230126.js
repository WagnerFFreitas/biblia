/*===============================================================================*/
/*               SCRIPT ESPECÍFICO PARA ORIGINAL (Texto Original)                */
/*===============================================================================*/
/* /*  Este arquivo contém:                                                      */
/*        - Funções para carregar e exibir versículos da versão Original         */
/*             - Lógica para diferenciar OT (Hebraico) e NT (Grego)              */
/*===============================================================================*/

/* BLOCO:                                                                        */
window.BIBLE_VERSION = 'original';
window.NOME_VERSAO_COMPLETA_BIBLIA = 'Texto Original';
console.log(`[${window.BIBLE_VERSION}.js] Script carregado. Definindo funções específicas para ORIGINAL.`);

// BLOCO: Lista de livros do Antigo Testamento para diferenciar Hebraico (RTL) de Grego (LTR) */
const livrosAntigoTestamento = [
    'genesis', 'exodo', 'levitico', 'numeros', 'deuteronomio', 'josue', 'juizes', 'rute', '1samuel', '2samuel',
    '1reis', '2reis', '1cronicas', '2cronicas', 'esdras', 'neemias', 'ester', 'jo', 'salmos', 'proverbios',
    'eclesiastes', 'cantares', 'isaias', 'jeremias', 'lamentacoes', 'ezequiel', 'daniel', 'oseias', 'joel',
    'amos', 'obadias', 'jonas', 'miqueias', 'naum', 'habacuque', 'sofonias', 'ageu', 'zacarias', 'malaquias'
];

// BLOCO: Contagem estática de versículos (pode ser expandida conforme necessário)*/
window.getSpecificVerseCount = function(livro, capitulo) {
    const versiculosPorCapitulo = {
        "genesis": { 1: 31, 2: 25, 3: 24, 4: 26, 5: 32, 6: 22, 7: 24, 8: 22, 9: 29, 10: 32, 11: 32, 12: 20,
                13: 18, 14: 24, 15: 21, 16: 16, 17: 27, 18: 33, 19: 38, 20: 18, 21: 34},  // 22: 24, 23: 20, 24: 67, 25: 34, 26: 35, 27: 46, 28: 22, 29: 35, 30: 43, 31: 55, 32: 32, 33: 20, 34: 31, 35: 29, 36: 43, 37: 36, 38: 30, 39: 23, 40: 23, 41: 57, 42: 38, 43: 34, 44: 34, 45: 28, 46: 34, 47: 31, 48: 22, 49: 33, 50: 26 },
        "mateus": { 1: 25 } 
    };
    /*BLOCO: */
    const contagem = versiculosPorCapitulo[livro]?.[capitulo];
    if (typeof contagem === 'undefined') {
        console.warn(`[ORIGINAL] Contagem de versículos não encontrada para ${livro} ${capitulo}.`);
        return 0;
    }
    return contagem;
};

// BLOCO: Função para carregar um versículo específico da versão "original"*/
window.loadSpecificVerse = async function(livro, capitulo, versiculo) {
    console.log(`[ORIGINAL] Carregando: ${livro} ${capitulo}:${versiculo}`);
    const verseTextContainer = document.querySelector('.conteudo-versiculos');
    if (!verseTextContainer) {
        console.error("[ORIGINAL] Elemento '.conteudo-versiculos' não encontrado.");
        return;
    }
/* BLOCO:                                                                        */
    const existingVerseTextDiv = verseTextContainer.querySelector('.texto-versiculo');
    if (existingVerseTextDiv) {
        existingVerseTextDiv.remove();
    }

    const versiculoElementDiv = document.createElement('div');
    versiculoElementDiv.classList.add('versiculo', 'texto-versiculo');
/* BLOCO:                                                                        */
    try {
        const response = await fetch(`../versao/original/${livro}/${capitulo}.json`);
        if (!response.ok) throw new Error(`HTTP ${response.status} ao buscar JSON.`);
        /*BLOCO:*/
        const rawData = await response.json();
        const chapterData = Array.isArray(rawData) ? rawData[0] : rawData;
        const isAntigoTestamento = livrosAntigoTestamento.includes(livro);
/* BLOCO:                                                                        */
        if (chapterData && chapterData.versiculos && chapterData.versiculos[versiculo]) {
            const verseData = chapterData.versiculos[versiculo];
            
            const textoP = document.createElement('p');
            textoP.id = `versiculo-${versiculo}`;
            textoP.classList.add('traducao-completa');
            textoP.textContent = verseData.traducao_completa;
            versiculoElementDiv.appendChild(textoP);
/* BLOCO:                                                                        */
            if (verseData.palavras && verseData.palavras.length > 0) {
                const palavrasContainerDiv = document.createElement('div');
                palavrasContainerDiv.classList.add('palavras-container');
                
                // BLOCO: Aplica estilo de direção via JavaScript**/
                palavrasContainerDiv.style.direction = isAntigoTestamento ? 'rtl' : 'ltr';

                verseData.palavras.forEach(palavra => {
                    const wordDetailItemDiv = document.createElement('div');
                    wordDetailItemDiv.classList.add('word-detail-item');

                    const originalLangDiv = document.createElement('div');
                    const transliteralDiv = document.createElement('div');
                    const traducaoPalavraDiv = document.createElement('div');
                    
                    let originalText = '';
                    const textAlignStyle = isAntigoTestamento ? 'right' : 'left';
                    const alignItemsStyle = isAntigoTestamento ? 'flex-end' : 'flex-start';

                    wordDetailItemDiv.style.alignItems = alignItemsStyle;

                    // BLOCO: Aplica alinhamento a todos os divs internos
                    [originalLangDiv, transliteralDiv, traducaoPalavraDiv].forEach(div => {
                        div.style.textAlign = textAlignStyle;
                    });

                    if (isAntigoTestamento) {
                        originalLangDiv.classList.add('hebraico-text');
                        originalText = palavra.hebraico || '';
                    } else {
                        originalLangDiv.classList.add('grego-text');
                        originalText = palavra.grego || '';
                    }
                    originalLangDiv.textContent = originalText;
/* BLOCO:                                                                        */
                    transliteralDiv.classList.add('transliteral-text');
                    transliteralDiv.textContent = palavra.transliteral;
                    traducaoPalavraDiv.classList.add('traducao-palavra-text');
                    traducaoPalavraDiv.textContent = palavra.traducao_palavra;
                  /*BLOCO:*/  
                    wordDetailItemDiv.appendChild(originalLangDiv);
                    wordDetailItemDiv.appendChild(transliteralDiv);
                    wordDetailItemDiv.appendChild(traducaoPalavraDiv);

                    palavrasContainerDiv.appendChild(wordDetailItemDiv);
                });
                versiculoElementDiv.appendChild(palavrasContainerDiv);
            }
        } else {
            versiculoElementDiv.innerHTML = `<p>Versículo ${versiculo} não encontrado.</p>`;
        }
    } catch (error) {
        console.error(`[ORIGINAL] Erro FATAL ao carregar versículo:`, error);
        versiculoElementDiv.innerHTML = `<p style="color:red;">Erro ao carregar. Detalhes: ${error.message}</p>`;
    }

    verseTextContainer.appendChild(versiculoElementDiv);
};

// BLOCO Funções auxiliares (sem alterações)
window.getSpecificChapterTitle = async function(livro, capitulo, versiculo) {
    return null;                                                                  // Simplificado por enquanto
};
window.isReadingModeEnabled = false;
