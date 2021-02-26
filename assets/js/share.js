export const shareButton = () => {
  const shareEl = document.querySelector("#share-button");
  const url = shareEl.getAttribute("data-link");
  const title = shareEl.getAttribute("data-title");

  if (navigator.share) {
    navigator.share({
      url,
      title,
      text: title
    });
  } else if (navigator.clipboard) {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        showMessage("URL copied to clipboard");
      })
      .catch(() => {
        showMessage("Error occurred while copying URL to clipboard");
      });
  } else {
    window.open(
      `https://twitter.com/intent/tweet?&text=${encodeURIComponent(title)}&url=${encodeURIComponent(
        url
      )}`,
      "_blank"
    );
  }
};

const showMessage = (text, timeout = 5000) => {
  const dialog = document.querySelector(".message-alert");
  dialog.innerHTML = text;
  dialog.classList.add("show");
  setTimeout(() => {
    dialog.innerHTML = ""
    dialog.classList.remove("show")
  }, timeout);
};
