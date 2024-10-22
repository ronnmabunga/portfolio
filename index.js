const htmlElement = document.documentElement;

// Function that applies bootstrap-defined theming property onto the html element
function applyTheme(theme) {
    htmlElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
}

// Checks for saved theme in localStorage (from previous usage of the app)
// If no previous configurartion, it also checks for system color mode settings
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    applyTheme(savedTheme);
} else {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDarkMode ? "dark" : "light");
}

// Event listener for a "theme-toggle" button, which calls the applyTheme function when clicked
document.getElementById("theme-toggle").addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    applyTheme(newTheme);
});
