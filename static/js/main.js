const classConfig = {
  "fade-hidden": "fade-show",
  "fade-left-hidden": "fade-left-show",
  "fade-right-hidden": "fade-right-show",
  "fade-top-hidden": "fade-top-show",
  "fade-bottom-hidden": "fade-bottom-show",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    Object.keys(classConfig).forEach(className => {
      if (entry.isIntersecting && entry.target.classList.contains(className)) {
        entry.target.classList.add(classConfig[className]);
      } else {
        entry.target.classList.remove(classConfig[className]);
      }
    });
  });
});

Object.keys(classConfig).forEach(className => {
  const elements = document.querySelectorAll('.' + className);
  elements.forEach((el) => observer.observe(el));
});

