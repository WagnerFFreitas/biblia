console.log("[slide_harpacantor_coordenador.js] Script iniciado.");

function inicializarSlideHino() {
    const btnSlide = document.getElementById('btnSlide');

    if (btnSlide) {
        btnSlide.addEventListener('click', () => {
            console.log("[Coordenador] Botão 'Slide' clicado.");

            const hinoAtivo = window.activeHinoData;

            if (hinoAtivo) {
                window.abrirJanelaSlideHino(hinoAtivo);
            } else {
                alert("Por favor, selecione um hino primeiro para exibi-lo no slide.");
            }
        });
    } else {
        console.warn("[Coordenador] Botão 'Slide' com id='btnSlide' não encontrado.");
    }
}

document.addEventListener('DOMContentLoaded', inicializarSlideHino);
