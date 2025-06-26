---
layout: page
---

# ReferralProgram API

Welcome to the ReferralProgram API documentation. This interactive documentation allows you to test API endpoints directly from this page.

<InteractiveReferralProgramAPI />

## Endpoints Overview


### GET /referral

**Summary:** Get list of referral link.

**Description:** ! Need access token in bearer token authorization


#### Request Parameters {#request-parameters-0}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| Fingerprint | string | Yes | header | user device unique id |
| sortBy | string | No | query | Comma-separated list of sort order. Every item must be \*field name:sort order\*. Sort order must be 'asc' or 'desc'   Available values:  |
| limit | integer | No | query | Limit of records in request  |
| offset | integer | No | query | Offset of records in request  |



#### Response Format {#response-format-0}

**Success Response (200):**
```json
[
  {
    "count": 20,
    "data": [
      {
        "createdAt": 123456,
        "id": 1,
        "isDefault": true,
        "linkId": "1DASN87",
        "summary": {
          "level1": {
            "referrals": 10,
            "rewards": "123.456"
          },
          "level2": {
            "referrals": 10,
            "rewards": "123.456"
          },
          "level3": {
            "referrals": 10,
            "rewards": "123.456"
          },
          "liquidityFee": "123.456",
          "total": {
            "referrals": 10,
            "rewards": "123.456"
          }
        }
      }
    ]
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

### POST /referral

**Summary:** Add referral link.

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
  "createdAt": 123456,
  "id": 1,
  "isDefault": true,
  "linkId": "1DASN87",
  "summary": {
    "level1": {
      "referrals": 10,
      "rewards": "123.456"
    },
    "level2": {
      "referrals": 10,
      "rewards": "123.456"
    },
    "level3": {
      "referrals": 10,
      "rewards": "123.456"
    },
    "liquidityFee": "123.456",
    "total": {
      "referrals": 10,
      "rewards": "123.456"
    }
  }
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

### GET /referral/export

**Summary:** Export history of fees to xlsx file

**Description:** ! Need access token in bearer token authorization


#### Request Parameters {#request-parameters-2}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| Fingerprint | string | Yes | header | user device unique id |
| from | integer | No | query | Start timestamp of export  |
| to | integer | No | query | End timestamp of export  |



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

### GET /referral/fees

**Summary:** Get history of fees

**Description:** ! Need access token in bearer token authorization


#### Request Parameters {#request-parameters-3}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| Fingerprint | string | Yes | header | user device unique id |
| sortBy | string | No | query | Comma-separated list of sort order. Every item must be \*field name:sort order\*. Sort order must be 'asc' or 'desc'   Available values:  |
| limit | integer | No | query | Limit of records in request  |
| offset | integer | No | query | Offset of records in request  |



#### Response Format {#response-format-3}

**Success Response (200):**
```json
[
  {
    "count": 20,
    "data": [
      {
        "coin": "BTC",
        "level": 1,
        "linkId": "1DASN87",
        "referrals": 1,
        "reward": "123.456"
      }
    ]
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

### GET /referral/link/{link}

**Summary:** Get public attributes of referral link.

**Description:** No description available


#### Request Parameters {#request-parameters-4}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| link | string | No | path | Link ID  |



#### Response Format {#response-format-4}

**Success Response (200):**
```json
{
  "linkId": "1EDF45PA"
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

### GET /referral/percents

**Summary:** Get current percents of referral program.

**Description:** ! Need access token in bearer token authorization


#### Request Parameters {#request-parameters-5}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| Fingerprint | string | Yes | header | user device unique id |



#### Response Format {#response-format-5}

**Success Response (200):**
```json
{
  "level1": "15",
  "level2": "10",
  "level3": "5"
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

### GET /referral/program

**Summary:** Get header of referral program.

**Description:** ! Need access token in bearer token authorization


#### Request Parameters {#request-parameters-6}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| Fingerprint | string | Yes | header | user device unique id |



#### Response Format {#response-format-6}

**Success Response (200):**
```json
{
  "defaultLink": {
    "id": 1,
    "linkId": "1DASN87"
  },
  "summary": {
    "earnings": "123.456",
    "nextPayoutDate": 12345678,
    "referrals": 10,
    "startedTrading": 5
  }
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

### GET /referral/{id}

**Summary:** Get details of referral link.

**Description:** ! Need access token in bearer token authorization


#### Request Parameters {#request-parameters-7}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| Fingerprint | string | Yes | header | user device unique id |
| id | integer | No | path | Link internal ID  |
| limit | integer | No | query | Limit of records in request  |
| offset | integer | No | query | Offset of records in request  |



#### Response Format {#response-format-7}

**Success Response (200):**
```json
{
  "createdAt": 123456,
  "id": 1,
  "isDefault": true,
  "linkId": "1DASN87",
  "summary": {
    "level1": {
      "referrals": 10,
      "rewards": "123.456"
    },
    "level2": {
      "referrals": 10,
      "rewards": "123.456"
    },
    "level3": {
      "referrals": 10,
      "rewards": "123.456"
    },
    "liquidityFee": "123.456",
    "total": {
      "referrals": 10,
      "rewards": "123.456"
    }
  }
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

### PUT /referral/{id}

**Summary:** Set default referral link.

**Description:** ! Need access token in bearer token authorization


#### Request Parameters {#request-parameters-8}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| Fingerprint | string | Yes | header | user device unique id |
| id | integer | No | path | Link internal ID  |



#### Response Format {#response-format-8}

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


<script setup>
import InteractiveReferralProgramAPI from '../../.vitepress/theme/components/InteractiveReferralProgramAPI.vue'
</script>