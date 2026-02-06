# Bíblia Sagrada Online

#### Início do projeto: Agosto de 2024

## Visão Geral

Este projeto é uma aplicação web interativa para leitura e estudo da Bíblia Sagrada, desenvolvida com foco em uma experiência de usuário amigável, intuitiva e completa. A aplicação foi construída com **HTML5, CSS3 e JavaScript puro**, sem o uso de frameworks, como um exercício prático para aprofundar e consolidar conhecimentos fundamentais de desenvolvimento web.

O objetivo principal é oferecer uma ferramenta online robusta e acessível, que vai além da simples leitura, incorporando um ecossistema de recursos complementares para estudo e adoração.

## Recursos

- **Múltiplas Versões da Bíblia**: Inclui diversas traduções populares como Almeida Revista e Atualizada (ARA), Almeida Corrigida e Fiel (ACF), Nova Versão Internacional (NVI), e a Bíblia Católica (Vulgata Latina).
- **Conteúdos Complementares**: Acesso à Harpa Cristã e ao Cantor Cristão (Hinário Batista).
- **Ferramentas de Estudo**:
  - **Dicionário Bíblico**: Para consulta rápida de termos e seus significados.
  - **Concordância Bíblica**: Permite localizar todas as ocorrências de uma palavra ou frase em toda a Bíblia.
- **Projeção de Versículos (Modo Slide)**: Uma interface otimizada para apresentações em tela cheia (Datashow), com controles de navegação simples e design limpo.
- **Downloads**: Disponibiliza diversas versões da Bíblia e estudos em formato PDF para acesso offline.
- **Utilitários**: Links para cursos e outras ferramentas que enriquecem a experiência de estudo.

## Estrutura do Projeto

A estrutura de pastas foi organizada para garantir modularidade e facilitar a manutenção:

```
bibliav1/
├── index.html              # Página inicial da aplicação
├── style.css               # Folha de estilo principal
├── script.js               # Script principal com a lógica geral
├── html/                   # Páginas HTML para as diferentes seções
├── css/                    # Arquivos CSS específicos para cada seção
├── script/                 # Scripts JavaScript modulares
├── ver/                    # Arquivos de documentação do projeto
├── concordancia/           # Dados da Concordância Bíblica (JSON)
├── dicionario/             # Dados do Dicionário Bíblico (JSON)
├── harpacrista/            # Hinos da Harpa Cristã (JSON)
├── cantorcristao/          # Hinos do Cantor Cristão (JSON)
├── versao/                 # Dados das diferentes versões da Bíblia (JSON)
├── baixar/                 # Arquivos PDF para download
└── img/                    # Imagens e ícones
```

## Como Usar

1.  **Clonar o Repositório**:
    ```bash
    git clone https://github.com/seu-usuario/bibliav1.git
    ```
2.  **Abrir o Projeto**: Abra a pasta do projeto em um editor de código (ex: Visual Studio Code).
3.  **Executar**: Abra o arquivo `index.html` em seu navegador de preferência.

## Contribuição

Se você deseja contribuir para a melhoria deste projeto, siga os passos abaixo:

1.  Faça um **fork** do repositório.
2.  Crie uma nova **branch** (`git checkout -b feature/sua-feature`).
3.  Faça suas alterações e **commit** (`git commit -m 'Adiciona sua feature'`).
4.  Envie para a sua branch (`git push origin feature/sua-feature`).
5.  Abra um **Pull Request**.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.

## Contato

Para dúvidas ou sugestões, entre em contato pelo e-mail: wagnerffreitas1973@gmail.com.



Para criar o arquivo de Gênesis 2, utilizei as seguintes referências e critérios:

1. Referência de Texto Fonte

A base textual principal é o Texto Massorético, especificamente a Biblia Hebraica Stuttgartensia (BHS), que é o padrão acadêmico baseado no Códice de Leningrado. Para a transliteração, segui o modelo fonético simplificado para facilitar a leitura, similar ao padrão usado em ferramentas como o Blue Letter Bible ou o Bible Hub.

2. Sistema de Tradução: Interlinear Literal e Morfológica

O sistema de tradução adotado é conhecido como Tradução Interlinear Literal, mas com um foco específico na correspondência morfológica.

Aqui estão as regras que segui para manter a consistência com o arquivo que você forneceu:

Hifenização Morfológica: No hebraico, prefixos (como a conjunção "e" - Vav) e sufixos (como pronomes possessivos) são unidos à palavra principal. No arquivo, traduzi isso usando hifens (ex: וַיֹּאמֶר -> "E-Ele-disse").

Partícula de Objeto Direto (אֵת - Et): Mantive o uso do asterisco (*) para a palavra Et. Essa partícula indica que a próxima palavra é o objeto direto definido, mas ela não possui uma tradução semântica para o português.

Equivalência Formal: Priorizei a ordem das palavras conforme aparecem no hebraico (Verbo -> Sujeito -> Objeto), mesmo que soe arcaico ou estranho em português, para que você possa mapear exatamente qual palavra hebraica gera qual termo traduzido.

Termos Teológicos Específicos:

Elohim (אֱלֹהִים): Traduzido como "Deus".

YHWH (יְהוָה): Traduzido como "o-SENHOR" (com versalete ou maiúsculas), seguindo a tradição de tradução de Adonai.

Adam (אָדָם): Traduzido como "homem" ou "o-homem", dependendo da presença do artigo.

Ishah (אִשָּׁה): No versículo 23, usei o termo "Varôa" (um neologismo clássico de traduções como a de Almeida) para manter o jogo de palavras original entre Ish (varão) e Ishah (varôa).

3. Ferramentas de Apoio

Para garantir a precisão gramatical (identificar se um verbo está no Qal, Piel, Hifil, etc., e como isso afeta a tradução de "Ele-fez" ou "Ele-fez-fazer"), consultei léxicos como o Brown-Driver-Briggs (BDB) e o Koehler-Baumgartner (HALOT).

Se precisar de ajustes em algum termo específico (por exemplo, preferir "Javé" em vez de "o-SENHOR"), posso adaptar o arquivo facilmente.