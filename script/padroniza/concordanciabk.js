/*===============================================================================*/
/*                    SCRIPT DE CONCORDÂNCIA BÍBLICA (MÓDULO)                    */
/*===============================================================================*/
/*    - Funções para carregar, filtrar e exibir resultados da concordância.      */
/*    - Implementa busca por letra, filtro por palavra, testamento e livro.      */
/*    - Contém a lógica para a busca global em todos os arquivos da Bíblia.      */
/*===============================================================================*/

// Este bloco importa funções auxiliares para manipulação de livros e testamentos.
import { getTestamentoDoLivroConfig, getOrdemDosLivrosConfig, findLivroByIdConfig } from './dropdown_concordancia.js';

// Este bloco define o caminho base para os arquivos de dados da concordância.
const CONCORDANCIA_DATA_BASE_PATH_LOCAL = '../concordancia/';                     // Variáveis de estado para armazenar dados e filtros atuais.
let dadosCarregadosPorLetraOuBusca = [];                                          // Armazena os dados brutos carregados (por letra ou busca global).
let filtroTestamentoAtual = 'todos';                                              // Estado do filtro de testamento ('todos', 'Antigo Testamento', 'Novo Testamento').
let filtroLivroAtual = 'todos';                                                   // Estado do filtro de livro (ex: 'gn' para Gênesis).
let filtroPalavraAtual = '';                                                      // Estado do filtro de palavra dentro dos resultados.
let termoBuscaGlobalAtual = '';                                                   // Armazena o termo da última busca global.

// O bloco carrega e exibe os dados da concordância para uma letra específica.
export async function carregarEDisplayConcordanciaPorLetra(letra) {
    const resultadosConteiner = document.getElementById('resultados-conteiner');   
    if (!resultadosConteiner) return;                                             // Aborta se o conteiner de resultados não existir.
    resultadosConteiner.innerHTML = '<div class="loader">Carregando...</div>';    // Exibe um indicador de carregamento.

    try {
        const response = await fetch(`${CONCORDANCIA_DATA_BASE_PATH_LOCAL}${letra.toLowerCase()}.json`);  // Faz a requisição para o arquivo JSON da letra.
        if (!response.ok) throw new Error(`Arquivo '${letra.toLowerCase()}.json' não encontrado.`);  // Lança um erro se o arquivo não for encontrado.
        const jsonData = await response.json();
        const wordEntries = jsonData[letra.toLowerCase()] || [];                  // Extrai as entradas de palavras do JSON.

        dadosCarregadosPorLetraOuBusca = wordEntries;                             // Armazena os dados carregados.
        termoBuscaGlobalAtual = '';                                               // Limpa o termo de busca global.
        _aplicarFiltrosERenderizar();                                             // Aplica filtros e renderiza os resultados.
    } catch (error) {
        console.error(error);
        resultadosConteiner.innerHTML = `<p class="erro-mensagem">${error.message}</p>`;  // Exibe uma mensagem de erro na interface.
        dadosCarregadosPorLetraOuBusca = [];                                      // Limpa os dados em caso de erro.
    }
}

// Este blococria a função chamada quando a view da concordância está pronta.
export function onConcordanciaViewReady() {
    // Busca os elementos dos filtros na interface.
    const testamentoSelect = document.getElementById('custom-testamento-select')?.querySelector('.select-selected');
    const livroSelect = document.getElementById('custom-livro-select')?.querySelector('.select-selected');
    const palavraInput = document.getElementById('filtro-palavra-input');

    // Atualiza as variáveis de estado com os valores dos filtros.
    filtroTestamentoAtual = testamentoSelect?.dataset.value || 'todos';
    filtroLivroAtual = livroSelect?.dataset.value || 'todos';
    filtroPalavraAtual = palavraInput?.value.toLowerCase().trim() || '';

    _aplicarFiltrosERenderizar();                                                 // Renderiza os resultados com os filtros atuais.
}

// Este bloco carrega um conjunto de dados base na concordância (usado pela busca global).
export function carregarDadosBaseConcordancia(dados) {
    dadosCarregadosPorLetraOuBusca = dados || [];                                 // Atualiza os dados base.
    _aplicarFiltrosERenderizar();                                                 // Aplica filtros e renderiza.
}

// Atualiza o filtro de testamento e re-renderiza os resultados.
export function atualizarFiltroTestamento(novoTestamento) { 
    if (filtroTestamentoAtual === novoTestamento) return;                         // Evita re-renderização desnecessária.
    filtroTestamentoAtual = novoTestamento;                                       // Atualiza o estado do filtro.
    _aplicarFiltrosERenderizar();
}

// Este bloco atualiza o filtro de livro e re-renderiza os resultados.
export function atualizarFiltroLivro(novoLivro) {
    if (filtroLivroAtual === novoLivro) return;                                   // Evita re-renderização desnecessária.
    filtroLivroAtual = novoLivro;                                                 // Atualiza o estado do filtro.
    _aplicarFiltrosERenderizar();
}

// Este bloco atualiza o filtro de palavra e re-renderiza os resultados.
export function atualizarFiltroPalavra(novaPalavra) {
    const palavraFiltrada = novaPalavra.toLowerCase().trim();                     // Normaliza a palavra do filtro.
    if (filtroPalavraAtual === palavraFiltrada) return;                           // Evita re-renderização desnecessária.
    filtroPalavraAtual = palavraFiltrada;                                         // Atualiza o estado do filtro.
    _aplicarFiltrosERenderizar();
}

// Este bloco contém funções utilitárias internas para formatação e extração de dados.
function extrairNomeLivroDaReferencia(referencia) {
    if (!referencia) return '';
    const match = referencia.match(/^([A-Za-zÀ-ÿ\s0-9]+)(?=\s*\d)/);              // Regex para extrair o nome do livro (ex: "1 Crônicas" de "1 Crônicas 10:1").
    return match ? match[1].trim() : referencia.split(' ')[0].trim();             // Retorna o nome do livro encontrado ou a primeira palavra como fallback.
}

function destacarPalavra(texto, termo) {
    if (!termo || !texto) return texto;
    const regex = new RegExp(`\\b(${termo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi');  // Cria uma regex para destacar o termo exato no texto.
    return texto.replace(regex, '<mark>$1</mark>');                               // Envolve o termo com a tag <mark> para estilização.
}

function formatarNomeLivro(nomeLivro) {
    const partes = nomeLivro.split(' ');
    if (partes.length > 1 && ['1', '2', '3'].includes(partes[0])) {
        return `${partes[0]}º ${partes.slice(1).join(' ')}`;                      // Formata "1 Samuel" para "1º Samuel".
    }
    return nomeLivro;
}

function formatarReferencia(referencia) {
    const match = referencia.match(/^([A-Za-zÀ-ÿ\s0-9]+?)(\s+\d+:\d+.*)?$/);
    if (match) {
        const nomeLivroOriginal = match[1].trim();
        const restoDaReferencia = match[2] || '';
        const nomeLivroFormatado = formatarNomeLivro(nomeLivroOriginal);
        return `${nomeLivroFormatado}${restoDaReferencia}`;                       // Reconstitui a referência com o nome do livro formatado.
    }
    return referencia;
}

// Este bloco cria a função central que aplica todos os filtros ativos aos dados e chama a renderização.
function _aplicarFiltrosERenderizar() {
    let resultados = [...dadosCarregadosPorLetraOuBusca];                         // Cria uma cópia dos dados para não modificar o original.

    // Este bloco aplica o filtro de palavra (dentro dos resultados já carregados).
    if (filtroPalavraAtual) {
        resultados = resultados.filter(item =>
            item.palavra?.toLowerCase().includes(filtroPalavraAtual)
        );
    }

    // Este bloco aplica o filtro de testamento.
    if (filtroTestamentoAtual !== 'todos') {
        resultados = resultados.reduce((acc, palavraItem) => {
            const filtradas = (palavraItem.concordancias || []).filter(con => {
                const nomeLivro = extrairNomeLivroDaReferencia(con.referencia).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                const testamento = getTestamentoDoLivroConfig(nomeLivro);
                return testamento === filtroTestamentoAtual;
            });
            if (filtradas.length > 0) {
                acc.push({ ...palavraItem, concordancias: filtradas, ocorrencias: filtradas.length });
            }
            return acc;
        }, []);
    }

    // Este bloco aplica o filtro de livro.
    if (filtroLivroAtual !== 'todos') {
        resultados = resultados.reduce((acc, palavraItem) => {
            const filtradas = (palavraItem.concordancias || []).filter(con => {
                const nomeLivroRef = extrairNomeLivroDaReferencia(con.referencia);
                const livroCfg = findLivroByIdConfig(filtroLivroAtual);
                return livroCfg && nomeLivroRef.toLowerCase() === livroCfg.nome.toLowerCase();
            });
            if (filtradas.length > 0) {
                acc.push({ ...palavraItem, concordancias: filtradas, ocorrencias: filtradas.length });
            }
            return acc;
        }, []);
    }

    _renderizarResultados(resultados);                                            // Chama a função para renderizar os resultados finais.
}

// Este bloco renderiza a lista de resultados no DOM.
function _renderizarResultados(lista) {
    const conteiner = document.getElementById('resultados-conteiner');
    if (!conteiner) return;
    conteiner.innerHTML = '';                                                     // Limpa o conteiner antes de renderizar.
    if (!lista || lista.length === 0) {
        let mensagem = "Nenhum resultado encontrado para os filtros aplicados.";
        if (termoBuscaGlobalAtual) {
            mensagem = `Nenhum resultado encontrado para "${termoBuscaGlobalAtual}".`;
        } else if (filtroPalavraAtual) {
            mensagem = `Nenhum resultado encontrado para "${filtroPalavraAtual}".`;
        }
        conteiner.innerHTML = `<div class="sem-resultados"><h3>Sem resultados</h3><p>${mensagem}</p></div>`;
        return;
    }

    // Este bloco itera sobre cada item da lista para criar seu elemento HTML.
    lista.forEach(item => {
        const section = document.createElement('div');
        section.className = 'palavra-section';

        const header = document.createElement('div');
        header.className = 'palavra-header';
        header.innerHTML = `
            <h2 class="palavra-titulo">${item.palavra}</h2>
            <span class="contador">${item.ocorrencias || 0} ocorrências</span>
        `;
        section.appendChild(header);

        if (item.fonte) {
            section.innerHTML += `<div class="palavra-fonte-info"><strong>Fonte:</strong> ${item.fonte}</div>`;
        }
        if (item['veja tambem']?.length) {
            section.innerHTML += `<div class="palavra-veja-tambem-info"><strong>Veja também:</strong> ${item['veja tambem'].join(', ')}</div>`;
        }

        const agrupado = {};
        item.concordancias?.forEach(oc => {
            const livro = extrairNomeLivroDaReferencia(oc.referencia);
            if (!agrupado[livro]) agrupado[livro] = [];
            agrupado[livro].push(oc);
        });

        const ordem = getOrdemDosLivrosConfig();
        const livrosPresentes = Object.keys(agrupado);

        ordem.forEach(livro => {
            if (livrosPresentes.includes(livro)) {
                criarSecaoLivro(section, livro, agrupado[livro], item.palavra);
            }
        });

        livrosPresentes.forEach(livro => {
            if (!ordem.includes(livro)) {
                criarSecaoLivro(section, livro, agrupado[livro], item.palavra);
            }
        });

        conteiner.appendChild(section);
    });

    const inicial = document.getElementById('initial-message');
    if (inicial) inicial.style.display = 'none';
}

// Este bloco cria a seção HTML para um livro específico dentro de uma palavra.
function criarSecaoLivro(section, livro, ocorrencias, palavra) {
    const grupo = document.createElement('div');
    grupo.className = 'livro-grupo';
    grupo.innerHTML = `<div class="livro-header">${formatarNomeLivro(livro)} (${ocorrencias.length} ocorrência${ocorrencias.length > 1 ? 's' : ''})</div>`;

    ocorrencias.forEach(oc => {
        const div = document.createElement('div');
        div.className = 'ocorrencia';
        div.innerHTML = `
            <div class="referenciaConcordancia">${formatarReferencia(oc.referencia)}</div>
            <div class="texto">${destacarPalavra(oc.texto, termoBuscaGlobalAtual || palavra)}</div>
        `;
        grupo.appendChild(div);
    });

    section.appendChild(grupo);
}

// Este bloocoo executa uma busca global por um termo em todos os arquivos da concordância.
export async function executarBuscaGlobalConcordancia(termo) {
    termoBuscaGlobalAtual = termo.trim().toLowerCase();                           // Normaliza e armazena o termo de busca.
    const resultadosConteiner = document.getElementById('resultados-conteiner');
    filtroPalavraAtual = '';                                                      // Limpa o filtro de palavra.

    if (!termoBuscaGlobalAtual) {
        if (resultadosConteiner) resultadosConteiner.innerHTML = '<p class="sem-resultados">Digite um termo para a busca global.</p>';
        dadosCarregadosPorLetraOuBusca = [];
        return;
    }

    if (resultadosConteiner) {
        resultadosConteiner.innerHTML = '<div class="loader-global-busca">🔍 Buscando em toda a Bíblia...</div>';
    }

    const todosOsResultadosGlobais = new Map();                                   // Usa um Map para evitar resultados duplicados.
    const todasAsLetras = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const regexBusca = new RegExp(`\\b(${termoBuscaGlobalAtual.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi');

    // Este bloco itera sobre todas as letras do alfabeto para carregar e processar cada arquivo.
    for (const letra of todasAsLetras) {
        try {
            const response = await fetch(`${CONCORDANCIA_DATA_BASE_PATH_LOCAL}${letra}.json`);
            if (!response.ok) continue;

            const jsonData = await response.json();
            const wordEntries = jsonData[letra.toLowerCase()] || [];

            for (const item of wordEntries) {                                     // Busca pela palavra-chave principal ou no texto dos versículos.
                if (item.palavra.toLowerCase().includes(termoBuscaGlobalAtual)) {
                    if (!todosOsResultadosGlobais.has(item.palavra)) {
                        todosOsResultadosGlobais.set(item.palavra, { ...item });
                    }
                } else {
                    const concordanciasCorrespondentes = (item.concordancias || []).filter(oc => regexBusca.test(oc.texto));
                    if (concordanciasCorrespondentes.length > 0) {
                        if (!todosOsResultadosGlobais.has(item.palavra)) {
                            todosOsResultadosGlobais.set(item.palavra, {
                                ...item,
                                concordancias: concordanciasCorrespondentes,
                                ocorrencias: concordanciasCorrespondentes.length
                            });
                        }
                    }
                }
            }
        } catch (e) {
            console.warn(`Erro ao carregar ou processar ${letra}.json:`, e);
        }
    }

    dadosCarregadosPorLetraOuBusca = Array.from(todosOsResultadosGlobais.values());  // Converte o Map para um array.
    _aplicarFiltrosERenderizar();                                                 // Aplica filtros e renderiza os resultados da busca global.
}
