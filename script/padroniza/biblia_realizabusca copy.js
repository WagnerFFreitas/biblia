/* script/biblia_realizabusca.js                                                 */

function abrirJanelaDeBusca(resultados, getLivroDisplayNameFunc) {
    // Abre uma nova janela (pop-up)
    const largura = window.screen.availWidth;
    const altura = window.screen.availHeight;
    const janelaBusca = window.open("", "JanelaBusca", `width=${largura},height=${altura},menubar=no,toolbar=no,location=no,status=no`);

    if (!janelaBusca) {
        alert("Não foi possível abrir a janela de busca. Verifique o bloqueador de pop-ups.");
        return;
    }

    // Monta o HTML dos resultados
    let resultadosHtml = '';
    if (resultados.length === 0) {
        resultadosHtml = '<p style="text-align: center;">Nenhum resultado encontrado.</p>';
    } else {
        resultados.forEach(r => {
            resultadosHtml += `
                <div class="resultado-item">
                    <strong>${getLivroDisplayNameFunc(r.livro)} ${r.cap}:${r.vers}</strong>
                    <span>${r.texto}</span>
                </div>`;
        });
    }

    // Monta o HTML completo para a nova janela
    const htmlConteudo = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Resultados da Busca</title>
    <link rel="stylesheet" href="../css/biblia_realizabusca.css">
</head>
<body>
    <!-- Inclusão da marca d'água -->
    <div id="marcadagua"></div>
    <script src="../script/marcadagua.js"><\/script>

    <div id="search-content">
        <h2>Resultados da Busca</h2>
        <div id="resultados-busca-conteiner">
            ${resultadosHtml}
        </div>
    </div>
</body>
</html>`;

    // Escreve o HTML na nova janela
    janelaBusca.document.open();
    janelaBusca.document.write(htmlConteudo);
    janelaBusca.document.close();
    janelaBusca.focus();
}

// Torna a função acessível globalmente
window.abrirJanelaDeBusca = abrirJanelaDeBusca;
