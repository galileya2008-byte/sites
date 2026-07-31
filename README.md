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
3. Sitemap: `https://expert-sites.ru/sitemap.xml`
4. Переобход главной после обновления SEO

### Google Search Console

Ресурс **https://expert-sites.ru/** → sitemap `https://expert-sites.ru/sitemap.xml`

### Яндекс.Метрика

Код счётчика — перед `</body>` в `index.html`.

## Структура

| Файл | Назначение |
|------|------------|
| `index.html` | Лендинг, стили, SEO, JSON-LD |
| `CNAME` | Домен `expert-sites.ru` для GitHub Pages |
| `robots.txt` | Правила для роботов |
| `sitemap.xml` | Карта сайта |
| `images/og-cover.svg` | Превью в соцсетях |
| `.nojekyll` | Статический HTML без Jekyll |
