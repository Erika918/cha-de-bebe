// Recupera lista de confirmados e contador salvos no navegador
let confirmados = JSON.parse(localStorage.getItem('confirmados')) || [];
let contador = parseInt(localStorage.getItem('contador')) || 0;

// Evento de envio do formulário
document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();

  if (nome) {
    contador++;

    // Define o tipo de fralda com base no contador
    const tipoFralda = contador % 2 === 0 ? 'Fralda G' : 'Fralda M';

    // Adiciona à lista
    confirmados.push({ nome, fralda: tipoFralda });

    // Salva no localStorage
    localStorage.setItem('confirmados', JSON.stringify(confirmados));
    localStorage.setItem('contador', contador);

    atualizarLista();
    atualizarPresente();

    alert(`Obrigada, ${nome}! Sua presença foi confirmada 🎉`);

    // Limpa o campo
    document.getElementById('nome').value = '';

    // Redireciona para a página de agradecimento
    setTimeout(() => {
      window.location.href = "agradecimento.html";
    }, 1000);
  }
});

// Atualiza o conteúdo da lista de confirmados
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

// Atualiza a sugestão de presente
function atualizarPresente() {
  const spanPresente = document.getElementById('presente');
  if (!spanPresente) return;

  const tipo = contador % 2 === 0 ? 'Fralda G + mimo' : 'Fralda M + mimo';
  spanPresente.textContent = tipo;
}

// Exporta a lista (pode ser usado pela Erika)
function exportarLista() {
  const texto = confirmados.map(p => `${p.nome} - ${p.fralda}`).join('\n');
  alert(`Lista de confirmados:\n${texto}`);
}

// Verifica a senha da Erika e mostra a lista
function verificarSenha() {
  const senha = document.getElementById('senha').value.trim();

  if (senha === 'evelyn2025') {
    document.getElementById('admin-section').style.display = 'block';
    document.getElementById('senha-container').style.display = 'none';
    atualizarLista(); // Mostra a lista atualizada
  } else {
    alert('Senha incorreta!');
  }
}

// Ao carregar a página, atualiza a lista e sugestão se existir
window.addEventListener('DOMContentLoaded', () => {
  atualizarLista();
  atualizarPresente();
});
