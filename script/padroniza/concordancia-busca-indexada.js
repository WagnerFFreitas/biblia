/* /**                                                                           */
/* * Sistema de índice invertido ULTRA-RÁPIDO para busca na concordância         */
/* * Otimizado para grandes volumes de dados                                     */
/* */                                                                            */
class SearchIndex {
    constructor() {
        this.index = new Map();
        this.isIndexBuilt = false;
        this.indexPromise = null;
        this.indexedLetters = new Set();
    }

    async buildIndex() {
        if (this.isIndexBuilt) return true;
        if (this.indexPromise) return this.indexPromise;

        console.log('🔄 Iniciando construção do índice de busca...');

        this.indexPromise = new Promise(async (resolve, reject) => {
            try {
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

    async _indexLetter(letter) {
        if (this.indexedLetters.has(letter)) return;
        try {
            const listaLetrasResponse = await fetch('../concordancia/lista_letras.json');
            if (!listaLetrasResponse.ok) return;

            const listaLetras = await listaLetrasResponse.json();
            const letterFiles = listaLetras[letter] || [];

            const maxFilesPerLetter = 50;
            const filesToIndex = letterFiles.slice(0, maxFilesPerLetter);

            for (const fileName of filesToIndex) {
                try {
                    const response = await fetch(`../concordancia/${letter}/${fileName}.json`);
                    if (!response.ok) continue;

                    const jsonData = await response.json();
                    const wordEntries = jsonData[letter] || [];

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

    _indexItem(item) {
        if (!item.palavra) return;

        const palavraLower = item.palavra.toLowerCase();

        if (!this.index.has(palavraLower)) {
            this.index.set(palavraLower, new Set());
        }

        this.index.get(palavraLower).add({
            palavra: item.palavra,
            ocorrencias: item.ocorrencias || 0,
            fonte: item.fonte || ''
        });

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

    async search(termo, maxResults = 50) {                                        // 🔥 alterado de 100 para 50
        const termoLower = termo.toLowerCase();
        const primeiraLetra = termoLower.charAt(0);

        if (!this.indexedLetters.has(primeiraLetra)) {
            await this._indexLetter(primeiraLetra);
        }

        let resultados = Array.from(this.index.get(termoLower) || []);

        if (resultados.length === 0 && termoLower.length > 3) {
            for (let [palavra, items] of this.index) {
                if (palavra.includes(termoLower)) {
                    resultados = [...resultados, ...Array.from(items)];
                    if (resultados.length >= maxResults * 2) break;
                }
            }
        }

        return resultados.slice(0, maxResults);
    }

    isReady() {
        return this.isIndexBuilt;
    }
}

window.searchIndex = new SearchIndex();
