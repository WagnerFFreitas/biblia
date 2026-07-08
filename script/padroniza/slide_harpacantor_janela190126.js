console.log("[slide_harpacantor_janela.js] Script iniciado.");

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
