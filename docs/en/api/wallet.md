# Wallet API

Interactive documentation for Wallet endpoints.

<script setup>
import InteractiveWalletAPI from '../.vitepress/theme/components/InteractiveWalletAPI.vue'
</script>

<InteractiveWalletAPI />

## Endpoints Overview

### GET /wallet/balances

! Need access token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `type` (string, optional) - Balance type

- `coin` (string, optional) - Comma-separated list of coins. Can be empty
- `sortBy` (string, optional) - Comma-separated list of sort balances. Every item must be *field name:sort order*. Sort order must be 'asc' or 'desc'
  Available values: *coin, total, available,locked*


**Responses:**
- `200` - user balances
- `401` - unauthorized error
- `500` - some error in internal server

### GET /wallet/total-balance

! Need access token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id

**Responses:**
- `200` - user total balance
- `401` - unauthorized error
- `500` - some error in internal server

### GET /wallet/transactions

! Need access token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `statuses` (string, optional) - Comma-separated list of transaction statuses
  Available values: *new, rejected, completed, pending, failed*

- `coin` (string, optional) - Transaction coin

- `amount` (string, optional) - Amount of transaction

- `type` (string, optional) - Type of transaction

- `from` (string, optional) - Get transactions created after the _from_ timestamp (in seconds)

- `to` (string, optional) - Get transactions created before the _to_ timestamp (in seconds)

- `sortBy` (string, optional) - Comma-separated list of sort order. Every item must be *field name:sort order*. Sort order must be 'asc' or 'desc'
  Available values: *created_at, type, amount, coin, status*

- `limit` (string, optional) - Limit of records in request

- `offset` (string, optional) - Offset of records in request

- `search` (string, optional) - User ID; wallet address; transaction hash; Recipient email (for internal transfer sent by email);


**Responses:**
- `200` - list of transactions
- `500` - internal server error

### GET /wallet/transactions/deposit

! Need access token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `coin` (string, optional) - Coin
- `chainType` (string, optional) - Chain type

**Responses:**
- `200` - Sample for doc, deposit address
- `500` - some error in internal server

### POST /wallet/transactions/transfer

! Need access token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `Body` (object, optional) - No description

**Responses:**
- `200` - operation attributes
- `400` - some logical error in request
- `401` - unauthorized error
- `500` - some error in internal server

### POST /wallet/transactions/withdraw

! Need access token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `Body` (object, optional) - No description

**Responses:**
- `200` - operation attributes
- `400` - some logical error in request
- `401` - unauthorized error
- `500` - some error in internal server

### PUT /wallet/transactions/withdraw/{uuid}/reject

! Need Bearer token and OTP authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `uuid` (string, optional) - Transaction UUID

- `type` (string, optional) - Reject type


**Responses:**
- `200` - withdrawal declined
- `400` - some logical error in request
- `401` - unauthorized error
- `500` - some error in internal server

