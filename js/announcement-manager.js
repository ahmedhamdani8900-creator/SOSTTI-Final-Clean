// Enhanced Smart Announcement Manager for Course Images
class SOSTTIAnnouncementManager {
    constructor() {
        this.storageKey = 'sostti_course_ads';
        this.config = {
            maxIgnores: 10,
            daysBetweenShows: 1,
            minSessionTime: 3000,
            scrollThreshold: 1,
            useExitIntent: true,
            waitForEngagement: false,
            initialFrequentShows: 10
        };
        
        this.courseAds = this.getCourseAds();
        this.init();
    }

    init() {
        console.log('SOSTTI Announcement Manager initialized');
        
        if (this.shouldShowAnnouncement()) {
            console.log('Announcement should be shown, setting up tracking...');
            this.setupEngagementTracking();
            if (this.config.useExitIntent) {
                this.setupExitIntent();
            }
        } else {
            console.log('Announcement should NOT be shown');
        }
    }

    shouldShowAnnouncement() {
        // Only on index page
        if (!this.isIndexPage()) {
            console.log('Not index page, skipping announcement');
            return false;
        }

        const data = this.getStoredData() || { 
            ignores: 0, 
            neverShow: false,
            lastSeen: null,
            totalViews: 0,
            totalShows: 0,
            lastAdIndex: 0
        };

        // Update view count
        data.totalViews = (data.totalViews || 0) + 1;
        this.saveStoredData(data);

        console.log('Announcement check:', {
            neverShow: data.neverShow,
            ignores: data.ignores,
            totalViews: data.totalViews,
            totalShows: data.totalShows,
            lastSeen: data.lastSeen
        });

        // Hard stops
        if (data.neverShow) {
            console.log('User opted out permanently');
            return false;
        }
        
        if (data.ignores >= this.config.maxIgnores) {
            console.log('User ignored too many times');
            return false;
        }

        // TESTING: Show only 10 times total
        if (data.totalShows >= 10) {
            console.log('Testing limit reached: Already shown 10 times');
            return false;
        }

        // Don't show to brand new visitors (first 2 visits)
        if (this.config.waitForEngagement && data.totalViews <= 1) {
            console.log('New visitor, waiting for engagement');
            return false;
        }

        // Frequency control - once per day during testing
        if (data.lastSeen) {
            const daysSinceLastShow = (new Date() - new Date(data.lastSeen)) / (1000 * 60 * 60 * 24);
            const totalShows = data.totalShows || 0;
            
            // First 10 shows: Show every visit (no waiting)
            if (totalShows < 10) {
                console.log(`Show ${totalShows + 1} of 10 - No waiting period`);
                // No time restriction for first 10 shows
            } 
            // After 10 shows: Switch to 1-day interval
            else if (daysSinceLastShow < this.config.daysBetweenShows) {
                console.log(`Already shown ${totalShows} times, waiting ${this.config.daysBetweenShows} days`);
                return false;
            }
        }

        console.log('Announcement should be shown');
        return true;
    }

    isIndexPage() {
        const path = window.location.pathname;
        const isIndex = path.endsWith('index.html') || path.endsWith('/') || path === '' || 
                       (path.includes('SOSTTI') && !path.includes('.html'));
        console.log('Page check:', { path, isIndex });
        return isIndex;
    }

    setupEngagementTracking() {
        console.log('Setting up engagement tracking');
        
        let startTime = Date.now();
        let maxScroll = 0;
        let hasShown = false;

        const checkEngagement = () => {
            if (hasShown) return;
            
            const timeOnPage = Date.now() - startTime;
            const scrollDepth = this.getScrollDepth();
            
            console.log('Engagement check:', { timeOnPage, scrollDepth, maxScroll });

            if (timeOnPage >= this.config.minSessionTime && scrollDepth >= this.config.scrollThreshold) {
                console.log('User engaged, showing announcement');
                hasShown = true;
                this.showAnnouncement();
                document.removeEventListener('scroll', trackScroll);
            }
        };

        const trackScroll = () => {
            maxScroll = Math.max(maxScroll, window.scrollY);
        };

        document.addEventListener('scroll', trackScroll);
        
        // Check engagement every second
        const engagementInterval = setInterval(() => {
            if (hasShown) {
                clearInterval(engagementInterval);
                return;
            }
            checkEngagement();
        }, 1000);

        // Final check after max wait time
        setTimeout(() => {
            if (!hasShown && this.getScrollDepth() > 1) {
                console.log('Timeout reached, showing announcement');
                hasShown = true;
                this.showAnnouncement();
                clearInterval(engagementInterval);
            }
        }, 15000);
    }

    setupExitIntent() {
        console.log('Setting up exit intent detection');
        
        let mouseY = 0;
        let exitIntentTriggered = false;
        
        document.addEventListener('mousemove', (e) => {
            mouseY = e.clientY;
        });

        document.addEventListener('mouseleave', (e) => {
            if (!exitIntentTriggered && e.clientY < 50 && mouseY < 100) {
                console.log('Exit intent detected');
                exitIntentTriggered = true;
                this.showAnnouncement();
            }
        });
    }

    getScrollDepth() {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        
        const scrollDepth = (scrollTop / (docHeight - windowHeight)) * 100;
        return isNaN(scrollDepth) ? 0 : scrollDepth;
    }

    getCourseAds() {
        return [
            {
                image: 'images/ads/ad1.jpg',
                title: "SOS TECHNICAL TRAINING INSTITUTE",
                description: "Admissions open for FREE COURSES with professional certification. Enhance your technical skills and career opportunities.",
                cta: "Get More Information",
                link: "pages/about-contact.html",
                highlights: [
                    { icon: "fas fa-car", text: "High Tech Automotive Technician" },
                    { icon: "fas fa-wind", text: "Refrigeration and Air-Conditioning" },
                    { icon: "fas fa-mobile-alt", text: "Mobile Phone Repairing" },
                    { icon: "fas fa-tools", text: "Advance Welding" },
                    { icon: "fas fa-bolt", text: "General Electrician" }
                ],
                footer: "For More Information: www.sostti.org",
                contact: "Contact: 0346-2555181 | 0311-2473347"
            }
        ];
    }

    showAnnouncement() {
        console.log('Showing course advertisement');
        
        const overlay = document.getElementById('announcementOverlay');
        if (!overlay) {
            console.error('Announcement overlay not found');
            return;
        }

        // Use the first ad (your image)
        const currentAd = this.courseAds[0];
        
        this.updateAdContent(currentAd);

        overlay.style.display = 'flex';
        
        // Update tracking
        const data = this.getStoredData();
        data.lastSeen = new Date().toISOString();
        data.lastAdIndex = 0;
        data.totalShows = (data.totalShows || 0) + 1;
        this.saveStoredData(data);

        console.log(`Showing ad, total shows: ${data.totalShows}`);
    }

    updateAdContent(ad) {
        const image = document.querySelector('.announcement-image img');
        const title = document.getElementById('announcementTitle');
        const description = document.getElementById('announcementDescription');
        const primaryBtn = document.getElementById('announcementPrimaryBtn');
        const badge = document.querySelector('.announcement-badge');
        const highlightsContainer = document.querySelector('.course-highlights');
        const footer = document.querySelector('.announcement-footer');
        const contactInfo = document.getElementById('announcementContact');

        // Update image
        if (image) {
            image.src = ad.image;
            image.alt = ad.title;
        }
        
        // Update text content
        if (title) title.textContent = ad.title;
        if (description) description.innerHTML = ad.description;
        
        // Update button
        if (primaryBtn) {
            primaryBtn.innerHTML = `<i class="fas fa-search"></i> ${ad.cta}`;
            primaryBtn.onclick = () => this.handleUserChoice('interested', ad.link);
        }
        
        // Update badge
        if (badge && ad.badge) {
            badge.textContent = ad.badge;
        }
        
        // Update highlights
        if (highlightsContainer && ad.highlights) {
            highlightsContainer.innerHTML = '';
            ad.highlights.forEach(highlight => {
                const highlightItem = document.createElement('div');
                highlightItem.className = 'highlight-item';
                highlightItem.innerHTML = `
                    <i class="${highlight.icon}"></i>
                    <span>${highlight.text}</span>
                `;
                highlightsContainer.appendChild(highlightItem);
            });
        }
        
        // Update footer and contact info
        if (footer && ad.footer) {
            footer.innerHTML = `<i class="fas fa-graduation-cap"></i> ${ad.footer}`;
        }
        
        // Add contact info if available
        if (ad.contact) {
            if (!contactInfo) {
                const contactElement = document.createElement('div');
                contactElement.className = 'announcement-contact';
                contactElement.id = 'announcementContact';
                contactElement.style.marginTop = '5px';
                contactElement.style.paddingTop = '5px';
                contactElement.style.borderTop = '1px solid #e9ecef';
                contactElement.style.fontSize = '0.9rem';
                contactElement.style.color = '#6c757d';
                contactElement.style.textAlign = 'center';
                
                const contentDiv = document.querySelector('.announcement-popup-content');
                const footerDiv = contentDiv.querySelector('.announcement-footer');
                contentDiv.insertBefore(contactElement, footerDiv);
            }
            
            const contactElement = document.getElementById('announcementContact');
            if (contactElement) {
                contactElement.innerHTML = `<i class="fas fa-phone"></i> ${ad.contact}`;
            }
        }
    }

    setupEventListeners() {
        const overlay = document.getElementById('announcementOverlay');
        const laterBtn = document.getElementById('announcementLaterBtn');
        const neverBtn = document.getElementById('announcementNeverBtn');

        // Later button
        if (laterBtn) {
            laterBtn.onclick = () => this.handleUserChoice('later');
        }

        // Never show again button
        if (neverBtn) {
            neverBtn.onclick = () => this.handleUserChoice('never');
        }

        // Close when clicking outside
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.handleUserChoice('later');
                }
            });
        }

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay && overlay.style.display === 'flex') {
                this.handleUserChoice('later');
            }
        });
    }

    handleUserChoice(choice, link = null) {
        console.log('User choice:', choice);
        
        const overlay = document.getElementById('announcementOverlay');
        if (overlay) {
            overlay.style.display = 'none';
        }

        const data = this.getStoredData() || {};
        
        switch(choice) {
            case 'interested':
                data.ignores = 0;
                this.saveStoredData(data);
                if (link) {
                    window.location.href = link;
                }
                break;
                
            case 'later':
                data.ignores = (data.ignores || 0) + 1;
                this.saveStoredData(data);
                
                if (data.ignores === this.config.maxIgnores - 1) {
                    setTimeout(() => {
                        // Optional: Show a subtle notification
                    }, 1000);
                }
                break;
                
            case 'never':
                data.neverShow = true;
                this.saveStoredData(data);
                alert("We won't show announcements again. You can change this by clearing your browser data.");
                break;
        }
    }

    getStoredData() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error reading announcement data:', e);
            return null;
        }
    }

    saveStoredData(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (e) {
            console.error('Error saving announcement data:', e);
        }
    }
}

// Initialize the announcement manager
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const announcementManager = new SOSTTIAnnouncementManager();
        announcementManager.setupEventListeners();
    }, 500);
});