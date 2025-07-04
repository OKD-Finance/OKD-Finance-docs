---
layout: page
---

# API Конфигурации Биржи

<GlobalAuth />

## Returns assets. Result is described here.
https://bybit-exchange.github.io/docs/v5/asset/coin-info
! Need access token in bearer token authorization

<InteractiveExchangeconfigurationAPIEndpoint1 />

## Returns networks (asset + chain) with trading/transaction states info.
No description available

<InteractiveExchangeconfigurationAPIEndpoint2 />

## GET /config/flags
Get global flags

<InteractiveExchangeconfigurationAPIEndpoint3 />

## Returns spot ticker + ticker info, where quoteCoin = USDC. Result is described here.
https://bybit-exchange.github.io/docs/v5/market/tickers
https://bybit-exchange.github.io/docs/v5/market/instrument

<InteractiveExchangeconfigurationAPIEndpoint4 />

## Returns spot ticker + ticker info. Result is described here.
https://bybit-exchange.github.io/docs/v5/market/tickers
https://bybit-exchange.github.io/docs/v5/market/instrument

<InteractiveExchangeconfigurationAPIEndpoint5 />

## Получить конфигурацию вывода средств для уровней KYC.
No description available

<InteractiveExchangeconfigurationAPIEndpoint6 />

<script setup>
import InteractiveExchangeconfigurationAPIEndpoint1 from '../../.vitepress/theme/components/InteractiveExchangeconfigurationAPIEndpoint1.vue'
import InteractiveExchangeconfigurationAPIEndpoint2 from '../../.vitepress/theme/components/InteractiveExchangeconfigurationAPIEndpoint2.vue'
import InteractiveExchangeconfigurationAPIEndpoint3 from '../../.vitepress/theme/components/InteractiveExchangeconfigurationAPIEndpoint3.vue'
import InteractiveExchangeconfigurationAPIEndpoint4 from '../../.vitepress/theme/components/InteractiveExchangeconfigurationAPIEndpoint4.vue'
import InteractiveExchangeconfigurationAPIEndpoint5 from '../../.vitepress/theme/components/InteractiveExchangeconfigurationAPIEndpoint5.vue'
import InteractiveExchangeconfigurationAPIEndpoint6 from '../../.vitepress/theme/components/InteractiveExchangeconfigurationAPIEndpoint6.vue'
import GlobalAuth from '../../.vitepress/theme/components/GlobalAuth.vue'
import SimpleOutline from '../../.vitepress/theme/components/SimpleOutline.vue'
</script>

<SimpleOutline :items="[
  { text: 'Returns assets. Result is described here. https://bybit-exchange.github.io/docs/v5/asset/coin-info', anchor: '#returns-assets-result-is-described-here-httpsbybitexchangegithubiodocsv5assetcoininfo' },
  { text: 'Returns networks (asset + chain) with trading/transaction states info.', anchor: '#returns-networks-asset-chain-with-tradingtransaction-states-info' },
  { text: 'GET /config/flags', anchor: '#get-configflags' },
  { text: 'Returns spot ticker + ticker info, where quoteCoin = USDC. Result is described here.', anchor: '#returns-spot-ticker-ticker-info-where-quotecoin-usdc-result-is-described-here' },
  { text: 'Returns spot ticker + ticker info. Result is described here.', anchor: '#returns-spot-ticker-ticker-info-result-is-described-here' },
  { text: 'Get withdrawal configuration for KYC levels.', anchor: '#get-withdrawal-configuration-for-kyc-levels' }
]" />
