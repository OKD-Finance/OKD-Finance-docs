<template>
  <div class="navigation-controller">
    <!-- Кнопка для скрытия/показа навигации -->
    <button 
      class="nav-toggle-btn"
      @click="toggleNavigation"
      :title="isNavVisible ? 'Скрыть навигацию (Ctrl+H)' : 'Показать навигацию (Ctrl+H)'"
    >
      <svg v-if="isNavVisible" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 13H5v-2h14v2z"/>
      </svg>
      <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
      </svg>
    </button>

    <!-- Компактная плавающая навигация -->
    <div 
      v-if="isFloatingMode" 
      class="floating-nav"
      :class="{ 'floating-nav--hidden': !isNavVisible }"
      ref="floatingNav"
    >
      <div class="floating-nav-header">
        <div class="floating-nav-handle" @mousedown="startDrag">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9 2-2 2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9 2-2 2z"/>
          </svg>
        </div>
        <button class="floating-nav-pin" @click="toggleFloatingMode" title="Закрепить навигацию">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,4V8L15,7V16H13V10H11V16H9V7L10,8V4H14M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
          </svg>
        </button>
        <button class="floating-nav-close" @click="toggleNavigation" title="Скрыть навигацию">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
          </svg>
        </button>
      </div>
      
      <div class="floating-nav-content">
        <div class="floating-nav-sections">
          <div v-for="section in navigationSections" :key="section.title" class="floating-nav-section">
            <h4 @click="toggleSection(section.title)">
              {{ section.title }}
              <svg 
                :class="{ 'rotated': section.expanded }"
                width="12" height="12" viewBox="0 0 24 24" fill="currentColor"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
              </svg>
            </h4>
            <ul v-if="section.expanded" class="floating-nav-links">
              <li v-for="link in section.links" :key="link.text">
                                 <a 
                   :href="link.link" 
                   :class="{ 'active': isCurrentPage(link.link) }"
                   @click="onLinkClick"
                 >
                   {{ link.text }}
                 </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
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
  if (window.innerWidth < 768) {
    isNavVisible.value = false
  }
}

// Drag & Drop для плавающей навигации
const startDrag = (e) => {
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
  localStorage.setItem('nav-position', JSON.stringify(floatingPosition.value))
}

// Горячие клавиши
const handleKeydown = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
    e.preventDefault()
    toggleNavigation()
  }
  
  if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
    e.preventDefault()
    toggleFloatingMode()
  }
}

// Инициализация
onMounted(() => {
  // Дождаться загрузки глобальной системы
  const initWithGlobalSystem = () => {
    if (window.navigationController) {
      const settings = window.navigationController.loadSettings()
      isNavVisible.value = settings.navVisible
      isFloatingMode.value = settings.floatingMode
      floatingPosition.value = settings.position
      
      // Применить настройки
      window.navigationController.applySettings(settings)
    } else {
      // Fallback если глобальная система не готова
      const savedVisible = localStorage.getItem('nav-visible')
      if (savedVisible !== null) {
        isNavVisible.value = savedVisible === 'true'
      }
      
      const savedFloating = localStorage.getItem('nav-floating')
      if (savedFloating !== null) {
        isFloatingMode.value = savedFloating === 'true'
      }
      
      const savedPosition = localStorage.getItem('nav-position')
      if (savedPosition) {
        try {
          floatingPosition.value = JSON.parse(savedPosition)
        } catch {
          floatingPosition.value = { x: 20, y: 100 }
        }
      }
      
      // Применить состояния напрямую
      document.body.classList.toggle('nav-hidden', !isNavVisible.value)
      document.body.classList.toggle('nav-floating-mode', isFloatingMode.value)
      document.documentElement.classList.toggle('nav-hidden', !isNavVisible.value)
      document.documentElement.classList.toggle('nav-floating-mode', isFloatingMode.value)
    }
  }
  
  // Попробовать инициализировать сразу, или подождать
  if (window.navigationController) {
    initWithGlobalSystem()
  } else {
    setTimeout(initWithGlobalSystem, 100)
  }
  
  // Установить начальную позицию плавающей навигации
  setTimeout(() => {
    if (floatingNav.value && isFloatingMode.value) {
      floatingNav.value.style.left = floatingPosition.value.x + 'px'
      floatingNav.value.style.top = floatingPosition.value.y + 'px'
    }
  }, 200)
  
  // Добавить обработчики событий
  document.addEventListener('keydown', handleKeydown)
  
  // Автоматически переключиться в плавающий режим на мобильных устройствах
  if (window.innerWidth < 768 && !isFloatingMode.value) {
    toggleFloatingMode()
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
})
</script>

<style scoped>
.navigation-controller {
  position: relative;
}

.nav-toggle-btn {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 1001;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  padding: 8px;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav-toggle-btn:hover {
  background: var(--vp-c-bg-elv);
  border-color: var(--vp-c-brand-1);
}

.floating-nav {
  position: fixed;
  width: 280px;
  max-height: 400px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(12px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.floating-nav--hidden {
  opacity: 0;
  transform: translateY(-10px);
  pointer-events: none;
}

.floating-nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-elv);
  border-radius: 8px 8px 0 0;
}

.floating-nav-handle {
  cursor: move;
  padding: 4px;
  color: var(--vp-c-text-2);
  border-radius: 4px;
  transition: background 0.2s ease;
}

.floating-nav-handle:hover {
  background: var(--vp-c-bg);
}

.floating-nav-pin,
.floating-nav-close {
  background: none;
  border: none;
  color: var(--vp-c-text-2);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.floating-nav-pin:hover,
.floating-nav-close:hover {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.floating-nav-content {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
}

.floating-nav-sections {
  display: flex;
  flex-direction: column;
}

.floating-nav-section {
  margin-bottom: 12px;
}

.floating-nav-section h4 {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 8px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.2s ease;
}

.floating-nav-section h4:hover {
  background: var(--vp-c-bg-elv);
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
}

.floating-nav-links li {
  margin-bottom: 4px;
}

.floating-nav-links a {
  display: block;
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 0.85rem;
  padding: 6px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.floating-nav-links a:hover,
.floating-nav-links a.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

/* Скрыть стандартную навигацию VitePress в плавающем режиме */
:global(.nav-floating-mode .VPSidebar) {
  display: none !important;
}

:global(.nav-floating-mode .VPContent.has-sidebar) {
  padding-left: 0 !important;
}

/* Адаптивность */
@media (max-width: 768px) {
  .floating-nav {
    width: 260px;
    max-height: 350px;
  }
  
  .nav-toggle-btn {
    top: 70px;
    right: 15px;
  }
}

@media (max-width: 480px) {
  .floating-nav {
    width: calc(100vw - 40px);
    left: 20px !important;
    right: 20px !important;
    max-height: 300px;
  }
}
</style> 