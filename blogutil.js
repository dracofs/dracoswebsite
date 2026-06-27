const passcode = femboydepression;

function init() {
  const pass = document.getElementById("passcode");
  const links = document.querySelectorAll(".blog-post");
  if (!pass || !links.length) return;

  links.forEach((link) => {
    if (!link.dataset.href) {
      link.dataset.href = link.getAttribute("href");
    }
  });

  function setLocked(locked) {
    links.forEach((link) => {
      if (locked) {
        link.removeAttribute("href");
        link.classList.add("blog-post--locked");
        link.setAttribute("aria-disabled", "true");
      } else {
        link.href = link.dataset.href;
        link.classList.remove("blog-post--locked");
        link.removeAttribute("aria-disabled");
      }
    });
  }

  function checkPasscode() {
    const correct = pass.value.trim() === passcode;
    if (correct) {
      sessionStorage.setItem("blogUnlocked", "1");
      setLocked(false);
    } else {
      sessionStorage.removeItem("blogUnlocked");
      setLocked(true);
    }
  }

  if (sessionStorage.getItem("blogUnlocked") === "1") {
    setLocked(false);
  } else {
    setLocked(true);
  }

  pass.addEventListener("input", checkPasscode);
}

document.addEventListener("DOMContentLoaded", init);
