---
layout: page
---

# Spot API

<InteractiveSpotAPI />

## Create spot order
Returns spot order id and order link id. Result is described here.
https://bybit-exchange.github.io/docs/v5/order/create-order

! Need access token in bearer token authorization

<InteractiveSpotAPIEndpoint1 />

## Cancel spot order
Returns spot order id and order link id. Result is described here.
https://bybit-exchange.github.io/docs/v5/order/cancel-order

! Need access token in bearer token authorization

<InteractiveSpotAPIEndpoint2 />

## List spot orders history
https://bybit-exchange.github.io/docs/v5/order/order-list

! Need access token in bearer token authorization

<InteractiveSpotAPIEndpoint3 />

## List spot open orders
https://bybit-exchange.github.io/docs/v5/order/open-order

! Need access token in bearer token authorization

<InteractiveSpotAPIEndpoint4 />

## List spot trades history
https://bybit-exchange.github.io/docs/v5/order/execution

! Need access token in bearer token authorization

<InteractiveSpotAPIEndpoint5 />

<script setup>
import InteractiveSpotAPI from '../../.vitepress/theme/components/InteractiveSpotAPI.vue'
import InteractiveSpotAPIEndpoint1 from '../../.vitepress/theme/components/InteractiveSpotAPIEndpoint1.vue'
import InteractiveSpotAPIEndpoint2 from '../../.vitepress/theme/components/InteractiveSpotAPIEndpoint2.vue'
import InteractiveSpotAPIEndpoint3 from '../../.vitepress/theme/components/InteractiveSpotAPIEndpoint3.vue'
import InteractiveSpotAPIEndpoint4 from '../../.vitepress/theme/components/InteractiveSpotAPIEndpoint4.vue'
import InteractiveSpotAPIEndpoint5 from '../../.vitepress/theme/components/InteractiveSpotAPIEndpoint5.vue'
import SimpleOutline from '../../.vitepress/theme/components/SimpleOutline.vue'
</script>

<SimpleOutline :items="[
  { text: 'Create spot order', anchor: '#create-spot-order' },
  { text: 'Cancel spot order', anchor: '#cancel-spot-order' },
  { text: 'List spot orders history', anchor: '#list-spot-orders-history' },
  { text: 'List spot open orders', anchor: '#list-spot-open-orders' },
  { text: 'List spot trades history', anchor: '#list-spot-trades-history' }
]" />
