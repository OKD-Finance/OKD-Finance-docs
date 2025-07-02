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
  width: 220px;
  background: var(--bybit-bg, #ffffff);
  border: 1px solid var(--bybit-border, #e9ecef);
  border-radius: var(--bybit-radius-lg, 12px);
  padding: 1.5rem;
  z-index: 1000;
  box-shadow: var(--bybit-shadow-lg, 0 4px 20px rgba(0, 0, 0, 0.15));
  max-height: 70vh;
  overflow-y: auto;
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;
}

.simple-outline:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.simple-outline h4 {
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--bybit-text-primary, #212529);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: 'JetBrains Mono', Monaco, monospace;
}

.outline-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.outline-nav li {
  margin-bottom: 0.5rem;
}

.outline-nav a {
  display: block;
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  color: var(--bybit-text-secondary, #6c757d);
  text-decoration: none;
  border-radius: var(--bybit-radius, 8px);
  transition: all 0.2s ease;
  line-height: 1.4;
  font-weight: 500;
  border: 1px solid transparent;
  font-family: 'JetBrains Mono', Monaco, monospace;
}

.outline-nav a:hover {
  background: var(--bybit-bg-secondary, #f8f9fa);
  color: var(--bybit-primary, #f7931a);
  border-color: var(--bybit-border, #e9ecef);
  transform: translateX(4px);
}

.outline-nav a:active {
  background: var(--bybit-primary, #f7931a);
  color: white;
  transform: translateX(2px);
}

/* Dark theme support */
.dark .simple-outline {
  background: var(--bybit-bg-secondary);
  border-color: var(--bybit-border);
}

.dark .simple-outline h4 {
  color: var(--bybit-text-primary);
}

.dark .outline-nav a {
  color: var(--bybit-text-secondary);
}

.dark .outline-nav a:hover {
  background: var(--bybit-bg-tertiary);
  color: var(--bybit-primary);
}

/* Custom scrollbar for outline */
.simple-outline::-webkit-scrollbar {
  width: 6px;
}

.simple-outline::-webkit-scrollbar-track {
  background: var(--bybit-bg-secondary);
  border-radius: 3px;
}

.simple-outline::-webkit-scrollbar-thumb {
  background: var(--bybit-border);
  border-radius: 3px;
}

.simple-outline::-webkit-scrollbar-thumb:hover {
  background: var(--bybit-primary);
}

@media (max-width: 1200px) {
  .simple-outline {
    right: 10px;
    width: 200px;
  }
}

@media (max-width: 768px) {
  .simple-outline {
    position: relative;
    top: auto;
    right: auto;
    width: 100%;
    margin: 1.5rem 0;
    transform: none;
  }
  
  .simple-outline:hover {
    transform: none;
  }
}
</style> 