/*===============================================================================*/
/*            SCRIPT ESPECÍFICO PARA NVI (Nova Versão Internacional)             */
/*===============================================================================*/
/*  Este arquivo contém:                                                         */
/*           - Funções para carregar e exibir versículos da versão NVI           */
/*                  - Manipulação de títulos e modo de leitura                   */
/*===============================================================================*/

/* BLOCO: Define as constantes globais de identificação e o nome completo da     */
/* tradução para o sistema                                                       */
window.BIBLE_VERSION                   = 'nvi';                                   // Identificador da versão
window.NOME_VERSAO_COMPLETA_BIBLIA     = 'Nova Versão Internacional';             // Nome completo da tradução
console.log(`[${window.BIBLE_VERSION}.js] Script carregado. Definindo funções específicas para NVI.`);  // Log de carga do módulo

/* BLOCO: Função que retorna a contagem de versículos consultando o motor de     */
/* dados central                                                                 */
window.getSpecificVerseCount = function(livro, capitulo) {                        // Inicia contador de versos
    return window.getVerseCount(livro, capitulo);                                 // Consulta base de dados
}

/* BLOCO: Função assíncrona responsável por buscar o JSON da tradução e          */
/* renderizar o versículo na tela                                                */
window.loadSpecificVerse = async function(livro, capitulo, versiculo) {           // Inicia motor de carga
    console.log(`[NVI] Carregando: ${livro} ${capitulo}:${versiculo}`);           // Log de posição de leitura
    const content = document.querySelector('.conteudo');                          // Localiza contêiner no DOM
    if (!content) {                                                               // Valida existência elemento
        console.error("[NVI] Elemento .conteudo não encontrado.");                // Relata falha de interface
        return;
    }

    /* BLOCO: Localiza e remove a exibição do versículo anterior para preparar a interface para o novo conteúdo*/
    const existingVersiculoDiv = content.querySelector('.texto-versiculo');       // Busca div de verso antigo
    if (existingVersiculoDiv) {
        existingVersiculoDiv.remove();                                            // Remove elemento do documento
    }

    /* BLOCO: Cria o contêiner visual do versículo e aplica classes para suportar o modo leitura        */
    const versiculoElementDiv = document.createElement('div');                    // Instancia elemento de bloco
    versiculoElementDiv.classList.add('versiculo', 'texto-versiculo');            // Atribui classes de estilo
    if (document.body.classList.contains('module-leitura')) {                     // Verifica estado interface
        versiculoElementDiv.classList.add('modo-leitura');                        // Aplica layout de leitura
    }

    /* BLOCO: Tenta realizar a requisição do arquivo JSON contendo o texto e os títulos do capítulo     */
    try {
        const response = await fetch(`../versao/nvi/${livro}/${capitulo}.json`);  // Solicita arquivo ao servidor
        if (!response.ok) {                                                       // Valida resposta da rede
            throw new Error(`HTTP ${response.status} ao buscar JSON para ${livro} ${capitulo} (NVI)`);  // Lança exceção de falha
        }
        const data = await response.json();                                       // Converte em objeto real

        /* BLOCO: Valida a existência do versículo nos dados e processa o título da seção se disponível */
        if (data.versiculos && data.versiculos[versiculo]) {                      // Verifica se índice existe
            if (data.titulos && data.titulos[versiculo]) {                        // Verifica subtítulo da seção
                const tituloInternoH3 = document.createElement('h3');             // Cria cabeçalho de seção
                tituloInternoH3.classList.add('titulo-versiculo-interno');        // Estiliza o cabeçalho
                tituloInternoH3.textContent = data.titulos[versiculo];            // Insere texto do título
                versiculoElementDiv.appendChild(tituloInternoH3);                 // Anexa ao bloco do versículo
            }

            /* BLOCO: Instancia o parágrafo para o texto bíblico e atribui o identificador único para busca*/
            const textoP = document.createElement('p');                           // Cria elemento de parágrafo
            textoP.id = `versiculo-${versiculo}`;                                 // Define identificador único
            textoP.textContent = data.versiculos[versiculo];                      // Insere o texto sagrado
            versiculoElementDiv.appendChild(textoP);                              // Anexa texto ao bloco
        } else {   
            /* BLOCO: Trata o caso de versículo não localizado nos dados carregados do servidor         */
            const textoP = document.createElement('p');                           // Cria aviso de ausência
            textoP.textContent = `Versículo ${versiculo} não encontrado nos dados.`;  // Define mensagem amigável
            versiculoElementDiv.appendChild(textoP);                              // Anexa aviso ao bloco
            console.warn(`[NVI] Versículo ${versiculo} não encontrado em ${livro} ${capitulo}.json (NVI)`);  // Alerta técnico no console
        }
    } catch (error) {                                                             // Captura falha na requisição
        
        /* BLOCO: Registra a falha técnica no console e exibe um alerta visual de erro para o usuário   */
        console.error(`[NVI] Erro ao carregar versículo ${livro} ${capitulo}:${versiculo} (NVI):`, error);  // Log de erro crítico técnico
        const textoP = document.createElement('p');                               // Cria parágrafo de erro
        textoP.textContent = `Erro ao carregar versículo ${versiculo}.`;          // Define aviso de erro
        textoP.style.color = "red";                                               // Aplica destaque visual
        versiculoElementDiv.appendChild(textoP);                                  // Anexa erro ao bloco
    }

    content.appendChild(versiculoElementDiv);                                     // Publica versículo no site

    /* BLOCO: Atualiza o elemento de título H2 principal para refletir a navegação atual do usuário     */
    if (window.titulo) {                                                          // Verifica se H2 está pronto
        let nomeLivroDisplay = livro.toUpperCase();                               // Buffer para nome do livro
        if (typeof window.getLivroDisplayName === 'function') {                   // Verifica tradutor de nomes
            nomeLivroDisplay = window.getLivroDisplayName(livro);                 // Obtém nome legível
        } else {
            console.warn("[NVI] Função getLivroDisplayName não encontrada.");     // Alerta falta de função
        }
        window.titulo.textContent = `${nomeLivroDisplay} - CAPÍTULO ${capitulo} - VERSÍCULO ${versiculo}`;  // Escreve novo título H2
    } else {
        console.warn(`[NVI] Elemento H2 principal (window.titulo) não encontrado.`);  // Alerta ausência de H2
    }
}

/* BLOCO: Função destinada a recuperar o título de seção de um capítulo          */
/* específico via requisição assíncrona                                          */
window.getSpecificChapterTitle = async function(livro, capitulo, versiculo) {     // Inicia busca de subtítulo
    console.log(`[NVI] Obtendo título interno para: ${livro} ${capitulo}:${versiculo}`);  // Log de busca de metadados
    try {
        const response = await fetch(`../versao/nvi/${livro}/${capitulo}.json`);  // Solicita dados ao servidor
        if (!response.ok) {                                                       // Valida resposta da rede
            throw new Error(`HTTP ${response.status} ao buscar JSON para ${livro} ${capitulo} (NVI)`);  // Lança exceção de erro
        }
        const data = await response.json();                                       // Converte em objeto real
        return data.titulos && data.titulos[versiculo] ? data.titulos[versiculo] : null;  // Retorna subtítulo ou nulo
    } catch (error) {
        console.error(`[NVI] Erro ao obter título interno para ${livro} ${capitulo}:${versiculo} (NVI):`, error);  // Log de falha na busca
        return null;                                                              // Retorno seguro no erro
    }
}
