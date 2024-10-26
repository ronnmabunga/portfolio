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

document.getElementById("contactForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    try {
        const response = await fetch("https://y528c8do2c.execute-api.ap-southeast-1.amazonaws.com/prod", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "JvhkaNnDRJ3FvfB4V8loq5jfB6RIP6rS5NZX1ljO",
            },
            body: JSON.stringify({ name, email, message }),
        });
        const result = await response.json();
        console.log(result);
        if (response.ok) {
            showToast("Success", "Message sent successfully!");
        } else {
            showToast("Error", "Error: " + result.error);
        }
    } catch (error) {
        showToast("Error", "An unexpected error occurred. Please try again later.");
    }
});

document.getElementById("contact-form-button").addEventListener("click", () => {
    showToast("Information", "The contact form uses the Demo API.<br/>Fill in the form and submit to send a message.<br/>The file in the S3 bucket will update based on your input.");
});
