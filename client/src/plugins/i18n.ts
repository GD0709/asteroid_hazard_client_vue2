import { createI18n } from 'vue-i18n'
import en from './../locales/en.json'
import ru from './../locales/ru.json'

type MessageSchema = typeof en

const i18n = createI18n<[MessageSchema], 'en-US' | 'ru-RU'>({
  legacy: false,
  locale: 'ru-RU',
  fallbackLocale: 'en-US',
  messages: {
    'en-US': en,
    'ru-RU': ru
  },
})
export default i18n