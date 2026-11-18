/**
 * blog.js - Study Upbroad
 * Search, category filtering, combined filter, result count, empty state,
 * and interactions for blog.html.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- STATE ---
  let currentCategory = 'all';
  let currentSearchQuery = '';

  // --- DOM ELEMENTS ---
  const featuredContainer = document.getElementById('featuredBlogContainer');
  const cardsGrid = document.getElementById('blogCardsGrid');
  const searchInput = document.getElementById('blogSearchInput');
  const searchClearBtn = document.getElementById('blogSearchClear');
  const categoryNav = document.getElementById('blogCategoryNav');
  const categoryButtons = document.querySelectorAll('.blog-filter-btn');
  const resultsCount = document.getElementById('blogResultsCount');
  const activeFilterLabel = document.getElementById('activeFilterLabel');
  const activeCategoryPill = document.getElementById('activeCategoryPill');
  const activeSearchLabel = document.getElementById('activeSearchLabel');
  const activeSearchQueryText = document.getElementById('activeSearchQueryText');
  const btnResetFilters = document.getElementById('btnResetFilters');
  const emptyState = document.getElementById('blogEmptyState');
  const btnEmptyReset = document.getElementById('btnEmptyReset');

  // Newsletter Form
  const newsletterForm = document.getElementById('blogNewsletterForm');
  const newsletterEmail = document.getElementById('blogNewsletterEmail');
  const newsletterFeedback = document.getElementById('blogNewsletterFeedback');

  // --- SCROLL REVEAL (IntersectionObserver) ---
  function initScrollReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
        el.classList.add('revealed');
      });
      return;
    }

    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -20px 0px'
    });

    elements.forEach((el) => observer.observe(el));

    // Fallback: reveal elements near initial viewport
    setTimeout(() => {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 150) {
          el.classList.add('revealed');
        }
      });
    }, 60);
  }

  // --- ESCAPE HTML HELPER ---
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- RENDER FEATURED ARTICLE ---
  function renderFeaturedArticle() {
    if (!featuredContainer || typeof getFeaturedBlog !== 'function') return;

    const feat = getFeaturedBlog();
    if (!feat) return;

    featuredContainer.innerHTML = `
      <article class="featured-card reveal">
        <div class="featured-card-grid">
          <div class="featured-card-media">
            <img
              class="featured-card-img"
              src="${feat.coverImage}"
              alt="${escapeHtml(feat.title)}"
              width="800"
              height="500"
              loading="eager" />
            <span class="featured-media-badge">Featured Article</span>
          </div>
          <div class="featured-card-content">
            <span class="featured-category-badge">${escapeHtml(feat.category)}</span>
            <h3 class="featured-card-title">
              <a href="blog-detail.html?blog=${feat.id}" class="text-decoration-none">
                ${escapeHtml(feat.title)}
              </a>
            </h3>
            <p class="featured-card-excerpt">
              ${escapeHtml(feat.excerpt)}
            </p>
            <div class="featured-meta-row">
              <div class="author-block">
                <img
                  class="author-avatar"
                  src="${feat.author.image}"
                  alt="${escapeHtml(feat.author.name)}"
                  width="44"
                  height="44" />
                <div class="author-details">
                  <span class="author-name">${escapeHtml(feat.author.name)}</span>
                  <span class="article-date-read">${feat.publishDate} &bull; ${feat.readTime}</span>
                </div>
              </div>
              <a href="blog-detail.html?blog=${feat.id}" class="featured-cta-btn" aria-label="Read featured article: ${escapeHtml(feat.title)}">
                <span>Read Article</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  // --- RENDER BLOG CARDS ---
  function renderBlogCards(articles) {
    if (!cardsGrid) return;

    if (!articles || articles.length === 0) {
      cardsGrid.innerHTML = '';
      if (emptyState) emptyState.classList.remove('d-none');
      if (resultsCount) resultsCount.textContent = '0';
      return;
    }

    if (emptyState) emptyState.classList.add('d-none');
    if (resultsCount) resultsCount.textContent = articles.length;

    cardsGrid.innerHTML = articles.map((b, idx) => `
      <article class="blog-card reveal delay-${(idx % 3) + 1}" data-blog-id="${b.id}" data-category="${escapeHtml(b.category)}">
        <div class="blog-card-media">
          <img
            class="blog-card-img"
            src="${b.coverImage}"
            alt="${escapeHtml(b.title)}"
            loading="lazy"
            width="600"
            height="375" />
          <span class="blog-card-badge">${escapeHtml(b.category)}</span>
        </div>
        <div class="blog-card-body">
          <div class="blog-card-meta-top">
            <span>${b.publishDate}</span>
            <span class="blog-card-meta-dot"></span>
            <span>${b.readTime}</span>
          </div>
          <h3 class="blog-card-title">
            <a href="blog-detail.html?blog=${b.id}" class="text-decoration-none">
              ${escapeHtml(b.title)}
            </a>
          </h3>
          <p class="blog-card-excerpt">
            ${escapeHtml(b.excerpt)}
          </p>
          <div class="blog-card-footer">
            <div class="blog-card-author-info">
              <img class="blog-card-author-avatar" src="${b.author.image}" alt="${escapeHtml(b.author.name)}" width="32" height="32" />
              <span class="blog-card-author-name">${escapeHtml(b.author.name)}</span>
            </div>
            <a href="blog-detail.html?blog=${b.id}" class="blog-read-link" aria-label="Read: ${escapeHtml(b.title)}">
              <span>Read More</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
        </div>
      </article>
    `).join('');

    initScrollReveal();
  }

  // --- FILTER & SEARCH APPLICATION ---
  function applyFilters() {
    if (typeof blogData === 'undefined') return;

    const query = currentSearchQuery.trim().toLowerCase();
    const isCategoryAll = currentCategory === 'all';

    const filtered = blogData.filter((article) => {
      // Category match
      const matchesCategory = isCategoryAll ||
        article.category.toLowerCase() === currentCategory.toLowerCase();

      // Search match
      const tagsText = (article.tags || []).join(' ').toLowerCase();
      const searchable = `${article.title} ${article.excerpt} ${article.category} ${tagsText}`.toLowerCase();
      const matchesQuery = !query || searchable.includes(query);

      return matchesCategory && matchesQuery;
    });

    renderBlogCards(filtered);
    updateResultsBar(filtered.length);
  }

  // --- UPDATE RESULTS BAR & RESET CONTROLS ---
  function updateResultsBar(count) {
    if (resultsCount) resultsCount.textContent = count;

    const hasCategoryFilter = currentCategory !== 'all';
    const hasSearchFilter = currentSearchQuery.trim().length > 0;

    // Category pill
    if (activeFilterLabel && activeCategoryPill) {
      if (hasCategoryFilter) {
        activeFilterLabel.classList.remove('d-none');
        activeCategoryPill.textContent = currentCategory;
      } else {
        activeFilterLabel.classList.add('d-none');
      }
    }

    // Search query label
    if (activeSearchLabel && activeSearchQueryText) {
      if (hasSearchFilter) {
        activeSearchLabel.classList.remove('d-none');
        activeSearchQueryText.textContent = currentSearchQuery.trim();
      } else {
        activeSearchLabel.classList.add('d-none');
      }
    }

    // Reset button visibility
    if (btnResetFilters) {
      if (hasCategoryFilter || hasSearchFilter) {
        btnResetFilters.classList.remove('d-none');
      } else {
        btnResetFilters.classList.add('d-none');
      }
    }
  }

  // --- RESET ALL FILTERS ---
  function resetFilters() {
    currentCategory = 'all';
    currentSearchQuery = '';

    if (searchInput) searchInput.value = '';
    if (searchClearBtn) searchClearBtn.classList.add('d-none');

    categoryButtons.forEach((btn) => {
      const isAll = btn.getAttribute('data-category') === 'all';
      btn.classList.toggle('active', isAll);
      btn.setAttribute('aria-selected', isAll ? 'true' : 'false');
    });

    applyFilters();
  }

  // --- EVENT LISTENERS ---

  // Search input typing
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      if (searchClearBtn) {
        searchClearBtn.classList.toggle('d-none', currentSearchQuery.length === 0);
      }
      applyFilters();
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        currentSearchQuery = '';
        searchInput.value = '';
        if (searchClearBtn) searchClearBtn.classList.add('d-none');
        applyFilters();
      }
    });
  }

  // Clear search button
  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      currentSearchQuery = '';
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      searchClearBtn.classList.add('d-none');
      applyFilters();
    });
  }

  // Category filter tabs
  categoryButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      currentCategory = btn.getAttribute('data-category') || 'all';
      applyFilters();
    });
  });

  // Reset filter buttons
  if (btnResetFilters) {
    btnResetFilters.addEventListener('click', resetFilters);
  }
  if (btnEmptyReset) {
    btnEmptyReset.addEventListener('click', resetFilters);
  }

  // --- NEWSLETTER VALIDATION & DEMO SUBMISSION ---
  if (newsletterForm && newsletterEmail && newsletterFeedback) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        newsletterFeedback.textContent = 'Please enter a valid email address.';
        newsletterFeedback.style.color = '#ffc107';
        return;
      }

      newsletterFeedback.textContent = 'Thank you for subscribing to our education insights! You will receive our monthly curated articles.';
      newsletterFeedback.style.color = '#d1e7dd';
      newsletterEmail.value = '';

      setTimeout(() => {
        newsletterFeedback.textContent = '';
      }, 6000);
    });
  }

  // --- CHECK URL QUERY PARAMETERS (e.g., ?category=... or ?search=...) ---
  function parseUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('category');
    const searchParam = params.get('search');

    if (catParam) {
      const targetBtn = Array.from(categoryButtons).find(
        (b) => b.getAttribute('data-category').toLowerCase() === catParam.toLowerCase()
      );
      if (targetBtn) {
        categoryButtons.forEach((b) => b.classList.remove('active'));
        targetBtn.classList.add('active');
        currentCategory = targetBtn.getAttribute('data-category');
      }
    }

    if (searchParam) {
      currentSearchQuery = searchParam;
      if (searchInput) searchInput.value = searchParam;
      if (searchClearBtn) searchClearBtn.classList.remove('d-none');
    }

    applyFilters();
  }

  // --- INITIALIZATION ---
  renderFeaturedArticle();
  parseUrlParams();
  initScrollReveal();
});
