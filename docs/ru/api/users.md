# API пользователей

API для управления пользователями и профилями в системе OKD Finance.

## Аутентификация

Все запросы к API пользователей требуют аутентификации через JWT токен или API ключи.

```javascript
// Установка токена аутентификации
okdFinance.setAuthToken('your-jwt-token');

// Или использование API ключей
okdFinance.setApiKeys({
  apiKey: 'your-api-key',
  secretKey: 'your-secret-key'
});
```

## Профиль пользователя

### Получение информации о профиле

```http
GET /api/v1/user/profile
```

```javascript
const profile = await okdFinance.getUserProfile();
console.log(profile);
```

**Ответ:**
```json
{
  "userId": "12345",
  "email": "user@example.com",
  "username": "trader123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "country": "US",
  "language": "en",
  "timezone": "UTC",
  "createdAt": "2024-01-01T00:00:00Z",
  "lastLoginAt": "2024-12-20T10:30:00Z",
  "status": "active",
  "verificationLevel": "basic",
  "twoFactorEnabled": true
}
```

### Обновление профиля

```http
PUT /api/v1/user/profile
```

```javascript
const updatedProfile = await okdFinance.updateUserProfile({
  firstName: "John",
  lastName: "Smith",
  phone: "+1234567891",
  language: "ru",
  timezone: "Europe/Moscow"
});
```

**Параметры:**
| Поле | Тип | Описание |
|------|-----|----------|
| `firstName` | string | Имя пользователя |
| `lastName` | string | Фамилия пользователя |
| `phone` | string | Номер телефона |
| `language` | string | Язык интерфейса (en, ru, zh) |
| `timezone` | string | Часовой пояс |

## Управление аккаунтом

### Изменение пароля

```http
POST /api/v1/user/change-password
```

```javascript
const result = await okdFinance.changePassword({
  currentPassword: "old-password",
  newPassword: "new-secure-password"
});
```

### Изменение email

```http
POST /api/v1/user/change-email
```

```javascript
const result = await okdFinance.changeEmail({
  newEmail: "newemail@example.com",
  password: "current-password"
});
```

## Двухфакторная аутентификация (2FA)

### Включение 2FA

```http
POST /api/v1/user/2fa/enable
```

```javascript
// Получение QR кода для настройки
const qrCode = await okdFinance.generate2FAQRCode();

// Подтверждение настройки 2FA
const result = await okdFinance.enable2FA({
  token: "123456" // код из приложения аутентификатора
});
```

### Отключение 2FA

```http
POST /api/v1/user/2fa/disable
```

```javascript
const result = await okdFinance.disable2FA({
  token: "123456",
  password: "current-password"
});
```

### Проверка 2FA токена

```http
POST /api/v1/user/2fa/verify
```

```javascript
const isValid = await okdFinance.verify2FAToken({
  token: "123456"
});
```

## Верификация пользователя

### Статус верификации

```http
GET /api/v1/user/verification/status
```

```javascript
const verificationStatus = await okdFinance.getVerificationStatus();
console.log(verificationStatus);
```

**Ответ:**
```json
{
  "level": "basic",
  "status": "verified",
  "documents": {
    "identity": {
      "status": "approved",
      "submittedAt": "2024-01-15T10:00:00Z",
      "approvedAt": "2024-01-16T14:30:00Z"
    },
    "address": {
      "status": "pending",
      "submittedAt": "2024-01-20T09:00:00Z"
    }
  },
  "limits": {
    "dailyWithdrawal": "100 BTC",
    "monthlyWithdrawal": "1000 BTC"
  }
}
```

### Загрузка документов

```http
POST /api/v1/user/verification/documents
```

```javascript
const uploadResult = await okdFinance.uploadVerificationDocument({
  type: "identity", // "identity", "address", "selfie"
  file: documentFile,
  documentType: "passport" // "passport", "id_card", "driver_license"
});
```

## Настройки безопасности

### Получение настроек безопасности

```http
GET /api/v1/user/security/settings
```

```javascript
const securitySettings = await okdFinance.getSecuritySettings();
```

**Ответ:**
```json
{
  "twoFactorEnabled": true,
  "emailNotifications": true,
  "smsNotifications": false,
  "loginNotifications": true,
  "withdrawalNotifications": true,
  "ipWhitelist": ["192.168.1.1", "10.0.0.1"],
  "apiKeyRestrictions": {
    "trading": true,
    "withdrawal": false,
    "ipRestricted": true
  }
}
```

### Обновление настроек безопасности

```http
PUT /api/v1/user/security/settings
```

```javascript
const result = await okdFinance.updateSecuritySettings({
  emailNotifications: true,
  smsNotifications: true,
  loginNotifications: true,
  withdrawalNotifications: true
});
```

## IP Whitelist

### Получение списка разрешенных IP

```http
GET /api/v1/user/security/ip-whitelist
```

```javascript
const ipList = await okdFinance.getIPWhitelist();
```

### Добавление IP адреса

```http
POST /api/v1/user/security/ip-whitelist
```

```javascript
const result = await okdFinance.addIPToWhitelist({
  ipAddress: "192.168.1.100",
  label: "Home Office"
});
```

### Удаление IP адреса

```http
DELETE /api/v1/user/security/ip-whitelist/{ip}
```

```javascript
const result = await okdFinance.removeIPFromWhitelist("192.168.1.100");
```

## API ключи

### Получение списка API ключей

```http
GET /api/v1/user/api-keys
```

```javascript
const apiKeys = await okdFinance.getAPIKeys();
```

**Ответ:**
```json
[
  {
    "keyId": "key_123",
    "label": "Trading Bot",
    "permissions": ["trading", "read"],
    "ipRestrictions": ["192.168.1.1"],
    "createdAt": "2024-01-01T00:00:00Z",
    "lastUsedAt": "2024-12-20T10:00:00Z",
    "status": "active"
  }
]
```

### Создание API ключа

```http
POST /api/v1/user/api-keys
```

```javascript
const newApiKey = await okdFinance.createAPIKey({
  label: "My Trading Bot",
  permissions: ["trading", "read"],
  ipRestrictions: ["192.168.1.1", "10.0.0.1"],
  withdrawalEnabled: false
});
```

### Удаление API ключа

```http
DELETE /api/v1/user/api-keys/{keyId}
```

```javascript
const result = await okdFinance.deleteAPIKey("key_123");
```

## История активности

### Получение истории входов

```http
GET /api/v1/user/activity/logins
```

```javascript
const loginHistory = await okdFinance.getLoginHistory({
  limit: 50,
  startTime: Date.now() - 86400000 * 30 // последние 30 дней
});
```

### Получение истории API активности

```http
GET /api/v1/user/activity/api
```

```javascript
const apiActivity = await okdFinance.getAPIActivity({
  keyId: "key_123",
  limit: 100
});
```

## Уведомления

### Получение настроек уведомлений

```http
GET /api/v1/user/notifications/settings
```

```javascript
const notificationSettings = await okdFinance.getNotificationSettings();
```

### Обновление настроек уведомлений

```http
PUT /api/v1/user/notifications/settings
```

```javascript
const result = await okdFinance.updateNotificationSettings({
  email: {
    login: true,
    trading: true,
    withdrawal: true,
    deposit: false
  },
  sms: {
    withdrawal: true,
    login: false
  },
  push: {
    priceAlerts: true,
    orderFills: true
  }
});
```

### Получение истории уведомлений

```http
GET /api/v1/user/notifications/history
```

```javascript
const notifications = await okdFinance.getNotificationHistory({
  type: "email", // "email", "sms", "push"
  limit: 50
});
```

## Предпочтения пользователя

### Торговые настройки

```http
GET /api/v1/user/preferences/trading
```

```javascript
const tradingPrefs = await okdFinance.getTradingPreferences();
```

**Ответ:**
```json
{
  "defaultOrderType": "limit",
  "defaultTimeInForce": "GTC",
  "confirmationRequired": true,
  "autoStopLoss": false,
  "defaultStopLossPercent": 5.0,
  "autoTakeProfit": false,
  "defaultTakeProfitPercent": 10.0
}
```

### Обновление торговых настроек

```http
PUT /api/v1/user/preferences/trading
```

```javascript
const result = await okdFinance.updateTradingPreferences({
  defaultOrderType: "market",
  confirmationRequired: false,
  autoStopLoss: true,
  defaultStopLossPercent: 3.0
});
```

## Ошибки API

### Коды ошибок

| Код | Описание |
|-----|----------|
| 400 | Неверные параметры запроса |
| 401 | Не авторизован |
| 403 | Доступ запрещен |
| 404 | Пользователь не найден |
| 409 | Конфликт (например, email уже используется) |
| 429 | Превышен лимит запросов |
| 500 | Внутренняя ошибка сервера |

### Пример обработки ошибок

```javascript
try {
  const profile = await okdFinance.getUserProfile();
} catch (error) {
  if (error.code === 401) {
    console.log('Требуется повторная аутентификация');
  } else if (error.code === 429) {
    console.log('Превышен лимит запросов, повторите позже');
  } else {
    console.log('Ошибка:', error.message);
  }
}
```
