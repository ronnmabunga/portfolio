const htmlElement = document.documentElement;

// Function that applies bootstrap-defined theming property "data-bs-theme" onto the html element
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

function showToast(title, message) {
    const toastContainer = document.getElementById("toastContainer");
    const toastId = `toast-${Date.now()}`;
    const toastHTML = `
        <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true">
            <div class="toast-header">
                <strong class="me-auto">${title}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">${message}</div>
        </div>
    `;
    toastContainer.insertAdjacentHTML("beforeend", toastHTML);
    const newToast = new bootstrap.Toast(document.getElementById(toastId));
    newToast.show();
    document.getElementById(toastId).addEventListener("hidden.bs.toast", () => {
        document.getElementById(toastId).remove();
    });
}
