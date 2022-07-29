import { createApp } from 'vue'
import App from "./App.vue"
import { getConfig } from '@/plugins'

import "./assets/main.css";

async function startVue() {

    const envVar = await getConfig();

}

startVue().then().catch(error => {
    console.error('Error in main: ', error)
})

createApp(App).mount("#app");
