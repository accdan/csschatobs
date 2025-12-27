# 🎨 Streaming Chat Overlay Designer

A powerful, feature-rich web application for designing and customizing chat overlays for streaming platforms (YouTube, Twitch, TikTok, etc.) with live preview and CSS export functionality.

![Version](https://img.shields.io/badge/version-2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎯 Core Features
- **Live Preview**: See your changes in real-time as you customize
- **Multiple Platform Support**: Presets for YouTube, Twitch, TikTok, and custom themes
- **Full Customization**: Control every aspect of your chat overlay
- **CSS Export**: Copy or download CSS ready for OBS/streaming software
- **Custom Presets**: Save and load your own custom theme presets
- **Responsive Design**: Preview in different viewport sizes (Desktop/Tablet/Mobile)
- **Dark Mode**: Toggle dark mode for the designer interface

### 🎨 Customization Options
- **Background**: Transparent or solid color with opacity control
- **Name Badges**: Colors and styles for normal users and members
- **Message Bubbles**: Full control over appearance, colors, and borders
- **Superchat**: Custom styling for superchat messages
- **Membership**: Special styling for member messages
- **Fonts**: 30+ Google Fonts to choose from across multiple categories
- **Animations**: Multiple animation styles (Pop In, Slide Up, Fade In, None)

## 🚀 Getting Started

### Installation

1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. Start customizing!

No build process or dependencies required - just open and use!

### Basic Usage

1. **Choose a Preset Theme**: Click any of the theme buttons (YouTube, Dark, Neon, Twitch, TikTok)
2. **Customize Settings**: Adjust colors, fonts, sizes using the control panel
3. **Preview Changes**: Add sample chat messages to see your design in action
4. **Export CSS**: Copy or download the generated CSS
5. **Apply to OBS**: Use the CSS in your streaming software

## 📖 How to Use with OBS

### Setting Up YouTube Chat Overlay in OBS

1. **Generate CSS**: Click "Copy CSS" or "Download" button
2. **Open OBS Studio**
3. **Add Browser Source**:
   - Click the `+` button in Sources
   - Select "Browser"
   - Name it "YouTube Chat"
4. **Configure Browser Source**:
   - URL: Your YouTube live chat URL (e.g., `https://www.youtube.com/live_chat?v=VIDEO_ID`)
   - Width: 500-600px
   - Height: 800-1000px  
   - Check "Shutdown source when not visible"
5. **Add Custom CSS**:
   - Paste the generated CSS into the "Custom CSS" field
   - Click OK
6. **Position**: Drag and position the chat overlay on your scene

### Tips for Best Results
- Use **Transparent background** mode for overlay
- Test with actual chat messages during a stream
- Adjust viewport size based on your stream resolution
- Save custom presets for different stream types

## 🗂️ Project Structure

```
ChatLayoutOBS/
├── index.html              # Main HTML file
├── css/
│   ├── styles.css         # Main layout & typography
│   └── components.css     # UI components & buttons
├── js/
│   ├── config.js         # Configuration & constants
│   ├── chat.js           # Chat message handling
│   ├── themes.js         # Theme management
│   ├── export.js         # CSS generation & export
│   ├── ui.js             # UI interactions
│   └── app.js            # Main app initialization
└── README.md             # This file
```

## 💻 Development

### Technology Stack
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with CSS Variables
- **Vanilla JavaScript**: No frameworks, pure performance
- **Google Fonts API**: 30+ font options
- **LocalStorage**: Save user preferences

### Key Modules

#### `config.js`
Contains all configuration constants, theme presets, font lists, and sample data.

#### `chat.js`
Manages chat messages - adding, removing, and rendering messages with XSS protection.

#### `themes.js`  
Handles theme application, settings management, and localStorage persistence.

#### `export.js`
Generates CSS code from current settings for export to OBS/streaming software.

#### `ui.js`
Controls all UI interactions, event listeners, notifications, and viewport controls.

#### `app.js`
Main application initialization and module coordination.

### Browser Compatibility
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ⚠️ IE11 (not supported)

## 🎯 Advanced Features

### Custom Presets
1. Customize your overlay design
2. Enter a preset name
3. Click "Save"
4. Access saved presets anytime from the Custom Presets section

### Viewport Modes
- **Desktop**: Full-width preview (default)
- **Tablet**: 768px width
- **Mobile**: 375px width

### Dark Mode
Toggle dark mode for the designer interface itself (not the chat overlay) using the moon/sun icon in the header.

### Console API
For advanced users, access the designer via browser console:

```javascript
// Access the main API
ChatOverlayDesigner

// Generate CSS
ChatOverlayDesigner.generateCSS()

// Add chat messages
ChatOverlayDesigner.addChat('normal')
ChatOverlayDesigner.addChat('member')
ChatOverlayDesigner.addChat('superchat')

// Apply themes
ChatOverlayDesigner.applyTheme('twitch')

// Export/Import settings
const settings = ChatOverlayDesigner.exportSettings()
ChatOverlayDesigner.importSettings(settings)

// Reset to default
ChatOverlayDesigner.reset()
```

## 🐛 Troubleshooting

### Chat not showing in OBS
- Verify the YouTube chat URL is correct
- Check that Custom CSS is properly pasted
- Ensure browser source dimensions are appropriate

### Fonts not loading
- Check internet connection (Google Fonts requires online access)
- Try a different font family
- Clear browser cache

### Settings not saving
- Check browser localStorage is enabled
- Ensure browser is not in private/incognito mode
- Try exporting settings as JSON backup

## 📝 Changelog

### Version 2.0
- ✨ Complete refactor with modular architecture
- 🎨 Improved UI/UX with better organization
- 💾 Custom preset save/load functionality
- 📱 Viewport size controls
- 🌙 Dark mode for designer interface
- 🔔 Toast notifications
- 📦 Separated code into multiple files
- 🚀 Performance improvements
- 💡 Console debugging API

### Version 1.0
- Initial release
- Basic customization features
- Theme presets
- CSS export

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Google Fonts for the extensive font library
- YouTube for the chat overlay system
- OBS Studio for streaming software integration

## 📧 Support

For issues, questions, or feature requests, please open an issue on the repository.

---

Made with ❤️ for streamers everywhere
