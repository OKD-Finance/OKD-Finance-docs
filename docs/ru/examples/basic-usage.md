# Базовое использование API

Этот раздел содержит практические примеры использования API OKD Finance для основных операций.

## Быстрый старт

### Установка зависимостей

#### JavaScript/Node.js
```bash
npm install axios dotenv
``` -->

#### Python
```bash
pip install requests python-dotenv
``` -->

### Настройка окружения

Создайте файл `.env`:
```env
OKD_API_BASE_URL=https://develop.okd.finance/api
FIREBASE_TOKEN=your-firebase-token
FIREBASE_UID=your-firebase-uid
DEVICE_FINGERPRINT=your-device-id
RECAPTCHA_TOKEN=your-recaptcha-token
PLATFORM_ID=your-platform-id
``` -->

## Аутентификация

### JavaScript
```javascript
const axios = require('axios');
require('dotenv').config();

class OKDClient {
  constructor() {
    this.baseURL = process.env.OKD_API_BASE_URL;
    this.accessToken = null;
    this.refreshToken = null;
  }

  async authenticateWithFirebase() {
    try {
      const response = await axios.post(`${this.baseURL}/auth/check/firebase`, {
        token: process.env.FIREBASE_TOKEN,
        uid: process.env.FIREBASE_UID
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Fingerprint': process.env.DEVICE_FINGERPRINT,
          'X-RECAPTCHA': process.env.RECAPTCHA_TOKEN,
          'X-PLATFORM-ID': process.env.PLATFORM_ID
        }
      });

      this.accessToken = response.data.acc_token;
      this.refreshToken = response.data.refresh_token;
      
      console.log('Аутентификация успешна');
      return response.data;
    } catch (error) {
      console.error('Ошибка аутентификации:', error.response?.data || error.message);
      throw error;
    }
  }

  getAuthHeaders() {
    return {
      'Authorization': `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
      'Fingerprint': process.env.DEVICE_FINGERPRINT
    };
  }
}
``` -->

### Python
```python
import os
import requests
from dotenv import load_dotenv

load_dotenv()

class OKDClient:
    def __init__(self):
        self.base_url = os.getenv('OKD_API_BASE_URL')
        self.access_token = None
        self.refresh_token = None

    def authenticate_with_firebase(self):
        url = f"{self.base_url}/auth/check/firebase"
        
        headers = {
            'Content-Type': 'application/json',
            'Fingerprint': os.getenv('DEVICE_FINGERPRINT'),
            'X-RECAPTCHA': os.getenv('RECAPTCHA_TOKEN'),
            'X-PLATFORM-ID': os.getenv('PLATFORM_ID')
        }
        
        data = {
            'token': os.getenv('FIREBASE_TOKEN'),
            'uid': os.getenv('FIREBASE_UID')
        }
        
        response = requests.post(url, json=data, headers=headers)
        response.raise_for_status()
        
        result = response.json()
        self.access_token = result['acc_token']
        self.refresh_token = result['refresh_token']
        
        return result

    def get_auth_headers(self):
        return {
            'Authorization': f'Bearer {self.access_token}',
            'Content-Type': 'application/json',
            'Fingerprint': os.getenv('DEVICE_FINGERPRINT')
        }
``` -->

## Торговые операции

### Создание ордера

#### JavaScript
```javascript
async function createOrder(symbol, side, type, quantity, price = null) {
  const orderData = {
    symbol: symbol,
    side: side,
    type: type,
    quantity: quantity
  };
  
  if (price && type === 'limit') {
    orderData.price = price;
  }
  
  const response = await axios.post(`${client.baseURL}/trading/order`, orderData, {
    headers: client.getAuthHeaders()
  });
  
  return response.data;
}

// Пример использования
const order = await createOrder('BTCUSDT', 'buy', 'limit', 0.001, 45000);
``` -->

#### Python
```python
def create_order(client, symbol, side, order_type, quantity, price=None):
    url = f"{client.base_url}/trading/order"
    
    data = {
        'symbol': symbol,
        'side': side,
        'type': order_type,
        'quantity': quantity
    }
    
    if price and order_type == 'limit':
        data['price'] = price
    
    response = requests.post(url, json=data, headers=client.get_auth_headers())
    response.raise_for_status()
    
    return response.json()
``` -->

## Управление кошельками

### Получение баланса

#### JavaScript
```javascript
async function getWalletBalance() {
  const response = await axios.get(`${client.baseURL}/wallet/balance`, {
    headers: client.getAuthHeaders()
  });
  
  return response.data;
}
``` -->

### Создание депозитного адреса

#### JavaScript
```javascript
async function createDepositAddress(currency, network) {
  const response = await axios.post(`${client.baseURL}/wallet/deposit/address`, {
    currency: currency,
    network: network
  }, {
    headers: client.getAuthHeaders()
  });
  
  return response.data;
}
``` -->

## Интеграция с Bybit

### Получение консолидированного баланса

#### JavaScript
```javascript
async function getConsolidatedBalance() {
  const response = await axios.get(`${client.baseURL}/wallet/balance/consolidated`, {
    headers: client.getAuthHeaders()
  });
  
  return response.data;
}
``` -->

## Рыночные данные

### Получение тикера

#### JavaScript
```javascript
async function getTicker(symbol) {
  const response = await axios.get(`${client.baseURL}/market/ticker`, {
    params: { symbol: symbol }
  });
  
  return response.data;
}
``` -->

## Обработка ошибок

### JavaScript
```javascript
function handleAPIError(error) {
  if (error.response) {
    const { status, data } = error.response;
    
    switch (status) {
      case 401:
        console.error('Не авторизован. Необходимо обновить токен');
        return client.refreshAccessToken();
      case 429:
        console.error('Превышен лимит запросов');
        break;
      default:
        console.error('API ошибка:', data);
    }
  }
  
  throw error;
}
``` -->

## Полный пример

### JavaScript
```javascript
const client = new OKDClient();

async function main() {
  try {
    // Аутентификация
    await client.authenticateWithFirebase();
    
    // Получение баланса
    const balance = await getWalletBalance();
    console.log('Баланс:', balance);
    
    // Получение тикера
    const ticker = await getTicker('BTCUSDT');
    console.log('Цена BTC:', ticker.price);
    
    // Создание ордера
    const order = await createOrder('BTCUSDT', 'buy', 'limit', 0.001, 45000);
    console.log('Ордер создан:', order);
    
  } catch (error) {
    handleAPIError(error);
  }
}

main();
``` -->

::: tip Совет
Всегда тестируйте код на демо-окружении перед использованием в продакшн.
:::

::: warning Внимание
Никогда не храните API ключи в коде. Используйте переменные окружения.
::: 