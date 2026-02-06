/*===============================================================================*/
/*                     MÓDULO DE GERENCIAMENTO DE CAPÍTULOS                      */
/*===============================================================================*/
/*  Este script é responsável por:                                               */
/*                       - Criar e exibir a barra de botões de capítulos         */
/*                       - Gerenciar o estado ativo (destaque) do botão atual    */
/*                       - Adicionar a lógica de clique para carregar o conteúdo */
/*                       - Atualizar o título da página ao navegar               */
/*===============================================================================*/

/* BLOCO: Função helper para recarregar a marca d'água                             */
async function recarregaMarcaDagua() {
    try {                                                                                           /* Inicia tratamento de erro     */
        const idScript = 'script-marca-dagua';                                                      /* Define ID do script fundo     */
        const scriptAntigo = document.getElementById(idScript);                                     /* Busca script de fundo antigo  */
        if (scriptAntigo) scriptAntigo.remove();                                                    /* Remove para evitar duplicados */
        
        /* BLOCO: Cria um novo elemento de script para injetar a marca d'água      */
        const novoScript = document.createElement('script');                                        /* Cria nova etiqueta de script  */
        novoScript.src = '../script/marcadagua.js';                                                 /* Define caminho da imagem      */
        novoScript.id = idScript;                                                                   /* Atribui ID ao elemento        */
        document.body.appendChild(novoScript);                                                      /* Insere no final do documento  */
        console.log("[Capítulos] Marca d'água recarregada.");                                       /* Loga sucesso da operação      */
    } catch (e) {
        console.error("[Capítulos] Falha ao recarregar a marca d'água.", e);                        /* Loga falha técnica            */
    }
}

/* BLOCO: Define a função global que cria e atualiza a barra de botões de capítulo */
window.atualizaBotoesCapitulos = async function(livro, capituloAtual, isReadingMode) {
    const areaConteudo = document.querySelector('section.conteudo');                                /* Captura a área principal      */
    if (!areaConteudo) {                                                                            /* Verifica se local existe      */
        console.error("atualizaBotoesCapitulos: section.conteudo não encontrada.");                 /* Loga erro de interface        */
        return;
    }

    /* BLOCO: Remove contêineres de capítulos antigos para evitar duplicação       */
    const conteinersBotoesCapitulosExistentes = areaConteudo.querySelectorAll('div.capitulos:not(.conteudo-versiculos), #dynamic-chapter-buttons-conteiner');
    conteinersBotoesCapitulosExistentes.forEach(conteiner => conteiner.remove());                   /* Limpa réguas de capítulos     */
    let conteinerCapitulos = document.createElement('div');                                         /* Cria nova régua de botões     */
    conteinerCapitulos.className = 'capitulos';                                                     /* Define classe de estilo       */
    conteinerCapitulos.id = 'dynamic-chapter-buttons-conteiner';                                    /* Define ID único da régua      */

    /* BLOCO: Posiciona a nova régua de capítulos após o título principal          */
    const tituloH2 = areaConteudo.querySelector('h2');                                              /* Acha o título da página       */
    if (tituloH2) tituloH2.insertAdjacentElement('afterend', conteinerCapitulos);                   /* Insere régua após o título    */
    else areaConteudo.insertBefore(conteinerCapitulos, areaConteudo.firstChild);                    /* Insere no topo absoluto       */
    
    /* BLOCO: Verifica a disponibilidade do motor de contagem de capítulos         */
    if (typeof window.obterContagemCapitulosLivro !== 'function') {                                 /* Checa se motor existe         */
        console.error('Função obterContagemCapitulosLivro não encontrada no escopo global.');       /* Loga erro de dependência      */
        conteinerCapitulos.innerHTML = `<p class="error-message">Erro interno: dependência ausente.</p>`;
        return;
    }
    
    /* BLOCO: Busca a quantidade total de capítulos do livro selecionado           */
    const totalCapitulos = await window.obterContagemCapitulosLivro(livro);                         /* Busca total de capítulos      */
    if (totalCapitulos === 0) {                                                                     /* Se livro for inválido         */
        conteinerCapitulos.innerHTML = `<p class="error-message">Não foi possível carregar os capítulos para ${livro}.</p>`;
        return;
    }
    
    /* BLOCO: Lógica de carregamento centralizada (nova função)                    */
    window.carregarConteudoMarcaDagua = async function(livro, capitulo) {
        
        /* BLOCO: Guarda o último estado para o botão "Fechar Busca"               */
        window.ultimoLivroSelecionado = livro;                                                      /* Grava histórico de livro      */
        window.ultimoCapituloSelecionado = capitulo;                                                /* Grava histórico de capítulo   */
        window.activeLivro = livro;                                                                 /* Atualiza livro ativo global   */
        window.activeCapitulo = capitulo;                                                           /* Atualiza capítulo ativo global*/
        
        /* BLOCO: Define se o carregamento será via modo leitura ou modo padrão    */
        if (window.modoLeituraAtivo && typeof window.carregarCapituloModoLeitura === 'function') {
            await window.carregarCapituloModoLeitura(livro, capitulo);                              /* Carrega em modo leitura       */
        } else if (typeof window.toggleVersiculos === 'function') {
            await window.toggleVersiculos(livro, capitulo);                                         /* Carrega em modo padrão        */
        } else {
            console.error("Nenhuma função de carregamento de conteúdo encontrada.");                /* Loga erro de motor            */
        }
        
        /* BLOCO: Após o conteúdo ser carregado, a marca d'água é reaplicada       */
        await recarregaMarcaDagua();                                                                /* Reaplica fundo transparente   */
    };

    /* BLOCO: Inicia o laço de repetição para gerar cada botão de capítulo         */
    for (let i = 1; i <= totalCapitulos; i++) {                                                     /* Varre total de capítulos      */
        const botao = document.createElement('button');                                             /* Cria botão individual         */
        botao.textContent = i;                                                                      /* Define número no texto        */
        botao.dataset.capitulo = i;                                                                 /* Guarda número no dado         */
        botao.dataset.livro = livro;                                                                /* Guarda livro no dado          */
        botao.classList.add('botao-capitulo-dinamico');                                             /* Define classe CSS             */
        if (i === parseInt(capituloAtual)) botao.classList.add('active');                           /* Destaca capítulo aberto       */
        
        /* BLOCO: Adiciona o escutador de eventos para o clique do usuário         */
        botao.addEventListener('click', async function() {                                          /* Adiciona evento de clique     */
            const capituloClicado = parseInt(this.dataset.capitulo);                                /* Captura capítulo clicado      */
            const livroClicado = this.dataset.livro;                                                /* Captura livro clicado         */
            
            /* BLOCO: Chama a nova função centralizada                             */
            await window.carregarConteudoMarcaDagua(livroClicado, capituloClicado);                 /* Processa carga completa       */
            
            /* BLOCO: Atualiza a interface                                         */
            conteinerCapitulos.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');                                                           /* Destaca botão clicado         */

            /* BLOCO: Identifica se existe o tradutor de nomes para o título       */
            if (typeof window.getLivroDisplayName === 'function') {                                 /* Se existir tradutor           */
                const tituloH2Atual = areaConteudo.querySelector('h2');                             /* Acha título h2 atual          */
                
                /* BLOCO: Constrói o texto do título com o nome bonito do livro    */
                if (tituloH2Atual) {                                                                /* Se o h2 existir               */
                    let textoTitulo = `${window.getLivroDisplayName(livroClicado)} - CAPÍTULO ${capituloClicado}`;
                
                    /* BLOCO: Adiciona o sufixo do versículo caso não seja leitura */
                    if (!window.modoLeituraAtivo && window.activeVersiculoButton && window.activeVersiculoButton.dataset.versiculo) {
                        textoTitulo += ` - VERSÍCulo ${window.activeVersiculoButton.dataset.versiculo}`;
                    }
                    tituloH2Atual.textContent = textoTitulo;                                        /* Escreve novo título H2        */
                }
            }
        });

        conteinerCapitulos.appendChild(botao);                                                      /* Fixa botão na régua           */
    }
        
    /* BLOCO: Sincroniza o estado de navegação global com a seleção atual          */
    if (!window.activeLivro) window.activeLivro = livro;                                            /* Inicializa estado global      */
    if (!window.activeCapitulo) window.activeCapitulo = parseInt(capituloAtual) || 1;               /* Inicializa estado global      */
};