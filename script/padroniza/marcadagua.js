/*===============================================================================*/
/*                      SCRIPT PARA MARCA D'ÁGUA DA BÍBLIA                       */
/*===============================================================================*/
/*  Este arquivo contém:                                                         */
/*           - Funções para adicionar marca d'água na página principal           */
/*               - Criação e inserção do elemento visual de fundo                */
/*===============================================================================*/

/* BLOCO: Configura o gatilho de carregamento total da janela para injetar o     */
/* elemento visual decorativo no fundo da página                                 */
window.onload = () => {                                                           // Inicia ao carregar a página
    const content = document.querySelector('.conteudo');                          // Localiza a seção principal
    const marcadaguaConteiner = document.createElement('div');                    // Cria o contêiner do fundo
    marcadaguaConteiner.classList.add('marcadagua');                              // Aplica a classe de estilo
    const img = document.createElement('img');                                    // Instancia o objeto imagem
    img.src = '../img/biblia.png';                                                // Define o endereço da imagem
    img.alt = "Marca d'água da Bíblia";                                           // Define texto de segurança
    img.classList.add('marca-dagua-imagem');                                      // Define dimensões da imagem
    marcadaguaConteiner.appendChild(img);                                         // Une a imagem ao contêiner
    content.appendChild(marcadaguaConteiner);                                     // Publica o conjunto no site
};
