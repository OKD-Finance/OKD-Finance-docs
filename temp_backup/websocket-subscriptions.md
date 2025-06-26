---
layout: page
---

# WebsocketSubscriptions API

Welcome to the WebsocketSubscriptions API documentation. This interactive documentation allows you to test API endpoints directly from this page.

<InteractiveWebsocketSubscriptionsAPI />

## Endpoints Overview


### PATCH /authorization

**Summary:** Authorize websocket connection.

**Description:** Request is **{"path": "authorization", "payload": {"accessToken": "", "fingerprint": ""}}**.




#### Response Format {#response-format-0}

**Success Response (200):**
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
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

### PATCH /external

**Summary:** Do external market websocket operations. Payload contains bybit request.
https://bybit-exchange.github.io/docs/v5/ws/connect

**Description:** Public:
"/external" request is  **("/external", {"direction": "spot"})
"/external" request is  **{"/external", {"op": "subscribe", "args": ["tickers.BTCUSDT", "tickers.BNBUSDT"]})}**.

Private:
"/authorization"
"/external" request is  **{"/external", {"direction": "private"}}**.
"/external" request is  **{"/external", {"op": "subscribe", "args": ["wallet", "order",  "position", "execution", "execution.fast"}**.




#### Response Format {#response-format-1}

**Success Response (200):**
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
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

### PATCH /symbols

**Summary:** Subscribe to symbols events.

**Description:** Request is **{"path": "/symbols"}**. No need additional payload.




#### Response Format {#response-format-2}

**Success Response (200):**
```json
{
  "lastPrice": "3849",
  "price24hPcnt": "0",
  "symbol": "ETHUSDT"
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

### PATCH /unsubscribe

**Summary:** Unsubscribe from websocket events.

**Description:** Request is **{"path": "/unsubscribe", "payload": {"path": "/spot/order_events"}}**.
Payload "path" is path of some subscription.




#### Response Format {#response-format-3}

**Success Response (200):**
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
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

### PATCH /user/notifications

**Summary:** Subscribe to notifications.

**Description:** Request is **{"path": "/user/notifications"}**. No need additional payload.
! Need authorization




#### Response Format {#response-format-4}

**Success Response (200):**
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
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

### PATCH /user/profile

**Summary:** Subscribe to total balance events.

**Description:** Request is **{"path": "/user/profile"}**. No need additional payload.
! Need authorization




#### Response Format {#response-format-5}

**Success Response (200):**
```json
{
  "address": "123456, GB, London...",
  "avatar": "asd3sferdf",
  "country": "Germany",
  "currentWithdrawAmount": "100",
  "dateOfBirth": "1990-01-01",
  "documentDetails": "Number: ....",
  "documentType": "passport",
  "email": "john@mail.com",
  "favouriteSymbols": [
    "BTC_LTC",
    "BNB_ETH"
  ],
  "fullName": "John Sebastian Smith",
  "id": 1,
  "kyc1State": "accepted",
  "kyc2State": "rejected",
  "kycEmail": "a@a.com",
  "kycLevel": "verified",
  "kycPhone": "+01234567...",
  "name": "John Smith",
  "otp2fa": true,
  "referralProgramEnabled": true,
  "signInAt": 1674667813,
  "signUpAt": 1674611813,
  "status": "active",
  "tradeStatus": "active",
  "withdrawLimit": "10000",
  "withdrawResetAt": 1678329049834,
  "withdrawStatus": "unlimited",
  "withdrawUnlockAt": 1678329049834
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
import InteractiveWebsocketSubscriptionsAPI from '../../.vitepress/theme/components/InteractiveWebsocketSubscriptionsAPI.vue'
</script>