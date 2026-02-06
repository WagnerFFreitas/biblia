/*===============================================================================*/
/*               SCRIPT ESPECÍFICO PARA ORIGINAL (Texto Original)                */
/*===============================================================================*/
/*  Este arquivo contém:                                                         */
/*               - Funções para carregar e exibir versículos da versão Original  */
/*               - Lógica para diferenciar Antigo (Hebraico) e Novo (Grego)      */
/*               - Construção de interface interlinear (transliteração)          */
/*===============================================================================*/

/* BLOCO: Define as constantes globais de identificação e o nome completo da tradução para exibição no sistema          */
window.BIBLE_VERSION = 'original';                                                                                       /* Identificador da versão      */
window.NOME_VERSAO_COMPLETA_BIBLIA = 'Texto Original';                                                                   /* Nome completo da tradução    */
console.log(`[${window.BIBLE_VERSION}.js] Script carregado. Definindo funções específicas para ORIGINAL.`);              /* Log de carga do módulo       */

/* BLOCO: Lista exaustiva dos livros do Antigo Testamento para aplicar a direção de leitura da Direita para Esquerda    */
const livrosAntigoTestamento = [                                                                                         /* Inicia lista de livros RTL   */
    'genesis', 'exodo', 'levitico', 'numeros', 'deuteronomio', 'josue', 'juizes', 'rute', '1samuel', '2samuel',          
    '1reis', '2reis', '1cronicas', '2cronicas', 'esdras', 'neemias', 'ester', 'jo', 'salmos', 'proverbios',              
    'eclesiastes', 'cantares', 'isaias', 'jeremias', 'lamentacoes', 'ezequiel', 'daniel', 'oseias', 'joel',              
    'amos', 'obadias', 'jonas', 'miqueias', 'naum', 'habacuque', 'sofonias', 'ageu', 'zacarias', 'malaquias'             
];                                                                                                                       

/* BLOCO: Define o mapa de contagem de versículos para validação e geração da interface de navegação do texto original  */
window.getSpecificVerseCount = function(livro, capitulo) {                                                               /* Inicia contador de versos    */
    const versiculosPorCapitulo = {                                                                                      
        "genesis": { 1: 31, 2: 25, 3: 24, 4: 26, 5: 32, 6: 22, 7: 24, 8: 22, 9: 29, 10: 32, 11: 32, 12: 20,              
                13: 18, 14: 24, 15: 21, 16: 16, 17: 27, 18: 33, 19: 38, 20: 18, 21: 34},                                 
        "mateus": { 1: 25 }                                                                                              
    };

    /* BLOCO: Tenta localizar a contagem na base estática e retorna zero caso a configuração não seja encontrada        */
    const contagem = versiculosPorCapitulo[livro]?.[capitulo];                                                           /* Busca valor no dicionário    */
    if (typeof contagem === 'undefined') {                                                                               /* Verifica se o dado é nulo    */
        console.warn(`[ORIGINAL] Contagem de versículos não encontrada para ${livro} ${capitulo}.`);                     /* Alerta falha de mapeamento   */
        return 0;                                                                                                        /* Retorna valor de segurança   */
    }
    return contagem;                                                                                                     /* Entrega contagem real        */
};

/* BLOCO: Função principal assíncrona encarregada de buscar os dados interlineares e montar a interface do versículo    */
window.loadSpecificVerse = async function(livro, capitulo, versiculo) {                                                  /* Inicia carga do interlinear  */
    console.log(`[ORIGINAL] Carregando: ${livro} ${capitulo}:${versiculo}`);                                             /* Log de posição de leitura    */
    const verseTextContainer = document.querySelector('.conteudo-versiculos');                                           /* Localiza contêiner no DOM    */
    if (!verseTextContainer) {                                                                                           /* Valida existência do elemento*/
        console.error("[ORIGINAL] Elemento '.conteudo-versiculos' não encontrado.");                                     /* Relata falha de interface    */
        return;
    }

    /* BLOCO: Limpa o conteúdo textual anterior para preparar a exibição do novo versículo solicitado pelo usuário      */
    const existingVerseTextDiv = verseTextContainer.querySelector('.texto-versiculo');                                   /* Busca div de verso antigo    */
    if (existingVerseTextDiv) {
        existingVerseTextDiv.remove();                                                                                   /* Remove elemento do DOM       */
    }

    const versiculoElementDiv = document.createElement('div');                                                           /* Cria contêiner do versículo  */
    versiculoElementDiv.classList.add('versiculo', 'texto-versiculo');                                                   /* Atribui classes de estilo    */

    /* BLOCO: Realiza a requisição fetch para obter o arquivo JSON contendo as palavras originais e traduções           */
    try {
        const response = await fetch(`../versao/original/${livro}/${capitulo}.json`);                                    /* Solicita o arquivo JSON      */
        if (!response.ok) throw new Error(`HTTP ${response.status} ao buscar JSON.`);                                    /* Trata erro de requisição     */
        
        /* BLOCO: Analisa a estrutura do JSON carregado e identifica se o livro pertence ao Antigo Testamento           */
        const rawData = await response.json();                                                                           /* Converte resposta em objeto  */
        const chapterData = Array.isArray(rawData) ? rawData[0] : rawData;                                               /* Normaliza acesso aos dados   */
        const isAntigoTestamento = livrosAntigoTestamento.includes(livro);                                               /* Define se o idioma é Hebraico*/

        /* BLOCO: Verifica a presença dos dados do versículo e constrói a visualização da tradução completa e das palavras */
        if (chapterData && chapterData.versiculos && chapterData.versiculos[versiculo]) {                                /* Valida existência do verso   */
            const verseData = chapterData.versiculos[versiculo];                                                         /* Captura dados do versículo   */
            
            const textoP = document.createElement('p');                                                                  /* Cria parágrafo da tradução   */
            textoP.id = `versiculo-${versiculo}`;                                                                        /* Identifica o parágrafo       */
            textoP.classList.add('traducao-completa');                                                                   /* Estiliza texto corrido       */
            textoP.textContent = verseData.traducao_completa;                                                            /* Insere texto em Português    */
            versiculoElementDiv.appendChild(textoP);                                                                     /* Anexa tradução ao contêiner  */

            /* BLOCO: Itera sobre a lista de palavras para gerar os blocos interlineares individuais com o idioma original */
            if (verseData.palavras && verseData.palavras.length > 0) {                                                   /* Verifica lista de palavras   */
                const palavrasContainerDiv = document.createElement('div');                                              /* Cria caixa das palavras      */
                palavrasContainerDiv.classList.add('palavras-container');                                                /* Estiliza lista de palavras   */
                
                palavrasContainerDiv.style.direction = isAntigoTestamento ? 'rtl' : 'ltr';                               /* Define fluxo Direita/Esquerda*/

                verseData.palavras.forEach(palavra => {                                                                  /* Varre cada palavra original  */
                    const wordDetailItemDiv = document.createElement('div');                                             /* Cria item de detalhamento    */
                    wordDetailItemDiv.classList.add('word-detail-item');                                                 /* Estiliza item individual     */

                    const originalLangDiv = document.createElement('div');                                               /* Div para o texto original    */
                    const transliteralDiv = document.createElement('div');                                               /* Div para a pronúncia         */
                    const traducaoPalavraDiv = document.createElement('div');                                            /* Div para o significado       */
                    
                    let originalText = '';                                                                               /* Buffer para texto original   */
                    const textAlignStyle = isAntigoTestamento ? 'right' : 'left';                                        /* Alinha texto pelo idioma     */
                    const alignItemsStyle = isAntigoTestamento ? 'flex-end' : 'flex-start';                              /* Ajusta flexbox pelo idioma   */

                    wordDetailItemDiv.style.alignItems = alignItemsStyle;                                                /* Aplica alinhamento flex      */

                    /* BLOCO: Aplica as regras de alinhamento de texto em todos os elementos internos do bloco de palavra*/
                    [originalLangDiv, transliteralDiv, traducaoPalavraDiv].forEach(div => {
                        div.style.textAlign = textAlignStyle;                                                            /* Define alinhamento do texto  */
                    });

                    if (isAntigoTestamento) {
                        originalLangDiv.classList.add('hebraico-text');                                                  /* Estilo de fonte Hebraica     */
                        originalText = palavra.hebraico || '';                                                           /* Captura caracteres hebraicos */
                    } else {
                        originalLangDiv.classList.add('grego-text');                                                     /* Estilo de fonte Grega        */
                        originalText = palavra.grego || '';                                                              /* Captura caracteres gregos    */
                    }
                    originalLangDiv.textContent = originalText;                                                          /* Insere texto original na div */

                    /* BLOCO: Insere a transliteração fonética e o significado gramatical da palavra na estrutura HTML */
                    transliteralDiv.classList.add('transliteral-text');                                                  /* Estilo da transliteração     */
                    transliteralDiv.textContent = palavra.transliteral;                                                  /* Insere a pronúncia           */
                    traducaoPalavraDiv.classList.add('traducao-palavra-text');                                           /* Estilo do significado        */
                    traducaoPalavraDiv.textContent = palavra.traducao_palavra;                                           /* Insere tradução literal      */
                    
                    /* BLOCO: Organiza a hierarquia dos elementos visuais dentro do item de detalhamento da palavra     */  
                    wordDetailItemDiv.appendChild(originalLangDiv);                                                      /* Anexa idioma original        */
                    wordDetailItemDiv.appendChild(transliteralDiv);                                                      /* Anexa fonética               */
                    wordDetailItemDiv.appendChild(traducaoPalavraDiv);                                                   /* Anexa significado            */

                    palavrasContainerDiv.appendChild(wordDetailItemDiv);                                                 /* Anexa palavra à lista        */
                });
                versiculoElementDiv.appendChild(palavrasContainerDiv);                                                   /* Anexa lista ao versículo     */
            }
        } else {
            versiculoElementDiv.innerHTML = `<p>Versículo ${versiculo} não encontrado.</p>`;                             /* Alerta erro de localização   */
        }
    } catch (error) {
        console.error(`[ORIGINAL] Erro FATAL ao carregar versículo:`, error);                                            /* Loga falha crítica técnica   */
        versiculoElementDiv.innerHTML = `<p style="color:red;">Erro ao carregar. Detalhes: ${error.message}</p>`;        /* Alerta erro visual crítico   */
    }

    verseTextContainer.appendChild(versiculoElementDiv);                                                                 /* Publica o versículo no site  */
};

/* BLOCO: Funções auxiliares destinadas à recuperação de metadados do capítulo (em fase de simplificação)               */
window.getSpecificChapterTitle = async function(livro, capitulo, versiculo) {                                            /* Inicia busca de títulos      */
    return null;                                                                                                         /* Retorno nulo padrão          */
};
window.isReadingModeEnabled = false;                                                                                     /* Define estado do modo leitura*/