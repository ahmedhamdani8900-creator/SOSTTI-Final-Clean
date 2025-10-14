// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing mobile menu');
    
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    const nestedDropdowns = document.querySelectorAll('.nested-dropdown');
    
    // Mobile menu toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
            
            // Toggle hamburger icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Mobile dropdown functionality
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector(':scope a');
        
        if (dropdownLink) {
            dropdownLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other dropdowns
                    dropdowns.forEach(other => {
                        if (other !== dropdown) other.classList.remove('active');
                    });
                    
                    // Close nested dropdowns
                    nestedDropdowns.forEach(nested => {
                        nested.classList.remove('active');
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
    
    // Mobile nested dropdown functionality
    nestedDropdowns.forEach(nestedDropdown => {
        const nestedLink = nestedDropdown.querySelector(':scope a');
        
        if (nestedLink) {
            nestedLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other nested dropdowns
                    nestedDropdowns.forEach(other => {
                        if (other !== nestedDropdown) other.classList.remove('active');
                    });
                    
                    // Toggle current nested dropdown
                    nestedDropdown.classList.toggle('active');
                }
            });
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && !e.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            nestedDropdowns.forEach(nested => nested.classList.remove('active'));
            
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                if (icon.classList.contains('fa-times')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            nestedDropdowns.forEach(nested => nested.classList.remove('active'));
            
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                if (icon.classList.contains('fa-times')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });

    // Initialize floating buttons and chatbot
    initializeFloatingButtons();
    initializeChatBot();
});

// Initialize Back to Top and WhatsApp buttons
function initializeFloatingButtons() {
    // Create and add Back to Top button
    const backToTopHTML = `
        <button id="backToTop" class="back-to-top" aria-label="Back to Top">
            <i class="fas fa-chevron-up"></i>
        </button>
    `;
    
    // Create and add WhatsApp button
    const whatsappButtonHTML = `
        <a href="https://wa.me/923332247494?text=Hello%20SOSTTI%2C%20I%20would%20like%20to%20get%20more%20information%20about%20your%20courses" 
           target="_blank" 
           id="whatsappButton" 
           class="whatsapp-button" 
           aria-label="Contact us on WhatsApp">
            <i class="fab fa-whatsapp"></i>
        </a>
    `;
    
    // Add buttons to page
    document.body.insertAdjacentHTML('beforeend', backToTopHTML);
    document.body.insertAdjacentHTML('beforeend', whatsappButtonHTML);
    
    // Back to Top functionality
    const backToTopBtn = document.getElementById('backToTop');
    
    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
    
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    window.addEventListener('scroll', toggleBackToTop);
    backToTopBtn.addEventListener('click', scrollToTop);
    
    // Initial check
    toggleBackToTop();
}

// Initialize Chat Bot
function initializeChatBot() {
    // Add CSS styles for all components
    const allStyles = `
    <style>
    /* ===================== */
    /* FLOATING BUTTONS STYLES */
    /* ===================== */

    /* Back to Top Button - TOP POSITION */
    .back-to-top {
        position: fixed;
        bottom: 160px; /* ABOVE WhatsApp button */
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, rgba(0, 174, 255, 0.9), rgba(1, 99, 144, 0.9));
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        z-index: 9990;
        display: none;
        align-items: center;
        justify-content: center;
    }

    .back-to-top.show {
        display: flex;
        animation: fadeInUp 0.3s ease;
    }

    .back-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        background: linear-gradient(135deg, rgba(1, 99, 144, 0.9), rgba(0, 174, 255, 0.9));
    }

    /* WhatsApp Button - MIDDLE POSITION */
    .whatsapp-button {
        position: fixed;
        bottom: 90px; /* BELOW Back to Top button */
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #25D366, #128C7E);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        font-size: 24px;
        box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
        transition: all 0.3s ease;
        z-index: 9990;
        animation: pulseWhatsApp 2s infinite;
    }

    .whatsapp-button:hover {
        transform: translateY(-3px) scale(1.1);
        box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
        background: linear-gradient(135deg, #128C7E, #25D366);
    }

    @keyframes pulseWhatsApp {
        0% { 
            box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3); 
        }
        50% { 
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.6); 
        }
        100% { 
            box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3); 
        }
    }

    /* Chat Bot Styles - BOTTOM POSITION */
    #sostti-chatbot {
        position: fixed;
        bottom: 20px; /* BOTTOM position */
        right: 20px;
        z-index: 9990;
        font-family: 'Poppins', sans-serif;
    }

    /* Chat Bot Toggle Button */
    .chatbot-toggle {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, rgba(0, 174, 255, 0.9), rgba(1, 99, 144, 0.9));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        animation: pulse 2s infinite;
        position: relative;
    }

    .chatbot-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }

    .notification-dot {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 12px;
        height: 12px;
        background: #ff4757;
        border-radius: 50%;
        border: 2px solid white;
        display: none;
    }

    .notification-dot.active {
        display: block;
        animation: bounce 1s infinite;
    }

    @keyframes pulse {
        0% { box-shadow: 0 4px 15px rgba(0, 174, 255, 0.4); }
        50% { box-shadow: 0 4px 20px rgba(0, 174, 255, 0.8); }
        100% { box-shadow: 0 4px 15px rgba(0, 174, 255, 0.4); }
    }

    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }

    /* Chat Container */
    .chatbot-container {
        position: absolute;
        bottom: 70px;
        right: 0;
        width: 350px;
        height: 500px;
        background: white;
        border-radius: 15px;
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
        display: none;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid #e0e0e0;
    }

    .chatbot-container.active {
        display: flex;
        animation: slideUp 0.3s ease;
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Chat Header */
    .chatbot-header {
        background: linear-gradient(135deg, rgba(0, 174, 255, 0.9), rgba(1, 99, 144, 0.9));
        color: white;
        padding: 15px;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .chatbot-avatar {
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    }

    .chatbot-info {
        flex: 1;
    }

    .chatbot-info h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
    }

    .status {
        font-size: 12px;
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .status.online::before {
        content: '';
        width: 8px;
        height: 8px;
        background: #4ade80;
        border-radius: 50%;
        display: inline-block;
    }

    .chatbot-clear, .chatbot-close {
        background: none;
        border: none;
        color: white;
        font-size: 16px;
        cursor: pointer;
        padding: 5px;
        border-radius: 4px;
        transition: background 0.3s;
    }

    .chatbot-clear:hover, .chatbot-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    /* Chat Messages */
    .chatbot-messages {
        flex: 1;
        padding: 15px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 15px;
        background: #f8fafc;
    }

    .message {
        max-width: 80%;
        padding: 10px 15px;
        border-radius: 18px;
        font-size: 14px;
        line-height: 1.4;
        position: relative;
    }

    .bot-message {
        align-self: flex-start;
        background: white;
        color: #333;
        border: 1px solid #e2e8f0;
        border-bottom-left-radius: 5px;
    }

    .user-message {
        align-self: flex-end;
        background: linear-gradient(135deg, rgba(0, 174, 255, 0.9), rgba(1, 99, 144, 0.9));
        color: white;
        border-bottom-right-radius: 5px;
    }

    .timestamp {
        font-size: 10px;
        opacity: 0.7;
        margin-top: 5px;
        display: block;
    }

    /* Typing Indicator */
    .typing-indicator {
        align-self: flex-start;
        background: white;
        color: #888;
        padding: 12px 15px;
        border-radius: 18px;
        border-bottom-left-radius: 5px;
        display: none;
        border: 1px solid #e2e8f0;
        font-size: 14px;
    }

    .typing-indicator.active {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .typing-dots {
        display: flex;
        gap: 3px;
    }

    .typing-dot {
        width: 6px;
        height: 6px;
        background-color: #888;
        border-radius: 50%;
        animation: typingBounce 1.4s infinite ease-in-out;
    }

    .typing-dot:nth-child(1) {
        animation-delay: -0.32s;
    }

    .typing-dot:nth-child(2) {
        animation-delay: -0.16s;
    }

    .typing-dot:nth-child(3) {
        animation-delay: 0s;
    }

    @keyframes typingBounce {
        0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
        }
        40% {
            transform: scale(1);
            opacity: 1;
        }
    }

    /* Suggestions */
    .chatbot-suggestions {
        padding: 10px 15px;
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        background: white;
        border-top: 1px solid #e2e8f0;
    }

    .suggestion-btn {
        background: #f1f5f9;
        border: 1px solid #e2e8f0;
        border-radius: 15px;
        padding: 6px 12px;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.3s;
        color: rgba(1, 99, 144, 0.9);
        white-space: nowrap;
    }

    .suggestion-btn:hover {
        background: rgba(0, 174, 255, 0.1);
        border-color: rgba(0, 174, 255, 0.3);
    }

    /* Input Area */
    .chatbot-input {
        padding: 15px;
        border-top: 1px solid #e2e8f0;
        background: white;
        display: flex;
        gap: 10px;
    }

    #chatbotInput {
        flex: 1;
        padding: 10px 15px;
        border: 1px solid #e2e8f0;
        border-radius: 25px;
        outline: none;
        font-size: 14px;
        transition: border-color 0.3s;
    }

    #chatbotInput:focus {
        border-color: rgba(0, 174, 255, 0.9);
    }

    #chatbotSend {
        background: linear-gradient(135deg, rgba(0, 174, 255, 0.9), rgba(1, 99, 144, 0.9));
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform 0.2s;
    }

    #chatbotSend:hover {
        transform: scale(1.05);
    }

    /* Mobile Responsive for Floating Buttons */
    @media (max-width: 768px) {
        .back-to-top {
            bottom: 145px; /* Adjusted for mobile */
            right: 15px;
            width: 45px;
            height: 45px;
            font-size: 16px;
        }
        
        .whatsapp-button {
            bottom: 85px; /* Adjusted for mobile */
            right: 15px;
            width: 45px;
            height: 45px;
            font-size: 22px;
        }
        
        #sostti-chatbot {
            bottom: 15px;
            right: 15px;
        }
        
        .chatbot-container {
            width: calc(100vw - 40px);
            height: 70vh;
            right: 0;
            bottom: 60px;
        }
        
        .chatbot-toggle {
            width: 50px;
            height: 50px;
            font-size: 20px;
        }
        
        .suggestion-btn {
            font-size: 11px;
            padding: 5px 10px;
        }
    }

    @media (max-width: 480px) {
        .back-to-top {
            bottom: 135px; /* Adjusted for small mobile */
        }
        
        .whatsapp-button {
            bottom: 75px; /* Adjusted for small mobile */
        }
        
        #sostti-chatbot {
            bottom: 10px;
            right: 10px;
        }
        
        .chatbot-container {
            width: calc(100vw - 20px);
            height: 65vh;
        }
    }

    /* Scrollbar Styling */
    .chatbot-messages::-webkit-scrollbar {
        width: 4px;
    }

    .chatbot-messages::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    .chatbot-messages::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 2px;
    }

    .chatbot-messages::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    </style>
    `;
    
    // Add all styles to document
    document.head.insertAdjacentHTML('beforeend', allStyles);
    
    // Initialize chat bot
    new SOSTTIChatBot();
}

// Chat Bot Class
class SOSTTIChatBot {
    constructor() {
        this.isOpen = false;
        this.hasInteracted = false;
        this.isTyping = false;
        this.init();
    }

    init() {
        // Only create chat bot if it doesn't exist
        if (!document.getElementById('sostti-chatbot')) {
            this.createChatBot();
        }
        
        this.elements = {
            toggle: document.getElementById('chatbotToggle'),
            container: document.getElementById('chatbotContainer'),
            close: document.getElementById('chatbotClose'),
            clear: document.getElementById('chatbotClear'),
            messages: document.getElementById('chatbotMessages'),
            input: document.getElementById('chatbotInput'),
            send: document.getElementById('chatbotSend'),
            notification: document.querySelector('.notification-dot')
        };
        
        this.bindEvents();
        this.autoOpen();
        this.loadConversation();
    }
    
    createChatBot() {
        const chatBotHTML = `
        <div id="sostti-chatbot">
            <!-- Chat Bot Toggle Button -->
            <div class="chatbot-toggle" id="chatbotToggle">
                <i class="fas fa-comments"></i>
                <span class="notification-dot"></span>
            </div>
          
            <!-- Chat Bot Container -->
            <div class="chatbot-container" id="chatbotContainer">
                <div class="chatbot-header">
                    <div class="chatbot-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="chatbot-info">
                        <h3>SOSTTI Assistant</h3>
                        <span class="status online">Online</span>
                    </div>
                    <button class="chatbot-clear" id="chatbotClear" title="Clear chat">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="chatbot-close" id="chatbotClose" title="Close chat">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="chatbot-messages" id="chatbotMessages">
                    <div class="message bot-message">
                        <div>Hello! I'm your SOSTTI assistant. How can I help you today?</div>
                        <span class="timestamp">Just now</span>
                    </div>
                </div>
                
                <div class="chatbot-suggestions">
                    <button class="suggestion-btn" data-question="What courses do you offer?">Courses</button>
                    <button class="suggestion-btn" data-question="How can I apply?">Admissions</button>
                    <button class="suggestion-btn" data-question="How to contact?">Contact</button>
                    <button class="suggestion-btn" data-question="I want to Complain">Complain</button>
                </div>
                
                <div class="chatbot-input">
                    <input type="text" id="chatbotInput" placeholder="Type your message...">
                    <button id="chatbotSend">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatBotHTML);
        
        // Update elements after creating the chatbot
        this.elements = {
            toggle: document.getElementById('chatbotToggle'),
            container: document.getElementById('chatbotContainer'),
            close: document.getElementById('chatbotClose'),
            clear: document.getElementById('chatbotClear'),
            messages: document.getElementById('chatbotMessages'),
            input: document.getElementById('chatbotInput'),
            send: document.getElementById('chatbotSend'),
            notification: document.querySelector('.notification-dot')
        };
    }
    
    bindEvents() {
        // Toggle chat bot
        this.elements.toggle.addEventListener('click', () => this.toggle());
        
        // Close chat bot
        this.elements.close.addEventListener('click', () => this.close());
        
        // Send message
        this.elements.send.addEventListener('click', () => this.sendMessage());
        this.elements.clear.addEventListener('click', () => this.clearChat());
        this.elements.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        // Suggestion buttons
        document.querySelectorAll('.suggestion-btn').forEach(button => {
            button.addEventListener('click', () => {
                const question = button.getAttribute('data-question');
                this.elements.input.value = question;
                this.sendMessage();
            });
        });
        
        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.elements.container.contains(e.target) && 
                !this.elements.toggle.contains(e.target) && 
                this.isOpen) {
                this.close();
            }
        });
    }
    
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    open() {
        this.elements.container.classList.add('active');
        this.isOpen = true;
        this.elements.notification.classList.remove('active');
        this.elements.input.focus();
        
        // Mark as interacted
        if (!this.hasInteracted) {
            this.hasInteracted = true;
            localStorage.setItem('sostti_chat_interacted', 'true');
        }
    }
    
    close() {
        this.elements.container.classList.remove('active');
        this.isOpen = false;
    }
    
    sendMessage() {
        const message = this.elements.input.value.trim();
        if (message === '' || this.isTyping) return;
        
        this.addMessage(message, 'user');
        this.elements.input.value = '';
        this.saveConversation();
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Generate response after a delay
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
            this.saveConversation();
        }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
    }
    
    showTypingIndicator() {
        this.isTyping = true;
        
        const typingElement = document.createElement('div');
        typingElement.className = 'typing-indicator active';
        typingElement.id = 'typingIndicator';
        typingElement.innerHTML = `
            <span>SOSTTI Assistant is typing</span>
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        this.elements.messages.appendChild(typingElement);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        this.isTyping = false;
        const typingElement = document.getElementById('typingIndicator');
        if (typingElement) {
            typingElement.remove();
        }
    }
    
    addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Use innerHTML to render HTML properly
        messageElement.innerHTML = `
            <div>${text}</div>
            <span class="timestamp">${timestamp}</span>
        `;
        
        this.elements.messages.appendChild(messageElement);
        this.scrollToBottom();
    }
    
    scrollToBottom() {
        this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
    }
    
    generateResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // SOSTTI-specific responses
        if (lowerMessage.includes('salam') || lowerMessage.includes('assalamu alaikum') || lowerMessage.includes('assalamualaikum')) {
            return "Wa alaikum assalam! Welcome to SOS Technical Training Institute. How can I assist you today?";
        } else if (lowerMessage.includes('apply') || lowerMessage.includes('admission') || lowerMessage.includes('registration') || lowerMessage.includes('enroll') || lowerMessage.includes('form')) {
            return `You can register for our courses through our online application form:<br><br><a href="https://docs.google.com/forms/d/e/1FAIpQLSdnJItkIMyt3SGNaDeTBDcMTBKNeKJ4lC8cx3wxSOvjpciX4g/viewform" target="_blank" style="color: #016390; text-decoration: none; font-weight: 600; background: #e3f2fd; padding: 10px 16px; border-radius: 8px; display: inline-block; border: 2px solid #016390;">🎓 Click to Open Registration Form</a><br><br>📝 The form will open in a new tab where you can fill out your details.`;
        } else if (lowerMessage.includes('complain') || lowerMessage.includes('complaint')) {
            return `You can submit complaints through our official complaint form:<br><br><a href="https://docs.google.com/forms/d/e/1FAIpQLSdkpnbw46lDJyMzebKQ6zcEi4C4Q0Rl9ZMwb8g6e79Wsv3lEw/viewform" target="_blank" style="color: #016390; text-decoration: none; font-weight: 600; background: #ffebee; padding: 10px 16px; border-radius: 8px; display: inline-block; border: 2px solid #016390;">📝 Click to Open Complaint Form</a>`;
        } else if (lowerMessage.includes('course') || lowerMessage.includes('program')) {
    return `We offer a wide range of technical courses:<br><br>
    
    <strong>💻 COMPUTER COURSES:</strong><br>
    • Computer Operator (6 months)<br>
    • Graphics Designing (6 months)<br>
    • Web Designing & Development (6 months)<br>
    • Cyber Security (3 months)<br>
    • Artificial Intelligence (3 months)<br><br>
    
    <strong>🔧 TECHNICAL COURSES:</strong><br>
    • Automobile Mechanic / Electrician (6 months)<br>
    • HVACR - Heating, Ventilation, AC & Refrigeration (6 months)<br>
    • Advance Welding (6 months)<br>
    • Motorcycle Mechanic (6 months)<br>
    • Mechanical Turner / Machinist (6 months)<br>
    • General & Industrial Electrician (6 months)<br>
    • Mobile Phone Repairing (3 months)<br>
    • UPS & Solar PV Technician (3 months)<br><br>
    
    <strong>🌐 LANGUAGE COURSE:</strong><br>
    • English Language (3 months)<br><br>
    
    <strong>🎓 CERTIFIED PROGRAMS:</strong><br>
    • NAVTTC Certified Courses<br>
    • BBSHRRDB Courses<br><br>
    
    To register for any course:<br><br>
    <a href="https://docs.google.com/forms/d/e/1FAIpQLSdnJItkIMyt3SGNaDeTBDcMTBKNeKJ4lC8cx3wxSOvjpciX4g/viewform" 
       target="_blank" 
       style="color: #016390; text-decoration: none; font-weight: 600; background: #e8f5e8; padding: 10px 16px; border-radius: 8px; display: inline-block; border: 2px solid #016390;">
       📚 Click to Register for Courses
    </a><br><br>`;
} else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! Welcome to SOS Technical Training Institute. I can help you with:<br><br>• Course information<br>• Registration process<br>• Admission details<br>• Campus facilities<br><br>How can I assist you today?";
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('address') || lowerMessage.includes('phone') || lowerMessage.includes('location') || lowerMessage.includes('email')) {
            return `📞 Contact Information:<br><br>📍 Address: 52/6, Korangi Township, Near Lalabad Goth, Korangi, Karachi<br>📞 Phone: +92 333 2247494<br>📧 Email: sosttikarachi@sos.org.pk<br><br>Feel free to visit us or contact for more information!`;
        } else if (lowerMessage.includes('fee') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
            return "Our fee structure varies by course. We offer affordable technical education with flexible payment options.<br><br>For detailed fee information, please:<br>• Visit our Fee Structure page<br>• Contact our admission office<br>• Visit our campus<br><br>We believe in making quality education accessible to everyone!";
        } else if (lowerMessage.includes('navttc') || lowerMessage.includes('accreditation') || lowerMessage.includes('certificate')) {
            return "✅ Yes! SOSTTI is accredited by NAVTTC (National Vocational and Technical Training Commission) with an overall institute accreditation score of 92.5% (Grade A).<br><br>Our certificates are recognized:<br>• Nationally across Pakistan<br>• Internationally in many countries<br>• By industry employers<br><br>This ensures your qualification is valued everywhere!";
        } else if (lowerMessage.includes('timing') || lowerMessage.includes('schedule') || lowerMessage.includes('class') || lowerMessage.includes('time')) {
            return "We offer flexible timing options to accommodate everyone:<br><br>⏰ Morning Shift: 8:00 AM - 1:00 PM<br>⏰ Evening Shift: 2:00 PM - 6:00 PM<br><br>Specific class schedules vary by course. Please contact our administration for the current timetable and availability.";
        } else if (lowerMessage.includes('facility') || lowerMessage.includes('lab') || lowerMessage.includes('equipment') || lowerMessage.includes('workshop')) {
            return "We have state-of-the-art facilities including:<br><br>🖥️ Computer Labs with latest software<br>🔧 Automotive Workshops with modern equipment<br>⚡ Electrical Labs with practical setups<br>🔥 Welding Stations with safety gear<br>🔩 Mechanical Workshops with industrial tools<br><br>All labs are equipped with the latest technology for hands-on learning!";
        } else if (lowerMessage.includes('job') || lowerMessage.includes('placement') || lowerMessage.includes('career') || lowerMessage.includes('employment')) {
            return "We provide comprehensive career support:<br><br>🎯 Career Guidance & Counseling<br>🤝 Placement Assistance<br>💼 Industry Connections<br>🏢 Job Referrals<br>🚀 Entrepreneurship Support<br><br>Many of our graduates have secured employment in reputable organizations or started their own successful businesses!";
        } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            return "You're welcome! 😊 Is there anything else I can help you with regarding SOSTTI courses, admissions, or facilities?";
        } else if (lowerMessage.includes('whatsapp')) {
            return "You can contact us directly on WhatsApp:<br><br>📱 +92 333 2247494<br><br>Click the green WhatsApp button below to start a conversation with our team! We're here to help you with any questions.";
        } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
            return "Thank you for chatting with SOSTTI Assistant! 👋<br><br>If you have more questions later, feel free to open this chat again. Have a great day!";
        } else {
            return "I'm here to help you with information about:<br><br>🎓 SOSTTI Courses & Programs<br>📝 Admission Process & Requirements<br>💰 Fee Structure & Payment Options<br>📜 NAVTTC Accreditation & Certificates<br>🏫 Campus Facilities & Labs<br>👨‍💼 Career Opportunities & Placements<br>📞 Contact Information<br><br>Could you please be more specific about what you'd like to know?";
        }
    }
    
    autoOpen() {
        // Check if user has interacted before
        const hasInteracted = localStorage.getItem('sostti_chat_interacted');
        
        if (!hasInteracted) {
            // Show notification dot after 15 seconds on first visit
            setTimeout(() => {
                if (!this.isOpen && this.elements.notification) {
                    this.elements.notification.classList.add('active');
                }
            }, 15000);
        }
    }
    
    saveConversation() {
        // Save last few messages to localStorage for continuity
        const messages = Array.from(this.elements.messages.children)
            .filter(msg => msg.classList.contains('message'))
            .map(msg => {
                // Use 'div' instead of 'p' since that's what we're using in addMessage
                const messageContent = msg.querySelector('div');
                return {
                    text: messageContent ? messageContent.innerHTML : msg.textContent,
                    sender: msg.classList.contains('user-message') ? 'user' : 'bot',
                    time: msg.querySelector('.timestamp').textContent
                };
            });
        
        // Keep only last 10 messages
        const recentMessages = messages.slice(-10);
        localStorage.setItem('sostti_chat_history', JSON.stringify(recentMessages));
    }
    
    loadConversation() {
        const savedHistory = localStorage.getItem('sostti_chat_history');
        if (savedHistory) {
            const messages = JSON.parse(savedHistory);
            
            // Clear initial message if we have saved history
            if (messages.length > 0) {
                this.elements.messages.innerHTML = '';
            }
            
            // Load saved messages
            messages.forEach(msg => {
                // Use innerHTML to preserve HTML content
                const messageElement = document.createElement('div');
                messageElement.className = `message ${msg.sender}-message`;
                messageElement.innerHTML = `
                    <div>${msg.text}</div>
                    <span class="timestamp">${msg.time}</span>
                `;
                this.elements.messages.appendChild(messageElement);
            });
            
            this.scrollToBottom();
        }
    }
    
    clearChat() {
        this.elements.messages.innerHTML = `
            <div class="message bot-message">
                <div>Chat cleared. How can I help you today?</div>
                <span class="timestamp">Just now</span>
            </div>
        `;
        localStorage.removeItem('sostti_chat_history');
    }
}

// Video responsive fix
function fixVideoResponsive() {
    const videoWrapper = document.querySelector('.video-wrapper');
    if (videoWrapper) {
        const iframe = videoWrapper.querySelector('iframe');
        if (iframe) {
            iframe.removeAttribute('height');
            iframe.style.height = '100%';
        }
    }
}

// Initialize when page loads
window.addEventListener('load', function() {
    fixVideoResponsive();
});