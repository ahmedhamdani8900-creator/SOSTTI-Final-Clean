// Auto-start Typing Effect
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    
    if (!typingElement) {
        console.error('Typing element not found');
        return;
    }

    const texts = [
        "NAVTTC Accredited Institute",
        "Empowering Youth Through Technical, Computer and English Skills",
        "Building the Next Generation of Technical and IT Experts", 
        "Hands-On Practical Learning",
        "Industry-Ready Skills Training",
        "Your Pathway to a Bright Future"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        typingElement.textContent = currentText.substring(0, charIndex);

        if (!isDeleting && charIndex < currentText.length) {
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, 50);
        } else {
            if (!isDeleting) {
                isDeleting = true;
                setTimeout(type, 2000);
            } else {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500);
            }
        }
    }

    type();
}

// Start typing effect after loader finishes
function startTypingAfterLoader() {
    // Wait for loader to be hidden, then start typing
    const checkLoader = setInterval(() => {
        const loader = document.getElementById('loader');
        if (loader && loader.classList.contains('hidden')) {
            clearInterval(checkLoader);
            initTypingEffect();
        }
    }, 100);
}

// Listen for when loader is hidden
document.addEventListener('DOMContentLoaded', function() {
    startTypingAfterLoader();
});