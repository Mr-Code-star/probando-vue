import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import {
    ConfirmationService,
    SelectButton,
    ToastService
} from "primevue";
import router from "./router/index.js";
import i18n from "./i18n/index.js";


const app = createApp(App)
app.use(PrimeVue, {
        ripple: true,
        theme:
            {
                preset: Aura,
                options:
                    {
                        prefix: 'p',
                        darkModeSelector: 'system',
                        cssLayer:
                            false
                    }
            }
    }
);

app.use(ConfirmationService)
app.use(ToastService)

// Components personalized
app.component('pv-select-button', SelectButton)
app.use(i18n)
app.use(router)
app.mount('#app')
