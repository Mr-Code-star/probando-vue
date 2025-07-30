import {createApp} from 'vue'
import 'primeicons/primeicons.css'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import {
    ConfirmationService,
    SelectButton,
    ToastService,
    Card,
    FloatLabel,
    InputText,
    Password,
    Button,
    Message,
    Dropdown,
    RadioButton,
    Dialog,
    InputMask,
    Checkbox
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
app.component("pv-card", Card)
app.component("pv-float-label", FloatLabel)
app.component("pv-input-text", InputText)
app.component('pv-password', Password)
app.component('pv-button', Button)
app.component('pv-message', Message)
app.component('pv-dropdown', Dropdown)
app.component('pv-radio-button', RadioButton)
app.component('pv-dialog', Dialog)
app.component('pv-input-mask', InputMask)
app.component('pv-checkbox', Checkbox)
app.use(i18n)
app.use(router)
app.mount('#app')