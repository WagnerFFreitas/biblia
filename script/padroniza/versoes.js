/*===============================================================================*/
/*                     SCRIPT PRINCIPAL DE VERSÕES BÍBLICAS                      */
/*===============================================================================*/
/* O QUE ESTE SCRIPT FAZ:                                                        */
/*     1. Gerencia qual tradução da Bíblia está sendo lida (ARC, NVI, etc).      */
/*     2. Carrega arquivos extras de forma inteligente.                          */
/*     3. Cria uma tela de busca (pesquisa) que aparece por cima do site.        */
/*     4. Faz a navegação automática para livros, capítulos e versículos.        */
/*===============================================================================*/

(function () {                                                                    // Inicia escopo isolado
    'use strict';                                                                 // Ativa modo rigoroso

    function obterParametroUrl(parametro) {                                       // Função para ler parâmetros da URL
        const parametrosUrl = new URLSearchParams(window.location.search);        // Obtém parâmetros da URL
        return parametrosUrl.get(parametro);                                      // Retorna valor específico
    }

    function carregaScriptAssincrono(origem, id) {                                // Função para carregar scripts externos
        return new Promise((resolve, reject) => {                                 // Retorna promessa
            const scriptAntigo = document.getElementById(id);                     // Busca script anterior
            if (scriptAntigo) scriptAntigo.remove();                             // Remove script anterior se existe
            
            const novoScript = document.createElement('script');                  // Cria novo elemento script
            novoScript.src = origem;                                              // Define origem do arquivo
            novoScript.id = id;                                                   // Define ID do script
            novoScript.async = false;                                             // Carregamento síncrono
            
            novoScript.onload = () => resolve();                                  // Resolve promessa quando carregado
            novoScript.onerror = (evento) => {                                    // Trata erros de carregamento
                console.error(`Falha ao carregar: ${origem}`, evento);            // Log de erro
                reject(new Error(`Falha ${origem}`));                             // Rejeita promessa
            };
            document.body.appendChild(novoScript);                                // Adiciona script ao DOM
        }); 
    } 

    window.NOME_VERSAO_COMPLETA_BIBLIA = 'Versão King James';                     // Nome global da versão ativa
    window.modoLeituraAtivo = false;                                              // Estado do modo tela cheia
    window.ultimoLivroSelecionado = null;                                         // Cache do último livro lido
    window.ultimoCapituloSelecionado = null;                                      // Cache do último capítulo lido
    window.ultimoVersiculoSelecionado = null;                                     // Cache do último versículo lido

    window.navegarParaVersiculo = async function(livro, cap, vers) {              // Função global de navegação
        console.log(`[Navegação] Solicitado navegar para: ${livro} ${cap}:${vers}`); // Log do destino
        if (typeof window.atualizaBotoesCapitulos !== 'function' || typeof window.toggleVersiculos !== 'function') {
            alert("Erro: Funções de navegação da página principal não encontradas."); // Alerta falta de sistema
            return;                                                               // Aborta navegação
        } 
        if (window.modoLeituraAtivo) {                                            // Se está em modo leitura
            await window.toggleReadingMode(false);                                // Desativa modo leitura
        }
        await window.atualizaBotoesCapitulos(livro, cap);                         // Monta régua de capítulos
        await window.toggleVersiculos(livro, cap);                                // Gera lista de versículos
        setTimeout(() => {                                                        // Aguarda renderização
            const conteinerCapitulos = document.querySelector('#dynamic-chapter-buttons-conteiner'); // Localiza capítulos
            if (conteinerCapitulos) {                                             // Se contêiner existe
                conteinerCapitulos.querySelectorAll('button').forEach(btn => {    // Varre todos os botões
                    btn.classList.toggle('active', btn.dataset.capitulo == cap);  // Destaca capítulo ativo
                });
            }
            const conteinerVersiculos = document.querySelector('.conteudo-versiculos'); // Localiza versículos
            if (!conteinerVersiculos) {                                           // Se não encontrar contêiner
                console.error("Conteiner de versículos não encontrado após o toggle."); // Log de erro
                return;                                                           // Para execução
            } 
            const botaoVersiculo = conteinerVersiculos.querySelector(`button[data-versiculo="${vers}"]`); // Procura botão do versículo
            if (botaoVersiculo && typeof botaoVersiculo.click === 'function') {   // Se botão existe
                console.log(`[Navegação] Clicando no botão do versículo ${vers}.`); // Log de clique automático
                botaoVersiculo.click();                                           // Simula clique
            } else {                                                              // Se botão não existe
                console.error(`[Navegação] Botão para o versículo ${vers} não foi encontrado.`); // Log de erro
            } 
        }, 150);                                                                  // Espera 150ms
    }; 

    /* BLOCO: Inicializador da Versão - Carrega todos os "ingredientes"        */
    async function inicializarVersao(codigoVersao) {                                                    /* Função que monta a bíblia              */
        console.log(`[Principal] Inicializando ${codigoVersao.toUpperCase()}`);                         /* Loga início do sistema                 */
        document.body.className = '';                                                                   /* Limpa classes do corpo                 */
        document.body.classList.add(['arc'].includes(codigoVersao.toLowerCase()) ? 'versao-html-ativa' : 'versao-json-ativa');
        try {                                                                                           /* Tenta carregar módulos externos        */
            await carregaScriptAssincrono('../script/versoes_cache.js', 'script-versoes-cache');
            await carregaScriptAssincrono('../script/versoes_navegacao.js', 'script-versoes-navegacao');
            await carregaScriptAssincrono('../script/versoes_capitulos.js', 'script-versoes-capitulos');
            await carregaScriptAssincrono('../script/versoes_versiculos.js', 'script-versoes-versiculos');
            await carregaScriptAssincrono('../script/versoes_interface.js', 'script-versoes-interface');
            await carregaScriptAssincrono('../script/versoes_navegacao_modoleitura.js', 'script-versoes-navegacao-modoleitura');
            await carregaScriptAssincrono('../script/versoes_modoleitura.js', 'script-versoes-modoleitura');
            await carregaScriptAssincrono('../script/versoes_realizabusca.js', 'script-versoes-realizabusca');
            await carregaScriptAssincrono(`../script/${codigoVersao.toLowerCase()}.js`, 'script-versao-biblica');

            window.defineTituloPagina(codigoVersao);                                                    /* Atualiza nomes no topo                 */

            await carregaScriptAssincrono('../script/slide_biblia_dados.js', 'script-slide-dados');
            await carregaScriptAssincrono('../script/slide_biblia_utils.js', 'script-slide-utils');
            await carregaScriptAssincrono('../script/slide_biblia_interface.js', 'script-slide-interface');
            await carregaScriptAssincrono('../script/slide_biblia_janela.js', 'script-slide-janela');
            await carregaScriptAssincrono('../script/slide_biblia_preload.js', 'script-slide-preload');
            await carregaScriptAssincrono('../script/slide_biblia_coordenador.js', 'script-slide-coordenador');

            if (typeof window.inicializarDropdowns === 'function') window.inicializarDropdowns();       /* Liga menus suspensos                   */
            if (typeof window.inicializarSobre === 'function') window.inicializarSobre();               /* Liga tela de créditos                  */
            if (typeof window.inicializarSlide === 'function') window.inicializarSlide();               /* Liga sistema de slide                  */

            const botaoModoLeitura = document.getElementById('modo-leitura');                           /* Acha botão de leitura                  */
            if (botaoModoLeitura) {                                                                     /* Se o botão existir                     */
                const novoBotao = botaoModoLeitura.cloneNode(true);                                     /* Clona para limpar ordens               */
                botaoModoLeitura.parentNode.replaceChild(novoBotao, botaoModoLeitura);                  /* Substitui no site                      */
                novoBotao.addEventListener('click', (e) => {                                            /* Adiciona novo clique                   */
                    e.preventDefault();                                                                 /* Não recarrega a página                 */
                    window.toggleReadingMode(!window.modoLeituraAtivo, window.activeLivro, window.activeCapitulo);
                });
            } 
            console.log(`[Principal] ${codigoVersao.toUpperCase()} inicializada.`);                     /* Loga sucesso final                     */
        } catch (erro) {                                                                                /* Em caso de falha grave                 */
            console.error(`[Principal] Erro init ${codigoVersao.toUpperCase()}:`, erro);                /* Loga erro técnico                      */
            window.defineTituloPagina(codigoVersao);                                                    /* Mantém título básico                   */
            alert(`Erro ao inicializar ${codigoVersao.toUpperCase()}.`);                                /* Alerta o usuário                       */
        } 
    }

    /* BLOCO: Função para atualizar o título da página                         */
    window.defineTituloPagina = function (codigoVersao) {                                               /* Função de escrita visual               */
        const elementoTituloPrincipal = document.getElementById('titulo-principal-versao');             /* Acha título h1/h2                      */
        const elementoSubtituloExtenso = document.getElementById('subtitulo-versao-extenso');           /* Acha local do subtítulo                */
        if (elementoTituloPrincipal) elementoTituloPrincipal.textContent = `Bíblia Sagrada ${codigoVersao.toUpperCase()}`;
        if (elementoSubtituloExtenso) elementoSubtituloExtenso.textContent = window.NOME_VERSAO_COMPLETA_BIBLIA || '';
    }; 

    /* BLOCO: A função principal que arruma tudo assim que o site abre         */
    function initializePage() {                                                                         /* Motor de arranque do site              */
        const seletor = document.getElementById('seletor-versao-principal');                            /* Acha menu de bíblias                   */
        let opcoesValidas = ['arc', 'ara', 'nvi', 'acf', 'ntlh', 'kjv', 'naa', 'original'];             /* Lista de permitidas                    */
        let versaoPadrao = 'arc';                                                                       /* Define padrão de segurança             */

        /* BLOCO: Obtém opções válidas do seletor se disponível                */
        if (seletor && seletor.options.length > 0) {                                                    /* Se menu tiver opções                   */
            opcoesValidas = Array.from(seletor.options).map(opcao => opcao.value);                      /* Pega códigos reais                     */
            versaoPadrao = seletor.value || opcoesValidas[0];                                           /* Define a bíblia ativa                  */
        } 

        /* BLOCO: Determina a versão inicial baseada em URL ou preferência     */
        let versaoInicial = obterParametroUrl('versao') ||                                              /* Vê se há versão na URL                 */
            (typeof window.obterPreferencia === 'function' ? window.obterPreferencia('versaoBiblicaSelecionada', 'arc') : localStorage.getItem('versaoBiblicaSelecionada') || 'arc');

        /* BLOCO: Valida e ajusta a versão inicial se necessário               */
        if (!opcoesValidas.includes(versaoInicial.toLowerCase())) versaoInicial = opcoesValidas[0];     /* Se estranha, usa padrão                */
        if (seletor) seletor.value = versaoInicial;                                                     /* Marca visualmente                      */
        if (window.salvarPreferencia) window.salvarPreferencia('versaoBiblicaSelecionada', versaoInicial);
        else localStorage.setItem('versaoBiblicaSelecionada', versaoInicial);                           /* Grava escolha                          */

        /* BLOCO: Inicializa a versão selecionada da Bíblia                    */
        inicializarVersao(versaoInicial);                                                               /* Começa carga da bíblia                 */

        /* BLOCO: Função global para atualizar a barra de progresso            */
        window.updateSearchIndexProgress = function(progresso, livro) {                                 /* Função de barra de carga               */
            const overlay = document.getElementById('search-overlay');                                  /* Acha tela de pesquisa                  */
            if (overlay && overlay.shadowRoot) {                                                        /* Se estiver aberta                      */
                const progressoBar = overlay.shadowRoot.querySelector('#progress-bar-inner');           /* Acha barra amarela                     */
                const progressoTexto = overlay.shadowRoot.querySelector('#progress-text');              /* Acha texto de carga                    */
                if (progressoBar) progressoBar.style.width = progresso + '%';                           /* Move a barra                           */
                if (progressoTexto) progressoTexto.textContent = `Indexando ${livro}...`;               /* Mostra livro atual                     */
            } 
        };

        /* BLOCO: Traduz nomes internos dos livros para nomes legíveis         */
        function getLivroDisplayName(livro) {                                                           /* Tradutor de nomes internos             */
            const nomes = {                                                                             /* Dicionário de tradução                 */
                genesis: "Gênesis", exodo: "Êxodo", levitico: "Levítico", numeros: "Números", deuteronomio: "Deuteronômio",
                josue: "Josué", juizes: "Juízes", rute: "Rute", "1samuel": "1º Samuel", "2samuel": "2º Samuel",
                "1reis": "1º Reis", "2reis": "2º Reis", "1cronicas": "1º Crônicas", "2cronicas": "2º Crônicas",
                esdras: "Esdras", neemias: "Neemias", ester: "Ester", jo: "Jó", salmos: "Salmos", proverbios: "Provérbios",
                eclesiastes: "Eclesiastes", cantares: "Cantares de Salomão", isaias: "Isaías", jeremias: "Jeremias",
                lamentacoes: "Lamentações de Jeremias", ezequiel: "Ezequiel", daniel: "Daniel", oseias: "Oseias", joel: "Joel",
                amos: "Amós", obadias: "Obadias", jonas: "Jonas", miqueias: "Miqueias", naum: "Naum", habacuque: "Habacuque",
                sofonias: "Sofonias", ageu: "Ageu", zacarias: "Zacarias", malaquias: "Malaquias", mateus: "Mateus", marcos: "Marcos",
                lucas: "Lucas", joao: "João", atos: "Atos dos Apóstolos", romanos: "Romanos", "1corintios": "1º Coríntios",
                "2corintios": "2º Coríntios", galatas: "Gálatas", efesios: "Efésios", filipenses: "Filipenses", colossenses: "Colossenses",
                "1tessalonicenses": "1º Tessalonicenses", "2tessalonicenses": "2º Tessalonicenses", "1timoteo": "1º Timóteo",
                "2timoteo": "2º Timóteo", tito: "Tito", filemom: "Filemom", hebreus: "Hebreus", tiago: "Tiago", "1pedro": "1º Pedro",
                "2pedro": "2º Pedro", "1joao": "1º João", "2joao": "2º João", "3joao": "3º João", judas: "Judas", apocalipse: "Apocalipse"
            }; 
            return nomes[livro] || livro;                                                               /* Retorna nome ou ID puro                */
        } 
                
        /* BLOCO: Função assíncrona que realiza a busca de versículos          */
        async function realizarBusca(termo) {                                                           /* Função de pesquisa                     */
            if (!termo) return;                                                                         /* Ignora buscas vazias                   */

            /* BLOCO: Limpa overlay de busca anterior se existir               */
            const overlayAntigo = document.getElementById('search-overlay');                            /* Procura busca aberta                   */
            if (overlayAntigo) overlayAntigo.remove();                                                  /* Limpa busca anterior                   */

            /* BLOCO: Cria novo overlay para exibir os resultados              */
            const overlay = document.createElement('div');                                              /* Cria cortina da busca                  */
            overlay.id = 'search-overlay';                                                              /* Define ID da cortina                   */
            
            /* BLOCO: Anexa Shadow DOM para isolamento de estilos              */
            const shadow = overlay.attachShadow({ mode: 'open' });                                      /* Isola estilos da busca                 */

            /* BLOCO: Define mensagem inicial baseada no estado do motor       */
            let mensagemInicial = '<p>Buscando...</p>';                                                 /* Texto de espera                        */
            if (window.searchEngine && !window.searchEngine.isReady) {                                  /* Se busca estiver carregando            */
                mensagemInicial = `
                    <div id="progress-conteiner">
                        <p>Preparando a busca rápida (só na primeira vez)...</p>
                        <div id="progress-bar-outer">
                            <div id="progress-bar-inner"></div>
                        </div>
                        <p id="progress-text">Iniciando...</p>
                    </div>`;                                                                            /* HTML da barra de carga                 */
            }

shadow.innerHTML = `<style>
    /*======================================================*/
    /*         CONTÊINER PRINCIPAL (SOBREPOSIÇÃO)           */
    /*======================================================*/
    :host {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        z-index: 10000;
        overflow: hidden;
        background-color: #181818;
        background-image: url('../img/biblia.png');
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        padding: 40px 2.5%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }
    :host::-webkit-scrollbar { display: none; }
    
    /*======================================================*/
    /*           CONTÊINER DE CONTEÚDO DA BUSCA             */
    /*======================================================*/
    #search-content {
        font-family: sans-serif; font-style: normal; font-weight: normal; color: #f0f0f0;
        width: 100%;
        max-width: 100%;
        margin: 0;
        text-align: left;
        opacity: 0; transition: opacity 0.2s ease-in-out;
        background-color: rgba(0, 0, 0, 0.7);
        padding: 10px; 
        border-radius: 8px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        flex-grow: 1; 
        min-height: 0;
    }

    #search-content.loaded { opacity: 1; }

    /*======================================================*/
    /*            CONTÊINER DOS RESULTADOS                  */
    /*======================================================*/
    #resultados-busca-conteiner {
        flex-grow: 1;
        overflow-y: auto;
        scrollbar-width: none;
        padding-left: 0;
        padding-right: 0;
    }

    #resultados-busca-conteiner::-webkit-scrollbar {
        display: none;
    }
    
    /*======================================================*/
    /*                TÍTULO DA BUSCA (H2)                  */
    /*======================================================*/
    #search-content h2 {
        color: yellow; 
        text-align: center; 
        font-size: 3em; 
        font-weight: bold;
        margin-bottom: 30px; 
        text-shadow: 2px 2px 2px #000;
        flex-shrink: 0;
    }

    /*======================================================*/
    /*                BOTÃO DE FECHAR                       */
    /*======================================================*/
    .botao-fechar-busca {
        position: fixed; top: 20px; right: 30px;
        background-color: #f44336; color: white; padding: 10px 15px;
        border: none; border-radius: 4px; cursor: pointer; z-index: 10;
    }

    /*======================================================*/
    /*           ITEM INDIVIDUAL DO RESULTADO               */
    /*======================================================*/
    .resultado-item {
        padding: 10px 5px;
        border-bottom: 1px solid #444; 
        line-height: 1.6;
    }

    /*======================================================*/
    /*          LINK DO TÍTULO DO RESULTADO (STRONG)        */
    /*======================================================*/
    .resultado-item strong a {
        color: #FFD700; 
        font-size: 1.8em; 
        font-weight: bold;
        display: block; 
        margin-bottom: 5px; 
        text-decoration: underline; 
        cursor: pointer;
    }

    /*======================================================*/
    /*        LINK DO TÍTULO DO RESULTADO — HOVER           */
    /*======================================================*/
    .resultado-item strong a:hover { 
        text-decoration: none; 
        opacity: 0.8; 
    }
    
    /*======================================================*/
    /*         TEXTO DO VERSÍCULO DO RESULTADO              */
    /*======================================================*/
    .resultado-item span { 
        color: #eee; 
        font-size: 1.5em;
        display: inline;
        margin: 0;
        padding: 0;
        text-align: left;
    }

    /*======================================================*/
    /*         MENSAGEM DE "NENHUM RESULTADO"               */
    /*======================================================*/
    #resultados-busca-conteiner p { 
        text-align: center; 
        font-size: 1.5em; 
        padding: 40px 0; 
        color: #ccc;
    }

    /*======================================================*/
    /*        CONTÊINER DA BARRA DE PROGRESSO               */
    /*======================================================*/
    #progress-conteiner { 
        padding: 20px; 
        text-align: center; 
    }

    /*======================================================*/
    /*       PARTE EXTERNA DA BARRA DE PROGRESSO            */
    /*======================================================*/
    #progress-bar-outer { 
        background-color: #555; 
        border-radius: 13px; 
        padding: 3px; 
        margin: 15px auto; 
        width: 80%; 
    }

    /*======================================================*/
    /*       PARTE INTERNA DA BARRA DE PROGRESSO            */
    /*======================================================*/
    #progress-bar-inner { 
        background-color: #FFD700; 
        width: 0%; 
        height: 20px; 
        border-radius: 10px; 
        transition: width 0.4s ease-in-out; 
    }

    /*======================================================*/
    /*          TEXTO DE PROGRESSO DA BUSCA                 */
    /*======================================================*/
    #progress-text { 
        margin-top: 10px; 
        font-style: italic; 
        color: #ccc; 
    }
</style>

<div id="search-content">
    <h2>Resultados da Busca</h2>
    <div id="resultados-busca-conteiner">${mensagemInicial}</div>
</div>`;                                                                                                /* Injeta HTML e CSS da busca             */
        /* BLOCO: Adiciona o overlay ao corpo do documento                     */
            document.body.appendChild(overlay);                                                             
            // ↑ Adiciona a tela de busca por cima de todo o site
            
            document.body.style.overflow = 'hidden';                                                    
            // ↑ Impede que o usuário role a página de fundo enquanto busca

            // Este bloco executa a busca real se o "motor de busca" estiver funcionando:
            if (typeof window.realizarBuscaAvancada === 'function') {                                   
            // ↑ Verifica se o sistema de busca foi carregado corretamente
                const resultados = await window.realizarBuscaAvancada(termo);                           
                // ↑ Faz a busca real e espera os resultados voltarem
                
                exibirResultados(resultados, overlay, getLivroDisplayName);                             
                // ↑ Mostra os versículos encontrados na tela de busca
            } else {                                                                                    
            // ↑ Se o sistema de busca não carregou, faz o seguinte:
                const conteiner = overlay.shadowRoot.querySelector('#resultados-busca-conteiner');      
                // ↑ Encontra onde deveria mostrar os resultados
                
                conteiner.innerHTML = '<p>Funcionalidade de busca não carregada.</p>';                  
                // ↑ Avisa o usuário que a busca não está funcionando
            } 
        }
        
        // Esta função é como um "organizador de resultados" que pega os versículos
        // encontrados na busca e os mostra de forma bonita na tela.
        function exibirResultados(resultados, overlay, getLivroDisplayNameFunc) {                       
        // ↑ Função que organiza e mostra os versículos encontrados
            const shadow = overlay.shadowRoot;                                                          
            // ↑ Acessa a área protegida onde ficam os estilos da busca
            
            const conteiner = shadow.querySelector('#resultados-busca-conteiner');                      
            // ↑ Encontra o local onde os versículos vão aparecer
            
            conteiner.innerHTML = '';                                                                   
            // ↑ Limpa qualquer mensagem de "carregando..." que estava lá
            
            // Primeiro, cria um botão para fechar a tela de busca:
            const botaoFechar = document.createElement('button');                                       
            // ↑ Cria o botão "X" para sair da busca
            
            botaoFechar.className = 'botao-fechar-busca';                                               
            // ↑ Dá um nome (classe CSS) para o botão ficar bonito
            
            botaoFechar.textContent = 'Fechar Busca';                                                   
            // ↑ Escreve "Fechar Busca" no botão
            
            botaoFechar.onclick = () => {                                                               
            // ↑ Define o que acontece quando clicam no botão:
                document.body.style.overflow = '';                                                      
                // ↑ Permite rolar a página principal novamente
                
                overlay.remove();                                                                       
                // ↑ Remove completamente a tela de busca
            }; 
            shadow.appendChild(botaoFechar);                                                            
            // ↑ Adiciona o botão na tela de busca

            // Agora verifica se a busca encontrou alguma coisa:
            if (resultados.length === 0) {                                                              
            // ↑ Se não encontrou nenhum versículo
                conteiner.innerHTML = '<p>Nenhum resultado encontrado.</p>';                            
                // ↑ Mostra mensagem de "não encontrado"
            } else {                                                                                    
            // ↑ Se encontrou versículos, faz o seguinte:

                // Este bloco cria uma "linha" para cada versículo encontrado:
                resultados.forEach(r => {                                                               
                // ↑ Para cada versículo encontrado, faz:
                    const div = document.createElement('div');                                          
                    // ↑ Cria uma "caixa" para este versículo
                    
                    div.className = 'resultado-item';                                                   
                    // ↑ Dá um nome (classe CSS) para a caixa ficar bonita
                    
                    div.innerHTML = `<strong><a href="#">${getLivroDisplayNameFunc(r.livro)} ${r.cap}:${r.vers}</a></strong><span>${r.texto}</span>`;
                    // ↑ Escreve o nome do livro, capítulo, versículo e o texto
                    
                    const link = div.querySelector('a');                                                
                    // ↑ Encontra o link clicável dentro da caixa

                    // Este bloco faz o link funcionar - quando você clica, vai para o versículo:
                    link.addEventListener('click', (e) => {                                             
                    // ↑ Fica "ouvindo" cliques no link
                        e.preventDefault();                                                             
                        // ↑ Impede que a página "pule" ou recarregue
                        
                        if (typeof window.navegarParaVersiculo === 'function') {                        
                        // ↑ Se o "GPS" do site estiver funcionando
                            window.navegarParaVersiculo(r.livro, r.cap, r.vers);                        
                            // ↑ Vai direto para o versículo clicado
                        }
                        botaoFechar.click();                                                            
                        // ↑ Fecha automaticamente a tela de busca
                    }); 
                    conteiner.appendChild(div);                                                         
                    // ↑ Adiciona esta "linha" na lista de resultados
                });
            }
            
            // Este bloco faz a tela aparecer com um efeito suave:
            setTimeout(() => {                                                                          
            // ↑ Espera um pouquinho (10 milissegundos)
                shadow.querySelector('#search-content').classList.add('loaded');                        
                // ↑ Adiciona uma classe que faz a tela aparecer suavemente
            }, 10);                                                                                     
            // ↑ Tempo de espera: 10 milissegundos
        }

        // Este bloco configura os "ouvintes" da barra de pesquisa.
        // É como ter seguranças prestando atenção na caixa de busca e no botão da lupa.
        const botaoBuscar = document.querySelector('.barra-pesquisa button');                           
        // ↑ Encontra o botão da "lupa" na barra de pesquisa
        
        const inputBusca = document.querySelector('.barra-pesquisa input');                             
        // ↑ Encontra a caixa onde você digita o que quer buscar
        
        if (botaoBuscar && inputBusca) {                                                                
        // ↑ Se encontrou tanto o botão quanto a caixa de texto:
            
            // Este bloco "escuta" quando você clica no botão da lupa:
            botaoBuscar.addEventListener('click', () => {                                               
            // ↑ Fica "ouvindo" cliques no botão da lupa
                const termo = inputBusca.value.trim();                                                  
                // ↑ Pega o que você digitou e remove espaços extras
                
                realizarBusca(termo);                                                                   
                // ↑ Inicia a busca com o que você digitou
            });                                                                                         
            
            // Este bloco "escuta" quando você aperta Enter na caixa de busca:
            inputBusca.addEventListener('keypress', (e) => {                                            
            // ↑ Fica "ouvindo" quando você digita na caixa
                if (e.key === 'Enter') {                                                                
                // ↑ Se a tecla apertada foi Enter:
                    const termo = inputBusca.value.trim();                                              
                    // ↑ Pega o que você digitou e remove espaços extras
                    
                    realizarBusca(termo);                                                               
                    // ↑ Inicia a busca (igual ao clique na lupa)
                } 
            });
        } 

        // Este bloco "escuta" quando você muda a tradução da Bíblia no menu:
        if (seletor) {                                                                                  
        // ↑ Se o menu de traduções existir na página:
            seletor.addEventListener('change', (e) => {                                                 
            // ↑ Fica "ouvindo" quando você escolhe uma tradução diferente
                if (window.salvarPreferencia) window.salvarPreferencia('versaoBiblicaSelecionada', e.target.value); 
                else localStorage.setItem('versaoBiblicaSelecionada', e.target.value);                  
                // ↑ "Lembra" da sua escolha no navegador (como um post-it digital)
                
                window.location.search = `?versao=${e.target.value}`;                                   
                // ↑ Recarrega a página com a nova tradução escolhida
            });
        } 

        // Este bloco cria uma lista de links no rodapé da página com todas as traduções:
        const listaVersoes = document.getElementById('versoes-list');                                   
        // ↑ Encontra onde devem ficar os links das traduções no rodapé
        
        if (listaVersoes && seletor && opcoesValidas.length > 0) {                                      
        // ↑ Se encontrou o local E o menu E tem traduções disponíveis:
            listaVersoes.innerHTML = '';                                                                
            // ↑ Limpa qualquer lista antiga que estava lá
            
            const opcoesTexto = Object.fromEntries(Array.from(seletor.options).map(opcao => [opcao.value, opcao.textContent]));
            // ↑ Cria um "dicionário" que traduz códigos (ex: "arc") para nomes bonitos (ex: "Almeida Revista e Corrigida")
            
            // Este bloco cria um link para cada tradução disponível:
            opcoesValidas.forEach(versao => {                                                           
            // ↑ Para cada tradução válida (ARC, NVI, etc.):
                const itemLista = document.createElement('li');                                         
                // ↑ Cria um item de lista (como um "ponto" da lista)
                
                const link = document.createElement('a');                                               
                // ↑ Cria um link clicável
                
                link.href = `?versao=${versao}`;                                                        
                // ↑ Define para onde o link vai levar (ex: "?versao=nvi")
                
                link.textContent = opcoesTexto[versao] || versao.toUpperCase();                         
                // ↑ Escreve o nome bonito da tradução no link
                
                itemLista.appendChild(link);                                                            
                // ↑ Coloca o link dentro do item da lista
                
                listaVersoes.appendChild(itemLista);                                                    
                // ↑ Adiciona o item na lista do rodapé
            });
        } 
    } 
    
    document.addEventListener('DOMContentLoaded', initializePage);                                      
    // ↑ Quando a página terminar de carregar completamente, inicia tudo
})();