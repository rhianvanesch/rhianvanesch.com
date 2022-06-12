const themeSwitcherButton = document.getElementById("theme-switcher-button")
themeSwitcherButton.removeAttribute("hidden")

const LOCAL_STORAGE_THEME = "theme"
const DARK_THEME = "dark"
const LIGHT_THEME = "light"

const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)")

if (!document.documentElement.className) {
  const theme = prefersDarkMode.matches ? DARK_THEME : LIGHT_THEME
  document.documentElement.className = theme
}

function toggleDarkMode() {
  let theme

  if (document.documentElement.className === DARK_THEME) {
    document.documentElement.className = LIGHT_THEME
    theme = LIGHT_THEME
  } else {
    document.documentElement.className = DARK_THEME
    theme = DARK_THEME
  }

  try {
    localStorage.setItem(LOCAL_STORAGE_THEME, theme)
  } catch {}
}

themeSwitcherButton.addEventListener("click", toggleDarkMode)
