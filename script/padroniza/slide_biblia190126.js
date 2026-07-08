/*===============================================================================*/
/*                   MÓDULO DE APRESENTAÇÃO EM SLIDE (POP-UP)                    */
/*===============================================================================*/
/*  Este script é responsável por:                                               */
/*              - Abrir uma nova janela para o modo de apresentação              */
/*            - Gerenciar a navegação de versículos nessa nova janela            */
/*             - Carregar dinamicamente o conteúdo bíblico na janela             */
/*               - Lidar com a navegação por teclado (setas, etc.)               */
/*===============================================================================*/

console.log("[slide_biblia.js] Script iniciado.")                                 // Exibe uma mensagem no console para confirmar que o script foi carregado.

// Este bloco define um objeto para mapear nomes de livros com acentos para um formato padrão sem acentos.
const livroAcentuadosParaSemAcentos = {
  Gênesis: "genesis",
  Êxodo: "exodo",
  Levítico: "levitico",
  Números: "numeros",
  Deuteronômio: "deuteronomio",
  Josué: "josue",
  Juízes: "juizes",
  Rute: "rute",
  "1Samuel": "1samuel",
  "2Samuel": "2samuel",
  "1Reis": "1reis",
  "2Reis": "2reis",
  "1Crônicas": "1cronica",
  "2Crônicas": "2cronica",
  Esdras: "esdras",
  Neemias: "neemias",
  Ester: "ester",
  Jó: "jo",
  Cantares: "cantares",
  Isaías: "isaias",
  Jeremias: "jeremias",
  Lamentações: "lamentacoes",
  Ezequiel: "ezequiel",
  Daniel: "daniel",
  Oséias: "oseas",
  Joel: "joel",
  Amós: "amos",
  Obadias: "obadias",
  Jonas: "jonas",
  Miquéias: "miqueias",
  Naum: "naum",
  Habacuque: "habacuque",
  Sofonias: "sofonias",
  Ageu: "ageu",
  Zacarias: "zacarias",
  Malaquias: "malaquias",
  Mateus: "mateus",
  Marcos: "marcos",
  Lucas: "lucas",
  João: "joao",
  Atos: "atos",
  Romanos: "romanos",
  "1Coríntios": "1corintios",
  "2Coríntios": "2corintios",
  Gálatas: "galatas",
  Efésios: "efesios",
  Filipenses: "filipenses",
  Colossenses: "colossenses",
  "1Tessalonicenses": "1tessalonicenses",
  "2Tessalonicenses": "2tessalonicenses",
  "1Timóteo": "1timoteo",
  "2Timóteo": "2timoteo",
  Tito: "tito",
  Filemom: "filemom",
  Hebreus: "hebreus",
  Tiago: "tiago",
  "1Pedro": "1pedro",
  "2Pedro": "2pedro",
  "1João": "1joao",
  "2João": "2joao",
  "3João": "3joao",
  Judas: "judas",
  Apocalipse: "apocalipse",
}

// Este bloco define a estrutura de dados principal com a contagem de versículos por capítulo de cada livro.
const baseLivros = {
  genesis: {
    1: 31,
    2: 25,
    3: 24,
    4: 26,
    5: 32,
    6: 22,
    7: 24,
    8: 22,
    9: 29,
    10: 32,
    11: 32,
    12: 20,
    13: 18,
    14: 24,
    15: 21,
    16: 16,
    17: 27,
    18: 33,
    19: 38,
    20: 18,
    21: 34,
    22: 24,
    23: 20,
    24: 67,
    25: 34,
    26: 35,
    27: 46,
    28: 22,
    29: 35,
    30: 43,
    31: 55,
    32: 32,
    33: 20,
    34: 31,
    35: 29,
    36: 43,
    37: 36,
    38: 30,
    39: 23,
    40: 23,
    41: 57,
    42: 38,
    43: 34,
    44: 34,
    45: 28,
    46: 34,
    47: 31,
    48: 22,
    49: 33,
    50: 26,
  },
  exodo: {
    1: 22,
    2: 25,
    3: 22,
    4: 31,
    5: 23,
    6: 30,
    7: 25,
    8: 32,
    9: 35,
    10: 29,
    11: 10,
    12: 37,
    13: 22,
    14: 31,
    15: 27,
    16: 36,
    17: 16,
    18: 27,
    19: 29,
    20: 26,
    21: 36,
    22: 31,
    23: 33,
    24: 18,
  },
  levitico: {
    1: 17,
    2: 16,
    3: 17,
    4: 35,
    5: 19,
    6: 30,
    7: 38,
    8: 36,
    9: 24,
    10: 20,
    11: 47,
    12: 8,
    13: 59,
    14: 57,
    15: 33,
    16: 34,
    17: 16,
    18: 30,
    19: 37,
    20: 27,
    21: 24,
    22: 33,
    23: 44,
    24: 23,
    25: 55,
    26: 46,
    27: 34,
  },
  numeros: {
    1: 54,
    2: 34,
    3: 51,
    4: 42,
    5: 31,
    6: 27,
    7: 89,
    8: 26,
    9: 23,
    10: 36,
    11: 35,
    12: 16,
    13: 33,
    14: 45,
    15: 41,
    16: 50,
    17: 13,
    18: 32,
    19: 22,
    20: 29,
    21: 35,
    22: 41,
    23: 30,
    24: 25,
    25: 18,
    26: 65,
    27: 23,
    28: 31,
    29: 40,
    30: 16,
    31: 54,
    32: 42,
    33: 56,
    34: 29,
    35: 15,
    36: 13,
  },
  deuteronomio: {
    1: 46,
    2: 37,
    3: 29,
    4: 49,
    5: 33,
    6: 25,
    7: 26,
    8: 20,
    9: 29,
    10: 22,
    11: 32,
    12: 31,
    13: 18,
    14: 29,
    15: 23,
    16: 22,
    17: 20,
    18: 22,
    19: 21,
    20: 20,
    21: 23,
    22: 30,
    23: 25,
    24: 22,
    25: 19,
    26: 19,
    27: 26,
    28: 68,
    29: 8,
    30: 20,
    31: 30,
    32: 49,
    33: 29,
    34: 12,
  },
  josue: {
    1: 18,
    2: 24,
    3: 17,
    4: 24,
    5: 15,
    6: 27,
    7: 26,
    8: 35,
    9: 27,
    10: 43,
    11: 23,
    12: 24,
    13: 33,
    14: 15,
    15: 63,
    16: 10,
    17: 18,
    18: 28,
    19: 51,
    20: 9,
    21: 45,
    22: 34,
    23: 16,
    24: 33,
  },
  juizes: {
    1: 36,
    2: 23,
    3: 31,
    4: 24,
    5: 31,
    6: 40,
    7: 25,
    8: 32,
    9: 57,
    10: 18,
    11: 40,
    12: 15,
    13: 25,
    14: 20,
    15: 20,
    16: 31,
    17: 13,
    18: 31,
    19: 30,
    20: 48,
    21: 25,
  },
  rute: { 1: 22, 2: 23, 3: 18, 4: 22 },
  "1samuel": {
    1: 28,
    2: 36,
    3: 21,
    4: 22,
    5: 12,
    6: 21,
    7: 17,
    8: 22,
    9: 27,
    10: 27,
    11: 15,
    12: 25,
    13: 23,
    14: 52,
    15: 35,
    16: 23,
    17: 58,
    18: 30,
    19: 24,
    20: 42,
    21: 15,
    22: 23,
    23: 29,
    24: 22,
    25: 44,
    26: 25,
    27: 12,
    28: 25,
    29: 11,
    30: 31,
    31: 13,
  },
  "2samuel": {
    1: 27,
    2: 32,
    3: 39,
    4: 12,
    5: 25,
    6: 23,
    7: 29,
    8: 18,
    9: 13,
    10: 19,
    11: 27,
    12: 31,
    13: 39,
    14: 33,
    15: 37,
    16: 23,
    17: 27,
    18: 17,
    19: 43,
    20: 26,
    21: 22,
    22: 51,
    23: 39,
    24: 25,
  },
  "1reis": {
    1: 53,
    2: 46,
    3: 28,
    4: 34,
    5: 18,
    6: 38,
    7: 51,
    8: 66,
    9: 28,
    10: 29,
    11: 43,
    12: 31,
    13: 34,
    14: 31,
    15: 34,
    16: 34,
    17: 24,
    18: 46,
    19: 21,
    20: 43,
    21: 29,
    22: 53,
  },
  "2reis": {
    1: 18,
    2: 25,
    3: 27,
    4: 44,
    5: 27,
    6: 33,
    7: 20,
    8: 29,
    9: 37,
    10: 36,
    11: 21,
    12: 21,
    13: 25,
    14: 29,
    15: 30,
    16: 20,
    17: 41,
    18: 37,
    19: 37,
    20: 21,
    21: 26,
    22: 20,
    23: 37,
    24: 20,
    25: 30,
  },
  "1cronica": {
    1: 54,
    2: 55,
    3: 24,
    4: 43,
    5: 26,
    6: 81,
    7: 40,
    8: 40,
    9: 44,
    10: 14,
    11: 47,
    12: 40,
    13: 14,
    14: 17,
    15: 29,
    16: 43,
    17: 27,
    18: 17,
    19: 19,
    20: 8,
    21: 30,
    22: 19,
    23: 32,
    24: 31,
    25: 31,
    26: 32,
    27: 34,
    28: 21,
    29: 30,
  },
  "2cronica": {
    1: 18,
    2: 17,
    3: 17,
    4: 22,
    5: 14,
    6: 42,
    7: 22,
    8: 18,
    9: 31,
    10: 19,
    11: 23,
    12: 16,
    13: 22,
    14: 14,
    15: 19,
    16: 14,
    17: 19,
    18: 34,
    19: 11,
    20: 37,
    21: 20,
    22: 12,
    23: 32,
    24: 27,
    25: 28,
    26: 23,
    27: 9,
    28: 27,
    29: 36,
    30: 27,
    31: 21,
    32: 33,
    33: 25,
    34: 33,
    35: 27,
    36: 23,
  },
  esdras: { 1: 11, 2: 70, 3: 13, 4: 24, 5: 17, 6: 22, 7: 28, 8: 36, 9: 15, 10: 44 },
  neemias: { 1: 11, 2: 20, 3: 32, 4: 23, 5: 19, 6: 19, 7: 73, 8: 18, 9: 38, 10: 39, 11: 36, 12: 47, 13: 31 },
  ester: { 1: 22, 2: 23, 3: 15, 4: 17, 5: 14, 6: 14, 7: 10, 8: 17, 9: 32, 10: 3 },
  jo: {
    1: 22,
    2: 13,
    3: 26,
    4: 21,
    5: 27,
    6: 21,
    7: 21,
    8: 22,
    9: 35,
    10: 22,
    11: 20,
    12: 25,
    13: 27,
    14: 22,
    15: 35,
    16: 22,
    17: 16,
    18: 21,
    19: 29,
    20: 30,
    21: 34,
    22: 30,
    23: 17,
    24: 25,
    25: 6,
    26: 14,
    27: 23,
    28: 28,
    29: 25,
    30: 31,
    31: 40,
    32: 22,
    33: 33,
    34: 37,
    35: 16,
    36: 33,
    37: 24,
    38: 41,
    39: 30,
    40: 24,
    41: 34,
    42: 17,
  },
  cantares: { 1: 17, 2: 17, 3: 11, 4: 16, 5: 16, 6: 13, 7: 13, 8: 14 },
  isaias: {
    1: 31,
    2: 22,
    3: 26,
    4: 6,
    5: 30,
    6: 13,
    7: 25,
    8: 22,
    9: 21,
    10: 34,
    11: 16,
    12: 6,
    13: 22,
    14: 32,
    15: 9,
    16: 14,
    17: 14,
    18: 7,
    19: 25,
    20: 6,
    21: 17,
    22: 25,
    23: 18,
    24: 23,
    25: 12,
    26: 21,
    27: 13,
    28: 29,
    29: 24,
    30: 33,
    31: 9,
    32: 20,
    33: 24,
    34: 17,
    35: 10,
    36: 22,
    37: 38,
    38: 22,
    39: 8,
    40: 31,
    41: 29,
    42: 25,
    43: 28,
    44: 28,
    45: 25,
    46: 13,
    47: 15,
    48: 22,
    49: 26,
    50: 11,
    51: 23,
    52: 15,
    53: 12,
    54: 17,
    55: 13,
    56: 12,
    57: 21,
    58: 14,
    59: 21,
    60: 22,
    61: 11,
    62: 12,
    63: 19,
    64: 12,
    65: 25,
    66: 24,
  },
  jeremias: {
    1: 19,
    2: 37,
    3: 25,
    4: 31,
    5: 31,
    6: 30,
    7: 34,
    8: 22,
    9: 26,
    10: 25,
    11: 23,
    12: 17,
    13: 27,
    14: 29,
    15: 21,
    16: 21,
    17: 27,
    18: 23,
    19: 15,
    20: 18,
    21: 14,
    22: 30,
    23: 40,
    24: 10,
    25: 38,
    26: 20,
    27: 21,
    28: 17,
    29: 32,
    30: 24,
    31: 40,
    32: 44,
    33: 26,
    34: 22,
    35: 19,
    36: 32,
    37: 20,
    38: 28,
    39: 18,
    40: 16,
    41: 18,
    42: 22,
    43: 13,
    44: 30,
    45: 5,
    46: 28,
    47: 7,
    48: 47,
    49: 39,
    50: 46,
    51: 64,
    52: 34,
  },
  lamentacoes: { 1: 22, 2: 22, 3: 66, 4: 22, 5: 22 },
  ezequiel: {
    1: 28,
    2: 10,
    3: 27,
    4: 17,
    5: 17,
    6: 14,
    7: 27,
    8: 18,
    9: 11,
    10: 22,
    11: 26,
    12: 28,
    13: 23,
    14: 23,
    15: 8,
    16: 63,
    17: 24,
    18: 32,
    19: 14,
    20: 49,
    21: 32,
    22: 31,
    23: 49,
    24: 27,
    25: 17,
    26: 21,
    27: 36,
    28: 26,
    29: 15,
    30: 26,
    31: 17,
    32: 32,
    33: 33,
    34: 31,
    35: 17,
    36: 38,
    37: 28,
    38: 23,
    39: 29,
    40: 49,
    41: 26,
    42: 20,
    43: 27,
    44: 31,
    45: 25,
    46: 20,
    47: 23,
    48: 35,
  },
  daniel: { 1: 21, 2: 49, 3: 30, 4: 37, 5: 31, 6: 28, 7: 28, 8: 27, 9: 27, 10: 21, 11: 45, 12: 13 },
  oseas: { 1: 11, 2: 23, 3: 5, 4: 19, 5: 15, 6: 11, 7: 16, 8: 14, 9: 17, 10: 15, 11: 12, 12: 14, 13: 16, 14: 9 },
  joel: { 1: 20, 2: 32, 3: 21 },
  amos: { 1: 15, 2: 16, 3: 15, 4: 13, 5: 27, 6: 14, 7: 17, 8: 14, 9: 15 },
  obadias: { 1: 21 },
  jonas: { 1: 17, 2: 10, 3: 10, 4: 11 },
  miqueias: { 1: 16, 2: 13, 3: 12, 4: 13, 5: 15, 6: 16, 7: 20 },
  naum: { 1: 14, 2: 13, 3: 19 },
  habacuque: { 1: 17, 2: 20, 3: 19 },
  sofonias: { 1: 18, 2: 15, 3: 20 },
  ageu: { 1: 15, 2: 23 },
  zacarias: { 1: 21, 2: 13, 3: 10, 4: 14, 5: 11, 6: 15, 7: 14, 8: 23, 9: 17, 10: 12, 11: 17, 12: 13, 13: 9, 14: 21 },
  malaquias: { 1: 14, 2: 17, 3: 24, 4: 6 },
  mateus: {
    1: 25,
    2: 23,
    3: 17,
    4: 25,
    5: 48,
    6: 34,
    7: 29,
    8: 34,
    9: 38,
    10: 42,
    11: 30,
    12: 50,
    13: 53,
    14: 36,
    15: 39,
    16: 28,
    17: 27,
    18: 35,
    19: 30,
    20: 34,
    21: 46,
    22: 46,
    23: 39,
    24: 51,
    25: 46,
    26: 75,
    27: 66,
    28: 20,
  },
  marcos: {
    1: 45,
    2: 28,
    3: 35,
    4: 41,
    5: 43,
    6: 56,
    7: 37,
    8: 38,
    9: 50,
    10: 52,
    11: 33,
    12: 44,
    13: 37,
    14: 72,
    15: 47,
    16: 20,
  },
  lucas: {
    1: 80,
    2: 52,
    3: 38,
    4: 44,
    5: 39,
    6: 49,
    7: 50,
    8: 56,
    9: 62,
    10: 42,
    11: 54,
    12: 59,
    13: 35,
    14: 35,
    15: 32,
    16: 31,
    17: 37,
    18: 43,
    19: 48,
    20: 47,
    21: 38,
    22: 71,
    23: 56,
    24: 53,
  },
  joao: {
    1: 51,
    2: 25,
    3: 36,
    4: 54,
    5: 47,
    6: 71,
    7: 53,
    8: 59,
    9: 41,
    10: 42,
    11: 57,
    12: 50,
    13: 38,
    14: 31,
    15: 27,
    16: 33,
  },
  atos: {
    1: 26,
    2: 47,
    3: 26,
    4: 37,
    5: 42,
    6: 15,
    7: 60,
    8: 40,
    9: 31,
    10: 48,
    11: 30,
    12: 25,
    13: 52,
    14: 28,
    15: 41,
    16: 40,
    17: 34,
    18: 28,
    19: 41,
    20: 38,
    21: 40,
    22: 30,
    23: 35,
    24: 27,
    25: 27,
    26: 32,
    27: 44,
    28: 31,
  },
  romanos: {
    1: 32,
    2: 29,
    3: 31,
    4: 25,
    5: 21,
    6: 23,
    7: 25,
    8: 39,
    9: 33,
    10: 21,
    11: 36,
    12: 21,
    13: 14,
    14: 23,
    15: 33,
    16: 27,
  },
  "1corintios": {
    1: 31,
    2: 16,
    3: 23,
    4: 21,
    5: 13,
    6: 20,
    7: 40,
    8: 13,
    9: 27,
    10: 33,
    11: 34,
    12: 31,
    13: 13,
    14: 40,
    15: 58,
    16: 24,
  },
  "2corintios": { 1: 24, 2: 17, 3: 18, 4: 18, 5: 21, 6: 18, 7: 16, 8: 24, 9: 15, 10: 18, 11: 33, 12: 21 },
  galatas: { 1: 24, 2: 21, 3: 29, 4: 31, 5: 26, 6: 18 },
  efesios: { 1: 23, 2: 22, 3: 21, 4: 32, 5: 33, 6: 24 },
  filipenses: { 1: 30, 2: 30, 3: 21, 4: 23 },
  colossenses: { 1: 29, 2: 23, 3: 25, 4: 18 },
  "1tessalonicenses": { 1: 10, 2: 20, 3: 13, 4: 18, 5: 28 },
  "2tessalonicenses": { 1: 12, 2: 17, 3: 18 },
  "1timoteo": { 1: 20, 2: 15, 3: 16, 4: 16, 5: 25, 6: 21 },
  "2timoteo": { 1: 18, 2: 26, 3: 17 },
  tito: { 1: 16, 2: 15, 3: 15 },
  filemom: { 1: 25 },
  hebreus: { 1: 14, 2: 18, 3: 19, 4: 16, 5: 14, 6: 20, 7: 28, 8: 13, 9: 28, 10: 39, 11: 40, 12: 29, 13: 25 },
  tiago: { 1: 27, 2: 26, 3: 18, 4: 17, 5: 20 },
  "1pedro": { 1: 25, 2: 25, 3: 22, 4: 19, 5: 14 },
  "2pedro": { 1: 21, 2: 22, 3: 18 },
  "1joao": { 1: 10, 2: 29, 3: 24, 4: 21, 5: 21 },
  "2joao": { 1: 13 },
  "3joao": { 1: 14 },
  judas: { 1: 25 },
  apocalipse: {
    1: 20,
    2: 29,
    3: 22,
    4: 11,
    5: 14,
    6: 17,
    7: 17,
    8: 13,
    9: 21,
    10: 11,
    11: 19,
    12: 17,
    13: 18,
    14: 20,
    15: 8,
    16: 21,
    17: 18,
    18: 24,
    19: 21,
    20: 15,
    21: 27,
    22: 21,
  },
}

// Este bloco reutiliza a estrutura base para todas as versões da Bíblia, assumindo que são iguais.
const contagemVersiculosPorVersao = {
  acf: baseLivros,                                                                // Associa a versão 'acf' à estrutura de dados base.
  ara: baseLivros,                                                                // Associa a versão 'ara' à estrutura de dados base.
  nvi: baseLivros,                                                                // Associa a versão 'nvi' à estrutura de dados base.
  kjv: baseLivros,                                                                // Associa a versão 'kjv' à estrutura de dados base.
  arc: baseLivros,                                                                // Associa a versão 'arc' à estrutura de dados base.
  ntlh: baseLivros,                                                               // Associa a versão 'ntlh' à estrutura de dados base.
  naa: baseLivros,                                                                // Associa a versão 'naa' à estrutura de dados base.
  original: baseLivros,                                                           // Associa a versão 'original' à estrutura de dados base.
}

// Este bloco define a ordem canônica dos livros da Bíblia para a navegação sequencial.
const livrosOrdem = [
  "genesis",
  "exodo",
  "levitico",
  "numeros",
  "deuteronomio",
  "josue",
  "juizes",
  "rute",
  "1samuel",
  "2samuel",
  "1reis",
  "2reis",
  "1cronica",
  "2cronica",
  "esdras",
  "neemias",
  "ester",
  "jo",
  "cantares",
  "isaias",
  "jeremias",
  "lamentacoes",
  "ezequiel",
  "daniel",
  "oseas",
  "joel",
  "amos",
  "obadias",
  "jonas",
  "miqueias",
  "naum",
  "habacuque",
  "sofonias",
  "ageu",
  "zacarias",
  "malaquias",
  "mateus",
  "marcos",
  "lucas",
  "joao",
  "atos",
  "romanos",
  "1corintios",
  "2corintios",
  "galatas",
  "efesios",
  "filipenses",
  "colossenses",
  "1tessalonicenses",
  "2tessalonicenses",
  "1timoteo",
  "2timoteo",
  "tito",
  "filemom",
  "hebreus",
  "tiago",
  "1pedro",
  "2pedro",
  "1joao",
  "2joao",
  "3joao",
  "judas",
  "apocalipse",
]

// Este bloco define a função para padronizar qualquer nome de livro para o formato interno.
function normalizarNomeLivro(nome) {
  const nomeLower = nome.toLowerCase()                                            // Converte o nome recebido para letras minúsculas.
  const semAcentos = Object.keys(livroAcentuadosParaSemAcentos).find(
    // Tenta encontrar uma correspondência no objeto de mapeamento.
    (key) => key.toLowerCase() === nomeLower,                                     // Compara a chave (com acento) em minúsculas com o nome fornecido.
  )
  if (semAcentos) {
    // Se encontrou uma correspondência...
    return livroAcentuadosParaSemAcentos[semAcentos]                              // Retorna o nome padrão sem acentos.
  }
  return (
    Object.keys(livroAcentuadosParaSemAcentos).find(
      // Se não encontrou, tenta a busca inversa (o usuário pode ter digitado sem acento).
      (key) => livroAcentuadosParaSemAcentos[key] === nomeLower,                  // Compara o valor (sem acento) com o nome fornecido.
    ) || nomeLower
  )                                                                               // Se ainda não encontrar, retorna o nome original em minúsculas.
}

// Este bloco define a função para obter o nome do livro com acentos para exibição ao usuário.
function obterNomeAcentuado(nomeSemAcento) {
  return (
    Object.keys(livroAcentuadosParaSemAcentos).find(
      // Busca no objeto de mapeamento...
      (key) => livroAcentuadosParaSemAcentos[key] === nomeSemAcento,              // A chave (com acento) que corresponde ao valor padrão (sem acento).
    ) || nomeSemAcento
  )                                                                               // Se não encontrar, retorna o próprio nome sem acento.
}

// Este bloco define a função que inicializa a funcionalidade do slide na página principal.
function inicializarSlide() {
  console.log("[slide.js] Configurando listener do link 'Slide'.")                // Exibe uma mensagem no console para depuração.
  const linksHeader = document.querySelectorAll("header nav ul li a")             // Busca todos os links dentro do cabeçalho da página.
  let linkSlideEncontrado = null                                                  // Inicia uma variável para armazenar o link "Slide" quando encontrado.
  linksHeader.forEach((link) => {
    // Percorre cada link encontrado no cabeçalho.
    if (link.textContent.trim().toLowerCase() === "slide") {
      // Verifica se o texto do link, sem espaços e em minúsculas, é "slide".
      linkSlideEncontrado = link                                                  // Se for, armazena o elemento do link.
    }
  })

  // Este bloco adiciona o evento de clique ao link "Slide", se ele for encontrado.
  if (linkSlideEncontrado) {
    // Se o link "Slide" foi encontrado na página...
    linkSlideEncontrado.addEventListener("click", (event) => {
      // Adiciona um "ouvinte" para o evento de clique.
      event.preventDefault()                                                      // Impede que o navegador siga o link (comportamento padrão).
      console.log("[slide.js] Link 'Slide' clicado.")                             // Exibe uma mensagem de confirmação no console.

      // Este bloco coleta o estado atual da navegação (versão, livro, capítulo, versículo).
      const urlParams = new URLSearchParams(window.location.search)               // Cria um objeto para facilitar a leitura de parâmetros da URL.
      const versao = window.BIBLE_VERSION || urlParams.get("version") || "arc"    // Obtém a versão da Bíblia de várias fontes, com 'arc' como padrão.
      let livro = window.activeLivro || "genesis"                                 // Pega o livro ativo da variável global, ou usa 'genesis' como padrão.
      const cap = window.activeCapitulo || 1                                      // Pega o capítulo ativo da variável global, ou usa 1 como padrão.
      const versBtn = window.activeVersiculoButton                                // Pega o botão do versículo ativo, se houver.
      const versNum = versBtn
        ? Number.parseInt(versBtn.dataset.versiculo, 10) || Number.parseInt(versBtn.textContent.trim(), 10) || 1
        : 1                                                                       // Pega o número do versículo.

      // Este bloco valida se um livro e capítulo foram selecionados antes de abrir o slide.
      if (!livro || !cap) {
        // Verifica se há um livro e capítulo selecionados.
        alert("Por favor, selecione um livro e capítulo primeiro.")               // Exibe um alerta para o usuário se não houver seleção.
        console.warn("[slide.js] Tentativa de abrir slide sem livro/capítulo ativo.")  // Exibe um aviso no console para depuração.
        return                                                                    // Interrompe a execução da função.
      }

      // Este bloco padroniza o nome do livro e chama a função para abrir a janela.
      livro = normalizarNomeLivro(livro)                                          // Chama a função de normalização para garantir consistência.
      console.log(
        `[slide.js] Estado atual para slide: Versão=${versao}, Livro=${livro}, Cap=${cap}, VersNum=${versNum}`,
      )                                                                           // Exibe o estado atual no console.
      abrirJanelaSlide(livro, cap, versNum, versao)                               // Chama a função principal para abrir a nova janela do slide.
    })
  } else {
    // Se o link "Slide" não foi encontrado...
    console.warn("[slide.js] Link 'Slide' não encontrado no cabeçalho.")          // Exibe um aviso no console.
  }
}
window.inicializarSlide = inicializarSlide                                        // Torna a função acessível globalmente para que possa ser chamada de outros scripts.

// Este bloco garante que a inicialização do slide ocorra assim que a página estiver pronta.
document.addEventListener("DOMContentLoaded", () => {
  if (typeof inicializarSlide === "function") {
    // Verifica se a função de inicialização existe.
    inicializarSlide()                                                            // Se existir, a executa.
  } else {
    // Se não existir...
    console.error("[slide.js] inicializarSlide não está definida no DOMContentLoaded.")  // Exibe um erro no console.
  }
})

// Este bloco define a função principal que abre e configura a nova janela (pop-up) do slide.
async function abrirJanelaSlide(livroAtual, capituloAtual, versiculoAtual, versaoAtual) {
  console.log(
    `[slide.js] Tentando abrir slide para: ${versaoAtual.toUpperCase()} ${livroAtual} ${capituloAtual}:${versiculoAtual}`,
  )                                                                               // Exibe os dados no console.

  // Este bloco realiza uma validação inicial para garantir que todos os dados necessários foram fornecidos.
  if (!livroAtual || !capituloAtual || !versiculoAtual || !versaoAtual) {
    // Verifica se alguma das informações essenciais está faltando.
    alert("Dados insuficientes para abrir o slide. Verifique a seleção.")         // Exibe um alerta para o usuário.
    console.warn("[slide.js] Tentativa de abrir slide com dados insuficientes:", {
      livroAtual,
      capituloAtual,
      versiculoAtual,
      versaoAtual,
    })                                                                            // Loga o erro.
    return                                                                        // Interrompe a execução da função.
  }

  // Este bloco garante que o nome do livro esteja no formato padrão.
  livroAtual = normalizarNomeLivro(livroAtual)                                    // Normaliza o nome do livro para uso interno.
  if (window.janelaSlide && !window.janelaSlide.closed) {
    // Verifica se a variável da janela existe e se a janela não foi fechada.
    window.janelaSlide.focus()                                                    // Se já estiver aberta, apenas a traz para o foco.
    console.log("[slide.js] Janela do slide já estava aberta. Focando.")          // Exibe uma mensagem informativa no console.
    return                                                                        // Interrompe a execução da função.
  }

  // Este bloco tenta abrir a nova janela, cobrindo a tela inteira.
  const largura = window.screen.availWidth                                        // Pega a largura disponível da tela do usuário.
  const altura = window.screen.availHeight                                        // Pega a altura disponível da tela do usuário.

  window.janelaSlide = window.open(
    "",
    "JanelaSlide",
    `width=${largura},height=${altura},menubar=no,toolbar=no,location=no,status=no`,
  )                                                                               // Abre a janela pop-up.
  if (!window.janelaSlide || window.janelaSlide.closed) {
    // Verifica se a abertura da janela falhou.
    alert("Não foi possível abrir a janela do slide. Desative o bloqueador de pop-ups.")  // Exibe um alerta para o usuário com instruções.
    console.error("[slide.js] Falha ao abrir a janela pop-up.")                   // Exibe um erro no console para depuração.
    return                                                                        // Interrompe a execução da função.
  }

  console.log("[slide.js] Janela pop-up aberta com sucesso.")                     // Exibe uma mensagem de sucesso no console.

  // Este bloco valida se a estrutura de dados da versão da Bíblia está carregada corretamente.
  const todaContagemDaVersao = contagemVersiculosPorVersao[versaoAtual]           // Busca a estrutura de dados para a versão específica.
  if (!todaContagemDaVersao || Object.keys(todaContagemDaVersao).length === 0) {
    // Verifica se a estrutura não foi encontrada ou está vazia.
    console.error(`[slide.js] Contagem de versículos não encontrada para a versão ${versaoAtual.toUpperCase()}`)  // Exibe um erro detalhado.
    window.janelaSlide.close()                                                    // Fecha a janela recém-aberta, pois não pode funcionar.
    alert(`Erro interno: Configuração de versículos ausente para a versão ${versaoAtual.toUpperCase()}.`)  // Informa o usuário sobre o erro.
    return                                                                        // Interrompe a execução da função.
  }

  // Este bloco verifica se o livro selecionado existe na estrutura de dados da versão.
  if (!todaContagemDaVersao[livroAtual]) {
    // Verifica se o livro não é uma chave válida no objeto de contagem.
    console.error(
      `[slide.js] Livro '${livroAtual}' não encontrado na contagem para a versão ${versaoAtual.toUpperCase()}`,
    )                                                                             // Exibe um erro detalhado.
    window.janelaSlide.close()                                                    // Fecha a janela, pois não pode continuar.
    alert(`Erro interno: Livro '${livroAtual}' não encontrado na configuração.`)  // Informa o usuário sobre o erro.
    return                                                                        // Interrompe a execução da função.
  }

  // Este bloco prepara os dados e configurações para serem injetados na nova janela.
  const todaContagemJSON = JSON.stringify(todaContagemDaVersao)                   // Converte o objeto de contagem para uma string JSON para injetá-lo no HTML.
  const livrosOrdemJSON = JSON.stringify(livrosOrdem)                             // Converte o array de ordem dos livros para uma string JSON.
  const livroAcentuado = obterNomeAcentuado(livroAtual)                           // Converte o nome interno para o formato de exibição.
  const livroAcentuadosJSON = JSON.stringify(livroAcentuadosParaSemAcentos)

  const cssLink = versaoAtual === "original" ? '<link rel="stylesheet" href="../css/versoes.css">' : ""

  window.janelaSlide.document.open()
  window.janelaSlide.document.write(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <title>Bíblia Slide - ${versaoAtual.toUpperCase()}</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/slide_biblia.css">
    ${cssLink}
</head>
<body>
    <div id="popup-bem-vindo" class="popup-overlay">
        <div class="popup-conteudo">
            <h2>SEJA BEM VINDO</h2>
            <button id="fechar-popup">Fechar</button>
        </div>
    </div>
    <div id="marcadagua"></div>
    <div id="titulo">${livroAcentuado.toUpperCase()} ${capituloAtual}:${versiculoAtual}</div>
    <div id="versiculo-conteiner"><div class="texto-versiculo">Carregando...</div></div>
    <div id="botao-conteiner">
        <button id="voltar-botao">‹ Anterior</button>
        <button id="proximo-botao">Próximo ›</button>
    </div>

    <script>
        let livroAtual = '${livroAtual}';
        let capituloAtual = ${capituloAtual};
        let versiculoAtual = ${versiculoAtual};
        const versaoBiblia = '${versaoAtual}';
        let dadosCapitulo = null;

        const todaContagemDataGlobal = JSON.parse('${todaContagemJSON}');
        const livrosOrdemGlobal = JSON.parse('${livrosOrdemJSON}');
        let versiculosPorCapituloArray = [];

        const tituloElement = document.getElementById('titulo');
        const versiculoConteiner = document.getElementById('versiculo-conteiner');
        const btnVoltar = document.getElementById('voltar-botao');
        const btnProximo = document.getElementById('proximo-botao');

        const popup = document.getElementById('popup-bem-vindo');
        const fecharPopup = document.getElementById('fechar-popup');

        fecharPopup.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        const jsonFileVersions = ['ara', 'nvi', 'acf', 'ntlh', 'kjv', 'naa', 'original'];
        const isJsonFile = jsonFileVersions.includes(versaoBiblia);
        const fileExtension = isJsonFile ? 'json' : 'html';

        function normalizarNomeLivro(nome) {
            const semAcentos = ${livroAcentuadosJSON};
            const nomeLower = nome.toLowerCase();
            const keyAcentuada = Object.keys(semAcentos).find(key => key.toLowerCase() === nomeLower);
            if (keyAcentuada) return semAcentos[keyAcentuada];
            const keySemAcento = Object.keys(semAcentos).find(key => semAcentos[key].toLowerCase() === nomeLower);
            return keySemAcento ? semAcentos[keySemAcento] : nome;
        }

        function obterNomeAcentuado(nomeSemAcento) {
            const semAcentos = ${livroAcentuadosJSON};
            return Object.keys(semAcentos).find(key => semAcentos[key] === nomeSemAcento) || nomeSemAcento;
        }

        function atualizarContagemCapitulosParaLivroAtual() {
            const contagemCapitulosObj = todaContagemDataGlobal[livroAtual];
            if (contagemCapitulosObj) {
                versiculosPorCapituloArray = Object.keys(contagemCapitulosObj)
                    .map(capNumStr => parseInt(capNumStr, 10))
                    .sort((a, b) => a - b)
                    .map(capNum => contagemCapitulosObj[capNum.toString()]);
            } else {
                console.error('Contagem não encontrada para ' + livroAtual + ' (' + versaoBiblia + ').');
                versiculosPorCapituloArray = [];
                tituloElement.innerText = "ERRO CONFIG";
                versiculoConteiner.innerHTML = '<div class="texto-versiculo" style="color:red;">Config de versículos ausente.</div>';
                btnVoltar.disabled = true;
                btnProximo.disabled = true;
            }
        }

        async function carregarCapitulo(capituloNum) {
            const caminho = '../versao/' + versaoBiblia + '/' + livroAtual + '/' + capituloNum + '.' + fileExtension;
            console.log('Carregando capítulo: ' + caminho);
            const livroAcentuado = obterNomeAcentuado(livroAtual);
            tituloElement.innerText = livroAcentuado.toUpperCase() + ' ' + capituloNum + ':... (Carregando)';
            versiculoConteiner.innerHTML = '<div class="texto-versiculo">Carregando capítulo...</div>';
            btnVoltar.disabled = true;
            btnProximo.disabled = true;

            try {
                const response = await fetch(caminho);
                if (!response.ok) throw new Error('HTTP ' + response.status + ' em ' + caminho);
                dadosCapitulo = isJsonFile ? await response.json() : new DOMParser().parseFromString(await response.text(), 'text/html');
                console.log('Capítulo ' + (isJsonFile ? 'JSON' : 'HTML') + ' carregado.');
                carregarVersiculo(versiculoAtual);
            } catch (error) {
                console.error('Erro ao carregar capítulo:', error);
                tituloElement.innerText = 'ERRO ' + livroAcentuado.toUpperCase() + ' ' + capituloNum;
                versiculoConteiner.innerHTML = '<div class="texto-versiculo" style="color:red;font-size:1.2rem;">Falha.</div>';
            }
        }

        function carregarVersiculo(versiculoNum) {
            console.log('Carregando ' + livroAtual + ' ' + capituloAtual + ':' + versiculoNum);
            let conteudo = "", tituloSecao = "";
            const livroAcentuado = obterNomeAcentuado(livroAtual);

            if (!dadosCapitulo) {
                versiculoConteiner.innerHTML = '<div class="texto-versiculo" style="color:orange;">Dados não carregados.</div>';
                atualizarBotoes();
                return;
            }

            if (isJsonFile) {
                const capituloData = Array.isArray(dadosCapitulo) ? dadosCapitulo[0] : dadosCapitulo;

                if (capituloData.versiculos && capituloData.versiculos[versiculoNum]) {
                    const versiculoData = capituloData.versiculos[versiculoNum];

                    if (capituloData.titulos && capituloData.titulos[versiculoNum]) {
                        tituloSecao = '<strong class="section-title">' + capituloData.titulos[versiculoNum] + "</strong>";
                    }

                    if (versaoBiblia === "original" && typeof versiculoData === "object" && versiculoData.traducao_completa) {
                        conteudo = '<p id="versiculo-' + versiculoNum + '" class="traducao-completa">' + versiculoData.traducao_completa + "</p>";

                        if (versiculoData.palavras && versiculoData.palavras.length > 0) {
                            conteudo += '<div class="palavras-container">';
                            versiculoData.palavras.forEach((palavra) => {
                                conteudo += '<div class="word-detail-item">' +
                                    '<div class="hebraico-text">' + palavra.hebraico + "</div>" +
                                    '<div class="transliteral-text">' + palavra.transliteral + "</div>" +
                                    '<div class="traducao-palavra-text">' + palavra.traducao_palavra + "</div>" +
                                    "</div>";
                            });
                            conteudo += "</div>";
                        }
                    } else if (typeof versiculoData === "object" && versiculoData.traducao_completa) {
                        conteudo = versiculoData.traducao_completa;
                    } else if (typeof versiculoData === "string") {
                        conteudo = versiculoData;
                    } else {
                        conteudo = "Formato de versículo não reconhecido.";
                    }
                } else conteudo = "Versículo não encontrado (JSON).";
            } else {
                const el = dadosCapitulo.querySelector('#versiculo-' + versiculoNum);
                if (el) {
                    const strongChild = Array.from(el.children).find((c) => c.tagName === "STRONG");
                    if (strongChild && el.textContent.trim().startsWith(strongChild.textContent.trim())) {
                        tituloSecao = '<strong class="section-title">' + strongChild.innerHTML + "</strong>";
                        const temp = document.createElement("div");
                        temp.innerHTML = el.innerHTML;
                        const firstStrong = temp.querySelector("strong");
                        if (firstStrong && temp.innerHTML.trim().startsWith(firstStrong.outerHTML.trim())) firstStrong.remove();
                        conteudo = temp.innerHTML.trim();
                    } else conteudo = el.innerHTML.trim();
                    if (!conteudo && el.textContent) conteudo = el.textContent.trim();
                } else conteudo = "Versículo não encontrado (HTML).";
            }

            tituloElement.innerText = livroAcentuado.toUpperCase() + ' ' + capituloAtual + ':' + versiculoNum;
            versiculoConteiner.innerHTML = (tituloSecao || "") + '<div class="texto-versiculo">' + conteudo + "</div>";
            atualizarBotoes();
            document.body.classList.add("loaded");
        }

        function atualizarBotoes() {
            if (!versiculosPorCapituloArray || versiculosPorCapituloArray.length === 0) {
                btnVoltar.disabled = true;
                btnProximo.disabled = true;
                return;
            }
            const totalCaps = versiculosPorCapituloArray.length;
            const ultimoVerCap = (capituloAtual > 0 && capituloAtual <= totalCaps) ? versiculosPorCapituloArray[capituloAtual - 1] : 1;
            const idxLivro = livrosOrdemGlobal.indexOf(livroAtual);

            btnVoltar.disabled = (capituloAtual === 1 && versiculoAtual === 1 && idxLivro === 0);
            btnProximo.disabled = (capituloAtual === totalCaps && versiculoAtual === ultimoVerCap && idxLivro === livrosOrdemGlobal.length - 1);
        }

        function proximoVersiculo() {
            if (btnProximo.disabled) return;
            const ultimoVerCap = versiculosPorCapituloArray[capituloAtual - 1];
            versiculoAtual++;
            if (versiculoAtual > ultimoVerCap) {
                capituloAtual++;
                versiculoAtual = 1;
                if (capituloAtual > versiculosPorCapituloArray.length) {
                    const idxLivro = livrosOrdemGlobal.indexOf(livroAtual);
                    if (idxLivro < livrosOrdemGlobal.length - 1) {
                        livroAtual = livrosOrdemGlobal[idxLivro + 1];
                        atualizarContagemCapitulosParaLivroAtual();
                        capituloAtual = 1;
                        versiculoAtual = 1;
                        carregarCapitulo(capituloAtual);
                    } else {
                        versiculoAtual = ultimoVerCap;
                        capituloAtual = versiculosPorCapituloArray.length;
                        atualizarBotoes();
                        return;
                    }
                } else carregarCapitulo(capituloAtual);
            } else carregarVersiculo(versiculoAtual);
        }

        function voltarVersiculo() {
            if (btnVoltar.disabled) return;
            versiculoAtual--;
            if (versiculoAtual < 1) {
                capituloAtual--;
                if (capituloAtual < 1) {
                    const idxLivro = livrosOrdemGlobal.indexOf(livroAtual);
                    if (idxLivro > 0) {
                        livroAtual = livrosOrdemGlobal[idxLivro - 1];
                        atualizarContagemCapitulosParaLivroAtual();
                        capituloAtual = versiculosPorCapituloArray.length;
                        versiculoAtual = versiculosPorCapituloArray[capituloAtual - 1];
                        carregarCapitulo(capituloAtual);
                    } else {
                        capituloAtual = 1;
                        versiculoAtual = 1;
                        if (livroAtual !== "genesis" || capituloAtual !== 1) carregarCapitulo(1);
                        else carregarVersiculo(1);
                        return;
                    }
                } else {
                    versiculoAtual = versiculosPorCapituloArray[capituloAtual - 1];
                    carregarCapitulo(capituloAtual);
                }
            } else carregarVersiculo(versiculoAtual);
        }

        btnVoltar.addEventListener("click", voltarVersiculo);
        btnProximo.addEventListener("click", proximoVersiculo);
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight" || e.key === "PageDown") proximoVersiculo();
            else if (e.key === "ArrowLeft" || e.key === "PageUp") voltarVersiculo();
            else if (e.key === "Home" && versiculoAtual !== 1) { versiculoAtual = 1; carregarVersiculo(1); }
            else if (e.key === "End" && versiculosPorCapituloArray.length >= capituloAtual) {
                const ultimoVer = versiculosPorCapituloArray[capituloAtual - 1];
                if (versiculoAtual !== ultimoVer) { versiculoAtual = ultimoVer; carregarVersiculo(ultimoVer); }
            }
        });

        atualizarContagemCapitulosParaLivroAtual();
        if (todaContagemDataGlobal[livroAtual] && versiculosPorCapituloArray.length > 0) {
            if (capituloAtual < 1 || capituloAtual > versiculosPorCapituloArray.length) {
                capituloAtual = 1;
                versiculoAtual = 1;
            } else if (versiculoAtual < 1 || versiculoAtual > versiculosPorCapituloArray[capituloAtual - 1]) {
                versiculoAtual = 1;
            }
            carregarCapitulo(capituloAtual);
        } else {
            const livroAcentuado = obterNomeAcentuado(livroAtual);
            if (todaContagemDataGlobal[livroAtual]) {
                tituloElement.innerText = "ERRO";
                versiculoConteiner.innerHTML = '<div class="texto-versiculo" style="color:red;">Falha ao inicializar.</div>';
                btnVoltar.disabled = true;
                btnProximo.disabled = true;
            }
        }
    </script>
</body>
</html>
    `)

  window.janelaSlide.document.close()                                             // Fecha o fluxo de escrita do documento, fazendo com que ele seja renderizado.
  console.log("[slide.js] Conteúdo escrito na janela do slide.")                  // Exibe uma mensagem de sucesso final no console.
}
