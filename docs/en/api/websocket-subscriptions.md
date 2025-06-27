---
layout: page
---

# Websocket subscriptions API

<GlobalAuth />

## Authorize websocket connection.
Request is **{"path": "authorization", "payload": {"accessToken": "", "fingerprint": ""}}**.

<InteractiveWebsocketsubscriptionsAPIEndpoint1 />

## Do external market websocket operations. Payload contains bybit request.
https://bybit-exchange.github.io/docs/v5/ws/connect
Public:
"/external" request is  **("/external", {"direction": "spot"})
"/external" request is  **{"/external", {"op": "subscribe", "args": ["tickers.BTCUSDT", "tickers.BNBUSDT"]})}**.

Private:
"/authorization"
"/external" request is  **{"/external", {"direction": "private"}}**.
"/external" request is  **{"/external", {"op": "subscribe", "args": ["wallet", "order",  "position", "execution", "execution.fast"}**.

<InteractiveWebsocketsubscriptionsAPIEndpoint2 />

## Subscribe to symbols events.
Request is **{"path": "/symbols"}**. No need additional payload.

<InteractiveWebsocketsubscriptionsAPIEndpoint3 />

## Unsubscribe from websocket events.
Request is **{"path": "/unsubscribe", "payload": {"path": "/spot/order_events"}}**.
Payload "path" is path of some subscription.

<InteractiveWebsocketsubscriptionsAPIEndpoint4 />

## Subscribe to notifications.
Request is **{"path": "/user/notifications"}**. No need additional payload.
! Need authorization

<InteractiveWebsocketsubscriptionsAPIEndpoint5 />

## Subscribe to total balance events.
Request is **{"path": "/user/profile"}**. No need additional payload.
! Need authorization

<InteractiveWebsocketsubscriptionsAPIEndpoint6 />

<script setup>
import InteractiveWebsocketsubscriptionsAPIEndpoint1 from '../../.vitepress/theme/components/InteractiveWebsocketsubscriptionsAPIEndpoint1.vue'
import InteractiveWebsocketsubscriptionsAPIEndpoint2 from '../../.vitepress/theme/components/InteractiveWebsocketsubscriptionsAPIEndpoint2.vue'
import InteractiveWebsocketsubscriptionsAPIEndpoint3 from '../../.vitepress/theme/components/InteractiveWebsocketsubscriptionsAPIEndpoint3.vue'
import InteractiveWebsocketsubscriptionsAPIEndpoint4 from '../../.vitepress/theme/components/InteractiveWebsocketsubscriptionsAPIEndpoint4.vue'
import InteractiveWebsocketsubscriptionsAPIEndpoint5 from '../../.vitepress/theme/components/InteractiveWebsocketsubscriptionsAPIEndpoint5.vue'
import InteractiveWebsocketsubscriptionsAPIEndpoint6 from '../../.vitepress/theme/components/InteractiveWebsocketsubscriptionsAPIEndpoint6.vue'
import GlobalAuth from '../../.vitepress/theme/components/GlobalAuth.vue'
import SimpleOutline from '../../.vitepress/theme/components/SimpleOutline.vue'
</script>

<SimpleOutline :items="[
  { text: 'Authorize websocket connection.', anchor: '#authorize-websocket-connection' },
  { text: 'Do external market websocket operations. Payload contains bybit request. https://bybit-exchange.github.io/docs/v5/ws/connect', anchor: '#do-external-market-websocket-operations-payload-contains-bybit-request-httpsbybitexchangegithubiodocsv5wsconnect' },
  { text: 'Subscribe to symbols events.', anchor: '#subscribe-to-symbols-events' },
  { text: 'Unsubscribe from websocket events.', anchor: '#unsubscribe-from-websocket-events' },
  { text: 'Subscribe to notifications.', anchor: '#subscribe-to-notifications' },
  { text: 'Subscribe to total balance events.', anchor: '#subscribe-to-total-balance-events' }
]" />
