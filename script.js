const confirmados = [];
let contador = 0;

document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();

  if (nome) {
    confirmados.push(nome);
    contador++;

    atualizarLista();
    atualizarPresente(); // Atualiza o tipo de fralda

    alert(`Obrigada, ${nome}! Sua presença foi confirmada 🎉`);

    document.getElementById('nome').value = '';

    // Redireciona após 1 segundo
    setTimeout(() => {
      window.location.href = "agradecimento.html";
    }, 1000);
  }
});

function atualizarLista() {
  const lista = document.getElementById('lista-confirmados');
  if (!lista) return;

  lista.innerHTML = '';

  confirmados.forEach((nomeConfirmado) => {
    const li = document.createElement('li');
    li.textContent = nomeConfirmado;
    lista.appendChild(li);
  });
}

function atualizarPresente() {
  const spanPresente = document.getElementById('presente');
  if (!spanPresente) return;

  // Alterna para Fralda G a cada 2 confirmações
  if (contador % 2 === 0) {
    spanPresente.textContent = 'Fralda G + mimo';
  } else {
    spanPresente.textContent = 'Fralda M + mimo';
  }
}

function exportarLista() {
  const texto = confirmados.join('\n');
  alert(`Lista de confirmados:\n${texto}`);
}

function verificarSenha() {
  const senha = document.getElementById('senha').value.trim();

  if (senha === 'suaSenhaAqui') {
    document.getElementById('admin-section').style.display = 'block';
    document.getElementById('senha-container').style.display = 'none';
    atualizarLista();
  } else {
    alert('Senha incorreta!');
  }
}
