/*===============================================================================*/
/*                     MÓDULO DE GERENCIAMENTO DE VERSÍCULOS                     */
/*===============================================================================*/
/*       Responsável por:                                                        */
/*                       - Carregar versículos individuais                       */
/*                 - Criar botões de navegação entre versículos                  */
/*                   - Gerenciar o destaque do versículo ativo                   */
/*===============================================================================*/
class VersiculosManager {                                                         // Exporta a classe para ser usada em outros arquivos do projeto.
    constructor() {                                                               // Define o método construtor, executado ao criar um novo objeto da classe.
        this.versiculoAtivo = null;                                               // Inicia a variável que guardará o número do versículo ativo como nula.
    }

    // Este bloco define o método assíncrono para carregar e exibir um versículo específico.
    async carregarVersiculo(livro, capitulo, versiculo) {
        console.log(`[VersiculosManager] Solicitado carregar versículo: ${livro} ${capitulo}:${versiculo}`);

        // Atualiza o último versículo selecionado globalmente
        window.ultimoVersiculoSelecionado = versiculo;

        const areaConteudo = document.querySelector('section.conteudo');
        if (!areaConteudo) {
            console.error("[VersiculosManager] Elemento 'section.conteudo' não encontrado.");
            return;
        }

        // Antes de carregar o novo versículo, remove qualquer display de versículo específico
        // que possa ter sido adicionado por original.js ou outra versão.
        const existingSpecificVerseDiv = areaConteudo.querySelector('.texto-versiculo');
        if (existingSpecificVerseDiv) {
            existingSpecificVerseDiv.remove();
        }

        // Delega o carregamento e a renderização do conteúdo do versículo ao script da versão ativa.
        // O script `original.js` define `window.loadSpecificVerse` para o seu formato detalhado.
        if (typeof window.loadSpecificVerse === 'function') {
            console.log(`[VersiculosManager] Chamando window.loadSpecificVerse para ${livro} ${capitulo}:${versiculo}`);
            await window.loadSpecificVerse(livro, capitulo, versiculo);
        } else {
            console.error("[VersiculosManager] Função 'window.loadSpecificVerse' não definida pela versão ativa. Tentando fallback genérico.");
            // --- Fallback genérico para versões sem um `loadSpecificVerse` específico ---
            // Esta parte mantém a funcionalidade para outras versões (não 'original')
            // caso elas não definam sua própria função `loadSpecificVerse`.
            try {
                const versao = localStorage.getItem('versaoBiblicaSelecionada') || 'ara';
                const url = `../versao/${versao}/${livro}/${capitulo}.json`;
                const resposta = await fetch(url);
                if (!resposta.ok) throw new Error(`HTTP error! status: ${resposta.status}`);
                const dados = await resposta.json();
                
                // Adapta para a estrutura JSON, que pode ser uma array (como `original.json` de exemplo)
                const chapterData = Array.isArray(dados) ? dados[0] : dados;
                const verseText = chapterData.versiculos?.[versiculo];

                const conteiner = areaConteudo.querySelector('.conteudo-versiculos') || this._criarConteinerVersiculos(areaConteudo);
                // Remove qualquer display de versículo genérico existente antes de adicionar o novo
                const existingGenericVerseDisplay = conteiner.querySelector('.versiculo-ativo');
                if (existingGenericVerseDisplay) {
                    existingGenericVerseDisplay.remove();
                }

                if (verseText) {
                    const verseDiv = document.createElement('div');
                    verseDiv.classList.add('versiculo-ativo');
                    verseDiv.innerHTML = `<sup>${versiculo}</sup><span>${verseText}</span>`;
                    conteiner.appendChild(verseDiv);
                } else {
                    const verseDiv = document.createElement('div');
                    verseDiv.classList.add('versiculo-ativo');
                    verseDiv.innerHTML = `<p>Versículo ${versiculo} não encontrado nos dados genéricos.</p>`;
                    conteiner.appendChild(verseDiv);
                    console.warn(`Versículo ${versiculo} não encontrado nos dados de ${livro} ${capitulo} na versão ${versao}.`);
                }

            } catch (erro) {
                console.error(`[VersiculosManager] Erro no fallback genérico ao carregar versículo ${livro} ${capitulo}:${versiculo}:`, erro);
                const conteiner = areaConteudo.querySelector('.conteudo-versiculos') || this._criarConteinerVersiculos(areaConteudo);
                const existingGenericVerseDisplay = conteiner.querySelector('.versiculo-ativo');
                if (existingGenericVerseDisplay) { existingGenericVerseDisplay.remove(); }
                const verseDiv = document.createElement('div');
                verseDiv.classList.add('versiculo-ativo');
                verseDiv.innerHTML = `<p style="color:red;">Erro ao carregar versículo ${versiculo}.</p>`;
                conteiner.appendChild(verseDiv);
            }
        }
        
        // Atualiza o título principal H2 da página.
        // Se a versão for 'original', o `original.js` já cuidará do título, então evitamos duplicidade.
        const tituloH2 = areaConteudo.querySelector('h2');
        if (tituloH2 && window.BIBLE_VERSION !== 'original') {
            if (typeof window.getLivroDisplayName === 'function') {
                let versionSuffix = (window.NOME_VERSAO_COMPLETA_BIBLIA) ? ` (${window.NOME_VERSAO_COMPLETA_BIBLIA})` : '';
                tituloH2.textContent = `${window.getLivroDisplayName(livro)} ${capitulo}:${versiculo}${versionSuffix}`;
            } else {
                tituloH2.textContent = `${livro.toUpperCase()} ${capitulo}:${versiculo}`;
            }
        }

        // Gerencia o estado ativo dos botões de versículo
        const conteinerBotoesVersiculos = areaConteudo.querySelector('.conteudo-versiculos');
        if (conteinerBotoesVersiculos) {
            this.versiculoAtivo = versiculo;
            this._atualizarBotoesVersiculos(conteinerBotoesVersiculos, versiculo);
        } else {
            console.warn("[VersiculosManager] Conteiner de botões de versículos (.conteudo-versiculos) não encontrado para atualizar estado ativo.");
        }
    }

    // Este bloco define a função que cria os botões de navegação para cada versículo de um capítulo.
    criarBotoesVersiculos(livro, capitulo, totalVersiculos) {
        // Remove qualquer conteiner de versículos existente para evitar duplicatas
        const existingConteiner = document.querySelector('.conteudo-versiculos');
        if (existingConteiner) {
            existingConteiner.remove();
        }

        const conteiner = document.createElement('div');                          // Cria um novo elemento <div> na memória para agrupar os botões.
        conteiner.className = 'conteudo-versiculos';                              // Define a classe CSS do novo conteiner como 'conteudo-versiculos'.

        // Este bloco inicia um laço de repetição que vai de 1 até o número total de versículos.
        for (let i = 1; i <= totalVersiculos; i++) {
            const botao = document.createElement('button');                       // Cria um novo elemento <button> para cada número de versículo.
            botao.className = 'botao-versiculo';                                  // Define a classe CSS do botão para estilização.
            botao.dataset.versiculo = i;                                          // Armazena o número do versículo (i) no atributo 'data-versiculo' do botão.
            botao.textContent = i;                                                // Define o texto visível do botão como o número do versículo (i).
            botao.addEventListener('click', async () => {                         // Adiciona um "ouvinte" que espera por um clique no botão.
                await this.carregarVersiculo(livro, capitulo, i);                 // Chama a função atualizada para carregar o versículo.
            });

            conteiner.appendChild(botao);                                         // Adiciona o botão recém-criado dentro do conteiner de botões.
        }

        return conteiner;                                                         // Retorna o conteiner com todos os botões de versículo criados.
    }                                                                                          

    // Este bloco define uma função interna para criar um conteiner de versículos.
    _criarConteinerVersiculos(areaConteudo) {
        // Verifica se o conteiner já existe para não criar duplicatas
        let conteiner = areaConteudo.querySelector('.conteudo-versiculos');
        if (conteiner) return conteiner; 

        conteiner = document.createElement('div');                                // Cria um novo elemento <div> na memória.
        conteiner.className = 'conteudo-versiculos';                              // Define a classe CSS do novo conteiner.
        areaConteudo.appendChild(conteiner);                                      // Adiciona o novo conteiner à área de conteúdo principal da página.
        return conteiner;                                                         // Retorna o conteiner que foi criado e adicionado à página.
    }

    // Este bloco define uma função interna para atualizar o estilo dos botões.
    _atualizarBotoesVersiculos(conteiner, versiculoAtivo) {
        conteiner.querySelectorAll('.botao-versiculo').forEach(botao => {         // Busca todos os botões de versículo e executa uma ação para cada um.
            botao.classList.toggle('active',                                      // Adiciona ou remove a classe 'active' do botão.
                parseInt(botao.dataset.versiculo) === parseInt(versiculoAtivo)    // A classe é adicionada se o número do botão for igual ao versículo ativo.
            );
        });
    }

    // Removido o método _getNomeLivro, pois `window.getLivroDisplayName` já está disponível globalmente via `versoes.js`.
}
const versiculosManager = new VersiculosManager();                                // Cria e exporta uma única instância do gerenciador de versículos.
