import { autoSetTheme, toggleTheme } from './theme'
import { shareButton } from './share'

// set the theme automatically on page load
autoSetTheme()

// set all event listeners
document.querySelector('#share-button')?.addEventListener('click', shareButton)
document.querySelector('#toggle-color-scheme').addEventListener('click', toggleTheme)

// handle strike through
document.querySelectorAll(".nav--link").forEach(link => {
  if (window.location.pathname.includes(link.getAttribute("href"))) {
    link.classList.add("active")
  } else {
    link.classList.remove("active")
  }
})
