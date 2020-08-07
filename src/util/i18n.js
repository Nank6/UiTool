// 国际化设置
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '@/lang'

Vue.use(VueI18n)
const i18n = new VueI18n({
  // 当前语言环境
  locale: 'zhCN',
  // 默认语言环境。如果locale中无匹配项则采用该项值
  fallbackLocale: 'zhCN',
  messages
})

export default i18n

// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title) {
  const hasKey = this.$te('route.' + title)

  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = this.$t('route.' + title)

    return translatedTitle
  }
  return title
}
