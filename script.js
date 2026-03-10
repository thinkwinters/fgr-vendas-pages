const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.site-nav a');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    body.classList.toggle('menu-open');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const forms = document.querySelectorAll('.lead-form');
forms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = form.querySelector('.form-message');

    if (!form.checkValidity()) {
      message.textContent = 'Revise os campos obrigatórios antes de continuar.';
      message.style.color = '#9f2e2e';
      form.reportValidity();
      return;
    }

    message.textContent = 'Perfeito! Seu pedido foi enviado. Em breve um especialista entrará em contato.';
    message.style.color = '#1f6f52';
    form.reset();
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const galleryItems = document.querySelectorAll('.mosaic-item');

if (lightbox && lightboxImage) {
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const imagePath = item.getAttribute('data-lightbox');
      const imageAlt = item.querySelector('img')?.getAttribute('alt') ?? 'Imagem da galeria';
      lightboxImage.src = imagePath;
      lightboxImage.alt = imageAlt;
      lightbox.showModal();
    });
  });

  lightboxClose?.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => {
    const bounds = lightbox.getBoundingClientRect();
    const isOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (isOutside) {
      lightbox.close();
    }
  });
}
