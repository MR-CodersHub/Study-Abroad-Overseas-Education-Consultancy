/* ============================================================
   DASHBOARD JS — Study Upbroad Student Portal
   All UI behaviour, section switching, interactivity
   ============================================================ */
(function () {
  'use strict';

  /* ── Helpers ──────────────────────────────────────────── */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => [...(ctx || document).querySelectorAll(sel)];
  const D = () => window.DashboardData;

  /* ── State ────────────────────────────────────────────── */
  let state = {
    currentSection: 'dashboard',
    notifications: [],
    universities: [],
    applications: [],
    documents: [],
    messages: [],
    appointments: [],
    profileEditing: false
  };

  /* ── Init ─────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    if (!window.DashboardData) {
      console.error('DashboardData not loaded.');
      return;
    }
    initState();
    initTheme();
    initSidebar();
    initHeader();
    renderAllSections();
    initSectionNav();
    navigateTo('dashboard');
    initNotifications();
    initProfileDropdown();
    initExitDemo();
    initAddUniversity();
  });

  function initState() {
    const D = window.DashboardData;
    state.notifications = D.notifications.map(n => ({ ...n }));
    state.universities = D.universities.map(u => ({ ...u }));
    state.applications = D.applications.map(a => ({ ...a }));
    state.documents = D.documents.map(d => ({ ...d }));
    state.messages = D.messages.map(m => ({ ...m }));
    state.appointments = D.appointments.map(a => ({ ...a }));
  }

  /* ── Theme & Direction ────────────────────────────────── */
  function initTheme() {
    const saved = localStorage.getItem('sub_theme') || 'light';
    const savedDir = localStorage.getItem('sub_dir') || 'ltr';
    applyTheme(saved);
    applyDir(savedDir);

    const themeBtn = $('#dashThemeToggle');
    const dirBtn = $('#dashDirToggle');

    if (themeBtn) themeBtn.addEventListener('click', function () {
      const cur = document.documentElement.getAttribute('data-theme') || 'light';
      applyTheme(cur === 'light' ? 'dark' : 'light');
    });

    if (dirBtn) dirBtn.addEventListener('click', function () {
      const cur = document.documentElement.getAttribute('dir') || 'ltr';
      applyDir(cur === 'ltr' ? 'rtl' : 'ltr');
    });

    // Settings theme/dir options
    $$('.settings-theme-option[data-theme-opt]').forEach(el => {
      el.addEventListener('click', function () {
        applyTheme(this.dataset.themeOpt);
        $$('.settings-theme-option[data-theme-opt]').forEach(x => x.classList.remove('active'));
        this.classList.add('active');
      });
    });

    $$('.settings-theme-option[data-dir-opt]').forEach(el => {
      el.addEventListener('click', function () {
        applyDir(this.dataset.dirOpt);
        $$('.settings-theme-option[data-dir-opt]').forEach(x => x.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sub_theme', theme);
    const btn = $('#dashThemeToggle');
    if (btn) {
      const sun = btn.querySelector('.dash-sun-icon');
      const moon = btn.querySelector('.dash-moon-icon');
      if (sun) sun.style.display = theme === 'dark' ? 'none' : 'block';
      if (moon) moon.style.display = theme === 'dark' ? 'block' : 'none';
    }
    // Sync settings option
    $$('.settings-theme-option[data-theme-opt]').forEach(el => {
      el.classList.toggle('active', el.dataset.themeOpt === theme);
    });
  }

  function applyDir(dir) {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
    localStorage.setItem('sub_dir', dir);
    const btn = $('#dashDirToggle');
    if (btn) btn.textContent = dir.toUpperCase();
    $$('.settings-theme-option[data-dir-opt]').forEach(el => {
      el.classList.toggle('active', el.dataset.dirOpt === dir);
    });
  }

  /* ── Sidebar ──────────────────────────────────────────── */
  function initSidebar() {
    const toggle = $('#sidebarToggleBtn');
    const overlay = $('#sidebarOverlay');
    const sidebar = $('#dashSidebar');

    if (toggle) toggle.addEventListener('click', function () {
      openSidebar();
    });

    if (overlay) overlay.addEventListener('click', function () {
      closeSidebar();
    });

    function openSidebar() {
      if (sidebar) sidebar.classList.add('open');
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
      if (sidebar) sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    window.closeSidebar = closeSidebar;
  }

  /* ── Section Navigation ───────────────────────────────── */
  function initSectionNav() {
    $$('[data-section]').forEach(el => {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        const sec = this.dataset.section;
        if (sec) {
          navigateTo(sec);
          if (window.closeSidebar) window.closeSidebar();
        }
      });
    });
  }

  function navigateTo(sectionId) {
    state.currentSection = sectionId;

    if (sectionId === 'messages') {
      state.messages.forEach(message => { message.read = true; });
      const messageNotification = state.notifications.find(n => n.section === 'messages');
      if (messageNotification) messageNotification.read = true;
      renderNotifications();
    }

    // Hide all sections
    $$('.dash-section').forEach(s => s.classList.remove('active'));

    // Show target
    const target = $('#section-' + sectionId);
    if (target) target.classList.add('active');

    // Update nav active state
    $$('[data-section]').forEach(el => {
      el.classList.toggle('active', el.dataset.section === sectionId);
    });

    // Update header title
    const pageTitle = $('#dashPageTitle');
    if (pageTitle) {
      const labels = {
        dashboard: 'Overview',
        profile: 'My Profile',
        universities: 'University Shortlist',
        applications: 'My Applications',
        documents: 'My Documents',
        scholarships: 'Scholarships',
        visa: 'Visa Tracker',
        messages: 'Messages',
        appointments: 'Appointments',
        settings: 'Settings'
      };
      pageTitle.textContent = labels[sectionId] || 'Dashboard';
    }

    // Animate progress bars
    setTimeout(() => {
      $$('.dash-progress-fill[data-pct]').forEach(el => {
        el.style.width = el.dataset.pct + '%';
      });
    }, 100);
  }

  /* ── Header ───────────────────────────────────────────── */
  function initHeader() {
    // Notification bell
    const notifBtn = $('#dashNotifBtn');
    const notifDropdown = $('#dashNotifDropdown');

    if (notifBtn) notifBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      notifDropdown && notifDropdown.classList.toggle('show');
      // close avatar dropdown
      const avDrop = $('#dashAvatarDropdown');
      if (avDrop) avDrop.classList.remove('show');
    });

    // Click outside to close
    document.addEventListener('click', function () {
      if (notifDropdown) notifDropdown.classList.remove('show');
      const avDrop = $('#dashAvatarDropdown');
      if (avDrop) avDrop.classList.remove('show');
    });

    if (notifDropdown) notifDropdown.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }

  /* ── Notifications ────────────────────────────────────── */
  function initNotifications() {
    renderNotifications();

    // Mark all read
    const markAllBtn = $('#markAllReadBtn');
    if (markAllBtn) markAllBtn.addEventListener('click', function () {
      state.notifications.forEach(n => n.read = true);
      renderNotifications();
    });
  }

  function renderNotifications() {
    const list = $('#dashNotifList');
    const badge = $('#dashNotifBadge');
    const unread = state.notifications.filter(n => !n.read).length;

    if (badge) {
      badge.textContent = unread;
      badge.style.display = unread > 0 ? 'block' : 'none';
    }
    const messageBadge = $('#unreadMessagesBadge');
    const unreadMessages = state.messages.filter(message => !message.read).length;
    if (messageBadge) {
      messageBadge.textContent = unreadMessages;
      messageBadge.style.display = unreadMessages > 0 ? 'inline-flex' : 'none';
    }

    if (!list) return;

    if (state.notifications.length === 0) {
      list.innerHTML = '<div class="dash-notif-empty">No notifications</div>';
      return;
    }

    list.innerHTML = state.notifications.map(n => `
      <div class="dash-notif-item ${n.read ? 'read' : 'unread'}" data-notif-id="${n.id}" data-section="${n.section}">
        <div class="dash-notif-dot-item"></div>
        <div class="dash-notif-content">
          <div class="dash-notif-text">${n.text}</div>
          <div class="dash-notif-time">${n.time}</div>
        </div>
      </div>
    `).join('');

    $$('.dash-notif-item', list).forEach(el => {
      el.addEventListener('click', function () {
        const id = this.dataset.notifId;
        const sec = this.dataset.section;
        const notif = state.notifications.find(n => n.id === id);
        if (notif) notif.read = true;
        renderNotifications();
        if (sec) navigateTo(sec);
        const nd = $('#dashNotifDropdown');
        if (nd) nd.classList.remove('show');
      });
    });
  }

  /* ── Profile Dropdown ─────────────────────────────────── */
  function initProfileDropdown() {
    const btn = $('#dashAvatarBtn');
    const dropdown = $('#dashAvatarDropdown');

    if (btn) btn.addEventListener('click', function (e) {
      e.stopPropagation();
      dropdown && dropdown.classList.toggle('show');
      const nd = $('#dashNotifDropdown');
      if (nd) nd.classList.remove('show');
    });

    if (dropdown) dropdown.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    // Profile dropdown nav items
    $$('[data-avatar-section]').forEach(el => {
      el.addEventListener('click', function () {
        navigateTo(this.dataset.avatarSection);
        if (dropdown) dropdown.classList.remove('show');
      });
    });
  }

  /* ── Exit Demo ────────────────────────────────────────── */
  function initExitDemo() {
    $$('[data-exit-demo]').forEach(btn => {
      btn.addEventListener('click', function () {
        showConfirmModal(
          'Exit Demo',
          'This will return you to the main website. No session data will be lost as this is a demonstration portal.',
          'Exit to Website',
          function () {
            window.location.href = '../index.html';
          }
        );
      });
    });
  }

  /* ── Add University ───────────────────────────────────── */
  function initAddUniversity() {
    const addBtn = $('#addUniversityBtn');
    if (addBtn) addBtn.addEventListener('click', function () {
      showAddUniversityModal();
    });
  }

  /* ── Render All Sections ──────────────────────────────── */
  function renderAllSections() {
    renderOverview();
    renderJourney();
    renderUniversities();
    renderApplications();
    renderDocuments();
    renderScholarships();
    renderVisa();
    renderMessages();
    renderAppointments();
    renderProfile();
    renderSettings();
  }

  /* ── OVERVIEW ─────────────────────────────────────────── */
  function renderOverview() {
    const data = D();
    const s = data.stats;

    setInner('statUni', s.universitiesShortlisted);
    setInner('statApps', s.activeApplications);
    setInner('statDocs', s.documentsCompleted + ' / ' + s.documentsTotal);
    setInner('statProgress', s.overallProgress + '%');

    // Animate after render
    setTimeout(() => {
      const pctEls = $$('.dash-progress-fill[data-pct]');
      pctEls.forEach(el => { el.style.width = el.dataset.pct + '%'; });
    }, 300);

    // Explore universities button
    const exploreBtn = $('#exploreUnisBtn');
    if (exploreBtn) exploreBtn.addEventListener('click', function () {
      navigateTo('universities');
    });

    // View application details button
    const viewAppBtn = $('#viewApplicationsBtn');
    if (viewAppBtn) viewAppBtn.addEventListener('click', function () {
      navigateTo('applications');
    });
  }

  /* ── JOURNEY ──────────────────────────────────────────── */
  function renderJourney() {
    const container = $('#journeyTimeline');
    if (!container) return;
    const data = D().journey;

    const iconMap = {
      completed: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>`,
      active: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><circle cx="12" cy="12" r="6"/></svg>`,
      pending: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`
    };

    container.innerHTML = data.map(step => `
      <div class="journey-step ${step.status}">
        <div class="journey-node" title="${step.description}">
          ${iconMap[step.status] || iconMap.pending}
        </div>
        <div class="journey-label">${step.title}</div>
        <div class="journey-status-dot">${step.status === 'completed' ? 'Done' : step.status === 'active' ? 'In Progress' : 'Pending'}</div>
      </div>
    `).join('');
  }

  /* ── UNIVERSITIES ─────────────────────────────────────── */
  function renderUniversities() {
    const container = $('#universitiesGrid');
    if (!container) return;

    if (state.universities.length === 0) {
      container.innerHTML = `<div class="dash-empty-state" style="grid-column:1/-1">
        <div class="dash-empty-state-icon"><svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm-7 9.09l7 3.82 7-3.82V11.5l-7 3.82-7-3.82v.59z"/></svg></div>
        <div class="dash-empty-state-title">No universities shortlisted</div>
        <div class="dash-empty-state-text">Add universities to begin tracking your options.</div>
      </div>`;
      return;
    }

    container.innerHTML = state.universities.map(u => `
      <div class="uni-card" id="uni-card-${u.id}">
        <img class="uni-card-img" src="${u.image}" alt="${u.name} campus" loading="lazy" onerror="this.onerror=null;this.hidden=true;this.parentElement.classList.add('uni-card-image-missing')">
        <div class="uni-card-body">
          <div class="uni-card-country">${u.country}</div>
          <div class="uni-card-name">${u.name}</div>
          <div class="uni-card-program">${u.program}</div>
          <div class="uni-card-meta">
            <span class="uni-card-intake">
              <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>
              ${u.intake}
            </span>
            <span class="status-badge ${u.statusClass}">${u.status}</span>
          </div>
          <div class="uni-card-actions">
            <button class="dash-btn dash-btn-primary dash-btn-sm" onclick="showUniModal('${u.id}')">View Details</button>
            <button class="dash-btn dash-btn-danger dash-btn-sm" onclick="confirmRemoveUni('${u.id}')">Remove</button>
          </div>
        </div>
      </div>
    `).join('');

    // Update stat
    const statEl = $('#statUni');
    if (statEl) statEl.textContent = state.universities.length.toString().padStart(2, '0');
  }

  window.showUniModal = function (uniId) {
    const u = state.universities.find(x => x.id === uniId);
    if (!u) return;
    const modal = $('#uniModal');
    if (!modal) return;

    setInner('uniModalTitle', u.name);
    setInner('uniModalCountry', u.country);
    setInner('uniModalProgram', u.program);
    setInner('uniModalIntake', u.intake);
    setInner('uniModalStatus', u.status);
    setInner('uniModalRanking', u.ranking);
    setInner('uniModalDesc', u.description);
    setInner('uniModalTuition', u.tuitionNote);

    const badge = $('#uniModalStatusBadge');
    if (badge) {
      badge.className = 'status-badge ' + u.statusClass;
      badge.textContent = u.status;
    }

    showModal('uniModal');
  };

  window.confirmRemoveUni = function (uniId) {
    const u = state.universities.find(x => x.id === uniId);
    if (!u) return;
    showConfirmModal(
      'Remove University',
      `Remove <strong>${u.name}</strong> from your shortlist? This action cannot be undone in this demo session.`,
      'Remove',
      function () {
        state.universities = state.universities.filter(x => x.id !== uniId);
        renderUniversities();
      }
    );
  };

  /* ── APPLICATIONS ─────────────────────────────────────── */
  function renderApplications() {
    renderAppTable(state.applications);

    // Search
    const searchInput = $('#appSearchInput');
    const filterSelect = $('#appFilterSelect');

    function applyFilters() {
      const q = (searchInput ? searchInput.value : '').toLowerCase();
      const f = filterSelect ? filterSelect.value : 'all';
      let filtered = state.applications.filter(a => {
        const matchQ = !q || a.university.toLowerCase().includes(q) || a.course.toLowerCase().includes(q);
        const matchF = f === 'all' || a.status === f;
        return matchQ && matchF;
      });
      renderAppTable(filtered);
    }

    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (filterSelect) filterSelect.addEventListener('change', applyFilters);
  }

  function renderAppTable(apps) {
    const tbody = $('#appTableBody');
    if (!tbody) return;

    if (apps.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6">
        <div class="dash-empty-state">
          <div class="dash-empty-state-icon"><svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg></div>
          <div class="dash-empty-state-title">No applications found</div>
          <div class="dash-empty-state-text">Try adjusting your search or filter.</div>
        </div>
      </td></tr>`;
      return;
    }

    tbody.innerHTML = apps.map(a => `
      <tr>
        <td>
          <span class="dash-table-uni-name">${a.university}</span>
          <span class="dash-table-ref">${a.refId}</span>
        </td>
        <td>${a.course}</td>
        <td>${a.country}</td>
        <td>${a.intake}</td>
        <td><span class="status-badge ${a.statusClass}">${a.status}</span></td>
        <td><button class="dash-btn dash-btn-outline dash-btn-sm" onclick="showAppModal('${a.id}')">View Details</button></td>
      </tr>
    `).join('');
  }

  window.showAppModal = function (appId) {
    const a = state.applications.find(x => x.id === appId);
    if (!a) return;

    setInner('appModalUni', a.university);
    setInner('appModalCourse', a.course);
    setInner('appModalCountry', a.country);
    setInner('appModalIntake', a.intake);
    setInner('appModalRef', a.refId);
    setInner('appModalDate', a.appliedDate);
    setInner('appModalAction', a.nextAction);

    const badge = $('#appModalStatusBadge');
    if (badge) {
      badge.className = 'status-badge ' + a.statusClass;
      badge.textContent = a.status;
    }

    const prog = $('#appModalProgress');
    if (prog) {
      prog.dataset.pct = a.progress;
      setTimeout(() => { prog.style.width = a.progress + '%'; }, 100);
    }

    const taskList = $('#appModalTasks');
    if (taskList) {
      if (a.pendingTasks.length) {
        taskList.innerHTML = a.pendingTasks.map(t => `<div class="modal-pending-task-item">${t}</div>`).join('');
        taskList.parentElement && (taskList.parentElement.style.display = 'block');
      } else {
        if (taskList.parentElement) taskList.parentElement.style.display = 'none';
      }
    }

    showModal('appModal');
  };

  /* ── DOCUMENTS ────────────────────────────────────────── */
  function renderDocuments() {
    const container = $('#docList');
    if (!container) return;

    // Update progress banner
    const uploaded = state.documents.filter(d => d.status === 'uploaded').length;
    const pending = state.documents.filter(d => d.status === 'pending').length;
    const total = state.documents.length;
    const pct = Math.round((uploaded / total) * 100);
    const pendingBadge = $('#pendingDocumentsBadge');

    setInner('docProgressCount', uploaded + ' / ' + total);
    if (pendingBadge) {
      pendingBadge.textContent = pending;
      pendingBadge.style.display = pending > 0 ? 'inline-flex' : 'none';
    }
    const pBar = $('#docProgressBar');
    if (pBar) {
      pBar.dataset.pct = pct;
      setTimeout(() => { pBar.style.width = pct + '%'; }, 300);
    }

    const iconSVG = `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>`;

    container.innerHTML = state.documents.map(doc => {
      const isUploaded = doc.status === 'uploaded';
      const isPending = doc.status === 'pending';
      const isNotReq = doc.status === 'not-required';

      let statusBadge = '';
      let actions = '';

      if (isUploaded) {
        statusBadge = `<span class="status-badge status-uploaded">Uploaded</span>`;
        actions = `<button class="dash-btn dash-btn-outline dash-btn-sm" title="View document">View</button>
                   <label class="doc-upload-label" for="upload-${doc.id}">Replace
                     <input type="file" class="doc-upload-input" id="upload-${doc.id}" accept=".pdf,.jpg,.jpeg,.png" data-doc-id="${doc.id}">
                   </label>`;
      } else if (isPending) {
        statusBadge = `<span class="status-badge status-pending">Pending</span>`;
        actions = `<label class="doc-upload-label" for="upload-${doc.id}">
                     <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/></svg>
                     Upload
                     <input type="file" class="doc-upload-input" id="upload-${doc.id}" accept=".pdf,.jpg,.jpeg,.png" data-doc-id="${doc.id}">
                   </label>`;
      } else if (isNotReq) {
        statusBadge = `<span class="status-badge status-not-required">Not Required</span>`;
        actions = '';
      }

      const meta = isUploaded
        ? `${doc.type} · ${doc.format} · ${doc.fileSize} · Updated ${doc.lastUpdated}`
        : `${doc.type} · ${doc.format} · ${doc.required ? 'Required' : 'Optional'}`;

      return `
        <div class="doc-item" id="doc-item-${doc.id}">
          <div class="doc-icon">${iconSVG}</div>
          <div class="doc-info">
            <span class="doc-name">${doc.name}</span>
            <span class="doc-meta">${meta}</span>
            <div class="doc-upload-progress" id="doc-prog-${doc.id}">
              <div class="doc-upload-progress-bar"><div class="doc-upload-progress-fill" id="doc-prog-fill-${doc.id}"></div></div>
              <span id="doc-prog-text-${doc.id}">Uploading…</span>
            </div>
          </div>
          <div class="doc-actions">
            ${statusBadge}
            ${actions}
          </div>
        </div>
      `;
    }).join('');

    // Bind file inputs
    $$('.doc-upload-input').forEach(inp => {
      inp.addEventListener('change', function () {
        handleDocUpload(this);
      });
    });

    // Update stats
    const statEl = $('#statDocs');
    if (statEl) statEl.textContent = uploaded + ' / ' + total;
  }

  function handleDocUpload(input) {
    const file = input.files[0];
    const docId = input.dataset.docId;
    if (!file) return;

    const allowed = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 10 * 1024 * 1024; // 10 MB

    if (!allowed.includes(file.type)) {
      showToast('Invalid file type. Please upload a PDF, JPG, or PNG file.', 'error');
      input.value = '';
      return;
    }
    if (file.size > maxSize) {
      showToast('File is too large. Maximum allowed size is 10 MB.', 'error');
      input.value = '';
      return;
    }

    // Show progress
    const progEl = $('#doc-prog-' + docId);
    const progFill = $('#doc-prog-fill-' + docId);
    const progText = $('#doc-prog-text-' + docId);
    if (progEl) progEl.classList.add('show');

    let pct = 0;
    const interval = setInterval(function () {
      pct += Math.random() * 25 + 10;
      if (pct >= 100) {
        pct = 100;
        clearInterval(interval);
        // Update state
        const doc = state.documents.find(d => d.id === docId);
        if (doc) {
          doc.status = 'uploaded';
          doc.fileSize = (file.size / 1024 / 1024).toFixed(1) + ' MB';
          doc.lastUpdated = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        }
        setTimeout(() => {
          if (progEl) progEl.classList.remove('show');
          renderDocuments();
          showToast('Document uploaded successfully. (Demo — no file has been stored on a server.)', 'success');
        }, 400);
      }
      if (progFill) progFill.style.width = pct + '%';
      if (progText) progText.textContent = Math.round(pct) + '%';
    }, 180);
  }

  /* ── SCHOLARSHIPS ─────────────────────────────────────── */
  function renderScholarships() {
    const container = $('#schGrid');
    if (!container) return;
    const data = D().scholarships;

    container.innerHTML = data.map(s => `
      <div class="sch-card">
        <div class="sch-category">${s.category}</div>
        <div class="sch-title">${s.title}</div>
        <div class="sch-destination">
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          ${s.destination}
        </div>
        <div class="sch-eligibility"><strong>Eligibility:</strong> ${s.eligibility}</div>
        <div class="sch-note">${s.note}</div>
        <button class="dash-btn dash-btn-primary dash-btn-sm" onclick="showSchModal('${s.id}')">View Details</button>
      </div>
    `).join('');
  }

  window.showSchModal = function (schId) {
    const s = D().scholarships.find(x => x.id === schId);
    if (!s) return;

    setInner('schModalTitle', s.title);
    setInner('schModalCategory', s.category);
    setInner('schModalDest', s.destination);
    setInner('schModalElig', s.eligibility);
    setInner('schModalDesc', s.description);
    setInner('schModalDeadline', s.deadline);
    setInner('schModalNote', s.note);

    showModal('schModal');
  };

  /* ── VISA ─────────────────────────────────────────────── */
  function renderVisa() {
    const container = $('#visaChecklist');
    if (!container) return;
    const data = D().visaChecklist;

    const icons = {
      completed: `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>`,
      'in-progress': `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>`,
      pending: `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`
    };

    container.innerHTML = data.map(item => `
      <div class="visa-item">
        <div class="visa-status-icon ${item.status}">${icons[item.status] || icons.pending}</div>
        <div class="visa-item-content">
          <span class="visa-task-name">${item.task}</span>
          <span class="visa-task-note">${item.note}</span>
        </div>
        <span class="status-badge ${item.status === 'completed' ? 'status-uploaded' : item.status === 'in-progress' ? 'status-review' : 'status-pending'}">
          ${item.status === 'completed' ? 'Completed' : item.status === 'in-progress' ? 'In Progress' : 'Pending'}
        </span>
      </div>
    `).join('');
  }

  /* ── MESSAGES ─────────────────────────────────────────── */
  function renderMessages() {
    renderMsgHistory();

    const input = $('#msgInput');
    const sendBtn = $('#msgSendBtn');

    function sendMsg() {
      const text = input ? input.value.trim() : '';
      if (!text) return;

      state.messages.push({
        id: 'msg-' + Date.now(),
        sender: 'student',
        text: text,
        timestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        read: true
      });

      if (input) input.value = '';
      renderMsgHistory();
    }

    if (sendBtn) sendBtn.addEventListener('click', sendMsg);
    if (input) input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); }
    });
  }

  function renderMsgHistory() {
    const container = $('#msgHistory');
    if (!container) return;
    const data = D();

    container.innerHTML = state.messages.map(m => `
      <div class="msg-bubble ${m.sender}">
        <div class="msg-bubble-avatar">${m.sender === 'counselor' ? data.student.counselor.initials : data.student.initials}</div>
        <div class="msg-bubble-content">
          <div class="msg-text">${escHtml(m.text)}</div>
          <div class="msg-time">${m.timestamp}</div>
        </div>
      </div>
    `).join('');

    // Scroll to bottom
    container.scrollTop = container.scrollHeight;

  }

  /* ── APPOINTMENTS ─────────────────────────────────────── */
  function renderAppointments() {
    const container = $('#aptContainer');
    if (!container) return;
    const apts = state.appointments;

    const aptHtml = apts.map(a => `
      <div class="apt-card">
        <div class="apt-card-header">
          <div>
            <div class="apt-type">${a.type}</div>
            <div class="apt-counselor">
              <div class="apt-counselor-avatar">${a.counselorInitials}</div>
              With ${a.counselor}
            </div>
          </div>
          <span class="status-badge status-shortlisted">${a.status}</span>
        </div>
        <div class="apt-details">
          <div class="apt-detail-row">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>
            ${a.date}
          </div>
          <div class="apt-detail-row">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
            ${a.time}
          </div>
          <div class="apt-detail-row">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>
            ${a.mode}
          </div>
        </div>
        <div class="demo-notice">Demo Appointment</div>
        <div class="apt-actions">
          <button class="dash-btn dash-btn-primary dash-btn-sm" onclick="showAptDetailModal('${a.id}')">View Details</button>
          <button class="dash-btn dash-btn-outline dash-btn-sm" onclick="showRescheduleModal('${a.id}')">Reschedule</button>
          <button class="dash-btn dash-btn-danger dash-btn-sm" onclick="confirmCancelApt('${a.id}')">Cancel</button>
        </div>
      </div>
    `).join('');

    const requestCard = `
      <div class="apt-request-card" onclick="showRequestAptModal()">
        <div class="apt-request-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
        </div>
        <div class="apt-request-title">Request a consultation</div>
        <div class="apt-request-description">Schedule a session with your education counselor</div>
      </div>
    `;

    container.innerHTML = `<div class="apt-grid">${aptHtml}${requestCard}</div>`;
  }

  window.showAptDetailModal = function (aptId) {
    const a = state.appointments.find(x => x.id === aptId);
    if (!a) return;
    setInner('aptModalType', a.type);
    setInner('aptModalCounselor', a.counselor);
    setInner('aptModalDate', a.date);
    setInner('aptModalTime', a.time);
    setInner('aptModalMode', a.mode);
    setInner('aptModalTopic', a.topic);
    setInner('aptModalNote', a.statusNote);
    showModal('aptModal');
  };

  window.showRescheduleModal = function (aptId) {
    const modalId = 'rescheduleModal';
    const modal = $('#' + modalId);
    if (!modal) return;
    modal.dataset.aptId = aptId;
    showModal(modalId);
  };

  window.confirmCancelApt = function (aptId) {
    showConfirmModal(
      'Cancel Appointment',
      'Cancel this consultation appointment? (Demo only — no real appointment will be affected.)',
      'Cancel Appointment',
      function () {
        state.appointments = state.appointments.filter(x => x.id !== aptId);
        renderAppointments();
        showToast('Appointment cancelled. (Demo — no real action has been taken.)', 'info');
      }
    );
  };

  window.showRequestAptModal = function () {
    showModal('requestAptModal');
  };

  /* ── PROFILE ──────────────────────────────────────────── */
  function renderProfile() {
    const data = D().student;
    setInner('profileName', data.name);
    setInner('profileId', data.id);
    setInner('profileInitials', data.initials);
    setInner('profileHeaderInitials', data.initials);
    setInner('profileCompletionPct', data.profileCompletion + '%');

    const pBar = $('#profileCompletionBar');
    if (pBar) {
      pBar.dataset.pct = data.profileCompletion;
      setTimeout(() => { pBar.style.width = data.profileCompletion + '%'; }, 300);
    }

    // Populate form fields
    const fields = {
      'profileFullName': data.name,
      'profileEmail': data.email,
      'profileMobile': data.mobile,
      'profileQualification': data.qualification,
      'profileStudyLevel': data.studyLevel,
      'profileDestinations': data.destinations.join(', '),
      'profileCourse': data.interestedCourse,
      'profileIntake': data.intake
    };

    Object.entries(fields).forEach(([id, val]) => {
      const el = $('#' + id);
      if (el) el.value = val;
    });

    // Edit/Save buttons
    const editBtn = $('#profileEditBtn');
    const saveBtn = $('#profileSaveBtn');
    const cancelBtn = $('#profileCancelBtn');
    const inputs = $$('#profileForm .dash-form-control');

    function setEditing(editing) {
      state.profileEditing = editing;
      inputs.forEach(inp => {
        if (inp.id !== 'profileEmail' && inp.id !== 'profileId') {
          inp.readOnly = !editing;
        }
      });
      if (editBtn) editBtn.style.display = editing ? 'none' : 'inline-flex';
      if (saveBtn) saveBtn.style.display = editing ? 'inline-flex' : 'none';
      if (cancelBtn) cancelBtn.style.display = editing ? 'inline-flex' : 'none';
    }

    setEditing(false);

    if (editBtn) editBtn.addEventListener('click', function () { setEditing(true); });
    if (cancelBtn) cancelBtn.addEventListener('click', function () { setEditing(false); });
    if (saveBtn) saveBtn.addEventListener('click', function () {
      setEditing(false);
      showToast('Profile updated. (Demo — changes are not persisted to a server.)', 'success');
    });
  }

  /* ── SETTINGS ─────────────────────────────────────────── */
  function renderSettings() {
    // Notification toggles
    const toggles = {
      'settingEmailUpdates': 'emailUpdates',
      'settingAppUpdates': 'applicationUpdates',
      'settingDocReminders': 'documentReminders',
      'settingMsgAlerts': 'messageAlerts'
    };

    const notifSettings = D().settings.notifications;
    Object.entries(toggles).forEach(([id, key]) => {
      const el = $('#' + id);
      if (el) {
        el.checked = notifSettings[key];
        el.addEventListener('change', function () {
          notifSettings[key] = this.checked;
        });
      }
    });

    // Sync theme/dir buttons
    const curTheme = localStorage.getItem('sub_theme') || 'light';
    const curDir = localStorage.getItem('sub_dir') || 'ltr';

    $$('.settings-theme-option[data-theme-opt]').forEach(el => {
      el.classList.toggle('active', el.dataset.themeOpt === curTheme);
    });
    $$('.settings-theme-option[data-dir-opt]').forEach(el => {
      el.classList.toggle('active', el.dataset.dirOpt === curDir);
    });
  }

  /* ── Add University Modal ─────────────────────────────── */
  function showAddUniversityModal() {
    const form = $('#addUniForm');
    if (form) form.reset();
    showModal('addUniModal');
  }

  const addUniSubmit = $('#addUniSubmitBtn');
  if (addUniSubmit) {
    addUniSubmit.addEventListener('click', function () {
      const name = ($('#addUniName') || {}).value || '';
      const country = ($('#addUniCountry') || {}).value || '';
      const program = ($('#addUniProgram') || {}).value || '';
      const intake = ($('#addUniIntake') || {}).value || '';

      if (!name || !country || !program || !intake) {
        showToast('Please fill in all fields.', 'error');
        return;
      }

      const newUni = {
        id: 'uni-' + Date.now(),
        name: name,
        country: country,
        countryCode: 'XX',
        program: program,
        intake: intake,
        status: 'Shortlisted',
        statusClass: 'status-shortlisted',
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80',
        ranking: 'Ranking not specified',
        description: 'Added by student. Details to be confirmed with counselor.',
        website: '#',
        tuitionNote: 'Please check the university website for current tuition fee details.',
        ieltsNote: 'English language requirements apply. Please verify with the university.'
      };

      state.universities.push(newUni);
      renderUniversities();
      hideModal('addUniModal');
      showToast('University added to your shortlist. (Demo — not synced to a server.)', 'success');
    });
  }

  /* ── Appointment Form Submit ──────────────────────────── */
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-apt-submit]');
    if (!btn) return;
    const form = $('#requestAptForm');
    if (!form) return;

    const topic = ($('#aptTopic') || {}).value || '';
    const date = ($('#aptDate') || {}).value || '';
    const time = ($('#aptTime') || {}).value || '';
    const mode = ($('#aptMode') || {}).value || 'Online';

    if (!topic || !date || !time) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const newApt = {
      id: 'apt-' + Date.now(),
      type: topic,
      counselor: D().student.counselor.name,
      counselorInitials: D().student.counselor.initials,
      date: new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      time: time,
      mode: mode,
      status: 'Scheduled',
      statusNote: 'Demo appointment — no real booking has been made.',
      meetingLink: '#',
      topic: 'Consultation with your education counselor.'
    };

    state.appointments.push(newApt);
    renderAppointments();
    hideModal('requestAptModal');
    if (form) form.reset();
    showToast('Appointment requested. (Demo — no real booking has been made.)', 'success');
  });

  /* Reschedule submit */
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-reschedule-submit]');
    if (!btn) return;
    const modal = $('#rescheduleModal');
    const aptId = modal ? modal.dataset.aptId : null;
    const date = ($('#rescheduleDate') || {}).value || '';
    const time = ($('#rescheduleTime') || {}).value || '';
    if (!date || !time) { showToast('Please choose a new date and time.', 'error'); return; }

    const apt = state.appointments.find(a => a.id === aptId);
    if (apt) {
      apt.date = new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      apt.time = time;
    }
    renderAppointments();
    hideModal('rescheduleModal');
    showToast('Appointment rescheduled. (Demo only.)', 'success');
  });

  /* ── Modal Helpers ────────────────────────────────────── */
  function showModal(id) {
    const overlay = $('#modal-' + id);
    if (overlay) overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function hideModal(id) {
    const overlay = $('#modal-' + id);
    if (overlay) overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  window.hideModal = hideModal;

  // Close on overlay click
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('dash-modal-overlay')) {
      $$('.dash-modal-overlay.show').forEach(el => {
        const id = el.id.replace('modal-', '');
        hideModal(id);
      });
    }
  });

  // Close buttons
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-close-modal]');
    if (!btn) return;
    const id = btn.dataset.closeModal;
    if (id) hideModal(id);
  });

  /* Confirm modal */
  function showConfirmModal(title, message, confirmLabel, onConfirm) {
    const modal = $('#modal-confirmModal');
    if (!modal) {
      if (confirm(message)) onConfirm();
      return;
    }
    setInner('confirmModalTitle', title);
    const msgEl = $('#confirmModalMessage');
    if (msgEl) msgEl.innerHTML = message;
    setInner('confirmModalBtn', confirmLabel);

    const confirmBtn = $('#confirmModalBtn');
    if (confirmBtn) {
      const newBtn = confirmBtn.cloneNode(true);
      confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);
      newBtn.addEventListener('click', function () {
        hideModal('confirmModal');
        onConfirm();
      });
    }

    showModal('confirmModal');
  }

  /* ── Toast ────────────────────────────────────────────── */
  function showToast(message, type) {
    type = type || 'info';
    const colors = { success: '#287850', error: '#d65a31', info: '#721C24' };
    const toast = document.createElement('div');
    toast.style.cssText = `
      position:fixed;bottom:1.5rem;right:1.5rem;z-index:9999;
      background:${colors[type] || colors.info};color:#fff;
      padding:0.875rem 1.25rem;border-radius:10px;
      font-family:'Plus Jakarta Sans',sans-serif;font-size:0.85rem;font-weight:500;
      box-shadow:0 8px 32px rgba(0,0,0,0.25);max-width:360px;line-height:1.5;
      animation:slideInToast 0.3s ease;
    `;
    toast.textContent = message;

    if (!document.querySelector('#toast-style')) {
      const style = document.createElement('style');
      style.id = 'toast-style';
      style.textContent = '@keyframes slideInToast{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}';
      document.head.appendChild(style);
    }

    document.body.appendChild(toast);
    setTimeout(() => { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 4000);
  }

  /* ── Utilities ────────────────────────────────────────── */
  function setInner(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  function escHtml(str) {
    const d = document.createElement('div');
    d.appendChild(document.createTextNode(str));
    return d.innerHTML;
  }

})();
