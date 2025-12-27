/**
 * Chat Manager - Handles chat messages and rendering
 */
class ChatManager {
    constructor() {
        this.messages = [];
        this.maxMessages = 10;
        this.chatElement = null;
    }

    /**
     * Initialize the chat manager with DOM element
     * @param {HTMLElement} chatElement - The chat container element
     */
    init(chatElement) {
        this.chatElement = chatElement;
    }

    /**
     * Get current timestamp
     * @returns {string} Formatted time HH:MM
     */
    getTimeNow() {
        const d = new Date();
        return d.getHours().toString().padStart(2, '0') + ':' +
            d.getMinutes().toString().padStart(2, '0');
    }

    /**
     * Get random name from sample names
     * @returns {string} Random name
     */
    getRandomName() {
        return CONFIG.SAMPLE_NAMES[Math.floor(Math.random() * CONFIG.SAMPLE_NAMES.length)];
    }

    /**
     * Get random message text from sample messages
     * @returns {string} Random message text
     */
    getRandomMessage() {
        return CONFIG.SAMPLE_MESSAGES[Math.floor(Math.random() * CONFIG.SAMPLE_MESSAGES.length)];
    }

    /**
     * Get random superchat amount
     * @returns {string} Formatted amount
     */
    getRandomAmount() {
        return '$' + (Math.floor(Math.random() * 50) + 5) + '.00';
    }

    /**
     * Add a new message to the chat
     * @param {string} type - Message type: 'normal', 'member', or 'superchat'
     */
    addMessage(type = 'normal') {
        const message = {
            name: this.getRandomName(),
            text: this.getRandomMessage(),
            time: this.getTimeNow(),
            type: type,
            amount: type === 'superchat' ? this.getRandomAmount() : null
        };

        this.messages.push(message);

        // Keep only the last N messages
        if (this.messages.length > this.maxMessages) {
            this.messages.shift();
        }

        this.render();
    }

    /**
     * Clear all messages
     */
    clearChat() {
        this.messages = [];
        this.render();
    }

    /**
     * Render all messages to the DOM
     */
    render() {
        if (!this.chatElement) {
            console.error('Chat element not initialized');
            return;
        }

        this.chatElement.innerHTML = '';

        this.messages.forEach(msg => {
            if (msg.type === 'superchat') {
                this.renderSuperchat(msg);
            } else {
                this.renderTextMessage(msg);
            }
        });

        // Auto-scroll to bottom
        this.chatElement.scrollTop = this.chatElement.scrollHeight;
    }

    /**
     * Render a superchat message
     * @param {Object} msg - Message object
     */
    renderSuperchat(msg) {
        const div = document.createElement('div');
        div.className = 'yt-live-chat-paid-message-renderer';
        div.innerHTML = `
            <div id="card">
                <div id="header">
                    <span id="author-name">${this.escapeHtml(msg.name)}</span>
                    <span id="purchase-amount">${this.escapeHtml(msg.amount)}</span>
                </div>
                <div id="content">
                    <div id="message">${this.escapeHtml(msg.text)}</div>
                </div>
            </div>
        `;
        this.chatElement.appendChild(div);
    }

    /**
     * Render a text message (normal or member)
     * @param {Object} msg - Message object
     */
    renderTextMessage(msg) {
        const div = document.createElement('div');
        div.className = 'yt-live-chat-text-message-renderer';

        if (msg.type === 'member') {
            div.setAttribute('author-type', 'member');
        }

        div.innerHTML = `
            <div id="content">
                <div id="author-name">${this.escapeHtml(msg.name)}</div>
                <div id="message">${this.escapeHtml(msg.text)}</div>
            </div>
        `;
        this.chatElement.appendChild(div);
    }

    /**
     * Escape HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Get current messages count
     * @returns {number} Number of messages
     */
    getMessageCount() {
        return this.messages.length;
    }

    /**
     * Set maximum messages to keep
     * @param {number} max - Maximum messages
     */
    setMaxMessages(max) {
        this.maxMessages = max;

        // Trim if necessary
        while (this.messages.length > this.maxMessages) {
            this.messages.shift();
        }

        this.render();
    }
}

// Create global instance
const chatManager = new ChatManager();
