/*===============================================================================*/
/*                 SCRIPT COORDENADOR: DICIONÁRIO E CONCORDÂNCIA                 */
/*===============================================================================*/
/* - Gerencia a troca de visualizações (views) entre Concordância e Dicionário.  */
/* - Carrega os templates HTML correspondentes sob demanda.                      */
/* - Coordena a comunicação entre o menu alfabético e a view ativa.              */
/*===============================================================================*/

// Este bloco importa as funções necessárias dos módulos de concordância e dicionário.
import {
    onConcordanciaViewReady,
    carregarDadosBaseConcordancia,
    atualizarFiltroTestamento,
    atualizarFiltroLivro,
    executarBuscaGlobalConcordancia,
    atualizarFiltroPalavra
} from './concordancia.js';
import { setupDicionarioView, carregarEDisplayDicionarioPorLetra } from './dicionario.js';
import { initConcordanciaDropdowns } from './dropdown_concordancia.js';

// Este bloco é executado quando o DOM está completamente carregado.
document.addEventListener('DOMContentLoaded', () => {                             // Mapeia os elementos principais da interface.
    const conteudoPrincipal = document.getElementById('conteudoPrincipal');
    const inicial = document.getElementById('mensagem-inicial');
    const navConcordancia = document.getElementById('concordancia');
    const navDicionario = document.getElementById('dicionario');
    const menuAlfabetico = document.querySelector('.menu-alfabetico');

    // Este bloco define os caminhos para os arquivos HTML e de dados.
    const TELA_CONCORDANCIA_PATH = 'concordancia.html';
    const TELA_DICIONARIO_VIEW_PATH = 'dicionario.html';
    const CONCORDANCIA_DATA_BASE_PATH = '../concordancia/';
    const DICIONARIO_DATA_BASE_PATH_LOCAL = '/dicionario/';

    // Este bloco cria as variáveis de estado para controlar a view atual e a letra ativa.
    let currentView = null;
    let letraAtivaSidebar = null;

    // Este bloco contém funções utilitárias para manipular a interface.
    function clearActiveNav() {
        document.querySelectorAll('nav .menu-opcoes li a.active').forEach(link => link.classList.remove('active'));  // Remove a classe 'active' de todos os links de navegação.
    }

    function setActiveNav(navElement) {
        if (navElement) navElement.classList.add('active');                       // Adiciona a classe 'active' a um link de navegação específico.
    }

    function adjustMainContentMargin() {
        const sidebarWidth = parseFloat(getComputedStyle(menuAlfabetico).width) || 60;
        const isSidebarVisible = currentView === 'concordance' || currentView === 'dictionary';
        const elementos = ['conteudoPrincipal', 'mensagem-inicial'].map(id => document.getElementById(id));
        elementos.forEach(el => {
            if (el) el.style.marginLeft = isSidebarVisible ? `${sidebarWidth}px` : '0';  // Ajusta a margem esquerda do conteúdo principal para acomodar o menu lateral.
        });
    }

    function showInitialState() {
        if (inicial) {
            inicial.innerHTML = `
                <h2>Seja bem-vindo!</h2>
                <p>Escolha Concordância ou Dicionário no menu superior.</p>`;
            inicial.style.display = 'block';
        }
        if (conteudoPrincipal) conteudoPrincipal.innerHTML = '';
        if (menuAlfabetico) menuAlfabetico.style.display = 'none';
        clearActiveNav();
        currentView = null;
        letraAtivaSidebar = null;
        adjustMainContentMargin();
    }

    // Este bloco carrega dinamicamente o conteúdo de um arquivo HTML em um elemento alvo.
    async function loadView(viewPath, targetElement, onLoadedCallback) {
        if (!targetElement) return showInitialState();
        if (inicial) inicial.style.display = 'none';
        targetElement.innerHTML = '<div class="loader-geral">Carregando...</div>';  // Exibe um loader.

        try {
            const response = await fetch(viewPath);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const html = await response.text();
            targetElement.innerHTML = html;
            if (onLoadedCallback) onLoadedCallback();                             // Executa o callback após a inserção do HTML.
        } catch (error) {
            targetElement.innerHTML = `<p class="erro-mensagem">${error.message}</p>`;
        }
    }

    // Este bloco busca os dados da concordância para uma letra específica e os exibe.
    async function fetchConcordanciaDataByLetter(letra) {
        const resultadosConteiner = conteudoPrincipal.querySelector('#resultados-conteiner');
        if (!resultadosConteiner) return;

        resultadosConteiner.innerHTML = '<div class="loader">Carregando...</div>';

        try {
            const response = await fetch(`${CONCORDANCIA_DATA_BASE_PATH}${letra.toLowerCase()}.json`);
            if (!response.ok) throw new Error('Arquivo não encontrado.');
            const jsonData = await response.json();
            const wordEntries = jsonData[letra.toLowerCase()] || [];
            carregarDadosBaseConcordancia(wordEntries);                           // Usa a função do módulo concordancia.js para processar os dados.
        } catch (error) {
            resultadosConteiner.innerHTML = `<p class="erro-mensagem">${error.message}</p>`;
            carregarDadosBaseConcordancia([]);
        }
    }

    // Este blcoo configura os listeners de evento para os botões de letra do menu lateral.
    function setupGlobalLetterButtonListeners() {
        if (!menuAlfabetico) return;
        menuAlfabetico.querySelectorAll('.letra-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                menuAlfabetico.querySelectorAll('.letra-btn.active').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                letraAtivaSidebar = btn.dataset.letra;                            // Atualiza a letra ativa.

                if (currentView === 'concordance') {                              // Decide qual função chamar com base na view atual.
                    const buscaGlobalInput = conteudoPrincipal.querySelector('.filtros-conteiner .search-input');
                    const filtroPalavraInput = conteudoPrincipal.querySelector('#filtro-palavra-input');
                    if (buscaGlobalInput) buscaGlobalInput.value = '';
                    if (filtroPalavraInput) filtroPalavraInput.value = '';
                    fetchConcordanciaDataByLetter(letraAtivaSidebar);
                } else if (currentView === 'dictionary') {
                    const buscaDicionarioInput = conteudoPrincipal.querySelector('#dicionarioSearchInput');
                    if (buscaDicionarioInput) buscaDicionarioInput.value = '';
                    if (window.dicionario && typeof window.dicionario.loadAndDisplayLetter === 'function') {
                        window.dicionario.loadAndDisplayLetter(letraAtivaSidebar);  // Chama o método da instância do dicionário.
                    }
                }
                adjustMainContentMargin();
            });
        });
    }

    // Callback executado após o carregamento da view da Concordância,
    // inicializando o dropdowns e os eventos de busca específicos da concordância.
    function onConcordanciaViewLoadedAndReady() {
        initConcordanciaDropdowns(
            (testamentoValue) => atualizarFiltroTestamento(testamentoValue),
            (livroValue) => atualizarFiltroLivro(livroValue)
        );
        onConcordanciaViewReady();

        const buscaGlobalInput = conteudoPrincipal.querySelector('.filtros-conteiner .search-input');
        const filtroPalavraInputConc = conteudoPrincipal.querySelector('#filtro-palavra-input');
        const btnConsultar = conteudoPrincipal.querySelector('.filtros-conteiner .search-btn');

        function executarBuscaGlobalConcHandler() {
            const termoBusca = buscaGlobalInput.value.trim();
            executarBuscaGlobalConcordancia(termoBusca);
            if (filtroPalavraInputConc) filtroPalavraInputConc.value = '';
            if (termoBusca && menuAlfabetico) {
                menuAlfabetico.querySelectorAll('.letra-btn.active').forEach(b => b.classList.remove('active'));
                letraAtivaSidebar = null;
            }
        }

        if (btnConsultar && buscaGlobalInput) {
            btnConsultar.addEventListener('click', executarBuscaGlobalConcHandler);
            buscaGlobalInput.addEventListener('keyup', e => e.key === 'Enter' && btnConsultar.click());
        }
        if (filtroPalavraInputConc) {
            filtroPalavraInputConc.addEventListener('input', e => atualizarFiltroPalavra(e.target.value));
        }

        if (letraAtivaSidebar) {
            fetchConcordanciaDataByLetter(letraAtivaSidebar);
            const btnLetraAtiva = menuAlfabetico.querySelector(`.letra-btn[data-letra="${letraAtivaSidebar}"]`);
            if (btnLetraAtiva && !btnLetraAtiva.classList.contains('active')) btnLetraAtiva.classList.add('active');
        }
    }

    // Este bloco Callback executado após o carregamento da view do Dicionário.
    function onDicionarioViewLoadedAndReady() {
        setupDicionarioView(letraAtivaSidebar);                                   // Configura a view do dicionário.
        if (letraAtivaSidebar) {
            const btnLetraAtiva = menuAlfabetico.querySelector(`.letra-btn[data-letra="${letraAtivaSidebar}"]`);
            if (btnLetraAtiva && !btnLetraAtiva.classList.contains('active')) btnLetraAtiva.classList.add('active');
        }
    }

    // Este bloco configura os eventos de clique para a navegação principal entre seções.
    navConcordancia.addEventListener('click', e => {
        e.preventDefault();
        if (currentView === 'concordance') return;
        clearActiveNav(); setActiveNav(navConcordancia); currentView = 'concordance';
        menuAlfabetico.style.display = 'flex'; adjustMainContentMargin();
        loadView(TELA_CONCORDANCIA_PATH, conteudoPrincipal, onConcordanciaViewLoadedAndReady);  // Carrega a view da concordância.
    });

    navDicionario.addEventListener('click', e => {
        e.preventDefault();
        if (currentView === 'dictionary') return;
        clearActiveNav(); setActiveNav(navDicionario); currentView = 'dictionary';
        menuAlfabetico.style.display = 'flex'; adjustMainContentMargin();
        loadView(TELA_DICIONARIO_VIEW_PATH, conteudoPrincipal, onDicionarioViewLoadedAndReady);  // Carrega a view do dicionário.
    });

    // Este bloco inicializa a aplicação.
    setupGlobalLetterButtonListeners();
    showInitialState();
    window.addEventListener('resize', adjustMainContentMargin);
});
