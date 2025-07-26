// ===== THEME TOGGLE FUNCTIONALITY =====
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.html = document.documentElement;
    this.themeIcon = this.themeToggle.querySelector('i');
    
    this.init();
  }

  init() {
    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    this.html.setAttribute('data-theme', currentTheme);
    this.updateThemeIcon(currentTheme);
    
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  }

  toggleTheme() {
    const currentTheme = this.html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    this.html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    this.updateThemeIcon(newTheme);
    
    // Add transition effect
    this.html.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      this.html.style.transition = '';
    }, 300);
  }

  updateThemeIcon(theme) {
    if (theme === 'dark') {
      this.themeIcon.className = 'fas fa-moon';
    } else {
      this.themeIcon.className = 'fas fa-sun';
    }
  }
}

// ===== VIDEO CONTROLS =====
class VideoController {
  constructor() {
    this.video = document.getElementById('bg-video');
    this.muteButton = document.getElementById('muteButton');
    this.muteIcon = document.getElementById('muteIcon');
    this.playBtn = document.getElementById('playVideoBtn');
    
    this.init();
  }

  init() {
    this.video.play().catch(() => {
      this.playBtn.style.display = 'block';
    });

    this.playBtn.addEventListener('click', () => this.playVideo());
    this.muteButton.addEventListener('click', () => this.toggleMute());
    this.updateMuteIcon();
  }

  playVideo() {
    this.video.muted = false;
    this.video.play();
    this.playBtn.style.display = 'none';
  }

  toggleMute() {
    this.video.muted = !this.video.muted;
    this.video.play();
    this.updateMuteIcon();
  }

  updateMuteIcon() {
    if (this.video.muted) {
      this.muteIcon.classList.remove('fa-volume-up');
      this.muteIcon.classList.add('fa-volume-mute');
    } else {
      this.muteIcon.classList.remove('fa-volume-mute');
      this.muteIcon.classList.add('fa-volume-up');
    }
  }
}

// ===== TYPING ANIMATION =====
class TypingAnimation {
  constructor() {
    this.typingTitle = document.querySelector('.typing-title');
    this.text = 'izare';
    this.idx = 0;
    
    this.start();
  }

  start() {
    this.typeTitle();
  }

  typeTitle() {
    if (this.idx <= this.text.length) {
      this.typingTitle.textContent = this.text.slice(0, this.idx);
      this.idx++;
      setTimeout(() => this.typeTitle(), 180);
    } else {
      setTimeout(() => {
        this.idx = 0;
        this.typeTitle();
      }, 1200);
    }
  }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
  constructor() {
    this.faders = document.querySelectorAll('.fade-in-section');
    this.appearOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -40px 0px'
    };
    
    this.init();
  }

  init() {
    this.appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, this.appearOptions);

    this.faders.forEach(fader => {
      this.appearOnScroll.observe(fader);
    });
  }
}

// ===== SPLASH SCREEN =====
class SplashScreen {
  constructor() {
    this.splash = document.getElementById('splash');
    this.mainContent = document.getElementById('mainContent');
    this.aboutMe = document.getElementById('about-me');
    this.experience = document.getElementById('experience');
    this.musicPlayer = document.getElementById('music-player');
    this.video = document.getElementById('bg-video');
    this.playBtn = document.getElementById('playVideoBtn');
    
    this.init();
  }

  init() {
    // Hide content initially
    this.mainContent.style.display = 'none';
    this.aboutMe.style.display = 'none';
    this.experience.style.display = '';
    this.musicPlayer.style.display = 'none';
    this.playBtn.style.display = 'none';

    document.getElementById('enterButton').addEventListener('click', () => this.enterWebsite());
  }

  enterWebsite() {
    // Fade out splash screen
    this.splash.style.opacity = '0';
    this.splash.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
      this.splash.style.display = 'none';
      this.mainContent.style.display = 'flex';
      this.aboutMe.style.display = '';
      this.experience.style.display = '';
      this.musicPlayer.style.display = '';
      this.video.muted = false;
      this.video.play();
      
      // Trigger entrance animation
      this.mainContent.style.opacity = '0';
      this.mainContent.style.transform = 'translateY(20px)';
      setTimeout(() => {
        this.mainContent.style.transition = 'all 0.8s ease';
        this.mainContent.style.opacity = '1';
        this.mainContent.style.transform = 'translateY(0)';
      }, 100);
    }, 300);
  }
}

// ===== SMOOTH SCROLLING =====
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// 3d efek
class CardEffects {
  constructor() {
    this.cards = document.querySelectorAll('.glass-card');
    this.init();
  }

  init() {
    this.cards.forEach(card => {
      card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
      card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
    });
  }

  handleMouseMove(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  }

  handleMouseLeave(card) {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  }
}

// parallax
class ParallaxEffect {
  constructor() {
    this.video = document.getElementById('bg-video');
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      this.video.style.transform = `translateY(${rate}px)`;
    });
  }
}

// particle bg =====
class ParticleBackground {
  constructor() {
    this.canvas = document.getElementById('particleCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 30; // Reduced from 50
    this.maxSpeed = 0.5; // Reduced from 1
    this.connectionDistance = 100; // Reduced from 150
    
    this.init();
  }

  init() {
    this.resizeCanvas();
    this.createParticles();
    this.animate();
    
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.maxSpeed,
        vy: (Math.random() - 0.5) * this.maxSpeed,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1 // Reduced opacity
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw particles
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      this.ctx.fill();
    });
    
    // Draw connections
    this.particles.forEach((particle, i) => {
      this.particles.slice(i + 1).forEach(otherParticle => {
        const distance = Math.sqrt(
          Math.pow(particle.x - otherParticle.x, 2) + 
          Math.pow(particle.y - otherParticle.y, 2)
        );
        
        if (distance < this.connectionDistance) {
          const opacity = (1 - distance / this.connectionDistance) * 0.1; // Reduced opacity
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      });
    });
    
    requestAnimationFrame(() => this.animate());
  }
}


// ===== SPOTIFY API INTEGRATION =====
class SpotifyIntegration {
  constructor() {
    // Authorization token from Spotify (you can replace this with your own token)
    this.token = 'BQCfx6aDCEny_mbsBxHpZBZBykMwzybYTDpzQvN1K3jLjD8Z7P6CxJcmd7xpr8WAaOXs9saWA9dPWqxaHvNWdGhNV_FbHBOpnMqsATAfElvN_w3CJXEQyBjIePOFf02RFXvWl9BuWJcqlcEnL7S-p9eR57AyBPKFjTLYQ_QDXC-Sm8NR3GiUURe4vYJTiEF1LFNpCXSNaDuAvoS6pCsg7rLLipwRPLHuGEwz1TCcs1lwkZZL-ruRkRfM72OLsZiKmxe8y1pT4T_RGjXVprv9Q0cgYNlgSyzN6vgB4y4QI6OaprCM1z-wD_ongRpa4zDZ';
    this.playlistId = '2EkVbsd4E9OGIjdevWNJud';
    this.currentTrack = null;
    this.isPlaying = false;
    this.progressInterval = null;
    
    this.init();
  }

  async fetchWebApi(endpoint, method, body) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      method,
      body: body ? JSON.stringify(body) : undefined
    });
    return await res.json();
  }

  async getCurrentlyPlaying() {
    try {
      const data = await this.fetchWebApi('v1/me/player/currently-playing', 'GET');
      return data;
    } catch (error) {
      console.error('Error fetching currently playing:', error);
      return null;
    }
  }

  async getTopTracks() {
    try {
      const data = await this.fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=5', 'GET');
      return data.items || [];
    } catch (error) {
      console.error('Error fetching top tracks:', error);
      return [];
    }
  }

  async getPlaylist() {
    try {
      const data = await this.fetchWebApi(`v1/playlists/${this.playlistId}`, 'GET');
      return data;
    } catch (error) {
      console.error('Error fetching playlist:', error);
      return null;
    }
  }

}

// ===== MAIN APPLICATION =====
class App {
  constructor() {
    this.init();
  }

  init() {
    // Initialize all components
    this.themeManager = new ThemeManager();
    this.videoController = new VideoController();
    this.typingAnimation = new TypingAnimation();
    this.scrollAnimations = new ScrollAnimations();
    this.splashScreen = new SplashScreen();
    this.smoothScroll = new SmoothScroll();
    this.cardEffects = new CardEffects();
    this.parallaxEffect = new ParallaxEffect();
    this.particleBackground = new ParticleBackground();
    this.musicPlayer = new MusicPlayer(); // Initialize MusicPlayer
    this.spotifyIntegration = new SpotifyIntegration(); // Initialize SpotifyIntegration

    // Add some additional interactive features
    this.addKeyboardShortcuts();
    this.addTouchSupport();
  }

  addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Toggle theme with 'T' key
      if (e.key.toLowerCase() === 't' && e.ctrlKey) {
        e.preventDefault();
        this.themeManager.toggleTheme();
      }
      
      // Toggle mute with 'M' key
      if (e.key.toLowerCase() === 'm' && e.ctrlKey) {
        e.preventDefault();
        this.videoController.toggleMute();
      }
    });
  }

  addTouchSupport() {
    // Add touch support for mobile devices
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;
      
      // Swipe up gesture
      if (diffY > 50 && Math.abs(diffX) < 50) {
        // Could add swipe up functionality here
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});


if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    App,
    ThemeManager,
    VideoController,
    TypingAnimation,
    ScrollAnimations,
    SplashScreen,
    SmoothScroll,
    CardEffects,
    ParallaxEffect,
    ParticleBackground,
    MusicPlayer, 
    Utils,
    SpotifyIntegration
  };
} 