/*===============================================================================*/
/*                    MÓDULO DE CONFIGURAÇÃO DE DADOS (HINOS)                    */
/*===============================================================================*/
/*  Este script é responsável por:                                               */
/*                   - Definir os limites de hinos por hinário                   */
/*               - Exportar configurações para o sistema de slide                */
/*===============================================================================*/

console.log("[slide_harpacantor_dados.js] Script iniciado.");                     // Loga o início do script

/* BLOCO: Define as quantidades totais de hinos para fins de validação, limites  */
/* de busca e geração de botões                                                  */
const HINARIOS_CONFIG = {                                                         // Inicia objeto de dados
    harpa: { total: 640 },                                                        // Limite da Harpa Cristã
    cantor: { total: 581 }                                                        // Limite do Cantor Cristão
};                                                                                // Fecha objeto de dados

window.HINARIOS_CONFIG = HINARIOS_CONFIG;                                         // Exporta dados globalmente
