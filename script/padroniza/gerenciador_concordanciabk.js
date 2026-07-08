/*                                                                               */
/* ============================================================================= */
/* =                                                                             */
/*              GERENCIADOR DE DADOS DA CONCORDÂNCIA (DATA MANAGER)              */
/*===============================================================================*/
/* - Classe DataManager para otimizar o carregamento de grandes volumes de       */
/* dados.                                                                        */
/* - Implementa cache inteligente para arquivos JSON já carregados.              */
/* - Gerencia o carregamento sob demanda com paginação.                          */
/*===============================================================================*/

// Este bloco gerenciador de dados otimizado para grandes volumes de concordância.
class DataManager {
    constructor() {                                                               // Construtor da classe DataManager.
        this.cache = new Map();                                                   // Armazena em cache os dados de páginas já carregadas (chave: 'letra_pagina').
        this.loadingPromises = new Map();                                         // Evita requisições duplicadas enquanto uma já está em andamento.
        this.listaLetras = null;                                                  // Cache para o arquivo de índice `lista_letras.json`.
        this.currentLetter = null;                                                // Letra atualmente em foco.
        this.currentPage = 0;                                                     // Página atual carregada.
        this.itemsPerPage = 50;                                                   // Define o número de itens a carregar por página.
        this.totalItems = 0;                                                      // Total de itens para a letra atual.
        this.allData = [];                                                        // Array com todos os dados da letra atual.
        this.filteredData = [];                                                   // Array para dados filtrados (se necessário).
    }

    // Este bloco carrega o arquivo de índice `lista_letras.json` que mapeia letras para arquivos.
    async loadLetterList() {
        if (this.listaLetras) return this.listaLetras;                            // Retorna do cache se já estiver carregado.

        try {
            const response = await fetch('../concordancia/lista_letras.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.listaLetras = await response.json();                             // Armazena o índice no cache da instância.
            return this.listaLetras;
        } catch (error) {
            console.error('Erro ao carregar lista de letras:', error);
            this.listaLetras = {                                                  // Define um fallback com dados de exemplo em caso de falha.
                "a": ["a1", "a2", "a3", "a4"]
            };
            return this.listaLetras;
        }
    }

    // Este bloco carrega os dados de uma letra específica com suporte a paginação.
    async loadLetterData(letter, page = 0, forceReload = false) {
        const letterLower = letter.toLowerCase();
        const cacheKey = `${letterLower}_${page}`;                                // Cria uma chave de cache única para a letra e página.

        // Verifica se já existe uma promessa de carregamento para esta chave, evitando requisições concorrentes.
        if (this.loadingPromises.has(cacheKey)) {
            return await this.loadingPromises.get(cacheKey);
        }

        if (!forceReload && this.cache.has(cacheKey)) {                           // Verifica o cache principal.
            return this.cache.get(cacheKey);
        }

        const loadingPromise = this._loadLetterDataInternal(letterLower, page);   // Cria e armazena uma nova promessa de carregamento.
        this.loadingPromises.set(cacheKey, loadingPromise);

        try {
            const result = await loadingPromise;
            this.cache.set(cacheKey, result);                                     // Armazena o resultado no cache após o sucesso.
            return result;
        } finally {
            this.loadingPromises.delete(cacheKey);                                // Remove a promessa do mapa após a conclusão (sucesso ou falha).
        }
    }

    // Este bloco e a lógica interna para o carregamento dos dados de uma letra.
    async _loadLetterDataInternal(letter, page) {
        try {
            await this.loadLetterList();                                          // Garante que o índice de letras esteja carregado.
            
            const letterFiles = this.listaLetras[letter] || [];
            if (letterFiles.length === 0) {
                return { data: [], hasMore: false, total: 0 };                    // Retorna vazio se não houver arquivos para a letra.
            }

            if (this.currentLetter !== letter) {                                  // Se for uma nova letra, reseta o estado e carrega todos os dados para ela.
                this.currentLetter = letter;
                this.currentPage = 0;
                this.allData = [];
                await this._loadAllLetterData(letter, letterFiles);
            }

            // Este bloco aplica a paginação aos dados já carregados em `this.allData`.
            const startIndex = page * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            const pageData = this.allData.slice(startIndex, endIndex);
            const hasMore = endIndex < this.allData.length;

            return {
                data: pageData,
                hasMore: hasMore,
                total: this.allData.length,
                currentPage: page
            };

        } catch (error) {
            console.error(`Erro ao carregar dados da letra ${letter}:`, error);
            return this._getFallbackData(letter);                                 // Retorna dados de fallback em caso de erro.
        }
    }

    // Este bloco carrega todos os arquivos de uma letra em lotes para `this.allData`.
    async _loadAllLetterData(letter, letterFiles) {
        const batchSize = 5;                                                      // Define o tamanho do lote para carregar arquivos em paralelo.
        const allData = [];

        for (let i = 0; i < letterFiles.length; i += batchSize) {
            const batch = letterFiles.slice(i, i + batchSize);
            const batchPromises = batch.map(fileName => this._loadSingleFile(letter, fileName));
            
            try {
                const batchResults = await Promise.all(batchPromises);
                batchResults.forEach(result => {
                    if (result && result.data) {
                        allData.push(...result.data);                             // Adiciona os dados do lote ao array principal.
                    }
                });
            } catch (error) {
                console.warn(`Erro ao carregar lote de arquivos:`, error);
            }
        }

        this.allData = allData;                                                   // Armazena todos os dados carregados.
        this.totalItems = allData.length;                                         // Atualiza o total de itens.
    }

    // Este bloco carrega um único arquivo JSON de concordância.
    async _loadSingleFile(letter, fileName) {
        try {
            const response = await fetch(`../concordancia/${letter}/${fileName}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return { data: data[letter] || [] };                                  // Extrai os dados do JSON.
        } catch (error) {
            console.warn(`Erro ao carregar arquivo ${fileName}.json:`, error);
            return { data: [] };
        }
    }

    // Este bloco realiza uma busca global por um termo. Atualmente, busca na letra inicial do termo.
    async searchGlobal(searchTerm, filters = {}) {
        if (!searchTerm || searchTerm.length < 2) {
            return { data: [], total: 0 };
        }

        const searchLower = searchTerm.toLowerCase();
        const firstLetter = searchLower.charAt(0);

        try {                                                                     // Otimização: carrega apenas os dados da primeira letra do termo de busca.
            await this.loadLetterData(firstLetter, 0, false);
            
            const filteredResults = this.allData.filter(item => {                 // Filtra os resultados com base no termo e outros filtros.
                const matchesWord = item.palavra.toLowerCase().includes(searchLower);
                const matchesTestament = this._matchesTestamentFilter(item, filters.testamento);
                const matchesBook = this._matchesBookFilter(item, filters.livro);
                
                return matchesWord && matchesTestament && matchesBook;
            });

            return {
                data: filteredResults,
                total: filteredResults.length
            };

        } catch (error) {
            console.error('Erro na busca global:', error);
            return { data: [], total: 0 };
        }
    }

    // Este bloco aplica filtro de testamento. (Lógica a ser implementada)
    _matchesTestamentFilter(item, testamentFilter) {
        if (!testamentFilter || testamentFilter === 'todos') return true;
        return true;
    }

    // Este bloco aplica filtro de livro.
    _matchesBookFilter(item, bookFilter) {
        if (!bookFilter || bookFilter === 'todos') return true;
        
        return item.concordancias.some(concordancia =>                            // Verifica se alguma das concordâncias do item pertence ao livro filtrado.
            concordancia.referencia.toLowerCase().includes(bookFilter.toLowerCase())
        );
    }

    // Este bloco retorna dados de fallback em caso de falha no carregamento.
    _getFallbackData(letter) {
        const fallbackData = {
            "a": [{
                "palavra": "exemplo",
                "veja tambem": [],
                "ocorrencias": 1, "fonte": "Dados de exemplo",
                "concordancias": [{"referencia": "Exemplo 1:1",
                "texto": "Este é um exemplo de dados de fallback."}]
            }]
        };

        return {
            data: fallbackData[letter.toLowerCase()] || [],
            hasMore: false,
            total: 1
        };
    }

    // Este bloco limpa o cache de dados para economizar memória.
    clearCache() {
        this.cache.clear();
        this.loadingPromises.clear();
        console.log("Cache do DataManager limpo.");
    }

    // Este bloco obtém estatísticas do cache para fins de depuração.
    getCacheStats() {
        return {
            cacheSize: this.cache.size,
            loadingPromises: this.loadingPromises.size,
            currentLetter: this.currentLetter,
            totalItems: this.totalItems
        };
    }
}

window.dataManager = new DataManager();                                           // Cria uma instância global do gerenciador de dados, acessível em toda a aplicação.
