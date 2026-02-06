/*===============================================================================*/
/*                  MÓDULO DE APRESENTAÇÃO DE HINOS (SLIDE)                      */
/*===============================================================================*/
/*  Este script é responsável por:                                               */
/*                       - Configurar os dados dos hinários (Harpa/Cantor)       */
/*                       - Gerenciar a abertura da janela de projeção            */
/*                       - Gerar a interface visual e lógica dos slides          */
/*                       - Controlar a navegação de estrofes por teclado/botões  */
/*===============================================================================*/

console.log("[slide_harpacantor.js] Script combinado iniciado.");

/* BLOCO: Define a configuração mestre com a quantidade total de hinos para cada hinário disponível          */
const HINARIOS_CONFIG = {                                                                                        /* Inicia objeto de dados      */
    harpa: { total: 640 },                                                                                       /* Define limite da Harpa      */
    cantor: { total: 581 }                                                                                       /* Define limite do Cantor     */
};

window.HINARIOS_CONFIG = HINARIOS_CONFIG;                                                                        /* Exporta configuração        */

/* BLOCO: Função utilitária para recuperar o número total de hinos de um hinário específico                  */
function obterTotalHinos(tipoHinario) {                                                                          /* Inicia função de soma       */
    if (window.HINARIOS_CONFIG && window.HINARIOS_CONFIG[tipoHinario]) {                                         /* Valida o tipo solicitado    */
        return window.HINARIOS_CONFIG[tipoHinario].total;                                                        /* Retorna o total definido    */
    }
    return 0;                                                                                                    /* Retorna zero por segurança  */
}

window.obterTotalHinos = obterTotalHinos;                                                                        /* Exporta utilitário global   */

/* BLOCO: Gerencia a criação e o foco da janela pop-up destinada à exibição dos slides do hino               */
function abrirJanelaSlideHino(hinoData) {                                                                        /* Inicia abertura de janela   */
    console.log(`[Janela] Abrindo slide para: Hino ${hinoData.numero} - ${hinoData.titulo}`);                    /* Loga o progresso da carga   */
    
    /* BLOCO: Valida a existência de dados do hino antes de prosseguir com a abertura do slide               */
    if (!hinoData) {                                                                                             /* Verifica se hino é nulo     */
        alert("Nenhum hino selecionado para exibir no slide.");                                                  /* Avisa sobre dado ausente    */
        return;
    }
    
    /* BLOCO: Verifica se a janela de slide já está aberta para apenas focar nela                            */
    if (window.janelaSlide && !window.janelaSlide.closed) {                                                      /* Checa status da janela      */
        window.janelaSlide.focus();                                                                              /* Traz a janela para frente   */
        return;
   }
    
   /* BLOCO: Obtém as dimensões da tela do usuário e abre o novo pop-up em branco                           */
    const largura = window.screen.availWidth;                                                                    /* Pega a largura da tela      */
    const altura = window.screen.availHeight;                                                                    /* Pega a altura da tela       */
    const janela = window.open("", "JanelaSlideHino", `width=${largura},height=${altura},menubar=no,status=no`); /* Abre janela personalizada   */
    
    /* BLOCO: Confirma se a janela foi aberta corretamente ou se foi bloqueada pelo navegador                */
    if (!janela) {                                                                                               /* Valida criação do objeto    */
        alert("Não foi possível abrir a janela do slide. Verifique o bloqueador de pop-ups.");                   /* Orienta sobre bloqueio      */
        return;
    }
    
    /* BLOCO: Invoca o gerador de HTML e injeta o conteúdo na nova janela do slide                           */
    if (typeof window.gerarHtmlJanelaHino === 'function') {                                                      /* Verifica se gerador existe  */
        const htmlConteudo = window.gerarHtmlJanelaHino(hinoData);                                               /* Gera string de interface    */
        window.escreverHtmlNaJanela(janela, htmlConteudo);                                                       /* Injeta HTML no documento    */
    } else {
        janela.document.write("<h1>Erro: Função geradora não disponível</h1>");                                  /* Escreve erro visual         */
        janela.document.close();                                                                                 /* Fecha fluxo da janela       */
    }
    window.janelaSlide = janela;                                                                                 /* Salva referência da janela  */
}

window.abrirJanelaSlideHino = abrirJanelaSlideHino;                                                              /* Exporta controle de janela  */

/* BLOCO: Gera a estrutura completa da interface do slide, incluindo CSS, HTML e lógica interna de navegação */
function gerarHtmlJanelaHino(hinoData) {                                                                         /* Inicia gerador de HTML      */
    const estrofesArray = hinoData.letra.split(/\n{2,}/).filter(e => e.trim() !== '').map(estrofe => estrofe.trim()); /* Cria lista de estrofes */

    return `
<!DOCTYPE html>                                                                                                  <!-- Define tipo do documento  -->
<html lang="pt-BR">                                                                                              <!-- Define idioma do site     -->
<head>                                                                                                           <!-- Inicia cabeçalho HTML     -->
    <meta charset="UTF-8">                                                                                       <!-- Define codificação texto  -->
    <title>Slide - ${hinoData.titulo}</title>                                                                    <!-- Define título da aba      -->
    <link rel="stylesheet" href="../css/slide_harpacantor.css">                                                  <!-- Importa estilo visual     -->
</head>                                                                                                          <!-- Fecha o cabeçalho         -->
<body>                                                                                                           <!-- Inicia corpo do documento -->
    <div id="orientacao-fullscreen" style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background-color: rgba(0, 0, 0, 0.85); color: white; padding: 20px; border-radius: 10px; z-index: 10001; text-align: center; font-family: Arial, sans-serif; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
        <p style="margin: 0; font-size: 16px;">Pressione <b>F11</b> para uma melhor experiência em tela cheia.</p>       <!-- Texto informativo 1       -->
        <p style="margin: 10px 0 0 0; font-size: 14px;">Para sair, pressione <b>ESC</b> ou mova o mouse para o topo.</p> <!-- Texto informativo 2       -->
        <button onclick="document.getElementById('orientacao-fullscreen').remove()" style="background-color: #5c5c5c; color: white; border: none; padding: 8px 15px; margin-top: 15px; border-radius: 5px; cursor: pointer;">Entendi</button>
    </div>                                                                                                       <!-- Fecha popup orientação    -->
    <div id="marcadagua"></div>                                                                                  <!-- Camada fundo decorativo   -->
    <div id="slide-conteiner">                                                                                   <!-- Contêiner mestre slide    -->
        <header id="slide-header">                                                                               <!-- Cabeçalho do conteúdo     -->
            <h1 id="slide-titulo"></h1>                                                                          <!-- Local título do hino      -->
            <p id="slide-progresso"></p>                                                                         <!-- Local contador estrofes   -->
        </header>                                                                                                <!-- Fecha cabeçalho interno   -->
        <main id="slide-conteudo"></main>                                                                        <!-- Local letra do hino       -->
    </div>                                                                                                       <!-- Fecha contêiner mestre    -->
    <div id="controles">                                                                                         <!-- Barra botões inferior     -->
        <button id="btn-anterior">‹ Anterior</button>                                                            <!-- Botão de retroceder       -->
        <button id="btn-proximo">Próximo ›</button>                                                              <!-- Botão de avançar          -->
    </div>                                                                                                       <!-- Fecha barra controles     -->
    <script>                                                                                                     /* Inicia script interno       */
        /* BLOCO: Inicializa a lógica da janela do slide assim que o documento carregar                      */
        document.addEventListener('DOMContentLoaded', function() {                                               /* Aguarda carregamento total  */
            const tituloEl = document.getElementById('slide-titulo');                                            /* Captura elemento título     */
            const progressoEl = document.getElementById('slide-progresso');                                      /* Captura elemento progresso  */
            const conteudoEl = document.getElementById('slide-conteudo');                                        /* Captura elemento letra      */
            const btnAnterior = document.getElementById('btn-anterior');                                         /* Captura elemento anterior   */
            const btnProximo = document.getElementById('btn-proximo');                                           /* Captura elemento próximo    */
            const hino = ${JSON.stringify(hinoData)};                                                            /* Injeta dados do hino        */
            const estrofes = ${JSON.stringify(estrofesArray)};                                                   /* Injeta lista estrofes       */
            let indiceAtual = 0;                                                                                 /* Índice da estrofe atual     */
            
            /* BLOCO: Renderiza a estrofe atual no contêiner de conteúdo e atualiza o progresso              */
            function exibirEstrofe() {                                                                           /* Inicia desenho da estrofe   */
                if (estrofes.length === 0) {                                                                     /* Verifica se há letra        */
                    conteudoEl.innerHTML = "<p>Nenhuma estrofe encontrada</p>";                                  /* Alerta falta de texto       */
                    return;
                }

                const estrofeTexto = estrofes[indiceAtual];                                                      /* Pega texto do índice        */
                const isCoro = estrofeTexto.toLowerCase().includes('[coro]');                                    /* Checa se é refrão           */
                const textoLimpo = estrofeTexto.replace(/\\[coro\\]/ig, '').trim();                              /* Limpa marcador de coro      */
                const textoFormatado = textoLimpo.split('\\n').join('<br>');                                     /* Troca quebras por <br>      */
                conteudoEl.innerHTML = \`<div class="estrofe-texto \${isCoro ? 'coro' : ''}">\${textoFormatado}</div>\`; /* Desenha texto no HTML   */
                progressoEl.textContent = \`Estrofe \${indiceAtual + 1} de \${estrofes.length}\`;                /* Atualiza o contador         */
                btnAnterior.disabled = (indiceAtual === 0);                                                      /* Trava se for a primeira     */
                btnProximo.disabled = (indiceAtual === estrofes.length - 1);                                     /* Trava se for a última       */
            }

            function proximaEstrofe() {                                                                          /* Inicia avanço               */
                if (indiceAtual < estrofes.length - 1) {                                                         /* Checa se há próxima         */
                    indiceAtual++;                                                                               /* Aumenta o índice            */
                    exibirEstrofe();                                                                             /* Renderiza nova estrofe      */
                }
            }

            function estrofeAnterior() {                                                                         /* Inicia retrocesso           */
                if (indiceAtual > 0) {                                                                           /* Checa se há anterior        */
                    indiceAtual--;                                                                               /* Diminui o índice            */
                    exibirEstrofe();                                                                             /* Renderiza nova estrofe      */
                }
            }

            tituloEl.textContent = \`\${hino.numero} - \${hino.titulo}\`;                                        /* Define título no cabeçalho  */
            exibirEstrofe();                                                                                     /* Dispara carga inicial       */
            btnProximo.addEventListener('click', proximaEstrofe);                                                /* Liga clique no próximo      */
            btnAnterior.addEventListener('click', estrofeAnterior);                                              /* Liga clique no anterior     */
            document.addEventListener('keydown', (e) => {                                                        /* Monitora teclas             */
                if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {                           /* Seta direita ou espaço      */
                    e.preventDefault();                                                                          /* Evita rolagem nativa        */
                    proximaEstrofe();                                                                            /* Avança o slide              */
                } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {                                        /* Seta esquerda ou PageUp     */
                    e.preventDefault();                                                                          /* Evita rolagem nativa        */
                    estrofeAnterior();                                                                           /* Volta o slide               */
                }
            });
        });
    <\/script>                                                                                                   /* Fecha script interno        */
</body>                                                                                                          <!-- Fecha corpo HTML          -->
</html>`;                                                                                                        /* Finaliza template string    */
}

/* BLOCO: Realiza a injeção física do HTML e finaliza o carregamento do documento na janela pop-up           */
function escreverHtmlNaJanela(janela, html) {                                                                    /* Inicia escrita no disco     */
    janela.document.open();                                                                                      /* Abre fluxo da janela        */
    janela.document.write(html);                                                                                 /* Transmite conteúdo          */
    janela.document.close();                                                                                     /* Renderiza o conteúdo        */
    console.log("[Interface] Conteúdo escrito na janela do slide.");                                             /* Loga sucesso                */
}

window.gerarHtmlJanelaHino = gerarHtmlJanelaHino;                                                                /* Exporta o gerador           */
window.escreverHtmlNaJanela = escreverHtmlNaJanela;                                                              /* Exporta motor de escrita    */

/* BLOCO: Inicializa o escutador de eventos para o botão de ativação do slide e coordena a exibição do hino  */
function inicializarSlideHino() {                                                                                /* Inicia coordenador          */
    const btnSlide = document.getElementById('btnSlide');                                                        /* Captura botão de slide      */
    if (btnSlide) {                                                                                              /* Valida se botão existe      */
        btnSlide.addEventListener('click', () => {                                                               /* Adiciona ouvinte clique     */
            console.log("[Coordenador] Botão 'Slide' clicado.");                                                 /* Loga intenção usuário       */
            const hinoAtivo = window.activeHinoData;                                                             /* Pega hino selecionado       */
            if (hinoAtivo) {                                                                                     /* Checa se há hino ativo      */
                window.abrirJanelaSlideHino(hinoAtivo);                                                          /* Dispara abertura do slide   */
            } else {
                alert("Por favor, selecione um hino primeiro para exibi-lo no slide.");                          /* Alerta falta de seleção     */
            }
        });
    } else {
        console.warn("[Coordenador] Botão 'Slide' com id='btnSlide' não encontrado.");                           /* Relata erro de elemento     */
    }
}

document.addEventListener('DOMContentLoaded', inicializarSlideHino);                                             /* Carrega sistema inicial     */