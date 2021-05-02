const CLASS = 'dark-mode'
const KEY = 'theme'
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
const lightIcon = document.querySelector('svg.light-icon')
const darkIcon = document.querySelector('svg.dark-icon')

const setTheme = ({ dark = false }) => {
  if (dark) {
    // set to dark
    document.body.classList.add(CLASS)
    lightIcon.classList.remove('hide')
    darkIcon.classList.add('hide')
  } else {
    // set to light
    document.body.classList.remove(CLASS)
    lightIcon.classList.add('hide')
    darkIcon.classList.remove('hide')
  }
  localStorage.setItem(KEY, dark ? 'dark' : 'light')
}

export const autoSetTheme = () => {
  const currentTheme = localStorage.getItem(KEY)
  if (currentTheme === 'light') setTheme({ dark: false })
  else if (currentTheme === 'dark') setTheme({ dark: true })
  else if (!currentTheme && prefersDarkScheme) setTheme({ dark: true })
  else setTheme({ dark: false })
}

export const toggleTheme = () => {
  const currentTheme = localStorage.getItem(KEY)
  if (currentTheme === 'light') setTheme({ dark: true })
  else if (currentTheme === 'dark') setTheme({ dark: false })
}
