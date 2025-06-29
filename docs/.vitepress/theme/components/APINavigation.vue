<template>
  <div class="api-navigation">
    <div class="api-nav-header">
      <h3>API Reference</h3>
      <p class="api-nav-description">Choose an API category to explore available endpoints</p>
    </div>
    
    <div class="api-nav-grid">
      <div v-for="api in availableApis" :key="api.link" class="api-nav-card">
        <a :href="api.link" class="api-nav-link">
          <div class="api-nav-icon">
            <component :is="getApiIcon(api.name)" />
          </div>
          <div class="api-nav-content">
            <h4>{{ api.name }}</h4>
            <p>{{ api.description }}</p>
            <span class="api-nav-endpoints">{{ api.endpoints }} endpoints</span>
          </div>
          <div class="api-nav-arrow">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z"/>
            </svg>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'APINavigation',
  data() {
    return {
      availableApis: []
    }
  },
  mounted() {
    this.loadAvailableApis()
  },
  methods: {
    async loadAvailableApis() {
      // Загружаем список доступных API из кеша или конфигурации
      try {
        const response = await fetch('/.swagger-cache.json')
        if (response.ok) {
          const cache = await response.json()
          this.availableApis = this.formatApiList(cache.apis || {})
        }
      } catch {
        // Если кеш недоступен, используем статический список
        this.availableApis = this.getStaticApiList()
      }
    },
    
    formatApiList(apis) {
      return Object.entries(apis).map(([key, api]) => ({
        name: api.name || key,
        link: `/en/api/${key.toLowerCase().replace(/\s+/g, '-')}`,
        description: api.description || `${api.name} endpoints and operations`,
        endpoints: api.endpoints || 0
      }))
    },
    
    getStaticApiList() {
      return [
        { name: 'KYC API', link: '/en/api/kyc', description: 'Know Your Customer verification endpoints', endpoints: 3 },
        { name: 'Authentication API', link: '/en/api/authentication', description: 'User authentication and authorization', endpoints: 30 },
        { name: 'Websocket subscriptions API', link: '/en/api/websocket-subscriptions', description: 'Real-time data subscriptions', endpoints: 6 },
        { name: 'Exchange configuration API', link: '/en/api/exchange-configuration', description: 'Exchange settings and configuration', endpoints: 6 },
        { name: 'Datasource API', link: '/en/api/datasource', description: 'Data source management', endpoints: 4 },
        { name: 'Errors API', link: '/en/api/errors', description: 'Error handling and reporting', endpoints: 1 },
        { name: 'Managed API', link: '/en/api/managed', description: 'Managed services and operations', endpoints: 2 },
        { name: 'OKD API', link: '/en/api/okd', description: 'Core OKD platform operations', endpoints: 4 },
        { name: 'User Operations API', link: '/en/api/user-operations', description: 'User account operations', endpoints: 3 },
        { name: 'Referral program API', link: '/en/api/referral-program', description: 'Referral system management', endpoints: 9 },
        { name: 'Spot API', link: '/en/api/spot', description: 'Spot trading operations', endpoints: 5 },
        { name: 'ByBit REST endpoints API', link: '/en/api/bybit-rest-endpoints', description: 'ByBit integration endpoints', endpoints: 27 },
        { name: 'Wallet API', link: '/en/api/wallet', description: 'Wallet management and operations', endpoints: 7 }
      ]
    },
    
    getApiIcon(apiName) {
      // Возвращаем иконку в зависимости от типа API
      const iconMap = {
        'KYC': 'IconShield',
        'Authentication': 'IconKey',
        'Websocket': 'IconBolt',
        'Exchange': 'IconSettings',
        'Datasource': 'IconDatabase',
        'Errors': 'IconAlert',
        'Managed': 'IconCloud',
        'OKD': 'IconHome',
        'User': 'IconUser',
        'Referral': 'IconGift',
        'Spot': 'IconTrendingUp',
        'ByBit': 'IconExternalLink',
        'Wallet': 'IconWallet'
      }
      
      const key = Object.keys(iconMap).find(k => apiName.includes(k))
      return key ? iconMap[key] : 'IconCode'
    }
  }
}
</script>

<style scoped>
.api-navigation {
  margin: 2rem 0;
  container-type: inline-size;
  width: 100%;
}

.api-nav-header {
  text-align: center;
  margin-bottom: 2rem;
}

.api-nav-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.api-nav-description {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin: 0;
}

/* Компактный заголовок для узких контейнеров */
@container (max-width: 700px) {
  .api-nav-header {
    margin-bottom: 1.5rem;
  }
  
  .api-nav-header h3 {
    font-size: 1.3rem;
  }
  
  .api-nav-description {
    font-size: 0.85rem;
  }
}

.api-nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
  max-width: 100%;
}

/* Адаптация для узких контейнеров (когда sidebar открыт) */
@container (max-width: 800px) {
  .api-nav-grid {
    grid-template-columns: 1fr;
  }
}

/* Для браузеров без поддержки container queries */
@media (max-width: 1200px) {
  .api-nav-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 900px) {
  .api-nav-grid {
    grid-template-columns: 1fr;
  }
}

.api-nav-card {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  transition: all 0.2s ease;
  background: var(--vp-c-bg);
}

.api-nav-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.api-nav-link {
  display: flex;
  align-items: center;
  padding: 1rem;
  text-decoration: none;
  color: inherit;
  gap: 0.75rem;
  min-height: 80px;
}

/* Компактный вид для узких контейнеров */
@container (max-width: 600px) {
  .api-nav-link {
    padding: 0.75rem;
    min-height: 70px;
  }
  
  .api-nav-icon {
    width: 28px !important;
    height: 28px !important;
  }
  
  .api-nav-content h4 {
    font-size: 0.9rem;
  }
  
  .api-nav-content p {
    font-size: 0.8rem;
  }
}

.api-nav-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand-soft);
  border-radius: 6px;
  color: var(--vp-c-brand-1);
}

.api-nav-content {
  flex: 1;
}

.api-nav-content h4 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: var(--vp-c-text-1);
}

.api-nav-content p {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin: 0 0 0.25rem 0;
  line-height: 1.4;
}

.api-nav-endpoints {
  font-size: 0.75rem;
  color: var(--vp-c-brand-2);
  font-weight: 500;
}

.api-nav-arrow {
  flex-shrink: 0;
  color: var(--vp-c-text-3);
  transition: color 0.2s ease;
}

.api-nav-card:hover .api-nav-arrow {
  color: var(--vp-c-brand-1);
}

/* Адаптивность */
@media (max-width: 768px) {
  .api-nav-grid {
    grid-template-columns: 1fr;
  }
  
  .api-nav-link {
    padding: 0.75rem;
  }
  
  .api-nav-icon {
    width: 28px;
    height: 28px;
  }
  
  .api-nav-header {
    margin-bottom: 1.5rem;
  }
  
  .api-nav-header h3 {
    font-size: 1.3rem;
  }
  
  .api-nav-description {
    font-size: 0.85rem;
  }
}

/* Дополнительная адаптивность для средних экранов */
@media (max-width: 1100px) and (min-width: 769px) {
  .api-nav-grid {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
}

/* Темная тема */
@media (prefers-color-scheme: dark) {
  .api-nav-card {
    background: var(--vp-c-bg-alt);
  }
  
  .api-nav-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
}

/* Специальные стили когда sidebar открыт */
:global(body.sidebar-visible) .api-navigation {
  max-width: 100%;
  width: 100%;
}

:global(body.sidebar-visible) .api-nav-grid {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

/* Для средних экранов с открытым sidebar */
@media (max-width: 1300px) and (min-width: 1025px) {
  :global(body.sidebar-visible) .api-nav-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
}

/* Для узких экранов с открытым sidebar */
@media (max-width: 1024px) {
  :global(body.sidebar-visible) .api-nav-grid {
    grid-template-columns: 1fr;
  }
}

/* Когда sidebar скрыт - максимальная ширина */
:global(body.sidebar-hidden) .api-navigation {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

:global(body.sidebar-hidden) .api-nav-grid {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style> 