# Basic Usage Examples

Practical examples for integrating with OKD Finance API.

## Authentication

### Firebase Authentication
```javascript
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config';

async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseToken = await userCredential.user.getIdToken();
    
    // Exchange for JWT token
    const response = await fetch('https://api.okd.finance/auth/login', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firebaseToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    const { jwtToken } = await response.json();
    localStorage.setItem('jwt_token', jwtToken);
    return jwtToken;
  } catch (error) {
    console.error('Login failed:', error);
  }
}
```

### Making Authenticated Requests
```javascript
const jwtToken = localStorage.getItem('jwt_token');

const apiCall = async (endpoint, options = {}) => {
  const response = await fetch(`https://api.okd.finance${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
  
  return response.json();
};
```

## Wallet Operations

### Get Account Balance
```javascript
async function getBalance() {
  const balance = await apiCall('/wallets/balance');
  console.log('Account Balance:', balance.data);
  return balance.data;
}

// Response format:
// {
//   "USDT": { "available": "1000.00", "locked": "100.00" },
//   "BTC": { "available": "0.5", "locked": "0.0" }
// }
```

### Get Deposit Address
```javascript
async function getDepositAddress(currency) {
  const address = await apiCall(`/wallets/deposit-address/${currency}`);
  console.log(`${currency} Deposit Address:`, address.data.address);
  return address.data;
}

// Usage
const btcAddress = await getDepositAddress('BTC');
```

### Withdraw Funds
```javascript
async function withdraw(currency, amount, address) {
  const withdrawal = await apiCall('/wallets/withdraw', {
    method: 'POST',
    body: JSON.stringify({
      currency,
      amount,
      address,
      tag: null // For currencies that require memo/tag
    })
  });
  
  console.log('Withdrawal submitted:', withdrawal.data.withdrawalId);
  return withdrawal.data;
}

// Usage
await withdraw('USDT', '100.00', 'TQrZ9wHAG...');
```

## Trading Operations

### Get Market Data
```javascript
async function getMarketData(symbol) {
  // Get current price
  const ticker = await apiCall(`/trading/ticker/${symbol}`);
  
  // Get order book
  const orderbook = await apiCall(`/trading/orderbook/${symbol}`);
  
  // Get recent trades
  const trades = await apiCall(`/trading/trades/${symbol}`);
  
  return {
    price: ticker.data.price,
    orderbook: orderbook.data,
    recentTrades: trades.data
  };
}

// Usage
const btcData = await getMarketData('BTCUSDT');
console.log('BTC Price:', btcData.price);
```

### Place Orders
```javascript
async function placeMarketOrder(symbol, side, quantity) {
  const order = await apiCall('/trading/orders', {
    method: 'POST',
    body: JSON.stringify({
      symbol,
      side, // 'Buy' or 'Sell'
      orderType: 'Market',
      qty: quantity.toString()
    })
  });
  
  console.log('Market Order Placed:', order.data.orderId);
  return order.data;
}

async function placeLimitOrder(symbol, side, quantity, price) {
  const order = await apiCall('/trading/orders', {
    method: 'POST',
    body: JSON.stringify({
      symbol,
      side,
      orderType: 'Limit',
      qty: quantity.toString(),
      price: price.toString()
    })
  });
  
  console.log('Limit Order Placed:', order.data.orderId);
  return order.data;
}

// Usage
const marketOrder = await placeMarketOrder('BTCUSDT', 'Buy', '0.001');
const limitOrder = await placeLimitOrder('BTCUSDT', 'Buy', '0.001', '45000');
```

### Monitor Orders
```javascript
async function getActiveOrders() {
  const orders = await apiCall('/trading/orders/active');
  return orders.data;
}

async function getOrderStatus(orderId) {
  const order = await apiCall(`/trading/orders/${orderId}`);
  return order.data;
}

async function cancelOrder(orderId) {
  const result = await apiCall(`/trading/orders/${orderId}`, {
    method: 'DELETE'
  });
  
  console.log('Order cancelled:', result.success);
  return result;
}

// Usage
const activeOrders = await getActiveOrders();
console.log('Active Orders:', activeOrders);

// Cancel all active orders
for (const order of activeOrders) {
  if (order.status === 'open') {
    await cancelOrder(order.orderId);
  }
}
```

## WebSocket Real-time Data

### Price Updates
```javascript
const ws = new WebSocket('wss://api.okd.finance/ws');

ws.onopen = () => {
  // Subscribe to price updates
  ws.send(JSON.stringify({
    action: 'subscribe',
    channel: 'prices',
    symbols: ['BTCUSDT', 'ETHUSDT']
  }));
  
  // Subscribe to order updates
  ws.send(JSON.stringify({
    action: 'subscribe', 
    channel: 'orders',
    token: localStorage.getItem('jwt_token')
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  switch(data.channel) {
    case 'prices':
      console.log('Price Update:', data.symbol, data.price);
      updatePriceDisplay(data.symbol, data.price);
      break;
      
    case 'orders':
      console.log('Order Update:', data.orderId, data.status);
      updateOrderStatus(data.orderId, data.status);
      break;
      
    default:
      console.log('Unknown message:', data);
  }
};

function updatePriceDisplay(symbol, price) {
  const element = document.getElementById(`price-${symbol}`);
  if (element) {
    element.textContent = `$${price}`;
  }
}

function updateOrderStatus(orderId, status) {
  const element = document.getElementById(`order-${orderId}`);
  if (element) {
    element.className = `order-status ${status}`;
    element.textContent = status.toUpperCase();
  }
}
```

## Error Handling

### Retry Logic
```javascript
async function apiCallWithRetry(endpoint, options = {}, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await apiCall(endpoint, options);
      
      if (response.success) {
        return response;
      } else {
        throw new Error(response.error.message);
      }
    } catch (error) {
      console.log(`Attempt ${attempt} failed:`, error.message);
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
}
```

### Token Refresh
```javascript
async function refreshTokenIfNeeded() {
  const token = localStorage.getItem('jwt_token');
  if (!token) return null;
  
  try {
    // Decode JWT to check expiration
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    // Refresh if token expires in next 5 minutes
    if (payload.exp - currentTime < 300) {
      const firebaseUser = auth.currentUser;
      if (firebaseUser) {
        const firebaseToken = await firebaseUser.getIdToken(true);
        const response = await fetch('https://api.okd.finance/auth/refresh', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${firebaseToken}`,
            'Content-Type': 'application/json'
          }
        });
        
        const { jwtToken } = await response.json();
        localStorage.setItem('jwt_token', jwtToken);
        return jwtToken;
      }
    }
    
    return token;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
}
```

## Python Examples

### Basic Setup
```python
import requests
import json
from typing import Optional, Dict, Any

class OKDFinanceClient:
    def __init__(self, jwt_token: str):
        self.base_url = "https://api.okd.finance"
        self.jwt_token = jwt_token
        self.session = requests.Session()
        self.session.headers.update({
            'Authorization': f'Bearer {jwt_token}',
            'Content-Type': 'application/json'
        })
    
    def api_call(self, endpoint: str, method: str = 'GET', data: Optional[Dict] = None) -> Dict[str, Any]:
        url = f"{self.base_url}{endpoint}"
        
        if method.upper() == 'GET':
            response = self.session.get(url)
        elif method.upper() == 'POST':
            response = self.session.post(url, json=data)
        elif method.upper() == 'DELETE':
            response = self.session.delete(url)
        else:
            raise ValueError(f"Unsupported method: {method}")
        
        response.raise_for_status()
        return response.json()
    
    def get_balance(self) -> Dict[str, Any]:
        return self.api_call('/wallets/balance')
    
    def place_order(self, symbol: str, side: str, order_type: str, qty: str, price: Optional[str] = None) -> Dict[str, Any]:
        order_data = {
            'symbol': symbol,
            'side': side,
            'orderType': order_type,
            'qty': qty
        }
        
        if price:
            order_data['price'] = price
        
        return self.api_call('/trading/orders', 'POST', order_data)

# Usage
client = OKDFinanceClient('your_jwt_token_here')

# Get balance
balance = client.get_balance()
print("Balance:", balance['data'])

# Place market order
order = client.place_order('BTCUSDT', 'Buy', 'Market', '0.001')
print("Order placed:", order['data']['orderId'])
``` 