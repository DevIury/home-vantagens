/* Menu Home Vantagens — idêntico ao do index.html.
   Uso (em qualquer página do blog, qualquer profundidade de pasta):
     <script src="/caminho/para/blog/menu.js" defer></script>
   Opcional: data-theme="dark" na tag <script> pinta a faixa atrás do menu de azul.
   O <header> antigo (filho direto do <body>) é removido automaticamente; data-keep-header desativa isso.
   Opcional: <div id="site-menu"></div> define onde o menu aparece (padrão: topo do <body>). */
(function () {
  var script = document.currentScript;
  var base = new URL('../', script.src).href;           // raiz do site (pasta acima de /blog/)
  var dark = script.dataset.theme === 'dark';
  var WA = 'https://wa.me/5500000000000?text=Ol%C3%A1%2C%20gostaria%20de%20atendimento%20da%20Home%20Vantagens.';

  var items = [
    ['Soluções', base + 'index.html#solucoes'],
    ['Blog', base + 'blog/index.html'],
    ['Contato', base + 'index.html#atendimento']
  ];

  var wa = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21l1.65-4.8A8.5 8.5 0 1 1 8 19.4L3 21z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1.2-1.6-2-1-1 .7c-.9-.4-1.7-1.2-2.1-2.1l.7-1-1-2L9 8.5z" fill="currentColor" stroke="none"/></svg>';

  function links(cls) {
    return items.map(function (it, i) {
      var active = it[0] === 'Blog' ? ' hv-active' : '';
      return '<a class="' + cls + active + '" href="' + it[1] + '"><span class="hv-n">0' + (i + 1) + '</span><span class="hv-l">' + it[0] + '</span></a>';
    }).join('');
  }

  var css = '\
.hv-header{position:sticky;top:0;z-index:50;padding:12px 12px;' + (dark ? 'background:#051329;' : '') + 'font-family:"Plus Jakarta Sans",sans-serif;box-sizing:border-box}\
.hv-header *{box-sizing:border-box}\
.hv-wrap{max-width:80rem;margin:0 auto;position:relative}\
.hv-bar{height:68px;padding:0 12px 0 20px;border-radius:9999px;background:rgba(5,19,41,.95);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.1);box-shadow:0 8px 30px rgba(5,19,41,.25);display:flex;align-items:center;justify-content:space-between}\
.hv-logo{display:flex;align-items:center;text-decoration:none;color:#fff}\
.hv-mark{width:40px;height:40px;border-radius:10px;background:#F36B21;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 2px rgba(0,0,0,.2);transition:transform .2s}\
.hv-logo:hover .hv-mark{transform:scale(1.03)}\
.hv-word{margin-left:6px;display:flex;flex-direction:column;justify-content:center}\
.hv-word b{font-weight:800;font-size:27px;line-height:.85;letter-spacing:-.025em;color:#fff}\
.hv-word i{font-style:normal;font-weight:700;font-size:7px;letter-spacing:.34em;color:rgba(255,255,255,.8);text-transform:uppercase;margin-top:4px;padding-left:2px}\
.hv-nav{display:none;align-items:center;gap:28px}\
.hv-link{display:flex;align-items:baseline;gap:8px;color:rgba(255,255,255,.9);text-decoration:none;white-space:nowrap;transition:color .15s}\
.hv-link:hover,.hv-link.hv-active{color:#F36B21}\
.hv-n{font-family:"JetBrains Mono",monospace;font-size:11px;color:rgba(255,255,255,.5)}\
.hv-active .hv-n{color:#F36B21}\
.hv-l{font-weight:700;font-size:14.5px}\
.hv-right{display:flex;align-items:center;gap:8px}\
.hv-cta{display:none;align-items:center;gap:12px;height:44px;padding:0 24px;border-radius:9999px;border:1px solid #F36B21;color:#fff;text-decoration:none;font-weight:600;font-size:14px;transition:background .15s}\
.hv-cta:hover{background:#F36B21}\
.hv-burger{width:44px;height:44px;border-radius:9999px;border:1px solid rgba(255,255,255,.2);background:transparent;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer}\
.hv-drawer{display:none;margin-top:8px;border-radius:24px;background:#051329;border:1px solid rgba(255,255,255,.1);padding:20px;box-shadow:0 20px 40px rgba(0,0,0,.25)}\
.hv-drawer.open{display:block}\
.hv-drawer .hv-link{padding:12px;border-radius:12px;gap:12px}\
.hv-drawer .hv-link:hover{background:rgba(255,255,255,.05)}\
.hv-drawer .hv-l{font-size:16px}\
.hv-drawer .hv-cta{display:flex;justify-content:center;height:48px;margin-top:12px}\
@media(min-width:640px){.hv-header{padding:12px 24px}.hv-bar{padding-left:28px}.hv-cta{display:inline-flex}.hv-drawer .hv-cta{display:flex}}\
@media(min-width:1280px){.hv-nav{display:flex}.hv-burger{display:none}.hv-drawer{display:none!important}}';

  var html = '<header class="hv-header"><div class="hv-wrap"><div class="hv-bar">' +
    '<a class="hv-logo" href="' + base + 'index.html#home" aria-label="Ir para Página Inicial"><span class="hv-mark"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 4H9.2V10.2H14.8V4H19V20H14.8V13.8H9.2V20H5V4Z" fill="white"/></svg></span><span class="hv-word"><b>ome</b><i>Vantagens</i></span></a>' +
    '<nav class="hv-nav" aria-label="Principal">' + links('hv-link') + '</nav>' +
    '<div class="hv-right"><a class="hv-cta" href="' + WA + '" target="_blank" rel="noopener"><span>Falar no WhatsApp</span>' + wa + '</a>' +
    '<button class="hv-burger" type="button" aria-label="Abrir Menu" aria-expanded="false"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button></div>' +
    '</div><div class="hv-drawer">' + links('hv-link') +
    '<a class="hv-cta" href="' + WA + '" target="_blank" rel="noopener"><span>Falar no WhatsApp</span>' + wa + '</a></div></div></header>';

  // fontes (só carrega se ainda não existirem na página)
  if (!document.querySelector('link[href*="Plus+Jakarta+Sans"]')) {
    var f = document.createElement('link');
    f.rel = 'stylesheet';
    f.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap';
    document.head.appendChild(f);
  }
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  function mount() {
    // remove o menu antigo (<header> direto no <body>); use data-keep-header para manter
    if (!script.hasAttribute('data-keep-header')) {
      Array.prototype.slice.call(document.body.children).forEach(function (n) {
        if (n.tagName === 'HEADER' && !n.classList.contains('hv-header')) n.remove();
      });
    }
    var holder = document.getElementById('site-menu');
    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    var el = wrap.firstChild;
    if (holder) holder.replaceWith(el); else document.body.insertBefore(el, document.body.firstChild);
    var btn = el.querySelector('.hv-burger'), dr = el.querySelector('.hv-drawer');
    btn.addEventListener('click', function () {
      var o = dr.classList.toggle('open');
      btn.setAttribute('aria-expanded', o);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { dr.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
    });
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
