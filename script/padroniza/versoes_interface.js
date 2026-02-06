/*===============================================================================*/
/*                     MÓDULO DE INTERFACE DO USUÁRIO                            */
/*===============================================================================*/
/*  Centraliza toda manipulação da interface:                                    */
/*                       - Configuração de eventos de clique e seleções          */
/*                       - Atualização dinâmica do título da página              */
/*                       - Criação de listas de navegação (versões)              */
/*                       - Gerenciamento de interações do menu de livros         */
/*===============================================================================*/

class InterfaceManager {                                                           // Classe principal de gerenciamento da interface
    constructor() {                                                                             // Construtor da classe
        this.seletorVersao = document.getElementById('seletor-versao-principal');               // Localiza menu de seleção de versões
        this.botaoModoLeitura = document.getElementById('modo-leitura');                        // Localiza botão do modo leitura
    }

    configurarEventos() {                                                          // Configura todos os eventos da interface
        this.seletorVersao?.addEventListener('change', (e) => {                                 // Escuta mudanças no seletor de versão
            localStorage.setItem('versaoBiblicaSelecionada', e.target.value);                   // Salva preferência no navegador
            window.location.search = `?versao=${e.target.value}`;                               // Recarrega página com nova versão
        });

        this.botaoModoLeitura?.addEventListener('click', (e) => {                               // Escuta cliques no modo leitura
            e.preventDefault();                                                                 // Previne comportamento padrão
            window.toggleReadingMode(!window.modoLeituraAtivo, window.activeLivro, window.activeCapitulo); // Alterna modo leitura
        });

        document.querySelectorAll('.menu-livros a').forEach(livro => {                          // Configura eventos para links de livros
            livro.addEventListener('click', this._handleLivroClick);                            // Adiciona listener para cada livro
        });
    }
    
    atualizarTitulo(codigoVersao) {                                                // Atualiza título e subtítulo da página
        const titulo = document.getElementById('titulo-principal-versao');                      // Localiza elemento do título
        const subtitulo = document.getElementById('subtitulo-versao-extenso');                  // Localiza elemento do subtítulo
        if (titulo) titulo.textContent = `Bíblia Sagrada ${codigoVersao}`;                      // Define texto do título
        if (subtitulo) subtitulo.textContent = window.NOME_VERSAO_COMPLETA_BIBLIA || '';        // Define texto do subtítulo
    }

    criarListaVersoes(versoes) {                                                   // Cria lista dinâmica de versões
        const lista = document.getElementById('versoes-list');                                  // Localiza contêiner da lista
        if (!lista) return;                                                                     // Valida existência do contêiner

        lista.innerHTML = versoes.map(versao => `                                              
            <li><a href="?versao=${versao.value}">${versao.text}</a></li>
        `).join('');                                                                            // Gera HTML da lista de links
    }

    _handleLivroClick(e) {                                                         // Manipula cliques em livros (método privado)
        e.preventDefault();                                                                     // Previne comportamento padrão
        const livro = e.target.dataset.livro;                                                   // Obtém identificador do livro
        window.carregarLivro(livro);                                                            // Carrega o livro selecionado
    }
}

const interfaceManager = new InterfaceManager();                                  // Instancia gerenciador global