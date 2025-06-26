---
layout: page
---

# Datasource API

Welcome to the Datasource API documentation. This interactive documentation allows you to test API endpoints directly from this page.

<InteractiveDatasourceAPI />

## Endpoints Overview


### GET /datasource/coin-info

**Summary:** No summary available

**Description:** get coin info by asset id and source id


#### Request Parameters {#request-parameters-0}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| Fingerprint | string | Yes | header | user device unique id |
| asset_id | string | Yes | query | Asset id  |
| source_id | string | No | query | Data source id  |



#### Response Format {#response-format-0}

**Success Response (200):**
```json
{
  "assetId": "BTC",
  "coinId": "bitcoin",
  "createdAt": 1674667813,
  "description": "Bitcoin...",
  "marketCap": "123456",
  "marketCapRank": "1",
  "priceChangePercentage24h": "3.12502",
  "sourceId": "CoinGecko.com",
  "totalVolume": "1234567"
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

### GET /datasource/prices/assets

**Summary:** Get datasource assets price.

**Description:** No description available


#### Request Parameters {#request-parameters-1}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| Fingerprint | string | Yes | header | user device unique id |
| datasource | string | No | query | Get data from datasource  |
| search | string | No | query | Filter by assetName, assetTicker  |
| sortBy | string | No | query | Comma-separated list of sort order. Every item must be \*field name:sort order\*. Sort order must be 'asc' or 'desc'   Available values: \*id\*  |
| fullness | string | Yes | query | Filter asset tickers  |
| limit | integer | No | query | Limit of records in request  |
| offset | integer | No | query | Offset of records in request  |



#### Response Format {#response-format-1}

**Success Response (200):**
```json
{
  "count": 1,
  "sourceConfig": [
    {
      "assetName": "Bitcoin",
      "createdAt": 123456789,
      "id": "BTC",
      "price": "5.0001"
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

### GET /datasource/prices/history

**Summary:** No summary available

**Description:** get datasource prices history by asset id, coin id, source id and interval endpoint handler


#### Request Parameters {#request-parameters-2}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| Fingerprint | string | Yes | header | user device unique id |
| asset_id | string | Yes | query | Asset id  |
| source_id | string | No | query | Data source id  |
| interval | string | No | query | Calculation period for last (hour, day, week, 90 days, year) Required if "from" and "to" is empty.  |
| from | integer | No | query | Get records created after the \_from\_ timestamp (in seconds). Required if "interval" is empty  |
| to | integer | No | query | Get records created before the \_to\_ timestamp (in seconds). Required if "interval" is empty  |



#### Response Format {#response-format-2}

**Success Response (200):**
```json
{
  "count": 24,
  "data": [
    {
      "price": "5.003",
      "ts": 1674667813
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

### GET /datasource/prices/sources

**Summary:** Get datasource list.

**Description:** No description available


#### Request Parameters {#request-parameters-3}

| Parameter | Type | Required | Location | Description |
|-----------|------|----------|----------|-------------|
| Fingerprint | string | Yes | header | user device unique id |



#### Response Format {#response-format-3}

**Success Response (200):**
```json
{
  "list": [
    "CoinGecko.com"
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


<script setup>
import InteractiveDatasourceAPI from '../../.vitepress/theme/components/InteractiveDatasourceAPI.vue'
</script>