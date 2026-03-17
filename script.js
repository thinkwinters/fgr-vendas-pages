const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.site-nav a');
const forms = document.querySelectorAll('.lead-form');
const siteHeader = document.querySelector('.site-header');
const progressBar = document.querySelector('.scroll-progress');

const popup = document.getElementById('lead-popup');
const popupTitle = document.getElementById('popup-title');
const popupText = document.getElementById('popup-text');
const popupClose = document.querySelector('.popup-close');

const popupConfig = {
  inactivityMs: 35000,
  timeOnPageMs: 45000,
  scrollPercent: 60,
  sessionCooldownMs: 1800000,
};

const popupMessages = {
  exit_intent: {
    title: 'Antes de sair, veja as opções para mudar agora.',
    text: 'Fale com especialista e receba no WhatsApp disponibilidade e localização do Jardins Berlim.',
  },
  inactivity: {
    title: 'Ainda avaliando? Nós te ajudamos com clareza.',
    text: 'Receba no WhatsApp as opções atualizadas e avance com segurança na decisão.',
  },
  time_on_page: {
    title: 'Você já viu os diferenciais. Vamos para o próximo passo?',
    text: 'Envie seus dados e receba atendimento consultivo para entender disponibilidade atual.',
  },
};

let inactivityTimer;
let popupShown = false;

function handleScrollEffects() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (progressBar) progressBar.style.width = `${Math.min(progress, 100)}%`;
  if (siteHeader) siteHeader.classList.toggle('scrolled', scrollTop > 24);
}

function setPopupContent(trigger) {
  const message = popupMessages[trigger] ?? popupMessages.time_on_page;
  popupTitle.textContent = message.title;
  popupText.textContent = message.text;
  popup.dataset.trigger = trigger;
}

function canOpenPopup() {
  if (!popup || popupShown) return false;
  const lastShownAt = Number(sessionStorage.getItem('jb_last_popup_at') ?? 0);
  return Date.now() - lastShownAt > popupConfig.sessionCooldownMs;
}

function openPopup(trigger) {
  if (!canOpenPopup()) return;
  setPopupContent(trigger);
  popup.showModal();
  popupShown = true;
  sessionStorage.setItem('jb_last_popup_at', String(Date.now()));
}

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => openPopup('inactivity'), popupConfig.inactivityMs);
}

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

forms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = form.querySelector('.form-message');
    const phoneInput = form.querySelector('input[name="telefone"]');

    if (phoneInput) {
      phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 11);
    }

    if (!form.checkValidity()) {
      message.textContent = 'Revise os campos obrigatórios antes de continuar.';
      message.style.color = '#a53838';
      form.reportValidity();
      return;
    }

    message.textContent = 'Perfeito! Solicitação enviada. Um especialista entrará em contato em breve.';
    message.style.color = '#1f6f52';
    form.reset();
  });
});

const phoneInputs = document.querySelectorAll('input[name="telefone"]');
phoneInputs.forEach((input) => {
  input.addEventListener('input', () => {
    const digits = input.value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 10) {
      input.value = digits.replace(/(\d{0,2})(\d{0,4})(\d{0,4})/, (_, a, b, c) => {
        if (!b) return a;
        if (!c) return `(${a}) ${b}`;
        return `(${a}) ${b}-${c}`;
      });
      return;
    }

    input.value = digits.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, '($1) $2-$3');
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

    if (isOutside) lightbox.close();
  });
}

if (popup) {
  popupClose?.addEventListener('click', () => popup.close());

  popup.addEventListener('click', (event) => {
    const bounds = popup.getBoundingClientRect();
    const isOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (isOutside) popup.close();
  });

  setTimeout(() => openPopup('time_on_page'), popupConfig.timeOnPageMs);

  document.addEventListener('mouseleave', (event) => {
    if (event.clientY <= 0) openPopup('exit_intent');
  });

  const activityEvents = ['mousemove', 'scroll', 'keydown', 'touchstart'];
  activityEvents.forEach((eventName) => {
    document.addEventListener(eventName, resetInactivityTimer, { passive: true });
  });
  resetInactivityTimer();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > popupConfig.scrollPercent / 100) {
          openPopup('time_on_page');
        }
      });
    },
    { threshold: popupConfig.scrollPercent / 100 }
  );

  const condicoesSection = document.getElementById('condicoes');
  if (condicoesSection) observer.observe(condicoesSection);
}

window.addEventListener('scroll', handleScrollEffects, { passive: true });
handleScrollEffects();
