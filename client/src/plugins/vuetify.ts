/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
//import '@/styles/main.scss'
// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify(
  {
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#3f51b5',// colors.red.darken1, // #E53935
            secondary: '#b0bec5',// colors.red.lighten4, // #FFCDD2
            accent: '#8c9eff',
            error: '#b71c1c',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
          }
        },
      },
    },
}
//   {
//   theme: {
//     options: {
//       customProperties: true,
//     },
//   themes: {
//     light: {
//       primary: '#3f51b5',
//       secondary: '#b0bec5',
//       accent: '#8c9eff',
//       error: '#b71c1c',

// /*         primary: '#1976D2',
//       secondary: '#424242',
//       accent: '#82B1FF',
//       error: '#FF5252', */
//       info: '#2196F3',
//       success: '#4CAF50',
//       warning: '#FFC107',

// /*         primary: '#007BFF',
//       secondary: '#424242',
//       accent: '#82B1FF',
//       error: '#FF5252',
//       info: '#2196F3',
//       success: '#4CAF50',
//       warning: '#FFC107' */
//     },
//   },
// },
  //
)
