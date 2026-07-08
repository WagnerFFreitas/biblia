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
        const areaConteudo = document.querySelector('section.conteudo');          // Busca no HTML o elemento <section> que tem a classe "conteudo".
        if (!areaConteudo) return;                                                // Verifica se a área de conteúdo não foi encontrada; se sim, interrompe a função.

        // Este bloco realiza o carregamento dos dados de um capítulo da Bíblia de forma segura.
        try {                                                                                  
            const versao = localStorage.getItem('versaoBiblicaSelecionada') || 'ara';  // Busca a versão da Bíblia salva no navegador; se não houver, usa 'ara' como padrão.
            const url = `../versao/${versao}/${livro}/${capitulo}.json`;          // Monta a URL para encontrar o arquivo JSON do capítulo e versão corretos.
            const resposta = await fetch(url);                                    // Realiza a requisição na rede para buscar o arquivo e aguarda a resposta.
            const dados = await resposta.json();                                  // Converte a resposta recebida (que é texto) para um objeto JavaScript (JSON).

            // Este bloco atualiza o título da página com as informações do versículo.
            const titulo = areaConteudo.querySelector('h2');                      // Busca o elemento <h2> (título) dentro da área de conteúdo.
            if (titulo) {                                                         // Verifica se o elemento de título foi encontrado.
                titulo.textContent = `${this._getNomeLivro(livro)} ${capitulo}:${versiculo}`;  // Define o texto do título com o nome completo do livro, capítulo e versículo.
            }

            // Este bloco exibe o texto do versículo na área de conteúdo designada.
            const conteiner = areaConteudo.querySelector('.conteudo-versiculos') ||  // Busca o conteiner de versículos; se não existir...
                              this._criarConteinerVersiculos(areaConteudo);       // Chama a função para criar um novo conteiner.

            // Este bloco define o conteúdo HTML do conteiner com o número e o texto do versículo.
            conteiner.innerHTML = `                                                            
                <div class="versiculo-ativo">
                    <sup>${versiculo}</sup>
                    <span>${dados.versiculos[versiculo]}</span>
                </div>
            `;

            // Este bloco atualiza o estado do versículo ativo e os botões de navegação.
            this.versiculoAtivo = versiculo;                                      // Armazena o número do versículo carregado como o "versículo ativo".
            this._atualizarBotoesVersiculos(conteiner, versiculo);                // Chama a função para marcar visualmente o botão do versículo ativo.

        } catch (erro) {                                                          // Captura qualquer erro que tenha ocorrido no bloco 'try'.
            console.error('Erro ao carregar versículo:', erro);                   // Exibe o erro no console do navegador para ajudar na depuração.
        }
    }

    // Este bloco define a função que cria os botões de navegação para cada versículo de um capítulo.
    criarBotoesVersiculos(livro, capitulo, totalVersiculos) {
        const conteiner = document.createElement('div');                          // Cria um novo elemento <div> na memória para agrupar os botões.
        conteiner.className = 'conteudo-versiculos';                              // Define a classe CSS do novo conteiner como 'conteudo-versiculos'.

        // Este bloco inicia um laço de repetição que vai de 1 até o número total de versículos.
        for (let i = 1; i <= totalVersiculos; i++) {
            const botao = document.createElement('button');                       // Cria um novo elemento <button> para cada número de versículo.
            botao.className = 'botao-versiculo';                                  // Define a classe CSS do botão para estilização.
            botao.dataset.versiculo = i;                                          // Armazena o número do versículo (i) no atributo 'data-versiculo' do botão.
            botao.textContent = i;                                                // Define o texto visível do botão como o número do versículo (i).
            botao.addEventListener('click', () => {                               // Adiciona um "ouvinte" que espera por um clique no botão.
                this.carregarVersiculo(livro, capitulo, i);                       // Define a ação a ser executada ao clicar: carregar o respectivo versículo.
            });

            conteiner.appendChild(botao);                                         // Adiciona o botão recém-criado dentro do conteiner de botões.
        }

        return conteiner;                                                         // Retorna o conteiner com todos os botões de versículo criados.
    }                                                                                          

    // Este bloco define uma função interna para criar um conteiner de versículos.
    _criarConteinerVersiculos(areaConteudo) {
        const conteiner = document.createElement('div');                          // Cria um novo elemento <div> na memória.
        conteiner.className = 'conteudo-versiculos';                              // Define a classe CSS do novo conteiner.
        areaConteudo.appendChild(conteiner);                                      // Adiciona o novo conteiner à área de conteúdo principal da página.
        return conteiner;                                                         // Retorna o conteiner que foi criado e adicionado à página.
    }

    // Este bloco define uma função interna para atualizar o estilo dos botões.
    _atualizarBotoesVersiculos(conteiner, versiculoAtivo) {
        conteiner.querySelectorAll('.botao-versiculo').forEach(botao => {         // Busca todos os botões de versículo e executa uma ação para cada um.
            botao.classList.toggle('active',                                      // Adiciona ou remove a classe 'active' do botão.
                parseInt(botao.dataset.versiculo) === versiculoAtivo              // A classe é adicionada se o número do botão for igual ao versículo ativo.
            );
        });
    }

    // Este bloco define uma função interna para traduzir a abreviação do livro para o nome completo.
    _getNomeLivro(livro) {
        const nomes = {                                                           // Cria um objeto para armazenar os nomes dos livros da Bíblia.
            // Antigo Testamento
            genesis: "Gênesis",
            exodo: "Êxodo",
            levitico: "Levítico",
            numeros: "Números",
            deuteronomio: "Deuteronômio",
            josue: "Josué",
            juizes: "Juízes",
            rute: "Rute",
            "1samuel": "1º Samuel",
            "2samuel": "2º Samuel",
            "1reis": "1º Reis",
            "2reis": "2º Reis",
            "1cronicas": "1º Crônicas",
            "2cronicas": "2º Crônicas",
            esdras: "Esdras",
            neemias: "Neemias",
            ester: "Ester",
            jo: "Jó",
            salmos: "Salmos",
            proverbios: "Provérbios",
            eclesiastes: "Eclesiastes",
            cantares: "Cantares de Salomão",
            isaias: "Isaías",
            jeremias: "Jeremias",
            lamentacoes: "Lamentações de Jeremias",
            ezequiel: "Ezequiel",
            daniel: "Daniel",
            oseias: "Oseias",
            joel: "Joel",
            amos: "Amós",
            obadias: "Obadias",
            jonas: "Jonas",
            miqueias: "Miqueias",
            naum: "Naum",
            habacuque: "Habacuque",
            sofonias: "Sofonias",
            ageu: "Ageu",
            zacarias: "Zacarias",
            malaquias: "Malaquias",

            // Novo Testamento
            mateus: "Mateus",
            marcos: "Marcos",
            lucas: "Lucas",
            joao: "João",
            atos: "Atos dos Apóstolos",
            romanos: "Romanos",
            "1corintios": "1º Coríntios",
            "2corintios": "2º Coríntios",
            galatas: "Gálatas",
            efesios: "Efésios",
            filipenses: "Filipenses",
            colossenses: "Colossenses",
            "1tessalonicenses": "1º Tessalonicenses",
            "2tessalonicenses": "2º Tessalonicenses",
            "1timoteo": "1º Timóteo",
            "2timoteo": "2º Timóteo",
            tito: "Tito",
            filemom: "Filemom",
            hebreus: "Hebreus",
            tiago: "Tiago",
            "1pedro": "1º Pedro",
            "2pedro": "2º Pedro",
            "1joao": "1º João",
            "2joao": "2º João",
            "3joao": "3º João",
            judas: "Judas",
            apocalipse: "Apocalipse" 
        };
        
        return nomes[livro] || livro;                                             // Retorna o nome completo correspondente; se não encontrar, retorna a própria abreviação.
    }
}
const versiculosManager = new VersiculosManager();                                // Cria e exporta uma única instância do gerenciador de versículos.
