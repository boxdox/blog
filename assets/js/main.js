import { autoSetTheme, toggleTheme } from './theme'
import { shareButton } from './share'
import { showLightbox } from './lightbox'

// set the theme automatically on page load
autoSetTheme()

// set all event listeners
document.querySelector('#share-button')?.addEventListener('click', shareButton)
document.querySelector('#toggle-color-scheme').addEventListener('click', toggleTheme)

// handle strike through
document.querySelectorAll('.nav--link').forEach(link => {
  if (window.location.pathname.includes(link.getAttribute('href'))) {
    link.classList.add('active')
  } else {
    link.classList.remove('active')
  }
})

// handle back to top
const backToTopButton = document.querySelector('.back-to-top')
const innerHeight = Math.max(document.documentElement.clientHeight || window.innerHeight)
const mainHeight = document.querySelector('main').offsetHeight

// back button is shown only if it exists on page and
// min height of page is 300vh
if (backToTopButton && mainHeight / innerHeight > 3) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          backToTopButton.classList.add('show')
          backToTopButton.firstElementChild.setAttribute('tabindex', 0)
        } else {
          backToTopButton.classList.remove('show')
          backToTopButton.firstElementChild.setAttribute('tabindex', -1)
        }
      })
    },
    // start showing at 40% of article, or after 2000px for long
    // articles, whichever is lower, comparing to share button
    { rootMargin: `${mainHeight - Math.min(mainHeight * 0.6, 2000)}px` }
  )

  // start observing distance to share button
  observer.observe(document.querySelector('#share-button'))

  // handle scrolling back to top
  backToTopButton.addEventListener('click', () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  })
}

document
  .querySelectorAll('article > img, article > figure > picture > img, article > p > img')
  .forEach(image => {
    image.addEventListener('click', () => {
      showLightbox({ imgUrl: image.src, altText: image.alt })
    })
  })
