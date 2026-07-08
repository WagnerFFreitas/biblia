/*===============================================================================*/
/*                MÓDULO DE DROPDOWNS CUSTOMIZADOS (CONCORDÂNCIA)                */
/*===============================================================================*/
/* - Contém a configuração dos livros da Bíblia (ID, nome, testamento).          */
/* - Gerencia a criação e interatividade dos dropdowns de testamento e livro.    */
/* - Popula dinamicamente o dropdown de livros com base no testamento            */
/* selecionado                                                                   */
/*===============================================================================*/

// Este bloco define a configuração estática de todos os livros da Bíblia.
const bibliaConfig = {
    livros: [
        // Antigo Testamento
        { id: 'gn', nome: 'Gênesis', testamento: 'Antigo Testamento' },
        { id: 'ex', nome: 'Êxodo', testamento: 'Antigo Testamento' },
        { id: 'lv', nome: 'Levítico', testamento: 'Antigo Testamento' },
        { id: 'nm', nome: 'Números', testamento: 'Antigo Testamento' },
        { id: 'dt', nome: 'Deuteronômio', testamento: 'Antigo Testamento' },
        { id: 'js', nome: 'Josué', testamento: 'Antigo Testamento' },
        { id: 'jz', nome: 'Juízes', testamento: 'Antigo Testamento' },
        { id: 'rt', nome: 'Rute', testamento: 'Antigo Testamento' },
        { id: '1sm', nome: '1 Samuel', testamento: 'Antigo Testamento' },
        { id: '2sm', nome: '2 Samuel', testamento: 'Antigo Testamento' },
        { id: '1rs', nome: '1 Reis', testamento: 'Antigo Testamento' },
        { id: '2rs', nome: '2 Reis', testamento: 'Antigo Testamento' },
        { id: '1cr', nome: '1 Crônicas', testamento: 'Antigo Testamento' },
        { id: '2cr', nome: '2 Crônicas', testamento: 'Antigo Testamento' },
        { id: 'ed', nome: 'Esdras', testamento: 'Antigo Testamento' },
        { id: 'ne', nome: 'Neemias', testamento: 'Antigo Testamento' },
        { id: 'et', nome: 'Ester', testamento: 'Antigo Testamento' },
        { id: 'jo', nome: 'Jó', testamento: 'Antigo Testamento' },
        { id: 'sl', nome: 'Salmos', testamento: 'Antigo Testamento' },
        { id: 'pv', nome: 'Provérbios', testamento: 'Antigo Testamento' },
        { id: 'ec', nome: 'Eclesiastes', testamento: 'Antigo Testamento' },
        { id: 'ct', nome: 'Cantares', testamento: 'Antigo Testamento' },
        { id: 'is', nome: 'Isaías', testamento: 'Antigo Testamento' },
        { id: 'jr', nome: 'Jeremias', testamento: 'Antigo Testamento' },
        { id: 'lm', nome: 'Lamentações', testamento: 'Antigo Testamento' },
        { id: 'ez', nome: 'Ezequiel', testamento: 'Antigo Testamento' },
        { id: 'dn', nome: 'Daniel', testamento: 'Antigo Testamento' },
        { id: 'os', nome: 'Oséias', testamento: 'Antigo Testamento' },
        { id: 'jl', nome: 'Joel', testamento: 'Antigo Testamento' },
        { id: 'am', nome: 'Amós', testamento: 'Antigo Testamento' },
        { id: 'ob', nome: 'Obadias', testamento: 'Antigo Testamento' },
        { id: 'jn', nome: 'Jonas', testamento: 'Antigo Testamento' },
        { id: 'mq', nome: 'Miquéias', testamento: 'Antigo Testamento' },
        { id: 'na', nome: 'Naum', testamento: 'Antigo Testamento' },
        { id: 'hc', nome: 'Habacuque', testamento: 'Antigo Testamento' },
        { id: 'sf', nome: 'Sofonias', testamento: 'Antigo Testamento' },
        { id: 'ag', nome: 'Ageu', testamento: 'Antigo Testamento' },
        { id: 'zc', nome: 'Zacarias', testamento: 'Antigo Testamento' },
        { id: 'ml', nome: 'Malaquias', testamento: 'Antigo Testamento' },
        // Novo Testamento
        { id: 'mt', nome: 'Mateus', testamento: 'Novo Testamento' },
        { id: 'mc', nome: 'Marcos', testamento: 'Novo Testamento' },
        { id: 'lc', nome: 'Lucas', testamento: 'Novo Testamento' },
        { id: 'joa', nome: 'João', testamento: 'Novo Testamento' },
        { id: 'at', nome: 'Atos', testamento: 'Novo Testamento' },
        { id: 'rm', nome: 'Romanos', testamento: 'Novo Testamento' },
        { id: '1co', nome: '1 Coríntios', testamento: 'Novo Testamento' },
        { id: '2co', nome: '2 Coríntios', testamento: 'Novo Testamento' },
        { id: 'gl', nome: 'Gálatas', testamento: 'Novo Testamento' },
        { id: 'ef', nome: 'Efésios', testamento: 'Novo Testamento' },
        { id: 'fp', nome: 'Filipenses', testamento: 'Novo Testamento' },
        { id: 'cl', nome: 'Colossenses', testamento: 'Novo Testamento' },
        { id: '1ts', nome: '1 Tessalonicenses', testamento: 'Novo Testamento' },
        { id: '2ts', nome: '2 Tessalonicenses', testamento: 'Novo Testamento' },
        { id: '1tm', nome: '1 Timóteo', testamento: 'Novo Testamento' },
        { id: '2tm', nome: '2 Timóteo', testamento: 'Novo Testamento' },
        { id: 'tt', nome: 'Tito', testamento: 'Novo Testamento' },
        { id: 'fm', nome: 'Filemom', testamento: 'Novo Testamento' },
        { id: 'hb', nome: 'Hebreus', testamento: 'Novo Testamento' },
        { id: 'tg', nome: 'Tiago', testamento: 'Novo Testamento' },
        { id: '1pe', nome: '1 Pedro', testamento: 'Novo Testamento' },
        { id: '2pe', nome: '2 Pedro', testamento: 'Novo Testamento' },
        { id: '1jo', nome: '1 João', testamento: 'Novo Testamento' },
        { id: '2jo', nome: '2 João', testamento: 'Novo Testamento' },
        { id: '3jo', nome: '3 João', testamento: 'Novo Testamento' },
        { id: 'jd', nome: 'Judas', testamento: 'Novo Testamento' },
        { id: 'ap', nome: 'Apocalipse', testamento: 'Novo Testamento' }
    ],
    getTestamentoDoLivro(nomeLivroOuId) {
        if (!nomeLivroOuId) return null;
        const nomeLower = String(nomeLivroOuId).trim().toLowerCase();
        const livroEncontrado = this.livros.find(livro => livro.nome.toLowerCase() === nomeLower || livro.id.toLowerCase() === nomeLower);
        return livroEncontrado ? livroEncontrado.testamento : null;
    },
    getLivrosPorTestamento(testamento = 'todos') {
        if (testamento === 'todos') return [...this.livros];
        return this.livros.filter(livro => livro.testamento === testamento);
    },
    getOrdemLivros() {
        return this.livros.map(l => l.nome);
    },
    findLivroById(livroId) {
        return this.livros.find(l => l.id === livroId);
    }
};

// Este bloco cria um mapa otimizado para consulta rápida do testamento a partir de um nome de livro normalizado.
// A normalização remove acentos e converte para minúsculas, garantindo correspondências consistentes.
const mapaLivros = bibliaConfig.livros.reduce((acc, livro) => {
    const nomeNormalizado = livro.nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    acc[nomeNormalizado] = livro.testamento;
    return acc;
}, {});

// Este bloco exporta funções para serem usadas por outros módulos.
export function getTestamentoDoLivroConfig(nomeLivro) {
    if (!nomeLivro) return null;
    // A consulta usa o nome normalizado para encontrar o testamento de forma eficiente no mapa pré-calculado.
    const normalizado = nomeLivro.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    return mapaLivros[normalizado] || null;
}

export function getOrdemDosLivrosConfig() {
    return bibliaConfig.getOrdemLivros();
}

export function findLivroByIdConfig(livroId) {
    return bibliaConfig.findLivroById(livroId);
}

// Este bloco cria as variáveis globais para armazenar as funções de callback.
let onTestamentoChangeGlobalCallback = null;
let onLivroChangeGlobalCallback = null;

// Este bloco inicializa os dropdowns customizados de testamento e livro.
export function initConcordanciaDropdowns(cbTestamento, cbLivro) {
    onTestamentoChangeGlobalCallback = cbTestamento;
    onLivroChangeGlobalCallback = cbLivro;

    const testamentoSelectElement = document.getElementById('custom-testamento-select');
    const livroSelectElement = document.getElementById('custom-livro-select');

    if (testamentoSelectElement) {                                                // Transforma o elemento de testamento em um dropdown customizado.
        _makeCustomSelect(testamentoSelectElement, (detail) => {
            if (onTestamentoChangeGlobalCallback) {
                onTestamentoChangeGlobalCallback(detail.value);
            }
            if (livroSelectElement) {
                _populateLivrosDropdown(livroSelectElement, detail.value);        // Popula o dropdown de livros com base no testamento.
            }
        });
    }

    if (livroSelectElement) {                                                     // Transforma o elemento de livro em um dropdown customizado.
        _makeCustomSelect(livroSelectElement, (detail) => {
            if (onLivroChangeGlobalCallback) {
                onLivroChangeGlobalCallback(detail.value);
            }
        });

        // Popula o dropdown de livros com o valor inicial do testamento.
        let initialTestamentoValue = testamentoSelectElement?.querySelector('.select-selected')?.dataset.value || 'todos';
        _populateLivrosDropdown(livroSelectElement, initialTestamentoValue);
    }

    document.addEventListener("click", (e) => {                                   // Adiciona um listener global para fechar os dropdowns quando se clica fora deles.
        if (!e.target.closest('.custom-select')) {
            _closeAllSelects(null);
        }
    });
}

// Este bloco constrói a lógica para um dropdown customizado a partir de um elemento HTML.
function _makeCustomSelect(customSelectElement, onChangeCallback) {
    const selectSelectedDisplay = customSelectElement.querySelector(".select-selected");
    const itemsConteiner = customSelectElement.querySelector(".select-items");

    if (!selectSelectedDisplay || !itemsConteiner) return;

     selectSelectedDisplay.addEventListener("click", function (e) {               // Adiciona evento de clique para abrir/fechar o dropdown.
        e.stopPropagation();
        _closeAllSelects(this);                                                   // Fecha outros dropdowns abertos.
        itemsConteiner.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });

    // Este bloco adiciona evento de clique para cada opção do dropdown.
    Array.from(itemsConteiner.children).forEach(optionItem => {
        optionItem.addEventListener("click", function () {
            selectSelectedDisplay.innerHTML = this.innerHTML;
            selectSelectedDisplay.dataset.value = this.dataset.value || this.textContent;

            Array.from(itemsConteiner.children).forEach(child => child.classList.remove("same-as-selected"));
            this.classList.add("same-as-selected");
            _closeAllSelects(null);

            if (onChangeCallback) {
                onChangeCallback({ value: this.dataset.value, text: this.textContent });
            }
        });
    });
}

// Este bloco popula dinamicamente as opções do dropdown de livros.
function _populateLivrosDropdown(customLivroSelectElement, testamentoFiltrado) {
    const itemsConteiner = customLivroSelectElement.querySelector(".select-items");
    const selectedDisplay = customLivroSelectElement.querySelector(".select-selected");

    if (!itemsConteiner || !selectedDisplay) return;
    itemsConteiner.innerHTML = '';                                                // Limpa as opções existentes.

    const TodosOption = document.createElement("div");                            // Adiciona a opção "Todos os livros".
    TodosOption.textContent = "Todos os livros";
    TodosOption.dataset.value = "todos";
    itemsConteiner.appendChild(TodosOption);

    const livrosParaExibir = bibliaConfig.getLivrosPorTestamento(testamentoFiltrado);  // Adiciona os livros correspondentes ao testamento filtrado.
    livrosParaExibir.forEach(livro => {
        const opt = document.createElement("div");
        opt.textContent = livro.nome;
        opt.dataset.value = livro.id;
        itemsConteiner.appendChild(opt);
    });

    // Reseta a seleção para "Todos os livros" se o livro anteriormente selecionado não pertencer ao novo testamento.
    const valorSelecionado = selectedDisplay.dataset.value;
    const livroExistente = livrosParaExibir.find(l => l.id === valorSelecionado);
    if (livroExistente) {
        selectedDisplay.innerHTML = livroExistente.nome;
    } else {
        selectedDisplay.innerHTML = "Todos os livros";
        selectedDisplay.dataset.value = "todos";
    }

    Array.from(itemsConteiner.children).forEach(optionItem => {                   // Adiciona os listeners de clique para as novas opções.
        optionItem.addEventListener("click", function () {
            selectedDisplay.innerHTML = this.innerHTML;
            selectedDisplay.dataset.value = this.dataset.value;
            _closeAllSelects(null);
            if (onLivroChangeGlobalCallback) {
                onLivroChangeGlobalCallback(this.dataset.value);
            }
        });
    });
}

// Este bloco fecha todos os dropdowns customizados abertos na página.
function _closeAllSelects(exceptThisSelectedDisplay) {
    document.querySelectorAll(".custom-select .select-items").forEach(conteiner => {
        conteiner.classList.add("select-hide");
    });
    document.querySelectorAll(".custom-select .select-selected").forEach(display => {
        display.classList.remove("select-arrow-active");
    });
}
