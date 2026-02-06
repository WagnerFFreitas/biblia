/*===============================================================================*/
/*                             COORDENADOR DO SLIDE                              */
/*===============================================================================*/
/*  Este arquivo é responsável por:                                              */
/*                                   - Inicializar e configurar o listener       */
/*                                   - Coordenar a comunicação entre módulos     */
/*                                   - Gerenciar a abertura da janela de slide   */
/*===============================================================================*/

console.log("[slide_biblia_coordenador.js] Script iniciado.")                                                            /* Log de inicialização do coordenador  */

/* BLOCO: Define a função que localiza o gatilho de abertura do slide no cabeçalho e vincula os eventos de monitoramento */
function inicializarSlide() {
    console.log("[slide_biblia_coordenador.js] Configurando listener do link 'Slide'.")                                  /* Log de configuração do listener      */
    let linkSlideEncontrado = document.getElementById("link-slide")                                                      /* Procura o link pelo ID oficial       */
    if (!linkSlideEncontrado) {                                                                                          /* Fallback se não achar pelo ID        */
        const linksHeader = document.querySelectorAll("header nav ul li a")                                              /* Seleciona todos os links da navegação*/
        linksHeader.forEach((link) => {
            if (link.textContent.trim().toLowerCase() === "slide") {                                                     /* Compara o texto interno do link      */
                linkSlideEncontrado = link                                                                               /* Armazena a referência encontrada     */
            }
        })
    }

    /* BLOCO: Adiciona o escutador de cliques para capturar o estado atual da bíblia e disparar a janela de projeção    */
    if (linkSlideEncontrado) {
        linkSlideEncontrado.addEventListener("click", (event) => {                                                       /* Adiciona o listener de clique        */
            event.preventDefault()                                                                                       /* Bloqueia o comportamento de âncora   */
            console.log("[slide_biblia_coordenador.js] Link 'Slide' clicado.")                                           /* Log de acionamento do usuário        */
            const urlParams = new URLSearchParams(window.location.search)                                                /* Analisa os parâmetros da URL atual   */
            const versao = window.BIBLE_VERSION || urlParams.get("version") || "arc"                                     /* Identifica a tradução bíblica ativa  */
            let livro = window.activeLivro || "genesis"                                                                  /* Identifica o livro selecionado       */
            const cap = window.activeCapitulo || 1                                                                       /* Identifica o capítulo selecionado    */
            const versBtn = window.activeVersiculoButton                                                                 /* Captura o botão do versículo ativo   */
            const versNum = versBtn
                ? Number.parseInt(versBtn.dataset.versiculo, 10) || Number.parseInt(versBtn.textContent.trim(), 10) || 1 /* Extrai o índice numérico do verso    */
                : 1

            /* BLOCO: Realiza a validação de segurança para garantir que há um conteúdo selecionado antes da abertura   */
            if (!livro || !cap) {
                alert("Por favor, selecione um livro e capítulo primeiro.")                                              /* Emite alerta de orientação           */
                console.warn("[slide_biblia_coordenador.js] Tentativa de abertura sem seleção.")                         /* Log de aviso de falha na seleção     */
                return
            }

            livro = window.normalizarNomeLivro(livro)                                                                    /* Padroniza o identificador do livro   */
            console.log(
                `[slide_biblia_coordenador.js] Estado preparado: Versão=${versao}, Livro=${livro}, Cap=${cap}`)          /* Log de dados prontos para o slide    */
            window.abrirJanelaSlide(livro, cap, versNum, versao)                                                         /* Dispara o motor de abertura da janela*/
        })
    } else {
        console.warn("[slide_biblia_coordenador.js] Link 'Slide' não localizado no DOM.")                                /* Log de erro de carregamento visual   */
    }
}

window.inicializarSlide = inicializarSlide                                                                               /* Exporta a função para o escopo global*/

/* BLOCO: Define a rotina de pré-carregamento que assegura a disponibilidade de todos os módulos antes de liberar o uso */
function inicializarQuandoPronto() {
    const modulosNecessarios = [                                                                                         /* Lista de dependências obrigatórias   */
        'gerarHtmlJanelaSlide',
        'escreverHtmlNaJanela',
        'abrirJanelaSlide',
        'normalizarNomeLivro',
        'contagemVersiculosPorVersao',
        'livrosOrdem'
    ]
    
    /* BLOCO: Verifica a existência de cada módulo essencial no objeto window para evitar erros de execução             */
    const modulosCarregados = modulosNecessarios.every(modulo => typeof window[modulo] !== 'undefined')                  /* Valida as propriedades globais       */
        if (modulosCarregados) {
        console.log("[slide_biblia_coordenador.js] Módulos verificados, inicializando...")                               /* Log de sucesso de carregamento       */
        if (typeof inicializarSlide === "function") {
            inicializarSlide()                                                                                           /* Ativa os vínculos do slide           */
        } else {
            console.error("[slide_biblia_coordenador.js] inicializarSlide não disponível.")                              /* Log de erro de referência interna    */
        }
    } else {
        console.log("[slide_biblia_coordenador.js] Aguardando scripts de suporte...")                                    /* Log de espera por dependências       */
        setTimeout(inicializarQuandoPronto, 100)                                                                         /* Reagenda a verificação em 100ms      */
    }
}

document.addEventListener("DOMContentLoaded", inicializarQuandoPronto)                                                   /* Ativa a inicialização automática     */