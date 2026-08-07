# Лендинг: разработка сайтов (Neiro Galina)

Публичный сайт: **https://expert-sites.ru/**

Одностраничный лендинг для услуг «сайт-визитка» и «полноценный сайт». Статическая вёрстка — HTML, CSS и небольшой JS без зависимостей. Хостинг: GitHub Pages + домен `expert-sites.ru`.

## Локальный просмотр

```powershell
cd "c:\Users\USER\Desktop\создание сайтов\neirogalina-sites-landing"
python -m http.server 8080
```

Откройте http://localhost:8080

## Деплой на GitHub Pages

**Remote:** один раз укажите URL репозитория в файле `git-remote.txt` (см. `git-remote.txt.example`) или выполните:

```powershell
git remote add origin https://github.com/ВАШ_ЛОГИН/ИМЯ_РЕПО.git
git push -u origin main
```

После правок ассистент коммитит и пушит сам, если настроен `origin`.

```powershell
cd "c:\Users\USER\Desktop\создание сайтов\neirogalina-sites-landing"
git add -A
git commit -m "Описание изменений"
git push
```

В репозитории: **Settings → Pages** — branch **main**, root **/**. В **Custom domain** указано `expert-sites.ru`, в корне лежит файл `CNAME`.

## HTTPS / SSL (GitHub Pages + REG.RU)

Платный сертификат **не нужен**: GitHub сам выпускает Let's Encrypt для вашего домена, если DNS и настройки Pages в порядке.

### Что видно сейчас (диагностика)

| Проверка | Результат |
|----------|-----------|
| `http://expert-sites.ru/` | Работает, ответ **GitHub.com** |
| `https://expert-sites.ru/` | Сертификат **не на домен** (`SEC_E_WRONG_PRINCIPAL` — часто показывается сертификат `*.github.io`) |
| DNS `@` (A) | Четыре IP GitHub Pages — **верно** |
| DNS `www` (CNAME) | `galileya2008-byte.github.io` — **верно** |
| CAA | `letsencrypt.org` — **можно выпускать сертификат** |

Итог: сайт на GitHub уже открывается по **HTTP**, но **TLS для `expert-sites.ru` GitHub ещё не выдал** (или домен в Pages нужно перепривязать). Подтверждение сайта в **Яндекс.Вебмастере** на SSL **не влияет**.

### Шаг 1 — GitHub (главное)

1. Откройте [Settings → Pages](https://github.com/galileya2008-byte/sites/settings/pages) репозитория **sites**.
2. **Build and deployment:** Source = **Deploy from a branch**, Branch = **main** / **/(root)**.
3. **Custom domain:** введите **`expert-sites.ru`** (без `https://`, без `/`) → **Save**.
4. Дождитесь **зелёной галочки** «DNS check successful» рядом с доменом.
5. Если галочки нет или HTTPS долго «висит»:
   - нажмите **Remove** у домена;
   - подождите **10–15 минут**;
   - снова введите `expert-sites.ru` → **Save** (так часто «зависает» выпуск сертификата — см. [документацию GitHub](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages#https-errors)).
6. Когда сертификат готов, включите **Enforce HTTPS** (чекбокс станет активным).
7. Если GitHub пишет, что домен **already in use** — он привязан к **другому** репозиторию; сначала снимите домен там.

Файл `CNAME` в репозитории должен содержать одну строку: `expert-sites.ru` (как сейчас).

### Шаг 2 — REG.RU (DNS)

В панели REG.RU для **expert-sites.ru** оставьте **только** такую схему (лишнее удалите):

| Имя / хост | Тип | Значение |
|------------|-----|----------|
| `@` | **A** | `185.199.108.153` |
| `@` | **A** | `185.199.109.153` |
| `@` | **A** | `185.199.110.153` |
| `@` | **A** | `185.199.111.153` |
| `www` | **CNAME** | `galileya2008-byte.github.io.` (с точкой в конце — если REG.RU просит) |

**Отключите** на REG.RU:

- переадресацию / «веб-перенаправление» с `@` или `www` на другой URL;
- лишние **A** / **AAAA** / **CNAME** на `@` (на `@` не должно быть CNAME);
- парковку домена.

Запись **TXT** (GlobalSign и т.п.) можно оставить — на GitHub она не мешает.

### Шаг 3 — после успешного HTTPS

- Основной адрес сайта: **https://expert-sites.ru/** (без `www` или настройте редирект `www` → apex в REG.RU **только после** того, как оба адреса открываются по HTTPS).
- В Яндекс.Вебмастере укажите HTTPS-версию и переобход главной.

Ожидание: после успешного DNS check сертификат обычно появляется **от 15 минут до 24 часов**. Пока HTTPS не работает, для проверки контента можно открывать **http://expert-sites.ru/** (без замка).

Подробнее: [Securing your GitHub Pages site with HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).

Если **«Проверка DNS выполняется»** несколько **дней**, а сайт по **http://expert-sites.ru** открывается — это **не ошибка REG.RU**: снаружи уже видны 4× A на GitHub и CNAME `www` → `galileya2008-byte.github.io`. Значит, **зависла проверка на стороне GitHub** (часто без TXT-верификации домена в профиле).

**Обязательно по порядку:**

1. **[Settings → Pages профиля](https://github.com/settings/pages)** (не репозитория!) → **Add a domain** → `expert-sites.ru` → в REG.RU добавьте **TXT** для `_github-pages-challenge-galileya2008-byte` (значение скопируйте из GitHub) → **Verify**. Без этой записи проверка в репозитории может крутиться неделями.
2. **[Pages → sites](https://github.com/galileya2008-byte/sites/settings/pages)** → в поле домена только **`expert-sites.ru`** (как файл `CNAME` в репо, **не** `www`). Если указан `www` — смените на apex или наоборот, но **везде одинаково**.
3. **Remove** домен в репозитории → **24 часа** не трогать DNS и не Save → снова **`expert-sites.ru`** → **Save** один раз.
4. Через сутки — **Enforce HTTPS**, если чекбокс активен.

Если после **Verify** в профиле и **48 ч** без правок DNS галочки всё нет — [support.github.com](https://support.github.com/) (тема: Custom domain DNS check stuck, A records correct).

Сообщение **«Обнаружено изменение настроек DNS…»** (TLS 1 из 3):

**DNS сейчас настроен верно** (`www` → `galileya2008-byte.github.io`, `@` → 4× A GitHub). Дальше **не правьте DNS** и сбросьте привязку в GitHub:

1. [Settings → Pages профиля](https://github.com/settings/pages) → **Add a domain** → `expert-sites.ru` → **TXT** `_github-pages-challenge-galileya2008-byte` в REG.RU → **Verify**.
2. [Pages репозитория sites](https://github.com/galileya2008-byte/sites/settings/pages) → **Remove** домен → **пауза 2–3 часа** (лучше на ночь), REG.RU не трогать.
3. Один раз **Save** с доменом **`expert-sites.ru`** (без `www`, как в SEO). Поле `CNAME` в репо должно совпадать с доменом в Pages.
4. До **24 ч** без правок DNS → включить **Enforce HTTPS**.

Если через **48 ч** без изменений DNS всё ещё «1 из 3» — [support.github.com](https://support.github.com/).

## Ссылки на оплату

- Сайт-визитка: https://neirogalina.ru/visitka  
- Полноценный сайт: https://neirogalina.ru/siteone    

## SEO

Все URL в проекте указывают на **https://expert-sites.ru/**:

| Файл | Что проверить |
|------|----------------|
| `index.html` | `canonical`, Open Graph, JSON-LD |
| `robots.txt` | `Sitemap: https://expert-sites.ru/sitemap.xml` |
| `sitemap.xml` | `<loc>https://expert-sites.ru/</loc>` |

### Яндекс.Вебмастер

1. [webmaster.yandex.ru](https://webmaster.yandex.ru/) → добавить **https://expert-sites.ru/**
2. Подтверждение — meta-тег в `<head>` (`yandex-verification`)
3. Sitemap: **Индексирование → Файлы Sitemap** → добавить `https://expert-sites.ru/sitemap.xml` (дополнительно указан в `robots.txt` и `<link rel="sitemap">` в `index.html`)
4. Регион: **Настройки → Регион сайта** → выберите **Россия** (или ваш город, если работаете локально). На странице также указаны `addressCountry` и `areaServed` в JSON-LD.
5. Favicon: в корне сайта `favicon.ico` и `favicon.svg`, ссылки в `<head>`.
6. Переобход главной после обновления SEO

### Google Search Console

Ресурс **https://expert-sites.ru/** → sitemap `https://expert-sites.ru/sitemap.xml`

### Форма «Обсудить проект»

**FormSubmit отключён** (часто не открывается из РФ). Сейчас:

1. **Telegram** — при отправке открывается [@galina1901](https://t.me/galina1901) с готовым текстом заявки (нужно нажать «Отправить» в чате).
2. **Почта** — после настройки [Web3Forms](https://web3forms.com/): зарегистрируйте `galileya2008@yandex.ru`, скопируйте Access Key в `index.html` → атрибут `data-web3forms-access-key` у `#ng-contact-form` (см. `web3forms-access-key.txt.example`).


Код счётчика — перед `</body>` в `index.html`.

## Структура

| Файл | Назначение |
|------|------------|
| `index.html` | Лендинг, стили, SEO, JSON-LD |
| `CNAME` | Домен `expert-sites.ru` для GitHub Pages |
| `robots.txt` | Правила для роботов, `Host`, Sitemap |
| `sitemap.xml` | Карта сайта |
| `favicon.ico`, `favicon.svg`, `apple-touch-icon.png` | Иконка сайта (корень, пути `/favicon.ico`) |
| `images/og-cover.svg` | Превью в соцсетях |
| `.nojekyll` | Статический HTML без Jekyll |
