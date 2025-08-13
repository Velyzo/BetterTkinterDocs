// BetterTkinter Documentation - Modern JavaScript Framework
// ========================================================

class BetterTkinterDocs {
  constructor() {
    this.init();
  }

  init() {
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
    } else {
      this.onDOMReady();
    }
  }

  onDOMReady() {
    this.initNavigation();
    this.initSearch();
    this.initScrollEffects();
    this.initCodeBlocks();
    this.initTabs();
    this.initAnimations();
    this.initTooltips();
    this.initMobileMenu();
    this.initThemeToggle();
  }

  // Navigation System
  initNavigation() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const elementPosition = targetElement.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // Active navigation highlighting
    this.updateActiveNavigation();
    window.addEventListener('scroll', () => this.updateActiveNavigation());

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }
  }

  updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"], .sidebar-nav a[href^="#"], .doc-toc a[href^="#"]');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  // Search Functionality
  initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (!searchInput) return;

    let searchData = [];
    this.loadSearchData().then(data => {
      searchData = data;
    });

    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();
      
      if (query.length < 2) {
        this.hideSearchResults();
        return;
      }

      searchTimeout = setTimeout(() => {
        const results = this.performSearch(query, searchData);
        this.displaySearchResults(results);
      }, 300);
    });

    // Hide search results when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) {
        this.hideSearchResults();
      }
    });

    // Handle search result selection
    document.addEventListener('click', (e) => {
      if (e.target.closest('.search-result-item')) {
        const item = e.target.closest('.search-result-item');
        const url = item.dataset.url;
        if (url) {
          window.location.href = url;
        }
      }
    });
  }

  async loadSearchData() {
    // Simulate loading search data (in a real app, this would be an API call)
    return [
      { title: 'BTkButton', description: 'Customizable button component', url: '/docs/components/BTkButton.html', category: 'Components' },
      { title: 'BTkFrame', description: 'Container frame component', url: '/docs/components/BTkFrame.html', category: 'Components' },
      { title: 'BTkColorPicker', description: 'Color selection widget', url: '/docs/components/BTkColorPicker.html', category: 'Components' },
      { title: 'Installation Guide', description: 'How to install BetterTkinter', url: '/docs/guides/installation.html', category: 'Guides' },
      { title: 'Quick Start', description: 'Get started with BetterTkinter', url: '/docs/guides/quickstart.html', category: 'Guides' },
      { title: 'API Reference', description: 'Complete API documentation', url: '/docs/api/', category: 'API' }
    ];
  }

  performSearch(query, data) {
    const queryLower = query.toLowerCase();
    return data.filter(item => 
      item.title.toLowerCase().includes(queryLower) || 
      item.description.toLowerCase().includes(queryLower) ||
      item.category.toLowerCase().includes(queryLower)
    ).slice(0, 5);
  }

  displaySearchResults(results) {
    let searchResults = document.querySelector('.search-results');
    
    if (!searchResults) {
      searchResults = document.createElement('div');
      searchResults.className = 'search-results';
      document.querySelector('.search-container').appendChild(searchResults);
    }

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-result-item"><div class="search-result-title">No results found</div></div>';
    } else {
      searchResults.innerHTML = results.map(result => `
        <div class="search-result-item" data-url="${result.url}">
          <div class="search-result-title">${result.title}</div>
          <div class="search-result-description">${result.description}</div>
        </div>
      `).join('');
    }

    searchResults.style.display = 'block';
  }

  hideSearchResults() {
    const searchResults = document.querySelector('.search-results');
    if (searchResults) {
      searchResults.style.display = 'none';
    }
  }

  // Scroll Effects
  initScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        hero.style.transform = `translateY(${parallax}px)`;
      });
    }

    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.card, .component-card, .stat-card, .testimonial').forEach(el => {
      observer.observe(el);
    });
  }

  // Code Block Functionality
  initCodeBlocks() {
    document.querySelectorAll('pre code').forEach(block => {
      // Create wrapper if it doesn't exist
      if (!block.parentElement.querySelector('.code-header')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block';
        
        const header = document.createElement('div');
        header.className = 'code-header';
        
        const language = this.detectLanguage(block);
        header.innerHTML = `
          <span class="code-language">${language}</span>
          <button class="code-copy-btn" onclick="btDocs.copyCode(this)">Copy</button>
        `;
        
        block.parentElement.parentElement.insertBefore(wrapper, block.parentElement);
        wrapper.appendChild(header);
        wrapper.appendChild(block.parentElement);
      }
    });

    // Add syntax highlighting
    this.applySyntaxHighlighting();
  }

  detectLanguage(codeBlock) {
    const code = codeBlock.textContent;
    if (code.includes('import tkinter') || code.includes('import bettertkinter')) return 'Python';
    if (code.includes('npm install') || code.includes('pip install')) return 'Shell';
    if (code.includes('<!DOCTYPE html')) return 'HTML';
    if (code.includes('function') || code.includes('const ')) return 'JavaScript';
    return 'Text';
  }

  applySyntaxHighlighting() {
    document.querySelectorAll('pre code').forEach(block => {
      let html = block.innerHTML;
      
      // Basic Python syntax highlighting
      html = html.replace(/\b(import|from|def|class|if|else|elif|for|while|try|except|with|as|return|yield|lambda|and|or|not|in|is|True|False|None)\b/g, '<span class="code-keyword">$1</span>');
      html = html.replace(/(["'])((?:\\.|[^\\])*?)\1/g, '<span class="code-string">$1$2$1</span>');
      html = html.replace(/#.*/g, '<span class="code-comment">$&</span>');
      html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="code-number">$1</span>');
      html = html.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, '<span class="code-function">$1</span>');
      
      block.innerHTML = html;
    });
  }

  copyCode(button) {
    const codeBlock = button.closest('.code-block').querySelector('code');
    const text = codeBlock.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      button.style.background = 'var(--success-color)';
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy code:', err);
      this.showNotification('Failed to copy code', 'error');
    });
  }

  // Tabs Functionality
  initTabs() {
    document.querySelectorAll('.tab-button').forEach(button => {
      button.addEventListener('click', () => {
        const tabsContainer = button.closest('.tabs');
        const targetId = button.dataset.tab;
        
        // Remove active class from all buttons and content
        tabsContainer.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        tabsContainer.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const targetContent = tabsContainer.querySelector(`[data-tab-content="${targetId}"]`);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  }

  // Animation System
  initAnimations() {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-cta');
    animatedElements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.2}s`;
    });

    // Stagger card animations
    document.querySelectorAll('.grid .card').forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
    });
  }

  // Tooltips
  initTooltips() {
    document.querySelectorAll('[data-tooltip]').forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        this.showTooltip(e.target, e.target.dataset.tooltip);
      });
      
      element.addEventListener('mouseleave', () => {
        this.hideTooltip();
      });
    });
  }

  showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
      position: absolute;
      background: var(--dark-bg-tertiary);
      color: var(--dark-text-primary);
      padding: 0.5rem 0.75rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      z-index: 10000;
      pointer-events: none;
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--gray-700);
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
    
    this.currentTooltip = tooltip;
  }

  hideTooltip() {
    if (this.currentTooltip) {
      this.currentTooltip.remove();
      this.currentTooltip = null;
    }
  }

  // Mobile Menu
  initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.navbar-nav');
    
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
      });

      // Close mobile menu when clicking on a link
      navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          mobileToggle.classList.remove('active');
        });
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          mobileToggle.classList.remove('active');
        }
      });
    }
  }

  // Theme Toggle (for future use)
  initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
      });

      // Load saved theme
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
      }
    }
  }

  // Notification System
  showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌'
    };

    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <span style="font-size: 1.2em;">${icons[type] || icons.info}</span>
        <span style="flex: 1;">${message}</span>
        <button onclick="this.parentElement.parentElement.remove()" 
                style="background: none; border: none; color: inherit; cursor: pointer; 
                       font-size: 1.2em; padding: 0.2rem; border-radius: 4px; 
                       transition: background 0.2s;"
                onmouseover="this.style.background='rgba(255,255,255,0.2)'"
                onmouseout="this.style.background='none'">×</button>
      </div>
    `;

    const colors = {
      info: '#3b82f6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    };

    Object.assign(notification.style, {
      position: 'fixed',
      top: '100px',
      right: '20px',
      background: colors[type] || colors.info,
      color: 'white',
      padding: '1rem 1.5rem',
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)',
      zIndex: '10000',
      maxWidth: '400px',
      minWidth: '300px',
      animation: 'slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.1)',
      fontWeight: '500'
    });

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentElement) {
        notification.style.animation = 'slideOut 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => notification.remove(), 400);
      }
    }, duration);

    return notification;
  }

  // Utility Functions
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function(...args) {
      if (!lastRan) {
        func(...args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if ((Date.now() - lastRan) >= limit) {
            func(...args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }

  // API for external use
  scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const elementPosition = element.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  showLoading(message = 'Loading...') {
    const loader = document.createElement('div');
    loader.className = 'loading-overlay';
    loader.innerHTML = `
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <div class="loading-text">${message}</div>
      </div>
    `;
    
    loader.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 15, 35, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      backdrop-filter: blur(5px);
    `;
    
    document.body.appendChild(loader);
    return loader;
  }

  hideLoading() {
    const loader = document.querySelector('.loading-overlay');
    if (loader) {
      loader.remove();
    }
  }
}

// Add CSS for loading spinner
const loadingCSS = `
.loading-content {
  text-align: center;
  color: var(--dark-text-primary);
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(99, 102, 241, 0.3);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

.loading-text {
  font-size: 1.1rem;
  font-weight: 500;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOut {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(100%); opacity: 0; }
}

.animate-in {
  animation: fadeInUp 0.6s ease forwards;
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = loadingCSS;
document.head.appendChild(style);

// Initialize the application
const btDocs = new BetterTkinterDocs();

// Export for global access
window.btDocs = btDocs;
