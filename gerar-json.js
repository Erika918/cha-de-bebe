  const fs = require('fs');       // módulo para ler/escrever arquivos
  const path = require('path');   // módulo para trabalhar com caminhos de arquivo

  const pasta = './fotos'; // pasta onde estão suas fotos e vídeos

  // Lê todos os arquivos da pasta
  const arquivos = fs.readdirSync(pasta);

  // Filtra apenas imagens e vídeos
  const arquivosFiltrados = arquivos.filter(file => /\.(jpg|jpeg|png|gif|mp4)$/i.test(file));

  // Cria array de objetos com src e type
  const listaArquivos = arquivosFiltrados.map(file => ({
    src: `fotos/${file}`,
    type: file.endsWith('.mp4') ? 'video' : 'image'
  }));

  // Salva o JSON em arquivos.json
  fs.writeFileSync('arquivos.json', JSON.stringify(listaArquivos, null, 2));

  console.log('JSON gerado com sucesso! Total de arquivos:', listaArquivos.length);
