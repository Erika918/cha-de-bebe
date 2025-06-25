// Recupera lista de confirmados e contador salvos no navegador
let confirmados = JSON.parse(localStorage.getItem('confirmados')) || [];
let contador = parseInt(localStorage.getItem('contador')) || 0;

// URL do seu script Google Apps Script (substitua por sua URL final se mudar)
const scriptURL = "https://script.google.com/macros/s/AKfycbzinETNSQ3eyyC1Sv1ooW2ar7FGqxw5tL7O_HcF4RcVlwxaPPHMxL9He7w7VqOPJyc/exec";

// Evento de envio do formulário
document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();

  if (nome) {
    contador++;

    const tipoFralda = contador % 2 === 0 ? 'Fralda G' : 'Fralda M';
    const presente = `${tipoFralda} + mimo`;

    // Adiciona localmente
    confirmados.push({ nome, fralda: tipoFralda });

    // Salva no localStorage
    localStorage.setItem('confirmados', JSON.stringify(confirmados));
    localStorage.setItem('contador', contador);

    atualizarLista();
    atualizarPresente();

    // Envia para a planilha via Apps Script
    fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify({ nome, presenca: "Sim", presente }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.text())
    .then(data => {
      alert(`Obrigada, ${nome}! Sua presença foi confirmada 🎉`);
      document.getElementById('nome').value = '';
      setTimeout(() => {
        window.location.href = "agradecimento.html";
      }, 1000);
    })
    .catch(error => {
      alert("Erro ao enviar para a planilha: " + error);
    });
  }
});

// Atualiza a lista de confirmados
function atualizarLista() {
  const lista = document.getElementById('lista-confirmados');
  if (!lista) return;

  lista.innerHTML = '';

  confirmados.forEach((pessoa, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${pessoa.nome} — ${pessoa.fralda} + mimo`;
    lista.appendChild(li);
  });
}

// Atualiza sugestão de presente
function atualizarPresente() {
  const spanPresente = document.getElementById('presente');
  if (!spanPresente) return;

  const tipo = contador % 2 === 0 ? 'Fralda G + mimo' : 'Fralda M + mimo';
  spanPresente.textContent = tipo;
}

// Exporta a lista para visualização rápida
function exportarLista() {
  const texto = confirmados.map(p => `${p.nome} - ${p.fralda}`).join('\n');
  alert(`Lista de confirmados:\n${texto}`);
}

// Verifica a senha e exibe a lista
function verificarSenha() {
  const senha = document.getElementById('senha').value.trim();
  if (senha === 'evelyn2025') {
    document.getElementById('admin-section').style.display = 'block';
    document.getElementById('senha-container').style.display = 'none';
    atualizarLista();
  } else {
    alert('Senha incorreta!');
  }
}

// Carrega a sugestão e lista ao abrir a página
window.addEventListener('DOMContentLoaded', () => {
  atualizarLista();
  atualizarPresente();
});
