// Simple Image Announcement - Full Width on Mobile
class SimpleImageAnnouncement {
    constructor() {
        this.ads = this.getAds();
        this.currentAdIndex = 0;
        console.log('🖼️ Image Announcement Initialized with', this.ads.length, 'ads');
        this.init();
    }

    getAds() {
        return [
            'images/ads/ad1.jpg'
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
        // Add styles with mobile-first approach
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
                padding: 10px;
            }

            #imageAnnouncementPopup {
                background: transparent;
                position: relative;
                width: 100%;
                max-width: 500px;
                animation: slideIn 0.3s ease-out;
            }

            @keyframes slideIn {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }

            .imageCloseBtn {
                position: absolute;
                top: -10px;
                right: -10px;
                background: rgba(0,0,0,0.8);
                color: white;
                border: none;
                width: 35px;
                height: 35px;
                border-radius: 50%;
                cursor: pointer;
                z-index: 10;
                font-size: 18px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .imageCloseBtn:hover {
                background: black;
                transform: scale(1.1);
            }

            .imageContainer {
                width: 100%;
                overflow: hidden;
                border-radius: 8px;
                background: transparent;
            }

            .announcementImage {
                width: 100%;
                height: auto;
                display: block;
            }

            /* Ad counter for multiple ads */
            .adCounter {
                position: absolute;
                top: -10px;
                left: -10px;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 11px;
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
                width: 35px;
                height: 35px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 16px;
                display: none;
                z-index: 10;
            }

            .navArrow:hover {
                background: rgba(0,0,0,0.9);
            }

            .prevArrow {
                left: -15px;
            }

            .nextArrow {
                right: -15px;
            }

            #imageAnnouncementPopup:hover .navArrow {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            /* Mobile First - Full width with auto height */
            @media (max-width: 768px) {
                #imageAnnouncementOverlay {
                    padding: 5px;
                }
                
                #imageAnnouncementPopup {
                    max-width: 100%;
                    margin: 0 auto;
                }

                .imageContainer {
                    border-radius: 5px;
                }

                .announcementImage {
                    width: 100%;
                    height: auto;
                    max-height: 85vh;
                    object-fit: cover;
                }

                .imageCloseBtn {
                    top: -5px;
                    right: -5px;
                    width: 30px;
                    height: 30px;
                    font-size: 16px;
                }

                .adCounter {
                    top: -5px;
                    left: -5px;
                    font-size: 10px;
                    padding: 3px 6px;
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

            /* Desktop */
            @media (min-width: 769px) {
                #imageAnnouncementOverlay {
                    padding: 20px;
                }
                
                #imageAnnouncementPopup {
                    max-width: 600px;
                }

                .imageContainer {
                    border-radius: 10px;
                }

                .announcementImage {
                    width: 100%;
                    height: auto;
                    max-height: 80vh;
                    object-fit: contain;
                }

                .imageCloseBtn {
                    top: -15px;
                    right: -15px;
                    width: 40px;
                    height: 40px;
                    font-size: 20px;
                }

                .adCounter {
                    top: -15px;
                    left: -15px;
                    font-size: 12px;
                    padding: 5px 10px;
                }

                .navArrow {
                    width: 40px;
                    height: 40px;
                    font-size: 18px;
                }

                .prevArrow {
                    left: -20px;
                }

                .nextArrow {
                    right: -20px;
                }
            }

            /* Very small mobile devices */
            @media (max-width: 360px) {
                #imageAnnouncementOverlay {
                    padding: 2px;
                }
                
                .imageCloseBtn {
                    top: -3px;
                    right: -3px;
                    width: 25px;
                    height: 25px;
                    font-size: 14px;
                }

                .adCounter {
                    top: -3px;
                    left: -3px;
                    font-size: 9px;
                    padding: 2px 5px;
                }

                .navArrow {
                    width: 25px;
                    height: 25px;
                    font-size: 12px;
                }

                .prevArrow {
                    left: -8px;
                }

                .nextArrow {
                    right: -8px;
                }
            }

            /* Landscape mode on mobile */
            @media (max-height: 500px) and (orientation: landscape) {
                .announcementImage {
                    max-height: 90vh;
                    object-fit: contain;
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
                    <div class="imageContainer">
                        <img src="${this.ads[0]}" alt="SOSTTI Courses" class="announcementImage" id="announcementImage">
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', html);
        
        // Setup navigation if multiple ads
        if (this.ads.length > 1) {
            this.setupNavigation();
        }

        // Preload images for better performance
        this.preloadImages();
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

    preloadImages() {
        // Preload all images for smooth navigation
        this.ads.forEach((adSrc, index) => {
            if (index > 0) {
                const img = new Image();
                img.src = adSrc;
            }
        });
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