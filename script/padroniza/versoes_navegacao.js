/*===============================================================================*/
/*                     MÓDULO DE DADOS E NAVEGAÇÃO DA BÍBLIA                     */
/*===============================================================================*/
/*  Este script é responsável por:                                               */
/*                    - Gerenciar a lista de livros da Bíblia                    */
/*                     - Verificar a existência de capítulos                     */
/*              - Contar e memorizar o total de capítulos por livro              */
/*            - Calcular a navegação para o capítulo anterior/próximo            */
/*===============================================================================*/

/* BLOCO: Define uma constante com a lista de todos os livros em ordem canônica  */
const listaLivrosBiblia = [
    'genesis',
    'exodo',
    'levitico',
    'numeros',
    'deuteronomio',
    'josue',
    'juizes',
    'rute',
    '1samuel',
    '2samuel',
    '1reis',
    '2reis',
    '1cronicas',
    '2cronicas',
    'esdras',
    'neemias',
    'ester',
    'jo',
    'salmos',
    'proverbios',
    'eclesiastes',
    'cantares',
    'isaias',
    'jeremias',
    'lamentacoes',
    'ezequiel',
    'daniel',
    'oseias',
    'joel',
    'amos',
    'obadias',
    'jonas',
    'miqueias',
    'naum',
    'habacuque',
    'sofonias',
    'ageu',
    'zacarias',
    'malaquias',
    'mateus',
    'marcos',
    'lucas',
    'joao',
    'atos',
    'romanos',
    '1corintios',
    '2corintios',
    'galatas',
    'efesios',
    'filipenses',
    'colossenses',
    '1tessalonicenses',
    '2tessalonicenses',
    '1timoteo',
    '2timoteo',
    'tito',
    'filemom',
    'hebreus',
    'tiago',
    '1pedro',
    '2pedro',
    '1joao',
    '2joao',
    '3joao',
    'judas',
    'apocalipse'
];

/* BLOCO: Cria objeto para armazenamento em cache do número de capítulos         */
const cacheNumeroCapitulos = {};                                                  // Inicia objeto de memória

/* BLOCO: Função que verifica se um capítulo existe no servidor                  */
async function capituloExistentes(livro, capitulo) {
    try {                                                                         // Inicia bloco de tentativa
        
        /* BLOCO: Identifica a versão bíblica selecionada pelo usuário          */
        let versaoAtual = 'ara';                                                  // Define versão padrão
        if (typeof window.obterPreferencia === 'function') {                      // Verifica existência da função
            const v = window.obterPreferencia('versaoBiblicaSelecionada', 'ara'); // Busca preferência do usuário
            if (typeof v === 'string' && v.length > 0) versaoAtual = v;           // Valida o texto da versão
        }

        /* BLOCO: Define as rotas de busca baseadas no formato da bíblia        */
        const versoesQueUsamHtml = ['arc'];                                       // Lista versões em HTML
        const ehVersaoHtml = versoesQueUsamHtml.includes(versaoAtual.toLowerCase());  // Verifica tipo de arquivo
        const caminho = ehVersaoHtml ?                                            // Escolhe a rota do arquivo
            `../versao/${versaoAtual.toLowerCase()}/${livro.toLowerCase()}/${capitulo}.html` :  // Rota para arquivo HTML
            `../versao/${versaoAtual.toLowerCase()}/${livro.toLowerCase()}/${capitulo}.json`;  // Rota para arquivo JSON

        /* BLOCO: Realiza o teste de conexão com o arquivo solicitado           */
        const resposta = await fetch(caminho, { method: 'HEAD' });                // Testa existência do arquivo
        return resposta.ok;                                                       // Retorna status da resposta
    } catch (error) {
        
        /* BLOCO: Trata falhas de conexão ou erros inesperados                  */
        console.error(`Erro ao verificar capítulo ${livro} ${capitulo}:`, error); // Loga erro no console
        return false;                                                             // Retorna falha na verificação
    }
}

/* BLOCO: Função que conta o número de capítulos, usando cache para otimizar     */
async function obterContagemCapitulosLivro(livro) {
    
    /* BLOCO: Verifica se os dados já estão disponíveis na memória (Cache)      */
    const chaveLivro = livro.toLowerCase();                                       // Padroniza nome do livro
    const cacheCap = window.obterCapítuloDoCache(chaveLivro, 0);                  // Consulta cache global
    if (cacheCap) return cacheCap;                                                // Retorna valor se cacheado
    if (window.livros && window.livros[chaveLivro] && window.livros[chaveLivro].capitulos) {  // Checa dados globais extras
        window.cacheCapitulo(chaveLivro, 0, window.livros[chaveLivro].capitulos); // Salva contagem no cache
        return window.livros[chaveLivro].capitulos;                               // Retorna valor encontrado
    }

    /* BLOCO: Executa busca manual por força bruta se não houver cache         */
    console.warn(`[Capítulos] Contagem para ${livro} não encontrada. Descobrindo...`);  // Emite aviso de busca
    let maximoCapitulo = 0;                                                       // Inicia contador de capítulos
    for (let capitulo = 1; capitulo <= 150; capitulo++) {                         // Itera para testar arquivos
        if (await capituloExistentes(chaveLivro, capitulo)) maximoCapitulo = capitulo;  // Incrementa se arquivo existe
        else break;                                                               // Interrompe se não encontrar
    }
    
    window.cacheCapitulo(chaveLivro, 0, maximoCapitulo);                          // Armazena resultado no cache
    return maximoCapitulo;                                                        // Retorna total de capítulos
}

window.obterContagemCapitulosLivro = obterContagemCapitulosLivro;                 // Exporta função globalmente

/* BLOCO: Função global para encontrar o próximo capítulo ou livro               */
window.obterProximoLivroECapitulo = async function(livroAtual, capituloAtual) {
    
    /* BLOCO: Valida e obtém os dados do livro e capítulo informados            */
    const indiceLivroAtual = listaLivrosBiblia.indexOf(livroAtual.toLowerCase()); // Localiza índice do livro
    if (indiceLivroAtual === -1) return null;                                     // Retorna nulo se inexistente
    const numCapitulosLivro = await obterContagemCapitulosLivro(livroAtual);      // Pega total de caps do livro
    
    /* BLOCO: Calcula se o destino é o próximo capítulo ou o próximo livro      */
    if (capituloAtual < numCapitulosLivro) {                                      // Se não for o último capítulo
         return { livro: livroAtual, capitulo: capituloAtual + 1 };               // Avança para próximo capítulo
    }
    
    if (indiceLivroAtual < listaLivrosBiblia.length - 1) {                        // Se houver um próximo livro
        return { livro: listaLivrosBiblia[indiceLivroAtual + 1], capitulo: 1 };   // Vai para cap 1 do prox livro
    }
    return null;                                                                  // Retorna nulo se fim da Bíblia
};

/* BLOCO: Função global para encontrar o livro e capítulo anterior               */
window.obterLivroCapituloAnterior = async function(livroAtual, capituloAtual) {
    
    /* BLOCO: Verifica se é possível recuar dentro do próprio livro             */
    if (capituloAtual > 1) {                                                      // Se não for o capítulo inicial
        return { livro: livroAtual, capitulo: capituloAtual - 1 };                // Retorna capítulo anterior
    }
    
    /* BLOCO: Calcula o livro anterior e localiza seu capítulo final            */
    const indiceLivroAtual = listaLivrosBiblia.indexOf(livroAtual.toLowerCase()); // Localiza índice do livro
    if (indiceLivroAtual <= 0) return null;                                       // Gênesis não tem anterior
    
    /* BLOCO: Localiza o nome do livro anterior e descobre seu capítulo final   */
    const livroAnterior = listaLivrosBiblia[indiceLivroAtual - 1];                // Identifica nome do anterior
    const ultimoCapituloLivroAnterior = await obterContagemCapitulosLivro(livroAnterior);  // Pega total de caps do anterior
    return { livro: livroAnterior, capitulo: ultimoCapituloLivroAnterior };       // Retorna último cap do anterior
};
