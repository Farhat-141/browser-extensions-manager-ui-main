fetch("./data.json")
  .then((response) => response.json())
  .then((jsonData) => {
    jsonData.forEach(element => {
      const tabEl = document.createElement('div'); 
      tabEl.classList.add("tab");
      tabEl.innerHTML = `
        <div class="upper-tab">
            <img class="tab-icon" src="${element.logo}" alt="icon">
            <div class="tab-des">
              <h2 class="tab-des-h">${element.name}</h2>
              <p class="tab-des-p">${element.description}</p>
            </div>
        </div>
        <div class="lower-tab">
            <button class="lower-tab-btn">Remove</button>
            <label class="switch">
              <input class="check" type="checkbox" ${element.isActive ? "checked" : "" }>
              <span class="slider round"></span>
            </label>
        </div>
      `;

      document.querySelector(".extention").appendChild(tabEl);

      // Remove button logic
      const removeEl = tabEl.querySelector('.lower-tab-btn');
      removeEl.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.classList.add("overlay");
        const windowEl = document.createElement('div');
        windowEl.classList.add("window");
        windowEl.innerHTML = `
            <h2>Confirmation</h2>
            <h5>This action will delete the extension</h5>
            <div class="window-btns">
              <button class="window-btn cancel">Cancel</button>
              <button class="window-btn delete">Confirm</button>
            </div>
        `;
        document.body.appendChild(windowEl);
        document.body.appendChild(overlay);
        document.body.style.overflow = "hidden";
        document.querySelector('.container').style.filter = 'brightness(50%)';

        windowEl.querySelector('.delete').addEventListener('click', () => {
          tabEl.remove();
          windowEl.remove();
          overlay.remove();
          document.body.style.overflow = "";
          document.querySelector('.container').style.filter = 'brightness(100%)';
        });

        windowEl.querySelector('.cancel').addEventListener('click', () => {
          windowEl.remove();
          overlay.remove();
          document.body.style.overflow = "";
          document.querySelector('.container').style.filter = 'brightness(100%)';
        });
      });

      const checkbox = tabEl.querySelector(".check");
      checkbox.addEventListener("change", filterExtensions);
    });

    // Run initial filtering
    filterExtensions();
  })
  .catch(error => console.error("Error fetching JSON:", error));

// Select filter buttons
const showAllBtn = document.getElementById("show-all");
const showActiveBtn = document.getElementById("show-active");
const showInactiveBtn = document.getElementById("show-inactive");

let currentFilter = "all"; // Track the current filter

function filterExtensions() {
  document.querySelectorAll(".tab").forEach(tab => {
    const isActive = tab.querySelector('.check').checked;
    
    if (currentFilter === "all") {
      tab.style.display = "flex"; // Show everything
    } else if (currentFilter === "active" && isActive) {
      tab.style.display = "flex"; // Show active ones
    } else if (currentFilter === "inactive" && !isActive) {
      tab.style.display = "flex"; // Show inactive ones
    } else {
      tab.style.display = "none"; // Hide everything else
    }
  });
}

showAllBtn.addEventListener("click", () => {
  currentFilter = "all";
  updateButtonStyles();
  filterExtensions();
});
showActiveBtn.addEventListener("click", () => {
  currentFilter = "active";
  updateButtonStyles();
  filterExtensions();
});
showInactiveBtn.addEventListener("click", () => {
  currentFilter = "inactive";
  updateButtonStyles();
  filterExtensions();
});

function updateButtonStyles() {
  showAllBtn.style.backgroundColor = currentFilter === "all" ? 'var(--active-color)' : 'var(--theme)';
  showActiveBtn.style.backgroundColor = currentFilter === "active" ? 'var(--active-color)' : 'var(--theme)';
  showInactiveBtn.style.backgroundColor = currentFilter === "inactive" ? 'var(--active-color)' : 'var(--theme)';
}

const toggleButton = document.querySelector(".toggle"); // Sun icon
const body = document.body;

// Check if dark mode is already applied from localStorage
if (localStorage.getItem("dark-mode") === "enabled") {
  body.classList.add("dark");
  toggleButton.src = "assets/images/icon-moon.svg"; // Change icon to moon
}

// Toggle Dark/Light Mode
toggleButton.addEventListener("click", () => {
  body.classList.toggle("dark");
  // Change the icon based on the mode
  if (body.classList.contains("dark")) {
    toggleButton.src = "assets/images/icon-moon.svg"; // Moon icon
    localStorage.setItem("dark-mode", "enabled"); // Save the dark mode preference
  } else {
    toggleButton.src = "assets/images/icon-sun.svg"; // Sun icon
    localStorage.removeItem("dark-mode"); // Remove the preference
  }
});
