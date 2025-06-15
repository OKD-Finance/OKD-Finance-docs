# Управление портфолио

API для управления торговым портфолио, анализа позиций и отслеживания производительности.

## Обзор портфолио

### Получение общей информации о портфолио

```http
GET /api/v1/portfolio/overview
``` -->

```javascript
const portfolio = await okdFinance.getPortfolioOverview();
console.log(portfolio);
``` -->

**Ответ:**
```json
{
  "totalValue": {
    "USD": "125000.50",
    "BTC": "2.5"
  },
  "totalPnL": {
    "USD": "15000.25",
    "percentage": "13.6"
  },
  "dayPnL": {
    "USD": "1250.75",
    "percentage": "1.02"
  },
  "allocation": {
    "spot": {
      "value": "75000.00",
      "percentage": "60.0"
    },
    "futures": {
      "value": "35000.50",
      "percentage": "28.0"
    },
    "savings": {
      "value": "15000.00",
      "percentage": "12.0"
    }
  },
  "topAssets": [
    {
      "asset": "BTC",
      "value": "50000.00",
      "percentage": "40.0",
      "pnl": "5000.00"
    },
    {
      "asset": "ETH",
      "value": "30000.00",
      "percentage": "24.0",
      "pnl": "3000.00"
    }
  ],
  "lastUpdated": "2024-12-20T10:30:00Z"
}
``` -->

### Детальная информация по активам

```http
GET /api/v1/portfolio/assets
``` -->

```javascript
const assets = await okdFinance.getPortfolioAssets({
  includeZeroBalances: false,
  sortBy: 'value', // 'value', 'pnl', 'percentage'
  sortOrder: 'desc'
});
``` -->

**Ответ:**
```json
[
  {
    "asset": "BTC",
    "totalBalance": "1.25",
    "allocation": {
      "spot": "0.75",
      "futures": "0.35",
      "savings": "0.15"
    },
    "averagePrice": "38000.00",
    "currentPrice": "45000.00",
    "totalValue": "56250.00",
    "unrealizedPnL": "8750.00",
    "realizedPnL": "2500.00",
    "totalPnL": "11250.00",
    "pnlPercentage": "25.0",
    "dayChange": {
      "value": "1125.00",
      "percentage": "2.04"
    },
    "positions": [
      {
        "type": "spot",
        "quantity": "0.75",
        "value": "33750.00"
      },
      {
        "type": "futures",
        "quantity": "0.35",
        "value": "15750.00",
        "leverage": "10x",
        "margin": "1575.00"
      }
    ]
  }
]
``` -->

## Анализ производительности

### Исторические данные портфолио

```http
GET /api/v1/portfolio/history
``` -->

```javascript
const history = await okdFinance.getPortfolioHistory({
  period: '30d', // '1d', '7d', '30d', '90d', '1y', 'all'
  interval: '1h', // '1m', '5m', '15m', '1h', '4h', '1d'
  currency: 'USD'
});
``` -->

**Ответ:**
```json
{
  "period": "30d",
  "interval": "1h",
  "currency": "USD",
  "data": [
    {
      "timestamp": 1703001600000,
      "totalValue": "120000.00",
      "pnl": "10000.00",
      "pnlPercentage": "9.09",
      "allocation": {
        "BTC": "48000.00",
        "ETH": "36000.00",
        "USDT": "36000.00"
      }
    }
  ],
  "summary": {
    "startValue": "110000.00",
    "endValue": "125000.50",
    "totalReturn": "15000.50",
    "totalReturnPercentage": "13.64",
    "maxValue": "127500.00",
    "minValue": "108000.00",
    "maxDrawdown": "8.5",
    "volatility": "15.2",
    "sharpeRatio": "1.85"
  }
}
``` -->

### Метрики производительности

```http
GET /api/v1/portfolio/metrics
``` -->

```javascript
const metrics = await okdFinance.getPortfolioMetrics({
  period: '1y',
  benchmark: 'BTC' // сравнение с BTC
});
``` -->

**Ответ:**
```json
{
  "period": "1y",
  "returns": {
    "total": "45.6",
    "annualized": "45.6",
    "monthly": "3.2",
    "weekly": "0.7",
    "daily": "0.1"
  },
  "risk": {
    "volatility": "18.5",
    "maxDrawdown": "12.3",
    "var95": "2.1",
    "beta": "0.85"
  },
  "ratios": {
    "sharpe": "2.15",
    "sortino": "3.42",
    "calmar": "3.71",
    "information": "0.65"
  },
  "benchmark": {
    "asset": "BTC",
    "return": "38.2",
    "alpha": "7.4",
    "correlation": "0.78"
  },
  "winRate": "62.5",
  "profitFactor": "1.85",
  "averageWin": "2.3",
  "averageLoss": "1.2"
}
``` -->

## Управление позициями

### Активные позиции

```http
GET /api/v1/portfolio/positions
``` -->

```javascript
const positions = await okdFinance.getActivePositions({
  type: 'all', // 'spot', 'futures', 'all'
  includeHistory: false
});
``` -->

**Ответ:**
```json
[
  {
    "positionId": "pos_12345",
    "symbol": "BTCUSDT",
    "type": "futures",
    "side": "long",
    "size": "0.5",
    "entryPrice": "42000.00",
    "markPrice": "45000.00",
    "leverage": "10x",
    "margin": "2100.00",
    "unrealizedPnL": "1500.00",
    "unrealizedPnLPercentage": "7.14",
    "liquidationPrice": "38000.00",
    "marginRatio": "0.15",
    "openTime": "2024-12-19T10:00:00Z",
    "stopLoss": "40000.00",
    "takeProfit": "48000.00"
  }
]
``` -->

### Закрытие позиции

```http
POST /api/v1/portfolio/positions/{positionId}/close
``` -->

```javascript
const closeResult = await okdFinance.closePosition('pos_12345', {
  quantity: '0.25', // частичное закрытие
  type: 'market' // 'market' или 'limit'
});
``` -->

### Изменение стоп-лосс и тейк-профит

```http
PUT /api/v1/portfolio/positions/{positionId}/risk
``` -->

```javascript
const riskUpdate = await okdFinance.updatePositionRisk('pos_12345', {
  stopLoss: '41000.00',
  takeProfit: '50000.00',
  trailingStop: {
    enabled: true,
    distance: '1000.00' // $1000 от текущей цены
  }
});
``` -->

## Диверсификация и аллокация

### Анализ диверсификации

```http
GET /api/v1/portfolio/diversification
``` -->

```javascript
const diversification = await okdFinance.getDiversificationAnalysis();
``` -->

**Ответ:**
```json
{
  "diversificationScore": 7.5,
  "concentration": {
    "herfindahlIndex": 0.25,
    "top3Concentration": "65.0",
    "maxSingleAsset": "40.0"
  },
  "assetAllocation": [
    {
      "asset": "BTC",
      "percentage": "40.0",
      "recommendation": "overweight"
    },
    {
      "asset": "ETH",
      "percentage": "25.0",
      "recommendation": "neutral"
    },
    {
      "asset": "USDT",
      "percentage": "20.0",
      "recommendation": "underweight"
    }
  ],
  "sectorAllocation": [
    {
      "sector": "Layer 1",
      "percentage": "65.0",
      "assets": ["BTC", "ETH"]
    },
    {
      "sector": "Stablecoins",
      "percentage": "20.0",
      "assets": ["USDT", "USDC"]
    }
  ],
  "recommendations": [
    "Рассмотрите снижение концентрации в BTC",
    "Добавьте активы из сектора DeFi",
    "Увеличьте долю стейблкоинов для снижения риска"
  ]
}
``` -->

### Ребалансировка портфолио

```http
POST /api/v1/portfolio/rebalance
``` -->

```javascript
const rebalanceStrategy = await okdFinance.createRebalanceStrategy({
  targetAllocation: {
    "BTC": 30.0,
    "ETH": 25.0,
    "USDT": 25.0,
    "BNB": 10.0,
    "ADA": 10.0
  },
  threshold: 5.0, // ребалансировка при отклонении >5%
  method: 'threshold' // 'threshold', 'periodic', 'volatility'
});
``` -->

**Ответ:**
```json
{
  "strategyId": "rebalance_123",
  "currentAllocation": {
    "BTC": 40.0,
    "ETH": 25.0,
    "USDT": 20.0,
    "BNB": 8.0,
    "ADA": 7.0
  },
  "targetAllocation": {
    "BTC": 30.0,
    "ETH": 25.0,
    "USDT": 25.0,
    "BNB": 10.0,
    "ADA": 10.0
  },
  "requiredTrades": [
    {
      "action": "sell",
      "asset": "BTC",
      "amount": "0.25",
      "value": "11250.00"
    },
    {
      "action": "buy",
      "asset": "USDT",
      "amount": "5625.00"
    },
    {
      "action": "buy",
      "asset": "BNB",
      "amount": "2250.00"
    },
    {
      "action": "buy",
      "asset": "ADA",
      "amount": "3375.00"
    }
  ],
  "estimatedCost": "45.50",
  "estimatedTime": "5-10 minutes"
}
``` -->

### Выполнение ребалансировки

```http
POST /api/v1/portfolio/rebalance/{strategyId}/execute
``` -->

```javascript
const execution = await okdFinance.executeRebalance('rebalance_123', {
  confirm: true,
  maxSlippage: 0.5 // максимальное проскальзывание 0.5%
});
``` -->

## Риск-менеджмент

### Анализ рисков портфолио

```http
GET /api/v1/portfolio/risk-analysis
``` -->

```javascript
const riskAnalysis = await okdFinance.getPortfolioRiskAnalysis({
  timeHorizon: '30d',
  confidenceLevel: 95
});
``` -->

**Ответ:**
```json
{
  "overallRisk": "medium",
  "riskScore": 6.5,
  "var": {
    "1d": "2500.00",
    "7d": "8500.00",
    "30d": "18000.00"
  },
  "expectedShortfall": {
    "1d": "3200.00",
    "7d": "11000.00",
    "30d": "24000.00"
  },
  "correlationMatrix": {
    "BTC-ETH": 0.85,
    "BTC-USDT": -0.05,
    "ETH-USDT": -0.03
  },
  "riskContribution": [
    {
      "asset": "BTC",
      "contribution": "65.0",
      "marginalVar": "1625.00"
    },
    {
      "asset": "ETH",
      "contribution": "25.0",
      "marginalVar": "625.00"
    }
  ],
  "recommendations": [
    "Высокая корреляция между BTC и ETH увеличивает риск",
    "Рассмотрите добавление некоррелированных активов",
    "Текущий VaR превышает рекомендуемый уровень"
  ]
}
``` -->

### Настройка лимитов риска

```http
POST /api/v1/portfolio/risk-limits
``` -->

```javascript
const riskLimits = await okdFinance.setRiskLimits({
  maxPortfolioVar: "5000.00", // максимальный VaR портфолио
  maxAssetConcentration: 50.0, // максимальная доля одного актива
  maxSectorConcentration: 70.0, // максимальная доля одного сектора
  maxLeverage: 5.0, // максимальное плечо
  stopLossLevel: 10.0, // автоматический стоп-лосс при просадке
  alerts: {
    varExceeded: true,
    concentrationExceeded: true,
    drawdownAlert: 5.0 // алерт при просадке >5%
  }
});
``` -->

## Отчеты и аналитика

### Генерация отчета о производительности

```http
POST /api/v1/portfolio/reports/performance
``` -->

```javascript
const report = await okdFinance.generatePerformanceReport({
  period: '1y',
  format: 'pdf', // 'pdf', 'excel', 'json'
  includeCharts: true,
  includeBenchmark: true,
  benchmark: 'BTC',
  email: 'user@example.com' // отправить на email
});
``` -->

### Налоговый отчет

```http
POST /api/v1/portfolio/reports/tax
``` -->

```javascript
const taxReport = await okdFinance.generateTaxReport({
  year: 2024,
  country: 'US',
  format: 'csv',
  includeStaking: true,
  includeFees: true
});
``` -->

**Ответ:**
```json
{
  "reportId": "tax_2024_123",
  "year": 2024,
  "country": "US",
  "summary": {
    "totalGains": "15000.50",
    "totalLosses": "3500.25",
    "netGains": "11500.25",
    "shortTermGains": "8000.00",
    "longTermGains": "3500.25",
    "stakingIncome": "1200.00",
    "fees": "450.75"
  },
  "transactions": 156,
  "downloadUrl": "https://api.okdfinance.com/reports/tax_2024_123.csv",
  "expiresAt": "2025-01-20T10:30:00Z"
}
``` -->

## Автоматизация портфолио

### Создание автоматической стратегии

```http
POST /api/v1/portfolio/automation/strategy
``` -->

```javascript
const autoStrategy = await okdFinance.createAutomationStrategy({
  name: "DCA + Rebalancing",
  type: "hybrid",
  components: [
    {
      type: "dca",
      config: {
        asset: "BTC",
        amount: "100.00",
        frequency: "weekly",
        enabled: true
      }
    },
    {
      type: "rebalancing",
      config: {
        frequency: "monthly",
        threshold: 10.0,
        targetAllocation: {
          "BTC": 40.0,
          "ETH": 30.0,
          "USDT": 30.0
        }
      }
    },
    {
      type: "risk_management",
      config: {
        stopLoss: 15.0,
        takeProfit: 50.0,
        trailingStop: true
      }
    }
  ],
  conditions: {
    minBalance: "1000.00",
    maxRisk: "medium",
    marketConditions: ["bull", "sideways"]
  }
});
``` -->

### Мониторинг автоматических стратегий

```http
GET /api/v1/portfolio/automation/strategies
``` -->

```javascript
const strategies = await okdFinance.getAutomationStrategies({
  status: 'active',
  includePerformance: true
});
``` -->

## Социальная торговля

### Копирование портфолио

```http
POST /api/v1/portfolio/copy
``` -->

```javascript
const copyTrading = await okdFinance.startCopyTrading({
  traderId: 'trader_123',
  allocation: 25.0, // 25% портфолио
  copySettings: {
    copyOrders: true,
    copyClosing: true,
    maxRiskPerTrade: 2.0,
    stopCopyOnDrawdown: 10.0
  }
});
``` -->

### Публикация портфолио

```http
POST /api/v1/portfolio/publish
``` -->

```javascript
const publication = await okdFinance.publishPortfolio({
  name: "Conservative Growth",
  description: "Low-risk portfolio focused on steady growth",
  public: true,
  copyingFee: 1.0, // 1% комиссия
  minCopyAmount: "1000.00",
  riskLevel: "low"
});
``` -->

## WebSocket уведомления

### Подписка на обновления портфолио

```javascript
const portfolioStream = okdFinance.subscribeToPortfolio();

portfolioStream.on('value_update', (data) => {
  console.log('Обновление стоимости портфолио:', data);
});

portfolioStream.on('position_update', (data) => {
  console.log('Обновление позиции:', data);
});

portfolioStream.on('risk_alert', (data) => {
  console.log('Предупреждение о риске:', data);
});

portfolioStream.on('rebalance_trigger', (data) => {
  console.log('Триггер ребалансировки:', data);
});
``` -->

## Интеграция с внешними сервисами

### Синхронизация с TradingView

```javascript
const tradingViewSync = await okdFinance.setupTradingViewSync({
  apiKey: 'tv_api_key',
  syncPositions: true,
  syncAlerts: true,
  webhookUrl: 'https://your-domain.com/tradingview-webhook'
});
``` -->

### Экспорт в Portfolio Tracker

```javascript
const portfolioExport = await okdFinance.exportToPortfolioTracker({
  service: 'cointracker', // 'cointracker', 'koinly', 'blockfolio'
  format: 'csv',
  includeHistoricalData: true,
  dateRange: {
    start: '2024-01-01',
    end: '2024-12-31'
  }
});
``` -->

Эта документация покрывает все аспекты управления портфолио в OKD Finance, от базового мониторинга до продвинутых стратегий автоматизации и риск-менеджмента.
