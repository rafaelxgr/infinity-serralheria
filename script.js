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

  // Google Ads - conversão de contato/orçamento via WhatsApp.
  // Usa o snippet oficial de clique e o rótulo correto da ação "Solicitar cotação (1)".
  if (!window.__infinityGoogleAdsConversionBound) {
    window.__infinityGoogleAdsConversionBound = true;
    document.addEventListener('click', (event) => {
      const whatsappLink = event.target.closest('a[href*="wa.me/5511966321556"]');
      if (!whatsappLink || typeof window.gtag !== 'function') return;
      window.gtag('event', 'conversion', {
        send_to: 'AW-17864146896/ky9RCLuQtPMcEND_pMZC',
        transport_type: 'beacon'
      });
    });
  }

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
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionBehavior = () => reducedMotion.matches ? 'auto' : 'smooth';
  const brandsPause = document.querySelector('.brands-pause');
  brandsPause?.addEventListener('click', () => {
    const paused = brandsPause.getAttribute('aria-pressed') !== 'true';
    brandsPause.setAttribute('aria-pressed', String(paused));
    brandsPause.setAttribute('aria-label', paused ? 'Retomar movimento das marcas' : 'Pausar movimento das marcas');
    brandsPause.textContent = paused ? 'Retomar' : 'Pausar';
    document.querySelector('.brands-track')?.classList.toggle('is-paused', paused);
  });

  if (year) year.textContent = String(new Date().getFullYear());

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
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuToggle.focus();
      }
    });
    window.addEventListener('resize', () => { if (window.innerWidth > 1020) closeMenu(); });
  }

  if (backToTop) {
    const toggleBackToTop = () => backToTop.classList.toggle('visible', window.scrollY > 600);
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();
    backToTop.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      window.scrollTo({ top: 0, behavior: motionBehavior() });
    });
  }

  if (lightbox && lightboxImage && lightboxClose) {
    const closeLightbox = () => {
      if (lightbox.open) lightbox.close();
      body.classList.remove('lightbox-open');
      lightboxImage.removeAttribute('src');
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
    lightbox.addEventListener('cancel', () => { body.classList.remove('lightbox-open'); lightboxImage.removeAttribute('src'); });
  }

  // Destaques em vídeo: trechos curtos em loop, sem áudio e apenas quando estão visíveis.
  // Os controles permanecem disponíveis em todos os vídeos para pausar a reprodução.
  const loopClips = {
    'mov9.mp4': { start: 2, end: 11, poster: 'assets/portao1.jpg' },
    'mov17.mp4': { start: 42, end: 56, poster: 'assets/N1.jpeg' },
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
      video.controls = true;
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('aria-live', 'off');
      if (!video.getAttribute('poster') && clip.poster) video.poster = clip.poster;

      video.addEventListener('timeupdate', () => {
        if (!reducedMotion.matches && video.currentTime >= clip.end) {
          video.currentTime = clip.start;
          video.play().catch(() => {});
        }
      });

      video.addEventListener('ended', () => {
        if (reducedMotion.matches) return;
        video.currentTime = clip.start;
        video.play().catch(() => {});
      });
    }

    videoMeta.set(video, { source, clip });
  });

  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) videos.forEach((video) => video.pause());
  });

  const loadVideo = (video, shouldPlay = false) => {
    const meta = videoMeta.get(video);
    if (!meta) return;
    const { source, clip } = meta;

    const startPlayback = () => {
      if (!clip || !shouldPlay || reducedMotion.matches) return;
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
      target.scrollIntoView({ behavior: motionBehavior(), block: 'start' });
    });
  });
})();
