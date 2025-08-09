let searchTheme = determineComputedTheme();
const ninjaKeys = document.querySelector("ninja-keys");

if (searchTheme === "dark") {
  ninjaKeys.classList.add("dark");
} else {
  ninjaKeys.classList.remove("dark");
}

const openSearchModal = () => {
  // collapse navbarNav if expanded on mobile
  const $navbarNav = $("#navbarNav");
  if ($navbarNav.hasClass("show")) {
    $navbarNav.collapse("hide");
  }
  ninjaKeys.open();
};

// Bind click handler (avoid inline onclick for CSP readiness)
document.addEventListener("DOMContentLoaded", () => {
  const searchToggle = document.getElementById("search-toggle");
  if (searchToggle) {
    searchToggle.addEventListener("click", openSearchModal);
  }
});
