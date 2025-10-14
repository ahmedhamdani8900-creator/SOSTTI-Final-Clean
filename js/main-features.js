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

// Auto-start when page fully loads
window.addEventListener('load', initTypingEffect);

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

        // TESTING: Show only 5 times total
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
            
            // First 5 shows: Show every visit (no waiting)
            if (totalShows < 10) {
                console.log(`Show ${totalShows + 1} of 10 - No waiting period`);
                // No time restriction for first 5 shows
            } 
            // After 5 shows: Switch to 1-day interval
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
                image: 'images/ads/sostticityguilds.jpg', // You can replace this with your actual ad image
                title: "International Certification Courses",
                description: "Get City & Guilds International Certification in HVACR, General Electrician, and Full Stack Development with globally recognized qualifications.",
                cta: "Get Certified",
                link: "pages/about-contact.html",
                highlights: [
                    { icon: "fas fa-certificate", text: "City & Guilds Certified" },
                    { icon: "fas fa-snowflake", text: "HVACR Course" },
                    { icon: "fas fa-bolt", text: "General Electrician" },
                    { icon: "fas fa-code", text: "Full Stack Development" }
                ],
                footer: "Certification Fees: UK Pound 60 | Rs: 22,800/-",
                contact: "Interested Candidates Contact with HOD or Admin Office"
            },
            {
                image: 'images/ads/sosttinavttc.jpg', // You can replace this with your actual ad image
                title: "FREE NAVTTC COURSES ADMISSION OPEN",
                description: "Enroll in our free technical courses with certification. Limited seats available for aspiring technicians.",
                cta: "Apply Now",
                link: "https://docs.google.com/forms/d/e/1FAIpQLSdnJItkIMyt3SGNaDeTBDcMTBKNeKJ4lC8cx3wxSOvjpciX4g/viewform",
                highlights: [
                    { icon: "fas fa-car", text: "High Tech Automotive" },
                    { icon: "fas fa-wind", text: "Refrigeration & AC" },
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

        // Rotate between the two ads
        const data = this.getStoredData();
        const adIndex = data.totalShows % this.courseAds.length; // Alternate between 0 and 1
        const currentAd = this.courseAds[adIndex];
        
        this.updateAdContent(currentAd);

        overlay.style.display = 'flex';
        
        // Update tracking
        data.lastSeen = new Date().toISOString();
        data.lastAdIndex = adIndex;
        data.totalShows = (data.totalShows || 0) + 1;
        this.saveStoredData(data);

        console.log(`Showing ad ${adIndex + 1} of ${this.courseAds.length}, total shows: ${data.totalShows}`);
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
        if (image) image.src = ad.image;
        
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
                // Create contact info element if it doesn't exist
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
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.handleUserChoice('later');
            }
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.style.display === 'flex') {
                this.handleUserChoice('later');
            }
        });
    }

    handleUserChoice(choice, link = null) {
        console.log('User choice:', choice);
        
        const overlay = document.getElementById('announcementOverlay');
        overlay.style.display = 'none';

        const data = this.getStoredData();
        
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
                
                // Show warning on last chance
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
    // Wait a bit for other scripts to load
    setTimeout(() => {
        const announcementManager = new SOSTTIAnnouncementManager();
        announcementManager.setupEventListeners();
    }, 500);
});

//video
function initVideoPlayer() {
    const videoWrapper = document.querySelector('.video-wrapper');
    const video = videoWrapper.querySelector('video');
    const playPauseBtn = videoWrapper.querySelector('.play-pause-btn');
    const progressBar = videoWrapper.querySelector('.progress');
    const timeDisplay = videoWrapper.querySelector('.time-display');
    const loadingText = videoWrapper.querySelector('.loading-text');
    const volumeBtn = videoWrapper.querySelector('.volume');
    const progressContainer = videoWrapper.querySelector('.progress-bar');

    let isPlaying = false;
    let hideControlsTimeout;
    let hidePlayButtonTimeout;

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function updateProgress() {
        if (video.duration) {
            const percent = (video.currentTime / video.duration) * 100;
            progressBar.style.width = `${percent}%`;
            timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
        }
    }

    function showControlsTemporarily() {
        videoWrapper.classList.add('controls-visible');
        clearTimeout(hideControlsTimeout);
        hideControlsTimeout = setTimeout(() => {
            if (isPlaying) videoWrapper.classList.remove('controls-visible');
        }, 3000);
    }

    function hidePlayButton() {
        clearTimeout(hidePlayButtonTimeout);
        hidePlayButtonTimeout = setTimeout(() => {
            if (isPlaying) playPauseBtn.classList.add('hidden');
        }, 500);
    }

    function showPlayButton() {
        clearTimeout(hidePlayButtonTimeout);
        playPauseBtn.classList.remove('hidden');
    }

    function togglePlayPause() {
        if (isPlaying) {
            video.pause();
            playPauseBtn.textContent = '▶';
            showPlayButton();
        } else {
            video.play().catch(e => console.log('Play failed:', e));
            playPauseBtn.textContent = '❚❚';
            hidePlayButton();
        }
        isPlaying = !isPlaying;
        showControlsTemporarily();
    }

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = video.duration;
        video.currentTime = (clickX / width) * duration;
        showControlsTemporarily();
    }

    function toggleVolume() {
        video.volume = video.volume > 0 ? 0 : 1;
        volumeBtn.textContent = video.volume > 0 ? '🔊' : '🔇';
        showControlsTemporarily();
    }

    // Event listeners
    playPauseBtn.addEventListener('click', togglePlayPause);
    video.addEventListener('click', togglePlayPause);
    video.addEventListener('timeupdate', updateProgress);
    progressContainer.addEventListener('click', setProgress);
    volumeBtn.addEventListener('click', toggleVolume);

    video.addEventListener('loadeddata', function() {
        videoWrapper.classList.remove('loading');
        loadingText.classList.add('hidden');
        timeDisplay.textContent = `0:00 / ${formatTime(video.duration)}`;
        video.play().then(() => {
            isPlaying = true;
            playPauseBtn.textContent = '❚❚';
            hidePlayButton();
        }).catch(() => showPlayButton());
    });

    video.addEventListener('ended', () => {
        isPlaying = false;
        playPauseBtn.textContent = '▶';
        showPlayButton();
    });

    videoWrapper.addEventListener('mousemove', () => {
        if (isPlaying) {
            showControlsTemporarily();
            showPlayButton();
        }
    });

    videoWrapper.addEventListener('mouseleave', () => {
        if (isPlaying) {
            videoWrapper.classList.remove('controls-visible');
            hidePlayButton();
        }
    });

    // Fallback: remove loading after 5s
    setTimeout(() => {
        if (videoWrapper.classList.contains('loading')) {
            videoWrapper.classList.remove('loading');
            loadingText.classList.add('hidden');
        }
    }, 5000);
}

document.addEventListener('DOMContentLoaded', initVideoPlayer);