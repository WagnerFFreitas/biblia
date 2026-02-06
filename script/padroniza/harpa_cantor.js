/*===============================================================================*/
/*                  MÓDULO DE HINÁRIOS (HARPA E CANTOR CRISTÃO)                  */
/*===============================================================================*/
/*  Este script é responsável por:                                               */
/*                       - Gerenciar a seleção de hinários (Harpa/Cantor)        */
/*                       - Filtrar e exibir hinos por faixas numéricas           */
/*                       - Carregar e formatar letras de hinos via JSON          */
/*                       - Controlar os estados visuais da interface de hinos    */
/*===============================================================================*/

// Este arquivo é como um "maestro de hinários digitais".
// Imagine que você tem dois livros de hinos: Harpa Cristã e Cantor Cristão.
// Este arquivo:
// 1. Permite escolher qual hinário usar
// 2. Organiza os hinos em "páginas" de 50 hinos cada
// 3. Carrega e mostra a letra completa do hino escolhido
// 4. Muda as cores da tela dependendo do hinário
// É como ter um "sistema de karaokê gospel" completo!

// Esta função é executada quando a página termina de carregar:
document.addEventListener('DOMContentLoaded', () => {                                                                   
// ↑ Espera tudo carregar antes de começar a funcionar
    
    // Primeiro, vamos "encontrar" todos os elementos da tela que precisamos usar:
    const btnHarpa = document.getElementById('btnHarpa');                                                               
    // ↑ Encontra o botão "Harpa Cristã"
    
    const btnCantor = document.getElementById('btnCantor');                                                             
    // ↑ Encontra o botão "Cantor Cristão"
    
    const telaInicial = document.getElementById('tela-inicial');                                                        
    // ↑ Encontra a tela de boas-vindas inicial
    
    const botoesFaixaConteiner = document.getElementById('botoes-faixa-hinos');                                         
    // ↑ Encontra onde ficam os botões de "páginas" (1-50, 51-100, etc.)
    
    const botoesHinosConteiner = document.getElementById('botoes-hinos');                                               
    // ↑ Encontra onde ficam os botões dos hinos individuais
    
    const hinoExibidoConteiner = document.getElementById('hino-exibido');                                               
    // ↑ Encontra onde a letra do hino vai aparecer
    
    const themeStyle = document.getElementById('theme-style');                                                          
    // ↑ Encontra o arquivo de cores/estilo da página

    // Estas são as "gavetas de memória" para lembrar o que está ativo:
    window.activeHinario = null;                                                                                        
    // ↑ Lembra qual hinário está sendo usado (Harpa ou Cantor)
    
    window.activeHinoData = null;                                                                                       
    // ↑ Lembra os dados do hino que está sendo mostrado

    // Esta é uma "ficha técnica" de cada hinário com todas as informações importantes:
    const TAMANHO_FAIXA = 50;                                                                                           
    // ↑ Define quantos hinos mostrar por "página" (50 hinos por vez)
    
    const HINARIOS = {                                                                                                  
    // ↑ "Catálogo" com informações dos dois hinários:
        harpa: {
            nome: 'Harpa Cristã',                                                                                       
            // ↑ Nome bonito para mostrar na tela
            
            total: 640,                                                                                                 
            // ↑ Quantos hinos tem no total (640 hinos)
            
            pasta: '../harpacrista',                                                                                    
            // ↑ Onde estão guardados os arquivos dos hinos
            
            css: '../css/harpa_crista.css'                                                                              
            // ↑ Arquivo de cores/estilo específico da Harpa
        },
        cantor: {
            nome: 'Cantor Cristão',                                                                                     
            // ↑ Nome bonito para mostrar na tela
            
            total: 581,                                                                                                 
            // ↑ Quantos hinos tem no total (581 hinos)
            
            pasta: '../cantorcristao',                                                                                  
            // ↑ Onde estão guardados os arquivos dos hinos
            
            css: '../css/cantor_cristao.css'                                                                            
            // ↑ Arquivo de cores/estilo específico do Cantor Cristão
        }
    };

    // Esta função é como "trocar de hinário" - muda tudo na tela para o hinário escolhido:
    function selecionarHinario(hinario) {                                                                               
    // ↑ Recebe qual hinário foi escolhido (Harpa ou Cantor)
        window.activeHinario = hinario;                                                                                 
        // ↑ Lembra globalmente qual hinário está ativo
        
        window.activeHinoData = null;                                                                                   
        // ↑ Limpa qualquer hino que estava sendo mostrado
        
        telaInicial.style.display = 'none';                                                                             
        // ↑ Esconde a tela de boas-vindas
        
        botoesFaixaConteiner.innerHTML = '';                                                                            
        // ↑ Limpa os botões de "páginas" (1-50, 51-100, etc.)
        
        botoesHinosConteiner.innerHTML = '';                                                                            
        // ↑ Limpa os botões dos hinos individuais
        
        hinoExibidoConteiner.innerHTML = '';                                                                            
        // ↑ Limpa a letra do hino que estava sendo mostrada
        
        themeStyle.href = hinario.css;                                                                                  
        // ↑ Muda as cores da tela para combinar com o hinário
        
        criarBotoesFaixa(hinario);                                                                                      
        // ↑ Cria os botões de "páginas" para o novo hinário
    }

    // Esta função cria os botões de "páginas" (ex: 1-50, 51-100, 101-150, etc.):
    function criarBotoesFaixa(hinario) {                                                                                
    // ↑ Recebe as informações do hinário para saber quantos hinos tem
        for (let i = 1; i <= hinario.total; i += TAMANHO_FAIXA) {                                                       
        // ↑ Vai de 50 em 50 hinos até chegar no total
            const inicio = i;                                                                                           
            // ↑ Primeiro hino da página (ex: 1, 51, 101...)
            
            const fim = Math.min(i + TAMANHO_FAIXA - 1, hinario.total);                                                 
            // ↑ Último hino da página (ex: 50, 100, 150... ou o último se não der 50)
            
            const btnFaixa = document.createElement('button');                                                          
            // ↑ Cria um botão para esta "página"
            
            btnFaixa.className = 'botao-faixa';                                                                         
            // ↑ Dá um "nome" (classe CSS) para o botão ficar bonito
            
            btnFaixa.textContent = `${inicio} - ${fim}`;                                                                
            // ↑ Escreve no botão "1 - 50", "51 - 100", etc.
            
            btnFaixa.addEventListener('click', (e) => {                                                                 
            // ↑ Configura o que acontece quando clicam no botão
                document.querySelectorAll('.botao-faixa.active').forEach(b => b.classList.remove('active'));            
                // ↑ Remove o destaque de outros botões de página
                
                e.currentTarget.classList.add('active');                                                                
                // ↑ Destaca o botão que foi clicado
                
                exibirGradeDeHinos(inicio, fim);                                                                        
                // ↑ Mostra os hinos desta página
            });
            botoesFaixaConteiner.appendChild(btnFaixa);                                                                 
            // ↑ Adiciona o botão na tela
        }
        botoesFaixaConteiner.classList.add('active');                                                                   
        // ↑ Torna visível a área dos botões de página
    }
    
    /* BLOCO: Busca o índice do hinário e gera os botões individuais para cada hino da faixa selecionada           */
    async function exibirGradeDeHinos(inicio, fim) {                                                                    /* Inicia exibição da lista        */
        botoesHinosConteiner.innerHTML = '';                                                                            /* Limpa botões existentes         */
        hinoExibidoConteiner.innerHTML = '';                                                                            /* Limpa hino exibido              */

        const indexPath = window.activeHinario.nome === 'Harpa Cristã'                                                  /* Escolhe o indexador correto     */
            ? '../harpacrista/harpacrista_index.json'                                                                   /* Caminho índice Harpa            */
            : '../cantorcristao/cantorcristao_index.json';                                                              /* Caminho índice Cantor           */

        /* BLOCO: Tenta realizar a requisição do arquivo de índice e processa a filtragem dos hinos por número     */
        try {
            const response = await fetch(indexPath);                                                                    /* Faz o download do índice        */
            if (!response.ok) throw new Error('Arquivo não encontrado: ' + indexPath);                                  /* Valida resposta do servidor     */
            const index = await response.json();                                                                        /* Converte em dados JSON          */

            const hinosFaixa = index.filter(h => h.numero >= inicio && h.numero <= fim);                                /* Filtra os hinos da página       */

            hinosFaixa.forEach(hino => {                                                                                /* Varre cada hino filtrado        */
                const btn = document.createElement('button');                                                           /* Cria o botão do hino            */
                btn.className = 'botao-capitulo';                                                                       /* Atribui classe visual           */
                btn.innerHTML = `
                    <span class="hino-numero">${hino.numero}</span>
                    <span class="hino-nome">${hino.titulo}</span>
                `;                                                                                                      /* Define o conteúdo do botão      */
                btn.addEventListener('click', () => {                                                                   /* Ouve clique no hino             */
                    document.querySelectorAll('.botao-capitulo.active').forEach(b => b.classList.remove('active'));        /* Limpa hino ativo anterior    */
                    btn.classList.add('active');                                                                        /* Destaca hino selecionado        */
                    exibirHino(window.activeHinario.pasta, hino.numero);                                                /* Chama exibição da letra         */
                });
                botoesHinosConteiner.appendChild(btn);                                                                  /* Fixa hino na grade              */
            });
        } catch (e) {
            botoesHinosConteiner.innerHTML = '<p>Erro ao carregar a lista de hinos.</p>';                               /* Relata falha na interface       */
        }
    }

    /* BLOCO: Função assíncrona responsável por baixar os dados do hino selecionado e injetar a letra na tela      */
    async function exibirHino(pasta, numero) {                                                                          /* Inicia motor de carga hino      */
        try {
            const response = await fetch(`${pasta}/${numero}.json`);                                                    /* Solicita arquivo do hino        */
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);                                /* Valida integridade do arquivo   */
            
            const data = await response.json();                                                                         /* Converte hino em objeto         */
            window.activeHinoData = data;                                                                               /* Salva hino no estado global     */
            
            /* BLOCO: Processa o texto bruto da letra, formatando as estrofes e identificando a classe do coro     */
            let letraHtml = data.letra.split('\n\n').map(p => {                                                         /* Quebra em estrofes              */
                const isCoro = p.toLowerCase().includes('[coro]');                                                      /* Detecta marcador de refrão      */
                const cleanParagraph = p.replace(/\[coro\]/ig, '').trim();                                              /* Limpa etiqueta técnica          */
                const versos = cleanParagraph.split('\n').join('<br>');                                                 /* Converte quebras para HTML      */
                return `<p class="${isCoro ? 'coro' : ''}">${versos}</p>`;                                              /* Retorna parágrafo formatado     */
            }).join('');

            /* BLOCO: Atualiza o contêiner de exibição com o título e a letra formatada e realiza a rolagem suave  */
            hinoExibidoConteiner.innerHTML = `
                <div class="hino-conteiner">
                    <h3 class="hino-titulo">${data.numero} - ${data.titulo}</h3>
                    <div class="hino-letra">${letraHtml}</div>
                </div>`;                                                                                                /* Injeta o hino no site           */
            
            hinoExibidoConteiner.scrollIntoView({ behavior: 'smooth' });                                                /* Centraliza a letra na tela      */

        } catch (error) {
            
            /* BLOCO: Captura falhas técnicas durante o carregamento do hino e emite alerta visual ao usuário      */
            console.error('Erro ao carregar o hino:', error);                                                           /* Relata erro técnico no log      */
            window.activeHinoData = null;                                                                               /* Reseta cache de hino            */
            hinoExibidoConteiner.innerHTML = `<div class="hino-conteiner"><p>Falha ao carregar.</p></div>`;             /* Mostra erro visual              */
        }
    }

    /* BLOCO: Configura os escutadores de eventos para o botão da Harpa Cristã disparando a mudança de hinário     */
    btnHarpa.addEventListener('click', () => {                                                                          /* Monitora clique na Harpa        */
        selecionarHinario(HINARIOS.harpa);                                                                              /* Ativa modo Harpa                */
        btnHarpa.classList.add('active');                                                                               /* Destaca botão superior          */
        btnCantor.classList.remove('active');                                                                           /* Remove destaque do Cantor       */
    });

    /* BLOCO: Configura os escutadores de eventos para o botão do Cantor Cristão disparando a mudança de hinário   */
    btnCantor.addEventListener('click', () => {                                                                         /* Monitora clique no Cantor       */
        selecionarHinario(HINARIOS.cantor);                                                                             /* Ativa modo Cantor               */
        btnCantor.classList.add('active');                                                                              /* Destaca botão superior          */
        btnHarpa.classList.remove('active');                                                                            /* Remove destaque da Harpa        */
    });
});