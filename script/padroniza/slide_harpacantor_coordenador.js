/*===============================================================================*/
/*                    MÓDULO COORDENADOR DE PROJEÇÃO (HINOS)                     */
/*===============================================================================*/
/*  Este script é responsável por:                                               */
/*                - Inicializar os gatilhos de exibição de slides                */
/*                 - Coordenar a captura de dados do hino ativo                  */
/*                  - Lidar com a verificação de seleção prévia                  */
/*===============================================================================*/

console.log("[slide_harpacantor_coordenador.js] Script iniciado.");               // Loga o início do script

/* BLOCO: Define a função coordenadora que inicializa os vínculos de eventos     */
/* entre o site e a janela de slide                                              */
function inicializarSlideHino() {                                                 // Inicia função coordenadora
    const btnSlide = document.getElementById('btnSlide');                         // Acha botão de projeção

    /* BLOCO: Confirma se o botão existe no HTML e adiciona o monitor de clique para disparar o comando de exibição    */
    if (btnSlide) {
        btnSlide.addEventListener('click', () => {                                // Ouve clique no botão
            console.log("[Coordenador] Botão 'Slide' clicado.");                  // Loga intenção do usuário

            /* BLOCO: Acessa a variável global que armazena os dados (letra e número) do hino selecionado pelo usuário */
            const hinoAtivo = window.activeHinoData;                              // Pega o hino carregado

            /* BLOCO: Valida se o conteúdo do hino é válido para abrir a janela ou emite um alerta instruindo o usuário*/
            if (hinoAtivo) {
                window.abrirJanelaSlideHino(hinoAtivo);                           // Abre o sistema de slide
            } else {
                alert("Por favor, selecione um hino primeiro para exibi-lo no slide.");  // Alerta falta de seleção
            }
        });
    } else {
        console.warn("[Coordenador] Botão 'Slide' com id='btnSlide' não encontrado.");  // Relata falha de elemento
    }
}

document.addEventListener('DOMContentLoaded', inicializarSlideHino);              // Ativa o motor ao carregar
