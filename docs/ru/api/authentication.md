# API Аутентификации

Документация по API endpoints для аутентификации и авторизации пользователей.

## Базовая информация

**Base URL:** `https://develop.okd.finance/api`  
**Требуется аутентификация:** Firebase Token для большинства endpoints

## Endpoints

### POST /api/auth/register
Регистрация нового пользователя

#### Headers
```
Authorization: Bearer <firebase_token>
Content-Type: application/json
```

#### Request Body
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_123456",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "isVerified": false,
      "createdAt": "2024-01-01T00:00:00Z"
    },
    "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "rt_abcdef123456"
  }
}
```

### POST /api/auth/login
Авторизация пользователя

#### Headers
```
Authorization: Bearer <firebase_token>
Content-Type: application/json
```

#### Response
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_123456",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "isVerified": true,
      "roles": ["trader", "verified"],
      "lastLoginAt": "2024-01-01T00:00:00Z"
    },
    "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "rt_abcdef123456"
  }
}
```

### POST /api/auth/refresh
Обновление JWT токена

#### Headers
```
Authorization: Bearer <firebase_token>
Content-Type: application/json
```

#### Response
```json
{
  "success": true,
  "data": {
    "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}
```

### POST /api/auth/logout
Выход из системы

#### Headers
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

#### Response
```json
{
  "success": true,
  "message": "Successfully logged out"
}
```

### GET /api/auth/me
Получение информации о текущем пользователе

#### Headers
```
Authorization: Bearer <jwt_token>
```

#### Response
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_123456", 
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "phone": "+1234567890",
      "isVerified": true,
      "kycStatus": "approved",
      "roles": ["trader", "verified"],
      "settings": {
        "timezone": "UTC",
        "language": "en",
        "notifications": {
          "email": true,
          "push": false
        }
      },
      "createdAt": "2024-01-01T00:00:00Z",
      "lastLoginAt": "2024-01-01T12:00:00Z"
    }
  }
}
```

### PUT /api/auth/profile
Обновление профиля пользователя

#### Headers
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

#### Request Body
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "phone": "+1234567890",
  "settings": {
    "timezone": "America/New_York",
    "language": "ru",
    "notifications": {
      "email": true,
      "push": true
    }
  }
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_123456",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Smith",
      "phone": "+1234567890",
      "settings": {
        "timezone": "America/New_York",
        "language": "ru",
        "notifications": {
          "email": true,
          "push": true
        }
      },
      "updatedAt": "2024-01-01T12:30:00Z"
    }
  }
}
```

## Коды ошибок

### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid request data",
    "details": {
      "email": "Email is required"
    }
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Insufficient permissions"
  }
}
```

### 409 Conflict
```json
{
  "success": false,
  "error": {
    "code": "USER_EXISTS",
    "message": "User with this email already exists"
  }
}
```

### 429 Too Many Requests
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT",
    "message": "Too many requests, please try again later",
    "retryAfter": 60
  }
}
```

## Rate Limiting

| Endpoint | Лимит | Период |
|----------|-------|--------|
| POST /auth/register | 5 requests | 1 hour |
| POST /auth/login | 10 requests | 5 minutes |
| POST /auth/refresh | 100 requests | 1 hour |
| Other endpoints | 1000 requests | 1 hour |

## Примеры использования

### JavaScript (Fetch API)
```javascript
// Регистрация
const registerUser = async (firebaseToken, userData) => {
  const response = await fetch('https://develop.okd.finance/api/auth/register', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${firebaseToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  
  const result = await response.json();
  return result;
};

// Авторизация
const loginUser = async (firebaseToken) => {
  const response = await fetch('https://develop.okd.finance/api/auth/login', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${firebaseToken}`,
      'Content-Type': 'application/json'
    }
  });
  
  const result = await response.json();
  return result;
};
```

### Python (requests)
```python
import requests

def register_user(firebase_token, user_data):
    headers = {
        'Authorization': f'Bearer {firebase_token}',
        'Content-Type': 'application/json'
    }
    
    response = requests.post(
        'https://develop.okd.finance/api/auth/register',
        headers=headers,
        json=user_data
    )
    
    return response.json()

def login_user(firebase_token):
    headers = {
        'Authorization': f'Bearer {firebase_token}',
        'Content-Type': 'application/json'
    }
    
    response = requests.post(
        'https://develop.okd.finance/api/auth/login',
        headers=headers
    )
    
    return response.json()
``` 