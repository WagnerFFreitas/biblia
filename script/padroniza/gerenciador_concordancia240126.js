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

        // Nova propriedade para integração com o índice de busca
        this.searchIndex = window.searchIndex;
    }

    async loadLetterList() {
        if (this.listaLetras) return this.listaLetras;

        try {
            const response = await fetch('../concordancia/lista_letras.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.listaLetras = await response.json();
            return this.listaLetras;
        } catch (error) {
            console.error('Erro ao carregar lista de letras:', error);
            this.listaLetras = {
                "a": ["a1", "a2", "a3", "a4"]
            };
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

        const loadingPromise = this._loadLetterDataInternal(letterLower, page);
        this.loadingPromises.set(cacheKey, loadingPromise);

        try {
            const result = await loadingPromise;
            this.cache.set(cacheKey, result);
            return result;
        } finally {
            this.loadingPromises.delete(cacheKey);
        }
    }

    async _loadLetterDataInternal(letter, page) {
        try {
            await this.loadLetterList();
            
            const letterFiles = this.listaLetras[letter] || [];
            if (letterFiles.length === 0) {
                return { data: [], hasMore: false, total: 0 };
            }

            if (this.currentLetter !== letter) {
                this.currentLetter = letter;
                this.currentPage = 0;
                this.allData = [];
                await this._loadAllLetterData(letter, letterFiles);
            }

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
            return this._getFallbackData(letter);
        }
    }

    async _loadAllLetterData(letter, letterFiles) {
        const batchSize = 5;
        const allData = [];

        for (let i = 0; i < letterFiles.length; i += batchSize) {
            const batch = letterFiles.slice(i, i + batchSize);
            const batchPromises = batch.map(fileName => this._loadSingleFile(letter, fileName));
            
            try {
                const batchResults = await Promise.all(batchPromises);
                batchResults.forEach(result => {
                    if (result && result.data) {
                        allData.push(...result.data);
                    }
                });
            } catch (error) {
                console.warn(`Erro ao carregar lote de arquivos:`, error);
            }
        }

        this.allData = allData;
        this.totalItems = allData.length;
    }

    async _loadSingleFile(letter, fileName) {
        try {
            const response = await fetch(`../concordancia/${letter}/${fileName}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return { data: data[letter] || [] };
        } catch (error) {
            console.warn(`Erro ao carregar arquivo ${fileName}.json:`, error);
            return { data: [] };
        }
    }

    async searchGlobal(searchTerm, filters = {}) {
        if (!searchTerm || searchTerm.length < 2) {
            return { data: [], total: 0 };
        }

        // Se o índice de busca estiver pronto, use a versão otimizada
        if (this.searchIndex && this.searchIndex.isReady()) {
            return this.searchUltraFast(searchTerm, filters);
        }

        const searchLower = searchTerm.toLowerCase();
        const firstLetter = searchLower.charAt(0);

        try {
            await this.loadLetterData(firstLetter, 0, false);
            
            const filteredResults = this.allData.filter(item => {
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

    // NOVO MÉTODO: Busca otimizada usando o índice invertido
    async searchUltraFast(searchTerm, filters = {}) {
        if (!searchTerm || searchTerm.length < 2) {
            return { data: [], total: 0 };
        }

        // Se o índice estiver pronto, use-o
        if (this.searchIndex && this.searchIndex.isReady()) {
            const resultados = await this.searchIndex.search(searchTerm, 50);
            
            // Aplicar filtros nos resultados
            const filteredResults = resultados.filter(item => {
                const matchesTestament = this._matchesTestamentFilter(item, filters.testamento);
                const matchesBook = this._matchesBookFilter(item, filters.livro);
                
                return matchesTestament && matchesBook;
            });
            
            return {
                data: filteredResults,
                total: filteredResults.length
            };
        }
        
        // Fallback para a busca tradicional
        return this.searchGlobal(searchTerm, filters);
    }

// NOVO MÉTODO: Busca prioritária que usa índice primeiro
async searchPriority(searchTerm, filters = {}) {
    if (!searchTerm || searchTerm.length < 2) {
        return { data: [], total: 0 };
    }

    const searchLower = searchTerm.toLowerCase();
    
    // 1. PRIMEIRO: Tenta usar o índice se estiver disponível
    if (this.searchIndex && this.searchIndex.isReady()) {
        console.log('🔍 Usando índice para busca rápida');
        try {
            const resultados = await this.searchIndex.search(searchLower, 100);
            
            if (resultados && resultados.length > 0) {
                // Carrega os detalhes completos dos resultados do índice
                const resultadosCompletos = await this._loadFullResultsFromIndex(resultados);
                
                // Aplica filtros
                const filteredResults = resultadosCompletos.filter(item => {
                    const matchesTestament = this._matchesTestamentFilter(item, filters.testamento);
                    const matchesBook = this._matchesBookFilter(item, filters.livro);
                    return matchesTestament && matchesBook;
                });
                
                return {
                    data: filteredResults,
                    total: filteredResults.length
                };
            }
        } catch (error) {
            console.warn('Erro na busca por índice:', error);
        }
    }
    
    // 2. SEGUNDO: Busca apenas na letra inicial (mais rápida)
    console.log('🔍 Buscando apenas na letra inicial:', searchLower.charAt(0));
    try {
        const firstLetter = searchLower.charAt(0);
        await this.loadLetterData(firstLetter, 0, false);
        
        const filteredResults = this.allData.filter(item => {
            const matchesWord = item.palavra && item.palavra.toLowerCase().includes(searchLower);
            const matchesText = item.concordancias && item.concordancias.some(c => 
                c.texto && c.texto.toLowerCase().includes(searchLower)
            );
            const matchesTestament = this._matchesTestamentFilter(item, filters.testamento);
            const matchesBook = this._matchesBookFilter(item, filters.livro);
            
            return (matchesWord || matchesText) && matchesTestament && matchesBook;
        });

        return {
            data: filteredResults,
            total: filteredResults.length
        };
    } catch (error) {
        console.warn('Erro na busca por letra inicial:', error);
    }
    
    // 3. TERCEIRO: Fallback para busca tradicional (último recurso)
    console.log('⚠️ Usando busca tradicional como fallback');
    return this.searchGlobal(searchTerm, filters);
}

// Método auxiliar para carregar resultados completos do índice
async _loadFullResultsFromIndex(resultadosIndex) {
    const resultadosCompletos = [];
    const palavrasUnicas = new Set();
    
    // Agrupa palavras por letra
    const palavrasPorLetra = new Map();
    
    resultadosIndex.forEach(resultado => {
        if (resultado && resultado.palavra && !palavrasUnicas.has(resultado.palavra)) {
            palavrasUnicas.add(resultado.palavra);
            const primeiraLetra = resultado.palavra.charAt(0).toLowerCase();
            
            if (!palavrasPorLetra.has(primeiraLetra)) {
                palavrasPorLetra.set(primeiraLetra, new Set());
            }
            palavrasPorLetra.get(primeiraLetra).add(resultado.palavra);
        }
    });
    
    // Carrega apenas os arquivos necessários
    for (const [letra, palavras] of palavrasPorLetra) {
        try {
            await this.loadLetterList();
            const letterFiles = this.listaLetras[letra] || [];
            
            // Limita a 3 arquivos por letra para performance
            for (const fileName of letterFiles.slice(0, 3)) {
                try {
                    const response = await fetch(`../concordancia/${letra}/${fileName}.json`);
                    if (!response.ok) continue;
                    
                    const jsonData = await response.json();
                    const wordEntries = jsonData[letra] || [];
                    
                    // Encontra as palavras específicas que precisamos
                    wordEntries.forEach(item => {
                        if (item && item.palavra && palavras.has(item.palavra)) {
                            resultadosCompletos.push(item);
                        }
                    });
                    
                } catch (fileError) {
                    console.warn(`Erro ao carregar arquivo ${fileName}:`, fileError);
                }
            }
        } catch (error) {
            console.warn(`Erro ao processar letra ${letra}:`, error);
        }
    }
    
    return resultadosCompletos;
}


    _matchesTestamentFilter(item, testamentFilter) {
        if (!testamentFilter || testamentFilter === 'todos') return true;
        
        return item.concordancias.some(concordancia => {
            const nomeLivro = this._extractBookNameFromReference(concordancia.referencia);
            const testamento = this._getTestamentForBook(nomeLivro);
            return testamento === testamentFilter;
        });
    }

    _matchesBookFilter(item, bookFilter) {
        if (!bookFilter || bookFilter === 'todos') return true;
        
        return item.concordancias.some(concordancia =>
            concordancia.referencia.toLowerCase().includes(bookFilter.toLowerCase())
        );
    }

    _extractBookNameFromReference(referencia) {
        if (!referencia) return '';
        return referencia.replace(/[0-9:.,;]/g, '').trim();
    }

    _getTestamentForBook(nomeLivro) {
        if (!nomeLivro) return null;
        
        const antigoTestamento = [
            'Gênesis', 'Êxodo', 'Levítico', 'Números', 'Deuteronômio', 'Josué', 
            'Juízes', 'Rute', 'Samuel', 'Reis', 'Crônicas', 'Esdras', 'Neemias', 
            'Ester', 'Jó', 'Salmos', 'Provérbios', 'Eclesiastes', 'Cantares', 
            'Isaías', 'Jeremias', 'Lamentações', 'Ezequiel', 'Daniel', 'Oséias', 
            'Joel', 'Amós', 'Obadias', 'Jonas', 'Miquéias', 'Naum', 'Habacuque', 
            'Sofonias', 'Ageu', 'Zacarias', 'Malaquias'
        ];
        
        const novoTestamento = [
            'Mateus', 'Marcos', 'Lucas', 'João', 'Atos', 'Romanos', 'Coríntios', 
            'Gálatas', 'Efésios', 'Filipenses', 'Colossenses', 'Tessalonicenses', 
            'Timóteo', 'Tito', 'Filemom', 'Hebreus', 'Tiago', 'Pedro', 'João', 
            'Judas', 'Apocalipse'
        ];
        
        const livroLower = nomeLivro.toLowerCase();
        
        const isAntigoTestamento = antigoTestamento.some(livro => 
            livroLower.includes(livro.toLowerCase())
        );
        
        const isNovoTestamento = novoTestamento.some(livro => 
            livroLower.includes(livro.toLowerCase())
        );
        
        if (isAntigoTestamento) return 'Antigo Testamento';
        if (isNovoTestamento) return 'Novo Testamento';
        
        return null;
    }

    _getFallbackData(letter) {
        const fallbackData = {
            "a": [{
                "palavra": "exemplo",
                "veja tambem": [],
                "ocorrencias": 1,
                "fonte": "Dados de exemplo",
                "concordancias": [{
                    "referencia": "Exemplo 1:1",
                    "texto": "Este é um exemplo de dados de fallback."
                }]
            }]
        };

        return {
            data: fallbackData[letter.toLowerCase()] || [],
            hasMore: false,
            total: 1
        };
    }

    clearCache() {
        this.cache.clear();
        this.loadingPromises.clear();
        console.log("Cache do DataManager limpo.");
    }

    getCacheStats() {
        return {
            cacheSize: this.cache.size,
            loadingPromises: this.loadingPromises.size,
            currentLetter: this.currentLetter,
            totalItems: this.totalItems
        };
    }
}

window.dataManager = new DataManager();
