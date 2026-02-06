/*===============================================================================*/
/*               MÓDULO DE DROPDOWNS CUSTOMIZADOS (CONCORDÂNCIA)                 */
/*===============================================================================*/
/*  Este script é responsável por:                                               */
/*                       - Configurar dados dos livros bíblicos                  */
/*                       - Gerenciar dropdowns interativos de testamento/livro   */
/*                       - Popular dinamicamente opções baseadas em filtros      */
/*===============================================================================*/

/* BLOCO: Define a configuração estática completa de todos os livros da Bíblia com seus metadados */
const bibliaConfig = {                                                                            /* Inicia objeto de configuração       */
    livros: [                                                                                      /* Array de todos os livros bíblicos   */
        /* BLOCO: Livros do Antigo Testamento */
        { id: 'gn', nome: 'Gênesis', testamento: 'Antigo Testamento' },                           /* Primeiro livro da Bíblia            */
        { id: 'ex', nome: 'Êxodo', testamento: 'Antigo Testamento' },                             /* Segundo livro da Bíblia             */
        { id: 'lv', nome: 'Levítico', testamento: 'Antigo Testamento' },                          /* Terceiro livro da Bíblia            */
        { id: 'nm', nome: 'Números', testamento: 'Antigo Testamento' },                           /* Quarto livro da Bíblia              */
        { id: 'dt', nome: 'Deuteronômio', testamento: 'Antigo Testamento' },                      /* Quinto livro da Bíblia              */
        { id: 'js', nome: 'Josué', testamento: 'Antigo Testamento' },                             /* Sexto livro da Bíblia               */
        { id: 'jz', nome: 'Juízes', testamento: 'Antigo Testamento' },                            /* Sétimo livro da Bíblia              */
        { id: 'rt', nome: 'Rute', testamento: 'Antigo Testamento' },                              /* Oitavo livro da Bíblia              */
        { id: '1sm', nome: '1 Samuel', testamento: 'Antigo Testamento' },                         /* Nono livro da Bíblia                */
        { id: '2sm', nome: '2 Samuel', testamento: 'Antigo Testamento' },                         /* Décimo livro da Bíblia              */
        { id: '1rs', nome: '1 Reis', testamento: 'Antigo Testamento' },                           /* Décimo primeiro livro               */
        { id: '2rs', nome: '2 Reis', testamento: 'Antigo Testamento' },                           /* Décimo segundo livro                */
        { id: '1cr', nome: '1 Crônicas', testamento: 'Antigo Testamento' },                       /* Décimo terceiro livro               */
        { id: '2cr', nome: '2 Crônicas', testamento: 'Antigo Testamento' },                       /* Décimo quarto livro                 */
        { id: 'ed', nome: 'Esdras', testamento: 'Antigo Testamento' },                            /* Décimo quinto livro                 */
        { id: 'ne', nome: 'Neemias', testamento: 'Antigo Testamento' },                           /* Décimo sexto livro                  */
        { id: 'et', nome: 'Ester', testamento: 'Antigo Testamento' },                             /* Décimo sétimo livro                 */
        { id: 'jo', nome: 'Jó', testamento: 'Antigo Testamento' },                                /* Décimo oitavo livro                 */
        { id: 'sl', nome: 'Salmos', testamento: 'Antigo Testamento' },                            /* Décimo nono livro                   */
        { id: 'pv', nome: 'Provérbios', testamento: 'Antigo Testamento' },                        /* Vigésimo livro                      */
        { id: 'ec', nome: 'Eclesiastes', testamento: 'Antigo Testamento' },                       /* Vigésimo primeiro livro             */
        { id: 'ct', nome: 'Cantares', testamento: 'Antigo Testamento' },                          /* Vigésimo segundo livro              */
        { id: 'is', nome: 'Isaías', testamento: 'Antigo Testamento' },                            /* Vigésimo terceiro livro             */
        { id: 'jr', nome: 'Jeremias', testamento: 'Antigo Testamento' },                          /* Vigésimo quarto livro               */
        { id: 'lm', nome: 'Lamentações', testamento: 'Antigo Testamento' },                       /* Vigésimo quinto livro               */
        { id: 'ez', nome: 'Ezequiel', testamento: 'Antigo Testamento' },                          /* Vigésimo sexto livro                */
        { id: 'dn', nome: 'Daniel', testamento: 'Antigo Testamento' },                            /* Vigésimo sétimo livro               */
        { id: 'os', nome: 'Oséias', testamento: 'Antigo Testamento' },                            /* Vigésimo oitavo livro               */
        { id: 'jl', nome: 'Joel', testamento: 'Antigo Testamento' },                              /* Vigésimo nono livro                 */
        { id: 'am', nome: 'Amós', testamento: 'Antigo Testamento' },                              /* Trigésimo livro                     */
        { id: 'ob', nome: 'Obadias', testamento: 'Antigo Testamento' },                           /* Trigésimo primeiro livro            */
        { id: 'jn', nome: 'Jonas', testamento: 'Antigo Testamento' },                             /* Trigésimo segundo livro             */
        { id: 'mq', nome: 'Miquéias', testamento: 'Antigo Testamento' },                          /* Trigésimo terceiro livro            */
        { id: 'na', nome: 'Naum', testamento: 'Antigo Testamento' },                              /* Trigésimo quarto livro              */
        { id: 'hc', nome: 'Habacuque', testamento: 'Antigo Testamento' },                         /* Trigésimo quinto livro              */
        { id: 'sf', nome: 'Sofonias', testamento: 'Antigo Testamento' },                          /* Trigésimo sexto livro               */
        { id: 'ag', nome: 'Ageu', testamento: 'Antigo Testamento' },                              /* Trigésimo sétimo livro              */
        { id: 'zc', nome: 'Zacarias', testamento: 'Antigo Testamento' },                          /* Trigésimo oitavo livro              */
        { id: 'ml', nome: 'Malaquias', testamento: 'Antigo Testamento' },                         /* Trigésimo nono livro                */
        /* BLOCO: Livros do Novo Testamento */
        { id: 'mt', nome: 'Mateus', testamento: 'Novo Testamento' },                              /* Quadragésimo livro                  */
        { id: 'mc', nome: 'Marcos', testamento: 'Novo Testamento' },                              /* Quadragésimo primeiro livro         */
        { id: 'lc', nome: 'Lucas', testamento: 'Novo Testamento' },                               /* Quadragésimo segundo livro          */
        { id: 'joa', nome: 'João', testamento: 'Novo Testamento' },                               /* Quadragésimo terceiro livro         */
        { id: 'at', nome: 'Atos', testamento: 'Novo Testamento' },                                /* Quadragésimo quarto livro           */
        { id: 'rm', nome: 'Romanos', testamento: 'Novo Testamento' },                             /* Quadragésimo quinto livro           */
        { id: '1co', nome: '1 Coríntios', testamento: 'Novo Testamento' },                        /* Quadragésimo sexto livro            */
        { id: '2co', nome: '2 Coríntios', testamento: 'Novo Testamento' },                        /* Quadragésimo sétimo livro           */
        { id: 'gl', nome: 'Gálatas', testamento: 'Novo Testamento' },                             /* Quadragésimo oitavo livro           */
        { id: 'ef', nome: 'Efésios', testamento: 'Novo Testamento' },                             /* Quadragésimo nono livro             */
        { id: 'fp', nome: 'Filipenses', testamento: 'Novo Testamento' },                          /* Quinquagésimo livro                 */
        { id: 'cl', nome: 'Colossenses', testamento: 'Novo Testamento' },                         /* Quinquagésimo primeiro livro        */
        { id: '1ts', nome: '1 Tessalonicenses', testamento: 'Novo Testamento' },                  /* Quinquagésimo segundo livro         */
        { id: '2ts', nome: '2 Tessalonicenses', testamento: 'Novo Testamento' },                  /* Quinquagésimo terceiro livro        */
        { id: '1tm', nome: '1 Timóteo', testamento: 'Novo Testamento' },                          /* Quinquagésimo quarto livro          */
        { id: '2tm', nome: '2 Timóteo', testamento: 'Novo Testamento' },                          /* Quinquagésimo quinto livro          */
        { id: 'tt', nome: 'Tito', testamento: 'Novo Testamento' },                                /* Quinquagésimo sexto livro           */
        { id: 'fm', nome: 'Filemom', testamento: 'Novo Testamento' },                             /* Quinquagésimo sétimo livro          */
        { id: 'hb', nome: 'Hebreus', testamento: 'Novo Testamento' },                             /* Quinquagésimo oitavo livro          */
        { id: 'tg', nome: 'Tiago', testamento: 'Novo Testamento' },                               /* Quinquagésimo nono livro            */
        { id: '1pe', nome: '1 Pedro', testamento: 'Novo Testamento' },                            /* Sexagésimo livro                    */
        { id: '2pe', nome: '2 Pedro', testamento: 'Novo Testamento' },                            /* Sexagésimo primeiro livro           */
        { id: '1jo', nome: '1 João', testamento: 'Novo Testamento' },                             /* Sexagésimo segundo livro            */
        { id: '2jo', nome: '2 João', testamento: 'Novo Testamento' },                             /* Sexagésimo terceiro livro           */
        { id: '3jo', nome: '3 João', testamento: 'Novo Testamento' },                             /* Sexagésimo quarto livro             */
        { id: 'jd', nome: 'Judas', testamento: 'Novo Testamento' },                               /* Sexagésimo quinto livro             */
        { id: 'ap', nome: 'Apocalipse', testamento: 'Novo Testamento' }                           /* Sexagésimo sexto livro              */
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

    if (testamentoSelectElement) {                                                                 // Transforma o elemento de testamento em um dropdown customizado.
        _makeCustomSelect(testamentoSelectElement, (detail) => {
            if (onTestamentoChangeGlobalCallback) {
                onTestamentoChangeGlobalCallback(detail.value);
            }
            if (livroSelectElement) {
                _populateLivrosDropdown(livroSelectElement, detail.value);                         // Popula o dropdown de livros com base no testamento.
            }
        });
    }

    if (livroSelectElement) {                                                                      // Transforma o elemento de livro em um dropdown customizado.
        _makeCustomSelect(livroSelectElement, (detail) => {
            if (onLivroChangeGlobalCallback) {
                onLivroChangeGlobalCallback(detail.value);
            }
        });

        // Popula o dropdown de livros com o valor inicial do testamento.
        let initialTestamentoValue = testamentoSelectElement?.querySelector('.select-selected')?.dataset.value || 'todos';
        _populateLivrosDropdown(livroSelectElement, initialTestamentoValue);
    }

    document.addEventListener("click", (e) => {                                                    // Adiciona um listener global para fechar os dropdowns quando se clica fora deles.
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

     selectSelectedDisplay.addEventListener("click", function (e) {                                // Adiciona evento de clique para abrir/fechar o dropdown.
        e.stopPropagation();
        _closeAllSelects(this); // Fecha outros dropdowns abertos.
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
    itemsConteiner.innerHTML = '';                                                                 // Limpa as opções existentes.

    const TodosOption = document.createElement("div");                                             // Adiciona a opção "Todos os livros".
    TodosOption.textContent = "Todos os livros";
    TodosOption.dataset.value = "todos";
    itemsConteiner.appendChild(TodosOption);

    const livrosParaExibir = bibliaConfig.getLivrosPorTestamento(testamentoFiltrado);              // Adiciona os livros correspondentes ao testamento filtrado.
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

    Array.from(itemsConteiner.children).forEach(optionItem => {                                    // Adiciona os listeners de clique para as novas opções.
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