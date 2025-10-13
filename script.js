// ===== HALF-LIFE PORTFOLIO JAVASCRIPT =====

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initCustomCursor();
  initTerminalOverlay();
  initNavigation();
  initSmoothScrolling();
  initSkillBars();
  initProjectCards();
  initContactForm();
  initScrollAnimations();
  initHalfLife2Audio();
  initHalfLife2HUD();
  initContentLoader();
  initLanguageSystem();
});

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
  const cursor = document.querySelector(".custom-cursor");
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Cursor interactions
  const interactiveElements = document.querySelectorAll(
    "a, button, .project-card, .nav-link"
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.style.transform = "scale(2)";
      cursor.style.background = "rgba(255, 106, 0, 0.5)";
    });

    element.addEventListener("mouseleave", () => {
      cursor.style.transform = "scale(1)";
      cursor.style.background = "#FF6A00";
    });
  });
}

// ===== TERMINAL OVERLAY =====
function initTerminalOverlay() {
  const overlay = document.getElementById("terminalOverlay");
  const terminalText = document.getElementById("terminalText");

  // Hide overlay after animation
  setTimeout(() => {
    overlay.classList.add("hidden");
    setTimeout(() => {
      overlay.style.display = "none";
    }, 2000);
  }, 4000);

  // Add typing effect to terminal
  const lines = terminalText.querySelectorAll(".terminal-line");
  lines.forEach((line, index) => {
    line.style.animationDelay = `${0.5 + index * 0.5}s`;
  });
}

// ===== NAVIGATION =====
function initNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinksContainer = document.querySelector(".nav-links");

  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    navLinksContainer.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  // Section navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetSection = link.getAttribute("data-section");

      // Remove active class from all links and sections
      navLinks.forEach((l) => l.classList.remove("active"));
      sections.forEach((s) => s.classList.remove("active"));

      // Add active class to clicked link and target section
      link.classList.add("active");
      const targetElement = document.getElementById(targetSection);
      if (targetElement) {
        targetElement.classList.add("active");

        // Smooth scroll to section without any offset
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }

      // Play click sound
      playSound("click");

      // Close mobile menu if open
      navLinksContainer.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });

  // Button navigation
  const buttons = document.querySelectorAll("[data-target]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-target");
      const targetSection = document.getElementById(target);
      const targetLink = document.querySelector(`[data-section="${target}"]`);

      if (targetSection && targetLink) {
        // Remove active class from all links and sections
        navLinks.forEach((l) => l.classList.remove("active"));
        sections.forEach((s) => s.classList.remove("active"));

        // Add active class to target link and section
        targetLink.classList.add("active");
        targetSection.classList.add("active");

        // Smooth scroll to section
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });

        // Play click sound
        playSound("click");

        // Set manual navigation flag
        isManualNavigation = true;
        setTimeout(() => {
          isManualNavigation = false;
        }, 1000);
      }
    });
  });

  // Scroll spy - only update nav links, don't interfere with manual navigation
  let isManualNavigation = false;

  window.addEventListener("scroll", () => {
    if (isManualNavigation) return; // Skip during manual navigation

    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const correspondingLink = document.querySelector(
        `[data-section="${sectionId}"]`
      );

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((l) => l.classList.remove("active"));
        if (correspondingLink) {
          correspondingLink.classList.add("active");
        }
      }
    });
  });

  // Set flag during manual navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      isManualNavigation = true;
      setTimeout(() => {
        isManualNavigation = false;
      }, 1000); // Reset after 1 second
    });
  });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// ===== SKILL BARS ANIMATION =====
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-fill");

  // Create block structure for each skill bar
  skillBars.forEach((skillFill) => {
    const level = parseInt(skillFill.getAttribute("data-level"));
    const totalBlocks = 10; // Total number of blocks
    const activeBlocks = Math.round((level / 100) * totalBlocks);

    // Clear existing content
    skillFill.innerHTML = "";

    // Create active blocks
    for (let i = 0; i < activeBlocks; i++) {
      const block = document.createElement("div");
      block.className = "skill-block";
      block.style.animationDelay = `${i * 0.1}s`;
      skillFill.appendChild(block);
    }

    // Create inactive blocks
    for (let i = activeBlocks; i < totalBlocks; i++) {
      const block = document.createElement("div");
      block.className = "skill-block inactive";
      skillFill.appendChild(block);
    }

    // Set width based on level
    skillFill.style.width = level + "%";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillFill = entry.target;
          const level = skillFill.getAttribute("data-level");
          skillFill.style.width = level + "%";

          // Animate blocks
          const blocks = skillFill.querySelectorAll(
            ".skill-block:not(.inactive)"
          );
          blocks.forEach((block, index) => {
            setTimeout(() => {
              block.style.animation = "blockAppear 0.3s ease forwards";
            }, index * 100);
          });

          playSound("skillup");
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => {
    observer.observe(bar);
  });
}

// ===== PROJECT CARDS =====
function initProjectCards() {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      // Add glow effect
      card.style.boxShadow = "0 0 50px rgba(255, 106, 0, 0.4)";

      // Play hover sound
      playSound("hover");

      // Animate status indicator
      const status = card.querySelector(".project-status");
      if (status) {
        status.style.animation = "pulse 0.5s ease";
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = "";
      const status = card.querySelector(".project-status");
      if (status) {
        status.style.animation = "";
      }
    });

    // Add click effect
    card.addEventListener("click", () => {
      card.style.transform = "scale(0.98)";
      setTimeout(() => {
        card.style.transform = "";
      }, 150);
      playSound("click");
    });
  });
}

// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.querySelector(".contact-form");
  const inputs = form.querySelectorAll(".form-input, .form-textarea");
  const submitBtn = form.querySelector(".btn-primary");

  // Input focus effects
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.style.borderColor = "#FF6A00";
      input.style.boxShadow = "0 0 15px rgba(255, 106, 0, 0.3)";
      playSound("beep");
    });

    input.addEventListener("blur", () => {
      if (!input.value) {
        input.style.borderColor = "#2A2A2A";
        input.style.boxShadow = "";
      }
    });

    // Typing effect
    input.addEventListener("input", () => {
      if (input.value.length > 0) {
        input.style.borderColor = "#00FF80";
      } else {
        input.style.borderColor = "#FF6A00";
      }
    });
  });

  // Form submission
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Add loading state
    submitBtn.innerHTML =
      '<span class="btn-text">ENVIANDO...</span><span class="btn-icon">📡</span>';
    submitBtn.style.background = "#00FF80";
    submitBtn.style.color = "#0F0F0F";

    // Play sending sound
    playSound("send");

    // Simulate sending
    setTimeout(() => {
      submitBtn.innerHTML =
        '<span class="btn-text">MENSAJE ENVIADO</span><span class="btn-icon">✓</span>';

      // Reset form
      setTimeout(() => {
        form.reset();
        submitBtn.innerHTML =
          '<span class="btn-text">SEND MESSAGE</span><span class="btn-icon">📡</span>';
        submitBtn.style.background = "";
        submitBtn.style.color = "";

        // Reset input styles
        inputs.forEach((input) => {
          input.style.borderColor = "#2A2A2A";
          input.style.boxShadow = "";
        });
      }, 2000);
    }, 1500);
  });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        // Add staggered animation for grid items
        if (entry.target.classList.contains("project-card")) {
          const delay =
            Array.from(entry.target.parentNode.children).indexOf(entry.target) *
            0.1;
          entry.target.style.animationDelay = `${delay}s`;
          entry.target.classList.add("loading");
        }
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".about-card, .project-card, .skills-hud, .contact-container"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// ===== SOUND EFFECTS =====
function initSoundEffects() {
  // Create audio context for sound effects
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Sound effect functions
  window.playSound = function (type) {
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Different sound effects
    switch (type) {
      case "click":
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(
          400,
          audioContext.currentTime + 0.1
        );
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.1
        );
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
        break;

      case "hover":
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(
          800,
          audioContext.currentTime + 0.05
        );
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.05
        );
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.05);
        break;

      case "beep":
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.05
        );
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.05);
        break;

      case "skillup":
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(
          800,
          audioContext.currentTime + 0.2
        );
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.2
        );
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
        break;

      case "send":
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(
          1000,
          audioContext.currentTime + 0.3
        );
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.3
        );
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
        break;
    }
  };
}

// ===== GLITCH EFFECT =====
function initGlitchEffect() {
  const glitchElements = document.querySelectorAll(".glitch");

  glitchElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      element.style.animation = "glitch 0.3s ease-in-out";
    });

    element.addEventListener("animationend", () => {
      element.style.animation = "";
    });
  });
}

// ===== PARALLAX EFFECT =====
function initParallax() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".parallax");

    parallaxElements.forEach((element) => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
  const typingElements = document.querySelectorAll(".typing-effect");

  typingElements.forEach((element) => {
    const text = element.textContent;
    element.textContent = "";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    // Start typing when element is visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          typeWriter();
          observer.unobserve(element);
        }
      });
    });

    observer.observe(element);
  });
}

// ===== KEYBOARD SHORTCUTS =====
function initKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    // ESC key to close mobile menu
    if (e.key === "Escape") {
      const navLinks = document.querySelector(".nav-links");
      const navToggle = document.querySelector(".nav-toggle");
      navLinks.classList.remove("active");
      navToggle.classList.remove("active");
    }

    // Number keys for navigation
    if (e.key >= "1" && e.key <= "6") {
      const sections = [
        "home",
        "about",
        "experience",
        "skills",
        "education",
        "contact",
      ];
      const sectionIndex = parseInt(e.key) - 1;
      if (sections[sectionIndex]) {
        const targetSection = document.getElementById(sections[sectionIndex]);
        const targetLink = document.querySelector(
          `[data-section="${sections[sectionIndex]}"]`
        );

        if (targetSection && targetLink) {
          document
            .querySelectorAll(".nav-link")
            .forEach((l) => l.classList.remove("active"));
          document
            .querySelectorAll(".section")
            .forEach((s) => s.classList.remove("active"));

          targetLink.classList.add("active");
          targetSection.classList.add("active");

          // Smooth scroll to section
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });

          playSound("click");
        }
      }
    }
  });
}

// ===== INITIALIZE ALL FEATURES =====
document.addEventListener("DOMContentLoaded", function () {
  initGlitchEffect();
  initParallax();
  initTypingEffect();
  initKeyboardShortcuts();
});

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Random glitch effect
function randomGlitch() {
  const elements = document.querySelectorAll(".brand-text");
  elements.forEach((element) => {
    if (Math.random() < 0.1) {
      // 10% chance
      element.classList.add("glitch");
      setTimeout(() => {
        element.classList.remove("glitch");
      }, 300);
    }
  });
}

// Run random glitch effect occasionally
setInterval(randomGlitch, 10000);

// ===== PERFORMANCE OPTIMIZATIONS =====

// Lazy loading for images
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Preload critical resources
function preloadResources() {
  const criticalImages = [
    // Add paths to critical images here
  ];

  criticalImages.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });
}

// Initialize performance optimizations
document.addEventListener("DOMContentLoaded", function () {
  initLazyLoading();
  preloadResources();
});

// ===== ERROR HANDLING =====
window.addEventListener("error", function (e) {
  console.error("Portfolio Error:", e.error);
  // You could send error reports to a logging service here
});

// ===== ACCESSIBILITY IMPROVEMENTS =====
function initAccessibility() {
  // Skip to main content link
  const skipLink = document.createElement("a");
  skipLink.href = "#main";
  skipLink.textContent = "Saltar al contenido principal";
  skipLink.className = "skip-link";
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #FF6A00;
        color: #0F0F0F;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
        border-radius: 4px;
    `;

  skipLink.addEventListener("focus", () => {
    skipLink.style.top = "6px";
  });

  skipLink.addEventListener("blur", () => {
    skipLink.style.top = "-40px";
  });

  document.body.insertBefore(skipLink, document.body.firstChild);

  // Add main landmark
  const main = document.querySelector(".main-container");
  if (main) {
    main.id = "main";
    main.setAttribute("role", "main");
  }

  // Improve focus management
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation");
    }
  });

  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-navigation");
  });
}

// Initialize accessibility features
document.addEventListener("DOMContentLoaded", initAccessibility);

// ===== HALF-LIFE 2 AUDIO SYSTEM =====
function initHalfLife2Audio() {
  let backgroundMusic = document.getElementById("backgroundMusic");
  let menuHover = document.getElementById("menuHover");
  let menuClick = document.getElementById("menuClick");
  let menuSelect = document.getElementById("menuSelect");

  let isMusicPlaying = false;
  let isMuted = false;
  let hasPlayedOnce = false;

  const audioToggle = document.getElementById("audioToggle");
  const audioIcon = document.getElementById("audioIcon");

  // Set music volume to 40%
  backgroundMusic.volume = 0.4;

  // Play Half-Life 2 menu sounds
  function playMenuSound(sound) {
    if (isMuted) return;
    sound.currentTime = 0;
    sound.play().catch((e) => console.log("Audio play failed:", e));
  }

  // Play background music once
  function playBackgroundMusic() {
    if (isMuted || hasPlayedOnce) return;

    backgroundMusic.currentTime = 0;
    backgroundMusic
      .play()
      .then(() => {
        isMusicPlaying = true;
        hasPlayedOnce = true;
        audioToggle.classList.remove("muted");
        audioIcon.className = "fas fa-volume-up";
      })
      .catch((e) => console.log("Music play failed:", e));

    // When music ends, don't replay
    backgroundMusic.addEventListener("ended", () => {
      isMusicPlaying = false;
      audioToggle.classList.add("muted");
      audioIcon.className = "fas fa-volume-mute";
    });
  }

  // Toggle mute
  function toggleMute() {
    isMuted = !isMuted;

    if (isMuted) {
      backgroundMusic.pause();
      audioToggle.classList.add("muted");
      audioIcon.className = "fas fa-volume-mute";
    } else {
      if (!hasPlayedOnce) {
        playBackgroundMusic();
      } else if (isMusicPlaying) {
        backgroundMusic.play();
      }
      audioToggle.classList.remove("muted");
      audioIcon.className = "fas fa-volume-up";
    }
  }

  // Event listeners
  audioToggle.addEventListener("click", toggleMute);

  // Add menu sounds to navigation
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => playMenuSound(menuHover));
    link.addEventListener("click", () => playMenuSound(menuClick));
  });

  // Add menu sounds to buttons
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => playMenuSound(menuHover));
    button.addEventListener("click", () => playMenuSound(menuClick));
  });

  // Auto-start music after first user interaction
  let hasUserInteracted = false;
  function handleUserInteraction() {
    if (!hasUserInteracted) {
      hasUserInteracted = true;
      playBackgroundMusic();
    }
  }

  document.addEventListener("click", handleUserInteraction, { once: true });
  document.addEventListener("keydown", handleUserInteraction, { once: true });
  document.addEventListener("touchstart", handleUserInteraction, {
    once: true,
  });

  // Keyboard shortcut for mute (M key)
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "m" && !e.ctrlKey && !e.metaKey) {
      toggleMute();
    }
  });
}

// ===== LANGUAGE SYSTEM =====
function initLanguageSystem() {
  let currentLanguage = "es"; // Default language

  const langButtons = document.querySelectorAll(".lang-btn");
  const elementsWithLang = document.querySelectorAll("[data-es][data-en]");

  // Language content database
  const languageContent = {
    es: {
      // Navigation
      home: "INICIO",
      about: "ACERCA",
      experience: "EXPERIENCIA",
      skills: "HABILIDADES",
      education: "EDUCACIÓN",
      contact: "CONTACTO",

      // Home section
      homeTitle: "BENJAMÍN CÁCERES",
      homeSubtitle: "iOS Software Engineer",
      homeDescription:
        "Desarrollador iOS especializado con 4+ años de experiencia construyendo aplicaciones escalables en banca, fintech y consultoría. Experto en Swift, UIKit y arquitecturas modernas (VIPER, MVVM, MVC).",
      yearsExperience: "Años Experiencia",
      companiesLed: "Empresas Lideradas",
      englishLevel: "Inglés Proficiente",
      viewExperience: "VER EXPERIENCIA",
      contact: "CONTACTO",

      // About section
      profileTitle: "PERFIL DE iOS ENGINEER",
      profileDescription:
        "iOS Software Engineer con 4+ años de experiencia construyendo aplicaciones escalables en banca, fintech y consultoría. Especializado en Swift, UIKit y arquitecturas modernas como VIPER, MVVM y MVC. Experto en liderar equipos, mentoring y entregar funcionalidades de alto impacto en entornos Agile.",
      iosSpecialist: "Especialista en desarrollo iOS nativo",
      architectureExpert: "Experto en arquitecturas VIPER, MVVM, MVC",
      teamLeader: "Líder de equipos y mentor",
      computerEngineer: "Ingeniero en Ciencias de la Computación",

      // Experience section
      current: "ACTUAL",
      completed: "COMPLETADO",
      founder: "FUNDADOR",

      // Skills section
      iosDevelopment: "DESARROLLO iOS",
      architecturesPatterns: "ARQUITECTURAS Y PATRONES",
      toolsTechnologies: "HERRAMIENTAS Y TECNOLOGÍAS",

      // Education section
      inProgress: "EN PROGRESO",

      // Contact section
      name: "NOMBRE:",
      email: "EMAIL:",
      subject: "ASUNTO:",
      message: "MENSAJE:",
      sendMessage: "ENVIAR MENSAJE",
      nativeSpanish: "Español nativo | Inglés C2",

      // Footer
      footerText: "© 2024 Benjamín Cáceres - iOS Engineer",
      systemStatus: "ESTADO DEL SISTEMA: EN LÍNEA",
    },
    en: {
      // Navigation
      home: "HOME",
      about: "ABOUT",
      experience: "EXPERIENCE",
      skills: "SKILLS",
      education: "EDUCATION",
      contact: "CONTACT",

      // Home section
      homeTitle: "BENJAMÍN CÁCERES",
      homeSubtitle: "iOS Software Engineer",
      homeDescription:
        "iOS developer specialized with 4+ years of experience building scalable apps in banking, fintech, and consulting. Expert in Swift, UIKit, and modern architectures (VIPER, MVVM, MVC).",
      yearsExperience: "Years Experience",
      companiesLed: "Companies Led",
      englishLevel: "Proficient English",
      viewExperience: "VIEW EXPERIENCE",
      contact: "CONTACT",

      // About section
      profileTitle: "iOS ENGINEER PROFILE",
      profileDescription:
        "iOS Software Engineer with 4+ years of experience building scalable applications in banking, fintech, and consulting. Specialized in Swift, UIKit, and modern architectures like VIPER, MVVM, and MVC. Expert in leading teams, mentoring, and delivering high-impact features in Agile environments.",
      iosSpecialist: "Specialist in native iOS development",
      architectureExpert: "Expert in VIPER, MVVM, MVC architectures",
      teamLeader: "Team leader and mentor",
      computerEngineer: "Computer Science Engineer",

      // Experience section
      current: "CURRENT",
      completed: "COMPLETED",
      founder: "FOUNDER",

      // Skills section
      iosDevelopment: "iOS DEVELOPMENT",
      architecturesPatterns: "ARCHITECTURES & PATTERNS",
      toolsTechnologies: "TOOLS & TECHNOLOGIES",

      // Education section
      inProgress: "IN PROGRESS",

      // Contact section
      name: "NAME:",
      email: "EMAIL:",
      subject: "SUBJECT:",
      message: "MESSAGE:",
      sendMessage: "SEND MESSAGE",
      nativeSpanish: "Native Spanish | English C2",

      // Footer
      footerText: "© 2024 Benjamín Cáceres - iOS Engineer",
      systemStatus: "SYSTEM STATUS: ONLINE",
    },
  };

  // Update element text based on language
  function updateElementText(element, lang) {
    if (element.hasAttribute(`data-${lang}`)) {
      element.textContent = element.getAttribute(`data-${lang}`);
    }
  }

  // Update all translatable elements
  function updateLanguage(lang) {
    currentLanguage = lang;

    // Update elements with data attributes
    elementsWithLang.forEach((element) => {
      updateElementText(element, lang);
    });

    // Update specific content elements
    updateSpecificContent(lang);

    // Update active language button
    langButtons.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.getAttribute("data-lang") === lang) {
        btn.classList.add("active");
      }
    });

    // Save language preference
    localStorage.setItem("portfolioLanguage", lang);

    // Play language change sound
    playSound("beep");
  }

  // Update specific content elements
  function updateSpecificContent(lang) {
    const content = languageContent[lang];

    // Update all elements with data attributes
    const elementsWithLang = document.querySelectorAll("[data-es][data-en]");
    elementsWithLang.forEach((element) => {
      if (element.hasAttribute(`data-${lang}`)) {
        element.textContent = element.getAttribute(`data-${lang}`);
      }
    });

    // Update navigation
    document.querySelectorAll(".nav-link").forEach((link, index) => {
      const keys = [
        "home",
        "about",
        "experience",
        "skills",
        "education",
        "contact",
      ];
      if (content[keys[index]]) {
        link.textContent = content[keys[index]];
      }
    });

    // Update home section
    const homeTitle = document.querySelector(".home-title");
    if (homeTitle && content.homeTitle) {
      homeTitle.innerHTML = `<span class="title-line">BENJAMÍN</span><span class="title-line highlight">CÁCERES</span>`;
    }

    // Update footer
    const footerText = document.querySelector(".footer-text");
    if (footerText && content.footerText) {
      footerText.textContent = content.footerText;
    }

    const footerStatus = document.querySelector(".footer-status");
    if (footerStatus && content.systemStatus) {
      footerStatus.textContent = content.systemStatus;
    }
  }

  // Event listeners for language buttons
  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      updateLanguage(lang);
    });
  });

  // Load saved language preference
  const savedLanguage = localStorage.getItem("portfolioLanguage");
  if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
    updateLanguage(savedLanguage);
  }

  // Add keyboard shortcut for language toggle (L key)
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "l" && !e.ctrlKey && !e.metaKey) {
      const newLang = currentLanguage === "es" ? "en" : "es";
      updateLanguage(newLang);
    }
  });
}

// ===== HALF-LIFE 2 HUD SYSTEM =====
function initHalfLife2HUD() {
  const healthFill = document.querySelector(".health-fill");
  const suitFill = document.querySelector(".suit-fill");
  const healthText = document.querySelector(".hud-health .hud-text");
  const suitText = document.querySelector(".hud-suit .hud-text");

  // Animate HUD bars
  function animateHUD() {
    // Health bar animation
    let health = 100;
    let suit = 100;

    setInterval(() => {
      // Randomly change health and suit values slightly
      health += (Math.random() - 0.5) * 2;
      suit += (Math.random() - 0.5) * 2;

      // Keep values in range
      health = Math.max(95, Math.min(100, health));
      suit = Math.max(90, Math.min(100, suit));

      // Update display
      healthFill.style.width = health + "%";
      suitFill.style.width = suit + "%";
      healthText.textContent = Math.round(health);
      suitText.textContent = Math.round(suit);
    }, 2000);
  }

  // Start HUD animations
  setTimeout(animateHUD, 1000);

  // Add crosshair pulse effect
  const crosshair = document.querySelector(".crosshair-dot");
  setInterval(() => {
    crosshair.style.transform = "translate(-50%, -50%) scale(1.2)";
    setTimeout(() => {
      crosshair.style.transform = "translate(-50%, -50%) scale(1)";
    }, 100);
  }, 3000);
}

// ===== CONTENT LOADER SYSTEM =====
function initContentLoader() {
  let contentData = null;

  // Load content from JSON
  async function loadContent() {
    try {
      const response = await fetch("content.json");
      contentData = await response.json();
      console.log("Content loaded successfully");
    } catch (error) {
      console.error("Failed to load content:", error);
    }
  }

  // Update content based on language
  function updateContent(language) {
    if (!contentData) return;

    const content = contentData[language];
    if (!content) return;

    // Update navigation
    const navLinks = document.querySelectorAll(".nav-link");
    const navKeys = [
      "home",
      "about",
      "experience",
      "skills",
      "education",
      "contact",
    ];
    navLinks.forEach((link, index) => {
      if (content.navigation[navKeys[index]]) {
        link.textContent = content.navigation[navKeys[index]];
      }
    });

    // Update terminal content
    const terminalLines = document.querySelectorAll(".terminal-line");
    if (content.terminal && content.terminal.lines) {
      terminalLines.forEach((line, index) => {
        if (content.terminal.lines[index]) {
          line.textContent = content.terminal.lines[index];
        }
      });
    }

    // Update home section
    if (content.home) {
      const homeSubtitle = document.querySelector(".home-subtitle");
      const homeDescription = document.querySelector(".home-description");

      if (homeSubtitle && content.home.subtitle) {
        homeSubtitle.textContent = content.home.subtitle;
      }
      if (homeDescription && content.home.description) {
        homeDescription.textContent = content.home.description;
      }

      // Update stats
      const statLabels = document.querySelectorAll(".stat-label");
      const statKeys = ["yearsExperience", "companiesLed", "englishLevel"];
      statLabels.forEach((label, index) => {
        if (content.home.stats && content.home.stats[statKeys[index]]) {
          label.textContent = content.home.stats[statKeys[index]];
        }
      });
    }

    // Update footer
    if (content.footer) {
      const footerText = document.querySelector(".footer-text");
      const footerStatus = document.querySelector(".footer-status");

      if (footerText && content.footer.text) {
        footerText.textContent = content.footer.text;
      }
      if (footerStatus && content.footer.status) {
        footerStatus.textContent = content.footer.status;
      }
    }
  }

  // Initialize content loading
  loadContent().then(() => {
    // Set initial language
    const savedLanguage = localStorage.getItem("portfolioLanguage") || "es";
    updateContent(savedLanguage);
  });

  // Export updateContent function for language system
  window.updateContent = updateContent;
}
