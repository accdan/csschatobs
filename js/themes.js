/**
 * Theme Manager - Handles theme application and settings management
 */
class ThemeManager {
    constructor() {
        this.currentSettings = { ...CONFIG.DEFAULT_SETTINGS };
        this.customPresets = this.loadCustomPresets();
    }

    /**
     * Get current settings
     * @returns {Object} Current settings object
     */
    getCurrentSettings() {
        return { ...this.currentSettings };
    }

    /**
     * Update a single setting
     * @param {string} key - Setting key
     * @param {any} value - Setting value
     */
    updateSetting(key, value) {
        this.currentSettings[key] = value;
        this.applySettings();
        this.saveLastSettings();
    }

    /**
     * Update multiple settings at once
     * @param {Object} settings - Settings object
     */
    updateSettings(settings) {
        this.currentSettings = { ...this.currentSettings, ...settings };
        this.applySettings();
        this.saveLastSettings();
    }

    /**
     * Apply a preset theme
     * @param {string} themeName - Name of the theme preset
     */
    applyTheme(themeName) {
        const theme = CONFIG.THEMES[themeName];

        if (!theme) {
            console.error(`Theme "${themeName}" not found`);
            return;
        }

        // Update settings with theme settings
        this.updateSettings(theme.settings);

        // Update UI controls
        this.updateUIControls();
    }

    /**
     * Apply current settings to the preview
     */
    applySettings() {
        const s = this.currentSettings;

        // Update preview background
        const preview = document.getElementById('previewWrap');
        if (preview) {
            if (s.bgMode === 'transparent') {
                preview.style.background = 'rgba(0,0,0,0)';
            } else {
                preview.style.background = this.hexToRgba(s.bgColor, s.bgOpacity / 100);
            }
        }

        // Update chat font family
        const chat = document.getElementById('chat');
        if (chat) {
            chat.style.fontFamily = s.font;
        }

        // Apply dynamic CSS styles
        this.applyDynamicStyles();
    }

    /**
     * Apply dynamic CSS styles for chat elements
     */
    applyDynamicStyles() {
        const s = this.currentSettings;

        // Remove old dynamic styles
        const oldStyle = document.getElementById('dynamic-styles');
        if (oldStyle) oldStyle.remove();

        // Create new style element
        const style = document.createElement('style');
        style.id = 'dynamic-styles';

        style.textContent = `
            .yt-live-chat-text-message-renderer,
            .yt-live-chat-paid-message-renderer {
                animation: ${s.anim};
            }
            
            .yt-live-chat-text-message-renderer #author-name {
                background: ${s.listenerNameBg} !important;
                color: ${s.nameColor} !important;
                font-size: ${s.nameSize}px !important;
                border-radius: ${s.nameBadgeRad}px !important;
            }
            
            .yt-live-chat-text-message-renderer[author-type="member"] #author-name {
                background: ${s.memberNameBg} !important;
            }
            
            .yt-live-chat-text-message-renderer #message {
                background: ${s.normalMsgBg} !important;
                color: ${s.textColor} !important;
                border-color: ${s.normalMsgBorder} !important;
                font-size: ${s.textSize}px !important;
                border-radius: ${s.msgRad}px !important;
                padding: ${s.msgPad}px 20px !important;
            }
            
            .yt-live-chat-text-message-renderer #message::before {
                background: ${s.normalMsgBorder} !important;
            }
            
            .yt-live-chat-text-message-renderer #message::after {
                background: ${s.normalMsgBg} !important;
            }
            
            .yt-live-chat-text-message-renderer[author-type="member"] #message {
                background: ${s.memberMsgBg} !important;
                border-color: ${s.memberMsgBorder} !important;
            }
            
            .yt-live-chat-text-message-renderer[author-type="member"] #message::before {
                background: ${s.memberMsgBorder} !important;
            }
            
            .yt-live-chat-text-message-renderer[author-type="member"] #message::after {
                background: ${s.memberMsgBg} !important;
            }
            
            .yt-live-chat-paid-message-renderer #header {
                background: ${s.superchatHeaderBg} !important;
                color: ${s.superchatTextColor} !important;
                font-size: ${s.nameSize}px !important;
            }
            
            .yt-live-chat-paid-message-renderer #content {
                background: ${s.superchatBodyBg} !important;
                color: ${s.superchatTextColor} !important;
                font-size: ${s.textSize}px !important;
            }
        `;

        document.head.appendChild(style);
    }

    /**
     * Update UI control values from current settings
     */
    updateUIControls() {
        const s = this.currentSettings;

        // Update all form controls
        const controls = {
            bgMode: s.bgMode,
            bgColor: s.bgColor,
            bgOpacity: s.bgOpacity,
            listenerNameBg: s.listenerNameBg,
            memberNameBg: s.memberNameBg,
            nameColor: s.nameColor,
            nameSize: s.nameSize,
            nameBadgeRad: s.nameBadgeRad,
            normalMsgBg: s.normalMsgBg,
            normalMsgBorder: s.normalMsgBorder,
            memberMsgBg: s.memberMsgBg,
            memberMsgBorder: s.memberMsgBorder,
            textColor: s.textColor,
            textSize: s.textSize,
            msgRad: s.msgRad,
            msgPad: s.msgPad,
            superchatHeaderBg: s.superchatHeaderBg,
            superchatBodyBg: s.superchatBodyBg,
            superchatTextColor: s.superchatTextColor,
            membershipBg: s.membershipBg,
            membershipTextColor: s.membershipTextColor,
            fontSel: s.font,
            animSel: s.anim
        };

        // Update each control
        Object.keys(controls).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = controls[key];
            }
        });

        // Update display values
        this.updateDisplayValues();
    }

    /**
     * Update display values for range inputs
     */
    updateDisplayValues() {
        const s = this.currentSettings;

        const displays = {
            bgOpacityVal: s.bgOpacity,
            nameSizeVal: s.nameSize,
            nameBadgeRadVal: s.nameBadgeRad,
            textSizeVal: s.textSize,
            msgRadVal: s.msgRad,
            msgPadVal: s.msgPad
        };

        Object.keys(displays).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = displays[key];
            }
        });
    }

    /**
     * Convert hex color to rgba
     * @param {string} hex - Hex color code
     * @param {number} alpha - Alpha value (0-1)
     * @returns {string} RGBA color string
     */
    hexToRgba(hex, alpha = 1) {
        const h = hex.replace('#', '');
        const r = parseInt(h.substring(0, 2), 16);
        const g = parseInt(h.substring(2, 4), 16);
        const b = parseInt(h.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    /**
     * Reset to default settings
     */
    resetToDefault() {
        this.currentSettings = { ...CONFIG.DEFAULT_SETTINGS };
        this.updateUIControls();
        this.applySettings();
        this.saveLastSettings();
    }

    /**
     * Save custom preset
     * @param {string} name - Preset name
     */
    savePreset(name) {
        if (!name || name.trim() === '') {
            console.error('Preset name cannot be empty');
            return false;
        }

        this.customPresets[name] = { ...this.currentSettings };
        this.saveCustomPresets();
        return true;
    }

    /**
     * Load custom preset
     * @param {string} name - Preset name
     */
    loadPreset(name) {
        const preset = this.customPresets[name];

        if (!preset) {
            console.error(`Preset "${name}" not found`);
            return false;
        }

        this.updateSettings(preset);
        this.updateUIControls();
        return true;
    }

    /**
     * Delete custom preset
     * @param {string} name - Preset name
     */
    deletePreset(name) {
        if (this.customPresets[name]) {
            delete this.customPresets[name];
            this.saveCustomPresets();
            return true;
        }
        return false;
    }

    /**
     * Get all custom preset names
     * @returns {Array} Array of preset names
     */
    getCustomPresetNames() {
        return Object.keys(this.customPresets);
    }

    /**
     * Save custom presets to localStorage
     */
    saveCustomPresets() {
        try {
            localStorage.setItem(
                CONFIG.STORAGE_KEYS.CUSTOM_PRESETS,
                JSON.stringify(this.customPresets)
            );
        } catch (e) {
            console.error('Failed to save custom presets:', e);
        }
    }

    /**
     * Load custom presets from localStorage
     * @returns {Object} Custom presets object
     */
    loadCustomPresets() {
        try {
            const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.CUSTOM_PRESETS);
            return saved ? JSON.parse(saved) : {};
        } catch (e) {
            console.error('Failed to load custom presets:', e);
            return {};
        }
    }

    /**
     * Save last settings to localStorage
     */
    saveLastSettings() {
        try {
            localStorage.setItem(
                CONFIG.STORAGE_KEYS.LAST_SETTINGS,
                JSON.stringify(this.currentSettings)
            );
        } catch (e) {
            console.error('Failed to save last settings:', e);
        }
    }

    /**
     * Load last settings from localStorage
     */
    loadLastSettings() {
        try {
            const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.LAST_SETTINGS);
            if (saved) {
                this.currentSettings = JSON.parse(saved);
                this.updateUIControls();
                this.applySettings();
            }
        } catch (e) {
            console.error('Failed to load last settings:', e);
        }
    }

    /**
     * Export settings as JSON
     * @returns {string} JSON string of current settings
     */
    exportSettings() {
        return JSON.stringify(this.currentSettings, null, 2);
    }

    /**
     * Import settings from JSON
     * @param {string} jsonString - JSON string of settings
     * @returns {boolean} Success status
     */
    importSettings(jsonString) {
        try {
            const settings = JSON.parse(jsonString);
            this.updateSettings(settings);
            this.updateUIControls();
            return true;
        } catch (e) {
            console.error('Failed to import settings:', e);
            return false;
        }
    }
}

// Create global instance
const themeManager = new ThemeManager();
