import { ref, reactive, watch, toRef } from 'vue'

// Глобальное состояние аутентификации
const globalAuthState = reactive({
    apiToken: '',
    apiBaseUrl: 'https://develop.okd.finance/api',
    apiFingerprint: '',
    showToken: false,
    showFingerprint: false,
    isHeaderCollapsed: false, // по умолчанию блок открыт
    hasTokenBeenSet: false, // флаг для отслеживания, был ли токен установлен
    hasFingerprintBeenSet: false // флаг для отслеживания, был ли fingerprint установлен
})

// Сохранение в localStorage
const STORAGE_KEY = 'okd-api-auth'

// Загрузка из localStorage при инициализации
function loadAuthFromStorage() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            const data = JSON.parse(stored)
            globalAuthState.apiToken = data.apiToken || ''
            globalAuthState.apiBaseUrl = data.apiBaseUrl || 'https://develop.okd.finance/api'
            globalAuthState.apiFingerprint = data.apiFingerprint || ''
            globalAuthState.hasTokenBeenSet = !!data.apiToken
            globalAuthState.hasFingerprintBeenSet = !!data.apiFingerprint

            // ИСПРАВЛЕНИЕ: Блок всегда открыт, если нет токена или fingerprint
            if (!globalAuthState.apiToken || !globalAuthState.apiFingerprint) {
                // Если токена или fingerprint нет - блок всегда открыт
                globalAuthState.isHeaderCollapsed = false
            } else {
                // Если токен и fingerprint есть - используем сохраненное состояние или закрываем по умолчанию
                globalAuthState.isHeaderCollapsed = data.isHeaderCollapsed !== undefined ? data.isHeaderCollapsed : false
            }
        } else {
            // Если нет данных в localStorage, блок открыт по умолчанию
            globalAuthState.isHeaderCollapsed = false
        }
    } catch (error) {
        console.warn('Failed to load auth from localStorage:', error)
        // В случае ошибки блок открыт по умолчанию
        globalAuthState.isHeaderCollapsed = false
    }
}

// Сохранение в localStorage
function saveAuthToStorage() {
    try {
        const dataToSave = {
            apiToken: globalAuthState.apiToken,
            apiBaseUrl: globalAuthState.apiBaseUrl,
            apiFingerprint: globalAuthState.apiFingerprint,
            isHeaderCollapsed: globalAuthState.isHeaderCollapsed
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
    } catch (error) {
        console.warn('Failed to save auth to localStorage:', error)
    }
}

// Загружаем данные при первом импорте
loadAuthFromStorage()

// Принудительно открываем блок если нет токена или fingerprint (исправление проблемы с кэшированием)
setTimeout(() => {
    if (!globalAuthState.apiToken || !globalAuthState.apiFingerprint) {
        globalAuthState.isHeaderCollapsed = false
    }
}, 100)

// Наблюдаем за изменениями и сохраняем
watch(
    () => ({ ...globalAuthState }),
    () => {
        saveAuthToStorage()
    },
    { deep: true }
)

// Наблюдаем за токеном для автоматического сворачивания
watch(
    () => globalAuthState.apiToken,
    (newToken, oldToken) => {
        // Если токен был установлен впервые или изменен
        if (newToken && newToken !== oldToken) {
            globalAuthState.hasTokenBeenSet = true
            // Автоматически сворачиваем блок только если есть и токен и fingerprint
            if (globalAuthState.apiFingerprint) {
                setTimeout(() => {
                    globalAuthState.isHeaderCollapsed = true
                }, 1500) // небольшая задержка для плавности
            }
        }
        // Если токен очищен
        if (!newToken && oldToken) {
            globalAuthState.hasTokenBeenSet = false
            // Автоматически открываем блок когда токен очищен
            globalAuthState.isHeaderCollapsed = false
        }
    }
)

// Наблюдаем за fingerprint для автоматического сворачивания
watch(
    () => globalAuthState.apiFingerprint,
    (newFingerprint, oldFingerprint) => {
        // Если fingerprint был установлен впервые или изменен
        if (newFingerprint && newFingerprint !== oldFingerprint) {
            globalAuthState.hasFingerprintBeenSet = true
            // Автоматически сворачиваем блок только если есть и токен и fingerprint
            if (globalAuthState.apiToken) {
                setTimeout(() => {
                    globalAuthState.isHeaderCollapsed = true
                }, 1500) // небольшая задержка для плавности
            }
        }
        // Если fingerprint очищен
        if (!newFingerprint && oldFingerprint) {
            globalAuthState.hasFingerprintBeenSet = false
            // Автоматически открываем блок когда fingerprint очищен
            globalAuthState.isHeaderCollapsed = false
        }
    }
)

export function useAuth() {
    return {
        // Реактивные данные - используем toRef для правильной реактивности
        apiToken: toRef(globalAuthState, 'apiToken'),
        apiBaseUrl: toRef(globalAuthState, 'apiBaseUrl'),
        apiFingerprint: toRef(globalAuthState, 'apiFingerprint'),
        showToken: toRef(globalAuthState, 'showToken'),
        showFingerprint: toRef(globalAuthState, 'showFingerprint'),
        isHeaderCollapsed: toRef(globalAuthState, 'isHeaderCollapsed'),
        hasTokenBeenSet: toRef(globalAuthState, 'hasTokenBeenSet'),
        hasFingerprintBeenSet: toRef(globalAuthState, 'hasFingerprintBeenSet'),

        // Методы
        toggleHeader: () => {
            globalAuthState.isHeaderCollapsed = !globalAuthState.isHeaderCollapsed
        },

        clearAuth: () => {
            globalAuthState.apiToken = ''
            globalAuthState.apiFingerprint = ''
            globalAuthState.hasTokenBeenSet = false
            globalAuthState.hasFingerprintBeenSet = false
            globalAuthState.isHeaderCollapsed = false
        },

        // Метод для явного управления состоянием блока (всегда работает)
        setHeaderCollapsed: (collapsed) => {
            globalAuthState.isHeaderCollapsed = collapsed
        },

        // Метод для принудительного сброса состояния
        forceOpenAuth: () => {
            globalAuthState.isHeaderCollapsed = false
        },

        // Метод для полной очистки localStorage
        resetStorage: () => {
            localStorage.removeItem(STORAGE_KEY)
            globalAuthState.apiToken = ''
            globalAuthState.apiBaseUrl = 'https://develop.okd.finance/api'
            globalAuthState.apiFingerprint = ''
            globalAuthState.hasTokenBeenSet = false
            globalAuthState.hasFingerprintBeenSet = false
            globalAuthState.isHeaderCollapsed = false
        },

        // Проверка готовности для отправки запросов
        isReadyToSendRequest: () => {
            return globalAuthState.apiToken && globalAuthState.apiFingerprint
        },

        // Получение сырых значений (для использования в fetch и т.д.)
        getRawValues: () => ({
            apiToken: globalAuthState.apiToken,
            apiBaseUrl: globalAuthState.apiBaseUrl,
            apiFingerprint: globalAuthState.apiFingerprint,
            isHeaderCollapsed: globalAuthState.isHeaderCollapsed,
            hasTokenBeenSet: globalAuthState.hasTokenBeenSet,
            hasFingerprintBeenSet: globalAuthState.hasFingerprintBeenSet
        })
    }
} 