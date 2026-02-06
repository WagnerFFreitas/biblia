/*===============================================================================*/
/*                    FUNÇÃO DE BUSCA ULTRA-RÁPIDA EM MEMÓRIA                    */
/*===============================================================================*/
/*     Versão Otimizada: Carrega capítulos em paralelo para máxima velocidade    */
/*===============================================================================*/

/* BLOCO: Inicia a função autoexecutável                                       */
(function () {                                                                                                 /* Inicia a função autoexecutável       */
    'use strict';                                                                                              /* Ativa o modo de escrita rígido       */

    /* BLOCO: Configurações iniciais e variáveis de controle                   */
    const CACHE_VERSION = 'v10';                                                                               /* Versão do cache para atualização     */
    const MAX_RESULTS = 500;                                                                                   /* Limite de versículos exibidos        */

    /* BLOCO: Objeto global do motor de busca (estado)                         */
    window.searchEngine = {                                                                                    /* Objeto global do motor de busca      */
        invertedIndex: {},                                                                                     /* Dicionário: palavra -> versículos    */
        versiculos: [],                                                                                        /* Lista mestre de todos os versos      */
        versaoAtual: '',                                                                                       /* Sigla da bíblia carregada agora      */
        isReady: false                                                                                         /* Status de prontidão da busca         */
    };

    /* BLOCO: Dicionário de livros e quantidade de capítulos                   */
    const livrosBiblicos = {                                                                                   /* Lista de livros e seus capítulos     */
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

    /* BLOCO: Função que normaliza o texto (limpeza e padronização)            */
    function normalizarTexto(texto) {                                                                          /* Função que limpa e padroniza texto   */
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^\w\s]/g, '');   /* Remove acentos e caracteres extras   */
    }

    /* BLOCO: Função que extrai versículos de arquivos html                    */
    function extrairVersiculosDoHTML(htmlString, livro, cap) {                                                 /* Extrai versos de arquivos HTML       */
        const parser = new DOMParser();                                                                        /* Criador de documentos virtuais       */
        const doc = parser.parseFromString(htmlString, 'text/html');                                           /* Transforma texto em HTML real        */
        const versiculos = [];                                                                                 /* Lista temporária de versículos       */
        const versiculoNodes = doc.querySelectorAll('div[id^="versiculo-"]');                                  /* Busca as DIVs de versículo           */

        /* BLOCO: Iteração sobre os nós de versículos encontrados              */
        versiculoNodes.forEach(node => {                                                                       /* Varre cada nó de versículo achado    */
            const idMatch = node.id.match(/versiculo-(\d+)/);                                                  /* Tenta pegar o número do ID           */
            
            /* BLOCO: Verificação de validade do ID do versículo               */
            if (idMatch) {                                                                                     /* Se o número for encontrado           */
                const vers = parseInt(idMatch[1]);                                                             /* Converte número em inteiro           */
                let texto = '';                                                                                /* Inicia texto vazio                   */
                const cloneNode = node.cloneNode(true);                                                        /* Clona o nó para limpeza              */
                
                /* BLOCO: Limpeza de elementos internos (títulos/strong)       */
                cloneNode.querySelectorAll('strong').forEach(strong => strong.remove());                       /* Remove títulos internos (negrito)    */
                texto = cloneNode.textContent.trim();                                                          /* Pega o texto puro limpo              */
                
                /* BLOCO: Validação de conteúdo textual antes da inserção      */
                if (texto) {                                                                                   /* Se houver texto real                 */
                    versiculos.push({ livro: livro, cap: parseInt(cap), vers: vers, texto: texto });           /* Salva o objeto do versículo          */
                }
            }
        });
        return versiculos;                                                                                     /* Retorna a lista processada            */
    }

    /* BLOCO: Função que carrega e constrói o índice (construtor do motor)     */
    async function carregarConstruirIndice() {                                                                 /* Função principal de indexação        */
        const versao = localStorage.getItem('versaoBiblicaSelecionada') || 'acf';                              /* Pega a bíblia salva no navegador     */

        /* BLOCO: Verificação de segurança para a versão Original              */
        if (versao === 'original') {                                                                           /* Verifica se é a bíblia original      */
            console.log("[Busca] Indexação pulada para a versão 'original' (incompleta).");                    /* Loga aviso de segurança              */
            window.searchEngine.isReady = true;                                                                /* Libera a interface de busca          */
            return;                                                                                            /* Interrompe o processo                */
        }

        /* BLOCO: Verifica se o motor já está carregado com a versão atual     */
        if (window.searchEngine.isReady && window.searchEngine.versaoAtual === versao) { return; }             /* Sai se a bíblia já estiver pronta    */

        /* BLOCO: Configuração do estado de carga e chave de cache             */
        window.searchEngine.isReady = false;                                                                   /* Bloqueia busca durante construção    */
        console.log("[Busca] Iniciando construção do índice...");                                              /* Loga início do trabalho              */
        const chaveCache = `searchIndex_${versao}_${CACHE_VERSION}`;                                           /* Define nome da chave no banco        */

        /* BLOCO: Tentativa de carregamento via Cache IndexedDB                */
        if (await carregarIndexedDB(chaveCache)) {                                                             /* Tenta carregar índice já pronto      */
            console.log(`[Busca] Índice carregado do IndexedDB para ${versao}.`);                              /* Loga sucesso de carregamento         */
            window.searchEngine.isReady = true;                                                                /* Ativa o motor de busca               */
            return;                                                                                            /* Finaliza a função                    */
        }

        /* BLOCO: Inicialização de coletores e metadados de construção         */
        console.log(`[Busca] Construindo índice para ${versao} a partir dos arquivos...`);                     /* Loga construção manual               */
        const newInvertedIndex = {}, newVersiculos = [];                                                       /* Cria coletores vazios                */
        let versiculoId = 0;                                                                                   /* Contador único de IDs                */
        const isHtmlVersion = versao.toLowerCase() === 'arc';                                                  /* Vê se a versão usa HTML              */
        const fileExtension = isHtmlVersion ? 'html' : 'json';                                                 /* Define extensão do arquivo           */

        /* BLOCO: Loop de livros para montagem da fila de requisições          */
        const todasAsPromessas = [];                                                                           /* Fila de downloads paralelos          */
        for (const livro in livrosBiblicos) {                                                                  /* Passa por cada livro da bíblia       */
            const totalCapitulos = livrosBiblicos[livro];                                                      /* Pega o total de capítulos            */
            
            /* BLOCO: Loop de capítulos para cada livro da bíblia              */
            for (let cap = 1; cap <= totalCapitulos; cap++) {                                                  /* Passa por cada capítulo              */
                const caminho = `../versao/${versao}/${livro}/${cap}.${fileExtension}`;                        /* Monta o endereço do arquivo          */
                todasAsPromessas.push(fetch(caminho).then(res => {                                             /* Adiciona o pedido de download        */
                    if (!res.ok) return null;                                                                  /* Se falhar, retorna nulo              */
                    return isHtmlVersion ? res.text().then(html => ({ tipo: 'html', data: html, livro, cap }))
                        : res.json().then(json => ({ tipo: 'json', data: json, livro, cap }));
                }));
            }
        }

        const todosOsCapitulos = await Promise.all(todasAsPromessas);                                          /* Aguarda todos os downloads           */

        /* BLOCO: Processamento de cada capítulo baixado                       */
        for (const resultado of todosOsCapitulos) {                                                            /* Lê cada capítulo baixado             */
            
            /* BLOCO: Validação de integridade do arquivo baixado              */
            if (!resultado) continue;                                                                          /* Pula se o arquivo falhou             */

            /* BLOCO: Extração e limpeza dos dados do resultado                */
            const { tipo, data, livro, cap } = resultado;                                                      /* Desmembra os dados do resultado      */
            let versiculosCapitulo = [];                                                                       /* Lista de versos do capítulo          */

            /* BLOCO: Decisão do parser conforme o formato do arquivo          */
            if (tipo === 'html') {                                                                             /* Se o dado for HTML                   */
                versiculosCapitulo = extrairVersiculosDoHTML(data, livro, cap);                                /* Processa as tags HTML                */
            } else {                                                                                           /* Se o dado for JSON                   */
                const chapterData = Array.isArray(data) ? data[0] : data;                                      /* Trata arrays ou objetos              */
                
                /* BLOCO: Varredura de propriedades do objeto de versículos    */
                for (const [vers, texto] of Object.entries(chapterData.versiculos || {})) {                    /* Varre cada versículo JSON            */
                    
                    /* BLOCO: Tratamento para JSON estruturado (original)      */
                    if (typeof texto === 'object' && texto !== null && texto.traducao_completa) {              /* Se for JSON estruturado (original)   */
                        versiculosCapitulo.push({ livro: livro, cap: parseInt(cap), vers: parseInt(vers), texto: texto.traducao_completa });
                    } else if (typeof texto === 'string') {                                                    /* Se for JSON simples (texto puro)     */
                        versiculosCapitulo.push({ livro: livro, cap: parseInt(cap), vers: parseInt(vers), texto: texto });
                    }
                }
            }

            /* BLOCO: Registro dos versículos no índice invertido              */
            versiculosCapitulo.forEach(versiculoObj => {                                                       /* Varre os versos do capítulo          */
                versiculoObj.id = versiculoId++;                                                               /* Dá um ID sequencial único           */
                newVersiculos.push(versiculoObj);                                                              /* Salva na lista mestre               */
                const palavras = normalizarTexto(versiculoObj.texto).split(/\s+/).filter(p => p.length > 1);   /* Quebra texto em palavras            */
                
                /* BLOCO: Vinculação de cada palavra ao seu versículo          */
                palavras.forEach(palavra => {                                                                  /* Varre cada palavra do verso         */
                    if (!newInvertedIndex[palavra]) newInvertedIndex[palavra] = [];                            /* Cria lista para palavra nova        */
                    newInvertedIndex[palavra].push(versiculoObj);                                              /* Associa verso à palavra             */
                });
            });
        }

        /* BLOCO: Atualização do estado global do motor de busca               */
        window.searchEngine.invertedIndex = newInvertedIndex;                                                  /* Salva dicionário no motor            */
        window.searchEngine.versiculos = newVersiculos;                                                        /* Salva lista mestre no motor          */
        window.searchEngine.versaoAtual = versao;                                                              /* Grava qual bíblia foi lida           */

        /* BLOCO: Finalização, persistência e liberação da interface           */
        await salvarEmIndexedDB(chaveCache, window.searchEngine);                                              /* Salva tudo no banco do navegador     */
        console.log(`[Busca] Índice construído e salvo. Total: ${newVersiculos.length}.`);                     /* Loga conclusão com contagem          */
        window.searchEngine.isReady = true;                                                                    /* Libera a busca para o usuário        */
    }

    /* BLOCO: Agendamento automático da indexação após a carga da página       */
    document.addEventListener('DOMContentLoaded', () => {                                                      /* Ouve o carregamento da página        */
        setTimeout(() => { carregarConstruirIndice(); }, 1000);                                                /* Inicia indexação após 1 segundo      */
    });

    /* BLOCO: Função que carrega o indexeddb (leitura do banco local)          */
    async function carregarIndexedDB(chave) {                                                                  /* Lê dados do banco IndexedDB          */
        return new Promise((resolve) => {                                                                      /* Cria promessa de leitura             */
            const request = indexedDB.open('BibleSearchDB', 1);                                                /* Abre/Cria o banco de dados           */
            
            /* BLOCO: Criação do esquema do banco de dados                     */
            request.onupgradeneeded = (event) => {                                                             /* Se o banco for novo...               */
                const db = event.target.result;                                                                /* Acessa o banco                       */
                if (!db.objectStoreNames.contains('searchIndexes')) {                                          /* Se a tabela não existir...           */
                    db.createObjectStore('searchIndexes', { keyPath: 'id' });                                  /* Cria a tabela de índices             */
                }                                                                                              /* Fecha if tabela                      */
            };                                                                                                 /* Fecha onupgradeneeded                */
            
            /* BLOCO: Lógica executada ao abrir o banco com sucesso            */
            request.onsuccess = (event) => {                                                                   /* Se abrir com sucesso                 */
                const db = event.target.result;                                                                /* Acessa o banco                       */
                const transaction = db.transaction(['searchIndexes'], 'readonly');                             /* Inicia leitura                       */
                const store = transaction.objectStore('searchIndexes');                                        /* Acessa a tabela                      */
                const getRequest = store.get(chave);                                                           /* Busca pela chave da bíblia           */
                
                /* BLOCO: Tratamento do retorno da busca no armazenamento      */
                getRequest.onsuccess = () => {                                                                 /* Se achar o dado                      */
                    /* BLOCO: Restauração do estado do motor de busca          */
                    if (getRequest.result) {                                                                   /* Se o resultado for válido            */
                        window.searchEngine = getRequest.result.data;                                          /* Restaura o motor de busca            */
                        window.searchEngine.versaoAtual = localStorage.getItem('versaoBiblicaSelecionada') || 'acf';
                        resolve(true);                                                                         /* Avisa que carregou                   */
                    } else { resolve(false); }                                                                 /* Avisa que não achou                  */
                };
                getRequest.onerror = () => resolve(false);                                                     /* Trata erro de busca                  */
            };
            request.onerror = () => resolve(false);                                                            /* Trata erro de abertura               */
        });
    }

    /* BLOCO: Função que salva em indexeddb (gravação do banco local)          */
    async function salvarEmIndexedDB(chave, dados) {                                                           /* Grava dados no IndexedDB             */
        return new Promise((resolve) => {                                                                      /* Cria promessa de gravação            */
            const request = indexedDB.open('BibleSearchDB', 1);                                                /* Abre o banco                         */
            
            /* BLOCO: Lógica de gravação ao acessar o banco                    */
            request.onsuccess = (event) => {                                                                   /* Se abrir sucesso                     */
                const db = event.target.result;                                                                /* Acessa o banco                       */
                const transaction = db.transaction(['searchIndexes'], 'readwrite');                            /* Inicia gravação                      */
                const store = transaction.objectStore('searchIndexes');                                        /* Acessa a tabela                      */
                store.put({ id: chave, data: dados });                                                         /* Grava os dados da bíblia             */
                transaction.oncomplete = () => resolve(true);                                                  /* Avisa que terminou                   */
                transaction.onerror = () => resolve(false);                                                    /* Trata erro de gravação               */
            };
            request.onerror = () => resolve(false);                                                            /* Trata erro de abertura               */
        });
    }

    /* BLOCO: Função que realiza busca avançada (interface de entrada)         */
    window.realizarBuscaAvancada = async function (termo) {                                                    /* Função chamada pela interface        */
        if (!termo) return [];                                                                                 /* Se vazio, retorna lista vazia        */
        const versaoSelecionada = localStorage.getItem('versaoBiblicaSelecionada') || 'acf';                   /* Vê bíblia atual                      */

        /* BLOCO: Revalidação de prontidão do índice antes de buscar           */
        if (!window.searchEngine.isReady || window.searchEngine.versaoAtual !== versaoSelecionada) {           /* Se bíblia mudou ou não carregou      */
            await carregarConstruirIndice();                                                                   /* Reconstrói o índice agora            */
        }

        /* BLOCO: Preparação de termos e execução da estratégia de busca       */
        const termoNorm = normalizarTexto(termo);                                                              /* Limpa o termo pesquisado             */
        const palavrasBusca = termoNorm.split(/\s+/).filter(p => p.length > 1);                                /* Quebra em palavras relevantes        */
        const resultados = combinarEstrategiasBusca(palavrasBusca, termoNorm);                                 /* Executa a lógica de busca            */
        return resultados.slice(0, MAX_RESULTS);                                                               /* Devolve o top dos resultados         */
    };

    /* BLOCO: Função que combina estratégias de busca (lógica algorítmica)     */
    function combinarEstrategiasBusca(palavrasBusca, termoOriginalNormalizado) {                               /* Lógica de filtragem de versos        */
        let resultadosFinais = new Map();                                                                      /* Mapa para evitar duplicatas          */
        
        /* BLOCO: Execução de busca baseada em índice invertido                */
        if (palavrasBusca.length > 0) {                                                                        /* Se houver palavras para buscar       */
            let candidatos = new Map();                                                                        /* Conta palavras achadas por verso     */
            
            /* BLOCO: Cruzamento de palavras digitadas com o índice            */
            palavrasBusca.forEach(palavra => {                                                                 /* Passa por cada palavra digitada      */
                
                /* BLOCO: Validação de presença da palavra no dicionário       */
                if (window.searchEngine.invertedIndex[palavra]) {                                              /* Se a palavra existir no índice       */
                    
                    /* BLOCO: Acúmulo de relevância por versículo              */
                    window.searchEngine.invertedIndex[palavra].forEach(ref => {                                /* Passa por cada verso associado       */
                        const key = `${ref.livro}-${ref.cap}-${ref.vers}`;                                     /* Cria chave única (Ex: gn-1-1)        */
                        candidatos.set(key, (candidatos.get(key) || 0) + 1);                                   /* Soma ocorrência da palavra           */
                        
                        /* BLOCO: Armazenamento da referência do objeto        */
                        if (!resultadosFinais.has(key)) {                                                      /* Se for a primeira vez do verso       */
                            resultadosFinais.set(key, ref);                                                    /* Guarda o objeto do verso             */
                        }
                    });
                }
            });

            /* BLOCO: Filtragem por interseção e frase exata                   */
            const resultadosComTodasPalavras = Array.from(candidatos.entries())                                /* Filtra versos com TODAS as palavras  */
                .filter(([key, count]) => count === palavrasBusca.length)                                      /* Compara contagem com total buscado   */
                .map(([key, count]) => resultadosFinais.get(key));                                             /* Recupera o objeto do versículo       */

            const resultadosFinaisFiltrados = resultadosComTodasPalavras.filter(r =>                           /* Filtra por frase exata               */
                normalizarTexto(r.texto).includes(termoOriginalNormalizado)                                    /* Verifica se texto contém a frase     */
            );

            /* BLOCO: Fallback para buscas com múltiplos termos e sem frase    */
            if (resultadosFinaisFiltrados.length === 0 && palavrasBusca.length > 1) {                          /* Se não achou frase exata             */
                
                /* BLOCO: Filtro manual nos candidatos pré-selecionados        */
                Array.from(candidatos.entries()).forEach(([key, count]) => {                                   /* Tenta versos com palavras soltas     */
                    const ref = resultadosFinais.get(key);                                                     /* Pega o versículo                     */
                    
                    /* BLOCO: Validação final de inclusão do termo             */
                    if (normalizarTexto(ref.texto).includes(termoOriginalNormalizado)) {                       /* Revalida a frase                     */
                        resultadosFinaisFiltrados.push(ref);                                                   /* Adiciona aos achados                 */
                    }
                });
            }
            return resultadosFinaisFiltrados;                                                                  /* Retorna lista filtrada               */
        } else {                                                                                               /* Caso não haja palavras limpas        */
            
            /* BLOCO: Busca bruta via iteração na lista mestre                 */
            return window.searchEngine.versiculos.filter(r =>                                                  /* Busca bruta na lista mestre          */
                normalizarTexto(r.texto).includes(termoOriginalNormalizado)                                    /* Filtra por inclusão direta           */
            );
        }
    }

})();