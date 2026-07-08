/* js/slide_harpacantor.js                                                       */
console.log("[slide_harpacantor.js] Script combinado iniciado.");

// ========================================================================
// CONFIGURAÇÃO DE DADOS
// ========================================================================
const HINARIOS_CONFIG = {
    harpa: { total: 640 },
    cantor: { total: 581 }
};

window.HINARIOS_CONFIG = HINARIOS_CONFIG;

// ========================================================================
// FUNÇÕES UTILITÁRIAS
// ========================================================================
function obterTotalHinos(tipoHinario) {
    if (window.HINARIOS_CONFIG && window.HINARIOS_CONFIG[tipoHinario]) {
        return window.HINARIOS_CONFIG[tipoHinario].total;
    }
    return 0;
}

window.obterTotalHinos = obterTotalHinos;

// ========================================================================
// FUNÇÕES DE JANELA
// ========================================================================
function abrirJanelaSlideHino(hinoData) {
    console.log(`[Janela] Abrindo slide para: Hino ${hinoData.numero} - ${hinoData.titulo}`);

    if (!hinoData) {
        alert("Nenhum hino selecionado para exibir no slide.");
        return;
    }
    
    if (window.janelaSlide && !window.janelaSlide.closed) {
        window.janelaSlide.focus();
        return;
    }

    const largura = window.screen.availWidth;
    const altura = window.screen.availHeight;
    const janela = window.open("", "JanelaSlideHino", `width=${largura},height=${altura},menubar=no,toolbar=no,location=no,status=no`);
    
    if (!janela) {
        alert("Não foi possível abrir a janela do slide. Verifique o bloqueador de pop-ups.");
        return;
    }

    // Verificação extra para garantir que a função existe
    if (typeof window.gerarHtmlJanelaHino === 'function') {
        const htmlConteudo = window.gerarHtmlJanelaHino(hinoData);
        window.escreverHtmlNaJanela(janela, htmlConteudo);
    } else {
        console.error("Função gerarHtmlJanelaHino não está disponível");
        janela.document.write("<h1>Erro: Função geradora não disponível</h1>");
        janela.document.close();
    }
    
    window.janelaSlide = janela;
}

window.abrirJanelaSlideHino = abrirJanelaSlideHino;

// ========================================================================
// FUNÇÕES DE INTERFACE
// ========================================================================
function gerarHtmlJanelaHino(hinoData) {
    const estrofesArray = hinoData.letra
        .split(/\n{2,}/)
        .filter(e => e.trim() !== '')
        .map(estrofe => estrofe.trim());

    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Slide - ${hinoData.titulo}</title>
    <link rel="stylesheet" href="../css/slide_harpacantor.css">
</head>
<body>
    <!-- POPUP DE ORIENTAÇÃO FULLSCREEN -->
    <div id="orientacao-fullscreen" style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background-color: rgba(0, 0, 0, 0.85); color: white; padding: 20px; border-radius: 10px; z-index: 10001; text-align: center; font-family: Arial, sans-serif; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
        <p style="margin: 0; font-size: 16px;">Pressione <b>F11</b> para uma melhor experiência em tela cheia.</p>
        <p style="margin: 10px 0 0 0; font-size: 14px;">Para sair, pressione <b>ESC</b> ou mova o mouse para o topo.</p>
        <button onclick="document.getElementById('orientacao-fullscreen').remove()" style="background-color: #5c5c5c; color: white; border: none; padding: 8px 15px; margin-top: 15px; border-radius: 5px; cursor: pointer;">Entendi</button>
    </div>
    
    <div id="marcadagua"></div>
    
    <div id="slide-conteiner">
        <header id="slide-header">
            <h1 id="slide-titulo"></h1>
            <p id="slide-progresso"></p>
        </header>
        <main id="slide-conteudo"></main>
    </div>
    <div id="controles">
        <button id="btn-anterior">‹ Anterior</button>
        <button id="btn-proximo">Próximo ›</button>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const tituloEl = document.getElementById('slide-titulo');
            const progressoEl = document.getElementById('slide-progresso');
            const conteudoEl = document.getElementById('slide-conteudo');
            const btnAnterior = document.getElementById('btn-anterior');
            const btnProximo = document.getElementById('btn-proximo');
            
            // Lógica do popup antigo removida pois o novo usa onclick inline
            
            const hino = ${JSON.stringify(hinoData)};
            const estrofes = ${JSON.stringify(estrofesArray)};
            let indiceAtual = 0;

            function exibirEstrofe() {
                if (estrofes.length === 0) {
                    conteudoEl.innerHTML = "<p>Nenhuma estrofe encontrada</p>";
                    return;
                }
                
                const estrofeTexto = estrofes[indiceAtual];
                const isCoro = estrofeTexto.toLowerCase().includes('[coro]');
                const textoLimpo = estrofeTexto.replace(/\\[coro\\]/ig, '').trim();
                const textoFormatado = textoLimpo.split('\\n').join('<br>');
                
                conteudoEl.innerHTML = \`<div class="estrofe-texto \${isCoro ? 'coro' : ''}">\${textoFormatado}</div>\`;
                progressoEl.textContent = \`Estrofe \${indiceAtual + 1} de \${estrofes.length}\`;
                
                btnAnterior.disabled = (indiceAtual === 0);
                btnProximo.disabled = (indiceAtual === estrofes.length - 1);
            }

            function proximaEstrofe() {
                if (indiceAtual < estrofes.length - 1) {
                    indiceAtual++;
                    exibirEstrofe();
                }
            }

            function estrofeAnterior() {
                if (indiceAtual > 0) {
                    indiceAtual--;
                    exibirEstrofe();
                }
            }

            tituloEl.textContent = \`\${hino.numero} - \${hino.titulo}\`;
            exibirEstrofe();
            
            btnProximo.addEventListener('click', proximaEstrofe);
            btnAnterior.addEventListener('click', estrofeAnterior);
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
                    e.preventDefault();
                    proximaEstrofe();
                } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                    e.preventDefault();
                    estrofeAnterior();
                }
            });
        });
    <\/script>
</body>
</html>`;
}

function escreverHtmlNaJanela(janela, html) {
    janela.document.open();
    janela.document.write(html);
    janela.document.close();
    console.log("[Interface] Conteúdo escrito na janela do slide.");
}

window.gerarHtmlJanelaHino = gerarHtmlJanelaHino;
window.escreverHtmlNaJanela = escreverHtmlNaJanela;

// ========================================================================
// COORDENADOR PRINCIPAL
// ========================================================================
function inicializarSlideHino() {
    const btnSlide = document.getElementById('btnSlide');

    if (btnSlide) {
        btnSlide.addEventListener('click', () => {
            console.log("[Coordenador] Botão 'Slide' clicado.");

            const hinoAtivo = window.activeHinoData;

            if (hinoAtivo) {
                window.abrirJanelaSlideHino(hinoAtivo);
            } else {
                alert("Por favor, selecione um hino primeiro para exibi-lo no slide.");
            }
        });
    } else {
        console.warn("[Coordenador] Botão 'Slide' com id='btnSlide' não encontrado.");
    }
}

document.addEventListener('DOMContentLoaded', inicializarSlideHino);
