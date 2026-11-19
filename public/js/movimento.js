// Movimento leve dos elementos decorativos ao rolar a página (efeito de profundidade).
// Cada elemento com data-paralaxe se desloca uma fração da rolagem, relativa à sua seção.
(() => {
  const els = [...document.querySelectorAll('[data-paralaxe]')];
  if (!els.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const itens = els.map((el) => ({ el, f: (parseFloat(el.dataset.paralaxe) || 0) * 0.85, sec: el.closest('section') || el.parentElement }));
  let agendado = false;
  const atualizar = () => {
    agendado = false;
    const meio = innerHeight / 2;
    for (const { el, f, sec } of itens) {
      const r = sec.getBoundingClientRect();
      if (r.bottom < -200 || r.top > innerHeight + 200) continue;
      const desloc = (r.top + r.height / 2 - meio) * -f;
      el.style.setProperty('--py', `${desloc.toFixed(1)}px`);
    }
  };
  addEventListener('scroll', () => { if (!agendado) { agendado = true; requestAnimationFrame(atualizar); } }, { passive: true });
  addEventListener('resize', atualizar);
  atualizar();
})();
