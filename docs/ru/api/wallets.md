# API кошельков

Полное API для управления кошельками и балансами в системе OKD Finance.

## Базовые операции

### Получение балансов

```http
GET /api/v1/wallet/balances
```

```javascript
const balances = await okdFinance.getWalletBalances();
console.log(balances);
```

**Ответ:**
```json
{
  "spot": {
    "BTC": {
      "available": "0.5",
      "locked": "0.1",
      "total": "0.6"
    },
    "ETH": {
      "available": "10.0",
      "locked": "2.0",
      "total": "12.0"
    },
    "USDT": {
      "available": "1000.0",
      "locked": "200.0",
      "total": "1200.0"
    }
  },
  "futures": {
    "USDT": {
      "available": "500.0",
      "locked": "100.0",
      "total": "600.0"
    }
  },
  "savings": {
    "BTC": {
      "available": "0.1",
      "locked": "0.0",
      "total": "0.1",
      "yield": "0.00001"
    }
  }
}
```

### Получение баланса конкретного актива

```http
GET /api/v1/wallet/balance/{asset}
```

```javascript
const btcBalance = await okdFinance.getAssetBalance('BTC');
console.log(btcBalance);
```

**Параметры:**
| Параметр | Тип | Описание |
|----------|-----|----------|
| `asset` | string | Символ актива (BTC, ETH, USDT) |
| `walletType` | string | Тип кошелька: spot, futures, savings |

## Переводы между кошельками

### Внутренний перевод

```http
POST /api/v1/wallet/transfer
```

```javascript
const transfer = await okdFinance.transferBetweenWallets({
  asset: 'USDT',
  amount: '100.0',
  fromWallet: 'spot',
  toWallet: 'futures'
});
```

**Параметры запроса:**
```json
{
  "asset": "USDT",
  "amount": "100.0",
  "fromWallet": "spot",
  "toWallet": "futures",
  "clientTransferId": "transfer_123" // опционально
}
```

**Ответ:**
```json
{
  "transferId": "12345",
  "clientTransferId": "transfer_123",
  "asset": "USDT",
  "amount": "100.0",
  "fromWallet": "spot",
  "toWallet": "futures",
  "status": "completed",
  "timestamp": "2024-12-20T10:30:00Z",
  "fee": "0.0"
}
```

### Получение истории переводов

```http
GET /api/v1/wallet/transfers
```

```javascript
const transfers = await okdFinance.getTransferHistory({
  asset: 'USDT',
  startTime: Date.now() - 86400000, // последние 24 часа
  limit: 50
});
```

**Параметры запроса:**
| Параметр | Тип | Описание |
|----------|-----|----------|
| `asset` | string | Фильтр по активу |
| `fromWallet` | string | Фильтр по исходному кошельку |
| `toWallet` | string | Фильтр по целевому кошельку |
| `startTime` | number | Начальное время (timestamp) |
| `endTime` | number | Конечное время (timestamp) |
| `limit` | number | Количество записей (макс. 1000) |

## Депозиты

### Получение адреса для депозита

```http
GET /api/v1/wallet/deposit/address
```

```javascript
const depositAddress = await okdFinance.getDepositAddress({
  asset: 'BTC',
  network: 'BTC' // опционально
});
```

**Ответ:**
```json
{
  "asset": "BTC",
  "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  "tag": null,
  "network": "BTC",
  "addressType": "bech32",
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

### История депозитов

```http
GET /api/v1/wallet/deposits
```

```javascript
const deposits = await okdFinance.getDepositHistory({
  asset: 'BTC',
  status: 'completed',
  limit: 50
});
```

**Ответ:**
```json
[
  {
    "depositId": "dep_12345",
    "asset": "BTC",
    "amount": "0.001",
    "network": "BTC",
    "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    "txHash": "a1b2c3d4e5f6...",
    "status": "completed",
    "confirmations": 6,
    "requiredConfirmations": 1,
    "fee": "0.0",
    "createdAt": "2024-12-20T10:00:00Z",
    "completedAt": "2024-12-20T10:15:00Z"
  }
]
```

### Статусы депозитов

| Статус | Описание |
|--------|----------|
| `pending` | Ожидает подтверждений |
| `confirming` | Набирает подтверждения |
| `completed` | Зачислен на баланс |
| `failed` | Ошибка депозита |

## Выводы

### Создание запроса на вывод

```http
POST /api/v1/wallet/withdraw
```

```javascript
const withdrawal = await okdFinance.createWithdrawal({
  asset: 'BTC',
  amount: '0.1',
  address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  network: 'BTC',
  tag: null, // для активов, требующих memo/tag
  clientWithdrawId: 'withdraw_123' // опционально
});
```

**Параметры запроса:**
```json
{
  "asset": "BTC",
  "amount": "0.1",
  "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  "network": "BTC",
  "tag": null,
  "clientWithdrawId": "withdraw_123",
  "walletType": "spot"
}
```

**Ответ:**
```json
{
  "withdrawId": "wd_12345",
  "clientWithdrawId": "withdraw_123",
  "asset": "BTC",
  "amount": "0.1",
  "fee": "0.0005",
  "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  "network": "BTC",
  "status": "pending",
  "createdAt": "2024-12-20T10:30:00Z"
}
```

### История выводов

```http
GET /api/v1/wallet/withdrawals
```

```javascript
const withdrawals = await okdFinance.getWithdrawalHistory({
  asset: 'BTC',
  status: 'completed',
  limit: 50
});
```

### Отмена вывода

```http
DELETE /api/v1/wallet/withdraw/{withdrawId}
```

```javascript
const result = await okdFinance.cancelWithdrawal('wd_12345');
```

**Примечание:** Отменить можно только выводы в статусе `pending`.

## Комиссии

### Получение комиссий за вывод

```http
GET /api/v1/wallet/withdraw/fees
```

```javascript
const fees = await okdFinance.getWithdrawalFees();
console.log(fees);
```

**Ответ:**
```json
{
  "BTC": {
    "BTC": "0.0005",
    "Lightning": "0.000001"
  },
  "ETH": {
    "Ethereum": "0.005",
    "BSC": "0.001",
    "Polygon": "0.001"
  },
  "USDT": {
    "Ethereum": "25.0",
    "BSC": "1.0",
    "Tron": "1.0"
  }
}
```

### Расчет комиссии для конкретного вывода

```http
GET /api/v1/wallet/withdraw/fee
```

```javascript
const fee = await okdFinance.calculateWithdrawalFee({
  asset: 'BTC',
  amount: '0.1',
  network: 'BTC'
});
```

## Лимиты

### Получение лимитов

```http
GET /api/v1/wallet/limits
```

```javascript
const limits = await okdFinance.getWalletLimits();
console.log(limits);
```

**Ответ:**
```json
{
  "withdrawal": {
    "daily": {
      "BTC": "100.0",
      "ETH": "1000.0",
      "USDT": "1000000.0"
    },
    "monthly": {
      "BTC": "1000.0",
      "ETH": "10000.0",
      "USDT": "10000000.0"
    }
  },
  "deposit": {
    "minimum": {
      "BTC": "0.0001",
      "ETH": "0.01",
      "USDT": "10.0"
    }
  },
  "transfer": {
    "minimum": {
      "BTC": "0.00001",
      "ETH": "0.001",
      "USDT": "1.0"
    }
  }
}
```

### Текущее использование лимитов

```http
GET /api/v1/wallet/limits/usage
```

```javascript
const usage = await okdFinance.getLimitUsage();
console.log(usage);
```

## Стейкинг и доходность

### Доступные программы стейкинга

```http
GET /api/v1/wallet/staking/products
```

```javascript
const stakingProducts = await okdFinance.getStakingProducts();
console.log(stakingProducts);
```

**Ответ:**
```json
[
  {
    "productId": "BTC_FLEXIBLE",
    "asset": "BTC",
    "type": "flexible",
    "apy": "3.5",
    "minAmount": "0.001",
    "maxAmount": "100.0",
    "duration": null,
    "status": "active"
  },
  {
    "productId": "ETH_30D",
    "asset": "ETH",
    "type": "fixed",
    "apy": "12.0",
    "minAmount": "0.1",
    "maxAmount": "1000.0",
    "duration": 30,
    "status": "active"
  }
]
```

### Создание стейкинга

```http
POST /api/v1/wallet/staking/stake
```

```javascript
const staking = await okdFinance.createStaking({
  productId: 'BTC_FLEXIBLE',
  amount: '0.1'
});
```

### Погашение стейкинга

```http
POST /api/v1/wallet/staking/redeem
```

```javascript
const redemption = await okdFinance.redeemStaking({
  stakingId: 'stake_12345',
  amount: '0.05' // частичное погашение
});
```

### История стейкинга

```http
GET /api/v1/wallet/staking/history
```

```javascript
const stakingHistory = await okdFinance.getStakingHistory({
  asset: 'BTC',
  type: 'flexible',
  limit: 50
});
```

## Автоматические операции

### Настройка автоматических переводов

```http
POST /api/v1/wallet/auto-transfer
```

```javascript
const autoTransfer = await okdFinance.setAutoTransfer({
  fromWallet: 'spot',
  toWallet: 'savings',
  asset: 'USDT',
  threshold: '1000.0', // перевести когда баланс > 1000 USDT
  amount: '500.0', // перевести 500 USDT
  enabled: true
});
```

### Получение настроек автоматических переводов

```http
GET /api/v1/wallet/auto-transfer
```

```javascript
const autoTransfers = await okdFinance.getAutoTransfers();
```

### Отключение автоматического перевода

```http
DELETE /api/v1/wallet/auto-transfer/{transferId}
```

```javascript
const result = await okdFinance.disableAutoTransfer('auto_123');
```

## Конвертация активов

### Получение курсов конвертации

```http
GET /api/v1/wallet/convert/quote
```

```javascript
const quote = await okdFinance.getConvertQuote({
  fromAsset: 'BTC',
  toAsset: 'ETH',
  amount: '0.1'
});
```

**Ответ:**
```json
{
  "quoteId": "quote_12345",
  "fromAsset": "BTC",
  "toAsset": "ETH",
  "fromAmount": "0.1",
  "toAmount": "1.5",
  "rate": "15.0",
  "fee": "0.001",
  "validUntil": "2024-12-20T10:35:00Z"
}
```

### Выполнение конвертации

```http
POST /api/v1/wallet/convert
```

```javascript
const conversion = await okdFinance.executeConvert({
  quoteId: 'quote_12345'
});
```

### История конвертаций

```http
GET /api/v1/wallet/convert/history
```

```javascript
const conversions = await okdFinance.getConvertHistory({
  fromAsset: 'BTC',
  toAsset: 'ETH',
  limit: 50
});
```

## Уведомления и webhook'и

### Настройка webhook для кошелька

```http
POST /api/v1/wallet/webhook
```

```javascript
const webhook = await okdFinance.setWalletWebhook({
  url: 'https://your-server.com/wallet-webhook',
  events: [
    'deposit.confirmed',
    'withdrawal.completed',
    'transfer.completed',
    'balance.changed'
  ],
  secret: 'webhook-secret-key'
});
```

### Тестирование webhook

```http
POST /api/v1/wallet/webhook/test
```

```javascript
const testResult = await okdFinance.testWalletWebhook('webhook_123');
```

## Отчеты и аналитика

### Генерация отчета по кошельку

```http
POST /api/v1/wallet/report
```

```javascript
const report = await okdFinance.generateWalletReport({
  period: '1M', // 1 месяц
  format: 'pdf', // 'pdf', 'csv', 'json'
  includeTransactions: true,
  includeStaking: true,
  email: 'user@example.com' // отправить на email
});
```

### Статистика портфолио

```http
GET /api/v1/wallet/portfolio/stats
```

```javascript
const portfolioStats = await okdFinance.getPortfolioStats();
console.log(portfolioStats);
```

**Ответ:**
```json
{
  "totalValue": {
    "USD": "15000.50",
    "BTC": "0.3"
  },
  "totalPnL": {
    "USD": "2500.25",
    "percentage": "20.0"
  },
  "assetAllocation": [
    {
      "asset": "BTC",
      "amount": "0.5",
      "value": "22500.00",
      "percentage": "75.0"
    },
    {
      "asset": "ETH",
      "amount": "10.0",
      "value": "30000.00",
      "percentage": "20.0"
    }
  ],
  "performance": {
    "1d": "2.5",
    "7d": "15.2",
    "30d": "45.8",
    "1y": "120.5"
  }
}
```

## Безопасность

### Заморозка кошелька

```http
POST /api/v1/wallet/freeze
```

```javascript
const result = await okdFinance.freezeWallet({
  walletType: 'spot', // или 'all'
  reason: 'security_concern'
});
```

### Разморозка кошелька

```http
POST /api/v1/wallet/unfreeze
```

```javascript
const result = await okdFinance.unfreezeWallet({
  walletType: 'spot',
  twoFactorCode: '123456'
});
```

### Аудит операций

```http
GET /api/v1/wallet/audit
```

```javascript
const auditLog = await okdFinance.getWalletAudit({
  startTime: Date.now() - 86400000 * 7, // последние 7 дней
  limit: 100
});
```

## Коды ошибок

| Код | Описание |
|-----|----------|
| 1001 | Недостаточно средств |
| 1002 | Неверный адрес |
| 1003 | Актив не поддерживается |
| 1004 | Превышен лимит вывода |
| 1005 | Кошелек заморожен |
| 1006 | Неверная сеть |
| 1007 | Минимальная сумма не достигнута |
| 1008 | Максимальная сумма превышена |
| 1009 | Адрес в черном списке |
| 1010 | Требуется верификация |

### Пример обработки ошибок

```javascript
try {
  const withdrawal = await okdFinance.createWithdrawal({
    asset: 'BTC',
    amount: '0.1',
    address: 'invalid-address'
  });
} catch (error) {
  switch (error.code) {
    case 1001:
      console.log('Недостаточно средств для вывода');
      break;
    case 1002:
      console.log('Неверный адрес для вывода');
      break;
    case 1004:
      console.log('Превышен дневной лимит вывода');
      break;
    default:
      console.log('Ошибка:', error.message);
  }
}
```
