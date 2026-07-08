/*===============================================================================*/
/*                    MÓDULO DE CACHE E PERSISTÊNCIA DE DADOS                    */
/*===============================================================================*/
/*  Este script é responsável por:                                               */
/*              - Gerenciar o cache (memória) de capítulos e livros              */
/*           - Salvar e carregar preferências do usuário no navegador            */
/*             - Otimizar o desempenho, evitando downloads repetidos             */
/*===============================================================================*/

// Este bloco cria uma função anônima e a executa imediatamente para isolar o código.
(function() {
    'use strict';                                                                 // Habilita o modo restrito do JavaScript para evitar más práticas

    // Este bloco cria o objeto principal que servirá de cache (memória temporária).
    const cache = {
        capitulos: {},                                                            // Cria um sub-objeto para armazenar os dados dos capítulos já carregados.
        preferencias: {}                                                          // Cria um sub-objeto para armazenar as preferências do usuário.
    };

    // Este bloco define as chaves (nomes) usadas para salvar dados no localStorage do navegador.
    const CHAVES_ARMAZENAMENTO_LOCAL = {
        VERSAO_BIBLICA: 'versaoBiblicaSelecionada',                               // Define a chave para a versão da Bíblia selecionada.
        MODO_LEITURA: 'modoLeituraAtivo',                                         // Define a chave para o estado do modo leitura.
        ULTIMO_LIVRO: 'ultimoLivroSelecionado',                                   // Define a chave para o último livro visitado.
        ULTIMO_CAPITULO: 'ultimoCapituloSelecionado',                             // Define a chave para o último capítulo visitado.
        ULTIMO_VERSICULO: 'ultimoVersiculoSelecionado'                            // Define a chave para o último versículo visitado.
    };

    // Este bloco define a função global para armazenar dados de um capítulo no cache.
    window.cacheCapitulo = function(livro, capitulo, dados) {
        const chave = `${livro.toLowerCase()}_${capitulo}`;                       // Cria uma chave única combinando o nome do livro e o número do capítulo.
        cache.capitulos[chave] = dados;                                           // Armazena os dados do capítulo no objeto de cache usando a chave criada.
    };

    // Este bloco define a função global para buscar dados de um capítulo no cache.
    window.obterCapítuloDoCache = function(livro, capitulo) {
        const chave = `${livro.toLowerCase()}_${capitulo}`;                       // Cria a mesma chave única para encontrar os dados.
        return cache.capitulos[chave] || null;                                    // Retorna os dados se encontrados; caso contrário, retorna nulo.
    };

    // Este bloco define a função global para limpar todo o cache de capítulos.
    window.limparCacheCapitulos = function() {
        cache.capitulos = {};                                                     // Redefine o objeto de capítulos para um objeto vazio, limpando-o.
    };

    // Este bloco define a função global para salvar uma preferência do usuário.
    window.salvarPreferencia = function(chave, valor) {
        try {                                                                     // Inicia um bloco 'try' para lidar com possíveis erros (ex: modo privado).
            localStorage.setItem(chave, JSON.stringify(valor));                   // Salva o valor no localStorage, convertendo-o para uma string JSON.
            cache.preferencias[chave] = valor;                                    // Atualiza também o cache em memória para acesso rápido.
        } catch (erro) {                                                          // Captura qualquer erro que ocorra durante o salvamento.
            console.error('Erro ao salvar no localStorage:', erro);               // Exibe uma mensagem de erro no console para depuração.
        }
    };

    // Este bloco define a função global para obter uma preferência do usuário.
    window.obterPreferencia = function(chave, valorPadrao = null) {
        if (cache.preferencias[chave] !== undefined) {                            // Verifica primeiro no cache em memória, que é mais rápido.
            return cache.preferencias[chave];                                     // Se encontrar no cache, retorna o valor imediatamente.
        }

        // Se não encontrar no cache, tenta ler do localStorage.
        try {
            const valor = localStorage.getItem(chave);                            // Tenta ler o valor do localStorage usando a chave.
            if (valor === null) return valorPadrao;                               // Se o valor não existir no localStorage, retorna o valor padrão.
            const valorParseado = JSON.parse(valor);                              // Converte a string JSON de volta para seu tipo original (ex: booleano, número).
            cache.preferencias[chave] = valorParseado;                            // Salva o valor lido no cache para futuras consultas rápidas.
            return valorParseado;                                                 // Retorna o valor encontrado e convertido.
        } catch (erro) {                                                          // Captura qualquer erro que ocorra durante a leitura ou conversão.
            console.error('Erro ao ler do localStorage:', erro);                  // Exibe uma mensagem de erro no console.
            return valorPadrao;                                                   // Retorna o valor padrão em caso de erro.
        }
    };

    // Este bloco define a função que carrega todas as preferências do localStorage para o cache.
    window.carregarPreferencias = function() {
        Object.keys(CHAVES_ARMAZENAMENTO_LOCAL).forEach(chave => {                // Percorre cada uma das chaves de preferência definidas no início do script.
            const chaveArmazenamento = CHAVES_ARMAZENAMENTO_LOCAL[chave];         // Pega o nome da chave (ex: 'versaoBiblicaSelecionada').
            cache.preferencias[chaveArmazenamento] = window.obterPreferencia(chaveArmazenamento);  // Usa a função 'obterPreferencia' para carregar e armazenar cada uma no cache.
        });
    };

    window.carregarPreferencias();                                                // Carregar as preferências no cache assim que o script é lido pelo navegador.
})();
