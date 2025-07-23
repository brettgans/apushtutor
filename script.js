const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

const sampleResponses = [
    "Great question! The American Revolution began due to several key factors: British taxation without representation (like the Stamp Act of 1765), increased British control after the French and Indian War, and Enlightenment ideas about natural rights. The colonists felt their rights as Englishmen were being violated.",
    "The Constitution was created to address the weaknesses of the Articles of Confederation...",
    "Manifest Destiny was the 19th-century belief that American expansion across the continent was justified and inevitable...",
    "The Civil War had multiple causes: sectional differences over slavery, states' rights vs. federal authority...",
    "The New Deal consisted of programs like the CCC, WPA, and Social Security, designed to provide Relief, Recovery, and Reform during the Great Depression...",
    "The Cold War began after WWII due to ideological differences between the US and Soviet Union..."
];

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'ai'}`;
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    bubbleDiv.textContent = content;
    
    messageDiv.appendChild(bubbleDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showLoading() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai';
    messageDiv.id = 'loadingMessage';
    
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.innerHTML = `
        <span>APUSH Tutor is thinking</span>
        <div class="loading-dots">
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
        </div>
    `;
    
    messageDiv.appendChild(loadingDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideLoading() {
    const loadingMessage = document.getElementById('loadingMessage');
    if (loadingMessage) {
        loadingMessage.remove();
    }
}

function simulateAIResponse() {
    const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
    showLoading();
    setTimeout(() => {
        hideLoading();
        addMessage(randomResponse, false);
    }, 1000 + Math.random() * 1000);
}

function sendMessage() {
    const message = messageInput.value.trim();
    if (message === '') return;
    addMessage(message, true);
    messageInput.value = '';
    sendButton.disabled = true;
    simulateAIResponse();
    setTimeout(() => {
        sendButton.disabled = false;
        messageInput.focus();
    }, 2500);
}

sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

messageInput.focus();

messageInput.addEventListener('input', () => {
    sendButton.disabled = messageInput.value.trim() === '';
});
