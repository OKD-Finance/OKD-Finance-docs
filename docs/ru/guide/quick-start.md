# Быстрый старт

Это руководство поможет вам быстро начать работу с API OKD Finance. За несколько минут вы сможете настроить аутентификацию, выполнить первый торговый запрос и получить рыночные данные.

## Шаг 1: Регистрация и получение доступа

### Создание аккаунта

1. **Зарегистрируйтесь на платформе:**
   - Перейдите на [OKD Finance](https://develop.okd.finance)
   - Нажмите "Регистрация"
   - Заполните форму регистрации

2. **Подтвердите email:**
   - Проверьте вашу почту
   - Нажмите на ссылку подтверждения

3. **Пройдите базовую верификацию:**
   - Загрузите документы для KYC
   - Дождитесь одобрения (обычно 1-2 часа)

### Настройка Firebase (если используется)

1. **Создайте проект Firebase:**
   - Перейдите в [Firebase Console](https://console.firebase.google.com)
   - Создайте новый проект
   - Включите Authentication

2. **Получите учетные данные:**
   - В настройках проекта найдите "Service Accounts"
   - Скачайте JSON файл с ключами

## Шаг 2: Установка и настройка

### Установка зависимостей

#### JavaScript/Node.js
```bash
mkdir okd-finance-example
cd okd-finance-example
npm init -y
npm install axios dotenv
```

#### Python
```bash
mkdir okd-finance-example
cd okd-finance-example
pip install requests python-dotenv
```

### Настройка переменных окружения

Создайте файл `.env`:
```bash
# API Configuration
OKD_API_BASE_URL=https://develop.okd.finance/api

# Firebase Configuration
FIREBASE_TOKEN=your-firebase-token
FIREBASE_UID=your-firebase-uid

# Device Information
DEVICE_FINGERPRINT=your-unique-device-id
RECAPTCHA_TOKEN=your-recaptcha-token
PLATFORM_ID=web
```

## Шаг 3: Первый запрос

### Аутентификация

#### JavaScript
```javascript
const axios = require('axios');
require('dotenv').config();

async function authenticate() {
  try {
    const response = await axios.post(
      `${process.env.OKD_API_BASE_URL}/auth/check/firebase`,
      {
        token: process.env.FIREBASE_TOKEN,
        uid: process.env.FIREBASE_UID
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Fingerprint': process.env.DEVICE_FINGERPRINT,
          'X-RECAPTCHA': process.env.RECAPTCHA_TOKEN,
          'X-PLATFORM-ID': process.env.PLATFORM_ID
        }
      }
    );

    console.log('✅ Аутентификация успешна!');
    console.log('Access Token:', response.data.acc_token.substring(0, 20) + '...');
    
    return {
      accessToken: response.data.acc_token,
      refreshToken: response.data.refresh_token
    };
  } catch (error) {
    console.error('❌ Ошибка аутентификации:', error.response?.data || error.message);
    throw error;
  }
}

// Запуск
authenticate().then(tokens => {
  console.log('Токены получены, можно начинать работу с API!');
});
```

#### Python
```python
import os
import requests
from dotenv import load_dotenv

load_dotenv()

def authenticate():
    url = f"{os.getenv('OKD_API_BASE_URL')}/auth/check/firebase"
    
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
    
    try:
        response = requests.post(url, json=data, headers=headers)
        response.raise_for_status()
        
        result = response.json()
        print('✅ Аутентификация успешна!')
        print(f'Access Token: {result["acc_token"][:20]}...')
        
        return {
            'access_token': result['acc_token'],
            'refresh_token': result['refresh_token']
        }
    except requests.exceptions.RequestException as e:
        print(f'❌ Ошибка аутентификации: {e}')
        raise

# Запуск
if __name__ == "__main__":
    tokens = authenticate()
    print('Токены получены, можно начинать работу с API!')
```

## Шаг 4: Базовые операции

### Получение баланса кошелька

#### JavaScript
```javascript
async function getBalance(accessToken) {
  try {
    const response = await axios.get(
      `${process.env.OKD_API_BASE_URL}/wallet/balance`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Fingerprint': process.env.DEVICE_FINGERPRINT
        }
      }
    );

    console.log('💰 Баланс кошелька:');
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('❌ Ошибка получения баланса:', error.response?.data || error.message);
    throw error;
  }
}
```

### Получение рыночных данных

#### JavaScript
```javascript
async function getMarketData() {
  try {
    const response = await axios.get(
      `${process.env.OKD_API_BASE_URL}/market/ticker`,
      {
        params: { symbol: 'BNBETH' }
      }
    );

    console.log('📊 Рыночные данные BTC/USDT:');
    console.log(`Цена: $${response.data.price}`);
    console.log(`24h изменение: ${response.data.change_24h}%`);
    console.log(`Объем: ${response.data.volume}`);
    
    return response.data;
  } catch (error) {
    console.error('❌ Ошибка получения рыночных данных:', error.response?.data || error.message);
    throw error;
  }
}
```

### Создание тестового ордера

#### JavaScript
```javascript
async function createTestOrder(accessToken) {
  try {
    const response = await axios.post(
      `${process.env.OKD_API_BASE_URL}/trading/order`,
      {
        symbol: 'BNBETH',
        side: 'buy',
        type: 'limit',
        quantity: 0.001,
        price: 40000,
        test_only: true // Тестовый ордер
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Fingerprint': process.env.DEVICE_FINGERPRINT
        }
      }
    );

    console.log('📝 Тестовый ордер создан:');
    console.log(`Order ID: ${response.data.order_id}`);
    console.log(`Статус: ${response.data.status}`);
    
    return response.data;
  } catch (error) {
    console.error('❌ Ошибка создания ордера:', error.response?.data || error.message);
    throw error;
  }
}
```

## Шаг 5: Полный пример

### JavaScript - Полное приложение
```javascript
const axios = require('axios');
require('dotenv').config();

class OKDQuickStart {
  constructor() {
    this.baseURL = process.env.OKD_API_BASE_URL;
    this.accessToken = null;
  }

  async authenticate() {
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
    console.log('✅ Аутентификация успешна');
    return response.data;
  }

  getAuthHeaders() {
    return {
      'Authorization': `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
      'Fingerprint': process.env.DEVICE_FINGERPRINT
    };
  }

  async getBalance() {
    const response = await axios.get(`${this.baseURL}/wallet/balance`, {
      headers: this.getAuthHeaders()
    });
    return response.data;
  }

  async getMarketData(symbol = 'BNBETH') {
    const response = await axios.get(`${this.baseURL}/market/ticker`, {
      params: { symbol }
    });
    return response.data;
  }

  async createTestOrder(symbol, side, type, quantity, price) {
    const response = await axios.post(`${this.baseURL}/trading/order`, {
      symbol,
      side,
      type,
      quantity,
      price,
      test_only: true
    }, {
      headers: this.getAuthHeaders()
    });
    return response.data;
  }

  async run() {
    try {
      console.log('🚀 Запуск OKD Finance Quick Start...\n');

      // 1. Аутентификация
      await this.authenticate();

      // 2. Получение баланса
      console.log('💰 Получение баланса...');
      const balance = await this.getBalance();
      console.log('Баланс:', balance);

      // 3. Рыночные данные
      console.log('\n📊 Получение рыночных данных...');
      const ticker = await this.getMarketData('BNBETH');
      console.log(`BTC/USDT: $${ticker.price}`);

      // 4. Тестовый ордер
      console.log('\n📝 Создание тестового ордера...');
      const order = await this.createTestOrder('BNBETH', 'buy', 'limit', 0.001, 40000);
      console.log('Ордер создан:', order.order_id);

      console.log('\n✅ Все операции выполнены успешно!');
      console.log('Теперь вы готовы к работе с OKD Finance API.');

    } catch (error) {
      console.error('❌ Ошибка:', error.response?.data || error.message);
    }
  }
}

// Запуск приложения
const app = new OKDQuickStart();
app.run();
```

## Шаг 6: Следующие шаги

### Изучите документацию

1. **[Полная документация API](/ru/api/overview)** - Все доступные endpoints
2. **[Торговые операции](/ru/trading/overview)** - Продвинутые торговые функции
3. **[Интеграция Bybit](/ru/bybit/overview)** - Использование ликвидности Bybit
4. **[Примеры кода](/ru/examples/basic-usage)** - Больше практических примеров

### Настройка для продакшн

1. **Смените URL на продакшн:**
   ```bash
   OKD_API_BASE_URL=https://develop.okd.finance/api
   ```

2. **Получите реальные API ключи:**
   - Войдите в панель управления
   - Создайте API ключи для продакшн
   - Настройте разрешения

3. **Реализуйте обработку ошибок:**
   - Retry логика
   - Логирование
   - Мониторинг

### Безопасность

1. **Никогда не храните ключи в коде**
2. **Используйте HTTPS для всех запросов**
3. **Регулярно обновляйте токены**
4. **Мониторьте подозрительную активность**

## Помощь и поддержка

### Если что-то не работает

1. **Проверьте переменные окружения**
2. **Убедитесь в правильности токенов**
3. **Проверьте статус сервисов:** https://status.okd.finance

### Контакты

- **Техническая поддержка:** support@okd.finance
- **Документация:** https://docs.okd.finance
- **Telegram:** @okd_support
- **Discord:** OKD Finance Community

### Полезные ссылки

- **Swagger UI:** https://develop.okd.finance/swagger/gateway/
- **Postman Collection:** [Скачать](./postman/OKD-Finance-API.postman_collection.json)
- **GitHub Examples:** https://github.com/OKD-Finance/api-examples

::: tip Поздравляем! 🎉
Вы успешно настроили и протестировали OKD Finance API. Теперь вы готовы создавать полноценные торговые приложения!
:::

::: warning Важно
Всегда тестируйте на демо-окружении перед переходом на продакшн. Реальные деньги требуют особой осторожности!
::: 