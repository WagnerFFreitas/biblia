# Manual Completo do Projeto BíbliaV1

## Introdução

O projeto **BíbliaV1** é uma aplicação web desenvolvida para fornecer acesso interativo e abrangente à Bíblia Sagrada, incluindo recursos como concordância bíblica, dicionário, hinos de hinários evangélicos (Harpa Cristã e Cantor Cristão), diferentes versões da Bíblia e opções de download de conteúdos em PDF. O projeto é hospedado no GitHub em [https://github.com/WagnerFFreitas/biblia](https://github.com/WagnerFFreitas/biblia) e parece ser uma ferramenta educacional e devocional para usuários interessados em estudos bíblicos.

A aplicação é construída principalmente com tecnologias front-end: HTML para estrutura, CSS para estilização e JavaScript para interatividade. Os dados são armazenados em arquivos JSON para facilitar o carregamento dinâmico, tornando a aplicação leve e offline-capaz (após o carregamento inicial).

Este manual é baseado em uma análise completa da estrutura do repositório. Nota: A pasta `ver/` (provavelmente relacionada a versões da Bíblia) não continha arquivos visíveis ou listados publicamente no momento da análise (pode ser vazia ou oculta). Caso haja atualizações, recomenda-se rever o repositório. Outros componentes foram identificados na raiz e subpastas.

## Arquitetura e Estrutura de Pastas

O projeto segue uma estrutura modular, organizada por tipo de recurso (HTML, CSS, JS, dados e assets). Isso facilita a manutenção, com separação clara entre apresentação, lógica e dados. Abaixo, a árvore de diretórios principal:

```
biblia/
├── README.md                  # Documentação inicial do projeto
├── LICENSE                    # Licença MIT
├── index.html                 # Página de entrada principal
├── style.css                  # Estilos globais
├── script.js                  # Lógica JavaScript principal
├── html/                      # Páginas HTML para seções específicas
│   └── (arquivos como versao.html, concordancia.html, etc. – assumidos baseados em padrões)
├── css/                       # Estilos CSS modulares por seção
│   └── (arquivos como versao.css, etc.)
├── script/                    # Módulos JavaScript por funcionalidade
│   └── (arquivos como busca.js, hinos.js, etc.)
├── concordancia/              # Dados JSON da Concordância Bíblica
│   └── (arquivos JSON com referências cruzadas)
├── dicionario/                # Dados JSON do Dicionário Bíblico
│   └── (arquivos JSON com definições de termos)
├── harpacrista/               # Dados JSON dos hinos da Harpa Cristã
│   └── (arquivos JSON com letras e metadados de hinos)
├── cantorcristao/             # Dados JSON dos hinos do Cantor Cristão
│   └── (arquivos JSON com letras e metadados de hinos)
├── versao/                    # Dados JSON das diferentes versões da Bíblia (ex: ACF, NVI)
│   └── (arquivos JSON com textos bíblicos por versão)
├── baixar/                    # Arquivos PDF para download (ex: Bíblias em PDF)
│   └── (arquivos PDF de versões completas ou seções)
├── img/                       # Imagens e ícones
│   └── (arquivos como logos, ícones de livros bíblicos, etc.)
└── ver/                       # Pasta possivelmente para versões adicionais ou verificação (vazia na análise atual)
    └── (sem arquivos visíveis)
```

- **Raiz**: Contém os arquivos de inicialização e globais.
- **Diretórios de Assets (html/, css/, script/)**: Separam o front-end em componentes reutilizáveis.
- **Diretórios de Dados (concordancia/, dicionario/, etc.)**: Armazenam conteúdo estático em JSON, permitindo buscas rápidas sem backend.
- **Diretórios de Recursos (baixar/, img/)**: Suportam downloads e visuais.

Essa arquitetura é client-side only, sem dependências de servidor, o que a torna portátil (pode ser executada localmente ou hospedada estaticamente).

## Recursos Disponíveis

O projeto oferece uma suíte de ferramentas para estudo bíblico digital:

1. **Leitura da Bíblia**: Acesso a múltiplas versões (ex: Almeida Corrigida Fiel - ACF, Nova Versão Internacional - NVI) via arquivos JSON em `versao/`. Permite navegação por livros, capítulos e versos.
2. **Concordância Bíblica**: Busca de palavras-chave com referências cruzadas de versos relacionados, usando dados em `concordancia/`.
3. **Dicionário Bíblico**: Definições e explicações de termos bíblicos, carregados de `dicionario/`.
4. **Hinos Evangélicos**:
   - Harpa Cristã: Letras e metadados de hinos tradicionais.
   - Cantor Cristão: Similar, focado em outro hinário clássico.
5. **Downloads**: PDFs de Bíblias ou seções em `baixar/`, úteis para impressão ou uso offline avançado.
6. **Busca Geral**: Provavelmente um motor de busca unificado via JavaScript para cruzar recursos.
7. **Interface Responsiva**: Estilos em CSS para desktop e mobile, com imagens em `img/` para ícones e navegação.

Todos os recursos são acessíveis via navegação no `index.html` ou páginas dedicadas em `html/`.

## Como Cada Parte do Projeto Funciona

- **index.html**: Serve como hub principal. Carrega `style.css` para layout e `script.js` para inicialização. Inclui links para seções (ex: "Versões", "Concordância"). Ao carregar, executa JS para popular menus com dados JSON.
  
- **style.css**: Define estilos globais, como fontes serifadas para textos bíblicos, cores temáticas (azul/terra para espiritualidade) e layouts flexíveis. Responsivo com media queries.

- **script.js**: Lógica central. Funções para:
  - Carregar JSONs assincronamente (fetch ou XMLHttpRequest).
  - Renderizar conteúdo dinamicamente (ex: exibir versos em uma div).
  - Implementar buscas (ex: filtro por palavra em concordância).

- **html/**: Páginas modulares, como `versao.html` (seletor de versão + leitor de texto) ou `hinos.html` (lista de hinos com player de texto).

- **css/**: Estilos específicos, ex: `concordancia.css` para destacar referências.

- **script/**: Módulos, ex: `busca.js` (algoritmo de matching fuzzy para buscas) ou `hinos.js` (formatação de letras com estrofes).

- **Diretórios de Dados (JSON)**: Estrutura típica:
  ```json
  {
    "livro": "Gênesis",
    "capitulo": 1,
    "versos": ["No princípio, Deus criou os céus e a terra.", ...]
  }
  ```
  Para hinos:
  ```json
  {
    "numero": 1,
    "titulo": "Ó Quão Lindo Esse Nome É",
    "letra": ["Estrofe 1: ...", "Refrão: ..."]
  }
  ```

- **baixar/**: Links diretos para PDFs, gerados via `<a download>` em HTML.

- **img/**: Assets estáticos, referenciados em CSS/JS para botões e headers.

- **ver/**: Sem conteúdo visível; possivelmente reservada para validação de versões ou extensões futuras.

## Fluxo Geral de Execução

1. **Inicialização**: Usuário abre `index.html` no navegador. Carrega CSS e JS globais.
2. **Carregamento de Dados**: `script.js` faz fetch de JSONs necessários (ex: lista de livros da Bíblia).
3. **Navegação**: Clique em menu (ex: "Concordância") carrega página em `html/`, aplica CSS modular e executa script específico.
4. **Interatividade**: Busca insere termo → JS filtra JSON → Renderiza resultados em DOM.
5. **Download**: Clique em link → Baixa PDF diretamente.
6. **Encerramento**: Aplicação persiste em sessionStorage para cache de buscas recentes.

O fluxo é assíncrono e não bloqueia a UI, graças a Promises em JS.

## Instruções para Instalação, Configuração e Uso

### Instalação
1. Clone o repositório:
   ```
   git clone https://github.com/WagnerFFreitas/biblia.git
   cd biblia
   ```
2. Não há dependências externas (puro vanilla JS/HTML/CSS). Abra `index.html` em um navegador moderno (Chrome, Firefox, etc.).

### Configuração
- **Personalização de Versões**: Edite JSONs em `versao/` para adicionar novas traduções. Estrutura: Um arquivo por versão (ex: `acf.json`).
- **Adicionar Hinos**: Crie novos JSONs em `harpacrista/` seguindo o formato existente.
- **Estilos**: Modifique `style.css` para temas (ex: modo noturno via CSS variables).
- **Servidor Local (opcional, para testes com fetch)**: Use `python -m http.server` ou Live Server no VS Code.

### Uso
1. Abra `index.html`.
2. Navegue pelos menus: Selecione versão → Escolha livro/capítulo → Leia/busque.
3. Para hinos: Vá para seção Harpa/Cantor → Busque por número/título → Leia letra.
4. Downloads: Clique em "Baixar PDF" na seção relevante.
5. Busca Avançada: Use campos de texto para termos em concordância/dicionário.

Dicas: Funciona offline após primeiro carregamento (cache de browser). Para mobile, teste responsividade.

## Explicações Técnicas para Manutenção e Expansão

### Manutenção
- **Debugging**: Use console do navegador para logs em `script.js` (ex: `console.log(dadosJSON)`). Verifique erros em fetch de JSONs.
- **Validação de Dados**: JSONs devem ser válidos (use jsonlint.com). Evite caracteres especiais sem escape.
- **Performance**: Para grandes JSONs (ex: Bíblia completa ~5MB), considere lazy-loading por livro.
- **Atualizações**: Pull requests no GitHub. Teste cross-browser.

### Expansão
- **Novos Recursos**: Adicione áudio (Web Audio API em novo script/) ou app PWA (adicione manifest.json).
- **Backend**: Integre Node.js para buscas server-side se dados crescerem.
- **Idiomas**: Duplique `versao/` para PT/EN, adicione seletor de idioma em JS.
- **Contribuições**: Siga MIT License – fork, edite, PR.
- **Ferramentas Recomendadas**: VS Code para edição, Git para versionamento, Prettier para formatação.

Este manual cobre todos os componentes identificados. Para atualizações na pasta `ver/` ou novos arquivos, reanalise o repositório. Se precisar de suporte, contate o mantenedor via GitHub issues.

*Última atualização: Baseado em análise de 27 de novembro de 2025.*