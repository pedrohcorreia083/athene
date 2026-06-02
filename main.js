/* ═══════════════════════════════════════════════════════════
   ATHENE SOLUÇÕES CONTÁBEIS — main.js
   Bootstrap 5 + Vanilla JS
═══════════════════════════════════════════════════════════ */

/* ── DADOS: Carrossel de clientes ─────────────────────────── */
const CLIENTS_SLIDES = [
  [
    { icon: 'bi-briefcase-fill',   label: 'Advogados' },
    { icon: 'bi-vector-pen',       label: 'Arquitetos' },
    { icon: 'bi-palette-fill',     label: 'Artistas' },
    { icon: 'bi-camera-video-fill',label: 'Bloggers & Youtubers' },
    { icon: 'bi-shop',             label: 'Comércio' },
  ],
  [
    { icon: 'bi-building',         label: 'Construção Civil' },
    { icon: 'bi-house-door',       label: 'Corretores' },
    { icon: 'bi-cart-fill',        label: 'E-commerce' },
    { icon: 'bi-rulers',           label: 'Engenheiros' },
    { icon: 'bi-gear-fill',        label: 'Indústrias' },
  ],
  [
    { icon: 'bi-activity',         label: 'Personal Trainers' },
    { icon: 'bi-briefcase-fill',   label: 'Prestadores de Serviços' },
    { icon: 'bi-journal',          label: 'Professores' },
    { icon: 'bi-scissors',         label: 'Profissionais da Beleza' },
    { icon: 'bi-heart-pulse',      label: 'Profissionais da Saúde' },
  ],
  [
    { icon: 'bi-pc-display',       label: 'Profissionais de TI' },
    { icon: 'bi-people',           label: 'Profissionais Liberais' },
    { icon: 'bi-megaphone-fill',   label: 'Publicitários' },
  ],
];

/* ══════════════════════════════════════════════════════════
   1. NAVBAR — scroll & transparência
══════════════════════════════════════════════════════════ */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  function onScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // estado inicial
})();

/* ══════════════════════════════════════════════════════════
   2. MENU MOBILE
══════════════════════════════════════════════════════════ */
(function initMobileMenu() {
  const burger  = document.getElementById('navBurger');
  const overlay = document.getElementById('mobileMenu');
  const close   = document.getElementById('mobileClose');
  if (!burger || !overlay) return;

  burger.addEventListener('click', () => overlay.classList.add('open'));
  close.addEventListener('click',  () => overlay.classList.remove('open'));

  // Fechar ao clicar em qualquer link do overlay
  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => overlay.classList.remove('open'));
  });
})();

/* ══════════════════════════════════════════════════════════
   3. SCROLL TOP BUTTON
══════════════════════════════════════════════════════════ */
(function initScrollTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }, { passive: true });
})();

/* ══════════════════════════════════════════════════════════
   4. ANIMAÇÕES DE ENTRADA (IntersectionObserver)
══════════════════════════════════════════════════════════ */
(function initFadeAnimations() {
  const elements = document.querySelectorAll('[data-fade]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // anima só uma vez
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
})();

/* ══════════════════════════════════════════════════════════
   5. CARROSSEL DE CLIENTES
══════════════════════════════════════════════════════════ */
(function initClientsCarousel() {
  const slideEl = document.getElementById('clientsSlide');
  const dotsEl  = document.getElementById('slideDots');
  if (!slideEl || !dotsEl) return;

  let current  = 0;
  let interval = null;

  /* Renderiza um slide */
  function renderSlide(index) {
    // Fade out
    slideEl.style.opacity = '0';

    setTimeout(() => {
      // Limpar conteúdo
      slideEl.innerHTML = '';

      // Criar cards
      CLIENTS_SLIDES[index].forEach(client => {
        const box = document.createElement('div');
        box.className = 'client-box';
        box.innerHTML = `
          <i class="bi ${client.icon}"></i>
          <p>${client.label}</p>
        `;
        slideEl.appendChild(box);
      });

      // Atualizar dots
      dotsEl.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });

      // Fade in
      slideEl.style.opacity = '1';
    }, 300);
  }

  /* Criar dots */
  CLIENTS_SLIDES.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => {
      goTo(i);
      resetInterval();
    });
    dotsEl.appendChild(dot);
  });

  /* Ir para slide */
  function goTo(index) {
    current = index;
    renderSlide(current);
  }

  /* Auto-play */
  function startInterval() {
    interval = setInterval(() => {
      current = (current + 1) % CLIENTS_SLIDES.length;
      renderSlide(current);
    }, 3500);
  }

  function resetInterval() {
    clearInterval(interval);
    startInterval();
  }

  /* Inicializar */
  renderSlide(0);
  startInterval();
})();

/* ══════════════════════════════════════════════════════════
   6. SMOOTH SCROLL para links de âncora
══════════════════════════════════════════════════════════ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80; // altura da navbar fixa
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
