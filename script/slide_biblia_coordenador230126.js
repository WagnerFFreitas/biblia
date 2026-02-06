/*===============================================================================*/
/*                             COORDENADOR DO SLIDE                              */
/*===============================================================================*/
/*  Este arquivo agora contém apenas:                                            */
/*                                   - Inicialização e configuração do listener  */
/*                                   - Coordenação entre os módulos              */
/*===============================================================================*/

console.log("[slide_biblia_coordenador.js] Script iniciado.")                                  // Indica o início do coordenador do slide

// Cria a função para inicializar o listener do link 'Slide' (mantida do original)
function inicializarSlide() {
    console.log("[slide_biblia_coordenador.js] Configurando listener do link 'Slide'.")        // Loga o início da configuração do listener
    let linkSlideEncontrado = document.getElementById("link-slide")                            // Procura o link pelo ID
    if (!linkSlideEncontrado) {                                                                // Se não encontrar pelo ID, procura pelo texto
        const linksHeader = document.querySelectorAll("header nav ul li a")                    // Seleciona todos os links do header
        linksHeader.forEach((link) => {
            if (link.textContent.trim().toLowerCase() === "slide") {                           // Compara o texto do link
                linkSlideEncontrado = link                                                     // Se encontrar, armazena a referência
            }
        })
    }

    if (linkSlideEncontrado) {                                                                 // Se encontrou o link do slide
        linkSlideEncontrado.addEventListener("click", (event) => {                             // Adiciona o listener de clique
            event.preventDefault() // Previne o comportamento padrão do link
            console.log("[slide_biblia_coordenador.js] Link 'Slide' clicado.")                 // Loga o clique
            const urlParams = new URLSearchParams(window.location.search)                      // Obtém os parâmetros da URL
            const versao = window.BIBLE_VERSION || urlParams.get("version") || "arc"           // Define a versão da bíblia
            let livro = window.activeLivro || "genesis"                                        // Define o livro ativo
            const cap = window.activeCapitulo || 1                                             // Define o capítulo ativo
            const versBtn = window.activeVersiculoButton                                       // Obtém o botão do versículo ativo
            const versNum = versBtn
                ? Number.parseInt(versBtn.dataset.versiculo, 10) || Number.parseInt(versBtn.textContent.trim(), 10) || 1 // Extrai o número do versículo
                : 1

            if (!livro || !cap) {                                                                                        // Se não houver livro ou capítulo selecionado
                alert("Por favor, selecione um livro e capítulo primeiro.")                                              // Alerta o usuário
                console.warn("[slide_biblia_coordenador.js] Tentativa de abrir slide sem livro/capítulo ativo.")         // Loga o erro
                return
            }

            livro = window.normalizarNomeLivro(livro)                                          // Normaliza o nome do livro
            console.log(
                `[slide_biblia_coordenador.js] Estado atual para slide: Versão=${versao}, Livro=${livro}, Cap=${cap}, VersNum=${versNum}`,
            )                                                                                  // Loga o estado atual
            window.abrirJanelaSlide(livro, cap, versNum, versao)                               // Chama a função para abrir a janela do slide
        })
    } else {
        console.warn("[slide_biblia_coordenador.js] Link 'Slide' não encontrado no cabeçalho.")// Loga se não encontrou o link
    }
}

window.inicializarSlide = inicializarSlide                                                     // Exporta a função globalmente

// Cria a função para inicializar automaticamente quando o DOM estiver pronto.
function inicializarQuandoPronto() {
    const modulosNecessarios = [                                                               // Verifica se todos os módulos necessários foram carregados
        'gerarHtmlJanelaSlide',
        'escreverHtmlNaJanela',
        'abrirJanelaSlide',
        'normalizarNomeLivro',
        'contagemVersiculosPorVersao',
        'livrosOrdem'
    ]
    
    const modulosCarregados = modulosNecessarios.every(modulo => typeof window[modulo] !== 'undefined')      // Verifica se todos os módulos estão definidos
        if (modulosCarregados) {                                                                             // Se todos os módulos estão carregados
        console.log("[slide_biblia_coordenador.js] Todos os módulos carregados, inicializando...")           // Loga o sucesso
        if (typeof inicializarSlide === "function") {
            inicializarSlide()                                                                 // Inicializa o listener do slide
        } else {
            console.error("[slide_biblia_coordenador.js] inicializarSlide não está definida.") // Loga erro se a função não existir
        }
    } else {
        console.log("[slide_biblia_coordenador.js] Aguardando módulos...")                     // Loga que está aguardando módulos
        setTimeout(inicializarQuandoPronto, 100)                                               // Tenta novamente após 100ms
    }
}

document.addEventListener("DOMContentLoaded", inicializarQuandoPronto)                         // Adiciona o listener para inicialização automática 