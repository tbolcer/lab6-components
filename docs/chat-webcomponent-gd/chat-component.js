import { getBotResponse } from "./eliza.js";

class ChatInterface extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this._onFormSubmit = this._onFormSubmit.bind(this);
    }

    connectedCallback() {
        // Build internal DOM structure inside shadow root
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                }

                .wrapper {
                width: 100%;
                height: 100%;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: linear-gradient(to top left,#8a6cf0 0%, #6b7df0 50%, #6a78d9 100%);
                overscroll-behavior: none;
                margin: 0;
                border: none;
                }

                chat-header {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                background-color: #007bff;
                color: white;
                width: 400px;
                border-top-left-radius: 1rem;
                border-top-right-radius: 1rem;
                padding: 1.5rem 1rem;
                box-sizing: border-box;
                margin-top: 3rem;
                border-bottom: 1px solid rgba(0, 0, 0, 0.06);
                position: relative;
                z-index: 5;
                }

                chat-header #p1 {
                font-size: 2rem;
                font-weight: 600;
                margin: 0.5rem 0 0 0;
                }

                chat-header #p2 {
                font-size: 1rem;
                margin: 0.2rem 0 0 0;
                }

                simple-chat {
                display: flex;
                flex-direction: column;
                background: white;
                width: 400px;
                height: 500px;
                border-bottom-left-radius: 1rem;
                border-bottom-right-radius: 1rem;
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
                overflow: hidden;
                margin-top: 0;
                }

                .messages {
                flex: 1 1 auto;
                overflow-y: auto;
                padding: 1rem;
                background: transparent;
                box-sizing: border-box;
                }

                .message {
                display: flex;
                margin: 6px 0;
                }

                .message.user {
                justify-content: flex-end;
                }

                .message.bot {
                justify-content: flex-start;
                }

                .bubble {
                max-width: 75%;
                padding: 8px 12px;
                border-radius: 14px;
                line-height: 1.3;
                box-shadow: 0 1px 2px rgba(0,0,0,0.06);
                white-space: pre-wrap;
                overflow-wrap: break-word;
                word-break: break-word;
                overflow: visible;
                }

                .message.user .bubble {
                background: #007bff;
                color: white;
                border-bottom-right-radius: 4px;
                }

                .message.bot .bubble {
                background: #f1f1f1;
                color: #222;
                border-bottom-left-radius: 4px;
                }

                .message.typing .bubble {
                opacity: 0.6;
                font-style: italic;
                }

                form.input-area {
                display: flex;
                gap: 8px;
                align-items: center;
                border-top: 1px solid #eee;
                padding: 8px 12px;
                flex: 0 0 auto;
                background: transparent;
                box-sizing: border-box;
                }

                form.input-area input[type="text"] {
                flex: 1;
                padding: 10px 14px;
                border-radius: 5rem;
                border: 1px solid #ccc;
                font-size: 1rem;
                outline: none;
                transition: border 0.2s ease;
                }

                form.input-area input[type="text"]:focus {
                border-color: #007bff;
                }

                form.input-area button {
                padding: 8px 16px;
                font-size: 1rem;
                cursor: pointer;
                border: none;
                background-color: #007bff;
                color: white;
                border-radius: 5rem;
                }

                form.input-area button:hover {
                background-color: #005fcf;
                }
            </style>

            <div class="wrapper">
                <chat-header>
                    <p id="p1">Chat Assistant</p>
                    <p id="p2">Approach 3: Web Component Graceful Degradation</p>
                </chat-header>

                <simple-chat>
                <div class="messages">
                    <div class="message bot">
                    <div class="bubble">Hello! How can I help you?</div>
                    </div>
                </div>

                <form class="input-area">
                    <input type="text" placeholder="Type a message..." autofocus />
                    <button type="submit">Send</button>
                </form>
                </simple-chat>
            </div>
    `;

        // Query elements within the shadow DOM
        this._messages = this.shadowRoot.querySelector(".messages");
        this._form = this.shadowRoot.querySelector("form.input-area");
        this._input = this._form.querySelector("input[type='text']");
        this._sendBtn = this._form.querySelector("button[type='submit']");

        this._form.addEventListener("submit", this._onFormSubmit);
        this._input.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                this._onFormSubmit(e);
            }
        });
    }

    disconnectedCallback() {
        this._form.removeEventListener("submit", this._onFormSubmit);
    }

    _onFormSubmit(event) {
        event.preventDefault();
        const text = this._input.value.trim();
        if (!text) return;

        this._appendMessage(text, "user");
        this._input.value = "";

        const typingMsg = this._appendMessage("…", "bot", true);

        setTimeout(() => {
            typingMsg.remove();
            const reply = getBotResponse(text);
            this._appendMessage(reply, "bot");
        }, 700);
    }

    _appendMessage(text, sender, isTyping = false) {
        const msg = document.createElement("div");
        msg.className = `message ${sender}`;
        if (isTyping) msg.classList.add("typing");

        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.textContent = text;

        msg.appendChild(bubble);
        this._messages.appendChild(msg);
        this._scrollToBottom();

        return msg;
    }

    _scrollToBottom() {
        this._messages.scrollTop = this._messages.scrollHeight;
    }
}

customElements.define("chat-interface", ChatInterface);
