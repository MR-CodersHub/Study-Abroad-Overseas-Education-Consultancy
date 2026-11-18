/**
 * blog-detail.js - Study Upbroad
 * Dynamic article loader, content generator, Table of Contents builder,
 * author card hydrator, related articles renderer, and 404 handler for blog-detail.html.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- DOM ELEMENTS ---
  const articleFoundView = document.getElementById('articleFoundView');
  const articleNotFoundView = document.getElementById('articleNotFoundView');

  // Header Elements
  const breadcrumbCurrentTitle = document.getElementById('breadcrumbCurrentTitle');
  const articleCategoryBadge = document.getElementById('articleCategoryBadge');
  const articleTitle = document.getElementById('articleTitle');
  const articleLeadExcerpt = document.getElementById('articleLeadExcerpt');
  const articleAuthorAvatar = document.getElementById('articleAuthorAvatar');
  const articleAuthorName = document.getElementById('articleAuthorName');
  const articleAuthorRole = document.getElementById('articleAuthorRole');
  const articlePublishDate = document.getElementById('articlePublishDate');
  const articleReadTime = document.getElementById('articleReadTime');
  const articleCoverImg = document.getElementById('articleCoverImg');

  // Body & Author Card
  const articleBody = document.getElementById('articleBody');
  const authorCardAvatar = document.getElementById('authorCardAvatar');
  const authorCardName = document.getElementById('authorCardName');
  const authorCardRole = document.getElementById('authorCardRole');
  const authorCardBio = document.getElementById('authorCardBio');

  // Sidebar TOC & Related Posts
  const detailTocList = document.getElementById('detailTocList');
  const relatedPostsGrid = document.getElementById('relatedPostsGrid');

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

  function slugify(text) {
    return String(text)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  // --- LOAD ARTICLE BY URL PARAM ---
  function loadArticle() {
    const params = new URLSearchParams(window.location.search);
    const blogId = params.get('blog') || params.get('id');

    if (!blogId || typeof getBlogById !== 'function') {
      showNotFound();
      return;
    }

    const article = getBlogById(blogId);
    if (!article) {
      showNotFound();
      return;
    }

    renderArticle(article);
  }

  // --- SHOW 404 NOT FOUND ---
  function showNotFound() {
    if (articleFoundView) articleFoundView.classList.add('d-none');
    if (articleNotFoundView) articleNotFoundView.classList.remove('d-none');
    document.title = 'Article Not Found – Study Upbroad';
  }

  // --- RENDER VALID ARTICLE ---
  function renderArticle(article) {
    if (articleNotFoundView) articleNotFoundView.classList.add('d-none');
    if (articleFoundView) articleFoundView.classList.remove('d-none');

    // 1. Page Title & Meta Description
    document.title = `${article.title} – Study Upbroad`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', article.excerpt);

    // 2. Header Content
    if (breadcrumbCurrentTitle) breadcrumbCurrentTitle.textContent = article.title;
    if (articleCategoryBadge) articleCategoryBadge.textContent = article.category;
    if (articleTitle) articleTitle.textContent = article.title;
    if (articleLeadExcerpt) articleLeadExcerpt.textContent = article.excerpt;

    // 3. Author Meta
    if (articleAuthorAvatar) {
      articleAuthorAvatar.src = article.author.image;
      articleAuthorAvatar.alt = article.author.name;
    }
    if (articleAuthorName) articleAuthorName.textContent = article.author.name;
    if (articleAuthorRole) articleAuthorRole.textContent = article.author.designation;
    if (articlePublishDate) articlePublishDate.textContent = article.publishDate;
    if (articleReadTime) articleReadTime.textContent = article.readTime;

    // 4. Cover Image
    if (articleCoverImg) {
      articleCoverImg.src = article.coverImage;
      articleCoverImg.alt = article.title;
    }

    // 5. Article Content Sections
    if (articleBody && Array.isArray(article.content)) {
      articleBody.innerHTML = article.content.map((sec, idx) => {
        if (sec.type === 'lead') {
          return `<p class="article-lead-p">${sec.text}</p>`;
        }
        if (sec.type === 'heading') {
          const level = sec.level || 2;
          const headingId = sec.id || `section-${idx}-${slugify(sec.text)}`;
          return `<h${level} id="${headingId}">${escapeHtml(sec.text)}</h${level}>`;
        }
        if (sec.type === 'paragraph') {
          return `<p>${sec.text}</p>`;
        }
        if (sec.type === 'list' && Array.isArray(sec.items)) {
          return `<ul>${sec.items.map((li) => `<li>${li}</li>`).join('')}</ul>`;
        }
        if (sec.type === 'tip') {
          return `
            <div class="article-tip-box">
              <div class="article-tip-header">
                <svg class="article-tip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span>${escapeHtml(sec.title || 'Advisor Tip')}</span>
              </div>
              <p class="article-tip-text">${sec.text}</p>
            </div>
          `;
        }
        return '';
      }).join('');
    }

    // 6. Generate Table of Contents (TOC) from H2 / H3 elements
    if (detailTocList && articleBody) {
      const headings = articleBody.querySelectorAll('h2, h3');
      if (headings.length > 0) {
        detailTocList.innerHTML = Array.from(headings).map((h) => {
          const id = h.getAttribute('id') || slugify(h.textContent);
          h.setAttribute('id', id);
          return `
            <li>
              <a href="#${id}" class="toc-link">
                <span>&bull;</span>
                <span>${escapeHtml(h.textContent)}</span>
              </a>
            </li>
          `;
        }).join('');
      } else {
        const tocWidget = document.getElementById('detailTocWidget');
        if (tocWidget) tocWidget.classList.add('d-none');
      }
    }

    // 7. Author Card below Article
    if (authorCardAvatar) {
      authorCardAvatar.src = article.author.image;
      authorCardAvatar.alt = article.author.name;
    }
    if (authorCardName) authorCardName.textContent = article.author.name;
    if (authorCardRole) authorCardRole.textContent = article.author.designation;
    if (authorCardBio) authorCardBio.textContent = article.author.bio;

    // 8. Render Related Posts
    renderRelatedPosts(article.id);

    // 9. Smooth Anchor Scrolling for Table of Contents
    initTocSmoothScroll();

    // 10. Re-init Scroll Reveals
    initScrollReveal();
  }

  // --- RENDER RELATED POSTS ---
  function renderRelatedPosts(currentId) {
    if (!relatedPostsGrid || typeof getRelatedBlogs !== 'function') return;

    const related = getRelatedBlogs(currentId, 3);
    if (!related || related.length === 0) return;

    relatedPostsGrid.innerHTML = related.map((b, idx) => `
      <article class="blog-card reveal delay-${idx + 1}" data-blog-id="${b.id}">
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
  }

  // --- TOC SMOOTH SCROLL & ACTIVE TRACKING ---
  function initTocSmoothScroll() {
    const tocLinks = document.querySelectorAll('.toc-link');
    tocLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const navOffset = 90;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });

            // Update active state
            tocLinks.forEach((l) => l.classList.remove('active'));
            link.classList.add('active');
          }
        }
      });
    });
  }

  // --- INITIALIZATION ---
  loadArticle();
});
