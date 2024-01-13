function sendMessage() {
    const userInput = document.getElementById('message-input').value;

    // Display user message in the chat thread
    displayMessage('user', userInput);

    // Call Python script to get bot's response (assuming you have a server-side script)
    // You might want to use AJAX, Fetch API, or other methods depending on your server setup.
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Display bot's response in the chat thread
        displayMessage('bot', data.response);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayMessage(sender, message) {
    const chatThread = document.getElementById('chat-thread');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender);
    messageDiv.textContent = message;
    chatThread.appendChild(messageDiv);

    // Scroll to the bottom of the chat thread to show the latest messages
    chatThread.scrollTop = chatThread.scrollHeight;
}
