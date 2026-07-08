/*===============================================================================*/
/*                      SCRIPT PARA MARCA D'ÁGUA DA BÍBLIA                       */
/*===============================================================================*/
/*  Este arquivo contém:                                                         */
/*           - Funções para adicionar marca d'água na página principal           */
/*               - Criação e inserção do elemento visual de fundo                */
/*===============================================================================*/

// Este bloco adiciona a marca d'água assim que todo o documento HTML for carregado
window.onload = () => {
    const content = document.querySelector('.conteudo');                          // Obtém o conteiner principal de conteúdo
    const marcadaguaConteiner = document.createElement('div');                    // Cria um conteiner específico para a marca d'água
    marcadaguaConteiner.classList.add('marcadagua');                              // Adiciona classe para estilização
    const img = document.createElement('img');                                    // Cria o elemento de imagem para a marca d'água
    img.src = '../img/biblia.png';                                                // Define o caminho da imagem
    img.alt = "Marca d'água da Bíblia";                                           // Define texto alternativo para acessibilidade
    img.classList.add('marca-dagua-imagem');                                      // Adiciona classe para estilização
    marcadaguaConteiner.appendChild(img);                                         // Adiciona a imagem ao conteiner
    content.appendChild(marcadaguaConteiner);                                     // Adiciona o conteiner ao conteúdo principal
};
