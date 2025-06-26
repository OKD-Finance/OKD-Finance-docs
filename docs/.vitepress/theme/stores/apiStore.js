import { reactive } from 'vue'

// Глобальное состояние API конфигурации
export const apiStore = reactive({
    // API конфигурация
    apiToken: '',
    apiBaseUrl: 'https://develop.okd.finance/api',
    showToken: false,

    // Состояние блока AUTH
    isHeaderCollapsed: false,
    isTokenConfigured: false,

    // Методы для управления состоянием
    setApiToken(token) {
        this.apiToken = token
        this.isTokenConfigured = !!token
        // Автоматически закрываем блок после ввода токена
        if (token) {
            this.isHeaderCollapsed = true
        }
        // Сохраняем в localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('okd-api-token', token)
            localStorage.setItem('okd-api-header-collapsed', this.isHeaderCollapsed.toString())
        }
    },

    setApiBaseUrl(url) {
        this.apiBaseUrl = url
        // Сохраняем в localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('okd-api-base-url', url)
        }
    },

    toggleHeaderCollapse() {
        this.isHeaderCollapsed = !this.isHeaderCollapsed
        // Сохраняем состояние в localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('okd-api-header-collapsed', this.isHeaderCollapsed.toString())
        }
    },

    toggleTokenVisibility() {
        this.showToken = !this.showToken
    },

    // Инициализация из localStorage
    init() {
        if (typeof window !== 'undefined') {
            const savedToken = localStorage.getItem('okd-api-token')
            const savedBaseUrl = localStorage.getItem('okd-api-base-url')
            const savedCollapsed = localStorage.getItem('okd-api-header-collapsed')

            if (savedToken) {
                this.apiToken = savedToken
                this.isTokenConfigured = true
            }

            if (savedBaseUrl) {
                this.apiBaseUrl = savedBaseUrl
            }

            if (savedCollapsed !== null) {
                this.isHeaderCollapsed = savedCollapsed === 'true'
            } else {
                // По умолчанию блок открыт, если токен не настроен
                this.isHeaderCollapsed = this.isTokenConfigured
            }
        }
    },

    // Очистка всех данных
    clear() {
        this.apiToken = ''
        this.apiBaseUrl = 'https://develop.okd.finance/api'
        this.showToken = false
        this.isHeaderCollapsed = false
        this.isTokenConfigured = false

        if (typeof window !== 'undefined') {
            localStorage.removeItem('okd-api-token')
            localStorage.removeItem('okd-api-base-url')
            localStorage.removeItem('okd-api-header-collapsed')
        }
    }
})

// Инициализируем store при импорте
if (typeof window !== 'undefined') {
    apiStore.init()
} 