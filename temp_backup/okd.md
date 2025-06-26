---
layout: page
---

# Ok API

Welcome to the Ok API documentation. This interactive documentation allows you to test API endpoints directly from this page.

<InteractiveOkAPI />

## Endpoints Overview


### POST /okd/feedback

**Summary:** Send feedback.

**Description:** No description available


#### Request Parameters {#request-parameters-0}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| X-RECAPTCHA | string | Yes | header | RECAPTCHA token |
| X-PLATFORM-ID | string | Yes | header | recaptcha platform id |
| Body | object | No | body | - |



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

### POST /okd/private-feedback

**Summary:** Send private feedback.

**Description:** ! Need access token in bearer token authorization


#### Request Parameters {#request-parameters-1}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| Fingerprint | string | Yes | header | user device unique id |
| Body | object | No | body | - |



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

### POST /okd/question

**Summary:** Send question.

**Description:** No description available


#### Request Parameters {#request-parameters-2}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| X-RECAPTCHA | string | Yes | header | RECAPTCHA token |
| X-PLATFORM-ID | string | Yes | header | recaptcha platform id |
| Body | object | No | body | - |



#### Response Format {#response-format-2}

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

### GET /okd/topassets

**Summary:** List top assets.

**Description:** No description available


#### Request Parameters {#request-parameters-3}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| category | string | Yes | query | top category |



#### Response Format {#response-format-3}

**Success Response (200):**
```json
[
  {
    "asset": "BTC",
    "icon": "...",
    "iconNight": "...",
    "name": "Bitcoin",
    "price": "20393.48",
    "priceChange24h": "+12.68",
    "priceChangeYear": "-1.68",
    "volume": "1232.12"
  }
]
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
import InteractiveOkAPI from '../../.vitepress/theme/components/InteractiveOkAPI.vue'
</script>