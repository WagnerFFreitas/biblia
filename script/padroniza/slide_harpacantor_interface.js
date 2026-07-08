/*===============================================================================*/
/*                      MÓDULO DE INTERFACE VISUAL (HINOS)                       */
/*===============================================================================*/
/*  Este script é responsável por:                                               */
/*              - Gerar a estrutura HTML para a janela de projeção               */
/*               - Definir a lógica interna de navegação do slide                */
/*                    - Formatar a letra do hino em estrofes                     */
/*===============================================================================*/

console.log("[slide_harpacantor_interface.js] Script iniciado.");                 // Loga o início do script

/* BLOCO: Gera a estrutura completa da interface do slide, incluindo CSS, HTML   */
/* e lógica interna de navegação                                                 */
function gerarHtmlJanelaHino(hinoData) {                                          // Inicia geração de interface
    const estrofesArray = hinoData.letra.split(/\n{2,}/).filter(e => e.trim() !== '').map(estrofe => estrofe.trim());  // Cria lista de estrofes

    return `
<!DOCTYPE html>                                                                                                          <!-- Define tipo do documento  -->
<html lang="pt-BR">                                                                                                      <!-- Define idioma do site     -->
<head>                                                                                                                   <!-- Inicia cabeçalho HTML     -->
    <meta charset="UTF-8">                                                                                               <!-- Define codificação texto  -->
    <title>Slide - ${hinoData.titulo}</title>                                                                            <!-- Define título da aba      -->
    <link rel="stylesheet" href="../css/slide_harpacantor.css">                                                          <!-- Importa estilo visual     -->
</head>                                                                                                                  <!-- Fecha o cabeçalho         -->
<body>                                                                                                                   <!-- Inicia corpo do documento -->
    <div id="orientacao-fullscreen" style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background-color: rgba(0, 0, 0, 0.85); color: white; padding: 20px; border-radius: 10px; z-index: 10001; text-align: center; font-family: Arial, sans-serif; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
        <p style="margin: 0; font-size: 16px;">Pressione <b>F11</b> para uma melhor experiência em tela cheia.</p>       <!-- Texto informativo 1       -->
        <p style="margin: 10px 0 0 0; font-size: 14px;">Para sair, pressione <b>ESC</b> ou mova o mouse para o topo.</p> <!-- Texto informativo 2       -->
        <button onclick="document.getElementById('orientacao-fullscreen').remove()" style="background-color: #5c5c5c; color: white; border: none; padding: 8px 15px; margin-top: 15px; border-radius: 5px; cursor: pointer;">Entendi</button>
    </div>                                                                                                               <!-- Fecha popup orientação    -->
    <div id="marcadagua"></div>                                                                                          <!-- Camada fundo decorativo   -->
    <div id="slide-conteiner">                                                                                           <!-- Contêiner mestre slide    -->
        <header id="slide-header">                                                                                       <!-- Cabeçalho do conteúdo     -->
            <h1 id="slide-titulo"></h1>                                                                                  <!-- Local título do hino      -->
            <p id="slide-progresso"></p>                                                                                 <!-- Local contador estrofes   -->
        </header>                                                                                                        <!-- Fecha cabeçalho interno   -->
        <main id="slide-conteudo"></main>                                                                                <!-- Local letra do hino       -->
    </div>                                                                                                               <!-- Fecha contêiner mestre    -->
    <div id="controles">                                                                                                 <!-- Barra botões inferior     -->
        <button id="btn-anterior">‹ Anterior</button>                                                                    <!-- Botão de retroceder       -->
        <button id="btn-proximo">Próximo ›</button>                                                                      <!-- Botão de avançar          -->
    </div>                                                                                                               <!-- Fecha barra controles     -->
    <script>                                                                                                             /* Inicia script interno       */
    
        /* BLOCO: Inicia a configuração do comportamento interno da janela do hino após o carregamento do DOM        */
        document.addEventListener('DOMContentLoaded', function() {                                                       /* Aguarda carregamento total  */
            const tituloEl = document.getElementById('slide-titulo');                                                    /* Captura elemento título     */
            const progressoEl = document.getElementById('slide-progresso');                                              /* Captura elemento progresso  */
            const conteudoEl = document.getElementById('slide-conteudo');                                                /* Captura elemento letra      */
            const btnAnterior = document.getElementById('btn-anterior');                                                 /* Captura elemento anterior   */
            const btnProximo = document.getElementById('btn-proximo');                                                   /* Captura elemento próximo    */
            const hino = ${JSON.stringify(hinoData)};                                                                    /* Injeta dados do hino        */
            const estrofes = ${JSON.stringify(estrofesArray)};                                                           /* Injeta lista estrofes       */
            let indiceAtual = 0;                                                                                         /* Índice da estrofe atual     */
            
            /* BLOCO: Renderiza a estrofe atual na tela e atualiza o estado visual dos botões e contagem de progresso*/
            function exibirEstrofe() {                                                                                   /* Inicia desenho da estrofe   */
                if (estrofes.length === 0) {                                                                             /* Verifica se há letra        */
                    conteudoEl.innerHTML = "<p>Nenhuma estrofe encontrada</p>";                                          /* Alerta falta de texto       */
                    return;
                }

                /* BLOCO: Identifica tipos de estrofe, limpa marcadores e formata o texto para exibição HTML         */
                const estrofeTexto = estrofes[indiceAtual];                                                              /* Pega texto do índice        */
                const isCoro = estrofeTexto.toLowerCase().includes('[coro]');                                            /* Checa se é refrão           */
                const textoLimpo = estrofeTexto.replace(/\\[coro\\]/ig, '').trim();                                      /* Limpa marcador de coro      */
                const textoFormatado = textoLimpo.split('\\n').join('<br>');                                             /* Troca quebras por <br>      */
                conteudoEl.innerHTML = \`<div class="estrofe-texto \${isCoro ? 'coro' : ''}">\${textoFormatado}</div>\`; /* Desenha texto no HTML       */
                progressoEl.textContent = \`Estrofe \${indiceAtual + 1} de \${estrofes.length}\`;                        /* Atualiza o contador         */
                btnAnterior.disabled = (indiceAtual === 0);                                                              /* Trava se for a primeira     */
                btnProximo.disabled = (indiceAtual === estrofes.length - 1);                                             /* Trava se for a última       */
            }

            /* BLOCO: Incrementa o índice posicional para exibir a próxima parte da letra da lista de estrofes       */
            function proximaEstrofe() {                                                                                  /* Inicia avanço               */
                if (indiceAtual < estrofes.length - 1) {                                                                 /* Checa se há próxima         */
                    indiceAtual++;                                                                                       /* Aumenta o índice            */
                    exibirEstrofe();                                                                                     /* Renderiza nova estrofe      */
                }
            }

            /* BLOCO: Decrementa o índice posicional para retornar à parte anterior da letra da lista de estrofes    */
            function estrofeAnterior() {                                                                                 /* Inicia retrocesso           */
                if (indiceAtual > 0) {                                                                                   /* Checa se há anterior        */
                    indiceAtual--;                                                                                       /* Diminui o índice            */
                    exibirEstrofe();                                                                                     /* Renderiza nova estrofe      */
                }
            }

            /* BLOCO: Sincroniza os dados iniciais do hino e vincula os eventos de navegação da interface            */    
            tituloEl.textContent = \`\${hino.numero} - \${hino.titulo}\`;                                                /* Define título no cabeçalho  */
            exibirEstrofe();                                                                                             /* Dispara carga inicial       */
            btnProximo.addEventListener('click', proximaEstrofe);                                                        /* Liga clique no próximo      */
            btnAnterior.addEventListener('click', estrofeAnterior);                                                      /* Liga clique no anterior     */
            document.addEventListener('keydown', (e) => {                                                                /* Monitora teclas             */
            
                /* BLOCO: Mapeia as teclas de atalho do teclado para facilitar a navegação rápida do slide           */
                if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {                                   /* Seta direita ou espaço      */
                    e.preventDefault();                                                                                  /* Evita rolagem nativa        */
                    proximaEstrofe();                                                                                    /* Avança o slide              */
                } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {                                                /* Seta esquerda ou PageUp     */
                    e.preventDefault();                                                                                  /* Evita rolagem nativa        */
                    estrofeAnterior();                                                                                   /* Volta o slide               */
                }
            });
        });
    </script>                                                                                                            /* Fecha script interno        */
</body>                                                                                                                  <!-- Fecha corpo HTML          -->
</html>`;                                                                         // Finaliza string de template
}

/* BLOCO: Realiza a injeção física do HTML e finaliza o carregamento do          */
/* documento na janela pop-up                                                    */
function escreverHtmlNaJanela(janela, html) {                                     // Inicia escrita no disco
    janela.document.open();                                                       // Abre fluxo da janela
    janela.document.write(html);                                                  // Transmite conteúdo
    janela.document.close();                                                      // Renderiza o conteúdo
    console.log("[Interface] Conteúdo escrito na janela do slide.");              // Loga sucesso
}

window.gerarHtmlJanelaHino = gerarHtmlJanelaHino;                                 // Exporta o gerador
window.escreverHtmlNaJanela = escreverHtmlNaJanela;                               // Exporta motor de escrita
