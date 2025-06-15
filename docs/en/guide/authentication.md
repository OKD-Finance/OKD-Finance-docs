# Authentication

## Overview

OKD Finance provides secure authentication mechanisms for accessing trading APIs across multiple exchanges. This guide covers API key management, security best practices, and authentication flows.

## API Key Management

### Creating API Keys

Each exchange requires its own API credentials. Here's how to create them:

#### Binance
1. Log into your Binance account
2. Go to Account → API Management
3. Create a new API key
4. Enable required permissions:
   - Read Info
   - Enable Spot & Margin Trading
   - Enable Futures Trading (if needed)
5. Restrict API access by IP address (recommended)

#### Bybit
1. Log into your Bybit account
2. Navigate to Account & Security → API Management
3. Create a new API key
4. Set permissions:
   - Read-Write for trading
   - Read-Only for data access
5. Configure IP restrictions

#### OKX
1. Access your OKX account
2. Go to Profile → API
3. Create API key with appropriate permissions
4. Set up IP whitelist for security

### API Key Configuration

```javascript
// Basic configuration
const config = {
  binance: {
    apiKey: process.env.BINANCE_API_KEY,
    apiSecret: process.env.BINANCE_API_SECRET,
    testnet: false
  },
  bybit: {
    apiKey: process.env.BYBIT_API_KEY,
    apiSecret: process.env.BYBIT_API_SECRET,
    testnet: false
  },
  okx: {
    apiKey: process.env.OKX_API_KEY,
    apiSecret: process.env.OKX_API_SECRET,
    passphrase: process.env.OKX_PASSPHRASE,
    testnet: false
  }
};

// Initialize OKD Finance with credentials
const okdFinance = new OKDFinance(config);
``` -->

### Environment Variables

Store sensitive credentials in environment variables:

```bash
# .env file
BINANCE_API_KEY=your_binance_api_key
BINANCE_API_SECRET=your_binance_api_secret

BYBIT_API_KEY=your_bybit_api_key
BYBIT_API_SECRET=your_bybit_api_secret

OKX_API_KEY=your_okx_api_key
OKX_API_SECRET=your_okx_api_secret
OKX_PASSPHRASE=your_okx_passphrase

# Optional: for testnet environments
TESTNET_MODE=false
``` -->

## Authentication Methods

### HMAC Signature Authentication

Most exchanges use HMAC-SHA256 for request signing:

```javascript
class AuthenticationManager {
  constructor(apiKey, apiSecret) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  generateSignature(method, endpoint, params, timestamp) {
    const crypto = require('crypto');
    
    // Create query string
    const queryString = new URLSearchParams(params).toString();
    
    // Create signature payload
    const payload = `${method}${endpoint}${queryString}${timestamp}`;
    
    // Generate HMAC signature
    const signature = crypto
      .createHmac('sha256', this.apiSecret)
      .update(payload)
      .digest('hex');
    
    return signature;
  }

  createAuthHeaders(method, endpoint, params = {}) {
    const timestamp = Date.now();
    const signature = this.generateSignature(method, endpoint, params, timestamp);
    
    return {
      'X-API-KEY': this.apiKey,
      'X-TIMESTAMP': timestamp.toString(),
      'X-SIGNATURE': signature,
      'Content-Type': 'application/json'
    };
  }
}
``` -->

### JWT Token Authentication

For session-based authentication:

```javascript
class JWTAuthManager {
  constructor(apiKey, apiSecret) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.token = null;
    this.tokenExpiry = null;
  }

  async getToken() {
    if (this.token && this.tokenExpiry > Date.now()) {
      return this.token;
    }
    
    await this.refreshToken();
    return this.token;
  }

  async refreshToken() {
    const jwt = require('jsonwebtoken');
    
    const payload = {
      apiKey: this.apiKey,
      timestamp: Date.now(),
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
    };
    
    this.token = jwt.sign(payload, this.apiSecret);
    this.tokenExpiry = Date.now() + (55 * 60 * 1000); // 55 minutes
  }

  async createAuthHeaders() {
    const token = await this.getToken();
    
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }
}
``` -->

## Security Best Practices

### API Key Security

```javascript
class SecureKeyManager {
  constructor() {
    this.encryptionKey = this.deriveEncryptionKey();
  }

  deriveEncryptionKey() {
    const crypto = require('crypto');
    const password = process.env.MASTER_PASSWORD;
    const salt = process.env.ENCRYPTION_SALT;
    
    return crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha512');
  }

  encryptApiKey(apiKey) {
    const crypto = require('crypto');
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher('aes-256-cbc', this.encryptionKey);
    
    let encrypted = cipher.update(apiKey, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return {
      encrypted,
      iv: iv.toString('hex')
    };
  }

  decryptApiKey(encryptedData) {
    const crypto = require('crypto');
    const decipher = crypto.createDecipher('aes-256-cbc', this.encryptionKey);
    
    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  storeSecurely(exchange, credentials) {
    const encrypted = {
      apiKey: this.encryptApiKey(credentials.apiKey),
      apiSecret: this.encryptApiKey(credentials.apiSecret)
    };
    
    // Store in secure database or file
    this.saveToSecureStorage(exchange, encrypted);
  }

  retrieveSecurely(exchange) {
    const encrypted = this.loadFromSecureStorage(exchange);
    
    return {
      apiKey: this.decryptApiKey(encrypted.apiKey),
      apiSecret: this.decryptApiKey(encrypted.apiSecret)
    };
  }
}
``` -->

### Rate Limiting and Request Management

```javascript
class RateLimitManager {
  constructor() {
    this.requestCounts = new Map();
    this.limits = {
      binance: { requests: 1200, window: 60000 }, // 1200 per minute
      bybit: { requests: 120, window: 60000 },    // 120 per minute
      okx: { requests: 300, window: 60000 }       // 300 per minute
    };
  }

  async checkRateLimit(exchange) {
    const now = Date.now();
    const limit = this.limits[exchange];
    
    if (!this.requestCounts.has(exchange)) {
      this.requestCounts.set(exchange, []);
    }
    
    const requests = this.requestCounts.get(exchange);
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < limit.window);
    
    if (validRequests.length >= limit.requests) {
      const oldestRequest = Math.min(...validRequests);
      const waitTime = limit.window - (now - oldestRequest);
      
      throw new Error(`Rate limit exceeded. Wait ${waitTime}ms`);
    }
    
    // Add current request
    validRequests.push(now);
    this.requestCounts.set(exchange, validRequests);
  }

  async waitForRateLimit(exchange) {
    try {
      await this.checkRateLimit(exchange);
    } catch (error) {
      const waitTime = parseInt(error.message.match(/\d+/)[0]);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return this.waitForRateLimit(exchange);
    }
  }
}
``` -->

### IP Whitelisting

```javascript
class IPWhitelistManager {
  constructor() {
    this.allowedIPs = new Set();
    this.currentIP = null;
  }

  async getCurrentIP() {
    if (this.currentIP) return this.currentIP;
    
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      this.currentIP = data.ip;
      return this.currentIP;
    } catch (error) {
      throw new Error('Failed to get current IP address');
    }
  }

  addAllowedIP(ip) {
    this.allowedIPs.add(ip);
  }

  async validateCurrentIP() {
    const currentIP = await this.getCurrentIP();
    
    if (!this.allowedIPs.has(currentIP)) {
      throw new Error(`Current IP ${currentIP} is not whitelisted`);
    }
    
    return true;
  }

  async setupIPWhitelist(exchange, apiCredentials) {
    const currentIP = await this.getCurrentIP();
    
    console.log(`Current IP: ${currentIP}`);
    console.log(`Please add this IP to your ${exchange} API whitelist`);
    
    // Wait for user confirmation
    await this.waitForUserConfirmation();
    
    // Test API access
    await this.testAPIAccess(exchange, apiCredentials);
  }

  async waitForUserConfirmation() {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    return new Promise(resolve => {
      rl.question('Have you added the IP to the whitelist? (y/n): ', (answer) => {
        rl.close();
        if (answer.toLowerCase() === 'y') {
          resolve();
        } else {
          throw new Error('IP whitelist setup cancelled');
        }
      });
    });
  }
}
``` -->

## Multi-Exchange Authentication

### Unified Authentication Manager

```javascript
class UnifiedAuthManager {
  constructor() {
    this.exchanges = new Map();
    this.rateLimitManager = new RateLimitManager();
  }

  addExchange(name, credentials) {
    const authManager = this.createExchangeAuth(name, credentials);
    this.exchanges.set(name, authManager);
  }

  createExchangeAuth(exchange, credentials) {
    switch (exchange) {
      case 'binance':
        return new BinanceAuth(credentials);
      case 'bybit':
        return new BybitAuth(credentials);
      case 'okx':
        return new OKXAuth(credentials);
      default:
        throw new Error(`Unsupported exchange: ${exchange}`);
    }
  }

  async makeAuthenticatedRequest(exchange, method, endpoint, params = {}) {
    // Check rate limits
    await this.rateLimitManager.waitForRateLimit(exchange);
    
    // Get exchange-specific auth manager
    const authManager = this.exchanges.get(exchange);
    if (!authManager) {
      throw new Error(`Exchange ${exchange} not configured`);
    }
    
    // Create authenticated request
    const headers = await authManager.createAuthHeaders(method, endpoint, params);
    
    // Make request
    return this.executeRequest(exchange, method, endpoint, params, headers);
  }

  async executeRequest(exchange, method, endpoint, params, headers) {
    const baseUrls = {
      binance: 'https://api.binance.com',
      bybit: 'https://api.bybit.com',
      okx: 'https://www.okx.com'
    };
    
    const url = `${baseUrls[exchange]}${endpoint}`;
    const options = {
      method,
      headers,
      body: method !== 'GET' ? JSON.stringify(params) : undefined
    };
    
    if (method === 'GET' && Object.keys(params).length > 0) {
      const queryString = new URLSearchParams(params).toString();
      url += `?${queryString}`;
    }
    
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Request failed for ${exchange}:`, error);
      throw error;
    }
  }
}
``` -->

### Exchange-Specific Authentication

```javascript
class BinanceAuth extends AuthenticationManager {
  createAuthHeaders(method, endpoint, params = {}) {
    const timestamp = Date.now();
    params.timestamp = timestamp;
    
    const queryString = new URLSearchParams(params).toString();
    const signature = crypto
      .createHmac('sha256', this.apiSecret)
      .update(queryString)
      .digest('hex');
    
    params.signature = signature;
    
    return {
      'X-MBX-APIKEY': this.apiKey,
      'Content-Type': 'application/json'
    };
  }
}

class BybitAuth extends AuthenticationManager {
  createAuthHeaders(method, endpoint, params = {}) {
    const timestamp = Date.now();
    const recv_window = 5000;
    
    const paramString = JSON.stringify(params);
    const payload = `${timestamp}${this.apiKey}${recv_window}${paramString}`;
    
    const signature = crypto
      .createHmac('sha256', this.apiSecret)
      .update(payload)
      .digest('hex');
    
    return {
      'X-BAPI-API-KEY': this.apiKey,
      'X-BAPI-TIMESTAMP': timestamp.toString(),
      'X-BAPI-RECV-WINDOW': recv_window.toString(),
      'X-BAPI-SIGN': signature,
      'Content-Type': 'application/json'
    };
  }
}

class OKXAuth extends AuthenticationManager {
  constructor(apiKey, apiSecret, passphrase) {
    super(apiKey, apiSecret);
    this.passphrase = passphrase;
  }

  createAuthHeaders(method, endpoint, params = {}) {
    const timestamp = new Date().toISOString();
    const body = method !== 'GET' ? JSON.stringify(params) : '';
    
    const prehash = `${timestamp}${method}${endpoint}${body}`;
    const signature = crypto
      .createHmac('sha256', this.apiSecret)
      .update(prehash)
      .digest('base64');
    
    return {
      'OK-ACCESS-KEY': this.apiKey,
      'OK-ACCESS-SIGN': signature,
      'OK-ACCESS-TIMESTAMP': timestamp,
      'OK-ACCESS-PASSPHRASE': this.passphrase,
      'Content-Type': 'application/json'
    };
  }
}
``` -->

## Error Handling and Recovery

### Authentication Error Handling

```javascript
class AuthErrorHandler {
  constructor(authManager) {
    this.authManager = authManager;
    this.retryAttempts = 3;
    this.retryDelay = 1000;
  }

  async handleAuthenticatedRequest(exchange, method, endpoint, params) {
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        return await this.authManager.makeAuthenticatedRequest(
          exchange, method, endpoint, params
        );
      } catch (error) {
        if (this.isAuthError(error)) {
          await this.handleAuthError(exchange, error, attempt);
        } else if (this.isRateLimitError(error)) {
          await this.handleRateLimitError(error, attempt);
        } else {
          throw error; // Non-recoverable error
        }
      }
    }
    
    throw new Error(`Failed after ${this.retryAttempts} attempts`);
  }

  isAuthError(error) {
    const authErrorCodes = [401, 403];
    const authErrorMessages = [
      'invalid signature',
      'api key not found',
      'timestamp expired',
      'invalid api key'
    ];
    
    return authErrorCodes.includes(error.status) ||
           authErrorMessages.some(msg => 
             error.message.toLowerCase().includes(msg)
           );
  }

  isRateLimitError(error) {
    return error.status === 429 || 
           error.message.toLowerCase().includes('rate limit');
  }

  async handleAuthError(exchange, error, attempt) {
    console.warn(`Auth error on attempt ${attempt}:`, error.message);
    
    if (error.message.includes('timestamp')) {
      // Sync system time
      await this.syncSystemTime();
    } else if (error.message.includes('signature')) {
      // Regenerate signature
      await this.regenerateCredentials(exchange);
    }
    
    // Wait before retry
    await this.delay(this.retryDelay * attempt);
  }

  async handleRateLimitError(error, attempt) {
    const waitTime = this.extractWaitTime(error) || (this.retryDelay * attempt * 2);
    console.warn(`Rate limit hit, waiting ${waitTime}ms`);
    await this.delay(waitTime);
  }

  extractWaitTime(error) {
    const match = error.message.match(/retry after (\d+)/i);
    return match ? parseInt(match[1]) * 1000 : null;
  }

  async syncSystemTime() {
    // Implementation to sync system time with exchange server time
    console.log('Syncing system time...');
  }

  async regenerateCredentials(exchange) {
    // Implementation to refresh or regenerate credentials
    console.log(`Regenerating credentials for ${exchange}...`);
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
``` -->

## Testing Authentication

### Authentication Test Suite

```javascript
class AuthTestSuite {
  constructor(authManager) {
    this.authManager = authManager;
    this.testResults = [];
  }

  async runAllTests() {
    console.log('Starting authentication tests...');
    
    await this.testBasicAuth();
    await this.testRateLimits();
    await this.testErrorHandling();
    await this.testSecurityFeatures();
    
    this.printResults();
  }

  async testBasicAuth() {
    const exchanges = ['binance', 'bybit', 'okx'];
    
    for (const exchange of exchanges) {
      try {
        // Test account info endpoint
        const result = await this.authManager.makeAuthenticatedRequest(
          exchange, 'GET', '/api/v3/account', {}
        );
        
        this.testResults.push({
          test: `${exchange} basic auth`,
          passed: !!result,
          message: 'Authentication successful'
        });
      } catch (error) {
        this.testResults.push({
          test: `${exchange} basic auth`,
          passed: false,
          message: error.message
        });
      }
    }
  }

  async testRateLimits() {
    try {
      // Make rapid requests to test rate limiting
      const promises = Array(10).fill().map(() =>
        this.authManager.makeAuthenticatedRequest('binance', 'GET', '/api/v3/time', {})
      );
      
      await Promise.all(promises);
      
      this.testResults.push({
        test: 'Rate limit handling',
        passed: true,
        message: 'Rate limits handled correctly'
      });
    } catch (error) {
      this.testResults.push({
        test: 'Rate limit handling',
        passed: false,
        message: error.message
      });
    }
  }

  async testErrorHandling() {
    try {
      // Test with invalid endpoint
      await this.authManager.makeAuthenticatedRequest(
        'binance', 'GET', '/api/v3/invalid', {}
      );
      
      this.testResults.push({
        test: 'Error handling',
        passed: false,
        message: 'Should have thrown error for invalid endpoint'
      });
    } catch (error) {
      this.testResults.push({
        test: 'Error handling',
        passed: true,
        message: 'Correctly handled invalid endpoint'
      });
    }
  }

  async testSecurityFeatures() {
    // Test signature validation
    const validSignature = this.authManager.exchanges.get('binance')
      .generateSignature('GET', '/api/v3/account', {}, Date.now());
    
    this.testResults.push({
      test: 'Signature generation',
      passed: typeof validSignature === 'string' && validSignature.length > 0,
      message: validSignature ? 'Signature generated' : 'Failed to generate signature'
    });
  }

  printResults() {
    console.log('\n=== Authentication Test Results ===');
    
    this.testResults.forEach(result => {
      const status = result.passed ? '✅ PASS' : '❌ FAIL';
      console.log(`${status} ${result.test}: ${result.message}`);
    });
    
    const passed = this.testResults.filter(r => r.passed).length;
    const total = this.testResults.length;
    
    console.log(`\nPassed: ${passed}/${total} tests`);
    
    if (passed === total) {
      console.log('🎉 All authentication tests passed!');
    } else {
      console.log('⚠️  Some tests failed. Please check your configuration.');
    }
  }
}

// Usage
const authManager = new UnifiedAuthManager();
const testSuite = new AuthTestSuite(authManager);
testSuite.runAllTests();
``` -->
