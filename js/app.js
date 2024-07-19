async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const messagesDiv = document.getElementById('messages');

    if (!userInput.trim()) return;

    // 사용자가 입력한 메시지를 화면에 추가
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.textContent = userInput;
    messagesDiv.appendChild(userMessage);

    // GPT API 호출
    try {
        const response = await fetch('https://namu7788.herokuapp.com/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: userInput })
        });

        const data = await response.json();
        const gptMessage = document.createElement('div');
        gptMessage.className = 'message gpt-message';
        gptMessage.textContent = data.reply;
        messagesDiv.appendChild(gptMessage);

        // 스크롤을 아래로
        messagesDiv.scrollTop = messagesDiv.scrollHeight;

        // 입력 창 초기화
        document.getElementById('user-input').value = '';
    } catch (error) {
        console.error("Error:", error);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'message gpt-message';
        errorMessage.textContent = '연결이 불안정합니다.인터넷 연결을 확인해주세요.';
        messagesDiv.appendChild(errorMessage);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
}
