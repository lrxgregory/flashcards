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

  errorMessage();

  checkbox = document.querySelector(
    "body > div.panel.printParameters > label > input[type=checkbox]"
  );

  setCheckbox(checkbox);

  checkbox.addEventListener("click", function() {
    setRTL(checkbox);
  });
});

function setCheckbox(checkbox) {
  if (localStorage.getItem("RTL") === "true") {
    checkbox.checked = true;
  } else {
    checkbox.checked = false;
  }
}

function setRTL(checkbox) {
  if (checkbox.checked === true) {
    localStorage.setItem("RTL", "true");
  } else {
    localStorage.setItem("RTL", "false");
  }
}

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

function errorMessage() {
  document
    .getElementById("fileToUpload")
    .addEventListener("change", function(event) {
      var fileInput = event.target;
      var fileName = fileInput.value;

      if (/\.(csv)$/i.test(fileName)) {
      } else {
        var errorMessage = document.querySelector("body > form > p");

        errorMessage.style.opacity = 1;
        errorMessage.style.display = "block";

        setTimeout(function() {
          errorMessage.classList.add("fade-out");
          errorMessage.style.opacity = 0;
        }, 1000);

        errorMessage.addEventListener("transitionend", function(event) {
          if (event.propertyName === "opacity") {
            errorMessage.style.display = "none";
          }
        });

        fileInput.value = "";
      }
    });
}

function switchRTL() {
  let RTLEnabled = localStorage.getItem("RTL") === "true";

  if (!RTLEnabled) {
    document.querySelector(".flashcard-group.answer").style.direction = "ltr";
  } else {
    document.querySelector(".flashcard-group.answer").style.direction = "rtl";
  }
}