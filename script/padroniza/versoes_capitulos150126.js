/*===============================================================================*/
/*                     MÓDULO DE GERENCIAMENTO DE CAPÍTULOS                      */
/*===============================================================================*/
/*  Este script é responsável por:                                               */
/*                - Criar e exibir a barra de botões de capítulos                */
/*             - Gerenciar o estado ativo (destaque) do botão atual              */
/*            - Adicionar a lógica de clique para carregar o conteúdo            */
/*                   - Atualizar o título da página ao navegar                   */
/*===============================================================================*/

// Função helper para recarregar a marca d'água.
// Usamos uma função própria para não depender do escopo de versoes.js
async function recarregaMarcaDagua() {
    try {
        const idScript = 'script-marca-dagua';
        const scriptAntigo = document.getElementById(idScript);
        if (scriptAntigo) scriptAntigo.remove();
        
        const novoScript = document.createElement('script');
        novoScript.src = '../script/marcadagua.js';
        novoScript.id = idScript;
        document.body.appendChild(novoScript);
        console.log("[Capítulos] Marca d'água recarregada.");
    } catch (e) {
        console.error("[Capítulos] Falha ao recarregar a marca d'água.", e);
    }
}

// Este bloco define a função global que cria e atualiza a barra de botões de capítulo.
window.atualizaBotoesCapitulos = async function(livro, capituloAtual, isReadingMode) {
    const areaConteudo = document.querySelector('section.conteudo');
    if (!areaConteudo) {
        console.error("atualizaBotoesCapitulos: section.conteudo não encontrada.");
        return;
    }

    const conteinersBotoesCapitulosExistentes = areaConteudo.querySelectorAll('div.capitulos:not(.conteudo-versiculos), #dynamic-chapter-buttons-conteiner');
    conteinersBotoesCapitulosExistentes.forEach(conteiner => conteiner.remove());
    let conteinerCapitulos = document.createElement('div');
    conteinerCapitulos.className = 'capitulos';
    conteinerCapitulos.id = 'dynamic-chapter-buttons-conteiner';

    const tituloH2 = areaConteudo.querySelector('h2');
    if (tituloH2) tituloH2.insertAdjacentElement('afterend', conteinerCapitulos);
    else areaConteudo.insertBefore(conteinerCapitulos, areaConteudo.firstChild);

    if (typeof window.obterContagemCapitulosLivro !== 'function') {
        console.error('Função obterContagemCapitulosLivro não encontrada no escopo global.');
        conteinerCapitulos.innerHTML = `<p class="error-message">Erro interno: dependência ausente.</p>`;
        return;
    }

    const totalCapitulos = await window.obterContagemCapitulosLivro(livro);
    if (totalCapitulos === 0) {
        conteinerCapitulos.innerHTML = `<p class="error-message">Não foi possível carregar os capítulos para ${livro}.</p>`;
        return;
    }
    
    // =======================================================================
    // LÓGICA DE CARREGAMENTO CENTRALIZADA (NOVA FUNÇÃO)
    // =======================================================================
    window.carregarConteudoMarcaDagua = async function(livro, capitulo) {
        // Guarda o último estado para o botão "Fechar Busca"
        window.ultimoLivroSelecionado = livro;
        window.ultimoCapituloSelecionado = capitulo;
        window.activeLivro = livro;
        window.activeCapitulo = capitulo;

        if (window.modoLeituraAtivo && typeof window.carregarCapituloModoLeitura === 'function') {
            await window.carregarCapituloModoLeitura(livro, capitulo);
        } else if (typeof window.toggleVersiculos === 'function') {
            await window.toggleVersiculos(livro, capitulo);
        } else {
            console.error("Nenhuma função de carregamento de conteúdo encontrada (carregarCapituloModoLeitura ou toggleVersiculos).");
        }
        
        // **A SOLUÇÃO ESTÁ AQUI**
        // Após o conteúdo ser carregado, a marca d'água é reaplicada.
        await recarregaMarcaDagua();
    };

    for (let i = 1; i <= totalCapitulos; i++) {
        const botao = document.createElement('button');
        botao.textContent = i;
        botao.dataset.capitulo = i;
        botao.dataset.livro = livro;
        botao.classList.add('botao-capitulo-dinamico');
        if (i === parseInt(capituloAtual)) botao.classList.add('active');
        
        botao.addEventListener('click', async function() {
            const capituloClicado = parseInt(this.dataset.capitulo);
            const livroClicado = this.dataset.livro;
            
            // Chama a nova função centralizada
            await window.carregarConteudoMarcaDagua(livroClicado, capituloClicado);
            
            // Atualiza a interface
            conteinerCapitulos.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            if (typeof window.getLivroDisplayName === 'function') {
                const tituloH2Atual = areaConteudo.querySelector('h2');
                if (tituloH2Atual) {
                    let textoTitulo = `${window.getLivroDisplayName(livroClicado)} - CAPÍTULO ${capituloClicado}`;
                    if (!window.modoLeituraAtivo && window.activeVersiculoButton && window.activeVersiculoButton.dataset.versiculo) {
                        textoTitulo += ` - VERSÍCulo ${window.activeVersiculoButton.dataset.versiculo}`;
                    }
                    tituloH2Atual.textContent = textoTitulo;
                }
            }
        });

        conteinerCapitulos.appendChild(botao);
    }

    if (!window.activeLivro) window.activeLivro = livro;
    if (!window.activeCapitulo) window.activeCapitulo = parseInt(capituloAtual) || 1;
};
