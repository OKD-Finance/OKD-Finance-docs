# Authentication API

Interactive documentation for Authentication endpoints.

<script setup>
import InteractiveAuthenticationAPI from '../.vitepress/theme/components/InteractiveAuthenticationAPI.vue'
</script>

<InteractiveAuthenticationAPI />

## Endpoints Overview

### POST /auth/check/firebase

Check account existence by firebase token.

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `X-RECAPTCHA` (string, required) - RECAPTCHA token
- `X-PLATFORM-ID` (string, required) - recaptcha platform id
- `Body` (object, optional) - No description

**Responses:**
- `200` - pair of tokens response or operation response
- `400` - some logical error in request
- `500` - some error in internal server

### POST /auth/confirm

Send confirmation code to email.

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `X-RECAPTCHA` (string, required) - RECAPTCHA token
- `X-PLATFORM-ID` (string, required) - recaptcha platform id
- `Body` (object, optional) - No description

**Responses:**
- `200` - code is sended
- `400` - some logical error in request
- `500` - some error in internal server

### POST /auth/fcm

! Need access token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `Body` (object, optional) - user device id, platform and fcm

**Responses:**
- `200` - fcm successfully created
- `500` - some error in internal server

### DELETE /auth/fcm

! Need access token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `Body` (object, optional) - user device id, platform and fcm

**Responses:**
- `200` - fcm successfully created
- `500` - some error in internal server

### GET /auth/google

Get Google link for lgoin/register.

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `X-RECAPTCHA` (string, required) - RECAPTCHA token
- `X-PLATFORM-ID` (string, required) - recaptcha platform id

**Responses:**
- `200` - link
- `400` - some logical error in request
- `500` - some error in internal server

### POST /auth/jwt/refresh

! Need refresh token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id

**Responses:**
- `200` - a pair of new access and refresh tokens
- `400` - some logical error in request
- `401` - unauthorized error
- `500` - some error in internal server

### PUT /auth/locale

! Need access token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `Body` (object, optional) - No description

**Responses:**
- `200` - locale successfully changed
- `500` - some error in internal server

### GET /auth/notifications

! Need access token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `group_id` (string, optional) - Group of notifications. Omitted or 0 mean all.

- `hide_read` (string, optional) - Hide read notifications. Bool value: true or false.

- `limit` (string, optional) - Limit of records in request

- `offset` (string, optional) - Offset of records in request


**Responses:**
- `200` - list of notifications
- `500` - internal server error

### PUT /auth/notifications

! Need access token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `Body` (object, optional) - No description

**Responses:**
- `200` - notifications are marked as viewed.
- `500` - internal server error

### DELETE /auth/notifications

! Need access token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `Body` (object, optional) - No description

**Responses:**
- `200` - notifications are deleted.
- `500` - internal server error

### PUT /auth/notifications/{id}

! Need access token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `id` (string, optional) - ID of notifications.


**Responses:**
- `200` - notification is marked as viewed.
- `500` - internal server error

### POST /auth/otp

! Need access token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id

**Responses:**
- `200` - operation attributes
- `400` - some logical error in request
- `401` - unauthorized error
- `500` - some error in internal server

### DELETE /auth/otp

! Need access token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `email` (string, optional) - Flag indicates to use only email to turn off 2FA


**Responses:**
- `200` - operation attributes
- `400` - some logical error in request
- `401` - unauthorized error
- `500` - some error in internal server

### PUT /auth/password

! Need access token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `Body` (object, optional) - No description

**Responses:**
- `200` - operation attributes
- `400` - some logical error in request
- `401` - unauthorized error
- `500` - some error in internal server

### PUT /auth/password/restore

Finishes restoration of current user password.

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `X-RECAPTCHA` (string, required) - RECAPTCHA token
- `X-PLATFORM-ID` (string, required) - recaptcha platform id
- `Body` (object, optional) - No description

**Responses:**
- `200` - finish successful
- `400` - some logical error in request
- `500` - some error in internal server

### POST /auth/password/restore

Inits restoration of current user password.

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `X-RECAPTCHA` (string, required) - RECAPTCHA token
- `X-PLATFORM-ID` (string, required) - recaptcha platform id
- `Body` (object, optional) - No description

**Responses:**
- `200` - init successful
- `400` - some logical error in request
- `500` - some error in internal server

### GET /auth/password/restore/{code}

Check restoration code.

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `X-RECAPTCHA` (string, required) - RECAPTCHA token
- `X-PLATFORM-ID` (string, required) - recaptcha platform id
- `code` (string, optional) - code from email

**Responses:**
- `200` - result of checking
- `400` - some logical error in request
- `500` - some error in internal server

### GET /auth/profile

! Need access token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id

**Responses:**
- `200` - user information
- `400` - some logical error in request
- `401` - unauthorized error
- `500` - some error in internal server

### PUT /auth/profile

! Need access token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `Body` (object, optional) - No description

**Responses:**
- `200` - profile is updated successful
- `400` - some logical error in request
- `401` - unauthorized error
- `500` - some error in internal server

### GET /auth/remove

! Need access token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id

**Responses:**
- `200` - operation attributes
- `400` - some logical error in request
- `401` - unauthorized error
- `500` - some error in internal server

### PUT /auth/remove

! Need access token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `Body` (object, optional) - No description

**Responses:**
- `200` - operation attributes
- `400` - some logical error in request
- `401` - unauthorized error
- `500` - some error in internal server

### PUT /auth/sign-in

Confirm login operation.

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `X-RECAPTCHA` (string, required) - RECAPTCHA token
- `X-PLATFORM-ID` (string, required) - recaptcha platform id
- `Body` (object, optional) - No description

**Responses:**
- `200` - pair of tokens response or operation response
- `400` - some logical error in request
- `500` - some error in internal server

### POST /auth/sign-in

Logins user and return pair of tokens or login operation with hints.

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `X-RECAPTCHA` (string, required) - RECAPTCHA token
- `X-PLATFORM-ID` (string, required) - recaptcha platform id
- `Body` (object, optional) - No description

**Responses:**
- `200` - pair of tokens response or operation response
- `400` - some logical error in request
- `500` - some error in internal server

### POST /auth/sign-in/firebase

Sign in by firebase request.

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `X-RECAPTCHA` (string, required) - RECAPTCHA token
- `X-PLATFORM-ID` (string, required) - recaptcha platform id
- `Body` (object, optional) - No description

**Responses:**
- `200` - pair of tokens response or operation response
- `203` - we need additional confirmation codes
- `400` - some logical error in request
- `500` - some error in internal server

### POST /auth/sign-in/google

Sign in by Google OAuth2 request.

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `X-RECAPTCHA` (string, required) - RECAPTCHA token
- `X-PLATFORM-ID` (string, required) - recaptcha platform id
- `Body` (object, optional) - No description

**Responses:**
- `200` - pair of tokens response or operation response
- `400` - some logical error in request
- `500` - some error in internal server

### PUT /auth/sign-in/resend

Only one of flags should be set.

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `X-RECAPTCHA` (string, required) - RECAPTCHA token
- `X-PLATFORM-ID` (string, required) - recaptcha platform id
- `Body` (object, optional) - No description

**Responses:**
- `200` - operation response
- `400` - some logical error in request
- `500` - some error in internal server

### POST /auth/sign-out

! Need access token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id

**Responses:**
- `200` - user session was removed
- `400` - some logical error in request
- `401` - unauthorized error
- `500` - some error in internal server

### POST /auth/sign-up

Registration save user in database and send verification url to email.

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `X-RECAPTCHA` (string, required) - RECAPTCHA token
- `X-PLATFORM-ID` (string, required) - recaptcha platform id
- `Body` (object, optional) - No description

**Responses:**
- `200` - user was registrated
- `400` - some logical error in request
- `500` - some error in internal server

### POST /auth/sign-up/google

Sign up by Google OAuth2 request.

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `X-RECAPTCHA` (string, required) - RECAPTCHA token
- `X-PLATFORM-ID` (string, required) - recaptcha platform id
- `Body` (object, optional) - No description

**Responses:**
- `200` - user was registrated
- `400` - some logical error in request
- `500` - some error in internal server

### PUT /user/flags

! Need access token in bearer token authorization

**Parameters:**
- `Fingerprint` (string, required) - user device unique id
- `Body` (object, optional) - profile flag. Can be *futures_order_confirmation* , *futures_visited*, *first_order_after_one_click_trading*

**Responses:**
- `200` - profile is updated successful
- `500` - some error in internal server

