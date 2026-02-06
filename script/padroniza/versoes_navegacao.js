/*===============================================================================*/
/*                  MÓDULO DE DADOS E NAVEGAÇÃO DA BÍBLIA                        */
/*===============================================================================*/
/*  Este script é responsável por:                                               */
/*                       - Gerenciar a lista de livros da Bíblia                 */
/*                       - Verificar a existência de capítulos                   */
/*                       - Contar e memorizar o total de capítulos por livro     */
/*                       - Calcular a navegação para o capítulo anterior/próximo */
/*===============================================================================*/

const listaLivrosBiblia = [                                                           // Lista completa dos livros bíblicos
    'genesis', 'exodo', 'levitico', 'numeros', 'deuteronomio', 'josue', 'juizes', 'rute', '1samuel', '2samuel',
    '1reis', '2reis', '1cronicas', '2cronicas', 'esdras', 'neemias', 'ester', 'jo', 'salmos', 'proverbios',
    'eclesiastes', 'cantares', 'isaias', 'jeremias', 'lamentacoes', 'ezequiel', 'daniel', 'oseias', 'joel',
    'amos', 'obadias', 'jonas', 'miqueias', 'naum', 'habacuque', 'sofonias', 'ageu', 'zacarias', 'malaquias',
    'mateus', 'marcos', 'lucas', 'joao', 'atos', 'romanos', '1corintios', '2corintios', 'galatas', 'efesios',
    'filipenses', 'colossenses', '1tessalonicenses', '2tessalonicenses', '1timoteo', '2timoteo', 'tito',
    'filemom', 'hebreus', 'tiago', '1pedro', '2pedro', '1joao', '2joao', '3joao', 'judas', 'apocalipse'
];

const cacheNumeroCapitulos = {};                                                      // Cache para contagem de capítulos

async function capituloExistentes(livro, capitulo) {                                 // Função para verificar existência de capítulo
    try {                                                                           // Inicia tratamento de erro
        let versaoAtual = 'ara';                                                    // Define versão padrão
        
        if (typeof window.obterPreferencia === 'function') {                        // Verifica função de preferências
            const v = window.obterPreferencia('versaoBiblicaSelecionada', 'ara');   // Obtém versão selecionada
            if (typeof v === 'string' && v.length > 0) versaoAtual = v;             // Atualiza versão se válida
        }

        const versoesQueUsamHtml = ['arc'];                                         // Lista de versões HTML
        const ehVersaoHtml = versoesQueUsamHtml.includes(versaoAtual.toLowerCase()); // Verifica se usa HTML
        
        const caminho = ehVersaoHtml ?                                              // Define caminho do arquivo
            `../versao/${versaoAtual.toLowerCase()}/${livro.toLowerCase()}/${capitulo}.html` :
            `../versao/${versaoAtual.toLowerCase()}/${livro.toLowerCase()}/${capitulo}.json`;

        const resposta = await fetch(caminho, { method: 'HEAD' });                  // Verifica existência do arquivo
        return resposta.ok;                                                         // Retorna resultado da verificação
    } catch (error) {                                                               // Captura erros
        console.error(`Erro ao verificar capítulo ${livro} ${capitulo}:`, error);   // Log de erro
        return false;                                                               // Retorna false em caso de erro
    }
}

async function obterContagemCapitulosLivro(livro) {                                 // Função para contar capítulos de um livro
    const chaveLivro = livro.toLowerCase();                                         // Padroniza nome do livro
    const cacheCap = window.obterCapítuloDoCache(chaveLivro, 0);                    // Verifica cache
    
    if (cacheCap) return cacheCap;                                                  // Retorna se já está em cache
    
    if (window.livros && window.livros[chaveLivro] && window.livros[chaveLivro].capitulos) { // Verifica base de dados global
        window.cacheCapitulo(chaveLivro, 0, window.livros[chaveLivro].capitulos);   // Salva no cache
        return window.livros[chaveLivro].capitulos;                                 // Retorna contagem
    }

    console.warn(`[Capítulos] Contagem para ${livro} não encontrada. Descobrindo...`); // Log de aviso
    
    let maximoCapitulo = 0;                                                         // Inicializa contador
    
    for (let capitulo = 1; capitulo <= 150; capitulo++) {                           // Testa capítulos de 1 a 150
        if (await capituloExistentes(chaveLivro, capitulo)) maximoCapitulo = capitulo; // Atualiza contador se existe
        else break;                                                                 // Para se não existe
    }
    
    window.cacheCapitulo(chaveLivro, 0, maximoCapitulo);                            // Salva resultado no cache
    return maximoCapitulo;                                                          // Retorna contagem final
}

window.obterContagemCapitulosLivro = obterContagemCapitulosLivro;                   // Torna função disponível globalmente

window.obterProximoLivroECapitulo = async function(livroAtual, capituloAtual) {        // Função para navegar ao próximo capítulo/livro
    const indiceLivroAtual = listaLivrosBiblia.indexOf(livroAtual.toLowerCase());       // Encontra posição do livro atual
    
    if (indiceLivroAtual === -1) return null;                                           // Retorna null se livro não encontrado
    
    const numCapitulosLivro = await obterContagemCapitulosLivro(livroAtual);            // Obtém número de capítulos do livro
    
    if (capituloAtual < numCapitulosLivro) {                                            // Se não é o último capítulo
         return { livro: livroAtual, capitulo: capituloAtual + 1 };                     // Vai para próximo capítulo
    }
    
    if (indiceLivroAtual < listaLivrosBiblia.length - 1) {                              // Se não é o último livro
        return { livro: listaLivrosBiblia[indiceLivroAtual + 1], capitulo: 1 };         // Vai para primeiro capítulo do próximo livro
    }
    return null;                                                                        // Retorna null se chegou ao fim
};

window.obterLivroCapituloAnterior = async function(livroAtual, capituloAtual) {        // Função para navegar ao capítulo/livro anterior
    if (capituloAtual > 1) {                                                            // Se não é o primeiro capítulo
        return { livro: livroAtual, capitulo: capituloAtual - 1 };                      // Vai para capítulo anterior
    }
    
    const indiceLivroAtual = listaLivrosBiblia.indexOf(livroAtual.toLowerCase());       // Encontra posição do livro atual
    
    if (indiceLivroAtual <= 0) return null;                                             // Retorna null se é o primeiro livro
    
    const livroAnterior = listaLivrosBiblia[indiceLivroAtual - 1];                      // Obtém livro anterior
    const ultimoCapituloLivroAnterior = await obterContagemCapitulosLivro(livroAnterior); // Obtém último capítulo do livro anterior
    
    return { livro: livroAnterior, capitulo: ultimoCapituloLivroAnterior };             // Vai para último capítulo do livro anterior
};