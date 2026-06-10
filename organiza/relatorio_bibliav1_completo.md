# Relatório Completo — arquivos selecionados de bibliav1.zip

**Arquivos analisados:**

- `html/harpa_cantor.html` — 2117 bytes

- `html/menu_dicionarioconcordancia copy.html` — 9357 bytes

- `html/menu_dicionarioconcordancia.html` — 9357 bytes

- `html/menu_dicionarioconcordanciabk.html` — 9198 bytes

- `html/menu_dicionarioconcordanciahtml.txt` — 9357 bytes

- `script/concordancia-busca-indexada.js` — 4590 bytes

- `script/concordancia-busca-indexadabk.js` — 7825 bytes

- `script/concordancia-optimizada.js` — 41756 bytes

- `script/concordancia-optimizadabk.js` — 40380 bytes

- `script/concordancia.js` — 16916 bytes

- `script/concordanciabk.js` — 16916 bytes

- `script/dicionario.js` — 21786 bytes

- `script/dicionario_concordancia.js` — 11506 bytes

- `script/dropdown_concordancia.js` — 13726 bytes

- `script/gerenciador_concordancia.js` — 15846 bytes

- `script/gerenciador_concordanciabk.js` — 11613 bytes

- `script/gerenciador_concordancia_novo.js` — 5976 bytes

- `script/harpa_cantor.js` — 6126 bytes

- `script/menu_dicionarioconcordancia copy.js` — 5144 bytes

- `script/menu_dicionarioconcordancia.js` — 7314 bytes

- `script/menu_dicionarioconcordanciabk.js` — 13014 bytes

- `script/slide_harpacantor.js` — 6958 bytes

- `script/slide_harpacantor_coordenador.js` — 775 bytes

- `script/slide_harpacantor_dados.js` — 195 bytes

- `script/slide_harpacantor_interface.js` — 8856 bytes

- `script/slide_harpacantor_janela.js` — 1396 bytes

- `script/slide_harpacantor_utils.js` — 307 bytes

- `css/cantor_cristao.css` — 1365 bytes

- `css/cantor_cristao_novo.css` — 6072 bytes

- `css/concordancia copy.css` — 55891 bytes

- `css/concordancia copy111111.css` — 53188 bytes

- `css/concordancia.css` — 57760 bytes

- `css/concordanciacss.txt` — 55891 bytes

- `css/dicionario copy.css` — 39165 bytes

- `css/dicionario.css` — 37293 bytes

- `css/dicionariocss.txt` — 39165 bytes

- `css/harpa_cantor.css` — 19285 bytes

- `css/harpa_crista.css` — 5527 bytes

- `css/menu_dicionarioconcordancia copy.css` — 36914 bytes

- `css/menu_dicionarioconcordancia.css` — 30141 bytes

- `css/menu_dicionarioconcordanciacss.txt` — 37018 bytes

- `css/slide_harpacantor.css` — 15266 bytes


---

## Resumo por arquivo

### `html/harpa_cantor.html`

- Extensão: `.html`
- Tamanho: `2117 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `Nenhuma detectada`

- Classes detectadas (regex): `Nenhuma detectada`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Harpa Cristã e Cantor Cristão</title>
    <link rel="stylesheet" href="../css/harpa_cantor.css">
    <!-- O href deste link será trocado dinamicamente pelo JS -->
    <link id="theme-style" rel="stylesheet" href="">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
    <video autoplay muted loop playsinline id="background-video">
        <source src="../img/harpacantor.webm" type="video/webm">
        Your browser does not support the video tag.
    </video>
    <div class="overlay"></div>

    <header>
        <h1 class="titulo-principal">Harpa Cristã e Cantor Cristão</h1>
        <p class="subtitulo">Localize todos os hinos da Harpa Cristã e do Cantor Cristão</p>
    </header>

    <nav class="menu-harpa-cantor">
        <a href="../index.html" class="menu-link">Menu Principal</a>
        <button id="btnHarpa" class="menu-button">Harpa Cristã</button>
        <button id="btnCantor" class="menu-button">Cantor Cristão</button>
        <button id="btnSlide" class="menu-button">Slide</button>
    </nav>

    <main>
        <div id="tela-inicial">
            <h2 class="bem-vindo">Bem-vindo!</h2>
            <p class="instrucao">Selecione um hinário acima para começar.</p>
        </div>

        <!-- Conteiner para os botões de faixa (1-50, 51-100, etc.) -->
        <div id="botoes-faixa-hinos"></div>

        <!-- Conteiner que mostrará os hinos da faixa selecionada -->
        <div id="botoes-hinos">
            <!-- Os botões dos hinos serão carregados aqui pelo JavaScript -->
        </div>

        <div id="hino-exibido"></div>
    </main>

    <footer class="rodape">
        <p>© Harpa Cristã e Cantor Cristão 2025</p>
    </footer>

    <!-- Scripts -->
    <script src="../script/slide_harpacantor.js"></script>
    <script src="../script/harpa_cantor.js"></script>
</body>
</html>

```
---

### `html/menu_dicionarioconcordancia copy.html`

- Extensão: `.html`
- Tamanho: `9357 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `Nenhuma detectada`

- Classes detectadas (regex): `Nenhuma detectada`

- Ocorrências relacionadas à marca d'água (trechos):

  - `marcadagua` → ...<h2></h2>                 <!--<div class="marcadagua"></div>-->             </section>         </mai...

  - `marcaDagua` → ...<h2></h2>                 <!--<div class="marcadagua"></div>-->             </section>         </mai...


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Concordância e Dicionário Bíblico</title>
    <link rel="stylesheet" href="../css/menu_dicionarioconcordancia.css">
    <link rel="stylesheet" href="../css/concordancia.css">
    <link rel="stylesheet" href="../css/dicionario.css">
</head>
<body>
    <header>
        <div class="cabecalho-superior">
            <div class="titulo-conteiner">
                <h1>Concordância e Dicionário Bíblico</h1>
                <p class="nome-extenso">Localize todas as ocorrências de palavras na Bíblia Sagrada</p>
            </div>
        </div>
        
        <nav>
            <span class="titulo-menu" style="display: none;">NAVEGAÇÃO</span>
            <ul class="menu-opcoes">
                <li><a href="../index.html" id="menu-principal">Menu Principal</a></li>
                <li><a href="#" id="concordancia">Concordância</a></li>
                <li><a href="#" id="dicionario">Dicionário</a></li>
                <li><a href="#" id="sobre">Sobre</a></li>
            </ul>
        </nav>
    </header>

    <div class="conteiner">
        <aside class="menu-alfabetico" style="display: none;">
            <div class="alfabeto-conteiner">
                <button class="letra-btn" data-letra="A">A</button>
                <button class="letra-btn" data-letra="B">B</button>
                <button class="letra-btn" data-letra="C">C</button>
                <button class="letra-btn" data-letra="D">D</button>
                <button class="letra-btn" data-letra="E">E</button>
                <button class="letra-btn" data-letra="F">F</button>
                <button class="letra-btn" data-letra="G">G</button>
                <button class="letra-btn" data-letra="H">H</button>
                <button class="letra-btn" data-letra="I">I</button>
                <button class="letra-btn" data-letra="J">J</button>
                <button class="letra-btn" data-letra="K">K</button>
                <button class="letra-btn" data-letra="L">L</button>
                <button class="letra-btn" data-letra="M">M</button>
                <button class="letra-btn" data-letra="N">N</button>
                <button class="letra-btn" data-letra="O">O</button>
                <button class="letra-btn" data-letra="P">P</button>
                <button class="letra-btn" data-letra="Q">Q</button>
                <button class="letra-btn" data-letra="R">R</button>
                <button class="letra-btn" data-letra="S">S</button>
                <button class="letra-btn" data-letra="T">T</button>
                <button class="letra-btn" data-letra="U">U</button>
                <button class="letra-btn" data-letra="V">V</button>
                <button class="letra-btn" data-letra="W">W</button>
                <button class="letra-btn" data-letra="X">X</button>
                <button class="letra-btn" data-letra="Y">Y</button>
                <button class="letra-btn" data-letra="Z">Z</button>
            </div>
        </aside>

        <main id="conteudo-principal">
            <div id="mensagem-inicial">
                <h2>Seja bem-vindo!</h2>
                <p>Escolha Concordância ou Dicionário no menu superior.</p>
            </div>

            <section id="secao-concordancia" class="secao-inativa">
                <div class="filtros-conteiner">
                    <div class="filtros-linha">
                        <div class="filtro-grupo">
                            <label for="filtro-palavra-input">Palavra:</label>
                            <input type="text" id="filtro-palavra-input" placeholder="Filtrar palavras na lista...">
                        </div>
                        <div class="filtro-grupo">
                            <label for="testamento-select">Testamento:</label>
                         


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `html/menu_dicionarioconcordancia.html`

- Extensão: `.html`
- Tamanho: `9357 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `Nenhuma detectada`

- Classes detectadas (regex): `Nenhuma detectada`

- Ocorrências relacionadas à marca d'água (trechos):

  - `marcadagua` → ...<h2></h2>                 <!--<div class="marcadagua"></div>-->             </section>         </mai...

  - `marcaDagua` → ...<h2></h2>                 <!--<div class="marcadagua"></div>-->             </section>         </mai...


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Concordância e Dicionário Bíblico</title>
    <link rel="stylesheet" href="../css/menu_dicionarioconcordancia.css">
    <link rel="stylesheet" href="../css/concordancia.css">
    <link rel="stylesheet" href="../css/dicionario.css">
</head>
<body>
    <header>
        <div class="cabecalho-superior">
            <div class="titulo-conteiner">
                <h1>Concordância e Dicionário Bíblico</h1>
                <p class="nome-extenso">Localize todas as ocorrências de palavras na Bíblia Sagrada</p>
            </div>
        </div>
        
        <nav>
            <span class="titulo-menu" style="display: none;">NAVEGAÇÃO</span>
            <ul class="menu-opcoes">
                <li><a href="../index.html" id="menu-principal">Menu Principal</a></li>
                <li><a href="#" id="concordancia">Concordância</a></li>
                <li><a href="#" id="dicionario">Dicionário</a></li>
                <li><a href="#" id="sobre">Sobre</a></li>
            </ul>
        </nav>
    </header>

    <div class="conteiner">
        <aside class="menu-alfabetico" style="display: none;">
            <div class="alfabeto-conteiner">
                <button class="letra-btn" data-letra="A">A</button>
                <button class="letra-btn" data-letra="B">B</button>
                <button class="letra-btn" data-letra="C">C</button>
                <button class="letra-btn" data-letra="D">D</button>
                <button class="letra-btn" data-letra="E">E</button>
                <button class="letra-btn" data-letra="F">F</button>
                <button class="letra-btn" data-letra="G">G</button>
                <button class="letra-btn" data-letra="H">H</button>
                <button class="letra-btn" data-letra="I">I</button>
                <button class="letra-btn" data-letra="J">J</button>
                <button class="letra-btn" data-letra="K">K</button>
                <button class="letra-btn" data-letra="L">L</button>
                <button class="letra-btn" data-letra="M">M</button>
                <button class="letra-btn" data-letra="N">N</button>
                <button class="letra-btn" data-letra="O">O</button>
                <button class="letra-btn" data-letra="P">P</button>
                <button class="letra-btn" data-letra="Q">Q</button>
                <button class="letra-btn" data-letra="R">R</button>
                <button class="letra-btn" data-letra="S">S</button>
                <button class="letra-btn" data-letra="T">T</button>
                <button class="letra-btn" data-letra="U">U</button>
                <button class="letra-btn" data-letra="V">V</button>
                <button class="letra-btn" data-letra="W">W</button>
                <button class="letra-btn" data-letra="X">X</button>
                <button class="letra-btn" data-letra="Y">Y</button>
                <button class="letra-btn" data-letra="Z">Z</button>
            </div>
        </aside>

        <main id="conteudo-principal">
            <div id="mensagem-inicial">
                <h2>Seja bem-vindo!</h2>
                <p>Escolha Concordância ou Dicionário no menu superior.</p>
            </div>

            <section id="secao-concordancia" class="secao-inativa">
                <div class="filtros-conteiner">
                    <div class="filtros-linha">
                        <div class="filtro-grupo">
                            <label for="filtro-palavra-input">Palavra:</label>
                            <input type="text" id="filtro-palavra-input" placeholder="Filtrar palavras na lista...">
                        </div>
                        <div class="filtro-grupo">
                            <label for="testamento-select">Testamento:</label>
                         


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `html/menu_dicionarioconcordanciabk.html`

- Extensão: `.html`
- Tamanho: `9198 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `Nenhuma detectada`

- Classes detectadas (regex): `Nenhuma detectada`

- Ocorrências relacionadas à marca d'água (trechos):

  - `marcadagua` → ...<h2></h2>                 <!--<div class="marcadagua"></div>-->             </section>         </mai...

  - `marcaDagua` → ...<h2></h2>                 <!--<div class="marcadagua"></div>-->             </section>         </mai...


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Concordância e Dicionário Bíblico</title>
    <link rel="stylesheet" href="../css/menu_dicionarioconcordancia.css">
    <link rel="stylesheet" href="../css/concordancia.css">
    <link rel="stylesheet" href="../css/dicionario.css">
</head>
<body>
    <header>
        <div class="cabecalho-superior">
            <div class="titulo-conteiner">
                <h1>Concordância e Dicionário Bíblico</h1>
                <p class="nome-extenso">Localize todas as ocorrências de palavras na Bíblia Sagrada</p>
            </div>
        </div>
        
        <nav>
            <span class="titulo-menu" style="display: none;">NAVEGAÇÃO</span>
            <ul class="menu-opcoes">
                <li><a href="../index.html" id="menu-principal">Menu Principal</a></li>
                <li><a href="#" id="concordancia">Concordância</a></li>
                <li><a href="#" id="dicionario">Dicionário</a></li>
                <li><a href="#" id="sobre">Sobre</a></li>
            </ul>
        </nav>
    </header>

    <div class="conteiner">
        <aside class="menu-alfabetico" style="display: none;">
            <div class="alfabeto-conteiner">
                <button class="letra-btn" data-letra="A">A</button>
                <button class="letra-btn" data-letra="B">B</button>
                <button class="letra-btn" data-letra="C">C</button>
                <button class="letra-btn" data-letra="D">D</button>
                <button class="letra-btn" data-letra="E">E</button>
                <button class="letra-btn" data-letra="F">F</button>
                <button class="letra-btn" data-letra="G">G</button>
                <button class="letra-btn" data-letra="H">H</button>
                <button class="letra-btn" data-letra="I">I</button>
                <button class="letra-btn" data-letra="J">J</button>
                <button class="letra-btn" data-letra="K">K</button>
                <button class="letra-btn" data-letra="L">L</button>
                <button class="letra-btn" data-letra="M">M</button>
                <button class="letra-btn" data-letra="N">N</button>
                <button class="letra-btn" data-letra="O">O</button>
                <button class="letra-btn" data-letra="P">P</button>
                <button class="letra-btn" data-letra="Q">Q</button>
                <button class="letra-btn" data-letra="R">R</button>
                <button class="letra-btn" data-letra="S">S</button>
                <button class="letra-btn" data-letra="T">T</button>
                <button class="letra-btn" data-letra="U">U</button>
                <button class="letra-btn" data-letra="V">V</button>
                <button class="letra-btn" data-letra="W">W</button>
                <button class="letra-btn" data-letra="X">X</button>
                <button class="letra-btn" data-letra="Y">Y</button>
                <button class="letra-btn" data-letra="Z">Z</button>
            </div>
        </aside>

        <main id="conteudo-principal">
            <div id="mensagem-inicial">
                <h2>Seja bem-vindo!</h2>
                <p>Escolha Concordância ou Dicionário no menu superior.</p>
            </div>

            <section id="secao-concordancia" class="secao-inativa">
                <div class="filtros-conteiner">
                    <div class="filtros-linha">
                        <div class="filtro-grupo">
                            <label for="filtro-palavra-input">Palavra:</label>
                            <input type="text" id="filtro-palavra-input" placeholder="Filtrar palavras na lista...">
                        </div>
                        <div class="filtro-grupo">
                            <label for="testamento-select">Testamento:</label>
                         


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `html/menu_dicionarioconcordanciahtml.txt`

- Extensão: `.txt`
- Tamanho: `9357 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `Nenhuma detectada`

- Classes detectadas (regex): `Nenhuma detectada`

- Ocorrências relacionadas à marca d'água (trechos):

  - `marcadagua` → ...<h2></h2>                 <!--<div class="marcadagua"></div>-->             </section>         </mai...

  - `marcaDagua` → ...<h2></h2>                 <!--<div class="marcadagua"></div>-->             </section>         </mai...


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Concordância e Dicionário Bíblico</title>
    <link rel="stylesheet" href="../css/menu_dicionarioconcordancia.css">
    <link rel="stylesheet" href="../css/concordancia.css">
    <link rel="stylesheet" href="../css/dicionario.css">
</head>
<body>
    <header>
        <div class="cabecalho-superior">
            <div class="titulo-conteiner">
                <h1>Concordância e Dicionário Bíblico</h1>
                <p class="nome-extenso">Localize todas as ocorrências de palavras na Bíblia Sagrada</p>
            </div>
        </div>
        
        <nav>
            <span class="titulo-menu" style="display: none;">NAVEGAÇÃO</span>
            <ul class="menu-opcoes">
                <li><a href="../index.html" id="menu-principal">Menu Principal</a></li>
                <li><a href="#" id="concordancia">Concordância</a></li>
                <li><a href="#" id="dicionario">Dicionário</a></li>
                <li><a href="#" id="sobre">Sobre</a></li>
            </ul>
        </nav>
    </header>

    <div class="conteiner">
        <aside class="menu-alfabetico" style="display: none;">
            <div class="alfabeto-conteiner">
                <button class="letra-btn" data-letra="A">A</button>
                <button class="letra-btn" data-letra="B">B</button>
                <button class="letra-btn" data-letra="C">C</button>
                <button class="letra-btn" data-letra="D">D</button>
                <button class="letra-btn" data-letra="E">E</button>
                <button class="letra-btn" data-letra="F">F</button>
                <button class="letra-btn" data-letra="G">G</button>
                <button class="letra-btn" data-letra="H">H</button>
                <button class="letra-btn" data-letra="I">I</button>
                <button class="letra-btn" data-letra="J">J</button>
                <button class="letra-btn" data-letra="K">K</button>
                <button class="letra-btn" data-letra="L">L</button>
                <button class="letra-btn" data-letra="M">M</button>
                <button class="letra-btn" data-letra="N">N</button>
                <button class="letra-btn" data-letra="O">O</button>
                <button class="letra-btn" data-letra="P">P</button>
                <button class="letra-btn" data-letra="Q">Q</button>
                <button class="letra-btn" data-letra="R">R</button>
                <button class="letra-btn" data-letra="S">S</button>
                <button class="letra-btn" data-letra="T">T</button>
                <button class="letra-btn" data-letra="U">U</button>
                <button class="letra-btn" data-letra="V">V</button>
                <button class="letra-btn" data-letra="W">W</button>
                <button class="letra-btn" data-letra="X">X</button>
                <button class="letra-btn" data-letra="Y">Y</button>
                <button class="letra-btn" data-letra="Z">Z</button>
            </div>
        </aside>

        <main id="conteudo-principal">
            <div id="mensagem-inicial">
                <h2>Seja bem-vindo!</h2>
                <p>Escolha Concordância ou Dicionário no menu superior.</p>
            </div>

            <section id="secao-concordancia" class="secao-inativa">
                <div class="filtros-conteiner">
                    <div class="filtros-linha">
                        <div class="filtro-grupo">
                            <label for="filtro-palavra-input">Palavra:</label>
                            <input type="text" id="filtro-palavra-input" placeholder="Filtrar palavras na lista...">
                        </div>
                        <div class="filtro-grupo">
                            <label for="testamento-select">Testamento:</label>
                         


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `script/concordancia-busca-indexada.js`

- Extensão: `.js`
- Tamanho: `4590 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `commonLetters, fileName, filesToIndex, item, jsonData, letter, letterFiles, listaLetras, listaLetrasResponse, maxFilesPerLetter, palavraLower, primeiraLetra, response, resultados, sinonimoLower, termoLower, wordEntries`

- Classes detectadas (regex): `SearchIndex`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/**
 * Sistema de índice invertido ULTRA-RÁPIDO para busca na concordância
 * Otimizado para grandes volumes de dados
 */
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

    async search(termo, maxResults = 50) { // 🔥 alterado de 100 para 50
        const termoLower = termo.toLowerCase();
        const primeiraLetra = termoLower.charAt(0);

        if (!this.indexedLetters.has(primeiraLetra)) {
            await this._indexLetter(primeiraLetra);
        }

        let resultados = Arra


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `script/concordancia-busca-indexadabk.js`

- Extensão: `.js`
- Tamanho: `7825 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `aExact, bExact, commonLetters, fileName, filesToIndex, item, jsonData, letter, letterFiles, listaLetras, listaLetrasResponse, maxFilesPerLetter, palavraLower, primeiraLetra, response, resultados, sinonimoLower, tamanho, termoLower, wordEntries`

- Classes detectadas (regex): `SearchIndex`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/**
 * Sistema de índice invertido ULTRA-RÁPIDO para busca na concordância
 * Otimizado para grandes volumes de dados (centenas de arquivos por letra)
 */
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



... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `script/concordancia-optimizada.js`

- Extensão: `.js`
- Tamanho: `41756 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `aExact, allResults, antigoTestamento, bExact, btnAnterior, btnProximo, carregarMaisText, concordanciasCorrespondentes, contador, contadorConteiner, content, debounceTimeout, fileName, filterTerm, filteredConcordancias, finalConcordancias, finalResults, fragment, header, indicator, isAntigoTestamento, isExpanded, isNovoTestamento, item, itemsConteiner, jsonData, letra, letrasPrioritarias, letrasProcessadas, letrasUnicas, letterFiles, livroConfig, livroFiltro, livroLower, livroMatch, livroRef, livroSelect, livroTestamento, livros, nextPage, nomeLivro, normalizedTestamento, novoMostrandoValor, novoTestamento, option, originalDataCopy, palavraDiv, palavraElement, palavraMatch, referenciaNome, regex, response, result, searchLower, searchTerm, selected, selectedDisplay, sinonimosMatch, testamentoFiltro, testamentoMatch, testamentoSelect, texto, textoMatch, todosLivros, todosOption, valor, wordEntries`

- Classes detectadas (regex): `ConcordanciaOptimized`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/**
 * Sistema de concordância otimizado com carregamento sob demanda
 */
class ConcordanciaOptimized {
    constructor() {
        if (!window.dataManager) {
            window.dataManager = new DataManager();
        }
        this.dataManager = window.dataManager;
        
        this.currentLetter = 'A';
        this.currentPage = 0;
        this.isLoading = false;
        this.hasMore = true;
        this.currentResults = [];
        this.searchTerm = '';
        this.filters = {
            testamento: 'todos',
            livro: 'todos'
        };
        // Propriedades para o contador
        this.visibleCount = 0;
        this.totalResultsCount = 0;
        this.pageSize = 50; // Define um tamanho de página padrão

        this.initializeElements();
        this.bindEvents();
        this.loadInitialData();
    }

    initializeElements() {
        this.elements = {
            resultadosConteiner: document.getElementById('resultados-conteiner'),
            loadingIndicator: document.getElementById('loading-indicator'),
            contadorResultados: document.getElementById('contador-resultados'),
            resultadosVisiveis: document.getElementById('resultados-visiveis'),
            totalResultados: document.getElementById('total-resultados'),
            carregarMais: document.getElementById('carregar-mais'),
            filtroPalavra: document.getElementById('filtro-palavra-input'),
            testamentoSelect: document.getElementById('testamento-select'),
            livroSelect: document.getElementById('livro-select'),
            buscaGlobal: document.getElementById('busca-global'),
            btnBuscar: document.getElementById('btn-buscar'),
            letrasBtns: document.querySelectorAll('.letra-btn')
        };
    }

    bindEvents() {
        // Eventos dos botões de letras
        this.elements.letrasBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const letra = e.target.dataset.letra;
                this.selectLetter(letra);
            });
        });

        // Evento do botão carregar mais
        this.elements.carregarMais.addEventListener('click', () => {
            this.loadMoreResults();
        });

        // Eventos de busca
        this.elements.btnBuscar.addEventListener('click', () => {
            this.performGlobalSearch();
        });

        this.elements.buscaGlobal.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performGlobalSearch();
            }
        });

        // Evento input para busca global com debounce
        let debounceTimeout;
        this.elements.buscaGlobal.addEventListener('input', (e) => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                const searchTerm = e.target.value.trim();
                if (!searchTerm) {
                    this.searchTerm = '';
                    this.filters.testamento = 'todos';
                    this.filters.livro = 'todos';
                    if (this.elements.filtroPalavra) {
                        this.elements.filtroPalavra.value = '';
                        this.elements.filtroPalavra.disabled = false; // Reabilita o filtro de palavra
                    }
                    this.resetDropdowns();
                    this.selectLetter(this.currentLetter); // Recarrega a lista da letra atual
                } else {
                    // Limpa imediatamente a área de resultados quando começar a digitar
                    this.elements.resultadosConteiner.innerHTML = '';
                    this.elements.contadorResultados.style.display = 'none';
                    this.elements.carregarMais.style.display = 'none';
                    
                    if (this.elements.filtroPalavra) {
                        this.elements.filtroPalavra.disabled = true; // Desabilit


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `script/concordancia-optimizadabk.js`

- Extensão: `.js`
- Tamanho: `40380 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `aExact, allResults, antigoTestamento, bExact, btnAnterior, btnProximo, carregarMaisText, contador, contadorConteiner, content, debounceTimeout, fileName, filterTerm, filteredConcordancias, finalConcordancias, finalResults, fragment, header, indicator, isAntigoTestamento, isExpanded, isNovoTestamento, itemsConteiner, jsonData, letra, letter, letterFiles, letters, livroConfig, livroFiltro, livroLower, livroMatch, livroRef, livroSelect, livroTestamento, livros, matchingConcordancias, nextPage, nomeLivro, normalizedTestamento, novoMostrandoValor, novoTestamento, option, originalDataCopy, palavraDiv, palavraElement, palavraMatch, referenciaNome, regex, response, result, searchLower, searchTerm, selected, selectedDisplay, sinonimosMatch, testamentoFiltro, testamentoMatch, testamentoSelect, texto, textoMatch, todosLivros, todosOption, valor, wordEntries, wordMatches`

- Classes detectadas (regex): `ConcordanciaOptimized`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/**
 * Sistema de concordância otimizado com carregamento sob demanda
 */
class ConcordanciaOptimized {
    constructor() {
        this.currentLetter = 'A';
        this.currentPage = 0;
        this.isLoading = false;
        this.hasMore = true;
        this.currentResults = [];
        this.searchTerm = '';
        this.filters = {
            testamento: 'todos',
            livro: 'todos'
        };
        // Propriedades para o contador
        this.visibleCount = 0;
        this.totalResultsCount = 0;
        this.pageSize = 50; // Define um tamanho de página padrão

        this.initializeElements();
        this.bindEvents();
        this.loadInitialData();
    }

    initializeElements() {
        this.elements = {
            resultadosConteiner: document.getElementById('resultados-conteiner'),
            loadingIndicator: document.getElementById('loading-indicator'),
            contadorResultados: document.getElementById('contador-resultados'),
            resultadosVisiveis: document.getElementById('resultados-visiveis'),
            totalResultados: document.getElementById('total-resultados'),
            carregarMais: document.getElementById('carregar-mais'),
            filtroPalavra: document.getElementById('filtro-palavra-input'),
            testamentoSelect: document.getElementById('testamento-select'),
            livroSelect: document.getElementById('livro-select'),
            buscaGlobal: document.getElementById('busca-global'),
            btnBuscar: document.getElementById('btn-buscar'),
            letrasBtns: document.querySelectorAll('.letra-btn')
        };
    }

    bindEvents() {
        // Eventos dos botões de letras
        this.elements.letrasBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const letra = e.target.dataset.letra;
                this.selectLetter(letra);
            });
        });

        // Evento do botão carregar mais
        this.elements.carregarMais.addEventListener('click', () => {
            this.loadMoreResults();
        });

        // Eventos de busca
        this.elements.btnBuscar.addEventListener('click', () => {
            this.performGlobalSearch();
        });

        this.elements.buscaGlobal.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performGlobalSearch();
            }
        });

        // Evento input para busca global com debounce
        let debounceTimeout;
        this.elements.buscaGlobal.addEventListener('input', (e) => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                const searchTerm = e.target.value.trim();
                if (!searchTerm) {
                    this.searchTerm = '';
                    this.filters.testamento = 'todos';
                    this.filters.livro = 'todos';
                    if (this.elements.filtroPalavra) {
                        this.elements.filtroPalavra.value = '';
                        this.elements.filtroPalavra.disabled = false; // Reabilita o filtro de palavra
                    }
                    this.resetDropdowns();
                    this.selectLetter(this.currentLetter); // Recarrega a lista da letra atual
                } else {
                    // Limpa imediatamente a área de resultados quando começar a digitar
                    this.elements.resultadosConteiner.innerHTML = '';
                    this.elements.contadorResultados.style.display = 'none';
                    this.elements.carregarMais.style.display = 'none';
                    
                    if (this.elements.filtroPalavra) {
                        this.elements.filtroPalavra.disabled = true; // Desabilita o filtro de palavra
                    }
                }
            }, 300); // Aguarda 300ms após a última digitação
        });

        // Filt


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `script/concordancia.js`

- Extensão: `.js`
- Tamanho: `16916 bytes`

- Funções detectadas (regex): `_aplicarFiltrosERenderizar, _renderizarResultados, atualizarFiltroLivro, atualizarFiltroPalavra, atualizarFiltroTestamento, carregarDadosBaseConcordancia, carregarEDisplayConcordanciaPorLetra, criarSecaoLivro, destacarPalavra, executarBuscaGlobalConcordancia, extrairNomeLivroDaReferencia, formatarNomeLivro, formatarReferencia, onConcordanciaViewReady`

- Variáveis/const detectadas (regex): `CONCORDANCIA_DATA_BASE_PATH_LOCAL, agrupado, concordanciasCorrespondentes, conteiner, dadosCarregadosPorLetraOuBusca, div, filtradas, filtroLivroAtual, filtroPalavraAtual, filtroTestamentoAtual, grupo, header, inicial, item, jsonData, letra, livro, livroCfg, livroSelect, livrosPresentes, match, mensagem, nomeLivro, nomeLivroFormatado, nomeLivroOriginal, nomeLivroRef, ordem, palavraFiltrada, palavraInput, partes, regex, regexBusca, response, restoDaReferencia, resultados, resultadosConteiner, section, termoBuscaGlobalAtual, testamento, testamentoSelect, todasAsLetras, todosOsResultadosGlobais, wordEntries`

- Classes detectadas (regex): `Nenhuma detectada`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*===============================================================================*/
/*                    SCRIPT DE CONCORDÂNCIA BÍBLICA (MÓDULO)                    */
/*===============================================================================*/
/*    - Funções para carregar, filtrar e exibir resultados da concordância.      */
/*    - Implementa busca por letra, filtro por palavra, testamento e livro.      */
/*    - Contém a lógica para a busca global em todos os arquivos da Bíblia.      */
/*===============================================================================*/

// Este bloco importa funções auxiliares para manipulação de livros e testamentos.
import { getTestamentoDoLivroConfig, getOrdemDosLivrosConfig, findLivroByIdConfig } from './dropdown_concordancia.js';

// Este bloco define o caminho base para os arquivos de dados da concordância.
const CONCORDANCIA_DATA_BASE_PATH_LOCAL = '../concordancia/';                        // Variáveis de estado para armazenar dados e filtros atuais.
let dadosCarregadosPorLetraOuBusca = [];                                           // Armazena os dados brutos carregados (por letra ou busca global).
let filtroTestamentoAtual = 'todos';                                               // Estado do filtro de testamento ('todos', 'Antigo Testamento', 'Novo Testamento').
let filtroLivroAtual = 'todos';                                                    // Estado do filtro de livro (ex: 'gn' para Gênesis).
let filtroPalavraAtual = '';                                                       // Estado do filtro de palavra dentro dos resultados.
let termoBuscaGlobalAtual = '';                                                    // Armazena o termo da última busca global.

// O bloco carrega e exibe os dados da concordância para uma letra específica.
export async function carregarEDisplayConcordanciaPorLetra(letra) {
    const resultadosConteiner = document.getElementById('resultados-conteiner');   
    if (!resultadosConteiner) return;                                              // Aborta se o conteiner de resultados não existir.
    resultadosConteiner.innerHTML = '<div class="loader">Carregando...</div>';     // Exibe um indicador de carregamento.

    try {
        const response = await fetch(`${CONCORDANCIA_DATA_BASE_PATH_LOCAL}${letra.toLowerCase()}.json`);     // Faz a requisição para o arquivo JSON da letra.
        if (!response.ok) throw new Error(`Arquivo '${letra.toLowerCase()}.json' não encontrado.`);          // Lança um erro se o arquivo não for encontrado.
        const jsonData = await response.json();
        const wordEntries = jsonData[letra.toLowerCase()] || [];                                             // Extrai as entradas de palavras do JSON.

        dadosCarregadosPorLetraOuBusca = wordEntries;                                                        // Armazena os dados carregados.
        termoBuscaGlobalAtual = '';                                                                          // Limpa o termo de busca global.
        _aplicarFiltrosERenderizar();                                                                        // Aplica filtros e renderiza os resultados.
    } catch (error) {
        console.error(error);
        resultadosConteiner.innerHTML = `<p class="erro-mensagem">${error.message}</p>`;                     // Exibe uma mensagem de erro na interface.
        dadosCarregadosPorLetraOuBusca = [];                                                                 // Limpa os dados em caso de erro.
    }
}

// Este blococria a função chamada quando a view da concordância está pronta.
export function onConcordanciaViewReady() {
    // Busca os elementos dos filtros na interface.
    const testamentoSelect = document.getElementById('custom-testamento-select')?.querySelector('.select-selected');
    const livroSelect = document.getElementById('custom-livro-select')?.querySelector('.select-selected');
  


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `script/concordanciabk.js`

- Extensão: `.js`
- Tamanho: `16916 bytes`

- Funções detectadas (regex): `_aplicarFiltrosERenderizar, _renderizarResultados, atualizarFiltroLivro, atualizarFiltroPalavra, atualizarFiltroTestamento, carregarDadosBaseConcordancia, carregarEDisplayConcordanciaPorLetra, criarSecaoLivro, destacarPalavra, executarBuscaGlobalConcordancia, extrairNomeLivroDaReferencia, formatarNomeLivro, formatarReferencia, onConcordanciaViewReady`

- Variáveis/const detectadas (regex): `CONCORDANCIA_DATA_BASE_PATH_LOCAL, agrupado, concordanciasCorrespondentes, conteiner, dadosCarregadosPorLetraOuBusca, div, filtradas, filtroLivroAtual, filtroPalavraAtual, filtroTestamentoAtual, grupo, header, inicial, item, jsonData, letra, livro, livroCfg, livroSelect, livrosPresentes, match, mensagem, nomeLivro, nomeLivroFormatado, nomeLivroOriginal, nomeLivroRef, ordem, palavraFiltrada, palavraInput, partes, regex, regexBusca, response, restoDaReferencia, resultados, resultadosConteiner, section, termoBuscaGlobalAtual, testamento, testamentoSelect, todasAsLetras, todosOsResultadosGlobais, wordEntries`

- Classes detectadas (regex): `Nenhuma detectada`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*===============================================================================*/
/*                    SCRIPT DE CONCORDÂNCIA BÍBLICA (MÓDULO)                    */
/*===============================================================================*/
/*    - Funções para carregar, filtrar e exibir resultados da concordância.      */
/*    - Implementa busca por letra, filtro por palavra, testamento e livro.      */
/*    - Contém a lógica para a busca global em todos os arquivos da Bíblia.      */
/*===============================================================================*/

// Este bloco importa funções auxiliares para manipulação de livros e testamentos.
import { getTestamentoDoLivroConfig, getOrdemDosLivrosConfig, findLivroByIdConfig } from './dropdown_concordancia.js';

// Este bloco define o caminho base para os arquivos de dados da concordância.
const CONCORDANCIA_DATA_BASE_PATH_LOCAL = '../concordancia/';                        // Variáveis de estado para armazenar dados e filtros atuais.
let dadosCarregadosPorLetraOuBusca = [];                                           // Armazena os dados brutos carregados (por letra ou busca global).
let filtroTestamentoAtual = 'todos';                                               // Estado do filtro de testamento ('todos', 'Antigo Testamento', 'Novo Testamento').
let filtroLivroAtual = 'todos';                                                    // Estado do filtro de livro (ex: 'gn' para Gênesis).
let filtroPalavraAtual = '';                                                       // Estado do filtro de palavra dentro dos resultados.
let termoBuscaGlobalAtual = '';                                                    // Armazena o termo da última busca global.

// O bloco carrega e exibe os dados da concordância para uma letra específica.
export async function carregarEDisplayConcordanciaPorLetra(letra) {
    const resultadosConteiner = document.getElementById('resultados-conteiner');   
    if (!resultadosConteiner) return;                                              // Aborta se o conteiner de resultados não existir.
    resultadosConteiner.innerHTML = '<div class="loader">Carregando...</div>';     // Exibe um indicador de carregamento.

    try {
        const response = await fetch(`${CONCORDANCIA_DATA_BASE_PATH_LOCAL}${letra.toLowerCase()}.json`);     // Faz a requisição para o arquivo JSON da letra.
        if (!response.ok) throw new Error(`Arquivo '${letra.toLowerCase()}.json' não encontrado.`);          // Lança um erro se o arquivo não for encontrado.
        const jsonData = await response.json();
        const wordEntries = jsonData[letra.toLowerCase()] || [];                                             // Extrai as entradas de palavras do JSON.

        dadosCarregadosPorLetraOuBusca = wordEntries;                                                        // Armazena os dados carregados.
        termoBuscaGlobalAtual = '';                                                                          // Limpa o termo de busca global.
        _aplicarFiltrosERenderizar();                                                                        // Aplica filtros e renderiza os resultados.
    } catch (error) {
        console.error(error);
        resultadosConteiner.innerHTML = `<p class="erro-mensagem">${error.message}</p>`;                     // Exibe uma mensagem de erro na interface.
        dadosCarregadosPorLetraOuBusca = [];                                                                 // Limpa os dados em caso de erro.
    }
}

// Este blococria a função chamada quando a view da concordância está pronta.
export function onConcordanciaViewReady() {
    // Busca os elementos dos filtros na interface.
    const testamentoSelect = document.getElementById('custom-testamento-select')?.querySelector('.select-selected');
    const livroSelect = document.getElementById('custom-livro-select')?.querySelector('.select-selected');
  


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `script/dicionario.js`

- Extensão: `.js`
- Tamanho: `21786 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `allTermos, arquivos, btnAnterior, btnProximo, content, definicao, definicaoAdicional, definicaoPrincipal, end, endIndex, filteredResults, html, indicator, isExpanded, jsonData, letra, letraA, linhaBusca, oldPag, paginacaoGrupo, referencesHtml, referencias, response, resultsHtml, showingTotal, start, startIndex, term, termo, termos, total`

- Classes detectadas (regex): `Dicionario`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*===============================================================================*/
/*                      SCRIPT DO DICIONÁRIO BÍBLICO (COMPLETO)                  */                 
/*===============================================================================*/
/*      - Define a classe Dicionario para gerenciar a interatividade.            */
/*      - Carrega dados de termos bíblicos sob demanda.                          */
/*      - Implementa busca, paginação e exibição de definições.                  */
/*===============================================================================*/

class Dicionario {
    // Este bloco e o construtor da classe Dicionario.
    constructor() {
        this.currentLetter = null;                                                 // Armazena a letra atualmente selecionada (ex: 'A').
        this.currentPage = 0;                                                      // Controla a página atual para a paginação.
        this.itemsPerPage = 50;                                                    // Define a quantidade de itens a serem mostrados por página.
        this.allTermos = [];                                                       // Mantém um array com todos os termos da letra carregada.
        this.allGlobalTermos = null;                                               // Novo: Armazena todos os termos de todas as letras para busca global.
        this.listaLetras = null;                                                   // Armazena em cache o arquivo de mapeamento de letras (lista_letras.json).
        this.initializeElements();                                                 // Mapeia os elementos do DOM.
        this.bindEvents();                                                         // Vincula os eventos de interatividade.
    }

    // Este bloco mapeia os elementos do DOM para a propriedade 'elements' para fácil acesso.
    initializeElements() {
        this.elements = {
            dicionarioInput: document.querySelector('#secao-dicionario .dicionario-busca input'),  // Busca o campo de input da busca do dicionário.
            dicionarioBtn: document.querySelector('#secao-dicionario .dicionario-btn'),
            dicionarioResultados: document.getElementById('dicionario-resultados'),                // Busca o conteiner onde os resultados serão exibidos.
            secaoDicionario: document.getElementById('secao-dicionario'),                          // Busca o elemento da seção principal do dicionário.
        };
    }

    // Este bloco vincula todos os eventos necessários para a interatividade do dicionário.
    bindEvents() {                                                                                 // Validação para garantir que os elementos essenciais existem no DOM.
        if (!this.elements.dicionarioInput || !this.elements.secaoDicionario || !this.elements.dicionarioBtn) {
            console.error("Elementos essenciais do dicionário não foram encontrados no DOM.");     // Exibe um erro se elementos cruciais não forem encontrados.
            return;
        }

        // Este bloco adiciona evento de clique para CADA botão de letra no menu alfabético.
        document.querySelectorAll('.letra-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // A ação só é executada se a seção do dicionário estiver ativa, evitando chamadas desnecessárias.
                if (this.elements.secaoDicionario.classList.contains('secao-ativa')) {
                    const letra = btn.dataset.letra;                                               // Obtém a letra do atributo 'data-letra' do botão.
                    this.loadAndDisplayLetter(letra);                                              // Chama a função para carregar e exibir os termos da letra.
                }
            });
        });

        this.elements.dicionarioBtn.addEventListener('click', () => {
            this.handleSe


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `script/dicionario_concordancia.js`

- Extensão: `.js`
- Tamanho: `11506 bytes`

- Funções detectadas (regex): `adjustMainContentMargin, clearActiveNav, executarBuscaGlobalConcHandler, fetchConcordanciaDataByLetter, loadView, onConcordanciaViewLoadedAndReady, onDicionarioViewLoadedAndReady, setActiveNav, setupGlobalLetterButtonListeners, showInitialState`

- Variáveis/const detectadas (regex): `CONCORDANCIA_DATA_BASE_PATH, DICIONARIO_DATA_BASE_PATH_LOCAL, TELA_CONCORDANCIA_PATH, TELA_DICIONARIO_VIEW_PATH, btnConsultar, btnLetraAtiva, buscaDicionarioInput, buscaGlobalInput, conteudoPrincipal, currentView, elementos, filtroPalavraInput, filtroPalavraInputConc, html, inicial, isSidebarVisible, jsonData, letraAtivaSidebar, menuAlfabetico, navConcordancia, navDicionario, response, resultadosConteiner, sidebarWidth, termoBusca, wordEntries`

- Classes detectadas (regex): `Nenhuma detectada`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*===============================================================================*/
/*              SCRIPT COORDENADOR: DICIONÁRIO E CONCORDÂNCIA                    */
/*===============================================================================*/
/* - Gerencia a troca de visualizações (views) entre Concordância e Dicionário.  */
/* - Carrega os templates HTML correspondentes sob demanda.                      */
/* - Coordena a comunicação entre o menu alfabético e a view ativa.              */
/*===============================================================================*/

// Este bloco importa as funções necessárias dos módulos de concordância e dicionário.
import {
    onConcordanciaViewReady,
    carregarDadosBaseConcordancia,
    atualizarFiltroTestamento,
    atualizarFiltroLivro,
    executarBuscaGlobalConcordancia,
    atualizarFiltroPalavra
} from './concordancia.js';
import { setupDicionarioView, carregarEDisplayDicionarioPorLetra } from './dicionario.js';
import { initConcordanciaDropdowns } from './dropdown_concordancia.js';

// Este bloco é executado quando o DOM está completamente carregado.
document.addEventListener('DOMContentLoaded', () => {                                                                  // Mapeia os elementos principais da interface.
    const conteudoPrincipal = document.getElementById('conteudoPrincipal');
    const inicial = document.getElementById('mensagem-inicial');
    const navConcordancia = document.getElementById('concordancia');
    const navDicionario = document.getElementById('dicionario');
    const menuAlfabetico = document.querySelector('.menu-alfabetico');

    // Este bloco define os caminhos para os arquivos HTML e de dados.
    const TELA_CONCORDANCIA_PATH = 'concordancia.html';
    const TELA_DICIONARIO_VIEW_PATH = 'dicionario.html';
    const CONCORDANCIA_DATA_BASE_PATH = '../concordancia/';
    const DICIONARIO_DATA_BASE_PATH_LOCAL = '/dicionario/';

    // Este bloco cria as variáveis de estado para controlar a view atual e a letra ativa.
    let currentView = null;
    let letraAtivaSidebar = null;

    // Este bloco contém funções utilitárias para manipular a interface.
    function clearActiveNav() {
        document.querySelectorAll('nav .menu-opcoes li a.active').forEach(link => link.classList.remove('active'));    // Remove a classe 'active' de todos os links de navegação.
    }

    function setActiveNav(navElement) {
        if (navElement) navElement.classList.add('active');                                                            // Adiciona a classe 'active' a um link de navegação específico.
    }

    function adjustMainContentMargin() {
        const sidebarWidth = parseFloat(getComputedStyle(menuAlfabetico).width) || 60;
        const isSidebarVisible = currentView === 'concordance' || currentView === 'dictionary';
        const elementos = ['conteudoPrincipal', 'mensagem-inicial'].map(id => document.getElementById(id));
        elementos.forEach(el => {
            if (el) el.style.marginLeft = isSidebarVisible ? `${sidebarWidth}px` : '0';                                // Ajusta a margem esquerda do conteúdo principal para acomodar o menu lateral.
        });
    }

    function showInitialState() {
        if (inicial) {
            inicial.innerHTML = `
                <h2>Seja bem-vindo!</h2>
                <p>Escolha Concordância ou Dicionário no menu superior.</p>`;
            inicial.style.display = 'block';
        }
        if (conteudoPrincipal) conteudoPrincipal.innerHTML = '';
        if (menuAlfabetico) menuAlfabetico.style.display = 'none';
        clearActiveNav();
        currentView = null;
        letraAtivaSidebar = null;
        adjustMainContentMargin();
    }

    // Este bloco carrega dinamicamente o conteúdo de um arquivo HTML em um elemento alvo.
    async function loadView(viewPath, targetElement, onLoadedCallback) {
        if (!targetElement


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `script/dropdown_concordancia.js`

- Extensão: `.js`
- Tamanho: `13726 bytes`

- Funções detectadas (regex): `_closeAllSelects, _makeCustomSelect, _populateLivrosDropdown, findLivroByIdConfig, getOrdemDosLivrosConfig, getTestamentoDoLivroConfig, initConcordanciaDropdowns`

- Variáveis/const detectadas (regex): `TodosOption, bibliaConfig, initialTestamentoValue, itemsConteiner, livroEncontrado, livroExistente, livroSelectElement, livrosParaExibir, mapaLivros, nomeLower, nomeNormalizado, normalizado, onLivroChangeGlobalCallback, onTestamentoChangeGlobalCallback, opt, selectSelectedDisplay, selectedDisplay, testamentoSelectElement, valorSelecionado`

- Classes detectadas (regex): `Nenhuma detectada`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*================================================================================*/
/*               MÓDULO DE DROPDOWNS CUSTOMIZADOS (CONCORDÂNCIA)                  */
/*================================================================================*/
/* - Contém a configuração dos livros da Bíblia (ID, nome, testamento).           */
/* - Gerencia a criação e interatividade dos dropdowns de testamento e livro.     */
/* - Popula dinamicamente o dropdown de livros com base no testamento selecionado */
/*================================================================================*/

// Este bloco define a configuração estática de todos os livros da Bíblia.
const bibliaConfig = {
    livros: [
        // Antigo Testamento
        { id: 'gn', nome: 'Gênesis', testamento: 'Antigo Testamento' },
        { id: 'ex', nome: 'Êxodo', testamento: 'Antigo Testamento' },
        { id: 'lv', nome: 'Levítico', testamento: 'Antigo Testamento' },
        { id: 'nm', nome: 'Números', testamento: 'Antigo Testamento' },
        { id: 'dt', nome: 'Deuteronômio', testamento: 'Antigo Testamento' },
        { id: 'js', nome: 'Josué', testamento: 'Antigo Testamento' },
        { id: 'jz', nome: 'Juízes', testamento: 'Antigo Testamento' },
        { id: 'rt', nome: 'Rute', testamento: 'Antigo Testamento' },
        { id: '1sm', nome: '1 Samuel', testamento: 'Antigo Testamento' },
        { id: '2sm', nome: '2 Samuel', testamento: 'Antigo Testamento' },
        { id: '1rs', nome: '1 Reis', testamento: 'Antigo Testamento' },
        { id: '2rs', nome: '2 Reis', testamento: 'Antigo Testamento' },
        { id: '1cr', nome: '1 Crônicas', testamento: 'Antigo Testamento' },
        { id: '2cr', nome: '2 Crônicas', testamento: 'Antigo Testamento' },
        { id: 'ed', nome: 'Esdras', testamento: 'Antigo Testamento' },
        { id: 'ne', nome: 'Neemias', testamento: 'Antigo Testamento' },
        { id: 'et', nome: 'Ester', testamento: 'Antigo Testamento' },
        { id: 'jo', nome: 'Jó', testamento: 'Antigo Testamento' },
        { id: 'sl', nome: 'Salmos', testamento: 'Antigo Testamento' },
        { id: 'pv', nome: 'Provérbios', testamento: 'Antigo Testamento' },
        { id: 'ec', nome: 'Eclesiastes', testamento: 'Antigo Testamento' },
        { id: 'ct', nome: 'Cantares', testamento: 'Antigo Testamento' },
        { id: 'is', nome: 'Isaías', testamento: 'Antigo Testamento' },
        { id: 'jr', nome: 'Jeremias', testamento: 'Antigo Testamento' },
        { id: 'lm', nome: 'Lamentações', testamento: 'Antigo Testamento' },
        { id: 'ez', nome: 'Ezequiel', testamento: 'Antigo Testamento' },
        { id: 'dn', nome: 'Daniel', testamento: 'Antigo Testamento' },
        { id: 'os', nome: 'Oséias', testamento: 'Antigo Testamento' },
        { id: 'jl', nome: 'Joel', testamento: 'Antigo Testamento' },
        { id: 'am', nome: 'Amós', testamento: 'Antigo Testamento' },
        { id: 'ob', nome: 'Obadias', testamento: 'Antigo Testamento' },
        { id: 'jn', nome: 'Jonas', testamento: 'Antigo Testamento' },
        { id: 'mq', nome: 'Miquéias', testamento: 'Antigo Testamento' },
        { id: 'na', nome: 'Naum', testamento: 'Antigo Testamento' },
        { id: 'hc', nome: 'Habacuque', testamento: 'Antigo Testamento' },
        { id: 'sf', nome: 'Sofonias', testamento: 'Antigo Testamento' },
        { id: 'ag', nome: 'Ageu', testamento: 'Antigo Testamento' },
        { id: 'zc', nome: 'Zacarias', testamento: 'Antigo Testamento' },
        { id: 'ml', nome: 'Malaquias', testamento: 'Antigo Testamento' },
        // Novo Testamento
        { id: 'mt', nome: 'Mateus', testamento: 'Novo Testamento' },
        { id: 'mc', nome: 'Marcos', testamento: 'Novo Testamento' },
        { id: 'lc', nome: 'Lucas', testamento: 'Novo Testamento' },
        { id: 'joa', nome: 'João', testamento: 'Novo Testamento' },
        { id: 'at', nome: 'Atos', testamento: 'Novo Testamento' },
        { id: 'rm', nome:


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `script/gerenciador_concordancia.js`

- Extensão: `.js`
- Tamanho: `15846 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `allData, antigoTestamento, batch, batchPromises, batchResults, batchSize, cacheKey, data, endIndex, fallbackData, fileName, filteredResults, firstLetter, hasMore, i, isAntigoTestamento, isNovoTestamento, jsonData, letterFiles, letterLower, livroLower, loadingPromise, matchesBook, matchesTestament, matchesText, matchesWord, nomeLivro, novoTestamento, pageData, palavrasPorLetra, palavrasUnicas, primeiraLetra, response, result, resultados, resultadosCompletos, searchLower, startIndex, testamento, wordEntries`

- Classes detectadas (regex): `DataManager`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*============================================================================= =*/
/*              GERENCIADOR DE DADOS DA CONCORDÂNCIA (DATA MANAGER)              */
/*===============================================================================*/
/* - Classe DataManager para otimizar o carregamento de grandes volumes de dados.*/
/* - Implementa cache inteligente para arquivos JSON já carregados.              */
/* - Gerencia o carregamento sob demanda com paginação.                          */
/*===============================================================================*/

class DataManager {
    constructor() {
        this.cache = new Map();
        this.loadingPromises = new Map();
        this.listaLetras = null;
        this.currentLetter = null;
        this.currentPage = 0;
        this.itemsPerPage = 50;
        this.totalItems = 0;
        this.allData = [];
        this.filteredData = [];

        // Nova propriedade para integração com o índice de busca
        this.searchIndex = window.searchIndex;
    }

    async loadLetterList() {
        if (this.listaLetras) return this.listaLetras;

        try {
            const response = await fetch('../concordancia/lista_letras.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.listaLetras = await response.json();
            return this.listaLetras;
        } catch (error) {
            console.error('Erro ao carregar lista de letras:', error);
            this.listaLetras = {
                "a": ["a1", "a2", "a3", "a4"]
            };
            return this.listaLetras;
        }
    }

    async loadLetterData(letter, page = 0, forceReload = false) {
        const letterLower = letter.toLowerCase();
        const cacheKey = `${letterLower}_${page}`;

        if (this.loadingPromises.has(cacheKey)) {
            return await this.loadingPromises.get(cacheKey);
        }

        if (!forceReload && this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        const loadingPromise = this._loadLetterDataInternal(letterLower, page);
        this.loadingPromises.set(cacheKey, loadingPromise);

        try {
            const result = await loadingPromise;
            this.cache.set(cacheKey, result);
            return result;
        } finally {
            this.loadingPromises.delete(cacheKey);
        }
    }

    async _loadLetterDataInternal(letter, page) {
        try {
            await this.loadLetterList();
            
            const letterFiles = this.listaLetras[letter] || [];
            if (letterFiles.length === 0) {
                return { data: [], hasMore: false, total: 0 };
            }

            if (this.currentLetter !== letter) {
                this.currentLetter = letter;
                this.currentPage = 0;
                this.allData = [];
                await this._loadAllLetterData(letter, letterFiles);
            }

            const startIndex = page * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            const pageData = this.allData.slice(startIndex, endIndex);
            const hasMore = endIndex < this.allData.length;

            return {
                data: pageData,
                hasMore: hasMore,
                total: this.allData.length,
                currentPage: page
            };

        } catch (error) {
            console.error(`Erro ao carregar dados da letra ${letter}:`, error);
            return this._getFallbackData(letter);
        }
    }

    async _loadAllLetterData(letter, letterFiles) {
        const batchSize = 5;
        const allData = [];

        for (let i = 0; i < letterFiles.length; i += batchSize) {
            const batch = letterFiles.slice(i, i + batchSize);
            const batchPromises = batch.map(fileName


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `script/gerenciador_concordanciabk.js`

- Extensão: `.js`
- Tamanho: `11613 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `allData, batch, batchPromises, batchResults, batchSize, cacheKey, data, endIndex, fallbackData, filteredResults, firstLetter, hasMore, i, letterFiles, letterLower, loadingPromise, matchesBook, matchesTestament, matchesWord, pageData, response, result, searchLower, startIndex`

- Classes detectadas (regex): `DataManager`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*============================================================================= =*/
/*              GERENCIADOR DE DADOS DA CONCORDÂNCIA (DATA MANAGER)              */
/*===============================================================================*/
/* - Classe DataManager para otimizar o carregamento de grandes volumes de dados.*/
/* - Implementa cache inteligente para arquivos JSON já carregados.              */
/* - Gerencia o carregamento sob demanda com paginação.                          */
/*===============================================================================*/

// Este bloco gerenciador de dados otimizado para grandes volumes de concordância.
class DataManager {
    constructor() {                                                                // Construtor da classe DataManager.
        this.cache = new Map();                                                    // Armazena em cache os dados de páginas já carregadas (chave: 'letra_pagina').
        this.loadingPromises = new Map();                                          // Evita requisições duplicadas enquanto uma já está em andamento.
        this.listaLetras = null;                                                   // Cache para o arquivo de índice `lista_letras.json`.
        this.currentLetter = null;                                                 // Letra atualmente em foco.
        this.currentPage = 0;                                                      // Página atual carregada.
        this.itemsPerPage = 50;                                                    // Define o número de itens a carregar por página.
        this.totalItems = 0;                                                       // Total de itens para a letra atual.
        this.allData = [];                                                         // Array com todos os dados da letra atual.
        this.filteredData = [];                                                    // Array para dados filtrados (se necessário).
    }

    // Este bloco carrega o arquivo de índice `lista_letras.json` que mapeia letras para arquivos.
    async loadLetterList() {
        if (this.listaLetras) return this.listaLetras;                             // Retorna do cache se já estiver carregado.

        try {
            const response = await fetch('../concordancia/lista_letras.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.listaLetras = await response.json();                              // Armazena o índice no cache da instância.
            return this.listaLetras;
        } catch (error) {
            console.error('Erro ao carregar lista de letras:', error);
            this.listaLetras = {                                                   // Define um fallback com dados de exemplo em caso de falha.
                "a": ["a1", "a2", "a3", "a4"]
            };
            return this.listaLetras;
        }
    }

    // Este bloco carrega os dados de uma letra específica com suporte a paginação.
    async loadLetterData(letter, page = 0, forceReload = false) {
        const letterLower = letter.toLowerCase();
        const cacheKey = `${letterLower}_${page}`;                                 // Cria uma chave de cache única para a letra e página.

        // Verifica se já existe uma promessa de carregamento para esta chave, evitando requisições concorrentes.
        if (this.loadingPromises.has(cacheKey)) {
            return await this.loadingPromises.get(cacheKey);
        }

        if (!forceReload && this.cache.has(cacheKey)) {                            // Verifica o cache principal.
            return this.cache.get(cacheKey);
        }

        const loadingPromise = this._loadLetterDataInternal(letterLower, page);    // Cria e armazena uma nova promessa de carregamento.
        this.loadingPromises.set(cacheKey, loadingPromise);

  


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `script/gerenciador_concordancia_novo.js`

- Extensão: `.js`
- Tamanho: `5976 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `allData, cacheKey, data, end, file, files, filteredResults, firstLetter, letter, letterLower, matchesBook, matchesTestament, matchesWord, matchingConcordances, pageData, response, result, results, searchLower, start`

- Classes detectadas (regex): `DataManager`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*===============================================================================
/*              GERENCIADOR DE DADOS DA CONCORDÂNCIA (DATA MANAGER)              
/*===============================================================================*/

class DataManager {
    constructor() {
        this.cache = new Map();
        this.loadingPromises = new Map();
        this.listaLetras = null;
        this.currentLetter = null;
        this.currentPage = 0;
        this.itemsPerPage = 50;
        this.totalItems = 0;
        this.allData = [];
        this.filteredData = [];
        this.searchCache = new Map();
    }

    async loadLetterList() {
        if (this.listaLetras) return this.listaLetras;

        try {
            const response = await fetch('../concordancia/lista_letras.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            this.listaLetras = await response.json();
            return this.listaLetras;
        } catch (error) {
            console.error('Erro ao carregar lista de letras:', error);
            this.listaLetras = { "a": ["a1", "a2", "a3", "a4"] };
            return this.listaLetras;
        }
    }

    async loadLetterData(letter, page = 0, forceReload = false) {
        const letterLower = letter.toLowerCase();
        const cacheKey = `${letterLower}_${page}`;

        if (this.loadingPromises.has(cacheKey)) {
            return await this.loadingPromises.get(cacheKey);
        }

        if (!forceReload && this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            await this.loadLetterList();
            const files = this.listaLetras[letterLower] || [];
            const allData = [];

            for (const file of files) {
                try {
                    const response = await fetch(`../concordancia/${letterLower}/${file}.json`);
                    if (!response.ok) continue;
                    
                    const data = await response.json();
                    if (data[letterLower]) {
                        allData.push(...data[letterLower]);
                    }
                } catch (fileError) {
                    console.warn(`Erro ao carregar arquivo ${file}:`, fileError);
                }
            }

            this.allData = allData;
            this.currentLetter = letterLower;
            this.totalItems = allData.length;

            const start = page * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            const pageData = allData.slice(start, end);

            const result = {
                data: pageData,
                total: allData.length,
                hasMore: end < allData.length
            };

            this.cache.set(cacheKey, result);
            this.loadingPromises.delete(cacheKey);

            return result;

        } catch (error) {
            console.error('Erro ao carregar dados da letra:', error);
            this.loadingPromises.delete(cacheKey);
            throw error;
        }
    }

    // Método de busca prioritária
    async searchPriority(searchTerm, filters = {}) {
        const searchLower = searchTerm.toLowerCase();
        const cacheKey = `${searchLower}_${filters.testamento || 'todos'}_${filters.livro || 'todos'}`;
        
        if (this.searchCache.has(cacheKey)) {
            return this.searchCache.get(cacheKey);
        }

        try {
            const letter = searchLower.charAt(0);
            await this.loadLetterData(letter);

            const results = this.allData.map(item => {
                if (!this._matchesTestamentFilter(item, filters.testamento) ||
                    !this._matchesBookFilter(item, filters.livro)) {
                    return null;
                }

                const matchingConcordances = item.concordancias?.filter(c => 


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `script/harpa_cantor.js`

- Extensão: `.js`
- Tamanho: `6126 bytes`

- Funções detectadas (regex): `criarBotoesFaixa, exibirGradeDeHinos, exibirHino, selecionarHinario`

- Variáveis/const detectadas (regex): `HINARIOS, TAMANHO_FAIXA, botoesFaixaConteiner, botoesHinosConteiner, btn, btnCantor, btnFaixa, btnHarpa, cleanParagraph, data, fim, hinoExibidoConteiner, hinosFaixa, i, index, indexPath, inicio, isCoro, letraHtml, response, telaInicial, themeStyle, versos`

- Classes detectadas (regex): `Nenhuma detectada`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

// js/harpa_cantor.js

document.addEventListener('DOMContentLoaded', () => {
    const btnHarpa = document.getElementById('btnHarpa');
    const btnCantor = document.getElementById('btnCantor');
    const telaInicial = document.getElementById('tela-inicial');
    const botoesFaixaConteiner = document.getElementById('botoes-faixa-hinos');
    const botoesHinosConteiner = document.getElementById('botoes-hinos');
    const hinoExibidoConteiner = document.getElementById('hino-exibido');
    const themeStyle = document.getElementById('theme-style');

    window.activeHinario = null;
    window.activeHinoData = null;

    const TAMANHO_FAIXA = 50;

    const HINARIOS = {
        harpa: {
            nome: 'Harpa Cristã',
            total: 640,
            pasta: '../harpacrista',
            css: '../css/harpa_crista.css'
        },
        cantor: {
            nome: 'Cantor Cristão',
            total: 581,
            pasta: '../cantorcristao',
            css: '../css/cantor_cristao_novo.css'
        }
    };

    function selecionarHinario(hinario) {
        window.activeHinario = hinario;
        window.activeHinoData = null;
        telaInicial.style.display = 'none';
        botoesFaixaConteiner.innerHTML = '';
        botoesHinosConteiner.innerHTML = ''; // <-- Limpa sempre!
        hinoExibidoConteiner.innerHTML = '';
        themeStyle.href = hinario.css;
        criarBotoesFaixa(hinario);
        // NÃO chame exibirGradeDeHinos aqui!
    }

    function criarBotoesFaixa(hinario) {
        for (let i = 1; i <= hinario.total; i += TAMANHO_FAIXA) {
            const inicio = i;
            const fim = Math.min(i + TAMANHO_FAIXA - 1, hinario.total);
            
            const btnFaixa = document.createElement('button');
            btnFaixa.className = 'botao-faixa';
            btnFaixa.textContent = `${inicio} - ${fim}`;
            btnFaixa.addEventListener('click', (e) => {
                // Remove a classe 'active' de todos os outros botões de faixa
                document.querySelectorAll('.botao-faixa.active').forEach(b => b.classList.remove('active'));
                // Adiciona a classe 'active' ao botão clicado
                e.currentTarget.classList.add('active');
                
                // Gera a grade de hinos para a faixa selecionada
                exibirGradeDeHinos(inicio, fim);
            });
            botoesFaixaConteiner.appendChild(btnFaixa);
        }
        // Adiciona a classe 'active' ao conteiner após criar os botões
        botoesFaixaConteiner.classList.add('active');
    }
    
    async function exibirGradeDeHinos(inicio, fim) {
        botoesHinosConteiner.innerHTML = '';
        hinoExibidoConteiner.innerHTML = '';

        // Caminho do indexador
        const indexPath = window.activeHinario.nome === 'Harpa Cristã'
            ? '../harpacrista/harpacrista_index.json'
            : '../cantorcristao/cantorcristao_index.json';

        try {
            const response = await fetch(indexPath);
            if (!response.ok) throw new Error('Arquivo não encontrado: ' + indexPath);
            const index = await response.json();

            // Filtra os hinos da faixa
            const hinosFaixa = index.filter(h => h.numero >= inicio && h.numero <= fim);

            hinosFaixa.forEach(hino => {
                const btn = document.createElement('button');
                btn.className = 'botao-capitulo';
                btn.innerHTML = `
                    <span class="hino-numero">${hino.numero}</span>
                    <span class="hino-nome">${hino.titulo}</span>
                `;
                btn.addEventListener('click', () => {
                    // Remove 'active' de todos os botões de hino
                    document.querySelectorAll('.botao-capitulo.active').forEach(b => b.classList.remove('active'));
                    // Adiciona 'active' ao botão clicado



... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `script/menu_dicionarioconcordancia copy.js`

- Extensão: `.js`
- Tamanho: `5144 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `conteudoPrincipal`

- Classes detectadas (regex): `MainApp`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*===============================================================================
/*              SCRIPT PRINCIPAL DE NAVEGAÇÃO E INICIALIZAÇÃO (APP)              
/*===============================================================================*/

class MainApp {
    constructor() {
        window.dataManager = new DataManager();
        window.concordanciaOptimized = new ConcordanciaOptimized();
        window.dicionario = new Dicionario();

        this.currentSection = 'concordancia';
        this.initializeElements();
        this.bindEvents();
        this.initializeApp();
    }

    initializeElements() {
        this.elements = {
            menuPrincipal: document.getElementById('menu-principal'),
            concordanciaBtn: document.getElementById('concordancia'),
            dicionarioBtn: document.getElementById('dicionario'),
            sobreBtn: document.getElementById('sobre'),
            mensagemInicial: document.getElementById('mensagem-inicial'),
            secaoConcordancia: document.getElementById('secao-concordancia'),
            secaoDicionario: document.getElementById('secao-dicionario'),
            secaoSobre: document.getElementById('secao-sobre'),
            menuAlfabetico: document.querySelector('.menu-alfabetico'),
            tituloMenu: document.querySelector('.titulo-menu'),
            menuOpcoes: document.querySelector('.menu-opcoes'),
            nav: document.querySelector('nav')
        };
    }

    bindEvents() {
        this.elements.concordanciaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.showSection('concordancia');
        });

        this.elements.dicionarioBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.showSection('dicionario');
        });

        this.elements.sobreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.showSection('sobre');
        });
    }

    initializeApp() {
        this.elements.menuAlfabetico.style.display = 'none';
        this.elements.tituloMenu.style.display = 'none';
        document.querySelector('#conteudo-principal').style.marginLeft = '0px';

        console.log('📖 Concordância e Dicionário Bíblico inicializado');
        console.log('⌨️  Atalhos: Ctrl+1 (Concordância), Ctrl+2 (Dicionário), Ctrl+3 (Sobre)');

        // 🚀 Construir índice de busca imediatamente
        if (window.searchIndex && typeof window.searchIndex.buildIndex === 'function') {
            window.searchIndex.buildIndex()
                .then(() => console.log('✅ Índice de busca pronto para uso'))
                .catch(console.error);
        }
    }

    showSection(sectionName) {
        document.querySelectorAll('.menu-opcoes a').forEach(btn => btn.classList.remove('active'));

        this.elements.mensagemInicial.style.display = 'none';
        this.elements.secaoConcordancia.classList.add('secao-inativa');
        this.elements.secaoDicionario.classList.add('secao-inativa');
        this.elements.secaoSobre.classList.add('secao-inativa');

        switch (sectionName) {
            case 'concordancia':
                this.elements.secaoConcordancia.classList.remove('secao-inativa');
                this.elements.secaoConcordancia.classList.add('secao-ativa');
                this.elements.concordanciaBtn.classList.add('active');
                this.elements.menuAlfabetico.style.display = 'block';
                this.currentSection = 'concordancia';
                break;

            case 'dicionario':
                this.elements.secaoDicionario.classList.remove('secao-inativa');
                this.elements.secaoDicionario.classList.add('secao-ativa');
                this.elements.dicionarioBtn.classList.add('active');
                this.elements.menuAlfabetico.style.display = 'block';
                this.currentSection = 'dicionario';
             


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `script/menu_dicionarioconcordancia.js`

- Extensão: `.js`
- Tamanho: `7314 bytes`

- Funções detectadas (regex): `definirClasseModulo`

- Variáveis/const detectadas (regex): `conteudoPrincipal, path`

- Classes detectadas (regex): `MainApp`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*===============================================================================
/*              SCRIPT PRINCIPAL DE NAVEGAÃ‡ÃƒO E INICIALIZAÃ‡ÃƒO (APP)              
/* menu_dicioarioconcordancia.js */
/*===============================================================================*/

class MainApp {
    constructor() {
        window.dataManager = new DataManager();
        window.concordanciaOptimized = new ConcordanciaOptimized();
        window.dicionario = new Dicionario();

        this.currentSection = 'concordancia';
        this.initializeElements();
        this.bindEvents();
        this.initializeApp();
        this.setModuleBodyClass(this.currentSection); // Única chamada no construtor
    }

    /**
     * Controla as classes do body para aplicar estilos específicos por módulo
     * @param {string} modulo - Nome do módulo: 'concordancia' ou 'dicionario'
     */
    setModuleBodyClass(modulo) {
        document.body.classList.remove('modulo-concordancia', 'modulo-dicionario', 'modulo-sobre');
        if (modulo === 'concordancia' || modulo === 'dicionario' || modulo === 'sobre') {
            document.body.classList.add(`modulo-${modulo}`);
            console.log(`Classe aplicada: modulo-${modulo}`);
        }
    }

    /**
     * Método modificado para incluir controle de classes do body
     */
    setCurrentSection(section) {
        this.currentSection = section;
        this.setModuleBodyClass(section);
        this.showSection(section);
    }

    initializeElements() {
        this.elements = {
            menuPrincipal: document.getElementById('menu-principal'),
            concordanciaBtn: document.getElementById('concordancia'),
            dicionarioBtn: document.getElementById('dicionario'),
            sobreBtn: document.getElementById('sobre'),
            mensagemInicial: document.getElementById('mensagem-inicial'),
            secaoConcordancia: document.getElementById('secao-concordancia'),
            secaoDicionario: document.getElementById('secao-dicionario'),
            secaoSobre: document.getElementById('secao-sobre'),
            menuAlfabetico: document.querySelector('.menu-alfabetico'),
            tituloMenu: document.querySelector('.titulo-menu'),
            menuOpcoes: document.querySelector('.menu-opcoes'),
            nav: document.querySelector('nav')
        };
    }

    bindEvents() {
        this.elements.concordanciaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.showSection('concordancia');
        });

        this.elements.dicionarioBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.showSection('dicionario');
        });

        this.elements.sobreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.showSection('sobre');
        });
    }

    initializeApp() {
        this.elements.menuAlfabetico.style.display = 'none';
        this.elements.tituloMenu.style.display = 'none';
        document.querySelector('#conteudo-principal').style.marginLeft = '0px';

        console.log('ðŸ“– ConcordÃ¢ncia e DicionÃ¡rio BÃ­blico inicializado');
        console.log('âŒ¨ï¸  Atalhos: Ctrl+1 (ConcordÃ¢ncia), Ctrl+2 (DicionÃ¡rio), Ctrl+3 (Sobre)');

        // ðŸš€ Construir Ã­ndice de busca imediatamente
        if (window.searchIndex && typeof window.searchIndex.buildIndex === 'function') {
            window.searchIndex.buildIndex()
                .then(() => console.log('âœ… Ãndice de busca pronto para uso'))
                .catch(console.error);
        }
    }

    showSection(sectionName) {
        document.querySelectorAll('.menu-opcoes a').forEach(btn => btn.classList.remove('active'));

        this.elements.mensagemInicial.style.display = 'none';
        this.elements.secaoConcordancia.classList.add('secao-inativa');
        this.elements.secaoDicionario.classList.


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `script/menu_dicionarioconcordanciabk.js`

- Extensão: `.js`
- Tamanho: `13014 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `conteudoPrincipal, loadTime, memory, memoryInfo, stats, titles`

- Classes detectadas (regex): `MainApp`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*===============================================================================*/
/*              SCRIPT PRINCIPAL DE NAVEGAÇÃO E INICIALIZAÇÃO (APP)              */
/*===============================================================================*/
/*    - Gerencia a navegação entre as seções: Concordância, Dicionário e Sobre.  */
/*    - Instancia e inicializa os módulos principais (DataManager, etc.).        */
/*    - Controla a visibilidade das seções e do menu alfabético.                 */
/*===============================================================================*/

class MainApp {
    // Este bloco e o Construtor da classe MainApp.
    constructor() {                                                                // Inicializa os componentes principais da aplicação, centralizando o controle.
        window.dataManager = new DataManager();                                    // Instancia o gerenciador de dados da concordância.
        window.concordanciaOptimized = new ConcordanciaOptimized();                // Instancia o controlador da interface da concordância.
        window.dicionario = new Dicionario();                                      // Instancia o controlador do dicionário.

        this.currentSection = 'concordancia';                                      // Define a seção inicial como 'concordancia'.
        this.initializeElements();                                                 // Mapeia os elementos do DOM.
        this.bindEvents();                                                         // Vincula os eventos de navegação.
        this.initializeApp();                                                      // Configura o estado inicial da aplicação.
    }

    //Este bloco mapeia os elementos do DOM para a propriedade 'elements' para fácil acesso.
    initializeElements() {
        this.elements = {
            menuPrincipal: document.getElementById('menu-principal'),              // Botão para o menu principal.
            concordanciaBtn: document.getElementById('concordancia'),              // Botão para a seção de Concordância.
            dicionarioBtn: document.getElementById('dicionario'),                  // Botão para a seção de Dicionário.
            sobreBtn: document.getElementById('sobre'),                            // Botão para a seção Sobre.
            mensagemInicial: document.getElementById('mensagem-inicial'),          // Conteainer da mensagem inicial.
            secaoConcordancia: document.getElementById('secao-concordancia'),      // Elemento da seção de Concordância.
            secaoDicionario: document.getElementById('secao-dicionario'),          // Elemento da seção de Dicionário.
            secaoSobre: document.getElementById('secao-sobre'),                    // Elemento da seção Sobre.
            menuAlfabetico: document.querySelector('.menu-alfabetico'),            // Menu lateral com as letras do alfabeto.
            tituloMenu: document.querySelector('.titulo-menu'),
            menuOpcoes: document.querySelector('.menu-opcoes'),
            nav: document.querySelector('nav')
        };
    }

    // Este bloco vincula todos os eventos necessários para a navegação principal.
    bindEvents() {                                                                 // Adiciona evento de clique para o botão 'Concordância'.
        this.elements.concordanciaBtn.addEventListener('click', (e) => {
            e.preventDefault();                                                    // Previne a ação padrão do link.
            this.showSection('concordancia');                                      // Mostra a seção de concordância.
        });

        // Este bloco adiciona evento de clique para o botão 'Dicionário'.
        this.elements.dicionarioBtn.addEventListener('click', (e) => {
            e.preventDefault();                                                    // Previne a ação padrão do link.
            this.show


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `script/slide_harpacantor.js`

- Extensão: `.js`
- Tamanho: `6958 bytes`

- Funções detectadas (regex): `abrirJanelaSlideHino, escreverHtmlNaJanela, estrofeAnterior, exibirEstrofe, gerarHtmlJanelaHino, inicializarSlideHino, obterTotalHinos, proximaEstrofe`

- Variáveis/const detectadas (regex): `HINARIOS_CONFIG, altura, btnAnterior, btnProximo, btnSlide, conteudoEl, estrofeTexto, estrofes, estrofesArray, hino, hinoAtivo, htmlConteudo, indiceAtual, isCoro, janela, largura, progressoEl, textoFormatado, textoLimpo, tituloEl`

- Classes detectadas (regex): `Nenhuma detectada`

- Ocorrências relacionadas à marca d'água (trechos):

  - `marcadagua` → .../css/slide_harpacantor.css"> </head> <body>     <div id="marcadagua"></div>          <div id="slide-conteiner">...

  - `marcaDagua` → .../css/slide_harpacantor.css"> </head> <body>     <div id="marcadagua"></div>          <div id="slide-conteiner">...


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

// js/slide_harpacantor.js
console.log("[slide_harpacantor.js] Script combinado iniciado.");

// ========================================
// CONFIGURAÇÃO DE DADOS
// ========================================
const HINARIOS_CONFIG = {
    harpa: { total: 640 },
    cantor: { total: 581 }
};

window.HINARIOS_CONFIG = HINARIOS_CONFIG;

// ========================================
// FUNÇÕES UTILITÁRIAS
// ========================================
function obterTotalHinos(tipoHinario) {
    if (window.HINARIOS_CONFIG && window.HINARIOS_CONFIG[tipoHinario]) {
        return window.HINARIOS_CONFIG[tipoHinario].total;
    }
    return 0;
}

window.obterTotalHinos = obterTotalHinos;

// ========================================
// FUNÇÕES DE JANELA
// ========================================
function abrirJanelaSlideHino(hinoData) {
    console.log(`[Janela] Abrindo slide para: Hino ${hinoData.numero} - ${hinoData.titulo}`);

    if (!hinoData) {
        alert("Nenhum hino selecionado para exibir no slide.");
        return;
    }
    
    if (window.janelaSlide && !window.janelaSlide.closed) {
        window.janelaSlide.focus();
        return;
    }

    const largura = window.screen.availWidth;
    const altura = window.screen.availHeight;
    const janela = window.open("", "JanelaSlideHino", `width=${largura},height=${altura},menubar=no,toolbar=no,location=no,status=no`);
    
    if (!janela) {
        alert("Não foi possível abrir a janela do slide. Verifique o bloqueador de pop-ups.");
        return;
    }

    // Verificação extra para garantir que a função existe
    if (typeof window.gerarHtmlJanelaHino === 'function') {
        const htmlConteudo = window.gerarHtmlJanelaHino(hinoData);
        window.escreverHtmlNaJanela(janela, htmlConteudo);
    } else {
        console.error("Função gerarHtmlJanelaHino não está disponível");
        janela.document.write("<h1>Erro: Função geradora não disponível</h1>");
        janela.document.close();
    }
    
    window.janelaSlide = janela;
}

window.abrirJanelaSlideHino = abrirJanelaSlideHino;

// ========================================
// FUNÇÕES DE INTERFACE
// ========================================
function gerarHtmlJanelaHino(hinoData) {
    const estrofesArray = hinoData.letra
        .split(/\n{2,}/)
        .filter(e => e.trim() !== '')
        .map(estrofe => estrofe.trim());

    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Slide - ${hinoData.titulo}</title>
    <link rel="stylesheet" href="../css/slide_harpacantor.css">
</head>
<body>
    <div id="marcadagua"></div>
    
    <div id="slide-conteiner">
        <header id="slide-header">
            <h1 id="slide-titulo"></h1>
            <p id="slide-progresso"></p>
        </header>
        <main id="slide-conteudo"></main>
    </div>
    <div id="controles">
        <button id="btn-anterior">‹ Anterior</button>
        <button id="btn-proximo">Próximo ›</button>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const tituloEl = document.getElementById('slide-titulo');
            const progressoEl = document.getElementById('slide-progresso');
            const conteudoEl = document.getElementById('slide-conteudo');
            const btnAnterior = document.getElementById('btn-anterior');
            const btnProximo = document.getElementById('btn-proximo');
            
            const hino = ${JSON.stringify(hinoData)};
            const estrofes = ${JSON.stringify(estrofesArray)};
            let indiceAtual = 0;

            function exibirEstrofe() {
                if (estrofes.length === 0) {
                    conteudoEl.innerHTML = "<p>Nenhuma estrofe encontrada</p>";
                    return;
                }
                
                const estrofeTexto = estrofes[indiceAtual];
           


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `script/slide_harpacantor_coordenador.js`

- Extensão: `.js`
- Tamanho: `775 bytes`

- Funções detectadas (regex): `inicializarSlideHino`

- Variáveis/const detectadas (regex): `btnSlide, hinoAtivo`

- Classes detectadas (regex): `Nenhuma detectada`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

console.log("[slide_harpacantor_coordenador.js] Script iniciado.");

function inicializarSlideHino() {
    const btnSlide = document.getElementById('btnSlide');

    if (btnSlide) {
        btnSlide.addEventListener('click', () => {
            console.log("[Coordenador] Botão 'Slide' clicado.");

            const hinoAtivo = window.activeHinoData;

            if (hinoAtivo) {
                window.abrirJanelaSlideHino(hinoAtivo);
            } else {
                alert("Por favor, selecione um hino primeiro para exibi-lo no slide.");
            }
        });
    } else {
        console.warn("[Coordenador] Botão 'Slide' com id='btnSlide' não encontrado.");
    }
}

document.addEventListener('DOMContentLoaded', inicializarSlideHino);

```
---

### `script/slide_harpacantor_dados.js`

- Extensão: `.js`
- Tamanho: `195 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `HINARIOS_CONFIG`

- Classes detectadas (regex): `Nenhuma detectada`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

console.log("[slide_harpacantor_dados.js] Script iniciado.");

const HINARIOS_CONFIG = {
    harpa: { total: 640 },
    cantor: { total: 581 }
};

window.HINARIOS_CONFIG = HINARIOS_CONFIG;

```
---

### `script/slide_harpacantor_interface.js`

- Extensão: `.js`
- Tamanho: `8856 bytes`

- Funções detectadas (regex): `escreverHtmlNaJanela, estrofeAnterior, exibirEstrofe, gerarHtmlJanelaHino, proximaEstrofe`

- Variáveis/const detectadas (regex): `btnAnterior, btnProximo, conteudoEl, estrofeTexto, estrofes, estrofesArray, hino, indiceAtual, isCoro, progressoEl, textoFormatado, textoLimpo, tituloEl`

- Classes detectadas (regex): `Nenhuma detectada`

- Ocorrências relacionadas à marca d'água (trechos):

  - `marcadagua` → ...;             opacity: 0.6;         }                  #marcadagua {             position: fixed;             top:...

  - `marcaDagua` → ...;             opacity: 0.6;         }                  #marcadagua {             position: fixed;             top:...


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

console.log("[slide_harpacantor_interface.js] Script iniciado.");

function gerarHtmlJanelaHino(hinoData) {
    const estrofesArray = hinoData.letra
        .split(/\n{2,}/)
        .filter(e => e.trim() !== '')
        .map(estrofe => estrofe.trim());

    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Slide - ${hinoData.titulo}</title>
    <style>
        /* ESTILOS INCORPORADOS PARA GARANTIR CARREGAMENTO */
        html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            font-family: sans-serif;
            background-color: #181818;
            color: white;
            position: relative;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            box-sizing: border-box;
        }
        
        body::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(10, 10, 10, 0.85);
            z-index: 1;
        }
        
        #slide-conteiner {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            height: 100vh;
            width: 100%;
            box-sizing: border-box;
            position: relative;
            z-index: 2;
        }
        
        #slide-header {
            background-color: rgba(0, 0, 0, 0.6);
            width: 100%;
            padding: 0.75rem 0;
            text-align: center;
            font-size: clamp(1.2rem, 3vw, 2rem);
            font-weight: bold;
            font-style: italic;
            text-transform: uppercase;
            margin: 0;
            box-sizing: border-box;
            flex-shrink: 0;
            z-index: 3;
        }
        
        #slide-titulo {
            color: #f1c40f;
            margin: 0;
        }
        
        #slide-progresso {
            color: #cccccc;
            font-size: clamp(0.9rem, 1.5vw, 1.5rem);
            margin-top: 0.5vh;
        }
        
        #slide-conteudo {
            width: 95%;
            text-align: center;
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 3;
            padding: 1rem;
            box-sizing: border-box;
            overflow-y: auto;
        }
        
        .estrofe-texto {
            text-align: center;
            font-size: clamp(2rem, 2.82vw, 5rem);
            max-width: 100%;
            overflow-wrap: break-word;
            line-height: 1.3;
            font-weight: bold;
            font-style: italic;
            font-family: "Arial Black", Gadget, sans-serif;
            z-index: 3;
            padding: 1.5rem;
            background-color: rgba(0, 0, 0, 0.4);
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
            animation: fadeIn 0.5s ease-out;
        }
        
        .estrofe-texto.coro {
            color: #5df565;
            font-style: italic;
        }
        
        #controles {
            width: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            padding: 0.5rem 1.2rem;
            box-sizing: border-box;
            flex-shrink: 0;
            z-index: 3;
        }
        
        #btn-anterior, #btn-proximo {
            border: none;
            padding: 0.6rem 1.5rem;
            font-size: clamp(0.9rem, 1.2vw, 1.2rem);
            font-weight: bold;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s ease;
     


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `script/slide_harpacantor_janela.js`

- Extensão: `.js`
- Tamanho: `1396 bytes`

- Funções detectadas (regex): `abrirJanelaSlideHino`

- Variáveis/const detectadas (regex): `altura, htmlConteudo, janela, largura`

- Classes detectadas (regex): `Nenhuma detectada`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

console.log("[slide_harpacantor_janela.js] Script iniciado.");

function abrirJanelaSlideHino(hinoData) {
    console.log(`[Janela] Abrindo slide para: Hino ${hinoData.numero} - ${hinoData.titulo}`);

    if (!hinoData) {
        alert("Nenhum hino selecionado para exibir no slide.");
        return;
    }
    
    if (window.janelaSlide && !window.janelaSlide.closed) {
        window.janelaSlide.focus();
        return;
    }

    const largura = window.screen.availWidth;
    const altura = window.screen.availHeight;
    const janela = window.open("", "JanelaSlideHino", `width=${largura},height=${altura},menubar=no,toolbar=no,location=no,status=no`);
    
    if (!janela) {
        alert("Não foi possível abrir a janela do slide. Verifique o bloqueador de pop-ups.");
        return;
    }

    // Verificação extra para garantir que a função existe
    if (typeof window.gerarHtmlJanelaHino === 'function') {
        const htmlConteudo = window.gerarHtmlJanelaHino(hinoData);
        window.escreverHtmlNaJanela(janela, htmlConteudo);
    } else {
        console.error("Função gerarHtmlJanelaHino não está disponível");
        janela.document.write("<h1>Erro: Função geradora não disponível</h1>");
        janela.document.close();
    }
    
    window.janelaSlide = janela;
}

window.abrirJanelaSlideHino = abrirJanelaSlideHino;

```
---

### `script/slide_harpacantor_utils.js`

- Extensão: `.js`
- Tamanho: `307 bytes`

- Funções detectadas (regex): `obterTotalHinos`

- Variáveis/const detectadas (regex): `Nenhuma detectada`

- Classes detectadas (regex): `Nenhuma detectada`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

console.log("[slide_harpacantor_utils.js] Script iniciado.");

function obterTotalHinos(tipoHinario) {
    if (window.HINARIOS_CONFIG && window.HINARIOS_CONFIG[tipoHinario]) {
        return window.HINARIOS_CONFIG[tipoHinario].total;
    }
    return 0;
}

window.obterTotalHinos = obterTotalHinos;

```
---

### `css/cantor_cristao.css`

- Extensão: `.css`
- Tamanho: `1365 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `Nenhuma detectada`

- Classes detectadas (regex): `Nenhuma detectada`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*=====================================================*/
/*            ARQUIVO DE ESTILOS DO CANTOR CRISTÃO     */
/*   Estiliza os elementos específicos da seção        */
/*=====================================================*/

/* O bloco abaixo estiliza o botão de menu ativo */
.menu-button.active {
    background: #388e3c;                                   /* Define a cor de fundo para o botão ativo.         */
    color: #fff;                                           /* Define a cor do texto para o botão ativo.         */
}

/* O bloco abaixo estiliza o botão de capítulo */
.botao-capitulo {
    background-color: #388e3c;                             /* Define a cor de fundo do botão.                   */
    color: #fff;                                           /* Define a cor do texto do botão.                   */
}

/* O bloco abaixo estiliza o efeito hover do botão de capítulo */
.botao-capitulo:hover {
    background-color: #1b5e20;                             /* Escurece a cor de fundo ao passar o mouse.        */
    transform: scale(1.05);                                /* Aumenta ligeiramente o tamanho do botão.          */
}

/* O bloco abaixo estiliza o contêiner do hino */
.hino-conteiner {
    border-color: #388e3c;                                 /* Define a cor da borda do contêiner.               */
}


```
---

### `css/cantor_cristao_novo.css`

- Extensão: `.css`
- Tamanho: `6072 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `Nenhuma detectada`

- Classes detectadas (regex): `Nenhuma detectada`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*=====================================================*/
/*            ARQUIVO DE ESTILOS DO CANTOR CRISTÃO     */
/*   Estiliza os elementos específicos da seção        */
/*=====================================================*/

/* O bloco abaixo configura o grid de botões de hinos */
#botoes-hinos {
    display: grid;                                         /* Define o layout como grid.                        */
    grid-template-columns: repeat(auto-fill, 200px);       /* Colunas fixas de 200px.                          */
    gap: 10px;                                             /* Define o espaçamento entre os botões.             */
    justify-content: center;                               /* Centraliza o grid na tela.                        */
    align-items: start;                                    /* Alinha os itens ao topo.                         */
    margin: 20px auto;                                     /* Margem automática para centralizar.               */
    max-width: 1200px;                                     /* Largura máxima do contêiner.                      */
    padding: 15px;                                         /* Preenchimento interno.                            */
    background-color: rgba(0, 0, 0, 0.5);                  /* Fundo preto com transparência.                    */
    border-radius: 10px;                                   /* Cantos arredondados.                              */
    width: 100%;                                           /* Largura total.                                    */
}

/* O bloco abaixo remove o fundo e o preenchimento quando não há hinos */
#botoes-hinos:empty {
    background: none;                                      /* Remove a cor de fundo.                            */
    padding: 0;                                            /* Remove o preenchimento.                           */
    min-height: 0;                                         /* Remove a altura mínima.                           */
}

/* O bloco abaixo estiliza os botões de hino */
.botao-capitulo {
    width: 200px;                                          /* Largura fixa para padronizar.                     */
    min-height: 48px;                                      /* Altura mínima para permitir duas linhas.          */
    height: auto;                                          /* Altura automática baseada no conteúdo.            */
    padding: 8px 12px;                                     /* Preenchimento interno reduzido.                   */
    border-radius: 8px;                                    /* Cantos arredondados.                              */
    background: rgba(56, 142, 60, 0.9);                    /* Fundo verde com transparência.                    */
    color: #fff;                                           /* Cor do texto branca.                              */
    font-size: 0.9em;                                      /* Tamanho da fonte reduzido.                        */
    font-weight: bold;                                     /* Peso da fonte em negrito.                         */
    border: 2px solid transparent;                         /* Borda transparente.                               */
    margin: 0;                                             /* Remove a margem.                                  */
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);                /* Sombra sutil.                                     */
    transition: background 0.2s, transform 0.2s, border-color 0.2s; /* Transições suaves.                                */
    display: flex;                                         /* Layout flexível.                                  */
    align-items: center;                                   /* Alinha os itens verticalmente.                    */
    justify-content: flex-start;                           /* Alinha o conteúdo à esquerda.                     */
    gap: 5px;           


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `css/concordancia copy.css`

- Extensão: `.css`
- Tamanho: `55891 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `Nenhuma detectada`

- Classes detectadas (regex): `Nenhuma detectada`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*=====================================================*/
/*           ESTILOS DA CONCORDÂNCIA BÍBLICA           */
/*   Filtros, resultados, cards e responsividade       */
/*=====================================================*/

/* O bloco abaixo estiliza o contêiner de filtros */
.filtros-conteiner {
    background: linear-gradient(135deg, rgba(26, 26, 26, 0.2) 0%, rgba(51, 51, 51, 0.2) 100%); /* Fundo com gradiente semitransparente.             */
    border: 2px solid #d4af37;                             /* Borda dourada.                                    */
    border-radius: 12px;                                   /* Cantos arredondados.                              */
    padding: 15px;                                         /* Preenchimento interno.                            */
    margin-bottom: 15px;                                   /* Margem inferior.                                  */
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);             /* Sombra para profundidade.                         */
    padding-top: 6px;                                      /* Ajuste no preenchimento superior.                 */
    padding-bottom: 6px;                                   /* Ajuste no preenchimento inferior.                 */
    position: fixed;                                       /* Posição fixa na tela.                             */
    top: 175px;                                            /* Distância do topo.                                */
    height: 80px;                                          /* Altura fixa.                                      */
    z-index: 901;                                          /* Ordem de empilhamento acima do contador.          */
    left: 163px;                                           /* Posição à esquerda.                               */
    right: 23px;                                           /* Posição à direita.                                */
}

/* O bloco abaixo alinha os filtros em uma linha */
.filtros-linha {
    display: flex;                                         /* Layout flexível.                                  */
    gap: 8px;                                              /* Espaçamento entre os elementos.                   */
    align-items: center;                                   /* Alinhamento vertical ao centro.                   */
    margin-bottom: 8px;                                    /* Margem inferior.                                  */
}

/* O bloco abaixo estiliza os grupos de filtros */
.filtro-grupo {
    margin-bottom: 6px;                                    /* Margem inferior.                                  */
}

/* O bloco abaixo define a proporção de crescimento dos grupos de filtro */
.filtro-grupo:nth-child(1) { flex: 1.2; }                  /* Define a proporção de crescimento do primeiro grupo. */
.filtro-grupo:nth-child(2) { flex: 0.8; }                  /* Define a proporção de crescimento do segundo grupo.  */
.filtro-grupo:nth-child(3) { flex: 1; }                    /* Define a proporção de crescimento do terceiro grupo. */
.filtro-grupo:nth-child(4) { flex: 1.5; }                  /* Define a proporção de crescimento do quarto grupo.   */
.filtro-grupo:nth-child(5) { flex: 0.6; }                  /* Define a proporção de crescimento do quinto grupo.   */

.filtro-grupo:last-child {
    align-self: flex-start;                               /* Alinha o grupo no topo.                           */
}

/* O bloco abaixo remove a margem do último grupo de filtro */
.filtro-grupo:last-child {
    margin-bottom: 0;                                      /* Remove a margem inferior.                         */
}

/* Estilização dos campos de texto */
.filtro-grupo input[type="text"] {
    height: 35px;                                          /* Altura fixa igual ao botão.                       */
    padding: 8px 12px;                                     /* Preenchimento interno.                            */
    b


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `css/concordancia copy111111.css`

- Extensão: `.css`
- Tamanho: `53188 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `Nenhuma detectada`

- Classes detectadas (regex): `Nenhuma detectada`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*=====================================================*/
/*           ESTILOS DA CONCORDÂNCIA BÍBLICA           */
/*   Filtros, resultados, cards e responsividade       */
/*=====================================================*/

/* O bloco abaixo estiliza o contêiner de filtros */
.filtros-conteiner {
    background: linear-gradient(135deg, rgba(26, 26, 26, 0.2) 0%, rgba(51, 51, 51, 0.2) 100%); /* Fundo com gradiente semitransparente.             */
    border: 2px solid #d4af37;                             /* Borda dourada.                                    */
    border-radius: 12px;                                   /* Cantos arredondados.                              */
    padding: 15px;                                         /* Preenchimento interno.                            */
    margin-bottom: 15px;                                   /* Margem inferior.                                  */
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);             /* Sombra para profundidade.                         */
    padding-top: 6px;                                      /* Ajuste no preenchimento superior.                 */
    padding-bottom: 6px;                                   /* Ajuste no preenchimento inferior.                 */
    position: fixed;                                       /* Posição fixa na tela.                             */
    top: 175px;                                            /* Distância do topo.                                */
    height: 80px;                                          /* Altura fixa.                                      */
    z-index: 901;                                          /* Ordem de empilhamento acima do contador.          */
    left: 163px;                                           /* Posição à esquerda.                               */
    right: 23px;                                           /* Posição à direita.                                */
}

/* O bloco abaixo alinha os filtros em uma linha */
.filtros-linha {
    display: flex;                                         /* Layout flexível.                                  */
    gap: 8px;                                              /* Espaçamento entre os elementos.                   */
    align-items: center;                                   /* Alinhamento vertical ao centro.                   */
    margin-bottom: 8px;                                    /* Margem inferior.                                  */
}

/* O bloco abaixo estiliza os grupos de filtros */
.filtro-grupo {
    margin-bottom: 6px;                                    /* Margem inferior.                                  */
}

/* O bloco abaixo define a proporção de crescimento dos grupos de filtro */
.filtro-grupo:nth-child(1) { flex: 1.2; }                  /* Define a proporção de crescimento do primeiro grupo. */
.filtro-grupo:nth-child(2) { flex: 0.8; }                  /* Define a proporção de crescimento do segundo grupo.  */
.filtro-grupo:nth-child(3) { flex: 1; }                    /* Define a proporção de crescimento do terceiro grupo. */
.filtro-grupo:nth-child(4) { flex: 1.5; }                  /* Define a proporção de crescimento do quarto grupo.   */
.filtro-grupo:nth-child(5) { flex: 0.6; }                  /* Define a proporção de crescimento do quinto grupo.   */

/* O bloco abaixo remove a margem do último grupo de filtro */
.filtro-grupo:last-child {
    margin-bottom: 0;                                      /* Remove a margem inferior.                         */
}

/* O bloco abaixo estiliza os rótulos dos filtros */
.filtro-grupo label {
    display: block;                                        /* Exibição como bloco.                              */
    color: #d4af37;                                        /* Cor do texto dourada.                             */
    font-weight: 600;                                      /* Peso da fonte.                                    */
    margin-bottom: 2px;         


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `css/concordancia.css`

- Extensão: `.css`
- Tamanho: `57760 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `Nenhuma detectada`

- Classes detectadas (regex): `Nenhuma detectada`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*=====================================================*/
/*           ESTILOS DA CONCORDÂNCIA BÍBLICA           */
/*   Filtros, resultados, cards e responsividade       */
/*=====================================================*/

/* O bloco abaixo estiliza o contêiner de filtros */
.filtros-conteiner {
    background: linear-gradient(135deg, rgba(26, 26, 26, 0.2) 0%, rgba(51, 51, 51, 0.2) 100%); /* Fundo com gradiente semitransparente.             */
    border: 2px solid #d4af37;                             /* Borda dourada.                                    */
    border-radius: 12px;                                   /* Cantos arredondados.                              */
    padding: 15px;                                         /* Preenchimento interno.                            */
    margin-bottom: 15px;                                   /* Margem inferior.                                  */
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);             /* Sombra para profundidade.                         */
    padding-top: 6px;                                      /* Ajuste no preenchimento superior.                 */
    padding-bottom: 6px;                                   /* Ajuste no preenchimento inferior.                 */
    position: fixed;                                       /* Posição fixa na tela.                             */
    top: 175px;                                            /* Distância do topo.                                */
    height: 80px;                                          /* Altura fixa.                                      */
    z-index: 901;                                          /* Ordem de empilhamento acima do contador.          */
    left: 155px;                                           /* Posição à esquerda.                               */
    right: 16px;                                           /* Posição à direita.                                */

/*box-sizing: border-box;
    width: calc(100% - 20px);*/

}

/* O bloco abaixo alinha os filtros em uma linha */
.filtros-linha {
    display: flex;                                         /* Layout flexível.                                  */
    gap: 8px;                                              /* Espaçamento entre os elementos.                   */
    align-items: center;                                   /* Alinhamento vertical ao centro.                   */
    margin-bottom: 8px;                                    /* Margem inferior.                                  */
}

/* O bloco abaixo estiliza os grupos de filtros */
.filtro-grupo {
    margin-bottom: 6px;                                    /* Margem inferior.                                  */
}

/* O bloco abaixo define a proporção de crescimento dos grupos de filtro */
.filtro-grupo:nth-child(1) { flex: 1.2; }                  /* Define a proporção de crescimento do primeiro grupo. */
.filtro-grupo:nth-child(2) { flex: 0.8; }                  /* Define a proporção de crescimento do segundo grupo.  */
.filtro-grupo:nth-child(3) { flex: 1; }                    /* Define a proporção de crescimento do terceiro grupo. */
.filtro-grupo:nth-child(4) { flex: 1.5; }                  /* Define a proporção de crescimento do quarto grupo.   */
.filtro-grupo:nth-child(5) { flex: 0.6; }                  /* Define a proporção de crescimento do quinto grupo.   */

.filtro-grupo:last-child {
    align-self: flex-start;                               /* Alinha o grupo no topo.                           */
}

/* O bloco abaixo remove a margem do último grupo de filtro */
.filtro-grupo:last-child {
    margin-bottom: 0;                                      /* Remove a margem inferior.                         */
}

/* Estilização dos campos de texto */
.filtro-grupo input[type="text"] {
    height: 35px;                                          /* Altura fixa igual ao botão.                       */
    padding: 8px 12px;                                     /


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `css/concordanciacss.txt`

- Extensão: `.txt`
- Tamanho: `55891 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `Nenhuma detectada`

- Classes detectadas (regex): `Nenhuma detectada`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*=====================================================*/
/*           ESTILOS DA CONCORDÂNCIA BÍBLICA           */
/*   Filtros, resultados, cards e responsividade       */
/*=====================================================*/

/* O bloco abaixo estiliza o contêiner de filtros */
.filtros-conteiner {
    background: linear-gradient(135deg, rgba(26, 26, 26, 0.2) 0%, rgba(51, 51, 51, 0.2) 100%); /* Fundo com gradiente semitransparente.             */
    border: 2px solid #d4af37;                             /* Borda dourada.                                    */
    border-radius: 12px;                                   /* Cantos arredondados.                              */
    padding: 15px;                                         /* Preenchimento interno.                            */
    margin-bottom: 15px;                                   /* Margem inferior.                                  */
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);             /* Sombra para profundidade.                         */
    padding-top: 6px;                                      /* Ajuste no preenchimento superior.                 */
    padding-bottom: 6px;                                   /* Ajuste no preenchimento inferior.                 */
    position: fixed;                                       /* Posição fixa na tela.                             */
    top: 175px;                                            /* Distância do topo.                                */
    height: 80px;                                          /* Altura fixa.                                      */
    z-index: 901;                                          /* Ordem de empilhamento acima do contador.          */
    left: 163px;                                           /* Posição à esquerda.                               */
    right: 23px;                                           /* Posição à direita.                                */
}

/* O bloco abaixo alinha os filtros em uma linha */
.filtros-linha {
    display: flex;                                         /* Layout flexível.                                  */
    gap: 8px;                                              /* Espaçamento entre os elementos.                   */
    align-items: center;                                   /* Alinhamento vertical ao centro.                   */
    margin-bottom: 8px;                                    /* Margem inferior.                                  */
}

/* O bloco abaixo estiliza os grupos de filtros */
.filtro-grupo {
    margin-bottom: 6px;                                    /* Margem inferior.                                  */
}

/* O bloco abaixo define a proporção de crescimento dos grupos de filtro */
.filtro-grupo:nth-child(1) { flex: 1.2; }                  /* Define a proporção de crescimento do primeiro grupo. */
.filtro-grupo:nth-child(2) { flex: 0.8; }                  /* Define a proporção de crescimento do segundo grupo.  */
.filtro-grupo:nth-child(3) { flex: 1; }                    /* Define a proporção de crescimento do terceiro grupo. */
.filtro-grupo:nth-child(4) { flex: 1.5; }                  /* Define a proporção de crescimento do quarto grupo.   */
.filtro-grupo:nth-child(5) { flex: 0.6; }                  /* Define a proporção de crescimento do quinto grupo.   */

.filtro-grupo:last-child {
    align-self: flex-start;                               /* Alinha o grupo no topo.                           */
}

/* O bloco abaixo remove a margem do último grupo de filtro */
.filtro-grupo:last-child {
    margin-bottom: 0;                                      /* Remove a margem inferior.                         */
}

/* Estilização dos campos de texto */
.filtro-grupo input[type="text"] {
    height: 35px;                                          /* Altura fixa igual ao botão.                       */
    padding: 8px 12px;                                     /* Preenchimento interno.                            */
    b


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `css/dicionario copy.css`

- Extensão: `.css`
- Tamanho: `39165 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `Nenhuma detectada`

- Classes detectadas (regex): `Nenhuma detectada`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*=====================================================*/
/*             ESTILOS DO DICIONÁRIO BÍBLICO           */
/*   Busca, resultados, definições e responsividade    */
/*=====================================================*/

/* O bloco abaixo estiliza o campo de busca do dicionário */
.dicionario-busca input {
    width: 100%;                                           /* Largura total.                                    */
    padding: 15px 20px;                                    /* Preenchimento interno.                            */
    background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%); /* Fundo com gradiente escuro.                       */
    border: 2px solid #d4af37;                             /* Borda dourada.                                    */
    border-radius: 12px;                                   /* Cantos arredondados.                              */
    color: #ffffff;                                        /* Cor do texto branca.                              */
    font-size: 1.2rem;                                     /* Tamanho da fonte.                                 */
    transition: all 0.3s ease;                             /* Transição suave para todas as propriedades.       */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);             /* Sombra para profundidade.                         */
}

/* O bloco abaixo estiliza o foco do campo de busca */
.dicionario-busca input:focus {
    outline: none;                                         /* Remove o contorno padrão.                         */
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);          /* Sombra dourada ao focar.                          */
    background: linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%); /* Fundo com gradiente mais claro ao focar.          */
}

/* O bloco abaixo estiliza o placeholder do campo de busca */
.dicionario-busca input::placeholder {
    color: #999999;                                        /* Cor do texto do placeholder.                      */
}

/* O bloco abaixo estiliza o contêiner principal do dicionário */
.dicionario-conteiner {
    background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%); /* Fundo com gradiente escuro.                       */
    border: 2px solid #d4af37;                             /* Borda dourada.                                    */
    border-radius: 12px;                                   /* Cantos arredondados.                              */
    padding: 25px;                                         /* Preenchimento interno.                            */
    margin-bottom: 20px;                                   /* Margem inferior.                                  */
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);             /* Sombra para profundidade.                         */
    width: 100%;                                           /* Largura total.                                    */
    max-width: 100%;                                       /* Largura máxima total.                             */
}

/* O bloco abaixo estiliza a linha de busca e paginação */
.dicionario-linha {
    display: flex;                                         /* Layout flexível.                                  */
    align-items: center;                                   /* Alinhamento vertical ao centro.                   */
    justify-content: space-between;                        /* Espaçamento distribuído entre os elementos.       */
    padding: 10px 20px;                                    /* Preenchimento interno.                            */
    background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%); /* Fundo com gradiente escuro.                       */
    border: 1px solid #444444;                             /* Borda cinza.                                      */
    border-radius: 8px;                                    /* Cantos arredondados.                              */
    margin-bottom: 20px;                                   


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `css/dicionario.css`

- Extensão: `.css`
- Tamanho: `37293 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `Nenhuma detectada`

- Classes detectadas (regex): `Nenhuma detectada`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*=====================================================*/
/*             ESTILOS DO DICIONÁRIO BÍBLICO           */
/*   Busca, resultados, definições e responsividade    */
/*=====================================================*/

/* O bloco abaixo estiliza o campo de busca do dicionário */
.dicionario-busca input {
    width: 100%;                                           /* Largura total.                                    */
    padding: 7px 20px;                                    /* Preenchimento interno.                            */
    background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%); /* Fundo com gradiente escuro.                       */
    border: 2px solid #d4af37;                             /* Borda dourada.                                    */
    border-radius: 12px;                                   /* Cantos arredondados.                              */
    color: #ffffff;                                        /* Cor do texto branca.                              */
    font-size: 1.2rem;                                     /* Tamanho da fonte.                                 */
    transition: all 0.3s ease;                             /* Transição suave para todas as propriedades.       */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);             /* Sombra para profundidade.                         */
    margin-left: 10px; /* AJUSTADO: Adicionado para alinhar o campo de busca com o contêiner */

}

/* O bloco abaixo estiliza o foco do campo de busca */
.dicionario-busca input:focus {
    outline: none;                                         /* Remove o contorno padrão.                         */
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);          /* Sombra dourada ao focar.                          */
    background: linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%); /* Fundo com gradiente mais claro ao focar.          */
}

/* O bloco abaixo estiliza o placeholder do campo de busca */
.dicionario-busca input::placeholder {
    color: #999999;                                        /* Cor do texto do placeholder.                      */
}

/* O bloco abaixo estiliza o contêiner principal do dicionário */
.dicionario-conteiner {
    background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%); /* Fundo com gradiente escuro.                       */
    border: 2px solid #d4af37;                             /* Borda dourada.                                    */
    border-radius: 12px;                                   /* Cantos arredondados.                              */
    padding: 25px 0px; /* AJUSTADO: Padding vertical 25px, horizontal 0px para esticar o conteúdo interno */
    margin-bottom: 20px;                                   /* Margem inferior.                                  */
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);             /* Sombra para profundidade.                         */
    width: 100%;                                           /* Largura total.                                    */
    max-width: 100%;                                       /* Largura máxima total.                             */
    /* As propriedades display: flex e align-items que estavam em menu_dicionarioconcordancia.css
       para este seletor, foram removidas pois não eram adequadas para este contêiner principal aqui
       e seriam sobrescritas por outras regras. */
}

/* O bloco abaixo estiliza a linha de busca e paginação */
.dicionario-linha {
    display: flex;                                         /* Layout flexível.                                  */
    align-items: center;                                   /* Alinhamento vertical ao centro.                   */
    justify-content: space-between;                        /* Espaçamento distribuído entre os elementos.       */
    padding: 10px 0px; /* AJUSTADO: Padding vertical 10px, horizontal 0px */
    background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%); /* Fundo com gradiente escuro.             


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `css/dicionariocss.txt`

- Extensão: `.txt`
- Tamanho: `39165 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `Nenhuma detectada`

- Classes detectadas (regex): `Nenhuma detectada`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*=====================================================*/
/*             ESTILOS DO DICIONÁRIO BÍBLICO           */
/*   Busca, resultados, definições e responsividade    */
/*=====================================================*/

/* O bloco abaixo estiliza o campo de busca do dicionário */
.dicionario-busca input {
    width: 100%;                                           /* Largura total.                                    */
    padding: 15px 20px;                                    /* Preenchimento interno.                            */
    background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%); /* Fundo com gradiente escuro.                       */
    border: 2px solid #d4af37;                             /* Borda dourada.                                    */
    border-radius: 12px;                                   /* Cantos arredondados.                              */
    color: #ffffff;                                        /* Cor do texto branca.                              */
    font-size: 1.2rem;                                     /* Tamanho da fonte.                                 */
    transition: all 0.3s ease;                             /* Transição suave para todas as propriedades.       */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);             /* Sombra para profundidade.                         */
}

/* O bloco abaixo estiliza o foco do campo de busca */
.dicionario-busca input:focus {
    outline: none;                                         /* Remove o contorno padrão.                         */
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);          /* Sombra dourada ao focar.                          */
    background: linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%); /* Fundo com gradiente mais claro ao focar.          */
}

/* O bloco abaixo estiliza o placeholder do campo de busca */
.dicionario-busca input::placeholder {
    color: #999999;                                        /* Cor do texto do placeholder.                      */
}

/* O bloco abaixo estiliza o contêiner principal do dicionário */
.dicionario-conteiner {
    background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%); /* Fundo com gradiente escuro.                       */
    border: 2px solid #d4af37;                             /* Borda dourada.                                    */
    border-radius: 12px;                                   /* Cantos arredondados.                              */
    padding: 25px;                                         /* Preenchimento interno.                            */
    margin-bottom: 20px;                                   /* Margem inferior.                                  */
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);             /* Sombra para profundidade.                         */
    width: 100%;                                           /* Largura total.                                    */
    max-width: 100%;                                       /* Largura máxima total.                             */
}

/* O bloco abaixo estiliza a linha de busca e paginação */
.dicionario-linha {
    display: flex;                                         /* Layout flexível.                                  */
    align-items: center;                                   /* Alinhamento vertical ao centro.                   */
    justify-content: space-between;                        /* Espaçamento distribuído entre os elementos.       */
    padding: 10px 20px;                                    /* Preenchimento interno.                            */
    background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%); /* Fundo com gradiente escuro.                       */
    border: 1px solid #444444;                             /* Borda cinza.                                      */
    border-radius: 8px;                                    /* Cantos arredondados.                              */
    margin-bottom: 20px;                                   


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `css/harpa_cantor.css`

- Extensão: `.css`
- Tamanho: `19285 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `Nenhuma detectada`

- Classes detectadas (regex): `Nenhuma detectada`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*=====================================================*/
/*        ESTILOS PARA HARPA CRISTÃ E CANTOR CRISTÃO   */
/*   Layout, vídeo de fundo, botões, hinos e rodapé    */
/*=====================================================*/

/* O bloco abaixo reseta estilos e configura o corpo da página */
body, html {
    height: 100%;                                          /* Define a altura total.                            */
    min-height: 100vh;                                     /* Garante a altura mínima da viewport.              */
    margin: 0;                                             /* Remove margens padrão.                            */
    padding: 0;                                            /* Remove preenchimento padrão.                      */
    font-family: sans-serif;                               /* Define a família da fonte.                        */
    font-style: italic;                                    /* Aplica estilo itálico.                            */
    font-weight: bold;                                     /* Aplica peso de fonte em negrito.                  */
    color: #fff;                                           /* Define a cor do texto como branca.                */
    overflow-x: hidden;                                    /* Esconde a barra de rolagem horizontal.            */
}

/* O bloco abaixo configura o vídeo de fundo */
#background-video {
    position: fixed;                                       /* Posição fixa na tela.                             */
    top: 0;                                                /* Alinha no topo.                                   */
    left: 0;                                               /* Alinha à esquerda.                                */
    width: 100%;                                           /* Largura total.                                    */
    height: 100vh;                                         /* Altura total da viewport.                         */
    object-fit: cover;                                     /* Cobre toda a área, cortando se necessário.        */
    z-index: -2;                                           /* Coloca o vídeo atrás de outros elementos.         */
}

/* O bloco abaixo cria uma sobreposição escura sobre o vídeo */
.overlay {
    position: fixed;                                       /* Posição fixa na tela.                             */
    top: 0;                                                /* Alinha no topo.                                   */
    left: 0;                                               /* Alinha à esquerda.                                */
    width: 100%;                                           /* Largura total.                                    */
    height: 100vh;                                         /* Altura total da viewport.                         */
    background-color: rgba(10, 10, 10, 0.7);               /* Cor de fundo preta com transparência.             */
    z-index: -1;                                           /* Coloca a sobreposição acima do vídeo.             */
}

/* O bloco abaixo estiliza o cabeçalho */
header {
    text-align: center;                                    /* Centraliza o texto.                               */
    padding: 30px 20px 15px 20px;                          /* Preenchimento interno.                            */
}

/* O bloco abaixo estiliza o título principal */
.titulo-principal {
    font-size: 2.7em;                                      /* Tamanho da fonte.                                 */
    color: #ffd700;                                        /* Cor do texto dourada.                             */
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.8);            /* Sombra no texto.                                  */
    margin: 0;                                             /* Remove a margem.                                  */
}

/* O bloco abaixo estiliza o subtítulo */
.subtitulo {
    font-size: 1.2em


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `css/harpa_crista.css`

- Extensão: `.css`
- Tamanho: `5527 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `Nenhuma detectada`

- Classes detectadas (regex): `Nenhuma detectada`

- Nenhuma ocorrência direta relacionada à marca d'água encontrada.


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*=====================================================*/
/*              ESTILOS PARA A HARPA CRISTÃ            */
/*   Grid de hinos, botões e seus estados interativos  */
/*=====================================================*/

/* O bloco abaixo configura o grid de botões de hinos */
#botoes-hinos {
    display: grid;                                         /* Define o layout como grid.                        */
    grid-template-columns: repeat(auto-fill, 200px);       /* Colunas fixas de 200px.                          */
    gap: 10px;                                             /* Define o espaçamento entre os botões.             */
    justify-content: center;                               /* Centraliza o grid na tela.                        */
    align-items: start;                                    /* Alinha os itens ao topo.                         */
    margin: 20px auto;                                     /* Margem automática para centralizar.               */
    max-width: 1200px;                                     /* Largura máxima do contêiner.                      */
    padding: 15px;                                         /* Preenchimento interno.                            */
    background-color: rgba(0, 0, 0, 0.5);                  /* Fundo preto com transparência.                    */
    border-radius: 10px;                                   /* Cantos arredondados.                              */
    width: 100%;                                           /* Largura total.                                    */
}

/* O bloco abaixo remove o fundo e o preenchimento quando não há hinos */
#botoes-hinos:empty {
    background: none;                                      /* Remove a cor de fundo.                            */
    padding: 0;                                            /* Remove o preenchimento.                           */
    min-height: 0;                                         /* Remove a altura mínima.                           */
}

/* O bloco abaixo estiliza os botões de hino (capítulo) */
.botao-capitulo {
    width: 200px;                                          /* Largura fixa para padronizar.                     */
    min-height: 48px;                                      /* Altura mínima para permitir duas linhas.          */
    height: auto;                                          /* Altura automática baseada no conteúdo.            */
    padding: 8px 12px;                                     /* Preenchimento interno reduzido.                   */
    border-radius: 8px;                                    /* Cantos arredondados.                              */
    background: rgba(59, 71, 161, 0.8);                    /* Fundo azul com transparência.                     */
    color: #fff;                                           /* Cor do texto branca.                              */
    font-size: 0.9em;                                      /* Tamanho da fonte reduzido.                        */
    font-weight: bold;                                     /* Peso da fonte em negrito.                         */
    border: 2px solid transparent;                         /* Borda transparente.                               */
    margin: 0;                                             /* Remove a margem.                                  */
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);                /* Sombra sutil.                                     */
    transition: background 0.2s, transform 0.2s, border-color 0.2s; /* Transições suaves.                                */
    display: flex;                                         /* Layout flexível.                                  */
    align-items: center;                                   /* Alinha os itens verticalmente.                    */
    justify-content: flex-start;                           /* Alinha o conteúdo à esquerda.                     */
    gap: 5px;                                             


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `css/menu_dicionarioconcordancia copy.css`

- Extensão: `.css`
- Tamanho: `36914 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `Nenhuma detectada`

- Classes detectadas (regex): `Nenhuma detectada`

- Ocorrências relacionadas à marca d'água (trechos):

  - `marca-dagua` → ...}  /* O bloco abaixo estiliza a imagem de marca d'água */ .marca-dagua-imagem {     position: fixed;...

  - `marca-dagua-imagem` → ...}  /* O bloco abaixo estiliza a imagem de marca d'água */ .marca-dagua-imagem {     position: fixed;...


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*=====================================================*/
/*     ESTILOS DO MENU, DICIONÁRIO E CONCORDÂNCIA      */
/*   Layout principal, cabeçalho, navegação e conteúdo */
/*=====================================================*/

/* O bloco abaixo reseta estilos e configura o corpo da página */
* {
    margin: 0;                                             /* Remove margens padrão.                            */
    padding: 0;                                            /* Remove preenchimento padrão.                      */
    box-sizing: border-box;                                /* Inclui bordas e preenchimento no tamanho total.   */
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Define a família da fonte.                        */
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); /* Fundo com gradiente escuro.                       */
    color: #ffffff;                                        /* Cor do texto branca.                              */
    line-height: 1.6;                                      /* Altura da linha.                                  */
    overflow: hidden;                                      /* Esconde o conteúdo que transborda.                */
    min-height: 100vh;                                     /* Altura mínima da viewport.                        */
    display: flex;                                         /* Layout flexível.                                  */
    flex-direction: column;                                /* Direção da flexbox para coluna.                   */
}

/* O bloco abaixo estiliza o cabeçalho */
header {
    background: linear-gradient(135deg, rgba(26, 26, 26, 0.2) 0%, rgba(51, 51, 51, 0.2) 100%); /* Fundo semitransparente.                           */
    border-bottom: 3px solid #d4af37;                      /* Borda inferior dourada.                           */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);             /* Sombra para profundidade.                         */
    position: fixed;                                       /* Posição fixa no topo.                             */
    top: 0;                                                /* Alinha no topo.                                   */
    left: 0;                                               /* Alinha à esquerda.                                */
    width: 100%;                                           /* Largura total.                                    */
    z-index: 1000;                                         /* Ordem de empilhamento.                            */
    height: 100px;                                         /* Altura fixa.                                      */
}

/* O bloco abaixo estiliza a parte superior do cabeçalho */
.cabecalho-superior {
    padding: 20px;                                         /* Preenchimento interno.                            */
    height: 100%;                                          /* Altura total.                                     */
    display: flex;                                         /* Layout flexível.                                  */
    align-items: center;                                   /* Alinhamento vertical ao centro.                   */
    justify-content: flex-start;                           /* Alinhamento horizontal à esquerda.                */
}

/* O bloco abaixo estiliza o contêiner do título */
.titulo-conteiner h1 {
    color: #d4af37;                                        /* Cor do texto dourada.                             */
    font-size: 2.5rem;                                     /* Tamanho da fonte.                                 */
    font-weight: 700;                                      /* Peso da fonte.                                    */
    font-style: italic;                                    /* Estilo da fonte itálico.                          */
    margin-bottom: 2px;                                    /* Margem inferior.      


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `css/menu_dicionarioconcordancia.css`

- Extensão: `.css`
- Tamanho: `30141 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `Nenhuma detectada`

- Classes detectadas (regex): `Nenhuma detectada`

- Ocorrências relacionadas à marca d'água (trechos):

  - `marca-dagua` → .../   /* O bloco abaixo estiliza a imagem de marca d'água */ .marca-dagua-imagem {     position: fixed;...

  - `marca-dagua-imagem` → .../   /* O bloco abaixo estiliza a imagem de marca d'água */ .marca-dagua-imagem {     position: fixed;...


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*=====================================================*/
/*     ESTILOS DO MENU, DICIONÁRIO E CONCORDÂNCIA      */
/*   Layout principal, cabeçalho, navegação e conteúdo 
/* menu_dicionarioconcorancia.css */
/*=====================================================*/

/* O bloco abaixo reseta estilos e configura o corpo da página */
* {
    margin: 0;                                             /* Remove margens padrão.                            */
    padding: 0;                                            /* Remove preenchimento padrão.                      */
    box-sizing: border-box;                                /* Inclui bordas e preenchimento no tamanho total.   */
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Define a família da fonte.                        */
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); /* Fundo com gradiente escuro.                       */
    color: #ffffff;                                        /* Cor do texto branca.                              */
    line-height: 1.6;                                      /* Altura da linha.                                  */
    overflow: hidden;                                      /* Esconde o conteúdo que transborda.                */
    min-height: 100vh;                                     /* Altura mínima da viewport.                        */
    display: flex;                                         /* Layout flexível.                                  */
    flex-direction: column;                                /* Direção da flexbox para coluna.                   */
}

/* O bloco abaixo estiliza o cabeçalho */
header {
    background: linear-gradient(135deg, rgba(26, 26, 26, 0.2) 0%, rgba(51, 51, 51, 0.2) 100%); /* Fundo semitransparente.                           */
    /*border-bottom: 3px solid #d4af37;                      /* Borda inferior dourada.                           */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);             /* Sombra para profundidade.                         */
    position: fixed;                                       /* Posição fixa no topo.                             */
    top: 0;                                                /* Alinha no topo.                                   */
    left: 0;                                               /* Alinha à esquerda.                                */
    width: 100%;                                           /* Largura total.                                    */
    z-index: 1000;                                         /* Ordem de empilhamento.                            */
    height: 100px;                                         /* Altura fixa.                                      */
}

/* O bloco abaixo estiliza a parte superior do cabeçalho */
.cabecalho-superior {
    padding: 20px;                                         /* Preenchimento interno.                            */
    height: 100%;                                          /* Altura total.                                     */
    display: flex;                                         /* Layout flexível.                                  */
    align-items: center;                                   /* Alinhamento vertical ao centro.                   */
    justify-content: flex-start;                           /* Alinhamento horizontal à esquerda.                */
}

/* O bloco abaixo estiliza o contêiner do título */
.titulo-conteiner h1 {
    color: #d4af37;                                        /* Cor do texto dourada.                             */
    font-size: 2.5rem;                                     /* Tamanho da fonte.                                 */
    font-weight: 700;                                      /* Peso da fonte.                                    */
    font-style: italic;                                    /* Estilo da fonte itálico.                          */
    margin-bottom: 2px;                        


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `css/menu_dicionarioconcordanciacss.txt`

- Extensão: `.txt`
- Tamanho: `37018 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `Nenhuma detectada`

- Classes detectadas (regex): `Nenhuma detectada`

- Ocorrências relacionadas à marca d'água (trechos):

  - `marca-dagua` → ...}  /* O bloco abaixo estiliza a imagem de marca d'água */ .marca-dagua-imagem {     position: fixed;...

  - `marca-dagua-imagem` → ...}  /* O bloco abaixo estiliza a imagem de marca d'água */ .marca-dagua-imagem {     position: fixed;...


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*=====================================================*/
/*     ESTILOS DO MENU, DICIONÁRIO E CONCORDÂNCIA      */
/*   Layout principal, cabeçalho, navegação e conteúdo */
/*=====================================================*/

/* O bloco abaixo reseta estilos e configura o corpo da página */
* {
    margin: 0;                                             /* Remove margens padrão.                            */
    padding: 0;                                            /* Remove preenchimento padrão.                      */
    box-sizing: border-box;                                /* Inclui bordas e preenchimento no tamanho total.   */
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Define a família da fonte.                        */
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); /* Fundo com gradiente escuro.                       */
    color: #ffffff;                                        /* Cor do texto branca.                              */
    line-height: 1.6;                                      /* Altura da linha.                                  */
    overflow: hidden;                                      /* Esconde o conteúdo que transborda.                */
    min-height: 100vh;                                     /* Altura mínima da viewport.                        */
    display: flex;                                         /* Layout flexível.                                  */
    flex-direction: column;                                /* Direção da flexbox para coluna.                   */
}

/* O bloco abaixo estiliza o cabeçalho */
header {
    background: linear-gradient(135deg, rgba(26, 26, 26, 0.2) 0%, rgba(51, 51, 51, 0.2) 100%); /* Fundo semitransparente.                           */
    border-bottom: 3px solid #d4af37;                      /* Borda inferior dourada.                           */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);             /* Sombra para profundidade.                         */
    position: fixed;                                       /* Posição fixa no topo.                             */
    top: 0;                                                /* Alinha no topo.                                   */
    left: 0;                                               /* Alinha à esquerda.                                */
    width: 100%;                                           /* Largura total.                                    */
    z-index: 1000;                                         /* Ordem de empilhamento.                            */
    height: 100px;                                         /* Altura fixa.                                      */
}

/* O bloco abaixo estiliza a parte superior do cabeçalho */
.cabecalho-superior {
    padding: 20px;                                         /* Preenchimento interno.                            */
    height: 100%;                                          /* Altura total.                                     */
    display: flex;                                         /* Layout flexível.                                  */
    align-items: center;                                   /* Alinhamento vertical ao centro.                   */
    justify-content: flex-start;                           /* Alinhamento horizontal à esquerda.                */
}

/* O bloco abaixo estiliza o contêiner do título */
.titulo-conteiner h1 {
    color: #d4af37;                                        /* Cor do texto dourada.                             */
    font-size: 2.5rem;                                     /* Tamanho da fonte.                                 */
    font-weight: 700;                                      /* Peso da fonte.                                    */
    font-style: italic;                                    /* Estilo da fonte itálico.                          */
    margin-bottom: 2px;                                    /* Margem inferior.      


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

### `css/slide_harpacantor.css`

- Extensão: `.css`
- Tamanho: `15266 bytes`

- Funções detectadas (regex): `Nenhuma detectada`

- Variáveis/const detectadas (regex): `Nenhuma detectada`

- Classes detectadas (regex): `Nenhuma detectada`

- Ocorrências relacionadas à marca d'água (trechos):

  - `marcadagua` → ...*/ }  /* O bloco abaixo estiliza a marca d'água */ #marcadagua {     position: fixed;...

  - `marcaDagua` → ...*/ }  /* O bloco abaixo estiliza a marca d'água */ #marcadagua {     position: fixed;...


**Trecho inicial do arquivo (primeiras 4000 caracteres):**

```text

/*=====================================================*/
/*     ESTILOS PARA SLIDE DE HINOS - HARPA E CANTOR    */
/*   Layout, fundo, cabeçalho, conteúdo e controles    */
/*=====================================================*/

/* O bloco abaixo reseta e configura estilos base para a página */
html, body {
    margin: 0;                                             /* Remove margens padrão.                            */
    padding: 0;                                            /* Remove preenchimento padrão.                      */
    width: 100%;                                           /* Largura total.                                    */
    height: 100%;                                          /* Altura total.                                     */
    overflow: hidden;                                      /* Esconde conteúdo que transborda.                  */
    font-family: sans-serif;                               /* Define a família da fonte.                        */
    background-color: #181818;                            /* Cor de fundo escura.                              */
    color: white;                                          /* Cor do texto branca.                              */
    position: relative;                                    /* Posição relativa para elementos filhos.           */
    display: flex;                                         /* Layout flexível.                                  */
    flex-direction: column;                                /* Direção da flexbox para coluna.                   */
    min-height: 100vh;                                     /* Altura mínima da viewport.                        */
    box-sizing: border-box;                                /* Inclui bordas e preenchimento no tamanho total.   */
}

/* O bloco abaixo cria uma sobreposição escura na página */
body::before {
    content: '';                                           /* Conteúdo vazio necessário para o pseudo-elemento. */
    position: absolute;                                    /* Posição absoluta.                                 */
    top: 0;                                                /* Alinha no topo.                                   */
    left: 0;                                               /* Alinha à esquerda.                                */
    width: 100%;                                           /* Largura total.                                    */
    height: 100%;                                          /* Altura total.                                     */
    background-color: rgba(10, 10, 10, 0.85);              /* Cor de fundo preta com transparência.             */
    z-index: 1;                                            /* Ordem de empilhamento.                            */
}

/* O bloco abaixo estiliza o contêiner principal do slide */
#slide-conteiner {
    display: flex;                                         /* Layout flexível.                                  */
    flex-direction: column;                                /* Direção da flexbox para coluna.                   */
    justify-content: space-between;                        /* Distribui o espaço entre os elementos.            */
    align-items: center;                                   /* Alinha os itens ao centro.                        */
    height: 100vh;                                         /* Altura total da viewport.                         */
    width: 100%;                                           /* Largura total.                                    */
    box-sizing: border-box;                                /* Inclui bordas e preenchimento no tamanho total.   */
    position: relative;                                    /* Posição relativa.                                 */
    z-index: 2;                                            /* Ordem de empilhamento.                            */
}

/* O bloco abaixo estiliza o cabeçalho do slide */
#slide-header {
    bac


... (arquivo truncado no relatório — conteúdo completo salvo em /mnt/data) ...


```
---

## Consolidação das funções/variáveis/classes encontradas

- Funções detectadas (total 44): `_aplicarFiltrosERenderizar, _closeAllSelects, _makeCustomSelect, _populateLivrosDropdown, _renderizarResultados, abrirJanelaSlideHino, adjustMainContentMargin, atualizarFiltroLivro, atualizarFiltroPalavra, atualizarFiltroTestamento, carregarDadosBaseConcordancia, carregarEDisplayConcordanciaPorLetra, clearActiveNav, criarBotoesFaixa, criarSecaoLivro, definirClasseModulo, destacarPalavra, escreverHtmlNaJanela, estrofeAnterior, executarBuscaGlobalConcHandler, executarBuscaGlobalConcordancia, exibirEstrofe, exibirGradeDeHinos, exibirHino, extrairNomeLivroDaReferencia, fetchConcordanciaDataByLetter, findLivroByIdConfig, formatarNomeLivro, formatarReferencia, gerarHtmlJanelaHino, getOrdemDosLivrosConfig, getTestamentoDoLivroConfig, inicializarSlideHino, initConcordanciaDropdowns, loadView, obterTotalHinos, onConcordanciaViewLoadedAndReady, onConcordanciaViewReady, onDicionarioViewLoadedAndReady, proximaEstrofe, selecionarHinario, setActiveNav, setupGlobalLetterButtonListeners, showInitialState`

- Variáveis/const detectadas (total 241): `CONCORDANCIA_DATA_BASE_PATH, CONCORDANCIA_DATA_BASE_PATH_LOCAL, DICIONARIO_DATA_BASE_PATH_LOCAL, HINARIOS, HINARIOS_CONFIG, TAMANHO_FAIXA, TELA_CONCORDANCIA_PATH, TELA_DICIONARIO_VIEW_PATH, TodosOption, aExact, agrupado, allData, allResults, allTermos, altura, antigoTestamento, arquivos, bExact, batch, batchPromises, batchResults, batchSize, bibliaConfig, botoesFaixaConteiner, botoesHinosConteiner, btn, btnAnterior, btnCantor, btnConsultar, btnFaixa, btnHarpa, btnLetraAtiva, btnProximo, btnSlide, buscaDicionarioInput, buscaGlobalInput, cacheKey, carregarMaisText, cleanParagraph, commonLetters, concordanciasCorrespondentes, contador, contadorConteiner, conteiner, content, conteudoEl, conteudoPrincipal, currentView, dadosCarregadosPorLetraOuBusca, data, debounceTimeout, definicao, definicaoAdicional, definicaoPrincipal, div, elementos, end, endIndex, estrofeTexto, estrofes, estrofesArray, fallbackData, file, fileName, files, filesToIndex, filterTerm, filteredConcordancias, filteredResults, filtradas, filtroLivroAtual, filtroPalavraAtual, filtroPalavraInput, filtroPalavraInputConc, filtroTestamentoAtual, fim, finalConcordancias, finalResults, firstLetter, fragment, grupo, hasMore, header, hino, hinoAtivo, hinoExibidoConteiner, hinosFaixa, html, htmlConteudo, i, index, indexPath, indicator, indiceAtual, inicial, inicio, initialTestamentoValue, isAntigoTestamento, isCoro, isExpanded, isNovoTestamento, isSidebarVisible, item, itemsConteiner, janela, jsonData, largura, letra, letraA, letraAtivaSidebar, letraHtml, letrasPrioritarias, letrasProcessadas, letrasUnicas, letter, letterFiles, letterLower, letters, linhaBusca, listaLetras, listaLetrasResponse, livro, livroCfg, livroConfig, livroEncontrado, livroExistente, livroFiltro, livroLower, livroMatch, livroRef, livroSelect, livroSelectElement, livroTestamento, livros, livrosParaExibir, livrosPresentes, loadTime, loadingPromise, mapaLivros, match, matchesBook, matchesTestament, matchesText, matchesWord, matchingConcordances, matchingConcordancias, maxFilesPerLetter, memory, memoryInfo, mensagem, menuAlfabetico, navConcordancia, navDicionario, nextPage, nomeLivro, nomeLivroFormatado, nomeLivroOriginal, nomeLivroRef, nomeLower, nomeNormalizado, normalizado, normalizedTestamento, novoMostrandoValor, novoTestamento, oldPag, onLivroChangeGlobalCallback, onTestamentoChangeGlobalCallback, opt, option, ordem, originalDataCopy, pageData, paginacaoGrupo, palavraDiv, palavraElement, palavraFiltrada, palavraInput, palavraLower, palavraMatch, palavrasPorLetra, palavrasUnicas, partes, path, primeiraLetra, progressoEl, referencesHtml, referenciaNome, referencias, regex, regexBusca, response, restoDaReferencia, result, resultados, resultadosCompletos, resultadosConteiner, results, resultsHtml, searchLower, searchTerm, section, selectSelectedDisplay, selected, selectedDisplay, showingTotal, sidebarWidth, sinonimoLower, sinonimosMatch, start, startIndex, stats, tamanho, telaInicial, term, termo, termoBusca, termoBuscaGlobalAtual, termoLower, termos, testamento, testamentoFiltro, testamentoMatch, testamentoSelect, testamentoSelectElement, texto, textoFormatado, textoLimpo, textoMatch, themeStyle, titles, tituloEl, todasAsLetras, todosLivros, todosOption, todosOsResultadosGlobais, total, valor, valorSelecionado, versos, wordEntries, wordMatches`

- Classes detectadas (total 5): `ConcordanciaOptimized, DataManager, Dicionario, MainApp, SearchIndex`


## Checagem rápida com a LOGICA do documento fornecido

- Verifiquei especificamente por ocorrências relacionadas a `marcadagua` / `marcaDagua` / `marca-dagua`.

- Recomendação: aplicar rename/normalização caso existam variações (ex.: `marcadagua` vs `marcaDagua`).

- Recomendo executar find/replace em lote nos arquivos do projeto conforme lista de mapeamentos já fornecida.
