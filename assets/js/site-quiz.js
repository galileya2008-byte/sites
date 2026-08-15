(function () {
  "use strict";

  var root = document.getElementById("ng-site-quiz");
  if (!root) return;

  var questions = [
    {
      text: "Что для вас сейчас важнее всего?",
      options: [
        { text: "Заказать готовый сайт под мои услуги", scores: { vizitka: 1, full: 1 } },
        { text: "Системно представить несколько услуг, программ и материалов", scores: { full: 3 } },
        { text: "Научиться создавать сайты — для себя или на заказ", scores: { learn: 4 } }
      ]
    },
    {
      text: "Сколько «пространства» нужно вашему проекту?",
      options: [
        { text: "Одна сильная страница с блоками и заявкой", scores: { vizitka: 3 } },
        { text: "Несколько страниц: услуги, обо мне, кейсы, контакты", scores: { full: 3 } },
        { text: "Пока сложно сказать — хочу рекомендацию", scores: { vizitka: 1, full: 1 } }
      ]
    },
    {
      text: "Откуда вы в первую очередь ждёте клиентов?",
      options: [
        { text: "Из соцсетей и сарафанного радио", scores: { vizitka: 2 } },
        { text: "Из поиска Яндекса", scores: { full: 2 } },
        { text: "Из рекламы (Директ, таргет)", scores: { vizitka: 1, full: 1 } },
        { text: "Пока не определился(лась)", scores: {} }
      ]
    },
    {
      text: "Нужен ли на сайте интерактив — квиз, калькулятор или мини-воронка?",
      options: [
        { text: "Да, хочу вовлекать и прогревать аудиторию", scores: { full: 1, interactive: 2 } },
        { text: "Пока достаточно формы и контактов", scores: { vizitka: 1 } },
        { text: "Хочу уметь делать такие интерактивы сам(а)", scores: { learn: 3, interactive: 1 } }
      ]
    }
  ];

  var results = {
    learn: {
      badge: "Обучение",
      title: "Вам подойдёт программа SITE LAB",
      text: "Вы хотите не только заказать сайт, а освоить навык создания проектов — для себя и для клиентов. На обучении вы соберёте портфолио и научитесь делать интерактивы, как этот квиз.",
      points: [
        "4 недели практики и 4 проекта в портфолио",
        "Модуль по квизам, лид-магнитам и мини-воронкам",
        "SEO под Яндекс и работа с заказчиками"
      ],
      primary: { href: "/obuchenie/", label: "Программа SITE LAB" },
      secondary: { href: "#contact", label: "Обсудить заказ сайта" }
    },
    full: {
      badge: "Полный сайт",
      title: "Рекомендуем полноценный многостраничный сайт",
      text: "По вашим ответам нужна структура с несколькими разделами, SEO-базой и возможностью масштабировать контент. Интерактивы — квизы, калькуляторы — можно добавить для вовлечения и прогрева.",
      points: [
        "Несколько страниц: услуги, о вас, кейсы, контакты",
        "SEO под Яндекс и юридические страницы",
        "Интерактивные элементы — по задаче проекта"
      ],
      primary: { href: "polnyj-sajt/", label: "Подробнее о формате" },
      secondary: { href: "#contact", label: "Обсудить проект" }
    },
    vizitka: {
      badge: "Сайт-визитка",
      title: "Отличный старт — сайт-визитка",
      text: "Вам достаточно одной сильной страницы с понятным оффером, блоками доверия и формой заявки. Это быстрый запуск без лишней сложности — при необходимости позже можно расширить до полного сайта.",
      points: [
        "Одностраничный лендинг под ваш оффер",
        "Адаптив, форма заявки, базовое SEO",
        "Срок изготовления обычно 3–7 дней"
      ],
      primary: { href: "vizitka/", label: "Подробнее о визитке" },
      secondary: { href: "#contact", label: "Обсудить проект" }
    }
  };

  var step = 0;
  var answers = [];
  var liveRegion = document.createElement("div");
  liveRegion.className = "ng-sr-only";
  liveRegion.setAttribute("aria-live", "polite");
  liveRegion.setAttribute("aria-atomic", "true");
  root.appendChild(liveRegion);

  function renderProgress() {
    var pct = step >= questions.length ? 100 : Math.round((step / questions.length) * 100);
    return (
      '<div class="ng-quiz__progress" aria-hidden="true">' +
      '<span class="ng-quiz__progress-bar" style="width:' + pct + '%"></span></div>'
    );
  }

  function renderQuestion() {
    var q = questions[step];
    var html =
      renderProgress() +
      '<p class="ng-quiz__step-label">Шаг ' + (step + 1) + " из " + questions.length + "</p>" +
      '<h3 class="ng-quiz__question" id="ng-quiz-q">' + q.text + "</h3>" +
      '<fieldset class="ng-quiz__options" role="radiogroup" aria-labelledby="ng-quiz-q">';

    q.options.forEach(function (opt, i) {
      html +=
        '<button type="button" class="ng-quiz__option" role="radio" aria-checked="false" data-index="' + i + '">' +
        '<span class="ng-quiz__option-marker" aria-hidden="true"></span>' +
        "<span>" + opt.text + "</span></button>";
    });

    html += "</fieldset>";
    html += '<div class="ng-quiz__actions">';
    if (step > 0) {
      html += '<button type="button" class="ng-quiz__btn ng-quiz__btn--ghost" data-action="back">Назад</button>';
    }
    html += "</div>";
    return html;
  }

  function renderResult(key) {
    var r = results[key];
    var html =
      renderProgress() +
      '<div class="ng-quiz__result">' +
      '<span class="ng-quiz__result-badge">' + r.badge + "</span>" +
      '<h3 class="ng-quiz__result-title">' + r.title + "</h3>" +
      '<p class="ng-quiz__result-text">' + r.text + "</p>" +
      "<ul class=\"ng-quiz__result-list\">";

    r.points.forEach(function (p) {
      html += "<li>" + p + "</li>";
    });

    html +=
      "</ul>" +
      '<div class="ng-quiz__actions">' +
      '<a class="ng-quiz__btn ng-quiz__btn--primary" href="' + r.primary.href + '">' + r.primary.label + "</a>" +
      '<a class="ng-quiz__btn ng-quiz__btn--ghost" href="' + r.secondary.href + '">' + r.secondary.label + "</a>" +
      '<button type="button" class="ng-quiz__btn ng-quiz__btn--ghost" data-action="restart">Пройти заново</button>' +
      "</div></div>";

    liveRegion.textContent = "Результат: " + r.title;
    return html;
  }

  function calcResult() {
    var totals = { vizitka: 0, full: 0, learn: 0, interactive: 0 };
    answers.forEach(function (idx, qIdx) {
      var scores = questions[qIdx].options[idx].scores || {};
      Object.keys(scores).forEach(function (k) {
        totals[k] = (totals[k] || 0) + scores[k];
      });
    });

    if (totals.learn >= 5 || (totals.learn >= totals.full && totals.learn >= totals.vizitka && totals.learn >= 3)) {
      return "learn";
    }
    if (totals.full > totals.vizitka) return "full";
    return "vizitka";
  }

  function bindQuestionEvents() {
    var options = root.querySelectorAll(".ng-quiz__option");
    options.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var idx = parseInt(btn.getAttribute("data-index"), 10);
        answers[step] = idx;
        options.forEach(function (b) {
          b.classList.remove("is-selected");
          b.setAttribute("aria-checked", "false");
        });
        btn.classList.add("is-selected");
        btn.setAttribute("aria-checked", "true");
        window.setTimeout(function () {
          step += 1;
          if (step >= questions.length) {
            root.innerHTML = renderResult(calcResult());
            bindResultEvents();
          } else {
            root.innerHTML = renderQuestion();
            bindQuestionEvents();
            var first = root.querySelector(".ng-quiz__option");
            if (first) first.focus();
          }
        }, 280);
      });
    });

    var back = root.querySelector('[data-action="back"]');
    if (back) {
      back.addEventListener("click", function () {
        step -= 1;
        root.innerHTML = renderQuestion();
        bindQuestionEvents();
        var prev = answers[step];
        if (prev !== undefined) {
          var sel = root.querySelector('[data-index="' + prev + '"]');
          if (sel) {
            sel.classList.add("is-selected");
            sel.setAttribute("aria-checked", "true");
          }
        }
      });
    }
  }

  function bindResultEvents() {
    var restart = root.querySelector('[data-action="restart"]');
    if (restart) {
      restart.addEventListener("click", function () {
        step = 0;
        answers = [];
        root.innerHTML = renderQuestion();
        bindQuestionEvents();
      });
    }
  }

  root.innerHTML = renderQuestion();
  bindQuestionEvents();
})();
