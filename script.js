// ============================
// GALERIA / LIGHTBOX
// ============================
let items = [];
let currentIndex = 0;

// Carregar arquivos do JSON (arquivos.json)
fetch('arquivos.json')
  .then(res => res.json())
  .then(data => {
    items = data;
    const galeria = document.getElementById('galeria');

    items.forEach((item, index) => {
      if(item.type === 'image'){
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = "Foto do Chá da Evelyn";
        img.onclick = () => openLightbox(index);
        galeria.appendChild(img);
      } else if(item.type === 'video'){
        const vid = document.createElement('video');
        vid.src = item.src;
        vid.controls = true;
        vid.onclick = () => openLightbox(index);
        galeria.appendChild(vid);
      }
    });
  });

// Elementos do lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');
const closeBtn = document.querySelector(".lightbox .close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

// Botão abrir em nova aba
const abrirNovaAbaBtn = document.getElementById("abrir-nova-aba");
abrirNovaAbaBtn.onclick = () => {
  const item = items[currentIndex];
  window.open(item.src, '_blank');
};

// Função abrir lightbox
function openLightbox(index){
  const item = items[index];
  currentIndex = index;

  if(item.type === 'video'){
    lightboxVideo.style.display = 'block';
    lightboxImg.style.display = 'none';
    lightboxVideo.src = item.src;
    lightboxVideo.play();
  } else {
    lightboxImg.style.display = 'block';
    lightboxVideo.style.display = 'none';
    lightboxVideo.pause();
    lightboxImg.src = item.src;
  }

  lightbox.style.display = 'flex';
}

// Fechar lightbox
closeBtn.onclick = () => { 
  lightbox.style.display = 'none'; 
  lightboxVideo.pause(); 
};

// Navegação
prevBtn.onclick = () => { 
  currentIndex = (currentIndex - 1 + items.length) % items.length; 
  openLightbox(currentIndex); 
};
nextBtn.onclick = () => { 
  currentIndex = (currentIndex + 1) % items.length; 
  openLightbox(currentIndex); 
};
