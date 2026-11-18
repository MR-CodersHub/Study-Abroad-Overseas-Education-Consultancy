/**
 * pricing.js - Study Upbroad
 * Pricing Plans, Comparison Table, FAQs, and Integrated Student Enrollment & Demo Checkout
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- STATE ---
  let currentPlanId = 'complete'; // Default package
  let currentStep = 1; // 1: Form, 2: Review, 3: Payment, 4: Success, 5: Failure
  let currentOrderRef = 'SUB-2026-' + Math.floor(10000 + Math.random() * 90000);
  let formDataStore = {};

  // --- DOM ELEMENTS ---
  const cardsContainer = document.getElementById('pricingCardsContainer');
  const comparisonTableBody = document.getElementById('pricingComparisonTableBody');
  const faqAccordion = document.getElementById('pricingFaqAccordion');

  // Checkout modal elements
  const checkoutOverlay = document.getElementById('checkoutOverlay');
  const checkoutCloseBtn = document.getElementById('checkoutCloseBtn');
  const btnCancelCheckout = document.getElementById('btnCancelCheckout');
  const checkoutStepPill = document.getElementById('checkoutStepPill');
  const checkoutStepHeading = document.getElementById('checkoutStepHeading');

  // Progress Indicators
  const progStep1 = document.getElementById('progStep1');
  const progStep2 = document.getElementById('progStep2');
  const progStep3 = document.getElementById('progStep3');
  const progLine1 = document.getElementById('progLine1');
  const progLine2 = document.getElementById('progLine2');

  // Plan Banner
  const bannerPlanBadge = document.getElementById('bannerPlanBadge');
  const bannerPlanName = document.getElementById('bannerPlanName');
  const bannerPlanDesc = document.getElementById('bannerPlanDesc');
  const bannerPlanPrice = document.getElementById('bannerPlanPrice');
  const btnChangePlan = document.getElementById('btnChangePlan');

  // Step Views
  const stepViewForm = document.getElementById('stepViewForm');
  const stepViewReview = document.getElementById('stepViewReview');
  const stepViewPayment = document.getElementById('stepViewPayment');
  const stepViewSuccess = document.getElementById('stepViewSuccess');
  const stepViewFailure = document.getElementById('stepViewFailure');

  // Step 1: Form
  const enrollmentForm = document.getElementById('studentEnrollmentForm');
  const inputFullName = document.getElementById('studentFullName');
  const inputEmail = document.getElementById('studentEmail');
  const inputPhone = document.getElementById('studentPhone');
  const selectCountry = document.getElementById('studentCountry');
  const selectQualification = document.getElementById('academicQualification');
  const inputCourse = document.getElementById('academicCourse');
  const inputInstitution = document.getElementById('academicInstitution');
  const inputGradYear = document.getElementById('graduationYear');
  const inputGpa = document.getElementById('academicGpa');
  const selectDestination = document.getElementById('prefDestination');
  const selectLevel = document.getElementById('prefLevel');
  const inputSubject = document.getElementById('prefSubject');
  const selectIntake = document.getElementById('prefIntake');
  const inputBudget = document.getElementById('approxBudget');
  const inputSupportNeeds = document.getElementById('supportNeeds');
  const checkConsent = document.getElementById('studentConsentCheck');

  // Step 2: Review elements
  const btnEditStudentDetails = document.getElementById('btnEditStudentDetails');
  const btnBackToForm = document.getElementById('btnBackToForm');
  const btnProceedToPayment = document.getElementById('btnProceedToPayment');
  const revStudentName = document.getElementById('revStudentName');
  const revStudentEmail = document.getElementById('revStudentEmail');
  const revStudentPhone = document.getElementById('revStudentPhone');
  const revStudentCountry = document.getElementById('revStudentCountry');
  const revStudentComm = document.getElementById('revStudentComm');
  const revAcademicQual = document.getElementById('revAcademicQual');
  const revAcademicCourse = document.getElementById('revAcademicCourse');
  const revGradYear = document.getElementById('revGradYear');
  const revPrefDestination = document.getElementById('revPrefDestination');
  const revPrefSubject = document.getElementById('revPrefSubject');
  const revPrefIntake = document.getElementById('revPrefIntake');
  const revPackageBadge = document.getElementById('revPackageBadge');
  const revPackageName = document.getElementById('revPackageName');
  const revPackageDesc = document.getElementById('revPackageDesc');
  const revInclusionsList = document.getElementById('revInclusionsList');
  const revBreakdownFee = document.getElementById('revBreakdownFee');
  const revBreakdownTotal = document.getElementById('revBreakdownTotal');

  // Step 3: Payment elements
  const payStudentName = document.getElementById('payStudentName');
  const payPackageName = document.getElementById('payPackageName');
  const payOrderRef = document.getElementById('payOrderRef');
  const payTotalAmount = document.getElementById('payTotalAmount');
  const btnPayNow = document.getElementById('btnPayNow');
  const paymentLoadingIndicator = document.getElementById('paymentLoadingIndicator');
  const btnBackToReviewFromPay = document.getElementById('btnBackToReviewFromPay');

  // Step 4: Success elements
  const sucStudentName = document.getElementById('sucStudentName');
  const sucPlanName = document.getElementById('sucPlanName');
  const sucOrderRef = document.getElementById('sucOrderRef');
  const sucDestination = document.getElementById('sucDestination');
  const sucEnrollmentDate = document.getElementById('sucEnrollmentDate');
  const btnPrintReceipt = document.getElementById('btnPrintReceipt');

  // Step 5: Failure elements
  const btnRetryPayment = document.getElementById('btnRetryPayment');
  const btnBackToReviewFromFail = document.getElementById('btnBackToReviewFromFail');

  // --- SVG ICONS HELPER ---
  const SVG_ICONS = {
    check: `<svg class="pricing-feature-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    tableCheck: `<span class="status-indicator included status-icon-wrap status-included" title="Included in package"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Included</span></span>`,
    tableAddon: `<span class="status-indicator addon status-badge-addon" title="Available as Add-on"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg><span>Add-on</span></span>`,
    tableDash: `<span class="status-indicator not-included status-icon-wrap status-excluded" title="Not Included"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line></svg><span>—</span></span>`,
    arrowRight: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`
  };

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

    // Fallback: reveal elements that are already within or close to initial viewport
    setTimeout(() => {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 150) {
          el.classList.add('revealed');
        }
      });
    }, 60);
  }

  // --- RENDER PRICING CARDS ---
  function renderPricingCards() {
    if (!cardsContainer || typeof pricingPlans === 'undefined') return;

    cardsContainer.innerHTML = '';
    const planKeys = Object.keys(pricingPlans);

    planKeys.forEach((key, idx) => {
      const plan = pricingPlans[key];
      const isPopular = plan.recommended;

      const card = document.createElement('div');
      card.className = `pricing-plan-card pricing-card ${isPopular ? 'featured pricing-card--popular' : ''} reveal delay-${idx + 1}`;
      card.setAttribute('data-plan-id', plan.id);

      // Features list HTML
      const featuresHtml = plan.features
        .map((feat) => `<li class="pricing-plan-feature-item pricing-feature-item">${SVG_ICONS.check}<span>${feat}</span></li>`)
        .join('');

      card.innerHTML = `
        ${isPopular ? `<div class="pricing-plan-badge pricing-card-badge">${plan.badge}</div>` : `<div class="pricing-plan-badge">${plan.badge}</div>`}
        <div class="pricing-card-header">
          <div class="pricing-card-meta">
            <span class="pricing-card-category">${isPopular ? 'Most Popular' : plan.badge}</span>
            <h3 class="pricing-plan-name pricing-card-title">${plan.name}</h3>
          </div>
          <p class="pricing-plan-tagline pricing-card-tagline">${plan.tagline}</p>
          <div class="pricing-plan-price-wrap pricing-card-price-box">
            <div class="pricing-price-wrap">
              <span class="pricing-plan-amount pricing-amount">${plan.displayPrice}</span>
              <span class="pricing-plan-period pricing-period">/ demo package</span>
            </div>
            <span class="pricing-note">One-time flat demo enrollment fee</span>
          </div>
        </div>
        <div class="pricing-card-body">
          <p class="pricing-card-desc">${plan.description}</p>
          <div class="pricing-features-label">What's included in this package:</div>
          <ul class="pricing-plan-features pricing-features-list">
            ${featuresHtml}
          </ul>
        </div>
        <div class="pricing-card-footer">
          <button type="button" class="pricing-plan-cta-btn pricing-cta-btn ${isPopular ? 'pricing-cta-btn--primary' : 'pricing-cta-btn--outline'} select-plan-trigger" data-plan-id="${plan.id}">
            <span>${plan.ctaText}</span>
            ${SVG_ICONS.arrowRight}
          </button>
          <div class="pricing-card-guarantee">Demonstration checkout &bull; Instant simulation</div>
        </div>
      `;

      cardsContainer.appendChild(card);
    });
  }

  // --- RENDER COMPARISON TABLE ---
  function renderComparisonTable() {
    if (!comparisonTableBody || typeof pricingServicesList === 'undefined' || typeof pricingPlans === 'undefined') return;

    comparisonTableBody.innerHTML = '';

    pricingServicesList.forEach((service) => {
      const row = document.createElement('tr');

      const statusEssential = pricingPlans.essential.serviceMatrix[service.id];
      const statusComplete = pricingPlans.complete.serviceMatrix[service.id];
      const statusPremium = pricingPlans.premium.serviceMatrix[service.id];

      function getStatusMarkup(status) {
        if (status === 'included') return SVG_ICONS.tableCheck;
        if (status === 'addon') return SVG_ICONS.tableAddon;
        return SVG_ICONS.tableDash;
      }

      row.innerHTML = `
        <td class="td-service-cell service-name-cell">
          <div class="service-cell-inner">
            <strong class="service-cell-title">${service.name}</strong>
            <small class="service-cell-category">${service.category}</small>
          </div>
        </td>
        <td class="td-plan-status status-col status-col--essential">
          ${getStatusMarkup(statusEssential)}
        </td>
        <td class="td-plan-status status-col status-col--complete td-plan--featured-col table-highlight-col">
          ${getStatusMarkup(statusComplete)}
        </td>
        <td class="td-plan-status status-col status-col--premium">
          ${getStatusMarkup(statusPremium)}
        </td>
      `;

      comparisonTableBody.appendChild(row);
    });
  }

  // --- RENDER FAQS ---
  function renderFaqs() {
    if (!faqAccordion || typeof pricingFaqs === 'undefined') return;

    faqAccordion.innerHTML = '';

    pricingFaqs.forEach((faq, index) => {
      const isFirst = index === 0;
      const itemId = `faqItem${index + 1}`;
      const headingId = `faqHeading${index + 1}`;
      const collapseId = `faqCollapse${index + 1}`;

      const item = document.createElement('div');
      item.className = 'accordion-item pricing-accordion-item reveal';

      item.innerHTML = `
        <h3 class="accordion-header" id="${headingId}">
          <button class="accordion-button ${isFirst ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="${isFirst ? 'true' : 'false'}" aria-controls="${collapseId}">
            <span class="accordion-num">${String(index + 1).padStart(2, '0')}.</span>
            <span class="accordion-title-text">${faq.question || faq.q}</span>
          </button>
        </h3>
        <div id="${collapseId}" class="accordion-collapse collapse ${isFirst ? 'show' : ''}" aria-labelledby="${headingId}" data-bs-parent="#pricingFaqAccordion">
          <div class="accordion-body">
            <p class="faq-answer-text mb-0">${faq.answer || faq.a}</p>
          </div>
        </div>
      `;

      faqAccordion.appendChild(item);
    });
  }

  // --- PLAN SWITCHING & BANNER UPDATE ---
  function updateSelectedPlan(planId) {
    if (!pricingPlans || !pricingPlans[planId]) {
      planId = 'complete';
    }
    currentPlanId = planId;
    const plan = pricingPlans[planId];

    // Update banner in checkout modal
    if (bannerPlanBadge) bannerPlanBadge.textContent = plan.recommended ? 'Recommended Package' : plan.badge;
    if (bannerPlanName) bannerPlanName.textContent = plan.name;
    if (bannerPlanDesc) bannerPlanDesc.textContent = plan.tagline;
    if (bannerPlanPrice) bannerPlanPrice.textContent = plan.displayPrice;

    // Update review breakdown
    if (revPackageBadge) revPackageBadge.textContent = plan.recommended ? 'Recommended Plan' : plan.badge;
    if (revPackageName) revPackageName.textContent = plan.name;
    if (revPackageDesc) revPackageDesc.textContent = plan.description;
    if (revBreakdownFee) revBreakdownFee.textContent = plan.displayPrice + '.00';
    if (revBreakdownTotal) revBreakdownTotal.textContent = plan.displayPrice + '.00';

    // Update inclusions list in review
    if (revInclusionsList) {
      revInclusionsList.innerHTML = plan.features
        .map((f) => `<li>${SVG_ICONS.check}<span>${f}</span></li>`)
        .join('');
    }

    // Update payment screen summary
    if (payPackageName) payPackageName.textContent = plan.name;
    if (payTotalAmount) payTotalAmount.textContent = plan.displayPrice + '.00';

    // Update success receipt plan name
    if (sucPlanName) sucPlanName.textContent = plan.name;
  }

  // Plan picker helper (lets user change selected plan inside modal)
  function showPlanPickerMenu() {
    const plans = [
      { id: 'essential', label: 'Essential Guidance ($350)' },
      { id: 'complete', label: 'Complete Application Support ($750) — Recommended' },
      { id: 'premium', label: 'Premium End-to-End ($1,250)' }
    ];

    let choice = window.prompt(
      `Select a Package to switch to:\n1. Essential Guidance ($350)\n2. Complete Application Support ($750)\n3. Premium End-to-End ($1,250)\n\nEnter 1, 2, or 3:`,
      currentPlanId === 'essential' ? '1' : currentPlanId === 'premium' ? '3' : '2'
    );

    if (choice === '1') updateSelectedPlan('essential');
    else if (choice === '2') updateSelectedPlan('complete');
    else if (choice === '3') updateSelectedPlan('premium');
  }

  if (btnChangePlan) {
    btnChangePlan.addEventListener('click', showPlanPickerMenu);
  }

  // --- CHECKOUT NAVIGATION & STEP CONTROL ---
  function goToStep(step) {
    currentStep = step;

    // Hide all step views
    if (stepViewForm) stepViewForm.classList.add('d-none');
    if (stepViewReview) stepViewReview.classList.add('d-none');
    if (stepViewPayment) stepViewPayment.classList.add('d-none');
    if (stepViewSuccess) stepViewSuccess.classList.add('d-none');
    if (stepViewFailure) stepViewFailure.classList.add('d-none');

    // Reset progress steps
    [progStep1, progStep2, progStep3].forEach((el) => {
      if (el) {
        el.classList.remove('active', 'completed');
      }
    });
    if (progLine1) progLine1.classList.remove('completed');
    if (progLine2) progLine2.classList.remove('completed');

    if (step === 1) {
      if (stepViewForm) stepViewForm.classList.remove('d-none');
      if (checkoutStepPill) checkoutStepPill.textContent = 'STEP 1 OF 3';
      if (checkoutStepHeading) checkoutStepHeading.textContent = 'Student Enrollment';
      if (progStep1) progStep1.classList.add('active');
    } else if (step === 2) {
      if (stepViewReview) stepViewReview.classList.remove('d-none');
      if (checkoutStepPill) checkoutStepPill.textContent = 'STEP 2 OF 3';
      if (checkoutStepHeading) checkoutStepHeading.textContent = 'Review Your Package & Details';
      if (progStep1) progStep1.classList.add('completed');
      if (progLine1) progLine1.classList.add('completed');
      if (progStep2) progStep2.classList.add('active');
    } else if (step === 3) {
      if (stepViewPayment) stepViewPayment.classList.remove('d-none');
      if (checkoutStepPill) checkoutStepPill.textContent = 'STEP 3 OF 3';
      if (checkoutStepHeading) checkoutStepHeading.textContent = 'Demonstration Payment';
      if (progStep1) progStep1.classList.add('completed');
      if (progLine1) progLine1.classList.add('completed');
      if (progStep2) progStep2.classList.add('completed');
      if (progLine2) progLine2.classList.add('completed');
      if (progStep3) progStep3.classList.add('active');

      // Reset payment button state
      if (btnPayNow) {
        btnPayNow.disabled = false;
        btnPayNow.classList.remove('d-none');
      }
      if (paymentLoadingIndicator) {
        paymentLoadingIndicator.classList.add('d-none');
      }
    } else if (step === 4) {
      if (stepViewSuccess) stepViewSuccess.classList.remove('d-none');
      if (checkoutStepPill) checkoutStepPill.textContent = 'CONFIRMATION';
      if (checkoutStepHeading) checkoutStepHeading.textContent = 'Enrollment Confirmed';
      if (progStep1) progStep1.classList.add('completed');
      if (progLine1) progLine1.classList.add('completed');
      if (progStep2) progStep2.classList.add('completed');
      if (progLine2) progLine2.classList.add('completed');
      if (progStep3) progStep3.classList.add('completed');
    } else if (step === 5) {
      if (stepViewFailure) stepViewFailure.classList.remove('d-none');
      if (checkoutStepPill) checkoutStepPill.textContent = 'NOTICE';
      if (checkoutStepHeading) checkoutStepHeading.textContent = 'Payment Simulation Incomplete';
    }

    // Scroll modal dialog to top smoothly
    const modalDialog = checkoutOverlay ? checkoutOverlay.querySelector('.checkout-modal-dialog') : null;
    if (modalDialog) {
      modalDialog.scrollTop = 0;
    }
  }

  // Open Checkout Modal
  function openCheckout(planId) {
    if (planId) {
      updateSelectedPlan(planId);
    }
    if (checkoutOverlay) {
      checkoutOverlay.classList.remove('d-none');
      document.body.style.overflow = 'hidden';
      goToStep(1);
    }
  }

  // Close Checkout Modal
  function closeCheckout() {
    if (checkoutOverlay) {
      checkoutOverlay.classList.add('d-none');
      document.body.style.overflow = '';
    }
  }

  if (checkoutCloseBtn) {
    checkoutCloseBtn.addEventListener('click', closeCheckout);
  }

  if (btnCancelCheckout) {
    btnCancelCheckout.addEventListener('click', closeCheckout);
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && checkoutOverlay && !checkoutOverlay.classList.contains('d-none')) {
      closeCheckout();
    }
  });

  // Global Plan Trigger Clicks (delegated listener)
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.select-plan-trigger');
    if (trigger) {
      e.preventDefault();
      const planId = trigger.getAttribute('data-plan-id') || 'complete';
      openCheckout(planId);
    }
  });

  // --- FORM VALIDATION & PERSISTENCE ---
  const STORAGE_KEY = 'studyAbroad_enrollment_draft';

  // Restore draft from sessionStorage if available
  function restoreDraft() {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        formDataStore = JSON.parse(saved);
        if (inputFullName && formDataStore.fullName) inputFullName.value = formDataStore.fullName;
        if (inputEmail && formDataStore.email) inputEmail.value = formDataStore.email;
        if (inputPhone && formDataStore.phone) inputPhone.value = formDataStore.phone;
        if (selectCountry && formDataStore.country) selectCountry.value = formDataStore.country;
        if (formDataStore.commMethod) {
          const radio = document.querySelector(`input[name="commMethod"][value="${formDataStore.commMethod}"]`);
          if (radio) radio.checked = true;
        }
        if (selectQualification && formDataStore.qualification) selectQualification.value = formDataStore.qualification;
        if (inputCourse && formDataStore.course) inputCourse.value = formDataStore.course;
        if (inputInstitution && formDataStore.institution) inputInstitution.value = formDataStore.institution;
        if (inputGradYear && formDataStore.gradYear) inputGradYear.value = formDataStore.gradYear;
        if (inputGpa && formDataStore.gpa) inputGpa.value = formDataStore.gpa;
        if (selectDestination && formDataStore.destination) selectDestination.value = formDataStore.destination;
        if (selectLevel && formDataStore.level) selectLevel.value = formDataStore.level;
        if (inputSubject && formDataStore.subject) inputSubject.value = formDataStore.subject;
        if (selectIntake && formDataStore.intake) selectIntake.value = formDataStore.intake;
        if (inputBudget && formDataStore.budget) inputBudget.value = formDataStore.budget;
        if (inputSupportNeeds && formDataStore.supportNeeds) inputSupportNeeds.value = formDataStore.supportNeeds;
      }
    } catch (err) {
      console.warn('Session storage inaccessible for draft retrieval:', err);
    }
  }

  function saveDraft() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formDataStore));
    } catch (err) {
      console.warn('Session storage error:', err);
    }
  }

  // Clear validation error on field edit
  [
    inputFullName,
    inputEmail,
    inputPhone,
    selectCountry,
    selectQualification,
    inputCourse,
    inputInstitution,
    inputGradYear,
    selectDestination,
    selectLevel,
    inputSubject,
    selectIntake,
    checkConsent
  ].forEach((input) => {
    if (input) {
      input.addEventListener('input', () => {
        input.classList.remove('is-invalid');
      });
      input.addEventListener('change', () => {
        input.classList.remove('is-invalid');
      });
    }
  });

  // Form submit handler
  if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Full Name
      const nameVal = inputFullName ? inputFullName.value.trim() : '';
      if (!nameVal || nameVal.length < 2) {
        if (inputFullName) inputFullName.classList.add('is-invalid');
        isValid = false;
      }

      // Email
      const emailVal = inputEmail ? inputEmail.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailRegex.test(emailVal)) {
        if (inputEmail) inputEmail.classList.add('is-invalid');
        isValid = false;
      }

      // Phone (digits check, min 7 digits)
      const phoneVal = inputPhone ? inputPhone.value.trim() : '';
      const digitsOnly = phoneVal.replace(/\D/g, '');
      if (!phoneVal || digitsOnly.length < 7) {
        if (inputPhone) inputPhone.classList.add('is-invalid');
        isValid = false;
      }

      // Country
      const countryVal = selectCountry ? selectCountry.value : '';
      if (!countryVal) {
        if (selectCountry) selectCountry.classList.add('is-invalid');
        isValid = false;
      }

      // Communication method
      const commRadio = document.querySelector('input[name="commMethod"]:checked');
      const commVal = commRadio ? commRadio.value : 'Email';

      // Academic fields
      const qualVal = selectQualification ? selectQualification.value : '';
      if (!qualVal) {
        if (selectQualification) selectQualification.classList.add('is-invalid');
        isValid = false;
      }

      const courseVal = inputCourse ? inputCourse.value.trim() : '';
      if (!courseVal) {
        if (inputCourse) inputCourse.classList.add('is-invalid');
        isValid = false;
      }

      const instVal = inputInstitution ? inputInstitution.value.trim() : '';
      if (!instVal) {
        if (inputInstitution) inputInstitution.classList.add('is-invalid');
        isValid = false;
      }

      const yearVal = inputGradYear ? inputGradYear.value.trim() : '';
      const yearNum = parseInt(yearVal, 10);
      if (!yearVal || isNaN(yearNum) || yearNum < 2010 || yearNum > 2035) {
        if (inputGradYear) inputGradYear.classList.add('is-invalid');
        isValid = false;
      }

      // Study Abroad Preferences
      const destVal = selectDestination ? selectDestination.value : '';
      if (!destVal) {
        if (selectDestination) selectDestination.classList.add('is-invalid');
        isValid = false;
      }

      const levelVal = selectLevel ? selectLevel.value : '';
      if (!levelVal) {
        if (selectLevel) selectLevel.classList.add('is-invalid');
        isValid = false;
      }

      const subjVal = inputSubject ? inputSubject.value.trim() : '';
      if (!subjVal) {
        if (inputSubject) inputSubject.classList.add('is-invalid');
        isValid = false;
      }

      const intakeVal = selectIntake ? selectIntake.value : '';
      if (!intakeVal) {
        if (selectIntake) selectIntake.classList.add('is-invalid');
        isValid = false;
      }

      // Consent checkbox
      if (checkConsent && !checkConsent.checked) {
        checkConsent.classList.add('is-invalid');
        isValid = false;
      }

      if (!isValid) {
        // Focus on first invalid input
        const firstInvalid = enrollmentForm.querySelector('.is-invalid');
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstInvalid.focus();
        }
        return;
      }

      // Store cleaned data
      formDataStore = {
        fullName: nameVal,
        email: emailVal,
        phone: phoneVal,
        country: countryVal,
        commMethod: commVal,
        qualification: qualVal,
        course: courseVal,
        institution: instVal,
        gradYear: yearVal,
        gpa: inputGpa ? inputGpa.value.trim() : '',
        destination: destVal,
        level: levelVal,
        subject: subjVal,
        intake: intakeVal,
        budget: inputBudget ? inputBudget.value.trim() : '',
        supportNeeds: inputSupportNeeds ? inputSupportNeeds.value.trim() : ''
      };

      saveDraft();

      // Populate Step 2 Order Review elements
      if (revStudentName) revStudentName.textContent = formDataStore.fullName;
      if (revStudentEmail) revStudentEmail.textContent = formDataStore.email;
      if (revStudentPhone) revStudentPhone.textContent = formDataStore.phone;
      if (revStudentCountry) revStudentCountry.textContent = formDataStore.country;
      if (revStudentComm) revStudentComm.textContent = formDataStore.commMethod;
      if (revAcademicQual) revAcademicQual.textContent = formDataStore.qualification;
      if (revAcademicCourse) revAcademicCourse.textContent = formDataStore.course + (formDataStore.institution ? ` (${formDataStore.institution})` : '');
      if (revGradYear) revGradYear.textContent = formDataStore.gradYear + (formDataStore.gpa ? ` (GPA: ${formDataStore.gpa})` : '');
      if (revPrefDestination) revPrefDestination.textContent = formDataStore.destination;
      if (revPrefSubject) revPrefSubject.textContent = `${formDataStore.level} in ${formDataStore.subject}`;
      if (revPrefIntake) revPrefIntake.textContent = formDataStore.intake;

      // Update package info in Step 2 Review
      updateSelectedPlan(currentPlanId);

      // Transition to Step 2
      goToStep(2);
    });
  }

  // Step 2 Button Handlers
  if (btnEditStudentDetails) {
    btnEditStudentDetails.addEventListener('click', () => goToStep(1));
  }

  if (btnBackToForm) {
    btnBackToForm.addEventListener('click', () => goToStep(1));
  }

  if (btnProceedToPayment) {
    btnProceedToPayment.addEventListener('click', () => {
      // Generate new mock order reference
      currentOrderRef = 'SUB-2026-' + Math.floor(10000 + Math.random() * 90000);

      // Populate Step 3 Payment details
      if (payStudentName) payStudentName.textContent = formDataStore.fullName || 'Student';
      if (payOrderRef) payOrderRef.textContent = currentOrderRef;

      goToStep(3);
    });
  }

  // Step 3 Payment Simulation
  if (btnBackToReviewFromPay) {
    btnBackToReviewFromPay.addEventListener('click', () => goToStep(2));
  }

  if (btnPayNow) {
    btnPayNow.addEventListener('click', () => {
      // Start demonstration payment processing
      btnPayNow.disabled = true;
      btnPayNow.classList.add('d-none');
      if (paymentLoadingIndicator) {
        paymentLoadingIndicator.classList.remove('d-none');
      }

      // Simulate 2.4-second authorization and enrollment confirmation
      setTimeout(() => {
        // Success scenario
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        // Populate receipt
        if (sucStudentName) sucStudentName.textContent = formDataStore.fullName || 'Student';
        if (sucOrderRef) sucOrderRef.textContent = currentOrderRef;
        if (sucDestination) sucDestination.textContent = formDataStore.destination || 'Selected Destination';
        if (sucEnrollmentDate) sucEnrollmentDate.textContent = formattedDate;

        goToStep(4);
      }, 2400);
    });
  }

  // Step 4 Success Actions
  if (btnPrintReceipt) {
    btnPrintReceipt.addEventListener('click', () => {
      window.print();
    });
  }

  // Step 5 Failure / Retry
  if (btnRetryPayment) {
    btnRetryPayment.addEventListener('click', () => {
      goToStep(3);
    });
  }

  if (btnBackToReviewFromFail) {
    btnBackToReviewFromFail.addEventListener('click', () => {
      goToStep(2);
    });
  }

  // --- PARSE URL QUERY PARAMETER ---
  function parseUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const planParam = params.get('plan');
    if (planParam && ['essential', 'complete', 'premium'].includes(planParam.toLowerCase())) {
      openCheckout(planParam.toLowerCase());
    }
  }

  // --- FOOTER YEAR & NEWSLETTER ---
  const footerYear = document.getElementById('footerYear');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterMessage = document.getElementById('newsletterMessage');

  if (newsletterForm && newsletterEmail && newsletterMessage) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        newsletterMessage.textContent = 'Please enter a valid email address.';
        newsletterMessage.style.color = '#dc3545';
        newsletterMessage.style.display = 'block';
        return;
      }

      newsletterMessage.textContent = 'Thank you for subscribing to our study abroad updates!';
      newsletterMessage.style.color = '#198754';
      newsletterMessage.style.display = 'block';
      newsletterEmail.value = '';

      setTimeout(() => {
        newsletterMessage.style.display = 'none';
      }, 5000);
    });
  }

  // --- INITIALIZATION ---
  renderPricingCards();
  renderComparisonTable();
  renderFaqs();
  restoreDraft();
  updateSelectedPlan(currentPlanId);
  parseUrlParams();
  initScrollReveal();
});
