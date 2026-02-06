/*===============================================================================*/
/*                  MÓDULO DE PRÉ-CARREGAMENTO PARA SLIDES                     */
/*===============================================================================*/

console.log("[slide_biblia_preload.js] Script iniciado.")

// Função para pré-carregar um versículo específico
async function preCarregarVersiculo(livro, capitulo, versao) {
    const jsonFileVersions = ['ara', 'nvi', 'acf', 'ntlh', 'kjv', 'naa', 'original']
    const isJsonFile = jsonFileVersions.includes(versao)
    const fileExtension = isJsonFile ? 'json' : 'html'
    const caminho = `../versao/${versao}/${livro}/${capitulo}.${fileExtension}`
    
    try {
        const resposta = await fetch(caminho)
        if (resposta.ok) {
            const conteudo = isJsonFile ? await resposta.json() : await resposta.text()
            // Armazena em cache
            window.versiculoCache = window.versiculoCache || {}
            window.versiculoCache[`${versao}_${livro}_${capitulo}`] = conteudo
            return true
        }
    } catch (erro) {
        console.error('[slide_biblia_preload.js] Erro ao pré-carregar:', erro)
    }
    return false
}

// Modificar a função gerarHtmlJanelaSlide para usar o cache
const originalGerarHtmlJanelaSlide = window.gerarHtmlJanelaSlide
window.gerarHtmlJanelaSlide = function(livroAtual, capituloAtual, versiculoAtual, versaoAtual, ...args) {
    // Se o conteúdo já estiver em cache, modifica o HTML inicial para não mostrar "Carregando..."
    const cacheKey = `${versaoAtual}_${livroAtual}_${capituloAtual}`
    const conteudoCache = window.versiculoCache && window.versiculoCache[cacheKey]
    
    let html = originalGerarHtmlJanelaSlide(livroAtual, capituloAtual, versiculoAtual, versaoAtual, ...args)
    
    if (conteudoCache) {
        // Remove a mensagem "Carregando..." e já insere o conteúdo
        html = html.replace(
            '<div class="texto-versiculo">Carregando...</div>',
            '<div class="texto-versiculo"></div>'
        )
    }
    
    return html
}

// Modificar a função abrirJanelaSlide para pré-carregar o conteúdo
const originalAbrirJanelaSlide = window.abrirJanelaSlide
window.abrirJanelaSlide = async function(livroAtual, capituloAtual, versiculoAtual, versaoAtual) {
    // Inicia o pré-carregamento
    await preCarregarVersiculo(livroAtual, capituloAtual, versaoAtual)
    
    // Chama a função original após o pré-carregamento
    return originalAbrirJanelaSlide(livroAtual, capituloAtual, versiculoAtual, versaoAtual)
}

console.log("[slide_biblia_preload.js] Script carregado.")