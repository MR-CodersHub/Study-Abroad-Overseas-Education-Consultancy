/**
 * home2.js — Study Upbroad (Home 2: Niche-Specific Landing Page)
 * Vanilla JavaScript interactions: timeline tabs, testimonial slider, scroll reveal
 */
(function () {
  'use strict';

  /* ============================================================
     1. SCROLL REVEAL (IntersectionObserver)
     ============================================================ */
  function initReveal() {
    var reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up, .reveal-scale');
    if (!reveals.length) return;

    if (!('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('revealed'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  /* ============================================================
     2. INTERACTIVE JOURNEY TIMELINE (Section 4)
     ============================================================ */
  function initTimeline() {
    var stepBtns = document.querySelectorAll('.timeline-step-btn');
    var details = document.querySelectorAll('.timeline-detail-content');
    var progress = document.getElementById('timelineProgress');
    var navWrapper = document.querySelector('.timeline-nav-wrapper');
    var trackLine = document.querySelector('.timeline-track-line');
    var flight = document.getElementById('timelineFlight');
    var motionToggle = document.getElementById('timelineAnimationToggle');
    var motionToggleLabel = document.getElementById('timelineAnimationToggleLabel');
    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!stepBtns.length || !details.length || !navWrapper) return;

    var total = stepBtns.length;
    var currentIndex = 0;
    var autoplayTimer = null;
    var launchTimer = null;
    var transitionTimer = null;
    var pendingStepIndex = null;
    var isPlaying = false;
    var isComplete = false;
    var hasLaunched = false;
    var userInteracted = false;
    var flightDuration = 1000;
    var stepDelay = 900;

    function getFlightVector(index) {
      var fromIndex = index < total - 1 ? index : index - 1;
      var toIndex = index < total - 1 ? index + 1 : index;
      var fromNode = stepBtns[fromIndex].querySelector('.timeline-node').getBoundingClientRect();
      var toNode = stepBtns[toIndex].querySelector('.timeline-node').getBoundingClientRect();
      var dx = (toNode.left + toNode.width / 2) - (fromNode.left + fromNode.width / 2);
      var dy = (toNode.top + toNode.height / 2) - (fromNode.top + fromNode.height / 2);
      var distance = Math.sqrt(dx * dx + dy * dy) || 1;
      return { x: dx / distance, y: dy / distance };
    }

    function positionFlight(index, beforeStep, instant) {
      if (!flight) return;
      var node = stepBtns[index].querySelector('.timeline-node').getBoundingClientRect();
      var wrapper = navWrapper.getBoundingClientRect();
      var vector = getFlightVector(index);
      var line = trackLine && trackLine.getBoundingClientRect();
      var lineVisible = line && line.width > 0 && window.getComputedStyle(trackLine).display !== 'none';
      var compactScreen = window.matchMedia && window.matchMedia('(max-width: 430px)').matches;
      var offset = compactScreen ? 30 : 36;
      var direction = beforeStep ? -1 : 1;
      var x = node.left + node.width / 2 - wrapper.left + vector.x * offset * direction;
      var y = node.top + node.height / 2 - wrapper.top + vector.y * offset * direction;

      if (lineVisible) {
        y = line.top + line.height / 2 - wrapper.top;
      }

      flight.style.transition = instant ? 'none' : '';
      flight.style.left = x + 'px';
      flight.style.top = y + 'px';
      flight.style.transform = 'translate(-50%, -50%) rotate(' + Math.atan2(vector.y, vector.x) * (180 / Math.PI) + 'deg)';

      if (instant) {
        flight.offsetWidth;
        flight.style.removeProperty('transition');
      }
    }

    function setMotionState(state) {
      if (!motionToggle || !motionToggleLabel) return;
      motionToggle.setAttribute('data-state', state);
      motionToggle.setAttribute('aria-pressed', state === 'playing' ? 'true' : 'false');

      if (state === 'playing') {
        motionToggle.setAttribute('aria-label', 'Pause journey animation');
        motionToggleLabel.textContent = 'Pause journey';
      } else if (state === 'complete') {
        motionToggle.setAttribute('aria-label', 'Replay journey animation');
        motionToggleLabel.textContent = 'Replay journey';
      } else {
        motionToggle.setAttribute('aria-label', 'Play journey animation');
        motionToggleLabel.textContent = 'Play journey';
      }
    }

    function setStep(index, instant) {
      currentIndex = index;
      stepBtns.forEach(function (btn, i) {
        btn.classList.remove('active', 'completed');
        btn.setAttribute('aria-selected', i === index ? 'true' : 'false');
        if (i < index) {
          btn.classList.add('completed');
        } else if (i === index) {
          btn.classList.add('active');
        }
      });

      details.forEach(function (card, i) {
        card.classList.toggle('active', i === index);
      });

      if (progress) {
        var line = trackLine && trackLine.getBoundingClientRect();
        var node = stepBtns[index].querySelector('.timeline-node').getBoundingClientRect();
        var lineVisible = line && line.width > 0 && window.getComputedStyle(trackLine).display !== 'none';
        var rtl = document.documentElement.getAttribute('dir') === 'rtl';
        var nodeCenter = node.left + node.width / 2;
        var distance = line ? (rtl ? line.right - nodeCenter : nodeCenter - line.left) : 0;
        var pct = lineVisible ? (distance / line.width) * 100 : 0;
        progress.style.width = pct + '%';
      }

      positionFlight(index, false, !!instant);
    }

    function clearAutoplay() {
      if (launchTimer !== null) {
        window.clearTimeout(launchTimer);
        launchTimer = null;
      }
      if (autoplayTimer !== null) {
        window.clearTimeout(autoplayTimer);
        autoplayTimer = null;
      }
      if (transitionTimer !== null) {
        window.clearTimeout(transitionTimer);
        transitionTimer = null;
      }
      isPlaying = false;
    }

    function freezeFlight() {
      if (!flight) return;
      var style = window.getComputedStyle(flight);
      var left = style.left;
      var top = style.top;
      var transform = style.transform;
      flight.style.transition = 'none';
      flight.style.left = left;
      flight.style.top = top;
      flight.style.transform = transform;
      flight.offsetWidth;
      flight.style.removeProperty('transition');
    }

    function finishStepTransition() {
      if (!isPlaying || pendingStepIndex === null) return;
      var arrivedIndex = pendingStepIndex;
      pendingStepIndex = null;
      transitionTimer = null;
      setStep(arrivedIndex);

      if (arrivedIndex === total - 1) {
        clearAutoplay();
        isComplete = true;
        setMotionState('complete');
        return;
      }

      autoplayTimer = window.setTimeout(advanceStep, stepDelay);
    }

    function advanceStep() {
      autoplayTimer = null;
      if (currentIndex >= total - 1) {
        clearAutoplay();
        isComplete = true;
        setMotionState('complete');
        return;
      }

      pendingStepIndex = currentIndex + 1;
      positionFlight(pendingStepIndex, false, false);
      transitionTimer = window.setTimeout(finishStepTransition, flightDuration);
    }

    function updateTimelineLayout() {
      setStep(currentIndex, true);
      if (pendingStepIndex !== null && isPlaying) {
        positionFlight(pendingStepIndex, false, false);
        if (transitionTimer !== null) window.clearTimeout(transitionTimer);
        transitionTimer = window.setTimeout(finishStepTransition, flightDuration);
      } else if (!hasLaunched && !isPlaying) {
        positionFlight(0, true, true);
      }
    }

    function playJourney() {
      if (reducedMotion || isPlaying) return;

      if (isComplete || currentIndex >= total - 1) {
        isComplete = false;
        hasLaunched = false;
        pendingStepIndex = null;
        setStep(0);
        positionFlight(0, true, true);
      }

      isPlaying = true;
      setMotionState('playing');

      if (!hasLaunched) {
        positionFlight(0, true, true);
        launchTimer = window.setTimeout(function () {
          if (!isPlaying) return;
          positionFlight(0, false, false);
          hasLaunched = true;
          launchTimer = null;
          autoplayTimer = window.setTimeout(advanceStep, stepDelay);
        }, 400);
        return;
      }

      if (pendingStepIndex !== null) {
        positionFlight(pendingStepIndex, false, false);
        transitionTimer = window.setTimeout(finishStepTransition, flightDuration);
        return;
      }

      positionFlight(currentIndex, false, false);
      autoplayTimer = window.setTimeout(advanceStep, stepDelay);
    }

    stepBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var stepIdx = parseInt(this.getAttribute('data-step') || '0', 10);
        userInteracted = true;
        clearAutoplay();
        pendingStepIndex = null;
        isComplete = false;
        hasLaunched = true;
        setStep(stepIdx);
        setMotionState('idle');
      });
    });

    if (motionToggle) {
      if (reducedMotion) {
        motionToggle.hidden = true;
      } else {
        motionToggle.addEventListener('click', function () {
          userInteracted = true;
          if (isPlaying) {
            freezeFlight();
            clearAutoplay();
            setMotionState('idle');
            return;
          }

          playJourney();
        });
      }
    }

    window.addEventListener('resize', function () {
      updateTimelineLayout();
    });

    if ('MutationObserver' in window) {
      var directionObserver = new MutationObserver(function () {
        updateTimelineLayout();
      });
      directionObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] });
    }

    setStep(0);
    positionFlight(0, true, true);
    setMotionState('idle');

    if (!reducedMotion && 'IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          if (!userInteracted) playJourney();
        }
      }, { threshold: 0.35 });
      observer.observe(navWrapper);
    }
  }

  /* ============================================================
     3. TESTIMONIAL SLIDER (Section 8)
     ============================================================ */
  function initTestimonialSlider() {
    var track = document.getElementById('home2TestimonialTrack');
    var slides = document.querySelectorAll('.home2-testimonial-card-slide');
    var prevBtn = document.getElementById('home2TestimonialPrev');
    var nextBtn = document.getElementById('home2TestimonialNext');
    var dotsWrap = document.getElementById('home2TestimonialDots');
    if (!track || !slides.length) return;

    var currentIndex = 0;
    var total = slides.length;

    // Build dots
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to review ' + (i + 1));
        dot.addEventListener('click', function () { goTo(i); });
        dotsWrap.appendChild(dot);
      });
    }

    function updateDots() {
      if (!dotsWrap) return;
      dotsWrap.querySelectorAll('.dot').forEach(function (d, i) {
        d.classList.toggle('active', i === currentIndex);
      });
    }

    function goTo(index) {
      currentIndex = (index + total) % total;
      track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
      updateDots();
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(currentIndex - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(currentIndex + 1); });

    // Touch swipe support
    var startX = 0;
    track.addEventListener('touchstart', function (e) {
      startX = e.changedTouches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', function (e) {
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        goTo(diff > 0 ? currentIndex + 1 : currentIndex - 1);
      }
    }, { passive: true });
  }

  /* ============================================================
     4. SMOOTH SCROLL FOR IN-PAGE ANCHORS
     ============================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        var targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          var nb = document.getElementById('mainNavbar');
          var offset = nb ? nb.offsetHeight : 80;
          var top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset - 16;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ============================================================
     INITIALIZATION
     ============================================================ */
  function init() {
    initReveal();
    initTimeline();
    initTestimonialSlider();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
