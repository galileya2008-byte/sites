(function () {
  "use strict";

  if (document.querySelector(".ng-back-top")) return;

  var threshold = 320;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "ng-back-top";
  btn.setAttribute("aria-label", "Вернуться в начало страницы");
  btn.innerHTML =
    '<svg class="ng-back-top__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
    '<path d="M12 5l-6 6h4v8h4v-8h4l-6-6z" fill="currentColor"/>' +
    "</svg>";

  document.body.appendChild(btn);

  function toggleVisibility() {
    var show = window.scrollY > threshold;
    btn.classList.toggle("is-visible", show);
  }

  btn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth"
    });
  });

  window.addEventListener("scroll", toggleVisibility, { passive: true });
  toggleVisibility();
})();
