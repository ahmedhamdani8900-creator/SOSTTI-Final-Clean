// Enhanced Typing Effect with Fixed Erasing
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
        const checkLoader = setInterval(() => {
            const loader = document.getElementById('loader');
            
            if (!loader || loader.classList.contains('hidden')) {
                clearInterval(checkLoader);
                setTimeout(() => this.start(), 300);
            }
        }, 100);

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
        
        // Update text content
        this.typingElement.textContent = currentText.substring(0, this.charIndex);
        this.typingElement.classList.add('typing-cursor');

        if (!this.isDeleting) {
            // Typing forward
            if (this.charIndex < currentText.length) {
                this.charIndex++;
                setTimeout(() => this.type(), 100);
            } else {
                // Finished typing current text, wait then start deleting
                this.isDeleting = true;
                setTimeout(() => this.type(), 2000); // Pause at full text
            }
        } else {
            // Deleting backward
            if (this.charIndex > 0) {
                this.charIndex--;
                setTimeout(() => this.type(), 50); // Faster deletion
            } else {
                // Finished deleting, move to next text
                this.isDeleting = false;
                this.textIndex = (this.textIndex + 1) % this.texts.length;
                setTimeout(() => this.type(), 500); // Pause before next text
            }
        }
    }

    // Alternative simpler version - uncomment if above still has issues
    typeSimple() {
        if (!this.isRunning) return;

        const currentText = this.texts[this.textIndex];
        
        // Always show current state
        this.typingElement.textContent = currentText.substring(0, this.charIndex);
        this.typingElement.classList.add('typing-cursor');

        if (this.isDeleting) {
            // Deleting mode
            if (this.charIndex > 0) {
                this.charIndex--;
                setTimeout(() => this.typeSimple(), 80);
            } else {
                // Switch to typing next text
                this.isDeleting = false;
                this.textIndex = (this.textIndex + 1) % this.texts.length;
                setTimeout(() => this.typeSimple(), 600);
            }
        } else {
            // Typing mode
            if (this.charIndex < currentText.length) {
                this.charIndex++;
                setTimeout(() => this.typeSimple(), 100);
            } else {
                // Switch to deleting after pause
                this.isDeleting = true;
                setTimeout(() => this.typeSimple(), 2000);
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
        setTimeout(() => {
            this.isRunning = true;
            this.type(); // Change to typeSimple() if needed
        }, 1000);
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
            padding-right: 2px;
        }
        
        @keyframes blink {
            0%, 100% { border-color: #333; }
            50% { border-color: transparent; }
        }
        
        #typing-text {
            min-height: 60px;
            display: inline-block;
            font-family: monospace;
            white-space: nowrap;
        }
    `;
    document.head.appendChild(style);
}

// Debug version with console logging
class DebugTypingEffect extends TypingEffect {
    type() {
        if (!this.isRunning) return;

        const currentText = this.texts[this.textIndex];
        
        console.log(`📝 Typing: "${currentText.substring(0, this.charIndex)}" | Deleting: ${this.isDeleting} | Char: ${this.charIndex}/${currentText.length}`);
        
        this.typingElement.textContent = currentText.substring(0, this.charIndex);
        this.typingElement.classList.add('typing-cursor');

        if (!this.isDeleting) {
            if (this.charIndex < currentText.length) {
                this.charIndex++;
                setTimeout(() => this.type(), 100);
            } else {
                this.isDeleting = true;
                console.log('⏸️ Finished typing, waiting to delete...');
                setTimeout(() => this.type(), 2000);
            }
        } else {
            if (this.charIndex > 0) {
                this.charIndex--;
                setTimeout(() => this.type(), 50);
            } else {
                this.isDeleting = false;
                this.textIndex = (this.textIndex + 1) % this.texts.length;
                console.log('🔄 Moving to next text...');
                setTimeout(() => this.type(), 500);
            }
        }
    }
}

// Initialize
function initializeTypingEffect() {
    addTypingStyles();
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => new TypingEffect(), 100);
        });
    } else {
        setTimeout(() => new TypingEffect(), 100);
    }
}

// Use debug version during development - switch to TypingEffect when working
initializeTypingEffect();

// Make available globally
window.TypingEffect = TypingEffect;
window.DebugTypingEffect = DebugTypingEffect;