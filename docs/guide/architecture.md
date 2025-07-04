# System Architecture

OKD Finance is built on modern microservices architecture with external exchange integrations.

## Architecture Overview

```mermaid
 
graph TD
 
subgraph "Frontend"
     WEB[Web Dashboard]
     MOBILE[Mobile App]
 end
 
subgraph "API Layer"
     GATEWAY[API Gateway]
     AUTH[Authentication]
 end
 
subgraph "Core Services"
     USER[User Service]
     WALLET[Wallet Service]
     TRADING[Trading Service]
     KYC[KYC Service]
 end
 
subgraph "External"
     BYBIT[Bybit Exchange]
     FIREBASE[Firebase Auth]
 end
 
WEB --> GATEWAY
MOBILE --> GATEWAY
GATEWAY --> AUTH
GATEWAY --> USER
GATEWAY --> WALLET
GATEWAY --> TRADING
GATEWAY --> KYC
TRADING --> BYBIT
AUTH --> FIREBASE
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