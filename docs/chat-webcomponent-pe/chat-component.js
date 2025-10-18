import { getBotResponse } from "./eliza.js";

class SimpleChat extends HTMLElement {
  constructor() {
    super();
    this._onFormSubmit = this._onFormSubmit.bind(this);
  }

  connectedCallback() {
    this._messages = this.querySelector(".messages");
    this._form = this.querySelector("form.input-area");
    this._input = this._form.querySelector("input[type='text']");
    this._sendBtn = this._form.querySelector("button[type='submit']");

    if (!this._messages || !this._form || !this._input || !this._sendBtn) {
      console.error("SimpleChat: required elements missing (.messages, form.input-area, input, button).");
      return;
    }

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

customElements.define("simple-chat", SimpleChat);
