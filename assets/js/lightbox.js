const mainEl = document.querySelector('main')
const lightBoxClass = 'image-lightbox'

// https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element
let focusableEls
const handleTrapTabFocus = e => {
  if (!e.keyCode === 'Tab' || !focusableEls) {
    return
  }
  const [firstEl, lastEl] = focusableEls

  /* shift + tab */
  if (e.shiftKey) {
    if (document.activeElement === firstEl) {
      lastEl.focus()
      e.preventDefault()
    }
    /* tab */
  } else {
    if (document.activeElement === lastEl) {
      firstEl.focus()
      e.preventDefault()
    }
  }
}

// handle click to close
const handleClickToClose = e => {
  if (e.target.tagName.toLowerCase() !== 'img') hideLightbox()
}

// handle escape key to close
const handleEscapeToClose = e => {
  if (e.code === 'Escape') hideLightbox()
}

// show lightbox
export const showLightbox = ({ imgUrl, altText = 'zoomed image' }) => {
  // create the parent div
  const div = document.createElement('div')
  div.classList.add(lightBoxClass)

  // create the loader
  const loader = document.createElement('span')
  loader.classList.add('loader')

  // create close button
  const closeBtn = document.createElement('button')
  closeBtn.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
  <path d="M0 0h24v24H0z" fill="none"></path></svg>`
  closeBtn.classList.add('close-icon')

  // append loader to parent div
  div.appendChild(loader)
  div.appendChild(closeBtn)

  // append div as child of main
  mainEl.appendChild(div)

  // set body position fixed to remove scroll
  document.documentElement.style.scrollBehavior = 'auto'
  document.body.style.top = `-${window.scrollY}px`
  document.body.style.position = 'fixed'

  // add close event listener
  div.addEventListener('click', handleClickToClose)
  window.addEventListener('keydown', handleEscapeToClose)
  closeBtn.addEventListener('click', handleClickToClose)

  // load the image
  const image = new Image()
  image.src = imgUrl
  image.setAttribute('alt', altText)
  image.setAttribute('tabindex', 0)

  image.onload = () => {
    div.appendChild(image)
    loader.remove()

    // trap focus to div
    focusableEls = div.querySelectorAll('button, img')
    closeBtn.focus()
    window.addEventListener('keydown', handleTrapTabFocus)
  }
}

// hide lightbox
export const hideLightbox = () => {
  const lightBox = mainEl.querySelector('.' + lightBoxClass)
  if (!lightBox) return

  // set body position back to normal
  document.body.style.position = ''
  window.scrollTo(0, parseInt(document.body.style.top || '0') * -1)
  document.body.style.top = ''
  document.documentElement.style.scrollBehavior = 'smooth'

  // remove focus trap
  if (focusableEls) {
    window.removeEventListener('keydown', handleTrapTabFocus)
  }

  // remove all event listeners
  window.removeEventListener('keydown', handleEscapeToClose)
  lightBox.removeEventListener('click', handleClickToClose)
  lightBox.querySelector('button')?.removeEventListener('click', handleClickToClose)
  lightBox.remove()
}
