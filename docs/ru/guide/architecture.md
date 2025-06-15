# Архитектура системы

OKD Finance построен на современной микросервисной архитектуре с интеграцией внешних торговых платформ.

## Компоненты системы

```text
@startuml
!theme aws-orange

package "Frontend Layer" {
    [Web Dashboard] as WEB
    [Mobile App] as MOBILE  
    [API Documentation] as API_DOCS
}

package "API Gateway" {
    [Gateway Service] as GATEWAY
    [Authentication] as AUTH
    [Rate Limiting] as RATE_LIMIT
}

package "Core Services" {
    [User Service] as USER
    [Wallet Service] as WALLET
    [KYC Service] as KYC
    [Trading Service] as TRADING
}

package "External Integrations" {
    [Bybit Exchange] as BYBIT
    [Firebase Auth] as FIREBASE
    [Webhook Service] as WEBHOOKS
}

package "Data Layer" {
    database "PostgreSQL" as POSTGRES
    database "Redis Cache" as REDIS
    database "File Storage" as STORAGE
}

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

@enduml
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