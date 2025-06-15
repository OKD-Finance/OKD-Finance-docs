# API Overview

OKD Finance provides a comprehensive REST API for all platform functions.

## Base URL
``` -->
https://api.okd.finance
``` -->

## Authentication

All API requests require JWT authentication:

```bash
curl -X GET "https://api.okd.finance/endpoint" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
``` -->

## API Categories

### Authentication API
- User registration and login
- Token management
- Profile updates

### Wallet API  
- Balance inquiries
- Deposit/withdrawal operations
- Transaction history

### Trading API
- Order placement and management
- Position tracking
- Market data access

### KYC API
- Document upload
- Verification status
- Compliance checks

## Rate Limits

| Category | Limit |
|----------|-------|
| Public endpoints | 100 req/min |
| Private endpoints | 1000 req/min |
| Trading endpoints | 500 req/min |

## Response Format

All responses follow this structure:

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "error": null
}
``` -->

## Error Handling

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
``` -->

## WebSocket API

Real-time data streams:

```javascript
const ws = new WebSocket('wss://api.okd.finance/ws');
ws.send(JSON.stringify({
  action: 'subscribe',
  channel: 'prices',
  symbol: 'BTCUSDT'
}));
``` -->

## SDKs and Libraries

- JavaScript/Node.js SDK
- Python SDK  
- PHP SDK
- Go SDK

## Getting Started

1. [Authentication](/en/api/authentication)
2. [User Management](/en/api/users)
3. [Wallet Operations](/en/api/wallets)
4. [Trading Functions](/en/trading/overview) 