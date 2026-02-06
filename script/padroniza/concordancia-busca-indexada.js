/*===============================================================================*/
/*                    SISTEMA DE ÍNDICE INVERTIDO PARA BUSCA                     */
/*===============================================================================*/
/*  Este script é responsável por:                                               */
/*                       - Criar um índice de busca ultra-rápido                 */
/*                       - Otimizar consultas em grandes volumes de dados        */
/*                       - Gerenciar cache inteligente de letras indexadas       */
/*===============================================================================*/

/* BLOCO: Define a classe principal do motor de busca indexada                  */
class SearchIndex {                                                                                        /* Inicia classe do índice de busca    */
    constructor() {                                                                                        /* Inicia construtor da classe         */
        this.index = new Map();                                                                            /* Mapa principal de palavras          */
        this.isIndexBuilt = false;                                                                         /* Status de construção do índice      */
        this.indexPromise = null;                                                                          /* Promessa de construção assíncrona   */
        this.indexedLetters = new Set();                                                                   /* Conjunto de letras já indexadas     */
    }

    /* BLOCO: Função principal que constrói o índice de busca com as letras mais comuns */
    async buildIndex() {                                                                                   /* Inicia construção do índice         */
        if (this.isIndexBuilt) return true;                                                                /* Retorna se já foi construído        */
        if (this.indexPromise) return this.indexPromise;                                                   /* Retorna promessa em andamento       */

        console.log('🔄 Iniciando construção do índice de busca...');                                      /* Log de início da construção         */

        /* BLOCO: Cria promessa assíncrona para indexar as letras mais frequentes da língua portuguesa */
        this.indexPromise = new Promise(async (resolve, reject) => {                                       /* Inicia promessa de construção       */
            try {                                                                                          /* Inicia tratamento de erro           */
                const commonLetters = ['a', 'e', 'o', 's', 'c', 'p', 'm', 'r', 't', 'd'];                 /* Lista de letras mais comuns         */
                for (const letter of commonLetters) {                                                      /* Itera sobre cada letra comum        */
                    if (!this.indexedLetters.has(letter)) {                                                /* Verifica se letra não foi indexada  */
                        await this._indexLetter(letter);                                                   /* Indexa a letra específica           */
                    }
                }
                this.isIndexBuilt = true;                                                                  /* Marca índice como construído        */
                console.log('✅ Índice de busca construído (letras comuns)');                              /* Log de sucesso da construção        */
                resolve(true);                                                                             /* Resolve promessa com sucesso        */
            } catch (error) {                                                                              /* Captura erros de construção         */
                console.error('Erro ao construir índice:', error);                                         /* Log de erro técnico                 */
                reject(error);                                                                             /* Rejeita promessa com erro           */
            }
        });

        return this.indexPromise;                                                                          /* Retorna a promessa de construção    */
    }

    /* BLOCO: Função privada que indexa todos os arquivos de uma letra específica */
    async _indexLetter(letter) {                                                                           /* Inicia indexação de uma letra       */
        if (this.indexedLetters.has(letter)) return;                                                       /* Sai se letra já foi indexada        */
        try {                                                                                              /* Inicia tratamento de erro           */
            const listaLetrasResponse = await fetch('../concordancia/lista_letras.json');                  /* Busca lista de arquivos por letra   */
            if (!listaLetrasResponse.ok) return;                                                           /* Sai se requisição falhou            */

            const listaLetras = await listaLetrasResponse.json();                                          /* Converte resposta em objeto         */
            const letterFiles = listaLetras[letter] || [];                                                 /* Obtém arquivos da letra específica  */

            const maxFilesPerLetter = 50;                                                                  /* Limite de arquivos por letra        */
            const filesToIndex = letterFiles.slice(0, maxFilesPerLetter);                                  /* Seleciona arquivos para indexar     */

            /* BLOCO: Itera sobre cada arquivo da letra para extrair e indexar as palavras */
            for (const fileName of filesToIndex) {                                                         /* Itera sobre arquivos selecionados   */
                try {                                                                                      /* Inicia tratamento de erro           */
                    const response = await fetch(`../concordancia/${letter}/${fileName}.json`);            /* Busca arquivo específico            */
                    if (!response.ok) continue;                                                            /* Pula arquivo se falhou              */

                    const jsonData = await response.json();                                                /* Converte arquivo em objeto          */
                    const wordEntries = jsonData[letter] || [];                                            /* Extrai entradas de palavras         */

                    /* BLOCO: Processa cada item de palavra encontrado no arquivo */
                    for (const item of wordEntries) {                                                      /* Itera sobre cada palavra            */
                        this._indexItem(item);                                                             /* Indexa o item individual            */
                    }
                } catch (error) {                                                                          /* Captura erros de arquivo            */
                    console.warn(`Erro ao indexar arquivo ${fileName}:`, error);                           /* Log de aviso de falha               */
                }
            }

            this.indexedLetters.add(letter);                                                               /* Marca letra como indexada           */
            console.log(`✅ Letra ${letter} indexada (${filesToIndex.length} arquivos)`);                 /* Log de sucesso da indexação         */
        } catch (error) {                                                                                  /* Captura erros gerais                */
            console.warn(`Erro ao indexar letra ${letter}:`, error);                                       /* Log de aviso de falha geral         */
        }
    }

    /* BLOCO: Função privada que adiciona um item individual ao índice de busca */
    _indexItem(item) {                                                                                     /* Inicia indexação de item individual */
        if (!item.palavra) return;                                                                         /* Sai se item não tem palavra         */

        const palavraLower = item.palavra.toLowerCase();                                                   /* Converte palavra para minúsculas    */

        /* BLOCO: Cria entrada no índice se não existir */
        if (!this.index.has(palavraLower)) {                                                               /* Verifica se palavra não está indexada */
            this.index.set(palavraLower, new Set());                                                       /* Cria novo conjunto para a palavra   */
        }

        /* BLOCO: Adiciona dados da palavra ao conjunto do índice */
        this.index.get(palavraLower).add({                                                                 /* Adiciona item ao conjunto           */
            palavra: item.palavra,                                                                         /* Palavra original com formatação     */
            ocorrencias: item.ocorrencias || 0,                                                            /* Número de ocorrências na bíblia     */
            fonte: item.fonte || ''                                                                        /* Fonte ou referência da palavra      */
        });

        /* BLOCO: Indexa também os sinônimos se disponíveis */
        if (item['veja tambem'] && Array.isArray(item['veja tambem'])) {                                   /* Verifica se há sinônimos            */
            item['veja tambem'].slice(0, 5).forEach(sinonimo => {                                          /* Limita a 5 sinônimos por palavra    */
                const sinonimoLower = sinonimo.toLowerCase();                                               /* Converte sinônimo para minúsculas   */
                if (!this.index.has(sinonimoLower)) {                                                      /* Verifica se sinônimo não indexado   */
                    this.index.set(sinonimoLower, new Set());                                              /* Cria conjunto para o sinônimo       */
                }
                this.index.get(sinonimoLower).add({                                                        /* Adiciona referência cruzada         */
                    palavra: item.palavra,                                                                 /* Palavra original                    */
                    ocorrencias: item.ocorrencias || 0,                                                    /* Ocorrências da palavra original     */
                    fonte: item.fonte || ''                                                                /* Fonte da palavra original           */
                });
            });
        }
    }

    /* BLOCO: Função pública que executa busca no índice com termo específico */
    async search(termo, maxResults = 50) {                                                                 /* Inicia busca com limite de resultados */
        const termoLower = termo.toLowerCase();                                                            /* Converte termo para minúsculas      */
        const primeiraLetra = termoLower.charAt(0);                                                        /* Extrai primeira letra do termo      */

        /* BLOCO: Garante que a letra do termo esteja indexada antes da busca */
        if (!this.indexedLetters.has(primeiraLetra)) {                                                     /* Verifica se letra não foi indexada  */
            await this._indexLetter(primeiraLetra);                                                        /* Indexa a letra sob demanda          */
        }

        let resultados = Array.from(this.index.get(termoLower) || []);                                     /* Busca resultados exatos primeiro    */

        /* BLOCO: Se não encontrou resultados exatos, faz busca parcial */
        if (resultados.length === 0 && termoLower.length > 3) {                                            /* Verifica se precisa busca parcial   */
            for (let [palavra, items] of this.index) {                                                     /* Itera sobre todas as palavras       */
                if (palavra.includes(termoLower)) {                                                        /* Verifica se palavra contém o termo  */
                    resultados = [...resultados, ...Array.from(items)];                                    /* Adiciona resultados parciais        */
                    if (resultados.length >= maxResults * 2) break;                                        /* Para se exceder limite dobrado      */
                }
            }
        }

        return resultados.slice(0, maxResults);                                                            /* Retorna resultados limitados        */
    }

    /* BLOCO: Função que verifica se o índice está pronto para uso */
    isReady() {                                                                                            /* Inicia verificação de prontidão     */
        return this.isIndexBuilt;                                                                          /* Retorna status de construção        */
    }
}

window.searchIndex = new SearchIndex();                                                                    /* Cria instância global do índice     */
