<template>
  <div class="navigation-controller">
    <!-- Мобильная кнопка меню будет отображаться здесь, если она используется -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

// Состояние
const isNavVisible = ref(true)
const isFloatingMode = ref(false)
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })
const floatingNav = ref(null)

// Настройки
const floatingPosition = ref({ x: 20, y: 100 })

// Данные навигации
const navigationSections = ref([
  {
    title: 'API Reference',
    expanded: true,
    links: [
      { text: 'Overview', link: '/api/overview' },
      { text: 'Authentication', link: '/api/authentication' },
      { text: 'KYC API', link: '/api/kyc' },
      { text: 'Websocket', link: '/api/websocket-subscriptions' },
      { text: 'Spot API', link: '/api/spot' },
      { text: 'Wallet API', link: '/api/wallet' }
    ]
  },
  {
    title: 'Guide',
    expanded: false,
    links: [
      { text: 'Introduction', link: '/guide/introduction' },
      { text: 'Quick Start', link: '/guide/quick-start' },
      { text: 'Authentication', link: '/guide/authentication' },
      { text: 'Trading', link: '/guide/trading' }
    ]
  },
  {
    title: 'Examples',
    expanded: false,
    links: [
      { text: 'Basic Usage', link: '/examples/basic-usage' },
      { text: 'Trading Flow', link: '/examples/trading-flow' },
      { text: 'ByBit Integration', link: '/examples/bybit-integration' }
    ]
  }
])

// Методы
const toggleNavigation = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }
  
  isNavVisible.value = !isNavVisible.value
  
  // Синхронизировать с глобальной системой
  if (window.navigationController) {
    const settings = window.navigationController.loadSettings()
    settings.navVisible = isNavVisible.value
    window.navigationController.saveSettings(settings)
    window.navigationController.applySettings(settings)
  } else {
    // Прямое управление если система не готова
    document.body.classList.toggle('nav-hidden', !isNavVisible.value)
    document.documentElement.classList.toggle('nav-hidden', !isNavVisible.value)
  }
}

const toggleFloatingMode = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }
  
  isFloatingMode.value = !isFloatingMode.value
  
  // Синхронизировать с глобальной системой
  if (window.navigationController) {
    const settings = window.navigationController.loadSettings()
    settings.floatingMode = isFloatingMode.value
    window.navigationController.saveSettings(settings)
    window.navigationController.applySettings(settings)
  } else {
    // Прямое управление если система не готова
    document.body.classList.toggle('nav-floating-mode', isFloatingMode.value)
    document.documentElement.classList.toggle('nav-floating-mode', isFloatingMode.value)
  }
}

const toggleSection = (title) => {
  const section = navigationSections.value.find(s => s.title === title)
  if (section) {
    section.expanded = !section.expanded
  }
}

const isCurrentPage = (link) => {
  return route.path.includes(link)
}

const onLinkClick = () => {
  // Опционально скрыть навигацию после клика на мобильных устройствах
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    isNavVisible.value = false
  }
}

// Drag & Drop для плавающей навигации
const startDrag = (e) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  if (!floatingNav.value) return
  
  isDragging.value = true
  const rect = floatingNav.value.getBoundingClientRect()
  dragOffset.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
  
  document.addEventListener('mousemove', handleDrag)
  document.addEventListener('mouseup', stopDrag)
}

const handleDrag = (e) => {
  if (!isDragging.value) return
  
  floatingPosition.value = {
    x: e.clientX - dragOffset.value.x,
    y: e.clientY - dragOffset.value.y
  }
  
  // Ограничить позицию в пределах экрана
  const maxX = window.innerWidth - 300
  const maxY = window.innerHeight - 400
  
  floatingPosition.value.x = Math.max(0, Math.min(maxX, floatingPosition.value.x))
  floatingPosition.value.y = Math.max(0, Math.min(maxY, floatingPosition.value.y))
  
  if (floatingNav.value) {
    floatingNav.value.style.left = floatingPosition.value.x + 'px'
    floatingNav.value.style.top = floatingPosition.value.y + 'px'
  }
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
  
  // Сохранить позицию
  if (window.navigationController && floatingNav.value) {
    const settings = window.navigationController.loadSettings()
    settings.floatingPosition = {
      x: floatingNav.value.getBoundingClientRect().left,
      y: floatingNav.value.getBoundingClientRect().top
    }
    window.navigationController.saveSettings(settings)
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    // Инициализировать настройки
    if (!window.navigationController) {
      window.navigationController = {
        settings: {},
        loadSettings: () => {
          try {
            return JSON.parse(localStorage.getItem('navigationControllerSettings')) || { navVisible: true, floatingMode: false, floatingPosition: { x: 20, y: 100 } }
          } catch (e) {
            console.error('Failed to load navigation settings from localStorage:', e)
            return { navVisible: true, floatingMode: false, floatingPosition: { x: 20, y: 100 } }
          }
        },
        saveSettings: (settings) => {
          try {
            localStorage.setItem('navigationControllerSettings', JSON.stringify(settings))
          } catch (e) {
            console.error('Failed to save navigation settings to localStorage:', e)
          }
        },
        applySettings: (settings) => {
          isNavVisible.value = settings.navVisible
          isFloatingMode.value = settings.floatingMode
          floatingPosition.value = settings.floatingPosition
          
          document.body.classList.toggle('nav-hidden', !settings.navVisible)
          document.documentElement.classList.toggle('nav-hidden', !settings.navVisible)
          document.body.classList.toggle('nav-floating-mode', settings.floatingMode)
          document.documentElement.classList.toggle('nav-floating-mode', settings.floatingMode)

          if (floatingNav.value) {
            floatingNav.value.style.left = settings.floatingPosition.x + 'px'
            floatingNav.value.style.top = settings.floatingPosition.y + 'px'
          }
        },
        toggleNavigation: toggleNavigation, // Экспортируем функцию
        toggleFloatingMode: toggleFloatingMode, // Экспортируем функцию
        isNavVisible: isNavVisible, // Экспортируем состояние
        isFloatingMode: isFloatingMode, // Экспортируем состояние
        floatingPosition: floatingPosition // Экспортируем состояние
      }
    }
    window.navigationController.applySettings(window.navigationController.loadSettings())

    // Обновлять позицию при изменении размера окна
    window.addEventListener('resize', () => {
      if (isFloatingMode.value && floatingNav.value) {
        const maxX = window.innerWidth - 300
        const maxY = window.innerHeight - 400
        floatingPosition.value.x = Math.max(0, Math.min(maxX, floatingPosition.value.x))
        floatingPosition.value.y = Math.max(0, Math.min(maxY, floatingPosition.value.y))
        floatingNav.value.style.left = floatingPosition.value.x + 'px'
        floatingNav.value.style.top = floatingPosition.value.y + 'px'
      }
    })
  }
})

</script>

<style scoped>
/* Стили для NavigationController */
.navigation-controller {
  /* Это основной контейнер для контроллера. 
     Он может быть скрыт или показан в зависимости от режима навигации. */
}

/* Компактная плавающая навигация */
.floating-nav {
  position: fixed;
  top: 100px;
  left: 20px;
  width: 280px;
  max-height: 80vh;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  z-index: 10000; /* Убедитесь, что она всегда поверх других элементов */
}

.floating-nav--hidden {
  transform: translateX(-100%);
  opacity: 0;
  pointer-events: none;
}

.floating-nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid var(--vp-c-border);
  cursor: grab;
}

.floating-nav-handle {
  cursor: grab;
  padding: 5px;
  display: flex;
  align-items: center;
  color: var(--vp-c-text-2);
}

.floating-nav-pin, .floating-nav-close {
  background: none;
  border: none;
  color: var(--vp-c-text-2);
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
}

.floating-nav-pin:hover, .floating-nav-close:hover {
  color: var(--vp-c-brand-1);
}

.floating-nav-content {
  padding: 15px;
}

.floating-nav-section h4 {
  margin: 0;
  padding: 10px 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--vp-c-text-1);
  transition: color 0.2s ease;
}

.floating-nav-section h4:hover {
  color: var(--vp-c-brand-1);
}

.floating-nav-section h4 svg {
  transition: transform 0.2s ease;
}

.floating-nav-section h4 svg.rotated {
  transform: rotate(180deg);
}

.floating-nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  border-left: 1px solid var(--vp-c-divider);
  margin-left: 6px;
}

.floating-nav-links li a {
  display: block;
  padding: 8px 10px;
  margin: 4px 0;
  color: var(--vp-c-text-2);
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.floating-nav-links li a:hover {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
}

.floating-nav-links li a.active {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

/* Стили для мобильной версии */
@media (max-width: 767px) {
  .floating-nav {
    position: fixed; /* Keep fixed for now */
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    box-shadow: none;
    background-color: var(--vp-c-bg);
    padding: 20px;
    transform: translateX(0%); /* Reset transform for mobile */
    opacity: 1; /* Ensure visible for mobile */
  }

  .floating-nav--hidden {
    transform: translateX(-100%);
    opacity: 0;
  }
}

</style> 