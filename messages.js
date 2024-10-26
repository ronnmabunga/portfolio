async function fetchMessages(email) {
    try {
        const response = await fetch(`https://y528c8do2c.execute-api.ap-southeast-1.amazonaws.com/prod/${email}`, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error(JSON.stringify(response.error));
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching messages:", error);
        return [];
    }
}

async function displayMessages() {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    console.log(email);
    const messages = await fetchMessages(email);
    const container = document.getElementById("messagesContainer");
    container.innerHTML = "No messages found!";
    messages.forEach((message) => {
        console.log(message);
        const messageDiv = document.createElement("div");
        messageDiv.className = "message";
        messageDiv.innerHTML = `<strong>Email:</strong> ${message.email} <br> <strong>Message:</strong> ${message.message}`;
        container.appendChild(messageDiv);
    });
}

window.onload = displayMessages;
