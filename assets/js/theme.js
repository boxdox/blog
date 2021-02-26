const CLASS = 'dark-mode'
const KEY = 'theme'
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
const btn = document.querySelector('#toggle-color-scheme')

const setTheme = ({ dark = false, store = true }) => {
  if (dark) {
    // set to dark
    document.body.classList.add(CLASS)
    btn.innerHTML = '🌞'
  } else {
    // set to light
    document.body.classList.remove(CLASS)
    btn.innerHTML = '🌚'
  }
  if (store) localStorage.setItem(KEY, dark ? 'dark' : 'light')
}

export const autoSetTheme = () => {
  const currentTheme = localStorage.getItem(KEY)
  if (currentTheme === 'light') setTheme({ dark: false })
  else if (currentTheme === 'dark') setTheme({ dark: true })
  else if (!currentTheme && prefersDarkScheme) setTheme({ dark: true })
}

export const toggleTheme = () => {
  const currentTheme = localStorage.getItem(KEY)
  if (currentTheme === 'light') setTheme({ dark: true })
  else if (currentTheme === 'dark') setTheme({ dark: false })
}
