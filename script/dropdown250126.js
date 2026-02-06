/*===============================================================================*/
/*                    SCRIPT DE MENUS DROPDOWN DA BARRA DE NAVEGAÇÃO              */
/*===============================================================================*/
/*  Este arquivo contém:                                                         */
/*                    - Lógica centralizada para os menus dropdown               */
/*                    - Downloads de bíblias em PDF e recursos externos          */
/*                    - Harpa, hinários e utilitários                           */
/*===============================================================================*/

// Este bloco implementa funcionalidades de menus suspensos usando IIFE para evitar poluição do escopo global
(function() {
    'use strict';

    console.log("[dropdown.js] Script iniciado.");                                             // Loga o início do script

    // Este bloco define o caminho base para recursos relativos (importante: paths são relativos ao HTML que carrega este script)
    const basePath = '../';

    // Este bloco define a lista de bíblias disponíveis para download (cada item contém texto e link para PDF)
    const downloads = [
        { texto: 'A Bíblia Católica', link: `${basePath}baixar/A_Biblia_Catolica.pdf` },
        { texto: 'A Bíblia Sagrada NVT', link: `${basePath}baixar/A_Biblia_Sagrada_NVT.pdf` },
        { texto: 'A Bíblia Viva', link: `${basePath}baixar/A_Biblia_Viva.pdf` },
        { texto: 'A vida completa de Jesus<br>Pr. Juanribe Pagliarin', link: `${basePath}baixar/A_vida_completa_de_Jesus_Pr_Juanribe_Pagliarin.pdf` },
        { texto: 'Bíblia de Genebra<br>(só estudo)', link: `${basePath}baixar/Biblia_Genebra_so_estudo.pdf` },
        { texto: 'Bíblia em ordem<br>cronológica NVI', link: `${basePath}baixar/Biblia_em_ordem_cronologica_NVI.pdf` },
        { texto: 'Bíblia explicada', link: `${basePath}baixar/Biblia_explicada.pdf` },
        { texto: 'Bíblia KJA', link: `${basePath}baixar/Biblia_KJA.pdf` },
        { texto: 'Bíblia Palavra-Chave', link: `${basePath}baixar/Biblia_palavra_chave.pdf` },
        { texto: 'Bíblia Thompson<br>Temas em Cadeia', link: `${basePath}baixar/Biblia_Thompson_temas_em_cadeia.pdf` }
    ];

    // Este bloco define a lista de recursos de dicionário e concordância (recursos planejados para implementação futura)
    const dicionario = [
        { texto: 'Dicionário biblico', link: '../html/dicionario.html' },
        { texto: 'Concordância (Em breve)', link: 'https://www.exemplo.com/strong' }
    ];

    // Este bloco define a lista de recursos de músicas e hinários (recursos planejados para implementação futura)
    const harpaHinario = [
        { texto: 'Harpa Cristã (Em breve)', link: '#' },
        { texto: 'Cantor Cristão (Em breve)', link: '#' }
    ];

    // Este bloco define a lista de links úteis e ferramentas auxiliares (inclui recursos externos e páginas internas)
    const utilidades = [
        { texto: 'IA Ajudar a estudar a biblia', link: 'https://bible.ai/pt' },
        { texto: 'Posso conhecer a Deus', link: 'https://caniknowgod.com/' },
        { texto: 'Dicionário e Comentário<br> de toda a Bíblia', link: 'https://www.apologeta.com.br' },
        { texto: 'BíbliaOn', link: 'https://www.bibliaon.com/' },
        { texto: 'Cursos', link: `${basePath}html/cursos.html` }
    ];

    // Este bloco define a função que popula uma lista dropdown com itens (limpa a lista antes de popular)
    function populateList(listId, items) {
        const listElement = document.getElementById(listId);                                   // Busca o elemento da lista no DOM
        if (!listElement) {                                                                    // Verifica se o elemento existe
            console.warn(`[dropdown.js] Lista '${listId}' nao encontrada no DOM.`);            // Loga aviso se não encontrar
            return;                                                                            // Interrompe a função se não existir
        }
        
        listElement.innerHTML = '';                                                            // Limpa a lista antes de popular

        items.forEach(item => {                                                                // Itera sobre cada item do array
            const li = document.createElement('li');                                           // Cria elemento <li> para cada item
            const a = document.createElement('a');                                             // Cria elemento <a> para o link
            a.href = item.link;                                                                // Define o href do link
            a.innerHTML = item.texto;                                                          // Define o texto do link

            // Este bloco configura links externos/PDFs para abrir em nova aba
            if (item.link !== '#' && (                                                         // Verifica se não é link placeholder
                item.link.startsWith('http') ||                                                // Verifica se é link externo
                item.link.endsWith('.pdf') ||                                                  // Verifica se é arquivo PDF
                item.link.endsWith('.html')                                                    // Verifica se é arquivo HTML
            )) {
                a.target = '_blank';                                                           // Define para abrir em nova aba
                a.rel = 'noopener noreferrer';                                                 // Define atributos de segurança
            }

            li.appendChild(a);                                                                 // Adiciona o link ao item da lista
            listElement.appendChild(li);                                                       // Adiciona o item à lista
        });
    }

    // Este bloco define a função que controla a visibilidade dos menus dropdown
    function showList(listId) {
        const listElement = document.getElementById(listId);                                   // Busca o elemento da lista
        if (listElement) {                                                                     // Verifica se o elemento existe
            listElement.style.display = 'block';                                               // Define display como block para mostrar
        }
    }

    function hideList(listId) {
        const listElement = document.getElementById(listId);                                   // Busca o elemento da lista
        if (listElement) {                                                                     // Verifica se o elemento existe
            listElement.style.display = 'none';                                                // Define display como none para ocultar
        }
    }

    // Este bloco configura eventos de interação para os menus dropdown (exibição ao passar o mouse, ocultação com delay)
    function setupDropdownEvents() {
        const dropdownTriggers = document.querySelectorAll('nav ul li.dropdown > a');          // Busca todos os triggers de dropdown
        
        dropdownTriggers.forEach((trigger, index) => {                                         // Itera sobre cada trigger
            const dropdownConteiner = trigger.parentElement;                                   // Obtém o conteiner do dropdown
            const listContent = dropdownConteiner.querySelector('.conteudo-menu-suspenso');         // Busca o conteúdo da lista

            if (!listContent) {                                                                // Verifica se existe conteúdo
                console.warn(`[dropdown.js] Menu #${index+1} sem conteudo.`);                  // Loga aviso se não encontrar
                return;                                                                        // Interrompe iteração se não existir
            }

            if (listContent.id) {                                                              // Verifica se o conteúdo tem ID
                let hideTimeout;                                                               // Define variável para timeout de ocultação

                // Este bloco define a função de exibição (limpa timeout anterior)
                const show = () => {                                                           // Define função para mostrar menu
                    clearTimeout(hideTimeout);                                                 // Limpa timeout de ocultação
                    showList(listContent.id);                                                  // Mostra a lista
                };

                // Este bloco define a função de ocultação com delay (verifica se ainda está em hover)
                const startHideTimeout = () => {
                    hideTimeout = setTimeout(() => {                                           // Define timeout de 250ms
                        const currentConteiner = trigger.parentElement;                        // Obtém conteiner atual
                        const currentList = document.getElementById(listContent.id);           // Obtém lista atual

                        if (!currentConteiner.matches(':hover') &&                             // Verifica se conteiner não está em hover
                            (!currentList || !currentList.matches(':hover'))) {                // Verifica se lista não está em hover
                            hideList(listContent.id);                                          // Oculta a lista
                        }
                    }, 250);                                                                   // Define delay de 250ms
                };

                // Este bloco configura os event listeners para cada elemento
                dropdownConteiner.addEventListener('mouseenter', show);                        // Adiciona listener para mouseenter no conteiner
                dropdownConteiner.addEventListener('mouseleave', startHideTimeout);            // Adiciona listener para mouseleave no conteiner
                listContent.addEventListener('mouseenter', show);                              // Adiciona listener para mouseenter na lista
                listContent.addEventListener('mouseleave', startHideTimeout);                  // Adiciona listener para mouseleave na lista
            }
        });
    }

    // Este bloco configura todos os menus dropdown quando o DOM estiver pronto (popula listas e configura eventos)
    document.addEventListener('DOMContentLoaded', () => {
        console.log("[dropdown.js] DOM completamente carregado.");                             // Loga que DOM foi carregado

        populateList('baixar-list', downloads);                                                // Popula lista de downloads
        populateList('dicionario-list', dicionario);                                           // Popula lista de dicionário
        populateList('lista-harpa-hinario', harpaHinario);                                     // Popula lista de hinários
        populateList('utilidades-list', utilidades);                                           // Popula lista de utilitários

        setupDropdownEvents();                                                                 // Configura eventos de interação

        console.log("[dropdown.js] Configuração dos menus dropdown concluída.");               // Loga conclusão da configuração
    });
})();