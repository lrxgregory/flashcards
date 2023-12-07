let checkbox = null;
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

  cardNumber = localStorage.getItem("cardNumber");
  updateCardNumber(cardNumber);
  switchRTL();
  switchPrint();

  let langSelector = document.getElementById("langSelector");
  langSelector.addEventListener("change", changeLanguage);
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
  let flashcardAnswers = document.querySelectorAll(".flashcard-group.answer");

  if (!RTLEnabled) {
    flashcardAnswers.forEach(function(flashcardAnswer) {
      flashcardAnswer.style.direction = "ltr";
    });
  } else {
    flashcardAnswers.forEach(function(flashcardAnswer) {
      flashcardAnswer.style.direction = "rtl";
    });
  }
}

function switchPrint() {
  let PrintEnabled = localStorage.getItem("Print") === "true";

  if (!PrintEnabled) {
    document.querySelector("#printOption1").style.display = "none";
    document.querySelector("#printOption2").style.display = "block";
  } else {
    document.querySelector("#printOption1").style.display = "block";
    document.querySelector("#printOption2").style.display = "none";
  }
}

function changeLanguage() {
  let langSelector = document.getElementById("langSelector");
  let selectedLanguage = langSelector.value;

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
  document.querySelector(".print-button").innerHTML = translations.printButton;
}

function updateCardNumber(cardNumber) {
  let flashcardGroups = document.querySelectorAll(".flashcard-group");
  if (cardNumber == 12) {
    flashcardGroups.forEach(function(flashcardGroup) {
      flashcardGroup.style.gridTemplateColumns = `repeat(3, 1fr)`;
    });
  } else {
    flashcardGroups.forEach(function(flashcardGroup) {
      flashcardGroup.style.gridTemplateColumns = `repeat(4, 1fr)`;
    });
  }
}
