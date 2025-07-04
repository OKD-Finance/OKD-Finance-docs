---
layout: page
---

# 托管 API

<GlobalAuth />

## 使用托管 ID 登录用户。
No description available

<InteractiveManagedAPIEndpoint1 />

## 为托管 ID 创建用户。
No description available

<InteractiveManagedAPIEndpoint2 />

<script setup>
import InteractiveManagedAPIEndpoint1 from '../../.vitepress/theme/components/InteractiveManagedAPIEndpoint1.vue'
import InteractiveManagedAPIEndpoint2 from '../../.vitepress/theme/components/InteractiveManagedAPIEndpoint2.vue'
import GlobalAuth from '../../.vitepress/theme/components/GlobalAuth.vue'
import SimpleOutline from '../../.vitepress/theme/components/SimpleOutline.vue'
</script>

<SimpleOutline :items="[
  { text: 'Login user for managed ID.', anchor: '#login-user-for-managed-id' },
  { text: 'Creates user for managed ID.', anchor: '#creates-user-for-managed-id' }
]" />
