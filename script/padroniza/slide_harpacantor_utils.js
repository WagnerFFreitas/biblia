/*===============================================================================*/
/*                  MÓDULO DE UTILITÁRIOS PARA HINOS (SLIDE)                     */
/*===============================================================================*/
/*  Este script é responsável por:                                               */
/*                       - Prover funções de suporte para o sistema de hinos     */
/*                       - Consultar limites de dados configurados               */
/*===============================================================================*/

console.log("[slide_harpacantor_utils.js] Script iniciado.");                                           /* Loga o início do script      */

/* BLOCO: Função utilitária para recuperar o número total de hinos de um hinário específico  */
function obterTotalHinos(tipoHinario) {                                                                 /* Inicia função de contagem    */
    if (window.HINARIOS_CONFIG && window.HINARIOS_CONFIG[tipoHinario]) {                                /* Valida dados de hinos        */
        return window.HINARIOS_CONFIG[tipoHinario].total;                                               /* Retorna o limite de hinos    */
    }
    return 0;                                                                                           /* Retorna zero por segurança   */
}

window.obterTotalHinos = obterTotalHinos;                                                               /* Exporta utilitário global    */