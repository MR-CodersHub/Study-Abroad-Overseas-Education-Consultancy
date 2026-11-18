(function () {
  'use strict';

  const $ = (selector, root) => (root || document).querySelector(selector);
  const $$ = (selector, root) => Array.from((root || document).querySelectorAll(selector));
  const clone = value => JSON.parse(JSON.stringify(value));
  let data;
  let state;
  let activeSection = 'dashboard';
  let activeConversation = null;

  const sectionLabels = {
    dashboard: 'Dashboard',
    students: 'Students',
    enquiries: 'Student Enquiries',
    applications: 'Applications',
    documents: 'Student Documents',
    consultations: 'Consultation Requests',
    appointments: 'Appointments',
    messages: 'Student Messages',
    universities: 'University Directory',
    scholarships: 'Scholarships',
    services: 'Consultancy Services',
    pricing: 'Pricing Plans',
    blog: 'Blog Management',
    'website-enquiries': 'Website Enquiries',
    reports: 'Reports & Analytics',
    settings: 'Dashboard Settings'
  };

  document.addEventListener('DOMContentLoaded', () => {
    data = clone(window.AdminDashboardData);
    state = {
      students: data.students,
      enquiries: data.enquiries,
      applications: data.applications,
      documents: data.documents,
      consultations: data.consultations,
      appointments: data.appointments,
      messages: data.messages,
      universities: data.universities,
      scholarships: data.scholarships,
      services: data.services,
      pricingPlans: data.pricingPlans,
      blogs: data.blogs,
      websiteEnquiries: data.websiteEnquiries,
      notifications: data.notifications,
      admin: data.admin
    };
    initThemeDirection();
    initIcons();
    initNavigation();
    initHeaderControls();
    initSidebar();
    initSearch();
    initModals();
    renderAll();
    navigate(activeSection);
  });

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  }

  function statusClass(status) {
    return 'status-' + String(status || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function studentById(id) {
    return state.students.find(student => student.id === id);
  }

  function notify(message, type) {
    const toast = document.createElement('div');
    toast.className = 'toast ' + (type || 'success');
    toast.textContent = message;
    $('#toastRegion').appendChild(toast);
    setTimeout(() => toast.remove(), 3600);
  }

  function initThemeDirection() {
    const theme = localStorage.getItem('sub_theme') || 'light';
    const direction = localStorage.getItem('sub_dir') || 'ltr';
    applyTheme(theme);
    applyDirection(direction);
    $('#themeToggle').addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'));
    $('#directionToggle').addEventListener('click', () => applyDirection(document.documentElement.dir === 'ltr' ? 'rtl' : 'ltr'));
  }

  function initIcons() {
    const icons = {
      grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
      users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
      inbox: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
      file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/>',
      folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
      calendar: '<rect x="3" y="4" width="18" height="17" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
      clock: '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/>',
      message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
      school: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 2 12 2 12 0v-5"/><line x1="22" y1="10" x2="22" y2="16"/>',
      award: '<circle cx="12" cy="8" r="6"/><path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11"/>',
      layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
      tag: '<path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3H4a1 1 0 0 0-1 1v5.59A2 2 0 0 0 3.59 11l9.59 9.59a2 2 0 0 0 2.82 0l4.59-4.59a2 2 0 0 0 0-2.59z"/><circle cx="7" cy="7" r="1"/>',
      edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',
      globe: '<circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
      chart: '<path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6"/><rect x="12" y="8" width="3" height="10"/><rect x="17" y="5" width="3" height="13"/>',
      settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06-1.42 1.42-.06-.06A1.65 1.65 0 0 0 16.5 18a1.65 1.65 0 0 0-1 .6V19h-7v-.4A1.65 1.65 0 0 0 7.5 18a1.65 1.65 0 0 0-1.82.33l-.06.06-1.42-1.42.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1H3v-4h1a1.65 1.65 0 0 0 .6-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06 1.42-1.42.06.06A1.65 1.65 0 0 0 7.5 5.5a1.65 1.65 0 0 0 1-.6V4h7v.9a1.65 1.65 0 0 0 1 .6 1.65 1.65 0 0 0 1.82-.33l.06-.06 1.42 1.42-.06.06A1.65 1.65 0 0 0 19.4 9c.14.38.35.72.6 1H21v4h-1a1.65 1.65 0 0 0-.6 1z"/>',
      arrow: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
      logout: '<path d="M10 17l5-5-5-5v3H3v4h7z"/><path d="M14 4h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"/>',
      menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
      search: '<circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/>',
      bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
      theme: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/>',
      chevron: '<polyline points="6 9 12 15 18 9"/>'
    };

    $$('.nav-icon').forEach(icon => {
      if (!icon.dataset.icon) {
        const owner = icon.closest('[data-icon]');
        if (owner) icon.dataset.icon = owner.dataset.icon;
      }
      const name = icon.dataset.icon;
      if (icons[name]) icon.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name]}</svg>`;
    });
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('sub_theme', theme);
  }

  function applyDirection(direction) {
    document.documentElement.dir = direction;
    document.documentElement.lang = direction === 'rtl' ? 'ar' : 'en';
    localStorage.setItem('sub_dir', direction);
    $('#directionToggle').textContent = direction.toUpperCase();
  }

  function initSidebar() {
    const sidebar = $('#adminSidebar');
    const overlay = $('#adminOverlay');
    const open = () => { sidebar.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; };
    const close = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; };
    $('#sidebarToggle').addEventListener('click', open);
    overlay.addEventListener('click', close);
    window.closeAdminSidebar = close;
  }

  function initNavigation() {
    $$('[data-section]').forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        navigate(link.dataset.section);
        if (window.closeAdminSidebar) window.closeAdminSidebar();
      });
    });
  }

  function navigate(section) {
    if (!sectionLabels[section]) section = 'dashboard';
    activeSection = section;
    $$('[data-section]').forEach(link => link.classList.toggle('active', link.dataset.section === section));
    $('#headerTitle').textContent = sectionLabels[section];
    $('#sectionView').innerHTML = renderSection(section);
    bindSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function initHeaderControls() {
    $('#profileToggle').addEventListener('click', event => {
      event.stopPropagation();
      const menu = $('#profileMenu');
      menu.hidden = !menu.hidden;
      $('#notificationPopover').hidden = true;
      $('#searchResults').classList.remove('open');
    });
    $('#notificationToggle').addEventListener('click', event => {
      event.stopPropagation();
      const popover = $('#notificationPopover');
      popover.hidden = !popover.hidden;
      $('#profileMenu').hidden = true;
      $('#searchResults').classList.remove('open');
    });
    document.addEventListener('click', () => {
      $('#notificationPopover').hidden = true;
      $('#profileMenu').hidden = true;
      $('#searchResults').classList.remove('open');
    });
    $('#notificationPopover').addEventListener('click', event => event.stopPropagation());
    $('#profileMenu').addEventListener('click', event => event.stopPropagation());

    document.addEventListener('keydown', event => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        $('#globalSearch').focus();
      }
    });

    document.addEventListener('click', event => {
      const action = event.target.closest('[data-action]');
      if (!action) return;
      if (action.dataset.action === 'exit') openConfirm('Exit Demo', 'Return to the public website? This frontend demo does not end a real session.', 'Exit to Website', () => window.location.href = '../index.html');
      if (action.dataset.action === 'mark-all-notifications') {
        state.notifications.forEach(item => item.unread = false);
        renderNotifications();
      }
    });
  }

  function renderAll() {
    renderNotifications();
    updateBadges();
  }

  function updateBadges() {
    $('#enquiryNavCount').textContent = state.enquiries.filter(item => item.status === 'New').length;
    $('#documentNavCount').textContent = state.documents.filter(item => item.status === 'Pending Review').length;
    $('#consultationNavCount').textContent = state.consultations.filter(item => ['New Request', 'Awaiting Confirmation', 'Reschedule Requested'].includes(item.status)).length;
    $('#messageNavCount').textContent = state.messages.reduce((total, conversation) => total + (conversation.unread || 0), 0);
    $('#websiteEnquiryNavCount').textContent = state.websiteEnquiries.filter(item => item.status === 'Unread').length;
  }

  function renderNotifications() {
    const unread = state.notifications.filter(item => item.unread).length;
    $('#notificationCount').textContent = unread;
    $('#notificationCount').hidden = unread === 0;
    $('#notificationList').innerHTML = state.notifications.map(item => `
      <button class="notification-item ${item.unread ? 'unread' : 'read'}" type="button" data-notification-section="${esc(item.section)}" data-notification-id="${esc(item.id)}">
        <span class="notification-marker"></span>
        <span><strong>${esc(item.text)}</strong><small>${esc(item.time)}</small></span>
      </button>`).join('');
    $$('#notificationList [data-notification-section]').forEach(item => item.addEventListener('click', () => {
      const notification = state.notifications.find(entry => entry.id === item.dataset.notificationId);
      if (notification) notification.unread = false;
      renderNotifications();
      $('#notificationPopover').hidden = true;
      navigate(item.dataset.notificationSection);
    }));
  }

  function initSearch() {
    const input = $('#globalSearch');
    input.addEventListener('input', () => {
      const query = input.value.trim().toLowerCase();
      const results = $('#searchResults');
      if (!query) { results.classList.remove('open'); results.innerHTML = ''; return; }
      const matches = [];
      state.students.forEach(item => matches.push({ title: item.name, meta: item.id, section: 'students', id: item.id }));
      state.enquiries.forEach(item => matches.push({ title: item.name, meta: item.id, section: 'enquiries', id: item.id }));
      state.applications.forEach(item => matches.push({ title: item.university, meta: item.id, section: 'applications', id: item.id }));
      state.universities.forEach(item => matches.push({ title: item.name, meta: item.country, section: 'universities', id: item.id }));
      const found = matches.filter(item => `${item.title} ${item.meta}`.toLowerCase().includes(query)).slice(0, 8);
      results.innerHTML = found.length ? found.map(item => `<button class="search-result" type="button" data-search-section="${esc(item.section)}" data-search-id="${esc(item.id)}"><span><strong>${esc(item.title)}</strong><br><small>${esc(item.meta)}</small></span><small>${esc(sectionLabels[item.section])}</small></button>`).join('') : '<div class="empty-state">No matching demo records</div>';
      results.classList.add('open');
      $$('.search-result', results).forEach(item => item.addEventListener('click', () => {
        navigate(item.dataset.searchSection);
        input.value = '';
        results.classList.remove('open');
      }));
    });
  }

  function pageHeading(title, subtitle, actions) {
    return `<div class="page-heading"><div><h2>${esc(title)}</h2><p>${esc(subtitle)}</p></div>${actions ? `<div class="heading-actions">${actions}</div>` : ''}</div>`;
  }

  function tableToolbar(filters) {
    return `<div class="toolbar ${filters.length === 1 ? 'search-only' : ''}">${filters.map(filter => {
      if (filter.type === 'search') return `<input class="filter-input" type="search" data-filter="${esc(filter.id)}" placeholder="${esc(filter.placeholder || 'Search…')}" />`;
      return `<select class="filter-select" data-filter="${esc(filter.id)}" aria-label="${esc(filter.label)}"><option value="">${esc(filter.all || 'All')}</option>${filter.options.map(option => `<option>${esc(option)}</option>`).join('')}</select>`;
    }).join('')}</div>`;
  }

  function renderSection(section) {
    if (section === 'dashboard') return renderDashboard();
    if (section === 'students') return renderStudents();
    if (section === 'enquiries') return renderEnquiries();
    if (section === 'applications') return renderApplications();
    if (section === 'documents') return renderDocuments();
    if (section === 'consultations') return renderConsultations();
    if (section === 'appointments') return renderAppointments();
    if (section === 'messages') return renderMessages();
    if (section === 'universities') return renderUniversities();
    if (section === 'scholarships') return renderScholarships();
    if (section === 'services') return renderServices();
    if (section === 'pricing') return renderPricing();
    if (section === 'blog') return renderBlog();
    if (section === 'website-enquiries') return renderWebsiteEnquiries();
    if (section === 'reports') return renderReports();
    if (section === 'settings') return renderSettings();
    return '';
  }

  function renderDashboard() {
    const newEnquiries = state.enquiries.filter(item => item.status === 'New').length;
    const activeApplications = state.applications.filter(item => !['Rejected', 'Withdrawn', 'Offer Received'].includes(item.status)).length;
    const pendingDocs = state.documents.filter(item => item.status !== 'Approved').length;
    const unreadMessages = state.messages.reduce((total, item) => total + item.unread, 0);
    const pendingConsultations = state.consultations.filter(item => item.status !== 'Completed (Demo)' && item.status !== 'Cancelled').length;
    const date = new Date();
    const dateText = date.toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
    const metrics = [
      ['248', 'Total Students', 'Registered student records', 'ST'],
      ['36', 'New Enquiries', 'Awaiting review', 'EN'],
      ['84', 'Active Applications', 'Currently in progress', 'AP'],
      ['12', 'Consultation Requests', 'Awaiting confirmation', 'CO'],
      ['27', 'Pending Documents', 'Require attention', 'DO'],
      ['08', 'Unread Messages', 'Student conversations', 'MS']
    ];
    const bars = data.analytics.months.map((month, index) => `<div class="bar-column"><span class="bar-fill" style="height:${(data.analytics.enquiries[index] / 36) * 86}%"></span><span class="bar-label">${month}</span></div>`).join('');
    return `
      ${pageHeading('Administration overview', 'Monitor student activity, applications, enquiries, and operational work.', '')}
      <section class="welcome-band">
        <div><span class="eyebrow">ADMINISTRATION OVERVIEW</span><h2>Good Morning, Olivia!</h2><p>Here's what's happening across your study abroad consultancy today.</p><span class="date-chip">${esc(dateText)}</span></div>
        <div class="welcome-actions"><button class="primary-button" type="button" data-action="create-student">Create New Student</button><button class="secondary-button" type="button" data-action="view-enquiries">View Enquiries</button></div>
      </section>
      <div class="metric-grid">${metrics.map(metric => `<article class="metric-card"><div class="metric-top"><span class="metric-icon">${metric[3]}</span></div><strong>${esc(metric[0])}</strong><h3>${esc(metric[1])}</h3><p>${esc(metric[2])}</p></article>`).join('')}</div>
      <div class="chart-grid">
        <section class="admin-card"><div class="card-heading"><h3>Student enquiries overview</h3><small>Last six months</small></div><div class="card-body"><div class="bar-chart">${bars}</div></div></section>
        <section class="admin-card"><div class="card-heading"><h3>Application status distribution</h3><small>Active sample applications</small></div><div class="card-body"><div class="donut-wrap"><div class="donut-chart" aria-label="Application status chart"></div><div class="legend">${[['Profile Evaluation','721c24'],['Documents Pending','d65a31'],['Under Review','c69b54'],['Offer Received','8b6b65'],['Completed','cabbb2']].map((item, index) => `<div class="legend-row" style="--dot:#${item[1]}"><span>${item[0]}</span><strong>${[18,24,22,12,8][index]}%</strong></div>`).join('')}</div></div></div></section>
      </div>
      <div class="bottom-grid">
        <section class="admin-card"><div class="card-heading"><h3>Recent activity</h3><small>Latest sample events</small></div><div class="card-body activity-list">
          ${[
            ['+','A new student enquiry was received','8 minutes ago'],
            ['A','An application status was updated','32 minutes ago'],
            ['D','Ananya Sharma uploaded academic transcripts','1 hour ago'],
            ['C','A consultation request was submitted','2 hours ago'],
            ['M','A counselor replied to a student message','3 hours ago']
          ].map(item => `<div class="activity-item"><span class="activity-icon">${item[0]}</span><p>${esc(item[1])}</p><time>${esc(item[2])}</time></div>`).join('')}
        </div></section>
        <section class="admin-card"><div class="card-heading"><h3>Pending tasks</h3><small>${pendingDocs + 4} items</small></div><div class="card-body task-list">
          <button class="task-item" type="button" data-action="navigate-section" data-target="enquiries">Review new student enquiries</button>
          <button class="task-item" type="button" data-action="navigate-section" data-target="documents">Check pending student documents</button>
          <button class="task-item" type="button" data-action="navigate-section" data-target="consultations">Confirm consultation requests</button>
          <button class="task-item" type="button" data-action="navigate-section" data-target="applications">Review applications under evaluation</button>
          <button class="task-item" type="button" data-action="navigate-section" data-target="messages">Reply to unread student messages</button>
        </div></section>
      </div>`;
  }

  function renderStudents() {
    return `${pageHeading('Student Management', 'Manage student records and monitor their overseas education journey.', `<button class="primary-button" type="button" data-action="student-add">Add New Student</button>`)}
      ${tableToolbar([
        { type:'search', id:'studentSearch', placeholder:'Search name, ID, or email' },
        { type:'select', id:'studentDestination', label:'Destination', all:'All destinations', options:['United Kingdom','Canada','Australia','Germany'] },
        { type:'select', id:'studentLevel', label:'Study level', all:'All study levels', options:['Undergraduate','Postgraduate','Research'] },
        { type:'select', id:'studentStatus', label:'Status', all:'All statuses', options:['Active','Pending'] }
      ])}
      <div class="admin-card table-card"><div class="table-scroll">${studentTable(state.students)}</div></div>`;
  }

  function studentTable(records) {
    if (!records.length) return '<div class="empty-state">No students match the current filters.</div>';
    return `<table class="admin-table"><thead><tr><th>Student ID</th><th>Student name</th><th>Destination</th><th>Study level</th><th>Status</th><th>Actions</th></tr></thead><tbody>${records.map(student => `
      <tr><td>${esc(student.id)}</td><td class="student-cell"><strong>${esc(student.name)}</strong><small>${esc(student.email)}</small></td><td>${esc(student.destination)}</td><td>${esc(student.studyLevel)}</td><td><span class="status-badge ${statusClass(student.status)}">${esc(student.status)}</span></td><td><div class="table-actions"><button class="icon-action" type="button" title="View" data-action="student-view" data-id="${esc(student.id)}">V</button><button class="icon-action" type="button" title="Edit" data-action="student-edit" data-id="${esc(student.id)}">E</button><button class="icon-action" type="button" title="Delete" data-action="student-delete" data-id="${esc(student.id)}">×</button></div></td></tr>`).join('')}</tbody></table>`;
  }

  function renderEnquiries() {
    return `${pageHeading('Student Enquiries', 'Review incoming enquiries and help prospective students take their next step.', `<button class="primary-button" type="button" data-action="enquiry-add">Add Enquiry</button>`)}
      ${tableToolbar([
        { type:'search', id:'enquirySearch', placeholder:'Search enquiries' },
        { type:'select', id:'enquiryStatus', label:'Status', all:'All statuses', options:['New','In Progress','Contacted','Converted','Closed'] },
        { type:'select', id:'enquiryDestination', label:'Destination', all:'All destinations', options:['United Kingdom','Canada','Australia','Germany','Ireland'] },
        { type:'select', id:'enquiryService', label:'Service', all:'All services', options:data.services.map(item => item.title) }
      ])}
      <div class="admin-card table-card"><div class="table-scroll">${enquiryTable(state.enquiries)}</div></div>`;
  }

  function enquiryTable(records) {
    if (!records.length) return '<div class="empty-state">No enquiries match the filters.</div>';
    return `<table class="admin-table"><thead><tr><th>Enquiry ID</th><th>Student</th><th>Destination</th><th>Study level</th><th>Service interest</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>${records.map(item => `
      <tr><td>${esc(item.id)}</td><td class="student-cell"><strong>${esc(item.name)}</strong><small>${esc(item.email)}</small></td><td>${esc(item.destination)}</td><td>${esc(item.studyLevel)}</td><td>${esc(item.service)}</td><td>${esc(item.date)}</td><td><span class="status-badge ${statusClass(item.status)}">${esc(item.status)}</span></td><td><div class="table-actions"><button class="icon-action" type="button" title="View" data-action="enquiry-view" data-id="${esc(item.id)}">V</button><button class="icon-action" type="button" title="Delete" data-action="enquiry-delete" data-id="${esc(item.id)}">×</button></div></td></tr>`).join('')}</tbody></table>`;
  }

  function renderApplications() {
    return `${pageHeading('Application Management', 'Monitor student applications and keep track of their progress.', `<button class="primary-button" type="button" data-action="application-add">Add Application</button>`)}
      ${tableToolbar([
        { type:'search', id:'applicationSearch', placeholder:'Search ID, student, or university' },
        { type:'select', id:'applicationCountry', label:'Country', all:'All countries', options:['United Kingdom','Canada','Australia'] },
        { type:'select', id:'applicationStatus', label:'Status', all:'All statuses', options:['Profile Evaluation','Documents Pending','Ready to Apply','Submitted','Under Review','Offer Received','Rejected','Withdrawn'] }
      ])}
      <div class="admin-card table-card"><div class="table-scroll">${applicationTable(state.applications)}</div></div>`;
  }

  function applicationTable(records) {
    if (!records.length) return '<div class="empty-state">No applications match the filters.</div>';
    return `<table class="admin-table"><thead><tr><th>Application ID</th><th>Student</th><th>University</th><th>Course</th><th>Country</th><th>Intake</th><th>Status</th><th>Actions</th></tr></thead><tbody>${records.map(item => {
      const student = studentById(item.studentId);
      return `<tr><td>${esc(item.id)}</td><td>${esc(student ? student.name : 'Unknown student')}</td><td>${esc(item.university)}</td><td>${esc(item.course)}</td><td>${esc(item.country)}</td><td>${esc(item.intake)}</td><td><span class="status-badge ${statusClass(item.status)}">${esc(item.status)}</span></td><td><div class="table-actions"><button class="icon-action" type="button" title="View" data-action="application-view" data-id="${esc(item.id)}">V</button><button class="icon-action" type="button" title="Edit" data-action="application-edit" data-id="${esc(item.id)}">E</button></div></td></tr>`;
    }).join('')}</tbody></table>`;
  }

  function renderDocuments() {
    return `${pageHeading('Student Documents', 'Review and manage documents submitted by students.', '')}
      ${tableToolbar([
        { type:'search', id:'documentSearch', placeholder:'Search document or student' },
        { type:'select', id:'documentStudent', label:'Student', all:'All students', options:state.students.map(item => item.name) },
        { type:'select', id:'documentType', label:'Type', all:'All types', options:['Academic','Identity','Professional','Test Score'] },
        { type:'select', id:'documentStatus', label:'Status', all:'All statuses', options:['Pending Review','Approved','Rejected','Re-upload Required'] }
      ])}
      <div class="admin-card table-card"><div class="table-scroll">${documentTable(state.documents)}</div></div>`;
  }

  function documentTable(records) {
    if (!records.length) return '<div class="empty-state">No documents match the filters.</div>';
    return `<table class="admin-table"><thead><tr><th>Document ID</th><th>Student</th><th>Document name</th><th>Type</th><th>Uploaded</th><th>Review status</th><th>Actions</th></tr></thead><tbody>${records.map(item => {
      const student = studentById(item.studentId);
      return `<tr><td>${esc(item.id)}</td><td>${esc(student ? student.name : 'Unknown student')}</td><td>${esc(item.name)}</td><td>${esc(item.type)}</td><td>${esc(item.uploaded)}</td><td><span class="status-badge ${statusClass(item.status)}">${esc(item.status)}</span></td><td><div class="table-actions"><button class="icon-action" type="button" title="Review" data-action="document-review" data-id="${esc(item.id)}">V</button></div></td></tr>`;
    }).join('')}</tbody></table>`;
  }

  function renderConsultations() {
    return `${pageHeading('Consultation Requests', 'Review consultation requests submitted by prospective students.', '')}
      ${tableToolbar([
        { type:'search', id:'consultationSearch', placeholder:'Search requests' },
        { type:'select', id:'consultationStatus', label:'Status', all:'All statuses', options:['New Request','Awaiting Confirmation','Confirmed (Demo)','Reschedule Requested','Completed (Demo)','Cancelled'] },
        { type:'select', id:'consultationMode', label:'Mode', all:'All modes', options:['Video call','Phone call','In person'] }
      ])}
      <div class="admin-card table-card"><div class="table-scroll">${consultationTable(state.consultations)}</div></div>`;
  }

  function consultationTable(records) {
    if (!records.length) return '<div class="empty-state">No consultation requests match the filters.</div>';
    return `<table class="admin-table"><thead><tr><th>Request ID</th><th>Student</th><th>Destination</th><th>Study level</th><th>Mode</th><th>Preferred date</th><th>Status</th><th>Actions</th></tr></thead><tbody>${records.map(item => `
      <tr><td>${esc(item.id)}</td><td class="student-cell"><strong>${esc(item.name)}</strong><small>${esc(item.email)}</small></td><td>${esc(item.destination)}</td><td>${esc(item.studyLevel)}</td><td>${esc(item.mode)}</td><td>${esc(item.date)} · ${esc(item.time)}</td><td><span class="status-badge ${statusClass(item.status)}">${esc(item.status)}</span></td><td><div class="table-actions"><button class="icon-action" type="button" title="View" data-action="consultation-view" data-id="${esc(item.id)}">V</button></div></td></tr>`).join('')}</tbody></table>`;
  }

  function renderAppointments() {
    const list = state.appointments.map(item => {
      const student = studentById(item.studentId);
      return `<div class="activity-item"><span class="activity-icon">${esc((student ? student.name : 'Student').split(' ').map(word => word[0]).join('').slice(0,2))}</span><p><strong>${esc(student ? student.name : 'Student')}</strong><br>${esc(item.topic)} · ${esc(item.mode)}</p><time>${esc(item.date)} · ${esc(item.time)}</time></div>`;
    }).join('');
    const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    let calendar = `<div class="calendar-card admin-card"><div class="card-heading calendar-toolbar"><button class="icon-action" type="button">‹</button><strong>December 2026</strong><button class="icon-action" type="button">›</button></div><div class="calendar-grid">${days.map(day => `<div class="calendar-week">${day}</div>`).join('')}${Array.from({ length:35 }, (_, index) => {
      const day = index - 0;
      const date = day > 0 && day <= 31 ? day : '';
      const event = state.appointments.find(item => item.date.endsWith('-' + String(date).padStart(2, '0')));
      return `<div class="calendar-cell">${date}${event ? `<span class="calendar-event">${esc(event.time)} · ${esc(studentById(event.studentId)?.name || 'Student')}</span>` : ''}</div>`;
    }).join('')}</div></div>`;
    return `${pageHeading('Appointments', 'Manage student consultation schedules and follow-up sessions.', `<button class="primary-button" type="button" data-action="appointment-add">Add Appointment</button>`)}
      ${tableToolbar([
        { type:'search', id:'appointmentSearch', placeholder:'Search student or counselor' },
        { type:'select', id:'appointmentStatus', label:'Status', all:'All statuses', options:['Confirmed (Demo)','Awaiting Confirmation','Reschedule Requested','Cancelled'] },
        { type:'select', id:'appointmentCounselor', label:'Counselor', all:'All counselors', options:['Olivia Anderson','Sarah Williams'] }
      ])}
      <div class="calendar-layout"><div>${calendar}</div><aside class="admin-card"><div class="card-heading"><h3>Upcoming appointments</h3><small>${state.appointments.length} scheduled</small></div><div class="card-body activity-list">${list}</div></aside></div>`;
  }

  function renderMessages() {
    if (!activeConversation) activeConversation = state.messages[0]?.studentId || null;
    const conversation = state.messages.find(item => item.studentId === activeConversation);
    const conversationList = state.messages.map(item => {
      const student = studentById(item.studentId);
      const last = item.messages[item.messages.length - 1];
      return `<button class="conversation-item ${item.studentId === activeConversation ? 'active' : ''}" type="button" data-conversation="${esc(item.studentId)}"><span class="conversation-avatar">${esc(student?.initials || (student?.name || 'ST').split(' ').map(word => word[0]).join('').slice(0,2))}</span><span class="conversation-copy"><strong>${esc(student?.name || 'Student')}</strong><small>${esc(last?.text || '')}</small></span>${item.unread ? `<span class="conversation-unread">${item.unread}</span>` : ''}</button>`;
    }).join('');
    let chat = '<div class="empty-state">Select a student conversation.</div>';
    if (conversation) {
      const student = studentById(conversation.studentId);
      chat = `<div class="chat-panel"><div class="chat-header"><span class="conversation-avatar">${esc(student?.initials || 'ST')}</span><span><strong>${esc(student?.name || 'Student')}</strong><small>${esc(student?.id || '')} · Demo conversation</small></span></div><div class="chat-history">${conversation.messages.map(message => `<div class="chat-message ${message.from === 'student' ? 'student' : ''}"><span>${esc(message.text)}</span><small>${esc(message.time)}</small></div>`).join('')}</div><div class="chat-compose"><input id="chatInput" type="text" placeholder="Write a demo reply…" /><button class="primary-button" type="button" data-action="send-message">Send</button></div></div>`;
    }
    return `${pageHeading('Student Messages', 'Manage conversations and provide guidance to students.', '')}<div class="message-layout"><aside class="conversation-list">${conversationList}</aside>${chat}</div>`;
  }

  function renderUniversities() {
    return `${pageHeading('University Directory', 'Manage university information used across shortlists and applications.', `<button class="primary-button" type="button" data-action="university-add">Add University</button>`)}
      ${tableToolbar([
        { type:'search', id:'universitySearch', placeholder:'Search universities' },
        { type:'select', id:'universityCountry', label:'Country', all:'All countries', options:['United Kingdom','Canada','Australia'] },
        { type:'select', id:'universityStatus', label:'Listing status', all:'All statuses', options:['Listed','Draft','Disabled'] }
      ])}
      <div class="card-grid">${universityCards(state.universities)}</div>`;
  }

  function universityCards(records) {
    if (!records.length) return '<div class="empty-state">No universities match the filters.</div>';
    return records.map(item => `<article class="directory-card"><div class="directory-card-header"><h3>${esc(item.name)}</h3><span class="status-badge ${statusClass(item.status)}">${esc(item.status)}</span></div><div class="directory-card-body"><div class="directory-meta"><span>${esc(item.city)}, ${esc(item.country)}</span><span>${esc(item.courses)}</span><span>${esc(item.levels)}</span></div><p>${esc(item.description)}</p></div><div class="directory-card-actions"><button class="small-button secondary-button" type="button" data-action="university-view" data-id="${esc(item.id)}">View</button><button class="small-button secondary-button" type="button" data-action="university-edit" data-id="${esc(item.id)}">Edit</button><button class="small-button secondary-button" type="button" data-action="university-toggle" data-id="${esc(item.id)}">${item.status === 'Disabled' ? 'Enable' : 'Disable'}</button></div></article>`).join('');
  }

  function renderScholarships() {
    return `${pageHeading('Scholarship Management', 'Organize illustrative scholarship opportunities and funding information.', `<button class="primary-button" type="button" data-action="scholarship-add">Add Scholarship</button>`)}
      ${tableToolbar([
        { type:'search', id:'scholarshipSearch', placeholder:'Search scholarships' },
        { type:'select', id:'scholarshipDestination', label:'Destination', all:'All destinations', options:['United Kingdom','Canada','Australia'] },
        { type:'select', id:'scholarshipStatus', label:'Status', all:'All statuses', options:['Published','Draft'] }
      ])}
      <div class="admin-card table-card"><div class="table-scroll">${scholarshipTable(state.scholarships)}</div></div>`;
  }

  function scholarshipTable(records) {
    if (!records.length) return '<div class="empty-state">No scholarships match the filters.</div>';
    return `<table class="admin-table"><thead><tr><th>Title</th><th>Destination</th><th>Category</th><th>Eligibility summary</th><th>Status</th><th>Actions</th></tr></thead><tbody>${records.map(item => `<tr><td><strong>${esc(item.title)}</strong></td><td>${esc(item.destination)}</td><td>${esc(item.category)}</td><td>${esc(item.eligibility)}</td><td><span class="status-badge ${statusClass(item.status)}">${esc(item.status)}</span></td><td><div class="table-actions"><button class="icon-action" type="button" title="Edit" data-action="scholarship-edit" data-id="${esc(item.id)}">E</button><button class="icon-action" type="button" title="Delete" data-action="scholarship-delete" data-id="${esc(item.id)}">×</button></div></td></tr>`).join('')}</tbody></table>`;
  }

  function renderServices() {
    return `${pageHeading('Consultancy Services', 'Manage the services displayed on the public website.', '')}<div class="card-grid">${state.services.map(item => `<article class="directory-card"><div class="directory-card-header"><h3>${esc(item.title)}</h3><span class="status-badge ${statusClass(item.status)}">${esc(item.status)}</span></div><div class="directory-card-body"><div class="directory-meta"><span>${esc(item.category)}</span></div><p>${esc(item.description)}</p></div><div class="directory-card-actions"><button class="small-button secondary-button" type="button" data-action="service-edit" data-id="${esc(item.id)}">Edit</button><button class="small-button secondary-button" type="button" data-action="service-view" data-id="${esc(item.id)}">Preview</button></div></article>`).join('')}</div>`;
  }

  function renderPricing() {
    return `${pageHeading('Pricing Plans', 'Manage the consultancy service packages and pricing information.', '')}<div class="card-grid">${state.pricingPlans.map(item => `<article class="directory-card"><div class="directory-card-header"><h3>${esc(item.name)}</h3><span class="status-badge ${statusClass(item.status)}">${esc(item.status)}</span></div><div class="directory-card-body"><div class="directory-meta"><span><strong>${esc(item.price)}</strong></span></div><p>${esc(item.description)}</p><div class="detail-grid" style="grid-template-columns:1fr">${item.features.map(feature => `<div class="detail-item"><span>✓ ${esc(feature)}</span></div>`).join('')}</div></div><div class="directory-card-actions"><button class="small-button secondary-button" type="button" data-action="pricing-edit" data-id="${esc(item.id)}">Edit</button><button class="small-button secondary-button" type="button" data-action="pricing-toggle" data-id="${esc(item.id)}">${item.status === 'Published' ? 'Unpublish' : 'Publish'}</button></div></article>`).join('')}</div>`;
  }

  function renderBlog() {
    return `${pageHeading('Blog & Content Management', 'Manage educational articles and updates displayed on the public website.', `<button class="primary-button" type="button" data-action="blog-add">Add Article</button>`)}
      ${tableToolbar([
        { type:'search', id:'blogSearch', placeholder:'Search article title' },
        { type:'select', id:'blogCategory', label:'Category', all:'All categories', options:['Study Destinations','University Admissions','Scholarships','Applications','Visa Guidance','Student Life'] }
      ])}
      <div class="admin-card table-card"><div class="table-scroll">${blogTable(state.blogs)}</div></div>`;
  }

  function blogTable(records) {
    if (!records.length) return '<div class="empty-state">No articles match the filters.</div>';
    return `<table class="admin-table"><thead><tr><th>Article</th><th>Category</th><th>Author</th><th>Publish date</th><th>Read time</th><th>Status</th><th>Actions</th></tr></thead><tbody>${records.map(item => `<tr><td><strong>${esc(item.title)}</strong></td><td>${esc(item.category)}</td><td>${esc(item.author)}</td><td>${esc(item.date)}</td><td>${esc(item.readTime)}</td><td><span class="status-badge ${statusClass(item.status)}">${esc(item.status)}</span></td><td><div class="table-actions"><button class="icon-action" type="button" title="Edit" data-action="blog-edit" data-id="${esc(item.id)}">E</button><button class="icon-action" type="button" title="Toggle" data-action="blog-toggle" data-id="${esc(item.id)}">${item.status === 'Published' ? 'U' : 'P'}</button><button class="icon-action" type="button" title="Delete" data-action="blog-delete" data-id="${esc(item.id)}">×</button></div></td></tr>`).join('')}</tbody></table>`;
  }

  function renderWebsiteEnquiries() {
    return `${pageHeading('Website Enquiries', 'Review contact form submissions and general enquiries from the public website.', '')}
      ${tableToolbar([
        { type:'search', id:'websiteSearch', placeholder:'Search name, email, or reference' },
        { type:'select', id:'websiteStatus', label:'Status', all:'All statuses', options:['Unread','Read','Closed'] }
      ])}
      <div class="admin-card table-card"><div class="table-scroll"><table class="admin-table"><thead><tr><th>Reference</th><th>Name</th><th>Email</th><th>Mobile</th><th>Subject</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>${state.websiteEnquiries.map(item => `<tr><td>${esc(item.id)}</td><td>${esc(item.name)}</td><td>${esc(item.email)}</td><td>${esc(item.mobile)}</td><td>${esc(item.subject)}</td><td>${esc(item.date)}</td><td><span class="status-badge ${statusClass(item.status)}">${esc(item.status)}</span></td><td><div class="table-actions"><button class="icon-action" type="button" title="View" data-action="website-view" data-id="${esc(item.id)}">V</button></div></td></tr>`).join('')}</tbody></table></div></div>`;
  }

  function renderReports() {
    const destinations = data.analytics.destinations;
    return `${pageHeading('Reports & Analytics', 'Understand student activity, application progress, and enquiry trends. This section shows demonstration analytics only.', `<select class="filter-select" id="reportRange" style="width:150px"><option>Last 6 months</option><option>Last 3 months</option><option>This month</option></select><button class="secondary-button" type="button" data-action="export-csv">Export CSV</button>`)}
      <div class="metric-grid">${[
        [state.students.length + 243,'Total students','Sample directory'],
        [state.enquiries.length,'Enquiries','Loaded records'],
        [state.applications.length,'Applications','Loaded records'],
        [state.consultations.length,'Consultation requests','Loaded records']
      ].map(item => `<article class="metric-card"><strong>${esc(item[0])}</strong><h3>${esc(item[1])}</h3><p>${esc(item[2])}</p></article>`).join('')}</div>
      <div class="chart-grid">
        <section class="admin-card"><div class="card-heading"><h3>Enquiry trend</h3><small>Sample data</small></div><div class="card-body"><div class="bar-chart">${data.analytics.months.map((month,index) => `<div class="bar-column"><span class="bar-fill" style="height:${(data.analytics.enquiries[index]/36)*86}%"></span><span class="bar-label">${month}</span></div>`).join('')}</div></div></section>
        <section class="admin-card"><div class="card-heading"><h3>Student destination preferences</h3><small>Share of sample interest</small></div><div class="card-body"><div class="destination-bars">${destinations.map(item => `<div class="destination-row"><span>${esc(item.name)}</span><span class="destination-track"><span class="destination-fill" style="width:${item.value}%"></span></span><strong>${item.value}%</strong></div>`).join('')}</div></div></section>
      </div>
      <div class="dashboard-grid">
        <section class="admin-card"><div class="card-heading"><h3>Applications by status</h3><small>Demonstration report</small></div><div class="card-body">${['Profile Evaluation','Documents Pending','Ready to Apply','Submitted','Under Review','Offer Received'].map(status => {
          const count = state.applications.filter(item => item.status === status).length;
          return `<div class="destination-row"><span>${esc(status)}</span><span class="destination-track"><span class="destination-fill" style="width:${Math.max(count * 18,4)}%"></span></span><strong>${count}</strong></div>`;
        }).join('')}</div></section>
        <section class="admin-card"><div class="card-heading"><h3>Consultation modes</h3><small>Demonstration report</small></div><div class="card-body">${['Video call','Phone call','In person'].map(mode => {
          const count = state.consultations.filter(item => item.mode === mode).length;
          return `<div class="destination-row"><span>${esc(mode)}</span><span class="destination-track"><span class="destination-fill" style="width:${Math.max(count * 28,4)}%"></span></span><strong>${count}</strong></div>`;
        }).join('')}</div></section>
      </div>`;
  }

  function renderSettings() {
    const savedTheme = document.documentElement.dataset.theme;
    const savedDirection = document.documentElement.dir;
    return `${pageHeading('Dashboard Settings', 'Manage demo profile, appearance, preferences, and notification settings.', '')}
      <div class="settings-grid">
        <section class="admin-card"><div class="card-heading"><h3>Profile settings</h3><small>Frontend demo profile</small></div><div class="card-body"><div class="form-grid">
          <div class="form-field"><label>Administrator name</label><input class="form-control" id="adminNameSetting" value="${esc(state.admin.name)}" /></div>
          <div class="form-field"><label>Email address</label><input class="form-control" id="adminEmailSetting" type="email" value="${esc(state.admin.email)}" /></div>
          <div class="form-field"><label>Profile initials</label><input class="form-control" id="adminInitialsSetting" value="${esc(state.admin.initials)}" maxlength="3" /></div>
          <div class="form-field"><label>Role</label><input class="form-control" id="adminRoleSetting" value="${esc(state.admin.role)}" /></div>
        </div><button class="primary-button" type="button" data-action="save-profile">Save Profile</button></div></section>
        <section class="admin-card"><div class="card-heading"><h3>Appearance</h3><small>Light and dark themes</small></div><div class="card-body"><div class="settings-row"><div>Dashboard theme<small>Choose a persistent demo appearance</small></div><div class="theme-options"><button class="theme-option ${savedTheme === 'light' ? 'active' : ''}" type="button" data-theme-option="light">Light</button><button class="theme-option ${savedTheme === 'dark' ? 'active' : ''}" type="button" data-theme-option="dark">Dark</button></div></div><div class="settings-row"><div>Text direction<small>Switch interface direction</small></div><div class="theme-options"><button class="theme-option ${savedDirection === 'ltr' ? 'active' : ''}" type="button" data-direction-option="ltr">LTR</button><button class="theme-option ${savedDirection === 'rtl' ? 'active' : ''}" type="button" data-direction-option="rtl">RTL</button></div></div></div></section>
        <section class="admin-card"><div class="card-heading"><h3>Notification preferences</h3><small>Demo preferences</small></div><div class="card-body">${[
          ['New enquiry notifications',true],['Application update notifications',true],['Consultation request notifications',true],['Student message notifications',true],['Document review notifications',true]
        ].map((item,index) => `<label class="settings-row"><span>${esc(item[0])}<small>Display in the dashboard header</small></span><input type="checkbox" ${item[1] ? 'checked' : ''} data-notification-setting="${index}" /></label>`).join('')}</div></section>
        <section class="admin-card"><div class="card-heading"><h3>System information</h3><small>Frontend demonstration</small></div><div class="card-body"><div class="settings-row"><div>Website name<small>Study Upbroad</small></div></div><div class="settings-row"><div>Dashboard version<small>Admin demo 1.0</small></div></div><div class="settings-row"><div>Demo mode<small>Enabled · no backend operations</small></div></div></div></section>
      </div>`;
  }

  function bindSection(section) {
    $$('#sectionView [data-filter]').forEach(filter => {
      const eventName = filter.tagName === 'SELECT' ? 'change' : 'input';
      filter.addEventListener(eventName, () => applySectionFilters(section));
    });
    $$('#sectionView [data-action]').forEach(button => button.addEventListener('click', handleAction));
    $$('#sectionView [data-conversation]').forEach(button => button.addEventListener('click', () => {
      activeConversation = button.dataset.conversation;
      const conversation = state.messages.find(item => item.studentId === activeConversation);
      if (conversation) conversation.unread = 0;
      renderAll();
      navigate('messages');
    }));
    $$('#sectionView [data-theme-option]').forEach(button => button.addEventListener('click', () => {
      applyTheme(button.dataset.themeOption);
      navigate('settings');
    }));
    $$('#sectionView [data-direction-option]').forEach(button => button.addEventListener('click', () => {
      applyDirection(button.dataset.directionOption);
      navigate('settings');
    }));
  }

  function applySectionFilters(section) {
    const get = id => $(`[data-filter="${id}"]`)?.value || '';
    if (section === 'students') {
      const query = get('studentSearch').toLowerCase();
      const records = state.students.filter(item =>
        (!query || `${item.name} ${item.id} ${item.email}`.toLowerCase().includes(query)) &&
        (!get('studentDestination') || item.destination.includes(get('studentDestination'))) &&
        (!get('studentLevel') || item.studyLevel === get('studentLevel')) &&
        (!get('studentStatus') || item.status === get('studentStatus')));
      $('.table-card .table-scroll').innerHTML = studentTable(records);
    }
    if (section === 'enquiries') {
      const query = get('enquirySearch').toLowerCase();
      const records = state.enquiries.filter(item =>
        (!query || `${item.name} ${item.id} ${item.email}`.toLowerCase().includes(query)) &&
        (!get('enquiryStatus') || item.status === get('enquiryStatus')) &&
        (!get('enquiryDestination') || item.destination === get('enquiryDestination')) &&
        (!get('enquiryService') || item.service === get('enquiryService')));
      $('.table-card .table-scroll').innerHTML = enquiryTable(records);
    }
    if (section === 'applications') {
      const query = get('applicationSearch').toLowerCase();
      const records = state.applications.filter(item => {
        const student = studentById(item.studentId);
        return (!query || `${item.id} ${item.university} ${student?.name || ''}`.toLowerCase().includes(query)) &&
          (!get('applicationCountry') || item.country === get('applicationCountry')) &&
          (!get('applicationStatus') || item.status === get('applicationStatus'));
      });
      $('.table-card .table-scroll').innerHTML = applicationTable(records);
    }
    if (section === 'documents') {
      const query = get('documentSearch').toLowerCase();
      const records = state.documents.filter(item => {
        const student = studentById(item.studentId);
        return (!query || `${item.name} ${student?.name || ''} ${item.id}`.toLowerCase().includes(query)) &&
          (!get('documentStudent') || student?.name === get('documentStudent')) &&
          (!get('documentType') || item.type === get('documentType')) &&
          (!get('documentStatus') || item.status === get('documentStatus'));
      });
      $('.table-card .table-scroll').innerHTML = documentTable(records);
    }
    if (section === 'consultations') {
      const query = get('consultationSearch').toLowerCase();
      const records = state.consultations.filter(item =>
        (!query || `${item.name} ${item.id} ${item.email}`.toLowerCase().includes(query)) &&
        (!get('consultationStatus') || item.status === get('consultationStatus')) &&
        (!get('consultationMode') || item.mode === get('consultationMode')));
      $('.table-card .table-scroll').innerHTML = consultationTable(records);
    }
    if (section === 'universities') {
      const query = get('universitySearch').toLowerCase();
      const records = state.universities.filter(item =>
        (!query || `${item.name} ${item.country} ${item.city}`.toLowerCase().includes(query)) &&
        (!get('universityCountry') || item.country === get('universityCountry')) &&
        (!get('universityStatus') || item.status === get('universityStatus')));
      $('.card-grid').innerHTML = universityCards(records);
    }
    if (section === 'scholarships') {
      const query = get('scholarshipSearch').toLowerCase();
      const records = state.scholarships.filter(item =>
        (!query || `${item.title} ${item.category}`.toLowerCase().includes(query)) &&
        (!get('scholarshipDestination') || item.destination === get('scholarshipDestination')) &&
        (!get('scholarshipStatus') || item.status === get('scholarshipStatus')));
      $('.table-card .table-scroll').innerHTML = scholarshipTable(records);
    }
    if (section === 'blog') {
      const query = get('blogSearch').toLowerCase();
      const records = state.blogs.filter(item =>
        (!query || item.title.toLowerCase().includes(query)) &&
        (!get('blogCategory') || item.category === get('blogCategory')));
      $('.table-card .table-scroll').innerHTML = blogTable(records);
    }
    if (section === 'website-enquiries') {
      const query = get('websiteSearch').toLowerCase();
      const status = get('websiteStatus');
      const records = state.websiteEnquiries.filter(item =>
        (!query || `${item.name} ${item.email} ${item.id} ${item.subject}`.toLowerCase().includes(query)) &&
        (!status || item.status === status));
      $('.table-card .table-scroll').innerHTML = `<table class="admin-table"><thead><tr><th>Reference</th><th>Name</th><th>Email</th><th>Mobile</th><th>Subject</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>${records.map(item => `<tr><td>${esc(item.id)}</td><td>${esc(item.name)}</td><td>${esc(item.email)}</td><td>${esc(item.mobile)}</td><td>${esc(item.subject)}</td><td>${esc(item.date)}</td><td><span class="status-badge ${statusClass(item.status)}">${esc(item.status)}</span></td><td><div class="table-actions"><button class="icon-action" type="button" data-action="website-view" data-id="${esc(item.id)}">V</button></div></td></tr>`).join('')}</tbody></table>`;
    }
    bindSection(section);
  }

  function handleAction(event) {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const action = button.dataset.action;
    const id = button.dataset.id;
    if (action === 'navigate-section') navigate(button.dataset.target);
    if (action === 'view-enquiries') navigate('enquiries');
    if (action === 'create-student' || action === 'student-add') openStudentModal();
    if (action === 'student-view') openStudentModal(id, true);
    if (action === 'student-edit') openStudentModal(id);
    if (action === 'student-delete') openConfirm('Delete Student', 'Delete this fictional student record? Related demo references will remain visible for this prototype.', 'Delete Student', () => { state.students = state.students.filter(item => item.id !== id); renderAll(); navigate('students'); notify('Student record removed from the demo.', 'success'); });
    if (action === 'enquiry-add') openEnquiryModal();
    if (action === 'enquiry-view') openEnquiryModal(id, true);
    if (action === 'enquiry-delete') openConfirm('Delete Enquiry', 'Delete this demo enquiry record?', 'Delete Enquiry', () => { state.enquiries = state.enquiries.filter(item => item.id !== id); renderAll(); navigate('enquiries'); notify('Enquiry removed.', 'success'); });
    if (action === 'application-add') openApplicationModal();
    if (action === 'application-view') openApplicationModal(id, true);
    if (action === 'application-edit') openApplicationModal(id);
    if (action === 'document-review') openDocumentModal(id);
    if (action === 'consultation-view') openConsultationModal(id);
    if (action === 'appointment-add') openAppointmentModal();
    if (action === 'send-message') sendMessage();
    if (action === 'university-add') openUniversityModal();
    if (action === 'university-edit') openUniversityModal(id);
    if (action === 'university-view') openUniversityModal(id, true);
    if (action === 'university-toggle') { const item = state.universities.find(entry => entry.id === id); if (item) { item.status = item.status === 'Disabled' ? 'Listed' : 'Disabled'; navigate('universities'); notify('University listing status updated in demo.', 'success'); } }
    if (action === 'scholarship-add') openScholarshipModal();
    if (action === 'scholarship-edit') openScholarshipModal(id);
    if (action === 'scholarship-delete') openConfirm('Delete Scholarship', 'Delete this demonstration scholarship record?', 'Delete', () => { state.scholarships = state.scholarships.filter(item => item.id !== id); navigate('scholarships'); notify('Scholarship deleted from demo.', 'success'); });
    if (action === 'service-edit') openServiceModal(id);
    if (action === 'service-view') openServiceModal(id, true);
    if (action === 'pricing-edit') openPricingModal(id);
    if (action === 'pricing-toggle') { const item = state.pricingPlans.find(entry => entry.id === id); if (item) item.status = item.status === 'Published' ? 'Draft' : 'Published'; navigate('pricing'); notify('Pricing listing status updated.', 'success'); }
    if (action === 'blog-add') openBlogModal();
    if (action === 'blog-edit') openBlogModal(id);
    if (action === 'blog-toggle') { const item = state.blogs.find(entry => entry.id === id); if (item) item.status = item.status === 'Published' ? 'Draft' : 'Published'; navigate('blog'); notify('Article status updated in demo.', 'success'); }
    if (action === 'blog-delete') openConfirm('Delete Article', 'Delete this demo article record?', 'Delete', () => { state.blogs = state.blogs.filter(item => item.id !== id); navigate('blog'); notify('Article deleted from demo.', 'success'); });
    if (action === 'website-view') openWebsiteModal(id);
    if (action === 'save-profile') saveProfile();
    if (action === 'export-csv') exportReports();
  }

  function initModals() {
    $('#modalLayer').addEventListener('click', event => {
      if (event.target === $('#modalLayer')) closeModal();
      if (event.target.closest('[data-modal-close]')) closeModal();
      const actionButton = event.target.closest('[data-action]');
      if (actionButton) handleAction(event);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !$('#modalLayer').hidden) closeModal();
    });
  }

  function openModal(title, body, footer) {
    $('#modalContent').innerHTML = `<div class="modal-heading"><h2 id="modalTitle">${esc(title)}</h2><button class="modal-close" type="button" data-modal-close aria-label="Close">×</button></div><div class="modal-body">${body}</div>${footer ? `<div class="modal-footer">${footer}</div>` : ''}`;
    $('#modalLayer').hidden = false;
    document.body.style.overflow = 'hidden';
    $('[data-modal-close]').addEventListener('click', closeModal);
  }

  function closeModal() {
    $('#modalLayer').hidden = true;
    document.body.style.overflow = '';
  }

  function openConfirm(title, message, confirmLabel, callback) {
    openModal(title, `<p class="confirm-copy">${esc(message)}</p>`, `<button class="secondary-button" type="button" data-modal-close>Cancel</button><button class="danger-button" type="button" id="confirmAction">${esc(confirmLabel)}</button>`);
    $('#confirmAction').addEventListener('click', () => { closeModal(); callback(); });
  }

  function detailItem(label, value) {
    return `<div class="detail-item"><label>${esc(label)}</label><span>${esc(value || 'Not specified')}</span></div>`;
  }

  function openStudentModal(id, viewOnly) {
    const item = id ? state.students.find(entry => entry.id === id) : null;
    const title = viewOnly ? 'Student Profile' : item ? 'Edit Student' : 'Add New Student';
    const body = `<div class="form-grid">
      ${formField('Full name','studentName', item?.name || '', 'text', 'full')}
      ${formField('Email address','studentEmail', item?.email || '', 'email')}
      ${formField('Mobile number','studentMobile', item?.mobile || '', 'tel')}
      ${formField('Student ID','studentId', item?.id || 'STU-2026-' + String(148 + state.students.length).padStart(4,'0'), 'text')}
      ${formField('Current qualification','studentQualification', item?.qualification || '', 'text')}
      ${formField('Preferred destination','studentDestination', item?.destination || '', 'text')}
      ${formField('Preferred study level','studentLevel', item?.studyLevel || '', 'text')}
      ${formField('Interested course','studentCourse', item?.course || '', 'text')}
      ${formField('Preferred intake','studentIntake', item?.intake || '', 'text')}
      ${selectField('Student status','studentStatus',['Active','Pending'],item?.status || 'Active')}
    </div>`;
    if (viewOnly) {
      openModal(title, `<div class="detail-grid">${detailItem('Name',item.name)}${detailItem('Student ID',item.id)}${detailItem('Email',item.email)}${detailItem('Mobile',item.mobile)}${detailItem('Qualification',item.qualification)}${detailItem('Destinations',item.destination)}${detailItem('Study level',item.studyLevel)}${detailItem('Interested course',item.course)}${detailItem('Intake',item.intake)}${detailItem('Status',item.status)}${detailItem('Profile completion',(item.profileCompletion || 0) + '%')}</div>`, `<button class="secondary-button" type="button" data-modal-close>Close</button><button class="primary-button" type="button" data-action="student-edit" data-id="${esc(item.id)}">Edit Student</button>`);
      return;
    }
    openModal(title, body, `<button class="secondary-button" type="button" data-modal-close>Cancel</button><button class="primary-button" type="button" id="saveStudent">Save Student</button>`);
    $('#saveStudent').addEventListener('click', () => {
      const required = ['studentName','studentEmail','studentId','studentDestination','studentLevel','studentCourse','studentIntake','studentStatus'];
      let valid = true;
      required.forEach(id => {
        const field = $('#' + id);
        if (!field.value.trim()) { field.style.borderColor = '#b54d3f'; valid = false; } else field.style.borderColor = '';
      });
      if (!valid) { notify('Complete the required student fields.', 'error'); return; }
      const record = {
        id: $('#studentId').value.trim(),
        name: $('#studentName').value.trim(),
        email: $('#studentEmail').value.trim(),
        mobile: $('#studentMobile').value.trim(),
        destination: $('#studentDestination').value.trim(),
        studyLevel: $('#studentLevel').value.trim(),
        status: $('#studentStatus').value,
        qualification: $('#studentQualification').value.trim(),
        course: $('#studentCourse').value.trim(),
        intake: $('#studentIntake').value.trim(),
        universities: item?.universities || [],
        profileCompletion: item?.profileCompletion || 50
      };
      if (item) Object.assign(item, record); else state.students.push(record);
      closeModal(); renderAll(); navigate('students'); notify(item ? 'Student updated in the demo.' : 'New demo student created.', 'success');
    });
  }

  function formField(label, id, value, type, span) {
    return `<div class="form-field ${span === 'full' ? 'full' : ''}"><label for="${esc(id)}">${esc(label)} *</label><input class="form-control" id="${esc(id)}" type="${esc(type || 'text')}" value="${esc(value)}" /><span class="form-error" id="${esc(id)}Error"></span></div>`;
  }

  function selectField(label, id, options, value) {
    return `<div class="form-field"><label for="${esc(id)}">${esc(label)} *</label><select class="form-control" id="${esc(id)}">${options.map(option => `<option ${option === value ? 'selected' : ''}>${esc(option)}</option>`).join('')}</select><span class="form-error"></span></div>`;
  }

  function openEnquiryModal(id, viewOnly) {
    const item = id ? state.enquiries.find(entry => entry.id === id) : null;
    if (viewOnly) {
      openModal('Enquiry Details', `<div class="detail-grid">${detailItem('Enquiry ID',item.id)}${detailItem('Name',item.name)}${detailItem('Email',item.email)}${detailItem('Mobile',item.mobile)}${detailItem('Destination',item.destination)}${detailItem('Study level',item.studyLevel)}${detailItem('Course',item.course)}${detailItem('Intake',item.intake)}${detailItem('Service',item.service)}${detailItem('Submitted',item.date)}${detailItem('Status',item.status)}${detailItem('Message',item.message)}</div>`,
        `<button class="secondary-button" type="button" data-modal-close>Close</button><button class="secondary-button" type="button" id="enquiryProgress">Move to In Progress</button><button class="secondary-button" type="button" id="enquiryContacted">Mark as Contacted</button><button class="primary-button" type="button" id="convertEnquiry">Convert to Student</button>`);
      $('#enquiryProgress').addEventListener('click', () => updateEnquiry(item.id, 'In Progress'));
      $('#enquiryContacted').addEventListener('click', () => updateEnquiry(item.id, 'Contacted'));
      $('#convertEnquiry').addEventListener('click', () => {
        closeModal();
        openConfirm('Convert Enquiry', `Create a student record for ${item.name}?`, 'Convert to Student', () => {
          if (!state.students.some(student => student.email === item.email)) {
            state.students.push({ id:'STU-2026-' + String(148 + state.students.length).padStart(4,'0'), name:item.name, email:item.email, mobile:item.mobile, destination:item.destination, studyLevel:item.studyLevel, status:'Active', qualification:'Not specified', course:item.course, intake:item.intake, universities:[], profileCompletion:40 });
          }
          item.status = 'Converted';
          renderAll(); navigate('enquiries'); notify('Enquiry converted to a demo student record.', 'success');
        });
      });
      return;
    }
    openModal('Add Enquiry', `<div class="form-grid">${formField('Student name','enquiryName','','text','full')}${formField('Email','enquiryEmail','','email')}${formField('Mobile','enquiryMobile','','tel')}${formField('Destination','enquiryDestination','','text')}${formField('Study level','enquiryLevel','','text')}${formField('Service interest','enquiryService',data.services[0].title,'text','full')}${formField('Course','enquiryCourse','','text')}${formField('Intake','enquiryIntake','','text')}${formField('Message','enquiryMessage','','text','full')}</div>`, `<button class="secondary-button" type="button" data-modal-close>Cancel</button><button class="primary-button" type="button" id="saveEnquiry">Save Enquiry</button>`);
    $('#saveEnquiry').addEventListener('click', () => {
      const fields = ['enquiryName','enquiryEmail','enquiryDestination','enquiryLevel','enquiryService'];
      if (fields.some(id => !$('#' + id).value.trim())) { notify('Complete the required enquiry fields.', 'error'); return; }
      state.enquiries.unshift({ id:'ENQ-2026-' + String(349 + state.enquiries.length), name:$('#enquiryName').value.trim(), email:$('#enquiryEmail').value.trim(), mobile:$('#enquiryMobile').value.trim(), destination:$('#enquiryDestination').value.trim(), studyLevel:$('#enquiryLevel').value.trim(), service:$('#enquiryService').value.trim(), course:$('#enquiryCourse').value.trim(), intake:$('#enquiryIntake').value.trim(), date:new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}), status:'New', message:$('#enquiryMessage').value.trim() });
      closeModal(); renderAll(); navigate('enquiries'); notify('Demo enquiry added.', 'success');
    });
  }

  function updateEnquiry(id, status) {
    const item = state.enquiries.find(entry => entry.id === id);
    if (item) item.status = status;
    closeModal(); renderAll(); navigate('enquiries'); notify(`Enquiry marked as ${status}.`, 'success');
  }

  function openApplicationModal(id, viewOnly) {
    const item = id ? state.applications.find(entry => entry.id === id) : null;
    if (viewOnly) {
      const student = studentById(item.studentId);
      openModal('Application Details', `<div class="detail-grid">${detailItem('Application ID',item.id)}${detailItem('Student',student?.name)}${detailItem('University',item.university)}${detailItem('Course',item.course)}${detailItem('Country',item.country)}${detailItem('Intake',item.intake)}${detailItem('Current status',item.status)}${detailItem('Submission date',item.submitted)}${detailItem('Next action',item.nextAction)}${detailItem('Admin note',item.notes)}</div>`,
        `<button class="secondary-button" type="button" data-modal-close>Close</button><button class="primary-button" type="button" data-action="application-edit" data-id="${esc(item.id)}">Update Status</button>`);
      return;
    }
    const statuses = ['Profile Evaluation','Documents Pending','Ready to Apply','Submitted','Under Review','Offer Received','Rejected','Withdrawn'];
    openModal(item ? 'Edit Application' : 'Add Application', `<div class="form-grid">${formField('Application ID','applicationId',item?.id || 'APP-2026-' + String(state.applications.length + 7).padStart(3,'0'),'text')}${formField('Student ID','applicationStudentId',item?.studentId || state.students[0].id,'text')}${formField('University','applicationUniversity',item?.university || '', 'text','full')}${formField('Course','applicationCourse',item?.course || '', 'text')}${formField('Country','applicationCountry',item?.country || '', 'text')}${formField('Intake','applicationIntake',item?.intake || '', 'text')}${selectField('Status','applicationStatus',statuses,item?.status || 'Profile Evaluation')}<div class="form-field full"><label for="applicationNotes">Internal demo notes</label><textarea class="form-control" id="applicationNotes">${esc(item?.notes || '')}</textarea></div></div>`,
      `<button class="secondary-button" type="button" data-modal-close>Cancel</button><button class="primary-button" type="button" id="saveApplication">Save Application</button>`);
    $('#saveApplication').addEventListener('click', () => {
      if (!$('#applicationId').value.trim() || !$('#applicationUniversity').value.trim()) { notify('Complete the required application fields.', 'error'); return; }
      const record = { id:$('#applicationId').value.trim(), studentId:$('#applicationStudentId').value.trim(), university:$('#applicationUniversity').value.trim(), course:$('#applicationCourse').value.trim(), country:$('#applicationCountry').value.trim(), intake:$('#applicationIntake').value.trim(), submitted:item?.submitted || new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}), status:$('#applicationStatus').value, nextAction:'Review the next application milestone.', notes:$('#applicationNotes').value.trim() };
      if (item) Object.assign(item, record); else state.applications.push(record);
      closeModal(); renderAll(); navigate('applications'); notify('Application status saved in demo.', 'success');
    });
  }

  function openDocumentModal(id) {
    const item = state.documents.find(entry => entry.id === id);
    const student = studentById(item.studentId);
    openModal('Review Document', `<div class="detail-grid">${detailItem('Document ID',item.id)}${detailItem('Student',student?.name)}${detailItem('Document',item.name)}${detailItem('Type',item.type)}${detailItem('Uploaded',item.uploaded)}${detailItem('Demo filename',item.filename)}${detailItem('Current status',item.status)}</div><div class="form-field" style="margin-top:12px"><label for="documentReason">Review reason</label><textarea class="form-control" id="documentReason">${esc(item.reason || '')}</textarea></div>`,
      `<button class="secondary-button" type="button" id="rejectDocument">Reject</button><button class="secondary-button" type="button" id="reuploadDocument">Request Re-upload</button><button class="primary-button" type="button" id="approveDocument">Approve</button>`);
    $('#approveDocument').addEventListener('click', () => updateDocument(item.id, 'Approved', ''));
    $('#rejectDocument').addEventListener('click', () => updateDocument(item.id, 'Rejected', $('#documentReason').value.trim()));
    $('#reuploadDocument').addEventListener('click', () => updateDocument(item.id, 'Re-upload Required', $('#documentReason').value.trim()));
  }

  function updateDocument(id, status, reason) {
    const item = state.documents.find(entry => entry.id === id);
    if (item) { item.status = status; item.reason = reason; }
    closeModal(); renderAll(); navigate('documents'); notify(`Document marked ${status.toLowerCase()} in demo.`, 'success');
  }

  function openConsultationModal(id) {
    const item = state.consultations.find(entry => entry.id === id);
    openModal('Consultation Request', `<div class="detail-grid">${detailItem('Request ID',item.id)}${detailItem('Name',item.name)}${detailItem('Email',item.email)}${detailItem('Mobile',item.mobile)}${detailItem('Destination',item.destination)}${detailItem('Study level',item.studyLevel)}${detailItem('Course',item.course)}${detailItem('Mode',item.mode)}${detailItem('Preferred date',item.date)}${detailItem('Preferred time',item.time)}${detailItem('Message',item.message)}${detailItem('Status',item.status)}</div><div class="form-grid" style="margin-top:14px">${formField('Sample date','consultationDate',item.date,'text')}${formField('Sample time','consultationTime',item.time,'text')}</div>`,
      `<button class="secondary-button" type="button" id="cancelConsultation">Cancel</button><button class="secondary-button" type="button" id="rescheduleConsultation">Reschedule</button><button class="primary-button" type="button" id="confirmConsultation">Confirm (Demo)</button>`);
    $('#confirmConsultation').addEventListener('click', () => updateConsultation(item.id, 'Confirmed (Demo)'));
    $('#rescheduleConsultation').addEventListener('click', () => { item.date = $('#consultationDate').value; item.time = $('#consultationTime').value; updateConsultation(item.id, 'Reschedule Requested'); });
    $('#cancelConsultation').addEventListener('click', () => updateConsultation(item.id, 'Cancelled'));
  }

  function updateConsultation(id, status) {
    const item = state.consultations.find(entry => entry.id === id);
    if (item) item.status = status;
    closeModal(); renderAll(); navigate('consultations'); notify('Consultation demo status updated.', 'success');
  }

  function openAppointmentModal(id) {
    openModal('Add Appointment', `<div class="form-grid">${formField('Student ID','appointmentStudent',state.students[0].id,'text')}${formField('Counselor','appointmentCounselor','Sarah Williams','text')}${formField('Date','appointmentDate','2026-12-10','date')}${formField('Time','appointmentTime','11:00','time')}${formField('Mode','appointmentMode','Video call','text')}${formField('Topic','appointmentTopic','Application guidance','text','full')}</div>`, `<button class="secondary-button" type="button" data-modal-close>Cancel</button><button class="primary-button" type="button" id="saveAppointment">Save Demo Appointment</button>`);
    $('#saveAppointment').addEventListener('click', () => {
      state.appointments.push({ id:'APT-2026-' + String(29 + state.appointments.length), studentId:$('#appointmentStudent').value.trim(), counselor:$('#appointmentCounselor').value.trim(), date:$('#appointmentDate').value, time:$('#appointmentTime').value, mode:$('#appointmentMode').value.trim(), topic:$('#appointmentTopic').value.trim(), status:'Awaiting Confirmation' });
      closeModal(); navigate('appointments'); notify('Demo appointment added.', 'success');
    });
  }

  function sendMessage() {
    const input = $('#chatInput');
    if (!input || !input.value.trim()) return;
    const conversation = state.messages.find(item => item.studentId === activeConversation);
    if (!conversation) return;
    conversation.messages.push({ from:'counselor', text:input.value.trim(), time:new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'}) });
    conversation.unread = 0;
    navigate('messages'); notify('Demo reply added locally.', 'success');
  }

  function openUniversityModal(id, viewOnly) {
    const item = id ? state.universities.find(entry => entry.id === id) : null;
    if (viewOnly) {
      openModal('University Details', `<div class="detail-grid">${detailItem('Name',item.name)}${detailItem('Country',item.country)}${detailItem('City',item.city)}${detailItem('Website',item.website)}${detailItem('Courses',item.courses)}${detailItem('Study levels',item.levels)}${detailItem('Listing status',item.status)}${detailItem('Description',item.description)}</div>`, `<button class="secondary-button" type="button" data-modal-close>Close</button>`);
      return;
    }
    openModal(item ? 'Edit University' : 'Add University', `<div class="form-grid">${formField('University name','universityName',item?.name || '', 'text','full')}${formField('Country','universityCountry',item?.country || '', 'text')}${formField('City','universityCity',item?.city || '', 'text')}${formField('Website URL','universityWebsite',item?.website || '', 'url','full')}${formField('Available courses','universityCourses',item?.courses || '', 'text','full')}${formField('Study levels','universityLevels',item?.levels || '', 'text')}${selectField('Listing status','universityStatus',['Listed','Draft','Disabled'],item?.status || 'Draft')}<div class="form-field full"><label for="universityDescription">Description</label><textarea class="form-control" id="universityDescription">${esc(item?.description || 'Sample university directory listing. Programme details require confirmation.')}</textarea></div></div>`,
      `<button class="secondary-button" type="button" data-modal-close>Cancel</button><button class="primary-button" type="button" id="saveUniversity">Save University</button>`);
    $('#saveUniversity').addEventListener('click', () => {
      const name = $('#universityName').value.trim();
      const country = $('#universityCountry').value.trim();
      const website = $('#universityWebsite').value.trim();
      if (!name || !country) { notify('University name and country are required.', 'error'); return; }
      if (website && !/^https?:\/\//i.test(website)) { notify('Enter a complete website URL beginning with http or https.', 'error'); return; }
      const record = { id:item?.id || 'UNI-' + String(state.universities.length + 1).padStart(3,'0'), name, country, city:$('#universityCity').value.trim(), website, courses:$('#universityCourses').value.trim(), levels:$('#universityLevels').value.trim(), status:$('#universityStatus').value, description:$('#universityDescription').value.trim() };
      if (item) Object.assign(item, record); else state.universities.push(record);
      closeModal(); navigate('universities'); notify('University saved in demo.', 'success');
    });
  }

  function openScholarshipModal(id) {
    const item = id ? state.scholarships.find(entry => entry.id === id) : null;
    openModal(item ? 'Edit Scholarship' : 'Add Scholarship', `<div class="form-grid">${formField('Scholarship name','scholarshipName',item?.title || '', 'text','full')}${formField('Destination','scholarshipDestinationForm',item?.destination || '', 'text')}${formField('Category','scholarshipCategory',item?.category || '', 'text')}${formField('Official information URL','scholarshipUrl',item?.url || '', 'url','full')}${formField('Deadline','scholarshipDeadline',item?.deadline || '', 'text')}${selectField('Listing status','scholarshipStatus',['Published','Draft'],item?.status || 'Draft')}<div class="form-field full"><label for="scholarshipEligibility">Eligibility summary</label><textarea class="form-control" id="scholarshipEligibility">${esc(item?.eligibility || 'Details have not yet been confirmed. Check the official information source.')}</textarea></div></div>`, `<button class="secondary-button" type="button" data-modal-close>Cancel</button><button class="primary-button" type="button" id="saveScholarship">Save Scholarship</button>`);
    $('#saveScholarship').addEventListener('click', () => {
      if (!$('#scholarshipName').value.trim() || !$('#scholarshipDestinationForm').value.trim()) { notify('Name and destination are required.', 'error'); return; }
      const record = { id:item?.id || 'SCH-' + String(state.scholarships.length + 1).padStart(3,'0'), title:$('#scholarshipName').value.trim(), destination:$('#scholarshipDestinationForm').value.trim(), category:$('#scholarshipCategory').value.trim(), eligibility:$('#scholarshipEligibility').value.trim(), url:$('#scholarshipUrl').value.trim(), deadline:$('#scholarshipDeadline').value.trim(), status:$('#scholarshipStatus').value };
      if (item) Object.assign(item, record); else state.scholarships.push(record);
      closeModal(); navigate('scholarships'); notify('Scholarship saved in demo.', 'success');
    });
  }

  function openServiceModal(id, viewOnly) {
    const item = state.services.find(entry => entry.id === id);
    if (viewOnly) {
      openModal('Service Preview', `<div class="detail-grid">${detailItem('Service',item.title)}${detailItem('Category',item.category)}${detailItem('Status',item.status)}${detailItem('Description',item.description)}${detailItem('Features',item.features.join(', '))}${detailItem('Process',item.process.join(' → '))}${detailItem('FAQ',item.faqs.join(' '))}</div>`, `<button class="secondary-button" type="button" data-modal-close>Close</button>`);
      return;
    }
    openModal('Edit Consultancy Service', `<div class="form-grid">${formField('Service title','serviceTitle',item.title,'text','full')}${formField('Category','serviceCategory',item.category,'text','full')}<div class="form-field full"><label for="serviceDescription">Short description</label><textarea class="form-control" id="serviceDescription">${esc(item.description)}</textarea></div>${formField('Features','serviceFeatures',item.features.join(', '),'text','full')}${formField('Process steps','serviceProcess',item.process.join(', '),'text','full')}${formField('FAQ content','serviceFaq',item.faqs.join(' '),'text','full')}${selectField('Listing status','serviceStatus',['Published','Draft'],item.status)}</div>`, `<button class="secondary-button" type="button" data-modal-close>Cancel</button><button class="primary-button" type="button" id="saveService">Save Service</button>`);
    $('#saveService').addEventListener('click', () => {
      item.title = $('#serviceTitle').value.trim();
      item.category = $('#serviceCategory').value.trim();
      item.description = $('#serviceDescription').value.trim();
      item.features = $('#serviceFeatures').value.split(',').map(value => value.trim()).filter(Boolean);
      item.process = $('#serviceProcess').value.split(',').map(value => value.trim()).filter(Boolean);
      item.faqs = $('#serviceFaq').value ? [$('#serviceFaq').value.trim()] : [];
      item.status = $('#serviceStatus').value;
      closeModal(); navigate('services'); notify('Service saved in demo.', 'success');
    });
  }

  function openPricingModal(id) {
    const item = state.pricingPlans.find(entry => entry.id === id);
    openModal('Edit Pricing Plan', `<div class="form-grid">${formField('Plan name','pricingName',item.name,'text','full')}<div class="form-field full"><label for="pricingDescription">Description</label><textarea class="form-control" id="pricingDescription">${esc(item.description)}</textarea></div>${formField('Price or contact label','pricingPrice',item.price,'text','full')}${formField('Included features','pricingFeatures',item.features.join(', '),'text','full')}${selectField('Listing status','pricingStatus',['Published','Draft'],item.status)}</div>`, `<button class="secondary-button" type="button" data-modal-close>Cancel</button><button class="primary-button" type="button" id="savePricing">Save Plan</button>`);
    $('#savePricing').addEventListener('click', () => {
      item.name = $('#pricingName').value.trim();
      item.description = $('#pricingDescription').value.trim();
      item.price = $('#pricingPrice').value.trim();
      item.features = $('#pricingFeatures').value.split(',').map(value => value.trim()).filter(Boolean);
      item.status = $('#pricingStatus').value;
      closeModal(); navigate('pricing'); notify('Pricing plan saved in demo.', 'success');
    });
  }

  function openBlogModal(id) {
    const item = id ? state.blogs.find(entry => entry.id === id) : null;
    openModal(item ? 'Edit Article' : 'Add Article', `<div class="form-grid">${formField('Article title','blogTitle',item?.title || '', 'text','full')}${formField('Slug','blogSlug',item?.slug || '', 'text')}${formField('Category','blogCategoryForm',item?.category || 'Study Destinations','text')}${formField('Author','blogAuthor',item?.author || 'Study Upbroad Advisor','text')}${formField('Publish date','blogDate',item?.date || new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}),'text')}${formField('Read time','blogReadTime',item?.readTime || '6 min read','text')}${selectField('Status','blogStatus',['Draft','Published'],item?.status || 'Draft')}<div class="form-field full"><label for="blogExcerpt">Excerpt</label><textarea class="form-control" id="blogExcerpt">${esc(item?.excerpt || '')}</textarea></div><div class="form-field full"><label for="blogContent">Article content</label><textarea class="form-control" id="blogContent">${esc(item?.content || '')}</textarea></div>${formField('Tags','blogTags',item?.tags?.join(', ') || '', 'text','full')}${formField('Related articles','blogRelated',item?.related || '', 'text','full')}${formField('Featured image','blogImage',item?.image || '', 'url','full')}</div>`, `<button class="secondary-button" type="button" data-modal-close>Cancel</button><button class="primary-button" type="button" id="saveBlog">Save Article</button>`);
    $('#saveBlog').addEventListener('click', () => {
      if (!$('#blogTitle').value.trim()) { notify('Article title is required.', 'error'); return; }
      const record = { id:item?.id || 'BLOG-' + String(state.blogs.length + 1).padStart(3,'0'), title:$('#blogTitle').value.trim(), slug:$('#blogSlug').value.trim() || $('#blogTitle').value.toLowerCase().replace(/[^a-z0-9]+/g,'-'), category:$('#blogCategoryForm').value.trim(), author:$('#blogAuthor').value.trim(), date:$('#blogDate').value.trim(), readTime:$('#blogReadTime').value.trim(), status:$('#blogStatus').value, excerpt:$('#blogExcerpt').value.trim(), content:$('#blogContent').value.trim(), tags:$('#blogTags').value.split(',').map(value => value.trim()).filter(Boolean), related:$('#blogRelated').value.trim(), image:$('#blogImage').value.trim() };
      if (item) Object.assign(item, record); else state.blogs.push(record);
      closeModal(); navigate('blog'); notify('Article saved in demo.', 'success');
    });
  }

  function openWebsiteModal(id) {
    const item = state.websiteEnquiries.find(entry => entry.id === id);
    openModal('Website Enquiry', `<div class="detail-grid">${detailItem('Reference',item.id)}${detailItem('Name',item.name)}${detailItem('Email',item.email)}${detailItem('Mobile',item.mobile)}${detailItem('Subject',item.subject)}${detailItem('Date received',item.date)}${detailItem('Status',item.status)}${detailItem('Internal note',item.note || 'No notes')}</div><div class="form-field" style="margin-top:12px"><label for="websiteNote">Internal note</label><textarea class="form-control" id="websiteNote">${esc(item.note || '')}</textarea></div>`, `<button class="secondary-button" type="button" id="closeWebsiteEnquiry">Close Enquiry</button><button class="primary-button" type="button" id="saveWebsiteEnquiry">Save & Mark Read</button>`);
    $('#saveWebsiteEnquiry').addEventListener('click', () => { item.note = $('#websiteNote').value.trim(); item.status = 'Read'; closeModal(); renderAll(); navigate('website-enquiries'); notify('Website enquiry updated.', 'success'); });
    $('#closeWebsiteEnquiry').addEventListener('click', () => { item.note = $('#websiteNote').value.trim(); item.status = 'Closed'; closeModal(); renderAll(); navigate('website-enquiries'); notify('Website enquiry closed.', 'success'); });
  }

  function saveProfile() {
    state.admin.name = $('#adminNameSetting').value.trim();
    state.admin.email = $('#adminEmailSetting').value.trim();
    state.admin.initials = $('#adminInitialsSetting').value.trim();
    state.admin.role = $('#adminRoleSetting').value.trim();
    $$('.admin-avatar, .profile-avatar').forEach(item => item.textContent = state.admin.initials);
    $('#profileMenuName').textContent = state.admin.name;
    $('#profileMenuRole').textContent = state.admin.role + ' · Demo';
    notify('Sample administrator profile updated.', 'success');
  }

  function exportReports() {
    const rows = [
      ['Student ID','Student Name','Destination','Study Level','Status'],
      ...state.students.map(item => [item.id,item.name,item.destination,item.studyLevel,item.status])
    ];
    const csv = rows.map(row => row.map(value => `"${String(value).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type:'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'study-upbroad-demo-students.csv';
    link.click();
    URL.revokeObjectURL(url);
    notify('Demo student report downloaded as CSV.', 'success');
  }
})();
