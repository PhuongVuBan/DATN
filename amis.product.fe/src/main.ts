import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './locales/i18n';
import store from './store';
import { registerGlobalComponents } from '@/core/global_component';
import './assets/css/main.css';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(i18n);
registerGlobalComponents(app);

app.mount('#app');

export default app;