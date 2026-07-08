/*===============================================================================*/
/*                     MÓDULO DE DADOS E NAVEGAÇÃO DA BÍBLIA                     */
/*===============================================================================*/
/*  Este script é responsável por:                                               */
/*                    - Gerenciar a lista de livros da Bíblia                    */
/*                     - Verificar a existência de capítulos                     */
/*              - Contar e memorizar o total de capítulos por livro              */
/*            - Calcular a navegação para o capítulo anterior/próximo            */
/*===============================================================================*/

    // Este bloco define uma constante que guarda um array (lista) com os nomes dos livros da Bíblia.
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

    const cacheNumeroCapitulos = {};                                              // Cria um objeto vazio para guardar em memória o número de capítulos de cada livro.

    // Este bloco define uma função assíncrona que verifica se um capítulo existe e se pode esperar por uma tarefas externas.
    async function capituloExistentes(livro, capitulo) {
        try {                                                                     // Inicia um bloco 'try', que tenta executar um código que pode falhar.
            let versaoAtual = 'ara';                                              // Define uma variável para a versão, com 'ara' como valor inicial.
            if (typeof window.obterPreferencia === 'function') {                  // Verifica se a função global 'obterPreferencia' existe antes de usá-la.
                const v = window.obterPreferencia('versaoBiblicaSelecionada', 'ara');  // Busca a versão salva pelo usuário; se não houver, usa 'ara'.
                if (typeof v === 'string' && v.length > 0) versaoAtual = v;       // Verifica se o valor obtido é um texto válido antes de usá-lo.
            }

            const versoesQueUsamHtml = ['arc'];                                   // Cria uma lista de versões que usam arquivos HTML em vez de JSON.
            const ehVersaoHtml = versoesQueUsamHtml.includes(versaoAtual.toLowerCase());  // Verifica se a versão atual está na lista de versões HTML.
            const caminho = ehVersaoHtml ?                                        // Usa um operador ternário para escolher o caminho do arquivo.
                `../versao/${versaoAtual.toLowerCase()}/${livro.toLowerCase()}/${capitulo}.html` :  // Define o caminho se o formato for HTML.
                `../versao/${versaoAtual.toLowerCase()}/${livro.toLowerCase()}/${capitulo}.json`;  // Define o caminho se o formato for JSON.

            const resposta = await fetch(caminho, { method: 'HEAD' });            // Usa 'fetch' para verificar se o arquivo existe sem baixar o conteúdo todo.
            return resposta.ok;                                                   // Retorna 'true' se a resposta foi um sucesso (código 200), 'false' caso contrário.
        } catch (error) {                                                         // Se ocorrer um erro no bloco 'try', este bloco 'catch' é executado.
            console.error(`Erro ao verificar capítulo ${livro} ${capitulo}:`, error);  // Exibe o erro no console do navegador para ajudar a encontrar problemas.
            return false;                                                         // Retorna 'false' em caso de erro, indicando que o capítulo não foi encontrado.
        }
    }

    // Este bloco define a função que conta o número de capítulos, usando cache para otimizar.
    async function obterContagemCapitulosLivro(livro) {
        const chaveLivro = livro.toLowerCase();                                   // Converte o nome do livro para letras minúsculas para padronizar.
        const cacheCap = window.obterCapítuloDoCache(chaveLivro, 0);              // Verifica primeiro no cache global se a contagem já foi feita para este livro.
        if (cacheCap) return cacheCap;                                            // Se a contagem estiver no cache, retorna o valor imediatamente para economizar tempo.
        if (window.livros && window.livros[chaveLivro] && window.livros[chaveLivro].capitulos) {  // Verifica se a contagem já está disponível em uma variável global 'window.livros'.
            window.cacheCapitulo(chaveLivro, 0, window.livros[chaveLivro].capitulos);  // Salva a contagem de 'window.livros' no cache para uso futuro.
            return window.livros[chaveLivro].capitulos;                           // Retorna a contagem encontrada em 'window.livros'.
        }

        console.warn(`[Capítulos] Contagem para ${livro} não encontrada. Tentando descobrir...`);  // Exibe um aviso se a contagem não for encontrada, informando o que vai fazer.
        let maximoCapitulo = 0;                                                   // Inicia um contador para o número máximo de capítulos.
        for (let capitulo = 1; capitulo <= 150; capitulo++) {                     // Inicia um laço que testa a existência dos capítulos um por um, até 150.
            if (await capituloExistentes(chaveLivro, capitulo)) maximoCapitulo = capitulo;  // Aguarda a verificação do capítulo; se existir, atualiza o contador.
            else break;                                                           // Se um capítulo não existir, interrompe o laço, pois não haverá mais.
        }
        
        window.cacheCapitulo(chaveLivro, 0, maximoCapitulo);                      // Salva o resultado final no cache para não precisar calcular de novo.
        return maximoCapitulo;                                                    // Retorna o número de capítulos descoberto.
    }

    window.obterContagemCapitulosLivro = obterContagemCapitulosLivro;             // Torna a função acessível globalmente para que outros scripts possam usá-la.
    
    // Este bloco define uma função global para encontrar o próximo capítulo ou livro.
    window.obterProximoLivroECapitulo = async function(livroAtual, capituloAtual) {
        const indiceLivroAtual = listaLivrosBiblia.indexOf(livroAtual.toLowerCase());  // Encontra a posição (índice) do livro atual na lista de todos os livros.
        if (indiceLivroAtual === -1) return null;                                 // Se o livro não for encontrado na lista, retorna nulo (fim da operação).
        const numCapitulosLivro = await obterContagemCapitulosLivro(livroAtual);  // Busca o número total de capítulos que o livro atual possui.
        if (capituloAtual < numCapitulosLivro) {                                  // Verifica se o capítulo atual NÃO é o último do livro.
             return { livro: livroAtual, capitulo: capituloAtual + 1 };           // Se não for, retorna o mesmo livro, mas com o capítulo seguinte.
        }
        if (indiceLivroAtual < listaLivrosBiblia.length - 1)                      // Se for o último capítulo, verifica se este NÃO é o último livro da Bíblia.
            return { livro: listaLivrosBiblia[indiceLivroAtual + 1], capitulo: 1 };  // Se não for, retorna o próximo livro da lista, no capítulo 1.
        return null;                                                              // Se for o último capítulo do último livro, retorna nulo (não há próximo).
    };

    // Este bloco define uma função global para encontrar o livro e capítulo anterior.
    window.obterLivroCapituloAnterior = async function(livroAtual, capituloAtual) {
        if (capituloAtual > 1) {                                                  // Verifica se o capítulo atual não é o primeiro.
            return { livro: livroAtual, capitulo: capituloAtual - 1 };            // Se não for, retorna o mesmo livro, mas com o capítulo anterior.
        }
        
        const indiceLivroAtual = listaLivrosBiblia.indexOf(livroAtual.toLowerCase());  // Encontra a posição (índice) do livro atual na lista.
        if (indiceLivroAtual <= 0) return null;                                   // Se for o primeiro livro (Gênesis), retorna nulo (não há anterior).
        const livroAnterior = listaLivrosBiblia[indiceLivroAtual - 1];            // Pega o nome do livro anterior na lista.
        const ultimoCapituloLivroAnterior = await obterContagemCapitulosLivro(livroAnterior);  // Busca o último capítulo do livro anterior.
        return { livro: livroAnterior, capitulo: ultimoCapituloLivroAnterior };   // Retorna o livro anterior com seu último capítulo.
    };
