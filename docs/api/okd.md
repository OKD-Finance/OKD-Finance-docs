---
layout: page
---

# OKD API

<InteractiveOKDAPI />

## Send feedback.
No description available

<InteractiveOKDAPIEndpoint1 />

## Send private feedback.
! Need access token in bearer token authorization

<InteractiveOKDAPIEndpoint2 />

## Send question.
No description available

<InteractiveOKDAPIEndpoint3 />

## List top assets.
No description available

<InteractiveOKDAPIEndpoint4 />

<script setup>
import InteractiveOKDAPI from '../.vitepress/theme/components/InteractiveOKDAPI.vue'
import InteractiveOKDAPIEndpoint1 from '../.vitepress/theme/components/InteractiveOKDAPIEndpoint1.vue'
import InteractiveOKDAPIEndpoint2 from '../.vitepress/theme/components/InteractiveOKDAPIEndpoint2.vue'
import InteractiveOKDAPIEndpoint3 from '../.vitepress/theme/components/InteractiveOKDAPIEndpoint3.vue'
import InteractiveOKDAPIEndpoint4 from '../.vitepress/theme/components/InteractiveOKDAPIEndpoint4.vue'
import SimpleOutline from '../.vitepress/theme/components/SimpleOutline.vue'
</script>

<SimpleOutline :items="[
  { text: 'Send feedback.', anchor: '#send-feedback' },
  { text: 'Send private feedback.', anchor: '#send-private-feedback' },
  { text: 'Send question.', anchor: '#send-question' },
  { text: 'List top assets.', anchor: '#list-top-assets' }
]" />
