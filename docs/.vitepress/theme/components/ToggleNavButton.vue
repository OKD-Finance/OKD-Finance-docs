<template>
  <button 
    class="nav-toggle-btn"
    @click="toggleNavigation"
    :title="isNavVisible ? 'Скрыть навигацию (Ctrl+H)' : 'Показать навигацию (Ctrl+H)'"
    :style="buttonPosition"
  >
    <svg v-if="isNavVisible" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 13H5v-2h14v2z"/>
    </svg>
    <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </svg>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const isNavVisible = ref(true)
let toggleNavigation

const buttonPosition = computed(() => {
  const sidebarWidth = 240; // Default VitePress sidebar width
  const buttonMargin = 20; // Margin from the edge
  return {
    left: isNavVisible.value ? `${sidebarWidth + buttonMargin}px` : `${buttonMargin}px`,
    top: '80px', // Keep it at a consistent top position
    zIndex: '9999' // Ensure it's above most content
  }
})

onMounted(() => {
  if (typeof window !== 'undefined' && window.navigationController) {
    isNavVisible.value = window.navigationController.isNavVisible
    toggleNavigation = window.navigationController.toggleNavigation
    
    // Listen for changes to isNavVisible from the global controller
    const interval = setInterval(() => {
      if (window.navigationController && isNavVisible.value !== window.navigationController.isNavVisible) {
        isNavVisible.value = window.navigationController.isNavVisible
      }
    }, 100) // Poll every 100ms

    onUnmounted(() => {
      clearInterval(interval)
    })

  } else {
    // Fallback if navigationController is not available
    console.warn('window.navigationController not found. Toggle button may not function correctly.')
    toggleNavigation = () => {
      console.warn('toggleNavigation not available.')
    }
  }
})
</script>

<style scoped>
.nav-toggle-btn {
  position: fixed; /* Re-added fixed positioning */
  background-color: var(--vp-c-bg, #ffffff);
  border: 1px solid var(--vp-c-border, #e9ecef);
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, border-color 0.3s, box-shadow 0.3s, left 0.3s ease; /* Added transition for left property */
}

.nav-toggle-btn:hover {
  background-color: var(--vp-c-bg-hover, #f0f0f0);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.nav-toggle-btn svg {
  display: block;
  color: var(--vp-c-text-1, #333);
}

/* No longer need media queries for positioning, as it's handled by JS */
</style> 