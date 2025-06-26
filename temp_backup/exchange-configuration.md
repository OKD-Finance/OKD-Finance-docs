---
layout: page
---

# ExchangeConfiguration API

Welcome to the ExchangeConfiguration API documentation. This interactive documentation allows you to test API endpoints directly from this page.

<InteractiveExchangeConfigurationAPI />

## Endpoints Overview


### GET /config/assets

**Summary:** Returns assets. Result is described here.
https://bybit-exchange.github.io/docs/v5/asset/coin-info

**Description:** ! Need access token in bearer token authorization


#### Request Parameters {#request-parameters-0}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| Fingerprint | string | Yes | header | user device unique id |
| limit | integer | No | query | Limit of records in request  |
| offset | integer | No | query | Offset of records in request  |
| sortBy | string | No | query | Comma-separated list of sort order. Every item must be \*field name:sort order\*. Sort order must be 'asc' or 'desc'   Available values: \*coin, id, name\*  |
| search | string | No | query | Search by coin, id  |



#### Response Format {#response-format-0}

**Success Response (200):**
```json
{
  "count": 1,
  "list": [
    {
      "chains": [
        {
          "chain": "ETH",
          "chainDeposit": "1",
          "chainWithdraw": "1",
          "confirmation": "10000",
          "depositEnabled": true,
          "depositMin": "0.01",
          "minAccuracy": "8",
          "withdrawFee": "0.005",
          "withdrawMin": "0.02",
          "withdrawPercentageFee": "0.022",
          "withdrawalEnabled": false
        }
      ],
      "coin": "ETH",
      "icon": "...",
      "iconNight": "...",
      "name": "ETH",
      "remainAmount": "1020000",
      "tradingEnabled": false
    }
  ]
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": {
    "code": 400001,
    "message": "Invalid request parameters"
  }
}
```


---

### GET /config/assets/networks

**Summary:** Returns networks (asset + chain) with trading/transaction states info.

**Description:** No description available


#### Request Parameters {#request-parameters-1}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| Fingerprint | string | Yes | header | user device unique id |
| limit | integer | No | query | Limit of records in request  |
| offset | integer | No | query | Offset of records in request  |
| activityType | string | No | query | Activity type  |
| activityEnabled | bool | No | query | Deposit, withdrawal, trading enabled/disabled  |
| sortBy | string | No | query | Comma-separated list of sort order. Every item must be \*field name:sort order\*. Sort order must be 'asc' or 'desc'   Available values: \*coin, network\*  |
| search | string | No | query | Search by coin, network  |



#### Response Format {#response-format-1}

**Success Response (200):**
```json
{
  "count": 1,
  "list": [
    {
      "coin": "ETH",
      "deposit": false,
      "icon": "...",
      "iconNight": "...",
      "network": "Bitcoin network",
      "trading": false,
      "withdrawal": false
    }
  ]
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": {
    "code": 400001,
    "message": "Invalid request parameters"
  }
}
```


---

### GET /config/flags

**Summary:** No summary available

**Description:** Get global flags


#### Request Parameters {#request-parameters-2}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| Fingerprint | string | Yes | header | user device unique id |



#### Response Format {#response-format-2}

**Success Response (200):**
```json
{
  "deposits": true,
  "futures": true,
  "registration": true,
  "spot": true,
  "transfers": true,
  "withdrawals": true
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": {
    "code": 400001,
    "message": "Invalid request parameters"
  }
}
```


---

### GET /config/spot/lite-symbols

**Summary:** Returns spot ticker + ticker info, where quoteCoin = USDC. Result is described here.

**Description:** https://bybit-exchange.github.io/docs/v5/market/tickers
https://bybit-exchange.github.io/docs/v5/market/instrument


#### Request Parameters {#request-parameters-3}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| Fingerprint | string | Yes | header | user device unique id |
| category | string | Yes | query | symbol category |
| baseCoin | string | No | query | filter baseCoin |
| tradingEnabled | bool | No | query | trading status |
| limit | integer | No | query | Limit of records in request  |
| offset | integer | No | query | Offset of records in request  |
| sortBy | string | No | query | Comma-separated list of sort order. Every item must be \*field name:sort order\*. Sort order must be 'asc' or 'desc'   Available values: \*symbol, lastPrice, price24hPcnt, id\*  |
| search | string | No | query | Search by name, id  |



#### Response Format {#response-format-3}

**Success Response (200):**
```json
{
  "count": 1,
  "list": [
    {
      "ask1Price": "20527.77",
      "ask1Size": "1.862172",
      "baseCoin": "BTC",
      "basePrecision": "0.000001",
      "bid1Price": "20517.96",
      "bid1Size": "2",
      "highPrice24h": "21128.12",
      "icon": "...",
      "iconNight": "...",
      "lastPrice": "20533.13",
      "limitParameter": "0.05",
      "lowPrice24h": "20318.89",
      "marketParameter": "0.05",
      "maxOrderAmt": "2000000",
      "maxOrderQty": "71.73956243",
      "minOrderAmt": "1",
      "minOrderQty": "0.000048",
      "prevPrice24h": "20393.48",
      "price24hPcnt": "0.0068",
      "quoteCoin": "USDC",
      "quotePrecision": "0.00000001",
      "symbol": "BNBETH",
      "tickSize": "0.01",
      "tradingEnabled": true,
      "turnover24h": "243765620.65899866",
      "usdIndexPrice": "20784.12009279",
      "volume24h": "11801.27771"
    }
  ]
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": {
    "code": 400001,
    "message": "Invalid request parameters"
  }
}
```


---

### GET /config/spot/symbols

**Summary:** Returns spot ticker + ticker info. Result is described here.

**Description:** https://bybit-exchange.github.io/docs/v5/market/tickers
https://bybit-exchange.github.io/docs/v5/market/instrument


#### Request Parameters {#request-parameters-4}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| Fingerprint | string | Yes | header | user device unique id |
| category | string | Yes | query | symbol category |
| baseCoin | string | No | query | filter baseCoin |
| tradingEnabled | bool | No | query | trading status |
| limit | integer | No | query | Limit of records in request  |
| offset | integer | No | query | Offset of records in request  |
| sortBy | string | No | query | Comma-separated list of sort order. Every item must be \*field name:sort order\*. Sort order must be 'asc' or 'desc'   Available values: \*symbol, lastPrice, price24hPcnt, id\*  |
| search | string | No | query | Search by name, id  |



#### Response Format {#response-format-4}

**Success Response (200):**
```json
{
  "count": 1,
  "list": [
    {
      "ask1Price": "20527.77",
      "ask1Size": "1.862172",
      "baseCoin": "BTC",
      "basePrecision": "0.000001",
      "bid1Price": "20517.96",
      "bid1Size": "2",
      "highPrice24h": "21128.12",
      "icon": "...",
      "iconNight": "...",
      "lastPrice": "20533.13",
      "limitParameter": "0.05",
      "lowPrice24h": "20318.89",
      "marketParameter": "0.05",
      "maxOrderAmt": "2000000",
      "maxOrderQty": "71.73956243",
      "minOrderAmt": "1",
      "minOrderQty": "0.000048",
      "prevPrice24h": "20393.48",
      "price24hPcnt": "0.0068",
      "quoteCoin": "USDT",
      "quotePrecision": "0.00000001",
      "symbol": "BNBETH",
      "tickSize": "0.01",
      "tradingEnabled": true,
      "turnover24h": "243765620.65899866",
      "usdIndexPrice": "20784.12009279",
      "volume24h": "11801.27771"
    }
  ]
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": {
    "code": 400001,
    "message": "Invalid request parameters"
  }
}
```


---

### GET /config/withdrawal

**Summary:** Get withdrawal configuration for KYC levels.

**Description:** No description available


#### Request Parameters {#request-parameters-5}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| Fingerprint | string | Yes | header | user device unique id |



#### Response Format {#response-format-5}

**Success Response (200):**
```json
{
  "kyc1Limit": "9999.99",
  "kyc2Limit": "109999.99"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": {
    "code": 400001,
    "message": "Invalid request parameters"
  }
}
```


---


<script setup>
import InteractiveExchangeConfigurationAPI from '../../.vitepress/theme/components/InteractiveExchangeConfigurationAPI.vue'
</script>