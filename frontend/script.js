// script.js
const MAX_CHARS = 5000;
const BACKEND_URL = "https://email-ai-classifier-q6mq.onrender.com"; // <-- altere para sua URL do Render

const form = document.getElementById("emailForm");
const emailText = document.getElementById("emailText");
const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");
const result = document.getElementById("result");
const categoryBadge = document.getElementById("categoryBadge");
const aiResponse = document.getElementById("aiResponse");
const responseTimeEl = document.getElementById("responseTime");
const loader = document.getElementById("loader");
const btnText = document.getElementById("btnText");
const historyList = document.getElementById("historyList");
const themeToggle = document.getElementById("themeToggle");
const clearHistoryBtn = document.getElementById("clearHistory");
const formError = document.getElementById("formError");
const copyBtn = document.getElementById("copyBtn");

let selectedFile = null;

/* =======================
   THEME
======================= */
themeToggle.onclick = () => {
  const html = document.documentElement;
  const icon = themeToggle.querySelector(".icon");

  const isDark = html.dataset.theme === "dark";
  html.dataset.theme = isDark ? "light" : "dark";
  icon.textContent = isDark ? "☀️" : "🌙";

  localStorage.setItem("theme", html.dataset.theme);
};

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
  themeToggle.querySelector(".icon").textContent =
    savedTheme === "dark" ? "🌙" : "☀️";
}

/* =======================
   DRAG & DROP
======================= */
dropZone.onclick = () => fileInput.click();

fileInput.onchange = () => {
  selectedFile = fileInput.files[0];
  dropZone.innerHTML = `📄 ${selectedFile.name} <br><small>Clique para trocar</small>`;
  emailText.value = "";
};

/* =======================
   FORM
======================= */
form.onsubmit = async (e) => {
  e.preventDefault();

  const text = emailText.value.trim();
  const file = fileInput.files[0];

  if (!text && !file) {
    showFormError("Insira um texto ou envie um arquivo.");
    return;
  }

  if (text.length > MAX_CHARS) {
    showFormError("Texto excede o limite de 5.000 caracteres.");
    return;
  }

  clearFormError();

  btnText.classList.add("hidden");
  loader.classList.remove("hidden");
  form.querySelector("button").disabled = true;

  result.classList.add("hidden");
  copyBtn.classList.add("hidden");
  copyBtn.classList.remove("copied");
  copyBtn.textContent = "📋 Copiar resposta";

  const start = performance.now();

  const formData = new FormData();
  if (text) formData.append("text", sanitize(text));
  if (file) formData.append("file", file);

  try {
    const res = await fetch(`${BACKEND_URL}/process`, {
      // <-- mudou aqui
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    const end = performance.now();

    categoryBadge.textContent = data.category;
    aiResponse.textContent = data.response;
    responseTimeEl.textContent = `⏱ ${(end - start).toFixed(0)} ms`;

    copyBtn.classList.remove("hidden");

    saveHistory(text || "[Arquivo enviado]", data.category);
    loadHistory();

    result.classList.remove("hidden");
  } catch (err) {
    showFormError("Erro ao processar o email. Tente novamente.");
  } finally {
    loader.classList.add("hidden");
    btnText.classList.remove("hidden");
    form.querySelector("button").disabled = false;
  }
};

/* =======================
   SANITIZAÇÃO
======================= */
function sanitize(str) {
  return str.replace(/[<>]/g, "");
}

/* =======================
   HISTÓRICO
======================= */
function saveHistory(email, category) {
  const history = JSON.parse(localStorage.getItem("history") || "[]");

  history.unshift({
    id: crypto.randomUUID(),
    email: email.slice(0, 120),
    category,
    date: new Date().toLocaleString(),
  });

  localStorage.setItem("history", JSON.stringify(history.slice(0, 10)));
}

function loadHistory() {
  historyList.innerHTML = "";
  const history = JSON.parse(localStorage.getItem("history") || "[]");

  history.forEach((h) => {
    const li = document.createElement("li");
    li.className = "history-card";

    li.innerHTML = `
      <strong class="${h.category.toLowerCase()}">${h.category}</strong>
      <small>${h.date}</small>
      <em>${h.email}</em>
      <button class="remove-item">Remover</button>
    `;

    li.querySelector(".remove-item").onclick = () => {
      removeHistoryItem(h.id);
    };

    historyList.appendChild(li);
  });
}

function removeHistoryItem(id) {
  let history = JSON.parse(localStorage.getItem("history") || "[]");
  history = history.filter((item) => item.id !== id);
  localStorage.setItem("history", JSON.stringify(history));
  loadHistory();
}

/* Limpar tudo */
clearHistoryBtn.onclick = () => {
  if (!confirm("Deseja realmente limpar todo o histórico?")) return;
  localStorage.removeItem("history");
  loadHistory();
};

/* =======================
   ERROS
======================= */
function showFormError(message) {
  formError.textContent = message;
  formError.classList.remove("hidden");
}

function clearFormError() {
  formError.textContent = "";
  formError.classList.add("hidden");
}

loadHistory();

/* =======================
   COPIAR RESPOSTA
======================= */
copyBtn.onclick = () => {
  const text = aiResponse.textContent;
  if (!text) return;

  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = "✅ Copiado!";
    copyBtn.classList.add("copied");

    setTimeout(() => {
      copyBtn.textContent = "📋 Copiar resposta";
      copyBtn.classList.remove("copied");
    }, 2000);
  });
};
