/*===============================================================================*/
/*                    MÓDULO DE JANELA DE RESULTADOS DE BUSCA                    */
/*===============================================================================*/
/*  Este script é responsável por:                                               */
/*                       - Abrir janela pop-up para exibir resultados de busca   */
/*                       - Formatar e renderizar os versículos encontrados       */
/*                       - Gerenciar a interface visual da janela de busca       */
/*===============================================================================*/

/* BLOCO: Função principal que abre uma nova janela para exibir os resultados da busca bíblica */
function abrirJanelaDeBusca(resultados, getLivroDisplayNameFunc) {                                         // Inicia abertura da janela de busca
    /* BLOCO: Obtém dimensões da tela e cria nova janela pop-up */
    const largura = window.screen.availWidth;                                                              // Captura largura total da tela
    const altura = window.screen.availHeight;                                                              // Captura altura total da tela
    const janelaBusca = window.open("", "JanelaBusca", `width=${largura},height=${altura},menubar=no,toolbar=no,location=no,status=no`); // Cria janela maximizada

    /* BLOCO: Valida se a janela foi criada com sucesso */
    if (!janelaBusca) {                                                                                    // Verifica se janela foi bloqueada
        alert("Não foi possível abrir a janela de busca. Verifique o bloqueador de pop-ups.");            // Alerta sobre bloqueio de pop-up
        return;                                                                                            // Interrompe execução
    }

    /* BLOCO: Processa e formata os resultados da busca para exibição */
    let resultadosHtml = '';                                                                               // Buffer para HTML dos resultados
    if (resultados.length === 0) {                                                                         // Verifica se não há resultados
        resultadosHtml = '<p style="text-align: center;">Nenhum resultado encontrado.</p>';                // Mensagem de busca vazia
    } else {                                                                                               // Se há resultados para processar
        resultados.forEach(r => {                                                                          // Itera sobre cada resultado
            resultadosHtml += `
                <div class="resultado-item">                                                               <!-- Contêiner de um resultado        -->
                    <strong>${getLivroDisplayNameFunc(r.livro)} ${r.cap}:${r.vers}</strong>               // Referência bíblica formatada
                    <span>${r.texto}</span>                                                                // Texto do versículo
                </div>`;                                                                                   // Fecha item de resultado
        });
    }

    /* BLOCO: Constrói a estrutura HTML completa da janela de busca */
    const htmlConteudo = `
<!DOCTYPE html>                                                                                            <!-- Define tipo do documento HTML    -->
<html lang="pt-BR">                                                                                        <!-- Define idioma português          -->
<head>                                                                                                     <!-- Inicia cabeçalho da página      -->
    <meta charset="UTF-8">                                                                                 <!-- Define codificação de caracteres -->
    <title>Resultados da Busca</title>                                                                     <!-- Título da aba do navegador       -->
    <link rel="stylesheet" href="../css/biblia_realizabusca.css">                                          <!-- Importa folha de estilos         -->
</head>                                                                                                    <!-- Fecha cabeçalho da página        -->
<body>                                                                                                     <!-- Inicia corpo da página           -->
    <!-- BLOCO: Inclusão da marca d'água decorativa -->
    <div id="marcadagua"></div>                                                                            <!-- Contêiner da marca d'água        -->
    <script src="../script/marcadagua.js"><\/script>                                                       <!-- Script da marca d'água           -->

    <div id="search-content">                                                                              <!-- Contêiner principal do conteúdo  -->
        <h2>Resultados da Busca</h2>                                                                       <!-- Título da seção de resultados    -->
        <div id="resultados-busca-conteiner">                                                              <!-- Contêiner dos resultados         -->
            ${resultadosHtml}                                                                              <!-- Injeta HTML dos resultados       -->
        </div>                                                                                             <!-- Fecha contêiner de resultados    -->
    </div>                                                                                                 <!-- Fecha contêiner principal        -->
</body>                                                                                                    <!-- Fecha corpo da página            -->
</html>`;                                                                                                  // Fecha estrutura HTML completa

    /* BLOCO: Escreve o conteúdo HTML na nova janela e a traz para o foco */
    janelaBusca.document.open();                                                                           // Abre fluxo de escrita na janela
    janelaBusca.document.write(htmlConteudo);                                                              // Escreve HTML na janela
    janelaBusca.document.close();                                                                          // Fecha fluxo de escrita
    janelaBusca.focus();                                                                                   // Traz janela para primeiro plano
}

window.abrirJanelaDeBusca = abrirJanelaDeBusca;                                                            // Exporta função globalmente