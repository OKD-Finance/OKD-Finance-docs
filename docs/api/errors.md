---
layout: page
---

# Errors API

<InteractiveErrorsAPI />

## Errors list.
No description available

<InteractiveErrorsAPIEndpoint1 />

<script setup>
import InteractiveErrorsAPI from '../.vitepress/theme/components/InteractiveErrorsAPI.vue'
import InteractiveErrorsAPIEndpoint1 from '../.vitepress/theme/components/InteractiveErrorsAPIEndpoint1.vue'
import SimpleOutline from '../.vitepress/theme/components/SimpleOutline.vue'
</script>

<SimpleOutline :items="[
  { text: 'Errors list.', anchor: '#errors-list' }
]" />
