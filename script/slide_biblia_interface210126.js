/*===============================================================================*/
/*                      MÓDULO DE INTERFACE DA JANELA SLIDE                      */
/*===============================================================================*/
/*           Este módulo contém:                                                 */
/*                             - Geração do HTML da janela pop-up                */
/*                             - Todo o JavaScript que roda dentro da janela     */
/*                             - Navegação, carregamento e eventos da interface  */
/*===============================================================================*/

console.log("[slide_biblia_interface.js] Script iniciado.") // Indica o início do módulo de interface da janela slide

// Este bloco cria a função que gera o HTML completo da janela slide.
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
<html lang="pt-BR">
<head>
    <title>Bíblia Slide - ${versaoAtual.toUpperCase()}</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/slide_biblia.css">
    ${versaoAtual === "original" ? '<link rel="stylesheet" href="../css/versoes.css">' : ""}
</head>
<body>
    <!-- NOVO POPUP DE ORIENTAÇÃO FULLSCREEN -->
    <div id="orientacao-fullscreen" style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background-color: rgba(0, 0, 0, 0.85); color: white; padding: 20px; border-radius: 10px; z-index: 10001; text-align: center; font-family: Arial, sans-serif; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
        <p style="margin: 0; font-size: 16px;">Pressione <b>F11</b> para uma melhor experiência em tela cheia.</p>
        <p style="margin: 10px 0 0 0; font-size: 14px;">Para sair, pressione <b>ESC</b> ou mova o mouse para o topo.</p>
        <button onclick="document.getElementById('orientacao-fullscreen').remove()" style="background-color: #5c5c5c; color: white; border: none; padding: 8px 15px; margin-top: 15px; border-radius: 5px; cursor: pointer;">Entendi</button>
    </div>

    <div id="marcadagua"></div>
    <div id="titulo">${livroAcentuado.toUpperCase()} ${capituloAtual}:${versiculoAtual}</div>
    <div id="versiculo-conteiner"><div class="texto-versiculo">Carregando...</div></div>
    <div id="botao-conteiner">
        <button id="voltar-botao">‹ Anterior</button>
        <button id="proximo-botao">Próximo ›</button>
    </div>

    <script>
        // Variáveis de estado inicial da janela do slide
        let livroAtual = '${livroAtual}';
        let capituloAtual = ${capituloAtual};
        let versiculoAtual = ${versiculoAtual};
        const versaoBiblia = '${versaoAtual}';
        let dadosCapitulo = null;

        // Dados principais da janela-mãe
        const todaContagemDataGlobal = JSON.parse('${todaContagemJSON}');
        const livrosOrdemGlobal = JSON.parse('${livrosOrdemJSON}');
        let versiculosPorCapituloArray = [];

        // Referências aos elementos da interface
        const tituloElement = document.getElementById('titulo');
        const versiculoConteiner = document.getElementById('versiculo-conteiner');
        const btnVoltar = document.getElementById('voltar-botao');
        const btnProximo = document.getElementById('proximo-botao');

        // Formato do arquivo a ser buscado (JSON ou HTML)
        const jsonFileVersions = ['ara', 'nvi', 'acf', 'ntlh', 'kjv', 'naa', 'original'];
        const isJsonFile = jsonFileVersions.includes(versaoBiblia);
        const fileExtension = isJsonFile ? 'json' : 'html';

        // Este bloco cria a função para normalizar o nome do livro localmente
        function normalizarNomeLivro(nome) {
            const semAcentos = ${JSON.stringify(livroAcentuadosParaSemAcentos)};
            const nomeLower = nome.toLowerCase();
            const keyAcentuada = Object.keys(semAcentos).find(key => key.toLowerCase() === nomeLower);
            if (keyAcentuada) return semAcentos[keyAcentuada];
            const keySemAcento = Object.keys(semAcentos).find(key => semAcentos[key].toLowerCase() === nomeLower);
            return keySemAcento ? semAcentos[keySemAcento] : nome;
        }

        // Este bloco cria a função para obter o nome acentuado localmente
        function obterNomeAcentuado(nomeSemAcento) {
            const semAcentos = ${JSON.stringify(livroAcentuadosParaSemAcentos)};
            return Object.keys(semAcentos).find(key => semAcentos[key] === nomeSemAcento) || nomeSemAcento;
        }

        // Este bloco cria a função que atualiza a contagem de versículos para o livro atual
        function atualizarContagemCapitulosParaLivroAtual() {
            const contagemCapitulosObj = todaContagemDataGlobal[livroAtual];
            if (contagemCapitulosObj) {
                versiculosPorCapituloArray = Object.keys(contagemCapitulosObj)
                    .map(capNumStr => parseInt(capNumStr, 10))
                    .sort((a, b) => a - b)
                    .map(capNum => contagemCapitulosObj[capNum.toString()]);
            } else {
                console.error(\`Contagem não encontrada para \${livroAtual} (\${versaoBiblia}).\`);
                versiculosPorCapituloArray = [];
                tituloElement.innerText = "ERRO CONFIG";
                versiculoConteiner.innerHTML = \`<div class="texto-versiculo" style="color:red;">Config de versículos ausente.</div>\`;
                btnVoltar.disabled = true; btnProximo.disabled = true;
            }
        }

        // Este bloco cria a função que carrega os dados de um capítulo (JSON ou HTML)
        async function carregarCapitulo(capituloNum) {
            const caminho = \`../versao/\${versaoBiblia}/\${livroAtual}/\${capituloNum}.\${fileExtension}\`;
            console.log(\`Carregando capítulo: \${caminho}\`);
            const livroAcentuado = obterNomeAcentuado(livroAtual);
            tituloElement.innerText = \`\${livroAcentuado.toUpperCase()} \${capituloNum}:... (Carregando)\`;
            versiculoConteiner.innerHTML = '<div class="texto-versiculo">Carregando capítulo...</div>';
            btnVoltar.disabled = true; btnProximo.disabled = true;

            try {
                const response = await fetch(caminho);
                if (!response.ok) throw new Error(\`HTTP \${response.status} em \${caminho}\`);
                
                if (isJsonFile) {
                    const jsonData = await response.json();
                    dadosCapitulo = Array.isArray(jsonData) ? jsonData[0] : jsonData;
                } else {
                    dadosCapitulo = new DOMParser().parseFromString(await response.text(), 'text/html');
                }
                
                console.log(\`Capítulo \${isJsonFile ? 'JSON' : 'HTML'} carregado.\`);
                carregarVersiculo(versiculoAtual);
            } catch (error) {
                console.error('Erro ao carregar capítulo:', error);
                tituloElement.innerText = \`ERRO \${livroAcentuado.toUpperCase()} \${capituloNum}\`;
                versiculoConteiner.innerHTML = \`<div class="texto-versiculo" style="color:red;font-size:1.2rem;">Falha.</div>\`;
            }
        }

        // Este bloco cria a função que extrai e exibe um versículo específico do capítulo carregado
        function carregarVersiculo(versiculoNum) {
            console.log(\`Carregando \${livroAtual} \${capituloAtual}:\${versiculoNum}\`);
            let conteudo = '', tituloSecao = '';
            const livroAcentuado = obterNomeAcentuado(livroAtual);

            if (!dadosCapitulo) {
                versiculoConteiner.innerHTML = '<div class="texto-versiculo fade-in" style="color:orange;">Dados não carregados.</div>';
                atualizarBotoes(); return;
            }

            if (isJsonFile) {
                if (dadosCapitulo.versiculos && dadosCapitulo.versiculos[versiculoNum]) {
                    const versiculoData = dadosCapitulo.versiculos[versiculoNum];
                    
                    if (versaoBiblia === 'original' && typeof versiculoData === 'object' && versiculoData.traducao_completa) {
                        conteudo = '<p class="traducao-completa">' + versiculoData.traducao_completa + '</p>';
                        
                        if (versiculoData.palavras && Array.isArray(versiculoData.palavras)) {
                            conteudo += '<div class="palavras-container">';
                            versiculoData.palavras.forEach(function(palavra) {
                                conteudo += '<div class="word-detail-item">';
                                conteudo += '<div class="hebrew">' + (palavra.hebraico || '') + '</div>';
                                conteudo += '<div class="transliteration">' + (palavra.transliteracao || '') + '</div>';
                                conteudo += '<div class="translation">' + (palavra.traducao_palavra || '') + '</div>';
                                conteudo += '</div>';
                            });
                            conteudo += '</div>';
                        }
                    } else {
                        conteudo = versiculoData;
                    }
                    
                    if (dadosCapitulo.titulos && dadosCapitulo.titulos[versiculoNum]) {
                        tituloSecao = '<strong class="section-title">' + dadosCapitulo.titulos[versiculoNum] + '</strong>';
                    }
                } else conteudo = 'Versículo não encontrado (JSON).';
            } else {
                const el = dadosCapitulo.querySelector('#versiculo-' + versiculoNum);
                if (el) {
                    const strongChild = Array.from(el.children).find(c => c.tagName === 'STRONG');
                    if (strongChild && el.textContent.trim().startsWith(strongChild.textContent.trim())) {
                        tituloSecao = '<strong class="section-title">' + strongChild.innerHTML + '</strong>';
                        let temp = document.createElement('div'); temp.innerHTML = el.innerHTML;
                        let firstStrong = temp.querySelector('strong');
                        if (firstStrong && temp.innerHTML.trim().startsWith(firstStrong.outerHTML.trim())) firstStrong.remove();
                        conteudo = temp.innerHTML.trim();
                    } else conteudo = el.innerHTML.trim();
                    if (!conteudo && el.textContent) conteudo = el.textContent.trim();
                } else conteudo = 'Versículo não encontrado (HTML).';
            }

            tituloElement.innerText = \`\${livroAcentuado.toUpperCase()} \${capituloAtual}:\${versiculoNum}\`;
            versiculoConteiner.innerHTML = (tituloSecao || '') + '<div class="texto-versiculo">' + conteudo + '</div>';
            atualizarBotoes();
            document.body.classList.add('loaded');
        }

        // Este bloco cria a função que habilita/desabilita os botões de navegação
        function atualizarBotoes() {
            if (!versiculosPorCapituloArray || versiculosPorCapituloArray.length === 0) {
                btnVoltar.disabled = true; btnProximo.disabled = true; return;
            }
            const totalCaps = versiculosPorCapituloArray.length;
            const ultimoVerCap = (capituloAtual > 0 && capituloAtual <= totalCaps) ? versiculosPorCapituloArray[capituloAtual - 1] : 1;
            const idxLivro = livrosOrdemGlobal.indexOf(livroAtual);

            btnVoltar.disabled = (capituloAtual === 1 && versiculoAtual === 1 && idxLivro === 0);
            btnProximo.disabled = (capituloAtual === totalCaps && versiculoAtual === ultimoVerCap && idxLivro === livrosOrdemGlobal.length - 1);
        }

        // Este bloco cria a função para navegar para o próximo versículo, capítulo ou livro
        function proximoVersiculo() {
            if (btnProximo.disabled) return;
            const ultimoVerCap = versiculosPorCapituloArray[capituloAtual - 1];
            versiculoAtual++;
            if (versiculoAtual > ultimoVerCap) {
                capituloAtual++; versiculoAtual = 1;
                if (capituloAtual > versiculosPorCapituloArray.length) {
                    const idxLivro = livrosOrdemGlobal.indexOf(livroAtual);
                    if (idxLivro < livrosOrdemGlobal.length - 1) {
                        livroAtual = livrosOrdemGlobal[idxLivro + 1];
                        atualizarContagemCapitulosParaLivroAtual();
                        capituloAtual = 1; versiculoAtual = 1;
                        carregarCapitulo(capituloAtual);
                    } else {
                        versiculoAtual = ultimoVerCap; capituloAtual = versiculosPorCapituloArray.length;
                        atualizarBotoes(); return;
                    }
                } else carregarCapitulo(capituloAtual);
            } else carregarVersiculo(versiculoAtual);
        }

        // Este bloco cria a função para navegar para o versículo, capítulo ou livro anterior.
        function voltarVersiculo() {
            if (btnVoltar.disabled) return;
            versiculoAtual--;
            if (versiculoAtual < 1) {
                capituloAtual--;
                if (capituloAtual < 1) {
                    const idxLivro = livrosOrdemGlobal.indexOf(livroAtual);
                    if (idxLivro > 0) {
                        livroAtual = livrosOrdemGlobal[idxLivro - 1];
                        atualizarContagemCapitulosParaLivroAtual();
                        capituloAtual = versiculosPorCapituloArray.length;
                        versiculoAtual = versiculosPorCapituloArray[capituloAtual - 1];
                        carregarCapitulo(capituloAtual);
                    } else {
                        capituloAtual = 1; versiculoAtual = 1;
                        if (livroAtual !== 'genesis' || capituloAtual !== 1) carregarCapitulo(1);
                        else carregarVersiculo(1);
                        return;
                    }
                } else {
                    versiculoAtual = versiculosPorCapituloArray[capituloAtual - 1];
                    carregarCapitulo(capituloAtual);
                }
            } else carregarVersiculo(versiculoAtual);
        }

        // Este bloco configuração dos eventos para botões e teclado
        btnVoltar.addEventListener('click', voltarVersiculo);
        btnProximo.addEventListener('click', proximoVersiculo);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'PageDown') proximoVersiculo();
            else if (e.key === 'ArrowLeft' || e.key === 'PageUp') voltarVersiculo();
            else if (e.key === 'Home' && versiculoAtual !== 1) { versiculoAtual = 1; carregarVersiculo(1); }
            else if (e.key === 'End' && versiculosPorCapituloArray.length >= capituloAtual) {
                const ultimoVer = versiculosPorCapituloArray[capituloAtual - 1];
                if (versiculoAtual !== ultimoVer) { versiculoAtual = ultimoVer; carregarVersiculo(ultimoVer); }
            }
        });

        // Este bloco inicia o slide
        atualizarContagemCapitulosParaLivroAtual();
        if (todaContagemDataGlobal[livroAtual] && versiculosPorCapituloArray.length > 0) {
            if (capituloAtual < 1 || capituloAtual > versiculosPorCapituloArray.length) {
                capituloAtual = 1; versiculoAtual = 1;
            } else if (versiculoAtual < 1 || versiculoAtual > versiculosPorCapituloArray[capituloAtual - 1]) {
                versiculoAtual = 1;
            }
            carregarCapitulo(capituloAtual);
        } else {
            const livroAcentuado = obterNomeAcentuado(livroAtual);
            if (todaContagemDataGlobal[livroAtual]) {
                tituloElement.innerText = "ERRO";
                versiculoConteiner.innerHTML = '<div class="texto-versiculo" style="color:red;">Falha ao inicializar.</div>';
                btnVoltar.disabled = true; btnProximo.disabled = true;
            }
        }
    </script>
</body>
</html>`
}

// Este bloco cria função que escreve o HTML na janela do slide.
function escreverHtmlNaJanela(janela, html) {
  janela.document.open() // Abre o documento da janela para escrita
  janela.document.write(html) // Escreve o HTML na janela
  janela.document.close() // Fecha o documento da janela
  console.log("[slide_biblia_interface.js] Conteúdo escrito na janela do slide.") // Loga o sucesso da operação
}

/*===============================================================================*/
/*                              EXPORTAÇÕES GLOBAIS                              */
/*===============================================================================*/
window.gerarHtmlJanelaSlide = gerarHtmlJanelaSlide
window.escreverHtmlNaJanela = escreverHtmlNaJanela