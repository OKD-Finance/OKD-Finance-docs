---
layout: page
---

# Bybit 代理 API

<GlobalAuth />

## 创建内部转账
Creates an internal transfer between different account types (spot, unified, etc.)
Returns transfer ID and status. Result is described here.
https://bybit-exchange.github.io/docs/v5/asset/transfer-inter-transfer

! Need access token in bearer token authorization

<InteractiveBybitproxyAPIEndpoint1 />

<script setup>
import InteractiveBybitproxyAPIEndpoint1 from '../../.vitepress/theme/components/InteractiveBybitproxyAPIEndpoint1.vue'
import GlobalAuth from '../../.vitepress/theme/components/GlobalAuth.vue'
import SimpleOutline from '../../.vitepress/theme/components/SimpleOutline.vue'
</script>

<SimpleOutline :items="[
  { text: 'Create internal transfer', anchor: '#create-internal-transfer' }
]" />
