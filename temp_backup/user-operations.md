---
layout: page
---

# UserOperations API

Welcome to the UserOperations API documentation. This interactive documentation allows you to test API endpoints directly from this page.

<InteractiveUserOperationsAPI />

## Endpoints Overview


### PUT /operations/{uuid}/cancel

**Summary:** Cancels operation by uuid.

**Description:** ! Need access token in bearer token authorization


#### Request Parameters {#request-parameters-0}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| Fingerprint | string | Yes | header | user device unique id |
| uuid | string | No | path | UUID of transaction  |



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

### PUT /operations/{uuid}/confirm

**Summary:** Confirms operation by uuid and code.

**Description:** ! Need access token in bearer token authorization


#### Request Parameters {#request-parameters-1}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| Fingerprint | string | Yes | header | user device unique id |
| uuid | string | No | path | UUID of operation  |
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

### PUT /operations/{uuid}/resend

**Summary:** Resends code to email for specified operation.

**Description:** ! Need access token in bearer token authorization


#### Request Parameters {#request-parameters-2}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| Fingerprint | string | Yes | header | user device unique id |
| uuid | string | No | path | UUID of transaction  |



#### Response Format {#response-format-2}

**Success Response (200):**
```json
{
  "email2fa": true,
  "emailHint": "***aaa@gmail.com",
  "expiresAt": 123456,
  "otp2fa": true,
  "resendEmailAfter": 123456,
  "uuid": "abcde-12345-asdas"
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
import InteractiveUserOperationsAPI from '../../.vitepress/theme/components/InteractiveUserOperationsAPI.vue'
</script>