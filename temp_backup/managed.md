---
layout: page
---

# Ma API

Welcome to the Ma API documentation. This interactive documentation allows you to test API endpoints directly from this page.

<InteractiveMaAPI />

## Endpoints Overview


### POST /managed/sign-in

**Summary:** Login user for managed ID.

**Description:** No description available


#### Request Parameters {#request-parameters-0}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| X-API-KEY | string | Yes | header | API key value |
| X-API-TIMESTAMP | string | Yes | header | current unix timestamp in seconds |
| X-API-SIGNATURE | string | Yes | header | request HMAC-SHA256 signature |
| Body | object | No | body | - |



#### Response Format {#response-format-0}

**Success Response (200):**
```json
{
  "acc_token": "my.access.token",
  "refresh_token": "my.refresh.token"
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

### POST /managed/sign-up

**Summary:** Creates user for managed ID.

**Description:** No description available


#### Request Parameters {#request-parameters-1}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| X-API-KEY | string | Yes | header | API key value |
| X-API-TIMESTAMP | string | Yes | header | current unix timestamp in seconds |
| X-API-SIGNATURE | string | Yes | header | request HMAC-SHA256 signature |
| Body | object | No | body | - |



#### Response Format {#response-format-1}

**Success Response (200):**
```json
{
  "userId": 12345
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
import InteractiveMaAPI from '../../.vitepress/theme/components/InteractiveMaAPI.vue'
</script>