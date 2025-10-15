// Simple Image Announcement - Show Only Picture
class SimpleImageAnnouncement {
    constructor() {
        console.log('🖼️ Image Announcement Initialized');
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
        const oldOverlay = document.getElementById('imageAnnouncementOverlay');
        const oldStyles = document.getElementById('imageAnnouncementStyles');
        
        if (oldOverlay) oldOverlay.remove();
        if (oldStyles) oldStyles.remove();
    }

    createAnnouncement() {
        // Add minimal styles
        const styles = `
            <style id="imageAnnouncementStyles">
            #imageAnnouncementOverlay {
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

            #imageAnnouncementPopup {
                background: transparent;
                position: relative;
                max-width: 600px;
                width: 100%;
                animation: slideIn 0.3s ease-out;
            }

            @keyframes slideIn {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }

            .imageCloseBtn {
                position: absolute;
                top: -15px;
                right: -15px;
                background: rgba(0,0,0,0.8);
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                z-index: 10;
                font-size: 20px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .imageCloseBtn:hover {
                background: black;
                transform: scale(1.1);
            }

            .announcementImage {
                width: 100%;
                height: auto;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            }

            @media (max-width: 768px) {
                #imageAnnouncementOverlay {
                    padding: 10px;
                }
                
                #imageAnnouncementPopup {
                    max-width: 100%;
                }
                
                .imageCloseBtn {
                    top: -10px;
                    right: -10px;
                    width: 35px;
                    height: 35px;
                    font-size: 18px;
                }
            }

            @media (max-width: 480px) {
                #imageAnnouncementOverlay {
                    padding: 5px;
                }
                
                .imageCloseBtn {
                    top: -5px;
                    right: -5px;
                    width: 30px;
                    height: 30px;
                    font-size: 16px;
                }
                
                .announcementImage {
                    border-radius: 5px;
                }
            }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);

        // Add HTML - ONLY the image
        const html = `
            <div id="imageAnnouncementOverlay">
                <div id="imageAnnouncementPopup">
                    <button class="imageCloseBtn" onclick="document.getElementById('imageAnnouncementOverlay').style.display='none'">×</button>
                    <img src="images/ads/ad1.jpg" alt="SOSTTI Courses" class="announcementImage">
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', html);
    }

    showAnnouncement() {
        const overlay = document.getElementById('imageAnnouncementOverlay');
        if (overlay) {
            overlay.style.display = 'flex';
            console.log('✅ Image announcement shown after 5 seconds');
        }
    }
}

// Wait for page to load and start
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new SimpleImageAnnouncement();
    });
} else {
    new SimpleImageAnnouncement();
}