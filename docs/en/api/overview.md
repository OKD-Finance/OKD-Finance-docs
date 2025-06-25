# API Overview

Welcome to the OKD Finance API documentation. This comprehensive guide covers all available endpoints for our cryptocurrency exchange platform.

## Base URL
```
https://develop.okd.finance/api
```

## Authentication
Most endpoints require authentication using Bearer tokens:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## API Categories

### Core APIs
- **Authentication** - User registration, login, token management
- **Users** - Profile management, settings, activity
- **Wallets** - Balance, deposits, addresses
- **Trading** - Orders, trades, positions
- **KYC** - Identity verification

### Administrative APIs
- **Access Management** - Role-based access control
- **Analytics** - Platform analytics and reporting
- **Audit** - System audit logs
- **Support** - Customer support tickets
- **Settings** - Platform configuration

### Trading APIs
- **Spot Trading** - Spot market operations
- **Exchange** - Market data and symbols
- **P2P** - Peer-to-peer trading
- **History** - Transaction history

### Specialized APIs
- **Notifications** - Push notifications
- **Email Templates** - Email management
- **Fee Settings** - Trading fees configuration
- **Withdrawal** - Withdrawal operations

## Rate Limits
- Public endpoints: 100 requests per minute
- Private endpoints: 1000 requests per minute
- Trading endpoints: 10 requests per second

## Response Format
All API responses follow this format:
```json
{
  "success": true,
  "data": { ... },
  "error": null
}
```

## Error Handling
Error responses include detailed information:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

## Getting Started
1. Register an account via the Authentication API
2. Complete KYC verification
3. Generate API keys in your account settings
4. Start trading using the Trading API
