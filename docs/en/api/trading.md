---
layout: page
---

# Trading API

Welcome to the Trading API documentation. This interactive documentation allows you to test API endpoints directly from this page.

<InteractiveSpAPI />

## Endpoints Overview


### POST /spot/orders

**Summary:** Create spot order

**Description:** Returns spot order id and order link id. Result is described here.
https://bybit-exchange.github.io/docs/v5/order/create-order

! Need access token in bearer token authorization


### Request Parameters

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| Fingerprint | string | Yes | header | user device unique id |
| Body | object | No | body | - |



### Response Format

**Success Response (200):**
```json
{
  "orderId": "1",
  "orderLinkId": "2"
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

### DELETE /spot/orders

**Summary:** Cancel spot order

**Description:** Returns spot order id and order link id. Result is described here.
https://bybit-exchange.github.io/docs/v5/order/cancel-order

! Need access token in bearer token authorization


### Request Parameters

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| Fingerprint | string | Yes | header | user device unique id |
| Body | object | No | body | - |



### Response Format

**Success Response (200):**
```json
{
  "orderId": "1",
  "orderLinkId": "2"
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

### GET /spot/orders/history

**Summary:** List spot orders history

**Description:** https://bybit-exchange.github.io/docs/v5/order/order-list

! Need access token in bearer token authorization


### Request Parameters

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| Fingerprint | string | Yes | header | user device unique id |
| limit | integer | No | query | limit |
| category | string | Yes | query | order category |



### Response Format

**Success Response (200):**
```json
{
  "category": "spot",
  "list": [],
  "nextPageCursor": ""
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

### GET /spot/orders/open

**Summary:** List spot open orders

**Description:** https://bybit-exchange.github.io/docs/v5/order/open-order

! Need access token in bearer token authorization


### Request Parameters

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| Fingerprint | string | Yes | header | user device unique id |
| category | string | Yes | query | order category |
| limit | integer | No | query | limit |



### Response Format

**Success Response (200):**
```json
{
  "category": "spot",
  "list": [],
  "nextPageCursor": ""
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

### GET /spot/trades/history

**Summary:** List spot trades history

**Description:** https://bybit-exchange.github.io/docs/v5/order/execution

! Need access token in bearer token authorization

<script setup>
import InteractiveSpAPI from '../../.vitepress/theme/components/InteractiveSpAPI.vue'
</script>
