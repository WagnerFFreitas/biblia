/*===============================================================================*/
/*                        MÓDULO DE INTERFACE DO USUÁRIO                         */
/*===============================================================================*/
/*  Centraliza toda manipulação da interface:                                    */
/*                - Configuração de eventos de clique e seleções                 */
/*                  - Atualização dinâmica do título da página                   */
/*                  - Criação de listas de navegação (versões)                   */
/*                - Gerenciamento de interações do menu de livros                */
/*===============================================================================*/

/* BLOCO: Classe que gerencia os elementos e eventos da interface do usuário     */
class InterfaceManager {
    constructor() {                                                               // Inicia o construtor da interface
        this.seletorVersao = document.getElementById('seletor-versao-principal'); // Acha o menu de troca de bíblia
        this.botaoModoLeitura = document.getElementById('modo-leitura');          // Acha o botão de tela cheia
    }

    /* BLOCO: Configura os principais "ouvintes" de eventos da interface        */
    configurarEventos() {
        
        /* BLOCO: Adiciona um 'ouvinte' para o seletor de versão da Bíblia      */
        this.seletorVersao?.addEventListener('change', (e) => {                   // Ouve a troca de tradução
            localStorage.setItem('versaoBiblicaSelecionada', e.target.value);     // Grava a bíblia escolhida
            window.location.search = `?versao=${e.target.value}`;                 // Recarrega o site com a versão
        });

        /* BLOCO: Adiciona um 'ouvinte' para o botão do Modo Leitura            */
        this.botaoModoLeitura?.addEventListener('click', (e) => {                 // Ouve o clique no modo leitura
            e.preventDefault();                                                   // Cancela ação padrão de link
            window.toggleReadingMode(!window.modoLeituraAtivo, window.activeLivro, window.activeCapitulo);  // Alterna o estado da tela
        });

        /* BLOCO: Adiciona um 'ouvinte' de clique para cada link de livro       */
        document.querySelectorAll('.menu-livros a').forEach(livro => {            // Busca links do menu lateral
            livro.addEventListener('click', this._handleLivroClick);              // Ativa clique em cada livro
        });
    }
    
    /* BLOCO: Atualiza o título principal e subtítulo da página                 */
    atualizarTitulo(codigoVersao) {
        const titulo = document.getElementById('titulo-principal-versao');        // Acha o título H1 do topo
        const subtitulo = document.getElementById('subtitulo-versao-extenso');    // Acha o texto da tradução
        if (titulo) titulo.textContent = `Bíblia Sagrada ${codigoVersao}`;        // Escreve o nome da bíblia
        if (subtitulo) subtitulo.textContent = window.NOME_VERSAO_COMPLETA_BIBLIA || '';  // Escreve a versão por extenso
    }

     /* BLOCO: Cria dinamicamente a lista de versões (ex: no rodapé)            */
    criarListaVersoes(versoes) {
        const lista = document.getElementById('versoes-list');                    // Acha o local da lista de links
        if (!lista) return;                                                       // Aborta se o local sumiu

        lista.innerHTML = versoes.map(versao => `                                              
            <li><a href="?versao=${versao.value}">${versao.text}</a></li>
        `).join('');                                                              // Desenha os links no rodapé
    }

    /* BLOCO: Método privado (interno) que lida com o clique em um livro        */
    _handleLivroClick(e) {
        e.preventDefault();                                                       // Impede o salto da página
        const livro = e.target.dataset.livro;                                     // Identifica o livro clicado
        window.carregarLivro(livro);                                              // Chama o motor de carga
    }
}

const interfaceManager = new InterfaceManager();                                  // Instancia o gestor global
