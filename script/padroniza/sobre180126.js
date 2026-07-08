/* /**                                                                           */
/* * sobre.js                                                                    */
/* * Este módulo gerencia a seção "Sobre" do aplicativo da Bíblia.               */
/* * Responsável por exibir e ocultar informações sobre o projeto,               */
/* * com animações de transição e gestão do estado da interface.                 */
/* */                                                                            */

/**
 * Função auxiliar para recriar a marca d'água
 */
function recriarMarcaDagua() {
    const content = document.querySelector('.conteudo');
    if (content) {
        let marcadagua = content.querySelector('.marcadagua');
        if (!marcadagua) {
            marcadagua = document.createElement('div');
            marcadagua.classList.add('marcadagua');
            const img = document.createElement('img');
            img.src = '../img/biblia.png';
            img.alt = "Marca d'água da Bíblia";
            img.classList.add('marca-dagua-imagem');                              // CORRIGIDO: marca-dagua-imagem
            img.onload = () => console.log("Imagem da marca d'água carregada com sucesso");
            img.onerror = () => console.error("Erro ao carregar a imagem da marca d'água. Verifique o caminho: ../img/biblia.png");
            marcadagua.appendChild(img);
            content.appendChild(marcadagua);
        }
    }
}

/**
 * Função auxiliar para recriar a marca d'água no conteúdo sobre
 */
function adicionarMarcaDaguaSobre() {
    const sobreContent = document.querySelector('.conteudo-sobre');
    if (sobreContent) {
        let marcadagua = sobreContent.querySelector('.marcadagua-sobre');
        if (!marcadagua) {
            marcadagua = document.createElement('div');
            marcadagua.classList.add('marcadagua-sobre');
            const img = document.createElement('img');
            img.src = '../img/biblia.png';
            img.alt = "Marca d'água da Bíblia";
            img.classList.add('marca-dagua-imagem');                              // CORRIGIDO: marca-dagua-imagem
            marcadagua.appendChild(img);
            sobreContent.appendChild(marcadagua);
        }
    }
}

/**
 * Carrega e exibe o conteúdo da seção "Sobre"
 */
function loadSobre() {
    // Remove qualquer conteúdo sobre existente primeiro
    const sobreExistente = document.querySelector('.conteudo-sobre');
    if (sobreExistente) {
        sobreExistente.remove();
    }

    // Cria novo conteúdo sobre
    const sobreContent = document.createElement('div');
    sobreContent.classList.add('conteudo-sobre');
    sobreContent.style.opacity = '0';
    
    // Conteúdo HTML da seção Sobre com botão fechar
    sobreContent.innerHTML = `
        <button class="fechar-sobre" onclick="hideSobre()">×</button>
        <h2>Sobre o Projeto Bíblia Sagrada</h2>
        <div class="texto-sobre">
            <p>Este projeto tem como objetivo oferecer uma ferramenta online completa e acessível para leitura e estudo da Bíblia Sagrada.</p>
            <p>Versões disponíveis: Almeida Corrigida e Fiel (ACF), Almeida Revista e Atualizada (ARA), Almeida Revista e Corrigida (ARC), King James Version (KJV), Nova Almeida Atualizada (NAA), Nova Tradução na Linguagem de Hoje (NTLH), Nova Versão Internacional (NVI), Nova Versão Transformadora (NVT) e a versão Original em Hebraico e Grego, que ainda está em desenvolvimento.</p>
            <p>Funcionalidades incluem: Modo Leitura para facilitar a leitura contínua dos capítulos, Modo Slide ideal para apresentações em Datashow, opção Baixar com materiais para estudo bíblico e a seção Utilidade com links úteis, incluindo cursos gratuitos ou com valores acessíveis.</p>
            <p>Utilize o menu lateral para navegar pelos livros e os botões que aparecem para selecionar capítulos e versículos.</p>
            <p>O projeto está em desenvolvimento contínuo. Se tiver alguma sugestão, fique à vontade para enviar por e-mail através do endereço disponível na seção de contato.</p>
        </div>
    `;
    
    // Adiciona ao body
    document.body.appendChild(sobreContent);
    
    // Adiciona marca d'água
    adicionarMarcaDaguaSobre();
    
    // Animação de entrada
    setTimeout(() => {
        sobreContent.style.transition = 'opacity 0.3s ease-in';
        sobreContent.style.opacity = '1';
        document.body.classList.add('sobre-ativo');
    }, 10);
    
    // Reseta estados se existirem
    if (window.activeLivro) window.activeLivro = null;
    if (window.activeCapitulo) window.activeCapitulo = null;
    if (window.activeVersiculoButton) window.activeVersiculoButton = null;
}

/**
 * Oculta o conteúdo da seção "Sobre" com animação
 */
function hideSobre() {
    const sobreContent = document.querySelector('.conteudo-sobre');
    
    if (sobreContent) {
        // Animação de saída
        sobreContent.style.transition = 'opacity 0.2s ease-out';
        sobreContent.style.opacity = '0';
        document.body.classList.remove('sobre-ativo');
        
        // Remove elemento após animação
        setTimeout(() => {
            if (sobreContent.parentNode) {
                sobreContent.remove();
            }
        }, 200);
    }
}

/**
 * Restaura o estado inicial da interface como ao abrir o site.
 */
function restaurarEstadoInicial() {
    const content = document.querySelector('.conteudo');
    if (content) {
        // Remove todos os elementos filhos, exceto a marca d'água
        Array.from(content.children).forEach(child => {
            if (!child.classList.contains('marcadagua')) {
                child.remove();
            }
        });

        // Recria a marca d'água
        recriarMarcaDagua();
    }
    
    // Remove conteúdo sobre se existir
    hideSobre();
    
    // Redefine todas as variáveis de estado globais para o estado inicial
    if (typeof window.activeLivro !== 'undefined') window.activeLivro = null;
    if (typeof window.activeCapitulo !== 'undefined') window.activeCapitulo = null;
    if (typeof window.activeVersiculoButton !== 'undefined') window.activeVersiculoButton = null;
    if (typeof window.modoLeituraAtivo !== 'undefined') window.modoLeituraAtivo = false;
    if (typeof window.ultimoLivroSelecionado !== 'undefined') window.ultimoLivroSelecionado = null;
    if (typeof window.ultimoCapituloSelecionado !== 'undefined') window.ultimoCapituloSelecionado = null;
    if (typeof window.ultimoVersiculoSelecionado !== 'undefined') window.ultimoVersiculoSelecionado = null;

    // Recria o título inicial como fallback
    const titulo = document.createElement('h2');
    titulo.id = 'titulo-principal-versao';
    titulo.textContent = 'Bíblia Sagrada';
    if (content) {
        content.appendChild(titulo);
    }

    // Rechama a inicialização da versão atual para restaurar a interface completa
    if (typeof window.inicializarVersao === 'function') {
        const versaoAtual = document.getElementById('seletor-versao-principal')?.value || 'arc';
        window.inicializarVersao(versaoAtual).then(() => {
            if (typeof window.loadBook === 'function') {
                window.loadBook('genesis');
            } else if (typeof window.atualizaBotoesCapitulos === 'function') {
                window.atualizaBotoesCapitulos('genesis', 1);
            }
        });
    }
}

// === EVENT LISTENERS ===

/**
 * Configura eventos para exibir/ocultar a seção "Sobre"
 */
const sobreLink = document.getElementById('sobre');
if (sobreLink) {
    sobreLink.addEventListener('click', (event) => {
        event.preventDefault();
        loadSobre();
    });
} else {
    console.warn("Link 'Sobre' com ID 'sobre' não encontrado.");
}

// === MENU MÓVEL ===

const menuButton = document.querySelector('.menu-button');
if (menuButton) {
    menuButton.addEventListener('click', () => {
        const menuLivros = document.querySelector('.menu-livros');
        if (menuLivros) {
            menuLivros.classList.toggle('show');
        }
    });
}
