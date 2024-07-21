async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const messagesDiv = document.getElementById('messages');

    messagesDiv.innerHTML += `<div class="message user-message">${userInput}</div>`;

    try {
        const response = await fetch('https://namu7788-26384c2e3ec8.herokuapp.com/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();
        messagesDiv.innerHTML += `<div class="message gpt-message">${data.reply}</div>`;
    } catch (error) {
        messagesDiv.innerHTML += `<div class="message gpt-message">Error: ${error.message}</div>`;
    }

    document.getElementById('user-input').value = '';
}


