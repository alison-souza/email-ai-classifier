# 🤖 Email AI Classifier – Classificação e Resposta Automática de Emails com IA

![Status](https://img.shields.io/badge/Status-Conclu%C3%ADdo-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## 💻 Preview

![Preview do Email AI Classifier](assets/preview1.png)
![Preview do Email AI Classifier](assets/preview2.png)
![Preview do Email AI Classifier](assets/preview3.png)

O **Email AI Classifier** é uma aplicação web que utiliza Inteligência Artificial para **classificar automaticamente emails corporativos e sugerir respostas inteligentes**.

O objetivo do projeto é **automatizar o tratamento de emails**, liberando tempo da equipe para atividades mais estratégicas, ao mesmo tempo que mantém a comunicação profissional e eficiente.

---

## 📸 Visão Geral

O sistema permite:

- Inserção direta de texto de emails ou upload de arquivos (.txt, .pdf)
- Classificação automática de emails em Produtivo ou Improdutivo
- Sugestão de respostas automáticas com linguagem corporativa
- Histórico de emails processados
- Interface moderna, responsiva e com tema claro/escuro
- Copiar resposta com um clique

---

## 🚀 Funcionalidades

### 📄 Classificação de Emails

- Upload de arquivo ou inserção de texto
- Pré-processamento do texto (remoção de stopwords, normalização)
- Envio para IA para classificação em Produtivo ou Improdutivo

### 🧠 Resposta Automática Inteligente

- Emails Produtivos recebem respostas detalhadas e objetivas
- Emails Improdutivos recebem respostas curtas e educadas
- Linguagem corporativa clara, sem emojis e com parágrafos organizados

### ⏳ Experiência do Usuário

- Loader durante o processamento
- Bloqueio do formulário enquanto a IA responde
- Feedback visual do resultado (categoria, resposta e tempo de processamento)

### 🕘 Histórico de Emails

- Armazenamento de até 10 emails processados
- Visualização de categoria, data e conteúdo
- Remoção individual ou limpeza completa do histórico
- Persistência local via localStorage

### 🎨 Customização

- Tema claro/escuro alternável
- Interface moderna e responsiva

---

## 🛠️ Tecnologias Utilizadas

**Frontend:**

- HTML, CSS e JavaScript puro
- Drag & Drop para arquivos
- LocalStorage para histórico
- Tema escuro/claro com toggle

**Backend:**

- Python
- Flask + Flask-CORS
- OpenAI GPT (via openai Python SDK)
- NLP: NLTK (stopwords e stemming)
- PDF Reading: PyPDF2

---

## 📂 Estrutura do Projeto

```text
email-ai-classifier/
├── assets/
├── backend/
│   ├── services/
│   │   ├── __init__.py
│   │   ├── classifier.py
│   │   ├── file_reader.py
│   │   ├── nlp_processor.py
│   │   ├── openai_client.py
│   │   └── responder.py
│   ├── venv/
│   ├── .env
│   ├── app.py
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
└── README.md
```

---

## ⚙️ Como Executar o Projeto

1. Configuração do Backend:

```bash
python -m venv venv
source venv/bin/activate    # Linux/Mac
venv\Scripts\activate       # Windows

pip install -r requirements.txt
python app.py
```

O backend será iniciado em:

```text
http://127.0.0.1:5000
```

2. Configuração do Frontend:

- Abra o `index.html` diretamente no navegador ou use um servidor local simples, como:

```bash
python -m http.server 8000
```

Acesse:

```text
http://localhost:8000
```

---

## 🌐 Links do Projeto

- **Repositório no GitHub:** #LINK AQUI
- **Vídeo Demonstrativo:** #LINK AQUI
- **Aplicação Hospedada:** #LINK AQUI

---

## 📌 Melhorias Futuras

- Suporte a mais formatos de arquivos (DOC, DOCX, EML)
- Dashboard com métricas de produtividade dos emails
- Treinamento customizado da IA para linguagem corporativa específica da empresa
- Notificações e alertas para emails críticos

#### ⭐ Se este projeto chamou sua atenção, deixe uma estrela no repositório!
