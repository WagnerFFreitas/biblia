/* /**                                                                           */
/* * Sistema de índice invertido ULTRA-RÁPIDO para busca na concordância         */
/* * Otimizado para grandes volumes de dados (centenas de arquivos por letra)    */
/* */                                                                            */
class SearchIndex {
    constructor() {
        this.index = new Map();
        this.isIndexBuilt = false;
        this.indexPromise = null;
        this.indexedLetters = new Set();
        this.partialIndexing = true;
        this.searchTimeout = null;
    }

    /**
     * Constroi o índice invertido de forma incremental
     */
    async buildIndex() {
        if (this.isIndexBuilt) return true;
        
        if (this.indexPromise) return this.indexPromise;
        
        console.log('🔄 Iniciando construção do índice de busca...');
        
        this.indexPromise = new Promise(async (resolve, reject) => {
            try {
                // Estratégia: Indexar letras mais comuns primeiro
                const commonLetters = ['a', 'e', 'o', 's', 'c', 'p', 'm', 'r', 't', 'd'];
                
                for (const letter of commonLetters) {
                    if (!this.indexedLetters.has(letter)) {
                        await this._indexLetter(letter);
                    }
                }
                
                this.isIndexBuilt = true;
                console.log('✅ Índice de busca construído (letras comuns)');
                resolve(true);
            } catch (error) {
                console.error('Erro ao construir índice:', error);
                reject(error);
            }
        });
        
        return this.indexPromise;
    }

    /**
     * Indexa uma letra específica
     */
    async _indexLetter(letter) {
        if (this.indexedLetters.has(letter)) return;
        
        console.log(`📚 Indexando letra ${letter}...`);
        
        try {
            const listaLetrasResponse = await fetch('../concordancia/lista_letras.json');
            if (!listaLetrasResponse.ok) return;
            
            const listaLetras = await listaLetrasResponse.json();
            const letterFiles = listaLetras[letter] || [];
            
            // Limitar o número de arquivos indexados por letra para performance
            const maxFilesPerLetter = 50;
            const filesToIndex = letterFiles.slice(0, maxFilesPerLetter);
            
            for (const fileName of filesToIndex) {
                try {
                    const response = await fetch(`../concordancia/${letter}/${fileName}.json`);
                    if (!response.ok) continue;
                    
                    const jsonData = await response.json();
                    const wordEntries = jsonData[letter] || [];
                    
                    // Indexa cada entrada
                    for (const item of wordEntries) {
                        this._indexItem(item);
                    }
                } catch (error) {
                    console.warn(`Erro ao indexar arquivo ${fileName}:`, error);
                }
            }
            
            this.indexedLetters.add(letter);
            console.log(`✅ Letra ${letter} indexada (${filesToIndex.length} arquivos)`);
            
        } catch (error) {
            console.warn(`Erro ao indexar letra ${letter}:`, error);
        }
    }

    /**
     * Indexa um item individual no índice invertido (OTIMIZADO)
     */
    _indexItem(item) {
        if (!item.palavra) return;
        
        const palavraLower = item.palavra.toLowerCase();
        
        // Adiciona apenas a referência, não o item completo (economiza memória)
        if (!this.index.has(palavraLower)) {
            this.index.set(palavraLower, new Set());
        }
        
        // Armazena apenas a palavra e contagem para economizar memória
        this.index.get(palavraLower).add({
            palavra: item.palavra,
            ocorrencias: item.ocorrencias || 0,
            fonte: item.fonte || ''
        });
        
        // Indexa sinônimos de forma limitada
        if (item['veja tambem'] && Array.isArray(item['veja tambem'])) {
            item['veja tambem'].slice(0, 5).forEach(sinonimo => {
                const sinonimoLower = sinonimo.toLowerCase();
                if (!this.index.has(sinonimoLower)) {
                    this.index.set(sinonimoLower, new Set());
                }
                this.index.get(sinonimoLower).add({
                    palavra: item.palavra,
                    ocorrencias: item.ocorrencias || 0,
                    fonte: item.fonte || ''
                });
            });
        }
    }

    /**
     * Busca incremental - indexa letras sob demanda durante a busca
     */
    async search(termo, maxResults = 100) {
    const termoLower = termo.toLowerCase();
    
    // Verifica se já temos a letra indexada
    const primeiraLetra = termoLower.charAt(0);
    if (!this.indexedLetters.has(primeiraLetra)) {
        // Indexa a letra sob demanda se não estiver indexada
        await this._indexLetter(primeiraLetra);
    }
    
    // Busca no índice
    let resultados = Array.from(this.index.get(termoLower) || []);
    
    // Se não encontrou, tenta busca parcial
    if (resultados.length === 0 && termoLower.length > 3) {
        for (let [palavra, items] of this.index) {
            if (palavra.includes(termoLower)) {
                resultados = [...resultados, ...Array.from(items)];
                if (resultados.length >= maxResults * 2) break;
            }
        }
    }
    
    // Ordena por relevância e limita resultados
    return resultados
        .sort((a, b) => {
            // Prioriza correspondências exatas
            const aExact = a.palavra && a.palavra.toLowerCase() === termoLower;
            const bExact = b.palavra && b.palavra.toLowerCase() === termoLower;
            if (aExact && !bExact) return -1;
            if (!aExact && bExact) return 1;
            
            // Depois por número de ocorrências
            return (b.ocorrencias || 0) - (a.ocorrencias || 0);
        })
        .slice(0, maxResults);
}

    /**
     * Busca em tempo real enquanto digita (com debounce)
     */
    async searchWhileTyping(termo, callback, delay = 300) {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        
        this.searchTimeout = setTimeout(async () => {
            if (termo.length < 2) {
                callback([]);
                return;
            }
            
            const resultados = await this.search(termo, 10);
            callback(resultados);
        }, delay);
    }

    isReady() {
        return this.isIndexBuilt;
    }

    clear() {
        this.index.clear();
        this.indexedLetters.clear();
        this.isIndexBuilt = false;
        this.indexPromise = null;
    }

    /**
     * Estatísticas do índice para debug
     */
    getStats() {
        return {
            totalPalavras: this.index.size,
            letrasIndexadas: this.indexedLetters.size,
            tamanhoAproximado: this._getTamanhoAproximado()
        };
    }

    _getTamanhoAproximado() {
        let tamanho = 0;
        for (let [key, value] of this.index) {
            tamanho += key.length;
            tamanho += value.size * 50;
        }
        return Math.round(tamanho / 1024) + ' KB';
    }
}

// Cria uma instância global do índice
window.searchIndex = new SearchIndex();

// Inicia a construção do índice em segundo plano
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.searchIndex.buildIndex().catch(console.error);
    }, 1000);
});
