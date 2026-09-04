(() => {
  'use strict';

  // Google Ads - tag principal da Infinity Serralheria
  // Carregada uma única vez e injetada no <head> pelo script principal do site.
  if (!window.__infinityGoogleAdsLoaded) {
    window.__infinityGoogleAdsLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', 'AW-17864146896');

    const googleAdsScript = document.createElement('script');
    googleAdsScript.async = true;
    googleAdsScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17864146896';
    document.head.appendChild(googleAdsScript);
  }

  // Google Ads - conversão criada para contato/orçamento via WhatsApp.
  // Qualquer clique em um link oficial de WhatsApp da Infinity dispara a conversão.
  if (!window.__infinityGoogleAdsConversionBound) {
    window.__infinityGoogleAdsConversionBound = true;
    document.addEventListener('click', (event) => {
      const whatsappLink = event.target.closest('a[href*="wa.me/5511966321556"]');
      if (!whatsappLink || typeof window.gtag !== 'function') return;

      window.gtag('event', 'conversion', {
        send_to: 'AW-17864146896/7wDPCObAOe4CEND_pMZC'
      });
    });
  }

  const finishingStyles = document.createElement('link');
  finishingStyles.rel = 'stylesheet';
  finishingStyles.href = 'finishing.css?v=1';
  document.head.appendChild(finishingStyles);

  const brandingStyles = document.createElement('link');
  brandingStyles.rel = 'stylesheet';
  brandingStyles.href = 'branding-final.css?v=1';
  document.head.appendChild(brandingStyles);

  const logoStyles = document.createElement('link');
  logoStyles.rel = 'stylesheet';
  logoStyles.href = 'logo-update.css?v=2';
  document.head.appendChild(logoStyles);

  const materialStyles = document.createElement('link');
  materialStyles.rel = 'stylesheet';
  materialStyles.href = 'material-update.css?v=1';
  document.head.appendChild(materialStyles);

  const logoUrl = 'https://raw.githubusercontent.com/rafaelxgr/xgreat-clientes/main/infinity-serralheria/assets/InfinitySemfundo.png?v=2';
  document.querySelectorAll('.brand-crop img').forEach((logo) => {
    logo.src = logoUrl;
    logo.alt = 'Infinity Serralheria';
    logo.decoding = 'async';
  });

  const body = document.body;
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.main-nav a');
  const backToTop = document.querySelector('.back-to-top');
  const year = document.querySelector('#current-year');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = lightbox?.querySelector('img');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');
  const galleryItems = document.querySelectorAll('[data-full]');
  const videos = document.querySelectorAll('video');

  if (year) year.textContent = String(new Date().getFullYear());

  const footer = document.querySelector('.site-footer');
  if (footer) {
    footer.innerHTML = `
      <div class="container footer-pro-grid">
        <div class="footer-pro-brand">
          <a class="footer-pro-logo" href="#inicio" aria-label="Infinity Serralheria - início"><img src="${logoUrl}" alt="Infinity Serralheria"></a>
          <p>Soluções sob medida em serralheria, manutenção e automação de portões para São Paulo e região.</p>
        </div>
        <div class="footer-pro-col">
          <strong>Atendimento</strong>
          <a href="https://www.google.com/maps/search/?api=1&query=Av.%20Sanat%C3%B3rio%2C%20697%2C%20Jardim%20Modelo%2C%20S%C3%A3o%20Paulo%20SP" target="_blank" rel="noopener noreferrer">Av. Sanatório, 697</a>
          <a href="https://wa.me/5511966321556" target="_blank" rel="noopener noreferrer">WhatsApp: (11) 96632-1556</a>
          <a href="https://www.instagram.com/infinity_serralheriaa/" target="_blank" rel="noopener noreferrer">@infinity_serralheriaa</a>
        </div>
        <div class="footer-pro-col">
          <strong>Informações</strong>
          <a href="politica-de-privacidade.html">Política de Privacidade</a>
          <a href="termos-de-uso.html">Termos de Uso</a>
          <a href="politica-de-cookies.html">Política de Cookies</a>
        </div>
      </div>
      <div class="container footer-pro-bottom">
        <span>© <span id="current-year-footer">${new Date().getFullYear()}</span> Infinity Serralheria. Todos os direitos reservados.</span>
        <a href="https://xgreat.com.br" target="_blank" rel="noopener noreferrer">Projeto digital por XGREAT</a>
      </div>`;

    const footerStyle = document.createElement('style');
    footerStyle.textContent = `
      .site-footer{padding:0!important;background:#030b11!important;border-top:1px solid rgba(255,255,255,.12)!important}
      .footer-pro-grid{display:grid;grid-template-columns:1.35fr .8fr .8fr;gap:56px;padding:44px 0 34px}
      .footer-pro-logo{display:inline-block;margin-bottom:14px}.footer-pro-logo img{width:150px;height:auto;object-fit:contain}
      .footer-pro-brand p{max-width:390px;color:#8295a3;font-size:.82rem;line-height:1.7}
      .footer-pro-col{display:flex;flex-direction:column;gap:8px}.footer-pro-col strong{margin-bottom:5px;color:#fff;font-size:.83rem}
      .footer-pro-col a{color:#879aaa;font-size:.78rem;transition:color .2s ease}.footer-pro-col a:hover{color:#1dbad4}
      .footer-pro-bottom{display:flex;justify-content:space-between;gap:20px;align-items:center;padding:17px 0;border-top:1px solid rgba(255,255,255,.08);color:#617786;font-size:.7rem}
      .footer-pro-bottom a{color:#9fb2c0;font-weight:800}.footer-pro-bottom a:hover{color:#1dbad4}
      @media(max-width:760px){.footer-pro-grid{grid-template-columns:1fr;gap:26px;padding:36px 0 26px}.footer-pro-bottom{align-items:flex-start;flex-direction:column;gap:8px}.footer-pro-logo img{width:135px}}
    `;
    document.head.appendChild(footerStyle);
  }

  const closeMenu = () => {
    if (!menuToggle || !mainNav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('open');
    body.classList.remove('menu-open');
  };

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
      menuToggle.setAttribute('aria-expanded', String(willOpen));
      mainNav.classList.toggle('open', willOpen);
      body.classList.toggle('menu-open', willOpen);
    });
    navLinks.forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => { if (window.innerWidth > 820) closeMenu(); });
  }

  if (backToTop) {
    const toggleBackToTop = () => backToTop.classList.toggle('visible', window.scrollY > 600);
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();
    backToTop.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (lightbox && lightboxImage && lightboxClose) {
    const closeLightbox = () => {
      if (lightbox.open) lightbox.close();
      body.classList.remove('lightbox-open');
      lightboxImage.src = '';
    };
    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        const src = item.getAttribute('data-full');
        const thumbnail = item.querySelector('img');
        if (!src) return;
        lightboxImage.src = src;
        lightboxImage.alt = thumbnail?.alt || 'Trabalho ampliado da Infinity Serralheria';
        lightbox.showModal();
        body.classList.add('lightbox-open');
      });
    });
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
    lightbox.addEventListener('cancel', () => { body.classList.remove('lightbox-open'); lightboxImage.src = ''; });
  }

  // Destaques em vídeo: trechos curtos em loop, sem áudio e apenas quando estão visíveis.
  // Mantém os dois vídeos restantes com controles normais para não transformar a página em um festival de autoplay.
  const loopClips = {
    'mov9.mp4': { start: 2, end: 11, poster: 'assets/portao1.jpg' },
    'mov17.mp4': { start: 42, end: 56, poster: 'assets/N1.jpeg' },
    'mov15.mp4': { start: 2, end: 13, poster: 'assets/N2.jpeg' },
    'mov8.mp4': { start: 6, end: 18, poster: 'assets/portao5.jpg' }
  };

  const videoMeta = new Map();

  videos.forEach((video) => {
    const source = video.querySelector('source[data-src]');
    if (!source) return;

    // Corrige os dois caminhos antigos que ainda apontavam para a raiz do domínio.
    const originalPath = source.dataset.src || '';
    if (/^\/mov\d+\.mp4$/i.test(originalPath)) {
      source.dataset.src = `assets/${originalPath.slice(1)}`;
    }

    const fileName = (source.dataset.src || '').split('/').pop();
    const clip = fileName ? loopClips[fileName] : null;

    if (clip) {
      video.classList.add('video-loop-highlight');
      video.controls = false;
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('aria-live', 'off');
      if (!video.getAttribute('poster') && clip.poster) video.poster = clip.poster;

      video.addEventListener('timeupdate', () => {
        if (video.currentTime >= clip.end) {
          video.currentTime = clip.start;
          video.play().catch(() => {});
        }
      });

      video.addEventListener('ended', () => {
        video.currentTime = clip.start;
        video.play().catch(() => {});
      });
    }

    videoMeta.set(video, { source, clip });
  });

  const loadVideo = (video, shouldPlay = false) => {
    const meta = videoMeta.get(video);
    if (!meta) return;
    const { source, clip } = meta;

    const startPlayback = () => {
      if (!clip || !shouldPlay) return;
      if (video.currentTime < clip.start || video.currentTime >= clip.end) {
        video.currentTime = clip.start;
      }
      video.play().catch(() => {});
    };

    if (source && !source.src) {
      source.src = source.dataset.src || '';
      video.addEventListener('loadedmetadata', startPlayback, { once: true });
      video.load();
    } else {
      startPlayback();
    }
  };

  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        const meta = videoMeta.get(video);
        if (!meta) return;

        if (entry.isIntersecting) {
          loadVideo(video, Boolean(meta.clip));
        } else if (meta.clip) {
          video.pause();
        }
      });
    }, { rootMargin: '180px 0px', threshold: 0.35 });

    videos.forEach((video) => videoObserver.observe(video));
  } else {
    videos.forEach((video) => {
      const meta = videoMeta.get(video);
      loadVideo(video, Boolean(meta?.clip));
    });
  }

  document.querySelectorAll('a[href^="#"]:not(.back-to-top)').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();