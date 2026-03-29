document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      // Change icon (simple text swap or class toggle for icon)
      if (navMenu.classList.contains('active')) {
        hamburger.innerHTML = '&times;';
      } else {
        hamburger.innerHTML = '&#9776;';
      }
    });
  }

  // 2. Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  // 4. Form Submission using Web3Forms
  const form = document.getElementById('enquiryForm');
  const formStatus = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      formStatus.innerText = "Sending...";
      formStatus.style.color = "var(--text-light)";
      
      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: json
        });
        
        const result = await response.json();
        
        if (response.status === 200) {
          formStatus.innerText = "Message sent successfully! We will contact you soon.";
          formStatus.style.color = "var(--accent-brand)";
          form.reset();
        } else {
          console.log(response);
          formStatus.innerText = "Failed to send message: " + result.message;
          formStatus.style.color = "var(--accent-red)";
        }
      } catch (error) {
        console.error(error);
        formStatus.innerText = "Something went wrong! Please try again later.";
        formStatus.style.color = "var(--accent-red)";
      }
      
      // Clear status after 5 seconds
      setTimeout(() => {
        formStatus.innerText = "";
      }, 5000);
    });
  }
});
