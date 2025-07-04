---
layout: page
---

# API Операций Пользователя

<GlobalAuth />

## Отменяет операцию по uuid.
! Need access token in bearer token authorization

<InteractiveUserOperationsAPIEndpoint1 />

## Подтверждает операцию по uuid и коду.
! Need access token in bearer token authorization

<InteractiveUserOperationsAPIEndpoint2 />

## Повторно отправляет код на email для указанной операции.
! Need access token in bearer token authorization

<InteractiveUserOperationsAPIEndpoint3 />

<script setup>
import InteractiveUserOperationsAPIEndpoint1 from '../../.vitepress/theme/components/InteractiveUserOperationsAPIEndpoint1.vue'
import InteractiveUserOperationsAPIEndpoint2 from '../../.vitepress/theme/components/InteractiveUserOperationsAPIEndpoint2.vue'
import InteractiveUserOperationsAPIEndpoint3 from '../../.vitepress/theme/components/InteractiveUserOperationsAPIEndpoint3.vue'
import GlobalAuth from '../../.vitepress/theme/components/GlobalAuth.vue'
import SimpleOutline from '../../.vitepress/theme/components/SimpleOutline.vue'
</script>

<SimpleOutline :items="[
  { text: 'Cancels operation by uuid.', anchor: '#cancels-operation-by-uuid' },
  { text: 'Confirms operation by uuid and code.', anchor: '#confirms-operation-by-uuid-and-code' },
  { text: 'Resends code to email for specified operation.', anchor: '#resends-code-to-email-for-specified-operation' }
]" />
