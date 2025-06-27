---
layout: page
---

# Trading API

<InteractiveTradingAPI />

## Place Spot Order
Place a new spot trading order

<InteractiveTradingAPIEndpoint1 />

## Get Orders
Retrieve list of trading orders

<InteractiveTradingAPIEndpoint2 />

## Cancel Order
Cancel an existing trading order

<InteractiveTradingAPIEndpoint3 />

<script setup>
import InteractiveTradingAPI from '../.vitepress/theme/components/InteractiveTradingAPI.vue'
import InteractiveTradingAPIEndpoint1 from '../.vitepress/theme/components/InteractiveTradingAPIEndpoint1.vue'
import InteractiveTradingAPIEndpoint2 from '../.vitepress/theme/components/InteractiveTradingAPIEndpoint2.vue'
import InteractiveTradingAPIEndpoint3 from '../.vitepress/theme/components/InteractiveTradingAPIEndpoint3.vue'
import SimpleOutline from '../.vitepress/theme/components/SimpleOutline.vue'
</script>

<SimpleOutline :items="[
  { text: 'Place Spot Order', anchor: '#place-spot-order' },
  { text: 'Get Orders', anchor: '#get-orders' },
  { text: 'Cancel Order', anchor: '#cancel-order' }
]" />
