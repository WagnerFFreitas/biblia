/*===============================================================================*/
/*                         SCRIPT DE NAVEGAÇÃO DA BÍBLIA                         */
/*===============================================================================*/
/*  Este arquivo contém:                                                         */
/*       - Gerenciamento da navegação entre livros, capítulos e versículos       */
/*                  - Controle de exibição do conteúdo bíblico                   */
/*          - Estado global de navegação e integração com modo leitura           */
/*===============================================================================*/

console.log("[biblia-navegacao.js] Script carregado.");                           // Confirma que o script foi carregado no console do navegador para depuração.

// Este bloco e a configuração central para todos os livros da Bíblia, definindo suas chaves de identificação (ex: "genesis"), a quantidade de capítulos e o nome formatado para exibição.
const livros = {
    "genesis": { "capitulos": 50, "displayName": "GÊNESIS" },
    "exodo": { "capitulos": 40, "displayName": "ÊXODO" },
    "levitico": { "capitulos": 27, "displayName": "LEVÍTICO" },
    "numeros": { "capitulos": 36, "displayName": "NÚMEROS" },
    "deuteronomio": { "capitulos": 34, "displayName": "DEUTERONÔMIO" },
    "josue": { "capitulos": 24, "displayName": "JOSUÉ" },
    "juizes": { "capitulos": 21, "displayName": "JUÍZES" },
    "rute": { "capitulos": 4, "displayName": "RUTE" },
    "1samuel": { "capitulos": 31, "displayName": "1º SAMUEL" },
    "2samuel": { "capitulos": 24, "displayName": "2º SAMUEL" },
    "1reis": { "capitulos": 22, "displayName": "1º REIS" },
    "2reis": { "capitulos": 25, "displayName": "2º REIS" },
    "1cronicas": { "capitulos": 29, "displayName": "1º CRÔNICAS" },
    "2cronicas": { "capitulos": 36, "displayName": "2º CRÔNICAS" },
    "esdras": { "capitulos": 10, "displayName": "ESDRAS" },
    "neemias": { "capitulos": 13, "displayName": "NEEMIAS" },
    "ester": { "capitulos": 10, "displayName": "ESTER" },
    "jo": { "capitulos": 42, "displayName": "JÓ" },
    "salmos": { "capitulos": 150, "displayName": "SALMOS" },
    "proverbios": { "capitulos": 31, "displayName": "PROVÉRBIOS" },
    "eclesiastes": { "capitulos": 12, "displayName": "ECLESIASTES" },
    "cantares": { "capitulos": 8, "displayName": "CANTARES" },
    "isaias": { "capitulos": 66, "displayName": "ISAÍAS" },
    "jeremias": { "capitulos": 52, "displayName": "JEREMIAS" },
    "lamentacoes": { "capitulos": 5, "displayName": "LAMENTAÇÕES" },
    "ezequiel": { "capitulos": 48, "displayName": "EZEQUIEL" },
    "daniel": { "capitulos": 12, "displayName": "DANIEL" },
    "oseias": { "capitulos": 14, "displayName": "OSÉIAS" },
    "joel": { "capitulos": 3, "displayName": "JOEL" },
    "amos": { "capitulos": 9, "displayName": "AMÓS" },
    "obadias": { "capitulos": 1, "displayName": "OBADIAS" },
    "jonas": { "capitulos": 4, "displayName": "JONAS" },
    "miqueias": { "capitulos": 7, "displayName": "MIQUÉIAS" },
    "naum": { "capitulos": 3, "displayName": "NAUM" },
    "habacuque": { "capitulos": 3, "displayName": "HABACUQUE" },
    "sofonias": { "capitulos": 3, "displayName": "SOFONIAS" },
    "ageu": { "capitulos": 2, "displayName": "AGEU" },
    "zacarias": { "capitulos": 14, "displayName": "ZACARIAS" },
    "malaquias": { "capitulos": 4, "displayName": "MALAQUIAS" },
    "mateus": { "capitulos": 28, "displayName": "MATEUS" },
    "marcos": { "capitulos": 16, "displayName": "MARCOS" },
    "lucas": { "capitulos": 24, "displayName": "LUCAS" },
    "joao": { "capitulos": 21, "displayName": "JOÃO" },
    "atos": { "capitulos": 28, "displayName": "ATOS" },
    "romanos": { "capitulos": 16, "displayName": "ROMANOS" },
    "1corintios": { "capitulos": 16, "displayName": "1ª CORÍNTIOS" },
    "2corintios": { "capitulos": 13, "displayName": "2ª CORÍNTIOS" },
    "galatas": { "capitulos": 6, "displayName": "GÁLATAS" },
    "efesios": { "capitulos": 6, "displayName": "EFÉSIOS" },
    "filipenses": { "capitulos": 4, "displayName": "FILIPENSES" },
    "colossenses": { "capitulos": 4, "displayName": "COLOSSENSES" },
    "1tessalonicenses": { "capitulos": 5, "displayName": "1ª TESSALONICENSES" },
    "2tessalonicenses": { "capitulos": 3, "displayName": "2ª TESSALONICENSES" },
    "1timoteo": { "capitulos": 6, "displayName": "1ª TIMÓTEO" },
    "2timoteo": { "capitulos": 4, "displayName": "2ª TIMÓTEO" },
    "tito": { "capitulos": 3, "displayName": "TITO" },
    "filemom": { "capitulos": 1, "displayName": "FILEMOM" },
    "hebreus": { "capitulos": 13, "displayName": "HEBREUS" },
    "tiago": { "capitulos": 5, "displayName": "TIAGO" },
    "1pedro": { "capitulos": 5, "displayName": "1ª PEDRO" },
    "2pedro": { "capitulos": 3, "displayName": "2ª PEDRO" },
    "1joao": { "capitulos": 5, "displayName": "1ª JOÃO" },
    "2joao": { "capitulos": 1, "displayName": "2ª JOÃO" },
    "3joao": { "capitulos": 1, "displayName": "3ª JOÃO" },
    "judas": { "capitulos": 1, "displayName": "JUDAS" },
    "apocalipse": { "capitulos": 22, "displayName": "APOCALIPSE" }
};

// Este bloco são das variáveis globais para controle de estado da navegação.
window.titulo = null;                                                             // Armazena a referência ao elemento H2 que mostra o título atual (ex: "GÊNESIS - CAPÍTULO 1").
window.activeLivro = null;                                                        // Armazena a chave do livro atualmente selecionado (ex: "genesis").
window.activeCapitulo = null;                                                     // Armazena o número do capítulo atualmente selecionado (ex: 1).
window.activeVersiculoButton = null;                                              // Armazena a referência ao botão do versículo atualmente ativo, para controle de estilo e comportamento.

// Este bloco cria a função que retorna o nome formatado de um livro para exibição, usando a chave como fallback.
window.getLivroDisplayName = function(livroKey) {
    if (livros[livroKey] && livros[livroKey].displayName) {                       // Verifica se a chave do livro existe na configuração e tem um nome de exibição.
        return livros[livroKey].displayName;                                      // Retorna o nome formatado (ex: "GÊNESIS").
    }
    return livroKey ? livroKey.toUpperCase() : "LIVRO DESCONHECIDO";              // Se não encontrar, retorna a chave em maiúsculas ou uma mensagem de erro.
};

// Este bloco cria a função que retorna um conteiner com botões para todos os capítulos de um livro.
function createCapitulosButtons(livro) {
    if (!livros[livro]) {                                                         // Validação para garantir que o livro solicitado existe na nossa estrutura de dados.
        console.error(`[Navegação createCapitulosButtons] Livro inválido: ${livro}`);  // Loga um erro se o livro não for encontrado.
        const div = document.createElement('div');                                // Cria um div vazio para retornar em caso de erro.
        div.classList.add('capitulos', 'book-content');                           // Adiciona as classes padrão.
        return div;                                                               // Retorna o div vazio para não quebrar a interface.
    }
    const capitulos = livros[livro].capitulos;                                    // Obtém o número total de capítulos do livro a partir da configuração.
    const capitulosConteiner = document.createElement('div');                     // Cria o elemento <div> que servirá como conteiner para os botões.
    capitulosConteiner.classList.add('capitulos', 'book-content');                // Adiciona classes CSS para estilização.
    for (let i = 1; i <= capitulos; i++) {                                        // Faz um loop de 1 até o número total de capítulos.
        const button = document.createElement('button');                          // Cria um novo elemento <button> para cada capítulo.
        button.textContent = `${i}`;                                              // Define o texto do botão como o número do capítulo.
        button.classList.add('botao-capitulo');                                   // Adiciona uma classe CSS para estilização do botão.
        button.dataset.livro = livro;                                             // Armazena a chave do livro no atributo 'data-livro' do botão.
        button.dataset.capitulo = i;                                              // Armazena o número do capítulo no atributo 'data-capitulo'.
        button.addEventListener('click', (e) => {                                 // Adiciona um ouvinte de evento de clique ao botão.
            const livroClicado = e.currentTarget.dataset.livro;                   // Obtém a chave do livro do botão que foi clicado.
            const capituloClicado = parseInt(e.currentTarget.dataset.capitulo);   // Obtém e converte o número do capítulo para inteiro.
            // Verifica se o modo de leitura está ativo para decidir a ação a ser tomada.
            if (window.isReadingModeEnabled && typeof window.carregarCapituloModoLeitura === 'function') {
                window.activeLivro = livroClicado;                                // Atualiza o estado global do livro ativo.
                window.activeCapitulo = capituloClicado;                          // Atualiza o estado global do capítulo ativo.
                window.activeVersiculoButton = null;                              // Reseta o versículo ativo.
                window.carregarCapituloModoLeitura(livroClicado, capituloClicado);  // Chama a função para carregar o capítulo inteiro no modo leitura.
            } else {                                                              // Se não estiver no modo leitura,
                window.toggleVersiculos(livroClicado, capituloClicado);           // chama a função para mostrar/esconder a lista de versículos.
            }
        });
        capitulosConteiner.appendChild(button);                                   // Adiciona o botão recém-criado ao conteiner de capítulos.
    }
    return capitulosConteiner;                                                    // Retorna o conteiner populado com todos os botões de capítulo.
}

// Este bloco cria a função que retorna um conteiner com botões para todos os versículos de um capítulo.
function createVersiculosButtons(livro, capitulo) {
    const versiculosConteiner = document.createElement('div');                    // Cria o <div> que conterá os botões de versículo.
    versiculosConteiner.classList.add('versiculos', 'book-content');              // Adiciona classes CSS para estilização.
    // Esta função depende de uma função específica da versão da Bíblia (ex: nvt.js) para saber quantos versículos existem.
    if (typeof window.getSpecificVerseCount !== 'function') {
        console.error("[Navegação createVersiculosButtons] Erro: Função 'getSpecificVerseCount' não definida.");  // Loga um erro se a dependência não for encontrada.
        return versiculosConteiner;                                               // Retorna o conteiner vazio para evitar quebrar a aplicação.
    }
    const numVersiculos = window.getSpecificVerseCount(livro, capitulo);          // Obtém a contagem de versículos chamando a função da versão específica.
    if (numVersiculos === 0) {                                                    // Lida com o caso raro de um capítulo não ter versículos nos dados.
        console.warn(`[Navegação createVersiculosButtons] 0 versículos para ${livro} ${capitulo}.`);  // Loga um aviso.
        const p = document.createElement('p');                                    // Cria um parágrafo para informar o usuário.
        p.textContent = "Nenhum versículo encontrado para este capítulo.";        // Define o texto da mensagem.
        p.style.textAlign = "center";                                             // Centraliza o texto.
        versiculosConteiner.appendChild(p);                                       // Adiciona a mensagem ao conteiner.
        return versiculosConteiner;                                               // Retorna o conteiner com a mensagem.
    }
    for (let i = 1; i <= numVersiculos; i++) {                                    // Faz um loop de 1 até o número total de versículos.
        const button = document.createElement('button');                          // Cria um novo elemento <button> para cada versículo.
        button.textContent = `${i}`;                                              // Define o texto do botão como o número do versículo.
        button.classList.add('botao-versiculo');                                  // Adiciona uma classe para estilização.
        button.dataset.versiculo = i;                                             // Armazena o número do versículo no atributo 'data-versiculo'.
        button.addEventListener('click', () => {                                  // Adiciona um ouvinte de evento de clique.
            toggleVersiculoText(livro, capitulo, i, button);                      // Chama a função para exibir/ocultar o texto do versículo correspondente.
        });
        versiculosConteiner.appendChild(button);                                  // Adiciona o botão ao conteiner de versículos.
    }
    return versiculosConteiner;                                                   // Retorna o conteiner populado com todos os botões de versículo.
}

// Este bloco cria a função que alterna (mostra/esconde) a exibição da lista de versículos de um capítulo.
function toggleVersiculos(livro, capitulo) {
    const content = document.querySelector('.conteudo');                          // Seleciona a área de conteúdo principal da página.
    if (!content) { console.error("[Navegação toggleVersiculos] Elemento .conteudo não encontrado."); return; }  // Se não encontrar, loga erro e para.
    if (!window.titulo) window.titulo = content.querySelector('h2');              // Garante que a referência global ao título H2 esteja definida.
    const capitulosConteinerDiv = content.querySelector('.capitulos-conteiner.book-content');  // Tenta encontrar o conteiner padrão dos botões de capítulo.
    let allChapterButtons = [];                                                   // Inicializa um array para guardar todos os botões de capítulo.
    if (capitulosConteinerDiv) {                                                  // Se o conteiner padrão for encontrado,
        const capitulosButtonsInnerDiv = capitulosConteinerDiv.querySelector('.capitulos.book-content');  // procura pelo div interno com os botões.
        if (capitulosButtonsInnerDiv) {                                           // Se o div interno for encontrado,
             allChapterButtons = Array.from(capitulosButtonsInnerDiv.querySelectorAll('button.botao-capitulo'));  // preenche o array com os botões.
        }
    }
    if (allChapterButtons.length === 0) {                                         // Se não encontrou botões da maneira padrão, tenta um fallback.
        // Este fallback lida com casos onde os botões foram criados por outro script (versoes.js) e podem ter uma estrutura diferente.
        const looseCapitulosDiv = content.querySelector('div.capitulos:not(.book-content)');  // Tenta pegar um conteiner de capítulos "solto".
        if (looseCapitulosDiv) {                                                  // Se encontrar,
            allChapterButtons = Array.from(looseCapitulosDiv.querySelectorAll('button'));  // preenche o array com os botões de lá.
            if (allChapterButtons.length > 0) {                                   // Se encontrou botões no fallback,
                console.warn("[Navegação toggleVersiculos] Usando botões de um '.capitulos' solto.");  // loga um aviso para depuração.
            }
        }
        if(allChapterButtons.length === 0) {                                      // Se mesmo o fallback falhou,
            console.warn("[Navegação toggleVersiculos] Nenhum botão de capítulo encontrado para gerenciar estado ativo.");  // loga um aviso.
        }
    }
    const existingConteudoVersiculos = content.querySelector('.conteudo-versiculos');  // Verifica se uma lista de versículos já está visível na página.
    const existingTextoVersiculo = content.querySelector('.texto-versiculo');     // Verifica se um texto de versículo específico está visível.
    allChapterButtons.forEach(btn => btn.classList.remove('active'));             // Remove a classe 'active' de todos os botões de capítulo para limpar o estado visual.
    
    // Verifica se a ação é de "recolher", o que acontece se o usuário clicar no mesmo capítulo que já está aberto.
    const isCollapsing = window.activeLivro === livro && window.activeCapitulo === capitulo && existingConteudoVersiculos;

    if (isCollapsing) {                                                           // Se for para recolher...
        console.log(`[Navegação toggleVersiculos] Recolhendo: ${livro} ${capitulo}`);  // Loga a ação.
        if (existingConteudoVersiculos) existingConteudoVersiculos.remove();      // Remove o conteiner da lista de versículos do DOM.
        if (existingTextoVersiculo) existingTextoVersiculo.remove();              // Remove também o texto do versículo, se houver.
        if (window.titulo) window.titulo.textContent = window.getLivroDisplayName(livro);  // Reseta o título principal para mostrar apenas o nome do livro.
        window.activeCapitulo = null;                                             // Reseta o estado global do capítulo ativo.
        window.activeVersiculoButton = null;                                      // Reseta o estado do versículo ativo.
        return;                                                                   // Encerra a execução da função.
    }

    // Se a ação for "expandir" um novo capítulo.
    console.log(`[Navegação toggleVersiculos] Exibindo: ${livro} ${capitulo}`);   // Loga a ação.
    // Encontra o botão do capítulo que foi clicado para poder marcá-lo como ativo.
    const currentChapterButton = allChapterButtons.find(btn => btn.dataset.livro === livro && parseInt(btn.dataset.capitulo) === capitulo);
    if (currentChapterButton) {                                                   // Se o botão for encontrado,
        currentChapterButton.classList.add('active');                             // adiciona a classe 'active' para destacá-lo visualmente.
    } else {                                                                      // Se não encontrou pelo dataset, tenta um fallback.
        const fallbackButton = allChapterButtons.find(btn => parseInt(btn.textContent) === capitulo && parseInt(btn.dataset.capitulo) === capitulo);
        if(fallbackButton) fallbackButton.classList.add('active');                // Se o fallback funcionar, ativa o botão.
        else console.warn(`[Navegação toggleVersiculos] Botão para ${livro} ${capitulo} não encontrado para marcar.`);  // Se não, loga um aviso.
    }

    if (window.titulo) window.titulo.textContent = `${window.getLivroDisplayName(livro)} - CAPÍTULO ${capitulo}`;  // Atualiza o título principal com o livro e capítulo.
    if (existingConteudoVersiculos) existingConteudoVersiculos.remove();          // Remove qualquer lista de versículos anterior para evitar duplicação.
    if (existingTextoVersiculo) existingTextoVersiculo.remove();                  // Remove qualquer texto de versículo anterior.
    
    const conteudoVersiculos = document.createElement('div');                     // Cria o novo conteiner para a lista de versículos.
    conteudoVersiculos.classList.add('conteudo-versiculos', 'book-content');      // Adiciona classes CSS.
    conteudoVersiculos.appendChild(createVersiculosButtons(livro, capitulo));     // Popula o conteiner com os botões de versículo.
    
    // Insere o conteiner de versículos no local correto do DOM.
    if (capitulosConteinerDiv) {                                                  // Se a estrutura padrão existe,
        capitulosConteinerDiv.parentNode.insertBefore(conteudoVersiculos, capitulosConteinerDiv.nextSibling);  // insere a lista de versículos logo após a lista de capítulos.
    } else {                                                                      // Se a estrutura padrão não for encontrada, usa um fallback.
        const refElement = content.querySelector('div.capitulos') || window.titulo;  // Tenta usar um conteiner de capítulos solto ou o título como referência.
        if (refElement && refElement.parentNode === content) {                    // Se a referência for válida,
            content.insertBefore(conteudoVersiculos, refElement.nextSibling);     // insere após ela.
        } else {                                                                  // Como último recurso,
            content.appendChild(conteudoVersiculos);                              // apenas adiciona no final do conteiner de conteúdo.
        }
        console.warn("[Navegação toggleVersiculos] .capitulos-conteiner não encontrado. Usando fallback para inserir versículos.");  // Loga o uso do fallback.
    }
    
    window.activeLivro = livro;                                                   // Atualiza o estado global do livro ativo.
    window.activeCapitulo = capitulo;                                             // Atualiza o estado global do capítulo ativo.
    window.activeVersiculoButton = null;                                          // Reseta o estado do botão de versículo ativo.
}

// Este bloc cria a função que alterna (mostra/esconde) a exibição do texto de um versículo específico.
function toggleVersiculoText(livro, capitulo, versiculo, button) {
    console.log(`[Navegação toggleVersiculoText] Para: ${livro} ${capitulo}:${versiculo}`);  // Loga a ação para depuração.
    const content = document.querySelector('.conteudo');                          // Seleciona o conteiner de conteúdo principal.
    if (!content) { console.error("[Navegação toggleVersiculoText] .conteudo não encontrado."); return; }  // Validação do conteiner.
    // Esta função depende de um script de versão (ex: nvt.js) para carregar o texto do versículo.
    if (typeof window.loadSpecificVerse !== 'function') {
         console.error("[Navegação toggleVersiculoText] Erro: 'loadSpecificVerse' não definida.");  // Loga erro se a dependência não existir.
         return;                                                                  // Interrompe a função.
    }
    if (!window.titulo) window.titulo = content.querySelector('h2');              // Garante que a referência ao título H2 exista.
    
    // Este bloco verifique se o botão clicado já for o botão ativo, a ação é recolher o texto do versículo.
    if (window.activeVersiculoButton === button) {
        const existingVersiculoTextDiv = content.querySelector('.texto-versiculo');  // Encontra o div com o texto do versículo.
        if (existingVersiculoTextDiv) existingVersiculoTextDiv.remove();          // Se existir, remove-o do DOM.
        if (window.titulo) window.titulo.textContent = `${window.getLivroDisplayName(livro)} - CAPÍTULO ${capitulo}`;  // Reseta o título para não incluir o número do versículo.
        if(window.activeVersiculoButton) window.activeVersiculoButton.classList.remove('active');  // Remove a classe 'active' do botão.
        window.activeVersiculoButton = null;                                      // Reseta o estado do botão ativo.
    } else {                                                                      // Se um novo versículo foi clicado,
        if (window.activeVersiculoButton) window.activeVersiculoButton.classList.remove('active');  // desativa o botão que estava ativo anteriormente.
        window.loadSpecificVerse(livro, capitulo, versiculo);                     // Chama a função externa (do script da versão) para carregar e exibir o texto.
        window.activeVersiculoButton = button;                                    // Define o novo botão clicado como o ativo.
        button.classList.add('active');                                           // Adiciona a classe 'active' ao botão para destacá-lo.
    }
}

// Carrega um livro da Bíblia, limpando a visualização anterior e preparando a nova interface.
function loadBook(livro) {
    console.log(`[Navegação loadBook] Tentando carregar: ${livro}, activeLivro atual: ${window.activeLivro}`);  // Log de depuração.
    const content = document.querySelector('.conteudo');                          // Seleciona o conteiner principal.
    if (!content) { console.error("[Navegação loadBook] Elemento .conteudo não encontrado."); return; }  // Validação do conteiner.
    
    // Este bloco encontra a chave canônica do livro (ex: "1samuel") a partir do input (ex: "1samuel", "1SAMUEL").
    const livroKey = Object.keys(livros).find(key => key.toLowerCase() === livro.toLowerCase());
    if (!livroKey) {                                                              // Valida se o livro solicitado existe na configuração.
        console.error(`[Navegação loadBook] Chave de livro inválida: ${livro}`);  // Loga erro se não existir.
        return;                                                                   // Interrompe a função.
    }
    if (!window.titulo) {                                                         // Garante que a referência ao título H2 exista, criando um se necessário.
        window.titulo = content.querySelector('h2');                              // Tenta encontrar o H2.
        if (!window.titulo) {                                                     // Se não encontrar,
            console.warn("[Navegação loadBook] H2 não encontrado, criando um novo.");  // avisa e cria um novo.
            window.titulo = document.createElement('h2');                         // Cria o elemento.
            content.insertBefore(window.titulo, content.firstChild);              // Insere o novo H2 no início do conteiner de conteúdo.
        }
    }
    
    // Define um seletor CSS para encontrar todos os elementos de conteúdo dinâmico da Bíblia que precisam ser limpos.
    const selectorString = '.capitulos-conteiner, div.capitulos, .conteudo-versiculos, .texto-versiculo, .modo-leitura-conteudo';
    
    // Este bloco define se o usuário clicar no link do livro que já está aberto, a ação é recolher tudo.
    if (window.activeLivro === livroKey) { 
        console.log(`[Navegação loadBook] Recolhendo livro: ${livroKey}`);        // Log da ação.
        // Log do DOM antes.
        console.log("[Navegação loadBook] DOM ANTES de recolher (mesmo livro):", content.innerHTML.length > 500 ? content.innerHTML.substring(0, 500) + "..." : content.innerHTML);
        const elementsToClear = content.querySelectorAll(selectorString);         // Seleciona todos os elementos dinâmicos para remoção.
        console.log("[Navegação loadBook] Elementos para recolher (mesmo livro):", elementsToClear);  // Loga quais elementos serão removidos.
        elementsToClear.forEach(el => el.remove());                               // Remove cada um dos elementos do DOM.
        // Log do DOM depois.
        console.log("[Navegação loadBook] DOM APÓS recolher (mesmo livro):", content.innerHTML.length > 500 ? content.innerHTML.substring(0, 500) + "..." : content.innerHTML);
        if (window.titulo) window.titulo.textContent = '';                        // Limpa o texto do título.
        
        // Este bloco reseta todo o estado global da navegação.
        window.activeLivro = null;
        window.activeCapitulo = null;
        window.activeVersiculoButton = null;
        if (window.isReadingModeEnabled && typeof window.toggleReadingMode === 'function') {  // Se o modo leitura estiver ativo,
             window.toggleReadingMode(false, null, null);                         // desativa-o.
        }
        return;                                                                   // Encerra a execução da função.
    }
    
    // Este bloco verifica se for um novo livro, limpa o conteúdo antigo e carrega o novo.
    console.log(`[Navegação loadBook] Carregando NOVO livro ${livroKey}.`);       // Log da ação.
    // Log do DOM antes.
    console.log("[Navegação loadBook] DOM ANTES da limpeza (novo livro):", content.innerHTML.length > 500 ? content.innerHTML.substring(0, 500) + "..." : content.innerHTML);
    const elementsToRemove = content.querySelectorAll(selectorString);            // Seleciona todo o conteúdo dinâmico antigo.
    console.log("[Navegação loadBook] Elementos para remover (novo livro):", elementsToRemove);  // Log dos elementos a serem removidos.
    elementsToRemove.forEach(element => element.remove());                        // Remove cada um deles.
    // Log do DOM depois.
    console.log(`[Navegação loadBook] DOM APÓS limpeza para ${livroKey}:`, content.innerHTML.length > 500 ? content.innerHTML.substring(0, 500) + "..." : content.innerHTML);
    
    if (window.titulo) {                                                          // Se o título existe,
        window.titulo.textContent = window.getLivroDisplayName(livroKey);         // define seu texto para o nome do novo livro.
    }
    
    // Este bloco cria e insere o conteiner com os botões de capítulo para o novo livro.
    const capitulosConteiner = document.createElement('div');
    capitulosConteiner.classList.add('capitulos-conteiner', 'book-content');
    capitulosConteiner.appendChild(createCapitulosButtons(livroKey));
    if (window.titulo && window.titulo.parentNode === content) {                  // Idealmente, insere o conteiner logo após o título H2.
        content.insertBefore(capitulosConteiner, window.titulo.nextSibling);
    } else {                                                                      // Se a estrutura ideal não for encontrada, usa um fallback.
        content.appendChild(capitulosConteiner);                                  // Adiciona o conteiner no final da área de conteúdo.
        console.warn("[Navegação loadBook] Fallback: window.titulo não encontrado ou não é filho de .conteudo.");
    }
    
    // Este bloco atualiza o estado global para refletir o novo livro carregado.
    window.activeLivro = livroKey;
    window.activeCapitulo = null;
    window.activeVersiculoButton = null;
    
    // Este bloco verifica se o modo leitura estiver ativo, ele é desativado ao trocar de livro para evitar um estado inconsistente.
    if (window.isReadingModeEnabled && typeof window.toggleReadingMode === 'function') {
        console.log("[Navegação loadBook] Desativando modo leitura ao carregar novo livro.");
        window.toggleReadingMode(false, null, null);                              // Chama a função para desativar o modo.
        document.body.classList.remove('module-leitura');                         // Remove a classe do body.
        const modoLeituraBtn = document.getElementById('modo-leitura');           // Encontra o botão do modo leitura.
        if (modoLeituraBtn) {                                                     // Se o botão existir,
            modoLeituraBtn.classList.remove('active');                            // remove sua classe de ativo.
            modoLeituraBtn.setAttribute('aria-pressed', 'false');                 // atualiza seu atributo de acessibilidade.
        }
    }
}

// ========================================================================
// INICIALIZAÇÃO
// ========================================================================
// Este bloco adiciona um ouvinte de evento que garante que o script rode apenas após o DOM estar completamente carregado e pronto.
document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.conteudo');                          // Tenta encontrar o continer de conteúdo principal.
    if (content) {                                                                // Se o conteiner for encontrado,
        window.titulo = content.querySelector('h2');                              // tenta encontrar e armazenar a referência ao H2 principal.
        if (!window.titulo) {                                                     // Se não houver um H2 no HTML,
            console.warn("[Navegação DOMContentLoaded] H2 não encontrado. Criando.");  // avisa e cria um dinamicamente.
            window.titulo = document.createElement('h2');                         // Cria o elemento H2.
            // Tenta inserir o H2 antes do primeiro elemento real (não SCRIPT ou STYLE) dentro de .conteudo.
            const firstRealContentChild = Array.from(content.childNodes).find(
                node => node.nodeType === Node.ELEMENT_NODE && !['SCRIPT', 'STYLE'].includes(node.tagName.toUpperCase())
            );
            if (firstRealContentChild) {                                          // Se encontrar um elemento de referência,
                 content.insertBefore(window.titulo, firstRealContentChild);      // insere o H2 antes dele.
            } else {                                                              // Se não houver outros elementos,
                 content.appendChild(window.titulo);                              // apenas o adiciona no final.
            }
        }
    } else {                                                                      // Se o conteiner .conteudo não for encontrado,
        console.error("[Navegação DOMContentLoaded] .conteudo não encontrado.");  // loga um erro crítico.
    }
    
    // Este bloco adiciona os ouvintes de evento de clique aos links do menu de livros.
    const menuLivrosLinks = document.querySelectorAll('.menu-livros a');          // Seleciona todos os links dentro do menu de livros.
    if (menuLivrosLinks.length > 0) {                                             // Se algum link for encontrado,
        menuLivrosLinks.forEach(link => {                                         // itera sobre cada link.
            link.addEventListener('click', (event) => {                           // Adiciona um ouvinte de clique a cada um.
                event.preventDefault();                                           // Impede a ação padrão do link (que seria recarregar a página ou navegar para uma âncora).
                const livroAttr = link.dataset.livro;                             // Obtém o identificador do livro do atributo 'data-livro' do link.
                if (livroAttr) {                                                  // Se o atributo existir,
                    loadBook(livroAttr);                                          // chama a função principal para carregar o livro correspondente.
                } else {                                                          // Se o atributo 'data-livro' estiver faltando,
                    console.error(`[Navegação DOMContentLoaded] data-livro ausente no link:`, link);  // loga um erro.
                }
            });
        });
        console.log("[Navegação DOMContentLoaded] Listeners dos links de livros configurados.");  // Confirma que os listeners foram adicionados.
    } else {                                                                      // Se nenhum link for encontrado no menu,
        console.warn("[Navegação DOMContentLoaded] Nenhum link em '.menu-livros a'.");  // loga um aviso.
    }
});
