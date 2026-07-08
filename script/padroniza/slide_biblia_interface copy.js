/* /*====================================================== // Dados principais  */
/* da janela-mãe                                                                 */
/* const todaContagemDataGlobal = JSON.parse('${todaContagemJSON}'); //          */
/* Converte a contagem de versículos de JSON para objeto                         */
/* const livrosOrdemGlobal = JSON.parse('${livrosOrdemJSON}'); // Converte a     */
/* ordem dos livros de JSON para array                                           */
/* let versiculosPorCapituloArray = []; // Array com a contagem de versículos    */
/* por capítulo                                                                  */

        // Referências aos elementos da interface===================*/
/*                      MÓDULO DE INTERFACE DA JANELA SLIDE                      */
/*===============================================================================*/
/*                              Este módulo contém:                              */
/*                      - Geração do HTML da janela pop-up                       */
/*                 - Todo o JavaScript que roda dentro da janela                 */
/*               - Navegação, carregamento e eventos da interface                */
/*===============================================================================*/

console.log("[slide_biblia_interface.js] Script iniciado.")                       // Indica o início do módulo de interface da janela slide

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
    <title>Bíblia Slide - ${versaoAtual.toUpperCase()}</title>                                 <!-- Define o título da janela com a versão da Bíblia -->
    <meta charset="UTF-8">                                                                     <!-- Define a codificação de caracteres               -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">                     <!-- Configura a viewport para responsividade         -->
    <link rel="stylesheet" href="../css/slide_biblia.css">                                     <!-- Carrega o arquivo CSS de estilos                 -->
</head>
<body>
    <div id="marcadagua"></div>                                                                <!-- Div para marca d'água (se houver)                -->
    <div id="titulo">${livroAcentuado.toUpperCase()} ${capituloAtual}:${versiculoAtual}</div>  <!-- Exibe o título com livro, capítulo e versículo   -->
    <div id="versiculo-conteiner"><div class="texto-versiculo">Carregando...</div></div>       <!-- Conteiner onde o texto do versículo será exibido -->
    <div id="botao-conteiner">                                                                 <!-- Conteiner dos botões de navegação                -->
        <button id="voltar-botao">‹ Anterior</button>                                          <!-- Botão para voltar ao versículo anterior          -->
        <button id="proximo-botao">Próximo ›</button>                                          <!-- Botão para ir ao próximo versículo               -->
    </div>

    <script>
        // Variáveis de estado inicial da janela do slide
        let livroAtual = '${livroAtual}';                                                      // Armazena o nome do livro atual
        let capituloAtual = ${capituloAtual};                                                  // Armazena o número do capítulo atual
        let versiculoAtual = ${versiculoAtual};                                                // Armazena o número do versículo atual
        const versaoBiblia = '${versaoAtual}';                                                 // Armazena a versão da Bíblia
        let dadosCapitulo = null;                                                              // Armazena os dados do capítulo carregado

        // Dados principais da janela-mãe
        const todaContagemDataGlobal = JSON.parse('${todaContagemJSON}');                      // Converte a contagem de versículos de JSON para objeto
        const livrosOrdemGlobal = JSON.parse('${livrosOrdemJSON}');                            // Converte a ordem dos livros de JSON para array
        let versiculosPorCapituloArray = [];                                                   // Array com a contagem de versículos por capítulo

        // Referências aos elementos da interface
        const tituloElement = document.getElementById('titulo');                               // Referência ao elemento do título
        const versiculoConteiner = document.getElementById('versiculo-conteiner');             // Referência ao conteiner do versículo
        const btnVoltar = document.getElementById('voltar-botao');                             // Referência ao botão voltar
        const btnProximo = document.getElementById('proximo-botao');                           // Referência ao botão próximo

        // Formato do arquivo a ser buscado (JSON ou HTML)
        const jsonFileVersions = ['ara', 'nvi', 'acf', 'ntlh', 'kjv', 'naa', 'original'];      // Lista de versões que usam arquivos JSON
        const isJsonFile = jsonFileVersions.includes(versaoBiblia);                            // Verifica se a versão atual usa JSON
        const fileExtension = isJsonFile ? 'json' : 'html';                                    // Define a extensão do arquivo baseado na versão

        // Este bloco cria a função para normalizar o nome do livro localmente
        function normalizarNomeLivro(nome) {
            const semAcentos = ${JSON.stringify(livroAcentuadosParaSemAcentos)};                                       // Obtém o dicionário de livros sem acentos
            const nomeLower = nome.toLowerCase();                                                                      // Converte o nome para minúsculo
            const keyAcentuada = Object.keys(semAcentos).find(key => key.toLowerCase() === nomeLower);                 // Procura por nome com acentos
            if (keyAcentuada) return semAcentos[keyAcentuada];                                                         // Retorna o nome sem acentos se encontrar
            const keySemAcento = Object.keys(semAcentos).find(key => semAcentos[key].toLowerCase() === nomeLower);     // Procura por nome sem acentos
            return keySemAcento ? semAcentos[keySemAcento] : nome;                                                     // Retorna o nome normalizado ou o original
        }

        // Este bloco cria a função para obter o nome acentuado localmente
        function obterNomeAcentuado(nomeSemAcento) {
            const semAcentos = ${JSON.stringify(livroAcentuadosParaSemAcentos)};                                       // Obtém o dicionário de livros sem acentos
            return Object.keys(semAcentos).find(key => semAcentos[key] === nomeSemAcento) || nomeSemAcento;            // Retorna o nome com acentos ou o original
        }

        // Este bloco cria a função que atualiza a contagem de versículos para o livro atual
        function atualizarContagemCapitulosParaLivroAtual() {
            const contagemCapitulosObj = todaContagemDataGlobal[livroAtual];                                           // Obtém a contagem de capítulos do livro atual
            if (contagemCapitulosObj) {                                                                                // Verifica se existe contagem para o livro
                versiculosPorCapituloArray = Object.keys(contagemCapitulosObj)                                         // Obtém as chaves (números dos capítulos)
                    .map(capNumStr => parseInt(capNumStr, 10))                                                         // Converte as strings para números
                    .sort((a, b) => a - b)                                                                             // Ordena os capítulos numericamente
                    .map(capNum => contagemCapitulosObj[capNum.toString()]);                                           // Mapeia para a contagem de versículos de cada capítulo
            } else {                                                                                                   // Se não encontrar contagem para o livro
                console.error(\`Contagem não encontrada para \${livroAtual} (\${versaoBiblia}).\`);                    // Loga o erro
                versiculosPorCapituloArray = [];                                                                       // Inicializa array vazio
                tituloElement.innerText = "ERRO CONFIG";                                                               // Define título de erro
                versiculoConteiner.innerHTML = \`<div class="texto-versiculo" style="color:red;">Config de versículos ausente.</div>\`;      // Exibe mensagem de erro
                btnVoltar.disabled = true; btnProximo.disabled = true;                                                 // Desabilita os botões de navegação
            }
        }

        // Este bloco cria a função que carrega os dados de um capítulo (JSON ou HTML)
        async function carregarCapitulo(capituloNum) {
            const caminho = \`../versao/\${versaoBiblia}/\${livroAtual}/\${capituloNum}.\${fileExtension}\`;           // Monta o caminho do arquivo do capítulo
            console.log(\`Carregando capítulo: \${caminho}\`);                                                         // Loga o caminho que está sendo carregado
            const livroAcentuado = obterNomeAcentuado(livroAtual);                                                     // Obtém o nome acentuado do livro
            tituloElement.innerText = \`\${livroAcentuado.toUpperCase()} \${capituloNum}:... (Carregando)\`;           // Atualiza o título com status de carregamento
            versiculoConteiner.innerHTML = '<div class="texto-versiculo">Carregando capítulo...</div>';                // Exibe mensagem de carregamento
            btnVoltar.disabled = true; btnProximo.disabled = true;                                                     // Desabilita os botões durante o carregamento

            try {                                                                                                      // Inicia o bloco try-catch para tratamento de erros
                const response = await fetch(caminho);                                                                 // Faz a requisição HTTP para carregar o arquivo
                if (!response.ok) throw new Error(\`HTTP \${response.status} em \${caminho}\`);                        // Verifica se a resposta foi bem-sucedida
                dadosCapitulo = isJsonFile ? await response.json() : new DOMParser().parseFromString(await response.text(), 'text/html');  // Processa o arquivo (JSON ou HTML)
                console.log(\`Capítulo \${isJsonFile ? 'JSON' : 'HTML'} carregado.\`);                                 // Loga o sucesso do carregamento
                carregarVersiculo(versiculoAtual);                                                                     // Carrega o versículo específico
            } catch (error) {                                                                                          // Captura qualquer erro que ocorra
                console.error('Erro ao carregar capítulo:', error);                                                    // Loga o erro detalhado
                tituloElement.innerText = \`ERRO \${livroAcentuado.toUpperCase()} \${capituloNum}\`;                   // Define título de erro
                versiculoConteiner.innerHTML = \`<div class="texto-versiculo" style="color:red;font-size:1.2rem;">Falha.</div>\`;          // Exibe mensagem de erro
            }
        }

        // Este bloco cria a função que extrai e exibe um versículo específico do capítulo carregado
        function carregarVersiculo(versiculoNum) {
            console.log(\`Carregando \${livroAtual} \${capituloAtual}:\${versiculoNum}\`);                             // Loga qual versículo está sendo carregado
            let conteudo = '', tituloSecao = '';                                                                       // Inicializa variáveis para conteúdo e título da seção
            const livroAcentuado = obterNomeAcentuado(livroAtual);                                                     // Obtém o nome acentuado do livro

            if (!dadosCapitulo) {                                                                                      // Verifica se os dados do capítulo foram carregados
                versiculoConteiner.innerHTML = '<div class="texto-versiculo fade-in" style="color:orange;">Dados não carregados.</div>'; // Exibe mensagem de erro
                atualizarBotoes(); return;                                                                             // Atualiza os botões e retorna
            }

            if (isJsonFile) {                                                                                          // Se for arquivo JSON
                if (dadosCapitulo.versiculos && dadosCapitulo.versiculos[versiculoNum]) {                              // Verifica se o versículo existe no JSON
                    conteudo = dadosCapitulo.versiculos[versiculoNum];                                                 // Obtém o conteúdo do versículo
                    if (dadosCapitulo.titulos && dadosCapitulo.titulos[versiculoNum]) {                                // Verifica se existe título para o versículo
                        tituloSecao = '<strong class="section-title">' + dadosCapitulo.titulos[versiculoNum] + '</strong>';      // Cria o título da seção
                    }
                } else conteudo = 'Versículo não encontrado (JSON).';                                                  // Mensagem se o versículo não for encontrado
            } else {                                                                                                   // Se for arquivo HTML
                const el = dadosCapitulo.querySelector('#versiculo-' + versiculoNum);                                  // Procura o elemento do versículo no HTML
                if (el) {                                                                                              // Se o elemento foi encontrado
                    const strongChild = Array.from(el.children).find(c => c.tagName === 'STRONG');                     // Procura por elemento STRONG filho
                    if (strongChild && el.textContent.trim().startsWith(strongChild.textContent.trim())) {             // Verifica se o STRONG é o início do texto
                        tituloSecao = '<strong class="section-title">' + strongChild.innerHTML + '</strong>';          // Cria o título da seção
                        let temp = document.createElement('div'); temp.innerHTML = el.innerHTML;                       // Cria elemento temporário para manipular o HTML
                        let firstStrong = temp.querySelector('strong');                                                // Procura o primeiro STRONG no elemento temporário
                        if (firstStrong && temp.innerHTML.trim().startsWith(firstStrong.outerHTML.trim())) firstStrong.remove(); // Remove o STRONG se for o início
                        conteudo = temp.innerHTML.trim();                                                              // Obtém o conteúdo sem o título
                    } else conteudo = el.innerHTML.trim();                                                             // Se não houver STRONG no início, usa todo o HTML
                    if (!conteudo && el.textContent) conteudo = el.textContent.trim();                                 // Se não houver HTML, usa o texto puro
                } else conteudo = 'Versículo não encontrado (HTML).';                                                  // Mensagem se o versículo não for encontrado
            }

            tituloElement.innerText = \`\${livroAcentuado.toUpperCase()} \${capituloAtual}:\${versiculoNum}\`;         // Atualiza o título com o versículo atual
            versiculoConteiner.innerHTML = (tituloSecao || '') + '<div class="texto-versiculo">' + conteudo + '</div>';// Exibe o título da seção e o conteúdo do versículo
            atualizarBotoes();                                                                                         // Atualiza o estado dos botões de navegação
            document.body.classList.add('loaded');                                                                     // Mostra o conteúdo quando estiver pronto
        }

        // Este bloco cria a função que habilita/desabilita os botões de navegação
        function atualizarBotoes() {
            if (!versiculosPorCapituloArray || versiculosPorCapituloArray.length === 0) {                              // Verifica se há dados de versículos
                btnVoltar.disabled = true; btnProximo.disabled = true; return;                                         // Desabilita ambos os botões se não houver dados
            }
            const totalCaps = versiculosPorCapituloArray.length;                                                                                   // Obtém o total de capítulos do livro
            const ultimoVerCap = (capituloAtual > 0 && capituloAtual <= totalCaps) ? versiculosPorCapituloArray[capituloAtual - 1] : 1;            // Obtém o último versículo do capítulo atual
            const idxLivro = livrosOrdemGlobal.indexOf(livroAtual);                                                                                // Obtém o índice do livro atual na ordem canônica

            btnVoltar.disabled = (capituloAtual === 1 && versiculoAtual === 1 && idxLivro === 0);                                                  // Desabilita voltar se estiver no primeiro versículo da Bíblia
            btnProximo.disabled = (capituloAtual === totalCaps && versiculoAtual === ultimoVerCap && idxLivro === livrosOrdemGlobal.length - 1);   // Desabilita próximo se estiver no último versículo da Bíblia
        }

        // Este bloco cria a função para navegar para o próximo versículo, capítulo ou livro
        function proximoVersiculo() {
            if (btnProximo.disabled) return;                                                   // Retorna se o botão estiver desabilitado
            const ultimoVerCap = versiculosPorCapituloArray[capituloAtual - 1];                // Obtém o último versículo do capítulo atual
            versiculoAtual++;                                                                  // Incrementa o número do versículo
            if (versiculoAtual > ultimoVerCap) {                                               // Se passou do último versículo do capítulo
                capituloAtual++; versiculoAtual = 1;                                           // Vai para o próximo capítulo, versículo 1
                if (capituloAtual > versiculosPorCapituloArray.length) {                       // Se passou do último capítulo do livro
                    const idxLivro = livrosOrdemGlobal.indexOf(livroAtual);                    // Obtém o índice do livro atual
                    if (idxLivro < livrosOrdemGlobal.length - 1) {                             // Se não é o último livro
                        livroAtual = livrosOrdemGlobal[idxLivro + 1];                          // Vai para o próximo livro
                        atualizarContagemCapitulosParaLivroAtual();                            // Atualiza a contagem para o novo livro
                        capituloAtual = 1; versiculoAtual = 1;                                 // Vai para o primeiro capítulo e versículo
                        carregarCapitulo(capituloAtual);                                       // Carrega o novo capítulo
                    } else {                                                                                 // Se é o último livro
                        versiculoAtual = ultimoVerCap; capituloAtual = versiculosPorCapituloArray.length;    // Volta para o último versículo do último capítulo
                        atualizarBotoes(); return;                                                           // Atualiza os botões e retorna
                    }
                } else carregarCapitulo(capituloAtual);                                        // Carrega o próximo capítulo do mesmo livro
            } else carregarVersiculo(versiculoAtual);                                          // Carrega o próximo versículo do mesmo capítulo
        }

        // Este bloco cria a função para navegar para o versículo, capítulo ou livro anterior.
        function voltarVersiculo() {
            if (btnVoltar.disabled) return;                                                    // Retorna se o botão estiver desabilitado
            versiculoAtual--;                                                                  // Decrementa o número do versículo
            if (versiculoAtual < 1) {                                                          // Se passou do primeiro versículo do capítulo
                capituloAtual--;                                                               // Vai para o capítulo anterior
                if (capituloAtual < 1) {                                                       // Se passou do primeiro capítulo do livro
                    const idxLivro = livrosOrdemGlobal.indexOf(livroAtual);                    // Obtém o índice do livro atual
                    if (idxLivro > 0) {                                                        // Se não é o primeiro livro
                        livroAtual = livrosOrdemGlobal[idxLivro - 1];                          // Vai para o livro anterior
                        atualizarContagemCapitulosParaLivroAtual();                            // Atualiza a contagem para o novo livro
                        capituloAtual = versiculosPorCapituloArray.length;                     // Vai para o último capítulo do livro anterior
                        versiculoAtual = versiculosPorCapituloArray[capituloAtual - 1];        // Vai para o último versículo do capítulo
                        carregarCapitulo(capituloAtual);                                       // Carrega o novo capítulo
                    } else {                                                                   // Se é o primeiro livro
                        capituloAtual = 1; versiculoAtual = 1;                                               // Vai para o primeiro capítulo e versículo
                        if (livroAtual !== 'genesis' || capituloAtual !== 1) carregarCapitulo(1);            // Carrega o primeiro capítulo se necessário
                        else carregarVersiculo(1);                                                           // Carrega o primeiro versículo
                        return;                                                                // Retorna
                    }
                } else {                                                                       // Se não passou do primeiro capítulo
                    versiculoAtual = versiculosPorCapituloArray[capituloAtual - 1];            // Vai para o último versículo do capítulo anterior
                    carregarCapitulo(capituloAtual);                                           // Carrega o capítulo anterior
                }
            } else carregarVersiculo(versiculoAtual);                                          // Carrega o versículo anterior do mesmo capítulo
        }

        // Este bloco configuração dos eventos para botões e teclado
        btnVoltar.addEventListener('click', voltarVersiculo);                                  // Adiciona evento de clique ao botão voltar
        btnProximo.addEventListener('click', proximoVersiculo);                                // Adiciona evento de clique ao botão próximo
        document.addEventListener('keydown', (e) => {                                          // Adiciona evento de teclado ao documento
            if (e.key === 'ArrowRight' || e.key === 'PageDown') proximoVersiculo();            // Seta direita ou PageDown vai para próximo
            else if (e.key === 'ArrowLeft' || e.key === 'PageUp') voltarVersiculo();                             // Seta esquerda ou PageUp vai para anterior
            else if (e.key === 'Home' && versiculoAtual !== 1) { versiculoAtual = 1; carregarVersiculo(1); }     // Home vai para o primeiro versículo
            else if (e.key === 'End' && versiculosPorCapituloArray.length >= capituloAtual) {                    // End vai para o último versículo
                const ultimoVer = versiculosPorCapituloArray[capituloAtual - 1];                                 // Obtém o último versículo do capítulo atual
                if (versiculoAtual !== ultimoVer) { versiculoAtual = ultimoVer; carregarVersiculo(ultimoVer); }  // Vai para o último versículo se não estiver lá
            }
        });

        // Este bloco inicia o slide
        atualizarContagemCapitulosParaLivroAtual();                                            // Atualiza a contagem de versículos para o livro inicial
        if (todaContagemDataGlobal[livroAtual] && versiculosPorCapituloArray.length > 0) {     // Verifica se há dados válidos para o livro
            if (capituloAtual < 1 || capituloAtual > versiculosPorCapituloArray.length) {      // Valida o número do capítulo
                capituloAtual = 1; versiculoAtual = 1;                                                           // Corrige para o primeiro capítulo e versículo se inválido
            } else if (versiculoAtual < 1 || versiculoAtual > versiculosPorCapituloArray[capituloAtual - 1]) {   // Valida o número do versículo
                versiculoAtual = 1;                                                                              // Corrige para o primeiro versículo se inválido
            }
            carregarCapitulo(capituloAtual);                                                   // Carrega o capítulo inicial
        } else {                                                                               // Se não há dados válidos
            const livroAcentuado = obterNomeAcentuado(livroAtual);                             // Obtém o nome acentuado do livro
            if (todaContagemDataGlobal[livroAtual]) {                                          // Verifica se o livro existe na configuração
                tituloElement.innerText = "ERRO";                                                                              // Define título de erro
                versiculoConteiner.innerHTML = '<div class="texto-versiculo" style="color:red;">Falha ao inicializar.</div>';  // Exibe mensagem de erro
                btnVoltar.disabled = true; btnProximo.disabled = true;                                                         // Desabilita os botões de navegação
            }
        }
    </script>
</body>
</html>`
}

// Este bloco cria função que escreve o HTML na janela do slide.
function escreverHtmlNaJanela(janela, html) {
    janela.document.open()                                                        // Abre o documento da janela para escrita
    janela.document.write(html)                                                   // Escreve o HTML na janela
    janela.document.close()                                                       // Fecha o documento da janela
    console.log("[slide_biblia_interface.js] Conteúdo escrito na janela do slide.")  // Loga o sucesso da operação
}

// ========================================================================
// EXPORTAÇÕES GLOBAIS
// ========================================================================
window.gerarHtmlJanelaSlide = gerarHtmlJanelaSlide
window.escreverHtmlNaJanela = escreverHtmlNaJanela
