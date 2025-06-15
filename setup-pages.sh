#!/bin/bash

echo "🚀 Настройка GitHub Pages для OKD-Finance-docs..."

# Проверяем, есть ли токен GitHub
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Переменная GITHUB_TOKEN не установлена"
    echo "Создайте Personal Access Token на https://github.com/settings/tokens"
    echo "И выполните: export GITHUB_TOKEN=your_token_here"
    exit 1
fi

# Настраиваем GitHub Pages
echo "📝 Настраиваем GitHub Pages..."
curl -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/timofvy/OKD-Finance-docs/pages \
  -d '{
    "source": {
      "branch": "gh-pages",
      "path": "/"
    }
  }'

echo ""
echo "✅ GitHub Pages настроен!"
echo "🌐 Сайт будет доступен по адресу: https://timofvy.github.io/OKD-Finance-docs/"
echo "⏳ Подождите 5-10 минут для активации..." 