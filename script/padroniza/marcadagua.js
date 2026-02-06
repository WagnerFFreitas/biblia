/*===============================================================================*/
/*                      SCRIPT PARA MARCA D'ÁGUA DA BÍBLIA                       */
/*===============================================================================*/
/*  Este arquivo contém:                                                         */
/*                    - Funções para adicionar marca d'água na página principal  */
/*                    - Criação e inserção do elemento visual de fundo           */
/*===============================================================================*/

window.onload = () => {                                                           // Executa quando página carrega completamente
    const content = document.querySelector('.conteudo');                         // Localiza área principal do conteúdo
    
    const marcadaguaConteiner = document.createElement('div');                    // Cria contêiner da marca d'água
    marcadaguaConteiner.classList.add('marcadagua');                              // Aplica classe CSS
    
    const img = document.createElement('img');                                    // Cria elemento de imagem
    img.src = '../img/biblia.png';                                                // Define fonte da imagem
    img.alt = "Marca d'água da Bíblia";                                           // Define texto alternativo
    img.classList.add('marca-dagua-imagem');                                      // Aplica classe CSS da imagem
    
    marcadaguaConteiner.appendChild(img);                                         // Adiciona imagem ao contêiner
    content.appendChild(marcadaguaConteiner);                                     // Adiciona marca d'água à página
};