/*===============================================================================*/
/*                      MÓDULO DE INTERFACE DA JANELA SLIDE                      */
/*===============================================================================*/
/*           Este módulo contém:                                                 */
/*                             - Geração do HTML da janela pop-up                */
/*                             - Todo o JavaScript que roda dentro da janela     */
/*                             - Navegação, carregamento e eventos da interface  */
/*===============================================================================*/

console.log("[slide_biblia_interface.js] Script iniciado.")                                                                  /* Log de inicialização do módulo      */

/* BLOCO: Função que constrói a estrutura completa da interface do slide, injetando dados e lógica de navegação            */
function gerarHtmlJanelaSlide(
    livroAtual,
    capituloAtual,
    versiculoAtual,
    versaoAtual,
    todaContagemJSON,
    livrosOrdemJSON,
    livroAcentuadosParaSemAcentos,
    livroAcentuado,
) {
    return `
<!DOCTYPE html>
<!-- BLOCO: Inicia estrutura do slide  -->
<html lang="pt-BR">                                                                                                          <!-- Define idioma do documento        -->
<head>                                                                                                                       <!-- Inicia cabeçalho HTML             -->
    <title>Bíblia Slide - ${versaoAtual.toUpperCase()}</title>                                                               <!-- Título dinâmico da aba           -->
    <meta charset="UTF-8">                                                                                                   <!-- Define codificação de texto       -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">                                                   <!-- Ajuste de escala responsiva       -->
    <link rel="stylesheet" href="../css/slide_biblia.css">                                                                   <!-- Importa o CSS mestre do slide     -->
    ${versaoAtual === "original" ? '<link rel="stylesheet" href="../css/versoes.css">' : ""}                                 <!-- Injeta CSS extra se original      -->
</head>                                                                                                                      <!-- Fecha o cabeçalho                 -->
<body>                                                                                                                       <!-- Inicia corpo do slide             -->
    <div id="orientacao-fullscreen" style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background-color: rgba(0, 0, 0, 0.85); color: white; padding: 20px; border-radius: 10px; z-index: 10001; text-align: center; font-family: Arial, sans-serif; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
        <p style="margin: 0; font-size: 16px;">Pressione <b>F11</b> para uma melhor experiência em tela cheia.</p>           <!-- Texto informativo 1               -->
        <p style="margin: 10px 0 0 0; font-size: 14px;">Para sair, pressione <b>ESC</b> ou mova o mouse para o topo.</p>     <!-- Texto informativo 2               -->
        <button onclick="document.getElementById('orientacao-fullscreen').remove()" style="background-color: #5c5c5c; color: white; border: none; padding: 8px 15px; margin-top: 15px; border-radius: 5px; cursor: pointer;">Entendi</button>
    </div>                                                                                                                   <!-- Fecha popup de orientação         -->

    <div id="marcadagua"></div>                                                                                              <!-- Camada de fundo decorativo        -->
    <div id="titulo">${livroAcentuado.toUpperCase()} ${capituloAtual}:${versiculoAtual}</div>                                <!-- Título do versículo no slide      -->
    <div id="versiculo-conteiner"><div class="texto-versiculo">Carregando...</div></div>                                     <!-- Local de exibição do texto        -->
    <div id="botao-conteiner">                                                                                               <!-- Barra de navegação inferior       -->
        <button id="voltar-botao">‹ Anterior</button>                                                                        <!-- Botão para retroceder             -->
        <button id="proximo-botao">Próximo ›</button>                                                                        <!-- Botão para avançar                -->
    </div>                                                                                                                   <!-- Fecha barra de navegação          -->

    <script>
        /* BLOCO: Inicializa as variáveis de estado internas para controlar a posição atual da leitura na janela do slide  */
        let livroAtual = '${livroAtual}';                                                                                    /* Identificador ID do livro           */
        let capituloAtual = ${capituloAtual};                                                                                /* Número do capítulo selecionado      */
        let versiculoAtual = ${versiculoAtual};                                                                              /* Número do versículo selecionado     */
        const versaoBiblia = '${versaoAtual}';                                                                               /* Identificador da tradução ativa     */
        let dadosCapitulo = null;                                                                                            /* Buffer para armazenar os dados      */

        /* BLOCO: Desserializa os dados técnicos recebidos da janela principal para uso no motor de navegação local        */
        const todaContagemDataGlobal = JSON.parse('${todaContagemJSON}');                                                    /* Banco de contagem de versículos     */
        const livrosOrdemGlobal = JSON.parse('${livrosOrdemJSON}');                                                          /* Lista da ordem canônica dos livros  */
        let versiculosPorCapituloArray = [];                                                                                 /* Array de referência rápida          */

        /* BLOCO: Mapeia as referências dos elementos da interface para permitir a manipulação dinâmica do conteúdo        */
        const tituloElement = document.getElementById('titulo');                                                             /* Referência ao topo do slide         */
        const versiculoConteiner = document.getElementById('versiculo-conteiner');                                           /* Referência à área de texto          */
        const btnVoltar = document.getElementById('voltar-botao');                                                           /* Referência ao botão de recuo        */
        const btnProximo = document.getElementById('proximo-botao');                                                         /* Referência ao botão de avanço       */

        /* BLOCO: Determina o formato e a extensão do arquivo (JSON ou HTML) com base na versão da bíblia ativa            */
        const jsonFileVersions = ['ara', 'nvi', 'acf', 'ntlh', 'kjv', 'naa', 'original'];                                    /* Lista de traduções em JSON          */
        const isJsonFile = jsonFileVersions.includes(versaoBiblia);                                                          /* Valida formato do arquivo           */
        const fileExtension = isJsonFile ? 'json' : 'html';                                                                  /* Define o sufixo da requisição       */

        /* BLOCO: Função interna para normalizar o nome do livro dentro do escopo da janela pop-up                         */
        function normalizarNomeLivro(nome) {
            const semAcentos = ${JSON.stringify(livroAcentuadosParaSemAcentos)};                                             /* Mapa de normalização local          */
            const nomeLower = nome.toLowerCase();                                                                            /* Converte para minúsculas            */
            const keyAcentuada = Object.keys(semAcentos).find(key => key.toLowerCase() === nomeLower);                       /* Localiza ID correspondente          */
            if (keyAcentuada) return semAcentos[keyAcentuada];
            const keySemAcento = Object.keys(semAcentos).find(key => semAcentos[key].toLowerCase() === nomeLower);           /* Localiza ID reverso                 */
            return keySemAcento ? semAcentos[keySemAcento] : nome;
        }

        /* BLOCO: Função interna para recuperar o nome acentuado e formatado do livro para exibição no título do slide     */
        function obterNomeAcentuado(nomeSemAcento) {
            const semAcentos = ${JSON.stringify(livroAcentuadosParaSemAcentos)};                                             /* Mapa de tradução local              */
            return Object.keys(semAcentos).find(key => semAcentos[key] === nomeSemAcento) || nomeSemAcento;                  /* Retorna nome legível                */
        }

        /* BLOCO: Sincroniza a contagem de versículos do livro atual para gerenciar os limites de navegação entre capítulos*/
        function atualizarContagemCapitulosParaLivroAtual() {
            const contagemCapitulosObj = todaContagemDataGlobal[livroAtual];                                                 /* Acessa contagem do livro ativo      */
            if (contagemCapitulosObj) {
                versiculosPorCapituloArray = Object.keys(contagemCapitulosObj)
                    .map(capNumStr => parseInt(capNumStr, 10))                                                               /* Converte índices em inteiros        */
                    .sort((a, b) => a - b)                                                                                   /* Garante a ordem numérica            */
                    .map(capNum => contagemCapitulosObj[capNum.toString()]);                                                 /* Gera array de referência            */
            } else {
                console.error("Contagem não encontrada para " + livroAtual);                                                 /* Loga erro técnico de config         */
                versiculosPorCapituloArray = [];
                tituloElement.innerText = "ERRO CONFIG";                                                                     /* Alerta visual de falha              */
                versiculoConteiner.innerHTML = '<div class="texto-versiculo" style="color:red;">Config ausente.</div>';      /* Alerta visual de falha              */
                btnVoltar.disabled = true; btnProximo.disabled = true;
            }
        }

        /* BLOCO: Função assíncrona responsável por buscar o arquivo do capítulo no servidor e processar seu conteúdo      */
        async function carregarCapitulo(capituloNum) {
            const caminho = "../versao/" + versaoBiblia + "/" + livroAtual + "/" + capituloNum + "." + fileExtension;        /* Monta endereço da requisição        */
            console.log("Carregando capítulo: " + caminho);                                                                  /* Log de progresso da carga           */
            const livroAcentuado = obterNomeAcentuado(livroAtual);                                                           /* Obtém nome legível                  */
            tituloElement.innerText = livroAcentuado.toUpperCase() + " " + capituloNum + ":... (Carregando)";                /* Atualiza cabeçalho temporário       */
            versiculoConteiner.innerHTML = '<div class="texto-versiculo">Carregando capítulo...</div>';                      /* Feedback visual de espera           */
            btnVoltar.disabled = true; btnProximo.disabled = true;                                                           /* Trava botões durante a carga        */

            /* BLOCO: Tenta realizar a requisição do arquivo e processar o formato conforme o tipo de bíblia ativa         */
            try {
                const response = await fetch(caminho);                                                                       /* Busca arquivo no servidor           */
                if (!response.ok) throw new Error("HTTP " + response.status + " em " + caminho);                             /* Valida resposta HTTP                */
                
                if (isJsonFile) {
                    const jsonData = await response.json();                                                                  /* Converte para objeto JSON           */
                    dadosCapitulo = Array.isArray(jsonData) ? jsonData[0] : jsonData;                                        /* Normaliza estrutura de dados        */
                } else {
                    dadosCapitulo = new DOMParser().parseFromString(await response.text(), 'text/html');                     /* Converte texto em DOM HTML          */
                }
                
                console.log("Capítulo carregado com sucesso.");                                                              /* Log de sucesso técnico              */
                carregarVersiculo(versiculoAtual);                                                                           /* Invoca exibição do verso            */
            } catch (error) {
                console.error('Erro ao carregar capítulo:', error);                                                          /* Relata falha crítica                */
                tituloElement.innerText = "ERRO " + livroAcentuado.toUpperCase() + " " + capituloNum;                        /* Título de erro visual               */
                versiculoConteiner.innerHTML = '<div class="texto-versiculo" style="color:red;">Falha na carga.</div>';      /* Texto de erro visual                */
            }
        }

        /* BLOCO: Função encarregada de extrair o texto do versículo específico e injetá-lo na interface do slide          */
        function carregarVersiculo(versiculoNum) {
            console.log("Carregando " + livroAtual + " " + capituloAtual + ":" + versiculoNum);                              /* Log de posição de leitura           */
            let conteudo = '', tituloSecao = '';                                                                             /* Buffers de processamento            */
            const livroAcentuado = obterNomeAcentuado(livroAtual);                                                           /* Nome formatado do livro             */

            /* BLOCO: Valida se os dados do capítulo foram carregados com sucesso antes de tentar renderizar o versículo   */
            if (!dadosCapitulo) {
                versiculoConteiner.innerHTML = '<div class="texto-versiculo" style="color:orange;">Sem dados.</div>';        /* Alerta falha de dados               */
                atualizarBotoes(); return;
            }

            /* BLOCO: Processa a extração de conteúdo para versões armazenadas em formato de objeto JSON                   */
            if (isJsonFile) {
                if (dadosCapitulo.versiculos && dadosCapitulo.versiculos[versiculoNum]) {
                    const versiculoData = dadosCapitulo.versiculos[versiculoNum];                                            /* Captura dado bruto do verso         */
                    
                    /* BLOCO: Trata o formato interlinear exclusivo da versão Original com hebraico/grego e transliteração */
                    if (versaoBiblia === 'original' && typeof versiculoData === 'object' && versiculoData.traducao_completa) {
                        conteudo = '<p class="traducao-completa">' + versiculoData.traducao_completa + '</p>';               /* Texto corrido em português          */
                        
                        /* BLOCO: Constrói a visualização detalhada das palavras originais e suas respectivas traduções    */
                        if (versiculoData.palavras && Array.isArray(versiculoData.palavras)) {
                            conteudo += '<div class="palavras-container">';                                                  /* Inicia contêiner interlinear        */
                            versiculoData.palavras.forEach(function(palavra) {
                                conteudo += '<div class="word-detail-item">';                                                /* Inicia item de palavra              */
                                conteudo += '<div class="hebrew">' + (palavra.hebraico || '') + '</div>';                    /* Texto original                      */
                                conteudo += '<div class="transliteration">' + (palavra.transliteracao || '') + '</div>';     /* Pronúncia transliterada             */
                                conteudo += '<div class="translation">' + (palavra.traducao_palavra || '') + '</div>';       /* Tradução literal                    */
                                conteudo += '</div>';
                            });
                            conteudo += '</div>';
                        }
                    } else {
                        conteudo = versiculoData;                                                                            /* Texto da tradução padrão            */
                    }
                    
                    /* BLOCO: Recupera e formata o título da seção se disponível no arquivo de dados do capítulo           */
                    if (dadosCapitulo.titulos && dadosCapitulo.titulos[versiculoNum]) {
                        tituloSecao = '<strong class="section-title">' + dadosCapitulo.titulos[versiculoNum] + '</strong>';  /* Injeta subtítulo da seção           */
                    }
                } else conteudo = 'Versículo não encontrado.';
            } else {
                
                /* BLOCO: Processa a extração de conteúdo para versões bíblicas armazenadas em formato de arquivo HTML     */
                const el = dadosCapitulo.querySelector('#versiculo-' + versiculoNum);                                        /* Localiza ID no documento DOM        */
                if (el) {
                    const strongChild = Array.from(el.children).find(c => c.tagName === 'STRONG');                           /* Procura título negrito              */
                    if (strongChild && el.textContent.trim().startsWith(strongChild.textContent.trim())) {
                        tituloSecao = '<strong class="section-title">' + strongChild.innerHTML + '</strong>';                /* Define cabeçalho HTML               */
                        let temp = document.createElement('div'); temp.innerHTML = el.innerHTML;
                        let firstStrong = temp.querySelector('strong');
                        if (firstStrong && temp.innerHTML.trim().startsWith(firstStrong.outerHTML.trim())) firstStrong.remove();
                        conteudo = temp.innerHTML.trim();                                                                    /* Isola texto bíblico limpo           */
                    } else conteudo = el.innerHTML.trim();
                    if (!conteudo && el.textContent) conteudo = el.textContent.trim();                                       /* Fallback texto puro                 */
                } else conteudo = 'Versículo não encontrado.';
            }

            /* BLOCO: Sincroniza o título e o conteúdo textual na tela e ativa o efeito visual de carregamento concluído   */
            tituloElement.innerText = livroAcentuado.toUpperCase() + " " + capituloAtual + ":" + versiculoNum;               /* Escreve posição no topo             */
            versiculoConteiner.innerHTML = (tituloSecao || '') + '<div class="texto-versiculo">' + conteudo + '</div>';      /* Atualiza área central               */
            atualizarBotoes();                                                                                               /* Revalida estado dos controles       */
            document.body.classList.add('loaded');                                                                           /* Dispara animação de entrada         */
        }

        /* BLOCO: Gerencia a ativação e inativação dos botões de controle baseado nos limites de capítulos e versículos    */
        function atualizarBotoes() {
            if (!versiculosPorCapituloArray || versiculosPorCapituloArray.length === 0) {
                btnVoltar.disabled = true; btnProximo.disabled = true; return;                                               /* Trava navegação total               */
            }
            
            /* BLOCO: Calcula as regras de limite para habilitar ou travar os botões de controle de slide                  */
            const totalCaps = versiculosPorCapituloArray.length;                                                             /* Máximo de capítulos do livro        */
            const ultimoVerCap = (capituloAtual > 0 && capituloAtual <= totalCaps) ? versiculosPorCapituloArray[capituloAtual - 1] : 1;
            const idxLivro = livrosOrdemGlobal.indexOf(livroAtual);                                                          /* Localiza posição na bíblia          */

            btnVoltar.disabled = (capituloAtual === 1 && versiculoAtual === 1 && idxLivro === 0);                            /* Bloqueia no início (Gênesis 1:1)    */
            btnProximo.disabled = (capituloAtual === totalCaps && versiculoAtual === ultimoVerCap && idxLivro === livrosOrdemGlobal.length - 1);
        }

        /* BLOCO: Função responsável por avançar para o próximo versículo, efetuando a troca de capítulo ou livro se necessário */
        function proximoVersiculo() {
            if (btnProximo.disabled) return;
            const ultimoVerCap = versiculosPorCapituloArray[capituloAtual - 1];                                              /* Pega o limite do capítulo atual     */
            versiculoAtual++;                                                                                                /* Incrementa índice do verso          */

            /* BLOCO: Verifica o estouro da contagem de versículos para realizar a transição de capítulo ou novo livro     */
            if (versiculoAtual > ultimoVerCap) {
                capituloAtual++; versiculoAtual = 1;                                                                         /* Pula para capítulo seguinte         */
                if (capituloAtual > versiculosPorCapituloArray.length) {                                                     /* Verifica se o livro encerrou        */
                    const idxLivro = livrosOrdemGlobal.indexOf(livroAtual);                                                  /* Pega posição do livro               */
                    
                    /* BLOCO: Localiza o próximo livro na ordem canônica, sincroniza seus dados e dispara a nova carga     */
                    if (idxLivro < livrosOrdemGlobal.length - 1) {
                        livroAtual = livrosOrdemGlobal[idxLivro + 1];                                                        /* Define o novo livro alvo            */
                        atualizarContagemCapitulosParaLivroAtual();                                                          /* Sincroniza banco de dados           */
                        capituloAtual = 1; versiculoAtual = 1;                                                               /* Reseta para o início                */
                        carregarCapitulo(capituloAtual);                                                                     /* Faz requisição do arquivo           */
                    } else {
                        
                        /* BLOCO: Estaciona a navegação no limite máximo da Bíblia (Final de Apocalipse)                   */
                        versiculoAtual = ultimoVerCap; capituloAtual = versiculosPorCapituloArray.length;                    /* Trava no último registro            */
                        atualizarBotoes(); return;
                    }
                } else carregarCapitulo(capituloAtual);                                                                      /* Carrega capítulo sucessor           */
            } else carregarVersiculo(versiculoAtual);                                                                        /* Renderiza próximo verso             */
        }

        /* BLOCO: Função responsável por recuar para o versículo anterior, efetuando a troca de capítulo ou livro se necessário */
        function voltarVersiculo() {
            if (btnVoltar.disabled) return;
            versiculoAtual--;                                                                                                /* Decrementa índice do verso          */

            /* BLOCO: Verifica o estouro negativo do índice para retornar ao capítulo anterior ou livro precedente         */
            if (versiculoAtual < 1) {
                capituloAtual--;                                                                                             /* Recua para capítulo anterior        */
                if (capituloAtual < 1) {                                                                                     /* Verifica se saiu do livro atual     */
                    const idxLivro = livrosOrdemGlobal.indexOf(livroAtual);                                                  /* Localiza posição do livro           */
                    
                    /* BLOCO: Localiza o livro anterior na ordem canônica, define seu último capítulo e dispara a carga    */
                    if (idxLivro > 0) {
                        livroAtual = livrosOrdemGlobal[idxLivro - 1];                                                        /* Define livro anterior               */
                        atualizarContagemCapitulosParaLivroAtual();                                                          /* Sincroniza banco de dados           */
                        capituloAtual = versiculosPorCapituloArray.length;                                                   /* Pula para o último capítulo         */
                        versiculoAtual = versiculosPorCapituloArray[capituloAtual - 1];                                      /* Pula para o último versículo        */
                        carregarCapitulo(capituloAtual);                                                                     /* Faz requisição do arquivo           */
                    } else {
                        
                        /* BLOCO: Estaciona a navegação no limite inicial absoluto da Bíblia (Gênesis 1:1)                 */
                        capituloAtual = 1; versiculoAtual = 1;                                                               /* Trava no ponto zero                 */
                        if (livroAtual !== 'genesis' || capituloAtual !== 1) carregarCapitulo(1);                            /* Garante exibição correta            */
                        else carregarVersiculo(1);
                        return;
                    }
                } else {
                    versiculoAtual = versiculosPorCapituloArray[capituloAtual - 1];                                          /* Define verso final do cap anterior  */
                    carregarCapitulo(capituloAtual);                                                                         /* Solicita carga capítulo recuado     */
                }
            } else carregarVersiculo(versiculoAtual);                                                                        /* Renderiza verso anterior            */
        }

        /* BLOCO: Registra os escutadores de eventos para botões físicos e atalhos de teclado para navegação fluida        */
        btnVoltar.addEventListener('click', voltarVersiculo);                                                                /* Ativa botão de recuo                */
        btnProximo.addEventListener('click', proximoVersiculo);                                                              /* Ativa botão de avanço               */
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'PageDown') proximoVersiculo();                                          /* Avanço por seta ou PageDown         */
            else if (e.key === 'ArrowLeft' || e.key === 'PageUp') voltarVersiculo();                                         /* Recuo por seta ou PageUp            */
            else if (e.key === 'Home' && versiculoAtual !== 1) { versiculoAtual = 1; carregarVersiculo(1); }                 /* Salto para início do capítulo       */
            else if (e.key === 'End' && versiculosPorCapituloArray.length >= capituloAtual) {
                const ultimoVer = versiculosPorCapituloArray[capituloAtual - 1];                                             /* Salto para fim do capítulo          */
                if (versiculoAtual !== ultimoVer) { versiculoAtual = ultimoVer; carregarVersiculo(ultimoVer); }
            }
        });

        /* BLOCO: Inicializa o processo de exibição do slide sincronizando os dados e validando a posição inicial informada*/
        atualizarContagemCapitulosParaLivroAtual();                                                                          /* Prepara banco local de contagem     */
        if (todaContagemDataGlobal[livroAtual] && versiculosPorCapituloArray.length > 0) {
            if (capituloAtual < 1 || capituloAtual > versiculosPorCapituloArray.length) {
                capituloAtual = 1; versiculoAtual = 1;                                                                       /* Valida capítulo consistente         */
            } else if (versiculoAtual < 1 || versiculoAtual > versiculosPorCapituloArray[capituloAtual - 1]) {
                versiculoAtual = 1;                                                                                          /* Valida versículo consistente        */
            }
            carregarCapitulo(capituloAtual);                                                                                 /* Dispara carga inicial do slide      */
        } else {
            
            /* BLOCO: Trata falhas estruturais de inicialização exibindo mensagens de erro visuais ao projetor             */
            const livroAcentuado = obterNomeAcentuado(livroAtual);                                                           /* Tenta obter nome para o erro        */
            if (todaContagemDataGlobal[livroAtual]) {
                tituloElement.innerText = "ERRO";                                                                            /* Título de falha visual              */
                versiculoConteiner.innerHTML = '<div class="texto-versiculo" style="color:red;">Falha inicial.</div>';       /* Mensagem de falha visual            */
                btnVoltar.disabled = true; btnProximo.disabled = true;                                                       /* Inativa controles de erro           */
            }
        }
    </script>
</body>
</html>`;
}

/* BLOCO: Função que realiza a escrita física do código gerado no documento da janela pop-up e encerra o fluxo             */
function escreverHtmlNaJanela(janela, html) {
    janela.document.open();                                                                                                  /* Inicia abertura de fluxo de escrita */
    janela.document.write(html);                                                                                             /* Transmite o conteúdo serializado    */
    janela.document.close();                                                                                                 /* Finaliza e renderiza o conteúdo     */
    console.log("[slide_biblia_interface.js] Conteúdo escrito na janela do slide.");                                         /* Log de sucesso operacional          */
}

/* BLOCO: Define as exportações globais para que outros módulos possam invocar a geração e escrita da interface            */
window.gerarHtmlJanelaSlide = gerarHtmlJanelaSlide;                                                                          /* Exporta o motor de geração          */
window.escreverHtmlNaJanela = escreverHtmlNaJanela;                                                                          /* Exporta o motor de escrita          */