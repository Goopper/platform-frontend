// Plugins
import { registerPlugins } from '@/plugins';

// Components
import App from './App.vue';

// Composable
import { createApp } from 'vue';

// Themes
import './assets/scss/global.scss';

const app = createApp(App);

registerPlugins(app);

app.mount('#app');
