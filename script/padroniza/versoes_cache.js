/*===============================================================================*/
/*                    MÓDULO DE CACHE E PERSISTÊNCIA DE DADOS                    */
/*===============================================================================*/
/*  Este script é responsável por:                                               */
/*              - Gerenciar o cache (memória) de capítulos e livros              */
/*           - Salvar e carregar preferências do usuário no navegador            */
/*             - Otimizar o desempenho, evitando downloads repetidos             */
/*===============================================================================*/

/* BLOCO: Cria uma função anônima e a executa imediatamente para isolar o        */
/* código                                                                        */
(function() {
    'use strict';                                                                 // Ativa o modo de escrita rígido do JavaScript

    /* BLOCO: Cria o objeto principal que servirá de cache (memória temporária)  */
    const cache = {
        capitulos: {},                                                            // Mapa para armazenar textos bíblicos na RAM
        preferencias: {}                                                          // Mapa para armazenar configurações na RAM
    };

    /* BLOCO: Define as chaves usadas para salvar dados no localStorage          */
    const CHAVES_ARMAZENAMENTO_LOCAL = {
        VERSAO_BIBLICA: 'versaoBiblicaSelecionada',                               // Identificador da tradução escolhida
        MODO_LEITURA: 'modoLeituraAtivo',                                         // Estado da interface (padrão ou leitura)
        ULTIMO_LIVRO: 'ultimoLivroSelecionado',                                   // Registro do último livro acessado
        ULTIMO_CAPITULO: 'ultimoCapituloSelecionado',                             // Registro do último capítulo acessado
        ULTIMO_VERSICULO: 'ultimoVersiculoSelecionado'                            // Registro do último versículo acessado
    };

    /* BLOCO: Define a função global para armazenar dados de um capítulo no cache */
    window.cacheCapitulo = function(livro, capitulo, dados) {
        const chave = `${livro.toLowerCase()}_${capitulo}`;                       // Gera uma chave única combinando dados
        cache.capitulos[chave] = dados;                                           // Grava o conteúdo textual na memória rápida
    };

    /* BLOCO: Define a função global para buscar dados de um capítulo no cache   */
    window.obterCapítuloDoCache = function(livro, capitulo) {
        const chave = `${livro.toLowerCase()}_${capitulo}`;                       // Recria a chave de busca para localização
        return cache.capitulos[chave] || null;                                    // Retorna o texto salvo ou nulo se não existir
    };

    /* BLOCO: Define a função global para limpar todo o cache de capítulos       */
    window.limparCacheCapitulos = function() {
        cache.capitulos = {};                                                     // Esvazia completamente o mapa de textos
    };

    /* BLOCO: Define a função global para salvar uma preferência do usuário      */
    window.salvarPreferencia = function(chave, valor) {
        try {                                                                     // Inicia tentativa de escrita no disco
            localStorage.setItem(chave, JSON.stringify(valor));                   // Grava o dado convertido em texto
            cache.preferencias[chave] = valor;                                    // Atualiza o valor na memória rápida (RAM)
        } catch (erro) {
            console.error('Erro ao salvar no localStorage:', erro);               // Relata erro técnico de persistência
        }
    };

    /* BLOCO: Define a função global para obter uma preferência do usuário       */
    window.obterPreferencia = function(chave, valorPadrao = null) {
        if (cache.preferencias[chave] !== undefined) {
            return cache.preferencias[chave];                                     // Retorna o valor direto da RAM se disponível
        }

        /* BLOCO: Se não encontrar no cache, tenta ler do localStorage           */
        try {
            const valor = localStorage.getItem(chave);                            // Tenta ler o registro bruto do disco
            if (valor === null) return valorPadrao;                               // Se vazio, entrega o valor de segurança
            const valorParseado = JSON.parse(valor);                              // Converte o texto de volta para dado real
            cache.preferencias[chave] = valorParseado;                            // Alimenta a RAM para consultas futuras
            return valorParseado;                                                 // Entrega o dado processado
        } catch (erro) {
            console.error('Erro ao ler do localStorage:', erro);                  // Relata erro de leitura ou conversão
            return valorPadrao;                                                   // Entrega o padrão em caso de falha
        }
    };

    /* BLOCO: Define a função que carrega todas as preferências do localStorage  */
    window.carregarPreferencias = function() {
        Object.keys(CHAVES_ARMAZENAMENTO_LOCAL).forEach(chave => {                // Varre todas as chaves mapeadas do sistema
            const chaveArmazenamento = CHAVES_ARMAZENAMENTO_LOCAL[chave];         // Captura o nome da chave de disco
            cache.preferencias[chaveArmazenamento] = window.obterPreferencia(chaveArmazenamento);  // Sincroniza disco com a memória rápida
        });
    };

    window.carregarPreferencias();                                                // Executa a sincronização ao carregar o script
})();
