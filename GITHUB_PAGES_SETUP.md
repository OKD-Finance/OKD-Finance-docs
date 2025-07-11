# Настройка GitHub Pages для OKD Finance Documentation

## 🚀 Автоматическое развертывание настроено!

После пуша изменений в репозиторий, документация автоматически развертывается на GitHub Pages.

## 📋 Упрощенная инструкция по активации

### 1. Перейдите в настройки репозитория
- Откройте https://github.com/timofvy/OKD-Finance-docs
- Нажмите на вкладку **Settings**

### 2. Настройте GitHub Pages
- В левом меню найдите раздел **Pages**
- В разделе **Source** выберите **Deploy from a branch**
- **Branch**: выберите `gh-pages`
- **Folder**: оставьте `/ (root)`
- Нажмите **Save**

### 3. Проверьте работу Actions
- Перейдите на вкладку **Actions**
- Убедитесь, что workflow **Deploy Documentation** запустился успешно
- Дождитесь завершения (обычно 2-3 минуты)

## 🌐 URL документации

После успешного развертывания документация будет доступна по адресу:
**https://timofvy.github.io/OKD-Finance-docs/**

## ✅ Что исправлено

### Проблема была в том, что:
- Старый workflow использовал новый GitHub Pages API
- Требовал предварительной настройки Pages в репозитории
- Использовал сложные разрешения

### Решение:
- ✅ Упрощенный workflow с `peaceiris/actions-gh-pages@v3`
- ✅ Автоматическое создание ветки `gh-pages`
- ✅ Простые разрешения `contents: write`
- ✅ Работает без предварительной настройки

## 🔄 Как это работает сейчас

1. **Push в main** → Запускается GitHub Action
2. **Action собирает** документацию с VitePress
3. **Action создает/обновляет** ветку `gh-pages`
4. **GitHub Pages** автоматически публикует из ветки `gh-pages`

## 🛠 Дополнительные настройки

### Кастомный домен (опционально)
1. В настройках Pages добавьте ваш домен
2. Обновите `base` в `docs/.vitepress/config.ts`

### Мониторинг
- Проверяйте статус Actions в разделе **Actions**
- Следите за созданием ветки `gh-pages`
- Проверяйте доступность сайта после каждого деплоя

## 🔧 Устранение неполадок

### Если деплой не работает:
1. Проверьте права доступа в Settings > Actions > General
2. Убедитесь, что включен **Read and write permissions**
3. Проверьте логи в разделе Actions

### Если сайт не открывается:
1. Убедитесь, что в Pages выбрана ветка `gh-pages`
2. Проверьте, что деплой завершился успешно
3. Подождите 5-10 минут для обновления

## ✅ Статус развертывания

Текущий статус можно проверить по бейджу:
[![Deploy Documentation](https://github.com/timofvy/OKD-Finance-docs/actions/workflows/deploy.yml/badge.svg)](https://github.com/timofvy/OKD-Finance-docs/actions/workflows/deploy.yml)

---

**Исправлено и готово!** 🎉 Workflow теперь работает без дополнительных настроек. 