// ===================== Mobile nav toggle =====================
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ===================== Hero carousel =====================
(function initCarousel() {
  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;

  const track = carousel.querySelector("[data-track]");
  if (!track) return;

  const slides = Array.from(track.children);
  const prevBtn = carousel.querySelector("[data-prev]");
  const nextBtn = carousel.querySelector("[data-next]");

  if (!slides.length || !prevBtn || !nextBtn) return;

  let index = 0;

  function visibleCount() {
    if (window.innerWidth <= 560) return 1;
    if (window.innerWidth <= 960) return 2;
    return 4;
  }
  function maxIndex() {
    return Math.max(0, slides.length - visibleCount());
  }
  function update() {
    const perView = visibleCount();
    const slideWidth = 100 / perView;
    index = Math.min(index, maxIndex());
    track.style.transform = `translateX(-${index * slideWidth}%)`;
    slides.forEach((slide) => {
      slide.style.flexBasis = `${slideWidth}%`;
    });
  }
  function next() {
    index = index >= maxIndex() ? 0 : index + 1;
    update();
  }
  function prev() {
    index = index <= 0 ? maxIndex() : index - 1;
    update();
  }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);
  window.addEventListener("resize", update);

  let timer = setInterval(next, 4000);
  carousel.addEventListener("mouseenter", () => clearInterval(timer));
  carousel.addEventListener("mouseleave", () => {
    clearInterval(timer);
    timer = setInterval(next, 4000);
  });

  update();
})();

// ===================== Newsletter subscribe =====================
const subscribeForm = document.querySelector("[data-subscribe]");
if (subscribeForm) {
  subscribeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = subscribeForm.querySelector("input");
    if (input && input.value) {
      alert(`感謝訂閱！我們會將設計靈感寄到：${input.value}`);
      input.value = "";
    }
  });
}

// ===================== Active nav on scroll =====================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".main-nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.getAttribute("id");
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
// ===================== 免費諮詢 Modal =====================

const consultModal = document.getElementById("consultModal");
const consultButtons = document.querySelectorAll(".js-consult-open");
const closeConsult = document.getElementById("closeConsult");
const consultOverlay = document.getElementById("consultOverlay");

function openConsultModal(event) {
  if (event) {
    event.preventDefault();
  }

  consultModal.classList.add("active");
  document.body.classList.add("modal-open");
}

function closeConsultModal() {
  consultModal.classList.remove("active");
  document.body.classList.remove("modal-open");
}

// 所有免費諮詢按鈕都開啟同一個表單
consultButtons.forEach((button) => {
  button.addEventListener("click", openConsultModal);
});

// X 關閉
if (closeConsult) {
  closeConsult.addEventListener("click", closeConsultModal);
}

// 點黑色背景關閉
if (consultOverlay) {
  consultOverlay.addEventListener("click", closeConsultModal);
}

// 按 ESC 關閉
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeConsultModal();
  }
});