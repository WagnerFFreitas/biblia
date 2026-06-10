
# BibliaV1 — Manual Completo do Projeto

## 1. Visão Geral
O projeto **BibliaV1** é um sistema completo para leitura, navegação, organização e estudo bíblico, baseado em arquivos HTML convertidos para JSON e exibidos em uma interface moderna estilo streaming.  
Os arquivos fornecidos no ZIP representam rascunhos originais do desenvolvimento, contendo objetivos, anotações, estruturas e funções preliminares que servem de base para a documentação.

Este manual unifica todos os textos do ZIP, reorganizando tudo em um documento único, estruturado e coerente.

---

## 2. Arquitetura do Projeto

### 2.1 Estrutura Geral de Pastas
A estrutura lógica consolidada do projeto é:

```
/bibliaV1
│
├── /ver/                     # Arquivos de estudo, anotações e rascunhos
│   ├── livros.txt
│   ├── estrutura_guias.txt
│   ├── funcoes_planejadas.txt
│   ├── modelos_json.txt
│   ├── objetivos_projeto.txt
│   └── outros rascunhos...
│
├── /versao/                  # Versões bíblicas em HTML (ARC, ARA, etc.)
│   └── /arc/genesis/1.html
│
├── conversor/                # Scripts Python para criar JSON
│   └── gerar_json.py
│
├── aplicativo/               # Interface estilo Netflix (HTML/CSS/JS ou Python Desktop)
│   ├── main.py
│   ├── gui/
│   ├── componentes/
│   └── assets/
│
└── README.md                 # Descrição inicial do projeto
```

---

## 3. Objetivos do Projeto (a partir dos rascunhos)

Os textos presentes no ZIP definem claramente os objetivos do BíbliaV1:

- Criar um software moderno, rápido e leve para leitura da Bíblia.
- Permitir acesso fácil a capítulos, livros e versões.
- Exibir layout moderno estilo Netflix (cards, menus laterais, destaque visual).
- Garantir navegação fluida e responsiva.
- Converter conteúdos bíblicos HTML para JSON estruturado.
- Permitir busca rápida.
- Suporte a tema claro/escuro.
- Fácil expansão para novos módulos.

---

## 4. Funcionamento do Sistema (unificando os rascunhos)

### 4.1 Fluxo Geral
1. **Carregar lista de livros** (baseada em `livros.txt`).
2. **Listar livros na interface** (modelo Netflix, conforme anotações).
3. **Usuário escolhe livro** → abre lista de capítulos.
4. **Capítulo é carregado do JSON gerado pelo script conversor.**
5. **Interface exibe título, versículos e navegação.**

---

## 5. Arquivos do ZIP – Consolidação das Ideias

### 5.1 Livros da Bíblia
O arquivo `livros.txt` lista:

- ordem dos livros
- distinção entre AT e NT
- nomes abreviados e completos

Essas informações são unificadas no manual para padronizar o uso dentro do projeto.

---

### 5.2 Estrutura dos JSON
Os rascunhos definem a seguinte estrutura final para cada capítulo:

```json
{
  "livro": "Gênesis",
  "capitulo": 1,
  "versiculos": [
    {
      "numero": 1,
      "texto": "No princípio..."
    }
  ],
  "total_versiculos": 31
}
```

---

### 5.3 Interface Estilo Netflix
Os textos de referência descrevem:

- cards dos livros
- navegação lateral
- modo escuro
- rolagem suave
- fonte grande e acessível
- área para destaque de traduções e notas

---

## 6. Conversão HTML → JSON
O documento `modelos_json.txt` e anotações correlatas indicam:

- leitura do arquivo HTML local
- identificação dos títulos de versículos usando `<strong>`
- remoção de tags desnecessárias
- estruturação em JSON válido
- salvamento automático no diretório alvo

---

## 7. Funcionalidades Listadas nos Rascunhos

### Confirmadas pelos arquivos:
- Lista completa dos livros
- Navegação entre livros e capítulos
- Leitura dos versículos
- Estrutura JSON definida
- Anotações para busca futura
- Planejamento do layout estilo streaming

---

## 8. Instalação

### 8.1 Requisitos
- Python 3.10+
- Navegador atualizado (caso versão web)
- VSCode ou PyCharm (opcional)
- PIP instalado

---

### 8.2 Configuração Inicial
1. Baixar o repositório.
2. Instalar dependências (se houver scripts Python):
   ```
   pip install -r requirements.txt
   ```
3. Gerar JSONs dos capítulos:
   ```
   python conversor/gerar_json.py
   ```
4. Abrir interface:
   - Web → `index.html`
   - Desktop → `python aplicativo/main.py`

---

## 9. Como Expandir o Projeto

### Adicionar nova versão bíblica
1. Inserir arquivos HTML na pasta adequada.
2. Rodar conversor para criar JSON.
3. Atualizar lista de versões na interface.

---

### Adicionar recursos
- **Busca**: indexar JSONs para texto completo.
- **Favoritos**: armazenar capítulo/versículo em arquivo local.
- **Notas pessoais**: salvar em SQLite.
- **Modo leitura contínua**: unir capítulos dinamicamente.

---

## 10. Conclusão

Este manual unifica:
- todos os rascunhos do ZIP,
- estrutura lógica do projeto,
- diretrizes textuais,
- organização proposta originalmente,
- e o funcionamento planejado para o BíbliaV1.

Ele serve como documentação base para manutenção, expansão e continuidade do software.

