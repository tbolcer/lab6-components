# lab6-components
COMP 305 Fall 2025 Lab 5 Components

This project explores building a simple chat interface using several front-end strategies. The purpose is to understand **component-based design** and evaluate the strengths and trade-offs of different ways to structure, style, and control UI elements.

---

A top-level `index.html` serves as a hub to navigate between all four approaches.

---

## Getting Started

1. **Create a GitHub Repository**:  
   Name it `lab6-components` and clone it to your local machine.

2. **Set Up Subdirectories**:  
   Create the four folders listed above.

3. **Main Navigation Page**:  
   Add `index.html` in the root to link to all four implementations.

4. **Version Control Practice**:  
   Commit changes incrementally with descriptive messages. Avoid submitting a single commit with the final result.

---

## Component-Based Development Concepts

A **component** is a self-contained UI unit that combines:

- **HTML structure**
- **CSS styling**
- **JavaScript behavior**

Different approaches allow us to explore:

| Method | Complexity | Reusability | Encapsulation | Accessibility | Maintainability |
|--------|------------|------------|---------------|---------------|----------------|
| Static HTML/CSS | Simple | Low | None | High | Medium |
| DOM Manipulation | Moderate | Moderate | None | Medium | Medium |
| Progressive Enhancement | Moderate | High | Partial | High | Medium |
| Shadow DOM Web Component | Advanced | High | Full | Medium | High |

---

## Chat Interface Features

The chat component demonstrates:

- A conversation area with messages
  - User messages aligned right
  - Bot messages aligned left
- Input field and send button
- Automatic scrolling to newest messages
- Eliza-style bot responses
- Enter key triggers message sending

### Bot Logic (Eliza-style)

A simple pattern-matching system handles responses:

- `"hello"` or `"hi"` → greeting reply
- `"help"` → guidance message
- Question words (`who, what, where, when, why, how`) → reply with a question
- `"bye"` or `"goodbye"` → farewell
- Otherwise → reflect user input

The `eliza.js` module is provided, so the focus is on the chat component itself.

---

## Implementation Approaches

### 1. Static HTML/CSS

- Location: `chat-prototype-html-css/`
- Purely visual prototype
- Semantic HTML structure:
  - `<main>` container
  - `<div>` or `<section>` for messages
  - `<form>` for input
- Flexbox for alignment of message bubbles
- Goal: Design the look and feel before adding interactivity

### 2. DOM Manipulation

- Location: `chat-dom/`
- Uses vanilla JavaScript to dynamically update the chat
- Adds messages to the DOM on user input
- Handles button clicks and Enter key
- Implements Eliza logic
- Goal: Learn event handling and dynamic DOM updates

### 3. Progressive Enhancement Web Component

- Location: `chat-webcomponent-pe/`
- Custom element `<simple-chat>` starts with HTML
- JavaScript enhances the component without Shadow DOM
- Works even if JavaScript fails to load
- Goal: Build components that enhance gracefully without breaking

### 4. Shadow DOM Web Component

- Location: `chat-webcomponent-gd/`
- Fully encapsulated `<chat-interface>` custom element
- All structure and styles live inside Shadow DOM
- JavaScript handles message creation, events, and bot responses
- Goal: Achieve true encapsulation and reusable components

---

## Main Navigation Page

The root `index.html` provides links to each implementation:

```html
<ul>
  <li><a href="chat-prototype-html-css/">Static HTML/CSS Prototype</a></li>
  <li><a href="chat-dom/">DOM Manipulation Approach</a></li>
  <li><a href="chat-webcomponent-pe/">Progressive Enhancement Web Component</a></li>
  <li><a href="chat-webcomponent-gd/">Shadow DOM Web Component</a></li>
</ul>
