document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
     1. SCROLL REVEAL ANIMATIONS
  ===================================================== */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* =====================================================
     2. FALLING FLOWERS / PETALS ANIMATION
  ===================================================== */
  const petalsContainer = document.getElementById("petals-container");
  const petalSymbols = ["🌸", "🌺", "✿", "❀", "🌼"];

  function createPetal() {
    const petal = document.createElement("span");
    petal.classList.add("petal");
    petal.textContent = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];

    const startLeft = Math.random() * 100; // percentage
    const duration = 6 + Math.random() * 6; // 6s to 12s
    const size = 12 + Math.random() * 10; // 12px to 22px
    const sway = (Math.random() - 0.5) * 80; // left/right drift

    petal.style.left = `${startLeft}%`;
    petal.style.fontSize = `${size}px`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.setProperty("--sway", `${sway}px`);

    petalsContainer.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, duration * 1000);
  }

  // Create initial petals & keep spawning smoothly
  for (let i = 0; i < 8; i++) {
    setTimeout(createPetal, i * 300);
  }
  setInterval(createPetal, 750);

  /* =====================================================
     3. LIVE COUNTDOWN TO NIKKAH (06 DEC 2026, 11:30 AM IST)
  ===================================================== */
  const nikkahDate = new Date("2026-12-06T11:30:00+05:30").getTime();

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = nikkahDate - now;

    if (distance <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
});