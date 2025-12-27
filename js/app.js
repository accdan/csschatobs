/**
 * Main Application - Initializes and coordinates all modules
 */

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Chat Overlay Designer - Initializing...');

    // Initialize chat manager
    const chatElement = document.getElementById('chat');
    if (chatElement) {
        chatManager.init(chatElement);
        console.log('✅ Chat Manager initialized');
    } else {
        console.error('❌ Chat element not found');
    }

    // Load last settings or apply default
    const hasLastSettings = localStorage.getItem(CONFIG.STORAGE_KEYS.LAST_SETTINGS);
    if (hasLastSettings) {
        themeManager.loadLastSettings();
        console.log('✅ Last settings loaded');
    } else {
        themeManager.applySettings();
        console.log('✅ Default settings applied');
    }

    // Initialize CSS exporter
    cssExporter = new CSSExporter(themeManager);
    console.log('✅ CSS Exporter initialized');

    // Initialize UI controller
    uiController = new UIController(themeManager, chatManager, cssExporter);
    uiController.init();
    console.log('✅ UI Controller initialized');

    // Add initial demo messages
    setTimeout(() => {
        chatManager.addMessage('normal');
    }, 100);

    setTimeout(() => {
        chatManager.addMessage('member');
    }, 300);

    setTimeout(() => {
        chatManager.addMessage('superchat');
    }, 500);

    console.log('✨ Chat Overlay Designer ready!');
});

// Export to window for console debugging
window.ChatOverlayDesigner = {
    config: CONFIG,
    themeManager,
    chatManager,
    get cssExporter() { return cssExporter; },
    get uiController() { return uiController; },

    // Helper functions for console use
    generateCSS() {
        return cssExporter.generateCSS();
    },

    exportSettings() {
        return themeManager.exportSettings();
    },

    importSettings(json) {
        return themeManager.importSettings(json);
    },

    addChat(type = 'normal') {
        chatManager.addMessage(type);
    },

    clearChat() {
        chatManager.clearChat();
    },

    applyTheme(theme) {
        themeManager.applyTheme(theme);
    },

    reset() {
        themeManager.resetToDefault();
    }
};

console.log('💡 Tip: Access ChatOverlayDesigner from console for debugging');
