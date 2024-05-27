// Plugins
import { registerPlugins } from '@/plugins';

// Components
import App from './App.vue';

// Composable
import { createApp } from 'vue';

// Themes
import './assets/scss/global.scss';
import 'monaco-editor/esm/vs/language/json/monaco.contribution';
import 'monaco-editor/esm/vs/basic-languages/html/html.contribution';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import 'monaco-editor/esm/vs/basic-languages/css/css.contribution';

const app = createApp(App);

registerPlugins(app);

app.mount('#app');
