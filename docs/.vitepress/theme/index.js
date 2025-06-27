import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './style.css'
import './api-interactive-scripts.js'
import ApiDoc from '../components/ApiDoc.vue'
import ApiMethod from '../components/ApiMethod.vue'
import APINavigation from './components/APINavigation.vue'
import SimpleOutline from './components/SimpleOutline.vue'

export default {
    ...DefaultTheme,
    Layout,
    enhanceApp({ app }) {
        app.component('ApiDoc', ApiDoc)
        app.component('ApiMethod', ApiMethod)
        app.component('APINavigation', APINavigation)
        app.component('SimpleOutline', SimpleOutline)
    }
}