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

<APINavigation />

## Core APIs

### User Management
- **Authentication API** - User login, registration, and token management
- **User Operations API** - Profile management and user settings
- **KYC API** - Know Your Customer verification processes

### Trading APIs
- **Spot API** - Spot trading operations and order management
- **ByBit REST endpoints API** - Integration with ByBit exchange
- **Referral program API** - Referral system and rewards management

### Administrative APIs
- **Exchange configuration API** - Exchange settings and configuration
- **Managed API** - Managed services and operations
- **OKD API** - Core platform operations

### Specialized APIs
- **Wallet API** - Wallet management and cryptocurrency operations
- **Datasource API** - Data source management and configuration
- **Websocket subscriptions API** - Real-time data subscriptions
- **Errors API** - Error handling and reporting

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
  "message": "Operation completed successfully",
  "timestamp": "2025-01-20T10:30:00Z"
}
```

## Error Handling
Error responses include detailed information:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid username or password",
    "details": {
      "field": "password",
      "reason": "Password does not meet requirements"
    }
  },
  "timestamp": "2025-01-20T10:30:00Z"
}
```

## Getting Started
1. **Authentication** - Start by registering and obtaining an API token
2. **Explore APIs** - Browse the available API categories above
3. **Test Endpoints** - Use the interactive API explorer on each endpoint page
4. **Integration** - Implement the APIs in your application

Choose an API category above to explore detailed endpoint documentation with interactive testing capabilities.
