/*===============================================================================*/
/*                    MÓDULO DE APRESENTAÇÃO EM SLIDE (POP-UP)                   */
/*===============================================================================*/
/*  Este script é responsável por:                                               */
/*                       - Abrir uma nova janela para o modo de apresentação     */
/*                       - Gerenciar a navegação de versículos nessa nova janela */
/*                       - Carregar dinamicamente o conteúdo bíblico na janela   */
/*                       - Lidar com a navegação por teclado (setas, etc.)       */
/*===============================================================================*/

// Este arquivo é como um "projetor digital" para a Bíblia.
// Imagine que você está em uma igreja ou escola e quer mostrar versículos da Bíblia
// numa tela grande ou projetor. Este arquivo:
// 1. Abre uma nova janela especial (como um PowerPoint)
// 2. Mostra os versículos em letras grandes e bonitas
// 3. Permite navegar com as setas do teclado (← →)
// 4. Carrega automaticamente o texto da Bíblia
// É como ter um "sistema de apresentação profissional" só para versículos bíblicos!

console.log("[slide_biblia.js] Script iniciado.")                                                                        
// ↑ Escreve uma mensagem no console confirmando que este arquivo começou a funcionar

// Esta é uma "tabela de tradução" de nomes de livros.
// O problema: alguns lugares escrevem "Gênesis" (com acento), outros "genesis" (sem acento).
// Esta tabela ajuda o programa a entender que "Gênesis" = "genesis", "Êxodo" = "exodo", etc.
// É como ter um "dicionário" que traduz nomes bonitos para nomes técnicos que o computador entende.

const livroAcentuadosParaSemAcentos = {
    Gênesis: "genesis",           // ↑ "Gênesis" vira "genesis"
    Êxodo: "exodo",               // ↑ "Êxodo" vira "exodo"
    Levítico: "levitico",         // ↑ "Levítico" vira "levitico"
    Números: "numeros",           // ↑ "Números" vira "numeros"
    Deuteronômio: "deuteronomio", // ↑ "Deuteronômio" vira "deuteronomio"
    Josué: "josue",               // ↑ "Josué" vira "josue"
    Juízes: "juizes",             // ↑ "Juízes" vira "juizes"
    Rute: "rute",                 // ↑ "Rute" continua "rute"
    "1Samuel": "1samuel",         // ↑ "1Samuel" vira "1samuel"
    "2Samuel": "2samuel",         // ↑ "2Samuel" vira "2samuel"
    "1Reis": "1reis",             // ↑ "1Reis" vira "1reis"
    "2Reis": "2reis",             // ↑ "2Reis" vira "2reis"
    "1Crônicas": "1cronica",      // ↑ "1Crônicas" vira "1cronica"
    "2Crônicas": "2cronica",      // ↑ "2Crônicas" vira "2cronica"
    Esdras: "esdras",             // ↑ "Esdras" continua "esdras"
    Neemias: "neemias",           // ↑ "Neemias" continua "neemias"
    Ester: "ester",               // ↑ "Ester" continua "ester"
    Jó: "jo",                     // ↑ "Jó" vira "jo"
    Cantares: "cantares",         // ↑ "Cantares" continua "cantares"
    Isaías: "isaias",             // ↑ "Isaías" vira "isaias"
    Jeremias: "jeremias",         // ↑ "Jeremias" continua "jeremias"
    Lamentações: "lamentacoes",   // ↑ "Lamentações" vira "lamentacoes"
    Ezequiel: "ezequiel",         // ↑ "Ezequiel" continua "ezequiel"
    Daniel: "daniel",             // ↑ "Daniel" continua "daniel"
    Oséias: "oseas",              // ↑ "Oséias" vira "oseas"
    Joel: "joel",                 // ↑ "Joel" continua "joel"
    Amós: "amos",                 // ↑ "Amós" vira "amos"
    Obadias: "obadias",           // ↑ "Obadias" continua "obadias"
    Jonas: "jonas",               // ↑ "Jonas" continua "jonas"
    Miquéias: "miqueias",         // ↑ "Miquéias" vira "miqueias"
    Naum: "naum",                 // ↑ "Naum" continua "naum"
    Habacuque: "habacuque",       // ↑ "Habacuque" continua "habacuque"
    Sofonias: "sofonias",         // ↑ "Sofonias" continua "sofonias"
    Ageu: "ageu",                 // ↑ "Ageu" continua "ageu"
    Zacarias: "zacarias",         // ↑ "Zacarias" continua "zacarias"
    Malaquias: "malaquias",       // ↑ "Malaquias" continua "malaquias"
    Mateus: "mateus",             // ↑ "Mateus" continua "mateus"
    Marcos: "marcos",             // ↑ "Marcos" continua "marcos"
    Lucas: "lucas",               // ↑ "Lucas" continua "lucas"
    João: "joao",                 // ↑ "João" vira "joao"
    Atos: "atos",                 // ↑ "Atos" continua "atos"
    Romanos: "romanos",           // ↑ "Romanos" continua "romanos"
    "1Coríntios": "1corintios",   // ↑ "1Coríntios" vira "1corintios"
    "2Coríntios": "2corintios",   // ↑ "2Coríntios" vira "2corintios"
    Gálatas: "galatas",           // ↑ "Gálatas" vira "galatas"
    Efésios: "efesios",           // ↑ "Efésios" vira "efesios"
    Filipenses: "filipenses",     // ↑ "Filipenses" continua "filipenses"
    Colossenses: "colossenses",   // ↑ "Colossenses" continua "colossenses"
    "1Tessalonicenses": "1tessalonicenses", // ↑ "1Tessalonicenses" continua igual
    "2Tessalonicenses": "2tessalonicenses", // ↑ "2Tessalonicenses" continua igual
    "1Timóteo": "1timoteo",       // ↑ "1Timóteo" vira "1timoteo"
    "2Timóteo": "2timoteo",       // ↑ "2Timóteo" vira "2timoteo"
    Tito: "tito",                 // ↑ "Tito" continua "tito"
    Filemom: "filemom",           // ↑ "Filemom" continua "filemom"
    Hebreus: "hebreus",           // ↑ "Hebreus" continua "hebreus"
    Tiago: "tiago",               // ↑ "Tiago" continua "tiago"
    "1Pedro": "1pedro",           // ↑ "1Pedro" vira "1pedro"
    "2Pedro": "2pedro",           // ↑ "2Pedro" vira "2pedro"
    "1João": "1joao",             // ↑ "1João" vira "1joao"
    "2João": "2joao",             // ↑ "2João" vira "2joao"
    "3João": "3joao",             // ↑ "3João" vira "3joao"
    Judas: "judas",               // ↑ "Judas" continua "judas"
    Apocalipse: "apocalipse",     // ↑ "Apocalipse" continua "apocalipse"
}

/* BLOCO: Estrutura de dados principal com a contagem de versículos por capítulo                */
const baseLivros = {                                                                                                     /* Inicia objeto de contagem         */
    genesis: { 1: 31, 2: 25, 3: 24, 4: 26, 5: 32, 6: 22, 7: 24, 8: 22, 9: 29, 10: 32, 11: 32, 12: 20, 13: 18, 14: 24, 15: 21, 16: 16, 17: 27, 18: 33, 19: 38, 20: 18, 21: 34, 22: 24, 23: 20, 24: 67, 25: 34, 26: 35, 27: 46, 28: 22, 29: 35, 30: 43, 31: 55, 32: 32, 33: 20, 34: 31, 35: 29, 36: 43, 37: 36, 38: 30, 39: 23, 40: 23, 41: 57, 42: 38, 43: 34, 44: 34, 45: 28, 46: 34, 47: 31, 48: 22, 49: 33, 50: 26 },
    exodo: { 1: 22, 2: 25, 3: 22, 4: 31, 5: 23, 6: 30, 7: 25, 8: 32, 9: 35, 10: 29, 11: 10, 12: 37, 13: 22, 14: 31, 15: 27, 16: 36, 17: 16, 18: 27, 19: 29, 20: 26, 21: 36, 22: 31, 23: 33, 24: 18 },
    levitico: { 1: 17, 2: 16, 3: 17, 4: 35, 5: 19, 6: 30, 7: 38, 8: 36, 9: 24, 10: 20, 11: 47, 12: 8, 13: 59, 14: 57, 15: 33, 16: 34, 17: 16, 18: 30, 19: 37, 20: 27, 21: 24, 22: 33, 23: 44, 24: 23, 25: 55, 26: 46, 27: 34 },
    numeros: { 1: 54, 2: 34, 3: 51, 4: 42, 5: 31, 6: 27, 7: 89, 8: 26, 9: 23, 10: 36, 11: 35, 12: 16, 13: 33, 14: 45, 15: 41, 16: 50, 17: 13, 18: 32, 19: 22, 20: 29, 21: 35, 22: 41, 23: 30, 24: 25, 25: 18, 26: 65, 27: 23, 28: 31, 29: 40, 30: 16, 31: 54, 32: 42, 33: 56, 34: 29, 35: 15, 36: 13 },
    deuteronomio: { 1: 46, 2: 37, 3: 29, 4: 49, 5: 33, 6: 25, 7: 26, 8: 20, 9: 29, 10: 22, 11: 32, 12: 31, 13: 18, 14: 29, 15: 23, 16: 22, 17: 20, 18: 22, 19: 21, 20: 20, 21: 23, 22: 30, 23: 25, 24: 22, 25: 19, 26: 19, 27: 26, 28: 68, 29: 8, 30: 20, 31: 30, 32: 49, 33: 29, 34: 12 },
    josue: { 1: 18, 2: 24, 3: 17, 4: 24, 5: 15, 6: 27, 7: 26, 8: 35, 9: 27, 10: 43, 11: 23, 12: 24, 13: 33, 14: 15, 15: 63, 16: 10, 17: 18, 18: 28, 19: 51, 20: 9, 21: 45, 22: 34, 23: 16, 24: 33 },
    juizes: { 1: 36, 2: 23, 3: 31, 4: 24, 5: 31, 6: 40, 7: 25, 8: 32, 9: 57, 10: 18, 11: 40, 12: 15, 13: 25, 14: 20, 15: 20, 16: 31, 17: 13, 18: 31, 19: 30, 20: 48, 21: 25 },
    rute: { 1: 22, 2: 23, 3: 18, 4: 22 },
    "1samuel": { 1: 28, 2: 36, 3: 21, 4: 22, 5: 12, 6: 21, 7: 17, 8: 22, 9: 27, 10: 27, 11: 15, 12: 25, 13: 23, 14: 52, 15: 35, 16: 23, 17: 58, 18: 30, 19: 24, 20: 42, 21: 15, 22: 23, 23: 29, 24: 22, 25: 44, 26: 25, 27: 12, 28: 25, 29: 11, 30: 31, 31: 13 },
    "2samuel": { 1: 27, 2: 32, 3: 39, 4: 12, 5: 25, 6: 23, 7: 29, 8: 18, 9: 13, 10: 19, 11: 27, 12: 31, 13: 39, 14: 33, 15: 37, 16: 23, 17: 27, 18: 17, 19: 43, 20: 26, 21: 22, 22: 51, 23: 39, 24: 25 },
    "1reis": { 1: 53, 2: 46, 3: 28, 4: 34, 5: 18, 6: 38, 7: 51, 8: 66, 9: 28, 10: 29, 11: 43, 12: 31, 13: 34, 14: 31, 15: 34, 16: 34, 17: 24, 18: 46, 19: 21, 20: 43, 21: 29, 22: 53 },
    "2reis": { 1: 18, 2: 25, 3: 27, 4: 44, 5: 27, 6: 33, 7: 20, 8: 29, 9: 37, 10: 36, 11: 21, 12: 21, 13: 25, 14: 29, 15: 30, 16: 20, 17: 41, 18: 37, 19: 37, 20: 21, 21: 26, 22: 20, 23: 37, 24: 20, 25: 30 },
    "1cronica": { 1: 54, 2: 55, 3: 24, 4: 43, 5: 26, 6: 81, 7: 40, 8: 40, 9: 44, 10: 14, 11: 47, 12: 40, 13: 14, 14: 17, 15: 29, 16: 43, 17: 27, 18: 17, 19: 19, 20: 8, 21: 30, 22: 19, 23: 32, 24: 31, 25: 31, 26: 32, 27: 34, 28: 21, 29: 30 },
    "2cronica": { 1: 18, 2: 17, 3: 17, 4: 22, 5: 14, 6: 42, 7: 22, 8: 18, 9: 31, 10: 19, 11: 23, 12: 16, 13: 22, 14: 14, 15: 19, 16: 14, 17: 19, 18: 34, 19: 11, 20: 37, 21: 20, 22: 12, 23: 32, 24: 27, 25: 28, 26: 23, 27: 9, 28: 27, 29: 36, 30: 27, 31: 21, 32: 33, 33: 25, 34: 33, 35: 27, 36: 23 },
    esdras: { 1: 11, 2: 70, 3: 13, 4: 24, 5: 17, 6: 22, 7: 28, 8: 36, 9: 15, 10: 44 },
    neemias: { 1: 11, 2: 20, 3: 32, 4: 23, 5: 19, 6: 19, 7: 73, 8: 18, 9: 38, 10: 39, 11: 36, 12: 47, 13: 31 },
    ester: { 1: 22, 2: 23, 3: 15, 4: 17, 5: 14, 6: 14, 7: 10, 8: 17, 9: 32, 10: 3 },
    jo: { 1: 22, 2: 13, 3: 26, 4: 21, 5: 27, 6: 21, 7: 21, 8: 22, 9: 35, 10: 22, 11: 20, 12: 25, 13: 27, 14: 22, 15: 35, 16: 22, 17: 16, 18: 21, 19: 29, 20: 30, 21: 34, 22: 30, 23: 17, 24: 25, 25: 6, 26: 14, 27: 23, 28: 28, 29: 25, 30: 31, 31: 40, 32: 22, 33: 33, 34: 37, 35: 16, 36: 33, 37: 24, 38: 41, 39: 30, 40: 24, 41: 34, 42: 17 },
    cantares: { 1: 17, 2: 17, 3: 11, 4: 16, 5: 16, 6: 13, 7: 13, 8: 14 },
    isaias: { 1: 31, 2: 22, 3: 26, 4: 6, 5: 30, 6: 13, 7: 25, 8: 22, 9: 21, 10: 34, 11: 16, 12: 6, 13: 22, 14: 32, 15: 9, 16: 14, 17: 14, 18: 7, 19: 25, 20: 6, 21: 17, 22: 25, 23: 18, 24: 23, 25: 12, 26: 21, 27: 13, 28: 29, 29: 24, 30: 33, 31: 9, 32: 20, 33: 24, 34: 17, 35: 10, 36: 22, 37: 38, 38: 22, 39: 8, 40: 31, 41: 29, 42: 25, 43: 28, 44: 28, 45: 25, 46: 13, 47: 15, 48: 22, 49: 26, 50: 11, 51: 23, 52: 15, 53: 12, 54: 17, 55: 13, 56: 12, 57: 21, 58: 14, 59: 21, 60: 22, 61: 11, 62: 12, 63: 19, 64: 12, 65: 25, 66: 24 },
    jeremias: { 1: 19, 2: 37, 3: 25, 4: 31, 5: 31, 6: 30, 7: 34, 8: 22, 9: 26, 10: 25, 11: 23, 12: 17, 13: 27, 14: 29, 15: 21, 16: 21, 17: 27, 18: 23, 19: 15, 20: 18, 21: 14, 22: 30, 23: 40, 24: 10, 25: 38, 26: 20, 27: 21, 28: 17, 29: 32, 30: 24, 31: 40, 32: 44, 33: 26, 34: 22, 35: 19, 36: 32, 37: 20, 38: 28, 39: 18, 40: 16, 41: 18, 42: 22, 43: 13, 44: 30, 45: 5, 46: 28, 47: 7, 48: 47, 49: 39, 50: 46, 51: 64, 52: 34 },
    lamentacoes: { 1: 22, 2: 22, 3: 66, 4: 22, 5: 22 },
    ezequiel: { 1: 28, 2: 10, 3: 27, 4: 17, 5: 17, 6: 14, 7: 27, 8: 18, 9: 11, 10: 22, 11: 26, 12: 28, 13: 23, 14: 23, 15: 8, 16: 63, 17: 24, 18: 32, 19: 14, 20: 49, 21: 32, 22: 31, 23: 49, 24: 27, 25: 17, 26: 21, 27: 36, 28: 26, 29: 15, 30: 26, 31: 17, 32: 32, 33: 33, 34: 31, 35: 17, 36: 38, 37: 28, 38: 23, 39: 29, 40: 49, 41: 26, 42: 20, 43: 27, 44: 31, 45: 25, 46: 20, 47: 23, 48: 35 },
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
    mateus: { 1: 25, 2: 23, 3: 17, 4: 25, 5: 48, 6: 34, 7: 29, 8: 34, 9: 38, 10: 42, 11: 30, 12: 50, 13: 53, 14: 36, 15: 39, 16: 28, 17: 27, 18: 35, 19: 30, 20: 34, 21: 46, 22: 46, 23: 39, 24: 51, 25: 46, 26: 75, 27: 66, 28: 20 },
    marcos: { 1: 45, 2: 28, 3: 35, 4: 41, 5: 43, 6: 56, 7: 37, 8: 38, 9: 50, 10: 52, 11: 33, 12: 44, 13: 37, 14: 72, 15: 47, 16: 20 },
    lucas: { 1: 80, 2: 52, 3: 38, 4: 44, 5: 39, 6: 49, 7: 50, 8: 56, 9: 62, 10: 42, 11: 54, 12: 59, 13: 35, 14: 35, 15: 32, 16: 31, 17: 37, 18: 43, 19: 48, 20: 47, 21: 38, 22: 71, 23: 56, 24: 53 },
    joao: { 1: 51, 2: 25, 3: 36, 4: 54, 5: 47, 6: 71, 7: 53, 8: 59, 9: 41, 10: 42, 11: 57, 12: 50, 13: 38, 14: 31, 15: 27, 16: 33 },
    atos: { 1: 26, 2: 47, 3: 26, 4: 37, 5: 42, 6: 15, 7: 60, 8: 40, 9: 31, 10: 48, 11: 30, 12: 25, 13: 52, 14: 28, 15: 41, 16: 40, 17: 34, 18: 28, 19: 41, 20: 38, 21: 40, 22: 30, 23: 35, 24: 27, 25: 27, 26: 32, 27: 44, 28: 31 },
    romanos: { 1: 32, 2: 29, 3: 31, 4: 25, 5: 21, 6: 23, 7: 25, 8: 39, 9: 33, 10: 21, 11: 36, 12: 21, 13: 14, 14: 23, 15: 33, 16: 27 },
    "1corintios": { 1: 31, 2: 16, 3: 23, 4: 21, 5: 13, 6: 20, 7: 40, 8: 13, 9: 27, 10: 33, 11: 34, 12: 31, 13: 13, 14: 40, 15: 58, 16: 24 },
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
    apocalipse: { 1: 20, 2: 29, 3: 22, 4: 11, 5: 14, 6: 17, 7: 17, 8: 13, 9: 21, 10: 11, 11: 19, 12: 17, 13: 18, 14: 20, 15: 8, 16: 21, 17: 18, 18: 24, 19: 21, 20: 15, 21: 27, 22: 21 },
}    


/* BLOCO: Associa a estrutura de dados base a todas as versões da Bíblia disponíveis            */
const contagemVersiculosPorVersao = {                                                                                    /* Inicia mapa de traduções    */
    acf: baseLivros,                                                                                                     /* Versão Almeida Corrigida    */
    ara: baseLivros,                                                                                                     /* Versão Almeida Revista      */
    nvi: baseLivros,                                                                                                     /* Versão Nova Internacional   */
    kjv: baseLivros,                                                                                                     /* Versão King James           */
    arc: baseLivros,                                                                                                     /* Versão Almeida Revista      */
    ntlh: baseLivros,                                                                                                    /* Versão Linguagem de Hoje    */
    naa: baseLivros,                                                                                                     /* Versão Nova Almeida         */
    original: baseLivros,                                                                                                /* Versão Texto Original       */
};

/* BLOCO: Define a ordem canônica dos livros da Bíblia para a navegação sequencial              */
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
];

/* BLOCO: Função para normalizar qualquer nome de livro para o formato interno (sem acentos)    */
function normalizarNomeLivro(nome) {                                                                                     /* Inicia normalização         */
    const nomeLower = nome.toLowerCase()                                                                                 /* Converte para minúsculas    */
    const semAcentos = Object.keys(livroAcentuadosParaSemAcentos).find(                                                  /* Varre o mapa de nomes       */
        (key) => key.toLowerCase() === nomeLower,                                                                        /* Busca chave correspondente  */
    )
    if (semAcentos) {
        return livroAcentuadosParaSemAcentos[semAcentos]                                                                 /* Retorna o ID padrão         */
    }
    return (
        Object.keys(livroAcentuadosParaSemAcentos).find(
            (key) => livroAcentuadosParaSemAcentos[key] === nomeLower,                                                   /* Busca por valor inverso     */
        ) || nomeLower
    )                                                                                                                    /* Fallback nome original      */
}

/* BLOCO: Função para recuperar o nome do livro com acentos para exibição na interface          */
function obterNomeAcentuado(nomeSemAcento) {                                                                             /* Inicia busca acentuada      */
    return (
        Object.keys(livroAcentuadosParaSemAcentos).find(
            (key) => livroAcentuadosParaSemAcentos[key] === nomeSemAcento,                                               /* Localiza chave original     */
        ) || nomeSemAcento
    )                                                                                                                    /* Fallback nome recebido      */
}

/* BLOCO: Inicializa o escutador de eventos do link 'Slide' na página principal                 */
function inicializarSlide() {                                                                                            /* Inicia configuração slide   */
    console.log("[slide.js] Configurando listener do link 'Slide'.")                                                     /* Log de inicialização        */
    const linksHeader = document.querySelectorAll("header nav ul li a")                                                  /* Captura links do topo       */
    let linkSlideEncontrado = null                                                                                       /* Var auxiliar de busca       */
    linksHeader.forEach((link) => {                                                                                      /* Percorre links header       */
        if (link.textContent.trim().toLowerCase() === "slide") {                                                         /* Busca texto exato "slide"   */
            linkSlideEncontrado = link                                                                                   /* Atribui link encontrado     */
        }
    })

    /* BLOCO: Configura a ação de clique para o botão que abre o slide                          */
    if (linkSlideEncontrado) {                                                                                           /* Verifica se link existe     */
        linkSlideEncontrado.addEventListener("click", (event) => {                                                       /* Ouve o clique do usuário    */
            event.preventDefault()                                                                                       /* Cancela ação de âncora      */
            console.log("[slide.js] Link 'Slide' clicado.")                                                              /* Log de comando usuário      */
          
            /* BLOCO: Captura os parâmetros de versão e posição da leitura atual                */
            const urlParams = new URLSearchParams(window.location.search)                                                /* Lê parâmetros da URL        */
            const versao = window.BIBLE_VERSION || urlParams.get("version") || "arc"                                     /* Identifica tradução ativa   */
            let livro = window.activeLivro || "genesis"                                                                  /* Identifica livro carregado  */
            const cap = window.activeCapitulo || 1                                                                       /* Identifica capítulo ativo   */
            const versBtn = window.activeVersiculoButton                                                                 /* Captura botão versículo     */
            const versNum = versBtn
                ? Number.parseInt(versBtn.dataset.versiculo, 10) || Number.parseInt(versBtn.textContent.trim(), 10) || 1
                : 1                                                                                                      /* Define índice versículo     */

            /* BLOCO: Verifica se há dados básicos selecionados para abrir o slide              */
            if (!livro || !cap) {                                                                                        /* Checa seleção necessária    */
                alert("Por favor, selecione um livro e capítulo primeiro.")                                              /* Orienta o usuário           */
                console.warn("[slide.js] Tentativa de abertura sem seleção ativa.")                                      /* Log de aviso técnico        */
                return                                                                                                   /* Aborta a abertura           */
            }

            livro = normalizarNomeLivro(livro)                                                                           /* Padroniza ID do livro       */
            console.log(
                `[slide.js] Estado para slide: Versão=${versao}, Livro=${livro}, Cap=${cap}, VersNum=${versNum}`,
            )                                                                                                            /* Log de dados prontos        */
            abrirJanelaSlide(livro, cap, versNum, versao)                                                                /* Dispara janela pop-up       */
        })
    } else {
        console.warn("[slide.js] Link 'Slide' não encontrado no cabeçalho.")                                             /* Log falha de elemento       */
    }
} 
window.inicializarSlide = inicializarSlide                                                                               /* Exporta para escopo global  */

/* BLOCO: Garante que a configuração do Slide ocorra após o carregamento completo do DOM        */
document.addEventListener("DOMContentLoaded", () => {                                                                    /* Monitora carga do site      */
    if (typeof inicializarSlide === "function") {                                                                        /* Verifica integridade função */
        inicializarSlide()                                                                                               /* Ativa o sistema de slide    */
    } else {
        console.error("[slide.js] inicializarSlide não definida no DOMContentLoaded.")                                   /* Log erro de carregamento    */
    }
})

/* BLOCO: Função principal que abre e configura a nova janela pop-up para apresentação de slide */
async function abrirJanelaSlide(livroAtual, capituloAtual, versiculoAtual, versaoAtual) {                                /* Inicia motor de pop-up      */
    console.log(
        `[slide.js] Tentando abrir slide para: ${versaoAtual.toUpperCase()} ${livroAtual} ${capituloAtual}:${versiculoAtual}`,
    )                                                                                                                    /* Log de intenção abertura    */
    
    /* BLOCO: Realiza a validação de parâmetros essenciais antes de abrir a janela              */
    if (!livroAtual || !capituloAtual || !versiculoAtual || !versaoAtual) {                                              /* Valida dados de entrada     */
        alert("Dados insuficientes para abrir o slide. Verifique a seleção.")                                            /* Notifica usuário falha      */
        console.warn("[slide.js] Tentativa com dados insuficientes:", {
            livroAtual,
            capituloAtual,
            versiculoAtual,
            versaoAtual,
        })                                                                                                               /* Log detalhado do erro       */
        return                                                                                                           /* Interrompe o processo       */
    }

    /* BLOCO: Verifica se já existe uma janela aberta para evitar duplicidade                   */
    livroAtual = normalizarNomeLivro(livroAtual)                                                                         /* Sincroniza ID livro         */
    if (window.janelaSlide && !window.janelaSlide.closed) {                                                              /* Verifica janela ativa       */
        window.janelaSlide.focus()                                                                                       /* Traz janela para frente     */
        console.log("[slide.js] Janela do slide já estava aberta. Focando.")                                             /* Log de reutilização         */
        return                                                                                                           /* Sai sem abrir nova          */
    }

    const largura = window.screen.availWidth                                                                             /* Pega largura do monitor     */
    const altura = window.screen.availHeight                                                                             /* Pega altura do monitor      */

    /* BLOCO: Inicializa a abertura do pop-up e valida se foi bloqueado pelo browser            */
    window.janelaSlide = window.open(
        "",
        "JanelaSlide",
        `width=${largura},height=${altura},menubar=no,toolbar=no,location=no,status=no`,
    )                                                                                                                    /* Instancia objeto window     */
    if (!window.janelaSlide || window.janelaSlide.closed) {                                                              /* Valida permissão pop-up     */
        alert("Não foi possível abrir a janela do slide. Desative o bloqueador de pop-ups.")                             /* Instrução bloqueio          */
        console.error("[slide.js] Falha ao abrir a janela pop-up.")                                                      /* Log erro de permissão       */
        return                                                                                                           /* Aborta operação             */
    }

    console.log("[slide.js] Janela pop-up aberta com sucesso.")                                                          /* Log de sucesso operacional  */

    /* BLOCO: Valida a configuração de contagem de versículos da versão ativa                   */
    const todaContagemDaVersao = contagemVersiculosPorVersao[versaoAtual]                                                /* Recupera mapa de versículos */
    if (!todaContagemDaVersao || Object.keys(todaContagemDaVersao).length === 0) {
        console.error(`[slide.js] Contagem não encontrada para ${versaoAtual.toUpperCase()}`)                            /* Log erro de arquivo config  */
        window.janelaSlide.close()                                                                                       /* Auto-destrói pop-up vazio   */
        alert(`Erro interno: Configuração de versículos ausente para ${versaoAtual.toUpperCase()}.`)                     /* Notifica erro crítico       */
        return                                                                                                           /* Interrompe fluxo            */
    }

    /* BLOCO: Confirma a existência do livro específico na configuração carregada               */
    if (!todaContagemDaVersao[livroAtual]) {
        console.error(
            `[slide.js] Livro '${livroAtual}' não encontrado na contagem para ${versaoAtual.toUpperCase()}`,
        )                                                                                                                /* Log erro de mapeamento livro*/
        window.janelaSlide.close()                                                                                       /* Fecha pop-up inconsistente  */
        alert(`Erro interno: Livro '${livroAtual}' não encontrado na configuração.`)                                     /* Notifica usuário erro livro */
        return                                                                                                           /* Interrompe fluxo            */
    }

    /* BLOCO: Prepara os dados técnicos para injeção no ambiente da nova janela                 */
    const todaContagemJSON = JSON.stringify(todaContagemDaVersao)                                                        /* Serializa mapa versos       */
    const livrosOrdemJSON = JSON.stringify(livrosOrdem)                                                                  /* Serializa lista canônica    */
    const livroAcentuado = obterNomeAcentuado(livroAtual)                                                                /* Obtém nome legível livro    */
    const livroAcentuadosJSON = JSON.stringify(livroAcentuadosParaSemAcentos)                                            /* Serializa tradutor nomes    */

    const cssLink = versaoAtual === "original" ? '<link rel="stylesheet" href="../css/versoes.css">' : ""                /* Estilo condicional          */

    window.janelaSlide.document.open()                                                                                   /* Inicia escrita no pop-up    */
    window.janelaSlide.document.write(`
<!DOCTYPE html>                                                                                                          <!-- Inicia documento slide    -->
<html lang="pt-BR">                                                                                                      <!-- Idioma Português          -->
<head>                                                                                                                   <!-- Inicia cabeçalho          -->
    <title>Bíblia Slide - \${versaoAtual.toUpperCase()}</title>                                                          <!-- Título dinâmico aba       -->
    <meta charset="UTF-8">                                                                                               <!-- Codificação UTF-8         -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">                                               <!-- Ajuste escala visual      -->
    <link rel="stylesheet" href="../css/slide_biblia.css">                                                               <!-- Importa CSS mestre slide  -->
    \${cssLink}                                                                                                          <!-- Injeta CSS extra versão   -->
</head>
<body>                                                                                                                   <!-- Inicia corpo              -->
    <div id="popup-bem-vindo" class="popup-overlay">                                                                     <!-- Overlay boas vindas       -->
        <div class="popup-conteudo">                                                                                     <!-- Caixa informativa         -->
            <h2>SEJA BEM VINDO</h2>                                                                                      <!-- Texto destaque            -->
            <button id="fechar-popup">Fechar</button>                                                                    <!-- Gatilho remoção overlay   -->
        </div>
    </div>
    <div id="marcadagua"></div>                                                                                          <!-- Camada fundo decorativa   -->
    <div id="titulo">\${livroAcentuado.toUpperCase()} \${capituloAtual}:\${versiculoAtual}</div>                         <!-- Cabeçalho do slide atual  -->
    <div id="versiculo-conteiner"><div class="texto-versiculo">Carregando...</div></div>                                 <!-- Local do texto bíblico    -->
    <div id="botao-conteiner">                                                                                           <!-- Barra controles inferior  -->
        <button id="voltar-botao">‹ Anterior</button>                                                                    <!-- Botão retroceder          -->
        <button id="proximo-botao">Próximo ›</button>                                                                    <!-- Botão avançar             -->
    </div>

    <script>
        /* BLOCO: Inicializa as variáveis de estado internas da janela do slide                 */
        let livroAtual = '\${livroAtual}';                                                                               /* Identificador ID livro      */
        let capituloAtual = \${capituloAtual};                                                                           /* Índice do capítulo          */
        let versiculoAtual = \${versiculoAtual};                                                                         /* Índice do versículo         */
        const versaoBiblia = '\${versaoAtual}';                                                                          /* Identificador tradução      */
        let dadosCapitulo = null;                                                                                        /* Buffer dados capítulo       */

        /* BLOCO: Analisa e converte os dados JSON recebidos da janela principal                */
        const todaContagemDataGlobal = JSON.parse('\${todaContagemJSON}');                                               /* Banco versículos            */
        const livrosOrdemGlobal = JSON.parse('\${livrosOrdemJSON}');                                                     /* Lista ordem canônica        */
        let versiculosPorCapituloArray = [];                                                                             /* Array referência rápida     */
        
        /* BLOCO: Mapeia as referências dos elementos da interface para manipulação             */
        const tituloElement = document.getElementById('titulo');                                                         /* Ref título slide            */
        const versiculoConteiner = document.getElementById('versiculo-conteiner');                                       /* Ref área texto              */
        const btnVoltar = document.getElementById('voltar-botao');                                                       /* Ref botão recuo             */
        const btnProximo = document.getElementById('proximo-botao');                                                     /* Ref botão avanço            */
        const popup = document.getElementById('popup-bem-vindo');                                                        /* Ref camada popup            */
        const fecharPopup = document.getElementById('fechar-popup');                                                     /* Ref gatilho popup           */

        fecharPopup.addEventListener('click', () => {                                                                    /* Listener fechamento popup   */
            popup.style.display = 'none';                                                                                /* Oculta interface popup      */
        });

        /* BLOCO: Define a extensão do arquivo baseada no formato da bíblia ativa               */
        const jsonFileVersions = ['ara', 'nvi', 'acf', 'ntlh', 'kjv', 'naa', 'original'];                                /* Mapeia bíblias JSON         */
        const isJsonFile = jsonFileVersions.includes(versaoBiblia);                                                      /* Define tipo carga           */
        const fileExtension = isJsonFile ? 'json' : 'html';                                                              /* Define sufixo arquivo       */

        /* BLOCO: Função interna para normalizar nomes de livros no ambiente pop-up             */
        function normalizarNomeLivro(nome) {
            const semAcentos = \${livroAcentuadosJSON};                                                                  /* Mapa acentos local          */
            const nomeLower = nome.toLowerCase();                                                                        /* Texto para minúsculas       */
            const keyAcentuada = Object.keys(semAcentos).find(key => key.toLowerCase() === nomeLower);                   /* Localiza ID                 */
            if (keyAcentuada) return semAcentos[keyAcentuada];                                                           /* Entrega ID limpo            */
            const keySemAcento = Object.keys(semAcentos).find(key => semAcentos[key].toLowerCase() === nomeLower);       /* Localiza ID reverso         */
            return keySemAcento ? semAcentos[keySemAcento] : nome;                                                       /* Entrega ID encontrado       */
        }

        /* BLOCO: Função interna para obter nomes acentuados para o título do slide             */
        function obterNomeAcentuado(nomeSemAcento) {
            const semAcentos = \${livroAcentuadosJSON};                                                                  /* Mapa nomes local            */
            return Object.keys(semAcentos).find(key => semAcentos[key] === nomeSemAcento) || nomeSemAcento;              /* Entrega nome legível        */
        }

        /* BLOCO: Sincroniza a quantidade de versículos do capítulo atual lido                  */
        function atualizarContagemCapitulosParaLivroAtual() {
            const contagemCapitulosObj = todaContagemDataGlobal[livroAtual];                                             /* Captura dados livro         */
            if (contagemCapitulosObj) {
                versiculosPorCapituloArray = Object.keys(contagemCapitulosObj)                                           /* Captura índices caps        */
                    .map(capNumStr => parseInt(capNumStr, 10))                                                           /* Converte em inteiro         */
                    .sort((a, b) => a - b)                                                                               /* Garante ordem numérica      */
                    .map(capNum => contagemCapitulosObj[capNum.toString()]);                                             /* Gera array de versículos    */
            } else {
                
                /* BLOCO: Trata falha crítica quando o mapeamento de capítulos falha            */
                console.error('Contagem não encontrada para ' + livroAtual + ' (' + versaoBiblia + ').');                /* Log erro técnico            */
                versiculosPorCapituloArray = [];                                                                         /* Esvazia array               */
                tituloElement.innerText = "ERRO CONFIG";                                                                 /* Feedback visual erro        */
                versiculoConteiner.innerHTML = '<div class="texto-versiculo" style="color:red;">Config ausente.</div>';  /* Alerta visual crítico       */
                btnVoltar.disabled = true;                                                                               /* Inativa navegação           */
                btnProximo.disabled = true;                                                                              /* Inativa navegação           */
            }
        }

        /* BLOCO: Função assíncrona para buscar o conteúdo textual do capítulo                  */
        async function carregarCapitulo(capituloNum) {
            const caminho = '../versao/' + versaoBiblia + '/' + livroAtual + '/' + capituloNum + '.' + fileExtension;    /* Constrói endereço carga     */
            console.log('Carregando capítulo: ' + caminho);                                                              /* Log endereço carga          */
            const livroAcentuado = obterNomeAcentuado(livroAtual);                                                       /* Nome bonito livro           */
            tituloElement.innerText = livroAcentuado.toUpperCase() + ' ' + capituloNum + ':... (Carregando)';            /* Feedback carga título       */
            versiculoConteiner.innerHTML = '<div class="texto-versiculo">Carregando capítulo...</div>';                  /* Feedback carga área texto   */
            btnVoltar.disabled = true;                                                                                   /* Trava botões carga          */
            btnProximo.disabled = true;                                                                                  /* Trava botões carga          */

            /* BLOCO: Executa a requisição fetch e processa o retorno HTML ou JSON              */
            try {
                const response = await fetch(caminho);                                                                   /* Baixa o arquivo             */
                if (!response.ok) throw new Error('HTTP ' + response.status + ' em ' + caminho);                         /* Valida HTTP status          */
                dadosCapitulo = isJsonFile ? await response.json() : new DOMParser().parseFromString(await response.text(), 'text/html');
                console.log('Capítulo ' + (isJsonFile ? 'JSON' : 'HTML') + ' carregado.');                               /* Log sucesso técnico         */
                carregarVersiculo(versiculoAtual);                                                                       /* Exibe versículo alvo        */
            } catch (error) {
                console.error('Erro ao carregar capítulo:', error);                                                      /* Log falha técnica           */
                tituloElement.innerText = 'ERRO ' + livroAcentuado.toUpperCase() + ' ' + capituloNum;                    /* Título erro visual          */
                versiculoConteiner.innerHTML = '<div class="texto-versiculo" style="color:red;font-size:1.2rem;">Falha.</div>';
            }
        }

        /* BLOCO: Função para extrair e exibir o texto de um versículo específico               */
        function carregarVersiculo(versiculoNum) {
            console.log('Carregando ' + livroAtual + ' ' + capituloAtual + ':' + versiculoNum);                          /* Log posição leitura         */
            let conteudo = "", tituloSecao = "";                                                                         /* Buffers texto               */
            const livroAcentuado = obterNomeAcentuado(livroAtual);                                                       /* Nome legível                */

            /* BLOCO: Verifica a integridade dos dados carregados antes de exibir               */
            if (!dadosCapitulo) {
                versiculoConteiner.innerHTML = '<div class="texto-versiculo" style="color:orange;">Sem dados.</div>';    /* Alerta inconsistência       */
                atualizarBotoes();                                                                                       /* Checa limites               */
                return;                                                                                                  /* Aborta função               */
            }

            /* BLOCO: Executa a lógica de extração para arquivos em formato JSON                */
            if (isJsonFile) {
                const capituloData = Array.isArray(dadosCapitulo) ? dadosCapitulo[0] : dadosCapitulo;                    /* Normaliza estrutura JSON    */

                /* BLOCO: Localiza o versículo alvo dentro do objeto de dados JSON              */
                if (capituloData.versiculos && capituloData.versiculos[versiculoNum]) {
                    const versiculoData = capituloData.versiculos[versiculoNum];                                         /* Isola conteúdo verso        */

                    /* BLOCO: Recupera o título da seção se disponível no arquivo JSON          */
                    if (capituloData.titulos && capituloData.titulos[versiculoNum]) {
                        tituloSecao = '<strong class="section-title">' + capituloData.titulos[versiculoNum] + "</strong>";/* Cabeçalho de trecho        */
                    }

                    /* BLOCO: Processa o formato interlinear exclusivo da versão Original       */
                    if (versaoBiblia === "original" && typeof versiculoData === "object" && versiculoData.traducao_completa) {
                        conteudo = '<p id="versiculo-' + versiculoNum + '" class="traducao-completa">' + versiculoData.traducao_completa + "</p>";

                        /* BLOCO: Constrói a lista de palavras originais com transliteração     */
                        if (versiculoData.palavras && versiculoData.palavras.length > 0) {
                            conteudo += '<div class="palavras-container">';                                              /* Abre lista palavras         */
                            versiculoData.palavras.forEach((palavra) => {
                                conteudo += '<div class="word-detail-item">' +
                                    '<div class="hebraico-text">' + (palavra.hebraico || '') + "</div>" +
                                    '<div class="transliteral-text">' + (palavra.transliteral || '') + "</div>" +
                                    '<div class="traducao-palavra-text">' + (palavra.traducao_palavra || '') + "</div>" +
                                    "</div>";                                                                            
                            });
                            conteudo += "</div>";
                        }
                    } else if (typeof versiculoData === "object" && versiculoData.traducao_completa) {
                        conteudo = versiculoData.traducao_completa;                                                      /* Tradução direta             */
                    } else if (typeof versiculoData === "string") {
                        conteudo = versiculoData;                                                                        /* Texto puro                  */
                    } else {
                        conteudo = "Formato não reconhecido.";                                                           /* Erro estrutural             */
                    } 
                } else conteudo = "Versículo não encontrado (JSON).";                                                    /* Erro localização            */
            } else {

              /* BLOCO: Executa a lógica de extração para arquivos em formato HTML              */
              const el = dadosCapitulo.querySelector('#versiculo-' + versiculoNum);                                      /* Busca DIV específica        */
                if (el) {
                    const strongChild = Array.from(el.children).find((c) => c.tagName === "STRONG");                     /* Busca subtítulo             */
                    if (strongChild && el.textContent.trim().startsWith(strongChild.textContent.trim())) {
                        tituloSecao = '<strong class="section-title">' + strongChild.innerHTML + "</strong>";            /* Define Título HTML          */
                        const temp = document.createElement("div");                                                      /* Temp buffer DOM             */
                        temp.innerHTML = el.innerHTML;                                                                   /* Copia conteúdo              */
                        const firstStrong = temp.querySelector("strong");                                                /* Localiza Strong             */
                        if (firstStrong && temp.innerHTML.trim().startsWith(firstStrong.outerHTML.trim())) firstStrong.remove();
                        conteudo = temp.innerHTML.trim();                                                                /* Texto HTML filtrado         */
                    } else conteudo = el.innerHTML.trim();                                                               /* Texto HTML bruto            */
                    if (!conteudo && el.textContent) conteudo = el.textContent.trim();                                   /* Fallback texto puro         */
                } else conteudo = "Versículo não encontrado (HTML).";                                                    /* Erro localização HTML       */
            }

            /* BLOCO: Atualiza a interface visual com o novo conteúdo carregado                 */
            tituloElement.innerText = livroAcentuado.toUpperCase() + ' ' + capituloAtual + ':' + versiculoNum;           /* Atualiza título topo        */
            versiculoConteiner.innerHTML = (tituloSecao || "") + '<div class="texto-versiculo">' + conteudo + "</div>";  /* Atualiza área texto         */
            atualizarBotoes();                                                                                           /* Revalida navegação          */
            document.body.classList.add("loaded");                                                                       /* Dispara animação fade       */
        }

        /* BLOCO: Gerencia a ativação dos botões de navegação baseado nos limites               */
        function atualizarBotoes() {
            if (!versiculosPorCapituloArray || versiculosPorCapituloArray.length === 0) {
                btnVoltar.disabled = true;                                                                               /* Bloqueia recuo              */
                btnProximo.disabled = true;                                                                              /* Bloqueia avanço             */
                return;                                                                                                  /* Finaliza                    */
            }
            /* BLOCO: Calcula os limites de navegação para livros e capítulos                   */    
            const totalCaps = versiculosPorCapituloArray.length;                                                         /* Total caps livro            */
            const ultimoVerCap = (capituloAtual > 0 && capituloAtual <= totalCaps) ? versiculosPorCapituloArray[capituloAtual - 1] : 1;
            const idxLivro = livrosOrdemGlobal.indexOf(livroAtual);                                                      /* Posição na lista livros     */

            btnVoltar.disabled = (capituloAtual === 1 && versiculoAtual === 1 && idxLivro === 0);                        /* Trava no Início             */
            btnProximo.disabled = (capituloAtual === totalCaps && versiculoAtual === ultimoVerCap && idxLivro === livrosOrdemGlobal.length - 1);
        }

        /* BLOCO: Função que avança para o próximo versículo, capítulo ou livro                 */
        function proximaEstrofe() {
            if (btnProximo.disabled) return;                                                                             /* Aborta se travado           */
            const ultimoVerCap = versiculosPorCapituloArray[capituloAtual - 1];                                          /* Máximo versos capítulo      */
            versiculoAtual++;                                                                                            /* Incrementa verso            */
            
            /* BLOCO: Verifica estouro de versículos para pular o capítulo                      */
            if (versiculoAtual > ultimoVerCap) {
                capituloAtual++;                                                                                         /* Incrementa capítulo         */
                versiculoAtual = 1;                                                                                      /* Reseta versículo            */
                
                /* BLOCO: Verifica estouro de capítulos para avançar o livro                    */
                if (capituloAtual > versiculosPorCapituloArray.length) {
                    const idxLivro = livrosOrdemGlobal.indexOf(livroAtual);                                              /* Pega posição livro          */
                    
                    /* BLOCO: Localiza o próximo livro na ordem canônica e carrega-o            */
                    if (idxLivro < livrosOrdemGlobal.length - 1) {
                        livroAtual = livrosOrdemGlobal[idxLivro + 1];                                                    /* Define Livro Seguinte       */
                        atualizarContagemCapitulosParaLivroAtual();                                                      /* Atualiza limites livro      */
                        capituloAtual = 1;                                                                               /* Capítulo 1                  */
                        versiculoAtual = 1;                                                                              /* Versículo 1                 */
                        carregarCapitulo(capituloAtual);                                                                 /* Dispara carga novo livro    */
                    } else {
                      /* BLOCO: Estaciona a navegação no último versículo da Bíblia             */  
                      versiculoAtual = ultimoVerCap;                                                                     /* Trava último verso          */
                        capituloAtual = versiculosPorCapituloArray.length;                                               /* Trava último capítulo       */
                        atualizarBotoes();                                                                               /* Atualiza visual botões      */
                        return;                                                                                          /* Finaliza                    */
                    }
                } else carregarCapitulo(capituloAtual);                                                                  /* Carga próximo capítulo      */
            } else carregarVersiculo(versiculoAtual);                                                                    /* Carga próximo versículo     */
        }

        /* BLOCO: Função que recua para o versículo, capítulo ou livro anterior                 */
        function voltarEstrofe() {
            if (btnVoltar.disabled) return;                                                                              /* Aborta se travado           */
            versiculoAtual--;                                                                                            /* Decrementa verso            */
            
            /* BLOCO: Verifica estouro de versículos para retroceder o capítulo                 */
            if (versiculoAtual < 1) {
                capituloAtual--;                                                                                         /* Decrementa capítulo         */
                if (capituloAtual < 1) {
                    const idxLivro = livrosOrdemGlobal.indexOf(livroAtual);                                              /* Pega posição livro          */
                    
                    /* BLOCO: Localiza o livro anterior e define seu último capítulo            */
                    if (idxLivro > 0) {
                        livroAtual = livrosOrdemGlobal[idxLivro - 1];                                                    /* Define Livro Anterior       */
                        atualizarContagemCapitulosParaLivroAtual();                                                      /* Atualiza limites livro      */
                        capituloAtual = versiculosPorCapituloArray.length;                                               /* Pula pro capítulo final     */
                        versiculoAtual = versiculosPorCapituloArray[capituloAtual - 1];                                  /* Pula pro versículo final    */
                        carregarCapitulo(capituloAtual);                                                                 /* Dispara carga livro ant.    */
                    } else {
                      
                        /* BLOCO: Estaciona a navegação em Gênesis 1:1                          */
                        capituloAtual = 1;                                                                               /* Trava capítulo 1            */
                        versiculoAtual = 1;                                                                              /* Trava versículo 1           */
                        if (livroAtual !== "genesis" || capituloAtual !== 1) carregarCapitulo(1);                        /* Recarga se necessário       */
                        else carregarVersiculo(1);                                                                       /* Mantém exibição Gênesis     */
                        return;                                                                                          /* Finaliza                    */
                    }
                } else {
                    versiculoAtual = versiculosPorCapituloArray[capituloAtual - 1];                                      /* Verso final cap anterior    */
                    carregarCapitulo(capituloAtual);                                                                     /* Carga capítulo anterior     */
                }
            } else carregarVersiculo(versiculoAtual);                                                                    /* Carga versículo anterior    */
        }

        /* BLOCO: Configura os listeners para controle via mouse e teclado                      */
        btnVoltar.addEventListener("click", voltarEstrofe);                                                              /* Clique Mouse Voltar         */
        btnProximo.addEventListener("click", proximaEstrofe);                                                            /* Clique Mouse Avançar        */
        document.addEventListener("keydown", (e) => {                                                                    /* Monitora Teclas             */
            if (e.key === "ArrowRight" || e.key === "PageDown") proximaEstrofe();                                        /* Tecla Avançar               */
            else if (e.key === "ArrowLeft" || e.key === "PageUp") voltarEstrofe();                                       /* Tecla Retroceder            */
            else if (e.key === "Home" && versiculoAtual !== 1) { versiculoAtual = 1; carregarVersiculo(1); }             /* Tecla Início Capítulo       */
            else if (e.key === "End" && versiculosPorCapituloArray.length >= capituloAtual) {
                const ultimoVer = versiculosPorCapituloArray[capituloAtual - 1];                                         /* Tecla Fim Capítulo          */
                if (versiculoAtual !== ultimoVer) { versiculoAtual = ultimoVer; carregarVersiculo(ultimoVer); }
            }
        });

        /* BLOCO: Dispara o carregamento inicial da janela do slide                             */
        atualizarContagemCapitulosParaLivroAtual();                                                                      /* Sincroniza Banco Dados      */
        if (todaContagemDataGlobal[livroAtual] && versiculosPorCapituloArray.length > 0) {
            if (capituloAtual < 1 || capituloAtual > versiculosPorCapituloArray.length) {
                capituloAtual = 1;                                                                                       /* Valida Capítulo Inicial     */
                versiculoAtual = 1;
            } else if (versiculoAtual < 1 || versiculoAtual > versiculosPorCapituloArray[capituloAtual - 1]) {
                versiculoAtual = 1;                                                                                      /* Valida Versículo Inicial    */
            }
            carregarCapitulo(capituloAtual);                                                                             /* Inicia carga do Slide       */
        } else {
            
            /* BLOCO: Exibe tela de erro caso a carga inicial de dados falhe                    */
            const livroAcentuado = obterNomeAcentuado(livroAtual);                                                       /* Recupera nome livro         */
            if (todaContagemDataGlobal[livroAtual]) {
                tituloElement.innerText = "ERRO";                                                                        /* Texto Erro Topo             */
                versiculoConteiner.innerHTML = '<div class="texto-versiculo" style="color:red;">Falha inicial.</div>';   /* Texto Erro Centro           */
                btnVoltar.disabled = true;                                                                               /* Trava Navegação             */
                btnProximo.disabled = true;                                                                              /* Trava Navegação             */
            }
        }
    </script>
</body>
</html>
    `)                                                                                                                   /* Finaliza Escritura Pop-up   */

    window.janelaSlide.document.close()                                                                                  /* Fecha Fluxo e Renderiza     */
    console.log("[slide.js] Conteúdo escrito na janela do slide.")                                                       /* Log Conclusão Sucesso       */
}                                                                                                                        /* Fecha abertura pop-up       */