// Eva Glamour Brand Marquee -- loop infinito adaptativo
(function () {
  function fixMarquee() {
    var section = document.querySelector('.eva-marquee-section');
    var track = document.querySelector('.eva-marquee-track');
    if (!section || !track) return;

    // Pega apenas os items originais (SET 1, sem aria-hidden)
    var origItems = Array.prototype.slice.call(
      track.querySelectorAll('.eva-marquee-item:not([aria-hidden])')
    );
    if (!origItems.length) return;

    // Remove clones anteriores
    var clones = track.querySelectorAll('.eva-marquee-item[aria-hidden]');
    Array.prototype.forEach.call(clones, function (el) { el.remove(); });

    // Clona até o track ter pelo menos 2x a largura da tela
    var needed = window.innerWidth * 2;
    var copies = 1;
    while (track.scrollWidth < needed && copies < 8) {
      origItems.forEach(function (item) {
        var clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
      copies++;
    }

    // Injeta keyframe com porcentagem correta para 'copies' conjuntos
    var pct = (100 / copies).toFixed(3);
    var styleId = 'eva-marquee-keyframe';
    var styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent =
      '@keyframes eva-scroll-left{' +
      '0%{transform:translateX(0)}' +
      '100%{transform:translateX(-' + pct + '%)}' +
      '}';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixMarquee);
  } else {
    fixMarquee();
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(fixMarquee, 200);
  });
})();
