// COMPLETELY REPLACE YOUR ANNOUNCEMENT MANAGER WITH THIS CODE
// Simple 5-second Announcement - No Tracking, No Conditions

// Remove any existing announcement manager completely
if (window.SOSTTIAnnouncementManager) {
    delete window.SOSTTIAnnouncementManager;
}

// Stop any existing intervals or timeouts
const highestTimeoutId = setTimeout(() => {}, 0);
for (let i = 0; i < highestTimeoutId; i++) {
    clearTimeout(i);
    clearInterval(i);
}

class SimpleAnnouncement {
    constructor() {
        console.log('🔄 Simple Announcement Initialized');
        this.init();
    }

    init() {
        // Remove any existing announcements first
        this.cleanup();
        
        // Create and show announcement
        this.createAnnouncement();
        
        // Show after 5 seconds
        setTimeout(() => {
            this.showAnnouncement();
        }, 5000);
    }

    cleanup() {
        // Remove any existing overlay
        const oldOverlay = document.getElementById('simpleAnnouncementOverlay');
        const oldStyles = document.getElementById('simpleAnnouncementStyles');
        
        if (oldOverlay) oldOverlay.remove();
        if (oldStyles) oldStyles.remove();
        
        // Clear any related localStorage
        localStorage.removeItem('sostti_course_ads');
        localStorage.removeItem('sostti_course_ads_v2');
        localStorage.removeItem('sostti_new_ads_final');
        localStorage.removeItem('sostti_embedded_ads');
        localStorage.removeItem('sostti_simple_ads');
    }

    createAnnouncement() {
        // Add styles
        const styles = `
            <style id="simpleAnnouncementStyles">
            #simpleAnnouncementOverlay {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                z-index: 99999;
                justify-content: center;
                align-items: center;
                padding: 20px;
                box-sizing: border-box;
            }

            #simpleAnnouncementPopup {
                background: white;
                border-radius: 15px;
                width: 100%;
                max-width: 500px;
                position: relative;
                overflow: hidden;
                animation: slideIn 0.3s ease-out;
            }

            @keyframes slideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }

            .simpleCloseBtn {
                position: absolute;
                top: 10px;
                right: 15px;
                background: rgba(0,0,0,0.7);
                color: white;
                border: none;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                cursor: pointer;
                z-index: 10;
                font-size: 18px;
                font-weight: bold;
            }

            .simpleCloseBtn:hover {
                background: black;
            }

            .simpleImage {
                width: 100%;
                height: 200px;
                overflow: hidden;
            }

            .simpleImage img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .simpleContent {
                padding: 20px;
                text-align: center;
            }

            .simpleTitle {
                color: #2c3e50;
                font-size: 1.4rem;
                margin-bottom: 10px;
                font-weight: bold;
            }

            .simpleDescription {
                color: #7f8c8d;
                margin-bottom: 15px;
                font-size: 1rem;
            }

            .simpleHighlights {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
                margin: 20px 0;
            }

            @media (max-width: 480px) {
                .simpleHighlights {
                    grid-template-columns: 1fr;
                }
            }

            .highlight {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 0.9rem;
                color: #34495e;
            }

            .highlight i {
                color: #e74c3c;
            }

            .simpleFooter {
                margin-top: 15px;
                padding-top: 15px;
                border-top: 1px solid #ecf0f1;
                color: #95a5a6;
                font-size: 0.9rem;
            }

            .simpleContact {
                margin-top: 10px;
                color: #6c757d;
                font-size: 0.9rem;
            }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);

        // Add HTML
        const html = `
            <div id="simpleAnnouncementOverlay">
                <div id="simpleAnnouncementPopup">
                    <button class="simpleCloseBtn" onclick="document.getElementById('simpleAnnouncementOverlay').style.display='none'">×</button>
                    <div class="simpleImage">
                        <img src="images/ads/ad1.jpg" alt="SOSTTI Courses">
                    </div>
                    <div class="simpleContent">
                        <div class="simpleTitle">SOS TECHNICAL TRAINING INSTITUTE</div>
                        <div class="simpleDescription">FREE COURSES ADMISSIONS OPEN</div>
                        
                        <div class="simpleHighlights">
                            <div class="highlight">
                                <i class="fas fa-car"></i>
                                <span>High Tech Automotive</span>
                            </div>
                            <div class="highlight">
                                <i class="fas fa-wind"></i>
                                <span>Refrigeration & AC</span>
                            </div>
                            <div class="highlight">
                                <i class="fas fa-mobile-alt"></i>
                                <span>Mobile Repairing</span>
                            </div>
                            <div class="highlight">
                                <i class="fas fa-tools"></i>
                                <span>Advance Welding</span>
                            </div>
                            <div class="highlight">
                                <i class="fas fa-bolt"></i>
                                <span>General Electrician</span>
                            </div>
                        </div>
                        
                        <div class="simpleFooter">
                            <i class="fas fa-graduation-cap"></i> For More Information: www.sostti.org
                        </div>
                        <div class="simpleContact">
                            <i class="fas fa-phone"></i> Contact: 0346-2555181 | 0311-2473347
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', html);
    }

    showAnnouncement() {
        const overlay = document.getElementById('simpleAnnouncementOverlay');
        if (overlay) {
            overlay.style.display = 'flex';
            console.log('✅ Announcement shown after 5 seconds');
        }
    }
}

// Wait for page to load and start
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new SimpleAnnouncement();
    });
} else {
    new SimpleAnnouncement();
}

// Override any existing announcement manager
window.SOSTTIAnnouncementManager = SimpleAnnouncement;