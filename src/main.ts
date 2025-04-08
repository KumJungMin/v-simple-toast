import { createApp } from 'vue'
import App from './App.vue'
import Toast from './@lib/toast/Toast.vue'

const app = createApp(App);

app.component('Toast', Toast);

app.mount('#app');
