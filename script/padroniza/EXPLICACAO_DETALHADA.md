# EXPLICAÇÃO DETALHADA DOS SCRIPTS DA BÍBLIA DIGITAL

## O que são estes arquivos?

Estes arquivos são como "receitas" que ensinam o computador como funcionar a Bíblia digital. Cada arquivo tem uma função específica, como se fossem diferentes "departamentos" de uma empresa.

## ARQUIVO: `biblia-navegacao.js`

### O que faz?
Este arquivo é como o "GPS" da Bíblia digital. Ele controla o que acontece quando você clica em um livro, capítulo ou versículo.

### Principais partes:

#### 1. **Lista de todos os livros da Bíblia** (linhas 15-75)
```javascript
const livros = {
    "genesis": { "capitulos": 50, "displayName": "GÊNESIS" },
    "exodo": { "capitulos": 40, "displayName": "ÊXODO" },
    // ... mais livros
}
```
**O que faz:** É como uma "agenda telefônica" dos livros bíblicos. Para cada livro, guarda:
- O nome interno (usado pelo programa)
- Quantos capítulos tem
- O nome bonito para mostrar na tela

#### 2. **Variáveis de controle** (linhas 77-81)
```javascript
window.titulo = null;
window.activeLivro = null;
window.activeCapitulo = null;
```
**O que faz:** São como "lembretes" que o programa usa para saber:
- Qual livro está aberto agora
- Qual capítulo está sendo lido
- Qual versículo está destacado

#### 3. **Função para criar botões de capítulos** (linhas 90-125)
**O que faz:** Quando você clica em um livro (ex: Gênesis), esta função cria automaticamente 50 botões numerados (1, 2, 3... 50) para cada capítulo.

#### 4. **Função para criar botões de versículos** (linhas 127-160)
**O que faz:** Quando você clica em um capítulo, esta função cria botões para cada versículo daquele capítulo.

#### 5. **Função principal de navegação** (linhas 162-220)
**O que faz:** É como um "organizador de gavetas". Quando você clica em algo:
- Se já estava aberto, ele fecha (como fechar uma gaveta)
- Se estava fechado, ele abre e mostra o conteúdo
- Atualiza o título da página para mostrar onde você está

## ARQUIVO: `versoes.js`

### O que faz?
Este é o "gerente geral" da Bíblia digital. Ele coordena tudo e carrega os outros arquivos conforme necessário.

### Principais partes:

#### 1. **Função para ler a URL** (linhas 12-15)
```javascript
function obterParametroUrl(parametro) {
    const parametrosUrl = new URLSearchParams(window.location.search);
    return parametrosUrl.get(parametro);
}
```
**O que faz:** Lê a barra de endereço do navegador. Por exemplo, se a URL for `site.com?versao=nvi`, ela pega "nvi".

#### 2. **Função para carregar outros arquivos** (linhas 17-32)
**O que faz:** É como um "entregador" que vai buscar outros arquivos de código quando precisa. Por exemplo, se você escolher a versão NVI, ele vai buscar o arquivo `nvi.js`.

#### 3. **Variáveis globais** (linhas 34-39)
```javascript
window.NOME_VERSAO_COMPLETA_BIBLIA = 'Versão King James';
window.modoLeituraAtivo = false;
```
**O que faz:** São "lembretes globais" que todos os arquivos podem ver:
- Qual versão da Bíblia está ativa
- Se o modo de leitura está ligado
- Qual foi o último livro/capítulo lido

#### 4. **Função de navegação automática** (linhas 41-70)
**O que faz:** É como um "piloto automático". Se alguém clicar em um link para "João 3:16", esta função:
1. Abre o livro de João
2. Vai para o capítulo 3
3. Destaca o versículo 16
4. Tudo automaticamente!

#### 5. **Inicializador principal** (linhas 72-120)
**O que faz:** É como o "botão de ligar" da Bíblia digital. Quando você abre o site, esta função:
1. Carrega todos os arquivos necessários
2. Configura os menus
3. Prepara a interface
4. Deixa tudo pronto para usar

#### 6. **Sistema de busca** (linhas 180-300)
**O que faz:** Cria uma tela de pesquisa que aparece por cima do site quando você quer procurar uma palavra ou frase na Bíblia.

## ARQUIVO: `concordancia.js`

### O que faz?
Este é o "sistema de busca avançado" da Bíblia digital. É como ter um "Google" só para a Bíblia!

### Principais partes:

#### 1. **Variáveis de memória** (linhas 15-25)
```javascript
let dadosCarregadosPorLetraOuBusca = [];
let filtroTestamentoAtual = 'todos';
let filtroLivroAtual = 'todos';
```
**O que faz:** São como "gavetas de memória" onde o programa guarda:
- Os resultados da busca atual
- Se o usuário quer ver só Antigo ou Novo Testamento
- Se o usuário quer ver só um livro específico
- Qual palavra está sendo procurada

#### 2. **Função de busca por letra** (linhas 27-50)
**O que faz:** Quando você clica em uma letra (ex: "A"), esta função:
1. Vai buscar um arquivo com todas as palavras que começam com "A"
2. Mostra "Carregando..." enquanto busca
3. Se encontrar, mostra os resultados
4. Se não encontrar, mostra erro

#### 3. **Funções de filtro** (linhas 60-80)
**O que faz:** Permitem filtrar os resultados por:
- Testamento (Antigo/Novo)
- Livro específico
- Palavra específica

#### 4. **Funções auxiliares** (linhas 85-110)
**O que faz:** São "ajudantes" que:
- Extraem o nome do livro de uma referência (ex: "João 3:16" → "João")
- Destacam palavras nos resultados (colocam em amarelo)
- Formatam nomes de livros (ex: "1 Samuel" → "1º Samuel")

## ARQUIVO: `livros_capitulos.js`

### O que faz?
Este é como uma "tabela de informações" muito detalhada sobre a estrutura da Bíblia.

### Principais partes:

#### 1. **Grande tabela de informações** (linhas 10-50)
```javascript
window.versiculosPorCapitulo = {
    "genesis": { 1: 31, 2: 25, 3: 24... },
    "exodo": { 1: 22, 2: 25, 3: 22... },
    // ... todos os livros
}
```
**O que faz:** É como uma "ficha técnica" de cada livro da Bíblia que diz:
- Gênesis capítulo 1 tem 31 versículos
- Gênesis capítulo 2 tem 25 versículos
- E assim por diante para todos os 66 livros

#### 2. **Função consultora** (linhas 52-60)
```javascript
window.getVerseCount = function(livro, capitulo) {
    // busca na tabela e retorna quantos versículos tem
}
```
**O que faz:** É como um "consultor especializado". Quando o programa pergunta "Quantos versículos tem João capítulo 3?", esta função:
1. Procura na tabela
2. Encontra que tem 36 versículos
3. Retorna o número 36

## OUTROS ARQUIVOS IMPORTANTES:

### `dicionario.js`
**O que faz:** Sistema de dicionário bíblico com explicações de palavras difíceis.

### `slide_biblia.js`
**O que faz:** Cria apresentações de slides com versículos bíblicos para projeção.

### `versoes_cache.js`
**O que faz:** Guarda informações na memória do computador para o site carregar mais rápido.

### `dropdown.js`
**O que faz:** Controla os menus suspensos (dropdowns) da interface.

### `sobre.js`
**O que faz:** Controla a tela "Sobre" com informações do projeto.

### Arquivos de versões (`nvi.js`, `arc.js`, `kjv.js`, etc.)
**O que fazem:** Contêm o texto bíblico propriamente dito de cada tradução.

## COMO TUDO FUNCIONA JUNTO:

1. **Você abre o site** → `versoes.js` inicializa tudo
2. **Você clica em um livro** → `biblia-navegacao.js` mostra os capítulos
3. **Você clica em um capítulo** → `livros_capitulos.js` informa quantos versículos tem
4. **Você clica em um versículo** → Carrega o texto do arquivo da versão (ex: `nvi.js`)
5. **Você faz uma busca** → `concordancia.js` procura em todos os textos
6. **Você usa o dicionário** → `dicionario.js` mostra as explicações
7. **Você cria um slide** → `slide_biblia.js` monta a apresentação

## ANALOGIA SIMPLES:

Imagine a Bíblia digital como uma **biblioteca automatizada moderna**:

- `versoes.js` = **Bibliotecário chefe** (coordena tudo e recebe os visitantes)
- `biblia-navegacao.js` = **Sistema de localização** (te leva ao livro e prateleira certa)
- `livros_capitulos.js` = **Catálogo detalhado** (sabe exatamente quantas páginas cada livro tem)
- `concordancia.js` = **Sistema de busca avançado** (encontra qualquer palavra em segundos)
- `dicionario.js` = **Seção de referência** (explica termos difíceis)
- `slide_biblia.js` = **Sala de projeção** (mostra versículos em slides)
- `versoes_cache.js` = **Sistema de arquivo rápido** (guarda coisas para acessar mais rápido)
- Arquivos de versões (`nvi.js`, `arc.js`, etc.) = **Os livros propriamente ditos** (o conteúdo real)

Cada "funcionário" (arquivo) tem sua função específica, mas todos trabalham juntos para você ter uma experiência completa e rápida de leitura da Bíblia digital!

## RESUMO FINAL:

**Em palavras simples:** Estes arquivos são como os "funcionários" de uma biblioteca digital da Bíblia. Cada um tem um trabalho específico:

- Alguns organizam os livros
- Outros fazem buscas
- Alguns controlam os menus
- Outros guardam as informações
- E alguns contêm o texto da Bíblia

Quando você clica em algo no site, vários destes "funcionários" trabalham juntos para te mostrar exatamente o que você quer ver, de forma rápida e organizada!