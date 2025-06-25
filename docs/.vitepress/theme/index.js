import DefaultTheme from 'vitepress/theme'
import './style.css'
import './api-interactive-scripts.js'
import ApiDoc from '../components/ApiDoc.vue'
import ApiMethod from '../components/ApiMethod.vue'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component('ApiDoc', ApiDoc)
        app.component('ApiMethod', ApiMethod)
    }
}