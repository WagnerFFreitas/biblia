/*===============================================================================*/
/*                  MÓDULO DE HINÁRIOS (HARPA E CANTOR CRISTÃO)                  */
/*===============================================================================*/
/*  Este script é responsável por:                                               */
/*                       - Gerenciar a seleção de hinários (Harpa/Cantor)        */
/*                       - Filtrar e exibir hinos por faixas numéricas           */
/*                       - Carregar e formatar letras de hinos via JSON          */
/*                       - Controlar os estados visuais da interface de hinos    */
/*===============================================================================*/

/* BLOCO: Inicializa as referências dos elementos da interface e as variáveis de estado global do sistema          */
document.addEventListener('DOMContentLoaded', () => {                                                                   /* Inicia ao carregar o site       */
    const btnHarpa = document.getElementById('btnHarpa');                                                               /* Captura botão da Harpa          */
    const btnCantor = document.getElementById('btnCantor');                                                             /* Captura botão do Cantor         */
    const telaInicial = document.getElementById('tela-inicial');                                                        /* Captura painel de boas vindas   */
    const botoesFaixaConteiner = document.getElementById('botoes-faixa-hinos');                                         /* Captura área das faixas         */
    const botoesHinosConteiner = document.getElementById('botoes-hinos');                                               /* Captura área da grade hinos     */
    const hinoExibidoConteiner = document.getElementById('hino-exibido');                                               /* Captura área da letra           */
    const themeStyle = document.getElementById('theme-style');                                                          /* Captura link do CSS de tema     */

    window.activeHinario = null;                                                                                        /* Define hinário ativo como null  */
    window.activeHinoData = null;                                                                                       /* Define dados hino como null     */

    /* BLOCO: Define as configurações dos hinários e o tamanho das faixas numéricas de exibição                    */
    const TAMANHO_FAIXA = 50;                                                                                           /* Define hinos por página         */
    const HINARIOS = {                                                                                                  /* Inicia mapa de hinários         */
        harpa: {
            nome: 'Harpa Cristã',                                                                                       /* Identifica o nome               */
            total: 640,                                                                                                 /* Define limite de hinos          */
            pasta: '../harpacrista',                                                                                    /* Define diretório de arquivos    */
            css: '../css/harpa_crista.css'                                                                              /* Define arquivo de estilo        */
        },
        cantor: {
            nome: 'Cantor Cristão',                                                                                     /* Identifica o nome               */
            total: 581,                                                                                                 /* Define limite de hinos          */
            pasta: '../cantorcristao',                                                                                  /* Define diretório de arquivos    */
            css: '../css/cantor_cristao.css'                                                                            /* Define arquivo de estilo        */
        }
    };

    /* BLOCO: Função encarregada de alternar o hinário ativo, resetar a interface e carregar novas faixas          */
    function selecionarHinario(hinario) {                                                                               /* Inicia troca de hinário         */
        window.activeHinario = hinario;                                                                                 /* Atualiza hinário global         */
        window.activeHinoData = null;                                                                                   /* Limpa cache do hino anterior    */
        telaInicial.style.display = 'none';                                                                             /* Oculta mensagem inicial         */
        botoesFaixaConteiner.innerHTML = '';                                                                            /* Limpa lista de faixas           */
        botoesHinosConteiner.innerHTML = '';                                                                            /* Limpa grade de botões hinos     */
        hinoExibidoConteiner.innerHTML = '';                                                                            /* Limpa letra na tela             */
        themeStyle.href = hinario.css;                                                                                  /* Troca as cores do sistema       */
        criarBotoesFaixa(hinario);                                                                                      /* Gera botões de numeração        */
    }

    /* BLOCO: Gera dinamicamente os botões de faixas numéricas (Ex: 1-50) baseados no total do hinário             */
    function criarBotoesFaixa(hinario) {                                                                                /* Inicia geração de faixas        */
        for (let i = 1; i <= hinario.total; i += TAMANHO_FAIXA) {                                                       /* Varre total de hinos            */
            const inicio = i;                                                                                           /* Define início da página         */
            const fim = Math.min(i + TAMANHO_FAIXA - 1, hinario.total);                                                 /* Calcula o fim da página         */
            
            const btnFaixa = document.createElement('button');                                                          /* Cria o elemento do botão        */
            btnFaixa.className = 'botao-faixa';                                                                         /* Atribui classe visual           */
            btnFaixa.textContent = `${inicio} - ${fim}`;                                                                /* Define o rótulo numérico        */
            btnFaixa.addEventListener('click', (e) => {                                                                 /* Ouve o clique na faixa          */
                document.querySelectorAll('.botao-faixa.active').forEach(b => b.classList.remove('active'));            /* Limpa destaques anteriores      */
                e.currentTarget.classList.add('active');                                                                /* Destaca a faixa selecionada     */
                exibirGradeDeHinos(inicio, fim);                                                                        /* Carrega hinos dessa faixa       */
            });
            botoesFaixaConteiner.appendChild(btnFaixa);                                                                 /* Fixa o botão no painel          */
        }
        botoesFaixaConteiner.classList.add('active');                                                                   /* Ativa visualmente o painel      */
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