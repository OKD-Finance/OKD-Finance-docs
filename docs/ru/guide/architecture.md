# Архитектура системы

OKD Finance построен на современной микросервисной архитектуре с интеграцией внешних торговых платформ.

## Компоненты системы

```mermaid
graph TB
    subgraph "Frontend Layer"
        WEB[Web Dashboard]
        MOBILE[Mobile App]
        API_DOCS[API Documentation]
    end
    
    subgraph "API Gateway"
        GATEWAY[Gateway Service]
        AUTH[Authentication]
        RATE_LIMIT[Rate Limiting]
    end
    
    subgraph "Core Services"
        USER[User Service]
        WALLET[Wallet Service]
        KYC[KYC Service]
        TRADING[Trading Service]
    end
    
    subgraph "External Integrations"
        BYBIT[Bybit Exchange]
        FIREBASE[Firebase Auth]
        WEBHOOKS[Webhook Service]
    end
    
    subgraph "Data Layer"
        POSTGRES[(PostgreSQL)]
        REDIS[(Redis Cache)]
        STORAGE[(File Storage)]
    end
    
    WEB --> GATEWAY
    MOBILE --> GATEWAY
    GATEWAY --> AUTH
    GATEWAY --> USER
    GATEWAY --> WALLET
    GATEWAY --> KYC
    GATEWAY --> TRADING
    
    TRADING --> BYBIT
    AUTH --> FIREBASE
    USER --> POSTGRES
    WALLET --> POSTGRES
    KYC --> POSTGRES
    TRADING --> REDIS
```

## Архитектурные принципы

### Микросервисы
- Каждый сервис независим
- API-first подход
- Горизонтальное масштабирование

### Безопасность
- JWT токены
- Firebase Authentication
- Rate limiting
- HTTPS везде

### Надежность
- Circuit breakers
- Retry механизмы
- Health checks
- Monitoring

## Сервисы

### Gateway Service
- Единая точка входа
- Роутинг запросов
- Аутентификация
- Rate limiting

### User Service
- Управление пользователями
- Профили и настройки
- Сессии

### Wallet Service
- Управление кошельками
- Балансы
- Транзакции

### Trading Service
- Исполнение ордеров
- Интеграция с Bybit
- Управление позициями

### KYC Service
- Верификация документов
- Compliance
- Risk management

## Интеграции

### Bybit Exchange
- Spot и Futures торговля
- Real-time данные
- Order management
- Portfolio sync

### Firebase Auth
- Социальная аутентификация
- Multi-factor auth
- User management

## Мониторинг

- Application metrics
- Error tracking  
- Performance monitoring
- Business metrics 