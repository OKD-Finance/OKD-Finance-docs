---
layout: page
---

# Errors API

<GlobalAuth />

## Errors list.
No description available

<InteractiveErrorsAPIEndpoint1 />

<script setup>
import InteractiveErrorsAPIEndpoint1 from '../../.vitepress/theme/components/InteractiveErrorsAPIEndpoint1.vue'
import GlobalAuth from '../../.vitepress/theme/components/GlobalAuth.vue'
import SimpleOutline from '../../.vitepress/theme/components/SimpleOutline.vue'
</script>

<SimpleOutline :items="[
  { text: 'Errors list.', anchor: '#errors-list' }
]" />
