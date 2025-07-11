---
layout: page
---

# 现货 API

<GlobalAuth />

## 创建现货订单
Returns spot order id and order link id. Result is described here.
https://bybit-exchange.github.io/docs/v5/order/create-order

! Need access token in bearer token authorization

<InteractiveSpotAPIEndpoint1 />

## 取消现货订单
Returns spot order id and order link id. Result is described here.
https://bybit-exchange.github.io/docs/v5/order/cancel-order

! Need access token in bearer token authorization

<InteractiveSpotAPIEndpoint2 />

## 列出现货订单历史
https://bybit-exchange.github.io/docs/v5/order/order-list

! Need access token in bearer token authorization

<InteractiveSpotAPIEndpoint3 />

## 列出现货未结订单
https://bybit-exchange.github.io/docs/v5/order/open-order

! Need access token in bearer token authorization

<InteractiveSpotAPIEndpoint4 />

## 列出现货交易历史
https://bybit-exchange.github.io/docs/v5/order/execution

! Need access token in bearer token authorization

<InteractiveSpotAPIEndpoint5 />

<script setup>
import InteractiveSpotAPIEndpoint1 from '../../.vitepress/theme/components/InteractiveSpotAPIEndpoint1.vue'
import InteractiveSpotAPIEndpoint2 from '../../.vitepress/theme/components/InteractiveSpotAPIEndpoint2.vue'
import InteractiveSpotAPIEndpoint3 from '../../.vitepress/theme/components/InteractiveSpotAPIEndpoint3.vue'
import InteractiveSpotAPIEndpoint4 from '../../.vitepress/theme/components/InteractiveSpotAPIEndpoint4.vue'
import InteractiveSpotAPIEndpoint5 from '../../.vitepress/theme/components/InteractiveSpotAPIEndpoint5.vue'
import GlobalAuth from '../../.vitepress/theme/components/GlobalAuth.vue'
import SimpleOutline from '../../.vitepress/theme/components/SimpleOutline.vue'
</script>

<SimpleOutline :items="[
  { text: 'Create spot order', anchor: '#create-spot-order' },
  { text: 'Cancel spot order', anchor: '#cancel-spot-order' },
  { text: 'List spot orders history', anchor: '#list-spot-orders-history' },
  { text: 'List spot open orders', anchor: '#list-spot-open-orders' },
  { text: 'List spot trades history', anchor: '#list-spot-trades-history' }
]" />
