(function () {
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");
  var icon = toggle ? toggle.querySelector(".theme-icon") : null;

  function getStoredTheme() {
    return localStorage.getItem("theme");
  }

  function setTheme(theme) {
    root.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
    if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  function initTheme() {
    var stored = getStoredTheme();
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      return;
    }
    // Default: follow system
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }

  initTheme();

  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-bs-theme") || "light";
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  // Footer year
  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // Smooth-scroll for same-page anchors (no inline JS)
  document.addEventListener("click", function (e) {
    var link = e.target.closest("a[data-scroll]");
    if (!link) return;

    var href = link.getAttribute("href") || "";
    if (!href.startsWith("#")) return;

    var target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", href);
  });

  // Print button (resume page)
  var printBtn = document.getElementById("printBtn");
  if (printBtn) {
    printBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.print();
    });
  }
})();
