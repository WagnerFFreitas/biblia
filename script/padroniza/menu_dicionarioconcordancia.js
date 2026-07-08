/*===============================================================================*/
/*              SCRIPT PRINCIPAL DE NAVEGAÇÃO E INICIALIZAÇÃO (APP)              */
/*===============================================================================*/
/*  Este script é responsável por:                                               */
/*              - Coordenar a troca entre Concordância e Dicionário              */
/*             - Gerenciar estados visuais e classes do corpo (body)             */
/*          - Inicializar os motores de busca e gerenciamento de dados           */
/*===============================================================================*/

/* BLOCO: Define a classe mestre MainApp responsável pela orquestração de todos  */
/* os módulos e estados do sistema                                               */
class MainApp {
    constructor() {                                                               // Inicia o construtor do app
        window.dataManager = new DataManager();                                   // Instancia o motor de dados
        window.concordanciaOptimized = new ConcordanciaOptimized();               // Instancia a busca otimizada
        window.dicionario = new Dicionario();                                     // Instancia o dicionário

        /* BLOCO: Define a seção inicial do aplicativo e dispara a configuração de interface e eventos                  */
        this.currentSection = 'concordancia';                                     // Define módulo inicial
        this.initializeElements();                                                // Captura elementos do DOM
        this.bindEvents();                                                        // Vincula cliques aos botões
        this.initializeApp();                                                     // Configura estado de carga
        this.setModuleBodyClass(this.currentSection);                             // Aplica tema visual inicial
    }

    /* BLOCO: Método encarregado de gerenciar as classes CSS do corpo do documento para aplicar temas por módulo        */
    setModuleBodyClass(modulo) {                                                  // Inicia alteração de tema
        document.body.classList.remove('modulo-concordancia', 'modulo-dicionario', 'modulo-sobre');  // Limpa classes anteriores
        if (modulo === 'concordancia' || modulo === 'dicionario' || modulo === 'sobre') {  // Valida o módulo informado
            document.body.classList.add(`modulo-${modulo}`);                      // Aplica nova classe de estilo
            console.log(`Classe aplicada: modulo-${modulo}`);                     // Registra a mudança no log
        }
    }

    /* BLOCO: Atualiza a seção ativa do sistema e sincroniza as classes visuais do contêiner principal                  */
    setCurrentSection(section) {                                                  // Inicia troca de seção
        this.currentSection = section;                                            // Atualiza estado interno
        this.setModuleBodyClass(section);                                         // Sincroniza tema do body
        this.showSection(section);                                                // Alterna visibilidade
    }

    /* BLOCO: Realiza a captura de todas as referências de elementos HTML necessários para a manipulação do app         */
    initializeElements() {                                                        // Inicia mapeamento do DOM
        this.elements = {                                                         // Cria objeto de referências
            menuPrincipal: document.getElementById('menu-principal'),             // Captura menu mestre
            concordanciaBtn: document.getElementById('concordancia'),             // Captura botão concordância
            dicionarioBtn: document.getElementById('dicionario'),                 // Captura botão dicionário
            sobreBtn: document.getElementById('sobre'),                           // Captura botão sobre
            mensagemInicial: document.getElementById('mensagem-inicial'),         // Captura tela de boas vindas
            secaoConcordancia: document.getElementById('secao-concordancia'),     // Captura bloco concordância
            secaoDicionario: document.getElementById('secao-dicionario'),         // Captura bloco dicionário
            secaoSobre: document.getElementById('secao-sobre'),                   // Captura bloco sobre
            menuAlfabetico: document.querySelector('.menu-alfabetico'),           // Captura barra de letras
            tituloMenu: document.querySelector('.titulo-menu'),                   // Captura título da barra
            menuOpcoes: document.querySelector('.menu-opcoes'),                   // Captura lista de opções
            nav: document.querySelector('nav')                                    // Captura barra de navegação
        }
    }

    /* BLOCO: Estabelece os vínculos de escuta de eventos para os botões da barra de ferramentas superior               */
    bindEvents() {                                                                // Inicia vínculo de eventos
        this.elements.concordanciaBtn.addEventListener('click', (e) => {          // Escuta clique concordância
            e.preventDefault();                                                   // Cancela navegação padrão
            this.showSection('concordancia');                                     // Exibe módulo concordância
        });

        /* BLOCO: Gerencia a transição para a visualização do Dicionário Bíblico após a interação do usuário            */
        this.elements.dicionarioBtn.addEventListener('click', (e) => {            // Escuta clique dicionário
            e.preventDefault();                                                   // Cancela navegação padrão
            this.showSection('dicionario');                                       // Exibe módulo dicionário
        });

        /* BLOCO: Configura a transição para a seção informativa "Sobre" capturando o evento de clique do usuário        */
        this.elements.sobreBtn.addEventListener('click', (e) => {                 // Escuta clique sobre
            e.preventDefault();                                                   // Cancela navegação padrão
            this.showSection('sobre');                                            // Exibe módulo informativo
        });
    }

    /* BLOCO: Prepara o ambiente visual inicial e dispara a construção do índice de busca em segundo plano              */
    initializeApp() {                                                             // Inicia motor de arranque
        this.elements.menuAlfabetico.style.display = 'none';                      // Oculta menu lateral inicial
        this.elements.tituloMenu.style.display = 'none';                          // Oculta título lateral
        document.querySelector('#conteudo-principal').style.marginLeft = '0px';   // Reseta margem de conteúdo

        console.log('📖 Concordância e Dicionário Bíblico inicializado');          // Log de sucesso sistema

        /* BLOCO: Inicia a construção do índice invertido de busca para garantir performance nas pesquisas              */
        if (window.searchIndex && typeof window.searchIndex.buildIndex === 'function') {  // Valida motor de busca
            window.searchIndex.buildIndex()                                       // Dispara indexação
                .then(() => console.log('✅ Índice de busca pronto para uso'))     // Log de conclusão sucesso
                .catch(console.error);                                            // Log de falha na indexação
        }
    }

    /* BLOCO: Controla a visibilidade das seções do sistema e atualiza o estado visual dos botões de navegação          */
    showSection(sectionName) {                                                    // Inicia transição de seção
        document.querySelectorAll('.menu-opcoes a').forEach(btn => btn.classList.remove('active'));  // Desativa botões anteriores

        this.elements.mensagemInicial.style.display = 'none';                     // Remove mensagem de entrada
        this.elements.secaoConcordancia.classList.add('secao-inativa');           // Oculta concordância
        this.elements.secaoDicionario.classList.add('secao-inativa');             // Oculta dicionário
        this.elements.secaoSobre.classList.add('secao-inativa');                  // Oculta informativo

        /* BLOCO: Aplica a lógica de ativação específica para o módulo selecionado pelo usuário                         */
        switch (sectionName) {
            case 'concordancia':                                                  // Caso seja concordância
                this.elements.secaoConcordancia.classList.remove('secao-inativa');  // Torna a seção visível
                this.elements.secaoConcordancia.classList.add('secao-ativa');     // Ativa layout da seção
                this.elements.concordanciaBtn.classList.add('active');            // Destaca o botão no menu
                this.elements.menuAlfabetico.style.display = 'block';             // Mostra as letras de A-Z
                this.currentSection = 'concordancia';                             // Atualiza estado global
                this.setModuleBodyClass(this.currentSection);                     // Aplica tema de concordância
                break;

            /* BLOCO: Ativa a interface do Dicionário Bíblico, configurando o menu lateral e inicializando o motor      */
            case 'dicionario':                                                    // Caso seja dicionário
                this.elements.secaoDicionario.classList.remove('secao-inativa');  // Torna a seção visível
                this.elements.secaoDicionario.classList.add('secao-ativa');       // Ativa layout da seção
                this.elements.dicionarioBtn.classList.add('active');              // Destaca o botão no menu
                this.elements.menuAlfabetico.style.display = 'block';             // Mostra as letras de A-Z
                this.currentSection = 'dicionario';                               // Atualiza estado global
                this.setModuleBodyClass(this.currentSection);                     // Aplica tema de dicionário
                if (window.dicionario && typeof window.dicionario.init === 'function') {  // Valida motor do dicionário
                    window.dicionario.init();                                     // Inicializa dados dicionário
                }
                break;

            /* BLOCO: Ativa a visualização da seção "Sobre", ocultando elementos de busca e ajustando a interface       */
            case 'sobre':                                                         // Caso seja sobre o projeto
                this.elements.secaoSobre.classList.remove('secao-inativa');       // Torna a seção visível
                this.elements.secaoSobre.classList.add('secao-ativa');            // Ativa layout da seção
                this.elements.sobreBtn.classList.add('active');                   // Destaca o botão no menu
                this.elements.menuAlfabetico.style.display = 'none';              // Esconde menu de letras
                this.currentSection = 'sobre';                                    // Atualiza estado global
                this.setModuleBodyClass(this.currentSection);                     // Aplica tema informativo
                break;
        }

        /* BLOCO: Ajusta as configurações finais de alinhamento do menu e as margens do contêiner de conteúdo           */
        this.elements.tituloMenu.style.display = 'block';                         // Ativa título da barra
        this.elements.nav.style.justifyContent = 'flex-start';                    // Alinha navegação à esquerda
        this.elements.menuOpcoes.style.marginLeft = '20px';                       // Ajusta espaçamento menu

        const conteudoPrincipal = document.querySelector('#conteudo-principal');  // Acha área de conteúdo
        conteudoPrincipal.style.marginLeft = (sectionName === 'sobre') ? '40px' : '140px';  // Ajusta margem conforme seção
    }
}

window.MainApp = MainApp;                                                         // Exporta classe para global

/* BLOCO: Função utilitária global para definir a classe de estilo do corpo com  */
/* base no endereço da página atual                                              */
function definirClasseModulo() {                                                  // Inicia detecção de rota
    const path = window.location.pathname;                                        // Captura o caminho da URL
    document.body.classList.remove('modulo-concordancia', 'modulo-dicionario', 'modulo-sobre');  // Limpa estilos residuais
    
    /* BLOCO: Identifica o termo contido na URL para aplicar a classe de estilo correspondente ao módulo ativo          */
    if (path.includes('concordancia')) {                                          // Verifica se é concordância
        document.body.classList.add('modulo-concordancia');                       // Aplica estilo concordância
    } else if (path.includes('dicionario')) {                                     // Verifica se é dicionário
        document.body.classList.add('modulo-dicionario');                         // Aplica estilo dicionário
    } else if (path.includes('sobre')) {                                          // Verifica se é informativo
        document.body.classList.add('modulo-sobre');                              // Aplica estilo sobre
    }
}

document.addEventListener('DOMContentLoaded', definirClasseModulo);               // Monitora carga inicial
window.addEventListener('popstate', definirClasseModulo);                         // Monitora navegação histórico

document.addEventListener('DOMContentLoaded', () => {                             // Inicia aplicação no DOM
    window.app = new MainApp();                                                   // Cria instância única do app
});
