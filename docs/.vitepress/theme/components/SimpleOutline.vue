<template>
  <div 
    class="simple-outline"
    :class="{ 'is-dragging': isDragging }"
    :style="{ 
      left: position.x + 'px', 
      top: position.y + 'px',
      right: 'auto'
    }"
  >
    <div 
      class="outline-header drag-handle"
      @mousedown="startDrag"
      @dblclick="resetPosition"
      :title="'Drag to move • Double-click to reset • ' + (isCollapsed ? 'Expand outline' : 'Collapse outline')"
    >
      <h4>📋 On this page</h4>
      <button @click="toggleOutline" class="outline-toggle-btn" :title="isCollapsed ? 'Expand outline' : 'Collapse outline'">
        {{ isCollapsed ? '+' : '−' }}
      </button>
    </div>
    <nav class="outline-nav" :class="{ collapsed: isCollapsed }">
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
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const outlineItems = ref([])
const isCollapsed = ref(false)
const isDragging = ref(false)
const position = ref({ x: 20, y: 80 }) // Default position
const dragOffset = ref({ x: 0, y: 0 })

const scrollToSection = (anchor) => {
  const element = document.querySelector(anchor)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const toggleOutline = () => {
  isCollapsed.value = !isCollapsed.value
  
  // Дополнительное действие 1: Сохранение состояния в localStorage
  localStorage.setItem('outline-collapsed', isCollapsed.value.toString())
  
  // Дополнительное действие 2: Отправка аналитики
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'outline_toggle', {
      event_category: 'navigation',
      event_label: isCollapsed.value ? 'collapsed' : 'expanded'
    })
  }
  
  // Дополнительное действие 3: Изменение размера главного контента
  const content = document.querySelector('.VPContent')
  if (content) {
    if (isCollapsed.value) {
      content.style.marginRight = '0px'
    } else {
      content.style.marginRight = '240px'
    }
  }
  
  // Дополнительное действие 4: Сворачивание других элементов интерфейса
  const authHeader = document.querySelector('.auth-header')
  if (authHeader && isCollapsed.value) {
    // Если outline сворачивается, тоже сворачиваем auth header
    authHeader.style.transform = 'translateY(-100%)'
  }
  
  console.log('Outline toggled:', isCollapsed.value ? 'collapsed' : 'expanded')
}

const startDrag = (event) => {
  event.preventDefault()
  isDragging.value = true
  
  // Запоминаем offset от курсора до левого верхнего угла элемента
  dragOffset.value = {
    x: event.clientX - position.value.x,
    y: event.clientY - position.value.y
  }
  
  // Добавляем глобальные обработчики
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
  document.body.style.userSelect = 'none' // Отключаем выделение текста
}

const onDrag = (event) => {
  if (!isDragging.value) return
  
  // Вычисляем новую позицию с учетом offset
  let newX = event.clientX - dragOffset.value.x
  let newY = event.clientY - dragOffset.value.y
  
  // Ограничиваем позицию границами экрана
  const rect = document.querySelector('.simple-outline').getBoundingClientRect()
  const maxX = window.innerWidth - rect.width
  const maxY = window.innerHeight - rect.height
  
  newX = Math.max(0, Math.min(newX, maxX))
  newY = Math.max(0, Math.min(newY, maxY))
  
  position.value = { x: newX, y: newY }
}

const stopDrag = () => {
  if (!isDragging.value) return
  
  isDragging.value = false
  
  // Убираем глобальные обработчики
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.body.style.userSelect = ''
  
  // Сохраняем позицию в localStorage
  localStorage.setItem('outline-position', JSON.stringify(position.value))
  
  console.log('Outline moved to:', position.value)
}

const handleResize = () => {
  // Проверяем, не вышел ли outline за границы
  const maxX = window.innerWidth - 220 // ширина outline
  const maxY = window.innerHeight - 300 // примерная высота outline
  
  if (position.value.x > maxX) {
    position.value.x = Math.max(20, maxX)
  }
  if (position.value.y > maxY) {
    position.value.y = Math.max(20, maxY)
  }
  
  // Сохраняем скорректированную позицию
  localStorage.setItem('outline-position', JSON.stringify(position.value))
}

const resetPosition = () => {
  position.value = { x: window.innerWidth - 240, y: 80 }
  localStorage.setItem('outline-position', JSON.stringify(position.value))
  console.log('Outline position reset to default')
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
  
  // Восстановление состояния из localStorage
  const savedState = localStorage.getItem('outline-collapsed')
  if (savedState !== null) {    
    isCollapsed.value = savedState === 'true'
  }
  
  // Восстановление позиции из localStorage
  const savedPosition = localStorage.getItem('outline-position')
  if (savedPosition) {
    try {
      const parsedPosition = JSON.parse(savedPosition)
      if (parsedPosition.x !== undefined && parsedPosition.y !== undefined) {
        position.value = parsedPosition
      }
    } catch (e) {
      console.warn('Failed to parse saved outline position:', e)
      // Используем дефолтную позицию справа
      position.value = { x: window.innerWidth - 240, y: 80 }
    }
  } else {
    // Первый запуск - ставим справа
    position.value = { x: window.innerWidth - 240, y: 80 }
  }
  
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  // Cleanup event listeners
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('resize', handleResize)
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
  transition: left 0.3s ease, top 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.simple-outline.is-dragging {
  opacity: 0.8;
  transform: rotate(2deg);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  transition: none;
  z-index: 9999;
}

.simple-outline:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.simple-outline.is-dragging:hover {
  transform: rotate(2deg);
}

/* Header with toggle button */
.outline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.outline-header.drag-handle {
  cursor: move;
  cursor: grab;
  position: relative;
}

.outline-header.drag-handle:active {
  cursor: grabbing;
}

.outline-header.drag-handle::before {
  content: '⋮⋮';
  position: absolute;
  left: -0.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--bybit-text-muted, #adb5bd);
  font-size: 0.7rem;
  line-height: 0.5;
  letter-spacing: -2px;
  opacity: 0.5;
  transition: opacity 0.2s ease;
}

.outline-header.drag-handle:hover::before {
  opacity: 1;
  color: var(--bybit-primary, #f7931a);
}

.simple-outline h4 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--bybit-text-primary, #212529);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: 'JetBrains Mono', Monaco, monospace;
  flex: 1;
}

.outline-toggle-btn {
  background: var(--bybit-primary, #f7931a);
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  font-family: 'JetBrains Mono', Monaco, monospace;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(247, 147, 26, 0.3);
}

.outline-toggle-btn:hover {
  background: var(--bybit-primary-dark, #e8851a);
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(247, 147, 26, 0.4);
}

.outline-toggle-btn:active {
  transform: scale(0.95);
}

.outline-nav {
  transition: all 0.3s ease;
  max-height: 1000px;
  opacity: 1;
  overflow: hidden;
}

.outline-nav.collapsed {
  max-height: 0;
  opacity: 0;
  margin-bottom: 0;
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
    width: 200px;
  }
}

@media (max-width: 768px) {
  .simple-outline {
    position: relative;
    top: auto;
    right: auto;
    left: auto !important;
    width: 100%;
    margin: 1.5rem 0;
    transform: none !important;
  }
  
  .simple-outline.is-dragging {
    transform: none !important;
    opacity: 1;
  }
  
  .simple-outline:hover {
    transform: none;
  }
  
  .outline-header.drag-handle {
    cursor: default;
    pointer-events: none;
  }
  
  .outline-header.drag-handle::before {
    display: none;
  }
  
  .outline-toggle-btn {
    pointer-events: auto;
  }
}
</style> 