// ============================================================
// AUTH.JS – enhanced with smooth interactions & demo login
// ============================================================
document.addEventListener('DOMContentLoaded', function() {

    // ---------- TAB TOGGLE ----------
    const tabs = document.querySelectorAll('.auth-tab');
    const panels = {
        login: document.getElementById('panel-login'),
        signup: document.getElementById('panel-signup')
    };
    const switchLinks = document.querySelectorAll('[data-switch]');

    function switchTab(tabId) {
        tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
        Object.keys(panels).forEach(key => {
            panels[key].classList.toggle('active', key === tabId);
        });
        document.querySelectorAll('form').forEach(f => f.reset());
        const fill = document.getElementById('strength-fill');
        if (fill) { fill.style.width = '0%'; }
        const txt = document.getElementById('strength-text');
        if (txt) { txt.textContent = 'Weak'; }
        if (fill) { fill.style.background = '#e5e7eb'; }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });

    switchLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            switchTab(this.dataset.switch);
        });
    });

    // ---------- PASSWORD TOGGLE ----------
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.closest('.input-group').querySelector('input');
            if (!input) return;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            const svg = this.querySelector('svg');
            if (svg) {
                if (type === 'text') {
                    svg.innerHTML =
                        '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
                } else {
                    svg.innerHTML =
                        '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
                }
            }
        });
    });

    // ---------- PASSWORD STRENGTH (signup) ----------
    const pwdInput = document.getElementById('signup-password');
    const strengthFill = document.getElementById('strength-fill');
    const strengthText = document.getElementById('strength-text');

    if (pwdInput && strengthFill && strengthText) {
        pwdInput.addEventListener('input', function() {
            const val = this.value;
            let score = 0;
            if (val.length >= 6) score++;
            if (val.length >= 10) score++;
            if (/[a-z]/.test(val) && /[A-Z]/.test(val)) score++;
            if (/\d/.test(val)) score++;
            if (/[^a-zA-Z0-9]/.test(val)) score++;

            const pct = Math.min(score / 5 * 100, 100);
            strengthFill.style.width = pct + '%';

            const colors = ['#ef4444', '#f59e0b', '#fbbf24', '#34d399', '#10b981'];
            const labels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
            const idx = Math.min(Math.floor(score), 4);
            strengthFill.style.background = colors[idx] || '#e5e7eb';
            strengthText.textContent = labels[idx] || 'Weak';
        });
    }

    // ---------- LOGIN FORM with demo credentials ----------
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        // Demo credentials check
        if (email === 'admin@gmail.com' && password === 'admin1234') {
            // Save user session
            const userData = {
                name: 'Admin',
                email: 'admin@gmail.com',
                role: 'Administrator',
                education: 'B.Tech Computer Science',
                level: '85'
            };
            localStorage.setItem('interviewiq_user', JSON.stringify(userData));
            localStorage.setItem('interviewiq_session', JSON.stringify({ loggedIn: true, email: email }));

            // Redirect to dashboard
            window.location.href = '../dashboard_page/dashboard.html';
        } else {
            alert('Invalid credentials! Use admin@gmail.com / admin1234');
        }
    });

    // ---------- SIGNUP FORM ----------
    document.getElementById('signup-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const terms = document.getElementById('terms-check');
        if (!terms.checked) {
            alert('Please accept the Terms of Service.');
            return;
        }
        const pwd = document.getElementById('signup-password').value;
        const confirm = document.getElementById('signup-confirm').value;
        if (pwd !== confirm) {
            alert('Passwords do not match.');
            return;
        }

        const name = document.getElementById('signup-name').value.trim() || 'New User';
        const email = document.getElementById('signup-email').value.trim();

        // Save user data
        const userData = {
            name: name,
            email: email,
            role: 'Professional',
            education: 'Not specified',
            level: '50'
        };
        localStorage.setItem('interviewiq_user', JSON.stringify(userData));
        localStorage.setItem('interviewiq_session', JSON.stringify({ loggedIn: true, email: email }));

        alert('Account created successfully! Redirecting to dashboard...');
        window.location.href = '../dashboard_page/dashboard.html';
    });

});