---
layout: page
---

# User API

<InteractiveUserAPI />

## Set Profile Flags
Update user profile flags and preferences

<InteractiveUserAPIEndpoint1 />

## Subscribe to Notifications
Subscribe or unsubscribe from various notification types

<InteractiveUserAPIEndpoint2 />

## Subscribe to Profile Events
Subscribe to profile-related events and updates

<InteractiveUserAPIEndpoint3 />

<script setup>
import InteractiveUserAPI from '../.vitepress/theme/components/InteractiveUserAPI.vue'
import InteractiveUserAPIEndpoint1 from '../.vitepress/theme/components/InteractiveUserAPIEndpoint1.vue'
import InteractiveUserAPIEndpoint2 from '../.vitepress/theme/components/InteractiveUserAPIEndpoint2.vue'
import InteractiveUserAPIEndpoint3 from '../.vitepress/theme/components/InteractiveUserAPIEndpoint3.vue'
import SimpleOutline from '../.vitepress/theme/components/SimpleOutline.vue'
</script>

<SimpleOutline :items="[
  { text: 'Set Profile Flags', anchor: '#set-profile-flags' },
  { text: 'Subscribe to Notifications', anchor: '#subscribe-to-notifications' },
  { text: 'Subscribe to Profile Events', anchor: '#subscribe-to-profile-events' }
]" />
