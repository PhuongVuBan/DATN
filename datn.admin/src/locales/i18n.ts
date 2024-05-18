import { createI18n } from 'vue-i18n';
import { EntitySystem, StorageService, SystemConstants } from '@/core/public_api';
import enMessage from './en.json';
import viMessage from './vi.json';

/**
 * Kiểm tra xem đã lưu ngôn ngữ người dùng cài chưa vào localstore, 
 * nếu chưa lưu thì tiến hành lưu lại ngôn ngữ mặc định được cấu hình trong file config.prod.json
 * HAN - 08.03.2023
 */
try {
  if(!StorageService.getItemWithSystemConstants(EntitySystem.Lang)){
    StorageService.setItemWithSystemConstants(EntitySystem.Lang, SystemConstants.get(EntitySystem.LocalLang))
  }
} catch (e) {
  StorageService.setItemWithSystemConstants(EntitySystem.Lang, SystemConstants.get(EntitySystem.LocalLang))
  console.log(e);
}

/**
 * Khởi tạo i18n với ngôn ngữ là vi và en
 * HAN - 08.03.2023
 */
const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: StorageService.getItemWithSystemConstants(EntitySystem.Lang) || SystemConstants.get(EntitySystem.LocalLang),
  messages: {
    [SystemConstants.get(EntitySystem.Vi)]: viMessage,
    [SystemConstants.get(EntitySystem.En)]: enMessage
  },
  fallbackLocale: StorageService.getItemWithSystemConstants(EntitySystem.Lang) || SystemConstants.get(EntitySystem.LocalLang)
})
export default i18n;