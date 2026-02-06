/*===============================================================================*/
/*                        MÓDULO DE UTILITÁRIOS DO SLIDE                         */
/*===============================================================================*/
/*  Este módulo contém:                                                          */
/*                    - Funções para normalização de nomes de livros             */
/*                    - Funções para conversão de formatos                       */
/*                    - Utilitários gerais para contagem e validação             */
/*===============================================================================*/

// Este arquivo é como uma "caixa de ferramentas" para o sistema de slides.
// Imagine que você tem uma oficina com várias ferramentas especializadas:
// 1. Uma "chave inglesa" que converte nomes bonitos (Gênesis) para nomes técnicos (genesis)
// 2. Um "medidor" que conta quantos versículos tem cada capítulo
// 3. Um "navegador" que sabe qual é o próximo livro da Bíblia
// 4. Um "validador" que verifica se um livro existe numa tradução
// É como ter um "kit de ferramentas" completo para trabalhar com dados bíblicos!

console.log("[slide_biblia_utils.js] Script iniciado.")                                                                  
// ↑ Log de inicialização

// Esta função é como um "tradutor de nomes" que converte nomes bonitos para nomes técnicos.
// Exemplo: "Gênesis" (com acento) vira "genesis" (sem acento e minúsculo).
// É como ter um dicionário que traduz "linguagem humana" para "linguagem de computador".
function normalizarNomeLivro(nome) {                                                                                     
// ↑ Inicia normalização
    if (!window.livroAcentuadosParaSemAcentos) {                                                                         
    // ↑ Verifica se os dados bíblicos foram carregados
        console.warn("[slide_biblia_utils.js] Dados bíblicos não carregados")                                            
        // ↑ Alerta que os dados estão ausentes
        return nome.toLowerCase()                                                                                        
        // ↑ Como "plano B", apenas converte para minúsculas
    }

    const nomeLower = nome.toLowerCase()                                                                                 
    // ↑ Converte o nome para minúsculas

    const semAcentos = Object.keys(window.livroAcentuadosParaSemAcentos).find((key) => key.toLowerCase() === nomeLower)  
    // ↑ Procura no "dicionário" se existe uma tradução para este nome
    if (semAcentos) {
        return window.livroAcentuadosParaSemAcentos[semAcentos]                                                          
        // ↑ Se encontrou, retorna a versão "técnica" do nome
    }

    return (
        Object.keys(window.livroAcentuadosParaSemAcentos).find((key) => window.livroAcentuadosParaSemAcentos[key] === nomeLower) ||
        nomeLower                                                                                                        
        // ↑ Se não encontrou, retorna o nome original em minúsculas
    )
}

// Esta função faz o contrário da anterior: pega nomes técnicos e os torna bonitos.
// Exemplo: "genesis" (técnico) vira "Gênesis" (bonito, com acento).
// É como ter um "tradutor reverso" que converte "linguagem de computador" para "linguagem humana".
function obterNomeAcentuado(nomeSemAcento) {                                                                             
// ↑ Inicia busca de nome legível
    if (!window.livroAcentuadosParaSemAcentos) {                                                                         
    // ↑ Verifica se os dados bíblicos foram carregados
        console.warn("[slide_biblia_utils.js] Dados bíblicos não carregados")                                            
        // ↑ Alerta que os dados estão ausentes
        return nomeSemAcento                                                                                             
        // ↑ Como "plano B", retorna o nome técnico mesmo
    }

    return (
        Object.keys(window.livroAcentuadosParaSemAcentos).find((key) => window.livroAcentuadosParaSemAcentos[key] === nomeSemAcento) ||
        nomeSemAcento                                                                                                    
        // ↑ Procura o nome bonito correspondente, ou retorna o técnico se não encontrar
    )
}

// Esta função é como um "verificador de existência" que confirma se um livro existe numa tradução.
// Exemplo: verifica se o livro "genesis" existe na tradução "nvi".
// É como perguntar: "Ei, você tem este livro nesta versão da Bíblia?"
function validarLivro(livro, versao) {                                                                                   
// ↑ Inicia validação de livro
    if (!window.contagemVersiculosPorVersao || !window.contagemVersiculosPorVersao[versao]) {                            
    // ↑ Verifica se os dados da tradução existem
        return false                                                                                                     
        // ↑ Se não existir, retorna "falso" (livro não existe)
    }

    return window.contagemVersiculosPorVersao[versao].hasOwnProperty(livro)                                              
    // ↑ Verifica se o livro existe nesta tradução específica
}

// Esta função é como um "contador de versículos" que diz quantos versículos tem um capítulo.
// Exemplo: "Quantos versículos tem Gênesis capítulo 1?" Resposta: "31 versículos"
// É como ter uma "calculadora bíblica" que sabe o tamanho de cada capítulo.
function obterContagemVersiculos(livro, capitulo, versao) {                                                              
// ↑ Inicia consulta de versículos
    if (!validarLivro(livro, versao)) {                                                                                  
    // ↑ Primeiro verifica se o livro existe nesta tradução
        return 0                                                                                                         
        // ↑ Se não existir, retorna zero versículos
    }
    return window.contagemVersiculosPorVersao[versao][livro][capitulo] || 0                                              
    // ↑ Retorna o número de versículos deste capítulo, ou zero se não encontrar
}

// Esta função é como um "navegador para frente" que sabe qual é o próximo livro da Bíblia.
// Exemplo: se você está em "Gênesis", ela diz "o próximo é Êxodo".
// É como ter um "GPS bíblico" que conhece a ordem dos 66 livros.
function obterProximoLivro(livroAtual) {                                                                                 
// ↑ Inicia busca do próximo livro
    if (!window.livrosOrdem) {                                                                                           
    // ↑ Verifica se a lista de ordem dos livros foi carregada
        return null                                                                                                      
        // ↑ Se não foi carregada, retorna "nada"
    }

    const index = window.livrosOrdem.indexOf(livroAtual)                                                                 
    // ↑ Encontra a posição do livro atual na lista (ex: Gênesis é posição 0)
    
    if (index === -1 || index === window.livrosOrdem.length - 1) {                                                       
    // ↑ Se não encontrou o livro OU se é o último livro (Apocalipse):
        return null                                                                                                      
        // ↑ Retorna "nada" (não há próximo)
    }
    return window.livrosOrdem[index + 1]                                                                                 
    // ↑ Retorna o livro que está na próxima posição da lista
}

// Esta função é como um "navegador para trás" que sabe qual é o livro anterior da Bíblia.
// Exemplo: se você está em "Êxodo", ela diz "o anterior é Gênesis".
// É como ter um "GPS bíblico reverso" que navega para trás na ordem dos livros.
function obterLivroAnterior(livroAtual) {                                                                                
// ↑ Inicia busca do livro anterior
    if (!window.livrosOrdem) {                                                                                           
    // ↑ Verifica se a lista de ordem dos livros foi carregada
        return null                                                                                                      
        // ↑ Se não foi carregada, retorna "nada"
    }
    const index = window.livrosOrdem.indexOf(livroAtual)                                                                 
    // ↑ Encontra a posição do livro atual na lista
    
    if (index <= 0) {                                                                                                    
    // ↑ Se é o primeiro livro (Gênesis) ou não foi encontrado:
        return null                                                                                                      
        // ↑ Retorna "nada" (não há anterior)
    }
    return window.livrosOrdem[index - 1]                                                                                 
    // ↑ Retorna o livro que está na posição anterior da lista
}

// Esta função é como um "contador de capítulos" que diz quantos capítulos tem um livro.
// Exemplo: "Quantos capítulos tem o livro de Salmos?" Resposta: "150 capítulos"
// É como ter um "medidor bíblico" que conhece o tamanho de cada livro.
function obterTotalCapitulos(livro, versao) {                                                                            
// ↑ Inicia contagem de capítulos
    if (!validarLivro(livro, versao)) {                                                                                  
    // ↑ Primeiro verifica se o livro existe nesta tradução
        return 0                                                                                                         
        // ↑ Se não existir, retorna zero capítulos
    }
    return Object.keys(window.contagemVersiculosPorVersao[versao][livro]).length                                         
    // ↑ Conta quantas "chaves" (capítulos) existem para este livro
}

/*===============================================================================*/
/*                             EXPORTAÇÕES GLOBAIS                               */
/*===============================================================================*/
// Estas linhas "exportam" todas as funções para que outros arquivos possam usá-las.
// É como disponibilizar suas "ferramentas" para toda a oficina.

window.normalizarNomeLivro = normalizarNomeLivro                                                                         
// ↑ Exporta o "tradutor de nomes"

window.obterNomeAcentuado = obterNomeAcentuado                                                                           
// ↑ Exporta o "tradutor reverso"

window.validarLivro = validarLivro                                                                                       
// ↑ Exporta o "verificador de existência"

window.obterContagemVersiculos = obterContagemVersiculos                                                                 
// ↑ Exporta o "contador de versículos"

window.obterProximoLivro = obterProximoLivro                                                                             
// ↑ Exporta o "navegador para frente"

window.obterLivroAnterior = obterLivroAnterior                                                                           
// ↑ Exporta o "navegador para trás"

window.obterTotalCapitulos = obterTotalCapitulos                                                                         
// ↑ Exporta o "contador de capítulos"