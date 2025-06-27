---
layout: page
---

# Managed API

<GlobalAuth />

## Login user for managed ID.
No description available

<InteractiveManagedAPIEndpoint1 />

## Creates user for managed ID.
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
