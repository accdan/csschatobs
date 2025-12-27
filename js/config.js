/**
 * Configuration and Constants for Chat Overlay Designer
 * Contains default settings, theme presets, and sample data
 */

const CONFIG = {
    // Default settings
    DEFAULT_SETTINGS: {
        bgMode: 'transparent',
        bgColor: '#000000',
        bgOpacity: 0,
        listenerNameBg: '#7ac970',
        memberNameBg: '#7ac970',
        nameColor: '#ffffff',
        nameSize: 12,
        nameBadgeRad: 18,
        normalMsgBg: '#ffffff',
        normalMsgBorder: '#7ac970',
        memberMsgBg: '#ffffff',
        memberMsgBorder: '#7ac970',
        textColor: '#333333',
        textSize: 16,
        msgRad: 30,
        msgPad: 12,
        superchatHeaderBg: '#90d387',
        superchatBodyBg: '#7ac970',
        superchatTextColor: '#ffffff',
        membershipBg: '#10b981',
        membershipTextColor: '#ffffff',
        font: "'Noto Sans JP', sans-serif",
        anim: 'popInLeft 0.3s ease-out forwards'
    },

    // Sample data for chat preview
    SAMPLE_NAMES: [
        'Alice', 'Bob', 'Charlie', 'Diana', 'Eren', 'Fiona', 
        'George', 'Hannah', 'Ivan', 'Julia', 'Kevin', 'Luna'
    ],

    SAMPLE_MESSAGES: [
        'Hello everyone!', 'Great stream!', 'LOL', 'Nice play!', 
        'Love this content', 'Keep it up!', 'Amazing!', 'Wow!',
        'This is awesome', 'Can\'t wait for more', '❤️', '🔥',
        'Let\'s go!', 'Best streamer!', 'So good!', 'Epic moment!'
    ],

    // Font options grouped by category
    FONTS: {
        'Sans Serif - Clean & Modern': [
            { value: "'Noto Sans JP', sans-serif", label: 'Noto Sans JP' },
            { value: "'Poppins', sans-serif", label: 'Poppins' },
            { value: "'Inter', sans-serif", label: 'Inter' },
            { value: "'Roboto', sans-serif", label: 'Roboto' },
            { value: "'Montserrat', sans-serif", label: 'Montserrat' },
            { value: "'Open Sans', sans-serif", label: 'Open Sans' },
            { value: "'Lato', sans-serif", label: 'Lato' },
            { value: "'Raleway', sans-serif", label: 'Raleway' },
            { value: "'Nunito', sans-serif", label: 'Nunito' },
            { value: "'Quicksand', sans-serif", label: 'Quicksand' },
            { value: "'Ubuntu', sans-serif", label: 'Ubuntu' },
            { value: "'Oswald', sans-serif", label: 'Oswald' }
        ],
        'Rounded & Friendly': [
            { value: "'Comfortaa', sans-serif", label: 'Comfortaa' },
            { value: "'Righteous', sans-serif", label: 'Righteous' },
            { value: "'Bungee', sans-serif", label: 'Bungee' }
        ],
        'Monospace - Code Style': [
            { value: "'Roboto Mono', monospace", label: 'Roboto Mono' },
            { value: "'Source Code Pro', monospace", label: 'Source Code Pro' },
            { value: "'Courier New', monospace", label: 'Courier New' }
        ],
        'Display - Bold & Impact': [
            { value: "'Bebas Neue', sans-serif", label: 'Bebas Neue' },
            { value: "'Bangers', cursive", label: 'Bangers' },
            { value: "'Black Ops One', sans-serif", label: 'Black Ops One' },
            { value: "'Russo One', sans-serif", label: 'Russo One' },
            { value: "'Audiowide', sans-serif", label: 'Audiowide' },
            { value: "'Orbitron', sans-serif", label: 'Orbitron' }
        ],
        'Handwriting & Script': [
            { value: "'Pacifico', cursive", label: 'Pacifico' },
            { value: "'Permanent Marker', cursive", label: 'Permanent Marker' },
            { value: "'Dancing Script', cursive", label: 'Dancing Script' },
            { value: "'Caveat', cursive", label: 'Caveat' }
        ],
        'Gaming & Retro': [
            { value: "'Press Start 2P', cursive", label: 'Press Start 2P' },
            { value: "'VT323', monospace", label: 'VT323' }
        ]
    },

    // Animation options
    ANIMATIONS: [
        { value: 'popInLeft 0.3s ease-out forwards', label: 'Pop In Left' },
        { value: 'float 500ms ease forwards', label: 'Slide Up' },
        { value: 'fade 400ms ease forwards', label: 'Fade In' },
        { value: 'none', label: 'None' }
    ],

    // Theme presets
    THEMES: {
        youtube: {
            name: 'YouTube',
            settings: {
                bgMode: 'transparent',
                listenerNameBg: '#7ac970',
                memberNameBg: '#7ac970',
                nameColor: '#ffffff',
                normalMsgBg: '#ffffff',
                normalMsgBorder: '#7ac970',
                memberMsgBg: '#ffffff',
                memberMsgBorder: '#7ac970',
                textColor: '#333333',
                superchatHeaderBg: '#90d387',
                superchatBodyBg: '#7ac970',
                superchatTextColor: '#ffffff',
                anim: 'popInLeft 0.3s ease-out forwards'
            }
        },
        dark: {
            name: 'Dark Mode',
            settings: {
                bgMode: 'solid',
                bgColor: '#1a1a1a',
                bgOpacity: 95,
                listenerNameBg: '#374151',
                memberNameBg: '#7c3aed',
                nameColor: '#ffffff',
                normalMsgBg: '#1f2937',
                normalMsgBorder: '#374151',
                memberMsgBg: '#1f2937',
                memberMsgBorder: '#7c3aed',
                textColor: '#ffffff',
                superchatHeaderBg: '#7c3aed',
                superchatBodyBg: '#1f2937',
                superchatTextColor: '#ffffff'
            }
        },
        neon: {
            name: 'Neon',
            settings: {
                bgMode: 'solid',
                bgColor: '#000000',
                bgOpacity: 90,
                listenerNameBg: '#ff006e',
                memberNameBg: '#8338ec',
                nameColor: '#ffffff',
                normalMsgBg: '#000000',
                normalMsgBorder: '#00f5ff',
                memberMsgBg: '#000000',
                memberMsgBorder: '#8338ec',
                textColor: '#00f5ff',
                superchatHeaderBg: '#ff006e',
                superchatBodyBg: '#8338ec',
                superchatTextColor: '#ffffff'
            }
        },
        twitch: {
            name: 'Twitch',
            settings: {
                bgMode: 'solid',
                bgColor: '#1f1f23',
                bgOpacity: 90,
                listenerNameBg: '#ff1444',
                memberNameBg: '#6441a4',
                nameColor: '#ffffff',
                normalMsgBg: '#ffffff',
                normalMsgBorder: '#6441a4',
                memberMsgBg: '#ffffff',
                memberMsgBorder: '#6441a4',
                textColor: '#000000',
                superchatHeaderBg: '#6441a4',
                superchatBodyBg: '#ffffff',
                superchatTextColor: '#000000',
                membershipBg: '#6441a4',
                membershipTextColor: '#ffffff'
            }
        },
        tiktok: {
            name: 'TikTok',
            settings: {
                bgMode: 'solid',
                bgColor: '#ffffff',
                bgOpacity: 80,
                listenerNameBg: '#FE2C55',
                memberNameBg: '#FF0050',
                nameColor: '#ffffff',
                normalMsgBg: '#ffffff',
                normalMsgBorder: '#FE2C55',
                memberMsgBg: '#ffffff',
                memberMsgBorder: '#FE2C55',
                textColor: '#000000',
                superchatHeaderBg: '#FE2C55',
                superchatBodyBg: '#ffffff',
                superchatTextColor: '#000000',
                membershipBg: '#FE2C55',
                membershipTextColor: '#ffffff'
            }
        }
    },

    // Preview viewport sizes
    VIEWPORT_SIZES: {
        desktop: { width: '100%', label: 'Desktop' },
        tablet: { width: '768px', label: 'Tablet' },
        mobile: { width: '375px', label: 'Mobile' }
    },

    // LocalStorage keys
    STORAGE_KEYS: {
        CUSTOM_PRESETS: 'chatOverlay_customPresets',
        LAST_SETTINGS: 'chatOverlay_lastSettings',
        UI_PREFERENCES: 'chatOverlay_uiPreferences'
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
