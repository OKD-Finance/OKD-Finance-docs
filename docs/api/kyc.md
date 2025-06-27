---
layout: page
---

# KYC API

<InteractiveKYCAPI />

## POST /amlbot/callback
Receives callback messages during KYC procedure

<InteractiveKYCAPIEndpoint1 />

## Queries and returns temporary access token needed for KYC procedure.
! Need access token in bearer token authorization

<InteractiveKYCAPIEndpoint2 />

## POST /kyc/webhook
Receives webhook messages during KYC procedure

<InteractiveKYCAPIEndpoint3 />

<script setup>
import InteractiveKYCAPI from '../.vitepress/theme/components/InteractiveKYCAPI.vue'
import InteractiveKYCAPIEndpoint1 from '../.vitepress/theme/components/InteractiveKYCAPIEndpoint1.vue'
import InteractiveKYCAPIEndpoint2 from '../.vitepress/theme/components/InteractiveKYCAPIEndpoint2.vue'
import InteractiveKYCAPIEndpoint3 from '../.vitepress/theme/components/InteractiveKYCAPIEndpoint3.vue'
import SimpleOutline from '../.vitepress/theme/components/SimpleOutline.vue'
</script>

<SimpleOutline :items="[
  { text: 'POST /amlbot/callback', anchor: '#post-amlbotcallback' },
  { text: 'Queries and returns temporary access token needed for KYC procedure.', anchor: '#queries-and-returns-temporary-access-token-needed-for-kyc-procedure' },
  { text: 'POST /kyc/webhook', anchor: '#post-kycwebhook' }
]" />
