<template>
  <div class="simple-outline">
    <h4>📋 On this page</h4>
    <nav class="outline-nav">
      <ul>
        <li v-for="item in outlineItems" :key="item.anchor">
          <a :href="item.anchor" @click="scrollToSection(item.anchor)">
            {{ item.text }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const outlineItems = ref([])

const scrollToSection = (anchor) => {
  const element = document.querySelector(anchor)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  if (props.items && props.items.length > 0) {
    outlineItems.value = props.items
  } else {
    // Auto-detect headings if no items provided
    const headings = document.querySelectorAll('h2[id], h3[id]')
    outlineItems.value = Array.from(headings).map(heading => ({
      text: heading.textContent,
      anchor: '#' + heading.id
    }))
  }
})
</script>

<style scoped>
.simple-outline {
  position: fixed;
  top: 80px;
  right: 20px;
  width: 200px;
  background: var(--vp-c-bg, #ffffff);
  border: 1px solid var(--vp-c-border, #e2e8f0);
  border-radius: 8px;
  padding: 16px;
  z-index: 1000;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  max-height: 70vh;
  overflow-y: auto;
}

.simple-outline h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1, #213547);
}

.outline-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.outline-nav li {
  margin-bottom: 4px;
}

.outline-nav a {
  display: block;
  padding: 4px 8px;
  font-size: 13px;
  color: var(--vp-c-text-2, #476582);
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.2s;
  line-height: 1.4;
}

.outline-nav a:hover {
  background: var(--vp-c-bg-soft, #f6f6f7);
  color: var(--vp-c-brand, #3eaf7c);
}

@media (max-width: 768px) {
  .simple-outline {
    position: relative;
    top: auto;
    right: auto;
    width: 100%;
    margin: 20px 0;
  }
}
</style> 