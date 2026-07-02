/**
 * NovaLearn - Main JavaScript
 * Designed by Eng. Tariq Zeyad
 * Palestine - Gaza Strip
 */

(function() {
  // ============================================
  // THEME TOGGLE (Dark/Light Mode)
  // ============================================
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle?.querySelector('i');
  
  const savedTheme = localStorage.getItem('novalearn-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  themeToggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('novalearn-theme', next);
    updateThemeIcon(next);
  });
  
  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  // ============================================
  // SEARCH OVERLAY
  // ============================================
  const searchOverlay = document.getElementById('searchOverlay');
  
  document.addEventListener('click', (e) => {
    if (e.target.closest('.search-trigger')) {
      searchOverlay?.classList.add('active');
      searchOverlay?.querySelector('.search-input')?.focus();
    }
    if (e.target.closest('.search-close')) {
      searchOverlay?.classList.remove('active');
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') searchOverlay?.classList.remove('active');
  });

  // ============================================
  // BACK TO TOP
  // ============================================
  const backToTop = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    backToTop?.classList.toggle('visible', window.scrollY > 500);
    document.getElementById('header')?.classList.toggle('scrolled', window.scrollY > 50);
  });
  
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ============================================
  // MOBILE MENU
  // ============================================
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  mobileMenuToggle?.addEventListener('click', function(e) {
    e.stopPropagation();
    mainNav?.classList.toggle('active');
    
    const icon = this.querySelector('i');
    if (mainNav?.classList.contains('active')) {
      icon.className = 'fas fa-times';
    } else {
      icon.className = 'fas fa-bars';
    }
  });

  mainNav?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('active');
      const icon = mobileMenuToggle?.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
    });
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.main-nav') && !e.target.closest('.mobile-menu-toggle')) {
      mainNav?.classList.remove('active');
      const icon = mobileMenuToggle?.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
    }
  });

  // ============================================
  // COURSE FILTERS
  // ============================================
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      document.querySelectorAll('.course-card').forEach(card => {
        const category = card.getAttribute('data-category');
        card.style.display = (filter === 'all' || category === filter) ? '' : 'none';
      });
    });
  });

  // ============================================
  // COURSE CARD CLICK -> ENROLL
  // ============================================
  document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('click', function() {
      window.location.href = 'enroll.html';
    });
  });

  // ============================================
  // ENROLL FORM VALIDATION
  // ============================================
  const enrollForm = document.getElementById('enrollForm');
  
  enrollForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const course = document.getElementById('course');
    
    if (!fullName?.value.trim()) {
      document.getElementById('nameError').textContent = 'Name is required';
      isValid = false;
    }
    
    if (!email?.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      document.getElementById('emailError').textContent = 'Valid email is required';
      isValid = false;
    }
    
    if (!course?.value) {
      document.getElementById('courseError').textContent = 'Please select a course';
      isValid = false;
    }
    
    if (isValid) {
      enrollForm.classList.add('hidden');
      document.getElementById('successMessage')?.classList.remove('hidden');
    }
  });

  // ============================================
  // NEWSLETTER FORM
  // ============================================
  document.getElementById('newsletterForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const input = this.querySelector('input');
    if (input?.value) {
      alert('Thank you for subscribing! - Eng. Tariq Zeyad');
      input.value = '';
    }
  });

  console.log('🚀 NovaLearn ready! | Designed by Eng. Tariq Zeyad | Palestine - Gaza Strip');
})();