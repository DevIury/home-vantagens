/*
 * Home Vantagens — carrega o cabeçalho compartilhado do blog (blog/header.html).
 * Uso em qualquer página do blog:
 *   <div id="shared-header"></div>              (opcional: data-dark="true" para fundo azul-escuro)
 *   <script src="header.js" defer></script>
 * Para editar o menu, altere somente o arquivo header.html.
 */
(function () {
  var script = document.currentScript;
  var url = new URL('header.html', script && script.src ? script.src : window.location.href).href;

  function getHost() {
    var host = document.getElementById('shared-header');
    if (!host) {
      host = document.createElement('div');
      host.id = 'shared-header';
      document.body.insertBefore(host, document.body.firstChild);
    }
    return host;
  }

  function bindMenu(host) {
    var burger = host.querySelector('.hv-burger');
    var drawer = host.querySelector('.hv-drawer');
    if (!burger || !drawer) return;
    var icon = burger.querySelector('i');
    function setOpen(open) {
      drawer.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      if (icon) icon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    }
    burger.addEventListener('click', function () { setOpen(!drawer.classList.contains('open')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    drawer.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
  }

  function mount(html) {
    var host = getHost();
    host.innerHTML = html;
    bindMenu(host);
  }

  function fallback() {
    // Se header.html não puder ser carregado (por exemplo, abrindo o arquivo direto do disco)
    var host = getHost();
    host.innerHTML = '<div style="padding:16px;text-align:center;background:#051329;font-family:sans-serif">' +
      '<a href="../index.html" style="color:#fff;font-weight:700;text-decoration:none">Home Vantagens</a>' +
      ' <span style="color:#F36B21">·</span> <a href="../index.html#atendimento" style="color:#fff;text-decoration:none">Falar com especialista</a></div>';
  }

  function injectFloats() {
    if (document.getElementById('hvWhats')) return;
    var css = document.createElement('style');
    css.textContent = [
      '.hv-float{position:fixed;bottom:calc(22px + env(safe-area-inset-bottom,0px));z-index:70;width:54px;height:54px;border-radius:9999px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .2s ease,background-color .2s ease,box-shadow .2s ease,opacity .25s ease,visibility .25s ease}',
      '.hv-float:hover{transform:translateY(-3px)}',
      '#hvWhats{right:20px;background:#F36B21;color:#fff;border:0;box-shadow:0 12px 26px -8px rgba(243,107,33,.7);text-decoration:none}',
      '#hvWhats svg{width:27px;height:27px;fill:#fff}',
      '#hvWhats:hover{background:#D9560F}',
      '#hvTop{left:20px;background:#051329;border:1px solid rgba(255,255,255,.14);box-shadow:0 10px 26px -10px rgba(5,19,41,.7);opacity:0;visibility:hidden}',
      '#hvTop i{color:#F36B21;font-size:17px}',
      '#hvTop.show{opacity:1;visibility:visible}',
      '#hvTop:hover{background:#0D2447}',
      '@media (max-width:640px){.hv-float{width:50px;height:50px}#hvWhats{right:16px}#hvWhats svg{width:25px;height:25px}#hvTop{left:16px}}',
      '@media (prefers-reduced-motion:reduce){.hv-float{transition:none}}'
    ].join('');
    document.head.appendChild(css);

    var wa = document.createElement('a');
    wa.id = 'hvWhats';
    wa.className = 'hv-float';
    wa.href = 'https://wa.me/5500000000000?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Home%20Vantagens.';
    wa.target = '_blank';
    wa.rel = 'noopener';
    wa.setAttribute('aria-label', 'Falar no WhatsApp');
    wa.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>';

    var top = document.createElement('button');
    top.id = 'hvTop';
    top.className = 'hv-float';
    top.type = 'button';
    top.setAttribute('aria-label', 'Voltar ao topo');
    top.innerHTML = '<i class="fa-solid fa-arrow-up" aria-hidden="true"></i>';

    document.body.appendChild(wa);
    document.body.appendChild(top);

    function onScroll() { top.classList.toggle('show', window.scrollY > 400); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    top.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function init() {
    injectFloats();
    fetch(url)
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(mount)
      .catch(fallback);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
