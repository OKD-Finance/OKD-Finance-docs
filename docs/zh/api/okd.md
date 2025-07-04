---
layout: page
---

# OKD API

<GlobalAuth />

## 发送反馈。
No description available

<InteractiveOKDAPIEndpoint1 />

## 发送私人反馈。
! Need access token in bearer token authorization

<InteractiveOKDAPIEndpoint2 />

## 发送问题。
No description available

<InteractiveOKDAPIEndpoint3 />

## 列出热门资产。
No description available

<InteractiveOKDAPIEndpoint4 />

<script setup>
import InteractiveOKDAPIEndpoint1 from '../../.vitepress/theme/components/InteractiveOKDAPIEndpoint1.vue'
import InteractiveOKDAPIEndpoint2 from '../../.vitepress/theme/components/InteractiveOKDAPIEndpoint2.vue'
import InteractiveOKDAPIEndpoint3 from '../../.vitepress/theme/components/InteractiveOKDAPIEndpoint3.vue'
import InteractiveOKDAPIEndpoint4 from '../../.vitepress/theme/components/InteractiveOKDAPIEndpoint4.vue'
import GlobalAuth from '../../.vitepress/theme/components/GlobalAuth.vue'
import SimpleOutline from '../../.vitepress/theme/components/SimpleOutline.vue'
</script>

<SimpleOutline :items="[
  { text: 'Send feedback.', anchor: '#send-feedback' },
  { text: 'Send private feedback.', anchor: '#send-private-feedback' },
  { text: 'Send question.', anchor: '#send-question' },
  { text: 'List top assets.', anchor: '#list-top-assets' }
]" />
