document.addEventListener('DOMContentLoaded', function() {

            // ============================================================
            // SESSION CHECK – redirect to login if no session
            // ============================================================
            const session = JSON.parse(localStorage.getItem('interviewiq_session') || 'null');
            if (!session) {
                window.location.href = '../login_page/login.html';
                return;
            }

            // ============================================================
            // LOAD USER DATA from localStorage
            // ============================================================
            function loadUser() {
                const user = JSON.parse(localStorage.getItem('interviewiq_user') || 'null');
                if (!user) {
                    const sessionData = JSON.parse(localStorage.getItem('interviewiq_session') || '{}');
                    if (sessionData.email) {
                        const fallbackUser = {
                            name: 'Admin',
                            email: sessionData.email || 'admin@gmail.com',
                            role: 'Administrator',
                            education: 'B.Tech Computer Science',
                            level: '85'
                        };
                        localStorage.setItem('interviewiq_user', JSON.stringify(fallbackUser));
                        return loadUser();
                    }
                    return;
                }

                const name = user.name || 'Admin';
                const email = user.email || 'admin@gmail.com';
                const initial = name.charAt(0).toUpperCase();

                document.getElementById('avatarInitial').textContent = initial;
                document.getElementById('userNameDisplay').textContent = name;
                document.getElementById('welcomeGreeting').textContent = `Good Morning, ${name} 👋`;
                document.getElementById('profileName').textContent = name;
                document.getElementById('profileEmail').textContent = email;
                document.getElementById('profileAvatar').textContent = initial;

                if (user.role) {
                    document.getElementById('userRoleDisplay').textContent = user.role;
                }
                if (user.education) {
                    document.getElementById('profileEducation').textContent = user.education;
                }
                if (user.level) {
                    document.getElementById('profileProgress').textContent = user.level;
                }

                document.getElementById('welcomeSub').textContent = `Ready to ace your next interview, ${name}? You're doing great!`;
            }

            loadUser();

            // ============================================================
            // LOGOUT
            // ============================================================
            function logout() {
                localStorage.removeItem('interviewiq_session');
                localStorage.removeItem('interviewiq_user');
                window.location.href = '../login_page/login.html';
            }

            document.getElementById('logoutBtn').addEventListener('click', function(e) {
                e.preventDefault();
                logout();
            });

            // ============================================================
            // SIDEBAR TOGGLE
            // ============================================================
            const sidebar = document.getElementById('dashSidebar');
            const overlay = document.getElementById('sidebarOverlay');
            const menuToggle = document.getElementById('menuToggle');

            function toggleSidebar() {
                sidebar.classList.toggle('open');
                overlay.classList.toggle('active');
            }

            menuToggle.addEventListener('click', toggleSidebar);
            overlay.addEventListener('click', toggleSidebar);

            document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
                item.addEventListener('click', function(e) {
                    if (window.innerWidth <= 1024) {
                        sidebar.classList.remove('open');
                        overlay.classList.remove('active');
                    }
                    document.querySelectorAll('.sidebar-nav .nav-item').forEach(n => n.classList.remove('active'));
                    this.classList.add('active');
                });
            });

            // ============================================================
            // SIDEBAR NAVIGATION
            // ============================================================
            document.querySelectorAll('.sidebar-nav .nav-item[data-section]').forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    const section = this.dataset.section;
                    const target = document.getElementById(section);
                    if (target) {
                        const topbar = document.querySelector('.dash-topbar');
                        const offset = topbar.offsetHeight + 20;
                        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
                        window.scrollTo({ top: targetPos, behavior: 'smooth' });
                    }
                });
            });

            // ============================================================
            // SEARCH
            // ============================================================
            const searchInput = document.getElementById('globalSearch');
            searchInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && this.value.trim()) {
                    showToast('🔍', 'Searching: "' + this.value.trim() + '"');
                    const query = this.value.trim().toLowerCase();
                    document.querySelectorAll('.dash-section').forEach(section => {
                        const text = section.textContent.toLowerCase();
                        section.style.display = text.includes(query) ? '' : 'none';
                    });
                    this.value = '';
                }
            });

            searchInput.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    document.querySelectorAll('.dash-section').forEach(s => s.style.display = '');
                }
            });

            // ============================================================
            // NOTIFICATIONS
            // ============================================================
            document.getElementById('notifBtn').addEventListener('click', function() {
                showToast('🔔', 'You have 3 new notifications');
            });

            // ============================================================
            // THEME TOGGLE
            // ============================================================
            let darkMode = localStorage.getItem('interviewiq_theme') === 'dark';

            function applyTheme(isDark) {
                const icon = document.querySelector('#themeToggle i');
                if (isDark) {
                    icon.className = 'fas fa-sun';
                    document.body.style.background = '#1a1a2e';
                    document.body.style.color = '#e5e7eb';
                    document.querySelector('.dash-wrapper').style.background = '#1a1a2e';
                    document.querySelector('.dash-main').style.background = 'transparent';
                    document.querySelector('.dash-topbar').style.background = 'rgba(26,26,46,0.85)';
                    document.querySelector('.dash-topbar').style.borderBottom = '1px solid rgba(255,255,255,0.04)';
                    document.querySelectorAll('.dash-card').forEach(c => {
                        c.style.background = 'rgba(255,255,255,0.04)';
                        c.style.borderColor = 'rgba(255,255,255,0.02)';
                    });
                    document.querySelectorAll('.dash-card .card-value').forEach(c => c.style.color = '#e5e7eb');
                    document.querySelectorAll('.dash-card .card-title').forEach(c => c.style.color = '#9ca3af');
                    document.querySelectorAll('.dash-card .card-sub').forEach(c => c.style.color = '#9ca3af');
                    document.querySelectorAll('.welcome-banner').forEach(c => {
                        c.style.background = 'rgba(108,99,255,0.04)';
                        c.style.borderColor = 'rgba(255,255,255,0.02)';
                    });
                    document.querySelectorAll('.greeting h1').forEach(c => c.style.color = '#e5e7eb');
                    document.querySelectorAll('.greeting p').forEach(c => c.style.color = '#9ca3af');
                    document.querySelectorAll('.quick-action-item').forEach(c => c.style.background =
                        'rgba(255,255,255,0.04)');
                    document.querySelectorAll('.interview-card').forEach(c => c.style.background =
                        'rgba(255,255,255,0.04)');
                    document.querySelector('.dash-sidebar').style.background = 'rgba(26,26,46,0.85)';
                    document.querySelector('.dash-sidebar').style.borderRight =
                        '1px solid rgba(255,255,255,0.02)';
                    document.querySelectorAll('.sidebar-nav .nav-item').forEach(c => c.style.color = '#9ca3af');
                    document.querySelectorAll('.sidebar-nav .nav-item.active').forEach(c => c.style.color =
                        '#6C63FF');
                    document.querySelector('.topbar-search').style.background = 'rgba(255,255,255,0.04)';
                    document.querySelector('.topbar-search input').style.color = '#e5e7eb';
                    document.querySelector('.user-profile-mini').style.background = 'rgba(255,255,255,0.04)';
                    document.querySelector('.user-profile-mini .user-name').style.color = '#e5e7eb';
                    document.querySelector('.topbar-actions .icon-btn').style.background =
                        'rgba(255,255,255,0.04)';
                    document.querySelectorAll('.badge-item').forEach(c => c.style.background =
                        'rgba(255,255,255,0.04)');
                    document.querySelector('.upload-area').style.borderColor = 'rgba(255,255,255,0.04)';
                    document.querySelector('.upload-area .text').style.color = '#9ca3af';
                    document.querySelectorAll('.dash-card .skill-label').forEach(c => c.style.color = '#9ca3af');
                    document.querySelectorAll('.dash-card .skill-label span').forEach(c => c.style.color =
                        '#9ca3af');
                    document.querySelector('.progress-ring .inner').style.background = '#1a1a2e';
                    document.querySelector('.progress-ring .inner').style.color = '#6C63FF';
                    document.querySelectorAll('.dash-footer').forEach(c => c.style.color = '#9ca3af');
                    document.querySelectorAll('.dash-footer .links a').forEach(c => c.style.color = '#9ca3af');
                    document.querySelectorAll('.section-header h2').forEach(c => c.style.color = '#e5e7eb');
                    document.querySelectorAll('.section-header .see-all').forEach(c => c.style.color = '#6C63FF');
                    document.querySelectorAll('.interview-card .title').forEach(c => c.style.color = '#e5e7eb');
                    document.querySelectorAll('.interview-card .meta').forEach(c => c.style.color = '#9ca3af');
                    document.querySelectorAll('.badge-item').forEach(c => c.style.color = '#e5e7eb');
                    document.querySelectorAll('.dash-card .stat-row .card-value').forEach(c => c.style.color =
                        '#e5e7eb');
                    document.querySelectorAll('.dash-card .stat-row .card-icon').forEach(c => c.style.color =
                        '#9ca3af');
                    document.querySelectorAll('.dash-card .stat-row .card-sub').forEach(c => c.style.color =
                        '#9ca3af');
                    document.querySelectorAll('.dash-card .stat-row .card-title').forEach(c => c.style.color =
                        '#9ca3af');
                    document.querySelectorAll('.dash-card .stat-row .card-value .accent').forEach(c => c.style
                        .color = '#6C63FF');
                    document.querySelectorAll('.dash-card .card-value .accent').forEach(c => c.style.color =
                        '#6C63FF');
                } else {
                    icon.className = 'fas fa-moon';
                    document.body.style.background = '#f7f6fc';
                    document.body.style.color = '#111827';
                    document.querySelector('.dash-wrapper').style.background = '#f7f6fc';
                    document.querySelector('.dash-main').style.background = 'transparent';
                    document.querySelector('.dash-topbar').style.background = 'rgba(247,246,252,0.85)';
                    document.querySelector('.dash-topbar').style.borderBottom =
                        '1px solid rgba(108,99,255,0.03)';
                    document.querySelectorAll('.dash-card').forEach(c => {
                        c.style.background = 'rgba(255,255,255,0.6)';
                        c.style.borderColor = 'rgba(255,255,255,0.5)';
                    });
                    document.querySelectorAll('.dash-card .card-value').forEach(c => c.style.color = '#111827');
                    document.querySelectorAll('.dash-card .card-title').forEach(c => c.style.color = '#6b7280');
                    document.querySelectorAll('.dash-card .card-sub').forEach(c => c.style.color = '#6b7280');
                    document.querySelectorAll('.welcome-banner').forEach(c => {
                        c.style.background = 'linear-gradient(135deg, rgba(108,99,255,0.04), rgba(168,85,247,0.02))';
                        c.style.borderColor = 'rgba(108,99,255,0.04)';
                    });
                    document.querySelectorAll('.greeting h1').forEach(c => c.style.color = '#111827');
                    document.querySelectorAll('.greeting p').forEach(c => c.style.color = '#6b7280');
                    document.querySelectorAll('.quick-action-item').forEach(c => c.style.background =
                        'rgba(255,255,255,0.4)');
                    document.querySelectorAll('.interview-card').forEach(c => c.style.background =
                        'rgba(255,255,255,0.4)');
                    document.querySelector('.dash-sidebar').style.background = 'rgba(255,255,255,0.75)';
                    document.querySelector('.dash-sidebar').style.borderRight =
                        '1px solid rgba(108,99,255,0.04)';
                    document.querySelectorAll('.sidebar-nav .nav-item').forEach(c => c.style.color = '#4b5563');
                    document.querySelectorAll('.sidebar-nav .nav-item.active').forEach(c => c.style.color =
                        '#6C63FF');
                    document.querySelector('.topbar-search').style.background = 'rgba(255,255,255,0.5)';
                    document.querySelector('.topbar-search input').style.color = '#111827';
                    document.querySelector('.user-profile-mini').style.background = 'rgba(255,255,255,0.4)';
                    document.querySelector('.user-profile-mini .user-name').style.color = '#111827';
                    document.querySelector('.topbar-actions .icon-btn').style.background =
                        'rgba(255,255,255,0.4)';
                    document.querySelectorAll('.badge-item').forEach(c => c.style.background =
                        'rgba(255,255,255,0.5)');
                    document.querySelector('.upload-area').style.borderColor = 'rgba(108,99,255,0.1)';
                    document.querySelector('.upload-area .text').style.color = '#6b7280';
                    document.querySelectorAll('.dash-card .skill-label').forEach(c => c.style.color = '#4b5563');
                    document.querySelectorAll('.dash-card .skill-label span').forEach(c => c.style.color =
                        '#4b5563');
                    document.querySelector('.progress-ring .inner').style.background = '#fff';
                    document.querySelector('.progress-ring .inner').style.color = '#6C63FF';
                    document.querySelectorAll('.dash-footer').forEach(c => c.style.color = '#9ca3af');
                    document.querySelectorAll('.dash-footer .links a').forEach(c => c.style.color = '#9ca3af');
                    document.querySelectorAll('.section-header h2').forEach(c => c.style.color = '#111827');
                    document.querySelectorAll('.section-header .see-all').forEach(c => c.style.color = '#6C63FF');
                    document.querySelectorAll('.interview-card .title').forEach(c => c.style.color = '#111827');
                    document.querySelectorAll('.interview-card .meta').forEach(c => c.style.color = '#6b7280');
                    document.querySelectorAll('.badge-item').forEach(c => c.style.color = '#111827');
                    document.querySelectorAll('.dash-card .stat-row .card-value').forEach(c => c.style.color =
                        '#111827');
                    document.querySelectorAll('.dash-card .stat-row .card-icon').forEach(c => c.style.color =
                        'inherit');
                    document.querySelectorAll('.dash-card .stat-row .card-sub').forEach(c => c.style.color =
                        '#6b7280');
                    document.querySelectorAll('.dash-card .stat-row .card-title').forEach(c => c.style.color =
                        '#6b7280');
                    document.querySelectorAll('.dash-card .stat-row .card-value .accent').forEach(c => c.style
                        .color = '#6C63FF');
                    document.querySelectorAll('.dash-card .card-value .accent').forEach(c => c.style.color =
                        '#6C63FF');
                }
                localStorage.setItem('interviewiq_theme', isDark ? 'dark' : 'light');
            }

            applyTheme(darkMode);

            document.getElementById('themeToggle').addEventListener('click', function() {
                darkMode = !darkMode;
                applyTheme(darkMode);
                showToast('🎨', darkMode ? 'Dark mode enabled' : 'Light mode enabled');
            });

            // ============================================================
            // TOAST NOTIFICATION
            // ============================================================
            function showToast(icon, message) {
                const container = document.getElementById('toastContainer');
                const toast = document.createElement('div');
                toast.className = 'toast';
                toast.innerHTML = `<span class="icon">${icon}</span> ${message}`;
                container.appendChild(toast);
                setTimeout(() => {
                    toast.style.opacity = '0';
                    toast.style.transform = 'translateY(20px) scale(0.96)';
                    toast.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                    setTimeout(() => toast.remove(), 400);
                }, 3000);
            }
            window.showToast = showToast;

            // ============================================================
            // QUICK ACTIONS
            // ============================================================
            document.querySelectorAll('.quick-action-item').forEach(item => {
                item.addEventListener('click', function() {
                    const action = this.dataset.action;
                    const labels = {
                        upload: '📄 Upload Resume',
                        analyze: '🔍 Analyzing Resume...',
                        optimize: '✨ Optimizing Resume...',
                        cover: '📝 Generating Cover Letter...',
                        mock: '🎙️ Starting Mock Interview...',
                        coding: '💻 Starting Coding Practice...',
                        roadmap: '🗺️ Loading Career Roadmap...',
                        jobdesc: '📋 Analyzing Job Description...'
                    };
                    showToast('⚡', labels[action] || 'Action triggered');

                    if (action === 'upload') {
                        document.getElementById('resumeFileInput').click();
                    }
                    if (action === 'mock') {
                        document.getElementById('mock-interviews').scrollIntoView({ behavior: 'smooth' });
                    }
                    if (action === 'roadmap') {
                        document.getElementById('roadmap').scrollIntoView({ behavior: 'smooth' });
                    }
                    if (action === 'jobdesc') {
                        document.getElementById('jdTextarea').focus();
                    }
                });
            });

            // ============================================================
            // RESUME UPLOAD
            // ============================================================
            document.getElementById('resumeUploadArea').addEventListener('click', function() {
                document.getElementById('resumeFileInput').click();
            });

            document.getElementById('resumeFileInput').addEventListener('change', function(e) {
                if (this.files.length > 0) {
                    showToast('📄', `Uploaded: ${this.files[0].name}`);
                }
            });

            // ============================================================
            // IMPROVE RESUME
            // ============================================================
            document.getElementById('improveResumeBtn').addEventListener('click', function() {
                const btn = this;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Improving...';
                btn.style.opacity = '0.7';
                btn.style.pointerEvents = 'none';
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> Improve Resume';
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                    showToast('✨', 'Resume improved successfully!');
                }, 2000);
            });

            // ============================================================
            // JOB DESCRIPTION ANALYZER
            // ============================================================
            document.getElementById('analyzeJdBtn').addEventListener('click', function() {
                const text = document.getElementById('jdTextarea').value.trim();
                if (!text) {
                    showToast('⚠️', 'Please paste a job description first');
                    return;
                }
                const btn = this;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
                btn.style.opacity = '0.7';
                btn.style.pointerEvents = 'none';
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-search"></i> Analyze';
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                    showToast('✅', 'Job description analyzed!');
                }, 1500);
            });

            // ============================================================
            // MOCK INTERVIEW START
            // ============================================================
            document.querySelectorAll('.btn-start[data-interview]').forEach(btn => {
                btn.addEventListener('click', function() {
                    const type = this.dataset.interview;
                    const labels = {
                        hr: 'HR',
                        technical: 'Technical',
                        behavioral: 'Behavioral',
                        coding: 'Coding',
                        voice: 'Voice',
                        video: 'Video'
                    };
                    showToast('🎙️', `Starting ${labels[type] || type} Interview...`);
                    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                    this.style.opacity = '0.7';
                    this.style.pointerEvents = 'none';
                    setTimeout(() => {
                        this.innerHTML = 'Start <i class="fas fa-arrow-right"></i>';
                        this.style.opacity = '1';
                        this.style.pointerEvents = 'auto';
                        showToast('✅', `${labels[type] || type} Interview ready!`);
                    }, 1500);
                });
            });

            // ============================================================
            // RETRY INTERVIEW
            // ============================================================
            document.querySelectorAll('.retry-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const type = this.dataset.retry;
                    showToast('🔄', `Retrying ${type} interview...`);
                    setTimeout(() => {
                        showToast('✅', `${type} interview updated!`);
                    }, 1500);
                });
            });

            // ============================================================
            // SETTINGS CLICK
            // ============================================================
            document.querySelectorAll('[data-setting]').forEach(item => {
                item.addEventListener('click', function() {
                    const setting = this.dataset.setting;
                    const labels = {
                        notifications: '🔔 Notifications settings opened',
                        language: '🌐 Language settings opened',
                        darkmode: '🌙 Dark mode settings opened',
                        privacy: '🔒 Privacy settings opened',
                        account: '👤 Account settings opened'
                    };
                    showToast('⚙️', labels[setting] || 'Settings opened');
                });
            });

            // ============================================================
            // EDIT PROFILE
            // ============================================================
            document.getElementById('editProfileBtn').addEventListener('click', function() {
                const currentName = document.getElementById('profileName').textContent;
                const name = prompt('Enter your full name:', currentName);
                if (name && name.trim()) {
                    const user = JSON.parse(localStorage.getItem('interviewiq_user') || '{}');
                    user.name = name.trim();
                    localStorage.setItem('interviewiq_user', JSON.stringify(user));
                    loadUser();
                    showToast('✅', 'Profile updated successfully!');
                }
            });

            // ============================================================
            // CHARTS
            // ============================================================
            if (typeof Chart !== 'undefined') {
                const ctx1 = document.getElementById('weeklyChart').getContext('2d');
                new Chart(ctx1, {
                    type: 'line',
                    data: {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        datasets: [{
                            label: 'Interview Score',
                            data: [65, 70, 68, 75, 72, 78, 76],
                            borderColor: '#6C63FF',
                            backgroundColor: 'rgba(108,99,255,0.04)',
                            fill: true,
                            tension: 0.4,
                            pointBackgroundColor: '#6C63FF',
                            pointRadius: 3,
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: {
                            y: { beginAtZero: true, max: 100, grid: { color: 'rgba(108,99,255,0.02)' } },
                            x: { grid: { display: false } }
                        }
                    }
                });

                const ctx2 = document.getElementById('monthlyChart').getContext('2d');
                new Chart(ctx2, {
                    type: 'bar',
                    data: {
                        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                        datasets: [{
                            label: 'Progress',
                            data: [60, 68, 72, 78],
                            backgroundColor: ['rgba(108,99,255,0.2)', 'rgba(108,99,255,0.3)',
                                'rgba(108,99,255,0.4)', 'rgba(108,99,255,0.5)'
                            ],
                            borderColor: '#6C63FF',
                            borderWidth: 1.5,
                            borderRadius: 6
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: {
                            y: { beginAtZero: true, max: 100, grid: { color: 'rgba(108,99,255,0.02)' } },
                            x: { grid: { display: false } }
                        }
                    }
                });
            }

            // ============================================================
            // WELCOME TOAST
            // ============================================================
            setTimeout(() => {
                const user = JSON.parse(localStorage.getItem('interviewiq_user') || '{}');
                const name = user.name || 'User';
                showToast('👋', `Welcome back, ${name}! You have tasks pending.`);
            }, 800);

        });