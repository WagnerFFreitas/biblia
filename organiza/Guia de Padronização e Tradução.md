Guia de Padronização e Tradução do Projeto

Este documento serve como um guia abrangente para a padronização de código, documentação e nomenclatura de elementos no projeto, garantindo consistência, clareza e manutenibilidade.

1. Procedimentos e Regras Gerais

Esta seção detalha as diretrizes para padronização de comentários e organização de código.

1.1 Padronização de Comentários

Todos os comentários devem ser escritos em português, ser objetivos e explicar o "porquê" do código, não apenas o "o quê".

Cabeçalho do Arquivo:

code
Css
download
content_copy
expand_less

/*====================================================================*/
/*================== NOME DA SEÇÃO EM MAIÚSCULAS =====================*/
/*     Descrição curta do que o arquivo estiliza.                     */
/*====================================================================*/

Comentários de Bloco (/* [Bloco] ... */)

Uso: Agrupar e descrever um conjunto de regras CSS relacionadas.

Posicionamento: Imediatamente antes do primeiro seletor do bloco.

Formato:

code
Css
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
/* [Bloco] Descrição concisa do propósito do bloco de código. */
.seletor-1 { /* ... */ }
.seletor-2 { /* ... */ }

Exemplo:

code
Css
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
/* [Bloco] Configura a barra de paginação e o contador de resultados. */
.conteiner-contador {
    position: fixed; /* ... */
}
.btn-paginacao { /* ... */ }

Comentários de Linha (/* ... */)

Uso: Explicar uma única declaração CSS que possa não ser óbvia.

Posicionamento: Na mesma linha, à direita da declaração, alinhado.

Formato:

code
Css
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
.seletor {
    propriedade: valor;     /* Explicação do porquê desta linha. */
    outra-propriedade: valor; /* Outra explicação. */
}

Exemplo:

code
Css
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
#marcadagua {
    position: fixed;          /* Garante que a marca d'água não role com a página. */
    z-index: -1;              /* Coloca a imagem atrás de todo o conteúdo. */
    pointer-events: none;     /* Permite que o usuário clique "através" da imagem. */
}

Cabeçalho do Arquivo:

code
JavaScript
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
/*===============================================================================*/
/*               NOME DO MÓDULO EM MAIÚSCULAS                                */
/*===============================================================================*/
/*  [Arquivo] Contém:                                                          */
/*                   - Breve descrição do ponto 1.                             */
/*                   - Breve descrição do ponto 2.                             */
/*===============================================================================*/

Comentários de Bloco (/* [Bloco] ... */)

Uso: Descrever o propósito de uma classe, função ou agrupamento lógico de código.

Posicionamento: Imediatamente antes da declaração.

Exemplos:

code
JavaScript
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
/* [Bloco] Carrega e exibe um versículo específico da Bíblia a partir de um arquivo. */
window.carregarVersiculoEspecifico = async function(livro, capitulo, versiculo) {
    // ... código da função
}

/* [Bloco] Variáveis de estado globais para controle da navegação. */
window.titulo = null;
window.livroAtivo = null;

Comentários de Linha (// ...)

Uso: Explicar uma única linha ou pequeno trecho complexo.

Posicionamento: Imediatamente antes da linha ou na mesma linha, à direita.

Formato:

code
JavaScript
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
// Explicação do que a próxima linha faz.
const algumaVariavel = algumCalculoComplexo();

outraVariavel = 10; // Explicação na mesma linha.

Exemplo:

code
JavaScript
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
// Converte a string JSON em um objeto para podermos acessar seus dados.
const dados = await resposta.json();

if (!areaConteudo) return; // Interrompe a função se o elemento principal não for encontrado.
1.2 Organização dos Blocos de Comentários CSS

Siga as seguintes boas práticas para organizar os blocos de comentários e regras CSS:

Reset/normalização

Estrutura básica (body, html, tipografia, cores globais)

Layouts principais (header, main, footer, sidebar)

Componentes (cards, botões, formulários, etc.)

Utilitários/media queries

2. Guia de Estilo e Padronização de Nomenclatura

Esta seção define as convenções de nomenclatura para seletores CSS/HTML e elementos JavaScript, bem como termos que não devem ser traduzidos.

2.1 Itens Intencionalmente Não Traduzidos

Para garantir a funcionalidade do código e seguir convenções universais, os seguintes tipos de termos não devem ser traduzidos:

Categoria	Exemplos	Motivo
Tags HTML	<body>, <header>, <nav>, <div>, <h1>, <a>	Palavras-chave fixas da linguagem HTML.
Atributos HTML Padrão	id, class, href, src, alt, for, disabled	Nomes de atributos definidos pela especificação do HTML.
Padrão data-*	data-livro, data-capitulo, data-letra	Prefixo padrão do HTML5. Traduzi-lo quebraria o acesso via element.dataset.
Palavras-Chave JavaScript	class, constructor, function, async, await, let, const, if	Sintaxe fundamental da linguagem JavaScript.
APIs do Navegador (DOM)	document, window, localStorage, console, fetch	Objetos e interfaces globais fornecidos pelo ambiente do navegador.
Métodos e Propriedades de APIs	.getElementById(), .querySelector(), .addEventListener()	Nomes fixos de "comandos" para manipular elementos e dados.
Nomes de Eventos	DOMContentLoaded, click, change, input	Nomes de eventos padrão do navegador.
Propriedades CSS	background-color, font-size, margin-left, display	Propriedades da própria linguagem CSS.
Pseudo-classes/elementos CSS	:hover, :disabled, ::before, ::after	Seletores especiais fixos da linguagem CSS.
Nomes de Arquivos	versoes.js, concordancia.css	Devem ser consistentes com as referências nos HTMLs e nas chamadas fetch().
2.2 Padrões de Nomenclatura Aplicados

Padrão Principal: kebab-case (ex: nome-do-componente) para seletores CSS e HTML.

Padrão Principal: camelCase para variáveis e funções JavaScript, e PascalCase para classes JavaScript.

Regra de Concordância: Nomes compostos seguem a ordem gramatical do português [parte]-[componente] (ex: .conteudo-concordancia).

Regra btn -> botao: Todas as ocorrências da abreviação btn foram substituídas por botao.

3. Relatório Final de Traduções (HTML, CSS e JavaScript)

Este relatório detalha todas as traduções aplicadas aos seletores CSS/HTML e elementos JavaScript, indicando os arquivos afetados.

3.1 Seletores CSS e HTML

Padrão de Tradução: kebab-case

Nome Original	Nome Final (Traduzido)	Tipo	Arquivo(s) Afetado(s) (Exemplos)	Interligações
#search-overlay-content	#overlay-busca-conteudo	ID	biblia_realizabusca.css, biblia_realizabusca.js	JS cria dinamicamente o HTML.
.search-overlay-resultado-item	.item-resultado-overlay-busca	Classe	biblia_realizabusca.css, biblia_realizabusca.js	Estiliza resultados na busca pop-up.
.palavra-section	.selecao-palavra	Classe	concordancia.css, concordancia-optimizada.js	(JS) Cria dinamicamente o card principal.
.palavra-header	.palavra-cabecalho	Classe	concordancia.css, concordancia-optimizada.js	(JS) Cria dinamicamente o cabeçalho do card.
.expand-indicator	.indicador-expansao	Classe	concordancia.css, concordancia-optimizada.js	(JS) Manipula rotação do ícone.
.menu-button	.botao-menu	Classe	cantor_cristao.css, harpa_cantor.html	Estiliza botões "Harpa Cristã" e "Cantor Cristão".
.hino-container	.conteiner-hino	Classe	cantor_cristao.css, harpa_cantor.js	(JS) Cria o card para exibir a letra do hino.
.reading-mode-header	.cabecalho-modo-leitura	Classe	modo_leitura.css, versoes_modoleitura.js	(JS) Criado dinamicamente.
.chapter-verses	.capitulo-versiculos	Classe	modo_leitura.css, versoes_modoleitura.js	(JS) Contêiner principal para versículos.
#voltar-botao, #proximo-botao	#botao-voltar, #botao-proximo	IDs	slide_biblia.css, slide_biblia_interface.js	(JS) Botões de navegação.
.container	.conteiner	Classe	menu_dicionarioconcordancia.css, versoes.css, menu_dicionarioconcordancia.html, versoes.html	Classe de layout principal em várias páginas.
.container-titulo	.conteiner-titulo	Classe	versoes.css, menu_dicionarioconcordancia.css, versoes.html, menu_dicionarioconcordancia.html	Div que envolve o título principal.
.btn-letra	.botao-letra	Classe	menu_dicionarioconcordancia.css, menu_dicionarioconcordancia.html	Botões de letra no menu alfabético.
.custom-select	.selecao-personalizada	Classe	concordancia.css, menu_dicionarioconcordancia.html	Div que envolve os dropdowns customizados.
livro-select (id)	selecao-livro	ID	concordancia.css, menu_dicionarioconcordancia.html	For do label e id do dropdown de livros.
btn-buscar	botao-buscar	ID	concordancia.css, menu_dicionarioconcordancia.html	Botão principal de busca.
loading-indicator	indicador-carregamento	ID	concordancia.css, menu_dicionarioconcordancia.html, concordancia-optimizada.js	(JS) Manipula visibilidade do loader.
spinner-carregamento	icone-carregamento	Classe	concordancia.css, menu_dicionarioconcordancia.html	Elemento visual do loader.
container-contador	conteiner-contador	Classe/ID	concordancia.css, menu_dicionarioconcordancia.html	Barra que exibe o contador de resultados.
btn-carregar-mais	botao-carregar-mais	ID	concordancia.css, menu_dicionarioconcordancia.html	Botão para carregar mais resultados.
container-resultados	conteiner-resultados	ID	concordancia.css, menu_dicionarioconcordancia.html, concordancia-optimizada.js	(JS) Div onde os resultados são injetados.
wrapper-conteudo-dicionario	agrupador-conteudo-dicionario	Classe	dicionario.css, menu_dicionarioconcordancia.html	Div que agrupa elementos do layout do dicionário.
baixar-list, utilidades-list	baixar-lista, utilidades-lista	IDs	versoes.css, versoes.html, dropdown.js	(JS) IDs das <ul> dos menus dropdown.
.opcoes-menu	.menu-opcoes	Classe	versoes.css, menu_dicionarioconcordancia.css, versoes.html, menu_dicionarioconcordancia.html	<ul> da barra de navegação principal.
3.2 Aplicação da Regra btn -> botao (CSS/HTML)
Nome Original	Nome Final (Traduzido)	Arquivo(s) Onde Aparece (Exemplos)
.letra-btn	.botao-letra	menu_dicionarioconcordancia.css, menu_dicionarioconcordancia.html
#btn-buscar	#botao-buscar	concordancia.css, menu_dicionarioconcordancia.html
.search-btn	.botao-busca	concordancia.css
#btn-carregar-mais	#botao-carregar-mais	concordancia.css, menu_dicionarioconcordancia.html
.btn-paginacao	.botao-paginacao	concordancia.css
.dicionario-btn	.botao-dicionario	dicionario.css, menu_dicionarioconcordancia.html
#btnHarpa, #btnCantor, #btnSlide	#botaoHarpa, #botaoCantor, #botaoSlide	harpa_cantor.html
3.3 Variáveis e Constantes JavaScript

Padrão de Nomenclatura: camelCase

Nome Original	Nome Traduzido	Arquivo(s) Onde Aparece
content	areaConteudo	acf.js, ara.js, arc.js, kjv.js, naa.js, ntlh.js, nvi.js, nvt.js, original.js, sobre.js
response	resposta	acf.js, ara.js, arc.js, kjv.js, naa.js, ntlh.js, nvi.js, nvt.js, original.js
data	dados	acf.js, ara.js, arc.js, kjv.js, naa.js, ntlh.js, nvi.js, nvt.js, original.js
searchTerm	termoBusca	gerenciador_concordancia.js, concordancia-optimizada.js
isLoading	estaCarregando	concordancia-optimizada.js
existingVersiculoDiv	divVersiculoExistente	acf.js, ara.js, arc.js, kjv.js, naa.js, ntlh.js, nvi.js, nvt.js, original.js
versiculoElementDiv	divElementoVersiculo	acf.js, ara.js, arc.js, kjv.js, naa.js, ntlh.js, nvi.js, nvt.js, original.js
currentLetter	letraAtual	gerenciador_concordancia.js, dicionario.js, concordancia-optimizada.js
currentPage	paginaAtual	gerenciador_concordancia.js, dicionario.js, concordancia-optimizada.js
itemsPerPage	itensPorPagina	gerenciador_concordancia.js, dicionario.js
allTermos / allData	todosTermosLetra	gerenciador_concordancia.js, dicionario.js
allGlobalTermos	todosTermosGlobais	dicionario.js
listaLetras	indiceLetras	gerenciador_concordancia.js, dicionario.js
hasMore	temMaisResultados	concordancia-optimizada.js, gerenciador_concordancia.js
activeHinario	hinarioAtivo	harpa_cantor.js
activeHinoData	dadosHinoAtivo	harpa_cantor.js
livroKey	chaveLivro	biblia-navegacao.js
BIBLE_VERSION	VERSAO_BIBLIA	acf.js, ara.js, arc.js, kjv.js, naa.js, ntlh.js, nvi.js, nvt.js, original.js
NOME_VERSAO_COMPLETA_BIBLIA	NOME_COMPLETO_VERSAO_BIBLIA	acf.js, ara.js, arc.js, kjv.js, naa.js, ntlh.js, nvi.js, nvt.js, original.js, versoes.js
activeLivro	livroAtivo	biblia-navegacao.js, versoes.js, versoes_modoleitura.js
activeCapitulo	capituloAtivo	biblia-navegacao.js, versoes.js, versoes_modoleitura.js
activeVersiculoButton	botaoVersiculoAtivo	biblia-navegacao.js, versoes.js
3.4 Funções JavaScript

Padrão de Nomenclatura: camelCase

Nome Original	Nome Traduzido	Arquivo(s) Onde Aparece
loadSpecificVerse	carregarVersiculoEspecifico	acf.js, ara.js, arc.js, kjv.js, naa.js, ntlh.js, nvi.js, nvt.js, original.js
getSpecificVerseCount	obterContagemVersiculosEspecifica	acf.js, ara.js, arc.js, kjv.js, naa.js, ntlh.js, nvi.js, nvt.js, original.js
getSpecificChapterTitle	obterTituloCapituloEspecifico	acf.js, ara.js, arc.js, kjv.js, naa.js, ntlh.js, nvi.js, nvt.js, original.js
toggleReadingMode	alternarModoLeitura	versoes.js, versoes_modoleitura.js
initializeDropdowns	inicializarMenusSuspensos	dropdown.js
loadBook	carregarLivro	biblia-navegacao.js
createCapitulosButtons	criarBotoesCapitulos	biblia-navegacao.js
toggleVersiculos	alternarVersiculos	biblia-navegacao.js
performGlobalSearch	executarBuscaGlobal	concordancia-optimizada.js
updateResultsCounter	atualizarContadorResultados	concordancia.js, concordancia-optimizada.js
showLoading	mostrarCarregamento	concordancia.js, concordancia-optimizada.js
loadLetterList	carregarIndiceLetras	gerenciador_concordancia.js
loadLetterData	carregarDadosPorLetra	gerenciador_concordancia.js
handleSearch	manipularBusca	dicionario.js
getLivroDisplayName	obterNomeExibicaoLivro	biblia-navegacao.js, acf.js, ara.js, arc.js, etc.
abrirJanelaDeBusca	abrirJanelaDeBusca	biblia_realizabusca.js (Mantido)
carregaScriptAssincrono	carregarScriptAssincrono	versoes.js (Mantido, pequeno ajuste)
3.5 Classes JavaScript

Padrão de Nomenclatura: PascalCase

Nome Original	Nome Traduzido	Arquivo(s) Onde Aparece
DataManager	GerenciadorDados	gerenciador_concordancia.js
ConcordanciaOptimized	ConcordanciaOtimizada	concordancia-optimizada.js
Dicionario	Dicionario	dicionario.js (Mantido)
MainApp	AppPrincipal	menu_dicionarioconcordancia.js
InterfaceManager	GerenciadorInterface	versoes_interface.js
VersiculosManager	GerenciadorVersiculos	versoes_versiculos.js

