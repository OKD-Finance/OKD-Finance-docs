# Развертывание документации OKD Finance

Этот документ содержит инструкции по развертыванию документации OKD Finance на различных платформах.

## Подготовка к развертыванию

### 1. Установка зависимостей
```bash
npm install
```

### 2. Сборка проекта
```bash
npm run build
```

### 3. Предварительный просмотр
```bash
npm run preview
```

## Развертывание на GitHub Pages

### Автоматическое развертывание с GitHub Actions

1. **Создайте файл `.github/workflows/deploy.yml`:**

```yaml
name: Deploy Documentation

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: docs/.vitepress/dist
```

2. **Включите GitHub Pages в настройках репозитория:**
   - Перейдите в Settings > Pages
   - Выберите источник: GitHub Actions

### Ручное развертывание

```bash
# Сборка
npm run build

# Переход в папку сборки
cd docs/.vitepress/dist

# Инициализация git репозитория
git init
git add -A
git commit -m 'deploy'

# Загрузка в ветку gh-pages
git push -f git@github.com:OKD-Finance/Backend.git main:gh-pages

cd -
```

## Развертывание на Netlify

### Автоматическое развертывание

1. **Подключите репозиторий к Netlify:**
   - Зайдите на [netlify.com](https://netlify.com)
   - Нажмите "New site from Git"
   - Выберите ваш репозиторий

2. **Настройки сборки:** (автоматически определяются из `netlify.toml`)
   - Build command: `npm run build`
   - Publish directory: `docs/.vitepress/dist`

3. **Переменные окружения:** (если необходимо)
   - `NODE_VERSION`: `18`

### Ручное развертывание

```bash
# Установка Netlify CLI
npm install -g netlify-cli

# Сборка проекта
npm run build

# Развертывание
netlify deploy --prod --dir=docs/.vitepress/dist
```

## Развертывание на Vercel

### Автоматическое развертывание

1. **Подключите репозиторий к Vercel:**
   - Зайдите на [vercel.com](https://vercel.com)
   - Нажмите "New Project"
   - Выберите ваш репозиторий

2. **Настройки сборки:** (автоматически определяются из `vercel.json`)
   - Build Command: `npm run build`
   - Output Directory: `docs/.vitepress/dist`

### Ручное развертывание

```bash
# Установка Vercel CLI
npm install -g vercel

# Сборка проекта
npm run build

# Развертывание
vercel --prod
```

## Развертывание на Firebase Hosting

### Подготовка

1. **Установите Firebase CLI:**
```bash
npm install -g firebase-tools
```

2. **Инициализируйте Firebase:**
```bash
firebase login
firebase init hosting
```

3. **Настройте `firebase.json`:**
```json
{
  "hosting": {
    "public": "docs/.vitepress/dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### Развертывание

```bash
# Сборка
npm run build

# Развертывание
firebase deploy
```

## Развертывание на AWS S3 + CloudFront

### Подготовка

1. **Установите AWS CLI:**
```bash
# macOS
brew install awscli

# Ubuntu/Debian
sudo apt install awscli

# Windows
# Скачайте и установите с official AWS website
```

2. **Настройте AWS CLI:**
```bash
aws configure
```

### Создание S3 bucket

```bash
# Создание bucket
aws s3 mb s3://okd-finance-docs

# Настройка статического веб-сайта
aws s3 website s3://okd-finance-docs --index-document index.html --error-document index.html
```

### Развертывание

```bash
# Сборка
npm run build

# Загрузка в S3
aws s3 sync docs/.vitepress/dist/ s3://okd-finance-docs --delete
```

### Настройка CloudFront (опционально)

1. Создайте CloudFront distribution
2. Укажите S3 bucket как origin
3. Настройте custom error pages для SPA

## Развертывание на VPS/Dedicated Server

### Подготовка сервера

```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Установка Nginx
sudo apt install nginx -y

# Установка PM2 (для управления процессами)
sudo npm install -g pm2
```

### Настройка Nginx

```nginx
server {
    listen 80;
    server_name docs.okd.finance;
    
    root /var/www/okd-finance-docs;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript application/json;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Развертывание

```bash
# Клонирование репозитория
git clone https://github.com/OKD-Finance/Backend.git
cd okd-finance-docs

# Установка зависимостей
npm install

# Сборка
npm run build

# Копирование файлов в веб-директорию
sudo cp -r docs/.vitepress/dist/* /var/www/okd-finance-docs/

# Перезапуск Nginx
sudo systemctl restart nginx
```

## Настройка SSL/TLS

### Let's Encrypt (бесплатный SSL)

```bash
# Установка Certbot
sudo apt install certbot python3-certbot-nginx -y

# Получение сертификата
sudo certbot --nginx -d docs.okd.finance

# Автоматическое обновление
sudo crontab -e
# Добавьте строку:
0 12 * * * /usr/bin/certbot renew --quiet
```

## Мониторинг и логирование

### Настройка мониторинга доступности

```bash
# Создание скрипта проверки
cat > check-site.sh << 'EOF'
#!/bin/bash
if curl -f -s https://docs.okd.finance > /dev/null; then
    echo "Site is up"
else
    echo "Site is down" | mail -s "Site Down Alert" admin@okd.finance
fi
EOF

chmod +x check-site.sh

# Добавление в cron
crontab -e
# Добавьте строку:
*/5 * * * * /path/to/check-site.sh
```

### Логирование Nginx

```nginx
# В конфигурации Nginx
access_log /var/log/nginx/docs-access.log;
error_log /var/log/nginx/docs-error.log;
```

## Автоматизация развертывания

### GitHub Actions для VPS

```yaml
name: Deploy to VPS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.KEY }}
        script: |
          cd /var/www/okd-finance-docs
          git pull origin main
          npm ci
          npm run build
          sudo cp -r docs/.vitepress/dist/* /var/www/okd-finance-docs/
          sudo systemctl restart nginx
```

## Оптимизация производительности

### 1. Сжатие и кэширование

```nginx
# Gzip сжатие
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types
    text/plain
    text/css
    text/xml
    text/javascript
    application/javascript
    application/xml+rss
    application/json;

# Кэширование
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 2. CDN настройка

Используйте CDN для ускорения загрузки:
- CloudFlare
- AWS CloudFront
- KeyCDN

## Безопасность

### 1. Настройка заголовков безопасности

```nginx
# Security headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

### 2. Ограничение доступа

```nginx
# Ограничение по IP (при необходимости)
# allow 192.168.1.0/24;
# deny all;

# Защита от ботов
if ($http_user_agent ~* (bot|spider|crawl)) {
    return 403;
}
```

## Поддержка и мониторинг

### Контакты для технической поддержки
- **Email:** devops@okd.finance
- **Slack:** #infrastructure
- **Emergency:** +1-XXX-XXX-XXXX

### Полезные команды для диагностики

```bash
# Проверка статуса Nginx
sudo systemctl status nginx

# Просмотр логов
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Проверка конфигурации Nginx
sudo nginx -t

# Перезагрузка конфигурации
sudo nginx -s reload
```

---

Для получения дополнительной помощи обращайтесь к команде DevOps. 