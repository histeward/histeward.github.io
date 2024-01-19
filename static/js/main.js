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


var btns = document.querySelectorAll(".modal-button");
var spans = document.querySelectorAll(".close");

btns.forEach(btn => {
  btn.onclick = function() {
    var modal = document.getElementById(this.dataset.modal);
    modal.style.display = "flex";
    window.getComputedStyle(modal).opacity;
    modal.style.opacity = 1;
  }
});

spans.forEach(span => {
  span.onclick = function() {
    var modal = this.parentElement.parentElement;
    modal.style.opacity = 0;
    setTimeout(function() {
      modal.style.display = "none";
    }, 500);
  }
});

window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    var modal = event.target;
    modal.style.opacity = 0;
    setTimeout(function() {
      modal.style.display = "none";
    }, 500);
  }
};

function openEmail() {
  var emailAddress = "histeward@proton.me";
  var subject = "Get in touch!"; // You can customize the email subject
  var body = "Hi Steward!";       // You can customize the email body

  var mailtoLink = 'mailto:' + encodeURIComponent(emailAddress) +
    '?subject=' + encodeURIComponent(subject) +
    '&body=' + encodeURIComponent(body);

  window.location.href = mailtoLink;
}
