const darkModeButton = document.getElementById("dark-mode-button");
darkModeButton.removeAttribute("hidden");

const isDarkMode = localStorage.getItem("rve.com-dark-mode");

function toggleDarkMode() {
  document.documentElement.classList.toggle("dark-mode");

  if (document.documentElement.classList.contains("dark-mode")) {
    // If we just enabled dark mode, save to localStorage
    try {
      localStorage.setItem("rve.com-dark-mode", JSON.stringify(true));
    } catch {}
  } else if (isDarkMode) {
    // if we just disabled dark mode and it exists in localStorage, set
    // to false and save
    try {
      localStorage.setItem("rve.com-dark-mode", JSON.stringify(false));
    } catch {}
  }
}

darkModeButton.addEventListener("click", toggleDarkMode);
