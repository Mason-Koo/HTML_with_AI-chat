async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const messagesDiv = document.getElementById('messages');
    const loaderDiv = document.getElementById('loader'); // 로딩 상태를 표시할 요소

    // 사용자 메시지를 화면에 추가
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user-message';
    userMessageDiv.innerText = userInput;
    messagesDiv.appendChild(userMessageDiv);

    // 로딩 상태 표시
    loaderDiv.style.display = 'block';

    try {
        const response = await fetch('https://namu7788-26384c2e3ec8.herokuapp.com/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
        }

        const data = await response.json();

        // GPT 응답 메시지를 화면에 추가
        if (data.reply) {
            const gptMessageDiv = document.createElement('div');
            gptMessageDiv.className = 'message gpt-message';
            gptMessageDiv.innerText = data.reply;
            messagesDiv.appendChild(gptMessageDiv);
        } else {
            throw new Error('Invalid response format: "reply" field is missing.');
        }
    } catch (error) {
        console.error('Error occurred:', error.message);
        const errorMessageDiv = document.createElement('div');
        errorMessageDiv.className = 'message gpt-message error-message';
        errorMessageDiv.innerText = `Error occurred: ${error.message}`;
        messagesDiv.appendChild(errorMessageDiv);
    } finally {
        // 로딩 상태 숨기기
        loaderDiv.style.display = 'none';
    }

    // 입력란 초기화
    document.getElementById('user-input').value = '';
}

