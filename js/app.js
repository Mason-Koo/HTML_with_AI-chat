async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const messagesDiv = document.getElementById('messages');

    // 사용자 메시지를 화면에 추가
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user-message';
    userMessageDiv.innerText = userInput;
    messagesDiv.appendChild(userMessageDiv);

    // 서버로 메시지 전송
    try {
        const response = await fetch('https://namu7788-26384c2e3ec8.herokuapp.com/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: userInput })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, text: ${errorText}`);
        }

        const data = await response.json();

        // GPT 응답 메시지를 화면에 추가
        const gptMessageDiv = document.createElement('div');
        gptMessageDiv.className = 'message gpt-message';
        gptMessageDiv.innerText = data.reply || 'No reply received';
        messagesDiv.appendChild(gptMessageDiv);
    } catch (error) {
        console.error('Error occurred:', error.message);
        const errorMessageDiv = document.createElement('div');
        errorMessageDiv.className = 'message gpt-message';
        errorMessageDiv.innerText = 'Error occurred: ' + error.message;
        messagesDiv.appendChild(errorMessageDiv);
    }

    // 입력란 초기화
    document.getElementById('user-input').value = '';
}

