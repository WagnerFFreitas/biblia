/*===============================================================================*/
/*               SCRIPT ESPECÍFICO PARA ORIGINAL (Texto Original)                */
/*===============================================================================*/
/*  Este arquivo contém:                                                         */
/*               - Funções para carregar e exibir versículos da versão Original  */
/*               - Lógica para diferenciar Antigo (Hebraico) e Novo (Grego)      */
/*               - Construção de interface interlinear (transliteração)          */
/*===============================================================================*/

window.BIBLE_VERSION = 'original';                                                         // Identificador da versão Original
window.NOME_VERSAO_COMPLETA_BIBLIA = 'Texto Original';                                     // Nome completo da tradução
console.log(`[${window.BIBLE_VERSION}.js] Script carregado. Definindo funções para ORIGINAL.`); // Log de inicialização

const livrosAntigoTestamento = [                                                           // Lista dos livros do Antigo Testamento
    'genesis', 'exodo', 'levitico', 'numeros', 'deuteronomio', 'josue', 'juizes', 'rute', '1samuel', '2samuel',
    '1reis', '2reis', '1cronicas', '2cronicas', 'esdras', 'neemias', 'ester', 'jo', 'salmos', 'proverbios',
    'eclesiastes', 'cantares', 'isaias', 'jeremias', 'lamentacoes', 'ezequiel', 'daniel', 'oseias', 'joel',
    'amos', 'obadias', 'jonas', 'miqueias', 'naum', 'habacuque', 'sofonias', 'ageu', 'zacarias', 'malaquias'
];

window.getSpecificVerseCount = function(livro, capitulo) {                                 // Função para contar versículos
    const versiculosPorCapitulo = {                                                        // Tabela de contagem de versículos
        "genesis": { 1: 31, 2: 25, 3: 24, 4: 26, 5: 32, 6: 22, 7: 24, 8: 22, 9: 29, 10: 32, 11: 32, 12: 20,
                13: 18, 14: 24, 15: 21, 16: 16, 17: 27, 18: 33, 19: 38, 20: 18, 21: 34},
        "mateus": { 1: 25 }                                                                // Exemplo - versão completa teria todos os livros
    };

    const contagem = versiculosPorCapitulo[livro]?.[capitulo];                             // Busca contagem na tabela
    
    if (typeof contagem === 'undefined') {                                                 // Se não encontrar contagem
        console.warn(`[ORIGINAL] Contagem de versículos não encontrada para ${livro} ${capitulo}.`); // Log de aviso
        return 0;                                                                          // Retorna zero versículos
    }
    return contagem;                                                                       // Retorna número de versículos
};

window.loadSpecificVerse = async function(livro, capitulo, versiculo) {                    // Função principal de carregamento
    console.log(`[ORIGINAL] Carregando: ${livro} ${capitulo}:${versiculo}`);               // Log do versículo sendo carregado
    const verseTextContainer = document.querySelector('.conteudo-versiculos');             // Localiza contêiner no DOM
    if (!verseTextContainer) {                                                             // Validação do contêiner
        console.error("[ORIGINAL] Elemento '.conteudo-versiculos' não encontrado.");       // Log de erro
        return;                                                                            // Interrompe execução
    }

    const existingVerseTextDiv = verseTextContainer.querySelector('.texto-versiculo');     // Busca versículo anterior
    if (existingVerseTextDiv) {                                                            // Se existe versículo anterior
        existingVerseTextDiv.remove();                                                     // Remove da interface
    }

    const versiculoElementDiv = document.createElement('div');                             // Cria contêiner do versículo
    versiculoElementDiv.classList.add('versiculo', 'texto-versiculo');                     // Aplica classes CSS

    try {                                                                                  // Inicia tratamento de erro
        const response = await fetch(`../versao/original/${livro}/${capitulo}.json`);      // Requisita arquivo JSON
        if (!response.ok) throw new Error(`HTTP ${response.status} ao buscar JSON.`);      // Valida resposta HTTP
        
        const rawData = await response.json();                                             // Converte para objeto
        const chapterData = Array.isArray(rawData) ? rawData[0] : rawData;                 // Normaliza acesso aos dados
        const isAntigoTestamento = livrosAntigoTestamento.includes(livro);                 // Define se é Antigo Testamento

        if (chapterData && chapterData.versiculos && chapterData.versiculos[versiculo]) {  // Verifica se versículo existe
            const verseData = chapterData.versiculos[versiculo];                           // Captura dados do versículo
            
            const textoP = document.createElement('p');                                    // Cria parágrafo da tradução
            textoP.id = `versiculo-${versiculo}`;                                         // Define ID único
            textoP.classList.add('traducao-completa');                                    // Aplica classe CSS
            textoP.textContent = verseData.traducao_completa;                             // Define texto em português
            versiculoElementDiv.appendChild(textoP);                                      // Adiciona tradução ao contêiner

            if (verseData.palavras && verseData.palavras.length > 0) {                    // Verifica se há palavras originais
                const palavrasContainerDiv = document.createElement('div');               // Cria contêiner das palavras
                palavrasContainerDiv.classList.add('palavras-container');                 // Aplica classe CSS
                
                palavrasContainerDiv.style.direction = isAntigoTestamento ? 'rtl' : 'ltr'; // Define direção do texto

                verseData.palavras.forEach(palavra => {                                   // Itera sobre cada palavra
                    const wordDetailItemDiv = document.createElement('div');              // Cria item de palavra
                    wordDetailItemDiv.classList.add('word-detail-item');                  // Aplica classe CSS

                    const originalLangDiv = document.createElement('div');                // Div para texto original
                    const transliteralDiv = document.createElement('div');                // Div para transliteração
                    const traducaoPalavraDiv = document.createElement('div');             // Div para tradução

                    let originalText = '';                                                // Buffer para texto original
                    const textAlignStyle = isAntigoTestamento ? 'right' : 'left';         // Define alinhamento do texto
                    const alignItemsStyle = isAntigoTestamento ? 'flex-end' : 'flex-start'; // Define alinhamento flex

                    wordDetailItemDiv.style.alignItems = alignItemsStyle;                 // Aplica alinhamento flex

                    [originalLangDiv, transliteralDiv, traducaoPalavraDiv].forEach(div => { // Aplica alinhamento a todos
                        div.style.textAlign = textAlignStyle;                             // Define alinhamento do texto
                    });

                    if (isAntigoTestamento) {                                             // Se é Antigo Testamento
                        originalLangDiv.classList.add('hebraico-text');                   // Aplica classe hebraica
                        originalText = palavra.hebraico || '';                            // Obtém texto hebraico
                    } else {                                                              // Se é Novo Testamento
                        originalLangDiv.classList.add('grego-text');                      // Aplica classe grega
                        originalText = palavra.grego || '';                               // Obtém texto grego
                    }
                    originalLangDiv.textContent = originalText;                           // Define texto original

                    transliteralDiv.classList.add('transliteral-text');                   // Aplica classe de transliteração
                    transliteralDiv.textContent = palavra.transliteral;                   // Define transliteração
                    traducaoPalavraDiv.classList.add('traducao-palavra-text');            // Aplica classe de tradução
                    traducaoPalavraDiv.textContent = palavra.traducao_palavra;            // Define tradução da palavra
                    
                    wordDetailItemDiv.appendChild(originalLangDiv);                       // Adiciona texto original
                    wordDetailItemDiv.appendChild(transliteralDiv);                       // Adiciona transliteração
                    wordDetailItemDiv.appendChild(traducaoPalavraDiv);                    // Adiciona tradução

                    palavrasContainerDiv.appendChild(wordDetailItemDiv);                  // Adiciona palavra ao contêiner
                });
                versiculoElementDiv.appendChild(palavrasContainerDiv);                    // Adiciona palavras ao versículo
            }
        } else {                                                                          // Se versículo não encontrado
            versiculoElementDiv.innerHTML = `<p>Versículo ${versiculo} não encontrado.</p>`; // Define mensagem de erro
        }
    } catch (error) {                                                                     // Captura erros
        console.error(`[ORIGINAL] Erro ao carregar versículo:`, error);                  // Log de erro
        versiculoElementDiv.innerHTML = `<p style="color:red;">Erro ao carregar. Detalhes: ${error.message}</p>`; // Mensagem de erro visual
    }

    verseTextContainer.appendChild(versiculoElementDiv);                                  // Adiciona versículo à página
};

window.getSpecificChapterTitle = async function(livro, capitulo, versiculo) {             // Função para obter título
    return null;                                                                          // Retorna null (não implementado)
};

window.isReadingModeEnabled = false;                                                      // Estado do modo leitura