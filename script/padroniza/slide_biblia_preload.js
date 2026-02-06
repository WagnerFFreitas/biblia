/*===============================================================================*/
/*                  MÓDULO DE PRÉ-CARREGAMENTO PARA SLIDES                       */
/*===============================================================================*/
/*  Este script é responsável por:                                               */
/*                       - Antecipar o download dos textos bíblicos              */
/*                       - Armazenar capítulos em cache na memória RAM           */
/*                       - Otimizar a velocidade de abertura da janela pop-up    */
/*===============================================================================*/

console.log("[slide_biblia_preload.js] Script iniciado.")                                                                /* Log de inicialização do preloader        */

/* BLOCO: Função assíncrona para buscar e armazenar um versículo ou capítulo específico antes da exibição oficial    */
async function preCarregarVersiculo(livro, capitulo, versao) {                                                           /* Inicia a rotina de busca antecipada      */
    const jsonFileVersions = ['ara', 'nvi', 'acf', 'ntlh', 'kjv', 'naa', 'original']                                     /* Lista as traduções em formato JSON       */
    const isJsonFile = jsonFileVersions.includes(versao)                                                                 /* Valida se a bíblia é do tipo JSON        */
    const fileExtension = isJsonFile ? 'json' : 'html'                                                                   /* Define o sufixo conforme o formato       */
    const caminho = `../versao/${versao}/${livro}/${capitulo}.${fileExtension}`                                          /* Constrói o endereço de carregamento      */
    
    /* BLOCO: Executa a requisição de busca do capítulo e armazena os dados recuperados no cache global do sistema   */
    try {
        const resposta = await fetch(caminho)                                                                            /* Solicita o arquivo ao servidor web       */
        if (resposta.ok) {                                                                                               /* Verifica se o download foi um sucesso    */
            const conteudo = isJsonFile ? await resposta.json() : await resposta.text()                                  /* Converte a resposta em dado legível      */
            
            window.versiculoCache = window.versiculoCache || {}                                                          /* Inicializa o objeto de memória RAM       */
            window.versiculoCache[`${versao}_${livro}_${capitulo}`] = conteudo                                           /* Salva o conteúdo na chave de cache       */
            return true                                                                                                  /* Confirma sucesso do pre-carregamento     */
        }
    } catch (erro) {
        console.error('[slide_biblia_preload.js] Erro ao pré-carregar:', erro)                                           /* Relata erro técnico de conexão           */
    }
    return false                                                                                                         /* Retorna falha na busca antecipada        */
}

/* BLOCO: Intercepta e modifica a função de geração de interface para suportar o uso de dados cacheados na memória   */
const originalGerarHtmlJanelaSlide = window.gerarHtmlJanelaSlide                                                         /* Preserva a função geradora original      */
window.gerarHtmlJanelaSlide = function(livroAtual, capituloAtual, versiculoAtual, versaoAtual, ...args) {                /* Sobrescreve o método de geração          */
    
    /* BLOCO: Identifica se o capítulo solicitado já se encontra armazenado na memória para otimizar o carregamento  */
    const cacheKey = `${versaoAtual}_${livroAtual}_${capituloAtual}`                                                     /* Gera a chave de busca na memória         */
    const conteudoCache = window.versiculoCache && window.versiculoCache[cacheKey]                                       /* Verifica se os dados estão salvos        */
    
    let html = originalGerarHtmlJanelaSlide(livroAtual, capituloAtual, versiculoAtual, versaoAtual, ...args)             /* Recupera o código HTML padrão            */
    
    if (conteudoCache) {
        
        /* BLOCO: Modifica a estrutura HTML original para suprimir o aviso de carregamento e preparar exibição direta*/
        html = html.replace(
            '<div class="texto-versiculo">Carregando...</div>',                                                          /* Localiza o marcador de espera            */
            '<div class="texto-versiculo"></div>'                                                                        /* Substitui por uma área limpa             */
        )
    }
    
    return html                                                                                                          /* Retorna o código HTML otimizado          */
}

/* BLOCO: Sobrescreve o comando de abertura de janela para garantir que os dados sejam baixados antes do pop-up abrir*/
const originalAbrirJanelaSlide = window.abrirJanelaSlide                                                                 /* Preserva o comando de abertura original  */
window.abrirJanelaSlide = async function(livroAtual, capituloAtual, versiculoAtual, versaoAtual) {                       /* Inicia nova lógica de abertura           */
    
    /* BLOCO: Invoca a rotina de busca antecipada para garantir que os dados estejam disponíveis antes da abertura   */
    await preCarregarVersiculo(livroAtual, capituloAtual, versaoAtual)                                                   /* Dispara o carregamento em background     */
    
    /* BLOCO: Executa o comando de abertura da janela enviando os parâmetros necessários para o motor do slide       */
    return originalAbrirJanelaSlide(livroAtual, capituloAtual, versiculoAtual, versaoAtual)                              /* Abre o pop-up com dados em cache         */
}

console.log("[slide_biblia_preload.js] Script carregado.")                                                               /* Log de conclusão do carregamento         */