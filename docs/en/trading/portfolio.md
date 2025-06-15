# Portfolio Management

## Overview

OKD Finance provides comprehensive portfolio management tools that help you track, analyze, and optimize your cryptocurrency investments across multiple exchanges. This system offers real-time monitoring, risk assessment, and automated rebalancing capabilities.

## Portfolio Structure

### Basic Portfolio Setup

```javascript
// Initialize portfolio manager
const portfolio = new OKDPortfolioManager({
  exchanges: ['binance', 'bybit', 'okx'],
  baseCurrency: 'USDT',
  riskProfile: 'moderate' // conservative, moderate, aggressive
});

// Add accounts to portfolio
await portfolio.addAccount('binance', {
  apiKey: 'your_binance_key',
  apiSecret: 'your_binance_secret'
});

await portfolio.addAccount('bybit', {
  apiKey: 'your_bybit_key',
  apiSecret: 'your_bybit_secret'
});
``` -->

### Portfolio Composition

```javascript
// Get current portfolio composition
const composition = await portfolio.getComposition();
console.log(composition);
// {
//   totalValue: 50000,
//   baseCurrency: 'USDT',
//   assets: [
//     {
//       symbol: 'BTC',
//       amount: 1.5,
//       value: 67500,
//       percentage: 45.2,
//       exchanges: {
//         binance: { amount: 0.8, value: 36000 },
//         bybit: { amount: 0.7, value: 31500 }
//       }
//     },
//     {
//       symbol: 'ETH',
//       amount: 15.0,
//       value: 52500,
//       percentage: 35.1,
//       exchanges: {
//         binance: { amount: 8.0, value: 28000 },
//         okx: { amount: 7.0, value: 24500 }
//       }
//     }
//   ],
//   lastUpdated: 1640995200000
// }
``` -->

## Real-time Monitoring

### Portfolio Dashboard

```javascript
class PortfolioDashboard {
  constructor(portfolio) {
    this.portfolio = portfolio;
    this.metrics = {};
    this.alerts = [];
  }

  async initialize() {
    // Start real-time updates
    await this.portfolio.startRealTimeUpdates();
    
    // Subscribe to portfolio events
    this.portfolio.on('balanceUpdate', this.handleBalanceUpdate.bind(this));
    this.portfolio.on('priceUpdate', this.handlePriceUpdate.bind(this));
    this.portfolio.on('alert', this.handleAlert.bind(this));
    
    // Initial metrics calculation
    await this.updateMetrics();
  }

  async updateMetrics() {
    const composition = await this.portfolio.getComposition();
    const performance = await this.portfolio.getPerformance('24h');
    
    this.metrics = {
      totalValue: composition.totalValue,
      dayChange: performance.absoluteChange,
      dayChangePercent: performance.percentageChange,
      topPerformer: performance.topPerformer,
      worstPerformer: performance.worstPerformer,
      diversificationScore: this.calculateDiversification(composition),
      riskScore: await this.calculateRiskScore(composition)
    };
    
    this.displayMetrics();
  }

  handleBalanceUpdate(data) {
    console.log('Balance updated:', data);
    this.updateMetrics();
    
    // Check for significant changes
    if (Math.abs(data.changePercent) > 5) {
      this.alerts.push({
        type: 'balance_change',
        message: `Significant balance change: ${data.changePercent.toFixed(2)}%`,
        timestamp: Date.now()
      });
    }
  }

  handlePriceUpdate(data) {
    // Update price displays
    this.updatePriceDisplays(data);
    
    // Check price alerts
    this.checkPriceAlerts(data);
  }

  calculateDiversification(composition) {
    // Calculate Herfindahl-Hirschman Index for diversification
    const hhi = composition.assets.reduce((sum, asset) => {
      const weight = asset.percentage / 100;
      return sum + (weight * weight);
    }, 0);
    
    // Convert to diversification score (0-100, higher is more diversified)
    return Math.max(0, (1 - hhi) * 100);
  }

  async calculateRiskScore(composition) {
    let totalRisk = 0;
    
    for (const asset of composition.assets) {
      const volatility = await okdFinance.getHistoricalVolatility('binance', `${asset.symbol}USDT`, '1h', 168);
      const weight = asset.percentage / 100;
      totalRisk += volatility * weight;
    }
    
    // Normalize to 0-100 scale
    return Math.min(100, totalRisk * 1000);
  }
}
``` -->

### Performance Tracking

```javascript
class PerformanceTracker {
  constructor(portfolio) {
    this.portfolio = portfolio;
    this.snapshots = [];
  }

  async takeSnapshot() {
    const composition = await this.portfolio.getComposition();
    const snapshot = {
      timestamp: Date.now(),
      totalValue: composition.totalValue,
      assets: composition.assets.map(asset => ({
        symbol: asset.symbol,
        amount: asset.amount,
        value: asset.value,
        price: asset.value / asset.amount
      }))
    };
    
    this.snapshots.push(snapshot);
    
    // Keep only last 1000 snapshots
    if (this.snapshots.length > 1000) {
      this.snapshots = this.snapshots.slice(-1000);
    }
    
    return snapshot;
  }

  getPerformance(period) {
    const now = Date.now();
    const periodMs = this.parsePeriod(period);
    const startTime = now - periodMs;
    
    const startSnapshot = this.findSnapshotNear(startTime);
    const endSnapshot = this.snapshots[this.snapshots.length - 1];
    
    if (!startSnapshot || !endSnapshot) {
      return null;
    }
    
    const absoluteChange = endSnapshot.totalValue - startSnapshot.totalValue;
    const percentageChange = (absoluteChange / startSnapshot.totalValue) * 100;
    
    return {
      period,
      startValue: startSnapshot.totalValue,
      endValue: endSnapshot.totalValue,
      absoluteChange,
      percentageChange,
      annualizedReturn: this.calculateAnnualizedReturn(percentageChange, periodMs),
      maxDrawdown: this.calculateMaxDrawdown(startTime, now),
      sharpeRatio: this.calculateSharpeRatio(startTime, now),
      volatility: this.calculateVolatility(startTime, now)
    };
  }

  calculateMaxDrawdown(startTime, endTime) {
    const relevantSnapshots = this.snapshots.filter(s => 
      s.timestamp >= startTime && s.timestamp <= endTime
    );
    
    let peak = 0;
    let maxDrawdown = 0;
    
    for (const snapshot of relevantSnapshots) {
      if (snapshot.totalValue > peak) {
        peak = snapshot.totalValue;
      }
      
      const drawdown = (peak - snapshot.totalValue) / peak;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    }
    
    return maxDrawdown;
  }

  calculateSharpeRatio(startTime, endTime) {
    const returns = this.calculateReturns(startTime, endTime);
    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
    const stdDev = Math.sqrt(variance);
    
    // Assuming risk-free rate of 2% annually
    const riskFreeRate = 0.02 / 365; // Daily risk-free rate
    
    return stdDev === 0 ? 0 : (avgReturn - riskFreeRate) / stdDev;
  }

  calculateReturns(startTime, endTime) {
    const relevantSnapshots = this.snapshots.filter(s => 
      s.timestamp >= startTime && s.timestamp <= endTime
    );
    
    const returns = [];
    for (let i = 1; i < relevantSnapshots.length; i++) {
      const prevValue = relevantSnapshots[i - 1].totalValue;
      const currentValue = relevantSnapshots[i].totalValue;
      const dailyReturn = (currentValue - prevValue) / prevValue;
      returns.push(dailyReturn);
    }
    
    return returns;
  }

  parsePeriod(period) {
    const units = {
      'm': 60 * 1000,
      'h': 60 * 60 * 1000,
      'd': 24 * 60 * 60 * 1000,
      'w': 7 * 24 * 60 * 60 * 1000,
      'M': 30 * 24 * 60 * 60 * 1000
    };
    
    const match = period.match(/^(\d+)([mhdwM])$/);
    if (!match) throw new Error('Invalid period format');
    
    const [, number, unit] = match;
    return parseInt(number) * units[unit];
  }
}
``` -->

## Asset Allocation

### Strategic Allocation

```javascript
class AssetAllocator {
  constructor(portfolio) {
    this.portfolio = portfolio;
    this.strategies = new Map();
  }

  defineStrategy(name, allocation) {
    this.strategies.set(name, allocation);
  }

  // Define common allocation strategies
  initializeStrategies() {
    // Conservative strategy
    this.defineStrategy('conservative', {
      BTC: 40,
      ETH: 30,
      USDT: 20,
      'Stablecoins': 10
    });

    // Moderate strategy
    this.defineStrategy('moderate', {
      BTC: 35,
      ETH: 25,
      'Large Cap': 20,
      'Mid Cap': 15,
      USDT: 5
    });

    // Aggressive strategy
    this.defineStrategy('aggressive', {
      BTC: 30,
      ETH: 20,
      'Large Cap': 25,
      'Mid Cap': 15,
      'Small Cap': 10
    });

    // DeFi focused
    this.defineStrategy('defi', {
      ETH: 30,
      'DeFi Tokens': 40,
      'Layer 1': 20,
      USDT: 10
    });
  }

  async getCurrentAllocation() {
    const composition = await this.portfolio.getComposition();
    const allocation = {};
    
    composition.assets.forEach(asset => {
      const category = this.categorizeAsset(asset.symbol);
      allocation[category] = (allocation[category] || 0) + asset.percentage;
    });
    
    return allocation;
  }

  async getRebalanceRecommendations(strategyName) {
    const targetAllocation = this.strategies.get(strategyName);
    const currentAllocation = await this.getCurrentAllocation();
    const composition = await this.portfolio.getComposition();
    
    const recommendations = [];
    
    for (const [category, targetPercent] of Object.entries(targetAllocation)) {
      const currentPercent = currentAllocation[category] || 0;
      const difference = targetPercent - currentPercent;
      
      if (Math.abs(difference) > 2) { // 2% threshold
        const targetValue = (composition.totalValue * targetPercent) / 100;
        const currentValue = (composition.totalValue * currentPercent) / 100;
        const adjustmentValue = targetValue - currentValue;
        
        recommendations.push({
          category,
          currentPercent: currentPercent.toFixed(1),
          targetPercent: targetPercent.toFixed(1),
          difference: difference.toFixed(1),
          adjustmentValue: adjustmentValue.toFixed(2),
          action: difference > 0 ? 'buy' : 'sell'
        });
      }
    }
    
    return recommendations;
  }

  categorizeAsset(symbol) {
    const categories = {
      'BTC': ['BTC'],
      'ETH': ['ETH'],
      'Stablecoins': ['USDT', 'USDC', 'BUSD', 'DAI'],
      'Large Cap': ['BNB', 'ADA', 'SOL', 'DOT', 'AVAX'],
      'Mid Cap': ['LINK', 'UNI', 'LTC', 'BCH', 'XLM'],
      'Small Cap': ['ALGO', 'VET', 'THETA', 'FTM'],
      'DeFi Tokens': ['UNI', 'SUSHI', 'COMP', 'AAVE', 'MKR'],
      'Layer 1': ['SOL', 'ADA', 'DOT', 'AVAX', 'NEAR']
    };
    
    for (const [category, symbols] of Object.entries(categories)) {
      if (symbols.includes(symbol)) {
        return category;
      }
    }
    
    return 'Other';
  }
}
``` -->

### Automated Rebalancing

```javascript
class AutoRebalancer {
  constructor(portfolio, allocator) {
    this.portfolio = portfolio;
    this.allocator = allocator;
    this.isRunning = false;
    this.config = {
      threshold: 5, // Rebalance when allocation differs by 5%
      frequency: 'weekly', // daily, weekly, monthly
      maxTradeSize: 0.1, // Max 10% of portfolio per trade
      minTradeValue: 100 // Minimum $100 per trade
    };
  }

  start(strategyName) {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.strategyName = strategyName;
    
    // Schedule rebalancing
    this.scheduleRebalancing();
    
    console.log(`Auto-rebalancing started with ${strategyName} strategy`);
  }

  stop() {
    this.isRunning = false;
    if (this.rebalanceTimer) {
      clearTimeout(this.rebalanceTimer);
    }
    console.log('Auto-rebalancing stopped');
  }

  scheduleRebalancing() {
    if (!this.isRunning) return;
    
    const intervals = {
      daily: 24 * 60 * 60 * 1000,
      weekly: 7 * 24 * 60 * 60 * 1000,
      monthly: 30 * 24 * 60 * 60 * 1000
    };
    
    const interval = intervals[this.config.frequency];
    
    this.rebalanceTimer = setTimeout(async () => {
      await this.executeRebalancing();
      this.scheduleRebalancing(); // Schedule next rebalancing
    }, interval);
  }

  async executeRebalancing() {
    try {
      console.log('Starting automated rebalancing...');
      
      const recommendations = await this.allocator.getRebalanceRecommendations(this.strategyName);
      const composition = await this.portfolio.getComposition();
      
      // Filter recommendations by threshold
      const significantRecommendations = recommendations.filter(rec => 
        Math.abs(parseFloat(rec.difference)) >= this.config.threshold
      );
      
      if (significantRecommendations.length === 0) {
        console.log('No rebalancing needed');
        return;
      }
      
      // Execute trades
      for (const rec of significantRecommendations) {
        await this.executeCategoryRebalance(rec, composition);
      }
      
      console.log('Automated rebalancing completed');
      
      // Send notification
      this.sendRebalanceNotification(significantRecommendations);
      
    } catch (error) {
      console.error('Rebalancing failed:', error);
      this.sendErrorNotification(error);
    }
  }

  async executeCategoryRebalance(recommendation, composition) {
    const adjustmentValue = Math.abs(parseFloat(recommendation.adjustmentValue));
    
    if (adjustmentValue < this.config.minTradeValue) {
      console.log(`Skipping ${recommendation.category}: adjustment too small`);
      return;
    }
    
    const maxTradeValue = composition.totalValue * this.config.maxTradeSize;
    const tradeValue = Math.min(adjustmentValue, maxTradeValue);
    
    if (recommendation.action === 'buy') {
      await this.buyCategory(recommendation.category, tradeValue);
    } else {
      await this.sellCategory(recommendation.category, tradeValue);
    }
  }

  async buyCategory(category, value) {
    // Get assets in category
    const categoryAssets = this.getCategoryAssets(category);
    
    if (categoryAssets.length === 0) {
      console.log(`No assets found for category: ${category}`);
      return;
    }
    
    // Distribute purchase across assets in category
    const valuePerAsset = value / categoryAssets.length;
    
    for (const asset of categoryAssets) {
      try {
        const ticker = await okdFinance.getTicker('binance', `${asset}USDT`);
        const quantity = valuePerAsset / ticker.last;
        
        await okdFinance.createOrder('binance', {
          symbol: `${asset}USDT`,
          type: 'market',
          side: 'buy',
          amount: quantity
        });
        
        console.log(`Bought ${quantity} ${asset} for $${valuePerAsset}`);
      } catch (error) {
        console.error(`Failed to buy ${asset}:`, error);
      }
    }
  }

  async sellCategory(category, value) {
    const composition = await this.portfolio.getComposition();
    const categoryAssets = composition.assets.filter(asset => 
      this.allocator.categorizeAsset(asset.symbol) === category
    );
    
    let remainingValue = value;
    
    for (const asset of categoryAssets) {
      if (remainingValue <= 0) break;
      
      const sellValue = Math.min(remainingValue, asset.value * 0.5); // Max 50% of holding
      const sellQuantity = sellValue / (asset.value / asset.amount);
      
      try {
        await okdFinance.createOrder('binance', {
          symbol: `${asset.symbol}USDT`,
          type: 'market',
          side: 'sell',
          amount: sellQuantity
        });
        
        console.log(`Sold ${sellQuantity} ${asset.symbol} for $${sellValue}`);
        remainingValue -= sellValue;
      } catch (error) {
        console.error(`Failed to sell ${asset.symbol}:`, error);
      }
    }
  }

  getCategoryAssets(category) {
    // Return representative assets for each category
    const categoryAssets = {
      'BTC': ['BTC'],
      'ETH': ['ETH'],
      'Large Cap': ['BNB', 'ADA', 'SOL'],
      'Mid Cap': ['LINK', 'UNI', 'LTC'],
      'Small Cap': ['ALGO', 'VET'],
      'DeFi Tokens': ['UNI', 'SUSHI', 'AAVE'],
      'Layer 1': ['SOL', 'ADA', 'DOT']
    };
    
    return categoryAssets[category] || [];
  }

  sendRebalanceNotification(recommendations) {
    const message = `Portfolio rebalanced:\n${recommendations.map(rec => 
      `${rec.category}: ${rec.action} $${Math.abs(rec.adjustmentValue)}`
    ).join('\n')}`;
    
    // Send notification (implement your preferred method)
    console.log('Rebalance notification:', message);
  }
}
``` -->

## Risk Management

### Risk Assessment

```javascript
class PortfolioRiskManager {
  constructor(portfolio) {
    this.portfolio = portfolio;
    this.riskMetrics = {};
  }

  async assessRisk() {
    const composition = await this.portfolio.getComposition();
    
    this.riskMetrics = {
      concentrationRisk: this.calculateConcentrationRisk(composition),
      volatilityRisk: await this.calculateVolatilityRisk(composition),
      correlationRisk: await this.calculateCorrelationRisk(composition),
      liquidityRisk: await this.calculateLiquidityRisk(composition),
      overallRisk: 0
    };
    
    // Calculate overall risk score
    this.riskMetrics.overallRisk = this.calculateOverallRisk();
    
    return this.riskMetrics;
  }

  calculateConcentrationRisk(composition) {
    // Calculate Herfindahl-Hirschman Index
    const hhi = composition.assets.reduce((sum, asset) => {
      const weight = asset.percentage / 100;
      return sum + (weight * weight);
    }, 0);
    
    // Convert to risk score (0-100, higher is riskier)
    return hhi * 100;
  }

  async calculateVolatilityRisk(composition) {
    let portfolioVolatility = 0;
    
    for (const asset of composition.assets) {
      try {
        const volatility = await okdFinance.getHistoricalVolatility(
          'binance', 
          `${asset.symbol}USDT`, 
          '1h', 
          168
        );
        
        const weight = asset.percentage / 100;
        portfolioVolatility += (volatility * weight) ** 2;
      } catch (error) {
        console.warn(`Could not get volatility for ${asset.symbol}`);
      }
    }
    
    return Math.sqrt(portfolioVolatility) * 100;
  }

  async calculateCorrelationRisk(composition) {
    const symbols = composition.assets.map(asset => `${asset.symbol}USDT`);
    
    if (symbols.length < 2) return 0;
    
    try {
      const correlationMatrix = await okdFinance.getCorrelationMatrix(
        'binance', 
        symbols, 
        '1h', 
        168
      );
      
      // Calculate average correlation
      let totalCorrelation = 0;
      let count = 0;
      
      for (let i = 0; i < correlationMatrix.length; i++) {
        for (let j = i + 1; j < correlationMatrix[i].length; j++) {
          totalCorrelation += Math.abs(correlationMatrix[i][j]);
          count++;
        }
      }
      
      const avgCorrelation = count > 0 ? totalCorrelation / count : 0;
      return avgCorrelation * 100;
    } catch (error) {
      console.warn('Could not calculate correlation risk');
      return 50; // Default moderate risk
    }
  }

  async calculateLiquidityRisk(composition) {
    let liquidityScore = 0;
    
    for (const asset of composition.assets) {
      try {
        const orderbook = await okdFinance.getOrderBook('binance', `${asset.symbol}USDT`, 20);
        
        // Calculate bid-ask spread
        const spread = (orderbook.asks[0][0] - orderbook.bids[0][0]) / orderbook.bids[0][0];
        
        // Calculate market depth (sum of top 10 levels)
        const bidDepth = orderbook.bids.slice(0, 10).reduce((sum, [price, size]) => sum + (price * size), 0);
        const askDepth = orderbook.asks.slice(0, 10).reduce((sum, [price, size]) => sum + (price * size), 0);
        const avgDepth = (bidDepth + askDepth) / 2;
        
        // Liquidity score based on spread and depth
        const assetLiquidityScore = Math.max(0, 100 - (spread * 10000) - Math.max(0, 50 - Math.log10(avgDepth) * 10));
        
        const weight = asset.percentage / 100;
        liquidityScore += assetLiquidityScore * weight;
      } catch (error) {
        console.warn(`Could not assess liquidity for ${asset.symbol}`);
        liquidityScore += 50 * (asset.percentage / 100); // Default moderate liquidity
      }
    }
    
    return 100 - liquidityScore; // Convert to risk score
  }

  calculateOverallRisk() {
    const weights = {
      concentration: 0.3,
      volatility: 0.3,
      correlation: 0.2,
      liquidity: 0.2
    };
    
    return (
      this.riskMetrics.concentrationRisk * weights.concentration +
      this.riskMetrics.volatilityRisk * weights.volatility +
      this.riskMetrics.correlationRisk * weights.correlation +
      this.riskMetrics.liquidityRisk * weights.liquidity
    );
  }

  generateRiskReport() {
    const riskLevels = {
      low: [0, 30],
      moderate: [30, 60],
      high: [60, 80],
      extreme: [80, 100]
    };
    
    const getRiskLevel = (score) => {
      for (const [level, [min, max]] of Object.entries(riskLevels)) {
        if (score >= min && score < max) return level;
      }
      return 'extreme';
    };
    
    return {
      overallRisk: {
        score: this.riskMetrics.overallRisk.toFixed(1),
        level: getRiskLevel(this.riskMetrics.overallRisk)
      },
      breakdown: {
        concentration: {
          score: this.riskMetrics.concentrationRisk.toFixed(1),
          level: getRiskLevel(this.riskMetrics.concentrationRisk)
        },
        volatility: {
          score: this.riskMetrics.volatilityRisk.toFixed(1),
          level: getRiskLevel(this.riskMetrics.volatilityRisk)
        },
        correlation: {
          score: this.riskMetrics.correlationRisk.toFixed(1),
          level: getRiskLevel(this.riskMetrics.correlationRisk)
        },
        liquidity: {
          score: this.riskMetrics.liquidityRisk.toFixed(1),
          level: getRiskLevel(this.riskMetrics.liquidityRisk)
        }
      },
      recommendations: this.generateRiskRecommendations()
    };
  }

  generateRiskRecommendations() {
    const recommendations = [];
    
    if (this.riskMetrics.concentrationRisk > 60) {
      recommendations.push('Consider diversifying your portfolio to reduce concentration risk');
    }
    
    if (this.riskMetrics.volatilityRisk > 70) {
      recommendations.push('High volatility detected - consider adding stable assets');
    }
    
    if (this.riskMetrics.correlationRisk > 80) {
      recommendations.push('Assets are highly correlated - diversify across different sectors');
    }
    
    if (this.riskMetrics.liquidityRisk > 50) {
      recommendations.push('Some assets may have liquidity issues - monitor closely');
    }
    
    return recommendations;
  }
}
``` -->

## Reporting and Analytics

### Portfolio Reports

```javascript
class PortfolioReporter {
  constructor(portfolio) {
    this.portfolio = portfolio;
  }

  async generateDailyReport() {
    const composition = await this.portfolio.getComposition();
    const performance = await this.portfolio.getPerformance('24h');
    const riskManager = new PortfolioRiskManager(this.portfolio);
    const riskAssessment = await riskManager.assessRisk();
    
    return {
      date: new Date().toISOString().split('T')[0],
      summary: {
        totalValue: composition.totalValue,
        dayChange: performance.absoluteChange,
        dayChangePercent: performance.percentageChange,
        assetCount: composition.assets.length
      },
      topPerformers: this.getTopPerformers(composition, 3),
      worstPerformers: this.getWorstPerformers(composition, 3),
      riskMetrics: riskAssessment,
      allocation: composition.assets.map(asset => ({
        symbol: asset.symbol,
        percentage: asset.percentage,
        value: asset.value
      }))
    };
  }

  async generateMonthlyReport() {
    const performance = await this.portfolio.getPerformance('30d');
    const composition = await this.portfolio.getComposition();
    
    // Calculate monthly metrics
    const monthlyMetrics = {
      totalReturn: performance.percentageChange,
      annualizedReturn: performance.annualizedReturn,
      maxDrawdown: performance.maxDrawdown,
      sharpeRatio: performance.sharpeRatio,
      volatility: performance.volatility,
      bestDay: await this.getBestDay('30d'),
      worstDay: await this.getWorstDay('30d')
    };
    
    return {
      period: '30 days',
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      performance: monthlyMetrics,
      allocation: composition.assets,
      trades: await this.getTradesSummary('30d'),
      fees: await this.getFeesSummary('30d')
    };
  }

  getTopPerformers(composition, count) {
    return composition.assets
      .sort((a, b) => b.dayChangePercent - a.dayChangePercent)
      .slice(0, count)
      .map(asset => ({
        symbol: asset.symbol,
        change: asset.dayChangePercent,
        value: asset.value
      }));
  }

  getWorstPerformers(composition, count) {
    return composition.assets
      .sort((a, b) => a.dayChangePercent - b.dayChangePercent)
      .slice(0, count)
      .map(asset => ({
        symbol: asset.symbol,
        change: asset.dayChangePercent,
        value: asset.value
      }));
  }

  async exportToCSV(data, filename) {
    const csv = this.convertToCSV(data);
    const fs = require('fs');
    fs.writeFileSync(filename, csv);
    console.log(`Report exported to ${filename}`);
  }

  convertToCSV(data) {
    if (!Array.isArray(data) || data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => row[header]).join(','))
    ].join('\n');
    
    return csvContent;
  }
}
``` -->
