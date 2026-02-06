/*===============================================================================*/
/*              GERENCIADOR DE DADOS DA CONCORDÂNCIA (DATA MANAGER)              */
/*===============================================================================*/
/*  Este script é responsável por:                                               */
/*                       - Gerenciar cache inteligente de dados da concordância  */
/*                       - Implementar carregamento paginado de arquivos JSON    */
/*                       - Otimizar buscas com sistema de cache em memória       */
/*===============================================================================*/

/* BLOCO: Define a classe principal do gerenciador de dados da concordância     */
class DataManager {                                                                                        /* Inicia classe do gerenciador        */
    constructor() {                                                                                        /* Inicia construtor da classe         */
        this.cache = new Map();                                                                            /* Mapa de cache de dados carregados   */
        this.loadingPromises = new Map();                                                                  /* Mapa de promessas de carregamento   */
        this.listaLetras = null;                                                                           /* Buffer da lista de arquivos         */
        this.currentLetter = null;                                                                         /* Letra atualmente carregada          */
        this.currentPage = 0;                                                                              /* Página atual da paginação           */
        this.itemsPerPage = 50;                                                                            /* Itens por página padrão             */
        this.totalItems = 0;                                                                               /* Total de itens da letra atual       */
        this.allData = [];                                                                                 /* Array de todos os dados da letra    */
        this.filteredData = [];                                                                            /* Array de dados filtrados            */
        this.searchCache = new Map();                                                                      /* Cache específico para buscas        */
    }

    /* BLOCO: Carrega a lista mestre de arquivos organizados por letra */
    async loadLetterList() {                                                                               /* Inicia carregamento da lista         */
        if (this.listaLetras) return this.listaLetras;                                                     /* Retorna cache se disponível         */

        /* BLOCO: Tenta buscar o arquivo de índice no servidor */
        try {                                                                                              /* Inicia tratamento de erro           */
            const response = await fetch('../concordancia/lista_letras.json');                             /* Solicita arquivo de índice          */
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);                   /* Valida resposta HTTP                */
            this.listaLetras = await response.json();                                                      /* Converte resposta em objeto         */
            return this.listaLetras;                                                                       /* Retorna dados carregados            */
        } catch (error) {                                                                                  /* Captura erros de carregamento       */
            console.error('Erro ao carregar lista de letras:', error);                                     /* Log de erro técnico                 */
            this.listaLetras = { "a": ["a1", "a2", "a3", "a4"] };                                          /* Define fallback mínimo              */
            return this.listaLetras;                                                                       /* Retorna dados de emergência         */
        }
    }

    /* BLOCO: Carrega dados paginados de uma letra específica */
    async loadLetterData(letter, page = 0, forceReload = false) {                                          /* Inicia carregamento de letra         */
        const letterLower = letter.toLowerCase();                                                          /* Normaliza letra para minúscula      */
        const cacheKey = `${letterLower}_${page}`;                                                         /* Cria chave única do cache           */

        /* BLOCO: Verifica se já há carregamento em andamento */
        if (this.loadingPromises.has(cacheKey)) {                                                          /* Verifica promessa em andamento      */
            return await this.loadingPromises.get(cacheKey);                                               /* Aguarda promessa existente          */
        }

        /* BLOCO: Verifica cache existente se não forçar recarregamento */
        if (!forceReload && this.cache.has(cacheKey)) {                                                    /* Verifica cache válido               */
            return this.cache.get(cacheKey);                                                               /* Retorna dados do cache              */
        }

        /* BLOCO: Executa carregamento completo dos arquivos da letra */
        try {                                                                                              /* Inicia tratamento de erro           */
            await this.loadLetterList();                                                                   /* Garante lista de arquivos           */
            const files = this.listaLetras[letterLower] || [];                                             /* Obtém arquivos da letra             */
            const allData = [];                                                                            /* Array para todos os dados           */

            /* BLOCO: Itera sobre cada arquivo da letra para carregar seu conteúdo */
            for (const file of files) {                                                                    /* Itera sobre arquivos da letra       */
                try {                                                                                      /* Inicia tratamento de erro           */
                    const response = await fetch(`../concordancia/${letterLower}/${file}.json`);           /* Solicita arquivo específico         */
                    if (!response.ok) continue;                                                            /* Pula arquivo se falhou              */
                    
                    const data = await response.json();                                                    /* Converte arquivo em objeto          */
                    if (data[letterLower]) {                                                               /* Verifica se tem dados da letra      */
                        allData.push(...data[letterLower]);                                                /* Adiciona dados ao array             */
                    }
                } catch (fileError) {                                                                      /* Captura erros de arquivo            */
                    console.warn(`Erro ao carregar arquivo ${file}:`, fileError);                          /* Log de aviso de falha               */
                }
            }

            /* BLOCO: Atualiza propriedades internas e calcula paginação */
            this.allData = allData;                                                                        /* Armazena todos os dados              */
            this.currentLetter = letterLower;                                                              /* Define letra atual                  */
            this.totalItems = allData.length;                                                              /* Define total de itens               */

            const start = page * this.itemsPerPage;                                                        /* Calcula início da página            */
            const end = start + this.itemsPerPage;                                                         /* Calcula fim da página               */
            const pageData = allData.slice(start, end);                                                    /* Extrai dados da página              */

            /* BLOCO: Monta objeto de resultado com metadados */
            const result = {                                                                               /* Inicia objeto de resultado          */
                data: pageData,                                                                            /* Dados da página atual               */
                total: allData.length,                                                                     /* Total de itens disponíveis         */
                hasMore: end < allData.length                                                              /* Indica se há mais páginas           */
            };

            this.cache.set(cacheKey, result);                                                              /* Armazena resultado no cache         */
            this.loadingPromises.delete(cacheKey);                                                         /* Remove promessa do mapa             */

            return result;                                                                                 /* Retorna resultado final             */

        } catch (error) {                                                                                  /* Captura erros gerais                */
            console.error('Erro ao carregar dados da letra:', error);                                      /* Log de erro técnico                 */
            this.loadingPromises.delete(cacheKey);                                                         /* Remove promessa com erro            */
            throw error;                                                                                   /* Propaga erro para chamador          */
        }
    }

    /* BLOCO: Método de busca prioritária com filtros avançados */
    async searchPriority(searchTerm, filters = {}) {                                                       /* Inicia busca prioritária            */
        const searchLower = searchTerm.toLowerCase();                                                      /* Normaliza termo de busca            */
        const cacheKey = `${searchLower}_${filters.testamento || 'todos'}_${filters.livro || 'todos'}`;   /* Cria chave de cache da busca        */
        
        /* BLOCO: Verifica cache de busca existente */
        if (this.searchCache.has(cacheKey)) {                                                              /* Verifica se busca está em cache     */
            return this.searchCache.get(cacheKey);                                                         /* Retorna resultado do cache          */
        }

        /* BLOCO: Executa busca nos dados carregados */
        try {                                                                                              /* Inicia tratamento de erro           */
            const letter = searchLower.charAt(0);                                                          /* Extrai primeira letra do termo      */
            await this.loadLetterData(letter);                                                             /* Carrega dados da letra              */

            /* BLOCO: Filtra dados aplicando critérios de busca e filtros */
            const results = this.allData.map(item => {                                                     /* Mapeia todos os itens               */
                if (!this._matchesTestamentFilter(item, filters.testamento) ||                             /* Verifica filtro de testamento       */
                    !this._matchesBookFilter(item, filters.livro)) {                                       /* Verifica filtro de livro            */
                    return null;                                                                           /* Rejeita item que não passa filtros  */
                }

                /* BLOCO: Busca concordâncias que contêm o termo */
                const matchingConcordances = item.concordancias?.filter(c =>                               /* Filtra concordâncias                */
                    c.texto.toLowerCase().includes(searchLower)                                            /* Verifica se texto contém termo      */
                );

                /* BLOCO: Retorna item se há concordâncias correspondentes */
                if (matchingConcordances && matchingConcordances.length > 0) {                             /* Verifica se há correspondências     */
                    return { ...item, concordancias: matchingConcordances };                               /* Retorna item com concordâncias      */
                }

                return null;                                                                               /* Rejeita item sem correspondências   */
            }).filter(Boolean);                                                                            /* Remove itens nulos                  */

            /* BLOCO: Monta resultado e armazena no cache */
            const result = {                                                                               /* Inicia objeto de resultado          */
                data: results,                                                                             /* Dados encontrados                   */
                total: results.length                                                                      /* Total de resultados                 */
            };

            this.searchCache.set(cacheKey, result);                                                        /* Armazena no cache de busca          */
            return result;                                                                                 /* Retorna resultado final             */

        } catch (error) {                                                                                  /* Captura erros de busca              */
            console.error('Erro na busca prioritária:', error);                                            /* Log de erro técnico                 */
            return { data: [], total: 0 };                                                                 /* Retorna resultado vazio             */
        }
    }

    /* BLOCO: Verifica se item corresponde ao filtro de testamento */
    _matchesTestamentFilter(item, testamento) {                                                            /* Inicia verificação de testamento    */
        if (!testamento || testamento === 'todos') return true;                                            /* Aceita se filtro é "todos"          */
        return (item.testamento || '').toLowerCase() === testamento.toLowerCase();                        /* Compara testamentos normalizados    */
    }

    /* BLOCO: Verifica se item corresponde ao filtro de livro */
    _matchesBookFilter(item, livro) {                                                                      /* Inicia verificação de livro         */
        if (!livro || livro === 'todos') return true;                                                      /* Aceita se filtro é "todos"          */
        return (item.livro || '').toLowerCase() === livro.toLowerCase();                                   /* Compara livros normalizados         */
    }

    /* BLOCO: Busca de fallback mais ampla quando busca prioritária falha */
    async _searchFallback(searchLower, filters = {}) {                                                     /* Inicia busca de fallback            */
        try {                                                                                              /* Inicia tratamento de erro           */
            const firstLetter = searchLower.charAt(0);                                                     /* Extrai primeira letra               */
            await this.loadLetterData(firstLetter, 0, false);                                              /* Carrega dados da letra              */

            /* BLOCO: Filtra resultados aplicando todos os critérios */
            const filteredResults = this.allData.filter(item => {                                          /* Filtra array de dados               */
                const matchesWord = item.palavra.toLowerCase().includes(searchLower);                      /* Verifica se palavra contém termo    */
                const matchesTestament = this._matchesTestamentFilter(item, filters.testamento);           /* Verifica filtro de testamento       */
                const matchesBook = this._matchesBookFilter(item, filters.livro);                          /* Verifica filtro de livro            */
                return matchesWord && matchesTestament && matchesBook;                                      /* Retorna se passa todos os filtros   */
            });

            return { data: filteredResults, total: filteredResults.length };                               /* Retorna resultados filtrados        */
        } catch (error) {                                                                                  /* Captura erros de fallback           */
            console.error('Erro na busca global fallback:', error);                                        /* Log de erro técnico                 */
            return { data: [], total: 0 };                                                                 /* Retorna resultado vazio             */
        }
    }
}

window.DataManager = DataManager;                                                                          /* Exporta classe globalmente          */