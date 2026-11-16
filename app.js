const WHATSAPP = "5537988028801";
const PHONE_DISPLAY = "(37) 3541-3000";
const PHONE_TEL = "+553735413000";

const NAV = [
  { href: "index.html", label: "Início", page: "home" },
  { href: "servicos.html", label: "Serviços", page: "servicos" },
  { href: "sobre.html", label: "Sobre nós", page: "sobre" },
  { href: "contato.html", label: "Contato", page: "contato" },
];

function buildHeader() {
  const page = document.body.dataset.page;
  const header = document.createElement("header");
  header.className = "site";
  header.innerHTML = `
    <div class="topbar">
      <a href="index.html" class="brand">
        <img src="img/logo.png" alt="Isavel Veículos">
      </a>
      <nav class="main-nav" id="main-nav">
        ${NAV.map(
          (n) =>
            `<a href="${n.href}" class="${n.page === page ? "active" : ""}">${n.label}</a>`
        ).join("")}
        <a href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener" class="btn btn-gold" style="margin-top:6px;">Falar no WhatsApp</a>
      </nav>
      <div class="header-phone">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        <a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a>
      </div>
      <button class="nav-toggle" id="nav-toggle" aria-label="Abrir menu">&#9776;</button>
    </div>
  `;
  document.body.prepend(header);

  document.getElementById("nav-toggle").addEventListener("click", () => {
    document.getElementById("main-nav").classList.toggle("open");
  });
}

function buildFooter() {
  const footer = document.createElement("footer");
  footer.className = "site";
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <img src="img/logo.png" alt="Isavel Veículos" style="height:36px; margin-bottom:14px; background:#fff; padding:6px 10px; border-radius:8px;">
          <p style="max-width:320px; color:rgba(255,255,255,.65); font-size:.9rem;">Há 29 anos ajudando famílias de Abaeté, Nova Serrana e região a comprar, vender e trocar de veículo com confiança.</p>
        </div>
        <div>
          <h4>Links</h4>
          <ul>
            ${NAV.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join("")}
          </ul>
        </div>
        <div>
          <h4>Fale conosco</h4>
          <ul>
            <li><a href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener">WhatsApp: (37) 98802-8801</a></li>
            <li><a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a></li>
            <li><a href="mailto:isavelabaete@yahoo.com.br">isavelabaete@yahoo.com.br</a></li>
          </ul>
        </div>
      </div>
      <div class="foot-bottom">
        <span>&copy; <span id="year"></span> Isavel Veículos. CNPJ 22.356.653/0001-40</span>
        <span>Site modelo de demonstração &mdash; não publicado</span>
      </div>
    </div>
  `;
  document.body.appendChild(footer);
  document.getElementById("year").textContent = new Date().getFullYear();
}

function buildFloatCall() {
  const a = document.createElement("a");
  a.href = `https://wa.me/${WHATSAPP}`;
  a.target = "_blank";
  a.rel = "noopener";
  a.className = "float-call";
  a.setAttribute("aria-label", "Falar no WhatsApp");
  a.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`;
  document.body.appendChild(a);
}

function setupScrollAnimations() {
  const items = document.querySelectorAll("[data-animate], .card");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => io.observe(el));
}

function setupCounters() {
  const counters = document.querySelectorAll(".counter[data-target]");
  if (!("IntersectionObserver" in window)) {
    counters.forEach((el) => (el.textContent = el.dataset.target));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || "";
      const duration = 1200;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(progress * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  });
  counters.forEach((el) => io.observe(el));
}

function setupContactForm() {
  const form = document.querySelector("form.contact-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = form.querySelector(".success-msg");
    if (msg) msg.style.display = "block";
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  buildHeader();
  buildFooter();
  buildFloatCall();
  setupScrollAnimations();
  setupCounters();
  setupContactForm();
});
