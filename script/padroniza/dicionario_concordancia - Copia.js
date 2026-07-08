
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


document.addEventListener('DOMContentLoaded', () => {                                                                  
    const conteudoPrincipal = document.getElementById('conteudoPrincipal');
    const inicial = document.getElementById('mensagem-inicial');
    const navConcordancia = document.getElementById('concordancia');
    const navDicionario = document.getElementById('dicionario');
    const menuAlfabetico = document.querySelector('.menu-alfabetico');

    
    const TELA_CONCORDANCIA_PATH = 'concordancia.html';
    const TELA_DICIONARIO_VIEW_PATH = 'dicionario.html';
    const CONCORDANCIA_DATA_BASE_PATH = '../concordancia/';
    const DICIONARIO_DATA_BASE_PATH_LOCAL = '/dicionario/';

    
    let currentView = null;
    let letraAtivaSidebar = null;

    
    function clearActiveNav() {
        document.querySelectorAll('nav .menu-opcoes li a.active').forEach(link => link.classList.remove('active'));    
    }

    function setActiveNav(navElement) {
        if (navElement) navElement.classList.add('active');                                                            
    }

    function adjustMainContentMargin() {
        const sidebarWidth = parseFloat(getComputedStyle(menuAlfabetico).width) || 60;
        const isSidebarVisible = currentView === 'concordance' || currentView === 'dictionary';
        const elementos = ['conteudoPrincipal', 'mensagem-inicial'].map(id => document.getElementById(id));
        elementos.forEach(el => {
            if (el) el.style.marginLeft = isSidebarVisible ? `${sidebarWidth}px` : '0';                                
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

    
    async function loadView(viewPath, targetElement, onLoadedCallback) {
        if (!targetElement) return showInitialState();
        if (inicial) inicial.style.display = 'none';
        targetElement.innerHTML = '<div class="loader-geral">Carregando...</div>';                                     

        try {
            const response = await fetch(viewPath);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const html = await response.text();
            targetElement.innerHTML = html;
            if (onLoadedCallback) onLoadedCallback();                                                                  
        } catch (error) {
            targetElement.innerHTML = `<p class="erro-mensagem">${error.message}</p>`;
        }
    }

    
    async function fetchConcordanciaDataByLetter(letra) {
        const resultadosConteiner = conteudoPrincipal.querySelector('#resultados-conteiner');
        if (!resultadosConteiner) return;

        resultadosConteiner.innerHTML = '<div class="loader">Carregando...</div>';

        try {
            const response = await fetch(`${CONCORDANCIA_DATA_BASE_PATH}${letra.toLowerCase()}.json`);
            if (!response.ok) throw new Error('Arquivo não encontrado.');
            const jsonData = await response.json();
            const wordEntries = jsonData[letra.toLowerCase()] || [];
            carregarDadosBaseConcordancia(wordEntries);                                                                
        } catch (error) {
            resultadosConteiner.innerHTML = `<p class="erro-mensagem">${error.message}</p>`;
            carregarDadosBaseConcordancia([]);
        }
    }

    
    function setupGlobalLetterButtonListeners() {
        if (!menuAlfabetico) return;
        menuAlfabetico.querySelectorAll('.letra-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                menuAlfabetico.querySelectorAll('.letra-btn.active').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                letraAtivaSidebar = btn.dataset.letra;                                                                 

                if (currentView === 'concordance') {                                                                   
                    const buscaGlobalInput = conteudoPrincipal.querySelector('.filtros-conteiner .search-input');
                    const filtroPalavraInput = conteudoPrincipal.querySelector('#filtro-palavra-input');
                    if (buscaGlobalInput) buscaGlobalInput.value = '';
                    if (filtroPalavraInput) filtroPalavraInput.value = '';
                    fetchConcordanciaDataByLetter(letraAtivaSidebar);
                } else if (currentView === 'dictionary') {
                    const buscaDicionarioInput = conteudoPrincipal.querySelector('#dicionarioSearchInput');
                    if (buscaDicionarioInput) buscaDicionarioInput.value = '';
                    if (window.dicionario && typeof window.dicionario.loadAndDisplayLetter === 'function') {
                        window.dicionario.loadAndDisplayLetter(letraAtivaSidebar);                                     
                    }
                }
                adjustMainContentMargin();
            });
        });
    }

    
    
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

    
    function onDicionarioViewLoadedAndReady() {
        setupDicionarioView(letraAtivaSidebar);                                                                    
        if (letraAtivaSidebar) {
            const btnLetraAtiva = menuAlfabetico.querySelector(`.letra-btn[data-letra="${letraAtivaSidebar}"]`);
            if (btnLetraAtiva && !btnLetraAtiva.classList.contains('active')) btnLetraAtiva.classList.add('active');
        }
    }

    
    navConcordancia.addEventListener('click', e => {
        e.preventDefault();
        if (currentView === 'concordance') return;
        clearActiveNav(); setActiveNav(navConcordancia); currentView = 'concordance';
        menuAlfabetico.style.display = 'flex'; adjustMainContentMargin();
        loadView(TELA_CONCORDANCIA_PATH, conteudoPrincipal, onConcordanciaViewLoadedAndReady);                     
    });

    navDicionario.addEventListener('click', e => {
        e.preventDefault();
        if (currentView === 'dictionary') return;
        clearActiveNav(); setActiveNav(navDicionario); currentView = 'dictionary';
        menuAlfabetico.style.display = 'flex'; adjustMainContentMargin();
        loadView(TELA_DICIONARIO_VIEW_PATH, conteudoPrincipal, onDicionarioViewLoadedAndReady);                    
    });

    
    setupGlobalLetterButtonListeners();
    showInitialState();
    window.addEventListener('resize', adjustMainContentMargin);
});
