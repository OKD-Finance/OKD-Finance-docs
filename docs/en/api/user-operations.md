# User Operations API

Interactive documentation for User Operations endpoints.

<script setup>
import InteractiveUserOperationsAPI from '../.vitepress/theme/components/InteractiveUserOperationsAPI.vue'
</script>

<InteractiveUserOperationsAPI />

## Endpoints Overview

### PUT /operations/{uuid}/cancel

! Need access token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `uuid` (string, optional) - UUID of transaction


**Responses:**
- `200` - operation cancelled
- `400` - some logical error in request
- `401` - unauthorized error
- `500` - some error in internal server

### PUT /operations/{uuid}/confirm

! Need access token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `uuid` (string, optional) - UUID of operation

- `Body` (object, optional) - No description

**Responses:**
- `200` - operation completed
- `400` - some logical error in request
- `401` - unauthorized error
- `500` - some error in internal server

### PUT /operations/{uuid}/resend

! Need access token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `uuid` (string, optional) - UUID of transaction


**Responses:**
- `200` - operation attributes
- `400` - some logical error in request
- `401` - unauthorized error
- `500` - some error in internal server

