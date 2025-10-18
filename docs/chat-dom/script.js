import { getBotResponse } from './eliza.js';

const DEBUG = true;

function log(msg) {
    if (DEBUG) {
        console.log(msg);
    }
}

function showResponse(response) {
    addToChatWindow(response, 'bot');
}

function processMessage(message) {
    let response = getBotResponse(message);
    showResponse(response);
}

function send() {
    log('Sending message!');

    let messageBox = document.getElementById('messageBox');
    let message = messageBox.value.trim();

    if (!message) return; 

    messageBox.value = '';
    messageBox.focus();

    addToChatWindow(message, 'user');
    processMessage(message);
}

function addToChatWindow(message, speaker) {
    let messages = document.getElementById('messages');

    const wrapper = document.createElement('chat-messages');
    wrapper.className = `message ${speaker}`;

    const bubble = document.createElement('chat-messages');
    bubble.className = 'bubble';
    bubble.textContent = message;

    wrapper.appendChild(bubble);
    messages.appendChild(wrapper);

    messages.scrollTop = messages.scrollHeight;
}

function init() {
    log('Loading app!');

    document.getElementById('sendBtn').addEventListener('click', function () {
        send();
    });

    // allow Enter to send (Shift+Enter for newline)
    const messageBox = document.getElementById('messageBox');
    messageBox.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    });
}


window.addEventListener('DOMContentLoaded', init);
