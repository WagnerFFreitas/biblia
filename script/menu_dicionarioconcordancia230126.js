/*===============================================================================
/*              SCRIPT PRINCIPAL DE NAVEGAÃ‡ÃƒO E INICIALIZAÃ‡ÃƒO (APP)              
/* menu_dicioarioconcordancia.js */
/*===============================================================================*/

class MainApp {
    constructor() {
        window.dataManager = new DataManager();
        window.concordanciaOptimized = new ConcordanciaOptimized();
        window.dicionario = new Dicionario();

        this.currentSection = 'concordancia';
        this.initializeElements();
        this.bindEvents();
        this.initializeApp();
        this.setModuleBodyClass(this.currentSection); // Única chamada no construtor
    }

    /**
     * Controla as classes do body para aplicar estilos específicos por módulo
     * @param {string} modulo - Nome do módulo: 'concordancia' ou 'dicionario'
     */
    setModuleBodyClass(modulo) {
        document.body.classList.remove('modulo-concordancia', 'modulo-dicionario', 'modulo-sobre');
        if (modulo === 'concordancia' || modulo === 'dicionario' || modulo === 'sobre') {
            document.body.classList.add(`modulo-${modulo}`);
            console.log(`Classe aplicada: modulo-${modulo}`);
        }
    }

    /**
     * Método modificado para incluir controle de classes do body
     */
    setCurrentSection(section) {
        this.currentSection = section;
        this.setModuleBodyClass(section);
        this.showSection(section);
    }

    initializeElements() {
        this.elements = {
            menuPrincipal: document.getElementById('menu-principal'),
            concordanciaBtn: document.getElementById('concordancia'),
            dicionarioBtn: document.getElementById('dicionario'),
            sobreBtn: document.getElementById('sobre'),
            mensagemInicial: document.getElementById('mensagem-inicial'),
            secaoConcordancia: document.getElementById('secao-concordancia'),
            secaoDicionario: document.getElementById('secao-dicionario'),
            secaoSobre: document.getElementById('secao-sobre'),
            menuAlfabetico: document.querySelector('.menu-alfabetico'),
            tituloMenu: document.querySelector('.titulo-menu'),
            menuOpcoes: document.querySelector('.menu-opcoes'),
            nav: document.querySelector('nav')
        };
    }

    bindEvents() {
        this.elements.concordanciaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.showSection('concordancia');
        });

        this.elements.dicionarioBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.showSection('dicionario');
        });

        this.elements.sobreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.showSection('sobre');
        });
    }

    initializeApp() {
        this.elements.menuAlfabetico.style.display = 'none';
        this.elements.tituloMenu.style.display = 'none';
        document.querySelector('#conteudo-principal').style.marginLeft = '0px';

        console.log('ðŸ“– ConcordÃ¢ncia e DicionÃ¡rio BÃ­blico inicializado');
        console.log('âŒ¨ï¸  Atalhos: Ctrl+1 (ConcordÃ¢ncia), Ctrl+2 (DicionÃ¡rio), Ctrl+3 (Sobre)');

        // ðŸš€ Construir Ã­ndice de busca imediatamente
        if (window.searchIndex && typeof window.searchIndex.buildIndex === 'function') {
            window.searchIndex.buildIndex()
                .then(() => console.log('âœ… Ãndice de busca pronto para uso'))
                .catch(console.error);
        }
    }

    showSection(sectionName) {
        document.querySelectorAll('.menu-opcoes a').forEach(btn => btn.classList.remove('active'));

        this.elements.mensagemInicial.style.display = 'none';
        this.elements.secaoConcordancia.classList.add('secao-inativa');
        this.elements.secaoDicionario.classList.add('secao-inativa');
        this.elements.secaoSobre.classList.add('secao-inativa');

        switch (sectionName) {
            case 'concordancia':
                this.elements.secaoConcordancia.classList.remove('secao-inativa');
                this.elements.secaoConcordancia.classList.add('secao-ativa');
                this.elements.concordanciaBtn.classList.add('active');
                this.elements.menuAlfabetico.style.display = 'block';
                this.currentSection = 'concordancia';
                this.setModuleBodyClass(this.currentSection); // Única chamada
                break;

            case 'dicionario':
                this.elements.secaoDicionario.classList.remove('secao-inativa');
                this.elements.secaoDicionario.classList.add('secao-ativa');
                this.elements.dicionarioBtn.classList.add('active');
                this.elements.menuAlfabetico.style.display = 'block';
                this.currentSection = 'dicionario';
                this.setModuleBodyClass(this.currentSection); // Única chamada
                if (window.dicionario && typeof window.dicionario.init === 'function') {
                    window.dicionario.init();
                }
                break;

            case 'sobre':
                this.elements.secaoSobre.classList.remove('secao-inativa');
                this.elements.secaoSobre.classList.add('secao-ativa');
                this.elements.sobreBtn.classList.add('active');
                this.elements.menuAlfabetico.style.display = 'none';
                this.currentSection = 'sobre';
                this.setModuleBodyClass(this.currentSection); // Única chamada
                break;
        }

        this.elements.tituloMenu.style.display = 'block';
        this.elements.nav.style.justifyContent = 'flex-start';
        this.elements.menuOpcoes.style.marginLeft = '20px';

        const conteudoPrincipal = document.querySelector('#conteudo-principal');
        conteudoPrincipal.style.marginLeft = (sectionName === 'sobre') ? '40px' : '140px';
    }
}

window.MainApp = MainApp;

// Função para definir a classe do módulo com base na página atual
function definirClasseModulo() {
    // Obtém o caminho da URL atual
    const path = window.location.pathname;
    
    // Remove qualquer classe de módulo existente
    document.body.classList.remove('modulo-concordancia', 'modulo-dicionario', 'modulo-sobre');
    
    // Adiciona a classe apropriada com base na URL
    if (path.includes('concordancia')) {
        document.body.classList.add('modulo-concordancia');
    } else if (path.includes('dicionario')) {
        document.body.classList.add('modulo-dicionario');
    } else if (path.includes('sobre')) {
        document.body.classList.add('modulo-sobre');
    }
}

// Chama a função quando a página carrega
document.addEventListener('DOMContentLoaded', definirClasseModulo);

// Chama a função quando houver navegação via History API
window.addEventListener('popstate', definirClasseModulo);

// Instanciar o MainApp quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MainApp();
});