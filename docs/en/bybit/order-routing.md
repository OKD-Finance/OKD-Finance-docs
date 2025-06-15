# Bybit Order Routing

This guide covers advanced order routing strategies and execution algorithms for Bybit integration in OKD Finance.

## Order Routing Overview

Order routing determines how orders are executed across different market conditions, venues, and timeframes to optimize execution quality.

### Core Components

```python
from enum import Enum
from dataclasses import dataclass
from typing import Optional, List, Dict, Any
import asyncio

class RoutingStrategy(Enum):
    DIRECT = "direct"
    SMART = "smart"
    TWAP = "twap"
    VWAP = "vwap"
    ICEBERG = "iceberg"
    SNIPER = "sniper"

class OrderUrgency(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    IMMEDIATE = "immediate"

@dataclass
class RoutingConfig:
    strategy: RoutingStrategy
    urgency: OrderUrgency
    max_slippage: float = 0.001  # 0.1%
    time_limit: Optional[int] = None  # seconds
    chunk_size: Optional[float] = None
    participation_rate: float = 0.1  # 10%
    min_fill_size: Optional[float] = None
``` -->

## Smart Order Routing

### Intelligent Routing Engine

```python
import time
from typing import Tuple
from okd_finance.exchanges.bybit import BybitClient
from okd_finance.market_data import MarketDataProvider

class SmartOrderRouter:
    def __init__(self, client: BybitClient, market_data: MarketDataProvider):
        self.client = client
        self.market_data = market_data
        self.execution_history = []
    
    async def route_order(self, order: Dict[str, Any], config: RoutingConfig) -> List[Dict[str, Any]]:
        """Route order using intelligent algorithms."""
        symbol = order['symbol']
        side = order['side']
        quantity = float(order['qty'])
        
        # Analyze market conditions
        market_analysis = await self._analyze_market_conditions(symbol)
        
        # Select optimal routing strategy
        if config.strategy == RoutingStrategy.SMART:
            strategy = self._select_optimal_strategy(market_analysis, order, config)
        else:
            strategy = config.strategy
        
        # Execute routing strategy
        if strategy == RoutingStrategy.DIRECT:
            return await self._direct_routing(order, config)
        elif strategy == RoutingStrategy.TWAP:
            return await self._twap_routing(order, config, market_analysis)
        elif strategy == RoutingStrategy.VWAP:
            return await self._vwap_routing(order, config, market_analysis)
        elif strategy == RoutingStrategy.ICEBERG:
            return await self._iceberg_routing(order, config)
        elif strategy == RoutingStrategy.SNIPER:
            return await self._sniper_routing(order, config, market_analysis)
        else:
            return await self._direct_routing(order, config)
    
    async def _analyze_market_conditions(self, symbol: str) -> Dict[str, Any]:
        """Analyze current market conditions for routing decisions."""
        # Get orderbook depth
        orderbook = await self.client.get_orderbook(symbol, limit=50)
        
        # Calculate spread and depth
        best_bid = float(orderbook['result']['b'][0][0])
        best_ask = float(orderbook['result']['a'][0][0])
        spread = (best_ask - best_bid) / best_bid
        
        # Calculate market depth
        bid_depth = sum(float(level[1]) for level in orderbook['result']['b'][:10])
        ask_depth = sum(float(level[1]) for level in orderbook['result']['a'][:10])
        
        # Get recent trades for volatility analysis
        recent_trades = await self.client.get_recent_trades(symbol, limit=100)
        
        # Calculate volatility
        prices = [float(trade['price']) for trade in recent_trades['result']['list']]
        volatility = self._calculate_volatility(prices)
        
        # Get volume profile
        volume_24h = await self._get_24h_volume(symbol)
        
        return {
            'spread': spread,
            'bid_depth': bid_depth,
            'ask_depth': ask_depth,
            'volatility': volatility,
            'volume_24h': volume_24h,
            'market_impact': self._estimate_market_impact(symbol, bid_depth, ask_depth)
        }
    
    def _select_optimal_strategy(self, market_analysis: Dict[str, Any], 
                               order: Dict[str, Any], config: RoutingConfig) -> RoutingStrategy:
        """Select optimal routing strategy based on market conditions."""
        quantity = float(order['qty'])
        
        # High urgency orders
        if config.urgency == OrderUrgency.IMMEDIATE:
            return RoutingStrategy.DIRECT
        
        # Large orders in low liquidity
        if quantity > market_analysis['bid_depth'] * 0.5:
            if market_analysis['volatility'] > 0.02:  # High volatility
                return RoutingStrategy.TWAP
            else:
                return RoutingStrategy.ICEBERG
        
        # Medium orders with time flexibility
        if config.time_limit and config.time_limit > 300:  # More than 5 minutes
            return RoutingStrategy.VWAP
        
        # Small orders or tight spreads
        if market_analysis['spread'] < 0.001:  # Tight spread
            return RoutingStrategy.DIRECT
        
        # Default to TWAP for balanced execution
        return RoutingStrategy.TWAP
``` -->

## TWAP (Time-Weighted Average Price) Routing

```python
class TWAPRouter:
    def __init__(self, client: BybitClient):
        self.client = client
    
    async def execute_twap(self, order: Dict[str, Any], config: RoutingConfig, 
                          market_analysis: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Execute TWAP routing strategy."""
        symbol = order['symbol']
        side = order['side']
        total_quantity = float(order['qty'])
        time_limit = config.time_limit or 3600  # Default 1 hour
        
        # Calculate execution parameters
        num_slices = min(20, max(5, time_limit // 60))  # 1 slice per minute, max 20
        slice_quantity = total_quantity / num_slices
        slice_interval = time_limit / num_slices
        
        executed_orders = []
        remaining_quantity = total_quantity
        
        for i in range(num_slices):
            if remaining_quantity <= 0:
                break
            
            # Adjust slice size for remaining quantity
            current_slice = min(slice_quantity, remaining_quantity)
            
            # Add randomization to avoid predictable patterns
            randomization = 0.8 + (0.4 * (i % 3) / 2)  # 80%-120% of slice size
            current_slice *= randomization
            current_slice = min(current_slice, remaining_quantity)
            
            # Execute slice
            slice_order = {
                'symbol': symbol,
                'side': side,
                'orderType': 'Market',
                'qty': str(current_slice),
                'timeInForce': 'IOC'  # Immediate or Cancel
            }
            
            try:
                result = await self.client.place_order(**slice_order)
                executed_orders.append(result)
                
                # Update remaining quantity
                filled_qty = float(result.get('result', {}).get('qty', 0))
                remaining_quantity -= filled_qty
                
                # Wait for next slice (except last one)
                if i < num_slices - 1 and remaining_quantity > 0:
                    await asyncio.sleep(slice_interval)
                    
            except Exception as e:
                print(f"TWAP slice {i+1} failed: {str(e)}")
                # Continue with next slice
                continue
        
        return executed_orders
``` -->

## VWAP (Volume-Weighted Average Price) Routing

```python
class VWAPRouter:
    def __init__(self, client: BybitClient, market_data: MarketDataProvider):
        self.client = client
        self.market_data = market_data
    
    async def execute_vwap(self, order: Dict[str, Any], config: RoutingConfig,
                          market_analysis: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Execute VWAP routing strategy."""
        symbol = order['symbol']
        side = order['side']
        total_quantity = float(order['qty'])
        time_limit = config.time_limit or 3600
        
        # Get historical volume profile
        volume_profile = await self._get_volume_profile(symbol, time_limit)
        
        # Calculate execution schedule based on volume profile
        execution_schedule = self._calculate_vwap_schedule(
            total_quantity, volume_profile, time_limit
        )
        
        executed_orders = []
        remaining_quantity = total_quantity
        
        for schedule_item in execution_schedule:
            if remaining_quantity <= 0:
                break
            
            target_quantity = min(schedule_item['quantity'], remaining_quantity)
            target_time = schedule_item['time']
            
            # Wait until target time
            current_time = time.time()
            if target_time > current_time:
                await asyncio.sleep(target_time - current_time)
            
            # Execute order slice
            slice_order = {
                'symbol': symbol,
                'side': side,
                'orderType': 'Market',
                'qty': str(target_quantity),
                'timeInForce': 'IOC'
            }
            
            try:
                result = await self.client.place_order(**slice_order)
                executed_orders.append(result)
                
                filled_qty = float(result.get('result', {}).get('qty', 0))
                remaining_quantity -= filled_qty
                
            except Exception as e:
                print(f"VWAP slice failed: {str(e)}")
                continue
        
        return executed_orders
    
    async def _get_volume_profile(self, symbol: str, time_window: int) -> List[Dict[str, Any]]:
        """Get historical volume profile for VWAP calculation."""
        # Get historical kline data
        end_time = int(time.time() * 1000)
        start_time = end_time - (time_window * 1000)
        
        klines = await self.client.get_kline(
            symbol=symbol,
            interval='1',  # 1 minute intervals
            start=start_time,
            end=end_time,
            limit=1000
        )
        
        volume_profile = []
        for kline in klines['result']['list']:
            volume_profile.append({
                'timestamp': int(kline[0]),
                'volume': float(kline[5]),
                'open': float(kline[1]),
                'high': float(kline[2]),
                'low': float(kline[3]),
                'close': float(kline[4])
            })
        
        return volume_profile
    
    def _calculate_vwap_schedule(self, total_quantity: float, 
                               volume_profile: List[Dict[str, Any]], 
                               time_limit: int) -> List[Dict[str, Any]]:
        """Calculate execution schedule based on volume profile."""
        total_volume = sum(item['volume'] for item in volume_profile)
        
        schedule = []
        current_time = time.time()
        
        for i, profile_item in enumerate(volume_profile):
            # Calculate proportion of total volume
            volume_proportion = profile_item['volume'] / total_volume
            
            # Calculate quantity for this time slice
            slice_quantity = total_quantity * volume_proportion
            
            # Calculate execution time
            time_proportion = i / len(volume_profile)
            execution_time = current_time + (time_limit * time_proportion)
            
            schedule.append({
                'time': execution_time,
                'quantity': slice_quantity,
                'volume_weight': volume_proportion
            })
        
        return schedule
``` -->

## Iceberg Order Routing

```python
class IcebergRouter:
    def __init__(self, client: BybitClient):
        self.client = client
    
    async def execute_iceberg(self, order: Dict[str, Any], 
                            config: RoutingConfig) -> List[Dict[str, Any]]:
        """Execute iceberg order routing."""
        symbol = order['symbol']
        side = order['side']
        total_quantity = float(order['qty'])
        price = order.get('price')
        
        # Calculate iceberg parameters
        visible_quantity = config.chunk_size or (total_quantity * 0.1)  # 10% visible
        visible_quantity = max(visible_quantity, config.min_fill_size or 0.001)
        
        executed_orders = []
        remaining_quantity = total_quantity
        
        while remaining_quantity > 0:
            # Calculate current slice size
            current_slice = min(visible_quantity, remaining_quantity)
            
            # Prepare order
            iceberg_order = {
                'symbol': symbol,
                'side': side,
                'orderType': 'Limit' if price else 'Market',
                'qty': str(current_slice),
                'timeInForce': 'GTC'  # Good Till Cancelled
            }
            
            if price:
                iceberg_order['price'] = str(price)
            
            try:
                # Place order
                result = await self.client.place_order(**iceberg_order)
                order_id = result['result']['orderId']
                
                # Monitor order execution
                filled_quantity = await self._monitor_order_execution(
                    order_id, symbol, config.time_limit
                )
                
                executed_orders.append(result)
                remaining_quantity -= filled_quantity
                
                # Add delay between slices to avoid detection
                if remaining_quantity > 0:
                    await asyncio.sleep(5 + (10 * (len(executed_orders) % 3)))
                
            except Exception as e:
                print(f"Iceberg slice failed: {str(e)}")
                break
        
        return executed_orders
    
    async def _monitor_order_execution(self, order_id: str, symbol: str, 
                                     time_limit: Optional[int]) -> float:
        """Monitor order execution and return filled quantity."""
        start_time = time.time()
        timeout = time_limit or 300  # Default 5 minutes
        
        while time.time() - start_time < timeout:
            try:
                order_status = await self.client.get_order_status(
                    orderId=order_id, symbol=symbol
                )
                
                status = order_status['result']['orderStatus']
                filled_qty = float(order_status['result']['cumExecQty'])
                
                if status in ['Filled', 'Cancelled', 'Rejected']:
                    return filled_qty
                
                await asyncio.sleep(1)  # Check every second
                
            except Exception as e:
                print(f"Error monitoring order {order_id}: {str(e)}")
                await asyncio.sleep(5)
        
        # Timeout reached, cancel order
        try:
            await self.client.cancel_order(orderId=order_id, symbol=symbol)
        except:
            pass
        
        return 0.0
``` -->

## Sniper Routing (Liquidity Detection)

```python
class SniperRouter:
    def __init__(self, client: BybitClient, market_data: MarketDataProvider):
        self.client = client
        self.market_data = market_data
    
    async def execute_sniper(self, order: Dict[str, Any], config: RoutingConfig,
                           market_analysis: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Execute sniper routing for optimal liquidity capture."""
        symbol = order['symbol']
        side = order['side']
        total_quantity = float(order['qty'])
        
        # Monitor orderbook for liquidity opportunities
        liquidity_events = await self._detect_liquidity_events(symbol, config)
        
        executed_orders = []
        remaining_quantity = total_quantity
        
        for event in liquidity_events:
            if remaining_quantity <= 0:
                break
            
            # Calculate optimal order size for this liquidity event
            optimal_size = min(
                event['available_liquidity'] * config.participation_rate,
                remaining_quantity
            )
            
            if optimal_size < config.min_fill_size:
                continue
            
            # Execute sniper order
            sniper_order = {
                'symbol': symbol,
                'side': side,
                'orderType': 'Limit',
                'qty': str(optimal_size),
                'price': str(event['price']),
                'timeInForce': 'IOC'  # Immediate execution
            }
            
            try:
                result = await self.client.place_order(**sniper_order)
                executed_orders.append(result)
                
                filled_qty = float(result.get('result', {}).get('qty', 0))
                remaining_quantity -= filled_qty
                
            except Exception as e:
                print(f"Sniper order failed: {str(e)}")
                continue
        
        # Execute remaining quantity with market order if needed
        if remaining_quantity > 0:
            market_order = {
                'symbol': symbol,
                'side': side,
                'orderType': 'Market',
                'qty': str(remaining_quantity),
                'timeInForce': 'IOC'
            }
            
            try:
                result = await self.client.place_order(**market_order)
                executed_orders.append(result)
            except Exception as e:
                print(f"Final market order failed: {str(e)}")
        
        return executed_orders
    
    async def _detect_liquidity_events(self, symbol: str, 
                                     config: RoutingConfig) -> List[Dict[str, Any]]:
        """Detect optimal liquidity events for execution."""
        events = []
        monitoring_time = min(config.time_limit or 300, 300)  # Max 5 minutes
        
        start_time = time.time()
        
        while time.time() - start_time < monitoring_time:
            try:
                # Get current orderbook
                orderbook = await self.client.get_orderbook(symbol, limit=20)
                
                # Analyze liquidity patterns
                liquidity_analysis = self._analyze_liquidity_patterns(orderbook)
                
                # Detect significant liquidity events
                if liquidity_analysis['liquidity_score'] > 0.7:
                    events.append({
                        'timestamp': time.time(),
                        'price': liquidity_analysis['optimal_price'],
                        'available_liquidity': liquidity_analysis['available_quantity'],
                        'liquidity_score': liquidity_analysis['liquidity_score']
                    })
                
                await asyncio.sleep(0.1)  # High-frequency monitoring
                
            except Exception as e:
                print(f"Liquidity detection error: {str(e)}")
                await asyncio.sleep(1)
        
        # Sort events by liquidity score
        events.sort(key=lambda x: x['liquidity_score'], reverse=True)
        
        return events[:10]  # Return top 10 events
    
    def _analyze_liquidity_patterns(self, orderbook: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze orderbook for liquidity patterns."""
        bids = orderbook['result']['b']
        asks = orderbook['result']['a']
        
        # Calculate depth and concentration
        total_bid_volume = sum(float(level[1]) for level in bids)
        total_ask_volume = sum(float(level[1]) for level in asks)
        
        # Find largest liquidity concentrations
        max_bid_level = max(bids, key=lambda x: float(x[1]))
        max_ask_level = max(asks, key=lambda x: float(x[1]))
        
        # Calculate liquidity score based on concentration and spread
        best_bid = float(bids[0][0])
        best_ask = float(asks[0][0])
        spread = (best_ask - best_bid) / best_bid
        
        # Higher score for tighter spreads and higher concentrations
        liquidity_score = (1 / (1 + spread)) * 0.5 + \
                         (float(max_bid_level[1]) / total_bid_volume) * 0.3 + \
                         (float(max_ask_level[1]) / total_ask_volume) * 0.2
        
        return {
            'liquidity_score': liquidity_score,
            'optimal_price': float(max_bid_level[0]),
            'available_quantity': float(max_bid_level[1]),
            'spread': spread
        }
``` -->

## Performance Monitoring

```python
class RoutingPerformanceMonitor:
    def __init__(self):
        self.execution_metrics = []
    
    def record_execution(self, order: Dict[str, Any], executed_orders: List[Dict[str, Any]],
                        start_time: float, end_time: float, config: RoutingConfig):
        """Record execution metrics for performance analysis."""
        total_filled = sum(float(o.get('result', {}).get('cumExecQty', 0)) 
                          for o in executed_orders)
        
        # Calculate average execution price
        total_value = sum(
            float(o.get('result', {}).get('cumExecQty', 0)) * 
            float(o.get('result', {}).get('avgPrice', 0))
            for o in executed_orders
        )
        avg_price = total_value / total_filled if total_filled > 0 else 0
        
        metrics = {
            'timestamp': start_time,
            'symbol': order['symbol'],
            'side': order['side'],
            'strategy': config.strategy.value,
            'target_quantity': float(order['qty']),
            'filled_quantity': total_filled,
            'fill_rate': total_filled / float(order['qty']),
            'execution_time': end_time - start_time,
            'average_price': avg_price,
            'num_orders': len(executed_orders),
            'urgency': config.urgency.value
        }
        
        self.execution_metrics.append(metrics)
    
    def get_performance_summary(self, days: int = 30) -> Dict[str, Any]:
        """Get performance summary for the specified period."""
        cutoff_time = time.time() - (days * 24 * 3600)
        recent_metrics = [m for m in self.execution_metrics if m['timestamp'] > cutoff_time]
        
        if not recent_metrics:
            return {}
        
        # Calculate summary statistics
        total_executions = len(recent_metrics)
        avg_fill_rate = sum(m['fill_rate'] for m in recent_metrics) / total_executions
        avg_execution_time = sum(m['execution_time'] for m in recent_metrics) / total_executions
        
        # Strategy performance breakdown
        strategy_performance = {}
        for strategy in RoutingStrategy:
            strategy_metrics = [m for m in recent_metrics if m['strategy'] == strategy.value]
            if strategy_metrics:
                strategy_performance[strategy.value] = {
                    'executions': len(strategy_metrics),
                    'avg_fill_rate': sum(m['fill_rate'] for m in strategy_metrics) / len(strategy_metrics),
                    'avg_execution_time': sum(m['execution_time'] for m in strategy_metrics) / len(strategy_metrics)
                }
        
        return {
            'period_days': days,
            'total_executions': total_executions,
            'average_fill_rate': avg_fill_rate,
            'average_execution_time': avg_execution_time,
            'strategy_performance': strategy_performance
        }
``` -->

## Usage Examples

```python
async def main():
    # Initialize components
    client = BybitClient(config)
    market_data = MarketDataProvider()
    router = SmartOrderRouter(client, market_data)
    
    # Configure routing
    routing_config = RoutingConfig(
        strategy=RoutingStrategy.SMART,
        urgency=OrderUrgency.MEDIUM,
        max_slippage=0.002,
        time_limit=1800,  # 30 minutes
        participation_rate=0.15
    )
    
    # Large order example
    large_order = {
        'symbol': 'BTCUSDT',
        'side': 'Buy',
        'qty': '10.0',
        'orderType': 'Market'
    }
    
    # Execute with smart routing
    start_time = time.time()
    executed_orders = await router.route_order(large_order, routing_config)
    end_time = time.time()
    
    print(f"Executed {len(executed_orders)} orders in {end_time - start_time:.2f} seconds")
    
    # Monitor performance
    monitor = RoutingPerformanceMonitor()
    monitor.record_execution(large_order, executed_orders, start_time, end_time, routing_config)
    
    # Get performance summary
    performance = monitor.get_performance_summary(7)  # Last 7 days
    print(f"Average fill rate: {performance.get('average_fill_rate', 0):.2%}")

if __name__ == "__main__":
    asyncio.run(main())
``` -->

This comprehensive order routing system provides sophisticated execution algorithms optimized for different market conditions and order characteristics, ensuring optimal execution quality while minimizing market impact.
