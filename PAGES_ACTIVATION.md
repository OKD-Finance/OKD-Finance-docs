# 🚀 Активация GitHub Pages

## Проблема
Сайт https://timofvy.github.io/OKD-Finance-docs/ отдает 404, потому что GitHub Pages не активирован в репозитории.

## ✅ Статус проверки
- ✅ GitHub Actions работают (последние запуски успешны)
- ✅ Ветка `gh-pages` создана автоматически
- ❌ GitHub Pages не настроен в репозитории

## 📋 Инструкция по активации

### Способ 1: Через веб-интерфейс (рекомендуется)

1. **Откройте настройки репозитория:**
   - Перейдите на https://github.com/timofvy/OKD-Finance-docs
   - Нажмите на вкладку **Settings**

2. **Найдите раздел Pages:**
   - В левом меню найдите **Pages**
   - Нажмите на него

3. **Настройте источник:**
   - **Source**: выберите **Deploy from a branch**
   - **Branch**: выберите **gh-pages**
   - **Folder**: оставьте **/ (root)**
   - Нажмите **Save**

4. **Дождитесь активации:**
   - GitHub покажет сообщение о том, что сайт публикуется
   - Подождите 5-10 минут

### Способ 2: Через API (автоматически)

```bash
# Установите GitHub CLI или используйте токен
export GITHUB_TOKEN=your_personal_access_token

# Запустите скрипт
./setup-pages.sh
```

## 🔍 Проверка статуса

### Через API:
```bash
curl -s "https://api.github.com/repos/timofvy/OKD-Finance-docs/pages"
```

### Через браузер:
- Откройте Settings → Pages в репозитории
- Должно быть написано: "Your site is published at https://timofvy.github.io/OKD-Finance-docs/"

## 🌐 После активации

Сайт будет доступен по адресу:
**https://timofvy.github.io/OKD-Finance-docs/**

### Автоматические обновления:
- При каждом push в `main` → GitHub Action обновляет `gh-pages`
- GitHub Pages автоматически публикует изменения
- Обновление занимает 2-5 минут

## 🔧 Устранение неполадок

### Если сайт все еще не работает:
1. Проверьте, что Pages настроен на ветку `gh-pages`
2. Убедитесь, что в ветке `gh-pages` есть файлы
3. Проверьте логи Actions на наличие ошибок
4. Подождите до 10 минут для DNS обновления

### Проверка содержимого ветки gh-pages:
```bash
curl -s "https://api.github.com/repos/timofvy/OKD-Finance-docs/contents?ref=gh-pages" | grep '"name"'
```

## ✅ Ожидаемый результат

После активации:
- ✅ Главная страница: https://timofvy.github.io/OKD-Finance-docs/
- ✅ Английская версия: https://timofvy.github.io/OKD-Finance-docs/en/
- ✅ Русская версия: https://timofvy.github.io/OKD-Finance-docs/ru/
- ✅ Китайская версия: https://timofvy.github.io/OKD-Finance-docs/zh/

---

**Следующий шаг:** Активируйте Pages в настройках репозитория! 🎯 