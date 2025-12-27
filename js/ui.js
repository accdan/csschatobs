/**
 * UI Controller - Handles all UI interactions and events
 */
class UIController {
    constructor(themeManager, chatManager, cssExporter) {
        this.themeManager = themeManager;
        this.chatManager = chatManager;
        this.cssExporter = cssExporter;
        this.currentViewport = 'desktop';
        this.darkMode = false;
    }

    /**
     * Initialize all event listeners
     */
    init() {
        this.setupControlListeners();
        this.setupThemeButtons();
        this.setupChatButtons();
        this.setupExportButtons();
        this.setupPresetManager();
        this.setupViewportControls();
        this.setupDarkModeToggle();
        this.setupModalHandlers();
        this.loadUIPreferences();
    }

    /**
     * Setup listeners for all control inputs
     */
    setupControlListeners() {
        // Background controls
        this.addListener('bgMode', 'change', (e) => {
            this.themeManager.updateSetting('bgMode', e.target.value);
        });

        this.addListener('bgColor', 'change', (e) => {
            this.themeManager.updateSetting('bgColor', e.target.value);
        });

        this.addListener('bgOpacity', 'input', (e) => {
            this.themeManager.updateSetting('bgOpacity', e.target.value);
        });

        // Name badge controls
        const nameBadgeControls = ['listenerNameBg', 'memberNameBg', 'nameColor'];
        nameBadgeControls.forEach(id => {
            this.addListener(id, 'change', (e) => {
                this.themeManager.updateSetting(id, e.target.value);
            });
        });

        this.addListener('nameSize', 'input', (e) => {
            this.themeManager.updateSetting('nameSize', e.target.value);
        });

        this.addListener('nameBadgeRad', 'input', (e) => {
            this.themeManager.updateSetting('nameBadgeRad', e.target.value);
        });

        // Message bubble controls
        const msgControls = ['normalMsgBg', 'normalMsgBorder', 'memberMsgBg', 'memberMsgBorder', 'textColor'];
        msgControls.forEach(id => {
            this.addListener(id, 'change', (e) => {
                this.themeManager.updateSetting(id, e.target.value);
            });
        });

        this.addListener('textSize', 'input', (e) => {
            this.themeManager.updateSetting('textSize', e.target.value);
        });

        this.addListener('msgRad', 'input', (e) => {
            this.themeManager.updateSetting('msgRad', e.target.value);
        });

        this.addListener('msgPad', 'input', (e) => {
            this.themeManager.updateSetting('msgPad', e.target.value);
        });

        // Superchat controls
        const superchatControls = ['superchatHeaderBg', 'superchatBodyBg', 'superchatTextColor'];
        superchatControls.forEach(id => {
            this.addListener(id, 'change', (e) => {
                this.themeManager.updateSetting(id, e.target.value);
            });
        });

        // Membership controls
        const membershipControls = ['membershipBg', 'membershipTextColor'];
        membershipControls.forEach(id => {
            this.addListener(id, 'change', (e) => {
                this.themeManager.updateSetting(id, e.target.value);
            });
        });

        // Font and animation
        this.addListener('fontSel', 'change', (e) => {
            this.themeManager.updateSetting('font', e.target.value);
        });

        this.addListener('animSel', 'change', (e) => {
            this.themeManager.updateSetting('anim', e.target.value);
        });
    }

    /**
     * Setup theme preset buttons
     */
    setupThemeButtons() {
        const themes = ['youtube', 'dark', 'neon', 'twitch', 'tiktok'];

        themes.forEach(theme => {
            this.addListener(`theme-${theme}`, 'click', () => {
                this.themeManager.applyTheme(theme);
                this.showNotification(`${CONFIG.THEMES[theme].name} theme applied!`, 'success');
            });
        });

        // Reset button
        this.addListener('btn-reset', 'click', () => {
            if (confirm('Reset all settings to default?')) {
                this.themeManager.resetToDefault();
                this.showNotification('Settings reset to default', 'info');
            }
        });
    }

    /**
     * Setup chat action buttons
     */
    setupChatButtons() {
        this.addListener('btn-add-normal', 'click', () => {
            this.chatManager.addMessage('normal');
        });

        this.addListener('btn-add-member', 'click', () => {
            this.chatManager.addMessage('member');
        });

        this.addListener('btn-add-superchat', 'click', () => {
            this.chatManager.addMessage('superchat');
        });

        this.addListener('btn-clear-chat', 'click', () => {
            this.chatManager.clearChat();
        });
    }

    /**
     * Setup export buttons
     */
    setupExportButtons() {
        this.addListener('btn-copy-css', 'click', async () => {
            const success = await this.cssExporter.copyToClipboard();
            if (success) {
                this.showModal(this.cssExporter.generateCSS());
                this.showNotification('CSS copied to clipboard!', 'success');
            } else {
                this.showNotification('Failed to copy CSS', 'error');
            }
        });

        this.addListener('btn-download-css', 'click', () => {
            this.cssExporter.downloadFile();
            this.showNotification('CSS file downloaded!', 'success');
        });
    }

    /**
     * Setup preset manager
     */
    setupPresetManager() {
        // Save preset
        this.addListener('btn-save-preset', 'click', () => {
            const name = document.getElementById('preset-name')?.value;

            if (!name || name.trim() === '') {
                this.showNotification('Please enter a preset name', 'error');
                return;
            }

            const success = this.themeManager.savePreset(name);
            if (success) {
                this.updatePresetList();
                document.getElementById('preset-name').value = '';
                this.showNotification(`Preset "${name}" saved!`, 'success');
            }
        });

        // Update preset list on init
        this.updatePresetList();
    }

    /**
     * Update custom preset list
     */
    updatePresetList() {
        const container = document.getElementById('custom-presets-list');
        if (!container) return;

        const presets = this.themeManager.getCustomPresetNames();

        if (presets.length === 0) {
            container.innerHTML = '<p class="no-presets">No custom presets saved</p>';
            return;
        }

        container.innerHTML = presets.map(name => `
            <div class="preset-item">
                <button class="btn-preset" data-preset="${name}">${name}</button>
                <button class="btn-delete-preset" data-preset="${name}" title="Delete">🗑️</button>
            </div>
        `).join('');

        // Add event listeners for preset buttons
        container.querySelectorAll('.btn-preset').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const presetName = e.target.dataset.preset;
                this.themeManager.loadPreset(presetName);
                this.showNotification(`Preset "${presetName}" loaded!`, 'success');
            });
        });

        container.querySelectorAll('.btn-delete-preset').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const presetName = e.target.dataset.preset;
                if (confirm(`Delete preset "${presetName}"?`)) {
                    this.themeManager.deletePreset(presetName);
                    this.updatePresetList();
                    this.showNotification(`Preset "${presetName}" deleted`, 'info');
                }
            });
        });
    }

    /**
     * Setup viewport size controls
     */
    setupViewportControls() {
        const viewports = ['desktop', 'tablet', 'mobile'];

        viewports.forEach(viewport => {
            this.addListener(`viewport-${viewport}`, 'click', () => {
                this.setViewport(viewport);
            });
        });
    }

    /**
     * Set preview viewport size
     * @param {string} size - Viewport size (desktop/tablet/mobile)
     */
    setViewport(size) {
        this.currentViewport = size;
        const previewWrap = document.getElementById('previewWrap');
        const chat = document.getElementById('chat');

        if (!previewWrap || !chat) return;

        const width = CONFIG.VIEWPORT_SIZES[size].width;
        chat.style.maxWidth = width;

        // Update active button
        document.querySelectorAll('[id^="viewport-"]').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(`viewport-${size}`)?.classList.add('active');

        this.saveUIPreferences();
    }

    /**
     * Setup dark mode toggle
     */
    setupDarkModeToggle() {
        this.addListener('dark-mode-toggle', 'click', () => {
            this.toggleDarkMode();
        });
    }

    /**
     * Toggle dark mode for designer UI
     */
    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        document.body.classList.toggle('dark-mode', this.darkMode);

        const icon = document.getElementById('dark-mode-icon');
        if (icon) {
            icon.textContent = this.darkMode ? '☀️' : '🌙';
        }

        this.saveUIPreferences();
        this.showNotification(`Dark mode ${this.darkMode ? 'enabled' : 'disabled'}`, 'info');
    }

    /**
     * Setup modal handlers
     */
    setupModalHandlers() {
        this.addListener('modal-backdrop', 'click', () => {
            this.closeModal();
        });

        this.addListener('btn-close-modal', 'click', () => {
            this.closeModal();
        });

        this.addListener('btn-copy-modal', 'click', async () => {
            const content = document.getElementById('modal-content')?.textContent;
            if (content) {
                try {
                    await navigator.clipboard.writeText(content);
                    this.showNotification('CSS copied to clipboard!', 'success');
                } catch (e) {
                    this.showNotification('Failed to copy', 'error');
                }
            }
        });
    }

    /**
     * Show modal with CSS code
     * @param {string} content - CSS content to display
     */
    showModal(content) {
        const modal = document.getElementById('modal');
        const backdrop = document.getElementById('modal-backdrop');
        const contentEl = document.getElementById('modal-content');

        if (modal && backdrop && contentEl) {
            contentEl.textContent = content;
            modal.style.display = 'block';
            backdrop.style.display = 'block';
        }
    }

    /**
     * Close modal
     */
    closeModal() {
        const modal = document.getElementById('modal');
        const backdrop = document.getElementById('modal-backdrop');

        if (modal && backdrop) {
            modal.style.display = 'none';
            backdrop.style.display = 'none';
        }
    }

    /**
     * Show notification toast
     * @param {string} message - Notification message
     * @param {string} type - Notification type (success/error/info)
     */
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Add to body
        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    /**
     * Add event listener helper with null check
     * @param {string} id - Element ID
     * @param {string} event - Event type
     * @param {Function} handler - Event handler
     */
    addListener(id, event, handler) {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener(event, handler);
        }
    }

    /**
     * Save UI preferences to localStorage
     */
    saveUIPreferences() {
        try {
            const prefs = {
                darkMode: this.darkMode,
                viewport: this.currentViewport
            };
            localStorage.setItem(CONFIG.STORAGE_KEYS.UI_PREFERENCES, JSON.stringify(prefs));
        } catch (e) {
            console.error('Failed to save UI preferences:', e);
        }
    }

    /**
     * Load UI preferences from localStorage
     */
    loadUIPreferences() {
        try {
            const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.UI_PREFERENCES);
            if (saved) {
                const prefs = JSON.parse(saved);

                if (prefs.darkMode) {
                    this.toggleDarkMode();
                }

                if (prefs.viewport) {
                    this.setViewport(prefs.viewport);
                }
            }
        } catch (e) {
            console.error('Failed to load UI preferences:', e);
        }
    }
}

// Global instance will be created in app.js
let uiController;
