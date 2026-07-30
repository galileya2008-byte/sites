# Лендинг: разработка сайтов (Neiro Galina)

Одностраничный сайт для продажи услуг «сайт-визитка» и «полноценный сайт». Статическая вёрстка — HTML, CSS и небольшой JS без зависимостей.

## Локальный просмотр

Откройте `index.html` в браузере или запустите простой сервер:

```powershell
cd "c:\Users\USER\Desktop\создание сайтов\neirogalina-sites-landing"
python -m http.server 8080
```

Затем откройте http://localhost:8080

## Публикация на GitHub Pages

1. Создайте репозиторий на GitHub (например `neirogalina-sites` или `sites-landing`).
2. В папке проекта выполните:

```powershell
cd "c:\Users\USER\Desktop\создание сайтов\neirogalina-sites-landing"
git init
git add index.html README.md .nojekyll
git commit -m "Initial landing for web development services"
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГИН/ИМЯ_РЕПО.git
git push -u origin main
```

3. На GitHub: **Settings → Pages → Build and deployment** → Source: **Deploy from a branch** → Branch: **main**, folder **/ (root)** → Save.
4. Через 1–3 минуты сайт будет доступен по адресу `https://ВАШ_ЛОГИН.github.io/ИМЯ_РЕПО/`.

### Свой домен (необязательно)

1. В **Settings → Pages → Custom domain** укажите поддомен, например `sites.neirogalina.ru`.
2. У регистратора добавьте CNAME на `ВАШ_ЛОГИН.github.io`.
3. Файл `CNAME` в корне репозитория создастся автоматически после сохранения домена в настройках Pages.

## Ссылки на оплату / заявки

Кнопки ведут на страницы GetCourse:

- Сайт-визитка: https://neirogalina.ru/visitka  
- Полноценный сайт: https://neirogalina.ru/siteone  

При смене URL обновите `href` у классов `.ng-btn` в `index.html`.

## Структура

| Файл | Назначение |
|------|------------|
| `index.html` | Весь лендинг (стили и скрипт внутри) |
| `.nojekyll` | Отключает Jekyll на GitHub Pages |
| `README.md` | Инструкция по деплою |
