/*===============================================================================*/
/*                    SCRIPT DE MENUS DROPDOWN DA BARRA DE NAVEGAÇÃO              */
/*===============================================================================*/
/*  Este arquivo contém:                                                         */
/*                    - Lógica centralizada para os menus dropdown               */
/*                    - Downloads de bíblias em PDF e recursos externos          */
/*                    - Harpa, hinários e utilitários                           */
/*===============================================================================*/

(function() {                                                                     // Inicia escopo isolado
    'use strict';                                                                 // Ativa modo rigoroso
    console.log("[dropdown.js] Script iniciado.");                               // Log de inicialização
    const basePath = '../';                                                       // Define caminho base

    const downloads = [                                                           // Lista de arquivos PDF para download
        { texto: 'A Bíblia Católica', link: `${basePath}baixar/A_Biblia_Catolica.pdf` },
        { texto: 'A Bíblia Sagrada NVT', link: `${basePath}baixar/A_Biblia_Sagrada_NVT.pdf` },
        { texto: 'A Bíblia Viva', link: `${basePath}baixar/A_Biblia_Viva.pdf` },
        { texto: 'A vida completa de Jesus', link: `${basePath}baixar/Juanribe_Pagliarin.pdf` },
        { texto: 'Bíblia de Genebra', link: `${basePath}baixar/Biblia_Genebra_so_estudo.pdf` },
        { texto: 'Bíblia em ordem NVI', link: `${basePath}baixar/Cronologica_NVI.pdf` },
        { texto: 'Bíblia explicada', link: `${basePath}baixar/Biblia_explicada.pdf` },
        { texto: 'Bíblia KJA', link: `${basePath}baixar/Biblia_KJA.pdf` },
        { texto: 'Bíblia Palavra-Chave', link: `${basePath}baixar/Biblia_palavra_chave.pdf` },
        { texto: 'Bíblia Thompson', link: `${basePath}baixar/Biblia_Thompson.pdf` }
    ];

    const dicionario = [                                                          // Lista de recursos de dicionário
        { texto: 'Dicionário biblico', link: '../html/dicionario.html' },
        { texto: 'Concordância (Em breve)', link: '#' }
    ];

    const harpaHinario = [                                                        // Lista de hinários tradicionais
        { texto: 'Harpa Cristã (Em breve)', link: '#' },
        { texto: 'Cantor Cristão (Em breve)', link: '#' }
    ];

    const utilidades = [                                                          // Lista de ferramentas externas
        { texto: 'IA Ajudar a estudar a biblia', link: 'https://bible.ai/pt' },
        { texto: 'Posso conhecer a Deus', link: 'https://caniknowgod.com/' },
        { texto: 'Dicionário e Comentário', link: 'https://www.apologeta.com.br' },
        { texto: 'BíbliaOn', link: 'https://www.bibliaon.com/' },
        { texto: 'Cursos', link: `${basePath}html/cursos.html` }
    ];

    /* BLOCO: Função responsável por gerar dinamicamente os itens de cada lista suspensa do menu de navegação  */
    function populateList(listId, items) {
        const listElement = document.getElementById(listId);                                       /* Busca o elemento da lista no DOM */
        if (!listElement) {
            console.warn(`[dropdown.js] Lista '${listId}' nao encontrada.`);                       /* Alerta caso o ID não exista      */
            return;
        }
        listElement.innerHTML = '';                                                                /* Limpa o conteúdo atual da lista  */
        items.forEach(item => {
            const li = document.createElement('li');                                               /* Cria o item da lista             */
            const a = document.createElement('a');                                                 /* Cria o link do item              */
            a.href = item.link;                                                                    /* Define o endereço do link        */
            a.innerHTML = item.texto;                                                              /* Insere o nome do recurso         */
            if (item.link !== '#' && (item.link.startsWith('http') || item.link.endsWith('.pdf'))) {
                a.target = '_blank';                                                               /* Abre links externos em nova aba  */
                a.rel = 'noopener noreferrer';                                                     /* Atribui segurança ao link        */
            }
            li.appendChild(a);                                                                     /* Anexa o link ao marcador         */
            listElement.appendChild(li);                                                           /* Anexa o marcador à lista         */
        });
    }

    /* BLOCO: Função que altera o estado visual da lista para visível utilizando a propriedade display         */
    function showList(listId) {
        const listElement = document.getElementById(listId);                                       /* Localiza a lista pelo ID         */
        if (listElement) {
            listElement.style.display = 'block';                                                   /* Torna o menu visível             */
        }
    }

    /* BLOCO: Função que altera o estado visual da lista para oculto utilizando a propriedade display          */
    function hideList(listId) {
        const listElement = document.getElementById(listId);                                       /* Localiza a lista pelo ID         */
        if (listElement) {
            listElement.style.display = 'none';                                                    /* Esconde o menu                   */
        }
    }

    /* BLOCO: Configura os escutadores de eventos para gerenciar a abertura e o fechamento dos menus suspensos */
    function setupDropdownEvents() {
        const dropdownTriggers = document.querySelectorAll('nav ul li.dropdown > a');              /* Captura os gatilhos do menu      */
        dropdownTriggers.forEach((trigger, index) => {
            const dropdownConteiner = trigger.parentElement;                                       /* Identifica o pai do gatilho      */
            const listContent = dropdownConteiner.querySelector('.conteudo-menu-suspenso');        /* Localiza a lista interna         */

            if (!listContent) return;
            if (listContent.id) {
                let hideTimeout;                                                                   /* Buffer para o tempo de fechamento*/
                const show = () => {
                    clearTimeout(hideTimeout);                                                     /* Cancela o agendamento de fechar  */
                    showList(listContent.id);                                                      /* Exibe o menu suspenso            */
                };
                const startHideTimeout = () => {
                    hideTimeout = setTimeout(() => {                                               /* Agenda o fechamento para 250ms   */
                        const currentConteiner = trigger.parentElement;                            /* Pega o contêiner atual           */
                        const currentList = document.getElementById(listContent.id);               /* Pega a lista pelo ID             */

                        if (!currentConteiner.matches(':hover') && (!currentList || !currentList.matches(':hover'))) {
                            hideList(listContent.id);                                              /* Oculta se o mouse saiu do menu   */
                        }
                    }, 250);
                };
                dropdownConteiner.addEventListener('mouseenter', show);                            /* Evento de entrada no contêiner   */
                dropdownConteiner.addEventListener('mouseleave', startHideTimeout);                /* Evento de saída do contêiner     */
                listContent.addEventListener('mouseenter', show);                                  /* Evento de entrada na lista       */
                listContent.addEventListener('mouseleave', startHideTimeout);                      /* Evento de saída da lista         */
            }
        });
    }

    /* BLOCO: Inicializa o preenchimento das listas e configura os eventos de interface após a carga total do DOM */
    document.addEventListener('DOMContentLoaded', () => {
        console.log("[dropdown.js] DOM completamente carregado.");                                 /* Log de carregamento concluído    */
        populateList('baixar-list', downloads);                                                    /* Alimenta lista de downloads      */
        populateList('dicionario-list', dicionario);                                               /* Alimenta lista de dicionário     */
        populateList('lista-harpa-hinario', harpaHinario);                                         /* Alimenta lista de hinários       */
        populateList('utilidades-list', utilidades);                                               /* Alimenta lista de utilitários    */
        setupDropdownEvents();                                                                     /* Ativa o monitoramento do mouse   */
        console.log("[dropdown.js] Configuração dos menus concluída.");                            /* Log de finalização de sistema    */
    });
})();