/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composable
import { createVuetify } from 'vuetify'

const customLightTheme = {
  dark: false,
  colors: {
    surface: '#383838',
    "on-surface": '#ffffff',
    primary: '#383838',
    secondary: '#ffffff',
    accent: '#8c9eff',
    error: '#ff5252',
  },
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "customLightTheme",
    themes: {
      customLightTheme
    }
  },
})
