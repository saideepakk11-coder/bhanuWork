// ---- EDIT THESE ----
const CONFIG = { phone: "91XXXXXXXXXX", display: "+91 XXXXX XXXXX", waText: "Hello, I need septic tank cleaning service" };
// --------------------
if (CONFIG.phone.indexOf("X") === -1) {
  document.querySelectorAll("[data-call]").forEach(a => a.href = "tel:+" + CONFIG.phone);
  document.querySelectorAll("[data-wa]").forEach(a => a.href = "https://wa.me/" + CONFIG.phone + "?text=" + encodeURIComponent(CONFIG.waText));
  document.querySelectorAll("[data-call-text]").forEach(a => { if (a.tagName === "A") a.href = "tel:+" + CONFIG.phone; a.textContent = CONFIG.display; });
}
document.getElementById("yr").textContent = new Date().getFullYear();

// Mobile menu
const toggle = document.querySelector(".nav-toggle"), nav = document.getElementById("nav");
function setMenu(open) { nav.classList.toggle("open", open); toggle.setAttribute("aria-expanded", open); }
toggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); toggle.focus(); } });

// Header shrink + scroll progress bar
const header = document.querySelector(".site-header"), bar = document.querySelector(".progress");
function onScroll() {
  header.classList.toggle("scrolled", scrollY > 40);
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = "scaleX(" + (max > 0 ? scrollY / max : 0) + ")";
}
addEventListener("scroll", onScroll, { passive: true }); onScroll();

// Active nav link
const links = [...document.querySelectorAll("nav ul a")];
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-40% 0px -55% 0px" });
links.forEach(a => { const s = document.querySelector(a.getAttribute("href")); if (s) spy.observe(s); });

// Service buttons preselect the form
const sel = document.getElementById("f-service");
document.querySelectorAll("[data-service]").forEach(a => a.addEventListener("click", () => { sel.value = a.dataset.service; }));

// Scroll reveal animations for every section
document.documentElement.classList.add("js");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const groups = [
  ["#about .split > div:last-child > *", "", 1],
  ["#about .about-img", "left", 0],
  [".sec h2, .sec .sub, .sec .kicker, .narrow > p, .pills", "", 0],
  ["#services .card, #gallery .ph", "zoom", 1],
  [".steps, .steps li", "", 1],
  ["#why-us .why li", "left", 1],
  ["#contact .contact-grid > div", "left", 0],
  ["#contact form", "right", 0],
  [".foot-grid > div, .copy", "", 1]
];
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 });
groups.forEach(([sel, kind, stagger]) => document.querySelectorAll(sel).forEach((el, i) => {
  el.classList.add("rv"); if (kind) el.classList.add(kind);
  if (stagger) el.style.setProperty("--i", i % 6);
  reduce ? el.classList.add("in") : io.observe(el);
}));

// Contact form
const form = document.getElementById("enquiry-form"), status = document.getElementById("form-status");
const rules = {
  name: v => v.trim().length >= 2 || "Enter your name.",
  phone: v => /^(?:\+91|91|0)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, "")) || "Enter a 10-digit Indian mobile number.",
  service: v => !!v || "Choose a service.",
  location: v => v.trim().length >= 3 || "Enter the service location."
};
form.addEventListener("submit", async e => {
  e.preventDefault();
  let firstBad = null;
  for (const k in rules) {
    const input = form.elements[k], err = document.getElementById("e-" + k), r = rules[k](input.value);
    if (r !== true) { err.textContent = r; err.hidden = false; input.setAttribute("aria-invalid", "true"); input.setAttribute("aria-describedby", err.id); firstBad = firstBad || input; }
    else { err.hidden = true; input.removeAttribute("aria-invalid"); }
  }
  if (firstBad) { firstBad.focus(); return; }
  const btn = form.querySelector("button[type=submit]");
  btn.disabled = true; btn.textContent = "Sending..."; status.textContent = "";
  try {
    const res = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(new FormData(form)).toString() });
    if (!res.ok) throw new Error(res.status);
    form.reset(); status.textContent = "Enquiry sent. We will contact you soon.";
  } catch (_) {
    status.textContent = "Enquiry not sent. Check your connection, or call or WhatsApp us instead.";
  } finally { btn.disabled = false; btn.textContent = "Send enquiry"; }
});

// Swipe carousels (mobile): add dots that follow the scroll position
document.querySelectorAll("#services .grid, #why-us .grid, #gallery .gallery").forEach(c => {
  c.classList.add("carousel"); c.tabIndex = 0; c.setAttribute("aria-label", "Swipe to see more");
  const dots = document.createElement("div"); dots.className = "dots"; dots.setAttribute("aria-hidden", "true");
  [...c.children].forEach((k, i) => { const d = document.createElement("i"); d.addEventListener("click", () => c.scrollTo({ left: k.offsetLeft - c.children[0].offsetLeft, behavior: "smooth" })); dots.appendChild(d); });
  c.after(dots);
  const mark = () => {
    const n = c.children.length, max = c.scrollWidth - c.clientWidth;
    const i = max > 0 ? Math.round(c.scrollLeft / max * (n - 1)) : 0;
    [...dots.children].forEach((d, j) => d.classList.toggle("on", j === i));
  };
  c.addEventListener("scroll", mark, { passive: true }); addEventListener("resize", mark); mark();
});
