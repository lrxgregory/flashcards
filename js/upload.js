let checkbox = null;

document.addEventListener("DOMContentLoaded", () => {
  let isDarkModeEnabled = localStorage.getItem("darkMode") === "true";
  if (isDarkModeEnabled) {
    setDarkTheme();
  } else {
    document.querySelector("#moon").style.display = "none";
  }

  document.getElementById("themeToggle").addEventListener("click", () => {
    toggleTheme();
  });

  switchRTL();
});

function toggleTheme() {
  let isDarkModeEnabled = localStorage.getItem("darkMode") === "true";

  if (!isDarkModeEnabled) {
    setDarkTheme();
  } else {
    setLightTheme();
  }
}

function setDarkTheme() {
  document.body.classList.add("dark");
  if (window.location.pathname === "/") {
    document.querySelector("body > form").classList.add("dark");
    document.querySelector("body > form > h2").classList.add("dark");
  }
  document.querySelector("#sun").style.display = "none";
  document.querySelector("#moon").style.display = "block";
  localStorage.setItem("darkMode", "true");
}

function setLightTheme() {
  document.body.classList.remove("dark");
  if (window.location.pathname === "/") {
    document.querySelector("body > form").classList.remove("dark");
    document.querySelector("body > form > h2").classList.remove("dark");
  }
  document.querySelector("#moon").style.display = "none";
  document.querySelector("#sun").style.display = "block";
  localStorage.setItem("darkMode", "false");
}

function switchRTL() {
  let RTLEnabled = localStorage.getItem("RTL") === "true";

  if (!RTLEnabled) {
    document.querySelector(".flashcard-container.answer").style.direction =
      "ltr";
  } else {
    document.querySelector(".flashcard-container.answer").style.direction =
      "rtl";
  }
}
