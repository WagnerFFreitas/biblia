/*===============================================================================
/*              GERENCIADOR DE DADOS DA CONCORDÂNCIA (DATA MANAGER)              
/*===============================================================================*/

class DataManager {
    constructor() {
        this.cache = new Map();
        this.loadingPromises = new Map();
        this.listaLetras = null;
        this.currentLetter = null;
        this.currentPage = 0;
        this.itemsPerPage = 50;
        this.totalItems = 0;
        this.allData = [];
        this.filteredData = [];
        this.searchCache = new Map();
    }

    async loadLetterList() {
        if (this.listaLetras) return this.listaLetras;

        try {
            const response = await fetch('../concordancia/lista_letras.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            this.listaLetras = await response.json();
            return this.listaLetras;
        } catch (error) {
            console.error('Erro ao carregar lista de letras:', error);
            this.listaLetras = { "a": ["a1", "a2", "a3", "a4"] };
            return this.listaLetras;
        }
    }

    async loadLetterData(letter, page = 0, forceReload = false) {
        const letterLower = letter.toLowerCase();
        const cacheKey = `${letterLower}_${page}`;

        if (this.loadingPromises.has(cacheKey)) {
            return await this.loadingPromises.get(cacheKey);
        }

        if (!forceReload && this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            await this.loadLetterList();
            const files = this.listaLetras[letterLower] || [];
            const allData = [];

            for (const file of files) {
                try {
                    const response = await fetch(`../concordancia/${letterLower}/${file}.json`);
                    if (!response.ok) continue;
                    
                    const data = await response.json();
                    if (data[letterLower]) {
                        allData.push(...data[letterLower]);
                    }
                } catch (fileError) {
                    console.warn(`Erro ao carregar arquivo ${file}:`, fileError);
                }
            }

            this.allData = allData;
            this.currentLetter = letterLower;
            this.totalItems = allData.length;

            const start = page * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            const pageData = allData.slice(start, end);

            const result = {
                data: pageData,
                total: allData.length,
                hasMore: end < allData.length
            };

            this.cache.set(cacheKey, result);
            this.loadingPromises.delete(cacheKey);

            return result;

        } catch (error) {
            console.error('Erro ao carregar dados da letra:', error);
            this.loadingPromises.delete(cacheKey);
            throw error;
        }
    }

    // Método de busca prioritária
    async searchPriority(searchTerm, filters = {}) {
        const searchLower = searchTerm.toLowerCase();
        const cacheKey = `${searchLower}_${filters.testamento || 'todos'}_${filters.livro || 'todos'}`;
        
        if (this.searchCache.has(cacheKey)) {
            return this.searchCache.get(cacheKey);
        }

        try {
            const letter = searchLower.charAt(0);
            await this.loadLetterData(letter);

            const results = this.allData.map(item => {
                if (!this._matchesTestamentFilter(item, filters.testamento) ||
                    !this._matchesBookFilter(item, filters.livro)) {
                    return null;
                }

                const matchingConcordances = item.concordancias?.filter(c => 
                    c.texto.toLowerCase().includes(searchLower)
                );

                if (matchingConcordances && matchingConcordances.length > 0) {
                    return { ...item, concordancias: matchingConcordances };
                }

                return null;
            }).filter(Boolean);


            const result = { 
                data: results, 
                total: results.length 
            };

            this.searchCache.set(cacheKey, result);
            return result;

        } catch (error) {
            console.error('Erro na busca prioritária:', error);
            return { data: [], total: 0 };
        }
    }

    _matchesTestamentFilter(item, testamento) {
        if (!testamento || testamento === 'todos') return true;
        return (item.testamento || '').toLowerCase() === testamento.toLowerCase();
    }

    _matchesBookFilter(item, livro) {
        if (!livro || livro === 'todos') return true;
        return (item.livro || '').toLowerCase() === livro.toLowerCase();
    }

    async _searchFallback(searchLower, filters = {}) {
        try {
            const firstLetter = searchLower.charAt(0);
            await this.loadLetterData(firstLetter, 0, false);

            const filteredResults = this.allData.filter(item => {
                const matchesWord = item.palavra.toLowerCase().includes(searchLower);
                const matchesTestament = this._matchesTestamentFilter(item, filters.testamento);
                const matchesBook = this._matchesBookFilter(item, filters.livro);
                return matchesWord && matchesTestament && matchesBook;
            });

            return { data: filteredResults, total: filteredResults.length };
        } catch (error) {
            console.error('Erro na busca global fallback:', error);
            return { data: [], total: 0 };
        }
    }
}

window.DataManager = DataManager;