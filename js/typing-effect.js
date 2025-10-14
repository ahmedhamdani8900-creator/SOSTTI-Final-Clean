// Enhanced Typing Effect with Loader Support
class TypingEffect {
    constructor() {
        this.typingElement = null;
        this.texts = [
            "NAVTTC Accredited Institute",
            "Empowering Youth Through Technical, Computer and English Skills",
            "Building the Next Generation of Technical and IT Experts", 
            "Hands-On Practical Learning",
            "Industry-Ready Skills Training",
            "Your Pathway to a Bright Future"
        ];
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isRunning = false;
        this.init();
    }

    init() {
        console.log('⌨️ TypingEffect initialized - waiting for loader...');
        this.waitForLoader();
    }

    waitForLoader() {
        // Check if loader exists and wait for it to hide
        const checkLoader = setInterval(() => {
            const loader = document.getElementById('loader');
            
            if (!loader) {
                // No loader found, start typing immediately
                clearInterval(checkLoader);
                this.start();
                return;
            }

            if (loader.classList.contains('hidden')) {
                // Loader is hidden, start typing
                clearInterval(checkLoader);
                setTimeout(() => this.start(), 300);
            }
        }, 100);

        // Safety timeout - start anyway after 5 seconds
        setTimeout(() => {
            if (!this.isRunning) {
                console.log('⏰ Safety timeout - starting typing effect');
                this.start();
            }
        }, 5000);
    }

    start() {
        this.typingElement = document.getElementById('typing-text');
        
        if (!this.typingElement) {
            console.error('❌ Typing element (#typing-text) not found');
            return;
        }

        console.log('🎬 Starting typing effect');
        this.isRunning = true;
        this.type();
    }

    type() {
        if (!this.isRunning) return;

        const currentText = this.texts[this.textIndex];
        
        // Update text content with typing animation
        this.typingElement.textContent = currentText.substring(0, this.charIndex);
        
        // Add blinking cursor
        this.typingElement.classList.add('typing-cursor');

        if (!this.isDeleting && this.charIndex < currentText.length) {
            // Typing forward
            this.charIndex++;
            setTimeout(() => this.type(), 100);
        } else if (this.isDeleting && this.charIndex > 0) {
            // Deleting backward
            this.charIndex--;
            setTimeout(() => this.type(), 50);
        } else {
            // Switch between typing and deleting
            if (!this.isDeleting) {
                // Finished typing, pause before deleting
                this.isDeleting = true;
                setTimeout(() => this.type(), 2000);
            } else {
                // Finished deleting, move to next text
                this.isDeleting = false;
                this.textIndex = (this.textIndex + 1) % this.texts.length;
                setTimeout(() => this.type(), 500);
            }
        }
    }

    stop() {
        this.isRunning = false;
        if (this.typingElement) {
            this.typingElement.classList.remove('typing-cursor');
        }
    }

    restart() {
        this.stop();
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        setTimeout(() => this.start(), 1000);
    }
}

// Add CSS for blinking cursor
function addTypingStyles() {
    if (document.getElementById('typing-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'typing-styles';
    style.textContent = `
        .typing-cursor {
            border-right: 2px solid #333;
            animation: blink 1s infinite;
        }
        
        @keyframes blink {
            0%, 100% { border-color: #333; }
            50% { border-color: transparent; }
        }
        
        #typing-text {
            min-height: 60px;
            display: inline-block;
            padding-right: 3px;
        }
    `;
    document.head.appendChild(style);
}

// Initialize when safe
function initializeTypingEffect() {
    // Add typing styles
    addTypingStyles();
    
    // Wait a bit for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => new TypingEffect(), 100);
        });
    } else {
        setTimeout(() => new TypingEffect(), 100);
    }
}

// Start the typing effect
initializeTypingEffect();

// Make it globally available for manual control
window.TypingEffect = TypingEffect;