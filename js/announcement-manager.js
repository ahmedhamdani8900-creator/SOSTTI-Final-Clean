// Simple Image Announcement - Multiple Ads Rotation
class SimpleImageAnnouncement {
    constructor() {
        this.ads = this.getAds();
        this.currentAdIndex = 0;
        console.log('🖼️ Image Announcement Initialized with', this.ads.length, 'ads');
        this.init();
    }

    getAds() {
        return [
            'images/ads/ad1.jpg',
            'images/ads/ad2.jpg'
            // Add more ads in future:
            // 'images/ads/ad3.jpg',
            // 'images/ads/ad4.jpg'
        ];
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

            /* Ad counter for multiple ads */
            .adCounter {
                position: absolute;
                top: -15px;
                left: -15px;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 5px 10px;
                border-radius: 15px;
                font-size: 12px;
                z-index: 10;
            }

            /* Navigation arrows for multiple ads */
            .navArrow {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(0,0,0,0.6);
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 18px;
                display: none;
            }

            .navArrow:hover {
                background: rgba(0,0,0,0.9);
            }

            .prevArrow {
                left: -20px;
            }

            .nextArrow {
                right: -20px;
            }

            #imageAnnouncementPopup:hover .navArrow {
                display: flex;
                align-items: center;
                justify-content: center;
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

                .adCounter {
                    top: -10px;
                    left: -10px;
                    font-size: 11px;
                }

                .navArrow {
                    width: 35px;
                    height: 35px;
                    font-size: 16px;
                }

                .prevArrow {
                    left: -15px;
                }

                .nextArrow {
                    right: -15px;
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

                .adCounter {
                    top: -5px;
                    left: -5px;
                    font-size: 10px;
                    padding: 3px 8px;
                }

                .navArrow {
                    width: 30px;
                    height: 30px;
                    font-size: 14px;
                }

                .prevArrow {
                    left: -10px;
                }

                .nextArrow {
                    right: -10px;
                }
            }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);

        // Add HTML
        this.injectHTML();
    }

    injectHTML() {
        const html = `
            <div id="imageAnnouncementOverlay">
                <div id="imageAnnouncementPopup">
                    <button class="imageCloseBtn" onclick="document.getElementById('imageAnnouncementOverlay').style.display='none'">×</button>
                    ${this.ads.length > 1 ? '<div class="adCounter" id="adCounter">1/' + this.ads.length + '</div>' : ''}
                    ${this.ads.length > 1 ? '<button class="navArrow prevArrow" id="prevArrow">‹</button>' : ''}
                    ${this.ads.length > 1 ? '<button class="navArrow nextArrow" id="nextArrow">›</button>' : ''}
                    <img src="${this.ads[0]}" alt="SOSTTI Courses" class="announcementImage" id="announcementImage">
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', html);
        
        // Setup navigation if multiple ads
        if (this.ads.length > 1) {
            this.setupNavigation();
        }
    }

    setupNavigation() {
        const prevArrow = document.getElementById('prevArrow');
        const nextArrow = document.getElementById('nextArrow');
        const image = document.getElementById('announcementImage');
        const counter = document.getElementById('adCounter');

        prevArrow.onclick = () => {
            this.currentAdIndex = (this.currentAdIndex - 1 + this.ads.length) % this.ads.length;
            image.src = this.ads[this.currentAdIndex];
            counter.textContent = `${this.currentAdIndex + 1}/${this.ads.length}`;
        };

        nextArrow.onclick = () => {
            this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
            image.src = this.ads[this.currentAdIndex];
            counter.textContent = `${this.currentAdIndex + 1}/${this.ads.length}`;
        };
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