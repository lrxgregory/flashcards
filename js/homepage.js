let rtlCheckbox = null;
let printCheckbox = null;
let fileErrorMessage = null;
let cardNumber = null;

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

  rtlCheckbox = document.querySelector("#RTLcheckbox");
  printCheckbox = document.querySelector("#questionFirst");

  setCheckbox(rtlCheckbox);
  setCheckbox(printCheckbox);

  rtlCheckbox.addEventListener("click", function() {
    setRTL(rtlCheckbox);
  });
  printCheckbox.addEventListener("click", function() {
    setPrint(printCheckbox);
  });

  fileErrorMessage = document.querySelector("p.fileError");

  document.querySelector("#submitInput").addEventListener("click", function(e) {
    if (document.querySelector("#fileToUpload").files.length !== 1) {
      e.preventDefault();
      fileErrorMessage.style.display = "block";
      setTimeout(function() {
        fileErrorMessage.classList.add("fade-out");
      }, 1000);
      fileErrorMessage.addEventListener("transitionend", function() {
        fileErrorMessage.style.display = "none";
        fileErrorMessage.classList.remove("fade-out");
      });
    }
    let cardNumber = document.querySelector("#cardNumber").value;
    updateCardNumber(cardNumber);
  });

  let langSelector = document.getElementById("langSelector");
  langSelector.addEventListener("change", changeLanguage);

  if (localStorage.getItem("cardNumber") !== null) {
    document.querySelector("#cardNumber").value = localStorage.getItem(
      "cardNumber"
    );
  }
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

function setPrint(checkbox) {
  if (checkbox.checked === true) {
    localStorage.setItem("Print", "true");
  } else {
    localStorage.setItem("Print", "false");
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
    document.querySelector("body > .panel").classList.add("dark");
    document.querySelector("body > .panel > form").classList.add("dark");
    document.querySelector("body > .panel > form > h2").classList.add("dark");
    document
      .querySelector("body > .panel.printParameters")
      .classList.add("dark");
    document
      .querySelector("body > .panel.printParameters > h2")
      .classList.add("dark");
    document.querySelector("#RTLswitch").classList.add("dark");
    document.querySelector("#PrintSwitch").classList.add("dark");
  }
  document.querySelector("#sun").style.display = "none";
  document.querySelector("#moon").style.display = "block";
  localStorage.setItem("darkMode", "true");
}

function setLightTheme() {
  document.body.classList.remove("dark");
  if (window.location.pathname === "/") {
    document.querySelector("body > .panel").classList.remove("dark");
    document.querySelector("body > .panel > form").classList.remove("dark");
    document
      .querySelector("body > .panel.printParameters")
      .classList.remove("dark");
    document
      .querySelector("body > .panel > form > h2")
      .classList.remove("dark");
    document
      .querySelector("body > .panel.printParameters > h2")
      .classList.remove("dark");
    document.querySelector("#RTLswitch").classList.remove("dark");
    document.querySelector("#PrintSwitch").classList.remove("dark");
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

function changeLanguage() {
  let langSelector = document.getElementById("langSelector");
  let selectedLanguage = langSelector.value;
  localStorage.setItem("language", selectedLanguage);

  // Chargez le fichier JSON des traductions
  let jsonFileUrl =
    window.location.origin + "/js/lang/" + selectedLanguage + ".json";
  fetch(jsonFileUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error loading JSON file: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      updateContent(data);
    })
    .catch(error => {
      console.error("Error loading JSON file:", error);
    });
}

function updateContent(translations) {
  document.querySelector(".panel > form > h2").innerHTML =
    translations.flashCardGenerator;
  document.querySelector("#labelUpload").innerHTML = translations.selectFile;
  document.querySelector("#submitInput").value = translations.uploadFile;
  document.querySelector(".downloadCSV > button").innerHTML =
    translations.downloadCSV;
  document.querySelector("p.fileError").innerHTML = translations.fileError;
  document.querySelector(".panel.printParameters > h2").innerHTML =
    translations.printParameters;
  document.querySelector("#RTLswitch").innerHTML = translations.rightToLeft;
  document.querySelector("#PrintSwitch").innerHTML = translations.printSwitch;
}

function updateCardNumber(cardNumber) {
  document.querySelector("#cardNumberHidden").value = cardNumber;
  localStorage.setItem("cardNumber", cardNumber);
}
