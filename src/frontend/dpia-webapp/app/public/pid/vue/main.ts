import { createApp } from 'vue'
//import { getConfig } from '@/plugins'


import App from "./App.vue"

async function startVue() {

//    const envVar = await getConfig();

}
startVue().then().catch(error => {
    console.error('Error in main: ', error)
})

createApp(App).mount("bcgov-pid-public");


