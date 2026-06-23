const themeToggle = document.getElementById('themeToggle');
const scrollTop = document.getElementById('scrollTop');
const preloader = document.getElementById('preloader');
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');
const formAlert = document.getElementById('formAlert');

const saveTheme = (theme) => localStorage.setItem('portfolioTheme', theme);
const applyTheme = (theme) => {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
  } else {
    document.body.classList.remove('dark-theme');
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  }
};

const loadTheme = () => {
  const savedTheme = localStorage.getItem('portfolioTheme') || 'light';
  applyTheme(savedTheme);
};

const animateCounters = () => {
  const counters = document.querySelectorAll('[data-target]');
  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const current = +counter.innerText;
      const increment = Math.ceil(target / 120);
      if (current < target) {
        counter.innerText = current + increment;
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};

const handleScroll = () => {
  if (!scrollTop) {
    return;
  }
  if (window.scrollY > 400) {
    scrollTop.classList.add('show');
  } else {
    scrollTop.classList.remove('show');
  }
};

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(String(email).toLowerCase());
};

const validatePhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  return /^\d{10}$/.test(cleaned);
};

const showInvalid = (element, message) => {
  element.classList.add('is-invalid');
  element.nextElementSibling.textContent = message;
};

const clearValidation = (element) => {
  element.classList.remove('is-invalid');
};

const resetForm = () => {
  contactForm.reset();
  document.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));
  formAlert.classList.remove('d-none');
  setTimeout(() => formAlert.classList.add('d-none'), 5000);
};

const validateForm = () => {
  let valid = true;
  clearValidation(nameInput);
  clearValidation(emailInput);
  clearValidation(phoneInput);
  clearValidation(messageInput);

  if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
    showInvalid(nameInput, 'Please enter your name.');
    valid = false;
  }

  if (!validateEmail(emailInput.value)) {
    showInvalid(emailInput, 'Please enter a valid email address.');
    valid = false;
  }

  if (!validatePhone(phoneInput.value)) {
    showInvalid(phoneInput, 'Enter a valid 10-digit mobile number.');
    valid = false;
  }

  if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
    showInvalid(messageInput, 'Please write a brief message.');
    valid = false;
  }

  return valid;
};

const typedText = () => {
  const element = document.querySelector('.lead');
  if (!element) {
    return;
  }
  const phrases = ['Web Development', 'Salesforce Support', 'Responsive Design', 'UX-focused Solutions'];
  let index = 0;
  let charIndex = 0;
  let currentPhrase = '';
  let isDeleting = false;

  const type = () => {
    if (index >= phrases.length) {
      index = 0;
    }
    currentPhrase = phrases[index];
    if (isDeleting) {
      element.textContent = currentPhrase.slice(0, charIndex - 1);
      charIndex -= 1;
    } else {
      element.textContent = currentPhrase.slice(0, charIndex + 1);
      charIndex += 1;
    }
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(type, 1200);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      index += 1;
      setTimeout(type, 300);
    } else {
      setTimeout(type, isDeleting ? 80 : 120);
    }
  };
  type();
};

window.addEventListener('load', () => {
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => preloader.remove(), 400);
  }
  loadTheme();
  typedText();
});

window.addEventListener('scroll', () => {
  handleScroll();
});

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const theme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    applyTheme(theme);
    saveTheme(theme);
  });
}

if (scrollTop) {
  scrollTop.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.disconnect();
    }
  });
}, { threshold: 0.5 });

const countersSection = document.querySelector('.hero-stats');
if (countersSection) {
  observer.observe(countersSection);
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validateForm()) {
      resetForm();
    }
  });
}

[['name', nameInput], ['email', emailInput], ['phone', phoneInput], ['message', messageInput]].forEach(([field, element]) => {
  if (element) {
    element.addEventListener('input', () => {
      clearValidation(element);
    });
  }
});

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse) {
      navbarCollapse.classList.remove('show');
    }
  });
});
