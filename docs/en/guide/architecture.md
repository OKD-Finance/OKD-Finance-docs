# System Architecture

OKD Finance is built on modern microservices architecture with external exchange integrations.

## Architecture Overview

```plantuml
@startuml
!theme aws-orange

package "Frontend" {
    [Web Dashboard] as WEB
    [Mobile App] as MOBILE
}

package "API Layer" {
    [API Gateway] as GATEWAY
    [Authentication] as AUTH
}

package "Core Services" {
    [User Service] as USER
    [Wallet Service] as WALLET
    [Trading Service] as TRADING
    [KYC Service] as KYC
}

package "External" {
    [Bybit Exchange] as BYBIT
    [Firebase Auth] as FIREBASE
}

WEB --> GATEWAY
MOBILE --> GATEWAY
GATEWAY --> AUTH
GATEWAY --> USER
GATEWAY --> WALLET
GATEWAY --> TRADING
GATEWAY --> KYC
TRADING --> BYBIT
AUTH --> FIREBASE

@enduml
```

## Key Components

### API Gateway
- Single entry point
- Request routing
- Authentication
- Rate limiting

### Core Services
- **User Service**: Account management
- **Wallet Service**: Balance and transactions
- **Trading Service**: Order execution
- **KYC Service**: Identity verification

### External Integrations
- **Bybit**: Trading execution
- **Firebase**: Authentication
- **Payment Processors**: Fiat operations 