// Adicione no script.js
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.style.opacity = '0';
      setTimeout(() => {
        section.style.opacity = '1';
      }, 300);
    });
  });