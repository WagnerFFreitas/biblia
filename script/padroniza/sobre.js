/*===============================================================================*/
/*      ESTE MÓDULO GERENCIA A SEÇÃO "SOBRE" DO APLICATIVO DA BÍBLIA.            */
/*===============================================================================*/
/*  Este modulo e responsável por exibir e ocultar informações sobre             */
/*  o projeto, com animações de transição e gestão do estado da interface.       */
/*===============================================================================*/

/* BLOCO: Função auxiliar para restaurar a imagem de fundo (marca d'água) no     */
/* conteúdo principal                                                            */
function recriarMarcaDagua() {
    const content = document.querySelector('.conteudo');                          // Localiza o contêiner principal
    
    /* BLOCO: Verifica se o contêiner de conteúdo principal está disponível na página           */
    if (content) {
        let marcadagua = content.querySelector('.marcadagua');                    // Verifica se a imagem já existe
        
        /* BLOCO: Garante a criação da marca d'água caso ela ainda não tenha sido gerada        */
        if (!marcadagua) {
            marcadagua = document.createElement('div');                           // Cria a camada da marca d'água
            marcadagua.classList.add('marcadagua');                               // Aplica a classe de estilo
            const img = document.createElement('img');                            // Cria o elemento de imagem
            img.src = '../img/biblia.png';                                        // Define o caminho do arquivo
            img.alt = "Marca d'água da Bíblia";                                   // Define o texto de acessibilidade
            img.classList.add('marca-dagua-imagem');                              // Aplica a classe da imagem
            img.onload = () => console.log("Imagem da marca d'água carregada com sucesso");  // Loga sucesso no carregamento
            img.onerror = () => console.error("Erro ao carregar a imagem da marca d'água.");  // Loga falha no carregamento
            marcadagua.appendChild(img);                                          // Insere a imagem na camada
            content.appendChild(marcadagua);                                      // Adiciona a camada ao conteúdo
        }
    }
}

/* BLOCO: Função auxiliar para inserir a marca d'água dentro da janela           */
/* informativa Sobre                                                             */
function adicionarMarcaDaguaSobre() {
    const sobreContent = document.querySelector('.conteudo-sobre');               // Localiza a seção Sobre
    
    /* BLOCO: Verifica a existência do contêiner da seção Sobre para anexar o fundo             */
    if (sobreContent) {
        let marcadagua = sobreContent.querySelector('.marcadagua-sobre');         // Verifica existência prévia
        
        /* BLOCO: Adiciona o elemento visual de fundo exclusivo para a tela informativa         */
        if (!marcadagua) {
            marcadagua = document.createElement('div');                           // Cria o contêiner do fundo
            marcadagua.classList.add('marcadagua-sobre');                         // Estiliza o fundo da seção
            const img = document.createElement('img');                            // Cria a imagem de fundo
            img.src = '../img/biblia.png';                                        // Atribui a fonte da imagem
            img.alt = "Marca d'água da Bíblia";                                   // Atribui descrição da imagem
            img.classList.add('marca-dagua-imagem');                              // Define classe de dimensão
            marcadagua.appendChild(img);                                          // Anexa imagem ao contêiner
            sobreContent.appendChild(marcadagua);                                 // Anexa contêiner à seção Sobre
        }
    }
}

/* BLOCO: Carrega a estrutura HTML e exibe a tela informativa com efeito de      */
/* transparência                                                                 */
function loadSobre() {
    
    /* BLOCO: Impede a sobreposição de múltiplas janelas removendo instâncias anteriores        */
    const sobreExistente = document.querySelector('.conteudo-sobre');             // Busca se já há uma tela aberta
    if (sobreExistente) {
        sobreExistente.remove();                                                  // Remove para evitar duplicados
    }

    /* BLOCO: Cria e configura as propriedades iniciais de visibilidade do novo contêiner       */
    const sobreContent = document.createElement('div');                           // Cria a caixa de informações
    sobreContent.classList.add('conteudo-sobre');                                 // Aplica classe de layout
    sobreContent.style.opacity = '0';                                             // Inicia totalmente invisível
    
    /* BLOCO: Injeta a estrutura HTML completa com o texto informativo e botão fechar           */
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
    `;                                                                            // Define o conteúdo textual
    
    document.body.appendChild(sobreContent);                                      // Adiciona a tela ao site
    
    adicionarMarcaDaguaSobre();                                                   // Insere a imagem decorativa
    
    /* BLOCO: Ativa a animação de entrada e marca o estado do site como "sobre ativo"           */
    setTimeout(() => {
        sobreContent.style.transition = 'opacity 0.3s ease-in';                   // Configura transição suave
        sobreContent.style.opacity = '1';                                         // Torna a tela visível
        document.body.classList.add('sobre-ativo');                               // Indica estado ativo no corpo
    }, 10);
    
    /* BLOCO: Limpa as referências de navegação para focar no conteúdo informativo              */
    if (window.activeLivro) window.activeLivro = null;                            // Reseta livro ativo global
    if (window.activeCapitulo) window.activeCapitulo = null;                      // Reseta capítulo ativo global
    if (window.activeVersiculoButton) window.activeVersiculoButton = null;        // Reseta versículo selecionado
}

/* BLOCO: Remove a tela informativa da visualização aplicando animação de saída  */
function hideSobre() {
    const sobreContent = document.querySelector('.conteudo-sobre');               // Localiza a tela informativa
    if (sobreContent) {

        /* BLOCO: Configura os parâmetros de opacidade para a animação de saída da tela         */
        sobreContent.style.transition = 'opacity 0.2s ease-out';                  // Define animação de sumiço
        sobreContent.style.opacity = '0';                                         // Inicia o desvanecimento
        document.body.classList.remove('sobre-ativo');                            // Remove estado ativo do corpo
        
        /* BLOCO: Remove o elemento do DOM permanentemente após a conclusão da transição        */
        setTimeout(() => {
            if (sobreContent.parentNode) {
                sobreContent.remove();                                            // Remove o elemento do documento
            }
        }, 200);
    }
}

/* BLOCO: Limpa a interface e restaura as variáveis globais para o estado        */
/* padrão de fábrica                                                             */
function restaurarEstadoInicial() {
    const content = document.querySelector('.conteudo');                          // Localiza a área de conteúdo
    if (content) {
        
        /* BLOCO: Realiza a limpeza completa do palco principal removendo elementos bíblicos    */
        Array.from(content.children).forEach(child => {
            if (!child.classList.contains('marcadagua')) {
                child.remove();                                                   // Apaga tudo exceto o fundo
            }
        });

        recriarMarcaDagua();                                                      // Garante a presença do fundo
    }
    
    hideSobre();                                                                  // Fecha a seção Sobre
    
    /* BLOCO: Reinicializa todas as variáveis globais para o estado neutro de abertura          */
    if (typeof window.activeLivro !== 'undefined') window.activeLivro = null;     // Limpa referência de livro
    if (typeof window.activeCapitulo !== 'undefined') window.activeCapitulo = null;  // Limpa referência de capítulo
    if (typeof window.activeVersiculoButton !== 'undefined') window.activeVersiculoButton = null;  // Limpa botão de versículo
    if (typeof window.modoLeituraAtivo !== 'undefined') window.modoLeituraAtivo = false;  // Desliga modo de leitura
    if (typeof window.ultimoLivroSelecionado !== 'undefined') window.ultimoLivroSelecionado = null;  // Limpa cache de navegação
    if (typeof window.ultimoCapituloSelecionado !== 'undefined') window.ultimoCapituloSelecionado = null;
    if (typeof window.ultimoVersiculoSelecionado !== 'undefined') window.ultimoVersiculoSelecionado = null;  
    
    /* BLOCO: Reconstrói o cabeçalho padrão de boas-vindas do aplicativo                        */
    const titulo = document.createElement('h2');                                  // Cria novo título padrão
    titulo.id = 'titulo-principal-versao';                                        // Identifica o título
    titulo.textContent = 'Bíblia Sagrada';                                        // Define texto de boas-vindas
    if (content) {
        content.appendChild(titulo);                                              // Insere título na página
    }
    
    /* BLOCO: Reativa o motor de carregamento da tradução bíblica selecionada pelo seletor      */
    if (typeof window.inicializarVersao === 'function') {
        const versaoAtual = document.getElementById('seletor-versao-principal')?.value || 'arc';  // Identifica bíblia atual
        window.inicializarVersao(versaoAtual).then(() => {                        // Reinicia os scripts da versão
            
            /* BLOCO: Define Gênesis como ponto de partida inicial após a restauração completa  */
            if (typeof window.loadBook === 'function') {
                window.loadBook('genesis');                                       // Carrega Gênesis por padrão
            } else if (typeof window.atualizaBotoesCapitulos === 'function') {
                window.atualizaBotoesCapitulos('genesis', 1);                     // Carrega capítulos de Gênesis
            }
        });
    }
}

/* BLOCO: Configura os escutadores de eventos para interações do usuário         */
const sobreLink = document.getElementById('sobre');                               // Captura o link Sobre
if (sobreLink) {
    sobreLink.addEventListener('click', (event) => {
        event.preventDefault();                                                   // Cancela navegação do link
        loadSobre();                                                              // Abre a tela Sobre
    });
} else {
    console.warn("Link 'Sobre' com ID 'sobre' não encontrado.");                  // Alerta se o link sumir
}

/* BLOCO: Inicializa o controle do menu lateral para dispositivos móveis         */
const menuButton = document.querySelector('.menu-button');                        // Captura botão do menu móvel
if (menuButton) {
    menuButton.addEventListener('click', () => {
        const menuLivros = document.querySelector('.menu-livros');                // Captura a lista de livros
        
        /* BLOCO: Alterna a visibilidade da lista de livros através de classes CSS           */
        if (menuLivros) {
            menuLivros.classList.toggle('show');                                  // Alterna exibição no celular
        }
    });
}
