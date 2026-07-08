console.log("[slide_harpacantor_utils.js] Script iniciado.");

function obterTotalHinos(tipoHinario) {
    if (window.HINARIOS_CONFIG && window.HINARIOS_CONFIG[tipoHinario]) {
        return window.HINARIOS_CONFIG[tipoHinario].total;
    }
    return 0;
}

window.obterTotalHinos = obterTotalHinos;
