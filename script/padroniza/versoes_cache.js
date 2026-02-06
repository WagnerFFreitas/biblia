/*===============================================================================*/
/*                    MÓDULO DE CACHE E PERSISTÊNCIA DE DADOS                    */
/*===============================================================================*/
/*  Este script é responsável por:                                               */
/*                       - Gerenciar o cache (memória) de capítulos e livros     */
/*                       - Salvar e carregar preferências do usuário no navegador*/
/*                       - Otimizar o desempenho, evitando downloads repetidos   */
/*===============================================================================*/

// Este arquivo é como um "sistema de memória inteligente" para o site da Bíblia.
// Imagine que você tem uma biblioteca pessoal onde guarda:
// 1. Os livros que você já leu (para não precisar buscar de novo)
// 2. Suas preferências (qual tradução você gosta, modo de leitura, etc.)
// 3. O último lugar onde você parou de ler
// É como ter um "assistente pessoal" que lembra de tudo para você!

// Esta parte cria uma "caixa protetora" para o código, mantendo tudo organizado:
(function() {
    'use strict';                                                                               
    // ↑ Ativa o "modo rigoroso" - como ter regras mais rígidas para evitar erros

    // Este é o "baú de tesouros" onde guardamos tudo na memória:
    const cache = {
        capitulos: {},                                                                          
        // ↑ "Gaveta" para guardar textos bíblicos que já foram baixados
        
        preferencias: {}                                                                        
        // ↑ "Gaveta" para guardar suas configurações pessoais
    };

    // Esta é uma "lista de nomes" para organizar onde cada coisa é salva no navegador:
    const CHAVES_ARMAZENAMENTO_LOCAL = {
        VERSAO_BIBLICA: 'versaoBiblicaSelecionada',                                             
        // ↑ Nome para salvar qual tradução você escolheu (ARA, NVI, etc.)
        
        MODO_LEITURA: 'modoLeituraAtivo',                                                       
        // ↑ Nome para salvar se você gosta do modo tela cheia
        
        ULTIMO_LIVRO: 'ultimoLivroSelecionado',                                                 
        // ↑ Nome para salvar o último livro que você estava lendo
        
        ULTIMO_CAPITULO: 'ultimoCapituloSelecionado',                                           
        // ↑ Nome para salvar o último capítulo que você estava lendo
        
        ULTIMO_VERSICULO: 'ultimoVersiculoSelecionado'                                          
        // ↑ Nome para salvar o último versículo que você estava lendo
    };

    // Esta função é como "guardar um livro na estante" para usar depois:
    window.cacheCapitulo = function(livro, capitulo, dados) {
        const chave = `${livro.toLowerCase()}_${capitulo}`;                                     
        // ↑ Cria uma "etiqueta" única para identificar o capítulo (ex: "genesis_1")
        
        cache.capitulos[chave] = dados;                                                         
        // ↑ Guarda o texto do capítulo na "gaveta" da memória para usar depois
    };

    // Esta função é como "pegar um livro da estante" que você já guardou:
    window.obterCapítuloDoCache = function(livro, capitulo) {
        const chave = `${livro.toLowerCase()}_${capitulo}`;                                     
        // ↑ Recria a "etiqueta" para procurar o capítulo guardado
        
        return cache.capitulos[chave] || null;                                                  
        // ↑ Retorna o texto se encontrar, ou "nada" se não tiver guardado
    };

    // Esta função é como "limpar toda a estante" de uma vez:
    window.limparCacheCapitulos = function() {
        cache.capitulos = {};                                                                   
        // ↑ Esvazia completamente a "gaveta" de textos guardados
    };

    // Esta função é como "anotar suas preferências num caderno" para lembrar depois:
    window.salvarPreferencia = function(chave, valor) {
        try {                                                                                   
        // ↑ Tenta salvar (pode dar erro se o navegador não permitir)
            localStorage.setItem(chave, JSON.stringify(valor));                                 
            // ↑ Salva a preferência no "disco rígido" do navegador
            
            cache.preferencias[chave] = valor;                                                  
            // ↑ Também guarda na "memória rápida" para acesso instantâneo
        } catch (erro) {
            console.error('Erro ao salvar no localStorage:', erro);                             
            // ↑ Se der erro, escreve no console para os programadores verem
        }
    };

    // Esta função é como "consultar suas anotações" para lembrar de uma preferência:
    window.obterPreferencia = function(chave, valorPadrao = null) {
        if (cache.preferencias[chave] !== undefined) {
            return cache.preferencias[chave];                                                   
            // ↑ Se já está na "memória rápida", retorna imediatamente
        }

        // Se não está na memória, vai buscar no "disco rígido" do navegador:
        try {
            const valor = localStorage.getItem(chave);                                          
            // ↑ Tenta ler a preferência salva no navegador
            
            if (valor === null) return valorPadrao;                                             
            // ↑ Se não encontrar nada, retorna o valor padrão
            
            const valorParseado = JSON.parse(valor);                                            
            // ↑ Converte o texto salvo de volta para um valor utilizável
            
            cache.preferencias[chave] = valorParseado;                                          
            // ↑ Guarda na "memória rápida" para próximas consultas
            
            return valorParseado;                                                               
            // ↑ Retorna o valor encontrado
        } catch (erro) {
            console.error('Erro ao ler do localStorage:', erro);                                
            // ↑ Se der erro, escreve no console
            
            return valorPadrao;                                                                 
            // ↑ Em caso de erro, retorna o valor padrão
        }
    };

    // Esta função é como "revisar todo o caderno de anotações" de uma vez:
    window.carregarPreferencias = function() {
        Object.keys(CHAVES_ARMAZENAMENTO_LOCAL).forEach(chave => {                              
        // ↑ Passa por cada tipo de preferência que existe
            const chaveArmazenamento = CHAVES_ARMAZENAMENTO_LOCAL[chave];                       
            // ↑ Pega o nome real usado para salvar
            
            cache.preferencias[chaveArmazenamento] = window.obterPreferencia(chaveArmazenamento); 
            // ↑ Carrega a preferência do "disco" para a "memória rápida"
        });
    };

    window.carregarPreferencias();                                                              
    // ↑ Executa o carregamento assim que este arquivo é lido pelo navegador
})();