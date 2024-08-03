const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

const appendMessage = (message, sender) => {
  const div = document.createElement('div');
  div.classList.add('message');
  div.classList.add(sender);
  div.textContent = message;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
};

const sendMessage = async () => {
  const message = userInput.value.trim();
  if (message === '') return;

  appendMessage(message, 'user-message');
  userInput.value = '';

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    appendMessage(data.reply, 'bot-message');
  } catch (error) {
    appendMessage('Sorry, something went wrong.', 'bot-message');
  }
};
