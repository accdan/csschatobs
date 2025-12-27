/**
 * CSS Exporter - Generates and exports CSS for OBS overlay
 */
class CSSExporter {
    constructor(themeManager) {
        this.themeManager = themeManager;
    }

    /**
     * Generate complete CSS for YouTube chat overlay
     * @returns {string} Complete CSS code
     */
    generateCSS() {
        const s = this.themeManager.getCurrentSettings();
        const bgSetting = s.bgMode === 'transparent'
            ? 'rgba(0, 0, 0, 0)'
            : this.themeManager.hexToRgba(s.bgColor, s.bgOpacity / 100);

        const timestamp = new Date().toLocaleString();

        return `/* ---------------------------------------------------- 
   YouTube Chat Overlay - Custom CSS
   Generated: ${timestamp}
   Created with Chat Overlay Designer
---------------------------------------------------- */

@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Sans:wght@400;500;700&display=swap");

:root {
  --listener-name: ${s.nameColor};
  --listener-name-bg: ${s.listenerNameBg};
  --member-name: ${s.nameColor};
  --member-name-bg: ${s.memberNameBg};
  --listener-comment: ${s.textColor};
  --listener-comment-bg: ${s.normalMsgBg};
  --listener-comment-border: ${s.normalMsgBorder};
  --member-comment: ${s.textColor};
  --member-comment-bg: ${s.memberMsgBg};
  --member-comment-border: ${s.memberMsgBorder};
  --superchat-name: ${s.superchatTextColor};
  --superchat-name-bg: ${s.superchatHeaderBg};
  --superchat-comment: ${s.superchatTextColor};
  --superchat-comment-bg: ${s.superchatBodyBg};
  --membership-name: ${s.membershipTextColor};
  --membership-name-bg: ${s.membershipBg};
  --membership-comment: ${s.membershipTextColor};
  --membership-comment-bg: ${s.membershipBg};
  --bg-overlay: ${bgSetting};
}

/* ---------------------------------------------------- 
   Global Styles
---------------------------------------------------- */
ytd-sponsorships-live-chat-header-renderer *,
yt-live-chat-paid-sticker-renderer *,
yt-live-chat-membership-item-renderer *,
yt-live-chat-paid-message-renderer *,
yt-live-chat-text-message-renderer * {
  font-family: ${s.font};
  font-size: ${s.textSize}px !important;
  font-style: normal !important;
  font-weight: 700 !important;
  line-height: 1.5 !important;
  letter-spacing: 0.5px !important;
}

ytd-sponsorships-live-chat-header-renderer #message,
yt-live-chat-paid-sticker-renderer #message,
yt-live-chat-membership-item-renderer #message,
yt-live-chat-membership-item-renderer #header-subtext,
ytd-sponsorships-live-chat-header-renderer #primary-text,
yt-live-chat-paid-message-renderer #message,
yt-live-chat-text-message-renderer #message {
  font-weight: 500 !important;
}

ytd-sponsorships-live-chat-header-renderer,
yt-live-chat-paid-sticker-renderer,
yt-live-chat-membership-item-renderer,
yt-live-chat-paid-message-renderer,
yt-live-chat-text-message-renderer {
  animation: ${s.anim};
}

@keyframes popInLeft {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
}

@keyframes float {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

ytd-sponsorships-live-chat-gift-purchase-announcement-renderer,
yt-live-chat-membership-item-renderer,
yt-live-chat-paid-sticker-renderer,
yt-live-chat-paid-message-renderer,
yt-live-chat-text-message-renderer {
  padding-left: 16px !important;
  padding-right: 16px !important;
}

/* ---------------------------------------------------- 
   Text Messages
---------------------------------------------------- */
yt-live-chat-text-message-renderer {
  flex-direction: row !important;
  grid-gap: 8px;
  background-color: transparent !important;
}

#content.yt-live-chat-text-message-renderer {
  position: relative;
  overflow: visible !important;
  display: block;
}

/* Channel name badge */
yt-live-chat-author-chip.yt-live-chat-text-message-renderer {
  justify-content: start !important;
  width: 100%;
  margin: auto;
}

yt-live-chat-text-message-renderer[author-type="owner"] #author-name,
yt-live-chat-text-message-renderer[author-type="moderator"] #author-name,
yt-live-chat-text-message-renderer[author-type="member"] #author-name,
yt-live-chat-text-message-renderer #author-name {
  display: block;
  width: fit-content;
  padding: 4px 12px !important;
  border-radius: ${s.nameBadgeRad}px !important;
  background-color: var(--listener-name-bg) !important;
  color: var(--listener-name) !important;
  font-size: ${s.nameSize}px !important;
  margin-bottom: 8px;
}

yt-live-chat-text-message-renderer[author-type="member"] #author-name {
  background-color: var(--member-name-bg) !important;
  color: var(--member-name) !important;
}

/* Hide avatar */
yt-img-shadow#author-photo.yt-live-chat-text-message-renderer {
  margin-right: 0px;
  display: none;
}

#chat-badges.yt-live-chat-author-chip {
  display: block;
}

/* ---------------------------------------------------- 
   Message Bubble
---------------------------------------------------- */
#message.yt-live-chat-text-message-renderer {
  background-color: var(--listener-comment-bg) !important;
  color: var(--listener-comment) !important;
  border-radius: ${s.msgRad}px;
  border: 3px solid var(--listener-comment-border);
  display: block !important;
  padding: ${s.msgPad}px 20px;
  width: fit-content !important;
  position: relative;
  overflow: visible;
  margin-right: auto;
}

#message.yt-live-chat-text-message-renderer::before {
  content: "";
  position: absolute;
  top: 4px;
  left: -3px;
  right: auto;
  width: 21px;
  height: 21px;
  transform: rotate(-20deg) skew(20deg, 20deg);
  background-color: var(--listener-comment-border);
  border-top-left-radius: 7px;
  border-bottom-right-radius: 6px;
  z-index: -1;
}

#message.yt-live-chat-text-message-renderer::after {
  content: "";
  position: absolute;
  top: 7px;
  left: 1px;
  right: auto;
  width: 18px;
  height: 18px;
  transform: rotate(-20deg) skew(20deg, 20deg);
  background-color: var(--listener-comment-bg);
  border-top-left-radius: 4px;
  border-bottom-right-radius: 20px;
  z-index: 0;
}

yt-live-chat-text-message-renderer[author-type="member"] #message.yt-live-chat-text-message-renderer {
  background-color: var(--member-comment-bg) !important;
  color: var(--member-comment) !important;
  border: 3px solid var(--member-comment-border);
  margin-right: auto;
}

yt-live-chat-text-message-renderer[author-type="member"] #message.yt-live-chat-text-message-renderer::before {
  background-color: var(--member-comment-border);
}

yt-live-chat-text-message-renderer[author-type="member"] #message.yt-live-chat-text-message-renderer::after {
  background-color: var(--member-comment-bg);
}

/* ---------------------------------------------------- 
   Superchat
---------------------------------------------------- */
yt-live-chat-paid-message-renderer #card.yt-live-chat-paid-message-renderer {
  background-color: var(--superchat-comment-bg);
  border-radius: 13px;
  position: relative;
  width: 100%;
}

yt-live-chat-paid-message-renderer #header.yt-live-chat-paid-message-renderer {
  background-color: var(--superchat-name-bg);
  color: var(--superchat-name);
  padding: 12px 20px;
  border-radius: 10px 10px 0px 0px;
  position: relative;
}

yt-live-chat-author-chip[disable-highlighting] #author-name.yt-live-chat-author-chip {
  color: var(--superchat-name);
}

yt-live-chat-paid-message-renderer[show-only-header] #header.yt-live-chat-paid-message-renderer {
  border-radius: 10px;
}

yt-live-chat-paid-message-renderer[show-only-header] #content.yt-live-chat-paid-message-renderer {
  padding: 0;
}

yt-live-chat-paid-message-renderer #single-line.yt-live-chat-paid-message-renderer span#chat-badges {
  display: flex;
  align-items: center;
}

yt-live-chat-paid-message-renderer #single-line.yt-live-chat-paid-message-renderer {
  display: flex;
  justify-content: space-between;
}

yt-live-chat-paid-message-renderer #header-content-primary-column.yt-live-chat-paid-message-renderer {
  padding-right: 0px !important;
}

#purchase-amount-column.yt-live-chat-paid-message-renderer {
  text-wrap: nowrap;
}

yt-live-chat-paid-message-renderer #content.yt-live-chat-paid-message-renderer {
  background-color: var(--superchat-comment-bg);
  color: var(--superchat-comment);
  border-radius: 0px 0px 10px 10px;
  padding: 12px 20px;
}

#creator-heart-button.yt-live-chat-paid-message-renderer,
#gradient-container.yt-live-chat-paid-message-renderer,
#action-buttons.yt-live-chat-paid-message-renderer {
  display: none !important;
}

yt-live-chat-paid-message-renderer[has-heart-button] #menu.yt-live-chat-paid-message-renderer {
  display: none !important;
}

/* ---------------------------------------------------- 
   Membership
---------------------------------------------------- */
yt-live-chat-membership-item-renderer[show-only-header] #header.yt-live-chat-membership-item-renderer {
  background-color: var(--membership-name-bg) !important;
  color: var(--membership-name);
  padding: 0px;
  border-radius: 10px;
}

yt-live-chat-membership-item-renderer[show-only-header] div#header-content-inner-column {
  padding: 12px 20px;
}

yt-live-chat-membership-item-renderer[show-only-header] #header-subtext.yt-live-chat-membership-item-renderer {
  background-color: var(--membership-name-bg);
  color: var(--membership-name);
  padding: 0px 20px 12px;
  border-radius: 0px 0px 10px 10px;
  margin: 0;
}

#header.yt-live-chat-membership-item-renderer {
  background-color: var(--membership-comment-bg);
  color: var(--membership-comment);
  padding: 0px;
  border-radius: 10px 10px 0px 0px;
}

#content.yt-live-chat-membership-item-renderer {
  background-color: var(--membership-comment-bg);
  color: var(--membership-comment);
  padding: 12px 20px;
  border-radius: 0px 0px 10px 10px;
}

/* ---------------------------------------------------- 
   Hide Elements
---------------------------------------------------- */
#author-photo.yt-live-chat-text-message-renderer,
#author-photo.yt-live-chat-paid-message-renderer,
#author-photo.yt-live-chat-membership-item-renderer,
#timestamp,
yt-live-chat-author-badge-renderer[type=moderator],
yt-live-chat-author-badge-renderer[type=verified] {
  display: none !important;
}

yt-live-chat-text-message-renderer,
yt-live-chat-text-message-renderer[is-highlighted],
yt-live-chat-text-message-renderer[author-type="owner"],
yt-live-chat-text-message-renderer[author-type="owner"][is-highlighted],
yt-live-chat-text-message-renderer[author-type="moderator"],
yt-live-chat-text-message-renderer[author-type="moderator"][is-highlighted],
yt-live-chat-text-message-renderer[author-type="member"],
yt-live-chat-text-message-renderer[author-type="member"][is-highlighted] {
  background-color: transparent !important;
}

div#action-panel.style-scope.yt-live-chat-renderer,
yt-live-chat-ticker-renderer,
yt-live-chat-mode-change-message-renderer,
yt-live-chat-viewer-engagement-message-renderer,
yt-live-chat-server-error-message,
yt-live-chat-banner-manager,
yt-live-chat-restricted-participation-renderer,
#panel-pages,
yt-live-chat-message-input-renderer,
yt-live-chat-header-renderer {
  display: none !important;
}

yt-live-chat-text-message-renderer[is-deleted],
yt-live-chat-membership-item-renderer[is-deleted],
yt-live-chat-moderation-message-renderer,
yt-live-chat-auto-mod-message-renderer {
  display: none !important;
}

body {
  overflow: hidden;
  background-color: var(--bg-overlay);
}`;
    }

    /**
     * Copy CSS to clipboard
     * @returns {Promise<boolean>} Success status
     */
    async copyToClipboard() {
        try {
            const css = this.generateCSS();
            await navigator.clipboard.writeText(css);
            return true;
        } catch (e) {
            console.error('Failed to copy to clipboard:', e);
            return false;
        }
    }

    /**
     * Download CSS as file
     * @param {string} filename - File name (default: youtube-chat-overlay.css)
     */
    downloadFile(filename = 'youtube-chat-overlay.css') {
        const css = this.generateCSS();
        const blob = new Blob([css], { type: 'text/css' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
    }

    /**
     * Get CSS as data URL for preview
     * @returns {string} Data URL
     */
    getDataURL() {
        const css = this.generateCSS();
        const blob = new Blob([css], { type: 'text/css' });
        return URL.createObjectURL(blob);
    }
}

// Create global instance (will be initialized in app.js)
let cssExporter;
