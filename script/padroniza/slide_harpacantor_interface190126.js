console.log("[slide_harpacantor_interface.js] Script iniciado.");

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
