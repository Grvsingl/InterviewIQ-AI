    document.addEventListener('DOMContentLoaded', function() {

      // Scroll Reveal
      const reveals = document.querySelectorAll('.reveal');

      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      reveals.forEach(el => revealObserver.observe(el));

      // FAQ Accordion
      const faqItems = document.querySelectorAll('.faq-item');

      faqItems.forEach(item => {
        const heading = item.querySelector('h4');

        heading.addEventListener('click', function() {
          const isActive = item.classList.contains('active');
          faqItems.forEach(f => f.classList.remove('active'));
          if (!isActive) {
            item.classList.add('active');
          }
        });

        heading.setAttribute('role', 'button');
        heading.setAttribute('tabindex', '0');
        heading.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
          }
        });
      });

      // Navbar scroll effect
      const navbar = document.getElementById('navbar');

      window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > 40) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }, { passive: true });

      // Smooth scroll for nav links
      document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            e.preventDefault();
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
          }
        });
      });

    });