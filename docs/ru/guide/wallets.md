# Кошельки

OKD Finance предоставляет безопасную систему управления кошельками для хранения и управления криптовалютными активами.

## Типы кошельков

### Спотовый кошелек
- Для торговли спотовыми активами
- Мгновенные переводы между кошельками
- Поддержка всех основных криптовалют

### Фьючерсный кошелек
- Для торговли фьючерсными контрактами
- Изолированная маржа и кросс-маржа
- Автоматическое управление залогом

### Сберегательный кошелек
- Для получения пассивного дохода
- Стейкинг и lending программы
- Гибкие и фиксированные депозиты

## Поддерживаемые активы

### Основные криптовалюты
- **Bitcoin (BTC)** - основная резервная валюта
- **Ethereum (ETH)** - для DeFi операций
- **USDT/USDC** - стабильные монеты для торговли
- **BNB** - для сниженных комиссий

### Альткоины
- Более 200 поддерживаемых токенов
- Регулярное добавление новых активов
- Поддержка ERC-20, BEP-20, TRC-20

## Операции с кошельком

### Просмотр баланса

```javascript
const balance = await okdFinance.getWalletBalance();
console.log(balance);

// Результат:
{
  "spot": {
    "BTC": "0.5",
    "ETH": "10.0",
    "USDT": "1000.0"
  },
  "futures": {
    "USDT": "500.0"
  },
  "savings": {
    "BTC": "0.1",
    "ETH": "2.0"
  }
}
``` -->

### Перевод между кошельками

```javascript
const transfer = await okdFinance.transferBetweenWallets({
  asset: 'USDT',
  amount: 100,
  fromWallet: 'spot',
  toWallet: 'futures'
});
``` -->

### История операций

```javascript
const history = await okdFinance.getWalletHistory({
  asset: 'BTC',
  type: 'all', // 'deposit', 'withdraw', 'transfer'
  limit: 50,
  startTime: Date.now() - 86400000 // последние 24 часа
});
``` -->

## Депозиты

### Получение адреса для депозита

```javascript
const depositAddress = await okdFinance.getDepositAddress('BTC');
console.log(depositAddress);

// Результат:
{
  "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  "tag": null,
  "network": "BTC"
}
``` -->

### Поддерживаемые сети

| Актив | Сети | Минимальный депозит |
|-------|------|-------------------|
| BTC | Bitcoin | 0.0001 BTC |
| ETH | Ethereum | 0.01 ETH |
| USDT | Ethereum, BSC, Tron | 10 USDT |
| USDC | Ethereum, BSC | 10 USDC |

### Подтверждения

- **Bitcoin**: 1 подтверждение
- **Ethereum**: 12 подтверждений
- **BSC**: 15 подтверждений
- **Tron**: 19 подтверждений

## Выводы

### Создание запроса на вывод

```javascript
const withdrawal = await okdFinance.createWithdrawal({
  asset: 'BTC',
  amount: 0.1,
  address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  network: 'BTC',
  tag: null // для активов, требующих memo/tag
});
``` -->

### Комиссии за вывод

| Актив | Сеть | Комиссия |
|-------|------|----------|
| BTC | Bitcoin | 0.0005 BTC |
| ETH | Ethereum | 0.005 ETH |
| USDT | Ethereum | 25 USDT |
| USDT | BSC | 1 USDT |
| USDT | Tron | 1 USDT |

### Лимиты вывода

- **Неверифицированные пользователи**: 2 BTC в день
- **Базовая верификация**: 100 BTC в день
- **Расширенная верификация**: без лимитов

## Безопасность кошелька

### Двухфакторная аутентификация (2FA)
```javascript
// Включение 2FA для операций с кошельком
const enable2FA = await okdFinance.enable2FA({
  type: 'withdrawal',
  secret: 'your-2fa-secret'
});
``` -->

### Whitelist адресов
```javascript
// Добавление адреса в whitelist
const addToWhitelist = await okdFinance.addWithdrawalAddress({
  asset: 'BTC',
  address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  label: 'My Hardware Wallet'
});
``` -->

### Уведомления
- Email уведомления для всех операций
- SMS для крупных выводов
- Push-уведомления в мобильном приложении

## API для разработчиков

### Webhook уведомления

```javascript
// Настройка webhook для депозитов
const webhook = await okdFinance.setWebhook({
  url: 'https://your-server.com/webhook',
  events: ['deposit.confirmed', 'withdrawal.completed']
});
``` -->

### Автоматические переводы

```javascript
// Автоматический перевод при достижении баланса
const autoTransfer = await okdFinance.setAutoTransfer({
  fromWallet: 'spot',
  toWallet: 'savings',
  asset: 'USDT',
  threshold: 1000, // перевести когда баланс > 1000 USDT
  amount: 500 // перевести 500 USDT
});
``` -->

## Стейкинг и доходность

### Гибкий стейкинг

```javascript
const flexibleStaking = await okdFinance.stake({
  asset: 'ETH',
  amount: 1.0,
  type: 'flexible',
  apy: 5.2 // текущая доходность
});
``` -->

### Фиксированный стейкинг

```javascript
const fixedStaking = await okdFinance.stake({
  asset: 'BTC',
  amount: 0.1,
  type: 'fixed',
  duration: 30, // дней
  apy: 8.5
});
``` -->

### Доходность по активам

| Актив | Гибкий стейкинг | Фиксированный (30 дней) |
|-------|----------------|------------------------|
| BTC | 3.5% | 8.5% |
| ETH | 5.2% | 12.0% |
| USDT | 8.0% | 15.0% |
| BNB | 6.5% | 18.0% |

## Мониторинг и аналитика

### Портфолио

```javascript
const portfolio = await okdFinance.getPortfolioSummary();
console.log(portfolio);

// Результат:
{
  "totalValue": 15000.50, // USD
  "totalPnL": 2500.25,
  "pnlPercentage": 20.0,
  "assets": [
    {
      "asset": "BTC",
      "amount": "0.5",
      "value": 22500.00,
      "percentage": 75.0
    }
  ]
}
``` -->

### Отчеты

```javascript
const report = await okdFinance.generateWalletReport({
  period: '1M', // 1 месяц
  format: 'pdf',
  includeTransactions: true
});
``` -->
