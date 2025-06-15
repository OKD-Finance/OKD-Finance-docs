# Bybit Configuration

This guide covers the complete setup and configuration of Bybit integration in OKD Finance.

## API Configuration

### Basic Setup

```python
from okd_finance.exchanges.bybit import BybitClient

# Initialize Bybit client
client = BybitClient(
    api_key="your_api_key",
    api_secret="your_api_secret",
    testnet=False,  # Set to True for testnet
    recv_window=5000
)
``` -->

### Environment Configuration

Create a `.env` file for secure credential management:

```bash
# Bybit API Credentials
BYBIT_API_KEY=your_api_key_here
BYBIT_API_SECRET=your_api_secret_here
BYBIT_TESTNET=false
BYBIT_RECV_WINDOW=5000

# Rate Limiting
BYBIT_RATE_LIMIT_REQUESTS=120
BYBIT_RATE_LIMIT_WINDOW=60

# WebSocket Configuration
BYBIT_WS_PING_INTERVAL=20
BYBIT_WS_PING_TIMEOUT=10
BYBIT_WS_CLOSE_TIMEOUT=10
``` -->

### Configuration Class

```python
import os
from dataclasses import dataclass
from typing import Optional

@dataclass
class BybitConfig:
    api_key: str
    api_secret: str
    testnet: bool = False
    recv_window: int = 5000
    rate_limit_requests: int = 120
    rate_limit_window: int = 60
    ws_ping_interval: int = 20
    ws_ping_timeout: int = 10
    ws_close_timeout: int = 10
    
    @classmethod
    def from_env(cls) -> 'BybitConfig':
        """Load configuration from environment variables."""
        return cls(
            api_key=os.getenv('BYBIT_API_KEY', ''),
            api_secret=os.getenv('BYBIT_API_SECRET', ''),
            testnet=os.getenv('BYBIT_TESTNET', 'false').lower() == 'true',
            recv_window=int(os.getenv('BYBIT_RECV_WINDOW', '5000')),
            rate_limit_requests=int(os.getenv('BYBIT_RATE_LIMIT_REQUESTS', '120')),
            rate_limit_window=int(os.getenv('BYBIT_RATE_LIMIT_WINDOW', '60')),
            ws_ping_interval=int(os.getenv('BYBIT_WS_PING_INTERVAL', '20')),
            ws_ping_timeout=int(os.getenv('BYBIT_WS_PING_TIMEOUT', '10')),
            ws_close_timeout=int(os.getenv('BYBIT_WS_CLOSE_TIMEOUT', '10'))
        )
    
    def validate(self) -> bool:
        """Validate configuration parameters."""
        if not self.api_key or not self.api_secret:
            raise ValueError("API key and secret are required")
        
        if self.recv_window <= 0 or self.recv_window > 60000:
            raise ValueError("recv_window must be between 1 and 60000")
        
        return True
``` -->

## Network Configuration

### Endpoint Configuration

```python
class BybitEndpoints:
    # Mainnet endpoints
    MAINNET_REST = "https://api.bybit.com"
    MAINNET_WS_PUBLIC = "wss://stream.bybit.com/v5/public/spot"
    MAINNET_WS_PRIVATE = "wss://stream.bybit.com/v5/private"
    
    # Testnet endpoints
    TESTNET_REST = "https://api-testnet.bybit.com"
    TESTNET_WS_PUBLIC = "wss://stream-testnet.bybit.com/v5/public/spot"
    TESTNET_WS_PRIVATE = "wss://stream-testnet.bybit.com/v5/private"
    
    @classmethod
    def get_endpoints(cls, testnet: bool = False):
        if testnet:
            return {
                'rest': cls.TESTNET_REST,
                'ws_public': cls.TESTNET_WS_PUBLIC,
                'ws_private': cls.TESTNET_WS_PRIVATE
            }
        return {
            'rest': cls.MAINNET_REST,
            'ws_public': cls.MAINNET_WS_PUBLIC,
            'ws_private': cls.MAINNET_WS_PRIVATE
        }
``` -->

### Connection Pool Configuration

```python
import aiohttp
from aiohttp import TCPConnector

class BybitConnectionManager:
    def __init__(self, config: BybitConfig):
        self.config = config
        self._session = None
    
    async def get_session(self) -> aiohttp.ClientSession:
        """Get or create HTTP session with connection pooling."""
        if self._session is None or self._session.closed:
            connector = TCPConnector(
                limit=100,  # Total connection pool size
                limit_per_host=30,  # Per-host connection limit
                ttl_dns_cache=300,  # DNS cache TTL
                use_dns_cache=True,
                keepalive_timeout=30,
                enable_cleanup_closed=True
            )
            
            timeout = aiohttp.ClientTimeout(
                total=30,  # Total timeout
                connect=10,  # Connection timeout
                sock_read=20  # Socket read timeout
            )
            
            self._session = aiohttp.ClientSession(
                connector=connector,
                timeout=timeout,
                headers={
                    'User-Agent': 'OKD-Finance/1.0',
                    'Content-Type': 'application/json'
                }
            )
        
        return self._session
    
    async def close(self):
        """Close the HTTP session."""
        if self._session and not self._session.closed:
            await self._session.close()
``` -->

## Security Configuration

### API Key Management

```python
import hashlib
import hmac
import time
from typing import Dict, Any

class BybitSecurity:
    def __init__(self, api_key: str, api_secret: str):
        self.api_key = api_key
        self.api_secret = api_secret
    
    def generate_signature(self, timestamp: str, params: str) -> str:
        """Generate HMAC SHA256 signature for Bybit API."""
        param_str = f"{timestamp}{self.api_key}{params}"
        return hmac.new(
            self.api_secret.encode('utf-8'),
            param_str.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()
    
    def get_headers(self, params: Dict[str, Any] = None) -> Dict[str, str]:
        """Generate authenticated headers for API requests."""
        timestamp = str(int(time.time() * 1000))
        param_str = ""
        
        if params:
            # Sort parameters for consistent signature
            sorted_params = sorted(params.items())
            param_str = "&".join([f"{k}={v}" for k, v in sorted_params])
        
        signature = self.generate_signature(timestamp, param_str)
        
        return {
            'X-BAPI-API-KEY': self.api_key,
            'X-BAPI-SIGN': signature,
            'X-BAPI-SIGN-TYPE': '2',
            'X-BAPI-TIMESTAMP': timestamp,
            'X-BAPI-RECV-WINDOW': '5000'
        }
``` -->

### Rate Limiting

```python
import asyncio
from collections import deque
from typing import Optional

class RateLimiter:
    def __init__(self, requests_per_window: int, window_seconds: int):
        self.requests_per_window = requests_per_window
        self.window_seconds = window_seconds
        self.requests = deque()
        self._lock = asyncio.Lock()
    
    async def acquire(self) -> None:
        """Acquire rate limit permission."""
        async with self._lock:
            now = time.time()
            
            # Remove old requests outside the window
            while self.requests and self.requests[0] <= now - self.window_seconds:
                self.requests.popleft()
            
            # Check if we can make a request
            if len(self.requests) >= self.requests_per_window:
                # Calculate wait time
                oldest_request = self.requests[0]
                wait_time = self.window_seconds - (now - oldest_request)
                if wait_time > 0:
                    await asyncio.sleep(wait_time)
                    return await self.acquire()
            
            # Record this request
            self.requests.append(now)
``` -->

## Advanced Configuration

### Multi-Account Setup

```python
from typing import Dict, List

class MultiAccountBybitConfig:
    def __init__(self):
        self.accounts: Dict[str, BybitConfig] = {}
    
    def add_account(self, name: str, config: BybitConfig):
        """Add a new account configuration."""
        config.validate()
        self.accounts[name] = config
    
    def get_account(self, name: str) -> Optional[BybitConfig]:
        """Get account configuration by name."""
        return self.accounts.get(name)
    
    def list_accounts(self) -> List[str]:
        """List all configured account names."""
        return list(self.accounts.keys())
    
    @classmethod
    def from_config_file(cls, config_path: str) -> 'MultiAccountBybitConfig':
        """Load multi-account configuration from file."""
        import json
        
        with open(config_path, 'r') as f:
            config_data = json.load(f)
        
        multi_config = cls()
        
        for account_name, account_data in config_data.get('accounts', {}).items():
            config = BybitConfig(**account_data)
            multi_config.add_account(account_name, config)
        
        return multi_config
``` -->

### Configuration Validation

```python
import asyncio
from okd_finance.exchanges.bybit import BybitClient

async def validate_configuration(config: BybitConfig) -> Dict[str, Any]:
    """Validate Bybit configuration by testing API connectivity."""
    results = {
        'config_valid': False,
        'api_accessible': False,
        'permissions': {},
        'errors': []
    }
    
    try:
        # Validate configuration parameters
        config.validate()
        results['config_valid'] = True
        
        # Test API connectivity
        client = BybitClient(config)
        
        # Test public endpoint
        server_time = await client.get_server_time()
        if server_time:
            results['api_accessible'] = True
        
        # Test private endpoints (permissions)
        try:
            account_info = await client.get_account_info()
            results['permissions']['account_info'] = True
        except Exception as e:
            results['permissions']['account_info'] = False
            results['errors'].append(f"Account info access: {str(e)}")
        
        try:
            positions = await client.get_positions()
            results['permissions']['positions'] = True
        except Exception as e:
            results['permissions']['positions'] = False
            results['errors'].append(f"Positions access: {str(e)}")
        
        try:
            orders = await client.get_open_orders()
            results['permissions']['orders'] = True
        except Exception as e:
            results['permissions']['orders'] = False
            results['errors'].append(f"Orders access: {str(e)}")
        
        await client.close()
        
    except Exception as e:
        results['errors'].append(f"Configuration error: {str(e)}")
    
    return results

# Usage example
async def main():
    config = BybitConfig.from_env()
    validation_results = await validate_configuration(config)
    
    if validation_results['config_valid'] and validation_results['api_accessible']:
        print("✅ Bybit configuration is valid and accessible")
        
        # Check permissions
        permissions = validation_results['permissions']
        for perm, status in permissions.items():
            status_icon = "✅" if status else "❌"
            print(f"{status_icon} {perm}: {'Accessible' if status else 'Not accessible'}")
    else:
        print("❌ Configuration validation failed:")
        for error in validation_results['errors']:
            print(f"  - {error}")

if __name__ == "__main__":
    asyncio.run(main())
``` -->

## Configuration Best Practices

### Security Guidelines

1. **Never hardcode credentials** in source code
2. **Use environment variables** or secure configuration files
3. **Rotate API keys** regularly
4. **Use testnet** for development and testing
5. **Implement proper error handling** for authentication failures
6. **Monitor API usage** to avoid rate limits

### Performance Optimization

1. **Connection pooling** for HTTP requests
2. **Rate limiting** to respect API limits
3. **Caching** for frequently accessed data
4. **Async/await** for non-blocking operations
5. **Proper timeout configuration** to avoid hanging requests

### Monitoring and Logging

```python
import logging
from typing import Any

class BybitConfigLogger:
    def __init__(self, name: str = "bybit_config"):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(logging.INFO)
        
        # Create console handler
        handler = logging.StreamHandler()
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        handler.setFormatter(formatter)
        self.logger.addHandler(handler)
    
    def log_config_load(self, config: BybitConfig):
        """Log configuration loading."""
        self.logger.info(f"Loaded Bybit configuration - Testnet: {config.testnet}")
    
    def log_api_error(self, error: Exception):
        """Log API errors."""
        self.logger.error(f"Bybit API error: {str(error)}")
    
    def log_rate_limit(self, wait_time: float):
        """Log rate limiting."""
        self.logger.warning(f"Rate limit hit, waiting {wait_time:.2f} seconds")
``` -->

This comprehensive configuration guide ensures secure, efficient, and reliable integration with Bybit's trading platform.
