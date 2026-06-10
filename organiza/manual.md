# MANUAL DO PROJETO BibliaV1

## 1. Introdução

BibliaV1 é uma aplicação web interativa para leitura, estudo e apresentação da Bíblia Sagrada, desenvolvida totalmente em HTML5, CSS3 e JavaScript sem frameworks, com foco em modularidade, facilidade de uso, manutenção e expansão.

O projeto oferece diversos recursos complementares como dicionários bíblicos, concordância, hinos (Harpa Cristã e Cantor Cristão), modo slide para projeção e diversas versões da Bíblia.

---

## 2. Recursos Disponíveis

- **Múltiplas Versões da Bíblia:** Almeida Revista e Atualizada (ARA), Almeida Corrigida e Fiel (ACF), Nova Versão Internacional (NVI), King James (KJV), Nova Almeida Atualizada (NAA), Nova Tradução na Linguagem de Hoje (NTLH), Bíblia em original, entre outras.
- **Modo Slide (Datashow):** Interface em tela cheia para apresentação de versículos e hinos em eventos.
- **Dicionário Bíblico:** Busca e consulta rápida de termos bíblicos.
- **Concordância Bíblica:** Localiza todas as ocorrências de uma palavra ou frase.
- **Harpa Cristã e Cantor Cristão:** Consulta com navegação intuitiva.
- **Download de bíblias e estudos:** Vários materiais e versões em PDF para acesso offline.
- **Utilitários:** Links para cursos, ferramentas de estudo, facilitadores de busca, estatísticas e conversor de referências.

---

## 3. Arquitetura e Estrutura de Pastas

```text
biblia/
├── index.html              # Página inicial
├── style.css               # Estilo principal
├── script.js               # Script principal interativo
├── README.md               # Manual resumido
├── projeto.md              # Documentação detalhada
├── ver/                    # Documentação técnica, relatórios, listas e histórico
│   ├── README.md
│   ├── Documentacao.md
│   ├── relatorio.md
│   ├── lista.md
│   └── ... outros arquivos de análise e padronização
├── baixar/                 # PDFs para download
├── cantorcristao/          # JSON dos hinos do Cantor Cristão
├── concordancia/           # Dados da concordância bíblica (JSON)
├── css/                    # Estilos específicos de cada versão/seção
├── dicionario/             # Dados do dicionário bíblico (JSON)
├── harpacrista/            # JSON dos hinos da Harpa Cristã
├── html/                   # Subpáginas de versões, cursos, hinos
├── img/                    # Imagens e ícones
├── json/                   # Dados centralizados das versões (livro/capítulo em JSON)
├── script/                 # Scripts modulares (cada funcionalidade, versão, utilitário)
├── versao/                 # Dados hierárquicos das diferentes versões da Bíblia
└── ... outros diretórios auxiliares
```

### Estrutura dos Dados

- *ARC*: Cada livro está em sua pasta com arquivos HTML por capítulo (ex: `/genesis/1.html`)
- *ARA, NVI, etc*: Dados organizados em arquivos JSON por capítulo.
- Dicionário e Concordância: Jsons por letra.
- Hinos: Arquivos JSON por hinário.
- Downloads: PDFs organizados por versão ou tema.

---

## 4. Fluxo de Execução Geral

1. **Carregamento Inicial:** O `index.html` apresenta cards de versões disponíveis. O popup de boas-vindas pode ser exibido ao usuário.
2. **Seleção de Versão:** Clicando em uma versão, o JavaScript redireciona para uma subpágina específica.
3. **Navegação de Livros:** Menu lateral apresenta todos os livros. Botões dinâmicos para capítulos são exibidos conforme o livro selecionado.
4. **Consulta de Capítulos/Versículos:** Ao escolher o capítulo, o conteúdo é recuperado de HTML ou JSON e exibido com destaque de versículos.
5. **Recursos Extras:** Dicionário, Concordância, Harpa, Cantor e downloads são acessíveis nos menus principais.
6. **Modo Slide:** Permite apresentação do conteúdo selecionado em tela cheia com navegação simplificada.
7. **Upload de Novas Versões:** Usuário pode adicionar (temporariamente) capa e título de versões, visualizando imediatamente nos cards.

---

## 5. Funcionamento de Cada Parte

### Frontend

- **index.html:** Estrutura semântica, cabeçalho para navegação, lista de versões, popups, rodapé fixo.
- **style.css:** Responsividade, gradientes, temas escuros, efeitos em cards, transições e animações.
- **script.js:**
  - Inicializa e renderiza cards de versões a partir de array.
  - Gerencia popups de boas-vindas, upload de imagem, criação de versão.
  - Redireciona conforme versão selecionada.
  - Validação e preview de upload de imagens.
  - Modularidade garantida por funções com nomes autoexplicativos, e organização em arquivos separados na pasta `script/`.

### Subpáginas e Funcionalidades Avançadas

- *html/*: Páginas como versoes.html, harpa_cantor.html, cursos.html, menu_dicionarioconcordancia.html.
- *css/*: Estilos específicos para cada área.
- *script/*: Scripts de cada versão da bíblia, de busca, navegação, slides, dicionário, concordância, utilidades, cache.

### Documentação e Manutenção

- *ver/*: Documentação profunda, relatórios, listas de padronização, recomendações de arquitetura, histórico de conversa, guias de nomenclatura, exemplos de arquivos de dados.

---

## 6. Instalação, Configuração e Uso

**Instalação**
1. Clone o repositório:
   ```bash
   git clone https://github.com/WagnerFFreitas/biblia.git
   ```
2. Abra o projeto em editor de código (VSCode recomendado).

**Execução**
1. Basta abrir o arquivo `index.html` em um navegador moderno.

**Configuração**
- Não requer configuração prévia. Scripts e dados funcionam localmente.
- Para adicionar novas versões, utilize popup pelo botão “+” e faça upload temporário de imagem e título.

**Expansão**
- Adicione novas versões e hinos à pasta correspondente (json ou html conforme padrão).
- Scripts e estilos novos devem seguir nomenclatura e modularidade.
- O projeto já contém diretivas de padronização para nomes, arquivos, funções e separação lógica.

---

## 7. Manutenção: Recomendações Técnicas

- **Centralização dos dados**: Utilize arquivos únicos como fonte de verdade para informações repetidas (livros, capítulos, versículos).
- **Padronização de nomes**: Todos variáveis, funções, classes e arquivos devem utilizar português, nomes descritivos e padrão acordado.
- **Separação de responsabilidades:** Mantém-se HTML para estrutura, CSS para estilo, JS para comportamento.
- **Modularidade:** Scripts divididos por funcionalidade, importando dados comuns sempre que possível.
- **Internacionalização e acessibilidade**: Evite textos fixos em inglês, sempre substituindo por configuráveis e permita navegação por teclado.
- **Performance:** Utilize cache e lazy loading nos scripts de busca extensiva.
- **Segurança:** Valide inputs e sanitize dados do usuário.

### Sugestão de Refatoração

- Centralizar dados bíblicos em `script/dados_biblicos.js`.
- Criar arquivos físicos para interface de slides em vez de gerar em runtime.
- Unificar lógica de carregamento de versículos para versões que usam JSON em função única.
- Internacionalização futura.

---

## 8. Padrões de Nomenclatura e Comentários

- Classes e IDs: português, descritivos e padronizados.
- Funções: verbo de ação no início (carregarCapitulo, exibirVersao...).
- Variáveis: significado claro, sempre em português.
- Comentários: cabeçalhos explicativos, blocos lógicos marcados, notas de manutenção e melhorias.

---

## 9. Expansão e Futuro

- Busca avançada por filtros (palavras-chave, livros e versículos).
- Leitura em áudio dos versículos e capítulos.
- Favoritos e marcação de versículos.
- Compartilhamento direto nas redes sociais.
- API e integração com banco de dados.
- Aplicativo mobile dedicado.
- Notas e comentários sobre o texto bíblico.
- Interface ainda mais modernizada e acessível.
- Testes automatizados para garantir qualidade.

---

## 10. Contato

Em caso de dúvidas, sugestões ou intenção de colaboração:  
**E-mail:** wagnerffreitas1973@gmail.com

---

## 11. Licença

Projeto sob a **Licença MIT**.

---

## 12. Referências e Arquivos Importantes

- [README.md](https://github.com/WagnerFFreitas/biblia/blob/main/README.md)
- [projeto.md](https://github.com/WagnerFFreitas/biblia/blob/main/projeto.md)
- [index.html](https://github.com/WagnerFFreitas/biblia/blob/main/index.html)
- [style.css](https://github.com/WagnerFFreitas/biblia/blob/main/style.css)
- [script.js](https://github.com/WagnerFFreitas/biblia/blob/main/script.js)
- Pasta [ver/](https://github.com/WagnerFFreitas/biblia/tree/main/ver) - contém toda documentação técnica
- Para mais arquivos, consulte o repositório completo.

---

## 13. Histórico de Revisão e Padronização

A pasta `ver/` traz o histórico de padronizações, análises e recomendações:
- Centralização e unificação de dados
- Padronização de nomenclaturas em português
- Relatórios de refatoração
- Listas de elementos a traduzir ou revisar
- Sugestões para modularidade e boas práticas

**Para manter e expandir o projeto com qualidade, siga as orientações desta documentação e das recomendações da pasta `ver/`.**

---

### FIM DO MANUAL DO PROJETO BibliaV1
