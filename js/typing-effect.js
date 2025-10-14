// Typing Effect for Separate Cursor Element
class TypingEffect {
    constructor() {
        this.typingElement = null;
        this.cursorElement = null;
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
        console.log('⌨️ TypingEffect initialized');
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
    }

    start() {
        this.typingElement = document.getElementById('typing-text');
        this.cursorElement = document.querySelector('.typing-cursor');
        
        if (!this.typingElement) {
            console.error('❌ Typing element (#typing-text) not found');
            return;
        }

        if (!this.cursorElement) {
            console.error('❌ Cursor element (.typing-cursor) not found');
        }

        // Clear existing content
        this.typingElement.innerHTML = '';
        
        // Show cursor
        if (this.cursorElement) {
            this.cursorElement.style.display = 'inline-block';
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

        if (!this.isDeleting) {
            // Typing forward
            if (this.charIndex < currentText.length) {
                this.charIndex++;
                setTimeout(() => this.type(), 100);
            } else {
                // Finished typing, wait then start deleting
                this.isDeleting = true;
                setTimeout(() => this.type(), 2000);
            }
        } else {
            // Deleting backward
            if (this.charIndex > 0) {
                this.charIndex--;
                setTimeout(() => this.type(), 50);
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
        // Hide cursor when stopped
        if (this.cursorElement) {
            this.cursorElement.style.display = 'none';
        }
    }
}

// Add CSS for typing effect container
function addTypingStyles() {
    if (document.getElementById('typing-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'typing-styles';
    style.textContent = `
        .typing-container {
            text-align: center;
            margin: 20px auto;
            display: block;
            min-height: 60px;
        }
        
        .typing-text {
            display: inline;
            font-size: 2em;
            font-weight: bold;
            white-space: nowrap;
        }
        
        .typing-cursor {
            display: inline-block;
            width: 2px;
            height: 2em;
            background-color: #333;
            margin-left: 2px;
            animation: blink 1s infinite;
            vertical-align: middle;
        }
        
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', function() {
    addTypingStyles();
    
    // Ensure the cursor is initially hidden
    const cursorElement = document.querySelector('.typing-cursor');
    if (cursorElement) {
        cursorElement.style.display = 'none';
    }
    
    setTimeout(() => {
        new TypingEffect();
    }, 500);
});