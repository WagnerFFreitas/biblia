/*                                                                               */
/* /*===============================================================================*/
/* /*              SCRIPT PRINCIPAL DE NAVEGAÇÃO E INICIALIZAÇÃO (APP)           */
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

        console.log('📖 Concordância e Dicionário Bíblico inicializado');
        console.log('⌨️  Atalhos: Ctrl+1 (Concordância), Ctrl+2 (Dicionário), Ctrl+3 (Sobre)');

        // 🚀 Construir índice de busca imediatamente
        if (window.searchIndex && typeof window.searchIndex.buildIndex === 'function') {
            window.searchIndex.buildIndex()
                .then(() => console.log('✅ Índice de busca pronto para uso'))
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
                break;

            case 'dicionario':
                this.elements.secaoDicionario.classList.remove('secao-inativa');
                this.elements.secaoDicionario.classList.add('secao-ativa');
                this.elements.dicionarioBtn.classList.add('active');
                this.elements.menuAlfabetico.style.display = 'block';
                this.currentSection = 'dicionario';
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

// Instanciar o MainApp quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MainApp();
});
