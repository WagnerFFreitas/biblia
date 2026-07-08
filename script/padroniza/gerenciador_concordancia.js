/*===============================================================================*/
/*              GERENCIADOR DE DADOS DA CONCORDÂNCIA (DATA MANAGER)              */
/*===============================================================================*/
/* - Classe DataManager para otimizar o carregamento de grandes volumes de       */
/* dados.                                                                        */
/* - Implementa cache inteligente para arquivos JSON já carregados.              */
/* - Gerencia o carregamento sob demanda com paginação.                          */
/*===============================================================================*/

/* BLOCO: Define a classe DataManager responsável pelo controle de memória e     */
/* motores de busca                                                              */
class DataManager {
    constructor() {                                                               // Inicia o construtor da classe
        this.cache = new Map();                                                   // Cria mapa de cache de dados
        this.loadingPromises = new Map();                                         // Cria mapa de promessas ativas
        this.listaLetras = null;                                                  // Buffer para o índice de letras
        this.currentLetter = null;                                                // Identificador da letra ativa
        this.currentPage = 0;                                                     // Controle da página atual
        this.itemsPerPage = 50;                                                   // Define itens por página
        this.totalItems = 0;                                                      // Contador total de registros
        this.allData = [];                                                        // Buffer de dados da letra
        this.filteredData = [];                                                   // Buffer de dados filtrados
        this.searchIndex = window.searchIndex;                                    // Vincula o índice de busca
    }

    /* BLOCO: Recupera a lista mestre que mapeia os arquivos JSON por letra                         */
    async loadLetterList() {
        if (this.listaLetras) return this.listaLetras;                            // Retorna cache se disponível

        /* BLOCO: Tenta carregar o índice de arquivos do servidor e trata possíveis erros de rede   */
        try {
            const response = await fetch('../concordancia/lista_letras.json');    // Solicita o arquivo de índice
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);        // Trata erro de resposta HTTP
            }
            this.listaLetras = await response.json();                             // Converte resposta para JSON
            return this.listaLetras;
        } catch (error) {
            
            /* BLOCO: Fornece uma lista de fallback caso o arquivo mestre não seja encontrado       */
            console.error('Erro ao carregar lista de letras:', error);            // Relata falha no console
            this.listaLetras = {
                "a": ["a1", "a2", "a3", "a4"]                                     // Define lista de emergência
            };
            return this.listaLetras;
        }
    }

    /* BLOCO: Gerencia o carregamento de dados verificando a existência de cache prévio             */
    async loadLetterData(letter, page = 0, forceReload = false) {
        const letterLower = letter.toLowerCase();                                 // Padroniza a letra buscada
        const cacheKey = `${letterLower}_${page}`;                                // Gera identificador de cache
        if (this.loadingPromises.has(cacheKey)) {
            return await this.loadingPromises.get(cacheKey);                      // Aguarda promessa existente
        }
        if (!forceReload && this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);                                      // Entrega dado do cache
        }
        const loadingPromise = this._loadLetterDataInternal(letterLower, page);   // Dispara motor interno
        this.loadingPromises.set(cacheKey, loadingPromise);                       // Registra promessa de carga

        /* BLOCO: Aguarda a conclusão da carga interna para armazenar no cache e liberar a promessa */
        try {
            const result = await loadingPromise;                                  // Aguarda conclusão da carga
            this.cache.set(cacheKey, result);                                     // Alimenta o cache de dados
            return result;
        } finally {
            this.loadingPromises.delete(cacheKey);                                // Remove registro da promessa
        }
    }

    /* BLOCO: Executa a lógica de fatiamento dos dados e coordena a leitura dos arquivos            */
    async _loadLetterDataInternal(letter, page) {
        try {
            await this.loadLetterList();                                          // Assegura lista de arquivos
            const letterFiles = this.listaLetras[letter] || [];                   // Obtém arquivos da letra
            if (letterFiles.length === 0) {
                return { data: [], hasMore: false, total: 0 };
            }

            /* BLOCO: Reinicia o buffer e carrega todos os arquivos da nova letra selecionada       */
            if (this.currentLetter !== letter) {
                this.currentLetter = letter;                                      // Sincroniza letra ativa
                this.currentPage = 0;                                             // Reseta índice de página
                this.allData = [];                                                // Limpa buffer anterior
                await this._loadAllLetterData(letter, letterFiles);               // Carrega todos os arquivos
            }

            /* BLOCO: Calcula o fatiamento do array para entregar apenas os itens da página pedida  */
            const startIndex = page * this.itemsPerPage;                          // Define ponto de partida
            const endIndex = startIndex + this.itemsPerPage;                      // Define ponto de parada
            const pageData = this.allData.slice(startIndex, endIndex);            // Extrai fatia de dados
            const hasMore = endIndex < this.allData.length;                       // Checa se há mais páginas
            return {
                data: pageData,                                                   // Entrega lista de palavras
                hasMore: hasMore,                                                 // Informa status de paginação
                total: this.allData.length,                                       // Informa total de registros
                currentPage: page                                                 // Informa página processada
            };
        } catch (error) {
            console.error(`Erro ao carregar dados da letra ${letter}:`, error);   // Relata falha técnica de carga
            return this._getFallbackData(letter);                                 // Entrega dados de segurança
        }
    }

    /* BLOCO: Coordena o carregamento em massa de arquivos JSON em lotes de performance             */
    async _loadAllLetterData(letter, letterFiles) {
        const batchSize = 5;                                                      // Define tamanho do lote
        const allData = [];                                                       // Buffer temporário mestre

        /* BLOCO: Divide a lista de arquivos em pequenos lotes para otimizar as requisições HTTP    */
        for (let i = 0; i < letterFiles.length; i += batchSize) {
            const batch = letterFiles.slice(i, i + batchSize);                    // Extrai um lote de nomes
            const batchPromises = batch.map(fileName => this._loadSingleFile(letter, fileName));  // Mapeia promessas do lote
            
            /* BLOCO: Dispara requisições em paralelo para o lote e aguarda a consolidação dos dados*/
            try {
                const batchResults = await Promise.all(batchPromises);            // Aguarda o lote de arquivos
                batchResults.forEach(result => {
                    if (result && result.data) {
                        allData.push(...result.data);                             // Consolida dados no mestre
                    }
                });
            } catch (error) {
                console.warn(`Erro ao carregar lote de arquivos:`, error);        // Relata falha em um lote
            }
        }
        this.allData = allData;                                                   // Salva consolidado na classe
        this.totalItems = allData.length;                                         // Atualiza contador mestre
    }

    /* BLOCO: Realiza a requisição individual de um arquivo JSON                                    */
    async _loadSingleFile(letter, fileName) {
        try {
            const response = await fetch(`../concordancia/${letter}/${fileName}.json`);  // Busca arquivo no servidor
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);        // Valida resposta HTTP
            }
            const data = await response.json();                                   // Converte para objeto JSON
            return { data: data[letter] || [] };                                  // Retorna array da letra
        } catch (error) {
            console.warn(`Erro ao carregar arquivo ${fileName}.json:`, error);    // Relata erro de leitura
            return { data: [] };                                                  // Retorna vazio preventivo
        }
    }

    /* BLOCO: Executa a pesquisa global filtrando a base de dados carregada                         */
    async searchGlobal(searchTerm, filters = {}) {
        if (!searchTerm || searchTerm.length < 2) {
            return { data: [], total: 0 };                                        // Aborta buscas curtas
        }
        if (this.searchIndex && this.searchIndex.isReady()) {
            return this.searchUltraFast(searchTerm, filters);                     // Dispara busca de performance
        }
        const searchLower = searchTerm.toLowerCase();                             // Normaliza termo busca
        const firstLetter = searchLower.charAt(0);                                // Pega inicial da busca

        /* BLOCO: Carrega a base da letra inicial e aplica filtros de palavra, testamento e livro   */
        try {
            await this.loadLetterData(firstLetter, 0, false);                     // Carrega dados da inicial
            const filteredResults = this.allData.filter(item => {
                const matchesWord = item.palavra.toLowerCase().includes(searchLower);  // Filtra por palavra
                const matchesTestament = this._matchesTestamentFilter(item, filters.testamento);  // Filtra por testamento
                const matchesBook = this._matchesBookFilter(item, filters.livro); // Filtra por livro específico
                return matchesWord && matchesTestament && matchesBook;            // Retorna se atender filtros
            });
            return {
                data: filteredResults,                                            // Entrega achados
                total: filteredResults.length                                     // Entrega contagem
            };
        } catch (error) {
            console.error('Erro na busca global:', error);                        // Relata falha na pesquisa
            return { data: [], total: 0 };                                        // Retorna resultado vazio
        }
    }

    /* BLOCO: Método de busca de alta performance usando o índice invertido                         */
    async searchUltraFast(searchTerm, filters = {}) {
        if (!searchTerm || searchTerm.length < 2) {
            return { data: [], total: 0 };                                        // Aborta buscas curtas
        }

        /* BLOCO: Utiliza o índice invertido pré-construído para localizar o termo com máxima rapidez*/
        if (this.searchIndex && this.searchIndex.isReady()) {
            const resultados = await this.searchIndex.search(searchTerm, 50);     // Busca no dicionário de IDs
            const filteredResults = resultados.filter(item => {
                const matchesTestament = this._matchesTestamentFilter(item, filters.testamento);  // Aplica filtro testamento
                const matchesBook = this._matchesBookFilter(item, filters.livro); // Aplica filtro livro
                return matchesTestament && matchesBook;                           // Retorna se validado
            });
            return {
                data: filteredResults,                                            // Entrega lista otimizada
                total: filteredResults.length                                     // Entrega contagem otimizada
            };
        }
        return this.searchGlobal(searchTerm, filters);                            // Fallback busca tradicional
    }

    /* BLOCO: Método prioritário que tenta utilizar o índice rápido e fallback                      */
    async searchPriority(searchTerm, filters = {}) {
        if (!searchTerm || searchTerm.length < 2) {
            return { data: [], total: 0 };                                        // Aborta buscas curtas
        }
        const searchLower = searchTerm.toLowerCase();                             // Normaliza termo de pesquisa
        
        /* BLOCO: Primeira tentativa: Busca rápida utilizando o dicionário de índices em memória    */
        if (this.searchIndex && this.searchIndex.isReady()) {
            console.log('🔍 Usando índice para busca rápida');                     // Log de estratégia ativa
            try {
                const resultados = await this.searchIndex.search(searchLower, 100);  // Busca IDs no índice
                
                /* BLOCO: Verifica se o índice retornou dados e reconstrói os objetos completos     */
                if (resultados && resultados.length > 0) {
                    const resultadosCompletos = await this._loadFullResultsFromIndex(resultados);  // Carrega objetos completos
                    const filteredResults = resultadosCompletos.filter(item => {
                        const matchesTestament = this._matchesTestamentFilter(item, filters.testamento);  // Valida testamento
                        const matchesBook = this._matchesBookFilter(item, filters.livro);  // Valida livro
                        return matchesTestament && matchesBook;
                    });
                    return {
                        data: filteredResults,                                    // Entrega consolidado
                        total: filteredResults.length
                    };
                }
            } catch (error) {
                console.warn('Erro na busca por índice:', error);                 // Relata erro estratégico
            }
        }
        console.log('🔍 Buscando apenas na letra inicial:', searchLower.charAt(0));  // Log de estratégia secundária
        
        /* BLOCO: Segunda tentativa: Busca focada apenas nos arquivos que começam com a letra inicial*/
        try {
            const firstLetter = searchLower.charAt(0);
            await this.loadLetterData(firstLetter, 0, false);                     // Carrega letra inicial
            const filteredResults = this.allData.filter(item => {
                const matchesWord = item.palavra && item.palavra.toLowerCase().includes(searchLower);  // Checa palavra
                const matchesText = item.concordancias && item.concordancias.some(c => 
                    c.texto && c.texto.toLowerCase().includes(searchLower)
                );                                                                // Checa texto versículo

                /* BLOCO: Aplica os filtros de classificação bíblica sobre os resultados encontrados*/
                const matchesTestament = this._matchesTestamentFilter(item, filters.testamento);  // Checa testamento
                const matchesBook = this._matchesBookFilter(item, filters.livro); // Checa livro
                
                return (matchesWord || matchesText) && matchesTestament && matchesBook;  // Retorna se atender critérios
            });
            return {
                data: filteredResults,                                            // Entrega achados
                total: filteredResults.length
            };
        } catch (error) {
            console.warn('Erro na busca por letra inicial:', error);              // Relata erro estratégico
        }
        console.log('⚠️ Usando busca tradicional como fallback');                 // Log de última instância
        return this.searchGlobal(searchTerm, filters);                            // Dispara busca mestre
    }

    /* BLOCO: Método auxiliar para carregar objetos completos a partir de referências               */
    async _loadFullResultsFromIndex(resultadosIndex) {
        const resultadosCompletos = [];                                           // Buffer de objetos inteiros
        const palavrasUnicas = new Set();                                         // Controle de duplicidade
        const palavrasPorLetra = new Map();                                       // Agrupador por arquivo

        /* BLOCO: Identifica a letra inicial de cada termo para agrupar as buscas por arquivo físico*/
        resultadosIndex.forEach(resultado => {
            if (resultado && resultado.palavra && !palavrasUnicas.has(resultado.palavra)) {
                palavrasUnicas.add(resultado.palavra);                            // Marca palavra como processada
                const primeiraLetter = resultado.palavra.charAt(0).toLowerCase(); // Identifica arquivo alvo
                
                if (!palavrasPorLetra.has(primeiraLetter)) {
                    palavrasPorLetra.set(primeiraLetter, new Set());              // Inicia grupo da letra
                }
                palavrasPorLetra.get(primeiraLetter).add(resultado.palavra);      // Adiciona palavra ao grupo
            }
        });

        /* BLOCO: Realiza a carga seletiva dos arquivos JSON e filtra apenas as chaves necessárias  */
        for (const [letra, palavras] of palavrasPorLetra) {
            try {
                await this.loadLetterList();                                      // Valida existência arquivos
                const letterFiles = this.listaLetras[letra] || [];
                for (const fileName of letterFiles.slice(0, 3)) {                 // Varre primeiros arquivos
                    try {
                        const response = await fetch(`../concordancia/${letra}/${fileName}.json`);  // Busca arquivo no servidor
                        if (!response.ok) continue;
                        const jsonData = await response.json();                   // Converte para objeto JSON
                        const wordEntries = jsonData[letra] || [];                // Extrai lista de palavras
                        wordEntries.forEach(item => {
                            if (item && item.palavra && palavras.has(item.palavra)) {
                                resultadosCompletos.push(item);                   // Recupera objeto completo
                            }
                        });
                        
                    } catch (fileError) {
                        console.warn(`Erro ao carregar arquivo ${fileName}:`, fileError);  // Relata erro de leitura
                    }
                }
            } catch (error) {
                console.warn(`Erro ao processar letra ${letra}:`, error);         // Relata falha técnica letra
            }
        }
        return resultadosCompletos;                                               // Entrega lista reconstruída
    }

    /* BLOCO: Filtra itens verificando se pertencem ao testamento selecionado                       */
    _matchesTestamentFilter(item, testamentFilter) {
        if (!testamentFilter || testamentFilter === 'todos') return true;         // Ignora se filtro for 'todos'
        return item.concordancias.some(concordancia => {
            const nomeLivro = this._extractBookNameFromReference(concordancia.referencia);  // Isola nome do livro
            const testamento = this._getTestamentForBook(nomeLivro);              // Identifica testamento
            return testamento === testamentFilter;                                // Valida correspondência
        });
    }

    /* BLOCO: Filtra itens verificando se pertencem ao livro selecionado                            */
    _matchesBookFilter(item, bookFilter) {
        if (!bookFilter || bookFilter === 'todos') return true;                   // Ignora se filtro for 'todos'
        return item.concordancias.some(concordancia =>
            concordancia.referencia.toLowerCase().includes(bookFilter.toLowerCase())  // Valida nome do livro
        );
    }

    /* BLOCO: Extrai o nome textual do livro a partir de uma string de referência                   */
    _extractBookNameFromReference(referencia) {
        if (!referencia) return '';
        return referencia.replace(/[0-9:.,;]/g, '').trim();                       // Remove números e pontuação
    }

    /* BLOCO: Identifica a qual testamento um livro pertence via listas internas                    */
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

        /* BLOCO: Normaliza o nome do livro e o compara com as listas mestre de cada testamento     */
        const livroLower = nomeLivro.toLowerCase();                               // Texto para minúsculas
        const isAntigoTestamento = antigoTestamento.some(livro => livroLower.includes(livro.toLowerCase()));
        const isNovoTestamento = novoTestamento.some(livro => livroLower.includes(livro.toLowerCase()));
        if (isAntigoTestamento) return 'Antigo Testamento';                       // Retorna classificação AT
        if (isNovoTestamento) return 'Novo Testamento';                           // Retorna classificação NT
        
        return null;                                                              // Retorna nulo se não achado
    }

    /* BLOCO: Define um conjunto de dados de exemplo para falhas de carregamento                    */
    _getFallbackData(letter) {
        const fallbackData = {
            "a": [{
                "palavra": "exemplo",                                             // Termo de exemplo
                "veja tambem": [],
                "ocorrencias": 1,
                "fonte": "Dados de exemplo",
                "concordancias": [{
                    "referencia": "Exemplo 1:1",
                    "texto": "Este é um exemplo de dados de fallback."            // Texto de exemplo
                }]
            }]
        };

        /* BLOCO: Constrói a estrutura de retorno compatível com o sistema para contingência        */
        return {
            data: fallbackData[letter.toLowerCase()] || [],                       // Retorna lista de fallback
            hasMore: false,                                                       // Bloqueia paginação
            total: 1
        };
    }

    /* BLOCO: Realiza a limpeza completa de todos os objetos de cache e promessas                   */
    clearCache() {
        this.cache.clear();                                                       // Esvazia mapa de dados
        this.loadingPromises.clear();                                             // Esvazia mapa de promessas
        console.log("Cache do DataManager limpo.");                               // Log de confirmação limpeza
    }

    /* BLOCO: Consolida e retorna as estatísticas atuais de uso de memória                          */
    getCacheStats() {
        return {
            cacheSize: this.cache.size,                                           // Informa tamanho do cache
            loadingPromises: this.loadingPromises.size,                           // Informa tarefas ativas
            currentLetter: this.currentLetter,                                    // Informa última letra lida
            totalItems: this.totalItems                                           // Informa total carregado
        };
    }
}

window.dataManager = new DataManager();                                           // Instancia gerenciador global
