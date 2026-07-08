/*===============================================================================*/
/*                    FUNÇÃO DE BUSCA ULTRA-RÁPIDA EM MEMÓRIA                    */
/*===============================================================================*/
/*     Versão Otimizada: Carrega capítulos em paralelo para máxima velocidade    */
/*===============================================================================*/

(function() {
    'use strict';
    
    const CACHE_VERSION = 'v9';                                                   // Versão incrementada para forçar a reconstrução
    const MAX_RESULTS = 500;
    
    window.searchEngine = {
        invertedIndex: {},
        versiculos: [],
        versaoAtual: '',
        isReady: false
    };
    
    const livrosBiblicos = {
        genesis: 50, exodo: 40, levitico: 27, numeros: 36, deuteronomio: 34, josue: 24, juizes: 21, rute: 4, 
        '1samuel': 31, '2samuel': 24, '1reis': 22, '2reis': 25, '1cronicas': 29, '2cronicas': 36, esdras: 10, 
        neemias: 13, ester: 10, jo: 42, salmos: 150, proverbios: 31, eclesiastes: 12, cantares: 8, isaias: 66, 
        jeremias: 52, lamentacoes: 5, ezequiel: 48, daniel: 12, oseias: 14, joel: 3, amos: 9, obadias: 1, 
        jonas: 4, miqueias: 7, naum: 3, habacuque: 3, sofonias: 3, ageu: 2, zacarias: 14, malaquias: 4, 
        mateus: 28, marcos: 16, lucas: 24, joao: 21, atos: 28, romanos: 16, '1corintios': 16, '2corintios': 13, 
        galatas: 6, efesios: 6, filipenses: 4, colossenses: 4, '1tessalonicenses': 5, '2tessalonicenses': 3, 
        '1timoteo': 6, '2timoteo': 4, tito: 3, filemom: 1, hebreus: 13, tiago: 5, '1pedro': 5, '2pedro': 3, 
        '1joao': 5, '2joao': 1, '3joao': 1, judas: 1, apocalipse: 22
    };

    function normalizarTexto(texto) { return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^\w\s]/g, ''); }
    
    function extrairVersiculosDoHTML(htmlString, livro, cap) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const versiculos = [];
        const versiculoNodes = doc.querySelectorAll('div[id^="versiculo-"]');
        
        versiculoNodes.forEach(node => {
            const idMatch = node.id.match(/versiculo-(\d+)/);
            if (idMatch) {
                const vers = parseInt(idMatch[1]);
                let texto = '';
                const cloneNode = node.cloneNode(true);
                cloneNode.querySelectorAll('strong').forEach(strong => strong.remove());
                texto = cloneNode.textContent.trim();
                if (texto) {
                    versiculos.push({ livro: livro, cap: parseInt(cap), vers: vers, texto: texto });
                }
            }
        });
        return versiculos;
    }
    
    async function carregarConstruirIndice() {
        const versao = localStorage.getItem('versaoBiblicaSelecionada') || 'acf';
        if (window.searchEngine.isReady && window.searchEngine.versaoAtual === versao) { return; }
        
        window.searchEngine.isReady = false;
        console.log("[Busca] Iniciando construção do índice...");
        const chaveCache = `searchIndex_${versao}_${CACHE_VERSION}`;
        
        if (await carregarIndexedDB(chaveCache)) {
            console.log(`[Busca] Índice carregado do IndexedDB para ${versao}.`);
            window.searchEngine.isReady = true;
            return;
        }
        
        console.log(`[Busca] Construindo índice para ${versao} a partir dos arquivos de capítulo em paralelo...`);
        
        const newInvertedIndex = {}, newVersiculos = [];
        let versiculoId = 0;
        const isHtmlVersion = versao.toLowerCase() === 'arc';
        const fileExtension = isHtmlVersion ? 'html' : 'json';
        
        // **AQUI ESTÁ A MÁGICA DA VELOCIDADE**
        // 1. Cria uma lista de todas as "promessas" de download de capítulos.
        const todasAsPromessas = [];
        for (const livro in livrosBiblicos) {
            const totalCapitulos = livrosBiblicos[livro];
            for (let cap = 1; cap <= totalCapitulos; cap++) {
                const caminho = `../versao/${versao}/${livro}/${cap}.${fileExtension}`;
                // Adiciona a promessa de download à lista
                todasAsPromessas.push(fetch(caminho).then(res => {
                    if (!res.ok) return null;
                    return isHtmlVersion ? res.text().then(html => ({ tipo: 'html', data: html, livro, cap }))
                                         : res.json().then(json => ({ tipo: 'json', data: json, livro, cap }));
                }));
            }
        }

        // 2. Executa todas as promessas em paralelo
        const todosOsCapitulos = await Promise.all(todasAsPromessas);

        // 3. Processa os resultados, que agora estão todos na memória
        for (const resultado of todosOsCapitulos) {
            if (!resultado) continue;                                             // Pula capítulos que falharam ao carregar

            const { tipo, data, livro, cap } = resultado;
            let versiculosCapitulo = [];

            if (tipo === 'html') {
                versiculosCapitulo = extrairVersiculosDoHTML(data, livro, cap);
            } else {                                                              // json
                for (const [vers, texto] of Object.entries(data.versiculos || {})) {
                    versiculosCapitulo.push({ livro: livro, cap: parseInt(cap), vers: parseInt(vers), texto: texto });
                }
            }
            
            versiculosCapitulo.forEach(versiculoObj => {
                versiculoObj.id = versiculoId++;
                newVersiculos.push(versiculoObj);
                const palavras = normalizarTexto(versiculoObj.texto).split(/\s+/).filter(p => p.length > 1);
                palavras.forEach(palavra => {
                    if (!newInvertedIndex[palavra]) newInvertedIndex[palavra] = [];
                    newInvertedIndex[palavra].push(versiculoObj);
                });
            });
        }

        window.searchEngine.invertedIndex = newInvertedIndex;
        window.searchEngine.versiculos = newVersiculos;
        window.searchEngine.versaoAtual = versao;
        
        await salvarEmIndexedDB(chaveCache, window.searchEngine);
        console.log(`[Busca] Índice construído e salvo. Total de versículos: ${newVersiculos.length}.`);
        window.searchEngine.isReady = true;
    }
    
    // ... (As funções de IndexedDB, realizarBuscaAvancada e combinarEstrategiasBusca permanecem as mesmas)
    
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => { carregarConstruirIndice(); }, 1000);                   // Inicia a indexação em segundo plano
    });

    // Colando as funções que faltavam aqui para garantir que o arquivo esteja completo
    async function carregarIndexedDB(chave) {
        return new Promise((resolve) => {
            const request = indexedDB.open('BibleSearchDB', 1);
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                db.createObjectStore('searchIndexes', { keyPath: 'id' });
            };
            request.onsuccess = (event) => {
                const db = event.target.result;
                const transaction = db.transaction(['searchIndexes'], 'readonly');
                const store = transaction.objectStore('searchIndexes');
                const getRequest = store.get(chave);
                getRequest.onsuccess = () => {
                    if (getRequest.result) {
                        window.searchEngine = getRequest.result.data;
                        window.searchEngine.versaoAtual = localStorage.getItem('versaoBiblicaSelecionada') || 'acf';
                        resolve(true);
                    } else { resolve(false); }
                };
                getRequest.onerror = () => resolve(false);
            };
            request.onerror = () => resolve(false);
        });
    }
    
    async function salvarEmIndexedDB(chave, dados) {
        return new Promise((resolve) => {
            const request = indexedDB.open('BibleSearchDB', 1);
            request.onsuccess = (event) => {
                const db = event.target.result;
                const transaction = db.transaction(['searchIndexes'], 'readwrite');
                const store = transaction.objectStore('searchIndexes');
                store.put({ id: chave, data: dados });
                transaction.oncomplete = () => resolve(true);
                transaction.onerror = () => resolve(false);
            };
            request.onerror = () => resolve(false);
        });
    }
    
    window.realizarBuscaAvancada = async function(termo) {
        if (!termo) return [];
        const versaoSelecionada = localStorage.getItem('versaoBiblicaSelecionada') || 'acf';
        
        if (!window.searchEngine.isReady || window.searchEngine.versaoAtual !== versaoSelecionada) {
            await carregarConstruirIndice();
        }
        
        const termoNorm = normalizarTexto(termo);
        const palavrasBusca = termoNorm.split(/\s+/).filter(p => p.length > 1);
        const resultados = combinarEstrategiasBusca(palavrasBusca, termoNorm);
        return resultados.slice(0, MAX_RESULTS);
    };

    function combinarEstrategiasBusca(palavrasBusca, termoOriginalNormalizado) {
        let resultadosFinais = new Map();
        if (palavrasBusca.length > 0) {
            let candidatos = new Map();
            palavrasBusca.forEach(palavra => {
                if (window.searchEngine.invertedIndex[palavra]) {
                    window.searchEngine.invertedIndex[palavra].forEach(ref => {
                        const key = `${ref.livro}-${ref.cap}-${ref.vers}`;
                        candidatos.set(key, (candidatos.get(key) || 0) + 1);
                        if (!resultadosFinais.has(key)) {
                            resultadosFinais.set(key, ref);
                        }
                    });
                }
            });
            const resultadosComTodasPalavras = Array.from(candidatos.entries())
                .filter(([key, count]) => count === palavrasBusca.length)
                .map(([key, count]) => resultadosFinais.get(key));
            const resultadosFinaisFiltrados = resultadosComTodasPalavras.filter(r => 
                normalizarTexto(r.texto).includes(termoOriginalNormalizado)
            );
            if (resultadosFinaisFiltrados.length === 0 && palavrasBusca.length > 1) {
                Array.from(candidatos.entries()).forEach(([key, count]) => {
                    const ref = resultadosFinais.get(key);
                    if (normalizarTexto(ref.texto).includes(termoOriginalNormalizado)) {
                        resultadosFinaisFiltrados.push(ref);
                    }
                });
            }
            return resultadosFinaisFiltrados;
        } else {
            return window.searchEngine.versiculos.filter(r => 
                normalizarTexto(r.texto).includes(termoOriginalNormalizado)
            );
        }
    }

})();
