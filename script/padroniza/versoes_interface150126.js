/*===============================================================================*/
/*                        MÓDULO DE INTERFACE DO USUÁRIO                         */
/*===============================================================================*/
/*  Centraliza toda manipulação da interface:                                    */
/*                - Configuração de eventos de clique e seleções                 */
/*                  - Atualização dinâmica do título da página                   */
/*                  - Criação de listas de navegação (versões)                   */
/*                - Gerenciamento de interações do menu de livros                */
/*===============================================================================*/

// Este bloco define a classe que gerencia os elementos e eventos da interface do usuário.
class InterfaceManager {
    constructor() {                                                               // Define o método construtor, executado ao criar uma nova instância da classe.
        this.seletorVersao = document.getElementById('seletor-versao-principal'); // Busca e armazena o elemento do seletor de versão da Bíblia.
        this.botaoModoLeitura = document.getElementById('modo-leitura');          // Busca e armazena o elemento do botão que ativa o modo leitura.
    }

    
    // Este bloco define o método que configura os principais "ouvintes" de eventos da interface.
    configurarEventos() {
        
        // Este bloco adiciona um 'ouvinte' para o seletor de versão da Bíblia.
        this.seletorVersao?.addEventListener('change', (e) => {                   // Adiciona um evento que dispara quando o valor do seletor de versão muda.
            localStorage.setItem('versaoBiblicaSelecionada', e.target.value);     // Salva a nova versão selecionada na memória do navegador.
            window.location.search = `?versao=${e.target.value}`;                 // Atualiza a URL da página para recarregar com a nova versão.
        });

        // Este bloco adiciona um 'ouvinte' para o botão que ativa/desativa o Modo Leitura.
        this.botaoModoLeitura?.addEventListener('click', (e) => {                 // Adiciona um evento que dispara quando o botão de modo leitura é clicado.
            e.preventDefault();                                                   // Impede o comportamento padrão do link/botão (ex: navegar para '#').
            window.toggleReadingMode(!window.modoLeituraAtivo, window.activeLivro, window.activeCapitulo);  // Chama a função global para ativar/desativar o modo leitura.
        });

        // Este bloco adiciona um 'ouvinte' de clique para cada link de livro no menu.
        document.querySelectorAll('.menu-livros a').forEach(livro => {            // Busca todos os links de livros dentro do menu lateral.
            livro.addEventListener('click', this._handleLivroClick);              // Adiciona um evento de clique a cada um dos links de livro encontrados.
        });
    }
    
    // Este bloco define o método que atualiza o título principal e subtítulo da página.
    atualizarTitulo(codigoVersao) {
        const titulo = document.getElementById('titulo-principal-versao');        // Busca o elemento do título principal (H1 ou H2).
        const subtitulo = document.getElementById('subtitulo-versao-extenso');    // Busca o elemento do subtítulo.
        if (titulo) titulo.textContent = `Bíblia Sagrada ${codigoVersao}`;        // Se o título existe, atualiza seu texto com o código da versão.
        if (subtitulo) subtitulo.textContent = window.NOME_VERSAO_COMPLETA_BIBLIA || '';  // Se o subtítulo existe, atualiza com o nome completo da versão ou deixa em branco.
    }

     // Este bloco define o método que cria dinamicamente a lista de versões (ex: no rodapé)
    criarListaVersoes(versoes) {
        const lista = document.getElementById('versoes-list');                    // Busca o elemento <ul> ou <ol> onde a lista será inserida.
        if (!lista) return;                                                       // Se o elemento não for encontrado, interrompe a função.

        lista.innerHTML = versoes.map(versao => `                                              
            <li><a href="?versao=${versao.value}">${versao.text}</a></li>
        `).join('');                                                              // Cria o HTML de cada item e o insere na lista.
    }

    // Este bloco define o método privado (interno) que lida com o clique em um livro.
    _handleLivroClick(e) {
        e.preventDefault();                                                       // Impede que o navegador siga o link (href="#").
        const livro = e.target.dataset.livro;                                     // Pega o nome do livro do atributo 'data-livro' do link clicado.
        window.carregarLivro(livro);                                              // Chama uma função global (de outro módulo) para carregar o livro selecionado.
    }
}

const interfaceManager = new InterfaceManager();                                  // Cria e exporta uma única instância da classe para uso global.
