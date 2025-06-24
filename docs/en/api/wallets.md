# Wallets API

The Wallets API provides endpoints for managing cryptocurrency wallets, checking balances, generating addresses, and handling deposits.

## Base URL
```
https://develop.okd.finance/api
```

## Authentication
All endpoints require authentication via Bearer token:
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

## Endpoints

### GET /wallets/balance
Get all wallet balances for the authenticated user.

**Example Request:**
```bash
curl -X GET "https://develop.okd.finance/api/wallets/balance" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "balances": [
      {
        "currency": "BTC",
        "available": "0.5432",
        "locked": "0.0000",
        "total": "0.5432"
      },
      {
        "currency": "ETH",
        "available": "12.3456",
        "locked": "2.1000",
        "total": "14.4456"
      },
      {
        "currency": "USDT",
        "available": "1000.00",
        "locked": "500.00",
        "total": "1500.00"
      }
    ],
    "totalValueUSD": "45678.90"
  }
}
```

### GET /wallets/balance/{currency}
Get balance for a specific currency.

**Path Parameters:**
- `currency` (string, required) - Currency code (BTC, ETH, USDT, etc.)

**Example Request:**
```bash
curl -X GET "https://develop.okd.finance/api/wallets/balance/BTC" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "currency": "BTC",
    "available": "0.5432",
    "locked": "0.0000",
    "total": "0.5432",
    "valueUSD": "23456.78"
  }
}
```

### POST /wallets/address
Generate a new deposit address for a specific currency.

**Parameters:**
- `currency` (string, required) - Currency code
- `label` (string, optional) - Address label for identification

**Example Request:**
```bash
curl -X POST "https://develop.okd.finance/api/wallets/address" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "currency": "BTC",
    "label": "Main deposit address"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "currency": "BTC",
    "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    "label": "Main deposit address",
    "network": "bitcoin",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### GET /wallets/addresses
Get all deposit addresses for the authenticated user.

**Query Parameters:**
- `currency` (string, optional) - Filter by currency
- `limit` (integer, optional) - Number of addresses to return (default: 50)
- `offset` (integer, optional) - Number of addresses to skip (default: 0)

**Example Request:**
```bash
curl -X GET "https://develop.okd.finance/api/wallets/addresses?currency=BTC&limit=10" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "addresses": [
      {
        "id": "addr_123",
        "currency": "BTC",
        "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        "label": "Main deposit address",
        "network": "bitcoin",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "total": 5,
      "limit": 10,
      "offset": 0,
      "hasMore": false
    }
  }
}
```

### GET /wallets/deposits
Get deposit history for the authenticated user.

**Query Parameters:**
- `currency` (string, optional) - Filter by currency
- `status` (string, optional) - Filter by status (pending, confirmed, failed)
- `limit` (integer, optional) - Number of deposits to return (default: 50)
- `offset` (integer, optional) - Number of deposits to skip (default: 0)
- `startDate` (string, optional) - Start date (ISO 8601 format)
- `endDate` (string, optional) - End date (ISO 8601 format)

**Example Request:**
```bash
curl -X GET "https://develop.okd.finance/api/wallets/deposits?currency=BTC&status=confirmed&limit=10" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "deposits": [
      {
        "id": "deposit_123",
        "currency": "BTC",
        "amount": "0.1000",
        "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        "txHash": "abcd1234567890abcd1234567890abcd1234567890abcd1234567890abcd1234",
        "status": "confirmed",
        "confirmations": 6,
        "requiredConfirmations": 3,
        "createdAt": "2024-01-15T10:30:00Z",
        "confirmedAt": "2024-01-15T11:00:00Z"
      }
    ],
    "pagination": {
      "total": 25,
      "limit": 10,
      "offset": 0,
      "hasMore": true
    }
  }
}
```

### GET /wallets/deposits/{id}
Get details of a specific deposit.

**Path Parameters:**
- `id` (string, required) - Deposit ID

**Example Request:**
```bash
curl -X GET "https://develop.okd.finance/api/wallets/deposits/deposit_123" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "deposit_123",
    "currency": "BTC",
    "amount": "0.1000",
    "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    "txHash": "abcd1234567890abcd1234567890abcd1234567890abcd1234567890abcd1234",
    "status": "confirmed",
    "confirmations": 6,
    "requiredConfirmations": 3,
    "network": "bitcoin",
    "fee": "0.0001",
    "createdAt": "2024-01-15T10:30:00Z",
    "confirmedAt": "2024-01-15T11:00:00Z"
  }
}
```

### GET /wallets/supported-currencies
Get list of supported currencies for deposits and withdrawals.

**Example Request:**
```bash
curl -X GET "https://develop.okd.finance/api/wallets/supported-currencies" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "currencies": [
      {
        "code": "BTC",
        "name": "Bitcoin",
        "network": "bitcoin",
        "decimals": 8,
        "minDeposit": "0.0001",
        "depositFee": "0.0000",
        "withdrawalFee": "0.0005",
        "minWithdrawal": "0.001",
        "maxWithdrawal": "10.0000",
        "depositEnabled": true,
        "withdrawalEnabled": true
      },
      {
        "code": "ETH",
        "name": "Ethereum",
        "network": "ethereum",
        "decimals": 18,
        "minDeposit": "0.01",
        "depositFee": "0.00",
        "withdrawalFee": "0.005",
        "minWithdrawal": "0.1",
        "maxWithdrawal": "100.0",
        "depositEnabled": true,
        "withdrawalEnabled": true
      }
    ]
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CURRENCY",
    "message": "Unsupported currency"
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

### 429 Too Many Requests
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many address generation requests"
  }
}
```

