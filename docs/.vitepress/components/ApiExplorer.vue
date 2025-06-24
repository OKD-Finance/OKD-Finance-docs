<template>
  <div class="api-explorer">
    <iframe :src="iframeSrc" frameborder="0" width="100%" height="800px"></iframe>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  tag?: string
}>();

const iframeSrc = computed(() => {
  const basePath = import.meta.env.BASE_URL || '';
  if (props.tag) {
    return `${basePath}swagger-ui/index.html?tag=${props.tag}`;
  } else {
    return `${basePath}swagger-ui/index.html`;
  }
});

// No script logic needed for a simple iframe wrapper
</script>

<style scoped>
.api-explorer {
  margin-top: 2rem;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

iframe {
  display: block;
}
</style>