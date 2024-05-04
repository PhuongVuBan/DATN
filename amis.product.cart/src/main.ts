import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import VueSweetalert2 from 'vue-sweetalert2';

import "jquery/dist/jquery.slim.min.js";
import "popper.js/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

import "./assets/css/bootstrap.min.css";
import "./assets/css/style.css";
import 'sweetalert2/dist/sweetalert2.min.css';
import "./assets/fonts/style.css";

const app = createApp(App)

app.use(router);
app.use(VueSweetalert2);
app.use(store);

app.mount('#app')
