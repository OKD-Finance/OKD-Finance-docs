# Развертывание

Руководство по развертыванию и настройке OKD Finance в различных окружениях.

## Системные требования

### Минимальные требования
- CPU: 4 cores
- RAM: 8GB
- Storage: 100GB SSD
- Network: 1Gbps

### Рекомендуемые требования  
- CPU: 8+ cores
- RAM: 16GB+
- Storage: 500GB SSD
- Network: 10Gbps

## Docker развертывание

### Быстрый старт
```bash
# Клонирование репозитория
git clone https://github.com/OKD-Finance/Backend.git
cd okd-finance

# Настроить переменные окружения
cp .env.example .env
vim .env

# Запустить с Docker Compose
docker-compose up -d
``` -->

### Конфигурация окружения
```bash
# .env файл
DATABASE_URL=postgresql://user:pass@db:5432/okdfinance
REDIS_URL=redis://redis:6379
BYBIT_API_KEY=your_bybit_key
FIREBASE_PROJECT_ID=your_firebase_project
JWT_SECRET=your_jwt_secret
``` -->

## Kubernetes развертывание

### Подготовка кластера
```yaml
# namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: okd-finance
``` -->

### ConfigMap и Secrets
```yaml
# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: okd-config
  namespace: okd-finance
data:
  DATABASE_HOST: "postgresql"
  REDIS_HOST: "redis"
  
---
# secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: okd-secrets
  namespace: okd-finance
type: Opaque
stringData:
  DATABASE_PASSWORD: "secure_password"
  BYBIT_API_KEY: "your_api_key"
  JWT_SECRET: "your_jwt_secret"
``` -->

### Сервисы
```yaml
# services.yaml
apiVersion: v1
kind: Service
metadata:
  name: gateway-service
  namespace: okd-finance
spec:
  selector:
    app: gateway
  ports:
    - port: 80
      targetPort: 3000
  type: LoadBalancer
``` -->

## Мониторинг

### Prometheus конфигурация
```yaml
# prometheus.yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'okd-finance'
    static_configs:
      - targets: ['gateway:3000', 'user:3001', 'wallet:3002']
``` -->

### Grafana дашборды
- API Metrics
- Database Performance  
- Trading Volume
- Error Rates

## Безопасность

### SSL/TLS сертификаты
```bash
# Let's Encrypt с certbot
certbot --nginx -d api.okd.finance
``` -->

### Firewall правила
```bash
# Разрешить только необходимые порты
ufw allow 22/tcp
ufw allow 80/tcp  
ufw allow 443/tcp
ufw deny incoming
ufw allow outgoing
``` -->

### Backup стратегия
```bash
#!/bin/bash
# backup.sh
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
aws s3 cp backup_$(date +%Y%m%d).sql s3://okd-backups/
``` -->

## Масштабирование

### Горизонтальное масштабирование
- Load balancer перед Gateway
- Multiple instances каждого сервиса
- Database clustering
- Redis cluster

### Вертикальное масштабирование
- Увеличение CPU/RAM
- SSD storage
- Dedicated database server

## CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
    
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to production
        run: |
          docker build -t okd-finance .
          docker push registry/okd-finance:latest
          kubectl rollout restart deployment/gateway
``` -->

## Troubleshooting

### Логи
```bash
# Docker logs
docker-compose logs -f gateway

# Kubernetes logs  
kubectl logs -f deployment/gateway -n okd-finance
``` -->

### Health checks
``` -->